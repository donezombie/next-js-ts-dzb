import CommonStyles from '@/components/CommonStyles';
import withPrivate from '@/HOCs/withPrivate';
import { useAuth } from '@/hooks/authentication/useAuthenticationHooks';
import useLang from '@/hooks/useLang';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  const { changeLang } = useLang();
  const auth = useAuth();

  return (
    <div>
      <CommonStyles.Button
        variant="contained"
        onClick={() => {
          auth?.logout();
        }}
      >
        {t(`common:logout`)}
      </CommonStyles.Button>
      <hr />
      <p>{t('common:hello')}</p>

      <CommonStyles.Button
        variant="contained"
        onClick={() => {
          changeLang('vi');
        }}
      >
        {t(`common:vi`)}
      </CommonStyles.Button>
      <CommonStyles.Button
        variant="contained"
        onClick={() => {
          changeLang('en');
        }}
      >
        {t(`common:en`)}
      </CommonStyles.Button>
    </div>
  );
};

export default withPrivate(Home);
