import { defineStyle, defineStyleConfig, cssVar } from "@chakra-ui/react"

const $startColor = cssVar("skeleton-start-color")
const $endColor = cssVar("skeleton-end-color")

const baseStyle = defineStyle({
  _light: {
    [$startColor.variable]: "var(--chakra-colors-neutral-200)",
    [$endColor.variable]: "var(--chakra-colors-neutral-300)",
  },
})

export const Skeleton = defineStyleConfig({ baseStyle })
