const styles = {
  global: () => ({
    body: {
      bg: "primary.moss.50",
    },
  }),
} as const

export type styles = typeof styles

export default styles
