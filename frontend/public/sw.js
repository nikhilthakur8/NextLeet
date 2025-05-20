self.addEventListener("push", function (event) {
    let data = {};
    try {
        data = event.data.json();
    } catch (e) {
        console.error("Error parsing push event data:", e);
    }

    const title = data.title || "📬 New Message";

    const options = {
        body: data.body || "You’ve got a new message",
        icon: data.icon || "/default-icon.png",
        image: data.image, // big image displayed in the notification (not always supported)
        tag: data.tag || "default-tag",
        actions: data.actions || [],
        requireInteraction: false,
        renotify: true,
        vibrate: [200, 100, 200],
        data: {
            ...data.data,
            url: data.url || "https://example.com",
        },
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function (event) {
    event.notification.close();

    const url = event.notification.data?.url || "https://example.com";

    event.waitUntil(
        clients
            .matchAll({ type: "window", includeUncontrolled: true })
            .then((clientList) => {
                console.log("Client List:", clientList);
                for (const client of clientList) {
                    if (client.url === url && "focus" in client) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    return clients.openWindow(url);
                }
            })
    );
});
