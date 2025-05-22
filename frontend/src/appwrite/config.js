import { Client, Databases, ID, Query } from "appwrite";
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

export async function getLatestQuestion() {
    const requiredDetails = [
        "title",
        "titleSlug",
        "questionId",
        "difficulty",
        "date",
    ];
    const currentDate = new Date();
    const data = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_QUESTION_CHALLENGES_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_QUESTION_CHALLENGES_COLLECTION_ID,
        [
            Query.equal("type", "DAILY"),
            Query.greaterThanEqual(
                "date",
                currentDate.toISOString().split("T")[0]
            ),
            Query.orderAsc("date"),
            Query.select(requiredDetails),
        ]
    );
    return data.documents || null;
}

export async function getTomorrowQuestion() {
    const requiredDetails = ["titleSlug"];
    const currentDate = new Date();
    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);
    const data = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_QUESTION_CHALLENGES_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_QUESTION_CHALLENGES_COLLECTION_ID,
        [
            Query.equal("type", "DAILY"),
            Query.equal("date", tomorrowDate.toISOString().split("T")[0]),
            Query.select(requiredDetails),
            Query.limit(1),
        ]
    );
    return data.documents[0].titleSlug || null;
}
