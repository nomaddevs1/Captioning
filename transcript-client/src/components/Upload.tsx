import {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { Box, Text, Icon, Center, Button } from "@chakra-ui/react";


function Upload(){
    const [uploaded, setUploaded] = useState<File>();

    const onDrop = useCallback((acceptedFiles: Array<File>) => {
      setUploaded(acceptedFiles[0]);
    }, []);
    const {getRootProps, getInputProps} = useDropzone({onDrop});

    const passTranscript = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      console.log(uploaded);

      const response = await fetch("", {
        method: "POST",
        body: uploaded
      });

      if (response.ok){
        console.log("File uploaded");
      } else {
        console.error("Failed to upload");
      }
    }

    return (
      <Center textAlign="center" height="100vh">
        { uploaded ? (
          <Box>
            <Box display="flex" mb={4}>
              <Icon viewBox='0 0 202 249' width="200" height="100">
                <path d="M160.354 0H77.8682H71.4794L66.9632 4.51619L4.51668 66.9632L0 71.4794V77.8682V206.611C0 229.575 18.6815 248.26 41.6494 248.26H160.354C183.318 248.26 202 229.575 202 206.611V41.649C202 18.6815 183.318 0 160.354 0ZM186.579 206.61C186.579 221.097 174.838 232.839 160.354 232.839H41.6494C27.1626 232.839 15.4217 221.097 15.4217 206.61V77.8677H56.0146C68.0804 77.8677 77.8682 68.0833 77.8682 56.0141V15.4212H160.354C174.838 15.4212 186.579 27.1621 186.579 41.649V206.61Z" fill="#557E4A"/>
                <path d="M154.734 45.1765H111.399V88.5119H154.734V45.1765Z" fill="#557E4A"/>
                <path d="M154.734 112.78H47.2628V124.914H154.734V112.78Z" fill="#557E4A"/>
                <path d="M154.734 147.448H47.2628V159.581H154.734V147.448Z" fill="#557E4A"/>
                <path d="M154.734 182.116H47.2628V194.25H154.734V182.116Z" fill="#557E4A"/>
              </Icon>
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
          <Icon viewBox='0 0 202 249' width="300" height="200">
            <path d="M160.354 0H77.8682H71.4794L66.9632 4.51619L4.51668 66.9632L0 71.4794V77.8682V206.611C0 229.575 18.6815 248.26 41.6494 248.26H160.354C183.318 248.26 202 229.575 202 206.611V41.649C202 18.6815 183.318 0 160.354 0ZM186.579 206.61C186.579 221.097 174.838 232.839 160.354 232.839H41.6494C27.1626 232.839 15.4217 221.097 15.4217 206.61V77.8677H56.0146C68.0804 77.8677 77.8682 68.0833 77.8682 56.0141V15.4212H160.354C174.838 15.4212 186.579 27.1621 186.579 41.649V206.61Z" fill="#557E4A"/>
            <path d="M154.734 45.1765H111.399V88.5119H154.734V45.1765Z" fill="#557E4A"/>
            <path d="M154.734 112.78H47.2628V124.914H154.734V112.78Z" fill="#557E4A"/>
            <path d="M154.734 147.448H47.2628V159.581H154.734V147.448Z" fill="#557E4A"/>
            <path d="M154.734 182.116H47.2628V194.25H154.734V182.116Z" fill="#557E4A"/>
          </Icon>
          <Text mt={4} mb={1}>Drag and drop file here, or</Text>
          <Box>
            <input {...getInputProps()} />
                <Text fontSize="md" mb={4}>choose a file to upload</Text>
          </Box>
        </Box>)}
      </Center>
    );
}

export default Upload;