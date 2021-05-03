import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import UserList from './components/UserList';

function getToken() {
    const tokenString = sessionStorage.getItem('token');
    // TODO: Validate that the token is not expired before returning the string. If expired, make sure we redirect to the Login page
    return tokenString;
}

export default function App() {
    function setToken(userToken) {
        console.log(userToken);
        sessionStorage.setItem('token', userToken.auth_token);

        // Storing the user's _id here so we can access it on the password reset page. Don't think that it's the best place to keep it, but works for what we need here.
        sessionStorage.setItem('_id', userToken.user._id);
        window.location.reload();
    }

    // TODO: Make sure that this redirects to the user list when the user is authenticated, so that they don't have to refresh
    // Because I'm returned a Login component here instead of the Routing, pushing a new value to the history doesn't redirect since it can't route
    // I modified setToken to just reload() the window, which works. Not sure if there are any down-sides to this, but there may be a better solution?
    const token = getToken();
    if (!token) {
        return <Login setToken={setToken} />
    }

    return (
        <div>
            <Switch>
                <Route path="/ResetPassword" component={ResetPassword} />
                <Route path="/UserList" component={UserList} />
                <Route path="/Login" component={Login} />
                <Route path="/" component={UserList} />
            </Switch>
        </div>
    );
};