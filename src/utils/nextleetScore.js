const topicWeights = {
	Array: 1,
	String: 1,
	"Hash Table": 2,
	"Dynamic Programming": 5,
	Math: 3,
	Sorting: 2,
	Greedy: 3,
	"Depth-First Search": 3,
	"Binary Search": 2,
	Database: 2,
	Matrix: 2,
	Tree: 3,
	"Breadth-First Search": 3,
	"Bit Manipulation": 4,
	"Two Pointers": 2,
	"Prefix Sum": 2,
	"Heap (Priority Queue)": 3,
	Simulation: 2,
	"Binary Tree": 3,
	Stack: 2,
	Graph: 4,
	Counting: 2,
	"Sliding Window": 3,
	Design: 4,
	Enumeration: 3,
	Backtracking: 4,
	"Union Find": 4,
	"Linked List": 2,
	"Number Theory": 4,
	"Ordered Set": 4,
	"Monotonic Stack": 3,
	"Segment Tree": 5,
	Trie: 4,
	Combinatorics: 4,
	Bitmask: 4,
	Queue: 1,
	Recursion: 3,
	"Divide and Conquer": 4,
	"Binary Indexed Tree": 5,
	Memoization: 4,
	Geometry: 5,
	"Hash Function": 3,
	"Binary Search Tree": 3,
	"String Matching": 4,
	"Topological Sort": 5,
	"Shortest Path": 5,
	"Rolling Hash": 5,
	"Game Theory": 5,
	Interactive: 2,
	"Data Stream": 4,
	"Monotonic Queue": 4,
	Brainteaser: 3,
	"Doubly-Linked List": 2,
	Randomized: 4,
	"Merge Sort": 3,
	"Counting Sort": 3,
	Iterator: 2,
	Concurrency: 4,
	"Probability and Statistics": 4,
	Quickselect: 4,
	"Suffix Array": 5,
	"Line Sweep": 4,
	"Bucket Sort": 3,
	"Minimum Spanning Tree": 5,
	Shell: 2,
	"Reservoir Sampling": 4,
	"Strongly Connected Component": 5,
	"Eulerian Circuit": 5,
	"Radix Sort": 4,
	"Rejection Sampling": 4,
	"Biconnected Component": 5,
};

function calculateAcceptanceRateScore(acRate) {
	if (acRate >= 75) return 0;
	else if (acRate < 75 && acRate >= 60) {
		const partsValue = 1 / 15;
		return 1 + partsValue * (75 - acRate);
	} else if (acRate < 60 && acRate >= 40) {
		const partsValue = 1 / 20;
		return 2 + partsValue * (60 - acRate);
	} else if (acRate < 40 && acRate >= 20) {
		const partsValue = 1 / 20;
		return 3 + partsValue * (40 - acRate);
	} else if (acRate < 20 && acRate >= 10) {
		const partsValue = 1 / 10;
		return 4 + partsValue * (20 - acRate);
	} else return 5;
}

export const getTotalScore = (topics, acRate, leetcodeDifficultyTag) => {
	let topicsScore = 0;
	let acRateScore = calculateAcceptanceRateScore(acRate);
	let leetcodeTagScore = 0;

	// Calculate topics score
	for (const topic of topics) {
		if (topicWeights[topic]) {
			topicsScore += topicWeights[topic];
		}
	}

	if (topics.length > 0) {
		topicsScore /= topics.length;
	}

	// Cap and floor the topics score
	if (topicsScore > 5) {
		topicsScore = 5;
	} else if (topicsScore < 1) {
		topicsScore = 1;
	}

	// Calculate leetcode tag score
	if (leetcodeDifficultyTag === 1) {
		leetcodeTagScore = 1.5; // easy
	} else if (leetcodeDifficultyTag === 2) {
		leetcodeTagScore = 3; // medium
	} else if (leetcodeDifficultyTag === 3) {
		leetcodeTagScore = 4.5; // hard
	} else {
		leetcodeTagScore = 0; // handle invalid difficulty tags
	}

	// Fixed weights according to your comments: 0.50 acRate, 0.30 topics, 0.20 leetcode tag
	const totalScore =
		topicsScore * 0.2 + acRateScore * 0.3 + leetcodeTagScore * 0.5;
	const decimal = totalScore - Math.floor(totalScore);
	return decimal > 0.3 ? Math.ceil(totalScore) : Math.floor(totalScore);
};
