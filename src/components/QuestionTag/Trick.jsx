import React from "react";
import { ArrowDown, Copy } from "lucide-react";
import { toast } from "sonner";

export const Trick = () => {
	const handleCopy = () => {
		const text = "https://nextleet.com/problems/add-two-numbers";
		navigator.clipboard.writeText(text);
		toast.success("Link copied to clipboard!");
	};

	return (
		<div className="text-xs md:text-lg flex flex-col items-center space-y-4 px-5 text-gray-400 py-5">
			<h2 className="text-base md:text-2xl text-neutral-300 font-semibold">
				Short Trick for smart people like you 😉
			</h2>

			<div className="relative my-2 flex flex-col items-center space-y-10">
				<p className="bg-gray-800 rounded-md px-4 py-1 w-fit shadow-md break-all">
					https://
					<span className="text-sky-500 text-base md:text-xl font-semibold">
						leetcode
					</span>
					.com/problems/add-two-numbers
				</p>

				<span className="absolute animate-bounce left-16 top-10 md:top-12 md:left-24">
					<ArrowDown className="text-gray-300 size-5 md:size-8" />
				</span>

				<div className="flex items-center space-x-2">
					<p className="bg-gray-800 rounded-md px-4 py-1 w-fit shadow-md break-all">
						https://
						<span className="text-sky-500 text-base md:text-xl font-semibold">
							nextleet
						</span>
						.com/problems/add-two-numbers
					</p>

					<button
						onClick={handleCopy}
						className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md shadow-md transition"
					>
						<Copy className="size-4 md:size-5 text-gray-300" />
					</button>
				</div>
			</div>
		</div>
	);
};
