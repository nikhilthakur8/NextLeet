import React, { useEffect, useState } from "react";
import { UserContext } from "./context";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import axios from "axios";
import { deleteSessions } from "../appwrite/auth";
import { toast } from "sonner";
const fpPromise = FingerprintJS.load();
export const UserContextProvider = ({ children }) => {
	const [allCompanyName, setAllCompanyName] = useState([]);
	const [userData, setUserData] = useState(null);
	const login = (userData) => setUserData(userData);
	const logout = async () => {
		setUserData(null);
		await deleteSessions();
	};
	const [fingerprint, setFingerprint] = useState(null);
	const [planDetails, setPlanDetails] = useState(null);

	useEffect(() => {
		if (userData) {
			axios
				.get(`${import.meta.env.VITE_BACKEND_URL}/api/plans/status`, {
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
						Authorization: `Bearer ${userData.jwt}`,
					},
				})
				.then((response) => {
					if (response.data) {
						const planDetails = response.data.planDetails;
						if (planDetails.status === "expired") {
							planDetails.type = "expired";
						} else {
							planDetails.type = planDetails.planType;
						}
						setPlanDetails(planDetails);
					}
				})
				.catch(async (error) => {
					await logout();
					toast.error("Session Expired: Login again");
				});
		}
	}, [userData]);

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
		<UserContext.Provider
			value={{
				fingerprint,
				allCompanyName,
				setAllCompanyName,
				userData,
				login,
				logout,
				planDetails,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
