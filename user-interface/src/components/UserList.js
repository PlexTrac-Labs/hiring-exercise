import { Button, Container, CssBaseline, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Check as CheckIcon, Edit as EditIcon, NotInterested as NotInterestedIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import UserDialog from './UserDialog';

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

function formatAdmin(pIsAdmin) {
    if (pIsAdmin) {
        return <CheckIcon />;
    } else {
        return <NotInterestedIcon />;
    }
}

function formatBirthYear(pBirthYear) {
    return new Date(pBirthYear).getFullYear();
}


export default function UserList() {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [isStaleData, setIsStaleData] = useState(true);

    // User Dialog based off of https://abdevelops.medium.com/how-to-build-a-reusable-modal-component-in-material-ui-675390c96e87
    const [targetUser, setTargetUser] = useState(null);
    const [userDialogOpen, setUserDialogOpen] = useState(false);

    const handleDialogOpen = (userId) => {
        setTargetUser(userId);
        setUserDialogOpen(true);
    }

    const handleDialogClose = (refresh) => {
        setTargetUser(null);
        setUserDialogOpen(false);
        setIsStaleData(refresh);
    }

    // Edit action item based on https://codesandbox.io/s/material-table-with-edit-action-g642k?file=/demo.js
    function editUser(userId) {
        handleDialogOpen(userId);
    }

    // based on https://www.robinwieruch.de/react-hooks-fetch-data
    useEffect(() => {
        if (isStaleData) {
            const fetchData = async () => {
                const result = await fetch('http://localhost:5000/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${getToken()}`
                    },
                }).then(response => response.json());
                setUsers(result);
            };
            fetchData();
            setIsStaleData(false);
        }
    }, [isStaleData]);

    return (
        <Container component="main" maxWidth="xl">
            <CssBaseline />
            <header>
                <nav>
                    <Button href="/ResetPassword" color="primary" className="navLink">
                        Reset Your Password
                    </Button>
                </nav>
            </header>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Is Admin</TableCell>
                            <TableCell align="right">Birth Year</TableCell>
                            <TableCell>Favorite Color</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((u) => (
                            <TableRow key={u._id}>
                                <TableCell component="th" scope="row">
                                    {u.username}
                                </TableCell>
                                <TableCell>{u.firstName}</TableCell>
                                <TableCell>{u.lastName}</TableCell>
                                <TableCell>{u.email}</TableCell>
                                <TableCell>{formatAdmin(u.admin)}</TableCell>
                                <TableCell align="right">{formatBirthYear(u.birthYear)}</TableCell>
                                <TableCell>{u.favoriteColor}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => editUser(u._id)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* This is the source of the "findDOMNode is deprecated in StrictMode" warning due to material-ui not having updated their framework to not use findDOMNode */}
            <UserDialog isOpen={userDialogOpen} handleClose={handleDialogClose} userId={targetUser} />
        </Container>
    );
}