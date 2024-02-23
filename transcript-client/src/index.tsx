import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { TranscriptionProvider } from "src/context/TranscriptionContext";
import { ToastContainer } from "react-toastify";
import App from "src/App";
import theme from "src/theme/theme";
import { AudioProvider } from "./context/AudioContext";
import { EditorProvider } from "./context/EditorContext";
import { ColorModeScript } from '@chakra-ui/react';


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
     <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <TranscriptionProvider>
          <EditorProvider>
            <AudioProvider>
              <App />
            </AudioProvider>
          </EditorProvider>
        </TranscriptionProvider>
      </ChakraProvider>
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>
);
