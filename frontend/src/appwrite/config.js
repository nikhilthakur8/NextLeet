import { Client, Databases, ID, Query } from "appwrite";
const client = new Client();
client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
const databases = new Databases(client);

function getLocalDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

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

const requiredDetails = [
    "title",
    "titleSlug",
    "questionId",
    "difficulty",
    "date",
];
export async function getLatestQuestion(skip = 0, limit = 10) {
    const currentDate = new Date();
    try {
        const data = await databases.listDocuments(
            import.meta.env.VITE_APPWRITE_QUESTION_CHALLENGES_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_QUESTION_CHALLENGES_COLLECTION_ID,
            [
                Query.equal("type", "DAILY"),
                Query.or([
                    Query.greaterThanEqual(
                        "date",
                        getLocalDateString(currentDate)
                    ),
                    Query.isNull("date"),
                ]),
                Query.limit(limit),
                Query.offset(skip),
                Query.orderAsc("date"),
                Query.select(requiredDetails),
            ]
        );

        return data || null;
    } catch (error) {
        console.log(error);
    }
}

export async function getTomorrowQuestion() {
    const requiredDetails = ["titleSlug"];
    const currentDate = new Date();
    // const tomorrowDate = new Date(currentDate);
    // tomorrowDate.setDate(currentDate.getDate() + 1);
    try {
        const data = await databases.listDocuments(
            import.meta.env.VITE_APPWRITE_QUESTION_CHALLENGES_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_QUESTION_CHALLENGES_COLLECTION_ID,
            [
                Query.equal("type", "DAILY"),
                Query.equal("date", getLocalDateString(currentDate)),
                Query.select(requiredDetails),
                Query.limit(1),
            ]
        );
        return data.documents[0].titleSlug || null;
    } catch (error) {
        console.log(error);
    }
}

export async function getPastQuestion(skip = 0, limit = 10) {
    try {
        const data = await databases.listDocuments(
            import.meta.env.VITE_APPWRITE_QUESTION_CHALLENGES_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_QUESTION_CHALLENGES_COLLECTION_ID,
            [
                Query.equal("type", "DAILY"),
                Query.lessThan("date", getLocalDateString(new Date())),
                Query.orderDesc("date"),
                Query.limit(limit),
                Query.offset(skip),
                Query.select(requiredDetails),
            ]
        );
        return data || null;
    } catch (error) {
        console.log(error);
    }
}

export async function getLastUpdatedDate() {
    try {
        const data = await databases.listDocuments(
            import.meta.env.VITE_APPWRITE_QUESTION_CHALLENGES_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_QUESTION_MICELLANEOUS_COLLECTION_ID,
            [Query.limit(1), Query.select(["lastUpdated"])]
        );
        return data.documents[0].lastUpdated || null;
    } catch (error) {
        console.log(error);
    }
}

export async function getTotalSubscriber() {
    try {
        const data = await databases.listDocuments(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COLLECTION_ID,
            [Query.select()]
        );
        return data.total || 0;
    } catch (error) {
        console.log(error);
    }
}

export async function getNotification() {
    try {
        const data = await databases.listDocuments(
            import.meta.env.VITE_APPWRITE_QUESTION_CHALLENGES_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_QUESTION_MICELLANEOUS_COLLECTION_ID,
            [Query.limit(1), Query.select(["notification"])]
        );
        return data.documents[0] || null;
    } catch (error) {
        console.log(error);
    }
}

export async function getWeeklyQuestions(skip = 0, limit = 10) {
    try {
        const data = await databases.listDocuments(
            import.meta.env.VITE_APPWRITE_QUESTION_CHALLENGES_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_QUESTION_CHALLENGES_COLLECTION_ID,
            [
                Query.equal("type", "WEEKLY"),
                Query.greaterThanEqual("date", getLocalDateString(new Date())),
                Query.orderAsc("date"),
                Query.limit(limit),
                Query.offset(skip),
                Query.select(requiredDetails),
            ]
        );
        return data || null;
    } catch (error) {
        console.log(error);
    }
}
