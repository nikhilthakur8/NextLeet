import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { NavBarNew } from "./components/NavBar/NavBar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Toaster } from "./components/ui/sonner";
import { Footer } from "./components/Footer/Footer";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { User } from "lucide-react";
import { UserContextProvider } from "./context/UserContextProvider";
const fpPromise = FingerprintJS.load();

export const App = () => {
	const [fingerprint, setFingerprint] = useState(null);

	useEffect(() => {
		const getFingerprint = async () => {
			const fp = await fpPromise;
			const result = await fp.get();
			localStorage.setItem("deviceFingerprint", result.visitorId);
			setFingerprint(result.visitorId);
		};
		if (localStorage.getItem("deviceFingerprint"))
			setFingerprint(localStorage.getItem("deviceFingerprint"));
		else getFingerprint();
	}, []);
	return (
		<div className="bg-black">
			<UserContextProvider fingerprint={fingerprint}>
				<NavBarNew />
				<Outlet />
				<Footer />
				<Analytics />
				<SpeedInsights />
				<Toaster richColors position="bottom-right" />
			</UserContextProvider>
		</div>
	);
};
