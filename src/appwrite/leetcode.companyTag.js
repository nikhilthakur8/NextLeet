import { Client, Databases, ID, Query } from "appwrite";
const client = new Client();
client
	.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
	.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
const databases = new Databases(client);
function queryBuilder(query, filter) {
	if (filter.difficulty) {
		query.push(Query.equal("difficulty", Number(filter.difficulty)));
	}
	if (filter.timeFrame) {
		query.push(Query.contains("timeframe", filter.timeFrame));
	}
	if (filter.topics) {
		query.push(Query.contains("topics", filter.topics));
	}
	if (filter.frequency == "asc") {
		query.push(Query.orderAsc("cumulativeFrequency"));
	} else {
		query.push(Query.orderDesc("cumulativeFrequency"));
	}
	if (filter.hotQuestions) {
		query.push(Query.equal("timeframe", ["thirtyDays"]));
	}
}
export const getQuestionByCompanyTag = async (
	companyName = [],
	skip = 0,
	limit = 20,
	filter
) => {
	const query = [Query.limit(limit), Query.offset(skip)];
	if (companyName && companyName.length > 0) {
		query.push(Query.equal("companyName", companyName));
	} else return { documents: [], total: 0 };
	queryBuilder(query, filter);
	const data = await databases.listDocuments(
		import.meta.env.VITE_APPWRITE_QUESTION_CHALLENGES_DATABASE_ID,
		import.meta.env.VITE_APPWRITE_QUESTION_COMPANY_TAG_COLLECTION_ID,
		query
	);
	return data;
};

export const getAllQuestionTopics = async (companyName) => {
	const data = await databases.listDocuments(
		import.meta.env.VITE_APPWRITE_QUESTION_CHALLENGES_DATABASE_ID,
		import.meta.env.VITE_APPWRITE_QUESTION_COMPANY_TAG_COLLECTION_ID,
		[
			Query.limit(500),
			Query.equal("companyName", companyName),
			Query.select("topics"),
		]
	);
	const cleansedData = [];
	data.documents.forEach(({ topics }) => {
		topics.forEach((topic) => {
			if (!cleansedData.includes(topic) && topic.length > 0)
				cleansedData.push(topic);
		});
	});
	return cleansedData;
};

export const getAllCompanyNames = async () => {
	const data = await databases.listDocuments(
		import.meta.env.VITE_APPWRITE_QUESTION_CHALLENGES_DATABASE_ID,
		import.meta.env.VITE_APPWRITE_QUESTION_COMPANY_COLLECTION_ID,
		[
			Query.limit(1000),
			Query.orderDesc("totalProblems"),
			Query.select(["name", "totalProblems"]),
		]
	);
	return data.documents;
};

export const searchQuestion = async (
	companyName,
	searchTerm,
	skip = 0,
	limit = 20,
	filter
) => {
	const query = [
		Query.equal("companyName", companyName),
		Query.search("title", searchTerm),
		Query.offset(skip),
		Query.limit(limit),
	];
	queryBuilder(query, filter);
	const data = await databases.listDocuments(
		import.meta.env.VITE_APPWRITE_QUESTION_CHALLENGES_DATABASE_ID,
		import.meta.env.VITE_APPWRITE_QUESTION_COMPANY_TAG_COLLECTION_ID,
		query
	);
	return data;
};

export const getCompanyTagBySlug = async (slug) => {
	if (!slug) {
		throw new Error("Slug is required");
	}
	const data = await databases.listDocuments(
		import.meta.env.VITE_APPWRITE_QUESTION_CHALLENGES_DATABASE_ID,
		import.meta.env.VITE_APPWRITE_QUESTION_COMPANY_TAG_COLLECTION_ID,
		[
			Query.equal("titleSlug", slug),
			Query.select(["companyName"]),
			Query.limit(10000),
		]
	);

	if (data.documents.length > 0) {
		return data.documents.map((doc) => ({
			companyName: doc.companyName,
		}));
	} else {
		throw new Error("Company tag not found");
	}
};

export const getTotalDoneQuestions = async (companyName, data, filter) => {
	const query = [
		Query.equal("companyName", companyName),
		Query.select(["titleSlug"]),
		Query.limit(10000),
		Query.equal("titleSlug", data),
	];
	queryBuilder(query, filter);
	const totalDoc = await databases.listDocuments(
		import.meta.env.VITE_APPWRITE_QUESTION_CHALLENGES_DATABASE_ID,
		import.meta.env.VITE_APPWRITE_QUESTION_COMPANY_TAG_COLLECTION_ID,
		query
	);
	return totalDoc.documents.map((doc) => doc.titleSlug);
};

export const getQuestionDetailsBySlug = async (slug) => {
	const data = await databases.listDocuments(
		"682e3e8a00262227c2fd",
		"686afae40019e6d4394b",
		[Query.equal("titleSlug", slug), Query.limit(1)]
	);
	return data.documents[0] || null;
};

export const getQuestionById = async (id) => {
	const data = await databases.listDocuments(
		import.meta.env.VITE_APPWRITE_QUESTION_CHALLENGES_DATABASE_ID,
		"686afae40019e6d4394b",
		[Query.equal("id", id), Query.limit(1)]
	);
	return data.documents[0] || null;
};
