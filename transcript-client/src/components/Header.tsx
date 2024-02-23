import { Flex, Box, useDisclosure, Drawer, IconButton, DrawerContent, DrawerBody, Button, useColorModeValue, useColorMode, Switch } from "@chakra-ui/react";
import { Link, useNavigate } from 'react-router-dom';
import AboutModal from "./tutorials/AboutModal";
import TutorialPopup from "./tutorials/TutorialPopup";
import { List } from "@phosphor-icons/react";
import { FaMoon, FaSun } from 'react-icons/fa';


function Header({ tutorialList }: any){

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
                <Box as="button" onClick={refreshPage} color={"white"} fontWeight="bold" fontSize="30px" >Captioning</Box>
            </Link>
            <Box width="100%" alignItems="center" justifyContent="end" display={{base: "none", md: "flex"}}>
                <AboutModal />
                <TutorialPopup tutorials={tutorialList} />
               <Flex justify="flex-end" p={4}>
                <IconButton
                   aria-label="Toggle dark mode"
                 icon={colorMode === 'dark' ? <FaSun /> : <FaMoon />}
                 onClick={toggleColorMode}  height="40px" // Controls the height of the button
                width="40px" 
                         />
                 </Flex>
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
                        <DrawerBody bg= { drawerBgColor} display="flex" flexDirection="column" gap="6px">
                            <AboutModal />a
                            <TutorialPopup tutorials={tutorialList} />
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Box>
        </Flex>
    );
}

export default Header