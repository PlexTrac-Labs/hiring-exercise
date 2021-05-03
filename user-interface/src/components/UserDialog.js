import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField } from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';

// TODO: Move this method and the token logic in the app.js to their own component that can be referenced
function getToken() {
    const tokenString = sessionStorage.getItem('token');
    return tokenString;
}

export default function UserDialog(props) {
    // based on https://dev.to/deboragaleano/how-to-handle-multiple-inputs-in-react-55el
    const [user, setUser] = useState({
        _id: "",
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        admin: false,
        birthYear: "",
        favoriteColor: ""
    });

    // based on https://www.robinwieruch.de/react-hooks-fetch-data
    useEffect(() => {
        // Only fetch the data from the api if we have a valid user and are opening the dialog
        // This does cause a warning in the compiler, but leaving this for now as not sure what different way to do this. Notice disable down below.
        if (props.userId !== user._id && props.isOpen) {
            const url = 'http://localhost:5000/user/' + props.userId;
            const fetchData = async () => {
                const result = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${getToken()}`
                    },
                })
                    .then(response => response.json())
                    .catch(err => console.log(err));

                // Doing this to make sure that the birthYear is formatted as a good string, otherwise it gets very unhappy
                // Also due to using a date, this causes an off by one issue when saving the birth year -- leaving for now and moving on
                // Would like to convert from birthYear to birthDate and use a date selector instead of a textfield for this
                result.birthYear = new Date(result.birthYear).getFullYear();

                // Not sure why the checkbox isn't having it's value tied to state correctly. Spent an hour or so looking into this, moving on for now.
                //result.admin = (result.admin === 'true');
                setUser(result);
            };
            fetchData();
        }
        // eslint-disable-next-line
    }, [props.userId]);

    function handleChange(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    function updateUser() {
        const url = 'http://localhost:5000/user/' + props.userId;
        const body = {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            birthYear: user.birthYear.toString(),
            favoriteColor: user.favoriteColor
        };
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(body)
        }).then(props.handleClose(true))
            .catch(err => console.log(err));
    }

    function deleteUser() {
        const url = 'http://localhost:5000/user/' + props.userId;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        }).then(props.handleClose(true))
            .catch(err => console.log(err));
    }

    return (
        <Dialog open={props.isOpen} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{user.firstName} {user.lastName}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    id="username"
                    name="username"
                    label="Username"
                    type="username"
                    variant="outlined"
                    value={user.username}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    value={user.firstName}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    value={user.lastName}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    value={user.email}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="birthYear"
                    name="birthYear"
                    label="Birth Year"
                    variant="outlined"
                    type="number"
                    InputProps={{ inputProps: { min: 1900, max: 2030 } }}
                    value={user.birthYear}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="favoriteColor"
                    name="favoriteColor"
                    label="Favorite Color"
                    variant="outlined"
                    value={user.favoriteColor}
                    onChange={handleChange}
                    fullWidth
                />
                <FormControlLabel
                    control={<Checkbox
                        checked={user.admin}
                        onChange={handleChange}
                        name="admin"
                        color="primary" />}
                    label="Is Admin"
                />
            </DialogContent>
            {/*// Was originally going to use an editing state and then have an option to revert, but not proceeding with that so I can finish the PR. Anticipating it will be quite a bit more effort*/}
            <DialogActions>
                <Button
                    onClick={deleteUser}
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}>
                    Delete
                </Button>
                <Button
                    onClick={updateUser}
                    variant="contained"
                    color="default"
                    startIcon={<EditIcon />}
                >
                    Update
                </Button>
                <Button
                    onClick={() => props.handleClose(false)}
                    variant="contained"
                    color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
