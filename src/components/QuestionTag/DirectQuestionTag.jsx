import { useParams } from "react-router-dom";
import { CompanyTag } from "./CompanyTag";
export const DirectQuestionTag = ({}) => {
	const { titleSlug } = useParams();
	return (
		<div className="min-h-screen pt-28 md:pt-32 px-5">
			<CompanyTag titleSlug={titleSlug} />
		</div>
	);
};
