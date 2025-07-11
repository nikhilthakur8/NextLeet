import { useNavigate, useParams } from "react-router-dom";
import { getQuestionById } from "../appwrite/leetcode.companyTag";
import { useEffect } from "react";
import { LoadingIcon } from "../components/LoadingIcon";
import { toast } from "sonner";
export const QuestionRedirect = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		const fetchData = async () => {
			try {
				const question = await getQuestionById(Number(id));
				if (question) {
					window.location.href = `https://leetcode.com/problems/${question.titleSlug}`;
				} else {
					navigate("/");
					toast.error("Question not found");
					return;
				}
			} catch (error) {
				navigate("/");
				toast.error("An error occurred");
			}
		};
		fetchData();
	}, [id]);
	return (
		<div className="flex flex-col text-xl items-center space-y-5 justify-center h-svh text-gray-200">
			<LoadingIcon />
			<div>Redirecting to Question No. {id} ......</div>
		</div>
	);
};
