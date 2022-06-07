import { Spinner } from 'grommet';
import { ReactNode, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import withAuth from '../components/hocs/withAuth/withAuth.hoc';
import NotFoundPage from '../pages/NotFound/NotFoundPage';

const SuspenseContainer: React.FC<{
  children?: ReactNode;
}> = ({ children }) => <Suspense fallback={<Spinner />}>{children}</Suspense>;

const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const TradingPage = lazy(() => import('../pages/TradingPage/TradingPage'));

const AppRouter: React.FC = () => (
  <SuspenseContainer>
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route index element={withAuth()(TradingPage)} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </SuspenseContainer>
);

export default AppRouter;
