import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://api.example.com", // Ou seu endpoint real
    timeout: 10000,
});

export default apiClient;
