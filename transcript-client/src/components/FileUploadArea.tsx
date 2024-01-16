// src/components/FileUploadArea.tsx
import React from 'react';
import { Box, Text, Flex } from "@chakra-ui/react";
import TutorialPopup from "src/components/TutorialPopup";
//@ts-ignore
import upload_logo from '../assets/upload_logo.svg';

interface UploadProps {
  getInputProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLInputElement> & React.InputHTMLAttributes<HTMLInputElement>;
  getRootProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>;
}


const FileUploadArea = ({ getInputProps, getRootProps } :UploadProps) => (
  <Box>
    <Flex fontSize="2xl" alignItems="center" direction="column" {...getRootProps()}>
      <img src={upload_logo} width="160px" alt="Upload" />
      <Text mt={4} mb={1}>Drag and drop file here, or</Text>
      <Box>
        <input {...getInputProps()} />
        <Text cursor="pointer" fontSize="md" mb={4}>choose a file to upload</Text>
      </Box>
    </Flex>
    <TutorialPopup 
      position={{pos: "fixed", bottom: "20", right: "4"}}
      text={
        <Box>
          <Text>
            Upload a podcast or any other audio in a variety of formats (mp3, mp4, mpeg, mpga, mp4a, wav, webm) and follow the prompts to display the transcript.
          </Text>
        </Box>
      } 
    />
  </Box>
);

export default FileUploadArea;
