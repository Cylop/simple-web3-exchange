import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'grommet';
import AuthService from '../../services/auth.service';
import { PageContainer } from '../../components';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      navigate('/', { replace: true });
    }
  }, []);

  const handleClick = useCallback(async () => {
    if (!AuthService.isAuthenticated()) {
      await AuthService.login();
      navigate('/', { replace: true });
    }
  }, []);

  return (
    <PageContainer title="Login Page">
      <Button primary alignSelf="start" onClick={handleClick} hoverIndicator label="Authenticate" />
    </PageContainer>
  );
};

export default LoginPage;
