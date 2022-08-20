import React, { FC, useState, useContext, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  TextField,
  Typography,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useSnackbar } from 'notistack';
import useSWR from 'swr';
import { useAbility } from '@casl/react';
import { useHistory } from 'react-router-dom';
import palette from '../../theme/palette';
import ScrollToTop from '../utils/ScrollToTop';
import { SessionContext } from '../../context/SessionContext';
import { User } from '../../types/User';
import Rk9Api from '../../dataServices/Rk9Api';
import { PUT } from '../../constants/requests';
import { AbilityContext } from '../../context/AbilityContext';
import Client from './Client';

export const Settings: FC = () => {
  const {
    state: { user },
  } = useContext(SessionContext);
  const { enqueueSnackbar } = useSnackbar();
  const ability = useAbility(AbilityContext);
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [searchClients, setSearchClients] = useState('');
  const [userToEdit, setUserToEdit] = useState<User>({
    id: '',
    name: '',
    username: '',
    password: '',
    groups: [],
    role: '',
    dogName: '',
    dogName2: '',
    dogName3: '',
    dogName4: '',
    dogName5: '',
  });

  const { data: allClients, mutate } = useSWR<User[]>('/users', {
    suspense: true,
  });

  const resetUpdateUserInfo = useCallback(() => {
    if (user) {
      setUserToEdit(user);
    }
  }, [user]);

  useEffect(() => {
    resetUpdateUserInfo();
  }, [resetUpdateUserInfo]);

  const updateUserAccountInfo = async () => {
    if (user && user.id) {
      await Rk9Api(PUT, `/users/${user.id}`, userToEdit)
        .then(() => {
          enqueueSnackbar('Your information was updated!', {
            persist: false,
            variant: 'success',
          });
          resetUpdateUserInfo();
        })
        .catch(() =>
          enqueueSnackbar(
            'There was a problem updating your information. Please let someone know!',
            {
              persist: false,
              variant: 'error',
            },
          ),
        );

      await mutate();
    }
  };

  const updateFilterText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const filterText = e.target.value.toLowerCase();
    setSearchClients(filterText);
  };

  const filterClients = (client: User) => {
    if (client.name.toLowerCase().includes('allie mccain')) return null;

    if (searchClients === '') return client;
    if (client.name.toLowerCase().includes(searchClients)) return client;
    if (client.dogName.toLowerCase().includes(searchClients)) return client;

    return null;
  };

  return (
    <>
      <ScrollToTop />
      <Grid container>
        <Grid
          item
          container
          style={{
            marginTop: '70px',
            backgroundColor: palette.paper.secondary,
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px',
            color: palette.text.contrast,
          }}
        >
          <Typography variant="h4" style={{ fontWeight: 600 }}>
            Settings
          </Typography>
        </Grid>
        <Grid item md={4} style={{ display: 'flex', flexDirection: 'row' }}>
          <Box style={{ display: 'flex', flexDirection: 'column', padding: '50px', width: '99%' }}>
            <Typography variant="h5" style={{ fontWeight: 600, marginBottom: '20px' }}>
              My Information:
            </Typography>
            <TextField
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              label="Name"
              placeholder="Name"
              style={{ marginBottom: '20px' }}
              value={userToEdit.name || ''}
              onChange={(e) => setUserToEdit({ ...userToEdit, name: e.target.value })}
            />
            <TextField
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              label="Username"
              placeholder="Username"
              style={{ marginBottom: '20px' }}
              value={userToEdit.username || ''}
              onChange={(e) => setUserToEdit({ ...userToEdit, username: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel shrink style={{ marginLeft: '13px', position: 'absolute', top: '-7px' }}>
                Change Password
              </InputLabel>
              <OutlinedInput
                notched
                style={{ marginBottom: '25px ' }}
                type={showPassword ? 'text' : 'password'}
                label="Change Password"
                placeholder="New Password"
                value={userToEdit.password || ''}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserToEdit({ ...userToEdit, password: e.target.value })
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <TextField
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              label="Dog's Name"
              placeholder="Dog's Name"
              style={{ marginBottom: '20px' }}
              value={userToEdit.dogName || ''}
              onChange={(e) => setUserToEdit({ ...userToEdit, dogName: e.target.value })}
            />
            <TextField
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              label="Second Dog's Name"
              placeholder="Dog's Name"
              style={{ marginBottom: '20px' }}
              value={userToEdit.dogName2 || ''}
              onChange={(e) => setUserToEdit({ ...userToEdit, dogName2: e.target.value })}
            />
            <TextField
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              label="Third Dog's Name"
              placeholder="Third Dog's Name"
              style={{ marginBottom: '20px' }}
              value={userToEdit.dogName3 || ''}
              onChange={(e) => setUserToEdit({ ...userToEdit, dogName3: e.target.value })}
            />
            <TextField
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              label="Fourth Dog's Name"
              placeholder="Fourth Dog's Name"
              style={{ marginBottom: '20px' }}
              value={userToEdit.dogName4 || ''}
              onChange={(e) => setUserToEdit({ ...userToEdit, dogName4: e.target.value })}
            />
            <TextField
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              label="Fifth Dog's Name"
              placeholder="Fifth Dog's Name"
              style={{ marginBottom: '20px' }}
              value={userToEdit.dogName5 || ''}
              onChange={(e) => setUserToEdit({ ...userToEdit, dogName5: e.target.value })}
            />
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                style={{
                  borderColor: palette.paper.secondary,
                  color: palette.paper.secondary,
                }}
                onClick={() => {
                  resetUpdateUserInfo();
                  history.push('/home');
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: palette.button.primary, color: palette.text.contrast }}
                onClick={updateUserAccountInfo}
              >
                Save
              </Button>
            </Box>
          </Box>
          {ability.can('update', 'All') && <Divider orientation="vertical" flexItem />}
        </Grid>
        {ability.can('update', 'All') && (
          <Grid item md={8} style={{ display: 'flex', flexDirection: 'column', padding: '50px' }}>
            <Typography variant="h5" style={{ fontWeight: 600, marginBottom: '20px' }}>
              User Management:
            </Typography>
            <Box style={{ display: 'flex', flexDirection: 'row' }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search..."
                style={{ marginBottom: '20px' }}
                value={searchClients}
                onChange={(e) => updateFilterText(e)}
              />
            </Box>
            <List>
              {allClients &&
                allClients
                  .filter((client) => filterClients(client))
                  .map((client) => {
                    return (
                      <span key={client.id}>
                        <Client client={client} mutate={mutate} />
                        <Divider />
                      </span>
                    );
                  })}
            </List>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Settings;
