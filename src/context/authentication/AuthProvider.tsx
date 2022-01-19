import React, {useEffect, useState} from "react";
import {auth, provider} from "../../services/firebase/Firebase";
import {signInWithPopup, getIdToken, signOut, onIdTokenChanged} from "firebase/auth";

interface AuthContextType {
    user: any;
    ready: boolean;
    login: (callback: VoidFunction) => void;
    logout: (callback: VoidFunction) => void;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        onIdTokenChanged(auth, async (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
            setReady(true)
        });
    }, [])


    const login = (callback: VoidFunction) => {
        return signInWithPopup(auth, provider).then((result) => {
            const user = result.user;
            console.log(user)
            setUser(user);
            callback();
        });
    };

    const logout = (callback: VoidFunction) => {
        return signOut(auth).then(() => {
            setUser(null);
            callback();
        });
    };

    const value = {user, ready, login, logout};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider