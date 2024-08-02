import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthProvider } from "../context/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import ConfigurationsPage from "./Configurations";
import Main from "./Main";
import ToggleLoginAndRegister from "./ToggleLoginAndRegister";
import Header from "./Header";

function MainLayout() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* private pages */}
          <Route
            element={
              <React.Fragment>
                <Main />
              </React.Fragment>
            }
          >
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={<ConfigurationsPage />}
                />
              }
            />
          </Route>

          {/* general pages */}
          <Route path="/login" element={<ToggleLoginAndRegister />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default MainLayout;
