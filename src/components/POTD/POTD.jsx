import React, { useEffect, useState } from "react";
import { getTodayPOTD } from "../../appwrite/config";
export const POTD = () => {
	const [POTD, setPOTD] = useState(null);
	useEffect(() => {
		getTodayPOTD().then((titleSlug) => {
			if (titleSlug) {
				setPOTD(titleSlug);
				window.open(
					`https://leetcode.com/problems/${titleSlug}`,
					"_self"
				);
			}
		});
	}, []);
	return (
		<div className="min-h-screen pt-10 text-gray-300 bg-black text-base md:text-xl text-center">
			<p>Redirecting to the Problem of the Day ......</p>
			<p className="mt-2 text-sm md:text-lg text-gray-400">
				If Not Redirected, Click{" "}
				<a
					className="text-blue-500 hover:underline"
					href={`https://leetcode.com/problems/${POTD}`}
				>
					Here
				</a>
			</p>
		</div>
	);
};
