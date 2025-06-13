import { Client, Databases, ID, Query } from "appwrite";
const client = new Client();
client
	.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
	.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
const databases = new Databases(client);

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
	if (filter.difficulty) {
		query.push(Query.equal("difficulty", Number(filter.difficulty)));
	}
	if (filter.timeFrame) {
		query.push(Query.contains("timeframe", filter.timeFrame));
	}
	if (filter.topics) {
		query.push(Query.contains("topics", filter.topics));
	}
	if (filter.frequency) {
		query.push(Query.orderAsc("cumulativeFrequency"));
	} else {
		query.push(Query.orderDesc("cumulativeFrequency"));
	}
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
		[Query.limit(1000), Query.orderDesc("totalProblems")]
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
	if (filter.difficulty) {
		query.push(Query.equal("difficulty", Number(filter.difficulty)));
	}
	if (filter.timeFrame) {
		query.push(Query.contains("timeframe", filter.timeFrame));
	}
	if (filter.topics) {
		query.push(Query.contains("topics", filter.topics));
	}
	if (filter.frequency) {
		query.push(Query.orderAsc("cumulativeFrequency"));
	} else {
		query.push(Query.orderDesc("cumulativeFrequency"));
	}
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
		return data.documents;
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
	if (filter.difficulty) {
		query.push(Query.equal("difficulty", Number(filter.difficulty)));
	}
	if (filter.timeFrame) {
		query.push(Query.contains("timeframe", filter.timeFrame));
	}
	if (filter.topics) {
		query.push(Query.contains("topics", filter.topics));
	}
	if (filter.frequency) {
		query.push(Query.orderAsc("cumulativeFrequency"));
	} else {
		query.push(Query.orderDesc("cumulativeFrequency"));
	}
	const totalDoc = await databases.listDocuments(
		import.meta.env.VITE_APPWRITE_QUESTION_CHALLENGES_DATABASE_ID,
		import.meta.env.VITE_APPWRITE_QUESTION_COMPANY_TAG_COLLECTION_ID,
		query
	);
	return totalDoc.documents.map((doc) => doc.titleSlug);
};
