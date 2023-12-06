import React from 'react';
import { Box, Button, Text} from "@chakra-ui/react";
import Upload from './pages/Upload';
import Progress from './components/Progress';
import Header from 'src/components/Header';

function App() {

  return (
    <Box textAlign="center" fontSize="xl">
      <Header />
      <Upload />
    </Box>
 );
}

export default App;
