"use client";
import useChangeLang from "@/hooks/useChangeLang";
import { Lang } from "@/i18nOptions";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";

const Login = () => {
  const { locale, onChangeLocale } = useChangeLang();
  const t = useTranslations("Index");

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values) => {}}
    >
      {({ values, handleBlur, handleChange }) => {
        return (
          <Form className="flex justify-center items-center h-[100vh]">
            <div className="flex flex-col gap-4 border border-blue-300 rounded-md p-3">
              <button
                type="button"
                onClick={() =>{
                    const nextLocale = locale === Lang.en ? Lang.vi : Lang.en
                    console.log({ nextLocale })
                    onChangeLocale(nextLocale)
                }
                }
              >
                Change language
              </button>
              <div className="flex flex-col">
                <label htmlFor="username">{t("username")}</label>
                <input
                  value={values.username}
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Username"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <input
                  value={values.password}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Password"
                  type="password"
                />
              </div>

              <button type="submit">Login</button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Login;
