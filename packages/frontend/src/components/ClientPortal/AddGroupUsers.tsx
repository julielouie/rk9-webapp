import React, { FC, useState } from 'react';
import { Dialog, Button, Box, DialogTitle, Typography, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Select, { MultiValue } from 'react-select';
import useSWR, { mutate } from 'swr';
import { useAbility } from '@casl/react';
import { useSnackbar } from 'notistack';
import palette from '../../theme/palette';
import { User } from '../../types/User';
import { AbilityContext } from '../../context/AbilityContext';
import Rk9Api from '../../dataServices/Rk9Api';
import { PUT } from '../../constants/requests';
import { Group } from '../../types/Group';

interface AddGroupClientsProps {
  open: boolean;
  close: () => void;
  groupInfo: Group;
}

export const AddGroupClients: FC<AddGroupClientsProps> = (props) => {
  const { open, close, groupInfo } = props;
  const [clientsToAdd, setClientsToAdd] = useState<User[]>([]);
  const ability = useAbility(AbilityContext);
  const { enqueueSnackbar } = useSnackbar();

  const { data: allClients } = useSWR<User[]>('/users', { suspense: true });

  const allClientsNotInGroup =
    allClients?.filter((client) => {
      const alreadyInGroup = client.groups.find((group) => group.id === groupInfo.id);
      return !alreadyInGroup;
    }) || [];

  const changeGroupClients = (selectedClients: MultiValue<User>) => {
    setClientsToAdd(selectedClients as User[]);
  };

  const closeAndClear = () => {
    setClientsToAdd([]);
    close();
  };

  const addClientsToGroup = async () => {
    await Promise.all(
      clientsToAdd.map(async (client): Promise<void> => {
        const clientWithUpdatedGroups = { ...client };
        const existingInGroup = clientWithUpdatedGroups.groups.find(
          (group) => group.id === groupInfo.id,
        );
        if (!existingInGroup) {
          clientWithUpdatedGroups.groups.push(groupInfo);

          await Rk9Api(PUT, `/users/${client.id}`, clientWithUpdatedGroups)
            .then(() =>
              enqueueSnackbar('Client was successfully added to the group!', {
                persist: false,
                variant: 'success',
              }),
            )
            .catch(() =>
              enqueueSnackbar('There was a problem adding the client. Please let someone know!', {
                persist: false,
                variant: 'error',
              }),
            );
        }
      }),
    );

    await mutate(`/users?group=${groupInfo.id}`);
    await mutate('/users');
    closeAndClear();
  };

  return (
    <Dialog open={open} onClose={closeAndClear} fullWidth maxWidth="sm">
      <DialogTitle style={{ padding: '20px' }}>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography style={{ fontSize: '1.5rem' }}>
            Select Clients to Add to {groupInfo.name}:
          </Typography>
          <IconButton size="small" onClick={closeAndClear}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '40vh',
          padding: '0 20px 20px 20px',
          justifyContent: 'space-between',
        }}
      >
        <Select
          isMulti
          closeMenuOnSelect={false}
          placeholder="Search..."
          value={clientsToAdd}
          options={allClientsNotInGroup}
          onChange={changeGroupClients}
          getOptionValue={(client) => client.id || ''}
          getOptionLabel={(client) => client.name}
        />
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Button variant="outlined" onClick={closeAndClear}>
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: palette.button.primary, color: palette.text.contrast }}
            disabled={!ability.can('update', 'All')}
            onClick={addClientsToGroup}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AddGroupClients;
