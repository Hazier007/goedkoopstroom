import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Goedkoopste Stroom | Dynamische stroomprijzen per uur",
  description: "Bekijk de actuele dynamische stroomprijzen per uur. Ontdek wanneer elektriciteit het goedkoopst is en bespaar op je energierekening.",
  keywords: "stroomprijs, dynamische tarieven, goedkope stroom, energieprijzen, elektriciteit, spot prijs, EPEX, dag-ahead",
  openGraph: {
    title: "Goedkoopste Stroom | Dynamische stroomprijzen",
    description: "Bekijk de actuele dynamische stroomprijzen per uur en bespaar op je energierekening.",
    type: "website",
    locale: "nl_BE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <head>
        <meta name="google-adsense-account" content="ca-pub-1772283634325864" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YMHMJ3JDQ3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YMHMJ3JDQ3');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
