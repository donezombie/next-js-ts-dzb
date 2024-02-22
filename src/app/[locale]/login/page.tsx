"use client";
import { useTranslations } from "next-intl";
import { Form, Formik } from "formik";
import { useAuth } from "providers/AuthenticationProvider";
import FormikField from "components/CustomFields/FormikField";
import InputField from "components/CustomFields/InputField";
import * as Yup from "yup";
import { Button } from "components/ui/button";
import CommonIcons from "components/CommonIcons";
import Typography from "components/ui/Typography";
import { useState } from "react";
import pageUrls from "constants/pageUrls";

export default function Login() {
  const t = useTranslations();
  const { login } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required(
          t("Messages.IsRequired", { field: t("Common.Username") })
        ),
        password: Yup.string().required(
          t("Messages.IsRequired", { field: t("Common.Password") })
        ),
      })}
      onSubmit={(values, { setSubmitting }) => {
        login({
          username: values.username,
          password: values.password,
          onSuccess: () => {
            window.location.href = pageUrls.Secret;
          },
          onFailed: () => {
            setSubmitting(false);
            setErrorMsg(t("Messages.UsernameOrPasswordInCorrect"));
          },
        });
      }}
    >
      {({ isSubmitting }) => {
        return (
          <div className="p-4 flex justify-center">
            <Form className="flex flex-col gap-[10px] w-[300px] border rounded p-2">
              <Typography component="h4">{t("Common.Login")}</Typography>

              <div className="border p-2 rounded-md bg-slate-200">
                <Typography component="p">
                  {t("Common.Username")} / {t("Common.Password")}:
                </Typography>
                <Typography className="text-xs">
                  donezombie & donezombie
                </Typography>
              </div>

              <FormikField
                component={InputField}
                name="username"
                label={t("Common.Username")}
              />
              <FormikField
                component={InputField}
                name="password"
                label={t("Common.Password")}
                type="password"
              />

              {errorMsg && (
                <Typography className="invalid-text" component="p">
                  {errorMsg}
                </Typography>
              )}

              <Button type="submit" isLoading={isSubmitting}>
                <CommonIcons.LogIn className="icon" /> {t("Common.Submit")}
              </Button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}
