import React from 'react';
import { Box, Button, Text} from "@chakra-ui/react";
import Upload from './components/Upload';

function App() {

  return (
    <Box textAlign="center" fontSize="xl">
      <Text mb={4}>Captioning</Text>
      <Upload />
    </Box>
 );
}

export default App;
