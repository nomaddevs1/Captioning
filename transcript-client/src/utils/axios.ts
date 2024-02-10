import axios from "axios"

export const API_URL = process.env.PROD ? "/api" : "http://localhost:8000"

export const AxiosPrivateClient = axios.create({
  baseURL: API_URL,
  // headers: {
  //   "Content-Type": "application/json"
  // },
})


