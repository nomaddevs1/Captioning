import { defineStyle, defineStyleConfig } from "@chakra-ui/react"

const baseStyle = defineStyle({
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "2.5rem",
  letterSpacing: "-0.05625rem",
})

export const Heading = defineStyleConfig({ baseStyle })
