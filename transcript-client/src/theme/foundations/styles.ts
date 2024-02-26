export const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === 'dark' ? 'black' : 'primary.gray.50',
    },
  }),
} as const