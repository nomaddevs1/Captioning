import { Box, Text, Button } from "@chakra-ui/react";
import { useContext } from 'react';
import { TranscriptionContext } from 'src/context/TranscriptionContext';

function DisplayTranscript (){
    const transcription = useContext(TranscriptionContext);
    const displayText = () => {
        if (transcription){
            /**
            const arr:Array<JSX.Element> = [];
            for (let i = 0; i < transcription.length; i++){
                arr.push(<Text key={i} mb={4} className="transcript-text">{transcription[i].text}</Text>);
            }
            return arr;
            */
           console.log(transcription);
        }
    }


    return (
        <Box height="100vh">
            <Box pt={20} pl={40} pr={40} height="80vh" pos="relative">
                <Box overflowY="auto" height="100%" bg="primary.moss.100" p={6} textAlign="left">

                </Box>
            </Box>
            <Button mt={10}>Customize Transcript</Button>
        </Box>
    );
}

export default DisplayTranscript;