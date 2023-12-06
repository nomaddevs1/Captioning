import { avatarAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(avatarAnatomy.keys)

const baseStyle = definePartsStyle({
  container: {
    borderRadius: "100%",
    marginRight: "-3px",
  },
  excessLabel: {
    marginLeft: "4px",
    color: "neutral.900",
    padding: 0,
    fontSize: "0.875rem",
    width: "auto",
    bg: "transparent",
    fontWeight: 500,
  },
})

export const Avatar = defineMultiStyleConfig({ baseStyle })
