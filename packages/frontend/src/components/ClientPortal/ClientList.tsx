import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  IconButton,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Box,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import useSWR, { mutate } from 'swr';
import { useAbility } from '@casl/react';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import palette from '../../theme/palette';
import { User } from '../../types/User';
import { Group } from '../../types/Group';
import { AbilityContext } from '../../context/AbilityContext';
import Rk9Api from '../../dataServices/Rk9Api';
import { PUT } from '../../constants/requests';
import AddGroupUsers from './AddGroupUsers';

interface ClientListProps {
  groupInfo?: Group;
  isOneOnOne?: boolean;
  setSelectedOneOnOneUser?: Dispatch<SetStateAction<User>>;
}

export const ClientList: FC<ClientListProps> = (props) => {
  const { groupInfo, isOneOnOne, setSelectedOneOnOneUser } = props;
  const [searchClients, setSearchClients] = useState('');
  const [openAddUsers, setOpenAddUsers] = useState(false);
  const ability = useAbility(AbilityContext);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const path = `/users${groupInfo ? `?group=${groupInfo.id}` : isOneOnOne ? `?oneOnOne=true` : ''}`;
  const { data: clients } = useSWR<User[]>(path, { suspense: true });

  useEffect(() => {
    if (clients && clients.length && setSelectedOneOnOneUser) {
      setSelectedOneOnOneUser(clients[0]);
    }
  }, [clients, setSelectedOneOnOneUser]);

  const updateFilterText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const filterText = e.target.value.toLowerCase();
    setSearchClients(filterText);
  };

  const filterClients = (user: User) => {
    if (user.name.toLowerCase().includes('allie mccain')) return null;

    if (searchClients === '') return user;
    if (user.name.toLowerCase().includes(searchClients)) return user;
    if (user.dogName.toLowerCase().includes(searchClients)) return user;

    return null;
  };

  const removeUserFromGroup = async (userIdToRemove: string) => {
    const currentUser = clients?.find((user) => user.id === userIdToRemove);
    if (currentUser) {
      const updatedUserWithRemovedGroup = { ...currentUser };
      const groupIndex = updatedUserWithRemovedGroup.groups.findIndex(
        (group) => group.id === groupInfo?.id,
      );
      if (groupIndex > -1) {
        updatedUserWithRemovedGroup.groups.splice(groupIndex, 1);

        await Rk9Api(PUT, `/users/${userIdToRemove}`, updatedUserWithRemovedGroup)
          .then(() =>
            enqueueSnackbar('Client was successfully removed from group!', {
              persist: false,
              variant: 'success',
            }),
          )
          .catch(() =>
            enqueueSnackbar('There was a problem removing the client. Please let someone know!', {
              persist: false,
              variant: 'error',
            }),
          );

        await mutate(path);
        await mutate('/users');
      }
    }
  };

  return (
    <>
      <Grid
        item
        container
        xs={12}
        md={3}
        style={{
          maxHeight: '100vh',
          width: '100%',
          borderRight: `1px solid ${palette.disabled}`,
          borderBottom: `1px solid ${palette.disabled}`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}
      >
        <Grid
          item
          container
          style={{
            backgroundColor: palette.paper.secondary,
            display: 'flex',
            padding: '5px 5px 5px 10px',
            color: palette.text.contrast,
            height: '50px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h5" style={{ fontWeight: 600 }}>
            Clients
          </Typography>
          {groupInfo && (
            <IconButton
              size="small"
              onClick={() => setOpenAddUsers(true)}
              disabled={!ability.can('update', 'All')}
            >
              <AddIcon style={{ color: palette.text.contrast }} />
            </IconButton>
          )}
        </Grid>
        <Grid item container style={{ height: '115px', padding: '30px' }}>
          <TextField
            placeholder="Search..."
            variant="outlined"
            fullWidth
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              updateFilterText(e)
            }
            value={searchClients}
          />
        </Grid>
        <List style={{ height: 'calc(100% - 165px)', overflowY: 'auto', padding: 0 }}>
          <Divider />
          {clients && clients.length ? (
            clients
              .filter((client) => filterClients(client))
              .map((client) => {
                return (
                  <span key={client.id}>
                    <ListItem
                      style={{ cursor: isOneOnOne ? 'pointer' : 'auto' }}
                      onClick={() => {
                        if (setSelectedOneOnOneUser) {
                          setSelectedOneOnOneUser(client);
                          history.push('/clientPortal/oneOnOne/main');
                        }
                      }}
                    >
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
                        primary={client.name}
                        secondary={client.dogName2 ? `${client.dogName} & Friends` : client.dogName}
                      />
                      {groupInfo && (
                        <ListItemText style={{ display: 'flex', justifyContent: 'end' }}>
                          <IconButton
                            onClick={() => removeUserFromGroup(client.id || '')}
                            disabled={!ability.can('update', 'All')}
                          >
                            <HighlightOffIcon style={{ color: palette.text.error }} />
                          </IconButton>
                        </ListItemText>
                      )}
                    </ListItem>
                    <Divider />
                  </span>
                );
              })
          ) : (
            <Box style={{ padding: '0 30px', margin: '30px 0' }}>
              <Typography>No Group Members.</Typography>
              <Typography>
                <small>Click &quot; + &quot; to add some!</small>
              </Typography>
            </Box>
          )}
        </List>
      </Grid>
      {groupInfo && (
        <AddGroupUsers
          open={openAddUsers}
          close={() => setOpenAddUsers(false)}
          groupInfo={groupInfo}
        />
      )}
    </>
  );
};

export default ClientList;
