import { tabsAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys)

const baseStyle = definePartsStyle({
  tablist: {
    border: "none !important",
    gap: "16px",
  },
  tab: {
    padding: "8px 0 !important",
    bg: "none !important",
    _hover: {
      color: "neutral.600 !important",
      borderBottom: "2px solid ",
      borderColor: "neutral.300",
    },
    _selected: {
      color: "primary.moss.500 !important",
      fontWeight: 600,
      _hover: {
        bg: "none",
      },
    },
  },
})

export const Tabs = defineMultiStyleConfig({ baseStyle })
