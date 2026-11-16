// Noor Quran Academy — change the academy name and contact details here.
// Everything on the site reads from this one file.
export const SITE = {
  name: "Noor Quran Academy",
  tagline: "Learn Quran Online — 1-to-1 Live Classes for Kids & Adults",
  taglineUrdu: "Quran Online Seekhein — Bachon aur Baron ke liye 1-to-1 Live Classes",
  whatsappDisplay: "03127675565",
  whatsappIntl: "+92 312 7675565",
  whatsappLink: "https://wa.me/923127675565",
  // NOTE: this is the only WhatsApp number on the site — do not change it without the owner.
  email: "admissions@noorquranacademy.example",
  baseUrl: "https://www.noorquranacademy.example",
  // Owner must fill these in before taking real payments.
  // Students send money TO this bank account. The academy has NO
  // Wise / Payoneer / PayPal / Stripe account — the student sends from
  // their own Wise / Remitly app to the IBAN below.
  bank: {
    bankName: "[Your bank name — fill in Owner Dashboard > Settings]",
    accountTitle: "[Account title — fill in Owner Dashboard > Settings]",
    iban: "[IBAN — fill in Owner Dashboard > Settings]",
    swift: "[SWIFT code — fill in Owner Dashboard > Settings]",
  },
  plans: [
    {
      id: "basic",
      name: "Basic — 3 classes a week",
      classesPerWeek: 3,
      usd: 30,
      gbp: 25,
      pkr: null as number | null, // blank on purpose: "WhatsApp par poochein"
      features: ["1-to-1 live class", "30 minutes per class", "Flexible timing", "Monthly progress report"],
    },
    {
      id: "regular",
      name: "Regular — 5 classes a week",
      classesPerWeek: 5,
      usd: 50,
      gbp: 40,
      pkr: null as number | null,
      features: ["1-to-1 live class", "30 minutes per class", "Hifz tracker", "Flexible timing", "Weekly progress report", "AI revision planner"],
    },
  ],
  courses: [
    { slug: "noorani-qaida", name: "Noorani Qaida", urdu: "Noorani Qaida", age: "4–7 years", duration: "3–4 months", desc: "Learn the Arabic alphabet, joining letters and correct pronunciation from the very start. Best first course for kids." },
    { slug: "nazra-quran", name: "Nazra Quran", urdu: "Nazra Quran", age: "6+ years", duration: "6–12 months", desc: "Read the whole Quran fluently with correct Tajweed, with a qualified teacher listening to every lesson." },
    { slug: "hifz-quran", name: "Hifz Quran", urdu: "Hifz Quran", age: "7+ years", duration: "1–3 years", desc: "Memorise the Quran with a daily Sabaq / Sabqi / Manzil system, tracked para by para in the Hifz Tracker." },
    { slug: "tajweed", name: "Tajweed Course", urdu: "Tajweed", age: "8+ years", duration: "3–6 months", desc: "Master the rules of Tajweed — Makharij, Sifaat, Ghunnah, Madd — with practice and an AI quiz." },
    { slug: "tafseer", name: "Tafseer & Islamic Studies", urdu: "Tafseer", age: "10+ / Adults", duration: "Ongoing", desc: "Understand what you read: translation, Tafseer, daily duas, Namaz and Islamic manners for kids and adults." },
  ],
  countries: [
    { code: "uk", name: "United Kingdom", keyword: "Online Quran Classes for Kids UK", tz: "Europe/London", tzLabel: "UK time (GMT/BST)" },
    { code: "usa", name: "USA", keyword: "Learn Quran Online USA", tz: "America/New_York", tzLabel: "USA Eastern time" },
    { code: "canada", name: "Canada", keyword: "Hifz Quran Online Canada", tz: "America/Toronto", tzLabel: "Canada Eastern time" },
    { code: "australia", name: "Australia", keyword: "Online Quran Classes Australia", tz: "Australia/Sydney", tzLabel: "Australia Sydney time" },
  ],
  paymentMethods: [
    { id: "wise", name: "Wise — to bank account", note: "Student sends from their Wise app to the academy's bank IBAN. The academy has no Wise account and does not need one. Low fee, usually 1 day." },
    { id: "remitly", name: "Remitly — to bank account", note: "Student sends from Remitly (USA / UK) to the academy's bank account. The academy has no Remitly account and does not need one." },
    { id: "western-union", name: "Western Union", note: "Student sends by Western Union. The academy receives it in its bank account or as cash pickup. Student sends the MTCN number on WhatsApp." },
    { id: "bank-transfer", name: "Direct Bank Transfer (SWIFT / IBAN)", note: "Student sends directly from their bank to the academy's bank account using the IBAN and SWIFT code. Takes 2–3 days, fee is higher." },
    { id: "jazzcash", name: "JazzCash — Pakistan only", note: "Only for students inside Pakistan." },
    { id: "easypaisa", name: "EasyPaisa — Pakistan only", note: "Only for students inside Pakistan." },
  ],
};

export const WHATSAPP = SITE.whatsappLink;
