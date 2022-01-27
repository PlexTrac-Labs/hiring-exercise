import { useEffect } from 'react';
import CommonHeader from '../commonHeader/CommonHeader';
import RouteMap from '../../routes';
import { useStore } from '../../stores/store';

function App() {
  const { sessionStore } = useStore();

  useEffect(() => {
    if (sessionStore.token) {
      sessionStore.getCurrentUser().finally(() => sessionStore.setAppLoaded());
    } else {
      sessionStore.setAppLoaded();
    }
  }, [sessionStore]);

  return (
    <div>
      <CommonHeader />
      <RouteMap />
    </div>
  );
}

export default App;
