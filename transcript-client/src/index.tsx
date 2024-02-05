import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from 'react-router-dom';
import { TranscriptionProvider } from 'src/context/TranscriptionContext';
import { ToastContainer } from 'react-toastify';
import App from 'src/App';
import theme from 'src/theme/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <TranscriptionProvider>
        <App />
      </TranscriptionProvider>
    </ChakraProvider>
    <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>,
)
