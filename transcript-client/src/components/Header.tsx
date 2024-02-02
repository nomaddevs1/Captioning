import { Flex, Box } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import AboutModal from "./AboutModal";

function Header(){
    

    return (
        <Flex width="100%" bg="#121212" height="80px" alignItems="center" pos="fixed" padding=" 0 6rem" boxShadow="0px 1px 2px  2px rgba(0, 0, 0, 0.13)" >
            <Link to="/upload">
                <Box as="button" color={"white"} fontWeight="bold" fontSize="30px">Captioning</Box>
            </Link>
            <Flex width="100%" alignItems="center" justifyContent="end">
                <AboutModal />
            </Flex>
        </Flex>
    );
}

export default Header