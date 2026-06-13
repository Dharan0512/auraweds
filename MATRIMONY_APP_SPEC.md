# Aura Weds — Full‑Fledged Matrimony App Specification

> A pricing‑driven product & engineering specification for building the complete
> Aura Weds matrimony platform, including the entitlement model, every feature
> module, the data model, API surface, and an exhaustive edge‑case catalogue.

**Status:** Living document · **Owners:** Product + Engineering
**Source of truth for tiers:** the in‑app "Elevate Your Matchmaking" upgrade modal and the landing‑page pricing section.

---

## 1. Product Overview

Aura Weds is a premium, trust‑first Indian matrimonial platform built on:

- **Verified profiles** (phone + government‑ID + selfie/photo verification)
- **Family‑assisted matchmaking** (trusted collaborators help shortlist)
- **Privacy‑first connections** (blurred photos, masked contact, granular visibility)
- **Compatibility & horoscope matching** (values, lifestyle, Star/Rasi/Dosham)
- **Tiered monetization** (Basic / Silver / Gold) sold in 3 / 6 / 12‑month terms

The platform spans three surfaces:

1. **Public landing** (marketing, SEO, pricing, sign‑up funnel)
2. **Member app** (dashboard, search, interests, chat, profile, upgrade)
3. **Admin console** (users, ID verifications, reported profiles, success stories, stats)

---

## 2. Roles & Personas

| Role | Description |
| --- | --- |
| **Guest** | Unauthenticated visitor on the landing page. |
| **Member** | Registered user with a tier (Basic / Silver / Gold). |
| **Profile owner (created‑for)** | Profile may be created for *Self, Daughter, Son, Sister, Brother, Relative, Friend*. The **manager** acts on behalf of the candidate. |
| **Family collaborator** | Invited trusted person who can shortlist / review with scoped permissions. |
| **Admin / Moderator** | Reviews verifications, handles reports, curates success stories, sees stats. |
| **System** | Schedulers (daily matches, counter resets, expiry), payment webhooks. |

---

## 3. Membership Tiers & Entitlements (Pricing Source of Truth)

### 3.1 Plans & pricing

| Tier | 3 Months | 6 Months | 12 Months | Billing |
| --- | --- | --- | --- | --- |
| **Basic Member** | ₹0 | ₹0 | ₹0 | Free, lifetime |
| **Silver** | ₹3,499 | ₹5,000 | ₹9,999 | Razorpay one‑time per term |
| **Gold** | ₹8,000 | ₹14,000 | ₹24,000 | Razorpay one‑time per term |

- **12‑month term** is marketed as **"Save 40%"**.
- **Elite Gold** is a future/concierge tier — **waitlist only** today (collect email, no checkout).
- All prices are **INR**, inclusive of applicable taxes display rules (show tax breakup on invoice).

### 3.2 Entitlement matrix

| Capability | Basic | Silver | Gold |
| --- | --- | --- | --- |
| Create verified profile | ✅ | ✅ | ✅ |
| Browse / receive daily matches | ✅ | ✅ | ✅ |
| **Interests sent** | **5 / month** | **Unlimited** | **Unlimited** |
| View **full** profiles (vs. teaser) | ❌ | ✅ | ✅ |
| **Photos** | Blurred | Full | Full |
| **Contact (phone) access** | ❌ | **10 / month** | **Unlimited** |
| Search filters | Basic: age, location, religion | + caste, education, income (advanced) | + Star/Rasi/Dosham, recently‑active, all Gold filters |
| **Chat** | Only after a mutual accept (limited) | Full | Unlimited |
| "Who viewed you" | ❌ | ✅ | ✅ |
| **Compatibility insight** (bands, not %) | ❌ | Match **band** (Good / Moderate) | Full **bands + reasons** ("why you match") |
| Horoscope matching (Star/Rasi/Dosham) | ❌ | ❌ | ✅ |
| Profiles matching your horoscope | ❌ | ❌ | ✅ |
| Priority search ranking | ❌ | ❌ | ✅ |
| Profile highlight badge | ❌ | ❌ | ✅ |
| "Who shortlisted you" | ❌ | ❌ | ✅ |
| Send reminder on stale sent interest | ❌ | ❌ | ✅ |
| **Profile boost** (jump to top, on‑demand) | ❌ | ❌ | ✅ (monthly allowance) |
| **Weekly featured placement** | ❌ | ❌ | ✅ |
| **AI profile optimization** (bio/photo/tips) | ❌ | ❌ | ✅ |
| **Relationship advisor consultation** | ❌ | ❌ | ✅ |
| **Dedicated / priority support** | ❌ | Standard | ✅ Priority |

> **Why Gold must feel materially better than Silver.** Silver already unlocks the
> "core usability" (full profiles & photos, advanced filters, unlimited interests, full
> chat). If Gold only adds horoscope + ranking + visibility, many users will stop at
> Silver. Gold therefore bundles **outcome‑accelerating, high‑perceived‑value** add‑ons —
> profile **boost**, **weekly featured placement**, **AI profile optimization**, a
> **relationship advisor**, and **priority support** — so Gold is positioned as
> "get married faster, with help", not just "more filters".

> **Single source of truth:** entitlements must be defined **once** server‑side (e.g. an
> `ENTITLEMENTS[tier]` map) and enforced on every protected endpoint. The client mirrors
> the same map only for UX gating (locks, upsells) — **never** for authorization.

### 3.3 Entitlement keys (canonical)

```
interests.monthlyCap        // Basic=5, Silver=∞, Gold=∞
contact.monthlyCap          // Basic=0, Silver=10, Gold=∞
photos.full                 // Basic=false, Silver=true, Gold=true
profile.full                // Basic=false (teaser), Silver=true, Gold=true
search.advancedFilters      // Silver+, Gold superset
search.horoscopeFilters     // Gold
chat.mode                   // Basic="acceptedOnly", Silver/Gold="full"
insight.whoViewedYou        // Silver+
insight.whoShortlistedYou   // Gold
insight.compatibilityBand   // Silver="band", Gold="band+reasons"  (NEVER a raw % to users)
ranking.priority            // Gold (recommendation boost weight)
profile.highlightBadge      // Gold
interest.reminder           // Gold
profile.boost               // Gold — on‑demand "jump to top", monthly allowance
profile.featuredPlacement   // Gold — weekly featured rotation
profile.aiOptimization      // Gold — AI bio/photo/profile suggestions
support.advisor             // Gold — relationship advisor consultation
support.priority            // Gold — dedicated/priority support queue
```

---

## 4. Entitlement Enforcement Rules

### 4.1 Counters (interests, contacts)

- **Window:** calendar **month** in the user's timezone (default `Asia/Kolkata`). Store both the
  counter value and the **window key** (`YYYY-MM`); reset lazily when the key changes (don't trust a cron alone).
- **Atomicity:** increment must be **transactional** with the action (send interest / reveal contact)
  to prevent double‑spend under concurrency. Use a DB constraint / atomic `UPDATE ... WHERE count < cap`.
- **Idempotency:** retried requests (same idempotency key) must not double‑count.
- **Unlimited (∞):** represented as `null`/`-1`; never compared with `<`.
- **Tier change mid‑month:** caps update immediately; **already‑consumed** count carries over
  (e.g. Basic used 4/5 → upgrades to Silver → now unlimited; if a paid user downgrades, cap shrinks but
  never goes negative — block further actions once over the new cap).
- **Display:** show remaining quota and reset date; warn at 80% and 100%.

### 4.2 Gating pattern

Every gated action returns a structured error the client can render as an **upsell**, not a generic failure:

```
403 {
  error: "UPGRADE_REQUIRED",
  feature: "contact.monthlyCap",
  currentTier: "Silver",
  requiredTier: "Gold",
  reason: "MONTHLY_LIMIT_REACHED" | "TIER_TOO_LOW",
  resetAt?: "2026-07-01T00:00:00+05:30"
}
```

- Client: open the **upgrade modal** pre‑scrolled to the required tier; never silently no‑op.
- Server: the gate is the authority. The client lock is cosmetic.

---

## 5. Feature Modules

### 5.1 Authentication & Account
- Email/password + **OTP (phone)** for sign‑up, login, and password reset (forgot‑password flow exists).
- JWT access token in `Authorization: Bearer`; refresh/rotation strategy; 401 → force re‑login.
- Account states: `active`, `paused/hidden`, `suspended` (by admin), `deleted` (soft).
- "Created for" relationship captured at sign‑up; drives copy ("for your daughter") and notifications.

### 5.2 Profile & Onboarding
- Multi‑step wizard: Basic info → Personal details → Religion/community → Education/career → Location → Partner preferences → Lifestyle → Photos → Horoscope.
- **Draft autosave**; resumable onboarding; completion meter (used on dashboard).
- Photos: upload, crop, reorder, set primary; **blur layer** for Basic viewers.
- Horoscope: chart image upload + structured Star/Rasi/Dosham fields.

### 5.3 Search & Discovery
- **Basic filters (all tiers):** age range, location (state/city), religion.
- **Advanced filters (Silver+):** caste, education, occupation, income, marital status, diet, height.
- **Gold filters:** Star/Rasi/Dosham, "recently active", "online now", profile strength, verified‑only, sort by compatibility/active/score.
- **Daily matches:** curated set per day; **Gold** profiles get **priority ranking** and a highlight badge.
- Locked filters render a blurred section with an upgrade overlay.

### 5.4 Interests (the pipeline)
- Tabs: **Received, Sent, Accepted, Declined, Blocked**.
- Actions: send, accept, decline, withdraw (sent), remove (from list), block, mark‑as‑viewed.
- **Basic:** 5 sends / month. **Silver/Gold:** unlimited.
- **Gold:** send reminder on a **stale** (>5 days) pending sent interest.
- Status lifecycle: `PENDING → ACCEPTED | DECLINED | WITHDRAWN | BLOCKED`.

### 5.5 Chat / Messaging
- **Basic:** chat **only** after a **mutual accept**, limited.
- **Silver/Gold:** full / unlimited messaging.
- Read receipts, typing, message retention, report/block from thread.
- A thread is created on **mutual accept**; closing/blocking archives it.

### 5.6 Contact Reveal
- **Basic:** no contact access (number masked everywhere).
- **Silver:** **10 reveals / month**; reveal consumes one quota unit and notifies the other party ("X wants to connect").
- **Gold:** unlimited reveals.
- Masking utility must never leak the raw number to the client when not entitled.

### 5.7 Compatibility — bands, **not** raw percentages

> **Why bands, not numbers.** Precise percentages are a trust liability. If the UI shows
> *John = 91%* and *Sarah = 48%*, but Sarah's match leads to a happy marriage and John's
> doesn't, users lose faith in the product. Numbers imply false precision the model can't
> guarantee. We therefore surface **qualitative bands**, never a public percentage.

- **Compatibility bands (member‑facing):**
  | Band | Meaning |
  | --- | --- |
  | **Excellent Match** | Strong alignment across most dimensions |
  | **Good Match** | Solid alignment with a few differences |
  | **Moderate Match** | Worth exploring; some gaps |
  | *(low alignment is simply not surfaced / deprioritized — we do not show "Poor Match")* |
- **Silver:** sees the **band** label only.
- **Gold:** sees the band **plus reasons** ("Why you match": shared values, lifestyle fit,
  family expectations, life goals, horoscope) + **horoscope matching** (Star/Rasi/Dosham) and
  "profiles matching your horoscope".
- **Internals:** the engine still computes a numeric score server‑side for ranking
  (§5.12), but it is **mapped to a band before it ever reaches the client**. The raw score,
  thresholds, and weights are **never** exposed (prevents gaming and false precision).
- **Band thresholds are tunable config**, versioned, and A/B‑testable without code changes.
- Bands degrade gracefully when data is incomplete (show "Getting to know you" instead of a misleading band).

### 5.8 Family‑Assisted Matchmaking
- Invite collaborators (parent/sibling) with **scoped permissions** (view, shortlist, note, chat‑review).
- Collaborator seats and capabilities can be tier‑influenced (configurable).
- Audit trail of collaborator actions; candidate can revoke access anytime.

### 5.9 Notifications
- In‑app bell + email/SMS/push for: new interest, accept, message, contact request, verification status, payment receipt, plan expiry reminders, reminder nudges.
- Respect per‑channel preferences and quiet hours.

### 5.10 Payments & Subscription (Razorpay)
- Plans keyed `"{Tier}-{Duration}"` (e.g. `Gold-12M`).
- Flow: create order → Razorpay checkout → **verify signature server‑side** → activate.
- **Proration** on upgrade (credit remaining value of current plan).
- **Downgrade** only takes effect **after current term expires**.
- States: `FREE`, `ACTIVE`, `EXPIRED`, (grace/cancelled as needed); `endDate` drives renew/expire UX.
- Webhooks reconcile success/failure independently of the client handler.

### 5.11 Admin Console
- **Dashboard:** total registered, total premium, pending approvals, monthly revenue, recent reports.
- **User management:** search, view, suspend, adjust tier, refund.
- **ID Verifications:** queue with approve/reject + reason.
- **Reported profiles:** triage, action (warn/suspend/ban), audit.
- **Success stories:** curate and publish (feeds landing).

### 5.12 Recommendation & Ranking Engine

> Today the flow is simply **Search → Match → Score**. That is filtering, not
> recommendation. To improve match quality over time we need a real ranking model with
> personalization. This section defines it.

**Ranking score (internal, never shown as a number):**

```
RankScore(viewer, candidate) =
      w1 · ProfileSimilarity      // static fit
    + w2 · Compatibility          // values / lifestyle / family / goals / horoscope
    + w3 · ActivityScore          // is the candidate actually responsive?
    + w4 · Recency                // recently active / recently joined freshness
    + w5 · TierBoost              // Gold priority + active Profile Boost (capped, see fairness)
    − penalties                   // already‑interacted, blocked, incomplete, far preference mismatch
```

- **Profile Similarity** — preference match + structured attributes (age, location, religion,
  caste, education, income, diet, height). Cosine/weighted similarity over a feature vector.
- **Compatibility** — the §5.7 dimensions; produces the band shown to users and a numeric
  contribution to ranking.
- **Activity Score** — login recency, response rate, accept rate, interests acted on. Rewards
  people likely to *respond*, reducing "dead profile" frustration.
- **Recency** — freshness boost for recently active / newly joined; decays over time.
- **Personalization (implicit feedback)** — learn from the viewer's own behavior: who they
  send interests to, view, shortlist, accept, decline → re‑weight future recommendations
  (e.g. they consistently engage with a certain age/education/city band).
- **TierBoost** — Gold ranking priority and on‑demand **Profile Boost** add weight, **capped**
  so paid placement can never fully bury an organically better match (see §8.14 fairness).

**Operational concerns**
- **Cold start** (new user, no behavior) → fall back to preference + popularity + recency until
  enough signal accrues.
- **Explainability** → store the top contributing factors so the UI can render "why suggested"
  (Gold) and so we can debug ranking.
- **Diversity / anti‑repetition** → don't show the same faces every day; rotate, exclude
  recently‑declined, and cap exposure of any single profile.
- **Daily matches** are this engine's output, deduped per day, with diversity guarantees.
- **Versioned weights + offline eval** → weights are config; evaluate changes against
  historical accept/marriage outcomes before rollout; A/B test.
- **Feedback loop guardrail** → personalization must not collapse into a filter bubble or
  amplify bias (caste/skin‑tone/income); apply fairness constraints and monitoring.

### 5.13 Premium Gold Value‑Adds (stronger differentiation)

To make Gold clearly worth more than Silver (see §3.2 rationale):

- **Profile Boost** — on‑demand "jump to the top of relevant searches/daily matches" for a
  fixed window (e.g. 24h); **monthly allowance** for Gold, metered like other quotas (§4.1).
- **Weekly Featured Placement** — automatic rotation into a curated "Featured" rail.
- **AI Profile Optimization** — AI‑generated bio suggestions, photo quality/order feedback,
  completeness nudges, and "how to improve your responses" tips.
- **Relationship Advisor Consultation** — scheduled session(s) with an advisor; bookable slots,
  reminders, no‑show handling.
- **Dedicated / Priority Support** — Gold support requests jump a priority queue with faster SLA.

Each add‑on is its own entitlement key (§3.3), metered where finite, and surfaced as a Gold
upsell when a lower tier attempts it.

---

## 6. Data Model (core entities)

```
User            id, email, phone, passwordHash, role, status, createdFor, isVerified, timezone
Profile         userId, basicDetails, professionalInfo, religion/caste, location/lifestyle,
                partnerPreferences, personalityTraits, horoscope{star,rasi,laknam,gothram,dosham,chartUrl},
                photos[], completion%, highlightBadge
Subscription    userId, tier, state, term(3M/6M/12M), startDate, endDate, lastTier, remainingValue
UsageCounter    userId, key(interests|contact|boost), windowKey(YYYY-MM), used, cap
Interest        id, senderId, receiverId, status, createdAt, viewedAt
Match           pairKey, rankScore(internal), band(Excellent|Good|Moderate), reasons[],
                computedAt, daily?:date          // band shown to users; rankScore never exposed
RankingSignal   userId, type(view|interest|shortlist|accept|decline|response),
                targetId, weight, at             // implicit feedback for personalization
ProfileBoost    userId, startAt, endAt, source(allowance|purchase), status
FeaturedSlot    userId, weekKey, rail, position
AdvisorSession  userId, advisorId, scheduledAt, status(booked|done|no_show|cancelled)
ProfileView     viewerId, viewedId, viewedAt
Shortlist       ownerId, profileId, by(self|collaborator), createdAt
Collaborator    candidateUserId, collaboratorUserId, permissions[], status
Message/Thread  threadId, participants[], messages[], state
Report          reporterId, targetId, reason, status, adminNotes
Verification    userId, type(phone|id|photo), status, documentRef, reviewedBy
Payment         userId, planKey, orderId, paymentId, amount, status, invoiceNo
MasterData      religions, castes, educations, occupations, incomeRanges, countries/states/cities,
                heights, mother‑tongues, stars, rasis, laknams, gothrams, currencies
AuditLog        actorId, action, entity, before/after, at
```

---

## 7. API Surface (representative)

```
Auth        POST /auth/register, /auth/login, /auth/otp/*, /auth/forgot, /auth/reset
Profile     GET/PATCH /profile/me, POST /profile/draft, /profile/photos, /profile/horoscope,
            GET /profile/user/:id, PATCH /profile/privacy
Search      GET /profile/search
Matches     GET /matches/daily, GET /profile/viewers
Interests   GET /interests?type=&page=&sortBy=, GET /interests/counts,
            POST /interests, /interests/:id/accept|decline|withdraw|remove|block|viewed, /notify-call
Subscription GET /subscription/status, POST /subscription/create-order, /verify-payment, /waitlist
Master      GET /master/* (cached)
Admin       GET /admin/stats, /admin/users, /admin/reports, /admin/moderation/pending,
            POST /admin/verifications/:id/approve|reject
```

All gated endpoints validate **tier + counter** server‑side and return the structured upsell error (§4.2).

---

## 8. Edge Cases (exhaustive)

### 8.1 Membership & entitlements
- Free user hits **5th interest** → 6th must be blocked with `MONTHLY_LIMIT_REACHED` + reset date.
- Silver hits **10th contact reveal** → 11th blocked; show Gold upsell.
- **Unlimited** tiers must never decrement or block on caps.
- **Mid‑cycle upgrade:** entitlements unlock immediately; consumed counters retained, caps lifted.
- **Downgrade scheduled:** user keeps Gold features until `endDate`, then snaps to lower caps; if already over the new cap, **no negative balance**, just blocked until next window.
- **Expired plan:** revert to Basic entitlements at `endDate`; previously revealed contacts/threads remain accessible (don't retroactively hide history) but **new** gated actions require re‑upgrade.
- **Tier check race:** plan expiring exactly as an action fires — evaluate entitlement against a single authoritative read inside the transaction.
- **Timezone boundary:** counter window must roll at local midnight; users traveling/changing TZ shouldn't get a free reset or double charge.
- **Clock skew / DST:** use server time + stored windowKey, never client time.

### 8.2 Payments (Razorpay)
- **Payment success but verify fails** (network) → webhook reconciles; never grant on client‑only signal.
- **Signature invalid / tampered** → reject, log, do not activate.
- **Double payment / double‑click** → idempotent order; second attempt returns existing order.
- **Webhook before client handler** (or vice‑versa) → activation is idempotent regardless of order.
- **Partial/late webhook** → pending state with reconciliation job; user sees "processing".
- **Refund / chargeback** → downgrade tier, adjust `endDate`, audit, revoke premium entitlements.
- **Proration math** on upgrade: credit `remainingValue`; never produce negative price; round to paise.
- **Currency/amount mismatch** between order and verify → reject.
- **Gateway down** → graceful error, retry guidance; no entitlement granted.
- **Plan price changed** while a stale checkout is open → re‑quote on order creation, not on the client.

### 8.3 Interests
- **Duplicate interest** to the same person → no‑op / "already sent", don't consume quota twice.
- **Interest to self** → blocked.
- **Mutual simultaneous sends** → collapse into a single accepted match (no duplicate thread).
- **Send → recipient blocks you** → interest suppressed; sender sees neutral state, not "blocked".
- **Accept after sender withdrew** → "no longer available".
- **Act on already‑actioned interest** (double accept/decline) → idempotent, last state wins safely.
- **Recipient account deleted/suspended** → hide from pipeline, free the sender's perception gracefully.
- **Reminder (Gold)** only on **stale pending sent** (>5 days) and rate‑limited (e.g. once per interest).
- **Pagination** while data changes → stable sort key to avoid skips/dupes.

### 8.4 Contact reveal & masking
- Entitled but recipient **hid contact** → reveal shows "hidden by user", **does not** consume quota.
- Number present but invalid/format issue → mask gracefully, log for cleanup.
- Reveal then immediate **block** by other party → revealed history stays, future blocked.
- Never send raw number in API payloads to non‑entitled clients (mask server‑side).
- Quota consumed only on **successful** reveal of an actual number.

### 8.5 Search & matching
- **No results** → empty state with concrete loosening suggestions (widen age, drop income, nearby cities).
- **Conflicting filters** (min age > max age, empty city list for chosen state) → validate & guide.
- **Locked filter used via API** by Basic/Silver → server ignores or 403 with upsell (don't leak Gold‑only results).
- **Stale master data** (deleted caste/city) on a saved filter → degrade gracefully.
- **Self in results** → always excluded.
- **Blocked users** never appear in each other's search/daily/matches.
- **Horoscope match (Gold)** when candidate lacks horoscope data → exclude or mark "incomplete", don't error.
- **Priority ranking** must not fully bury non‑Gold quality matches (fairness cap).

### 8.6 Profile & media
- **Incomplete profile** → reduced visibility; prompt completion; block certain actions until threshold.
- **Photo upload:** oversized/unsupported type/NSFW → reject with reason; virus/type sniffing server‑side.
- **All photos deleted** → fall back to themed avatar; never broken image.
- **Blur bypass attempt** (Basic requesting full image URL) → server returns blurred/forbidden variant.
- **Primary photo deletion** → auto‑promote next; never leave profile photoless in UI.
- **Editing during admin verification** → re‑queue for review; pending badge.

### 8.7 Verification
- ID/photo rejected → reason shown, re‑submit allowed, attempt limit + cooldown to prevent abuse.
- Verified then profile materially edited → re‑verification may be required.
- Verification expiry/renewal policy; manual admin override with audit.

### 8.8 Family collaborators
- Invite to a **non‑member** → invite flow with expiry; revoke pending invites.
- Collaborator **removed** mid‑session → permissions revoked immediately (server‑checked).
- Conflicting actions (candidate vs collaborator) → candidate decisions win; collaborator scoped to advisory unless granted.
- Privacy: collaborator must not see data beyond granted scope (e.g. masked contacts unless allowed).

### 8.9 Chat
- Message a user who **un‑matched/blocked** → send fails gracefully; thread archived.
- **Basic** trying to chat pre‑accept → blocked with explanation.
- Spam/abuse → rate limits, report, profanity/scam link filtering.
- Media in chat → same upload safety as profile photos.
- Ordering/dedup with retries; offline send queue.

### 8.10 Privacy & safety
- "Hide from search", block list, and "who can contact me" must be enforced on **every** read path.
- Screenshot/misuse signals → alert + easy report/block.
- Right to **pause** (instant invisibility) and **delete** (soft → purge per retention policy & legal).
- Data export (DPDP compliance) and consent records.

### 8.11 Notifications
- De‑duplicate bursts (e.g. many views) into digests.
- Respect channel prefs + quiet hours; never notify about your own actions.
- Expiry reminders at sensible cadence (e.g. T‑7, T‑1 days); stop after renewal.

### 8.12 Admin
- Two admins acting on the same report/verification → optimistic locking, last‑safe‑write + audit.
- Suspending a user mid‑transaction (e.g. during their payment) → reconcile cleanly.
- Stats must reconcile with payments ledger (revenue), counters, and user table.
- Bulk actions → confirm + audit + reversible where possible.

### 8.13 Platform / cross‑cutting
- **Auth expiry** mid‑action → preserve intent, re‑auth, resume.
- **Theme:** Violet Tech (dark) / Royal Gold (light) must not affect entitlements; persisted per user.
- **Responsive:** all gated UIs (filters, upgrade modal, pipeline) must work on mobile (drawers, sheets).
- **Empty/loading/error** states for every list and async surface.
- **Rate limiting** on OTP, search, interest, reveal, login (anti‑abuse).
- **Idempotency keys** on all mutating, money/quota‑affecting endpoints.
- **i18n/number/date** formatting (₹ Indian grouping, `en-IN`).
- **Accessibility:** keyboard, focus, ARIA, reduced‑motion, contrast in both themes.

### 8.14 Recommendation, ranking & compatibility bands
- **Raw % must never reach the client** — only the band (Excellent/Good/Moderate). Audit
  responses to ensure no numeric score leaks via APIs, logs, or "why suggested" text.
- **Band stability** — a profile shouldn't flip Excellent↔Moderate on every refresh; apply
  hysteresis/rounding so bands feel consistent across sessions.
- **Incomplete data** — candidate missing horoscope/values → don't fabricate a band; show
  "Getting to know you" and exclude from horoscope‑only (Gold) views rather than erroring.
- **Cold start** — brand‑new viewer with no behavior → preference + recency + popularity
  fallback; never an empty daily‑matches set.
- **Filter‑bubble / fairness** — personalization must not entrench bias (caste/skin‑tone/
  income) or only ever show one "type"; enforce diversity + fairness monitoring.
- **Paid‑placement fairness** — Gold **TierBoost/Profile Boost is capped**: a boosted but poor
  match can't outrank a clearly better organic match beyond a bounded margin; boosted results
  are labeled where required and still respect blocks/hidden/verified rules.
- **Anti‑repetition** — daily matches dedupe across days; recently declined are suppressed for
  a cooldown; no single profile is over‑exposed.
- **Self / blocked / hidden** — always excluded from recommendations and boosts.
- **Score↔band threshold change** — versioned config; changing thresholds must not retroactively
  invalidate sent interests or notifications tied to an old band.

### 8.15 Gold value‑adds (boost, featured, AI, advisor, support)
- **Profile Boost quota** — Gold boost allowance metered like other counters (§4.1); concurrent
  boosts don't stack beyond policy; boost during a plan that expires mid‑window ends with the plan.
- **Boost with an incomplete/unverified profile** — block or warn (boosting a weak profile wastes it).
- **Featured placement** when many Gold users qualify → fair rotation, capped slots, no
  permanent monopoly.
- **AI optimization** — never auto‑overwrite the user's bio without consent; suggestions are
  opt‑in; guard against unsafe/inappropriate generated content.
- **Advisor sessions** — booking conflicts, **no‑shows**, cancellations, reschedules, and
  timezone handling; revoke remaining sessions if Gold lapses (per policy).
- **Priority support** — when a Gold plan expires, open tickets keep their SLA but new ones
  drop to standard.

---

## 9. Non‑Functional Requirements

- **Security:** server‑authoritative entitlements; signed payment verification; no PII leakage to non‑entitled clients; encryption in transit & at rest; least‑privilege admin.
- **Privacy/Compliance:** DPDP‑aligned consent, export, deletion, retention; masked contacts; audit logs.
- **Performance:** cached master data; paginated lists; indexed search; Core Web Vitals on landing; lazy media.
- **Reliability:** idempotent payments/quotas; webhook reconciliation; graceful degradation when gateway/3rd‑party down.
- **Observability:** structured logs, metrics (conversion, quota hits, payment success), alerting.

---

## 10. Analytics & Funnel Events

```
signup_started/completed, profile_completion_%, verification_submitted/approved,
search_performed, filter_locked_viewed, daily_match_viewed, recommendation_served (+factors),
compatibility_band_viewed (band), match_reasons_viewed (Gold),
interest_sent (+limit_hit), interest_accepted, contact_reveal (+limit_hit),
chat_started, upgrade_modal_opened (feature, requiredTier),
boost_activated (+limit_hit), featured_placed, ai_optimization_used, advisor_session_booked/no_show,
checkout_started, payment_success/failed, plan_upgraded/downgraded/expired/renewed
```

Also track **ranking quality** offline: accept‑rate and marriage/success outcomes per band and
per ranking‑weight version, to tune the engine (§5.12) and validate the band thresholds (§5.7).

Primary funnel: **Guest → Sign‑up → Profile complete → Verified → Interest sent → Upgrade → Match → Success story.**

---

## 11. Acceptance Criteria (high‑level checklist)

- [ ] Entitlements defined once server‑side and enforced on every gated endpoint.
- [ ] Interest cap (Basic 5/mo) and contact cap (Silver 10/mo) enforced atomically with monthly reset.
- [ ] Gold horoscope/compat/ranking/badge/who‑shortlisted features behind Gold gate.
- [ ] Razorpay: server signature verification, proration on upgrade, downgrade‑after‑expiry, webhook reconciliation, idempotency, refunds.
- [ ] Photos blurred for Basic everywhere; contacts masked unless entitled; reveal consumes quota only on real number.
- [ ] Blocked/hidden/paused users excluded from all read paths.
- [ ] Every gated UI shows an upsell (not a dead end); upgrade modal deep‑links to required tier.
- [ ] **Compatibility shown only as bands** (Excellent/Good/Moderate); raw % never exposed in any API/log/UI.
- [ ] **Recommendation engine** ranks by ProfileSimilarity + Compatibility + ActivityScore + Recency with personalization, cold‑start fallback, diversity/anti‑repetition, and **capped** paid‑placement fairness.
- [ ] **Gold differentiation** live: Profile Boost (metered), weekly featured placement, AI profile optimization, advisor consultation, priority support — each gated + metered as defined.
- [ ] All edge cases in §8 (incl. §8.14 ranking/bands and §8.15 Gold add‑ons) covered by tests.
- [ ] Dark/light themes, full responsiveness, and accessibility verified across member + admin surfaces.

---

*This document is intentionally pricing‑first: any change to the tier matrix in §3 must
propagate to the server entitlement map, the upgrade modal, the landing pricing, and the
edge‑case tests in §8.*
