import React, {useContext} from "react";
import {Button} from "@mui/material";
import {useAuth} from "../../utils/hooks/useAuth";
import {useLocation, useNavigate} from "react-router-dom";


const Login = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = () => {
        login(() => navigate(from, { replace: true }))
    }

    return <Button onClick={handleLogin}>Login</Button>
}

export default Login