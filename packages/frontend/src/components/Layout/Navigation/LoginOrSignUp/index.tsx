/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC, useContext, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import {
  Dialog,
  Button,
  InputAdornment,
  IconButton,
  Typography,
  Grid,
  TextField,
} from '@material-ui/core';
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

interface LoginOrSignUpProps {
  open: boolean;
  close: () => void;
  setLoggedIn: (login: boolean) => void;
}

const LoginOrSignUp: FC<LoginOrSignUpProps> = (props) => {
  const { open, close, setLoggedIn } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [dogName, setDogName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [signUpMode, setSignUpMode] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { mutate } = useCurrentUser();
  const { dispatch } = useContext(SessionContext);
  const ability = useAbility(AbilityContext);

  const resetInputs = () => {
    close();
    setUsername('');
    setPassword('');
    setSignUpMode(false);
  };

  const submitLogin = async () => {
    if (username && password) {
      await Rk9Api(POST, '/users/log-in', { username, password })
        .then((res: any) => {
          dispatch({ type: LOGIN, payload: res });
          updateAbility(ability, res.role);
          mutate();
          enqueueSnackbar('Logged in successfully!', {
            persist: false,
            variant: 'success',
          });
          setLoggedIn(true);
          resetInputs();
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
    }
  };

  const submitSignUp = async () => {
    if (username && password) {
      await Rk9Api(POST, '/users/sign-up', { name, username, password, dogName })
        .then(() => {
          enqueueSnackbar(
            'Sign up was successfull! Allie will review your sign up request, and set you up!',
            {
              persist: true,
              variant: 'success',
            },
          );
          resetInputs();
        })
        .catch((error: any) => {
          LogError(LEVEL_ERROR, error, 'User Sign Up');
          enqueueSnackbar('There was a problem signing up. Please let someone know!', {
            persist: true,
            variant: 'error',
          });
        });
    }
  };

  const submitOnEnterKey = async (e: React.KeyboardEvent<HTMLDivElement>): Promise<void> => {
    if (e.key === 'Enter') {
      await submitLogin();
    }
  };

  return (
    <Dialog open={open} onClose={resetInputs}>
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
            {!signUpMode ? 'Login' : 'Sign Up'}
          </Typography>
        </Grid>
        {signUpMode && (
          <Grid item>
            <TextField
              placeholder="Name"
              required
              value={name}
              size="small"
              fullWidth
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
              style={{ marginBottom: '20px ' }}
            />
          </Grid>
        )}
        <Grid item>
          <TextField
            placeholder="Username"
            required
            value={username}
            size="small"
            fullWidth
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: '20px ' }}
            onKeyPress={submitOnEnterKey}
          />
        </Grid>
        <Grid item>
          <OutlinedInput
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
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
        {signUpMode && (
          <Grid item>
            <TextField
              placeholder="Dog's Name"
              required
              value={dogName}
              size="small"
              fullWidth
              variant="outlined"
              onChange={(e) => setDogName(e.target.value)}
              style={{ marginBottom: '20px ' }}
            />
          </Grid>
        )}
        <Grid item style={{ display: 'flex', marginBottom: '20px' }}>
          <Button
            variant="contained"
            onClick={signUpMode ? submitSignUp : submitLogin}
            disabled={
              !signUpMode ? !username || !password : !name || !username || !password || !dogName
            }
            style={
              username && password
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
          {!signUpMode && (
            <small>
              Don&apos;t have an account?{' '}
              <span
                style={{ color: palette.paper.secondary, cursor: 'pointer' }}
                onClick={() => setSignUpMode(true)}
              >
                Sign Up
              </span>
            </small>
          )}
          {signUpMode && (
            <small>
              Already have an account?{' '}
              <span
                style={{ color: palette.paper.secondary, cursor: 'pointer' }}
                onClick={() => setSignUpMode(false)}
              >
                Log In
              </span>
            </small>
          )}
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default LoginOrSignUp;
