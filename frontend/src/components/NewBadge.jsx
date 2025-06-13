import React from "react";
import { Badge } from "./ui/badge";
export const NewBadge = (className) => {
	return (
		<Badge
			variant="outline"
			className={`bg-gradient-to-l from-yellow-300 via-yellow-500 to-yellow-300 animate-shake text-black absolute top-0 left-0 -mt-3 -rotate-12 -ml-3 text-xs md:text-sm ${className}`}
		>
			New
		</Badge>
	);
};
