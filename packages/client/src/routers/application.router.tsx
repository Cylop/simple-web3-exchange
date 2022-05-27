import NotFoundPage from '../pages/NotFound/NotFoundPage';
import { Spinner } from 'grommet';
import {
  ReactNode,
  Suspense,
  lazy,
} from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';

const SuspenseContainer: React.FC<{
  children?: ReactNode;
}> = ({ children }) => (
  <Suspense fallback={<Spinner />}>
    {children}
  </Suspense>
);

const LoginPage = lazy(
  () => import('../pages/LoginPage/LoginPage'),
);

const AppRouter: React.FC = () => {
  return (
    <SuspenseContainer>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </SuspenseContainer>
  );
};

export default AppRouter;
