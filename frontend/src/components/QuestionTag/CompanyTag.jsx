import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getCompanyTagBySlug } from "../../appwrite/leetcode.companyTag";
import { toast } from "sonner";
import { Loading } from "../Loading";
import { Badge } from "../ui/badge";
import { Verified } from "lucide-react";
const popularAcronyms = {
	MAANG: ["Meta", "Apple", "Amazon", "Netflix", "Google"],
	GAFAM: ["Google", "Apple", "Facebook", "Amazon", "Microsoft"],
	MANGA: ["Microsoft", "Apple", "Nvidia", "Google", "Amazon"],
	WITCH: ["Wipro", "Infosys", "tcs", "Cognizant", "HCL"],
	BAT: ["Baidu", "Alibaba", "Tencent"],
};
const colorMap = {
	MAANG: "bg-blue-700",
	GAFAM: "bg-emerald-700",
	MANGA: "bg-amber-700",
	WITCH: "bg-rose-700",
	BAT: "bg-purple-700",
};
const checkCompaniesIncluded = (companyList, acronym) => {
	return companyList.some(({ companyName }) =>
		popularAcronyms[acronym].includes(companyName)
	);
};
export const CompanyTag = ({ titleSlug }) => {
	const [companyTag, setCompanyTag] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	useEffect(() => {
		if (!titleSlug || titleSlug.trim().length === 0) return;
		window.scrollTo(0, 0);
		const inputValue = titleSlug.split("/")[4]?.trim() || titleSlug.trim();
		document.title = ` ${inputValue} Company Tags`;
		setLoading(true);
		setCompanyTag([]);
		getCompanyTagBySlug(inputValue)
			.then((data) => {
				setCompanyTag(data);
				document.getElementById("company-tag")?.scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			})
			.catch((error) => {
				toast.error(error.message || "Something went wrong");
			})
			.finally(() => {
				setLoading(false);
			});
	}, [titleSlug]);
	if (!titleSlug || titleSlug.trim().length === 0) {
		return null;
	}
	return (
		<div className="text-sm md:text-lg text-gray-300" id="company-tag">
			<div className="flex space-y-3 flex-col items-center text-center">
				{companyTag.length > 0 && (
					<>
						<h1 className="text-xl md:text-3xl font-semibold uppercase">
							{titleSlug.split("-").join(" ")}
						</h1>
						<p className="text-center">
							<span className="text-gray-400">
								Number of Companies That Asked :{" "}
							</span>
							<span className="text-xl  font-bold">
								{companyTag.length}
							</span>
						</p>
					</>
				)}
				<div className="flex flex-wrap justify-center gap-2">
					{Object.entries(popularAcronyms).map(
						([acronym, _]) =>
							checkCompaniesIncluded(companyTag, acronym) && (
								<div
									key={acronym}
									className="flex items-center  text-gray-200 space-x-2 mb-2"
								>
									<Badge
										variant={"secondary"}
										className={`text-xs md:text-sm ${colorMap[acronym]}`}
									>
										<Verified className="text-white" />
										<span className="font-bold">
											{acronym}
										</span>
									</Badge>
								</div>
							)
					)}
				</div>
			</div>
			<div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-5 md:mt-10 w-full md:max-w-5xl mx-auto">
				{loading ? (
					<Loading />
				) : companyTag.length > 0 ? (
					companyTag.map((tag) => (
						<div
							key={tag.companyName}
							className="bg-gray-800 text-gray-300 border border-gray-700 px-2 py-1 rounded-lg flex items-center"
						>
							<img
								src={`https://img.logo.dev/${tag.companyName
									.split(" ")
									.join(
										""
									)}.com?token=pk_Ovv0aVUwQNK80p_PGY_xcg`}
								className="w-5 h-5 mr-2 rounded-full"
								alt={`${tag.companyName} logo`}
							/>
							<span>{tag.companyName}</span>
						</div>
					))
				) : (
					<div className="text-gray-400 text-center text-sm md:text-lg">
						<p>No companies found.</p>
						<p>This may happen if the question is newly added.</p>
					</div>
				)}
			</div>
		</div>
	);
};
