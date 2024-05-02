import axios from "axios";
import { IS_PRODUCTION } from "./environment";


const api_url = process.env.REACT_APP_API_URL ||  "https://api.transcribro.com"
export const API_URL = IS_PRODUCTION
  ? api_url
  : "http://localhost:8000";

export const AxiosPrivateClient = axios.create({
  baseURL: API_URL,
  // headers: {
  //   "Content-Type": "application/json"
  // },
});
