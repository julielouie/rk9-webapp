import React, { FC, ReactNode, createRef, RefObject } from 'react';
import { SnackbarProvider } from 'notistack';
import { Button } from '@material-ui/core';
import palette from '../../theme/palette';

interface NotificationProviderProps {
  children: ReactNode;
}

const NotificationProvider: FC<NotificationProviderProps> = (props) => {
  const { children } = props;
  const notistackRef: RefObject<SnackbarProvider> = createRef();

  const onClickDismiss = (key: any) => () => {
    notistackRef.current?.closeSnackbar(key);
  };

  const snackbarAction = (key: any) => (
    <Button onClick={onClickDismiss(key)} style={{ color: palette.text.contrast }}>
      DISMISS
    </Button>
  );

  return (
    <SnackbarProvider
      autoHideDuration={3000}
      maxSnack={3}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      ref={notistackRef}
      action={snackbarAction}
    >
      {children}
    </SnackbarProvider>
  );
};

export default NotificationProvider;
