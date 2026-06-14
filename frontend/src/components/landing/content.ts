/* Centralized landing-page content — easy to edit / wire to a CMS later */

export type ThemeKey = "rose" | "violet" | "gold" | "teal" | "blush" | "sky";

export const FEATURED_PROFILES: {
  name: string;
  age: number;
  profession: string;
  location: string;
  community: string;
  theme: ThemeKey;
  tags: string[];
}[] = [
  {
    name: "Aanya Sharma",
    age: 27,
    profession: "Pediatric Surgeon",
    location: "Bengaluru, KA",
    community: "Brahmin",
    theme: "rose",
    tags: ["ID Verified", "Family Approved"],
  },
  {
    name: "Rohan Mehta",
    age: 30,
    profession: "Product Manager",
    location: "Mumbai, MH",
    community: "Gujarati",
    theme: "violet",
    tags: ["ID Verified", "Premium"],
  },
  {
    name: "Diya Nair",
    age: 26,
    profession: "Architect",
    location: "Kochi, KL",
    community: "Nair",
    theme: "teal",
    tags: ["ID Verified", "Photo Verified"],
  },
  {
    name: "Arjun Reddy",
    age: 31,
    profession: "Investment Analyst",
    location: "Hyderabad, TS",
    community: "Reddy",
    theme: "gold",
    tags: ["ID Verified", "Family Approved"],
  },
  {
    name: "Ishita Verma",
    age: 28,
    profession: "UX Designer",
    location: "Pune, MH",
    community: "Agarwal",
    theme: "blush",
    tags: ["ID Verified", "Premium"],
  },
  {
    name: "Kabir Singh",
    age: 29,
    profession: "Civil Services",
    location: "New Delhi, DL",
    community: "Jat",
    theme: "sky",
    tags: ["ID Verified", "Photo Verified"],
  },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Create your verified profile",
    desc: "Sign up in minutes and complete a guided profile. Government-ID and photo verification earn you a trust badge that opens more doors.",
    icon: "UserPlus",
  },
  {
    step: "02",
    title: "Invite your family",
    desc: "Add parents or a sibling as trusted collaborators. They can shortlist, review, and bless conversations — together, privately.",
    icon: "Users",
  },
  {
    step: "03",
    title: "Discover compatible matches",
    desc: "Our compatibility engine surfaces partners aligned on values, lifestyle, community, and life goals — not just photos.",
    icon: "Sparkles",
  },
  {
    step: "04",
    title: "Connect, meaningfully",
    desc: "Express interest, unlock private chat, and move forward at your pace with privacy controls you fully command.",
    icon: "Heart",
  },
];

export const COMPATIBILITY_FACETS = [
  { label: "Shared values", value: 96 },
  { label: "Lifestyle fit", value: 91 },
  { label: "Family expectations", value: 88 },
  { label: "Life goals", value: 93 },
];

export const SUCCESS_STORIES = [
  {
    couple: "Priya & Aditya",
    location: "Married in Jaipur · 2024",
    theme: "rose" as ThemeKey,
    theme2: "violet" as ThemeKey,
    quote:
      "Our families connected on Aura Weds before we even spoke. By the time we met, it already felt like home.",
  },
  {
    couple: "Sneha & Vikram",
    location: "Married in Chennai · 2023",
    theme: "teal" as ThemeKey,
    theme2: "gold" as ThemeKey,
    quote:
      "The verification gave my parents the confidence to let me lead my own search. We found each other in six weeks.",
  },
  {
    couple: "Meera & Karthik",
    location: "Married in Hyderabad · 2024",
    theme: "blush" as ThemeKey,
    theme2: "sky" as ThemeKey,
    quote:
      "Compatibility insights showed us how aligned we were on the things that actually matter. Five years felt like five minutes.",
  },
];

export const PRIVACY_FEATURES = [
  {
    title: "Photo & contact protection",
    desc: "Blur photos by default and reveal only to connections you approve. Your number is never exposed.",
    icon: "EyeOff",
  },
  {
    title: "100% verified members",
    desc: "Every profile passes government-ID, phone, and selfie checks before it can appear in search.",
    icon: "BadgeCheck",
  },
  {
    title: "Bank-grade encryption",
    desc: "Conversations and documents are encrypted in transit and at rest with 256-bit AES.",
    icon: "Lock",
  },
  {
    title: "You control visibility",
    desc: "Hide your profile from colleagues, set who can contact you, and pause anytime — instantly.",
    icon: "SlidersHorizontal",
  },
  {
    title: "Screenshot & misuse alerts",
    desc: "We watch for suspicious behaviour and notify you, with one-tap block and report.",
    icon: "ShieldAlert",
  },
  {
    title: "Human safety team",
    desc: "A dedicated trust & safety team reviews reports around the clock — real people, fast.",
    icon: "LifeBuoy",
  },
];

export type DurationKey = "3M" | "6M" | "12M";

export const PLAN_DURATIONS: { id: DurationKey; label: string; badge?: string }[] = [
  { id: "3M", label: "3 Months" },
  { id: "6M", label: "6 Months" },
  { id: "12M", label: "12 Months", badge: "Save 40%" },
];

export const PLANS: {
  name: string;
  tagline: string;
  icon: "Zap" | "Shield" | "Crown";
  prices: Record<DurationKey, number>;
  highlight: boolean;
  features: string[];
  cta: string;
  comingSoon?: boolean;
}[] = [
  {
    name: "Basic Member",
    tagline: "Start your search",
    icon: "Zap",
    prices: { "3M": 0, "6M": 0, "12M": 0 },
    highlight: false,
    features: [
      "5 interests per month",
      "Basic search (age, location, religion)",
      "Blurred photos",
      "No contact access",
      "Limited chat (only if accepted)",
    ],
    cta: "Create free profile",
  },
  {
    name: "Silver",
    tagline: "Connect with intent",
    icon: "Shield",
    prices: { "3M": 3499, "6M": 5000, "12M": 9999 },
    highlight: true,
    features: [
      "Unlimited interests",
      "View full profiles",
      "Contact access (10 / month)",
      "Advanced filters (caste, education, income)",
      "View who viewed you",
      "Basic match percentage",
    ],
    cta: "Choose Silver",
  },
  {
    name: "Gold",
    tagline: "The complete experience",
    icon: "Crown",
    prices: { "3M": 8000, "6M": 14000, "12M": 24000 },
    highlight: false,
    comingSoon: true,
    features: [
      "Everything in Silver, plus",
      "Unlimited phone views",
      "Horoscope matching (Star / Rasi / Dosham)",
      "Priority search ranking & highlight badge",
      "Advanced compatibility score",
      "Unlimited messaging",
      "See who shortlisted you",
    ],
    cta: "Go Gold",
  },
];

export const TESTIMONIALS = [
  {
    name: "Lakshmi Iyer",
    role: "Mother of the bride · Coimbatore",
    theme: "gold" as ThemeKey,
    quote:
      "As a parent, I finally felt included without taking over. The collaboration tools were thoughtful and respectful.",
  },
  {
    name: "Aniket Joshi",
    role: "Premium member · Pune",
    theme: "violet" as ThemeKey,
    quote:
      "No fake profiles, no spam. Every conversation felt genuine because everyone is actually verified.",
  },
  {
    name: "Fatima Khan",
    role: "Premium member · Lucknow",
    theme: "blush" as ThemeKey,
    quote:
      "The privacy controls let me search on my own terms. I revealed my photo only when I was ready.",
  },
  {
    name: "Rahul & family",
    role: "Concierge member · Delhi",
    theme: "sky" as ThemeKey,
    quote:
      "Our relationship manager understood exactly what we were looking for. It felt personal, not transactional.",
  },
];

export const FAQS = [
  {
    q: "How does Aura Weds verify profiles?",
    a: "Every member completes phone, government-ID, and selfie verification before their profile can appear in search. Verified members earn a gold trust badge, and you can filter to see only verified profiles.",
  },
  {
    q: "Can my parents or family help with my search?",
    a: "Yes. You can invite trusted family members as collaborators. They can shortlist profiles, leave private notes, and review conversations you choose to share — all with permissions you control.",
  },
  {
    q: "Is my photo and personal information safe?",
    a: "Absolutely. Photos can be blurred by default and revealed only to people you approve. Your phone number is never shown, conversations are encrypted, and you can hide your profile from specific people anytime.",
  },
  {
    q: "What makes the compatibility matching different?",
    a: "Beyond filters, our compatibility engine weighs shared values, lifestyle, family expectations, and long-term goals to surface partners you are genuinely likely to build a life with — not just photos.",
  },
  {
    q: "Can I cancel or pause my membership?",
    a: "Yes, anytime. You can pause your visibility instantly or cancel a paid plan from your account settings with no hidden fees. Your data stays private and under your control.",
  },
  {
    q: "Is Aura Weds available across India?",
    a: "Yes. We welcome members across every state, community, and language, including Indians living abroad. Concierge matchmaking is available in major metros.",
  },
];
