import { menuAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys)

const baseStyle = definePartsStyle({
  list: {
    boxShadow: "2px 2px 10px 2px rgba(0, 0, 0, 0.08)",
    borderRadius: "8px",
    border: "none",
  },
  item: {
    color: "neutral.900",
    fontSize: "1rem",
    padding: "0.25rem 1rem",
    _hover: {
      bg: "primary.moss.50",
      color: "neutral.900",
    },
    _focus: {
      bg: "primary.moss.50",
      color: "neutral.900",
    },
    _active: {
      color: "neutral.500",
    },
  },
})

export const Menu = defineMultiStyleConfig({ baseStyle })
