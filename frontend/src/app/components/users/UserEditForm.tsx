import { FormEvent, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, FormControlLabel, TextField } from '@material-ui/core';
import { Checkbox } from '@mui/material';
import { useStore } from '../../stores/store';
import { UserFormValues } from '../../models/userFormValues';
import { useStyles } from '../../globalStyles';
import './UserEditForm.css';

interface UserEditFormProps {
  addMode?: boolean;
}

export default observer(function UserEditForm(props: UserEditFormProps) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { addMode } = props;

  const {
    userStore: { addUser, getUser, updateUser }
  } = useStore();

  const [user, setUser] = useState<UserFormValues>(new UserFormValues());
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUserEdit = (event: FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    if (addMode) {
      addUser(user)
        .then(res => {
          navigate('/users', { replace: true });
        })
        .catch(error => setErrorMessage('Error saving user record'));
    } else {
      if (user.password === '') {
        delete user.password;
      }

      updateUser(userId!, user)
        .then(res => {
          navigate('/users', { replace: true });
        })
        .catch(error => setErrorMessage('Error saving user record'));
    }
  };

  const getFormTitle = () => {
    return addMode === true ? 'Add User' : 'Edit User';
  };

  const handleCancel = () => {
    navigate('/users', { replace: true });
  };

  const handleEmailChange = (e: any) => {
    setUser({ ...user, email: e.target.value });
  };

  const handleUsernameChange = (e: any) => {
    setUser({ ...user, username: e.target.value });
  };

  const handleFirstNameChange = (e: any) => {
    setUser({ ...user, firstName: e.target.value });
  };

  const handleLastNameChange = (e: any) => {
    setUser({ ...user, lastName: e.target.value });
  };

  const handleBirthYearChange = (e: any) => {
    setUser({ ...user, birthYear: e.target.value });
  };

  const handleFavoriteColorChange = (e: any) => {
    setUser({ ...user, favoriteColor: e.target.value });
  };

  const handlePasswordChange = (e: any) => {
    setUser({ ...user, password: e.target.value });
  };

  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value);
  };

  const handleAdminChange = (e: any) => {
    setUser({ ...user, admin: e.target.checked });
  };

  const validateForm = (): boolean => {
    setErrorMessage('');

    if (user.email === '') {
      setErrorMessage('Enter email address');
      return false;
    }

    if (user.username === '') {
      setErrorMessage('Enter username');
      return false;
    }

    if (user.firstName === '') {
      setErrorMessage('Enter first name');
      return false;
    }

    if (user.lastName === '') {
      setErrorMessage('Enter last name');
      return false;
    }

    if (user.birthYear === '' || isNaN(parseInt(user.birthYear))) {
      setErrorMessage('Enter a valid birth year');
      return false;
    }

    if (user.favoriteColor === '') {
      setErrorMessage('Enter favorite color');
      return false;
    }

    if (addMode) {
      if (user.password === '') {
        setErrorMessage('Enter password');
        return false;
      }

      if (confirmPassword === '') {
        setErrorMessage('Enter confirmation password');
        return false;
      }
    }

    if (user.password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return false;
    }

    if (user.password !== '' && user.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return false;
    }

    user.birthYear = user.birthYear.toString();

    return true;
  };

  const hasFormErrors = (): boolean => {
    return errorMessage !== '';
  };

  useEffect(() => {
    if (!addMode && userId) {
      getUser(userId).then(user => {
        setUser(new UserFormValues(user));
      });
    }
  }, [userId, getUser, addMode]);

  return (
    <div className='UserEditFrame'>
      <div className='UserEditTitle'>{getFormTitle()}</div>
      <div className='UserEditForm'>
        <form
          className={classes.root}
          noValidate
          autoComplete='off'
          onSubmit={handleUserEdit}
        >
          <div className='UserEditInput'>
            <TextField
              name='email'
              id='email'
              placeholder='email'
              autoFocus={addMode}
              disabled={!addMode}
              value={user.email}
              onChange={handleEmailChange}
            />
          </div>
          <div className='UserEditInput'>
            <TextField
              name='username'
              id='username'
              placeholder='user name'
              autoFocus={!addMode}
              value={user.username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className='UserEditInput'>
            <TextField
              name='firstName'
              id='firstName'
              placeholder='first name'
              value={user.firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div className='UserEditInput'>
            <TextField
              name='lastName'
              id='lastName'
              placeholder='last name'
              value={user.lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div className='UserEditInput'>
            <TextField
              name='birthYear'
              id='birthYear'
              placeholder='birth year'
              value={user.birthYear}
              inputProps={{ maxLength: 4 }}
              onChange={handleBirthYearChange}
            />
          </div>
          <div className='UserEditInput'>
            <TextField
              name='favoriteColor'
              id='favoriteColor'
              placeholder='favorite color'
              value={user.favoriteColor}
              onChange={handleFavoriteColorChange}
            />
          </div>
          <div className='UserEditInput'>
            <TextField
              name='password'
              id='password'
              placeholder='password'
              type='password'
              value={user.password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className='UserEditInput'>
            <TextField
              name='confirmPassword'
              id='confirmPassword'
              placeholder='confirm password'
              type='password'
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <div className='UserEditInput'>
            <FormControlLabel
              control={
                <Checkbox
                  name='admin'
                  id='admin'
                  checked={user.admin}
                  onClick={handleAdminChange}
                />
              }
              label='Admin'
            />
          </div>
          {hasFormErrors() && (
            <div className='ErrorMessage'>{errorMessage}</div>
          )}
          <div className='UserEditButtonBox'>
            <div className='UserEditActionButton'>
              <Button variant='contained' color='primary' type='submit'>
                Save
              </Button>
            </div>
            <div className='UserEditButtonSpacer'></div>
            <div className='UserEditActionButton'>
              <Button variant='contained' type='button' onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});
