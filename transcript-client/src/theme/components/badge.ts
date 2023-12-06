import { defineStyleConfig } from "@chakra-ui/react"

const Badge = defineStyleConfig({
  baseStyle: {
    bg: "primary.bay.100",
    color: "primary.bay.900",
    borderRadius: "3.125rem",
    fontWeight: 600,
    padding: "4px 12px",
    justifyContent: "center",
    alignItems: "center",
    textTransform: "uppercase",
  },
  variants: {
    poppy: {
      bg: "secondary.poppy.500",
      color: "neutral.10",
    },
    ivy: {
      bg: "primary.ivy.100",
      color: "primay.ivy.700",
    },
  },
})

export default Badge
