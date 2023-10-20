import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations();
  return <p>404 {t("Common.NotFound")}</p>;
}
