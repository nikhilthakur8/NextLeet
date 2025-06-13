import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getCompanyTagBySlug } from "../../appwrite/leetcode.companyTag";
import { toast } from "sonner";
import { Loading } from "../Loading";
export const DirectQuestionTag = () => {
	const { titleSlug } = useParams();
	const [companyTag, setCompanyTag] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	useEffect(() => {
		const inputValue = titleSlug.split("/")[4]?.trim() || titleSlug.trim();
		setLoading(true);
		setCompanyTag([]);
		getCompanyTagBySlug(inputValue)
			.then((data) => {
				setCompanyTag(data);
			})
			.catch((error) => {
				toast.error(error.message || "Something went wrong");
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	return (
		<div className="min-h-screen pt-28 md:pt-32   text-gray-300">
			<div className="flex space-y-5 flex-col items-center">
				<h1 className="text-2xl md:text-3xl font-semibold">
					{titleSlug
						.replace(/-/g, " ")
						.replace(/\b\w/g, (c) => c.toUpperCase())}
				</h1>
				<p className="text-center">
					<span className="text-gray-400">
						Number of Companies That Asked :{" "}
					</span>
					<span className="text-xl  font-bold">
						{companyTag.length}
					</span>
				</p>
			</div>
			<div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-10 w-full md:max-w-5xl mx-auto">
				{loading ? (
					<Loading />
				) : companyTag.length > 0 ? (
					companyTag.map((tag) => (
						<div
							key={tag.companyName}
							className="bg-gray-800 text-gray-300 px-2 py-1 rounded-lg flex items-center"
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
					<div className="text-gray-400">No companies found</div>
				)}
			</div>
		</div>
	);
};
