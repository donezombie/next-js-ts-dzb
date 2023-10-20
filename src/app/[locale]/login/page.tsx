"use client";
import { useTranslations } from "next-intl";
import { Form, Formik } from "formik";
import { useAuth } from "providers/AuthenticationProvider";

export default function Login() {
  const t = useTranslations();
  const { login } = useAuth();

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values) => {
        login({ username: values.username, password: values.password });
      }}
    >
      {({ handleChange, handleBlur }) => {
        return (
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              width: 300,
            }}
          >
            donezombie && donezombie
            <label style={{ display: "flex" }}>
              <span
                style={{ display: "inline-block", flexGrow: 1, minWidth: 100 }}
              >
                {t("Common.Username")}
              </span>
              <input
                name="username"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </label>
            <label style={{ display: "flex" }}>
              <span
                style={{ display: "inline-block", flexGrow: 1, minWidth: 100 }}
              >
                {t("Common.Password")}
              </span>
              <input
                name="password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </label>
            <button type="submit">{t("Common.Submit")}</button>
          </Form>
        );
      }}
    </Formik>
  );
}
