import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { TextField, Button, Grid, Box, Typography, Container } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useAuth from '../hooks/useAuth';
import { login } from '../Redux/Slice/AccountReducer';

const LoginForm: React.FC = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [email, setEmail] = useState<string>('');    // E-posta adresi için state
  const [username, setUsername] = useState<string>('');  // Kullanıcı adı için state
  const [pwd, setPwd] = useState<string>('');    // Şifre için state
  const [errMsg, setErrMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); 
  const dispatch = useDispatch();

  useEffect(() => {
      if (userRef.current) userRef.current.focus();
  }, [])

  useEffect(() => {
      setErrMsg('');
  }, [email, username, pwd])
  interface LoginModel {
    email?: string;
    username?: string;
    password: string;
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true); 

      const loginData: LoginModel = {
        email: email,
        username:username,
        password: pwd,
      };
      try {
          const response = await dispatch(login(loginData));
          setAuth({ isAuthenticated: true, user: response.data });
          setEmail('');
          setUsername('');
          setPwd('');
          setLoading(false);
          navigate(from, { replace: true });
      } catch (err: any) {
          setLoading(false); 
          if (!err?.response) {
              setErrMsg("Sonuç Yok");
          } else if (err.response?.status === 400) {
              setErrMsg("Şifre veya Kullanıcı hatalı");
          } else if (err.response?.status === 401) {
              setErrMsg("Giriş Yapılmamış");
          } else {
              setErrMsg("Login Hatası");
          }
          if (errRef.current) errRef.current.focus();
      }
  }

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPwd(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Giriş Yap
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="E-posta"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
                inputRef={userRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Kullanıcı Adı"
                name="username"
                autoComplete="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Şifre"
                type="password"
                id="password"
                autoComplete="current-password"
                value={pwd}
                onChange={handlePasswordChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Yükleniyor...' : 'Giriş Yap'}
          </Button>
          <Typography ref={errRef} color="error" variant="body2">
            {errMsg}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
