import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CustomButton } from "../components/CustomButton";
import axios from "axios";

export const PaymentStatus = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
		document.title = "Payment Status | NextLeet";
	}, []);
	const [status, setStatus] = useState("loading"); // 'loading', 'success', 'failed'
	const [orderId, setOrderId] = useState("");
	const [message, setMessage] = useState("");
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const verifyPayment = async (orderIdToCheck) => {
		setStatus("loading");
		setMessage("Verifying your payment...");
		try {
			const res = await axios.get(
				`${
					import.meta.env.VITE_BACKEND_URL
				}/api/payments/cashfree/order-status?orderId=${orderIdToCheck}`
			);
			const data = res.data;
			if (data.success && data.data.order_status === "PAID") {
				setStatus("success");
				setMessage("Your payment was successful! 🎉");
			} else if (data.success && data.data.order_status === "ACTIVE") {
				setStatus("waiting");
				setMessage("Payment is still being processed.");
			} else {
				setStatus("failed");
				setMessage("Payment failed or incomplete.");
			}
		} catch (err) {
			setStatus("failed");
			setMessage("Unable to verify payment. Please try again.");
		}
	};

	useEffect(() => {
		const orderIdFromParams = searchParams.get("orderId");
		setOrderId(orderIdFromParams);

		if (!orderIdFromParams) {
			setStatus("failed");
			setMessage("Invalid or missing order ID.");
			return;
		}

		verifyPayment(orderIdFromParams);
	}, [searchParams]);

	const icon =
		status === "loading" ? (
			<Loader2 className="animate-spin text-yellow-500" size={48} />
		) : status === "success" ? (
			<CheckCircle className="text-green-500" size={48} />
		) : (
			<XCircle className="text-red-500" size={48} />
		);

	return (
		<div className="flex flex-col justify-center items-center min-h-screen text-white p-4">
			<div className="bg-zinc-800 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border border-zinc-700">
				{icon}
				<h2 className="mt-4 text-2xl font-bold">
					{status === "loading"
						? "Verifying Payment..."
						: status === "success"
						? "Payment Successful"
						: "Payment Failed"}
				</h2>
				<p className="mt-2 text-zinc-400">{message}</p>

				{status === "success" && (
					<p className="mt-1 text-green-400 text-sm">
						Your Pro plan will be activated within 2 minutes.
					</p>
				)}

				{orderId && (
					<p className="mt-1 text-xs text-zinc-500">
						Order ID: {orderId}
					</p>
				)}

				{status === "failed" && (
					<CustomButton
						onClick={() => verifyPayment(orderId)}
						className="mt-4 w-full text-lg"
					>
						Retry
					</CustomButton>
				)}

				<CustomButton
					onClick={() => navigate(-1)}
					className="mt-4 w-full text-lg"
				>
					Go Back
				</CustomButton>
			</div>
		</div>
	);
};
