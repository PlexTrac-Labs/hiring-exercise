import { useNavigate } from 'react-router-dom';
import { Button, Icon } from '@material-ui/core';
import './NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/navigator', { replace: true });
  };

  return (
    <div className='NotFoundFrame'>
      <div>
        <Icon fontSize='large'>search</Icon>
      </div>
      <div>Oops - We couldn't find what you're looking for!</div>
      <div className='HomeButton'>
        <Button
          variant='contained'
          color='primary'
          onClick={handleNavigateHome}
        >
          Return to Options
        </Button>
      </div>
    </div>
  );
}
