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
    ModalBody,
    useColorModeValue
} from "@chakra-ui/react";

function AboutModal(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const bgColor = useColorModeValue("white", "primary.gray.100");
    const titleColor = useColorModeValue("blue.800", "white");

    return (
        <>
            <Button onClick={onOpen} variant="link" fontSize={{base: "xl", md: "lg"}} color="white">About</Button>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent bg = {bgColor}>
                    <Box height="10px" bg="blue.800" borderTopRadius="15px"></Box>
                    <ModalHeader borderBottom="none" color={titleColor}>About Transcribro</ModalHeader>
                    <ModalCloseButton mt="2" />
                    <ModalBody pl="6" pr="6" mt="10px" mb="30px">
                        <Text mb="4">
                            Welcome to Transcribro, the assistive tool to make audio based media accessible 
                            to people that are deaf or hard of hearing. Upload a file of a podcast, interview, 
                            or any spoken audio and follow the steps to generate a downloadable transcript.
                        </Text>
                        <Text mb="4">
                            Start by dragging your audio file onto the file icon or clicking underneath to 
                            select one from your computer. Once the transcript is generated, you will be able to
                            adjust the visual settings to customize the text as you wish. And when you're done you
                            can save the full customized transcript.
                        </Text>
                        <Text mb="2">
                            If you get stuck at any point, check out the tutorials from the help button in the header 
                            for some direction.
                        </Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AboutModal