import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    test: {},

}));

// TODO: Move this method and the token logic in the app.js to their own component that can be referenced
function getToken() {
    const tokenString = sessionStorage.getItem('token');
    return tokenString;
}

function handleChange() {
    console.log("Checkbox change handled");
}

export default function UserDialog(props) {
    const classes = useStyles();

    console.log(`Dialog rendered with the values: ${props.isOpen}, ${props.handleClose}, ${props.user}`);

    // based on https://www.robinwieruch.de/react-hooks-fetch-data
    const [user, setUser] = useState({});
    const [username, setUsername] = useState({});
    const [firstName, setFirstName] = useState({});
    const [lastName, setLastName] = useState({});
    const [email, setEmail] = useState({});
    const [birthYear, setBirthYear] = useState({});
    const [favoriteColor, setFavoriteColor] = useState({});
    const [isAdmin, setIsAdmin] = useState({});
    const url = 'http://localhost:5000/user/' + props.user;
    useEffect(() => {
        // Only fetch the data from the api if we have a valid user and are opening the dialog
        if (props.user && props.isOpen) {
            const fetchData = async () => {
                const result = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${getToken()}`
                    },
                })
                    .then(response => response.json())
                    .catch(err => console.log(err));
                console.log(result);
                // Saving the origin user record to the store and then setting the individual properties so that we can bind to them individually for each TextField
                // Doing it this way so that hopefully there is an easy way to revert the values in case the user stops editing after making changes
                setUser(result);
                setUsername(result.username);
                setFirstName(result.firstName);
                setLastName(result.lastName);
                setEmail(result.email);
                setBirthYear(result.birthYear);
                setFavoriteColor(result.favoriteColor);
                setIsAdmin(result.admin);
            };
            fetchData();
        }
    }, [props.user]);

    return (
        <Dialog open={props.isOpen} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{user.firstName} {user.lastName}</DialogTitle>
            <DialogContent>
                <TextField
                    className={classes.test}
                    margin="dense"
                    id="username"
                    label="Username"
                    type="username"
                    variant="outlined"
                    value={user.username}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="firstname"
                    label="First Name"
                    variant="outlined"
                    value={user.firstName}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="lastname"
                    label="Last Name"
                    variant="outlined"
                    value={user.lastName}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    value={user.email}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="birthyear"
                    label="Birth Year"
                    type="number"
                    variant="outlined"
                    value={user.birthyear}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="favoritecolor"
                    label="Favorite Color"
                    variant="outlined"
                    value={user.favoritecolor}
                    fullWidth
                />
                <FormControlLabel
                    control={<Checkbox
                        checked={user.admin}
                        onChange={handleChange}
                        name="isadmin"
                        color="primary" />}
                    label="Is Admin"
                />
            </DialogContent>
            <DialogActions>
                <Button
                    disabled
                    onClick={() => props.handleClose}
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}>
                    Delete
                </Button>
                <Button
                    onClick={() => props.handleClose}
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<EditIcon />}
                >
                    Edit
                </Button>
                <Button
                    onClick={props.handleClose}
                    variant="contained"
                    color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
