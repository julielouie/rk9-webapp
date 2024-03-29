import React, { FC, useEffect, useState } from 'react';
import {
  Button,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  InputLabel,
  FormControl,
  ListItemSecondaryAction,
  Select,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from 'notistack';
import { KeyedMutator } from 'swr';
import { useAbility } from '@casl/react';
import palette from '../../theme/palette';
import { User } from '../../types/User';
import Rk9Api from '../../dataServices/Rk9Api';
import { PUT } from '../../constants/requests';
import { AbilityContext } from '../../context/AbilityContext';

interface ClientProps {
  client: User;
  mutate: KeyedMutator<User[]>;
  openDeleteConfirmation: () => void;
  setClientToDelete: (client: User | null) => void;
}

export const Client: FC<ClientProps> = (props) => {
  const { client, mutate, openDeleteConfirmation, setClientToDelete } = props;
  const [editMode, setEditMode] = useState(false);
  const [newRole, setNewRole] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const ability = useAbility(AbilityContext);

  useEffect(() => {
    if (client && client.role) setNewRole(client.role);
  }, [client]);

  const updateClientRole = async (e: any) => {
    const changedRole = e.target.value;
    setNewRole(changedRole);
    if (client && client.id && changedRole) {
      const updatedClient = { ...client };
      updatedClient.role = changedRole;

      await Rk9Api(PUT, `/users/${client.id}`, updatedClient)
        .then(() => {
          enqueueSnackbar("Client's information was updated!", {
            persist: false,
            variant: 'success',
          });
        })
        .catch(() =>
          enqueueSnackbar(
            "There was a problem updating the client's information. Please let someone know!",
            {
              persist: false,
              variant: 'error',
            },
          ),
        );
      await mutate();
      setEditMode(false);
    }
  };

  const resetClientPassword = async () => {
    const resetPassword = 'password';
    if (client && client.id && resetPassword) {
      const updatedClient = { ...client };
      updatedClient.password = resetPassword;

      await Rk9Api(PUT, `/users/${client.id}`, updatedClient)
        .then(() => {
          enqueueSnackbar("Client's password was reset!", {
            persist: false,
            variant: 'success',
          });
        })
        .catch(() =>
          enqueueSnackbar(
            "There was a problem resetting the client's password. Please let someone know!",
            {
              persist: false,
              variant: 'error',
            },
          ),
        );
      await mutate();
    }
  };

  const showDeleteConfirmation = () => {
    if (client) {
      setClientToDelete(client);
      openDeleteConfirmation();
    }
  };

  return (
    <ListItem style={{ display: 'flex', justifyContent: 'space-between' }}>
      <ListItemAvatar>
        <Avatar
          style={{
            backgroundColor: palette.paper.primary,
            color: palette.text.primary,
          }}
        >
          <AccountCircleIcon style={{ fontSize: '3rem' }} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        style={{ width: '35%' }}
        primary={`${client.name} - (${client.username})`}
        secondary={client.dogName2 ? `${client.dogName} & Friends` : client.dogName}
      />
      <ListItemText style={{ width: '30%' }}>
        {!editMode && `Role: ${client.role.toUpperCase()}`}
        {editMode && (
          <FormControl>
            <InputLabel>Role</InputLabel>
            <Select
              value={newRole}
              onChange={async (role) => {
                if (role) await updateClientRole(role);
              }}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="client">Client</MenuItem>
              <MenuItem value="guest">Guest</MenuItem>
            </Select>
          </FormControl>
        )}
      </ListItemText>
      <ListItemText style={{ display: 'flex', width: '30%' }}>
        <Button
          size="small"
          variant="outlined"
          style={{
            borderColor: palette.button.primary,
            color: palette.button.primary,
            marginRight: '10px',
          }}
          disabled={!ability.can('update', 'All')}
          onClick={resetClientPassword}
        >
          Reset Password
        </Button>
        <Button
          size="small"
          variant="outlined"
          style={{
            borderColor: palette.button.primary,
            color: palette.button.primary,
          }}
          disabled={!ability.can('update', 'All')}
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? 'Cancel' : 'Edit'}
        </Button>
      </ListItemText>
      <ListItemSecondaryAction style={{ display: 'flex', width: '5%' }}>
        <IconButton disabled={!ability.can('delete', 'All')} onClick={showDeleteConfirmation}>
          <CloseIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Client;
