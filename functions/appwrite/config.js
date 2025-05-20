const { Client, Databases, Query } = require("node-appwrite");
const client = new Client();
client
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID);
const databases = new Databases(client);
async function getAllSubscribers() {
    try {
        const details = ["email"];
        const { documents } = await databases.listDocuments(
            process.env.APPWRITE_DATABASE_ID,
            process.env.APPWRITE_COLLECTION_ID,
            [Query.equal("isSubscribed", true), Query.select(details)]
        );
        const uniqueDocuments = new Set(documents);
        return uniqueDocuments;
    } catch (error) {
        console.error("Error fetching subscribers:", error);
        throw new Error("Failed to fetch subscribers");
    }
}

module.exports = {
    getAllSubscribers,
};
