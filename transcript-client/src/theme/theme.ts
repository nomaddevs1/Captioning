import { extendTheme } from "@chakra-ui/react"
import {styles} from "src/theme/foundations/styles"
import {colors} from "src/theme/foundations/colors"
import {borders} from "src/theme/foundations/borders"
import {spacing} from "src/theme/foundations/spacing"
import {shadows} from "src/theme/foundations/shadows"
import {fonts} from "src/theme/foundations/fonts"
import Button from "src/theme/components/Button"
import Badge from "src/theme/components/badge"
import { Card } from "src/theme/components/card"
import { Avatar } from "src/theme/components/avatar"
import { Modal } from "src/theme/components/modal"
import { Tabs } from "src/theme/components/Tab"
import { Input } from "src/theme/components/input"
import { Textarea } from "src/theme/components/textarea"
import FormLabel from "src/theme/components/form-label"
import Form from "src/theme/components/form"
import { Menu } from "src/theme/components/menu"
import { Popover } from "src/theme/components/popover"
import { Skeleton } from "src/theme/components/skeleton"
import { IconButton } from "src/theme/components/icon-button"
import { Heading } from "src/theme/components/heading"
import { Tooltip } from "src/theme/components/tooltip"
import { Alert } from "src/theme/components/alert"

const theme = {
  styles: styles,
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: colors,
  borders: borders,
  spacing: spacing,
  shadows: shadows,
  fonts: fonts,
  components: {
    Button,
    Badge,
    Card,
    Avatar,
    Modal,
    Tabs,
    Input,
    FormLabel,
    Textarea,
    Form,
    Menu,
    Popover,
    Skeleton,
    IconButton,
    Heading,
    Tooltip,
    Alert,
  },
}

export default extendTheme(theme)
