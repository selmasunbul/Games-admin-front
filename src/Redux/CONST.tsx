const apiURL = `${process.env.REACT_APP_API_KEY}`;
export const CONST = {
  //account and login
  UserLogin: apiURL + "Accounts/login",
  UserRegister: apiURL + "Accounts/register",

// configurations
GetListConfigurationURL: apiURL + "Configuration/get-list",
GetListBuildingTypeURL : apiURL + "Configuration/get-list-building-type",
AddConfigurationURL : apiURL + "Configuration/add",
AddBuildingTypeURL : apiURL + "Configuration/add-building-type",
};
