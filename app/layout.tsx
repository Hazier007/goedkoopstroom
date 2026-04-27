import type { Metadata } from "next";
import CookieBanner from "./components/CookieBanner";

import Analytics from "./components/Analytics";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import FloatingShare from "./components/FloatingShare";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"],
});
export const metadata: Metadata = { title: "Goedkoopste Stroom | Dynamische stroomprijzen per uur", description: "Bekijk de actuele dynamische stroomprijzen per uur. Ontdek wanneer elektriciteit het goedkoopst is en bespaar op je energierekening.", keywords: "stroomprijs, dynamische tarieven, goedkope stroom, energieprijzen, elektriciteit, spot prijs, EPEX, dag-ahead", openGraph: { title: "Goedkoopste Stroom | Dynamische stroomprijzen", description: "Bekijk de actuele dynamische stroomprijzen per uur en bespaar op je energierekening.", type: "website", locale: "nl_BE", },
};
export default function RootLayout({ children,
}: Readonly<{ children: React.ReactNode }>) { return ( <html lang="nl"> {" "} <head>
        <meta name="e13e11c1f6eb6bd" content="68f7b200c2f8c9733e4204ac184c41cb" /> <meta name="tradetracker-site-verification" content="d3cdfd11108c3d3f907ab55ebd34c009a4c86260" /> {" "} <meta name="google-adsense-account" content="ca-pub-1772283634325864" />{" "} <Analytics gaId="G-YMHMJ3JDQ3" />{" "} </head>{" "} <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} > {" "} {children} <CookieBanner /> <FloatingShare />{" "} </body>{" "} </html> );
} 
