import { Client, Databases, ID, Query } from "appwrite";
const client = new Client();
client
	.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
	.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
const databases = new Databases(client);

export const getQuestionByCompanyTag = async (
	companyName = [],
	skip = 0,
	limit = 20
) => {
	const query = [Query.limit(limit), Query.offset(skip)];
	if (companyName && companyName.length > 0) {
		query.push(Query.equal("companyName", companyName));
	} else return { documents: [], total: 0 };

	const data = await databases.listDocuments(
		import.meta.env.VITE_APPWRITE_QUESTION_CHALLENGES_DATABASE_ID,
		import.meta.env.VITE_APPWRITE_QUESTION_COMPANY_TAG_COLLECTION_ID,
		query
	);
	return data;
};

export const getAllCompanyNames = async (name = "") => {
	const query = [Query.limit(30), Query.offset(0)];
	if (name) {
		query.push(Query.search("name", name));
	}
	const data = await databases.listDocuments(
		import.meta.env.VITE_APPWRITE_QUESTION_CHALLENGES_DATABASE_ID,
		import.meta.env.VITE_APPWRITE_QUESTION_COMPANY_COLLECTION_ID,
		query
	);
	return data.documents.map((doc) => doc.name);
};
