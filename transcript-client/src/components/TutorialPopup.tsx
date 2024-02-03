import { useState } from 'react';
import {
    useDisclosure,
    Button,
    SystemStyleObject,
    Modal,
    ModalOverlay,
    ModalContent,
    Box,
    Text
} from "@chakra-ui/react"


interface Tutorial {
    position: SystemStyleObject;
    text: String;
}

interface TutorialPopupProps {
    tutorials: Tutorial[];
}

const TutorialPopup: React.FC<TutorialPopupProps> = ({tutorials}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTutorial = () => {
        if (currentIndex < tutorials.length - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        } else {
            onClose();
            setCurrentIndex(0);
        }
    }

    const renderCurrentTutorial = () => {
        const currentTutorial = tutorials[currentIndex];

        if(!currentTutorial){
            return null;
        }

        return (
            <Box sx={currentTutorial.position} width="350px" bg="white" borderRadius="8" mb="4" zIndex="1000" boxShadow="lg">
                <Box height="8px" bg="#557E4A" borderTopRadius="8"></Box>
                <Box p="2" textAlign="left" fontSize="md">
                    <Text>{currentTutorial.text}</Text>
                </Box>
            </Box>
        );
    };

    return (
        <>
            <Button onClick={onOpen} variant="link" fontSize="lg" color="white">Help</Button>

            <Modal isOpen={isOpen} onClose={nextTutorial} size="sm" motionPreset="none">
                <ModalOverlay bg='blackAlpha.500'/>
                <ModalContent>
                    {renderCurrentTutorial()}
                </ModalContent>
            </Modal>
        </>
    );
}

export default TutorialPopup