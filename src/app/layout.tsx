import type { Metadata } from "next";
import localFont from "next/font/local";
import { getLocale } from "next-intl/server";
import "./globals.css";

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
  title: "HIVA",
  description: "HIVA application",
};

const RTL_LOCALES = new Set(["fa", "ar"]);

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
