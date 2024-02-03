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

    return (
        <>
            <Button onClick={onOpen} variant="link" fontSize="lg" color="white">Help</Button>

            <Modal isOpen={isOpen} onClose={onClose} size="sm" motionPreset="none">
                <ModalOverlay bg='blackAlpha.300'/>
                <ModalContent>
                    {tutorial_list}
                </ModalContent>
            </Modal>
        </>
    );
}

export default TutorialPopup