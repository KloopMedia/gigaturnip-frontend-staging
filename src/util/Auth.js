import React, {useEffect, useState} from "react";
import firebase from "./Firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setCurrentUser(user)
                user.getIdToken(true).then((idToken) => {
                    localStorage.setItem("token", idToken);
                })
            }
        });
        firebase.auth().onIdTokenChanged(user => {
            if (user) {
                user.getIdToken(false).then((idToken) => {
                    localStorage.setItem("token", idToken);
                })
            }
        })
    }, []);


    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
