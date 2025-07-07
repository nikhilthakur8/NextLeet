import { useUserContext } from "../context/context";
import { Link, Outlet } from "react-router-dom";
import { CustomButton } from "../components/CustomButton";
import { ArrowUpRight } from "lucide-react";
import { useEffect } from "react";

export const ProtectedLayout = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const { userData } = useUserContext();
	if (!userData) {
		return (
			<div className="flex flex-col items-center justify-center min-h-svh text-white px-4">
				<h2 className="text-3xl font-bold mb-4">Login to continue</h2>

				<CustomButton to="/login" Tag={Link} className="px-10">
					Login
				</CustomButton>
			</div>
		);
	}
	if (
		!["pro", "trial", "admin", "int"].some((label) =>
			userData.labels.includes(label)
		)
	) {
		return (
			<div className="flex flex-col items-center justify-center min-h-svh text-gray-300 px-4">
				<h2 className="text-3xl font-bold mb-4">Upgrade to Pro</h2>
				<CustomButton
					to="/upgrade"
					Tag={Link}
					className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 !text-black font-semibold px-6  rounded-xl shadow hover:opacity-90 transition-all flex items-center"
				>
					<ArrowUpRight size={16} className="mr-2" />
					Upgrade to Pro
				</CustomButton>
			</div>
		);
	}

	return (
		<div>
			<Outlet />
		</div>
	);
};
