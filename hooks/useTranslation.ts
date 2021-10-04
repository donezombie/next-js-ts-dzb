import en from "locales/en";
import vi from "locales/vi";

const useTranslation = (locale: string | undefined) => {
  let t = en;

  if (locale === "vi") {
    t = vi;
  }

  return { t };
};

export default useTranslation;
