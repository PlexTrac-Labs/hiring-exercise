import { useState } from 'react';
import Box from '@mui/material/Box';
import { Button } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './BasicModal.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  color: '#fff',
  bgcolor: '#55697D',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export interface BasicModalProps {
  header?: string;
  bodyText: string;
  showOkButton: boolean;
  showCancelButton: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

export default function BasicModal(props: BasicModalProps) {
  const {
    header,
    bodyText,
    showOkButton,
    showCancelButton,
    handleOk,
    handleCancel
  } = props;

  // eslint-disable-next-line
  const [open, setOpen] = useState(true);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleCancel}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <>
          <Box sx={style}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              {header}
            </Typography>
            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
              {bodyText}
            </Typography>
            <div className='ModalButtons'>
              {showOkButton && (
                <Button
                  variant='contained'
                  color='default'
                  size='small'
                  style={{ marginLeft: 10 }}
                  onClick={() => {
                    handleOk();
                  }}
                >
                  OK
                </Button>
              )}
              {showCancelButton && (
                <Button
                  variant='contained'
                  color='default'
                  size='small'
                  style={{ marginLeft: 10 }}
                  onClick={() => {
                    handleCancel();
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </Box>
        </>
      </Modal>
    </div>
  );
}
