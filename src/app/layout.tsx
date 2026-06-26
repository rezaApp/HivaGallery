import type { Metadata } from "next";
import localFont from "next/font/local";
import { getLocale } from "next-intl/server";
import "./globals.css";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

const geist = localFont({
  src: [
    {
      path: "../../fonts/geist/geist-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/geist/geist-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/geist/geist-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../fonts/geist/geist-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-geist",
});

const yekanBakh = localFont({
  src: "../../fonts/yekanbakh/YekanBakhFaNum-VF.woff2",
  variable: "--font-yekanbakh",
  weight: "100 900",
  style: "normal",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: SITE_NAME,
  },
  description:
    "Discover HIVA's curated collection of premium products — electronics, sports, kitchen, accessories, and home office.",
  robots: { index: true, follow: true },
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hiva_app",
  },
};

const RTL_LOCALES = new Set(["fa", "ar"]);

const GLOBAL_SCHEMA = JSON.stringify([
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/logo/hivaLogo.png`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  },
]);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const isRtl = RTL_LOCALES.has(locale);

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={`${geist.variable} ${yekanBakh.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: GLOBAL_SCHEMA }}
        />
      </head>
      <body
        className={`flex min-h-full flex-col${isRtl ? "font-arabic" : ""}`}
        suppressHydrationWarning
      >
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -1,
            backgroundImage: "url('/images/bkg.PNG')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.8,
          }}
        />
        {children}
      </body>
    </html>
  );
}
