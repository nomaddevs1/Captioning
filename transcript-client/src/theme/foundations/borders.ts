const borders = {
  none: 0,
  "1px": "1px solid",
  "2px": "2px solid",
  "3px": "3px solid",
} as const

export type borders = typeof borders

export default borders
