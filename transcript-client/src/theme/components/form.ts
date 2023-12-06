import { defineStyleConfig } from "@chakra-ui/react"

const Form = defineStyleConfig({
  baseStyle: {
    helperText: {
      fontSize: "0.75rem",
    },
    requiredIndicator: {
      display: "none",
    },
  },
})

export default Form
