import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { BuildingType, JoinedResult } from "./Model/ConfigurationModel";
import { CONST } from "../CONST";

type ReducerState = {
  isLoading: boolean;
  error: boolean;
  Configurations: JoinedResult[];
  BuildingTypes: BuildingType[];

};

const initialState: ReducerState = {
  isLoading: false,
  error: false,
  Configurations: [],
  BuildingTypes: [],

};

const slice = createSlice({
  name: "Reducer",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    SetConfigurations(state, action) {
      state.isLoading = false;
      state.Configurations = action.payload;
    },
    SetBuildingTypes(state, action) {
      state.isLoading = false;
      state.BuildingTypes = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  startLoading,
  hasError,

} = slice.actions;

const token = localStorage.getItem('token');


export const GetAllConfiguration = (): any => {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const options: any = {
        method: 'GET',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        }
      };
      let url = CONST.GetListConfigurationURL;
      const response = await fetch(url, options);
      const result = await response.json();
      dispatch(slice.actions.SetConfigurations(result.data));
      return result;
    } catch (error: any) {
      dispatch(hasError(error.message));
    }
  };
};


export const GetAllBuildingType = (): any => {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const options: any = {
        method: 'GET',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        }
      };
      let url = CONST.GetListBuildingTypeURL;
      const response = await fetch(url, options);
      const result = await response.json();
      dispatch(slice.actions.SetBuildingTypes(result.data));
      return result;
    } catch (error: any) {
      dispatch(hasError(error.message));
    }
  };
};



export const AddConfiguration = (data: any): any => {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const options = {
        method: "POST",
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        },
        body:  JSON.stringify(data),
      };
      const response = await fetch(CONST.AddConfigurationURL, options);
      const result = await response.json();
      if (result.message)
        alert(result.message);
      return result;
    } catch (error: any) {
      dispatch(hasError(error.message));
    }
  };
};