import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react";
import App from 'src/App';
import theme from 'src/theme/theme';
import { TranscriptionProvider } from 'src/context/TranscriptionContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <TranscriptionProvider>
        <App />
      </TranscriptionProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
