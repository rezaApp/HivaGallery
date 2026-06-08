import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { DirectionProvider } from "@/components/direction-provider";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <NextIntlClientProvider>
      <DirectionProvider>
        <Providers>
          <div className="flex min-h-svh w-full flex-col">
            <Header />
            {children}
          </div>
        </Providers>
      </DirectionProvider>
    </NextIntlClientProvider>
  );
}
