import { Box, Flex } from "@chakra-ui/react";
import { Route, Routes, Navigate } from 'react-router-dom';
import TranscriptionPage from "./pages/transcript";
import Upload from 'src/pages/Upload';
import Header from "./components/Header";
import ProtectedRoute from "src/routes/protectedRoutes";

function App() {
  return (
      <Flex height="100vh" flexDirection="column" overflowY={'hidden'}>
        <Header />
        <Box height="100%" width="100%" mt="80px">
          <Routes>
            <Route
              path="/"
              element={<Navigate replace to="/upload" />}
            />
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

/*function App() {

  return (
    <Flex height="100vh" flexDirection="column" overflowY={'hidden'}>
      <Header />
      <Box height="100%" width="100%" mt="80px">
        <Routes>
          <Route path="/" element={
              <Navigate replace to="/upload"/>
            }/>
           
          <Route path="/upload" element={<Upload/>} />
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
*/