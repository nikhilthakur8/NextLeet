import React from "react";
import { ColourfulText } from "../ui/colourful-text";
import subscribeUser from "../../appwrite/config";
import { toast } from "sonner";
import { Link } from "react-router-dom";
export const Footer = () => {
	const handleSubscribe = (e) => {
		e.preventDefault();
		const email = document.getElementById("email").value;
		subscribeUser(email)
			.then(() => {
				toast.success("Subscribed successfully! 🎉", {
					description: "Thank you for subscribing.",
				});
				document.getElementById("email").value = "";
			})
			.catch((error) => {
				toast.error("Subscription failed! 😢", {
					description: error.message || "Please try again later.",
				});
			});
	};
	return (
		<footer className="mt-36 xl:mt-48 pb-10 max-w-screen text-gray-400">
			<div className="border border-gray-800 mx-5 md:mx-10"></div>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-10  gap-y-10 md:gap-x-12 lg:px-12 px-7 py-12 md:py-16">
				<div className="xl:col-span-3">
					<h3 className="font-bold text-3xl sm:text-4xl md:text-5xl mb-3">
						<ColourfulText text="NextLeet" />
					</h3>
					<p className="text-sm md:text-base text-gray-300">
						NextLeet helps you prepare smarter with coding insights,
						code analysis, and company-wise interview preparation
						tools.
					</p>
				</div>

				{/* Subscribe Section */}
				<div className="xl:col-span-3">
					<div className="mb-3 ">
						<h2 className="font-bold text-xl  tracking-wide md:text-2xl lg:text-3xl  text-gray-300">
							Subscribe for Updates
						</h2>
						<p className="text-sm md:text-base">
							Never Miss an Update!
						</p>
					</div>
					<form
						className="flex space-x-2 text-sm  lg:text-base"
						onSubmit={handleSubscribe}
					>
						<input
							id="email"
							type="email"
							placeholder="Enter your email"
							className="w-full border-emerald-700 border rounded-md p-2 text-gray-200 focus:outline-none focus:ring-[3px] focus:ring-emerald-600 placeholder:text-gray-500 transition-all duration-300"
							required
							autoComplete="off"
							autoCorrect="off"
							spellCheck="false"
							name="email"
						/>
						<button
							type="submit"
							className="cursor-pointer bg-gray-950/90 text-gray-300 rounded-md border border-gray-600 px-4 py-2"
						>
							Subscribe
						</button>
					</form>
				</div>

				<div className="xl:col-span-2">
					<h5 className="font-bold text-md md:text-lg mb-2 text-gray-300">
						Navigate
					</h5>
					<ul className="space-y-4 text-sm md:text-base text-gray-300">
						<li>
							<Link to="/coming-soon" className="hover:underline">
								Feature Request
							</Link>
						</li>
						<li>
							<Link
								to="/search/sheet"
								className="hover:underline"
							>
								Company Wise Sheet
							</Link>
						</li>
						{/* <li>
							<Link className="hover:underline" to="/analyze">
								Code Analyzer
							</Link>
						</li> */}
						<li>
							<Link to="/analyze" className="hover:underline">
								Analyzer
							</Link>
						</li>
						<li>
							<Link to="/insights" className="hover:underline">
								Question Insights
							</Link>
						</li>
					</ul>
				</div>
				<div className="xl:col-span-2">
					<h5 className="font-bold text-md md:text-lg mb-2 text-gray-300">
						Quicks Links
					</h5>
					<ul className="space-y-4 text-sm md:text-base text-gray-300">
						<li>
							<Link
								to="mailto:support@nextleet.com"
								className="hover:underline"
							>
								Contact Us
							</Link>
						</li>
						<li>
							<Link
								to="https://x.com/nikhilthakur80"
								target="_blank"
								className="hover:underline"
							>
								X
							</Link>
						</li>
						{/* <li>
							<Link className="hover:underline" to="/analyze">
								Code Analyzer
							</Link>
						</li> */}
						<li>
							<Link
								to="https://code.nextleet.com"
								className="hover:underline"
								target="_blank"
							>
								Premium Questions
							</Link>
						</li>
						<li>
							<Link
								to="https://github.com/sponsors/nikhilthakur8"
								target="_blank"
								className="hover:underline"
							>
								Sponsor
							</Link>
						</li>
					</ul>
				</div>
			</div>

			<div className="overflow-hidden w-full">
				<h2
					className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[12rem] font-bold text-center tracking-tighter leading-none w-full mx-auto !text-transparent !bg-clip-text"
					style={{
						background:
							"linear-gradient(rgba(156, 163, 175, 0.9), rgba(75, 85, 99, 0.4))",
					}}
				>
					NEXTLEET
				</h2>
			</div>

			{/* <div className="text-center text-md md:text-xl py-5">
				Made with 💗 by NextLeet Team
			</div> */}
		</footer>
	);
};
