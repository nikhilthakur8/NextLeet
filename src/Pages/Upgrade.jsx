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
export default function Upgrade() {
	const [dialogOpen, setDialogOpen] = useState(false);
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
		try {
			const { data } = await axios.get(
				`${
					import.meta.env.VITE_BACKEND_URL
				}/api/payments/cashfree/create-order`,
				{
					headers: {
						Authorization: `Bearer ${userData.jwt}`,
					},
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
		}
	};
	return (
		<div className="flex justify-center items-start min-h-screen pt-24 md:pt-32 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl shadow-2xl border border-zinc-800 bg-zinc-900/90 relative overflow-hidden">
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
							₹1<span className="text-base">/day</span>
						</span>{" "}
						<span className="text-zinc-400 text-sm font-normal">
							(Billed ₹29/month)
						</span>
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
							<CustomButton className="w-full text-base sm:text-lg font-semibold py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-black">
								Upgrade to Pro
							</CustomButton>
						</DialogTrigger>

						<DialogContent className="w-full sm:w-11/12 md:w-3/4 border text-gray-300 border-zinc-700 rounded-2xl shadow-2xl p-0 bg-zinc-900/95 backdrop-blur-lg">
							<DialogHeader className="px-6 sm:px-8 pt-6 sm:pt-8 pb-2">
								<div className="flex items-center gap-3 justify-center">
									<Lock
										className="text-yellow-400"
										size={28}
									/>
									<DialogTitle className="text-xl sm:text-2xl font-bold text-white tracking-tight">
										Upgrade to Pro
									</DialogTitle>
								</div>
							</DialogHeader>

							<div className="px-6 sm:px-8 pb-2 text-center">
								<h2 className="text-lg sm:text-xl font-semibold mb-2 text-white">
									Agreement
								</h2>
							</div>

							<div className="space-y-4 max-h-64 overflow-y-auto px-6 sm:px-8 pb-2 hide-scrollbar text-left text-zinc-300 text-xs sm:text-sm leading-relaxed">
								<div>
									<h3 className="font-semibold text-gray-400">
										Purchase Policy
									</h3>
									<p className="mt-2">
										By purchasing the Pro Plan, you agree to
										our
										<a
											href="/terms"
											className="text-sky-400 underline hover:text-sky-300"
											target="_blank"
											rel="noopener noreferrer"
										>
											{" "}
											Terms of Service{" "}
										</a>
										and
										<a
											href="/privacy-policy"
											className="text-sky-400 underline hover:text-sky-300"
											target="_blank"
											rel="noopener noreferrer"
										>
											{" "}
											Privacy Statement{" "}
										</a>
										.
									</p>
									<p className="mt-2">
										This is a paid plan. You will be charged
										₹29 per month. No auto-renewal. No
										recurring billing. You need to
										repurchase monthly.
									</p>
									<p className="mt-2">
										<b className="text-red-400">
											No refunds
										</b>{" "}
										will be issued once the purchase is
										made.
									</p>
									<p className="mt-2">
										We may deny access or terminate accounts
										without notice for violations of our
										Terms of Service.
									</p>
								</div>
							</div>

							<div className="flex items-center mt-4 px-6 sm:px-8">
								<input
									id="agree"
									type="checkbox"
									checked={agreed}
									onChange={(e) =>
										setAgreed(e.target.checked)
									}
									className="mr-2 accent-yellow-500 w-4 h-4 rounded focus:ring-2 focus:ring-yellow-400 border-zinc-600 bg-zinc-800"
								/>
								<label
									htmlFor="agree"
									className="text-xs sm:text-sm text-zinc-300 select-none"
								>
									I agree to this agreement and
									<a
										href="/terms"
										className="text-sky-400 underline hover:text-sky-300"
									>
										{" "}
										Terms of Service
									</a>
								</label>
							</div>

							<DialogFooter className="px-6 sm:px-8 pb-6 sm:pb-8 pt-4">
								<CustomButton
									disabled={!agreed}
									onClick={handleUpgrade}
									className="w-full text-base sm:text-lg font-semibold py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-black"
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
			answer: "The Pro Plan gives you unlimited access to all questions, premium code explanations, an advanced analytics dashboard, priority support, early access to new features, and an ad-free experience.",
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
