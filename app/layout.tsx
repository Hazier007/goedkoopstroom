import type { Metadata } from "next";
import CookieBanner from "./components/CookieBanner";

import Analytics from "./components/Analytics";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingShare from "./components/FloatingShare";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Stroomprijs Vandaag Belgie | Dynamische Stroomprijzen per Uur",
  description:
    "Check de stroomprijs vandaag in Belgie per uur. Zie de goedkoopste uren, mogelijke negatieve stroomprijzen en praktische bespaartips.",
  keywords:
    "stroomprijs vandaag belgie, dynamische stroomprijzen, negatieve stroomprijs belgie, goedkoopste stroom uren, day-ahead prijs",
  openGraph: {
    title: "Stroomprijs Vandaag Belgie | Dynamische Stroomprijzen per Uur",
    description:
      "Bekijk de actuele uurprijzen voor Belgie en plan je verbruik op de goedkoopste stroomuren.",
    type: "website",
    locale: "nl_BE",
  },
};
export default function RootLayout({ children,
}: Readonly<{ children: React.ReactNode }>) { return ( <html lang="nl"> {" "} <head>
        <meta name="e13e11c1f6eb6bd" content="68f7b200c2f8c9733e4204ac184c41cb" /> {" "} <meta name="google-adsense-account" content="ca-pub-1772283634325864" />{" "} <Analytics gaId="G-YMHMJ3JDQ3" />{" "} </head>{" "} <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} > {" "} {children} <CookieBanner /> <FloatingShare />{" "} </body>{" "} </html> );
} 
