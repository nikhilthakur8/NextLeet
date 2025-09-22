import React, { useEffect, useState } from "react";
import { ArrowUpFromLineIcon, MessageSquareMore } from "lucide-react";
import { Link } from "react-router-dom";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "sonner";
import { useUserContext } from "../../context/context";
import api from "../../api/api";

export const Feedback = () => {
	const [feedback, setFeedback] = useState({ title: "", description: "" });
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const { userData } = useUserContext();

	const feedbackHandler = () => {
		if (!feedback.description.trim()) {
			toast.error("Feedback cannot be empty!");
			return;
		}

		const email = userData?.user?.email;
		setLoading(true);

		api.post("api/feature-requests", { ...feedback, email })
			.then(() => {
				setFeedback({ title: "", description: "" });
				toast.success("Feature Request submitted successfully!");
				setTimeout(() => setOpen(false), 1000);
			})
			.catch(() => {
				toast.error(
					"Failed to submit feature request. Please try again later."
				);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		function handleScroll() {
			const btn = document.getElementById("scrollToTopButton");
			if (window.scrollY > window.innerHeight * 2) {
				btn.classList.remove("hidden");
			} else {
				btn.classList.add("hidden");
			}
		}
		document.addEventListener("scroll", handleScroll);
		return () => document.removeEventListener("scroll", handleScroll);
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

			<DropdownMenu open={open} onOpenChange={setOpen}>
				<DropdownMenuTrigger asChild>
					<div className="bg-gray-900 flex p-2 md:px-4 md:py-2 text-sm rounded-full cursor-pointer justify-center items-center text-white border border-gray-700">
						<MessageSquareMore className=" text-white" />{" "}
						<p className="hidden sm:inline-block ml-2">
							Feature Request
						</p>
					</div>
				</DropdownMenuTrigger>

				<DropdownMenuContent
					className="bg-gray-900 min-w-[100px] border-none text-gray-300 px-4 py-2 m-5 rounded-md w-80"
					side="top"
				>
					<DropdownMenuLabel>Feature Request</DropdownMenuLabel>
					<DropdownMenuSeparator />

					<div className="flex flex-col items-end">
						<input
							type="text"
							id="title"
							placeholder="Title"
							className="w-full p-1 px-2 mb-4 bg-gray-800 text-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-3 focus:ring-emerald-600"
							onChange={(e) =>
								setFeedback({
									...feedback,
									title: e.target.value,
								})
							}
							value={feedback.title}
						/>

						<textarea
							name="feedback"
							id="feedback"
							onChange={(e) =>
								setFeedback({
									...feedback,
									description: e.target.value,
								})
							}
							className="w-full h-32 p-2 resize-none bg-gray-800 text-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-3 focus:ring-emerald-600"
							placeholder="Describe your feature request here..."
							value={feedback.description}
						></textarea>

						<Link
							to="/feature-requests"
							onClick={() => setOpen(false)}
							className="text-blue-500 underline mt-2 text-sm cursor-pointer"
						>
							View all requests
						</Link>
					</div>

					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem asChild>
							<button
								className="ml-auto px-4 cursor-pointer py-2 border border-gray-700 bg-gray-800 hover:bg-gray-700 rounded-md"
								onClick={feedbackHandler}
								disabled={loading}
							>
								{loading ? "Submitting..." : "Submit Request"}
							</button>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
