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
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useSnackbar } from 'notistack';
import { KeyedMutator } from 'swr';
import palette from '../../theme/palette';
import { User } from '../../types/User';
import Rk9Api from '../../dataServices/Rk9Api';
import { PUT } from '../../constants/requests';

interface ClientProps {
  client: User;
  mutate: KeyedMutator<User[]>;
}

export const Client: FC<ClientProps> = (props) => {
  const { client, mutate } = props;
  const [editMode, setEditMode] = useState(false);
  const [newRole, setNewRole] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (client && client.role) {
      setNewRole(client.role);
    }
  }, [client]);

  const updateClientRole = async () => {
    if (client && client.id) {
      const updatedClient = { ...client };
      updatedClient.role = newRole;

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
        style={{ width: '40%' }}
        primary={client.name}
        secondary={client.dogName2 ? `${client.dogName} & Friends` : client.dogName}
      />
      <ListItemText style={{ width: '50%' }}>
        {!editMode && `Role: ${client.role.toUpperCase()}`}
        {editMode && (
          <FormControl>
            <InputLabel>Role</InputLabel>
            <Select value={newRole} onChange={(e) => setNewRole(e.target.value as string)}>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="client">Client</MenuItem>
              <MenuItem value="guest">Guest</MenuItem>
            </Select>
          </FormControl>
        )}
      </ListItemText>
      <ListItemSecondaryAction
        style={{
          display: 'flex',
          width: '10%',
        }}
      >
        <Button
          size="small"
          variant="outlined"
          style={{
            borderColor: palette.button.primary,
            color: palette.button.primary,
          }}
          onClick={async () => {
            if (editMode) {
              await updateClientRole();
            }
            setEditMode(!editMode);
          }}
        >
          {editMode ? 'Save' : 'Edit'}
        </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Client;
