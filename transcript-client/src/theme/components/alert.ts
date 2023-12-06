import { alertAnatomy as parts } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle((props) => {
  const { status } = props

  return {
    title: {
      color: "neutral.900",
      fontWeight: 500,
    },
    icon: {
      color: "neutral.600",
    },
    description: {
      color: "neutral.900",
      fontWeight: 400,
    },
    container: {
      bg:
        status === "success"
          ? "primary.ivy.50"
          : status === "error"
          ? "secondary.poppy.50"
          : "primary.bay.50",
    },
    _light: {
      bg: "gray.200",
    },
  }
})

export const Alert = defineMultiStyleConfig({
  baseStyle,
})
