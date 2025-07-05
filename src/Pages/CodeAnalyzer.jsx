import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Loading } from "../components/Loading";
import TimeComplexityChart from "../components/ComplexityChart";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import { Info, Star, ThumbsDown, ThumbsUp } from "lucide-react";
import { registerFeedback } from "../appwrite/config";
import { useUserContext } from "../context/context";

export default function CodeAnalyzer() {
	const [code, setCode] = useState("");
	const { userData } = useUserContext();
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
				`${import.meta.env.VITE_BACKEND_URL}/api/ai/analyze/complexity`,
				{
					code,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userData.jwt}`,
					},
				}
			);
			setResult(null);
			const result = JSON.parse(response.data.result);
			toast.success("Code analyzed successfully!");
			setResult(result);
		} catch (error) {
			window.scrollTo(0, 0);
			if (error.response && error.response.status === 400) {
				toast.error(error.response.data.error || "Invalid code input.");
			} else {
				toast.error(`Error: ${error.message}`);
			}
		} finally {
			setLoading(false);
		}
	};
	const handleFeedBack = async (feedback) => {
		registerFeedback(feedback)
			.then(() => {
				toast.success(`Thank you for your feedback!`);
			})
			.catch((error) => {
				toast.error(`Error: ${error.message}`);
			});
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
		<div className="p-4 pt-28 md:pt-36 px-5 md:px-20 min-h-screen text-sm md:text-lg max-w-5xl mx-auto text-gray-300">
			<div className="flex flex-col gap-y-3">
				<h1 className="text-3xl bg-linear-65 from-purple-500 to-pink-500 text-transparent bg-clip-text text-center md:text-4xl font-bold pb-2">
					Code Analyzer <span className="text-yellow-500">✨</span>
				</h1>
				<p className="text-center text-sm md:text-lg">
					⚡️ Blazing fast: Delivers responses in just 300ms — faster
					than your average ChatGPT!
				</p>
				<textarea
					value={code}
					spellCheck="false"
					onChange={(e) => setCode(e.target.value)}
					className="w-full overflow-y-auto resize-none min-h-[40vh] p-4 font-mono hide-scrollbar bg-gray-900 border border-gray-800 rounded-lg shadow  focus:outline-none focus:ring-3 focus:ring-emerald-600"
					placeholder={`Paste your C++/Python/JS/Rust/Java/any code here...`}
				/>
				<button
					onClick={handleSubmit}
					disabled={loading}
					className="px-5 py-2 bg-gray-900  ml-auto rounded-md transition cursor-pointer hover:scale-105 active:scale-95 border border-gray-800 "
				>
					Analyze Code
				</button>
			</div>
			<div ref={analysisRef}>
				{(result || loading) && (
					<div className="p-5 relative rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 shadow-2xl mx-auto mt-10  text-zinc-200 space-y-6">
						{loading ? (
							<Loading />
						) : result?.error ? (
							<div className="flex flex-col items-center justify-center space-y-4">
								<h1 className="font-semibold text-red-700 text-xl md:text-3xl">
									⚠️ Error Occured
								</h1>
								<p className="text-zinc-300">
									{result.error ||
										"An unexpected error occurred while analyzing your code."}
								</p>
							</div>
						) : (
							<>
								<h1 className="text-xl md:text-4xl font-bold text-white">
									🧠 Code Complexity Analysis
								</h1>

								<div className="space-y-2">
									<p className="font-medium text-zinc-400">
										⏱️ Time Complexity:
									</p>
									<div className="flex items-center gap-x-2">
										<p
											className="text-2xl uppercase font-semibold text-lime-400"
											dangerouslySetInnerHTML={{
												__html: result.timeComplexity,
											}}
										/>
										<TimeComplexityChart
											complexity={result.timeComplexity}
											complexityType={
												result.timeComplexityType
											}
											name={"Time Complexity"}
										/>
									</div>
									<p className="text-zinc-300">
										{result?.timeExplanation}
									</p>
								</div>

								<div className="space-y-2">
									<p className="font-medium text-zinc-400">
										🧮 Space Complexity:
									</p>
									<div className="flex items-center gap-x-2">
										<p
											className="text-2xl uppercase font-semibold text-sky-400"
											dangerouslySetInnerHTML={{
												__html: result.spaceComplexity,
											}}
										/>
										<TimeComplexityChart
											complexity={result.spaceComplexity}
											complexityType={
												result.spaceComplexityType
											}
											name={"Space Complexity"}
										/>
									</div>
									<p className=" text-zinc-300">
										{result?.spaceExplanation}
									</p>
								</div>
								<div className="space-y-2">
									<span className="font-medium text-zinc-400">
										📊 Code Rating (out of 5):
									</span>{" "}
									{Array.from({ length: 5 }).map(
										(star, index) => (
											<span key={index}>
												<Star
													size={20}
													className={`${
														index <
														result.codeRating
															? "fill-yellow-400 text-yellow-400"
															: "fill-gray-400 text-gray-400"
													} inline`}
												/>
											</span>
										)
									)}
								</div>
								<div className="text-xs text-gray-400 flex justify-center items-center md:text-sm space-x-2">
									<Info size={15} />
									<p className="text-center">
										Only up to O(n²) shown — higher ones
										skew the graph.
									</p>
								</div>
								<div className="absolute top-5 right-5 cursor-pointer flex items-center gap-x-5">
									<ThumbsUp
										className="hover:scale-105 "
										onClick={() => handleFeedBack("yes")}
									/>
									<ThumbsDown
										className="hover:scale-105"
										onClick={() => handleFeedBack("no")}
									/>
								</div>
							</>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
