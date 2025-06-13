import React from "react";
import { ArrowDown } from "lucide-react";

export const Trick = () => {
	return (
		<div className="text-xs md:text-lg flex flex-col space-y-2 px-5 text-gray-300 py-10">
			<h2 className="text-xl md:text-2xl text-neutral-300 font-semibold">
				Here is a Short Trick for It:
			</h2>
			<div className="relative">
				<p className="bg-gray-800 rounded-md px-4 py-1  w-fit shadow-md break-all">
					https://
					<span className="text-sky-500 text-base md:text-xl">
						leetcode
					</span>
					.com/problems/add-two-numbers
				</p>

				<span className="absolute left-16 top-10 md:top-12 md:left-24">
					<ArrowDown className="text-gray-300 size-7 md:size-12" />
				</span>
				<p className="mt-10 md:mt-16 bg-gray-800 rounded-md px-4 py-1 w-fit shadow-md break-all">
					https://
					<span className="text-sky-500 text-base md:text-xl">
						nextleet
					</span>
					.com/problems/add-two-numbers
				</p>
			</div>
		</div>
	);
};
