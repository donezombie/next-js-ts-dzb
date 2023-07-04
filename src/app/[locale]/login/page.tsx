'use client';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import PageLayout from 'components/PageLayout';
import pageUrls from 'constants/pageUrls';
import { Form, Formik } from 'formik';

export default function Login() {
  const t = useTranslations('Login');
  const [error, setError] = useState<string>();
  const router = useRouter();

  return (
    <PageLayout title={t('title')}>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => {
          if (error) setError(undefined);

          signIn('credentials', {
            username: values.username,
            password: values.password,
            redirect: false,
          }).then((result) => {
            if (result?.error) {
              setError(result.error);
            } else {
              router.push(pageUrls.Homepage);
            }
          });
        }}
      >
        {({ handleChange, handleBlur }) => {
          return (
            <Form
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                width: 300,
              }}
            >
              <label style={{ display: 'flex' }}>
                <span style={{ display: 'inline-block', flexGrow: 1, minWidth: 100 }}>
                  {t('username')}
                </span>
                <input name='username' type='text' onBlur={handleBlur} onChange={handleChange} />
              </label>
              <label style={{ display: 'flex' }}>
                <span style={{ display: 'inline-block', flexGrow: 1, minWidth: 100 }}>
                  {t('password')}
                </span>
                <input
                  name='password'
                  type='password'
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </label>
              {error && <p>{t('error', { error })}</p>}
              <button type='submit'>{t('submit')}</button>
            </Form>
          );
        }}
      </Formik>
    </PageLayout>
  );
}
