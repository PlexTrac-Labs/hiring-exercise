import React from "react";
import { AuthContext } from "./AuthContext";
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
  dispatch?: React.Dispatch<IAction>;
}

const initialUserContext: IUserContext = {
  state: {
    users: []
  }
};

export const UserContext = React.createContext<IUserContext>(
  initialUserContext
);

// SELECTORS
export const selectUsers = (state: IUserState): User[] => state.users;
export const selectUserById = (
  state: IUserState,
  id?: string
): User | undefined => selectUsers(state).find(u => u._id === id);

// ACTIONS
const loadUsers = "loadUsers";
const updateUser = "updateUser";
const deleteUser = "deleteUser";

export const actionUsersLoad = (users: User[]): IAction => ({
  type: loadUsers,
  payload: users
});
export const actionUserUpdate = (user: User): IAction => ({
  type: updateUser,
  payload: user
});
export const actionUserDelete = (userId: string): IAction => ({
  type: deleteUser,
  payload: userId
});

// REDUCER
function reducer(state: IUserState, action: IAction): IUserState {
  switch (action.type) {
    case loadUsers:
      return { ...state, users: action.payload };
    case updateUser:
      return {
        ...state,
        users: state.users.map(u =>
          u._id === action.payload._id ? { u, ...action.payload } : u
        )
      };
    case deleteUser:
      return {
        ...state,
        users: state.users.filter(u => u._id !== action.payload)
      };
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
  const [state, dispatch] = React.useReducer(reducer, initialUserContext.state);

  // load Users whenever UserContext is in use
  const auth = React.useContext(AuthContext);

  React.useEffect(() => {
    auth?.axiosInstance
      .get("/user")
      .then(r => r.data as User[])
      .then(u => (dispatch ? dispatch(actionUsersLoad(u)) : null))
      .catch(e => console.log(e.response));
  }, [auth?.axiosInstance, dispatch]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
