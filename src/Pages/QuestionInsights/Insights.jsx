// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Badge } from "../../components/ui/badge";
// import { CustomButton } from "../../components/CustomButton";
// import { Loading } from "../../components/Loading";
// import {
// 	CheckCircle2,
// 	Crown,
// 	Verified,
// 	Lightbulb,
// 	TrendingUp,
// 	Users,
// 	Heart,
// 	ThumbsDown,
// 	Target,
// 	Building2,
// 	Eye,
// } from "lucide-react";
// import {
// 	Dialog,
// 	DialogContent,
// 	DialogDescription,
// 	DialogHeader,
// 	DialogTitle,
// 	DialogTrigger,
// } from "../../components/ui/dialog";
// import { toast } from "sonner";
// import {
// 	getCompanyTagBySlug,
// 	getQuestionDetailsBySlug,
// } from "../../appwrite/leetcode.companyTag";
// import { getTotalScore } from "../../utils/nextleetScore";

// // Popular company acronyms and configurations
// const popularAcronyms = {
// 	MAANG: ["Meta", "Apple", "Amazon", "Netflix", "Google"],
// 	GAFAM: ["Google", "Apple", "Facebook", "Amazon", "Microsoft"],
// 	WITCH: ["Wipro", "Infosys", "tcs", "Cognizant", "HCL"],
// 	BAT: ["Baidu", "Alibaba", "Tencent"],
// };

// const colorMap = {
// 	MAANG: "bg-blue-700",
// 	GAFAM: "bg-emerald-700",
// 	WITCH: "bg-rose-700",
// 	BAT: "bg-purple-700",
// };

// const famousCompanies = [
// 	"Google",
// 	"Amazon",
// 	"Microsoft",
// 	"Meta",
// 	"Apple",
// 	"Netflix",
// 	"Adobe",
// 	"Salesforce",
// 	"Uber",
// 	"Airbnb",
// 	"LinkedIn",
// 	"Oracle",
// 	"Qualcomm",
// 	"Nvidia",
// 	"Tesla",
// 	"Bloomberg",
// 	"ByteDance",
// 	"Samsung",
// 	"VMware",
// 	"Goldman Sachs",
// 	"IBM",
// 	"Yandex",
// 	"Zoho",
// 	"Flipkart",
// 	"Walmart",
// ];

// const checkCompaniesIncluded = (companyList, acronym) => {
// 	return companyList.some(({ companyName }) =>
// 		popularAcronyms[acronym].includes(companyName)
// 	);
// };

// const nextleetScore = {
// 	1: { name: "Novice", color: "text-blue-500" },
// 	2: { name: "Beginner", color: "text-green-500" },
// 	3: { name: "Intermediate", color: "text-yellow-500" },
// 	4: { name: "Advanced", color: "text-orange-500" },
// 	5: { name: "Expert", color: "text-red-500" },
// };

// const difficultyMap = {
// 	1: { label: "Easy", color: "text-green-500" },
// 	2: { label: "Medium", color: "text-yellow-500" },
// 	3: { label: "Hard", color: "text-red-500" },
// };

// export default function QuestionInsights() {
// 	const { titleSlug } = useParams();
// 	const [questionData, setQuestionData] = useState(null);
// 	const [companyTags, setCompanyTags] = useState([]);
// 	const [loading, setLoading] = useState(true);
// 	const displayedCompanies = companyTags.slice(0, 20);
// 	const hasMoreCompanies = companyTags.length > 20;

// 	useEffect(() => {
// 		if (!titleSlug || titleSlug.trim().length === 0) return;
// 		// Set document title
// 		document.title = `${titleSlug
// 			.split("-")
// 			.join(" ")
// 			.toUpperCase()} - Question Insights`;
// 		setCompanyTags([]);
// 		getCompanyTagBySlug(titleSlug)
// 			.then((data) => {
// 				setCompanyTags(data);
// 				if (data.length > 0) {
// 					setCompanyTags(data);
// 				}
// 			})
// 			.catch((error) => {
// 				toast.error(error.message || "Failed to load question data");
// 			})
// 			.finally(() => {
// 				setLoading(false);
// 			});

// 		getQuestionDetailsBySlug(titleSlug)
// 			.then((data) => {
// 				setQuestionData(data);
// 				if (data.length > 0) {
// 					setQuestionData(data);
// 				}
// 			})
// 			.catch((error) => {
// 				toast.error(error.message || "Failed to load question data");
// 			})
// 			.finally(() => {
// 				setLoading(false);
// 			});
// 	}, [titleSlug]);

// 	if (loading) {
// 		return (
// 			<div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-black flex items-center justify-center">
// 				<Loading />
// 			</div>
// 		);
// 	}

// 	if (!questionData) {
// 		return (
// 			<div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-black flex items-center justify-center">
// 				<div className="text-center text-zinc-400">
// 					<p className="text-xl">Question not found</p>
// 					<p className="text-sm mt-2">
// 						This may happen if the question is newly added.
// 					</p>
// 				</div>
// 			</div>
// 		);
// 	}

// 	const acceptanceRate = Math.round(questionData.acRate);

// 	return (
// 		<div className="min-h-screen pt-32">
// 			{/* Hero Section */}
// 			<div className="relative max-w-6xl mx-auto px-6 py-16">
// 				<div className="text-center mb-12">
// 					<div className="flex items-center justify-center gap-3 mb-4">
// 						<Target className="text-green-400" size={32} />
// 						<h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
// 							{questionData.title}
// 						</h1>
// 					</div>
// 					<div className="flex items-center justify-center gap-4 mb-6">
// 						<p
// 							className={`${
// 								nextleetScore[
// 									getTotalScore(
// 										questionData.topics,
// 										companyTags.acRate,
// 										companyTags.difficulty
// 									)
// 								].color
// 							} px-4 py-1 uppercase border border-gray-700 rounded-full bg-gray-500/30 text-black font-semibold`}
// 						>
// 							{
// 								nextleetScore[
// 									getTotalScore(
// 										questionData.topics,
// 										companyTags.acRate,
// 										companyTags.difficulty
// 									)
// 								].name
// 							}
// 						</p>
// 						<p
// 							className={`${
// 								difficultyMap[questionData.difficulty].color
// 							} px-4 py-1 uppercase border border-gray-700 rounded-full bg-gray-500/30 text-black font-semibold`}
// 						>
// 							{difficultyMap[questionData.difficulty].label}
// 						</p>
// 					</div>
// 				</div>

// 				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// 					{/* Left Column */}
// 					<div className="lg:col-span-2 space-y-8">
// 						{/* Companies Section */}
// 						<div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-8 border border-zinc-800">
// 							<div className="flex items-center text-xl gap-3 mb-6">
// 								<Building2
// 									className="text-blue-400"
// 									size={28}
// 								/>
// 								<p className="text-center">
// 									<span className="text-gray-400">
// 										Number of Companies That Asked :{" "}
// 									</span>
// 									<span className="text-2xl text-white font-bold">
// 										{companyTags.length}
// 									</span>
// 								</p>
// 							</div>
// 							{/* Company Acronyms */}
// 							<div className="flex flex-wrap justify-center gap-2 mb-6">
// 								{Object.entries(popularAcronyms).map(
// 									([acronym]) =>
// 										checkCompaniesIncluded(
// 											companyTags,
// 											acronym
// 										) && (
// 											<Badge
// 												key={acronym}
// 												className={`${colorMap[acronym]} text-white px-3 py-1 text-sm font-medium flex items-center gap-1`}
// 											>
// 												<Verified
// 													className="text-white"
// 													size={16}
// 												/>
// 												{acronym}
// 											</Badge>
// 										)
// 								)}
// 							</div>
// 							{/* Company Grid */}
// 							<div className="flex flex-wrap gap-4">
// 								{displayedCompanies.map((tag, idx) => (
// 									<div
// 										key={idx}
// 										className={`group relative bg-zinc-800/50 hover:bg-zinc-700/50  rounded-xl py-2 px-4 border border-zinc-700 hover:border-zinc-600 transition-all cursor-pointer
// 																	${famousCompanies.includes(tag.companyName) ? "ring-2 ring-yellow-400/30" : ""}
// 																`}
// 									>
// 										{famousCompanies.includes(
// 											tag.companyName
// 										) && (
// 											<Crown className="text-yellow-500 fill-yellow-500 absolute top-0 left-0 -mt-3 -rotate-12 -ml-3 size-5" />
// 										)}
// 										<div className="flex items-center gap-3">
// 											<img
// 												src={`https://img.logo.dev/${tag.companyName
// 													.split(" ")
// 													.join(
// 														""
// 													)}.com?token=pk_Ovv0aVUwQNK80p_PGY_xcg`}
// 												className="w-5 h-5 rounded-full"
// 												alt={`${tag.companyName} logo`}
// 											/>

// 											<span className="text-white font-medium group-hover:text-zinc-100 transition-colors">
// 												{tag.companyName}
// 											</span>
// 										</div>
// 									</div>
// 								))}
// 							</div>

// 							{/* Show More Button */}
// 							{hasMoreCompanies && (
// 								// <div className="mt-6 text-center">
// 								<Dialog>
// 									<DialogTrigger asChild>
// 										<CustomButton className="mx-auto mt-6 space-x-2">
// 											<Eye size={20} />
// 											<p>
// 												View All {companyTags.length}{" "}
// 												Companies
// 											</p>
// 										</CustomButton>
// 									</DialogTrigger>
// 									<DialogContent className="min-w-3/4 bg-zinc-900 border-zinc-800">
// 										<DialogHeader>
// 											<DialogTitle className="text-2xl font-bold text-white mb-2">
// 												All Companies (
// 												{companyTags.length})
// 											</DialogTitle>
// 										</DialogHeader>
// 										<div className="mt-6 max-h-[60vh] hide-scrollbar p-5 overflow-y-auto">
// 											<div className="flex flex-wrap gap-4">
// 												{companyTags.map((tag, idx) => (
// 													<div
// 														key={idx}
// 														className={`group relative bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 hover:from-zinc-700/50 hover:to-zinc-800/50 rounded-xl py-2 px-4 border border-zinc-700 hover:border-zinc-600 transition-all cursor-pointer
// 																	${famousCompanies.includes(tag.companyName) ? "ring-2 ring-yellow-400/30" : ""}
// 																`}
// 													>
// 														{famousCompanies.includes(
// 															tag.companyName
// 														) && (
// 															<Crown className="text-yellow-500 fill-yellow-500 absolute top-0 left-0 -mt-3 -rotate-12 -ml-3 size-5" />
// 														)}
// 														<div className="flex items-center gap-3">
// 															<img
// 																src={`https://img.logo.dev/${tag.companyName
// 																	.split(" ")
// 																	.join(
// 																		""
// 																	)}.com?token=pk_Ovv0aVUwQNK80p_PGY_xcg`}
// 																className="w-5 h-5 rounded-full"
// 																alt={`${tag.companyName} logo`}
// 															/>

// 															<span className="text-white font-medium group-hover:text-zinc-100 transition-colors">
// 																{
// 																	tag.companyName
// 																}
// 															</span>
// 														</div>
// 													</div>
// 												))}
// 											</div>
// 										</div>
// 									</DialogContent>
// 								</Dialog>
// 								// </div>
// 							)}

// 							{companyTags.length === 0 && (
// 								<div className="text-center text-zinc-400 py-8">
// 									<p>No companies found.</p>
// 									<p className="text-sm">
// 										This may happen if the question is newly
// 										added.
// 									</p>
// 								</div>
// 							)}
// 						</div>
// 					</div>

// 					{/* Right Column */}
// 					<div className="space-y-8">
// 						{/* Similar Questions */}
// 						<div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-8 border border-zinc-800">
// 							<h2 className="text-2xl font-bold text-white mb-6">
// 								Similar Questions
// 							</h2>
// 							{questionData.similarQuestionList &&
// 							questionData.similarQuestionList.length > 0 ? (
// 								<div className="space-y-3">
// 									{questionData.similarQuestionList.map(
// 										(question, idx) => (
// 											<div
// 												key={idx}
// 												className="group bg-zinc-800/50 hover:bg-zinc-700/50 rounded-lg p-4 border border-zinc-700 hover:border-zinc-600 transition-all cursor-pointer"
// 											>
// 												<div className="flex items-center gap-3">
// 													<CheckCircle2
// 														className="text-green-400 group-hover:text-green-300"
// 														size={20}
// 													/>
// 													<span className="text-white font-medium group-hover:text-zinc-100 transition-colors">
// 														{question}
// 													</span>
// 												</div>
// 											</div>
// 										)
// 									)}
// 								</div>
// 							) : (
// 								<div className="text-center text-zinc-400 py-8">
// 									<p>No similar questions found.</p>
// 								</div>
// 							)}
// 						</div>
// 					</div>
// 				</div>
// 				{/* Stats Overview */}
// 				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
// 					<div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all">
// 						<div className="flex items-center gap-3 mb-2">
// 							<Heart className="text-green-400" size={24} />
// 							<span className="text-zinc-400 font-medium">
// 								Likes
// 							</span>
// 						</div>
// 						<p className="text-3xl font-bold text-white">
// 							{questionData.likes.toLocaleString()}
// 						</p>
// 					</div>
// 					<div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all">
// 						<div className="flex items-center gap-3 mb-2">
// 							<ThumbsDown className="text-red-400" size={24} />
// 							<span className="text-zinc-400 font-medium">
// 								Dislikes
// 							</span>
// 						</div>
// 						<p className="text-3xl font-bold text-white">
// 							{questionData.dislikes.toLocaleString()}
// 						</p>
// 					</div>
// 					<div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all">
// 						<div className="flex items-center gap-3 mb-2">
// 							<Users className="text-blue-400" size={24} />
// 							<span className="text-zinc-400 font-medium">
// 								Submissions
// 							</span>
// 						</div>
// 						<p className="text-3xl font-bold text-white">
// 							{questionData.totalSubmissions > 0
// 								? (
// 										questionData.totalSubmissions / 1000000
// 								  ).toFixed(1) + "M"
// 								: "N/A"}
// 						</p>
// 					</div>
// 					<div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all">
// 						<div className="flex items-center gap-3 mb-2">
// 							<TrendingUp className="text-yellow-400" size={24} />
// 							<span className="text-zinc-400 font-medium">
// 								Acceptance
// 							</span>
// 						</div>
// 						<p className="text-3xl font-bold text-white">
// 							{acceptanceRate}%
// 						</p>
// 					</div>
// 				</div>

// 				{/* Main Content Grid */}
// 			</div>
// 		</div>
// 	);
// }
