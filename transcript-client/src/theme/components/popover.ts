import { popoverAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(popoverAnatomy.keys)

const baseStyle = definePartsStyle({
  header: {
    borderColor: "neutral.100",
    padding: "16px 24px !important",
    fontSize: "1.0625rem",
    fontWeight: 500,
  },
  content: {
    boxShadow: "var(--chakra-shadows-3)",
    borderRadius: "8px",
    borderColor: "neutral.200",
  },
  body: {
    padding: "24px",
    fontSize: "0.875rem",
  },
  footer: {
    borderColor: "neutral.100",
    padding: "16px 24px",
    gap: "10px",
  },
  arrow: {
    display: "none",
  },
})

export const Popover = defineMultiStyleConfig({ baseStyle })
