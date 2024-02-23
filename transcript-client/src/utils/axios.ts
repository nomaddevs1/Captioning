import axios from "axios"

export const API_URL = process.env.REACT_APP_PROD ? "https://api.transcribro.com" : "http://localhost:8000"

export const AxiosPrivateClient = axios.create({
  baseURL: API_URL,
  // headers: {
  //   "Content-Type": "application/json"
  // },
})


