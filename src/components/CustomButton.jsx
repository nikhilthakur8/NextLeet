import React from "react";
import { Link } from "react-router-dom";

export const CustomButton = ({
	children,
	className = "",
	Tag = "button",
	...props
}) => {
	return (
		<Tag
			className={`${className} bg-gray-800 cursor-pointer text-xs md:text-base hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md border border-gray-700  flex items-center justify-center transition-colors duration-200 ease-in-out`}
			{...props}
		>
			{children}
		</Tag>
	);
};
