// pages/buddy.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { CustomButton } from "../components/CustomButton";
import { Card, CardContent } from "../components/ui/card";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../components/ui/select";
import { useNavigate, useSearchParams } from "react-router-dom";

const languages = [
	{ label: "C++", id: "cpp" },
	{ label: "Java", id: "java" },
	{ label: "Python", id: "python" },
	{ label: "JavaScript", id: "javascript" },
	{ label: "C#", id: "csharp" },
	{ label: "Ruby", id: "ruby" },
	{ label: "Go", id: "go" },
	{ label: "PHP", id: "php" },
	{ label: "Swift", id: "swift" },
	{ label: "Kotlin", id: "kotlin" },
	{ label: "Rust", id: "rust" },
	{ label: "TypeScript", id: "typescript" },
];

export const RegisterBuddy = () => {
	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: { errors },
		trigger,
		reset,
	} = useForm();
	const navigate = useNavigate();
	const [step, setStep] = useState(1);
	const [lcData, setLcData] = useState(null);
	const handleLeetcodeFetch = async () => {
		const isValid = await trigger(["leetcodeUsername"]);
		if (!isValid) return;
		const leetcodeUsername = watch("leetcodeUsername");
		axios
			.post(`${import.meta.env.VITE_BACKEND_URL}/api/leetcode-profile`, {
				username: leetcodeUsername,
			})
			.then((res) => {
				setLcData(res.data.data);
				setStep(2);
				toast.success("LeetCode profile fetched successfully!");
			})
			.catch((err) => {
				toast.error(
					err.response?.data?.message ||
						"An error occurred while fetching LeetCode profile."
				);
			});
	};

	const handleSubmitForm = async (data) => {
		data.leetcodeData = lcData;
		axios
			.post(
				`${import.meta.env.VITE_BACKEND_URL}/api/user/register-buddy`,
				{
					...data,
				},
				{
					withCredentials: true,
				}
			)
			.then((res) => {
				toast.success("Registration successful!");
				navigate("/find-buddy");
			})
			.catch((err) => {
				toast.error(
					err.response?.data?.message ||
						"An error occurred while fetching LeetCode profile."
				);
			});
	};
	const [searchParams] = useSearchParams();
	const editable = searchParams.get("edit") === "true";
	useEffect(() => {
		window.scrollTo(0, 0);
		window.document.title = "Register Buddy | NextLeet";
		axios
			.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/buddy-profile`, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.data.data) {
					if (editable) {
						res.data.data.leetcodeUsername =
							res.data.data.leetcodeData.profile.username;
						reset(res.data.data);
					} else {
						navigate("/find-buddy");
					}
				}
			});
	}, []);

	const progressPercentage = (step / 5) * 100;

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-xl"
			>
				<Card className="w-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
					<CardContent className="p-6">
						{/* Progress bar */}
						<div className="mb-8">
							<div className="flex justify-between text-sm mb-2">
								<span className="text-zinc-400">
									Step {step} of 5
								</span>
								<span className="font-medium">
									{Math.round(progressPercentage)}%
								</span>
							</div>
							<motion.div
								className="h-2 bg-zinc-800 rounded-full overflow-hidden"
								initial={{ width: 0 }}
								animate={{ width: "100%" }}
								transition={{ duration: 0.8 }}
							>
								<motion.div
									className="h-full bg-blue-500"
									initial={{ width: 0 }}
									animate={{
										width: `${progressPercentage}%`,
									}}
									transition={{ duration: 0.8, delay: 0.2 }}
								/>
							</motion.div>
						</div>

						<AnimatePresence mode="wait">
							{/* Step 1: LeetCode Username */}
							{step === 1 && (
								<motion.div
									key="step1"
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: 20 }}
									transition={{ duration: 0.3 }}
								>
									<h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
										Connect Your LeetCode Profile
									</h2>
									<Input
										placeholder="LeetCode Username"
										error={errors.leetcodeUsername?.message}
										onKeyDown={(e) => {
											if (e.key === "Enter")
												handleLeetcodeFetch();
										}}
										{...register("leetcodeUsername", {
											required: {
												value: true,
												message: "Username is required",
											},
											minLength: {
												value: 3,
												message:
													"Username must be at least 3 characters long",
											},
										})}
									/>
									<CustomButton
										onClick={handleLeetcodeFetch}
										className="mt-6 !bg-blue-500/40 hover:!bg-blue-500/60 !border-blue-500/50 ml-auto px-6 !rounded-full"
									>
										Fetch Details
									</CustomButton>
								</motion.div>
							)}

							{/* Step 2: LeetCode Profile */}
							{step === 2 && lcData && (
								<motion.div
									key="step2"
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: 20 }}
									transition={{ duration: 0.3 }}
								>
									<h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
										Your LeetCode Profile
									</h2>

									<div className="flex flex-row items-center space-x-5 border-b border-gray-800 py-8 mb-4">
										<img
											src={lcData.profile.userAvatar}
											className="w-16 h-16 rounded-xl"
											alt="User Avatar"
										/>
										<div>
											<p>
												<span className="text-gray-400">
													Name
												</span>{" "}
												{lcData.profile.realName}
											</p>
											<p>
												<span className="text-gray-400">
													Rank
												</span>{" "}
												<span className="text-lg">
													{lcData.profile.ranking}
												</span>
											</p>
										</div>
									</div>

									<p className="text-gray-400 mb-4">
										Total Problems Solved:{" "}
										<span className="text-white font-bold text-lg">
											{lcData.stats.easySolved +
												lcData.stats.mediumSolved +
												lcData.stats.hardSolved}
										</span>
									</p>

									{/* Circular Progress Section */}
									<div className="flex justify-center gap-6 mb-6">
										{[
											{
												label: "Easy",
												count: lcData.stats.easySolved,
												color: "green",
											},
											{
												label: "Medium",
												count: lcData.stats
													.mediumSolved,
												color: "yellow",
											},
											{
												label: "Hard",
												count: lcData.stats.hardSolved,
												color: "red",
											},
										].map(
											({ label, count, color }, idx) => {
												const total =
													lcData.stats.easySolved +
													lcData.stats.mediumSolved +
													lcData.stats.hardSolved;
												const percentage =
													total > 0
														? (count / total) * 100
														: 0;

												const strokeColor = {
													green: "stroke-green-500",
													yellow: "stroke-yellow-400",
													red: "stroke-red-500",
												}[color];

												const radius = 24;
												const circumference =
													2 * Math.PI * radius;

												return (
													<div
														className="flex flex-col items-center"
														key={label}
													>
														<div className="relative w-16 h-16">
															<svg
																className="absolute top-0 left-0"
																width="64"
																height="64"
															>
																<circle
																	className="text-gray-700"
																	strokeWidth="6"
																	stroke="currentColor"
																	fill="transparent"
																	r={radius}
																	cx="32"
																	cy="32"
																/>
																<motion.circle
																	className={
																		strokeColor
																	}
																	strokeWidth="6"
																	fill="transparent"
																	r={radius}
																	cx="32"
																	cy="32"
																	strokeDasharray={
																		circumference
																	}
																	strokeDashoffset={
																		circumference -
																		(circumference *
																			percentage) /
																			100
																	}
																	initial={{
																		strokeDashoffset:
																			circumference,
																	}}
																	animate={{
																		strokeDashoffset:
																			circumference -
																			(circumference *
																				percentage) /
																				100,
																	}}
																	transition={{
																		duration: 1,
																	}}
																	strokeLinecap="round"
																/>
															</svg>
															<div className="absolute inset-0 flex items-center justify-center">
																<span className="text-sm text-white font-semibold">
																	{count}
																</span>
															</div>
														</div>
														<p className="mt-1 text-xs text-white">
															{label}
														</p>
													</div>
												);
											}
										)}
									</div>

									<div className="flex justify-between mt-8">
										<CustomButton
											onClick={() => setStep(1)}
											className="px-6 !rounded-full"
										>
											No, It's not Me!
										</CustomButton>
										<CustomButton
											onClick={() => setStep(3)}
											className="px-6 !bg-blue-500/40 hover:!bg-blue-500/60 !border-blue-500/50 !rounded-full"
										>
											Yeah, It's Me!
										</CustomButton>
									</div>
								</motion.div>
							)}

							{/* Step 3: Preferences */}
							{step === 3 && (
								<motion.div
									key="step2"
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: 20 }}
									transition={{ duration: 0.3 }}
								>
									<h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
										Your Preferences
									</h2>

									<div className="space-y-4">
										<Controller
											name="preferredLanguage"
											control={control}
											rules={{
												required: {
													value: true,
													message:
														"Preferred language is required",
												},
											}}
											render={({ field }) => (
												<>
													<Select
														onValueChange={
															field.onChange
														}
														value={
															field.value || ""
														}
													>
														<SelectTrigger className="rounded-xl border text-sm md:text-lg border-gray-800 bg-gray-900 text-gray-200 hover:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none px-5 py-5 min-w-64 w-full">
															<SelectValue
																placeholder="Select Language"
																className="text-gray-400"
															/>
														</SelectTrigger>
														<SelectContent className="bg-gray-900 text-gray-200 border border-gray-700 rounded-lg shadow-lg">
															<SelectGroup>
																<SelectLabel className="text-gray-400">
																	Select
																	Preferred
																	Language
																</SelectLabel>
																{languages.map(
																	(
																		lang,
																		idx
																	) => (
																		<SelectItem
																			key={
																				idx
																			}
																			value={
																				lang.id
																			}
																			className="cursor-pointer text-base md:text-lg rounded-md px-2 py-1 focus:bg-gray-800"
																		>
																			{
																				lang.label
																			}
																		</SelectItem>
																	)
																)}
															</SelectGroup>
														</SelectContent>
													</Select>
													<Error
														message={
															errors
																.preferredLanguage
																?.message
														}
													/>
												</>
											)}
										/>
										<Input
											placeholder="Any Contact Link (e.g. DM X, Discord, Telegram)"
											{...register("contactLink", {
												required: {
													value: true,
													message:
														"Contact link is required",
												},
												pattern: {
													value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
													message: "Invalid URL",
												},
											})}
											error={errors.contactLink?.message}
										/>
									</div>
									<div className="flex justify-between mt-8">
										<CustomButton
											onClick={() => setStep(2)}
											className="px-6 !rounded-full"
										>
											Back
										</CustomButton>
										<CustomButton
											onClick={async () => {
												const isValid = await trigger([
													"preferredLanguage",
													"contactLink",
												]);
												if (isValid) setStep(4);
											}}
											className="px-6 !bg-blue-500/40 hover:!bg-blue-500/60 !border-blue-500/50 !rounded-full"
										>
											Continue
										</CustomButton>
									</div>
								</motion.div>
							)}

							{/* Step 4: Introduction */}
							{step === 4 && (
								<motion.div
									key="step3"
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: 20 }}
									transition={{ duration: 0.3 }}
								>
									<h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
										Introduce Yourself
									</h2>
									<motion.div className="mb-6">
										<textarea
											placeholder="Write something about your goals, timings, expectations..."
											spellCheck={false}
											className="w-full p-4 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
											{...register("description", {
												required: {
													value: true,
													message:
														"Description is required",
												},
												minLength: {
													value: 20,
													message:
														"Description must be at least 20 characters long",
												},
												maxLength: {
													value: 200,
													message:
														"Description must be at most 200 characters long",
												},
											})}
											autoFocus
											rows={5}
										/>
										<Error
											message={
												errors.description?.message
											}
										/>
									</motion.div>

									<div className="flex justify-between mt-8">
										<CustomButton
											onClick={() => setStep(3)}
											className="px-6 !rounded-full"
										>
											Back
										</CustomButton>
										<CustomButton
											onClick={async () => {
												const isValid = await trigger([
													"description",
												]);
												if (isValid) setStep(5);
											}}
											className="px-6 !bg-blue-500/40 hover:!bg-blue-500/60 !border-blue-500/50 !rounded-full"
										>
											Continue
										</CustomButton>
									</div>
								</motion.div>
							)}

							{/* Step 5: Social Links */}
							{step === 5 && (
								<motion.div
									key="step5"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 20 }}
									transition={{ duration: 0.3 }}
								>
									<Input
										placeholder="GitHub Link (optional)"
										{...register("socialLinks.github", {
											pattern: {
												value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
												message: "Invalid URL",
											},
										})}
										error={
											errors.socialLinks?.github?.message
										}
									/>
									<Input
										placeholder="Portfolio Link (optional)"
										{...register("socialLinks.portfolio", {
											pattern: {
												value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
												message: "Invalid URL",
											},
										})}
										error={
											errors.socialLinks?.portfolio
												?.message
										}
									/>
									<Input
										placeholder="Twitter Link (optional)"
										{...register("socialLinks.twitter", {
											pattern: {
												value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
												message: "Invalid URL",
											},
										})}
										error={
											errors.socialLinks?.twitter?.message
										}
									/>
									<Input
										placeholder="LinkedIn Link (optional)"
										{...register("socialLinks.linkedin", {
											pattern: {
												value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
												message: "Invalid URL",
											},
										})}
										error={
											errors.socialLinks?.linkedin
												?.message
										}
									/>
									<div className="flex justify-between mt-8">
										<CustomButton
											onClick={() => setStep(4)}
											className="px-6 !rounded-full"
										>
											Back
										</CustomButton>
										<CustomButton
											onClick={handleSubmit(
												handleSubmitForm
											)}
											className="px-6 !bg-blue-500/40 hover:!bg-blue-500/60 !border-blue-500/50 !rounded-full"
										>
											Submit
										</CustomButton>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
};

// Input Component
function Input({ error, placeholder, ...props }) {
	return (
		<motion.div>
			<input
				type="text"
				placeholder={placeholder}
				className="w-full border mt-4 border-gray-800 hover:border-gray-700 rounded-xl px-3 focus:ring-2 focus:ring-blue-500 focus:ring-offset-gray-900 bg-gray-900 text-base md:text-lg py-1.5 focus:outline-none"
				autoComplete={"off"}
				{...props}
			/>
			<Error message={error} />
		</motion.div>
	);
}

// Error Component
function Error({ message }) {
	return <div className="ml-2 text-red-500 text-sm mt-2">{message}</div>;
}
