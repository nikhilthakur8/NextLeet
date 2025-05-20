import { Client, Databases, ID } from "appwrite";
import { Query } from "node-appwrite";
const client = new Client();
client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
const databases = new Databases(client);

export default async function subscribeUser(email) {
    try {
        const existingUser = await databases.listDocuments(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COLLECTION_ID,
            [
                Query.equal("email", email),
                Query.equal("isSubscribed", true),
                Query.select(["email"]),
            ]
        );
        if (existingUser.total > 0) {
            throw new Error("Email already subscribed");
        }
        await databases.createDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COLLECTION_ID,
            ID.unique(),
            {
                email: email,
                isSubscribed: true,
            }
        );
    } catch (error) {
        console.log(error);
        throw new Error("Failed to subscribe user: " + error.message);
    }
}
