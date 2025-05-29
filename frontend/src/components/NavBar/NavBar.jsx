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
    const navItems = [];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="fixed w-full z-50 ">
            <Navbar>
                {/* Desktop Navigation */}
                <NavBody>
                    <div className="font-bold text-4xl">
                        <ColourfulText text="Next Leet" />
                    </div>
                    <NavItems items={navItems} />
                    <div className="flex items-center gap-4">
                        {/* <NavbarButton variant="secondary">Login</NavbarButton>
                        <NavbarButton variant="primary">
                            Book a call
                        </NavbarButton> */}
                    </div>
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
                                    className="relative text-neutral-600 dark:text-neutral-300"
                                >
                                    <span className="block">{item.name}</span>
                                </a>
                            ))}
                            <div className="flex w-full flex-col gap-4">
                                {/* <NavbarButton
                                onClick={() => setIsMobileMenuOpen(false)}
                                variant="primary"
                                className="w-full"
                            >
                                Login
                            </NavbarButton>
                            <NavbarButton
                                onClick={() => setIsMobileMenuOpen(false)}
                                variant="primary"
                                className="w-full"
                            >
                                Book a call
                            </NavbarButton> */}
                            </div>
                        </MobileNavMenu>
                    )}
                </MobileNav>
            </Navbar>
        </div>
    );
}
