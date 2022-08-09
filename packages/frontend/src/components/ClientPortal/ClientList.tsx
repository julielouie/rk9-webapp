import React, { FC, useState } from 'react';
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
import useSWR from 'swr';
import palette from '../../theme/palette';
import { User } from '../../types/User';

interface ClientListProps {
  groupId: string;
  isOneOnOne?: boolean;
}

export const ClientList: FC<ClientListProps> = (props) => {
  const { groupId, isOneOnOne } = props;
  const [searchClients, setSearchClients] = useState('');

  const { data: clients } = useSWR<User[]>(`/users?group=${groupId}`, { suspense: true });

  return (
    <Grid
      item
      container
      xs={12}
      md={3}
      style={{
        width: '100%',
        borderRight: `1px solid ${palette.disabled}`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Grid
        item
        container
        style={{
          backgroundColor: palette.paper.secondary,
          display: 'flex',
          padding: '5px',
          color: palette.text.contrast,
          height: '50px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5" style={{ fontWeight: 600 }}>
          Clients
        </Typography>
        <IconButton size="small">
          <AddIcon style={{ color: palette.text.contrast }} />
        </IconButton>
      </Grid>
      <Grid item container style={{ padding: '0 30px', margin: '30px 0' }}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search..."
          value={searchClients}
          onChange={(e) => setSearchClients(e.target.value)}
        />
      </Grid>
      <Divider />
      <List>
        {clients && clients.length ? (
          clients.map((client) => {
            return (
              <ListItem key={client.id}>
                <ListItemAvatar>
                  <Avatar
                    style={{ backgroundColor: palette.paper.primary, color: palette.text.primary }}
                  >
                    <AccountCircleIcon style={{ fontSize: '3rem' }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={client.name}
                  secondary={client.dogName2 ? `${client.dogName} & Friends` : client.dogName}
                />
                <ListItemText style={{ display: 'flex', justifyContent: 'end' }}>
                  <IconButton>
                    <HighlightOffIcon style={{ color: palette.text.error }} />
                  </IconButton>
                </ListItemText>
              </ListItem>
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
  );
};

export default ClientList;
