let db;

// Ensure DB is ready before usage
const dbReady = new Promise((resolve, reject) => {
	const request = indexedDB.open("LeetCodeTracker", 1);

	request.onupgradeneeded = function (event) {
		const db = event.target.result;
		if (!db.objectStoreNames.contains("isDone")) {
			db.createObjectStore("isDone", { keyPath: "slug" });
		}
	};

	request.onsuccess = function (event) {
		db = event.target.result;
		resolve();
	};

	request.onerror = function () {
		reject("Error opening IndexedDB");
	};
});

export const addDoneQuestion = async (slug, isDone) => {
	await dbReady;

	const tx = db.transaction("isDone", "readwrite");
	const store = tx.objectStore("isDone");
	store.put({ slug, isDone });

	return new Promise((resolve) => {
		tx.oncomplete = () => {
			console.log("Question status saved");
			resolve(true);
		};
	});
};

export const getDoneQuestion = async (slug) => {
	await dbReady;

	const tx = db.transaction("isDone", "readonly");
	const store = tx.objectStore("isDone");

	return new Promise((resolve, reject) => {
		const request = store.get(slug);
		request.onsuccess = () => {
			if (request.result) {
				resolve(request.result.isDone);
			} else {
				resolve(false);
			}
		};
		request.onerror = () => reject("Error fetching question");
	});
};
