export function sortQuestionsByDifficulty(questions, order = "asc") {
	const DIFFICULTY_PRIORITY = {
		Easy: 1,
		Med: 2,
		Medium: 2, // just in case some are named "Medium"
		Hard: 3,
	};
	return [...questions].sort((a, b) => {
		const valA = DIFFICULTY_PRIORITY[a.difficulty];
		const valB = DIFFICULTY_PRIORITY[b.difficulty];

		return order === "asc" ? valA - valB : valB - valA;
	});
}
