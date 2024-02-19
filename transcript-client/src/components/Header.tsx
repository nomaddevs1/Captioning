import { Flex, Box, useDisclosure, Drawer, IconButton, DrawerContent, DrawerBody, Button } from "@chakra-ui/react";
import { Link, useNavigate } from 'react-router-dom';
import AboutModal from "./tutorials/AboutModal";
import TutorialPopup from "./tutorials/TutorialPopup";
import { List } from "@phosphor-icons/react";
import {ReactComponent as Logo} from 'src/assets/header_logo.svg';

function Header({ tutorialList }: any){
    const {isOpen, onOpen, onClose} = useDisclosure()
    const navigate = useNavigate();
    const refreshPage = () => {
        navigate(0)
    }

    return (
        <Flex 
            width="100%" 
            bg="#121212" 
            height="80px" 
            alignItems="center" 
            pos="fixed" 
            padding=" 0 6rem" 
            boxShadow="0px 1px 2px  2px rgba(0, 0, 0, 0.13)" 
            justifyContent={{base: "center", md: "left"}}
        >   <Link to="/upload">
                <Logo as="button" onClick={refreshPage} width="50px" height="50px" fill='white' stroke='white' stroke-width="10"/>
            </Link>
            <Link to="/upload">
                <Box as="button" onClick={refreshPage} color={"white"} fontWeight="bold" fontSize="30px" >Captioning</Box>
            </Link>
            <Box width="100%" alignItems="center" justifyContent="end" display={{base: "none", md: "flex"}}>
                <AboutModal />
                <TutorialPopup tutorials={tutorialList} />
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
                <Drawer isOpen={isOpen} placement="top" onClose={onClose}>
                    <DrawerContent mt="80px">
                        <DrawerBody bg="primary.gray.100" display="flex" flexDirection="column" gap="6px">
                            <AboutModal />
                            <TutorialPopup tutorials={tutorialList} />
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Box>
        </Flex>
    );
}

export default Header