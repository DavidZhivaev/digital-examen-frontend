import axios from "axios"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/lib/constants"

const api = axios.create({
  baseURL: "/",
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

    if (status === 401) {
      localStorage.removeItem(ACCESS_TOKEN)
      localStorage.removeItem(REFRESH_TOKEN)
      localStorage.removeItem("current-user")

      window.location.href = "/login"
    }
  
    return Promise.reject(error)
  }
)

export default api