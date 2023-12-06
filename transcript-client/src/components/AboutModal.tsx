import { 
    useDisclosure, 
    Text,
    Button, 
    Modal, 
    ModalOverlay, 
    ModalCloseButton, 
    ModalHeader, 
    ModalContent,
    ModalBody 
} from "@chakra-ui/react";

function AboutModal(){
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button onClick={onOpen} variant="link" color="black" fontSize="lg">About</Button>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Captioning</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AboutModal