import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Badge } from "../../components/ui/badge";
import { CustomButton } from "../../components/CustomButton";
import { Loading } from "../../components/Loading";
import {
	CheckCircle2,
	Crown,
	Verified,
	Lightbulb,
	TrendingUp,
	Users,
	Heart,
	ThumbsDown,
	Target,
	Building2,
	Eye,
	CheckCircle,
	MessageSquare,
	Briefcase,
} from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../components/ui/dialog";
import { toast } from "sonner";
import {
	getCompanyTagBySlug,
	getQuestionDetailsBySlug,
} from "../../appwrite/leetcode.companyTag";
import { getTotalScore } from "../../utils/nextleetScore";

// Popular company acronyms and configurations
const popularAcronyms = {
	MAANG: ["Meta", "Apple", "Amazon", "Netflix", "Google"],
	GAFAM: ["Google", "Apple", "Facebook", "Amazon", "Microsoft"],
	WITCH: ["Wipro", "Infosys", "tcs", "Cognizant", "HCL"],
	BAT: ["Baidu", "Alibaba", "Tencent"],
};

const colorMap = {
	MAANG: "bg-blue-700",
	GAFAM: "bg-emerald-700",
	WITCH: "bg-rose-700",
	BAT: "bg-purple-700",
};

const famousCompanies = [
	"Google",
	"Amazon",
	"Microsoft",
	"Meta",
	"Apple",
	"Netflix",
	"Adobe",
	"Salesforce",
	"Uber",
	"Airbnb",
	"LinkedIn",
	"Oracle",
	"Qualcomm",
	"Nvidia",
	"Tesla",
	"Bloomberg",
	"ByteDance",
	"Samsung",
	"VMware",
	"Goldman Sachs",
	"IBM",
	"Yandex",
	"Zoho",
	"Flipkart",
	"Walmart",
];

const checkCompaniesIncluded = (companyList, acronym) => {
	return companyList.some(({ companyName }) =>
		popularAcronyms[acronym].includes(companyName)
	);
};

const formatCount = (count) => {
	if (count > 1000000) {
		return (count / 1000000).toFixed(1) + "M";
	} else if (count > 1000) {
		return (count / 1000).toFixed(1) + "K";
	}
	return count.toLocaleString();
};

const nextleetScore = {
	1: { name: "Novice", color: "text-blue-500" },
	2: { name: "Beginner", color: "text-green-500" },
	3: { name: "Intermediate", color: "text-yellow-500" },
	4: { name: "Advanced", color: "text-orange-500" },
	5: { name: "Expert", color: "text-red-500" },
};

export default function QuestionInsights({ titleSlug }) {
	const [questionData, setQuestionData] = useState(null);
	const [companyTags, setCompanyTags] = useState([]);

	const displayedCompanies = companyTags.slice(0, 10);
	const hasMoreCompanies = companyTags.length > 10;

	const displayedSimilarQuestions = questionData?.similarQuestionList
		? questionData.similarQuestionList.slice(0, 4)
		: [];
	const hasMoreSimilarQuestions =
		questionData?.similarQuestionList &&
		questionData.similarQuestionList.length > 5;
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if (!titleSlug || titleSlug.trim().length === 0) return;
		setLoading(true);
		// Set document title
		document.title = `${titleSlug
			.split("-")
			.join(" ")
			.toUpperCase()} - Question Insights`;
		window.scrollTo(0, 0);

		setQuestionData(null);
		setCompanyTags([]);
		getCompanyTagBySlug(titleSlug)
			.then((data) => {
				setCompanyTags(data);
			})
			.catch((error) => {})
			.finally(() => {
				setLoading(false);
			});

		getQuestionDetailsBySlug(titleSlug)
			.then((data) => {
				setQuestionData((prevData) => ({ ...prevData, ...data }));
			})
			.catch((error) => {})
			.finally(() => {
				setLoading(false);
			});
	}, [titleSlug]);
	useEffect(() => {
		setQuestionData((prevData) => ({
			...prevData,
			companyCount: companyTags.length,
		}));
	}, [companyTags]);
	const statsConfig = [
		{
			icon: <Heart className="text-green-400 shrink-0" size={24} />,
			label: "Likes",
			valueKey: "likes",
		},
		{
			icon: <ThumbsDown className="text-red-400 shrink-0" size={24} />,
			label: "Dislikes",
			valueKey: "dislikes",
		},
		{
			icon: <Briefcase className="text-purple-400 shrink-0" size={24} />,
			label: "Asked in",
			valueKey: "companyCount",
		},
		{
			icon: <CheckCircle className="text-green-400 shrink-0" size={24} />,
			label: "Accepted",
			valueKey: "acceptedSubmission",
		},
		{
			icon: <Users className="text-blue-400 shrink-0" size={24} />,
			label: "Submissions",
			valueKey: "totalSubmission",
		},
	];

	const acceptanceRate = Math.round(questionData?.acRate);

	if (!titleSlug || titleSlug.trim().length === 0) {
		return null;
	}

	if (loading) {
		return <Loading className={"py-5"} />;
	}

	if (!questionData?.title && !companyTags.length) {
		return (
			<p className="text-gray-500 py-5 md:py-10 text-lg text-center">
				No data found for this question.
			</p>
		);
	}
	return (
		<div className="relative max-w-7xl mx-auto space-y-8">
			<div className="text-center space-y-5">
				<div className="flex items-center justify-center gap-3">
					<h1 className="text-2xl  md:text-4xl font-bold pb-2 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
						{questionData.title}
					</h1>
				</div>
				<div className="flex items-center flex-wrap justify-center gap-3">
					<p
						className={`${
							nextleetScore[
								getTotalScore(
									questionData?.topics,
									questionData?.acRate,
									questionData?.difficulty
								)
							].color
						} px-6 py-1 text-base md:text-xl uppercase border border-gray-700 rounded-full bg-gray-500/30 text-black font-semibold`}
					>
						{
							nextleetScore[
								getTotalScore(
									questionData?.topics,
									questionData?.acRate,
									questionData?.difficulty
								)
							].name
						}
					</p>
					{questionData.isPaidOnly && (
						<CustomButton
							Tag={Link}
							to={`https://code.nextleet.com/problem/${titleSlug}`}
							target="_blank"
							className="!rounded-full !bg-gray-500/30 !text-base md:!text-xl !py-1 uppercase !text-yellow-500 shadow-md hover:!text-black hover:!bg-yellow-500 transition duration-300"
						>
							Code NextLeet
						</CustomButton>
					)}
				</div>
			</div>
			<div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
				{statsConfig.map((stat, index) => (
					<div
						key={index}
						className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-zinc-800 hover:border-zinc-700 transition-all"
					>
						<div className="flex items-center gap-3 mb-2">
							{stat.icon}
							<span className="text-zinc-400 font-medium text-sm sm:text-base">
								{stat.label}
							</span>
						</div>
						<p className="text-2xl sm:text-3xl font-bold text-white">
							{formatCount(questionData[stat.valueKey] || 0)}
						</p>
					</div>
				))}

				<div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-zinc-800 hover:border-zinc-700 transition-all">
					<div className="flex items-center gap-3 mb-2">
						<TrendingUp
							className="text-yellow-400 shrink-0"
							size={24}
						/>
						<span className="text-zinc-400 font-medium text-sm sm:text-base">
							Acceptance
						</span>
					</div>
					<p className="text-2xl sm:text-3xl font-bold text-white">
						{acceptanceRate}%
					</p>
				</div>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Left Column */}
				<div className="lg:col-span-2 space-y-6 md:space-y-8">
					<div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-zinc-800 space-y-6 md:space-y-8">
						<div className="flex items-center text-lg md:text-xl gap-3">
							<Building2
								className="text-blue-400 shrink-0"
								size={24}
							/>
							<p>
								<span className="text-sm md:text-xl text-gray-400">
									Number of Companies That Asked:{" "}
								</span>
								<span className="text-xl md:text-2xl text-white font-bold">
									{companyTags.length}
								</span>
							</p>
						</div>

						<div className="flex flex-wrap justify-center gap-2 ">
							{Object.entries(popularAcronyms).map(
								([acronym]) =>
									checkCompaniesIncluded(
										companyTags,
										acronym
									) && (
										<Badge
											key={acronym}
											className={`${colorMap[acronym]} text-white px-3 py-1 text-xs sm:text-sm font-medium flex items-center gap-1`}
										>
											<Verified
												className="text-white shrink-0"
												size={16}
											/>
											{acronym}
										</Badge>
									)
							)}
						</div>

						<div className="flex flex-wrap gap-3 md:gap-4">
							{displayedCompanies.map((tag, idx) => (
								<CompanyTag key={idx} tag={tag} />
							))}
						</div>

						{hasMoreCompanies && (
							<Dialog>
								<DialogTrigger asChild>
									<CustomButton className="mx-auto mt-5 space-x-2">
										<Eye size={18} />
										<p>
											View All {companyTags.length}{" "}
											Companies
										</p>
									</CustomButton>
								</DialogTrigger>
								<DialogContent className="min-w-3/4 text-white sm:min-w-[60vw] bg-zinc-900 border-zinc-800">
									<DialogHeader>
										<DialogTitle className="text-xl sm:text-2xl font-bold text-white mb-2">
											All Companies ({companyTags.length})
										</DialogTitle>
									</DialogHeader>
									<div className="mt-4 max-h-[60vh] hide-scrollbar p-4 overflow-y-auto">
										<div className="flex flex-wrap gap-3 md:gap-4">
											{companyTags.map((tag, idx) => (
												<CompanyTag
													key={idx}
													tag={tag}
												/>
											))}
										</div>
									</div>
								</DialogContent>
							</Dialog>
						)}
						{companyTags.length === 0 && (
							<div className="text-center text-zinc-400 py-6">
								<p>No company tags found.</p>
							</div>
						)}
					</div>
				</div>

				{/* Right Column */}
				<div className="space-y-6 md:space-y-8">
					<div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-zinc-800 space-y-6 md:space-y-8">
						<h2 className="text-xl md:text-2xl font-bold text-white">
							Similar Questions
						</h2>

						<div className="space-y-3">
							{displayedSimilarQuestions.map((question, idx) => (
								<SimilarQuestionTag
									key={idx}
									question={question}
									idx={idx}
								/>
							))}
						</div>

						{hasMoreSimilarQuestions && (
							<Dialog>
								<DialogTrigger asChild>
									<CustomButton className="mx-auto mt-5 space-x-2">
										<Eye size={18} />
										<p>
											View All{" "}
											{
												questionData.similarQuestionList
													.length
											}{" "}
											Questions
										</p>
									</CustomButton>
								</DialogTrigger>
								<DialogContent className="bg-zinc-900 border-zinc-800">
									<DialogHeader>
										<DialogTitle className="text-xl sm:text-2xl font-bold text-white">
											All Questions (
											{
												questionData.similarQuestionList
													.length
											}
											)
										</DialogTitle>
									</DialogHeader>
									<div className="mt-4 max-h-[60vh] text-white hide-scrollbar p-4 overflow-y-auto">
										<div className="flex flex-col gap-3 md:gap-4">
											{questionData.similarQuestionList.map(
												(question, idx) => (
													<SimilarQuestionTag
														key={idx}
														question={question}
													/>
												)
											)}
										</div>
									</div>
								</DialogContent>
							</Dialog>
						)}

						{displayedSimilarQuestions.length === 0 && (
							<div className="text-center text-zinc-400 py-6">
								<p>No similar questions found.</p>
							</div>
						)}
					</div>
				</div>
			</div>
			{/* Main Content Grid */}
		</div>
	);
}

function CompanyTag({ tag, idx }) {
	return (
		<Link
			to={`/sheet/${tag.companyName.split(" ").join("-").toLowerCase()}`}
			target="_blank"
			key={idx}
			className={`group relative bg-zinc-800/50 hover:bg-zinc-700/50  rounded-xl py-2 px-4 border border-zinc-700 hover:border-zinc-600 transition-all cursor-pointer
																	${famousCompanies.includes(tag.companyName) ? "ring-2 ring-yellow-400/30" : ""}
																`}
		>
			{famousCompanies.includes(tag.companyName) && (
				<Crown className="text-yellow-500 fill-yellow-500 absolute top-0 left-0 -mt-3 -rotate-12 -ml-3 size-5" />
			)}
			<div className="flex items-center gap-3">
				<img
					src={`https://img.logo.dev/${tag.companyName
						.split(" ")
						.join("")}.com?token=pk_Ovv0aVUwQNK80p_PGY_xcg`}
					className="w-5 h-5 rounded-full"
					alt={`${tag.companyName} logo`}
				/>

				<span className="text-white font-medium group-hover:text-zinc-100 transition-colors">
					{tag.companyName}
				</span>
			</div>
		</Link>
	);
}

function SimilarQuestionTag({ question, idx }) {
	return (
		<Link
			to={`/problems/${question
				.replaceAll(/[^a-zA-Z0-9 ]/g, " ")
				.split(" ")
				.filter(Boolean)
				.join("-")
				.toLowerCase()}`}
			key={idx}
			className="group block bg-zinc-800/50 hover:bg-zinc-700/50 rounded-lg py-2 px-4 border border-zinc-700 hover:border-zinc-600 transition-all cursor-pointer"
		>
			<div className="flex items-center gap-3">
				<CheckCircle2
					className="text-green-400 shrink-0 group-hover:text-green-300"
					size={20}
				/>
				<span className="text-white font-medium group-hover:text-zinc-100 transition-colors">
					{question}
				</span>
			</div>
		</Link>
	);
}
