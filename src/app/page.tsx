import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: `${SITE.name} — Learn Quran Online USA, UK, Canada, Australia`,
  description: "Learn Quran online with 1-to-1 live classes for kids and adults. Noorani Qaida, Nazra, Hifz, Tajweed and Tafseer. Flexible timing, free trial class. Fees $30/£25 and $50/£40 per month.",
};

export default function HomePage() {
  return <HomeClient />;
}
