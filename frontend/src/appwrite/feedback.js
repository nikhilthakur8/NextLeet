import { Client, Databases, ID, Query } from "appwrite";
const client = new Client();
client
	.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Your API Endpoint
	.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
const databases = new Databases(client);

export const submitFeedback = async (feedback, deviceId) => {
	const response = await databases.createDocument(
		import.meta.env.VITE_APPWRITE_FEEDBACK_DATABASE_ID,
		import.meta.env.VITE_APPWRITE_FEEDBACK_COLLECTION_ID,
		ID.unique(),
		{
			feedback: feedback,
			deviceId: deviceId,
		}
	);
	return response;
};
