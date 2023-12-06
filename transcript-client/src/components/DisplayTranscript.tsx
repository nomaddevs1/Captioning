import { Box, Text } from "@chakra-ui/react";
import { useContext } from 'react';
import { TranscriptionContext } from 'src/context/TranscriptionContext';

function DisplayTranscript (){
    const transcription: any = useContext(TranscriptionContext);
    const displayText = () => {
        if (transcription){
            const arr:Array<JSX.Element> = [];
            for (let i = 0; i < transcription.transcriptionData.length; i++){
              //@ts-ignore
                arr.push(<Text key={i} mb={4}>{transcription.transcriptionData[i].text}</Text>);
            }
            return arr;
        }
    }

    return (
        <Box height="100%">
            <Box pt={10} pl={20} pr={20} height="85vh" pos="relative">
                <Box overflowY="auto" height="100%" bg="primary.moss.100" p={6} textAlign="left">
                    {displayText()}
                </Box>
            </Box>
        </Box>
    );
}

export default DisplayTranscript;
