import { Bell, Clock } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getFeatureList, submitFeedback } from "../appwrite/feedback";
import { useUserContext } from "../context/context";
import { toast } from "sonner";
import { Loading } from "../components/Loading";
import { SubscribeDialog } from "../components/Home/Dialog";
export const UpcomingFeature = () => {
	const [featureList, setFeatureList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { fingerprint } = useUserContext();
	useEffect(() => {
		window.scrollTo(0, 0);
		document.title = "Upcoming Features | NextLeet";
		setLoading(true);
		getFeatureList()
			.then((response) => {
				if (response.documents) {
					setFeatureList(response.documents);
				}
			})
			.catch((error) => {
				console.error("Error fetching feature list:", error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	function handleSubmitFeedback() {
		const feedback = document.getElementById("feedback").value;
		submitFeedback(feedback, fingerprint)
			.then(() => {
				toast.success("Request submitted successfully!");
			})
			.catch((error) => {
				toast.error("Failed to submit. Please try again later.");
			});
	}
	return (
		<div className="pt-28 md:pt-32 px-5 md:px-10 min-h-screen bg-black text-gray-300 p-4 max-w-4xl mx-auto">
			<SubscribeDialog open={isDialogOpen} setOpen={setIsDialogOpen} />
			<div
				className="text-yellow-500 cursor-pointer"
				onClick={() => {
					document.getElementById("feedback").scrollIntoView({
						behavior: "smooth",
						block: "center",
					});
					document.getElementById("feedback").focus();
				}}
			>
				Have a feature in mind ? 💡
			</div>
			<div className="mt-5 mx-auto scroll-smooth">
				<div className="flex items-center justify-between">
					<h1 className="text-xl md:text-3xl font-bold ">
						Upcoming Features
					</h1>
					<Bell
						onClick={() => setIsDialogOpen(true)}
						className="text-yellow-600 animate-shake cursor-pointer"
					/>
				</div>
				{loading ? (
					<div className="h-[400px]">
						<Loading />
					</div>
				) : featureList && featureList.length > 0 ? (
					featureList.map((feature) => (
						<section className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-lg mx-auto mt-10 text-white">
							<div className="flex items-center text-sm md:text-base  gap-2 text-green-500 mb-2">
								<Clock size={20} />
								<span className="text-xs md:text-sm font-medium uppercase">
									{feature.estimatedTimeHeading}
								</span>
							</div>

							<h2 className="text-lg md:text-2xl font-semibold  mb-4">
								{feature.heading}
							</h2>

							<ul className="space-y-2 text-zinc-300 text-sm md:text-base list-disc list-inside">
								{feature.featuresList &&
									feature.featuresList.map((item, index) => (
										<li key={index}>{item}</li>
									))}
							</ul>
						</section>
					))
				) : (
					<div className="flex justify-center items-center h-64">
						<p className="text-gray-500 text-lg">
							Currently there are no upcoming features found.
						</p>
					</div>
				)}
			</div>
			<div className="px-10 h-0.5 w-full mx-auto bg-gray-600 opacity-30  mt-10"></div>
			<div className="mx-auto mt-10">
				<h1 className="text-xl md:text-3xl font-bold">
					Any Feature Request
				</h1>
				<textarea
					name="feedback"
					id="feedback"
					spellCheck="false"
					className="w-full h-64 mt-7 text-lg resize-none p-4 bg-zinc-900 border border-zinc-800 rounded-lg text-gray-300 focus:outline-none focus:ring-3 focus:ring-emerald-400"
					placeholder="Leave your Idea here..."
				/>
				<button
					className="w-full bg-gray-950/90 mt-4 cursor-pointer hover:bg-gray-900 text-gray-300 py-2.5 rounded-lg border border-gray-700"
					onClick={handleSubmitFeedback}
				>
					Submit Request
				</button>
			</div>
		</div>
	);
};
