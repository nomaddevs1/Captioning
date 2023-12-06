import  { ReactNode } from 'react';
import { Box, Text, Flex } from "@chakra-ui/react";
//@ts-ignore
import upload_logo from '../assets/upload_logo.svg';

interface UploadedFileInfoProps {
  file: File;
  children?: ReactNode; 
}

const UploadedFileInfo= ({ file, children }: UploadedFileInfoProps) => (
  <Box>
    <Flex mb={4}>
      <img src={upload_logo} width="80px" alt="" />
      <Box ml={4}>
        <Text fontSize="3xl" mb={2} mr={0}>{file?.name}</Text>
        <Flex>
          <Text>NA mins,</Text>
          {file ? <Text ml={1}>{Math.round(file.size / 1000000)} MB</Text> : <></>}
        </Flex>
      </Box>
    </Flex>
    {children} {/* Render children here */}
  </Box>
);

export default UploadedFileInfo;
