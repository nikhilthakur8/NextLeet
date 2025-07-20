import React from "react";
import { UpcomingQuestion } from "../components/Questions/UpcomingQuestion";
import { PastQuestion } from "../components/Questions/PastQuestion";

export const LeetcodeChallenges = () => {
	return (
		<div className="space-y-10 pt-32 py-10 md:space-y-20 border-y border-gray-900">
			<UpcomingQuestion />
			<PastQuestion />
		</div>
	);
};
