"use client";

import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import AuthenticationProvider from "providers/AuthenticationProvider";
import { useEffect, useState } from "react";

type Props = {
  locale: string;
  children: React.ReactNode;
  messages: AbstractIntlMessages;
};

//* Defined all Provider here
const Providers = ({ children, locale, messages }: Props) => {
  //* Trick for check Provider mounted
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="Asia/Saigon"
    >
      <AuthenticationProvider>{children}</AuthenticationProvider>
    </NextIntlClientProvider>
  );
};

export default Providers;
