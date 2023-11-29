import { Box, Button } from "@chakra-ui/react";
import { useState } from 'react';

function TutorialPopup (props: any) {
    const buttonStyle = {
        bg: 'none',
        border: 'solid 3px',
        float: 'right',
        borderRadius: '50%',
        borderColor: "#557E4A",
        fontSize: 'xlg',
        width: '56px',
        height: '56px'
    };

    const [showTutorial, setShowTutorial] = useState(false);
    
    return (
        <Box pos="fixed" bottom="4" right="4">
            { showTutorial ? 
                <Box>
                    <Box width="400px" bg="white" borderRadius="8" mb="4">
                        <Box height="8px" bg="#557E4A" borderTopRadius="8"></Box>
                        <Box p="2" textAlign="left" fontSize="md">{props.text}</Box>
                    </Box>
                    <Button sx={buttonStyle} onClick={() => setShowTutorial(false)}>X</Button>
                </Box> :
                <Button sx={buttonStyle} onClick={() => setShowTutorial(true)}>?</Button>
            }
        </Box>
    );
}

export default TutorialPopup