import axios from "axios";
import firebase from './Firebase'


const instance = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

instance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("token");
        // const dbRequest = window.indexedDB.open("firebaseLocalStorageDb");
        // dbRequest.onsuccess = () => {
        //     const db = dbRequest.result;
        //     console.log(db)
        //     const store = 'firebaseLocalStorage';
        //     const tx = db.transaction(store);
        //     console.log(tx)
        //     const req = tx.objectStore(store).getAll();
        //     req.onsuccess = () => {
        //         console.log(req.result)
        //         const currentSession = req.result.filter(se => se.value.authDomain === "gigaturnip-b6b5b.firebaseapp.com").pop()
        //         console.log(currentSession)
        //         const token = currentSession.value.stsTokenManager.accessToken
        //         console.log(token)
        //         if (token) {
        //             config.headers["Authorization"] = 'JWT ' + token;
        //         }
        //     };
        // }

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