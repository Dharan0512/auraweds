# AuraWeds API — Business Logic & Time-Complexity Report

> Generated for the `release_1.0.0` backend (`backend/src`).
> Scope: every HTTP endpoint, the business rule it enforces, the database work it performs, and an estimated time complexity of that work.

## How to read the complexity column

Complexity is expressed in terms of the **number of DB round-trips** and the **dominant query cost**, where:

- `n` = number of rows returned by the dominant query (usually capped by a `limit`).
- `q` = number of sequential DB queries (round-trips) the handler issues.
- A query is **O(log n + k)** when filtered on an indexed column returning `k` rows; **O(n)** (table scan) when filtering on an unindexed column or using `iLike '%...%'`.
- App-layer work (`.map`, `.sort`, `.filter`) is noted separately.

Most handlers are **I/O-bound**: wall-clock time is dominated by the count of sequential round-trips, not CPU. "Sequential queries" is therefore the most actionable metric.

---

## Route mount map

| Mount | File | Auth |
|-------|------|------|
| `/api/auth` | authRoutes | mixed |
| `/api/profile` | profileRoutes | `protect` |
| `/api/matches` | matchRoutes | `protect` |
| `/api/interests` | interestRoutes | `protect` |
| `/api/subscription` | subscriptionRoutes | `protect` |
| `/api/master` | masterRoutes | public |
| `/api/moderation` | moderationRoutes | `protect` |
| `/api/admin` | adminRoutes | `protect` + `isAdmin` |

Global middleware: `secureHeaders`, CORS, `compression`, `express.json({1mb})`, `requestLogger`, `apiLimiter` on `/api`, plus `authLimiter` on auth routes.

---

## 1. Auth (`/api/auth`)

| Method & Path | Business logic | DB work | Complexity |
|---|---|---|---|
| `POST /register` | Validate body; reject duplicate email; enforce **one "Self" profile per mobile** (app check + partial unique index `uniq_users_self_mobile` as race guard); normalize `createdFor`/`gender`; bcrypt-hash password; create `User` + `UserProfile` (strength 15) + `Badge` in one transaction; issue 7-day JWT. | 2 lookups (`email`, `mobile/Self`) + 3 inserts in a txn. ~5 queries. | **O(q=5)**; bcrypt genSalt(10)+hash is the CPU cost (~50–100 ms, deliberate). Lookups O(log n) if `email`/`mobile` indexed. |
| `POST /login` | Find user by email; bcrypt-compare; update `lastLoginAt` + `ipAddress`; issue JWT. | 1 select + 1 update. | **O(q=2)** + 1 bcrypt compare. |
| `GET /me` | Static "you have access" probe (no DB). | none | **O(1)** |
| `POST /change-password` | Require both passwords; load user by PK; bcrypt-compare current; hash + save new. | 1 select + 1 update. | **O(q=2)** + 2 bcrypt ops. |

**Notes:** `register` is the heaviest auth path (transaction + 2 bcrypt-class operations). The duplicate-mobile check is done both in app code and via DB constraint — correct for concurrency.

---

## 2. Profile (`/api/profile`)

| Method & Path | Business logic | DB work | Complexity |
|---|---|---|---|
| `POST /draft` | Upsert onboarding draft (`stepData`, `lastStep`) keyed by user. | 1 upsert | **O(q=1)** |
| `GET /draft` | Return draft or default skeleton. | 1 select | **O(q=1)** |
| `PATCH /` (`createOrUpdateProfile`) | **Largest write path.** Partial-update across 7 tables in one transaction: `User`, `UserProfile`, `FamilyDetails`, `HoroscopeDetails`, `LocationLifestyle`, `EducationCareer`, `UserPreference`. Each section is conditionally upserted only if fields are present. Heavy field normalization (parseId, enum whitelists, label→scale mapping). | Up to 7 upserts/updates in a txn. | **O(q≈7)** sequential writes. App-layer normalization O(fields), negligible. |
| `GET /me` | Load `User`, `UserProfile` with **~12 eager includes** (Religion, City, State, Country, MotherTongue, Caste, Family, Horoscope→Star/Rasi/Laknam/Gothram, Lifestyle, Education, Badge), `UserPreference`, `UserPhoto`. | 3 sequential selects, the middle one a wide multi-join. | **O(q=3)** but each join multiplies row width; dominant cost is the 12-way join. |
| `POST /photos` | Multer memory upload → push buffer to Supabase Storage → create `UserPhoto`. | 1 insert + 1 external storage PUT. | **O(q=1 + 1 network)**; storage upload dominates wall-clock. |
| `DELETE /photos/:photoId` | Find photo by id+user (ownership); best-effort storage delete; destroy row. | 1 select + 1 storage DELETE + 1 delete. | **O(q=2 + 1 network)** |
| `POST /horoscope` | Upload horoscope file to storage; upsert `HoroscopeDetails.horoscopeImageUrl`. | 1 select (profile) + storage PUT + 1 upsert. | **O(q=2 + 1 network)** |
| `DELETE /horoscope` | Load profile + horoscope; storage delete; null the URL. | 2 selects + storage DELETE + 1 save. | **O(q=3 + 1 network)** |
| `GET /user/:id` (`getOtherProfile`) | **Contact-disclosure engine.** Resolve viewer tier; if not self: check `PhoneViewLog` for prior view (sticky access), else Gold→always discloses (+log), Silver→<10 views/month (count + log), Basic→hidden. Load target user (conditional PII exclusion), profile w/ 12 includes, photos. Enforce `Hidden`/`Members Only` visibility. Apply 6 privacy-setting field redactions. Mask phone. | Up to 6 sequential queries: tier (1), view-log lookup (1), monthly-count (1), view-log insert (1), user (1), profile-join (1), photos (1). | **O(q≈5–7)**; app-layer redaction O(1). Monthly view `count` is O(log n) if `viewerId` indexed. |
| `PATCH /privacy` | Whitelist 7 boolean privacy keys; merge into JSON; optional `profileVisibility`; save. | 1 select + 1 save. | **O(q=2)** |
| `GET /search` (gated) | **Most expensive read.** `searchFilterGating` middleware first checks tier vs requested filters. Then: resolve tier, load self (gender), build dynamic `where` across UserProfile + 8 includes; tier-gates which filters apply (caste = all tiers, advanced = Silver+, horoscope = Gold). `findAndCountAll(limit 50)`. Then one batched `Interest` lookup over the 50 target ids to flag `hasSentInterest`. Serialize 50. | gating(1) + tier(1) + self(1) + main multi-join count+select (2 internally) + interests batch (1). ~5–6 queries. | **O(q≈6)**; dominant = filtered multi-join over UserProfile scanning to fill `limit 50`. Unindexed filters (e.g. `iLike`) or wide joins push the main query toward **O(N)** table cost. App sort/serialize O(50). |
| `GET /viewers` (gated) | Silver+ only (else 403). Load up to 50 `ProfileView` for me, each with Viewer→Profile(+Religion,City)+photos. Serialize. | tier(1) + 1 multi-join select (limit 50). | **O(q=2)**; join cost ∝ 50 viewers. |
| `POST /caste-request` | Validate religion+name; dedupe vs master `Caste` (iLike) and vs pending `CasteRequest`; else create request. | up to 2 selects + 1 insert. | **O(q≤3)**; `iLike` exact (no leading `%`) → indexable. |
| `POST /subcaste-request` | Same pattern keyed by `casteId`. | up to 2 selects + 1 insert. | **O(q≤3)** |

**Hot spots:** `GET /search` and `GET /user/:id` are the two endpoints to watch — both combine tier resolution, wide joins, and conditional secondary queries. `createOrUpdateProfile` is write-heavy (7 round-trips) but bounded.

---

## 3. Matches (`/api/matches`)

| Method & Path | Business logic | DB work | Complexity |
|---|---|---|---|
| `GET /daily` | Load self for gender; fetch 10 opposite-gender `UserProfile` (+User, Religion, City, Education) ordered newest; batch-fetch my non-withdrawn `Interest` toward those 10 to set `hasSentInterest`; serialize and **sort by `matchScore` in app**. | self(1) + matches multi-join (1) + interests batch (1) = 3. | **O(q=3)**; app sort O(10 log 10). Note: match scoring is placeholder (serializer-computed), not a real ranking query. |

---

## 4. Interests (`/api/interests`)

| Method & Path | Business logic | DB work | Complexity |
|---|---|---|---|
| `GET /` (& `getInterests`) | Paginated list by `type` (received/sent/accepted/declined). Builds heavy includes (Sender/Receiver → Profile(+Religion,City,Education) + photos + active Subscription+Plan). `findAndCountAll`. Resolve requester tier to decide contact disclosure (Silver/Gold see contact). Map+serialize; optional premium-first sort in JS. | tier(1) + count+rows multi-join (2). ~3 queries. | **O(q=3)**; join width large for accepted/declined (both Sender+Receiver fully joined). App map/sort O(limit). |
| `POST /` & `POST /send` (`expressInterest`) | Validate target; block self; look up any existing interest (re-send allowed if WITHDRAWN/DECLINED/EXPIRED, blocked if PENDING/ACCEPTED). Resolve tier; **Basic Member capped at 5 interests/month** (count since month start). Create or revive record. | existing(1) + tier(1) + [Basic: count(1)] + write(1). ~3–4. | **O(q≈3–4)**; monthly `count` O(log n) on `senderId`. |
| `PATCH /:id/accept` | Load own PENDING interest; set ACCEPTED; `findOrCreate` a `Match` (either ordering). | select(1) + update(1) + findOrCreate(1–2). | **O(q≈3)** |
| `PATCH /:id/decline` | Load own PENDING interest; set DECLINED. | select(1) + save(1). | **O(q=2)** |
| `PATCH /:id/withdraw` | Load own PENDING (as sender); set WITHDRAWN. | select(1) + save(1). | **O(q=2)** |
| `DELETE /:id` | Load interest where I'm sender or receiver; hard-delete. | select(1) + delete(1). | **O(q=2)** |
| `GET /counts` | Four independent `count`s (received/sent pending, accepted, declined). | **4 sequential counts.** | **O(q=4)**; each O(log n). *Could be parallelized with `Promise.all`.* |
| `POST /:id/view` | Load received interest; set `viewedAt` once (idempotent). | select(1) + optional save(1). | **O(q≤2)** |
| `PATCH /:id/block` | Load interest where I'm a party; set BLOCKED. | select(1) + save(1). | **O(q=2)** |
| `POST /notify-call` | Load sender; check recipient active subscription tier; **only notify non-premium recipients** (create `CALL_ATTEMPT` notification). | sender(1) + recipientSub join(1) + optional insert(1). | **O(q≈3)** |

**Note:** `getInterestCounts` issues 4 serial round-trips; wrapping them in `Promise.all` would cut latency ~4×. (`adminController.getDashboardStats` already uses this pattern — worth mirroring.)

---

## 5. Subscription (`/api/subscription`)

| Method & Path | Business logic | DB work | Complexity |
|---|---|---|---|
| `GET /status` | Find active/cancelled_pending sub (endDate>now)+Plan; derive state label; **compute proration remaining value** `(remainingDays/totalDays)*price`. If none, find last sub → EXPIRED, else FREE. | 1 or 2 selects. | **O(q≤2)**; arithmetic O(1). |
| `POST /create-order` | Validate `planKey` against in-memory `PREMIUM_PLANS`; find current active sub for **proration deduction**; `finalPrice = max(0, price − deduction)`; create Razorpay order. | 1 select + 1 external Razorpay call. | **O(q=1 + 1 network)**; plan lookup is O(1) map. |
| `POST /verify-payment` | **Critical money path.** Recompute HMAC-SHA256 signature over `order|payment` and compare to `razorpay_signature`; validate plan; cancel existing active sub; create new `Subscription` (endDate = now+months); log `Payment`. | signature(CPU) + update(1) + insert(1) + insert(1). | **O(q=3)** + 1 HMAC. No transaction wrapping the 3 writes — see risks. |
| `POST /waitlist` | Insert `Waitlist` row (email, planName default "Elite Gold"). | 1 insert. | **O(q=1)** |

**Risk flag:** `verifyRazorpayPayment` performs cancel + sub-insert + payment-insert **without a DB transaction**; a mid-sequence failure can leave inconsistent state. Signature verification itself is correct (constant-string HMAC compare).

---

## 6. Master data (`/api/master`) — public, read-only

All 17 endpoints follow one shape: `Model.findAll({ where: { isActive: true } })` with an optional FK filter (`country_id`, `state_id`, `religion_id`, `caste_id`, `employment_type_id`, `currency_id`) or a sort (`heights`, `income-ranges`).

| Endpoints | Complexity |
|---|---|
| countries, states, cities, mother-tongues, religions, castes, subcastes, heights, educations, employment-types, occupations, currencies, income-ranges, stars, rasis, laknams, gothrams | **O(q=1)** each; **O(n)** in rows returned. Filtered variants are O(log n + k) if the FK is indexed. |

**Recommendation:** these are ideal cache candidates (static reference data, no auth, hit on every onboarding step). Consider HTTP cache headers / in-memory cache; currently each call is an uncached table read. Note also full-table reads have **no `limit`** — `cities`/`occupations` could grow unbounded.

---

## 7. Moderation (`/api/moderation`) — user-facing

| Method & Path | Business logic | DB work | Complexity |
|---|---|---|---|
| `POST /block` | Idempotent block: check existing (blocker,blocked); insert if absent. | select(1) + optional insert(1). | **O(q≤2)** |
| `POST /report` | Create `Report` (reporter, reported, reason). | 1 insert. | **O(q=1)** |
| `POST /success-story` | Find existing story between the two partners (either ordering via array match); update or create with validated wedding date. | select(1) + upsert(1). | **O(q=2)** |

---

## 8. Admin (`/api/admin`) — `protect` + `isAdmin`

| Method & Path | Business logic | DB work | Complexity |
|---|---|---|---|
| `GET /stats` | Dashboard: **7 aggregates in `Promise.all`** (total users, 7-day actives, today signups, active paid subs, today revenue SUM, pending caste + subcaste counts) + 1 tier-distribution `GROUP BY Plan.name`. | 8 queries, **7 parallel + 1**. | **O(q=2 round-trip waves)** thanks to `Promise.all`; each aggregate O(N) scan/index. Good pattern. |
| `GET /users` | Search (`iLike` over firstName/lastName/email/mobile) + paginate (`findAndCountAll`) + include UserProfile (status/strength) + latest Subscription+Plan. | count+rows multi-join (2). | **O(q=2)**; `iLike '%search%'` → **O(N) table scan** (not index-able due to leading wildcard). |
| `PATCH /users/:userId/status` | Load user by PK; set `isActive`. | select(1) + update(1). | **O(q=2)** |
| `GET /reports` | Paginated reports + Reporter/Reported user joins. | count+rows (2). | **O(q=2)** |
| `GET /moderation/pending` | All `UserProfile` with `approvalStatus=pending` (+User) and all pending `UserPhoto` (+User). | 2 selects. | **O(q=2)**; **no pagination / no limit** → O(N) and unbounded as backlog grows. |
| `PATCH /moderation/profile/:id/approve` | Load profile by PK; set approved, clear reason. | select(1)+update(1). | **O(q=2)** |
| `PATCH /moderation/profile/:id/reject` | Same, sets rejected + `moderationReason`. | select(1)+update(1). | **O(q=2)** |
| `PATCH /moderation/photo/:id/approve` | Load photo by PK; approve. | select(1)+update(1). | **O(q=2)** |
| `PATCH /moderation/photo/:id/reject` | Load photo by PK; reject. | select(1)+update(1). | **O(q=2)** |
| `GET /caste-requests` | List `CasteRequest` by status (+User, +Religion), newest first. | 1 multi-join select. | **O(q=1)**; **no limit** → O(N). |
| `PATCH /caste-requests/:id/approve` | Load pending request; reuse-or-create `Caste`; mark Approved+reviewer; **link requester's profile** to the caste. | select(1) + find/create(1–2) + update(1) + profile update(1). | **O(q≈4)** |
| `PATCH /caste-requests/:id/reject` | Mark request Rejected + reviewer. | select(1)+update(1). | **O(q=2)** |
| `PATCH /caste-requests/:id/merge` | Validate target caste exists; mark Approved + `mergedIntoCasteId`; relink requester profile. | select(1)+select(1)+update(1)+update(1). | **O(q=4)** |
| `GET /subcaste-requests` | Mirror of caste list keyed by `casteId`. | 1 multi-join select. | **O(q=1)**; no limit. |
| `PATCH /subcaste-requests/:id/approve` | Reuse-or-create `Subcaste`; approve; relink profile. | **O(q≈4)** | |
| `PATCH /subcaste-requests/:id/reject` | Mark Rejected. | **O(q=2)** | |
| `PATCH /subcaste-requests/:id/merge` | Validate target; merge; relink. | **O(q=4)** | |

---

## Big-O Notation Reference — Time & Space per Endpoint

**Variable legend**

| Symbol | Meaning |
|---|---|
| `N` | total rows in the table being scanned/filtered (grows with platform usage) |
| `k` | rows actually returned (bounded by `LIMIT` where one exists) |
| `j` | number of eager `include` (JOIN) associations expanded per row |
| `f` | number of dynamic filter fields supplied on a search request |
| `1` | constant — PK/unique lookup on an indexed column, or fixed-size payload |

**Assumptions:** PKs and FKs carry B-tree indexes → point lookups are `O(log N)`, treated as effectively `O(1)` per round-trip below. `iLike '%x%'` (leading wildcard) and filters on unindexed columns degrade to `O(N)` sequential scans and are flagged. Time = DB engine work + app-layer processing. Space = peak server-side memory for the result set being built/serialized (response streaming excluded).

### Auth
| Endpoint | Time | Space | Driver |
|---|---|---|---|
| `POST /register` | `O(log N)` + bcrypt | `O(1)` | 2 indexed lookups + 3 single-row inserts; bcrypt is fixed CPU |
| `POST /login` | `O(log N)` + bcrypt | `O(1)` | email lookup + 1 update |
| `GET /me` (probe) | `O(1)` | `O(1)` | no DB |
| `POST /change-password` | `O(log N)` + bcrypt×2 | `O(1)` | PK lookup + update |

### Profile
| Endpoint | Time | Space | Driver |
|---|---|---|---|
| `POST /draft` | `O(log N)` | `O(1)` | single upsert |
| `GET /draft` | `O(log N)` | `O(1)` | single indexed select |
| `PATCH /` (createOrUpdate) | `O(log N)` ×7 writes | `O(1)` | ≤7 single-row upserts in a txn; bounded |
| `GET /me` | `O(log N · j)`, `j≈12` | `O(j)` | one ~12-way JOIN on a single profile |
| `POST /photos` | `O(log N)` + network | `O(F)` (file buffer) | storage PUT dominates; buffer held in memory |
| `DELETE /photos/:id` | `O(log N)` + network | `O(1)` | ownership lookup + storage DELETE |
| `POST /horoscope` | `O(log N)` + network | `O(F)` | file buffer + upsert |
| `DELETE /horoscope` | `O(log N)` + network | `O(1)` | 2 lookups + storage DELETE |
| `GET /user/:id` | `O(log N · j)`, `j≈12` | `O(j)` | tier + view-log + ~12-way JOIN; redaction O(1) |
| `PATCH /privacy` | `O(log N)` | `O(1)` | lookup + save |
| `GET /search` | **`O(N · j + f)`** scan-bound; `O(k log k)` sort, `k≤50` | **`O(k · j)`**, `k≤50` | dynamic multi-JOIN filling `LIMIT 50`; unindexed filters → full scan |
| `GET /viewers` | `O(k · j)`, `k≤50` | `O(k · j)` | 50 viewers each JOINed to profile/photos |
| `POST /caste-request` | `O(log N)` | `O(1)` | dedupe lookups (iLike exact, indexable) + insert |
| `POST /subcaste-request` | `O(log N)` | `O(1)` | same shape |

### Matches
| Endpoint | Time | Space | Driver |
|---|---|---|---|
| `GET /daily` | `O(k · j)` + `O(k log k)` sort, `k=10` | `O(k · j)` | 10-row JOIN + batched interest lookup + in-app sort |

### Interests
| Endpoint | Time | Space | Driver |
|---|---|---|---|
| `GET /` | `O(k · j)` + `O(k log k)` opt. sort | `O(k · j)` | paginated list, wide Sender/Receiver JOINs |
| `POST /` `/send` | `O(log N)` | `O(1)` | existence + tier + (Basic) monthly count + 1 write |
| `PATCH /:id/accept` | `O(log N)` | `O(1)` | lookup + update + findOrCreate match |
| `PATCH /:id/decline` | `O(log N)` | `O(1)` | lookup + save |
| `PATCH /:id/withdraw` | `O(log N)` | `O(1)` | lookup + save |
| `DELETE /:id` | `O(log N)` | `O(1)` | lookup + delete |
| `GET /counts` | `O(log N)` ×4 serial | `O(1)` | 4 indexed counts (parallelizable) |
| `POST /:id/view` | `O(log N)` | `O(1)` | lookup + idempotent save |
| `PATCH /:id/block` | `O(log N)` | `O(1)` | lookup + save |
| `POST /notify-call` | `O(log N)` | `O(1)` | sender + recipient sub + optional insert |

### Subscription
| Endpoint | Time | Space | Driver |
|---|---|---|---|
| `GET /status` | `O(log N)` | `O(1)` | ≤2 indexed selects + O(1) proration math |
| `POST /create-order` | `O(log N)` + network | `O(1)` | active-sub lookup + Razorpay call; plan map O(1) |
| `POST /verify-payment` | `O(log N)` + HMAC | `O(1)` | constant HMAC + update + 2 inserts |
| `POST /waitlist` | `O(log N)` | `O(1)` | single insert |

### Master (×17, all same shape)
| Endpoint | Time | Space | Driver |
|---|---|---|---|
| `GET /*` (countries…gothrams) | `O(N)` read / `O(log N + k)` if FK-filtered | `O(N)` | full table read, **no LIMIT**; space grows with table |

### Moderation (user-facing)
| Endpoint | Time | Space | Driver |
|---|---|---|---|
| `POST /block` | `O(log N)` | `O(1)` | existence check + optional insert |
| `POST /report` | `O(log N)` | `O(1)` | single insert |
| `POST /success-story` | `O(log N)` | `O(1)` | lookup + upsert |

### Admin
| Endpoint | Time | Space | Driver |
|---|---|---|---|
| `GET /stats` | `O(N)` per aggregate, 7 in parallel | `O(1)` | counts/SUM/GROUP BY; wall-clock = slowest scan, not sum |
| `GET /users` | **`O(N)`** (iLike `%search%` scan) | `O(k · j)`, `k≤limit` | leading-wildcard search defeats index |
| `PATCH /users/:id/status` | `O(log N)` | `O(1)` | PK lookup + update |
| `GET /reports` | `O(log N + k · j)`, paginated | `O(k · j)` | bounded page + Reporter/Reported JOINs |
| `GET /moderation/pending` | **`O(N)`** unbounded | **`O(N)`** | no LIMIT; result set = full pending backlog |
| `PATCH .../profile/:id/approve\|reject` | `O(log N)` | `O(1)` | PK lookup + update |
| `PATCH .../photo/:id/approve\|reject` | `O(log N)` | `O(1)` | PK lookup + update |
| `GET /caste-requests` | **`O(N)`** unbounded | **`O(N)`** | no LIMIT; JOINs over all matching status |
| `PATCH /caste-requests/:id/approve` | `O(log N)` | `O(1)` | find-or-create caste + 2 updates |
| `PATCH /caste-requests/:id/reject` | `O(log N)` | `O(1)` | lookup + update |
| `PATCH /caste-requests/:id/merge` | `O(log N)` | `O(1)` | 2 lookups + 2 updates |
| `GET /subcaste-requests` | **`O(N)`** unbounded | **`O(N)`** | no LIMIT |
| `PATCH /subcaste-requests/:id/approve` | `O(log N)` | `O(1)` | find-or-create + 2 updates |
| `PATCH /subcaste-requests/:id/reject` | `O(log N)` | `O(1)` | lookup + update |
| `PATCH /subcaste-requests/:id/merge` | `O(log N)` | `O(1)` | 2 lookups + 2 updates |

### Big-O complexity classes at a glance

| Class | Endpoints | Note |
|---|---|---|
| **`O(1)` / `O(log N)` time, `O(1)` space** | all single-row CRUD: auth, draft, privacy, most interest/moderation/admin mutations, subscription writes | scale cleanly |
| **`O(log N · j)` time, `O(j)` space** | `GET /profile/me`, `GET /profile/user/:id` | bounded JOIN fan-out, single subject row |
| **`O(k · j)` time & space, `k` capped** | `GET /search` (k≤50), `GET /viewers` (50), `GET /interests` (page), `GET /daily` (10), `GET /reports`, `GET /admin/users` | safe because `LIMIT` caps `k` |
| **`O(N)` time AND `O(N)` space — unbounded** ⚠️ | `GET /moderation/pending`, `GET /caste-requests`, `GET /subcaste-requests`, all `GET /master/*` | **no `LIMIT`** — memory and latency grow linearly with data forever; top remediation priority |
| **`O(N)` time via scan, `O(k)` space** | `GET /admin/users`, parts of `GET /search`, `GET /admin/stats` | index/full-text would restore `O(log N)` |

> **Bottom line:** every *mutation* in the API is `O(log N)` time / `O(1)` space and scales fine. The only true scaling hazards are *read* endpoints with no `LIMIT` (the four ⚠️ groups above), which are `O(N)` in both time and space, plus the two `iLike '%…%'` searches that scan instead of seek.

---

## Cross-cutting observations & recommendations

### Complexity summary
- **Cheapest (O(q=1)):** all `/master/*` reads, draft save/get, report, waitlist.
- **Typical CRUD (O(q=2–4)):** most interest/moderation/admin mutations.
- **Heaviest reads (O(q≈5–7) with wide joins):** `GET /profile/search`, `GET /profile/user/:id`, `GET /profile/me`, `GET /interests`.
- **Heaviest writes (O(q≈7)):** `PATCH /profile/` (7-table transactional upsert).
- **Best parallelism:** `GET /admin/stats` (7-way `Promise.all`).

### Actionable items
1. **Parallelize serial counts.** `getInterestCounts` runs 4 sequential `count`s — wrap in `Promise.all` (mirror `getDashboardStats`) for ~4× latency win.
2. **Wrap payment writes in a transaction.** `verifyRazorpayPayment` does cancel→insert sub→insert payment with no atomicity guarantee.
3. **Add `limit`/pagination** to unbounded admin reads: `getPendingApprovals`, `getCasteRequests`, `getSubcasteRequests`, and the limitless `master` list reads (`cities`, `occupations`).
4. **Indexing for search.** `iLike '%search%'` in `adminController.getUsers` and the `searchProfiles` filters force table scans. Consider trigram (`pg_trgm`) indexes or full-text search if the user table grows.
5. **Cache master data.** 17 public, static, no-limit reads are hit repeatedly during onboarding — strong candidates for HTTP caching or an in-process TTL cache.
6. **N+1 / wide-join cost.** `searchProfiles`, `getInterests`, `getOtherProfile`, and `getMyProfile` each fan out to 8–12 eager `include`s. Row width and join multiplication — not query count — are the real cost; verify the FK columns used in `where`/`include` are indexed.

---

*This report reflects the controllers as written; complexity estimates assume standard B-tree indexes on primary keys and foreign keys. Confirm actual index coverage in the Sequelize model definitions / migrations for the O(log n) assumptions to hold.*
