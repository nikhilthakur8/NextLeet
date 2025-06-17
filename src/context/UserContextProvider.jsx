import React from "react";
import { UserContext } from "./context";
export const UserContextProvider = ({ children, fingerprint }) => {
	return (
		<UserContext.Provider value={{ fingerprint }}>
			{children}
		</UserContext.Provider>
	);
};
