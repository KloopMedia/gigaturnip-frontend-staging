import React from 'react';
import Appbar from "./appbar/Appbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <Appbar>
                <Outlet />
            </Appbar>
        </div>
    );
};

export default Layout