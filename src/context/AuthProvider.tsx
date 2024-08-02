import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/Store";

// Auth state type
interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
}

// Auth context type
interface AuthContextType {
  auth: AuthState;
  setAuth: Dispatch<SetStateAction<AuthState>>;
  logout: () => void;
}

// Initial state for auth
const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null
};

// Create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setAuth(state, action: PayloadAction<AuthState>) {
      return action.payload;
    }
  }
});

// Auth reducer
export const authReducer = authSlice.reducer;

// Auth actions
export const { setAuth } = authSlice.actions;

// Auth provider component
export const AuthContext = createContext<AuthContextType>({
  auth: initialAuthState,
  setAuth: () => {},
  logout: () => {}
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const dispatch = useDispatch();

  // Get auth state from Redux store
  const authState = useSelector((state: RootState) => state.auth);

  const setAuthState: Dispatch<SetStateAction<AuthState>> = (newAuthState: SetStateAction<AuthState>) => {
    dispatch(setAuth(typeof newAuthState === 'function' ? newAuthState(authState) : newAuthState));
  };

  const logout = () => {
    // Set auth state to initial state (not authenticated)
    setAuthState({
      isAuthenticated: false,
      user: null
    });
  };

  return (
    <AuthContext.Provider value={{ auth: authState, setAuth: setAuthState, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
