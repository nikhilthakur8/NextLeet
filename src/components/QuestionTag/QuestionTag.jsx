import React, { useEffect, useState } from "react";
import { Trick } from "./Trick";
import { NewBadge } from "../NewBadge";
import QuestionInsights from "../../Pages/QuestionInsights/Insights";
export const QuestionTag = () => {
	const [titleSlug, setTitleSlug] = useState(null);
	const handleSubmit = (e) => {
		e.preventDefault();
		const inputValue =
			e.target.questionSlug.value.split("/")[4]?.trim() ||
			e.target.questionSlug.value.trim();
		setTitleSlug(inputValue);
	};
	useEffect(() => {
		document.title = "Find Question Company Tags | NextLeet";
		window.scrollTo(0, 0);
	}, []);
	return (
		<div className="min-h-screen px-5 md:px-12 text-base md:text-lg w-full  md:max-w-7xl mx-auto justify-center text-gray-300 ">
			<div className="min-h-[30vh] flex w-full justify-end flex-col gap-4">
				{/* <div className="mx-auto text-lg md:text-xl">
					🔗 Enter the LeetCode question link or just the title slug
					(e.g., 3sum 😏 )
				</div> */}
				<form
					onSubmit={handleSubmit}
					className="flex items-center justify-center w-full flex-col md:flex-row gap-4"
				>
					<input
						type="text"
						name="questionSlug"
						className="focus:outline-none focus:ring-3 w-full focus:ring-emerald-600 px-4 py-2 rounded-lg bg-gray-900  border border-gray-800"
						placeholder="https://leetcode.com/problems/3sum/ or 3sum😏 "
						autoComplete="off"
						autoFocus
					/>
					<button className="bg-gray-900 text-sm md:text-lg ml-auto hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors duration-300 border border-gray-800 whitespace-nowrap cursor-pointer">
						Find Now
					</button>
				</form>
			</div>
			<div className="mt-10">
				<QuestionInsights titleSlug={titleSlug} />
			</div>
			<div className="bg-gray-900 relative shadow-lg mx-auto mt-20 rounded-md border border-gray-900   ">
				<Trick />
				<NewBadge
					className={
						"bg-gradient-to-l from-green-400 via-green-500 to-green-400"
					}
				>
					Trick
				</NewBadge>
			</div>
		</div>
	);
};
