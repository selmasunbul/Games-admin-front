
import { Provider } from 'react-redux';
import MainLayout from './Views/MainLayout';
import { store } from './Redux/Store';
import React from 'react';
import { Box } from '@mui/material';

const App: React.FC = () => {

  return (
    <Provider store={store}>
    <React.Suspense fallback={<Box>Yükleniyor...!</Box>}>
      <MainLayout />
    </React.Suspense>
  </Provider>
  
  );
};

export default App;
