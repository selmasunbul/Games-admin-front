import { Box } from "@mui/material";

import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../App.css";
import Header from "./Header";
function Main() {
  const { auth } = useAuth();



  if (auth.user === null) {
    return <Navigate to="/login" />;
  }

  if (auth.user) {
    localStorage.setItem('token', auth.user.access_token);
  } else {
    localStorage.removeItem('token');
    <Navigate to="/login" />
  }

  return (
    <Box className="content-box">
      <Box className="app-content">
        <Header />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Main;