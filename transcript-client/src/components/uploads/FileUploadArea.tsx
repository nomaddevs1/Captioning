// src/components/FileUploadArea.tsx
import React from 'react';
import { Box, Text, Flex } from "@chakra-ui/react";
//@ts-ignore
import upload_logo from 'src/assets/upload_logo.svg';

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
  </Box>
);

export default FileUploadArea;
