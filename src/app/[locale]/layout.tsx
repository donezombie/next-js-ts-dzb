import "react-toastify/dist/ReactToastify.css";
import { useLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import LocaleLayoutContent from "./layoutContent";

const inter = Inter({ subsets: ["latin"] });

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = useLocale();
  const messages = (await import(`../../locales/${locale}.json`)).default;

  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html lang={locale}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
        />
        <title>Next JS 13 - By Donezombie</title>
      </head>
      <body className={inter.className}>
        <LocaleLayoutContent locale={locale} messages={messages}>
          {children}
        </LocaleLayoutContent>
      </body>
    </html>
  );
}
