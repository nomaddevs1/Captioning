import  { ReactNode } from 'react';
import TutorialPopup from "src/components/TutorialPopup";
import { Box, Text, Flex, Select } from "@chakra-ui/react";
//@ts-ignore
import upload_logo from '../assets/upload_logo.svg';

interface UploadedFileInfoProps {
  file: File;
  children?: ReactNode; 
}

const tutorial_list = [
  {
    position: {pos: "fixed", top: "200", left: "380"},
    text: "Now that the file has been uploaded, select the transcript language from the dropdown menu and click 'Transcribe'."
  }
]

const UploadedFileInfo= ({ file, children }: UploadedFileInfoProps) => (
  <Box>
    <Flex mb={4}>
      <img src={upload_logo} width="80px" alt="" />
      <Box ml={4}>
        <Text fontSize="3xl" mb={2} mr={0}>{file.name}</Text>
        <Flex alignItems="center">
          <Select placeholder="Language" width="68%" bg="primary.moss.100">
            <option value='english'>English</option>
          </Select>
          <Text width="auto" ml={2}>{Math.round(file.size / 1000000)} MB</Text>
        </Flex>
      </Box>
    </Flex>
    {children} {/* Render children here */}
    <TutorialPopup tutorials={tutorial_list}/>
  </Box>
);

export default UploadedFileInfo;
