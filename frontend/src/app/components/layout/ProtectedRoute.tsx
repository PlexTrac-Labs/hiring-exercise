import { observer } from 'mobx-react-lite';
import { ReactElement } from 'react';
import { Navigate } from 'react-router';
import { useStore } from '../../stores/store';

interface ProtectedRouteProps {
  children: ReactElement;
  adminOnly?: boolean;
}

export default observer(function ProtectedRoute({
  children,
  adminOnly
}: ProtectedRouteProps): ReactElement {
  const {
    sessionStore: { isLoggedIn, isAdmin }
  } = useStore();

  if (!isLoggedIn) {
    return <Navigate to='/login' replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to='/login' replace />;
  }

  return children;
});
