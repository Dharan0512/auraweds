# Aura Weds — MVP Plan

> **Status:** Ready for execution
> **Target Launch:** Phase 1 (Core Platform)
> **Owner:** Product + Engineering

This document breaks down the Aura Weds MVP into four phased releases, each with a clear set of features, acceptance criteria, and success metrics. The full product spec is at `MATRIMONY_APP_SPEC.md`.

---

## Overview: 4-Phase Roadmap

| Phase | Focus | Duration | Target Users |
| --- | --- | --- | --- |
| **Phase 1** | Core platform (auth, profiles, search, interests, payments, contact reveal, admin) | 12 weeks | Early adopters; revenue-generating |
| **Phase 2** | Engagement (chat, verification, analytics) | 8 weeks | Existing users; churn reduction |
| **Phase 3** | Differentiation (horoscope, compatibility bands, AI ranking) | 10 weeks | Premium users; conversion lift |
| **Phase 4** | Premium add-ons (family collaborators, advanced matchmaking, concierge) | 12 weeks | Gold members; retention/LTV |

---

## Phase 1: Core Platform Launch (12 weeks)

**Goal:** Ship a revenue-generating matrimony platform with the core loop: sign-up → profile → search → interests → payment → contact reveal.

### Implementation Status

| Component | Status | Owner | Target |
| --- | --- | --- | --- |
| **1.1 Auth** | ✅ Complete | Backend | Week 2 |
| **1.2 Profile & Onboarding** | 🔄 In Progress | Frontend + Backend | Week 4 |
| **1.3 Search & Discovery** | ✅ Complete | Backend + Frontend | Week 5 |
| **1.4 Interests** | ✅ Complete | Backend + Frontend | Week 6 |
| **1.5 Contact Reveal** | ✅ Complete (Silver/Gold unlimited) | Backend + Frontend | Week 7 |
| **1.6 Payments** | 🔄 Razorpay Setup | Backend | Week 8 |
| **1.7 Admin Console** | 🎯 Planned | Frontend + Backend | Week 10 |
| **1.8 Entitlements & Gating** | 🔄 Ongoing | Backend | Week 8 |

### Features

#### 1.1 Authentication & Account (Weeks 1-2)
- [x] Email/password registration with OTP verification (SMS via Razorpay)
- [x] Login with OTP or password recovery (forgot-password flow)
- [x] JWT access tokens + refresh token rotation
- [x] Account states: `active`, `paused/hidden`, `suspended`, `deleted` (soft)
- [x] "Created for" relationship (self, daughter, son, relative) at sign-up
- [ ] Email verification on registration

**API:**
```
POST /auth/register           (email, phone, password, createdFor)
POST /auth/login              (email, password | OTP)
POST /auth/otp/send           (phone)
POST /auth/otp/verify         (phone, code)
POST /auth/forgot             (email)
POST /auth/reset              (token, password)
GET  /auth/me                 (verify JWT)
```

**Data Model:**
```
User {
  id, email, phone, passwordHash, role(member|admin),
  status(active|paused|suspended|deleted), createdFor, timezone,
  createdAt, updatedAt
}
```

**Acceptance Criteria:**
- [ ] OTP delivered within 10s; expires in 10 minutes
- [ ] Password reset link expires in 2 hours
- [ ] JWT refresh strategy (15min access, 7day refresh) implemented
- [ ] Phone + email uniqueness enforced
- [ ] Role-based routes gated (non-admin can't access /admin/*)
- [ ] Tests: duplicate registration, wrong OTP, expired token, role mismatch

---

#### 1.2 Profile & Onboarding (Weeks 2-4)
- [ ] Multi-step wizard: Basic info → Personal → Religion → Education → Location → Preferences → Lifestyle → Photos → Horoscope (draft)
- [ ] Draft autosave; resumable onboarding
- [ ] Completion meter (displayed on dashboard)
- [ ] Photo upload, crop, reorder, set primary
- [ ] Blur layer rendering for Basic tier (server-side masking)
- [ ] Horoscope: Star/Rasi/Dosham structured fields + chart image upload (Phase 2 verification)

**API:**
```
GET  /profile/me              (fetch current profile + completion %)
PATCH /profile/me             (update any step; auto-draft)
POST /profile/draft           (force save draft)
GET  /profile/user/:id        (public view, tier-gated photos/details)
POST /profile/photos          (upload, returns signed URL)
PATCH /profile/photos/:id     (crop, reorder, set primary, delete)
POST /profile/horoscope       (Star, Rasi, Dosham, chart image)
GET  /master/*                (religions, castes, educations, cities, stars, etc.)
```

**Data Model:**
```
Profile {
  userId, basicInfo{name, dob, gender}, personalDetails{bio, height, diet, marital},
  religion, caste, education, occupation, incomeRange, location{state, city},
  preferences{ageMin, ageMax, religions[], castes[], educations[]},
  lifestyle{values, familyType}, photos[{url, isPrimary, order}],
  horoscope{star, rasi, dosham, chartUrl}, completionPercent,
  isVerified, createdAt, updatedAt
}
PhotoBlur {  // for Basic tier caching
  profileId, originalUrl, blurredUrl, createdAt
}
```

**Acceptance Criteria:**
- [ ] All 9 steps stored in single transaction (multi-part form submission)
- [ ] Completion % calculated correctly (required fields only)
- [ ] Photo uploads validated (size, type, NSFW filter)
- [ ] Blur rendered server-side; Basic client never sees full URL
- [ ] Resume draft from any step
- [ ] Master data cached (Redis); invalidation on admin update
- [ ] Tests: incomplete profile, photo validation, blur logic, draft resume

---

#### 1.3 Search & Discovery (Weeks 4-5)
- [ ] **Basic filters** (all tiers): age range, location (state/city), religion
- [ ] **Advanced filters** (Silver+): caste, education, occupation, income, marital status, diet, height
- [ ] **Daily matches:** curated 10-15 profiles per day (random seed for MVP; ranking in Phase 3)
- [ ] Search results paginated (50 per page)
- [ ] Locked filter UI with upgrade upsell overlay
- [ ] Self-exclusion; blocked users never appear

**API:**
```
GET  /profile/search?age[min,max]=&location=&religion=&caste=&education=...&page=&limit=
GET  /matches/daily           (curated daily set)
GET  /matches/daily/:date     (historical)
```

**Data Model:**
```
DailyMatch {
  viewerId, profileId, date, seed, rank(tier:based)
}
SearchLog {  // for Phase 3 ranking signals
  userId, filters, resultCount, impressions[], at
}
```

**Acceptance Criteria:**
- [ ] Search returns results in <500ms (indexed on age, location, religion)
- [ ] Daily matches deduped per user per day (idempotent)
- [ ] Advanced filters return 403 `UPGRADE_REQUIRED` for Basic with correct error struct
- [ ] Blocked/hidden users filtered server-side
- [ ] Pagination stable sort key (createdAt DESC, then id)
- [ ] Tests: filter validation, locked filter error, pagination, dedup, performance

---

#### 1.4 Interests (Weeks 5-6)
- [x] Tabs: **Received, Sent, Accepted, Declined, Blocked**
- [x] Actions: send, accept, decline, withdraw (sent), remove, block, mark-as-viewed
- [x] **Basic:** 5 sends / month (calendar-month counter via `Interest.count`)
- [x] **Silver/Gold:** unlimited sends
- [x] Status lifecycle: `PENDING → ACCEPTED | DECLINED | WITHDRAWN | BLOCKED`
- [ ] Monthly reset at local midnight (currently UTC calendar month, not timezone-aware)
- [ ] Idempotency keys on send/accept/decline (DB has `unique_pending_interest`; no explicit key yet)

**API:**
```
GET  /interests?type=received|sent|accepted|declined|blocked&page=
GET  /interests/counts        (total per status)
POST /interests               (senderId, receiverId, idempotencyKey)
POST /interests/:id/accept    (idempotencyKey)
POST /interests/:id/decline   (idempotencyKey)
POST /interests/:id/withdraw  (idempotencyKey)
POST /interests/:id/remove    (idempotencyKey)
POST /interests/:id/block     (idempotencyKey)
POST /interests/:id/viewed    (idempotencyKey)
```

**Data Model:**
```
Interest {
  id, senderId, receiverId, status(PENDING|ACCEPTED|DECLINED|WITHDRAWN|BLOCKED),
  createdAt, viewedAt, updatedAt
}
UsageCounter {
  userId, key(interests|contact|boost), windowKey(YYYY-MM), used, cap, resetAt
}
```

**Acceptance Criteria:**
- [ ] 5th sent interest by Basic user blocked with `MONTHLY_LIMIT_REACHED` error; display reset date
- [ ] Counter incremented atomically in same txn as Interest INSERT (no race)
- [ ] Idempotency: duplicate send returns same Interest record, no double-increment
- [ ] Mutual simultaneous sends collapse into single ACCEPTED pair
- [ ] Send to self, already-blocked, or deleted recipient returns appropriate error
- [ ] Counter resets at local midnight on calendar month boundary (timezone-correct)
- [ ] Tests: quota limit, atomic counter, idempotency, mutual send, self-block, timezone boundary

---

#### 1.5 Contact Reveal (Weeks 6-7)
- [x] **Basic:** no contact access (phone always masked)
- [x] **Silver:** unlimited contact access on the interests page (full access — same as Gold)
- [x] **Gold:** unlimited contact access everywhere
- [x] Masking utility: never leak raw number to non-entitled (Basic) client
- [x] Contact disclosed inline in interest responses for Silver + Gold (no quota)

**Implementation:** Contact disclosure is handled inline in the interests serialization
rather than a separate reveal endpoint. `getInterests`
([interestController.ts](backend/src/controllers/interestController.ts)) sets
`shouldDiscloseContact = isGoldRequester || isSilverRequester`, and the existing
`maskPhoneNumber(user.mobile, includeContact)` in
[profileSerializer.ts](backend/src/serializers/profileSerializer.ts) returns the
real number for Silver/Gold and a masked number for Basic.

**Masking Utility (reused, no new code):**
```
// Server-side, in profileSerializer
maskPhoneNumber(mobile, includeContact) → includeContact ? mobile : "12345XXXXX"
// includeContact = (tier === "Silver" || tier === "Gold")
```

**Silver Membership Full Interests Access:**
```
1. Send interests:     UNLIMITED (vs Basic 5/month)
2. View contact info:  UNLIMITED — "Call Now" enabled on accepted cards (Basic: locked)
3. All interest actions: accept, decline, withdraw, block, remove (all tiers)
4. Mark as viewed:     Yes (all tiers)
5. Send & receive messages: Full mode (vs Basic acceptedOnly) — Phase 2
```

**Acceptance Criteria:**
- [x] Basic users see masked numbers everywhere; no API leaks raw number
- [x] Silver users get unlimited contact access on the interests page (no quota)
- [x] Gold users get unlimited contact access (unchanged)
- [x] "Call Now" button enabled for Silver + Gold; masked + upsell for Basic
- [x] Silver members can perform ALL interest actions without restrictions
- [ ] Tests: masking by tier, Silver disclosure, Basic lockout

---

#### 1.6 Payments & Subscription (Weeks 7-8)
- [ ] Plans: Basic (free), Silver (3M/6M/12M), Gold (3M/6M/12M) — Gold hidden as "Coming Soon" for MVP
- [ ] Razorpay integration: order creation → checkout → signature verification
- [ ] Proration on upgrade (credit remaining value of current plan)
- [ ] Downgrade only after current term expires
- [ ] States: `FREE`, `ACTIVE`, `EXPIRED`; `endDate` drives renewal UX
- [ ] Webhook reconciliation independent of client handler
- [ ] Invoice generation + email receipt

**API:**
```
GET  /subscription/status     (tier, state, endDate, remainingValue)
POST /subscription/create-order (planKey: "Silver-6M", idempotencyKey)
     → returns { keyId, orderId, amount, currency }
POST /subscription/verify-payment
     (razorpay_order_id, razorpay_payment_id, razorpay_signature, planKey)
     → returns { message, tier, endDate }
POST /subscription/waitlist   (email, tier: "Elite Gold")  // future
GET  /subscription/invoice/:id (PDF)
```

**Data Model:**
```
Subscription {
  userId, tier(Basic|Silver|Gold), state(FREE|ACTIVE|EXPIRED),
  term(3M|6M|12M), startDate, endDate, lastTier, remainingValue,
  autoRenewal(boolean), createdAt, updatedAt
}
Payment {
  userId, planKey, orderId, paymentId, amount, currency, status(pending|success|failed),
  signature, invoiceNo, invoiceUrl, createdAt
}
WaitlistEntry {
  email, tier(EliteGold), subscribedAt
}
```

**Razorpay Integration:**
```
// On /create-order:
1. Calculate amount (handle proration)
2. Create order via Razorpay API
3. Store order in DB with status=pending
4. Return keyId, orderId, amount to client

// On /verify-payment:
1. Fetch order from Razorpay
2. Validate signature: SHA256(orderId|paymentId|secret) == signature
3. Mark Payment as success; activate Subscription
4. Generate invoice; email receipt
5. Publish event for onboarding/CRM

// On Webhook (async reconciliation):
1. Validate signature
2. Upsert Payment; mark Subscription active
3. Handle failures (e.g. chargeback → downgrade)
```

**Acceptance Criteria:**
- [ ] Signature validation mandatory; invalid/tampered requests rejected + logged
- [ ] Proration: upgrade mid-month credits unused balance; never negative amount
- [ ] Order creation idempotent (stale order = re-use, not double-charge)
- [ ] Webhook + client handler both idempotent; activation safe regardless of order
- [ ] Payment success but verify fails → webhook reconciles (user sees "processing")
- [ ] Downgrade → state changes to `EXPIRED`; new features unavailable after `endDate`
- [ ] Invoice generated with tax details; sent via email
- [ ] Tests: signature validation, proration math, idempotency, webhook order, downgrade

---

#### 1.7 Admin Console (Weeks 8-10)
- [ ] **Dashboard:** total registered, paid members, pending verifications, revenue, recent reports
- [ ] **User management:** search, view profile, suspend, adjust tier, soft delete
- [ ] **Verification queue:** approve/reject phone & ID (photo verification Phase 2)
- [ ] **Reported profiles:** triage, action (warn/suspend/ban), audit trail
- [ ] **Success stories:** curate and publish (feeds landing page)
- [ ] **Subscription/payments:** view, refund (triggered by stripe, updates entitlements)

**API:**
```
GET  /admin/stats             (users, paid, pending, revenue, reports)
GET  /admin/users?search=&tier=&status=&page=
POST /admin/users/:id/suspend (reason)
POST /admin/users/:id/unsuspend
POST /admin/users/:id/adjust-tier (newTier)
POST /admin/users/:id/delete  (soft)
GET  /admin/verifications?status=pending|approved|rejected&page=
POST /admin/verifications/:id/approve (reviewedBy)
POST /admin/verifications/:id/reject (reason, reviewedBy)
GET  /admin/reports?status=pending|resolved&page=
POST /admin/reports/:id/action (action: warn|suspend|ban, notes)
GET  /admin/stories?published=true|false&page=
POST /admin/stories           (userId, story, images[])
PATCH /admin/stories/:id      (story, images[], published)
GET  /admin/payments?page=
POST /admin/payments/:id/refund (amount, reason)
```

**Data Model:**
```
Verification {
  userId, type(phone|id), status(pending|approved|rejected), documentRef(S3 URL),
  reviewedBy(adminId), reason, attemptCount, lastAttemptAt, createdAt, updatedAt
}
Report {
  id, reporterId, targetId, reason(abuse|fake|spam|harassment|nsfw),
  status(pending|resolved), adminAction(none|warn|suspend|ban), adminNotes, at
}
SuccessStory {
  id, userId1, userId2, story, images[], published(boolean), publishedAt, createdAt
}
AuditLog {
  id, actorId(adminId), action, entity(user|profile|subscription|report|story),
  entityId, before, after, at
}
```

**Acceptance Criteria:**
- [ ] Admin routes require `role=admin` middleware + audit every action
- [ ] Dashboard stats reconcile with actual data (not stale cache)
- [ ] Suspend user → all gated endpoints return 403 with message "Account suspended"
- [ ] Adjust tier → Subscription updated; counter caps reset immediately
- [ ] Refund → Payment marked refunded; Subscription reverted; entitlements revoked
- [ ] Two admins acting on same report → optimistic locking (last-safe-write)
- [ ] All actions logged in AuditLog (actorId, action, before/after, timestamp)
- [ ] Tests: auth gating, audit, stats reconciliation, tier adjustment, refund flow

---

#### 1.8 Tier Entitlements & Gating (Weeks 4-8, ongoing)
- [ ] Entitlements defined once server-side; client mirrors for UX only
- [ ] Every gated endpoint checks tier + counter; returns structured error on failure

**Server Entitlements Map:**
```
ENTITLEMENTS = {
  "Basic Member": {
    interests: { monthlyCap: 5 },
    contact: { monthlyCap: 0 },
    photos: { full: false },
    profile: { full: false },
    search: { advancedFilters: false },
    chat: { mode: "acceptedOnly" },
    insight: { whoViewedYou: false }
  },
  "Silver": {
    interests: { monthlyCap: null },  // unlimited = null
    contact: { monthlyCap: 10 },
    photos: { full: true },
    profile: { full: true },
    search: { advancedFilters: true },
    chat: { mode: "full" },
    insight: { whoViewedYou: true }
  },
  "Gold": {
    interests: { monthlyCap: null },
    contact: { monthlyCap: null },
    photos: { full: true },
    profile: { full: true },
    search: { advancedFilters: true, horoscopeFilters: true },
    chat: { mode: "full" },
    insight: { whoViewedYou: true, whoShortlistedYou: true }
  }
}

// Gating pattern on protected endpoints:
checkEntitlement(userId, "interests.monthlyCap") {
  tier = getTier(userId)
  cap = ENTITLEMENTS[tier]["interests"]["monthlyCap"]
  if (cap !== null) {
    counter = getUsageCounter(userId, "interests", currentMonthKey)
    if (counter.used >= cap) {
      throw {
        status: 403,
        error: "UPGRADE_REQUIRED",
        feature: "interests.monthlyCap",
        currentTier: tier,
        requiredTier: (cap < 10) ? "Silver" : null,
        reason: "MONTHLY_LIMIT_REACHED",
        resetAt: resetDate
      }
    }
  }
}
```

**Acceptance Criteria:**
- [ ] Entitlements map is single source of truth (config-driven, not hardcoded)
- [ ] Every gated endpoint validates server-side; never trust client tier claim
- [ ] Upgrade/downgrade mid-month updates caps immediately
- [ ] Errors return structured upsell (not generic 403)
- [ ] Client mirrors ENTITLEMENTS for lock UI only; never for authz
- [ ] Tests: tier gating, mid-month upgrade, downgrade after-expiry, counter interaction

---

### UI/UX (Landing + App)

#### Landing Page
- [ ] Hero: "Find your perfect match" with CTA "Create free profile"
- [ ] Pricing section: Silver + Gold (Gold shown as "Coming Soon")
- [ ] Trust bar: "100% verified profiles", "Verified-only search", "Privacy first"
- [ ] How it works: sign-up → profile → search → interests → match
- [ ] FAQ, testimonials, footer
- [ ] Dark (Violet Tech) + Light (Royal Gold) themes

#### App (Member)
- [ ] **Onboarding:** multi-step wizard with progress bar
- [ ] **Dashboard:** profile completion, today's matches, interests count, tier badge
- [ ] **Search:** filters, results grid, each profile card shows basic + blur (Basic) or full (Silver+)
- [ ] **Interests:** tabs + list, send/accept/decline/withdraw actions
- [ ] **Contact reveal:** "View phone" button (gated, shows upsell if limit reached)
- [ ] **Settings:** profile privacy, notification prefs, upgrade modal, logout
- [ ] **Upgrade modal:** 3 cards (Basic/Silver/Gold); Gold disabled with "Coming Soon"

---

### Testing Strategy

| Area | Approach |
| --- | --- |
| **Unit** | Services, utilities, entitlements map, counter logic |
| **Integration** | Auth flow, payment (Razorpay sandbox), counter atomicity, quota reset |
| **E2E** | Sign-up → onboarding → search → send interest → upgrade → reveal contact |
| **Admin** | User suspend, tier adjustment, refund, audit log |
| **Performance** | Search <500ms; daily matches load in <2s |
| **Security** | JWT refresh, password hash, signature validation, blur bypass attempts |
| **Edge cases** | Mid-month upgrade, counter reset at TZ boundary, double-payment idempotency |

### Phase 1 Success Metrics

- [ ] Sign-up completion rate: >60%
- [ ] Profile completion rate: >70%
- [ ] First interest sent within 48h: >40%
- [ ] Payment success rate: >95% (no signature failures)
- [ ] Search response time: <500ms (p95)
- [ ] Zero manual refunds (payment integrity)
- [ ] Admin audit: 100% of suspensions logged
- [ ] DAU growth: 500 → 2000 over 12 weeks

---

## Phase 2: Engagement & Verification (8 weeks, start Week 8)

**Goal:** Keep users active and connected; build trust via verification.

### Features

#### 2.1 Chat / Messaging
- [ ] Full messaging between matched pairs (after mutual accept)
- [ ] Read receipts, typing indicators
- [ ] Rate limits (spam prevention)
- [ ] Profanity/link filtering
- [ ] Report/block from thread
- [ ] Offline send queue (optimistic UI)

#### 2.2 Photo Verification (ID + Selfie)
- [ ] ID upload & admin review queue
- [ ] Selfie matching (future: ML-based liveness check)
- [ ] Verified badge on profile
- [ ] Verified-only search filter
- [ ] Rejection with reason; re-submit allowed
- [ ] Attempt limits + cooldown

#### 2.3 Premium Analytics
- [ ] "Who viewed you" (Silver+)
- [ ] "Who shortlisted you" (Gold)
- [ ] Daily match trend (user dashboard)
- [ ] Interest acceptance rate
- [ ] Profile strength gauge

**Success Metrics:**
- [ ] Chat thread creation on accept: >80%
- [ ] Verified profiles: >60%
- [ ] Message volume: 10+ per matched pair
- [ ] Churn reduction: <5% MoM

---

## Phase 3: Differentiation & Ranking (10 weeks, start Week 16)

**Goal:** Improve match quality; justify Premium tier via superior recommendations.

### Features

#### 3.1 Compatibility Engine & Bands
- [ ] Compatibility dimensions: values, lifestyle, family, goals, horoscope
- [ ] Band mapping: numeric score → Excellent / Good / Moderate (never % to users)
- [ ] Silver: shows band only
- [ ] Gold: band + reasons ("Why you match")
- [ ] Cold start: preference + popularity fallback

#### 3.2 Horoscope Matching (Gold)
- [ ] Star/Rasi/Dosham matching algorithm
- [ ] "Profiles matching your horoscope" filter
- [ ] Dosham analysis + compatibility impact
- [ ] Display to Gold only; filter locked for Silver

#### 3.3 Ranking & Recommendation Engine
- [ ] Scores: ProfileSimilarity + Compatibility + ActivityScore + Recency + TierBoost
- [ ] Personalization: learn from user behavior (sends, accepts, declines)
- [ ] Diversity: avoid repetition; rotate candidates
- [ ] Fairness cap: Gold TierBoost can't bury organically better matches
- [ ] Daily matches: curated output of ranking engine

**Success Metrics:**
- [ ] Accept rate: +15% vs Phase 1 (better matches)
- [ ] Gold conversion: 20% of Silver users → Gold
- [ ] Band stability: <10% flip between sessions (no jitter)
- [ ] Match success rate: track marriages/connections via analytics

---

## Phase 4: Premium & Family (12 weeks, start Week 26)

**Goal:** Maximize Gold LTV; enable family-assisted search.

### Features

#### 4.1 Gold Value-Adds
- [ ] **Profile Boost:** on-demand "jump to top"; monthly allowance
- [ ] **Weekly Featured Placement:** automated rotation into featured rail
- [ ] **AI Profile Optimization:** bio suggestions, photo feedback
- [ ] **Relationship Advisor Consultation:** bookable sessions, reminders
- [ ] **Priority Support:** dedicated queue, faster SLA

#### 4.2 Family Collaborators
- [ ] Invite parent/sibling as collaborator
- [ ] Scoped permissions: view, shortlist, note, chat-review
- [ ] Audit trail of collaborator actions
- [ ] Revoke access anytime
- [ ] Family-assisted matching UI

#### 4.3 Advanced Matchmaking (Concierge foundation)
- [ ] Advisor-curated matches
- [ ] Preference refinement via consultation
- [ ] Manual match notifications

**Success Metrics:**
- [ ] Gold retention: >80% (monthly)
- [ ] Gold ARPU: 2x Silver (value perceived)
- [ ] Collaborator adoption: >40% of Gold users
- [ ] Advisor utilization: >60% of booked sessions converted to contact reveal

---

## Rollout & Risk Mitigation

### Deployment Strategy
1. **Week 1-12:** Phase 1 MVP on staging; weekly demos to stakeholders
2. **Week 10:** Public beta (invite 100 early testers; shadow production)
3. **Week 12:** General availability (production launch)
4. **Week 13+:** Phase 2 incremental rollout; feature flags on advanced features

### Risks & Mitigations

| Risk | Mitigation |
| --- | --- |
| Payment signature exploits | Manual audit of early transactions; Razorpay webhook reconciliation always active |
| Tier cap enforcement bugs | Comprehensive counter tests; feature flag to disable Silver/Gold briefly if needed |
| Low signup conversion | Landing page A/B test (hero, pricing emphasis); referral incentive |
| Verification queue bottleneck | Admin hiring; self-serve phone OTP auto-approval |
| Daily match cold start | Fallback to preference + popular + new profiles until ranking live |
| Photo blur bypass | Server-side only; never send full URL to Basic client; image proxy layer |

---

## Acceptance Checklist: Phase 1 Complete

- [ ] All features in §1.1–1.8 shipped and tested
- [ ] Entitlements enforced on every gated endpoint
- [ ] Payment signature verification + webhook reconciliation live
- [ ] Photos blurred for Basic; contacts masked unless entitled
- [ ] Interest quota (Basic 5/mo, Silver+) enforced atomically
- [ ] Admin audit logs complete
- [ ] Compatibility bands hidden (Phase 3); relevance TBD
- [ ] Themes (dark/light) functional; responsive across mobile/web
- [ ] All edge cases in spec §8 covered by tests
- [ ] Performance targets met (search <500ms, daily match <2s)
- [ ] Privacy: blocked/hidden/paused users excluded from all reads
- [ ] i18n: ₹ INR grouping, `en-IN` date/time, phone +91
- [ ] Accessibility: WCAG 2.1 AA on public areas; keyboard nav on member app

---

## Appendix: Effort Estimates

| Component | Effort | Owner |
| --- | --- | --- |
| Auth + Account | 40h | Backend |
| Profile + Onboarding UI | 60h | Frontend |
| Profile + Storage | 30h | Backend |
| Search + Filters | 50h | Backend + Frontend |
| Daily Matches (seed-based) | 20h | Backend |
| Interests (counters + atomicity) | 50h | Backend |
| Contact Reveal + Masking | 30h | Backend |
| Razorpay Integration | 40h | Backend |
| Payment Webhook + Reconciliation | 30h | Backend |
| Admin Console UI | 70h | Frontend |
| Admin API + Audit | 60h | Backend |
| Entitlements Map + Gating | 50h | Backend |
| Landing Page | 80h | Frontend |
| Member App UI (Dashboard, Search, Interests, Settings) | 120h | Frontend |
| Theming (Dark/Light) | 30h | Frontend |
| Testing (Unit, Integration, E2E, Admin) | 150h | QA + Backend |
| Deployment + DevOps | 40h | DevOps |
| **Total** | **~950h** | **~12 weeks @ 80h/week** |

---

## Next Steps

1. **Week 1:** Kick off Phase 1 kickoff; finalize designs with Product
2. **Week 2:** Backend skeleton (auth, user model, DB schema)
3. **Week 3:** Frontend setup (Next.js, components, landing design)
4. **Week 4:** Auth flows tested; profile onboarding drafted
5. **Week 6:** Search + interests MVP; Razorpay sandbox integration
6. **Week 8:** Admin console; full entitlements testing
7. **Week 10:** Beta launch; early user feedback
8. **Week 12:** General availability
9. **Week 13:** Phase 2 planning; chat implementation kickoff

---

**Document Version:** 1.0
**Last Updated:** 2026-06-13
**Next Review:** Weekly standup (Fridays 10 AM IST)
