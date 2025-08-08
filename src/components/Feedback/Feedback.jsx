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
import { toast } from "sonner";
import { useUserContext } from "../../context/context";
export const Feedback = () => {
	const [feedback, setFeedback] = useState({
		email: "",
		message: "",
	});
	const { userData } = useUserContext();
	const feedbackHandler = (e) => {
		if (!feedback.message.trim()) {
			toast.error("Feedback cannot be empty!");
			return;
		}
		const email = userData?.user?.email || feedback.email;
		submitFeedback(feedback.message, email)
			.then(() => {
				setFeedback({
					email: "",
					message: "",
				});
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
			if (window.scrollY > window.innerHeight * 2) {
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
		<div className="hide-scrollbar flex items-center justify-center flex-col bottom-5 md:bottom-10 md:space-y-4 space-y-1 right-5 md:right-10 fixed z-50">
			<div
				className="rounded-full sm:ml-auto hidden p-1 animate-bounce [animation-duration:2s] md:p-2 bg-gray-900 border border-gray-800 cursor-pointer"
				onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
				title="Scroll to Top"
				role="button"
				id="scrollToTopButton"
			>
				<ArrowUpFromLineIcon className="text-gray-200 " />
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="bg-gray-900  flex p-2 md:px-4 md:py-2 text-sm rounded-full cursor-pointer justify-center items-center text-white border border-gray-700">
						<MessageSquareMore className=" text-white" />{" "}
						<p className="hidden sm:inline-block ml-2">
							Feature Request
						</p>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className={
						"bg-gray-800 min-w-[100px] border-none text-gray-300 px-4 py-2 m-5 rounded-md w-80"
					}
					side="top"
				>
					<DropdownMenuLabel>Feature Request</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<div>
						<input
							type="email"
							id="email"
							placeholder="Email (optional)"
							className="w-full p-1 px-2 mb-4 bg-gray-700 text-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-3 focus:ring-emerald-600"
							onChange={(e) =>
								setFeedback({
									...feedback,
									email: e.target.value,
								})
							}
							autoComplete="off"
							autoCorrect="off"
							spellCheck="false"
						/>
						<textarea
							name="feedback"
							id="feedback"
							onChange={(e) =>
								setFeedback({
									...feedback,
									message: e.target.value,
								})
							}
							className="w-full h-32 p-2 resize-none bg-gray-700 text-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-3 focus:ring-emerald-600"
							placeholder="Describe your feature request here..."
						></textarea>
					</div>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<button
								className="ml-auto px-4 cursor-pointer py-2 border border-gray-800 bg-gray-900 rounded-md"
								onClick={feedbackHandler}
							>
								Submit Request
							</button>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
