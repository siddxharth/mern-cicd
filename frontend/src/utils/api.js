import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_BACKEND_URL;
const apiPort = import.meta.env.VITE_APP_BACKEND_PORT;

const api = axios.create({
    baseURL: `http://${"localhost"}:${"3001"}/api/v1`,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
