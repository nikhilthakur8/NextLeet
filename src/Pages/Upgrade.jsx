"use client";

import React, { useEffect, useState } from "react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose,
} from "../components/ui/dialog";
import { CustomButton } from "../components/CustomButton";
import { Lock, CheckCircle } from "lucide-react";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "../components/ui/accordion";
import axios from "axios";
const features = [
	"Premium Questions access",
	"Code Analyzer access",
	"Company Wise sheet access",
	"Questions details insights",
	"Priority support",
	"Access to <a href='https://code.nextleet.com'>code.nextleet.com(In progress)</a>",
	"Support the continued development of NextLeet.com",
	"Ad-free experience",
];
import { load } from "@cashfreepayments/cashfree-js";
import { useUserContext } from "../context/context";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { LoadingIcon } from "../components/LoadingIcon";
import { NewBadge } from "../components/NewBadge";
export default function Upgrade() {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [agreed, setAgreed] = useState(false);
	const { userData } = useUserContext();
	const navigate = useNavigate();
	const handleUpgrade = async () => {
		if (!agreed) {
			toast.error("You must agree to the terms to proceed.");
			return;
		}
		if (!userData) {
			toast.error("You must be logged in to upgrade.");
			navigate("/login");
			return;
		}
		setDialogOpen(false);
		setLoading(true);
		try {
			const { data } = await axios.get(
				`${
					import.meta.env.VITE_BACKEND_URL
				}/api/payments/cashfree/create-order`,
				{
					withCredentials: true,
				}
			);
			const cashfree = await load({
				mode: "production",
			});
			const promise = cashfree.checkout({
				paymentSessionId: data.data.paymentSessionId,
				redirectTarget: "_modal",
			});
			promise
				.then((res) => {
					if (res.error) {
						toast.error("Payment failed. Please try again.");
					}

					navigate("/payment-status?orderId=" + data.data.orderId);
				})
				.catch((error) => {
					console.error("Error during payment:", error);
					toast.error(
						"An error occurred during payment. Please try again."
					);
				});
		} catch (error) {
			console.error("Error creating order:", error);
			toast.error("Failed to create order. Please try again later.");
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="flex justify-center items-start min-h-screen pt-24 md:pt-32 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl shadow-2xl border border-zinc-800 bg-zinc-900/90 relative overflow-hidden">
				<div className="absolute top-14 md:top-16 -right-16 md:-right-12  w-72 text-center transform rotate-[40deg] bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-extrabold text-[10px] sm:text-xs py-2 shadow-xl tracking-wide">
					OFFER EXTENDED TILL 8 AUGUST
				</div>

				<div className="absolute -top-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-yellow-500/30 to-yellow-600/20 rounded-full blur-2xl z-0" />
				<div className="relative z-0">
					<div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
						<Lock className="text-yellow-400" size={28} />
						<h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
							Pro Plan
						</h1>
					</div>

					<p className="text-zinc-300 mb-4 text-base sm:text-lg font-medium">
						<span className="text-white">Get Pro for just</span>{" "}
						<span className="text-yellow-400 font-bold text-xl sm:text-3xl">
							₹19<span className="text-sm">/month</span>
						</span>{" "}
						<span className="text-zinc-400 text-lg font-normal">
							<span className="line-through mr-2">₹59/month</span>
						</span>
						<p className="text-xs sm:text-sm text-zinc-400 mt-1">
							Note: You will be charged ₹19 only once. No
							auto-renewal.
						</p>
					</p>
					<ul className="mb-8 space-y-3">
						{features.map((feature, idx) => (
							<li
								key={idx}
								className="flex items-start gap-2 text-zinc-200 text-sm sm:text-base"
							>
								<CheckCircle
									className="text-yellow-400 mt-1"
									size={18}
								/>
								<div
									dangerouslySetInnerHTML={{
										__html: feature,
									}}
								/>
							</li>
						))}
					</ul>

					<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
						<DialogTrigger asChild>
							<CustomButton
								className="w-full text-base sm:text-lg font-semibold py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 !text-black"
								onClick={() => setDialogOpen(true)}
								disabled={loading}
							>
								{loading ? (
									<LoadingIcon className="text-black" />
								) : (
									"Upgrade to Pro"
								)}
							</CustomButton>
						</DialogTrigger>

						<DialogContent className="w-full max-w-lg sm:w-11/12 border border-zinc-700 rounded-3xl shadow-2xl p-0 bg-zinc-900/95 backdrop-blur-xl">
							<DialogHeader className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 flex flex-col items-center text-center">
								<div className="flex items-center gap-3">
									<Lock
										className="text-yellow-400"
										size={28}
									/>
									<DialogTitle className="text-xl sm:text-2xl font-bold text-white tracking-tight">
										Upgrade to Pro
									</DialogTitle>
								</div>
								<p className="mt-2 text-sm sm:text-base text-zinc-400">
									Unlock premium features for just ₹19/month
								</p>
							</DialogHeader>

							<div className="px-6 sm:px-8 py-4 text-left text-zinc-300 text-sm leading-relaxed max-h-60 overflow-y-auto hide-scrollbar space-y-4">
								<div>
									<h3 className="font-semibold text-gray-400 text-base mb-1">
										Purchase Policy
									</h3>
									<p>
										By purchasing the Pro Plan, you agree to
										our{" "}
										<a
											href="/terms"
											className="text-sky-400 underline hover:text-sky-300"
											target="_blank"
											rel="noopener noreferrer"
										>
											Terms of Service
										</a>{" "}
										and{" "}
										<a
											href="/privacy-policy"
											className="text-sky-400 underline hover:text-sky-300"
											target="_blank"
											rel="noopener noreferrer"
										>
											Privacy Policy
										</a>
										.
									</p>
									<ul className="list-disc ml-5 mt-2 space-y-2 text-xs sm:text-sm text-zinc-400">
										<li>
											Flat ₹19/month. No auto-renewal.
											Manual repurchase needed.
										</li>
										<li>
											<span className="text-red-400 font-semibold">
												No refunds
											</span>{" "}
											after purchase.
										</li>
										<li>
											Accounts may be restricted for
											policy violations.
										</li>
									</ul>
								</div>
							</div>

							<div className="flex items-start mt-3 px-6 sm:px-8">
								<input
									id="agree"
									type="checkbox"
									checked={agreed}
									onChange={(e) =>
										setAgreed(e.target.checked)
									}
									className="mt-1 mr-3 accent-yellow-500 w-4 h-4 rounded border-zinc-600 bg-zinc-800 focus:ring-2 focus:ring-yellow-400"
								/>
								<label
									htmlFor="agree"
									className="text-xs sm:text-sm text-zinc-300 select-none"
								>
									I agree to the{" "}
									<a
										href="/terms"
										className="text-sky-400 underline hover:text-sky-300"
										target="_blank"
									>
										Terms of Service
									</a>
									.
								</label>
							</div>

							<DialogFooter className="px-6 sm:px-8 pb-6 sm:pb-8 pt-5">
								<CustomButton
									onClick={handleUpgrade}
									disabled={!agreed}
									className={`w-full text-base sm:text-lg font-semibold py-3 rounded-xl ${
										agreed
											? "bg-yellow-500 hover:bg-yellow-600 !text-black"
											: "bg-gray-600 text-gray-300 cursor-not-allowed"
									}`}
								>
									Proceed to Payment
								</CustomButton>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>

				<FAQSection />
			</div>
		</div>
	);
}

function FAQSection() {
	const faqs = [
		{
			question: "Why is there a charge for the Pro Plan?",
			answer: "Running this platform involves real costs including servers, storage, and regular development to keep the site fast, secure, and up-to-date with new features. The Pro Plan helps us cover these expenses and continue improving the platform for everyone.",
			value: "faq1",
		},
		{
			question: "What is included in the Pro Plan?",
			answer: "NextLeet Pro gives you unlimited access to all LeetCode questions, detailed question insights, company-wise preparation sheets, smart code analyzer, priority support, early access to new features, and an ad-free experience.",
			value: "faq2",
		},
		{
			question: "How do I upgrade to the Pro Plan?",
			answer: 'Simply click the "Upgrade to Pro" button and follow the on-screen instructions to complete your purchase securely.',
			value: "faq3",
		},
		{
			question: "Is there a free plan available?",
			answer: "Currently, we only offer the Pro Plan. This ensures we can maintain the platform's quality and sustainability without relying on intrusive ads or selling user data.",
			value: "faq4",
		},
	];

	return (
		<Accordion
			type="single"
			collapsible
			className="mt-8 sm:mt-10 bg-zinc-800/80 rounded-2xl border border-zinc-700  shadow-lg"
		>
			{faqs.map((faq) => (
				<AccordionItem key={faq.value} value={faq.value}>
					<AccordionTrigger className="flex items-center justify-between px-4 text-base sm:text-lg sm:px-6 py-3 sm:py-4 font-semibold text-zinc-200 hover:text-yellow-400 transition-colors">
						{faq.question}
					</AccordionTrigger>
					<AccordionContent className="px-4 sm:px-6 pb-3 text-base sm:text-lg sm:pb-4 text-zinc-300">
						{faq.answer}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
