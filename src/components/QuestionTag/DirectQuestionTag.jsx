import { useParams } from "react-router-dom";
import { CompanyTag } from "./CompanyTag";
import { useEffect } from "react";
import QuestionInsights from "../../Pages/QuestionInsights/Insights";
export const DirectQuestionTag = ({}) => {
	
	const { titleSlug } = useParams();
	return (
		<div className="min-h-screen pt-28 md:pt-32 px-5">
			<QuestionInsights titleSlug={titleSlug} />
		</div>
	);
};
