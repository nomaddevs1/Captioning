import {
    Flex,
    IconButton,
    useDisclosure,
    Modal,
    ModalContent,
    Box,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react"
import { Link, useNavigate } from 'react-router-dom';
import AboutModal from "./tutorials/AboutModal";
import TutorialPopup from "./tutorials/TutorialPopup";
import { List } from "@phosphor-icons/react";
import { FaMoon, FaSun } from 'react-icons/fa';
//@ts-ignore
import {ReactComponent as Logo} from 'src/assets/header_logo.svg';

function Header(){
    const { colorMode, toggleColorMode } = useColorMode();
    const {isOpen, onOpen, onClose} = useDisclosure()
    const navigate = useNavigate();
    const refreshPage = () => {
        navigate(0)     
    }
    const drawerBgColor = useColorModeValue("primary.gray.100", "black");
    return (
        <Flex 
            width="100%" 
            bg= {useColorModeValue("#121212", "black")} 
            height="80px" 
            alignItems="center" 
            pos="fixed" 
            padding=" 0 6rem" 
            boxShadow="0px 1px 2px  2px rgba(0, 0, 0, 0.13)" 
            justifyContent={{base: "center", md: "left"}}
        >   
            <Link to="/upload">
                <Logo as="button" onClick={refreshPage} width="40px" height="40px" fill='white' stroke='white' stroke-width="10"/>
            </Link>
            <Link to="/upload">
                <Box as="button" onClick={refreshPage} ml="10px" color={"white"} fontWeight="bold" fontSize="30px" >Captioning</Box>
            </Link>
            <Box width="100%" alignItems="center" justifyContent="end" display={{base: "none", md: "flex"}}>
                <AboutModal />
                <TutorialPopup />
                <IconButton
                    aria-label="Toggle dark mode"
                    icon={colorMode === 'dark' ? <FaSun /> : <FaMoon />}
                    onClick={toggleColorMode}  height="40px" // Controls the height of the button
                    width="40px" 
                />
            </Box>
            <Box display={{base: "flex", md: "none"}} alignItems="center">
                <IconButton 
                    aria-label="toggle-menu" 
                    variant="link" 
                    color="white" 
                    icon={<List size={36} />}
                    onClick={onOpen}
                    pos="absolute"
                    right="2"
                >
                </IconButton>
                <Modal isOpen={isOpen} onClose={onClose} size="sm" motionPreset="none">
                    <ModalContent bg={drawerBgColor} display="flex" padding="6px" flexDirection="column" gap="6px" mt="80px" borderRadius="none">
                        <AboutModal />
                        <TutorialPopup />
                    </ModalContent>
                </Modal>
            </Box>
        </Flex>
    );
}

export default Header