import { useState } from 'react';
import {
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    Box,
    Text,
    useColorModeValue,
    Flex,
} from "@chakra-ui/react"
import { useTutorialContext } from 'src/context/TutorialContext';

const TutorialPopup = () => {
    const bgColor = useColorModeValue("white", "primary.gray.100");
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [currentIndex, setCurrentIndex] = useState(0);
    const { tutorialList, toggleHelp } = useTutorialContext();

    const nextTutorial = () => {
        if (currentIndex < tutorialList.tutorials.length - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        } else {
            onClose();
            setCurrentIndex(0);
        }
    }

    const displayTutorial = () => {
        const currentTutorial = tutorialList.tutorials[currentIndex];

        if(!currentTutorial){
            return null;
        }

        
        return (
            <Flex sx={currentTutorial.position} width={{md: "370px"}} borderRadius="8" mb="4" zIndex="1000" flexDirection="row">
                <Box 
                    width={{md: "40px"}} 
                    backgroundImage={`linear-gradient(to bottom left, ${bgColor} 50%, transparent 0), linear-gradient(to top left, ${bgColor} 50%, transparent 0)`} 
                    bgSize="100% 50%" 
                    bgRepeat="no-repeat" 
                    bgPosition="bottom, top"
                />
                <Box p="2" textAlign="left" fontSize="md" width={{md: "320px"}} bg={bgColor}>
                    <Text>{currentTutorial.text}</Text>
                </Box>
                <Box width={{md: "10px"}} bg="#557E4A" borderRightRadius="8" />
            </Flex>
        );
    };

    return (
        <>
            <Button onClick={onOpen} ref={toggleHelp} id="toggleTutorial" variant="link" fontSize={{base: "xl", md: "lg"}} color="white">Help</Button>

            <Modal isOpen={isOpen} onClose={nextTutorial} size="sm" motionPreset="none">
                <ModalOverlay bg='blackAlpha.500'/>
                <ModalContent display={{base: "flex", md: "box"}} alignItems={{base: "center"}}>
                    {displayTutorial()}
                </ModalContent>
            </Modal>
        </>
    );
}

export default TutorialPopup