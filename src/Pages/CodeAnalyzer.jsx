import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Loading } from "../components/Loading";
export const CodeAnalyzer = () => {
	const [code, setCode] = useState("");
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);
	const handleSubmit = async () => {
		if (!code.trim()) {
			toast.error("Please paste your code before submitting.");
			setLoading(false);
			return;
		}
		setLoading(true);
		try {
			const response = await axios.post(
				"https://api.nextleet.com/analyze",
				{
					code,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Origin: "https://nextleet.com",
					},
				}
			);
			setResult(null);
			if (!response.data || !response.data.result) {
				toast.error("No result returned from the API.");
				return;
			}

			const result = response.data.result;
			toast.success("Code analyzed successfully!");
			setResult(JSON.parse(result));
			document.getElementById("analysis-result").scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		} catch (error) {
			window.scrollTo(0, 0);
			toast.error(`Error: ${error.response.data.error}`);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		if (result || loading) {
			document.getElementById("analysis-result").scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	}, [result, loading]);
	useEffect(() => {
		document.title = "Code Analyzer | NextLeet";
		window.scrollTo(0, 0);
	}, []);
	return (
		<div className="p-4 pt-28 md:pt-32 px-5 md:px-20 min-h-screen  max-w-5xl mx-auto  text-gray-300">
			<div className="flex flex-col">
				<h1 className="text-xl md:text-4xl font-bold mb-4">
					Code Analyzer ✨
				</h1>
				<h2 className="text-base md:text-xl font-bold my-5">
					Paste your code:
				</h2>
				<textarea
					value={code}
					spellCheck="false"
					onChange={(e) => setCode(e.target.value)}
					className="w-full overflow-y-auto text-sm md:text-lg min-h-[40vh] p-4 font-mono hide-scrollbar bg-neutral-900 text-white rounded-lg shadow resize-y focus:outline-none focus:ring-3 focus:ring-emerald-600"
					placeholder={`Paste your C++/Python/JS code here...`}
				/>
				<button
					onClick={handleSubmit}
					className="mt-4 px-10 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-gray-300 w-fit mx-auto rounded transition cursor-pointer hover:scale-105 active:scale-95 "
				>
					Analyze Code
				</button>
			</div>
			<div id="analysis-result">
				{(result || loading) && (
					<div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 shadow-2xl mx-auto mt-10 text-sm md:text-lg text-zinc-200 space-y-6">
						{loading ? (
							<Loading />
						) : (
							<>
								<h1 className="text-2xl font-bold text-white">
									🧠 Code Complexity Analysis
								</h1>

								<div className="space-y-2">
									<p className="font-medium text-zinc-400">
										⏱️ Time Complexity:
									</p>
									<p className="text-2xl uppercase font-semibold text-lime-400">
										{result.time}
									</p>
									<p className="text-base text-zinc-300">
										{result.timeExplanation}
									</p>
								</div>

								<div className="space-y-2">
									<p className="font-medium text-zinc-400">
										🧮 Space Complexity:
									</p>
									<p className="text-2xl uppercase font-semibold text-sky-400">
										{result.space}
									</p>
									<p className="text-base text-zinc-300">
										{result.spaceExplanation}
									</p>
								</div>
							</>
						)}
					</div>
				)}
			</div>
		</div>
	);
};
