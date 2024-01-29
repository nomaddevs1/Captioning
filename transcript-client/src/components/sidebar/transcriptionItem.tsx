import { Box, Button, Text } from "@chakra-ui/react"
import { ReactNode } from "react"

interface TranscriptionItemProps {
  title: string
  children: ReactNode
}

const TranscriptionBarItem = ({ title, children }: TranscriptionItemProps) => {
  return (
    <Box mb="20px">
      <Text mb="20px" width="100%" fontSize="1.2625rem" fontWeight="800" color={"neutral.50"}>
        {title}
      </Text>
      {children}
      <Button mt="10px" width="100%" mb="70px">Save Transcript</Button>
    </Box>
  )
}

export default TranscriptionBarItem
