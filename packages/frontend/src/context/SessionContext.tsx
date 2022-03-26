import React, { createContext, useReducer } from 'react';
import {
  UPDATE_DRAWER,
  IS_LOADING,
  RELOAD_DATA_ON_REFRESH,
  UPDATE_USER,
} from '../constants/actions';

interface SessionState {
  user: any;
  drawerOpened: boolean;
  isLoading: boolean;
}

export type SessionAction =
  | { type: typeof UPDATE_USER; payload: any }
  | { type: typeof UPDATE_DRAWER; payload: any }
  | { type: typeof RELOAD_DATA_ON_REFRESH }
  | { type: typeof IS_LOADING; payload: any };

const initialState: SessionState = {
  user: null,
  drawerOpened: !!localStorage.getItem('drawerOpened') ?? true,
  isLoading: false,
};

const stateReducer = (state: SessionState, action: SessionAction): SessionState => {
  switch (action.type) {
    case UPDATE_USER:
      return { ...state, user: action.payload };
    case UPDATE_DRAWER:
      return { ...state, drawerOpened: action.payload };
    case RELOAD_DATA_ON_REFRESH:
      return {
        ...state,
      };
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      throw new Error();
  }
};

const SessionContext = createContext<{
  state: SessionState;
  dispatch: React.Dispatch<SessionAction>;
}>({
  state: initialState,
  dispatch: () => null,
});
const { Provider } = SessionContext;

interface SessionProps {
  children: React.ReactNode;
}
const SessionProvider: React.FunctionComponent<SessionProps> = ({ children }: SessionProps) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { SessionContext, SessionProvider };
