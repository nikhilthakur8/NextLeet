import React from "react";
import { ArrowDown } from "lucide-react";

export const Trick = () => {
	return (
		<div className="text-xs md:text-lg flex flex-col items-center space-y-2 px-5  text-gray-400 py-5">
			<h2 className="text-base md:text-2xl text-neutral-300 font-semibold">
				Short Trick for smart people like you 😉
			</h2>
			<div className="relative my-2">
				<p className="bg-gray-800 rounded-md px-4 py-1  w-fit shadow-md break-all">
					https://
					<span className="text-sky-500 text-base md:text-xl font-semibold">
						leetcode
					</span>
					.com/problems/add-two-numbers
				</p>

				<span className="absolute left-16 top-10 md:top-12 md:left-24">
					<ArrowDown className="text-gray-300 size-5 md:size-8" />
				</span>
				<p className="mt-8 md:mt-14 bg-gray-800 rounded-md px-4 py-1 w-fit shadow-md break-all">
					https://
					<span className="text-sky-500 text-base md:text-xl font-semibold">
						nextleet
					</span>
					.com/problems/add-two-numbers
				</p>
			</div>
		</div>
	);
};
