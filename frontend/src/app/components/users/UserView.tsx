import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useStore } from '../../stores/store';
import './UserView.css';

export default observer(function UserView() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const {
    userStore: { getUser, selectedUser }
  } = useStore();

  const handleReturn = () => {
    navigate('/users', { replace: true });
  };

  useEffect(() => {
    getUser(userId!);
    // eslint-disable-next-line
  }, []);

  return (
    <div className='UserViewFrame'>
      <div className='UserViewTitle'>View User</div>
      <div className='UserViewForm'>
        <div className='UserViewField'>
          <div className='UserViewFieldLabel'>Email</div>
          <div className='UserViewFieldValue'>{selectedUser?.email}</div>
        </div>
        <div className='UserViewField'>
          <div className='UserViewFieldLabel'>Username</div>
          <div className='UserViewFieldValue'>{selectedUser?.username}</div>
        </div>
        <div className='UserViewField'>
          <div className='UserViewFieldLabel'>First Name</div>
          <div className='UserViewFieldValue'>{selectedUser?.firstName}</div>
        </div>
        <div className='UserViewField'>
          <div className='UserViewFieldLabel'>Last Name</div>
          <div className='UserViewFieldValue'>{selectedUser?.lastName}</div>
        </div>
        <div className='UserViewField'>
          <div className='UserViewFieldLabel'>Birth Year</div>
          <div className='UserViewFieldValue'>{selectedUser?.birthYear}</div>
        </div>
        <div className='UserViewField'>
          <div className='UserViewFieldLabel'>Favorite Color</div>
          <div className='UserViewFieldValue'>
            {selectedUser?.favoriteColor}
          </div>
        </div>
        <div className='UserViewField'>
          <div className='UserViewFieldLabel'>Admin</div>
          <div className='UserViewFieldValue'>
            {selectedUser?.admin ? 'Yes' : 'No'}
          </div>
        </div>
        <div className='UserViewButtonBox'>
          <div className='UserViewActionButton'>
            <Button variant='contained' type='button' onClick={handleReturn}>
              Return to List
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});
