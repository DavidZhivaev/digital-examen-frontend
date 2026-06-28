import axios from "axios";
import { ACCESS_TOKEN } from "@/lib/constants";

const api = axios.create({
  baseURL: "http://188.126.63.242:1580",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    console.log("🔑 Token from storage:", token ? "EXISTS" : "NOT FOUND");
    console.log("📤 Request to:", config.url);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Authorization header set");
    } else {
      console.warn("⚠️ NO TOKEN - request will fail!");
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;