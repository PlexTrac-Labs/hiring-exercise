import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import LoginForm from './components/login/LoginForm';
import Navigator from './components/navigator/Navigator';
import RegisterForm from './components/register/RegisterForm';
import ResetPasswordForm from './components/resetPassword/ResetPasswordForm';
import UserList from './components/users/UserList';
import UserEditForm from './components/users/UserEditForm';
import UserView from './components/users/UserView';
import NotFound from './components/notfound/NotFound';
import ProtectedRoute from './components/layout/ProtectedRoute';

export default function RouteMap() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Navigator />
            </ProtectedRoute>
          }
        />
        <Route
          path='/navigator'
          element={
            <ProtectedRoute>
              <Navigator />
            </ProtectedRoute>
          }
        />
        <Route path='/users' element={<UserList />} />
        <Route
          path='/users/add'
          element={
            <ProtectedRoute adminOnly={true}>
              <UserEditForm addMode={true} />
            </ProtectedRoute>
          }
        />
        <Route
          path='/users/edit/:userId'
          element={
            <ProtectedRoute adminOnly={true}>
              <UserEditForm />
            </ProtectedRoute>
          }
        />
        <Route
          path='/users/view/:userId'
          element={
            <ProtectedRoute>
              <UserView />
            </ProtectedRoute>
          }
        />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route
          path='/resetpassword'
          element={
            <ProtectedRoute>
              <ResetPasswordForm />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}
