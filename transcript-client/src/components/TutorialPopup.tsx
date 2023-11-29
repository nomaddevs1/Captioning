import { Box, Text, Button } from "@chakra-ui/react";
import { useState } from 'react';

function TutorialPopup (props: any) {
    const [showTutorial, setShowTutorial] = useState(false);
    
    return (
        <Box pos="fixed" bottom="4" right="4">
            { showTutorial ?
                <Box width="400px" bg="white" p="2" borderRadius="10">
                    <Box textAlign="left" fontSize="md">
                        <Box as="button" pos="absolute" top="0" right="2" opacity="60%" _hover={{ opacity: "100%" }} onClick={() => setShowTutorial(false)}>x</Box>
                        <Text>{props.text}</Text>
                    </Box>
                </Box>:
                <Button bg="none" border="solid 3px" borderRadius="50%" fontSize="xlg" borderColor="#557E4A" onClick={() => setShowTutorial(true)}>?</Button>
            }
        </Box>
    )
}

export default TutorialPopup