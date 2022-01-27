import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/store';
import { Button, Icon, IconButton } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import BasicModal, { BasicModalProps } from '../modal/BasicModal';
import { useNavigate } from 'react-router';
import './UserList.css';

export default observer(function UserList() {
  const { userStore, sessionStore } = useStore();
  const { getUsers, UserList } = userStore;
  const navigate = useNavigate();

  const {
    userStore: { deleteUser },
    sessionStore: { currentUser }
  } = useStore();

  const [showModal, setShowModal] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const deleteSelectedUser = (userId: string) => {
    deleteUser(userId)
      .then(res => {
        setShowModal(false);
        getUsers();
      })
      .catch(error => setErrorMessage('Error deleting user'));
  };

  const showDeleteConfirmation = (
    userId: string,
    firstName: string,
    lastName: string
  ) => {
    setSelectedUserName(`${firstName} ${lastName}`);
    setSelectedUserId(userId);
    setShowModal(true);
  };

  const getDeleteModalHeader = () => {
    return `Delete User - ${selectedUserName}`;
  };

  const handleAddUser = () => {
    navigate('/users/add', { replace: true });
  };

  const handleEditUser = (userId: string) => {
    navigate(`/users/edit/${userId}`, { replace: true });
  };

  const handleViewUser = (userId: string) => {
    navigate(`/users/view/${userId}`, { replace: true });
  };

  const handleReturnToOptions = () => {
    navigate('/navigator', { replace: true });
  };

  const showDeleteUserButton = (userId: string) => {
    return userId !== currentUser?._id;
  };

  const getAdminStatus = (params: { row: { admin: any } }) => {
    return params.row.admin ? 'Yes' : 'No';
  };

  let deleteModalProps: BasicModalProps = {
    bodyText: 'Are you sure?',
    showOkButton: true,
    showCancelButton: true,
    handleOk: () => deleteSelectedUser(selectedUserId),
    handleCancel: () => setShowModal(false)
  };

  const hasFormErrors = (): boolean => {
    return errorMessage !== '';
  };

  const renderActionButtons = (params: {
    row: { _id: string; firstName: string; lastName: string; email: string };
  }) => {
    return (
      <div className='GridActions'>
        <IconButton
          aria-label='view'
          size='small'
          style={{ marginLeft: 10 }}
          onClick={() => {
            handleViewUser(params.row._id);
          }}
        >
          <Icon>search</Icon>
        </IconButton>
        {sessionStore.isAdmin && (
          <>
            <IconButton
              aria-label='edit'
              size='small'
              style={{ marginLeft: 10 }}
              onClick={() => {
                handleEditUser(params.row._id);
              }}
            >
              <Icon>edit</Icon>
            </IconButton>
            {showDeleteUserButton(params.row._id) && (
              <IconButton
                aria-label='delete'
                size='small'
                style={{ marginLeft: 10 }}
                onClick={() => {
                  showDeleteConfirmation(
                    params.row._id,
                    params.row.firstName,
                    params.row.lastName
                  );
                }}
              >
                <Icon>delete</Icon>
              </IconButton>
            )}
          </>
        )}
      </div>
    );
  };

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const columns = [
    {
      field: 'firstName',
      headerName: 'First name',
      width: 130,
      flex: 1,
      headerClassName: 'ColumnHeader'
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 130,
      flex: 1,
      headerClassName: 'ColumnHeader'
    },
    {
      field: 'username',
      headerName: 'Username',
      width: 175,
      flex: 1,
      headerClassName: 'ColumnHeader'
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 300,
      headerClassName: 'ColumnHeader'
    },
    {
      field: 'birthYear',
      headerName: 'Birth Year',
      type: 'string',
      width: 90,
      headerClassName: 'ColumnHeader'
    },
    {
      field: 'favoriteColor',
      headerName: 'Favorite Color',
      width: 130,
      flex: 1,
      headerClassName: 'ColumnHeader'
    },
    {
      field: 'admin',
      headerName: 'Admin',
      width: 100,
      valueGetter: getAdminStatus,
      headerClassName: 'ColumnHeader'
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 160,
      headerClassName: 'ColumnHeader',
      renderCell: renderActionButtons,
      disableClickEventBubbling: true
    }
  ];

  return (
    <div className='UserListFrame'>
      <div className='UserListTitle'>Manage Users</div>
      <div className='UserGrid'>
        {userStore.UserList.length !== 0 && (
          <DataGrid
            rows={UserList}
            columns={columns}
            getRowId={row => row._id}
            disableExtendRowFullWidth={true}
            hideFooterSelectedRowCount={true}
            sx={{
              boxShadow: 2,
              border: 2,
              borderColor: 'primary.light',
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main'
              }
            }}
          />
        )}
      </div>
      {hasFormErrors() && <div className='ErrorMessage'>{errorMessage}</div>}
      <div className='UserListFooter'>
        <div className='UserListButtonBox'>
          {sessionStore.isAdmin && (
            <>
              <div className='UserListButton'>
                <Button
                  variant='contained'
                  color='primary'
                  type='button'
                  onClick={handleAddUser}
                >
                  Add User
                </Button>
              </div>
              <div className='UserListButtonSpacer' />
            </>
          )}
          <div className='UserListButton'>
            <Button
              variant='contained'
              type='button'
              onClick={handleReturnToOptions}
            >
              Return to Options
            </Button>
          </div>
        </div>
      </div>
      <div>
        {showModal && (
          <BasicModal {...deleteModalProps} header={getDeleteModalHeader()} />
        )}
      </div>
    </div>
  );
});
