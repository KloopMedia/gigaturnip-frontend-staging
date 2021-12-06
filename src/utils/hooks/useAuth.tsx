import React from "react";
import {AuthContext} from "../../context/authentication/AuthProvider";

export const useAuth = () => React.useContext(AuthContext);