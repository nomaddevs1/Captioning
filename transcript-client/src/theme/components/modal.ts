import { modalAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(modalAnatomy.keys)

const baseStyle = definePartsStyle({
  overlay: {
    bg: "neutral.900",
    opacity: ".5 !important",
  },
  dialog: {
    borderRadius: "15px",
  },
  body: {
    padding: "0px",
  },
  header: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: "neutral.100",
  },
  footer: {
    h: "63px",
    padding: "0 24px",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: "neutral.100",
  },
})

export const Modal = defineMultiStyleConfig({ baseStyle })
