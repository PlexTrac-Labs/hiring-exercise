import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useStore } from '../../stores/store';
import './Navigator.css';

export default observer(function Navigator() {
  const { sessionStore } = useStore();
  const navigate = useNavigate();

  const handleManageUsers = () => {
    navigate('/users', { replace: true });
  };

  const handleResetPassword = () => {
    navigate('/resetpassword', { replace: true });
  };

  const handleLogout = () => {
    sessionStore.logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className='NavigatorFrame'>
      <div className='NavigatorTitle'>Select an Option</div>
      <div className='NavigatorButtonBox'>
        <div className='NavigatorButton'>
          <Button
            variant='contained'
            color='primary'
            type='button'
            onClick={handleManageUsers}
            fullWidth={true}
          >
            Manage Users
          </Button>
        </div>
        <div className='NavigatorButton'>
          <Button
            variant='contained'
            color='primary'
            type='button'
            onClick={handleResetPassword}
            fullWidth={true}
          >
            Reset Password
          </Button>
        </div>
        <div className='NavigatorButton'>
          <Button
            variant='contained'
            color='secondary'
            type='button'
            onClick={handleLogout}
            fullWidth={true}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
});
