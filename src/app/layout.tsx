import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/config/site";
import { Header, Footer } from "@/components/Chrome";
import { LangProvider } from "@/lib/i18n";
import { FAVICON_DATA_URI } from "@/lib/logo";

export const metadata: Metadata = {
  verification: { google: "nVvtI1YT-roAhKdug3eQinKZ5fH48CSWg8uonfkRLTI" },
  icons: { icon: [{ url: FAVICON_DATA_URI, type: "image/png", sizes: "64x64" }] },
  title: `${SITE.name} — Learn Quran Online USA, UK, Canada, Australia`,
  description: "Learn Quran online with 1-to-1 live classes for kids and adults. Noorani Qaida, Nazra, Hifz, Tajweed and Tafseer. Qualified male and female teachers, flexible timing, free trial class. Fees $30/£25 and $50/£40 per month, paid to the academy's bank account.",
  keywords: ["Learn Quran Online USA", "Online Quran Classes for Kids UK", "Hifz Quran Online Canada", "Tajweed Course Online", "Online Quran Classes Australia", "Noorani Qaida online"],
  openGraph: {
    title: `${SITE.name} — Learn Quran Online`,
    description: "1-to-1 live Quran classes for kids and adults. Free trial class, flexible timing, qualified teachers.",
    type: "website",
    url: SITE.baseUrl,
  },
  metadataBase: new URL(SITE.baseUrl),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE.name,
  url: SITE.baseUrl,
  description: "Online Quran academy offering 1-to-1 live Quran classes for kids and adults in the UK, USA, Canada and Australia.",
  contactPoint: { "@type": "ContactPoint", contactType: "admissions", url: SITE.whatsappLink },
  hasOfferCatalog: {
    "@type": "OfferCatalog", name: "Quran Courses",
    itemListElement: SITE.courses.map((c) => ({ "@type": "Course", name: c.name, description: c.desc })),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="bg-amber-50/60 text-slate-800 antialiased">
        <LangProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
