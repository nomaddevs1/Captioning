
import { Box, LightMode } from "@chakra-ui/react"
import { ReactNode } from "react"

interface TranscriptionSideBarProps {
  children: ReactNode
}

const TranscriptionSideBar = ({ children }: TranscriptionSideBarProps) => {
  return (
    <LightMode>
      <Box backgroundColor={"primary.gray.100"} overflowY="auto" overflowX={"hidden"} height="100%" padding="4"> 
        {children}
      </Box>
    </LightMode>
  )
}

export default TranscriptionSideBar
