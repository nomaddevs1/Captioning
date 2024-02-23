import { Box, Flex, useColorMode, Switch } from "@chakra-ui/react";
import { Route, Routes, Navigate } from 'react-router-dom';
//@ts-ignore
import TranscriptionPage from "src/pages/Transcript";
import Upload from 'src/pages/Upload';
import ProtectedRoute from "src/routes/protectedRoutes";
import Header from 'src/components/Header';
import { useState } from "react";

function App() {

  const [tutorialList, setTutorialList] = useState([
    {
      position: {pos: "fixed", bottom: "20", right: "4"},
      text: "TEST TUTORIAL TEXT"
    },
  ]);

  const { colorMode, toggleColorMode } = useColorMode();

  const updateTutorialList = (newTutorialList: any) => {
    setTutorialList(newTutorialList);
  };

  return (
    <Flex height="100vh" flexDirection="column" overflowY={'hidden'}>
      <Header tutorialList={tutorialList} />
      {/* Dark Mode Toggle */}
      <Flex justify="flex-end" p={4}>
        <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
      </Flex>
      <Box height="100%" width="100%" mt="80px">
        <Routes>
          <Route path="/" element={<Navigate replace to="/upload"/>}/>
          <Route path="/upload" element={<Upload updateTutorialList={updateTutorialList} />} />
          <Route 
            path="/transcription" 
            element={
              <ProtectedRoute>
                <TranscriptionPage updateTutorialList={updateTutorialList} />
              </ProtectedRoute>
            } 
          /> 
        </Routes>
      </Box>
    </Flex>
  );
}

export default App;