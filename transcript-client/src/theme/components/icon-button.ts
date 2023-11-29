import { defineStyle, defineStyleConfig } from "@chakra-ui/react"

const baseStyle = defineStyle({
  background: "red !important",
})

export const IconButton = defineStyleConfig({ baseStyle })
