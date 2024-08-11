import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { CONST } from "../CONST";

type ReducerState = {
  isLoading: boolean;
  error: string | null;
};

const initialState: ReducerState = {
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "AccountReducer",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.error = null;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, hasError } = slice.actions;

export const login = (data: any): any => {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(CONST.UserLogin, options);
      const result = await response.json();
      if (result.message)
        alert(result.message);
      return result;
    } catch (error: any) {
      dispatch(hasError(error.message));
    }
  };
};

export const register = (data: any): any => {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:  JSON.stringify(data),
      };
      const response = await fetch(CONST.UserRegister, options);
      const result = await response.json();
      if (result.message)
        alert(result.message);
      return result;
    } catch (error: any) {
      dispatch(hasError(error.message));
    }
  };
};



export const getHeaders = async (): Promise<HeadersInit> => {
  const token = await getTokenAsync(); // Asenkron token alımı

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

// Örnek asenkron token alım fonksiyonu
const getTokenAsync = async (): Promise<string | null> => {
  // Asenkron bir işlemle token'ı al
  return localStorage.getItem('token');
};
