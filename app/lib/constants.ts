// ─── Site-wide configuration ─────────────────────────────────────────────────
export const SITE_CONFIG = {
  name: "MatchPoint",
  tagline: "Every Call Counts",
  description:
    "The platform built for Philippine basketball officials — get discovered, get booked, and get paid on time.",
  url: "https://matchpoint.ph",
} as const;

// ─── Navigation ──────────────────────────────────────────────────────────────
export const NAVIGATION_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Problem", href: "#problem" },
  { label: "Solutions", href: "#solutions" },
  { label: "Experience", href: "#experience" },
  { label: "Purpose", href: "#purpose" },
] as const;

// ─── Pain Points Section ─────────────────────────────────────────────────────
export const PAIN_POINTS = [
  {
    icon: "/images/Limited Opportunities.svg",
    title: "Limited Opportunities",
    body: "You are qualified, but organizers cannot find you. Weekends go empty while games are filled by officials with less experience.",
  },
  {
    icon: "/images/Scattered Communication.svg",
    title: "Scattered Communication",
    body: "Assignments arrive through personal messages, group chats, and phone calls. No record, no confirmation, no accountability.",
  },
  {
    icon: "/images/Manual Assignment Process.svg",
    title: "Manual Assignment Process",
    body: "After every game, the wait begins. Following up on payments takes more time than the game itself — and some never arrive.",
  },
  {
    icon: "/images/No Professional Profile.svg",
    title: "No Professional Profile",
    body: "Your certifications and experience exist only on paper. There is no digital profile to show leagues who you are and what you have achieved.",
  },
] as const;

// ─── Features Section ────────────────────────────────────────────────────────
// Icons are semantically matched to each feature (no duplicates).
export const FEATURES = [
  {
    icon: "/icons/user-plus.svg",
    title: "Verified Profile",
    body: "Build credibility with a digital resume of your certifications, experience, and complete game history.",
  },
  {
    icon: "/icons/calendar-x.svg",
    title: "Availability Calendar",
    body: "Set your available dates and block-out times so leagues can only book you when you are ready.",
  },
  {
    icon: "/icons/inbox.svg",
    title: "Game Alerts",
    body: "Get notified instantly when leagues in your area are looking for officials — never miss an opportunity.",
  },
  {
    icon: "/icons/wallet-outline.svg",
    title: "Payment Tracking",
    body: "Know exactly when you will get paid. Track every game fee with a dedicated earnings dashboard.",
  },
  {
    icon: "/icons/trending-up.svg",
    title: "Rating System",
    body: "Earn ratings from organizers after every game and build a reputation that gets you more bookings.",
  },
  {
    icon: "/icons/search.svg",
    title: "Performance Analytics",
    body: "Track your growth — games officiated, total earnings, ratings over time, and booking trends.",
  },
] as const;

// ─── How It Works Section ────────────────────────────────────────────────────
export const HOW_IT_WORKS_STEPS = [
  {
    icon: "/images/How MatchPoint Works for Officials 01.png",
    number: "01",
    text: "Create your verified profile with certifications, experience, and game history",
  },
  {
    icon: "/images/How MatchPoint Works for Officials 02.png",
    number: "02",
    text: "Get discovered by leagues and tournaments actively looking for qualified referees",
  },
  {
    icon: "/images/How MatchPoint Works for Officials 03.png",
    number: "03",
    text: "Accept and manage game assignments from one unified inbox",
  },
  {
    icon: "/images/How MatchPoint Works for Officials 04.png",
    number: "04",
    text: "Track your earnings, ratings, and build a reputation that gets you more games",
  },
] as const;

// ─── Social Proof / Testimonial Stats ────────────────────────────────────────
export const TESTIMONIAL_STATS = [
  { value: "500+", label: "Active Referees" },
  { value: "12,000+", label: "Games Officiated" },
  { value: "85", label: "Partner Leagues" },
] as const;

// ─── Organizers Pain Points ──────────────────────────────────────────────────
export const ORGANIZERS_PAIN_POINTS = [
  {
    icon: "/images/Finding Qualified Officials.svg",
    title: "Finding Qualified Officials",
    body: "Every game is a scramble. Finding qualified officials on short notice through personal networks is unpredictable and stressful.",
  },
  {
    icon: "/images/Time-Consuming Coordination.svg",
    title: "Time-Consuming Coordination",
    body: "Manual cash payments, informal agreements, and zero records. Tracking what you owe and who got paid is a full-time job.",
  },
  {
    icon: "/images/No Trusted Officiating Network.svg",
    title: "No Trusted Officiating Network",
    body: "You have no way to verify certifications before booking. Trusting the wrong official puts your event — and your reputation — at risk.",
  },
  {
    icon: "/images/Last-Minute Changes and Replacements.svg",
    title: "Last-Minute Changes & Replacements",
    body: "Officials cancel with no notice and no backup plan. Your event suffers, your league loses credibility, and you absorb the cost.",
  },
] as const;

// ─── Organizers Features ────────────────────────────────────────────────────
export const ORGANIZERS_FEATURES = [
  {
    icon: "/icons/people.svg",
    title: "Official Directory",
    body: "Browse a verified pool of certified basketball officials filtered by location, level, and availability.",
  },
  {
    icon: "/icons/wallet-outline.svg",
    title: "Seamless Payments",
    body: "Process official payments through the platform with complete records — no cash handling, no informal agreements.",
  },
  {
    icon: "/icons/search.svg",
    title: "Smart Matching",
    body: "Post your game requirements and get matched with available, qualified officials — no more cold calls.",
  },
  {
    icon: "/icons/trending-up.svg",
    title: "Rating & Reviews",
    body: "Rate officials after every game and build a trusted network of reliable referees you can count on.",
  },
  {
    icon: "/icons/calendar-x.svg",
    title: "Verified Credentials",
    body: "Every official on MatchPoint has verified certifications and a tracked record of games they have officiated.",
  },
  {
    icon: "/icons/inbox.svg",
    title: "Game Dashboard",
    body: "Manage all your upcoming games, referee assignments, and payment records from one central dashboard.",
  },
] as const;

// ─── Organizers How It Works ────────────────────────────────────────────────
export const ORGANIZERS_HOW_IT_WORKS_STEPS = [
  {
    icon: "/images/How MatchPoint Works for Organizers 01.png",
    number: "01",
    text: "Post your game with date, location, sport, and referee requirements",
  },
  {
    icon: "/images/How MatchPoint Works for Organizers 02.png",
    number: "02",
    text: "Browse verified officials, review ratings and certification history",
  },
  {
    icon: "/images/How MatchPoint Works for Organizers 03.png",
    number: "03",
    text: "Assign and confirm your referee lineup in one place",
  },
  {
    icon: "/images/How MatchPoint Works for Organizers 04.png",
    number: "04",
    text: "Track game fees, process payments, and rate officials after every game",
  },
] as const;

// ─── Marquee ─────────────────────────────────────────────────────────────────
export const MARQUEE_ITEM_COUNT = 8;
