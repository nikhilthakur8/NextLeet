"use client";
import {
	Navbar,
	NavBody,
	NavItems,
	MobileNav,
	NavbarLogo,
	NavbarButton,
	MobileNavHeader,
	MobileNavToggle,
	MobileNavMenu,
} from "../ui/resizable-navbar";
import { useEffect, useState } from "react";
import { ColourfulText } from "../ui/colourful-text";
import { Link } from "react-router-dom";
import { Dot, Lightbulb, Rocket, RocketIcon } from "lucide-react";
export function NavBarNew() {
	const itemClick = (e) => {
		if (!e.currentTarget.getAttribute("href").includes("#")) return;
		e.preventDefault();
		document
			.getElementById(
				"" + e.currentTarget.getAttribute("href")?.replace("/#", "")
			)
			?.scrollIntoView({ behavior: "smooth" });
	};
	const [onlineCount, setOnlineCount] = useState(0);
	useEffect(() => {
		setOnlineCount(Math.floor(Math.random() * (500 - 400 + 1)) + 400);
		const intervalId = setInterval(() => {
			const operation = Math.random() < 0.5 ? "decrease" : "increase";
			setOnlineCount((prev) =>
				operation === "increase"
					? prev + Math.floor(Math.random() * (20 - 2 + 1)) + 2
					: prev - Math.floor(Math.random() * (20 - 2 + 1)) + 2
			);
		}, 20000);
		return () => clearInterval(intervalId);
	}, []);

	const navItems = [
		{
			name: "Home",
			link: "/",
		},
		{
			name: "Upcoming Q's",
			link: "/#latest-question",
		},
		{
			name: "Code Analyzer",
			link: "/analyze",
			isNew: true,
		},
		{
			name: "Company Wise Sheet",
			link: "/search/sheet",
		},
		{
			name: "Q's Company Tags",
			link: "/search/company-tags",
		},
	];

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<div className="fixed  top-0 w-full z-50 pt-1.5 ">
			<Navbar>
				{/* Desktop Navigation */}
				<NavBody>
					<div className="font-bold text-3xl">
						<ColourfulText text="NextLeet" />
					</div>
					<NavItems
						items={navItems}
						onItemClick={itemClick}
						className={"text-base"}
					/>
					<div className="flex items-center gap-4">
						<div className="hidden items-center gap-2 bg-neutral-900 px-3 py-1 border border-neutral-800 rounded-md xl:flex">
							<div className="relative size-2.5">
								<div className="bg-green-500 w-full h-full opacity-75  rounded-full absolute top-0 left-0 animate-ping"></div>
								<div className="bg-green-500 size-2.5  rounded-full"></div>
							</div>
							<span className="text-neutral-600 dark:text-neutral-300">
								{onlineCount} online
							</span>
						</div>
						<Link
							to="/coming-soon"
							className="cursor-pointer relative "
						>
							<RocketIcon className="text-yellow-500 mr-4" />
						</Link>
					</div>
				</NavBody>

				{/* Mobile Navigation */}
				<MobileNav>
					<MobileNavHeader>
						<div className="font-bold text-2xl">
							<ColourfulText text="NextLeet" />
						</div>
						{navItems.length > 0 && (
							<MobileNavToggle
								isOpen={isMobileMenuOpen}
								onClick={() =>
									setIsMobileMenuOpen(!isMobileMenuOpen)
								}
							/>
						)}
					</MobileNavHeader>

					{navItems.length > 0 && (
						<MobileNavMenu
							isOpen={isMobileMenuOpen}
							onClose={() => setIsMobileMenuOpen(false)}
						>
							{navItems.map((item, idx) => (
								<Link
									key={`mobile-link-${idx}`}
									to={item.link}
									onClick={(e) => {
										setIsMobileMenuOpen(false);
										itemClick(e);
									}}
									className="relative py-1.5 w-full text-neutral-600 dark:text-neutral-300"
								>
									<span className="block">{item.name}</span>
								</Link>
							))}
						</MobileNavMenu>
					)}
				</MobileNav>
			</Navbar>
		</div>
	);
}
