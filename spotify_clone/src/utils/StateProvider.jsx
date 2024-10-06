import { createContext,useContext,useReducer   } from "react";

export const StateProvider = ({children,initialState,reducer}) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);