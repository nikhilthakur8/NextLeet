import React from "react";

const colorVariants = {
	default: "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700",
	red: "bg-red-500/20 hover:bg-red-500 text-white border border-red-500",
	green: "bg-green-500/20 hover:bg-green-500 text-white border border-green-500",
	white: "bg-gray-200 hover:bg-gray-100 text-black border border-gray-300",
	black: "bg-black hover:bg-gray-900 text-white border border-gray-800",
	blue: "bg-blue-500/20 hover:bg-blue-500 text-white border border-blue-500",
};

export const CustomButton = ({
	children,
	className = "",
	Tag = "button",
	variant = "default", 
	...props
}) => {
	const variantClass = colorVariants[variant] || colorVariants.default;

	return (
		<Tag
			className={`whitespace-nowrap cursor-pointer text-xs md:text-base font-semibold py-2 px-4 rounded-lg flex items-center justify-center transition-colors duration-200 ease-in-out ${variantClass} ${className}`}
			{...props}
		>
			{children}
		</Tag>
	);
};
