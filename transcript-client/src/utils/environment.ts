export const IS_PRODUCTION =
  !process.env.NODE_ENV || process.env.NODE_ENV === "production";
export const MOCK_BACKEND = process.env["REACT_APP_MOCK_BACKEND"] === "true";
