import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCXiwOUNsbzKH7sbSAZrqA9f7VOeCMdUOQ",
    authDomain: "gigaturnip-b6b5b.firebaseapp.com",
    projectId: "gigaturnip-b6b5b",
    storageBucket: "gigaturnip-b6b5b.appspot.com",
    messagingSenderId: "414429242328",
    appId: "1:414429242328:web:a4685f5ac6895ea767c8ad",
    measurementId: "G-Y8JTEJMTET"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export {app, auth, provider};