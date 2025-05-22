import React from "react";
import { ColourfulText } from "../ui/colourful-text.jsx";

export const NavBar = () => {
    return (
        <div className="fixed top-0 pl-8 py-1 md:py-2  z-20 bg-neutral-950/[0.96] border-b border-b-neutral-900 w-full md:text-4xl text-3xl font-bold ">
            <ColourfulText text="Next Leet" />
        </div>
    );
};
