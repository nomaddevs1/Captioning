import { Box, Text, Button } from "@chakra-ui/react";

function Transcript (){
    const transcription_response = {
        config : {},
        data : {
            transcription : [
                {
                    "end" : 9.88,
                    "start" : 0.0,
                    "text" : "The Speech-to-Text API provides two endpoints, transcription and translation based upon your"
                },
                {
                    "end" : 16.4,
                    "start" : 9.88,
                    "text" : "state-of-the-art open source large V2 Whisper model."
                },
                {
                    "end" : 21.34,
                    "start" : 16.4,
                    "text" : "They can be used to transcribe audio into whatever language the audio is in, translate"
                },
                {
                    "end" : 23.64,
                    "start" : 21.34,
                    "text" : "and transcribe the audio into English."
                },
                {
                    "end" : 30.0,
                    "start" : 23.64,
                    "text" : "The uploads are currently limited to 25 MB and the following input file types are supported"
                },
                {
                    "end" : 36.76,
                    "start" : 30.0,
                    "text" : "MP3, MP4, MPEG, MPGA, M4A, WAV and WEB."
                },
                {
                    "end" : 38.32,
                    "start" : 36.76,
                    "text" : "Quick Stats Transcription"
                },
                {
                    "end" : 23.6,
                    "start" : 38.32,
                    "text" : "The Transcription API takes as an input audio file you want to transcribe and describes"
                }
            ]
        },
        headers: {},
        request: {},
        status : 200,
        statusText: "OK"
    }

    const displayText = () => {
        const arr:Array<JSX.Element> = [];
        const transcription = transcription_response.data.transcription;
        for (let i = 0; i < transcription.length; i++){
            arr.push(<Text key={transcription[i].end} fontSize="sm" opacity="60%">{transcription[i].start}</Text>)
            arr.push(<Text key={i} mb={4} className="transcript-text">{transcription[i].text}</Text>);
        }
        return arr;
    }


    return (
        <Box height="100vh">
            <Box pt={20} pl={40} pr={40} height="80vh" pos="relative">
                <Box overflowY="auto" height="100%" bg="primary.moss.100" p={6} textAlign="left">
                    {displayText()}
                </Box>
            </Box>
            <Button mt={10}>Customize Transcript</Button>
        </Box>
    );
}

export default Transcript;