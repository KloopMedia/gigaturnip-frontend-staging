import firebase from 'firebase';


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
firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
// if (window.location.hostname === "localhost") {
//   db.useEmulator("localhost", 8080);
// }

const provider = new firebase.auth.GoogleAuthProvider();
firebase.firestore().settings({
    ignoreUndefinedProperties: true,
})
export const signInWithGoogle = () => {
    provider.setCustomParameters({
        prompt: 'select_account'
    });
    firebase.auth().signInWithPopup(provider);
};

export const signOut = () => {
    firebase.auth().signOut()
}

export default firebase;