import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/store';
import { Icon } from '@material-ui/core';
import './CommonHeader.css';

export default observer(function CommonHeader() {
  const { sessionStore } = useStore();

  const getCurrentUserName = () => {
    if (!sessionStore.currentUser) return '';

    const { firstName, lastName } = sessionStore.currentUser;

    return `${firstName} ${lastName}`;
  };

  return (
    <>
      <div className='CommonHeaderFrame'>
        <div className='CommonHeaderBar'>
          <div className='CommonHeaderUserBox'>
            <div>
              <Icon fontSize='large'>people</Icon>
            </div>
            <div className='CommonHeaderUserName'>{getCurrentUserName()}</div>
          </div>
          <div>User Admin Console</div>
        </div>
      </div>
    </>
  );
});
