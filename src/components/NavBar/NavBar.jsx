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
import { use, useEffect, useState } from "react";
import { ColourfulText } from "../ui/colourful-text";
import { Link } from "react-router-dom";
import { Dot, Lightbulb, Rocket, RocketIcon } from "lucide-react";
import { useUserContext } from "../../context/context";
import { CustomButton } from "../CustomButton";
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
	const { userData } = useUserContext();
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
		},
		{
			name: "Company Wise Sheet",
			link: "/search/sheet",
		},
		{
			name: "Q's Insights",
			link: "/insights",
			isNew: true,
		},
	];
	const mobileLoginItems = [
		{
			name: "Get Started",
			link: "/login",
		},
	];
	const mobileItems = [
		{
			name: "Home",
			link: "/",
		},
		{
			name: "Profile",
			link: "/profile",
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
	console.log(userData);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const colorComb = {
		trial: "ring-blue-500",
		pro: "ring-yellow-500",
		expired: "ring-red-500",
	};
	return (
		<div className="fixed top-0 w-full z-50 whitespace-nowrap">
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
						{userData ? (
							<Link
								to="/profile"
								className={`cursor-pointer ring-2 ring-offset-1 ring-offset-gray-900 ${
									colorComb[userData?.subscription?.name]
								} rounded-full overflow-hidden relative`}
							>
								<img
									className="w-8 h-8 rounded-full"
									src={
										userData?.user?.picture ||
										`https://api.dicebear.com/9.x/pixel-art/svg?seed=${userData?.name}`
									}
									onError={(e) => {
										console.log(e);
									}}
								/>
							</Link>
						) : (
							<>
								<CustomButton
									className="!py-1"
									to="/login"
									Tag={Link}
								>
									Get Started
								</CustomButton>
							</>
						)}
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
							{(userData ? mobileItems : mobileLoginItems).map(
								(item, idx) => (
									<Link
										key={`mobile-link-${idx}`}
										to={item.link}
										onClick={(e) => {
											setIsMobileMenuOpen(false);
											itemClick(e);
										}}
										className="relative py-1.5 w-full text-neutral-600 dark:text-neutral-300"
									>
										<span className="block">
											{item.name}
										</span>
									</Link>
								)
							)}
						</MobileNavMenu>
					)}
				</MobileNav>
			</Navbar>
		</div>
	);
}
