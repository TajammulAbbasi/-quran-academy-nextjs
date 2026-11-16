// Blog articles for Noor Quran Academy — SEO content for parents in the
// UK, USA, Canada and Australia. Honest, practical guides: no keyword
// stuffing, no fake claims, no invented results.
export type BlogSection = { h: string; ps: string[]; list?: string[] };
export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  minutes: number;
  intro: string;
  sections: BlogSection[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-learn-quran-online-for-kids",
    title: "How to Learn Quran Online for Kids — A Parent's Guide",
    description:
      "How kids learn Quran online: what parents should check before enrolling, a simple weekly routine, and how 1-to-1 live classes work.",
    date: "2026-11-16",
    minutes: 5,
    intro:
      "More and more parents in the UK, USA, Canada and Australia are choosing online Quran classes for their children — often because there is no qualified teacher nearby, or because the local masjid class does not fit around school. Online learning works well for kids, but only when it is done properly: a real teacher, one child at a time, at a time that suits the family. This guide explains how it works and what to check before you enrol your child.",
    sections: [
      {
        h: "How online Quran classes work",
        ps: [
          "An online Quran class is a live video lesson, usually on Zoom or Google Meet. The teacher and the child see and hear each other, the teacher listens to the child read, corrects mistakes straight away, and gives homework for the next lesson. A typical class lasts 30 minutes — long enough to learn, short enough for a child to stay focused.",
          "Most families choose 3 classes a week to start with. That gives the child regular practice without taking over the whole week. Children who want to progress faster, or who are doing Hifz, usually take 5 classes a week. The exact days and times are chosen by the family, usually after school, and can be changed later if the school timetable changes.",
        ],
      },
      {
        h: "What parents should check before enrolling",
        ps: [
          "Not every online academy is the same. Before you pay anything, check these five things — they are what separate a good academy from a disappointing one.",
        ],
        list: [
          "One teacher per child. In a group class the teacher cannot hear your child read properly. 1-to-1 classes cost a little more, but your child actually gets taught.",
          "A qualified teacher. Ask about the teacher's qualification — Hifz, Ijazah or a Tajweed certificate — and how long they have taught children.",
          "A free trial class. Any honest academy lets your child take a trial lesson before you pay. If they ask for payment first, be careful.",
          "Flexible timing. Children have school, homework and family time. The class time should fit your child, not the other way round.",
          "Clear fees and a refund policy. You should know the monthly fee before you start, how to pay, and what happens if you stop — no lock-in, no hidden charges.",
        ],
      },
      {
        h: "A simple weekly routine that works",
        ps: [
          "Learning the Quran is mostly about small, regular practice. Three 30-minute classes a week, plus 10 minutes of practice at home on the other days, is enough for steady progress. The home practice does not need to be a lesson — just reading the last Sabaq aloud once or twice keeps it fresh.",
          "The best time for a class is usually straight after school, or after Maghrib, when the child is settled. Avoid very late classes: a tired child does not learn well. And keep the same days each week — children learn faster when the routine is predictable.",
        ],
      },
      {
        h: "How much do online Quran classes cost?",
        ps: [
          "Prices vary a lot. Some academies charge $25 a month, others charge $85 or more for the same 3 classes a week. Price alone does not tell you the quality — what matters is whether the teacher is qualified, the class is 1-to-1, and the academy is honest about fees and refunds.",
          "At Noor Quran Academy, 3 classes a week cost $30 / £25 per month, and 5 classes a week cost $50 / £40 per month. There is no payment before the free trial, no lock-in, and a 7-day money-back promise. Families pay monthly to the academy's bank account — by Wise or Remitly from their own app, by Western Union, or by direct bank transfer.",
        ],
      },
      {
        h: "Try a free trial first",
        ps: [
          "The simplest way to decide is to let your child take one free trial class. In 30 minutes you will see the teacher, the teaching style and whether your child is comfortable — and your child will tell you honestly whether they liked it. Book the trial, meet the teacher, and only then decide.",
        ],
      },
    ],
  },
  {
    slug: "hifz-memorisation-tips-for-kids",
    title: "Hifz Memorisation Tips for Kids — Sabaq, Sabqi and Manzil",
    description:
      "Practical Hifz tips for kids: how the Sabaq, Sabqi and Manzil system works, a daily routine, and the revision habits that keep memorisation strong.",
    date: "2026-11-16",
    minutes: 5,
    intro:
      "Memorising the Quran — Hifz — is one of the most rewarding things a child can do, and also one of the hardest. Children who finish Hifz are rarely the ones who memorise the fastest. They are the ones whose revision never stops. This guide explains the traditional Sabaq, Sabqi and Manzil system, a daily routine that works for school-going children, and the mistakes that cause most children to forget what they memorised.",
    sections: [
      {
        h: "What Sabaq, Sabqi and Manzil mean",
        ps: [
          "Traditional Hifz teaching has three parts, and all three happen every day. Sabaq is the new lesson — the few lines or ayahs the child memorises today. Sabqi is the recent revision — the last few days of Sabaq, read again so it does not fade. Manzil is the old revision — a fixed portion of everything memorised so far, read every day on a cycle.",
          "The system works because it never lets old memorisation sit untouched. A child who only learns new Sabaq and never revises Manzil will forget the early paras within months. A child who revises Manzil every day keeps the whole Quran strong, even years later.",
        ],
      },
      {
        h: "A daily Hifz routine that works",
        ps: [
          "A realistic routine for a school-going child looks like this: first, read yesterday's Sabaq to the teacher. Then learn today's new Sabaq — usually 5 to 10 lines, depending on the child's age and ability. Then read Sabqi, the last week's work. Then read Manzil, one para or part of a para from the older memorisation. The whole class takes about 30 minutes, and the child repeats the new Sabaq a few times at home the same evening.",
          "The amount of new Sabaq matters less than most parents think. Five lines memorised properly and revised daily will take a child further than a full page memorised in a rush and forgotten by next week. The teacher should set the amount — and reduce it on busy school days rather than skipping the class.",
        ],
      },
      {
        h: "Revision matters more than new lessons",
        ps: [
          "Ask any Hafiz what made the difference, and the answer is almost always revision. A simple rule helps: for every minute spent on new Sabaq, spend two minutes on Sabqi and Manzil. Parents can help at home by listening to the child's Manzil once a week — even if the parent cannot read Arabic fluently, following along in a mushaf and listening is enough to keep the child honest about revision.",
          "A Hifz tracker helps too. When a child can see which paras are done — para 30, para 29, para 28 — the progress feels real, and the child wants to keep going. At Noor Quran Academy, Hifz students track every para in the Hifz Tracker, so parents always know exactly where their child stands.",
        ],
      },
      {
        h: "Mistakes to avoid",
        ps: [
          "The most common mistake is pushing too much new Sabaq. A child who is struggling with 10 lines a day will do far better with 5 lines a day done well. The second mistake is skipping classes — even one missed week breaks the revision cycle, and the child spends the next week re-learning instead of moving forward.",
          "The third mistake is comparing children. Some children finish Hifz in two years, others in three or four. Both are fine. Hifz is not a race, and a child who is pressured to keep up with a cousin or a sibling usually ends up hating the classes. Steady, daily, kind progress wins.",
        ],
      },
      {
        h: "How a teacher helps",
        ps: [
          "A good Hifz teacher does three things: sets the right amount of Sabaq for that child, listens to every line with Tajweed, and keeps the revision cycle going even when the child would rather skip it. In a 1-to-1 class the teacher hears every mistake — in a group class, nobody does. If your child is doing Hifz, that one detail is worth more than anything else.",
        ],
      },
    ],
  },
  {
    slug: "what-is-tajweed-and-why-it-matters",
    title: "What Is Tajweed and Why It Matters",
    description:
      "Tajweed in plain words: what the rules are, why correct pronunciation matters, and how kids and adults can learn Tajweed step by step.",
    date: "2026-11-16",
    minutes: 5,
    intro:
      "Many parents have heard the word Tajweed but are not sure what it means — and many adults who read the Quran every day have never been taught it. Tajweed is simply the set of rules for pronouncing the Quran the way it was revealed: every letter from its correct place, every sound given its full right. This guide explains the rules in plain words, why they matter, and how to learn them step by step.",
    sections: [
      {
        h: "What Tajweed actually is",
        ps: [
          "Tajweed comes from the Arabic word for making something good or beautiful. In practice it means reading the Quran with correct pronunciation — not fast, not musical for its own sake, but accurate. The Quran was revealed with these rules, and reading with Tajweed is part of reading it properly.",
          "You do not need to know Arabic to learn Tajweed. The rules are about sounds: where each letter comes from in the mouth and throat, how long a sound is held, and how letters change when they meet each other. A child can learn them one rule at a time, with a teacher listening and correcting.",
        ],
      },
      {
        h: "The main rules in plain words",
        ps: [
          "Makharij are the places each letter comes from — the throat, the tongue, the lips, the nose. Two letters that look similar in English can come from completely different places in Arabic, and mixing them up changes the word. Sifaat are the qualities of each letter: whether it is heavy or light, soft or sharp.",
          "Ghunnah is the nasal sound you hold for two counts on certain letters. Madd is stretching a sound — some vowels are held for two counts, some for four or six, and the length changes the meaning. Then there are the rules of Noon and Meem: what happens when a Noon with a sukoon, or a Meem with a sukoon, meets the next letter — sometimes it is read clearly, sometimes it blends, sometimes it hides. None of this is hard on its own. The difficulty is only in learning the rules one by one, in order, with practice after each one.",
        ],
      },
      {
        h: "Why correct pronunciation matters",
        ps: [
          "In Arabic, a small change in sound can change the meaning of a word completely. That is why Tajweed is not decoration — it is accuracy. Reading with Tajweed also slows you down, and that is a good thing: a slower, careful reader understands more of what they read, and makes fewer mistakes.",
          "For children, learning Tajweed early is much easier than fixing bad habits later. A child who learns the correct Makharij at age 7 will read correctly for life. An adult who has read the same way for twenty years can still learn — it just takes a little more patience and a teacher who corrects kindly.",
        ],
      },
      {
        h: "How to learn Tajweed step by step",
        ps: [
          "Start with Noorani Qaida, which teaches the letters and their sounds from the beginning. Then move to Nazra — reading the whole Quran while the teacher listens and corrects. A dedicated Tajweed course then goes through the rules properly, one at a time, with an AI quiz or practice after each rule to check that it has stuck.",
          "The key is a teacher who listens. Tajweed cannot be learned from a book alone, because you cannot hear your own mistakes. In a 1-to-1 live class, the teacher hears every letter and corrects it in the moment — that is the whole point of learning with a teacher rather than an app.",
        ],
      },
      {
        h: "Tajweed for kids and adults",
        ps: [
          "Kids usually learn Tajweed as part of Nazra: the teacher corrects the sounds as they read, and the rules are added gradually. Adults often prefer a separate Tajweed course, going through the rules in order over 3 to 6 months. Either way works — what matters is starting, and practising a little every day.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function wordCount(p: BlogPost): number {
  const words = (s: string) => s.split(/\s+/).filter(Boolean).length;
  let n = words(p.intro);
  for (const s of p.sections) {
    n += words(s.h);
    for (const para of s.ps) n += words(para);
    for (const item of s.list ?? []) n += words(item);
  }
  return n;
}
