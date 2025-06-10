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
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Loading } from "../Loading";
const getAllFavoriteCompanies = () => {
	return JSON.parse(localStorage.getItem("favoriteCompanies")) || [];
};

export const SearchSheet = () => {
	const [favoriteCompanies, setFavoriteCompanies] = useState(
		getAllFavoriteCompanies()
	);
	const navigate = useNavigate();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<div className="text-gray-400 pt-20 md:pt-32 px-5 md:px-12 min-h-svh flex flex-col gap-10">
			<h1 className="text-xl md:text-2xl font-bold">
				Search Any Company Sheets
			</h1>
			{favoriteCompanies?.length > 0 && (
				<div className="flex gap-2  flex-wrap md:items-center">
					<p>Favourites:</p>
					<ul className="flex gap-2 flex-wrap">
						{favoriteCompanies.map((company) => (
							<li
								key={company}
								className="border rounded-xl cursor-pointer border-gray-700 text-gray-300 bg-gray-900 px-4 py-1 "
								onClick={() =>
									navigate(
										`/sheet/${company
											.split(" ")
											.join("-")
											.toLowerCase()}`
									)
								}
							>
								{company}
							</li>
						))}
					</ul>
				</div>
			)}
			<div className="w-full">
				<CompanySearchBox
					favoriteCompanies={favoriteCompanies}
					setFavoriteCompanies={setFavoriteCompanies}
				/>
			</div>
		</div>
	);
};

function CompanySearchBox({ favoriteCompanies, setFavoriteCompanies }) {
	const [search, setSearch] = useState("");
	const [companies, setCompanies] = useState([]);
	const [loading, setLoading] = useState(false);
	const filteredCompanies = companies.filter((company) =>
		company.toLowerCase().includes(search.toLowerCase())
	);
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
		setLoading(true);
		getAllCompanyNames()
			.then((data) => {
				setCompanies(data);
			})
			.catch((error) => {
				console.error("Error fetching company names:", error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	const navigate = useNavigate();
	return (
		<div className="w-full sm:w-[400px] mx-auto md:w-[450px] bg-gray-900 rounded-lg shadow-lg">
			<Command>
				<CommandInput
					placeholder="Search company..."
					onValueChange={setSearch}
					value={search}
					className={"md:text-lg"}
				/>
				<CommandList className={"hide-scrollbar"}>
					{filteredCompanies.length === 0 ? (
						<CommandEmpty>
							{loading ? (
								<Loading />
							) : (
								<span>No Result Found for "{search}"</span>
							)}
						</CommandEmpty>
					) : (
						filteredCompanies.map((company) => (
							<CommandItem
								key={company}
								value={company}
								className={
									"data-[selected=true]:bg-gray-800 data-[selected=true]:text-white md:text-base "
								}
								onSelect={() => {
									navigate(
										`/sheet/${company
											.split(" ")
											.join("-")
											.toLowerCase()}`
									);
								}}
							>
								<span className="inline-block w-full">
									{company}
								</span>
								<span
									className="hover:bg-gray-600 p-2 rounded-full"
									title="Add to Favorites"
									onClick={(e) => {
										e.stopPropagation();
										addInFavorite(company);
									}}
								>
									<Star
										size={20}
										strokeWidth={0}
										fill={
											favoriteCompanies.includes(company)
												? "yellow"
												: "gray"
										}
									/>
								</span>
							</CommandItem>
						))
					)}
				</CommandList>
			</Command>
		</div>
	);
}
