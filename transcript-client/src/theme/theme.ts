import { extendTheme } from "@chakra-ui/react"
import colors from "src/theme/foundations/colors"
import styles from "src/theme/foundations/styles"
import fonts from "src/theme/foundations/fonts"
import Button from "src/theme/components/Button"
const theme = {
  styles: styles,
  colors: colors,
  fonts: fonts,
  components: {
    Button

  },
}

export default extendTheme(theme)
