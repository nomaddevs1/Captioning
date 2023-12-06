import { cardAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const baseStyle = definePartsStyle({
  container: {
    backgroundColor: "neutral.50",
    cursor: "pointer",
    borderRadius: "15px",
    boxShadow: "none",
    border: "none",
    padding: "32px",
    transition: "box-shadow 0.3s ease",
    _hover: {
      transform: "scale(1.02)",
    },
  },
  header: {
    padding: 0,
    fontFamily: "fonts.body",
    fontSize: "1.0625rem",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "1.625rem",
    color: "neutral.900",
  },
  body: {
    padding: 0,
    color: "neutral.900",
    fontSize: "0.875rem",
  },
  footer: {
    padding: 0,
    marginTop: "32px",
  },
})

const sizes = {
  md: definePartsStyle({
    container: {},
  }),
}

export const Card = defineMultiStyleConfig({ baseStyle, sizes })
