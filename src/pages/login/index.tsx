import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import InputField from '@/components/CustomField/InputField';
import { RouteBase } from '@/constants/routeUrl';
import { Paper, Stack, Typography, Grid } from '@mui/material';
import * as yup from 'yup';
import CommonStyles from '@/components/CommonStyles';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/authentication/useAuthenticationHooks';
import AuthenticationModel from '@/models/authentication.model';
import LoginImage from '@/assets/login-img.webp';
import { makeStyles } from '@mui/styles';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import useLang from '@/hooks/useLang';
import { useRouter } from 'next/router';

const useStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    root: {
      display: `flex`,
      alignItems: `center`,
      p: theme.spacing(4),
      minHeight: 600,
      [theme.breakpoints.down(`md`)]: {
        '& > div': {
          justifyContent: `center`,
          padding: 24,
        },
      },
    },
    left: {
      flex: 6,
    },
    form: {
      flex: 6,
      display: `flex`,
      justifyContent: `center`,
      alignItems: `center`,
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
    },
    imageLogin: {
      overflow: `hidden`,
      borderRadius: `8px 0px 0px 8px`,
      width: `100%`,
      height: `100%`,
      '& img': {
        width: `100%`,
        height: `100%`,
      },
      [theme.breakpoints.down(`md`)]: {
        borderRadius: `8px`,
      },
    },
  };
});

const validationSchema = yup.object().shape({
  email: yup.string().email(`Email is wrong !`).required(`Enter your Email.`),
  password: yup
    .string()
    .required(`Enter your password.`)
    .min(8, `Password is too short - should be 8 chars minimum.`)
    .matches(/[a-zA-Z]/, `Password can only contain Latin letters.`),
});

const initialValues = {
  email: ``,
  password: ``,
};

const LoginPage = () => {
  //! State
  const classes = useStyle();
  const { t } = useTranslation();
  const router = useRouter();
  const auth = useAuth();
  const login = auth?.login;
  const isLogining = auth?.isLogining;
  const isLogged = auth?.isLogged;

  useEffect(() => {
    if (isLogged) {
      router.push(RouteBase.Home);
    }
  }, [isLogged]);

  //! Function
  const handleSubmit = async (values: any) => {
    const body = new AuthenticationModel(values);
    if (login) {
      await login(body.email, body.password);
    }
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
              <Image src={LoginImage} alt="Login-app" />
            </div>
          </Grid>
          <Grid item xs={12} lg={6} md={6} className={classes.form}>
            <Grid lg={7} item>
              <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
              >
                {() => {
                  return (
                    <Form>
                      <Typography variant="h4" mb={2}>
                        {t(`login:login_to_your_account`)}
                      </Typography>

                      <Stack spacing={2}>
                        <Field
                          component={InputField}
                          name="email"
                          label={t(`common:enter`, {
                            key: t(`common:email`).toLowerCase(),
                          })}
                        />

                        <Field
                          component={InputField}
                          label={t(`common:enter`, {
                            key: t(`common:password`).toLowerCase(),
                          })}
                          type="password"
                          name="password"
                        />

                        <CommonStyles.Button
                          loading={isLogining}
                          variant="contained"
                          type="submit"
                        >
                          {t(`common:login`)}
                        </CommonStyles.Button>
                      </Stack>

                      <div className={classes.signUp}>
                        <Typography component="span" noWrap>
                          {t(`login:dont_have_account_yet`)}
                        </Typography>

                        <CommonStyles.NavLink href={RouteBase.Register}>
                          <Typography
                            className={classes.signUpTypo}
                            component="span"
                          >
                            {t(`common:signup`)}
                          </Typography>
                        </CommonStyles.NavLink>
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

export default LoginPage;
