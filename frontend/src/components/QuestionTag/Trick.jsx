import React from "react";
import { ArrowDown } from "lucide-react";

export const Trick = () => {
	return (
		<div className="text-xs md:text-xl flex flex-col space-y-5 px-5 text-gray-300 py-10">
			<div className="relative">
				<h2 className="text-xl md:text-3xl text-neutral-300 font-semibold">
					Here is a Short Trick for It:
				</h2>

				<p className="bg-gray-800 rounded-md px-4 py-1 my-5 w-fit shadow-md break-all">
					https://
					<span className="text-sky-500 md:text-2xl">leetcode</span>
					.com/problems/add-two-numbers
				</p>

				<span className="absolute left-14 md:left-20">
					<ArrowDown className="text-gray-300 size-7 md:size-12" />
				</span>
			</div>

			<p className="mt-10 md:mt-14 bg-gray-800 rounded-md px-4 py-1 w-fit shadow-md break-all">
				https://
				<span className="text-sky-500 md:text-2xl">nextleet</span>
				.com/problems/add-two-numbers
			</p>
		</div>
	);
};
