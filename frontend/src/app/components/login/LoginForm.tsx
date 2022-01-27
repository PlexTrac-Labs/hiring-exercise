import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { useStore } from '../../stores/store';
import { LoginFormValues } from '../../models/loginFormValues';
import { observer } from 'mobx-react-lite';
import { useStyles } from '../../globalStyles';
import './LoginForm.css';

export default observer(function LoginForm() {
  const classes = useStyles();
  const navigate = useNavigate();

  const {
    sessionStore: { login }
  } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    const formValues: LoginFormValues = {
      email,
      password
    };

    login(formValues)
      .then(res => {
        navigate('/navigator', { replace: true });
      })
      .catch(error => setErrorMessage('Invalid credentials'));
  };

  const handleRegister = () => {
    navigate('/register', { replace: true });
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const validateForm = (): boolean => {
    setErrorMessage('');

    if (email === '') {
      setErrorMessage('Enter your email address');
      return false;
    }

    if (password === '') {
      setErrorMessage('Enter your password');
      return false;
    }

    return true;
  };

  const hasFormErrors = (): boolean => {
    return errorMessage !== '';
  };

  return (
    <div className='LoginFrame'>
      <div className='LoginTitle'>Login</div>
      <div className='LoginForm'>
        <form
          className={classes.root}
          noValidate
          autoComplete='off'
          onSubmit={handleLogin}
        >
          <div className='LoginInput'>
            <TextField
              name='email'
              id='email'
              placeholder='email'
              autoFocus
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className='LoginInput'>
            <TextField
              name='password'
              id='password'
              placeholder='password'
              type='password'
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          {hasFormErrors() && (
            <div className='ErrorMessage'>{errorMessage}</div>
          )}
          <div className='LoginButtonBox'>
            <div className='LoginButton'>
              <Button variant='contained' color='primary' type='submit'>
                Login
              </Button>
            </div>
            <div className='LoginButtonSpacer'></div>
            <div className='LoginButton'>
              <Button
                variant='contained'
                type='button'
                onClick={handleRegister}
              >
                Register
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});
