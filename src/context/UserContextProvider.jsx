import React, { useState } from "react";
import { UserContext } from "./context";
import axios from "axios";
import { toast } from "sonner";
export const UserContextProvider = ({ children }) => {
	const [allCompanyName, setAllCompanyName] = useState([]);
	const [userData, setUserData] = useState(null);
	const login = (userData) => setUserData(userData);
	const logout = async () => {
		try {
			await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
				{},
				{ withCredentials: true }
			);
			setUserData(null);
			toast.success("Logged out successfully");
		} catch (error) {
			console.log(error);
			toast.error("Failed : Try again later");
		}
	};
	return (
		<UserContext.Provider
			value={{
				allCompanyName,
				setAllCompanyName,
				userData,
				login,
				logout,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
