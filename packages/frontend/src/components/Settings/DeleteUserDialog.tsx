import React, { FC } from 'react';
import { Box, Typography, Dialog } from '@material-ui/core';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import { useAbility } from '@casl/react';
import { KeyedMutator } from 'swr';
import palette from '../../theme/palette';
import Rk9Api from '../../dataServices/Rk9Api';
import { DELETE } from '../../constants/requests';
import { AbilityContext } from '../../context/AbilityContext';
import { User } from '../../types/User';

interface DeleteUserDialogProps {
  open: boolean;
  clientToDelete: User | null;
  setClientToDelete: (client: User | null) => void;
  close: () => void;
  mutate: KeyedMutator<User[]>;
}

export const DeleteUserDialog: FC<DeleteUserDialogProps> = (props) => {
  const { open, clientToDelete, setClientToDelete, close, mutate } = props;
  const ability = useAbility(AbilityContext);
  const { enqueueSnackbar } = useSnackbar();

  const deleteUser = async () => {
    if (ability.can('delete', 'All') && clientToDelete && clientToDelete.id) {
      await Rk9Api(DELETE, `/users/admin/${clientToDelete.id}`)
        .then(() => {
          enqueueSnackbar('User was successfully deleted!', {
            persist: false,
            variant: 'success',
          });
          setClientToDelete(null);
        })
        .catch(() =>
          enqueueSnackbar('There was a problem deleting the user. Please let someone know!', {
            persist: false,
            variant: 'error',
          }),
        );
      await mutate();
    }
  };

  const cancelDeleteUser = () => {
    setClientToDelete(null);
    close();
  };

  return (
    clientToDelete && (
      <Dialog open={open} fullWidth maxWidth="sm" onClose={cancelDeleteUser}>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '30px',
          }}
        >
          <Typography variant="h4" style={{ marginBottom: '20px', textAlign: 'center' }}>
            <span style={{ display: 'block' }}>Are you sure you want to delete</span>
            <span style={{ display: 'block' }}>
              {clientToDelete.name} (${clientToDelete.username})?
            </span>
          </Typography>
          <Typography variant="h6" style={{ marginBottom: '20px' }}>
            Once deleted, their data will be permanently erased.
          </Typography>
          <Box>
            <Button variant="outlined" onClick={cancelDeleteUser}>
              Cancel
            </Button>
            <Button
              onClick={deleteUser}
              style={{
                backgroundColor: palette.selected.primary,
                color: palette.white,
                marginLeft: '20px',
              }}
              disabled={!ability.can('delete', 'All')}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Dialog>
    )
  );
};

export default DeleteUserDialog;
