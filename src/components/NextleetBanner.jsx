import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/context";

export default function NextleetBanner() {
	const [showBanner, setShowBanner] = useState(false);

	// show after 3.5 seconds
	useEffect(() => {
		const timer = setTimeout(() => {
			setShowBanner(true);
		}, 3500);
		return () => clearTimeout(timer);
	}, []);
	return (
		<AnimatePresence>
			{showBanner && (
				<motion.div
					className="flex fixed bottom-5 md:bottom-10 left-5 z-50"
					initial={{ x: "-120%", opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					exit={{ x: "-120%", opacity: 0 }}
					transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
				>
					<div className="relative bg-gray-900 text-white shadow-lg overflow-hidden border border-gray-700 w-fit px-5 py-2 rounded-full">
						{/* Content */}
						<span className="text-sm md:text-base flex items-center gap-2">
							✨ Try Out{" "}
							<Link
								to="/register-buddy"
								onClick={() => setShowBanner(false)}
								rel="noopener noreferrer"
								className="text-purple-400 underline hover:text-purple-300"
							>
								DSA Buddy
							</Link>
							<button
								onClick={() => setShowBanner(false)}
								className="text-gray-400 hover:text-white cursor-pointer"
							>
								<X size={18} />
							</button>
						</span>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
