import React from "react";
import {ToastContext} from "../ToastProvider";

export const useToast = () => React.useContext(ToastContext);