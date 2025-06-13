import React from "react";
import { Button } from "../ui/moving-border";
import { getCompanyTagBySlug } from "../../appwrite/leetcode.companyTag";
import { toast } from "sonner";
import { Loading } from "../Loading";
import { Trick } from "./Trick";
export const QuestionTag = () => {
	const [companyTag, setCompanyTag] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const handleSubmit = (e) => {
		e.preventDefault();
		const inputValue =
			e.target.questionSlug.value.split("/")[4]?.trim() ||
			e.target.questionSlug.value.trim();
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
	};
	return (
		<div className="min-h-screen px-5 md:px-12 text-sm md:text-base justify-center text-gray-300 ">
			<div className="min-h-[40vh] flex w-full justify-end flex-col gap-4">
				<div className="mx-auto text-lg md:text-xl">
					🔗 Enter the LeetCode question link or just the title slug
					(e.g., two-sum)
				</div>
				<form
					onSubmit={handleSubmit}
					className="flex items-center justify-center w-full flex-col md:flex-row gap-4"
				>
					<input
						type="text"
						name="questionSlug"
						className="focus:outline-none focus:ring-2 focus:ring-green-700 px-4 py-2 rounded-lg bg-gray-900 w-full  md:max-w-[500px] border border-gray-700"
						placeholder="https://leetcode.com/problems/two-sum/ or two-sum"
						autoComplete="off"
						autoFocus
					/>
					<button className="bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors duration-300 border border-gray-700 whitespace-nowrap cursor-pointer">
						Find Now
					</button>
				</form>
			</div>
			<div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-10 w-full md:max-w-5xl mx-auto">
				{loading ? (
					<Loading />
				) : (
					companyTag?.map((tag) => (
						<div
							key={tag.companyName}
							className="bg-gray-800 text-gray-300 px-2 py-1 rounded-lg"
						>
							<img
								src={`https://img.logo.dev/${tag.companyName
									.split(" ")
									.join(
										""
									)}.com?token=pk_Ovv0aVUwQNK80p_PGY_xcg`}
								className="w-5 h-5 inline-block mr-2 rounded-full"
								alt=""
							/>
							<span>{tag.companyName}</span>
						</div>
					))
				)}
			</div>
			<div className="bg-gradient-to-r from-gray-950 shadow-lg via-gray-900 to-gray-950 my-10 rounded-md">
				<Trick />
			</div>
		</div>
	);
};
