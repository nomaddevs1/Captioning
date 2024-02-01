import { Box, Button, Text , Grid} from "@chakra-ui/react"
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
           <Grid templateColumns="50% 50%" gap="4%" m={2}>
        <Button mt="10px" width="100%" mb="70px">Save Transcript</Button>
        <Button variant={"delete"} mt="10px" width="100%" mb="70px">Reset</Button>
        </Grid>
    </Box>
  )
}

export default TranscriptionBarItem
