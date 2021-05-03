import { Button, Container, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    tableContainer: {
        marginTop: theme.spacing(4)
    },
    table: {
        //marginTop: theme.spacing(1)
    }
}));

// TODO: Move this method and the token logic in the app.js to their own component that can be referenced
function getToken() {
    const tokenString = sessionStorage.getItem('token');
    return tokenString;
}

function getUserId() {
    return sessionStorage.getItem('_id');
}

export default function ResetPassword() {
    const classes = useStyles();

    const [currentPassword, setCurrentPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [resetMessage, setResetMessage] = useState("Reset Your Password");

    const updatePassword = async e => {
        e.preventDefault();
        const body = {
            currentPassword: currentPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        };
        await resetPassword(body);
    }

    async function resetPassword(body) {
        const url = `http://localhost:5000/user/${getUserId()}/reset_password`;
        console.log(url);
        console.log(body);
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(body)
        }).then(res => setResetMessage("Success!"))
            .catch(err => console.log(err));
    }

    return (
        <Container component="main" maxWidth="xl">
            <CssBaseline />
            <header>
                <nav>
                    <Button href="/UserList" color="primary" className="navLink">
                        User List
                    </Button>
                </nav>
            </header>

            <Container className={classes.paper} maxWidth="xs">
                <Typography component="h1" variant="h5">
                    {resetMessage}
                </Typography>
                <form className={classes.form} noValidate onSubmit={updatePassword}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="currentPassword"
                        label="Current Password"
                        type="password"
                        id="currentPassword"
                        autoComplete="current-password"
                        autoFocus
                        onChange={event => setCurrentPassword(event.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="newPassword"
                        label="New Password"
                        type="password"
                        id="newPassword"
                        autoComplete="new-password"
                        onChange={event => setNewPassword(event.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm New Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
                        onChange={event => setConfirmPassword(event.target.value)}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Reset Password
                    </Button>

                </form>
            </Container>
        </Container>
    );
}