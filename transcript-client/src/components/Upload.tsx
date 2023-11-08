import {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { Box, Text, Center, Button } from "@chakra-ui/react";


function Upload(){
  const [uploaded, setUploaded] = useState<File>();

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    setUploaded(acceptedFiles[0]);
  }, []);
  const {getRootProps, getInputProps} = useDropzone({onDrop, accept: {
    'audio/*' : ['.mp3', '.m4a', '.wav', '.mpga'],
    'video/*' : ['.mp4', '.webm', '.mpeg']
  }});

  const passTranscript = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(uploaded);

    /**
    const response = await fetch("", {
      method: "POST",
      body: uploaded
    });

    if (response.ok){
      console.log("File uploaded");
    } else {
      console.error("Failed to upload");
    }
    */
  }

  return (
    <Center textAlign="center" height="100vh">
      { uploaded ? (
        <Box>
          <Box display="flex" mb={4}>
            <Box ml={4}>
              <Text fontSize="3xl" mb={2}>{uploaded.name}</Text>
              <Box display="flex">
                <Text>NA mins,</Text>
                <Text ml={1}>{Math.round(uploaded.size / 1000000)} MB</Text>
              </Box>
            </Box>
          </Box>
          <Button width="100%" onClick={passTranscript}>Transcribe</Button>
        </Box>) :
        (<Box {...getRootProps({alignContent: "center", justifyContent: "center", fontSize: "2xl"})}>
          <Text mt={4} mb={1}>Drag and drop file here, or</Text>
          <Box>
            <input {...getInputProps()} />
            <Text fontSize="md" mb={4}>choose a file to upload</Text>
          </Box>
        </Box>)
      }
    </Center>
  );
}

export default Upload;