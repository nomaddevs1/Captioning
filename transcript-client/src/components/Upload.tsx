import { Box, Text, Center, Button, Flex } from "@chakra-ui/react";
import upload_logo from '../assets/upload_logo.svg'
import useAxios from 'src/hooks/useAxios';
import { useState } from 'react';
import useUploader from 'src/hooks/useUploader';

function Upload(){
  const [uploaded, setUploaded] = useState<File | null>(null);
  const {getInputProps, getRootProps} = useUploader(setUploaded)
  const axios = useAxios()

 

  const passTranscript = async (e: React.SyntheticEvent) => {
    e.preventDefault();

   if (uploaded) { // Check if 'uploaded' is not null
    const formData = new FormData();
    formData.append('audio_file', uploaded);
    console.log(formData)
    try {
      const data = await axios.post('/transcribe/?language=en', formData);
      console.log(data);
          } catch (err) {
      console.log(err);
    }
  } else {
    console.log("No file uploaded");
    // Handle the case where no file is uploaded
  } 
  }

  return (
    <Center textAlign="center" height="100vh">
      { uploaded ? (
        <Box>
          <Flex mb={4}>
            <img src={upload_logo} width="80px" alt="" />
            <Box ml={4}>
              <Text fontSize="3xl" mb={2} mr={0}>{uploaded.name}</Text>
              <Flex>
                <Text>NA mins,</Text>
                <Text ml={1}>{Math.round(uploaded.size / 1000000)} MB</Text>
              </Flex>
            </Box>
          </Flex>
          <Button width="100%" onClick={passTranscript}>Transcribe</Button>
        </Box>) :
        (<Box {...getRootProps()}>
          <Flex fontSize="2xl" alignItems="center" direction="column">
            <img src={upload_logo} width="160px" alt=""/>
            <Text mt={4} mb={1}>Drag and drop file here, or</Text>
            <Box>
              <input {...getInputProps()} />
              <Text fontSize="md" mb={4}>choose a file to upload</Text>
            </Box>
          </Flex>
        </Box>)
      }
    </Center>
  );
}

export default Upload;
