import { Metadata } from "next";
import { notFound } from "next/navigation";
import { useLocale, useMessages } from "next-intl";
import {
  getFormatter,
  getNow,
  getTimeZone,
  getTranslator,
} from "next-intl/server";
import { ReactNode } from "react";
import Providers from "../../components/Providers";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: Omit<Props, "children">): Promise<Metadata> {
  const t = await getTranslator(locale, "Content");
  const formatter = await getFormatter(locale);
  const now = await getNow(locale);
  const timeZone = await getTimeZone(locale);

  return {
    title: t("Title"),
    // description: t("Description"),
    other: {
      currentYear: formatter.dateTime(now, { year: "numeric" }),
      timeZone: timeZone || "N/A",
    },
  };
}

export default function LocaleLayout({ children, params }: Props) {
  const locale = useLocale();
  const messages = useMessages();

  // Show a 404 error for unknown locales
  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html lang={locale}>
      <title>Next intl + Next JS 13.5.2</title>
      <body>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
