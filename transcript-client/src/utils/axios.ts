import axios from "axios";
import { isProduction } from "./environment";

export const API_URL = isProduction()
  ? "https://api.transcribro.com"
  : "http://localhost:8000";

export const AxiosPrivateClient = axios.create({
  baseURL: API_URL,
  // headers: {
  //   "Content-Type": "application/json"
  // },
});
