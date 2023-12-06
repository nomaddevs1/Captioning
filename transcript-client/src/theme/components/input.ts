import { inputAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const outline = definePartsStyle({
  field: {
    border: "1px solid",
    borderColor: "neutral.400",
    bg: "neutral.0",
    borderRadius: "8px",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    _placeholder: {
      color: "neutral.400",
    },
    _hover: {
      borderColor: "neutral.400",
    },
    _focus: {
      borderColor: "primary.bay.500",
      boxShadow: "none",
    },
    _invalid: {
      backgroundColor: "secondary.poppy.50",
      borderColor: "secondary.poppy.600",
      boxShadow: "none",
      _placeholder: {
        color: "secondary.poppy.400",
      },
    },
  },
  addon: {
    bg: "neutral.0",
    border: "none",
  },
  element: {
    color: "neutral.800",
  },
})

// outline is Chakra's input default variant
export const Input = defineMultiStyleConfig({ variants: { outline } })
