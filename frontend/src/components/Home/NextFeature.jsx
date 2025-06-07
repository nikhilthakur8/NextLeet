import { ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";
import { registerFeedback } from "../../appwrite/config";
import { toast } from "sonner";

export const NextFeature = ({ ref }) => {
	const handleClick = (response) => {
		if (localStorage.getItem("nextFeatureFeedback")) {
			toast.error("You have already submitted your feedback.");
			return;
		}
		registerFeedback(response)
			.then(() => {
				localStorage.setItem("nextFeatureFeedback", response);
				toast.success(
					`Thank you for your feedback! You selected: ${
						response === "yes" ? "Yes" : "No"
					}`
				);
			})
			.catch((err) => {
				console.error("Error registering feedback:", err);
				toast.error("Something went wrong. Please try again later.");
			});
	};
	return (
		<div
			ref={ref}
			className="my-10 bg-gradient-to-l from-gray-950 via-gray-900 to-gray-950 text-center text-neutral-300 text-xs px-4 sm:text-base md:text-lg py-8 md:py-12"
		>
			<p className="text-sm md:text-lg font-semibold max-w-4xl mx-auto">
				We’re planning to launch a new feature that gives you access to
				all interview questions asked by a specific company — helping
				you prepare with real, company-specific insights.
			</p>
			<div className="flex justify-center items-center gap-2 my-4">
				<p>Would you like to see this feature?</p>
				<button
					className="bg-gray-700 p-2 rounded-md cursor-pointer hover:bg-gray-600"
					onClick={() => handleClick("yes")}
				>
					<ThumbsUp />
				</button>
				<button
					className="bg-gray-700 p-2 rounded-md cursor-pointer hover:bg-gray-600"
					onClick={() => handleClick("no")}
				>
					<ThumbsDown />
				</button>
			</div>
			<p>
				We’ll decide based on your responses and aim to roll it out next
				week!
			</p>
		</div>
	);
};
