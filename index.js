const bodyParser = require("body-parser");
const webpush = require("web-push");
const path = require("path");
const express = require("express");

const app = express();
app.use(bodyParser.json());

/* Run Frontend Code */
app.use(express.static(path.join(__dirname, "./ui")));

// VAPID keys should be generated only once.
/*
const vapidKeys = webpush.generateVAPIDKeys();
console.log(vapidKeys);
*/

// These tells whose sending the notification
const publicVapidKey =
	"BMVIJZzWPn25X5zBjsu0bLAuWYmMRT8rfqPmx0u3JniDe3aWhz1e7M39DCiN8pAsTxs6yJKHLwn5csG-uYbNl0Y"; // shared with the client (browser)
const privateVapidKey = "AzIOmEqep-A_VfL7mL-5S0kcP8ycfniVUdJmSKChQPw";

webpush.setVapidDetails(
	"mailto:praveenande2023@gmail.com", // Contact email (optional but recommended)
	publicVapidKey,
	privateVapidKey
);

/* ----->Routes <----- */
app.post("/subscribe", (req, res) => {
	// Get pushSubscription Object
	const subscription = req.body;
	console.log(subscription);

	// send 201 - resource created
	res.status(201).json({});

	// Create payload
	const payload = JSON.stringify({
		title: "I am Header",
		body: "I am Body",
		message: "This is a push notification test",
	});

	// Pass object into sendNotification
	webpush.sendNotification(subscription, payload).catch((err) => {
		console.log(err);
	});
});

app.listen(5004, () => {
	console.log("Server started on port 5004");
});
