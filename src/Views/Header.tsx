import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar, Button, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" noWrap component="div">
          Konfigürasyon Yönetimi 
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt="User Avatar" src="/path-to-avatar.jpg" sx={{ marginRight: 2 }} />
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Çıkış Yap
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
