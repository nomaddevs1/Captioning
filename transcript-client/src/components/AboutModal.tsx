import { 
    useDisclosure, 
    Box,
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
            <Button onClick={onOpen} variant="link" fontSize="lg">About</Button>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <Box height="10px" bg="#557E4A" borderTopRadius="15px"></Box>
                    <ModalHeader borderBottom="none" color="#557E4A">About Captioning</ModalHeader>
                    <ModalCloseButton mt="2" />
                    <ModalBody padding="4">
                        <Text mb="4">
                            Welcome to Captioning, the assistive tool to make audio based media accessible 
                            to people that are deaf or hard of hearing. Upload a file of a podcast, interview, 
                            or any spoken audio and follow the steps to generate a downloadable transcript.
                        </Text>
                        <Text mb="4">
                            Start by dragging your audio file onto the file icon or clicking underneath to 
                            select one from your computer. Once the transcript is generated you will be able to
                            adjust the visual settings to customize the text as you wish. And when you're done you
                            can save the full customized transcript.
                        </Text>
                        <Text mb="2">
                            If you get stuck at any point, check out the tutorials in the bottom right corner 
                            for some direction.
                        </Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AboutModal