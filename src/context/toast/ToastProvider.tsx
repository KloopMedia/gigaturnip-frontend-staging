import React, {useEffect, useState} from "react";
import {Alert as MuiAlert, AlertProps, Snackbar} from "@mui/material";

interface ToastContextType {
    open: boolean;
    openToast: (title: string, variant?: ToastVariants) => void;
    closeToast: (event?: React.SyntheticEvent | Event, reason?: string) => void;
}

type ToastVariants = "success" | "error" | "warning" | "info";

export const ToastContext = React.createContext<ToastContextType>(null!);

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ToastProvider = ({children}: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState<any>("");
    const [variant, setVariant] = useState<ToastVariants>("error")

    const stringify = (value: any) => {
        switch (typeof value) {
            case 'string':
                return value;
            case 'object':
                return JSON.stringify(value);
            default:
                return String(value);
        }
    };

    const openToast = (title: string, variant?: ToastVariants) => {
        if (variant) {
            setVariant(variant)
        }
        setTitle(stringify(title))
        setOpen(true);
    };

    const closeToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const value = {open, openToast, closeToast};

    return <ToastContext.Provider value={value}>
        <Snackbar open={open} autoHideDuration={5000} onClose={closeToast}
                  anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                  }}
        >
            <Alert onClose={closeToast} severity={variant} sx={{width: '100%'}}>
                {title}
            </Alert>
        </Snackbar>
        {children}
    </ToastContext.Provider>;
};

export default ToastProvider