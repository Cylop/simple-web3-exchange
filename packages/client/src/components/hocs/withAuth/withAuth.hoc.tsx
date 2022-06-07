import AuthService from '@services/auth.service';
import React, { ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';

type WithAuthProps = {
  redirectPath?: string;
};

/*
 * Hoc that will check if the user is authenticated and redirect to redirectPath if not authenticated
 */
const withAuth =
  ({ redirectPath = '/' }: WithAuthProps) =>
  <T>(WrappedComponent: ComponentType<T>): React.SFC<T> =>
  props => {
    const isAuthorized = AuthService.isAuthenticated();

    const navigate = useNavigate();

    if (!isAuthorized) {
      navigate(redirectPath);
    }

    return <WrappedComponent {...props} />;
  };

export default withAuth;
