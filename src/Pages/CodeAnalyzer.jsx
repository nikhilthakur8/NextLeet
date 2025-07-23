import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Loading } from "../components/Loading";
import TimeComplexityChart from "../components/ComplexityChart";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import {
	Clock,
	Brain,
	HardDrive,
	Info,
	Star,
	ThumbsUp,
	ThumbsDown,
	BarChart3,
	LineChart,
} from "lucide-react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../components/ui/select";
import { CustomButton } from "../components/CustomButton";
const supportedModels = [
	{
		id: "llama3-70b-8192",
		shortName: "LLaMA 3 70B",
		label: "Recommended",
	},
	{
		id: "deepseek-r1-distill-llama-70b",
		shortName: "DeepSeek 70B",
	},
	{
		id: "meta-llama/llama-4-scout-17b-16e-instruct",
		shortName: "LLaMA 4 Scout 17B",
	},
	{
		id: "llama-3.3-70b-versatile",
		shortName: "LLaMA 3.3 70B",
	},
	{
		id: "compound-beta",
		shortName: "Compound Beta",
	},
];
export default function CodeAnalyzer() {
	const [code, setCode] = useState("");
	const [selectedModel, setSelectedModel] = useState("llama3-70b-8192");
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
					model: selectedModel,
				},
				{
					withCredentials: true,
				}
			);
			setResult(null);
			const result = JSON.parse(response.data.result);
			toast.success("Code analyzed successfully!");
			setResult(result);
		} catch (error) {
			window.scrollTo(0, 0);
			if (error.response) {
				const message =
					error.response.data?.message ||
					error.response.data?.error ||
					"Something went wrong.";
				toast.error(message);
			} else {
				toast.error(
					`Error: ${error.message || "Unknown error occurred"}`
				);
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
	const ai = ["Chat Gpt", "DeepSeek", "Gemini", "Claude", "LLama"];
	return (
		<div className="p-4 pt-28 md:pt-32 px-5 md:px-20 min-h-screen text-sm md:text-lg max-w-5xl mx-auto text-gray-300">
			<div className="flex flex-col gap-y-3">
				<h1 className="text-3xl bg-gradient-to-l from-blue-500 to-cyan-500 text-transparent bg-clip-text text-center md:text-4xl font-bold pb-2">
					Code Analyzer <span className="text-yellow-500">✨</span>
				</h1>
				<p className="text-center text-sm md:text-lg">
					⚡️ Blazing fast: Delivers responses in just 300ms — faster
					than your average ChatGPT!
				</p>

				<div className="flex items-center justify-end my-2">
					<Select defaultValue="llama3-70b-8192" onValueChange={setSelectedModel}>
						<SelectTrigger className="rounded-xl border text-sm md:text-lg border-gray-800 bg-gray-900 text-gray-200 hover:border-gray-600 focus:ring-2 focus:ring-emerald-500 focus:outline-none px-5 min-w-64">
							<SelectValue
								placeholder="Select AI Model"
								className="text-gray-400"
							/>
						</SelectTrigger>
						<SelectContent className="bg-gray-900 text-gray-200 border border-gray-700 rounded-lg shadow-lg">
							<SelectGroup>
								<SelectLabel className="text-gray-400">
									Select AI Model
								</SelectLabel>
								{supportedModels.map((model) => (
									<SelectItem
										key={model.id}
										value={model.id}
										className="cursor-pointer text-base md:text-lg rounded-md px-2 py-1 focus:bg-gray-800"
									>
										{model.shortName}
										{model.label && (
											<span className="text-xs text-gray-500">
												({model.label})
											</span>
										)}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<textarea
					value={code}
					spellCheck="false"
					onChange={(e) => setCode(e.target.value)}
					className="w-full overflow-y-auto resize-none min-h-[40vh] p-4 font-mono hide-scrollbar bg-gradient-to-br from-gray-950 to-gray-900 border border-gray-900 rounded-xl shadow  focus:outline-none focus:ring-3 focus:ring-emerald-600 "
					placeholder={`Paste your C++/Python/JS/Rust/Java/any code here...`}
				/>
				<CustomButton
					className="w-fit ml-auto bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 md:!text-lg !rounded-full !text-gray-300"
					onClick={handleSubmit}
					disabled={loading}
				>
					Analyze Code
				</CustomButton>
			</div>
			<div ref={analysisRef}>
				{(result || loading) && (
					<div className="relative mx-auto mt-8 p-5 md:p-8 rounded-xl bg-gradient-to-br from-gray-950 to-gray-900 border border-gray-800 shadow-[0_0_40px_rgba(0,0,0,0.6)] text-gray-200 space-y-5 md:space-y-8">
						{loading ? (
							<Loading />
						) : result?.error ? (
							<div className="flex flex-col items-center justify-center space-y-4">
								<h1 className="font-bold text-red-600 text-xl md:text-3xl tracking-wide text-center">
									⚠️ Error Occurred
								</h1>
								<p className="text-zinc-300 text-center leading-relaxed">
									{result.error ||
										"An unexpected error occurred while analyzing your code."}
								</p>
							</div>
						) : (
							<>
								{/* Heading */}
								<h1 className="text-xl md:text-4xl font-bold bg-gradient-to-l from-blue-500 to-cyan-500 pb-2 bg-clip-text text-transparent tracking-wide text-center flex items-center justify-center gap-2">
									<Brain className="w-5 h-5 md:w-8 md:h-8 text-cyan-400" />
									Code Complexity Analysis
								</h1>

								{/* Time Complexity */}
								<div className="space-y-3">
									<p className="font-medium text-zinc-400 flex items-center gap-x-2 text-base md:text-lg">
										<Clock className="w-5 h-5 text-lime-400" />
										Time Complexity:
									</p>
									<div className="flex flex-row items-center gap-2">
										<p
											className="text-2xl md:text-3xl uppercase font-bold text-lime-400 tracking-wide"
											dangerouslySetInnerHTML={{
												__html: result.timeComplexity,
											}}
										/>
										<div className="w-auto">
											<TimeComplexityChart
												complexity={
													result.timeComplexity
												}
												complexityType={
													result.timeComplexityType
												}
												name={"Time Complexity"}
											/>
										</div>
									</div>
									<p className="text-zinc-300 leading-relaxed text-sm md:text-base">
										{result?.timeExplanation}
									</p>
								</div>

								{/* Space Complexity */}
								<div className="space-y-3">
									<p className="font-medium text-zinc-400 flex items-center gap-x-2 text-base md:text-lg">
										<HardDrive className="w-5 h-5 text-sky-400" />
										Space Complexity:
									</p>
									<div className="flex flex-row items-center gap-2">
										<p
											className="text-2xl md:text-3xl uppercase font-bold text-sky-400 tracking-wide"
											dangerouslySetInnerHTML={{
												__html: result.spaceComplexity,
											}}
										/>
										<div className="w-auto">
											<TimeComplexityChart
												complexity={
													result.spaceComplexity
												}
												complexityType={
													result.spaceComplexityType
												}
												name={"Space Complexity"}
											/>
										</div>
									</div>
									<p className="text-zinc-300 leading-relaxed text-sm md:text-base">
										{result?.spaceExplanation}
									</p>
								</div>

								{/* Code Rating */}
								<div className="space-y-3">
									<span className="font-medium  flex items-center gap-x-2 text-zinc-400 text-base md:text-lg">
										<LineChart className="w-5 h-5 text-purple-400" />
										Code Rating (out of 5):
									</span>
									<div className="flex gap-1 mt-2">
										{Array.from({
											length: result.codeRating,
										}).map((_, index) => (
											<Star
												key={index}
												size={24}
												className={
													"fill-yellow-400 text-yellow-400 spin-3d"
												}
											/>
										))}
									</div>
								</div>

								{/* Info */}
								<div className="text-xs md:text-sm text-gray-400 flex justify-center items-center gap-2 mt-4 text-center">
									<Info size={16} />
									<p>
										Only up to O(n²) shown — higher ones
										skew the graph.
									</p>
								</div>
							</>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
