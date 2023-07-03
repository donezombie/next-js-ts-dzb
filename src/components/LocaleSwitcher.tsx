import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Lang, languages } from 'i18nOptions';
import { usePathname } from 'next/navigation';

const removeLangFromPathname = (pathname: string) => {
  let nextPathname = pathname;
  languages.forEach((lang) => {
    nextPathname = nextPathname.replace(`/${lang}`, '');
  });

  return nextPathname;
};

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === Lang.en ? Lang.de : Lang.en;
  const nextPathName = `/${otherLocale}${removeLangFromPathname(pathname)}`;

  return (
    <Link href={nextPathName} prefetch={false}>
      {t('switchLocale', { locale: otherLocale })}
    </Link>
  );
}
