import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { useStore } from '../../stores/store';
import { RegisterFormValues } from '../../models/registerFormValues';
import { useStyles } from '../../globalStyles';
import './RegisterForm.css';

const RegisterForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const {
    sessionStore: { register }
  } = useStore();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [favoriteColor, setFavoriteColor] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = (event: FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    const formValues: RegisterFormValues = {
      email,
      username,
      firstName,
      lastName,
      birthYear,
      favoriteColor,
      password,
      admin: false
    };

    register(formValues)
      .then(res => {
        navigate('/navigator', { replace: true });
      })
      .catch(error => setErrorMessage('Error processing your registration'));
  };

  const handleCancel = () => {
    navigate('/login', { replace: true });
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handleFirstNameChange = (e: any) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: any) => {
    setLastName(e.target.value);
  };

  const handleBirthYearChange = (e: any) => {
    setBirthYear(e.target.value);
  };

  const handleFavoriteColorChange = (e: any) => {
    setFavoriteColor(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value);
  };

  const validateForm = (): boolean => {
    setErrorMessage('');

    if (email === '') {
      setErrorMessage('Enter your email address');
      return false;
    }

    if (username === '') {
      setErrorMessage('Enter your username');
      return false;
    }

    if (firstName === '') {
      setErrorMessage('Enter your first name');
      return false;
    }

    if (lastName === '') {
      setErrorMessage('Enter your last name');
      return false;
    }

    if (birthYear === '' || isNaN(parseInt(birthYear))) {
      setErrorMessage('Enter a valid birth year');
      return false;
    }

    if (favoriteColor === '') {
      setErrorMessage('Enter your favorite color');
      return false;
    }

    if (password === '') {
      setErrorMessage('Enter your password');
      return false;
    }

    if (confirmPassword === '') {
      setErrorMessage('Enter confirmation password');
      return false;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return false;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return false;
    }

    return true;
  };

  const hasFormErrors = (): boolean => {
    return errorMessage !== '';
  };

  return (
    <div className='RegisterFrame'>
      <div className='RegisterTitle'>Register</div>
      <div className='RegisterForm'>
        <form
          className={classes.root}
          noValidate
          autoComplete='off'
          onSubmit={handleRegister}
        >
          <div className='RegisterInput'>
            <TextField
              name='email'
              id='email'
              placeholder='email'
              autoFocus
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className='RegisterInput'>
            <TextField
              name='username'
              id='username'
              placeholder='user name'
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className='RegisterInput'>
            <TextField
              name='firstName'
              id='firstName'
              placeholder='first name'
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div className='RegisterInput'>
            <TextField
              name='lastName'
              id='lastName'
              placeholder='last name'
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div className='RegisterInput'>
            <TextField
              name='birthYear'
              id='birthYear'
              placeholder='birth year'
              value={birthYear}
              inputProps={{ maxLength: 4 }}
              onChange={handleBirthYearChange}
            />
          </div>
          <div className='RegisterInput'>
            <TextField
              name='favoriteColor'
              id='favoriteColor'
              placeholder='favorite color'
              value={favoriteColor}
              onChange={handleFavoriteColorChange}
            />
          </div>
          <div className='RegisterInput'>
            <TextField
              name='password'
              id='password'
              placeholder='password'
              type='password'
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className='RegisterInput'>
            <TextField
              name='confirmPassword'
              id='confirmPassword'
              placeholder='confirm password'
              type='password'
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          {hasFormErrors() && (
            <div className='ErrorMessage'>{errorMessage}</div>
          )}
          <div className='RegisterButtonBox'>
            <div className='LoginButton'>
              <Button variant='contained' color='primary' type='submit'>
                Register
              </Button>
            </div>
            <div className='RegisterButtonSpacer'></div>
            <div className='LoginButton'>
              <Button variant='contained' type='button' onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
