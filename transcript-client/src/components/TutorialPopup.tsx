import { Box, Text, Button } from "@chakra-ui/react";
import { useState } from 'react';

function TutorialPopup (props: any) {
    let toggle = true;
    const [showTutorial, setShowTutorial] = useState(toggle);
    const toggleTutorial = () => setShowTutorial(toggle ? false : true);

    return (
        <Box pos="fixed" bottom="4" right="4">
            { showTutorial ?
            <Button bg="none" border="solid" borderRadius="50%" fontSize="xlg" borderColor="#557E4A" borderWidth="3px" onClick={toggleTutorial}>?</Button> :
            <Box width="400px" bg="white" p="2" borderRadius="10">
                <Box textAlign="left" fontSize="md">
                    <Text>{props.text}</Text>
                </Box>
            </Box>
            }
        </Box>
    )
}

export default TutorialPopup