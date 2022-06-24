import { Grid, Paper, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import InputField from '@/components/CustomField/InputField';
import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import CommonStyles from '@/components/CommonStyles';
import {
  useAuth,
  useSignUp,
} from '@/hooks/authentication/useAuthenticationHooks';
import AuthenticationModel from '@/models/authentication.model';
import { RouteBase } from '@/constants/routeUrl';
import { useTranslation } from 'react-i18next';
import RegisterImage from '@/assets/register-img.webp';
import { showError, showSuccess } from '@/helpers/toast';
import { getErrorMsg } from '@/helpers';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';

const useStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    root: {
      display: `flex`,
      alignItems: `center`,
      p: theme.spacing(4),
      minHeight: 600,
    },
    signUp: {
      display: `flex`,
      justifyContent: `center`,
      marginTop: theme.spacing(1),
    },
    signUpTypo: {
      color: `${theme.palette.primary.main} !important`,
      marginLeft: `${theme.spacing(1)} !important`,
      cursor: `pointer`,
      textAlign: `center`,
    },
    imageLogin: {
      overflow: `hidden`,
      borderRadius: `8px 0px 0px 8px`,
      width: `100%`,
      height: `100%`,
      minHeight: 600,
      '& img': {
        width: `100%`,
        height: `100%`,
        objectFit: `contain`,
      },
    },
    form: {
      flex: 6,
      display: `flex`,
      justifyContent: `center`,
      alignItems: `center`,
    },
  };
});

interface ValuesRegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues = {
  email: ``,
  password: ``,
  confirmPassword: ``,
} as ValuesRegisterForm;

const RegisterPage = () => {
  //! State
  const classes = useStyle();
  const { t } = useTranslation();
  const { mutateAsync: signUp, isLoading } = useSignUp();

  const auth = useAuth();
  const router = useRouter();
  const login = auth?.login;
  const isLogining = auth?.isLogining;
  const isLogged = auth?.isLogged;

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(`Email is wrong !`)
      .required(t(`message:required_field`, { key: t(`common:email`) })),
    password: Yup.string()
      .required(t(`message:required_field`, { key: t(`common:password`) }))
      .min(8, `Password is too short - should be 8 chars minimum.`)
      .matches(/[a-zA-Z]/, `Password can only contain Latin letters.`),
    confirmPassword: Yup.string().test(
      `passwords-match`,
      `Passwords must match`,
      function (value: any) {
        return this.parent.password === value;
      },
    ),
  });

  useEffect(() => {
    if (isLogged) {
      router.push(RouteBase.Home);
    }
  }, [isLogged]);

  //! Function
  const handleRegister = async (values: ValuesRegisterForm) => {
    const body = new AuthenticationModel(values);
    await signUp(body, {
      onSuccess: () => {
        showSuccess(t(`message:register_successfully`));
      },
      onError: (error) => {
        showError(getErrorMsg(error));
      },
    });
  };

  //! Render
  if (isLogged) {
    return null;
  }

  return (
    <CommonStyles.Container>
      <Paper className={classes.root}>
        <Grid container>
          <Grid item lg={6}>
            <div className={classes.imageLogin}>
              <Image src={RegisterImage} alt="Login-app" />
            </div>
          </Grid>
          <Grid item xs={12} lg={6} md={6} className={classes.form}>
            <Grid item lg={7}>
              <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={handleRegister}
              >
                {(formik) => {
                  return (
                    <Form>
                      <Typography variant="h3" mb={2}>
                        {t(`login:sign_up_title`)}
                      </Typography>
                      <Stack spacing={2}>
                        <Field
                          name="email"
                          component={InputField}
                          label={t(`common:enter`, {
                            key: t(`common:email`),
                          })}
                        />
                        <Field
                          component={InputField}
                          label={t(`common:enter`, {
                            key: t(`common:password`),
                          })}
                          type="password"
                          name="password"
                        />

                        <Field
                          component={InputField}
                          label={t(`common:confirm`, {
                            key: t(`common:password`),
                          })}
                          type="password"
                          name="confirmPassword"
                        />

                        <CommonStyles.Button
                          loading={isLoading}
                          variant="contained"
                          type="submit"
                        >
                          Sign Up
                        </CommonStyles.Button>
                      </Stack>
                      <div className={classes.signUp}>
                        <Typography component="span" noWrap>
                          {t(`login:already_have_account`)}
                          <CommonStyles.NavLink href={RouteBase.Login}>
                            <Typography
                              className={classes.signUpTypo}
                              component="span"
                            >
                              {t(`common:login`)}
                            </Typography>
                          </CommonStyles.NavLink>
                        </Typography>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </CommonStyles.Container>
  );
};

export default RegisterPage;
