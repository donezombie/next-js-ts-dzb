import { Lang } from "@/i18nOptions";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";

const useChangeLange = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const onChangeLocale = useCallback(
    (lang: Lang) => {
      startTransition(() => {
        router.replace(`/${lang}${pathname}`);
      })
    },
    [router, pathname]
  );

  return {
    isPending,
    locale,
    onChangeLocale,
  };
};

export default useChangeLange;
