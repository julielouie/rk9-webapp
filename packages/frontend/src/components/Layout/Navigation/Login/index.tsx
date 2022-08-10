import React, { FC, useContext, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Dialog, Button, InputAdornment, IconButton, Typography, Grid } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useSnackbar } from 'notistack';
import { useAbility } from '@casl/react';
import palette from '../../../../theme/palette';
import { LEVEL_ERROR, LogError } from '../../../../dataServices/Logger';
import Rk9Api from '../../../../dataServices/Rk9Api';
import { POST } from '../../../../constants/requests';
import { SessionContext } from '../../../../context/SessionContext';
import { LOGIN } from '../../../../constants/actions';
import { AbilityContext } from '../../../../context/AbilityContext';
import updateAbility from '../../../../ability/updateAbility';
import { useCurrentUser } from '../../../../hooks/useCurrentUser';

interface LoginProps {
  open: boolean;
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setLoggedIn: (login: boolean) => void;
  resetLoginInputs: () => void;
}

const Login: FC<LoginProps> = (props) => {
  const { open, email, password, setEmail, setPassword, setLoggedIn, resetLoginInputs } = props;
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { mutate } = useCurrentUser();
  const { dispatch } = useContext(SessionContext);
  const ability = useAbility(AbilityContext);

  const login = async (url: string, payload: { email: string; password: string }) => {
    await Rk9Api(POST, url, payload)
      .then((res: any) => {
        dispatch({ type: LOGIN, payload: res });
        updateAbility(ability, res.role);
        mutate();
        enqueueSnackbar('Logged in successfully!', {
          persist: false,
          variant: 'success',
        });
        setLoggedIn(true);
        resetLoginInputs();
      })
      .catch((error: any) => {
        LogError(LEVEL_ERROR, error, 'User Login');
        if (error?.response?.status === 401) {
          enqueueSnackbar('Credentials were invalid. Please try again.', {
            persist: false,
            variant: 'warning',
          });
          return;
        }
        enqueueSnackbar('There was a problem logging in. Please let someone know!', {
          persist: true,
          variant: 'error',
        });
      });
  };

  const submitLoginInputs = async () => {
    if (email && password) {
      await login('/users/log-in', { email, password });
    }
  };

  const submitOnEnterKey = async (e: React.KeyboardEvent<HTMLDivElement>): Promise<void> => {
    if (e.key === 'Enter') {
      await submitLoginInputs();
    }
  };

  return (
    <Dialog open={open} onClose={resetLoginInputs}>
      <Grid
        container
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        <Grid item>
          <Typography
            variant="h3"
            style={{ color: palette.paper.secondary, fontWeight: 700, marginBottom: '20px' }}
          >
            Login
          </Typography>
        </Grid>
        <Grid item>
          <OutlinedInput
            type="email"
            placeholder="Email"
            name="email"
            required
            value={email}
            size="small"
            fullWidth
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
            style={{ marginBottom: '20px ' }}
            onKeyPress={submitOnEnterKey}
          />
        </Grid>
        <Grid item>
          <OutlinedInput
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            name="password"
            required
            value={password}
            size="small"
            fullWidth
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
            style={{ marginBottom: '20px ' }}
            onKeyPress={submitOnEnterKey}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid>
        <Grid item style={{ display: 'flex', marginBottom: '20px' }}>
          <Button
            variant="contained"
            onClick={submitLoginInputs}
            disabled={!email || !password}
            style={
              email && password
                ? {
                    backgroundColor: palette.paper.secondary,
                    color: palette.text.contrast,
                    width: '100%',
                  }
                : { width: '100%' }
            }
          >
            Submit
          </Button>
        </Grid>
        <Grid item style={{ textAlign: 'center' }}>
          <small>
            Don&apos;t have an account?{' '}
            <span style={{ color: palette.paper.secondary, cursor: 'pointer' }}>Sign Up</span>
          </small>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default Login;
