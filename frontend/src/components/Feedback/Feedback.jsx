import React, { useEffect, useState } from "react";
import { ArrowUpFromLineIcon, MessageSquareMore } from "lucide-react";
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
				toast.error(
					"Failed to submit feedback. Please try again later."
				);
			});
	};
	useEffect(() => {
		function handleScroll() {
			if (window.scrollY > window.innerHeight * 3) {
				document
					.getElementById("scrollToTopButton")
					.classList.remove("hidden");
			} else {
				document
					.getElementById("scrollToTopButton")
					.classList.add("hidden");
			}
		}
		document.addEventListener("scroll", handleScroll);
		return () => {
			document.removeEventListener("scroll", handleScroll);
		};
	}, []);
	return (
		<div className="hide-scrollbar bottom-5 md:bottom-10 space-y-4 right-5 md:right-10 fixed">
			<div
				className="rounded-full hidden p-1  animate-bounce [animation-duration:2s] md:p-2 mx-1 bg-gray-800 border border-gray-700 cursor-pointer"
				onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
				title="Scroll to Top"
				role="button"
				id="scrollToTopButton"
			>
				<ArrowUpFromLineIcon className="text-gray-200 " />
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="bg-gray-800 p-2 md:p-3 rounded-full cursor-pointer   text-white border border-gray-700">
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
							className="w-full h-32 p-2 resize-none bg-gray-700 text-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-3 focus:ring-emerald-600"
							placeholder="Leave your feedback here..."
						></textarea>
					</div>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<button
								className="ml-auto px-4 cursor-pointer py-2 border border-gray-700 bg-gray-900 rounded-md"
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
