import React, { useEffect, useState } from "react";
import {
	Command,
	CommandInput,
	CommandList,
	CommandItem,
	CommandEmpty,
} from "../ui/command"; // from shadcn
import { getAllCompanyNames } from "../../appwrite/leetcode.companyTag";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Edit, Star, X } from "lucide-react";
import { toast } from "sonner";
import { Loading } from "../Loading";
import { NewBadge } from "../NewBadge";
const getAllFavoriteCompanies = () => {
	return JSON.parse(localStorage.getItem("favoriteCompanies")) || [];
};

export const SearchSheet = () => {
	useEffect(() => {
		document.title = "Search Sheet - LeetCode";
	}, []);
	const [favoriteCompanies, setFavoriteCompanies] = useState(
		getAllFavoriteCompanies()
	);
	const [isEditing, setIsEditing] = useState(false);
	const navigate = useNavigate();

	const addInFavorite = (company) => {
		const favoriteCompanies =
			JSON.parse(localStorage.getItem("favoriteCompanies")) || [];
		if (!favoriteCompanies.includes(company)) {
			favoriteCompanies.push(company);
			localStorage.setItem(
				"favoriteCompanies",
				JSON.stringify(favoriteCompanies)
			);
			setFavoriteCompanies(favoriteCompanies);
			toast.success(`Added ${company} to favorites`);
		} else {
			const updatedCompanies = favoriteCompanies.filter(
				(item) => item !== company
			);
			localStorage.setItem(
				"favoriteCompanies",
				JSON.stringify(updatedCompanies)
			);
			setFavoriteCompanies(updatedCompanies);
			toast.error(`Removed ${company} from favorites`);
		}
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<div className="text-gray-400 pt-24 md:pt-36 px-5 md:px-12 min-h-svh flex flex-col gap-5">
			<div>
				<h1 className="text-2xl text-gray-400 relative md:text-5xl font-bold text-center">
					Search Any Company Sheets
				</h1>
			</div>
			<p className="text-sm md:text-base font-normal text-gray-300 text-center">
				(Last Updated on 1st June 2025)
			</p>
			{favoriteCompanies?.length > 0 && (
				<div className=" bg-gray-900 p-5 rounded-md relative">
					<div className="flex justify-between mb-3">
						<p className="font-semibold">Favourites :</p>
						<p
							className="cursor-pointer h-fit text-sm font-semibold"
							onClick={() => setIsEditing((prev) => !prev)}
							title={
								isEditing ? "Done Editing" : "Edit Favorites"
							}
						>
							{isEditing ? (
								<span className="text-emerald-500 ">Done</span>
							) : (
								<span className="text-red-600">Edit</span>
							)}
						</p>
					</div>
					<div className="flex items-center gap-2 w-full">
						<ul className="flex gap-2 flex-wrap w-full">
							{favoriteCompanies.map((company) => (
								<li key={company}>
									<Link
										to={`/sheet/${company
											.split(" ")
											.join("-")
											.toLowerCase()}`}
										className={`border inline-block w-full rounded-xl cursor-pointer border-gray-700 text-gray-300 bg-gray-900 px-4 py-1.5 relative ${
											isEditing ? "animate-shake" : ""
										}`}
									>
										<div className="text-sm md:text-lg">
											<img
												src={`https://img.logo.dev/${company
													.split(" ")
													.join("")
													.split(".")
													.join(
														""
													)}.com?token=pk_Ovv0aVUwQNK80p_PGY_xcg`}
												className="w-6 h-6 inline-block mr-2 rounded-full"
												alt=""
											/>
											{company}
										</div>
										{isEditing && (
											<X
												className="text-red-700 absolute -top-2 -right-2 "
												onClick={(e) => {
													e.preventDefault();
													addInFavorite(company);
												}}
											/>
										)}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<NewBadge>New</NewBadge>
				</div>
			)}

			<div className="w-full">
				<CompanySearchBox
					favoriteCompanies={favoriteCompanies}
					addInFavorite={addInFavorite}
				/>
			</div>
		</div>
	);
};

function CompanySearchBox({ favoriteCompanies, addInFavorite }) {
	const [search, setSearch] = useState("");
	const [companies, setCompanies] = useState([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const filteredCompanies = companies.filter(({ name }) =>
		name.toLowerCase().includes(search.toLowerCase())
	);
	useEffect(() => {
		setLoading(true);
		getAllCompanyNames()
			.then((data) => {
				setCompanies(data);
			})
			.catch((error) => {
				toast.error(error.message || "Failed to fetch company names");
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return (
		<div className="">
			<input
				type="text"
				className="w-full focus:outline-none focus:ring-3 focus:ring-emerald-600 bg-gray-900 border border-gray-800 px-4 py-2 rounded-md placeholder:text-gray-500 text-gray-300 text-base md:text-lg"
				autoFocus
				placeholder="Search company..."
				onChange={(e) => setSearch(e.target.value)}
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 my-5">
				{loading ? (
					<Loading className={"col-span-full"} size={"size-8"} />
				) : filteredCompanies.length > 0 ? (
					filteredCompanies.map((company) => (
						<Link
							key={company.$id}
							className="bg-gradient-to-l  from-gray-950 from-5% via-75%  via-gray-900 to-gray-950 px-10 py-5 rounded-md flex flex-row item-center justify-start hover:shadow-md shadow-gray-900 border border-gray-800 hover:border-gray-500 cursor-pointer  transform duration-300  gap-5 relative"
							to={`/sheet/${company.name
								.split(" ")
								.join("-")
								.toLowerCase()}`}
						>
							<img
								src={`https://img.logo.dev/${company.name
									.split(" ")
									.join("")
									.split(".")
									.join(
										""
									)}.com?token=pk_Ovv0aVUwQNK80p_PGY_xcg`}
								className="w-14 h-14 inline-block mr-2 rounded-md"
								alt=""
							/>
							<div className="flex flex-col justify-center">
								<span className="text-gray-300 text-lg md:text-xl font-semibold">
									{company.name}
								</span>
								<span className="text-gray-400">
									{company.totalProblems} Problems
								</span>
							</div>
							<span
								className="absolute top-4 right-4"
								onClick={(e) => {
									e.preventDefault();
									addInFavorite(company.name);
								}}
							>
								<Star
									className={`border-none ${
										favoriteCompanies.includes(company.name)
											? "fill-yellow-500"
											: "fill-gray-500"
									} `}
									stroke="none"
								/>
							</span>
						</Link>
					))
				) : (
					<div className="py-2 text-center col-span-full">
						No results found
					</div>
				)}
			</div>
		</div>
	);
}
