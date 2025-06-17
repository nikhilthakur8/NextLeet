import subscribeUser from "../../appwrite/config";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner";

export const SubscribeDialog = ({ open, setOpen }) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		const email = document.getElementById("emailDialog").value;
		subscribeUser(email)
			.then(() => {
				toast.success("Subscribed successfully! 🎉", {
					description: "Thank you for subscribing.",
				});
				setOpen(false);
			})
			.catch((error) => {
				toast.error("Subscription failed! 😢", {
					description: error.message || "Please try again later.",
				});
			});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen} >
			<DialogContent className="sm:max-w-xl md:p-10 p-5 text-zinc-300 bg-gray-900	 border border-gray-800">
				<DialogHeader className="gap-1">
					<DialogTitle className="text-lg md:text-2xl font-semibold">
						Subscribe to our Newsletter
					</DialogTitle>
					<DialogDescription className="text-sm lg:text-md">
						Stay updated with the latest news and updates.
					</DialogDescription>
				</DialogHeader>

				<form
					className="space-x-2 text-sm lg:text-base"
					onSubmit={handleSubmit}
				>
					<input
						id="emailDialog"
						type="email"
						placeholder="Enter your email"
						className="w-full border-emerald-700 border rounded-md p-2 text-gray-200 focus:outline-none focus:ring-[3px] focus:ring-emerald-600 placeholder:text-gray-500 transition-all duration-300"
						required
						autoComplete="off"
						autoCorrect="off"
						spellCheck="false"
						name="email"
					/>
				</form>

				<DialogFooter>
					<DialogClose asChild>
						<button
							type="submit"
							className="cursor-pointer w-full bg-gray-950/90 font-semibold  hover:bg-gray-900 transition-all duration-300 rounded-md border border-gray-800 px-4 py-2"
							onClick={handleSubmit}
						>
							Subscribe
						</button>
					</DialogClose>
				</DialogFooter>

				<p className="text-sm text-gray-400 text-center">
					Unsubscribe anytime. No hard feelings.
				</p>
			</DialogContent>
		</Dialog>
	);
};
