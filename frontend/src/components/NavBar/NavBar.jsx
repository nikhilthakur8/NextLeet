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
export function NavBarNew() {
    const itemClick = (e) => {
        e.preventDefault();
        document
            .getElementById(
                "" + e.currentTarget.getAttribute("href")?.replace("#", "")
            )
            ?.scrollIntoView({ behavior: "smooth" });
    };
    const navItems = [
        {
            name: "Upcoming Q's",
            link: "#latest-question",
        },
        {
            name: "Weekly Q's",
            link: "#weekly-question",
        },
        {
            name: "Past Q's",
            link: "#past-question",
        },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="fixed  top-0 w-full z-50 pt-1.5 ">
            <Navbar>
                {/* Desktop Navigation */}
                <NavBody>
                    <div className="font-bold text-3xl">
                        <ColourfulText text="Next Leet" />
                    </div>
                    <NavItems
                        items={navItems}
                        onItemClick={itemClick}
                        className={"text-base"}
                    />
                    {/* <div className="flex items-center gap-4">
                        <NavbarButton variant="gradient">Login</NavbarButton>
                        <NavbarButton variant="primary">
                            Book a call
                        </NavbarButton>
                    </div> */}
                </NavBody>

                {/* Mobile Navigation */}
                <MobileNav>
                    <MobileNavHeader>
                        <div className="font-bold text-2xl">
                            <ColourfulText text="Next Leet" />
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
                                <a
                                    key={`mobile-link-${idx}`}
                                    href={item.link}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="relative py-1.5 w-full text-neutral-600 dark:text-neutral-300"
                                >
                                    <span className="block">{item.name}</span>
                                </a>
                            ))}
                        </MobileNavMenu>
                    )}
                </MobileNav>
            </Navbar>
        </div>
    );
}
