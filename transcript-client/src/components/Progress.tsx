import { Flex, CircularProgress, CircularProgressLabel, Text } from "@chakra-ui/react";
import upload_logo from 'src/assets/upload_logo.svg'; 

interface ProgressProps {
  value: number; 
}

const Progress = ({ value }: ProgressProps) => {
  return (
    <Flex
      position="fixed" 
      top="0"
      left="0"
      right="0"
      bottom="0"
      justifyContent="center" 
      alignItems="center" 
      flexDirection="column"
    >
      <CircularProgress value={value} color="green.400" size="260px" thickness="8px">
        <CircularProgressLabel>
          <Flex justifyContent="center" alignItems="center" height="100%" width="100%">
            <img src={upload_logo} alt="Uploading file" style={{ width: '160px', height: '160px' }} />
          </Flex>
        </CircularProgressLabel>
      </CircularProgress>
      <Text fontSize="mb" mt={4}>
        Preparing your transcription, please wait...
      </Text>
    </Flex>
  );
};

export default Progress;
