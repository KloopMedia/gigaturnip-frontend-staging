import axios from "axios";
import {baseUrl} from "./Urls";


const instance = axios.create({
    baseURL: baseUrl
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