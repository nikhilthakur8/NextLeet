import React, { useState } from "react";
import { MessageSquareMore } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { submitFeedback } from "../../appwrite/feedback";
import { useUserContext } from "../../context/context";
import { toast } from "sonner";
export const Feedback = () => {
	const { fingerprint } = useUserContext();
	const [feedback, setFeedback] = useState("");
	const feedbackHandler = (e) => {
		if (!feedback.trim()) {
			toast.error("Feedback cannot be empty!");
			return;
		}
		submitFeedback(feedback, fingerprint)
			.then(() => {
				setFeedback("");
				toast.success("Feedback submitted successfully!");
			})
			.catch((error) => {
				console.error("Error submitting feedback:", error);
				toast.error(
					"Failed to submit feedback. Please try again later."
				);
			});
	};
	return (
		<div className="overflow-hidden hide-scrollbar hidden sm:block">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="fixed bg-gray-800 p-4 rounded-full cursor-pointer  bottom-10 right-10 text-white">
						<MessageSquareMore className=" text-white" />
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className={
						"bg-gray-800 min-w-[100px] border-none text-gray-300 px-4 py-2 m-5 rounded-md w-80"
					}
					side="top"
				>
					<DropdownMenuLabel>Feedback</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<div>
						<textarea
							name="feedback"
							id="feedback"
							onChange={(e) => {
								setFeedback(e.target.value);
							}}
							className="w-full h-32 p-2 resize-none bg-gray-700 text-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Leave your feedback here..."
						></textarea>
					</div>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<button
								className="ml-auto px-4 py-2 border border-gray-700 bg-gray-900 rounded-md"
								onClick={feedbackHandler}
							>
								Submit Feedback
							</button>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
