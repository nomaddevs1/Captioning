const shadows = {
  none: 0,
  1: "2px 2px 10px 2px rgba(0, 0, 0, 0.08)",
  2: "4px 4px 20px 4px rgba(0, 0, 0, 0.08)",
  3: "8px 8px 30px 8px rgba(0, 0, 0, 0.15)",
} as const

export type shadows = typeof shadows

export default shadows
