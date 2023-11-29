import { defineStyle, defineStyleConfig } from "@chakra-ui/react"

const outline = defineStyle({
  border: "1px solid",
  borderColor: "neutral.400",
  background: "neutral.0",
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
})

// Outline is Textarea's default variant
export const Textarea = defineStyleConfig({
  variants: { outline },
})
