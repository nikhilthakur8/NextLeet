// TimeComplexityChart.jsx
import React from "react";
import {
	Chart as ChartJS,
	LineElement,
	PointElement,
	LinearScale,
	CategoryScale,
	Legend,
	Title,
	Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogOverlay,
	DialogTitle,
} from "../components/ui/dialog";

ChartJS.register(
	LineElement,
	PointElement,
	LinearScale,
	CategoryScale,
	Legend,
	Title,
	Tooltip
);

const TimeComplexityChart = ({
	complexity = "O(n^2)",
	colorOfLine = "oklch(59.1% 0.293 322.896)", // Default color for the line
}) => {
	const n = Array.from({ length: 10000 }, (_, i) => i + 1);
	const selectedComplexity = complexity.split(" ").join("").toLowerCase();
	const correctedComplexity = {
		"o(1)": "O(1)",
		"o(logn)": "O(LOG N)",
		"o(n)": "O(N)",
		"o(nlogn)": "O(N log N)",
		"o(n^2)": "O(N²)",
	};
	const isDisabled =
		correctedComplexity[selectedComplexity] === undefined ? true : false;
	const dataset = (label, dataFunc) => ({
		label,
		data: n.map(dataFunc),
		borderColor:
			selectedComplexity == label
				? colorOfLine
				: "oklch(55.1% 0.027 264.364 / 0.5)",
		borderWidth: selectedComplexity == label ? 5 : 3,
		fill: false,
		tension: 0.3,
	});

	const data = {
		labels: n,
		datasets: [
			dataset("o(1)", (n) => 2),
			dataset("o(logn)", (n) => Math.log2(n - 2) * 1.7),
			dataset("o(n)", (n) => n - 1),
			dataset("o(nlogn)", (n) => n * Math.log2(n - 2)),
			dataset("o(n^2)", (n) => (n - 1) * (n - 1)),
		],
	};

	const options = {
		responsive: true,
		elements: {
			line: {
				borderWidth: 1,
				capBezierPoints: true,
			},
			point: {
				radius: 0,
			},
		},
		clip: {
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
		},

		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				enabled: true,
				intersect: false,
				mode: "nearest",
				titleFont: {
					size: 14,
					family: "monospace",
					weight: "bold",
					capitalize: "uppercase",
				},
				bodyFont: {
					size: 13,
					family: "monospace",
					weight: "normal",
				},
				backgroundColor: "oklch(20.8% 0.042 265.755)", // Tooltip background
				titleColor: "oklch(100% 0 0)", // Title text color
				bodyColor: "oklch(100% 0 0)", // Main text color
				borderColor: "oklch(27.8% 0.033 256.848)", // Border color
				borderWidth: 1,
				cornerRadius: 6,
				padding: 10,
				displayColors: false,
				callbacks: {
					label: function (context) {
						return correctedComplexity[context.dataset.label]; // ✨ your custom message here
					},
					title: function () {
						return ""; // disables the title (optional)
					},
				},
			},
		},
		scales: {
			x: {
				display: true,
				grid: {
					display: false,
				},
				border: {
					display: true,
					color: "#888",
					width: 0.3,
				},
				ticks: {
					display: false,
				},
				max: 50,
			},
			y: {
				display: true,
				grid: {
					display: false,
				},
				border: {
					display: true,
					color: "#888",
					width: 0.3,
				},
				ticks: {
					display: false,
				},
				max: 50,
			},
		},
		maintainAspectRatio: false,
		aspectRatio: 1,
	};
	return (
		<div className="">
			<Dialog>
				<DialogTrigger asChild>
					<button
						className={` text-clip flex items-center bg-clip-text bg-gray-500  ${
							isDisabled
								? " cursor-not-allowed"
								: "cursor-pointer"
						}`}
						style={{
							backgroundImage: `${
								isDisabled
									? "none"
									: "linear-gradient(to right, rgb(175, 82, 222), rgb(0, 122, 255))"
							}`,
							WebkitTextFillColor: "transparent",
						}}
						disabled={isDisabled}
					>
						View Graph✨
					</button>
				</DialogTrigger>
				<DialogOverlay className="bg-black/80" />
				<DialogContent
					className={
						"bg-gray-800 mx-auto rounded-xl p-4  md:p-8  shadow-lg text-zinc-300 border-2 border-gray-700 w-full md:min-w-[600px] md:min-h-[500px]"
					}
					tabIndex={-1}
				>
					<DialogTitle className="text-lg md:text-2xl font-semibold">
						Time Complexity
					</DialogTitle>
					<div className="text-gray-300 flex items-center flex-col justify-center">
						<h2 className="text-center uppercase mb-5  text-xl md:text-2xl italic font-semibold">
							{correctedComplexity[
								complexity.split(" ").join("").toLowerCase()
							] || complexity}
						</h2>
						<div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px]">
							<Line
								data={data}
								options={options}
								className="overflow-hidden"
							/>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default TimeComplexityChart;
