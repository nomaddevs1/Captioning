export const isProduction = () =>
  !process.env.NODE_ENV || process.env.NODE_ENV === "production";
export const mockBackend = () =>
  process.env["REACT_APP_MOCK_BACKEND"] === "true";
