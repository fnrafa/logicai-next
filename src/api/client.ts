import axios from 'axios';

const client = axios.create({
    baseURL: "http://localhost:3010",
    timeout: 30000,
});

client.interceptors.request.use(async (config) => {
    const token =  '';
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    config.headers.Accept = 'application/json';
    return config;
});

client.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        if (error.response) {
            throw new Error(error.response.data.message || 'An error occurred');
        } else {
            throw new Error(error.message || 'A network error occurred');
        }
    }
);

export default client;
