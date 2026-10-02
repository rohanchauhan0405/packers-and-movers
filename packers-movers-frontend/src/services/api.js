// Import axios
import axios from "axios";

// Create axios instance
const api = axios.create({
  // Django backend API URL
  baseURL: "http://127.0.0.1:8000/api/",
});

// Export api so we can use it in other files
export default api;