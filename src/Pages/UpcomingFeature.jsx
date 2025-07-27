import { Bell, Clock, ExternalLink, Link2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { getFeatureList, submitFeatureRequest } from "../appwrite/feedback";
import { useUserContext } from "../context/context";
import { toast } from "sonner";
import { Loading } from "../components/Loading";
import { SubscribeDialog } from "../components/Home/Dialog";
import { NewBadge } from "../components/NewBadge";
import { Link } from "react-router-dom";
import { CustomButton } from "../components/CustomButton";
export const UpcomingFeature = () => {
	const [featureList, setFeatureList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const ref = useRef(null);
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
		const message = ref.current.value;
		if (!message || message.trim() === "") {
			toast.error("Please enter your feedback before submitting.");
			return;
		}
		submitFeatureRequest(message, fingerprint)
			.then(() => {
				ref.current.value = "";
				toast.success("Request submitted successfully!");
			})
			.catch((error) => {
				toast.error("Failed to submit. Please try again later.");
			});
	}
	return (
		<div className="pt-28 md:pt-32 px-5 md:px-10 min-h-screen bg-black text-gray-300 p-4 max-w-4xl mx-auto text-sm md:text-lg">
			<SubscribeDialog open={isDialogOpen} setOpen={setIsDialogOpen} />
			{/* <div
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
			</div> */}
			{/* <div className="mt-5 mx-auto scroll-smooth">
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
						<section className="p-6 relative rounded-2xl bg-gray-900 border border-gray-800 shadow-lg mx-auto mt-10 text-white">
							<div className="flex items-center text-sm md:text-base  gap-2 text-green-500 mb-2">
								<Clock size={20} />
								<span className="text-xs md:text-sm font-medium uppercase">
									{feature.estimatedTimeHeading}
								</span>
							</div>

							<h2 className="text-lg md:text-2xl font-semibold mb-4">
								{!feature.isCompleted ? (
									feature.heading
								) : (
									<Link
										to={feature.link}
										className=" text-sky-500 flex items-center gap-2"
									>
										{feature.heading}
										<ExternalLink className="size-5" />
									</Link>
								)}
							</h2>

							<ul className="space-y-2 text-gray-300 text-sm md:text-base list-disc list-inside">
								{feature.featuresList &&
									feature.featuresList.map((item, index) => (
										<li key={index}>{item}</li>
									))}
							</ul>
							{feature.isCompleted && (
								<NewBadge
									className={
										"bg-gradient-to-l from-green-400 !animate-none via-green-500 to-green-400"
									}
								>
									Completed
								</NewBadge>
							)}
						</section>
					))
				) : (
					<div className="flex justify-center items-center h-64">
						<p className="text-gray-500">
							Currently there are no upcoming features found.
						</p>
					</div>
				)}
			</div> */}
			{/* <div className="px-10 h-0.5 w-full mx-auto bg-gray-600 opacity-30  mt-10"></div> */}
			<div className="mx-auto mt-10 flex flex-col">
				<h1 className="text-xl md:text-3xl font-bold">
					Any Feature Request
				</h1>
				<textarea
					name="feedback"
					id="feedback"
					ref={ref}
					spellCheck="false"
					className="w-full h-64 mt-7 resize-none p-4 bg-gray-900 border border-gray-800 rounded-lg text-gray-300 focus:outline-none focus:ring-3 focus:ring-emerald-400"
					placeholder="Leave your Idea here..."
				/>
				<CustomButton
					className="w-fit ml-auto px-5 mt-4 "
					onClick={handleSubmitFeedback}
				>
					Submit Request
				</CustomButton>
			</div>
		</div>
	);
};
