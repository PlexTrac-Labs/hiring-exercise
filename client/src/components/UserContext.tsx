import React from "react";
// import { AuthContext } from "./AuthContext"

export interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  admin: boolean;
}

interface IUserState {
  users: User[];
}

interface IAction {
  type: string;
  payload: any;
}

interface IUserContext {
  state: IUserState;
  dispatch: React.Dispatch<IAction>;
}

export const UserContext = React.createContext<IUserContext | null>(null);

// SELECTORS

// ACTIONS
const loadUsers = "loadUsers";
export const actionUsersLoad = (users: User[]): IAction => ({
  type: loadUsers,
  payload: users
});

// REDUCER
function reducer(state: IUserState, action: IAction): IUserState {
  console.log("reducer");
  switch (action.type) {
    case loadUsers:
      console.log("firing");
      return { ...state, users: action.payload };
    default:
      return state;
  }
}

// CONTEXT PROVIDER
interface props {
  children: JSX.Element | JSX.Element[];
}

const UserContextProvider: React.FC<props> = ({ children }) => {
  // STORE
  const [state, dispatch] = React.useReducer(reducer, { users: [] });

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;

// // ACTIONS
// const userStoreLoad = () => {
//     console.log('loading users...')
//     const setUserStoreUsers = (users: User[]) => setUserStore({...userStore, users: users})

//     auth?.axiosInstance
//         .get("/user")
//         .then(r => r.data as User[])
//         .then(r => setUserStoreUsers(r))
//         .catch(e => console.log(e.response));
// };
// const userStoreCreate = (payload: User) => {
//     setUserStore({...userStore, users: [...userStore.users, payload]})
// }
// const userStoreUpdate = (payload: User) => {
//     console.log('...incomplete')
// }
// const userStoreDelete = (id: string) => {
//     console.log(id)
//     const remainingUsers = userStore.users.filter(u => u._id !== id)
//     console.log(remainingUsers)
//     setUserStore({...userStore, users: remainingUsers })
// }

// // SELECTORS
// const getUsersAll = () => userStore.users
// const getUserById = (id: string): User | undefined => userStore.users.find(u => u._id === id)

// const [actions, setActions] = React.useState<IActions>({
//         loadUsers: userStoreLoad,
//         userCreate: userStoreCreate,
//         userUpdate: userStoreUpdate,
//         userDelete: userStoreDelete
// })

// const [selectors, setSelectors] = React.useState<ISelectors>({
//         users: getUsersAll,
//         userById: getUserById,
// })
