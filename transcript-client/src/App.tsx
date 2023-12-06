import { Box} from "@chakra-ui/react";
import { Route, Routes } from 'react-router-dom';
import TranscriptionPage from "./pages/transcript";
import Upload from 'src/pages/Upload';
import ProtectedRoute from "src/routes/protectedRoutes";

function App() {

  return (
    <Box textAlign="center" fontSize="xl">
        <Routes>
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
 );
}

export default App;
