import React, { useEffect } from "react";
import { Link2, CalendarDays, Lightbulb } from "lucide-react";
import { CustomButton } from "../components/CustomButton"; // your existing button
import { NewBadge } from "../components/NewBadge";

export const Hacks = () => {
	useEffect(() => {
		document.title = "NextLeet Hacks - NextLeet";
		window.scrollTo(0, 0);
	}, []);
	return (
		<div className="min-h-screen bg-black pt-24 md:pt-28 flex items-center justify-center p-4 font-sans text-gray-100">
			<div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-8 rounded-2xl shadow-2xl max-w-4xl w-full border border-gray-800">
				{/* Header */}
				<h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-b from-gray-200 to-gray-600 bg-clip-text text-transparent mb-6 p-2 tracking-tight">
					NextLeet Hacks
				</h1>

				<p className="text-lg text-gray-400 text-center mb-10 leading-relaxed">
					Discover smart shortcuts crafted by{" "}
					<span className="text-indigo-400 font-semibold">
						nextLeet.com
					</span>
					.
				</p>

				<div className="space-y-8">
					{/* Card 1 */}
					<div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800 hover:border-blue-500 transition-colors">
						<h2 className="text-2xl font-bold text-blue-400 mb-3 flex items-center">
							<Link2 className="mr-3 h-7 w-7 text-blue-400" />
							Direct Problem Access
						</h2>
						<p className="text-gray-200 mb-4">
							Jump directly to any problem by its ID — no search
							needed.
						</p>
						<div className="bg-gray-950 p-3 rounded-md font-mono text-sm mb-4 border border-gray-700">
							<code className="block mt-1 text-green-400">
								nextleet.com/
								<span className="text-yellow-400">132</span>
							</code>
							<code className="block mt-1 text-green-400">
								nextleet.com/
								<span className="text-yellow-400">75</span>
							</code>
						</div>
						<CustomButton
							className="!rounded-full mx-auto !px-5"
							onClick={() =>
								window.open(
									"https://nextleet.com/132",
									"_blank"
								)
							}
						>
							🚀 Try Problem 132
						</CustomButton>
						<p className="text-gray-400 text-sm mt-3">
							Redirects you straight to LeetCode problem 132.
						</p>
					</div>

					{/* Card 2 */}
					<div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800 hover:border-purple-500 transition-colors">
						<h2 className="text-2xl font-bold text-purple-400 mb-3 flex items-center">
							<CalendarDays className="mr-3 h-7 w-7 text-purple-400" />
							Problem of the Day
						</h2>
						<p className="text-gray-200 mb-4">
							See today’s LeetCode challenge instantly — stay
							consistent!
						</p>
						<div className="bg-gray-950 p-3 rounded-md font-mono text-sm mb-4 border border-gray-700">
							<code className="block mt-1 text-red-400">
								nextleet.com/
								<span className="text-pink-400">potd</span>
							</code>
						</div>
						<CustomButton
							className="!rounded-full mx-auto !px-5"
							onClick={() =>
								window.open(
									"https://nextleet.com/potd",
									"_blank"
								)
							}
						>
							🌟 Try POTD
						</CustomButton>
						<p className="text-gray-400 text-sm mt-3">
							Takes you directly to today’s problem.
						</p>
					</div>

					{/* Card 3 */}
					<div className="relative bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800 hover:border-teal-500 transition-colors">
						{/* Pro Badge */}
						<NewBadge className="rounded-full !animate-none bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 ">
							PRO
						</NewBadge>

						<h2 className="text-2xl font-bold text-teal-400 mb-3 flex items-center">
							<Lightbulb className="mr-3 h-7 w-7 text-teal-400" />
							Instant Insights
						</h2>
						<p className="text-gray-200 mb-4">
							On any LeetCode problem page, swap the domain to{" "}
							<span className="text-indigo-400 font-semibold">
								nextleet.com
							</span>{" "}
							to unlock extra insights.
						</p>
						<div className="bg-gray-950 p-3 rounded-md font-mono text-sm mb-4 border border-gray-700">
							<code className="block mt-1 text-gray-500">
								Original: leetcode.com/problems/two-sum/
							</code>
							<code className="block mt-1 text-green-400">
								Now:{" "}
								<span className="text-indigo-400 font-bold">
									nextleet.com
								</span>
								/problems/two-sum/
							</code>
						</div>
						<CustomButton
							className="!rounded-full mx-auto !px-5"
							onClick={() =>
								window.open(
									"https://nextleet.com/problems/two-sum/",
									"_blank"
								)
							}
						>
							✨ Try Two‑Sum Insights
						</CustomButton>
						<p className="text-gray-400 text-sm mt-3">
							Loads the NextLeet enhanced insights page.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
