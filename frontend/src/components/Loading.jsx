import React, { useEffect, useState } from "react";

export const Loading = ({ className, size = "size-6" }) => {
	const quotes = [
		"Sorting results using merge sort...",
		"Traversing the recursion tree…",
		"Running DFS on your patience...",
		"Solving TLEs one testcase at a time...",
		"Greedy won’t work? Time for DP magic...",
		"Trying all permutations... literally.",
		"Stuck on a hard question... send help.",
		"Backtracking through the codebase...",
		"Calculating optimal solution… or brute force?",
		"Binary searching for hope...",
		"Heapifying expectations...",
		"Still debugging that one edge case...",
	];
	const [quotesNo, setQuotesNo] = useState(0);
	useEffect(() => {
		const intervalId = setInterval(() => {
			setQuotesNo((prev) => (prev + 1) % quotes.length);
		}, 1500);
		return () => clearInterval(intervalId);
	}, []);
	return (
		<div
			className={`text-gray-400 w-full text-sm md:text-lg flex justify-center items-center flex-col gap-3 my-5 ${className}`}
		>
			<svg
				className={`mr-3 ${size} animate-spin text-white`}
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle
					class="opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					stroke-width="4"
				></circle>
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				></path>
			</svg>
			<span className="text-center">{quotes[quotesNo]}</span>
		</div>
	);
};
