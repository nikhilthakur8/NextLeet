import React, { useEffect } from "react";
import { Hero } from "./Hero";
import { CodeAnalyzerFeature, CompanyWiseSheetFeature } from "./Features";
import { OurPlatforms } from "./OurPlatforms";
import { NewPromotion } from "./NewPromotion";
export const Home = () => {
	useEffect(() => {
		document.title = "NextLeet | Home";
		window.scrollTo(0, 0);
	}, []);
	return (
		<div className="flex flex-col space-y-10 md:space-y-20">
			<Hero />
			<NewPromotion />
			<CodeAnalyzerFeature />
			<CompanyWiseSheetFeature />
			<OurPlatforms />
		</div>
	);
};
