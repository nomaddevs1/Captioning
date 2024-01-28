import { Box, Button, SystemStyleObject } from "@chakra-ui/react";
import { useState } from 'react';

interface TutorialPopupProps {
    position: SystemStyleObject;
    text: JSX.Element;
}

const BUTTON_STYLE = {
    bg: 'none',
    border: 'solid 3px',
    float: 'right',
    borderRadius: '50%',
    borderColor: "#557E4A",
    fontSize: 'xlg',
    width: '56px',
    height: '56px',
    pos: 'fixed',
    bottom: '4',
    right: '4'
};

function TutorialPopup (tutorial: TutorialPopupProps) {
    const [showTutorial, setShowTutorial] = useState(false);
    
    if (!showTutorial) return (
        <Button sx={BUTTON_STYLE} onClick={() => setShowTutorial(true)}>?</Button>
    )
    return (
        <Box sx={tutorial.position} zIndex="1000">
            <Box width="400px" bg="white" borderRadius="8" mb="4">
                <Box height="8px" bg="#557E4A" borderTopRadius="8"></Box>
                <Box p="2" textAlign="left" fontSize="md">{tutorial.text}</Box>
            </Box>
            <Button sx={BUTTON_STYLE} onClick={() => setShowTutorial(false)}>X</Button>
        </Box>
    );
}

export default TutorialPopup