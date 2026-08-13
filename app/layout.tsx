import type { Metadata } from "next";
import { Merriweather, Urbanist } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { EVENT_START_ISO, EVENT_END_ISO, EVENT_ADDRESS } from "@/lib/utils";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-merriweather",
  display: "swap",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-urbanist",
  display: "swap",
});

const SITE_URL = "https://meraki2026.fiib.edu.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Meraki 2026 | FIIB International Business Plan Competition",
  description:
    "Meraki 2026 is FIIB's international business plan competition for ambitious student entrepreneurs. Pitch your idea, connect with mentors and investors, and take your venture to the next stage.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Meraki 2026 | FIIB International Business Plan Competition",
    description:
      "Pitch. Connect. Scale. FIIB's international business plan competition for the next generation of entrepreneurs. 23\u201325 October 2026, New Delhi.",
    url: SITE_URL,
    siteName: "Meraki 2026",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meraki 2026 | FIIB International Business Plan Competition",
    description:
      "Pitch. Connect. Scale. FIIB's international business plan competition for the next generation of entrepreneurs.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Meraki",
      alternateName: "Meraki 2026",
      url: SITE_URL,
      description:
        "Meraki is FIIB's flagship international business plan competition for the next generation of entrepreneurs.",
      parentOrganization: {
        "@type": "CollegeOrUniversity",
        name: "Fortune Institute of International Business",
      },
      email: "meraki2026@fiib.edu.in",
      address: {
        "@type": "PostalAddress",
        streetAddress: EVENT_ADDRESS.street,
        addressLocality: EVENT_ADDRESS.city,
        postalCode: EVENT_ADDRESS.postalCode,
        addressCountry: EVENT_ADDRESS.country,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Meraki 2026",
      description:
        "FIIB's flagship international business plan competition for the next generation of entrepreneurs.",
      startDate: EVENT_START_ISO,
      endDate: EVENT_END_ISO,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: "Fortune Institute of International Business",
        address: {
          "@type": "PostalAddress",
          streetAddress: EVENT_ADDRESS.street,
          addressLocality: EVENT_ADDRESS.city,
          postalCode: EVENT_ADDRESS.postalCode,
          addressCountry: EVENT_ADDRESS.country,
        },
      },
      organizer: {
        "@type": "Organization",
        name: "Fortune Institute of International Business",
        url: SITE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Who can participate in Meraki 2026?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Meraki is open to participants worldwide. Teams can have 1\u20135 members, with at least one currently enrolled student or degree-seeking member. The competition welcomes early-stage ideas and young ventures with clear revenue potential, scalability and credible, defensible business models that can attract investors.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need to have an existing startup?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Meraki welcomes both early-stage ideas and young ventures seeking validation, growth or a platform to take their concept forward.",
          },
        },
        {
          "@type": "Question",
          name: "Can students from outside India apply?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Meraki is designed as an international platform and welcomes eligible undergraduate students from across the world.",
          },
        },
        {
          "@type": "Question",
          name: "What will the judges look for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Your idea matters, but so does your thinking. Evaluation focuses on factors such as business clarity, market understanding, execution readiness, scalability and real-world impact.",
          },
        },
      ],
    },
  ];

  return (
    <html lang="en" className={`${merriweather.variable} ${urbanist.variable}`}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
