import { createContext, useContext } from 'react';
import ModalStore from './modalStore';
import SessionStore from './sessionStore';
import UserStore from './userStore';

interface Store {
  userStore: UserStore;
  modalStore: ModalStore;
  sessionStore: SessionStore;
}

export const store: Store = {
  userStore: new UserStore(),
  modalStore: new ModalStore(),
  sessionStore: new SessionStore()
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
