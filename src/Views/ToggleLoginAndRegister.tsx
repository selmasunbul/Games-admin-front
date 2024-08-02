import React, { useState } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Button, Box } from '@mui/material';
import RegisterForm from './Register';
import LoginForm from './Login';

const theme = createTheme();

const TooggLoginAndRegister: React.FC = () => {
  const [showRegister, setShowRegister] = useState(false);

  const toggleForm = () => {
    setShowRegister((prevShowRegister) => !prevShowRegister);
  };

  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        {showRegister ? <RegisterForm /> : <LoginForm />}
        <Button onClick={toggleForm} sx={{ mt: 2 }}>
          {showRegister ? 'Giriş Yap' : 'Kayıt Ol'}
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default TooggLoginAndRegister;
