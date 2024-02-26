import { Box, Flex} from "@chakra-ui/react";
import { Route, Routes, Navigate } from 'react-router-dom';
//@ts-ignore
import TranscriptionPage from "src/pages/Transcript";
import Upload from 'src/pages/Upload';
import ProtectedRoute from "src/routes/protectedRoutes";
import Header from 'src/components/Header'


function App() {
  return (
    <Flex height="100vh" flexDirection="column" overflowY={'hidden'}>
      <Header />
      <Box height="100%" width="100%" mt="80px">
        <Routes>
          <Route path="/" element={
              <Navigate replace to="/upload"/>
            }/>
           
          <Route path="/upload" element={<Upload />} />
          <Route 
            path="/transcription" 
            element={
              <ProtectedRoute>
                <TranscriptionPage />
              </ProtectedRoute>
            } 
          /> 
        </Routes>
      </Box>
    </Flex>
  );
}

export default App;