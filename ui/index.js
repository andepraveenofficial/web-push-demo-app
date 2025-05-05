console.log("I am ui");
const sendNotification = document.getElementById("sendNotification");

const publicVapidKey =
	"BMVIJZzWPn25X5zBjsu0bLAuWYmMRT8rfqPmx0u3JniDe3aWhz1e7M39DCiN8pAsTxs6yJKHLwn5csG-uYbNl0Y";

// Check for service worker
if ("serviceWorker" in navigator) {
	// send().catch((err) => console.error(err));
	sendNotification.addEventListener("click", () => {
		send().catch((err) => console.error(err));
	});
}

// Register SW, Register Push, Send Push
async function send() {
	// 01 Register Service Worker
	console.log("Registering Service Worker");
	const register = await navigator.serviceWorker.register("/sw.js", {
		scope: "/",
	});
	console.log("Service Worker Registered");

	// 02 Register Push
	console.log("Registering Push");
	const subscription = await register.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: base64UrlToUint8Array(publicVapidKey),
	});

	// 03 Send Push Notification
	console.log("Sending Push Notification");
	await fetch("/subscribe", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(subscription),
	});
	console.log("Push Notification sent");
}

// This Function takes from official github demo
function base64UrlToUint8Array(base64UrlData) {
	const padding = "=".repeat((4 - (base64UrlData.length % 4)) % 4);
	const base64 = (base64UrlData + padding)
		.replace(/\-/g, "+")
		.replace(/_/g, "/");
	const rawData = atob(base64);
	const buffer = new Uint8Array(rawData.length);
	for (let i = 0; i < rawData.length; ++i) {
		buffer[i] = rawData.charCodeAt(i);
	}
	return buffer;
}
