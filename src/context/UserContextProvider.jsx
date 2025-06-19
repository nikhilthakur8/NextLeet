import React, { useState } from "react";
import { UserContext } from "./context";
export const UserContextProvider = ({ children, fingerprint }) => {
	const [allCompanyName, setAllCompanyName] = useState([]);
	return (
		<UserContext.Provider
			value={{ fingerprint, allCompanyName, setAllCompanyName }}
		>
			{children}
		</UserContext.Provider>
	);
};
