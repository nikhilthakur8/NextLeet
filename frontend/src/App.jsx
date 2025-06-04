import React from "react";
import { Outlet } from "react-router-dom";
import { NavBarNew } from "./components/NavBar/NavBar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Toaster } from "./components/ui/sonner";
import { Footer } from "./components/Footer/Footer";
export const App = () => {
	return (
		<div className="bg-black">
			<NavBarNew />
			<Outlet />
			<Footer />
			<Analytics />
			<SpeedInsights />
			<Toaster richColors position="top-center" />
		</div>
	);
};
