import axios from "axios";


const instance = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

instance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers["Authorization"] = 'JWT ' + token;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance;