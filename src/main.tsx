import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
//import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './app/store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}> 
        <QueryClientProvider client={queryClient}>
         {/* <ThemeProvider theme={theme}> */}
            <CssBaseline />
            <App />
         {/* </ThemeProvider> */}
        </QueryClientProvider>
      </Provider> 
    </BrowserRouter>
  </React.StrictMode>
);