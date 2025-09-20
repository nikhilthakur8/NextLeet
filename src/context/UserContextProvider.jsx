import React, { useState } from "react";
import { UserContext } from "./context";
import axios from "axios";
import { toast } from "sonner";
import api from "../api/api";
export const UserContextProvider = ({ children }) => {
	const [allCompanyName, setAllCompanyName] = useState([]);
	const [userData, setUserData] = useState(null);
	const login = (userData) => setUserData(userData);
	const logout = async () => {
		try {
			await api.post("/api/auth/logout");
			setUserData(null);
			toast.success("Logged out successfully");
		} catch (error) {
			console.log(error);
			toast.error(error.response?.data.message || "Failed to log out");
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
