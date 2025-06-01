import React from "react";
import { Outlet } from "react-router-dom";
import { NavBarNew } from "./components/NavBar/NavBar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
export const App = () => {
    return (
        <div className="bg-black">
            <NavBarNew />
            <Outlet />
            <Analytics />
            <SpeedInsights />
        </div>
    );
};
