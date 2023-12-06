import { Text } from "@chakra-ui/react"
import { ReactNode } from "react"

interface TranscriptionItemProps {
  title: string
  children: ReactNode
}

const TranscriptionBarItem = ({ title, children }: TranscriptionItemProps) => {
  return (
    <>
      <Text mb="20px" width="100%" fontSize="1.2625rem" fontWeight="800" color={"neutral.50"}>
        {title}
      </Text>
      {children}
    </>
  )
}

export default TranscriptionBarItem
