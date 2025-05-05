console.log("Service Worker Loaded...");

self.addEventListener("push", (event) => {
	console.log("Push Event Received");
	console.log(event.data.json());
	const data = event.data.json();

	const { title, body } = data;
	self.registration.showNotification(title, {
		body: body,
		icon: "https://avatars.githubusercontent.com/u/150348094?v=4",
	});
});
