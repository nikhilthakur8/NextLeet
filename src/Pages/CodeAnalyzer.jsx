import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Loading } from "../components/Loading";
export const CodeAnalyzer = () => {
	const [code, setCode] = useState("");
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);
	const analysisRef = useRef(null);
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
		} catch (error) {
			window.scrollTo(0, 0);
			if (error.response && error.response.status === 400) {
				toast.error(error.response.data.error || "Invalid code input.");
			} else if (error.response && error.response.status === 409) {
				toast.error("Rate limit exceeded. Please try again later.");
			} else {
				toast.error(`Error: ${error.message}`);
			}
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		if (result || loading) {
			analysisRef.current?.scrollIntoView({
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
		<div className="p-4 pt-28 md:pt-36 px-5 md:px-20 min-h-screen text-base md:text-lg max-w-5xl mx-auto text-gray-300">
			<div className="flex flex-col gap-y-5">
				<h1 className="text-3xl bg-linear-65 from-purple-500 to-pink-500 text-transparent bg-clip-text text-center md:text-4xl font-bold pb-2">
					Code Analyzer <span className="text-yellow-500">✨</span>
				</h1>
				<textarea
					value={code}
					spellCheck="false"
					onChange={(e) => setCode(e.target.value)}
					className="w-full overflow-y-auto text-sm md:text-lg resize-none min-h-[40vh] p-4 font-mono hide-scrollbar bg-gray-900 border border-gray-800 rounded-lg shadow  focus:outline-none focus:ring-3 focus:ring-emerald-600"
					placeholder={`Paste your C++/Python/JS/Rust/Java/any code here...`}
				/>
				<button
					onClick={handleSubmit}
					disabled={loading}
					className="px-5 py-2 bg-gray-900 text-sm md:text-lg ml-auto rounded-md transition cursor-pointer hover:scale-105 active:scale-95 border border-gray-800 "
				>
					Analyze Code
				</button>
			</div>
			<div ref={analysisRef}>
				{(result || loading) && (
					<div className="p-5 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 shadow-2xl mx-auto mt-10 text-sm md:text-lg text-zinc-200 space-y-6">
						{loading ? (
							<Loading />
						) : (
							<>
								<h1 className="text-xl md:text-4xl font-bold text-white">
									🧠 Code Complexity Analysis
								</h1>

								<div className="space-y-2">
									<p className="font-medium text-zinc-400">
										⏱️ Time Complexity:
									</p>
									<p className="text-2xl uppercase font-semibold text-lime-400">
										{result?.time}
									</p>
									<p className="text-zinc-300">
										{result?.timeExplanation}
									</p>
								</div>

								<div className="space-y-2">
									<p className="font-medium text-zinc-400">
										🧮 Space Complexity:
									</p>
									<p className="text-2xl uppercase font-semibold text-sky-400">
										{result?.space}
									</p>
									<p className=" text-zinc-300">
										{result?.spaceExplanation}
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
