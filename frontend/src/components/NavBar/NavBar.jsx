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
import { useState } from "react";
import { ColourfulText } from "../ui/colourful-text";
import { Link } from "react-router-dom";
import { Lightbulb } from "lucide-react";
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
			name: "Weekly Q's",
			link: "/#weekly-question",
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
						{/* <div className="relative cursor-pointer  group px-2 py-1 hover:-translate-y-0.5 rounded-full" title="Any Feedback?">
							<Lightbulb className="text-gray-400 group-hover:text-gray-600 size-7" />
						</div> */}
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
