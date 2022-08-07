import React, { ReactNode, useReducer, useMemo } from 'react';
import { stateReducer } from './Reducer';
import { StateContext, initialState } from './State';

interface StateProviderProps {
  children: ReactNode;
}

function StateProvider({ children }: StateProviderProps) {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const globalContextValue = useMemo(
    () => ({
      state, dispatch,
    }),
    [state, dispatch],
  );
  return (
    <StateContext.Provider value={globalContextValue}>
      {children}
    </StateContext.Provider>
  );
}

export default StateProvider;
