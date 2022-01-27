import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { useStore } from '../../stores/store';
import { ResetPasswordFormValues } from '../../models/resetPasswordFormValues';
import BasicModal, { BasicModalProps } from '../modal/BasicModal';
import { useStyles } from '../../globalStyles';
import './ResetPasswordForm.css';

const ResetPasswordForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const {
    sessionStore: { resetPassword }
  } = useStore();

  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  let resetModalProps: BasicModalProps = {
    bodyText: 'Password reset successfully.',
    showOkButton: true,
    showCancelButton: false,
    handleOk: () => handleCancel(),
    handleCancel: () => {}
  };

  const handleReset = (event: FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    if (showModal) {
      return;
    }

    const formValues: ResetPasswordFormValues = {
      email,
      currentPassword,
      newPassword
    };

    resetPassword(formValues)
      .then(res => {
        setShowModal(true);
      })
      .catch(error =>
        setErrorMessage('Error processing your reset password request')
      );
  };

  const handleCancel = () => {
    navigate('/navigator', { replace: true });
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleCurrentPasswordChange = (e: any) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: any) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e: any) => {
    setConfirmNewPassword(e.target.value);
  };

  const validateForm = (): boolean => {
    setErrorMessage('');

    if (email === '') {
      setErrorMessage('Enter your email address');
      return false;
    }

    if (currentPassword === '') {
      setErrorMessage('Enter your current password');
      return false;
    }

    if (newPassword === '') {
      setErrorMessage('Enter your new password');
      return false;
    }

    if (confirmNewPassword === '') {
      setErrorMessage('Enter confirmation password');
      return false;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMessage('Passwords do not match');
      return false;
    }

    if (newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return false;
    }

    if (currentPassword === newPassword) {
      setErrorMessage('New password must be different');
      return false;
    }

    return true;
  };

  const hasFormErrors = (): boolean => {
    return errorMessage !== '';
  };

  return (
    <div className='ResetPasswordFrame'>
      <div className='ResetPasswordTitle'>Reset Password</div>
      <div className='ResetPasswordForm'>
        <form
          className={classes.root}
          noValidate
          autoComplete='off'
          onSubmit={handleReset}
        >
          <div className='ResetPasswordInput'>
            <TextField
              name='email'
              id='email'
              placeholder='email'
              value={email}
              onChange={handleEmailChange}
              autoFocus
            />
          </div>
          <div className='ResetPasswordInput'>
            <TextField
              name='currentPassword'
              id='currentPassword'
              placeholder='current password'
              type='password'
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
            />
          </div>
          <div className='ResetPasswordInput'>
            <TextField
              name='password'
              id='password'
              placeholder='new password'
              type='password'
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
          </div>
          <div className='ResetPasswordInput'>
            <TextField
              name='confirmPassword'
              id='confirmPassword'
              placeholder='confirm new password'
              type='password'
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
            />
          </div>
          {hasFormErrors() && (
            <div className='ErrorMessage'>{errorMessage}</div>
          )}
          <div className='ResetPasswordButtonBox'>
            <div className='ResetPasswordButton'>
              <Button variant='contained' color='primary' type='submit'>
                Reset
              </Button>
            </div>
            <div className='ResetPasswordButtonSpacer'></div>
            <div className='ResetPasswordButton'>
              <Button variant='contained' type='button' onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div>
        {showModal && (
          <BasicModal {...resetModalProps} header={'Password Reset'} />
        )}
      </div>
    </div>
  );
};

export default ResetPasswordForm;
