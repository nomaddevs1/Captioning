import { Box, Button, SystemStyleObject, Text } from "@chakra-ui/react";
import { useState } from 'react';


interface Tutorial {
    position: SystemStyleObject;
    text: String;
}

interface TutorialPopupProps {
    tutorials: Tutorial[];
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

const TutorialPopup: React.FC<TutorialPopupProps> = ({tutorials}) => {
    const [showTutorial, setShowTutorial] = useState(false);
    let tutorial_list: Array<JSX.Element> = [];
    for (let i = 0; i < tutorials.length; i++){
        tutorial_list.push(
            <Box key={i} sx={tutorials[i].position} width="350px" bg="white" borderRadius="8" mb="4" zIndex="1000" boxShadow="lg">
                <Box height="8px" bg="#557E4A" borderTopRadius="8"></Box>
                <Box p="2" textAlign="left" fontSize="md">
                    <Text>{tutorials[i].text}</Text>
                </Box>
            </Box>
        )
    }
    
    if (!showTutorial) return (
        <Button sx={BUTTON_STYLE} onClick={() => setShowTutorial(true)}>?</Button>
    )
    return (
        <Box zIndex="1000">
            {tutorial_list}
            <Button sx={BUTTON_STYLE} onClick={() => setShowTutorial(false)}>X</Button>
        </Box>
    );
}

export default TutorialPopup