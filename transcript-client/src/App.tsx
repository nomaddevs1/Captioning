import React from 'react';
import { Box, Button, Text} from "@chakra-ui/react";
import Upload from './components/Upload';
import Progress from './components/Progress';

function App() {

  return (
    <Box textAlign="center" fontSize="xl">
      <Upload />
    </Box>
 );
}

export default App;
