
import { defineStyleConfig } from "@chakra-ui/react"

const Button = defineStyleConfig({
  baseStyle: {
    borderRadius: "8px",
    fontWeight: 500,
    fontStyle: "normal",
    letterSpacing: "0.00625rem",
    padding: "0.75rem 1rem",
    gap: "0.5rem",
    justifyContent: "center",
  },
  sizes: {
    sm: {
      h: "2.5rem",
      padding: "1rem 1.5rem",
      fontSize: "1rem",
      lineHeight: "1.375rem",
    },
    lg: {
      h: "3.625rem",
      fontSize: "1rem",
    },
  },
  variants: {
    primary: {
      bg: "primary.moss.100",
      color: "neutral.900",
      _hover: {
        bg: "neutral.200",
        color: "neutral.900",
      },
      _disabled: {
        bg: "primary.moss.50",
        color: "neutral.800",
        _hover: {
          bg: "primary.moss.50 !important",
        },
      },
    },
    accent: {
      bg: "primary.moss.100",
      color: "neutral.900",
      _hover: {
        bg: "neutral.200",
        color: "neutral.700",
      },
      _disabled: {
        bg: "primary.moss.50",
        color: "neutral.500",
      },
    },
    tertiary: {
      bg: "transparent",
      color: "primary.moss.600",
      borderColor: "primary.moss.600",
      borderWidth: "1px",
      borderStyle: "solid",
      _hover: {
        bg: "primary.moss.50",
        color: "primary.moss.400",
        borderColor: "primary.moss.400",
      },
      _disabled: {
        bg: "transparent",
        color: "primary.moss.100",
        borderColor: "primary.moss.100",
      },
    },
    nav: {
      bg: "neutral.0",
      padding: "0rem 1rem",
      height: "3rem",
      width: "100%",
      gap: "0.5rem",
      justifyContent: "flex-start",
      _hover: {
        bg: "neutral.200",
        color: "neutral.700",
      },
      _active: {
        color: "primary.moss.500",
        fontWeight: 700,
      },
    },
  },
  defaultProps: {
    size: "lg",
    variant: "primary",
  },
})

export default Button
