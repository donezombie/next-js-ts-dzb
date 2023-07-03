"use client";
import { ToastContainer } from "react-toastify";
import { NextIntlClientProvider } from "next-intl";

export default function LocaleLayoutContent({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: any;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ToastContainer theme="light" position="bottom-center" />
      {children}
    </NextIntlClientProvider>
  );
}
