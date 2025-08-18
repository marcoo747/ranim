/**
 * Pops up the latest three notifications using alert().
 * @param {notifications} notifications - Array of notification messages.
 */
function showLatestNotifications(notifications) {
    // Get the latest three notifications (or fewer if not enough)
    const latestThree = notifications.slice(-3).reverse();
    latestThree.forEach((note, idx) => {
        alert(`Notification ${latestThree.length - idx}:\n${note}`);
    });
}

// Example usage:
const notifications = [
    "Your order has shipped.",
    "New message from Alice.",
    "Password changed successfully.",
    "System maintenance tonight.",
    "You have a new follower!"
];

// showLatestNotifications(notifications);
// /**
//  * Pops up the latest three notifications using alert().
//  * @param {Array<Object>} notifications - Array of notification objects.
//  * Each object should have at least a 'message' property.
//  */
// function showLatestNotifications(notifications) {
//     // Sort notifications by timestamp (descending) if needed
//     const sorted = notifications.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
//     // Get the latest three notifications
//     const latestThree = sorted.slice(0, 3);
//     latestThree.forEach((note, idx) => {
//         alert(`Notification ${idx + 1}:\n${note.message}`);
//     });
// }

// // Example: Fetching notifications from your own data source (local or API)
// async function fetchNotificationsFromAPI() {
//     // Replace this URL with your actual endpoint
//     const response = await fetch('https://your-api.com/notifications');
//     if (!response.ok) throw new Error('Failed to fetch notifications');
//     return await response.json();
// }

// // Usage example with static data
// const notificationsData = [
//     { id: 1, message: "Welcome to the app!", timestamp: "2025-08-17T09:30:00Z" },
//     { id: 2, message: "Don't forget to check your settings.", timestamp: "2025-08-17T12:00:00Z" },
//     { id: 3, message: "Your friend sent a message.", timestamp: "2025-08-17T15:45:00Z" },
//     { id: 4, message: "System update available.", timestamp: "2025-08-17T16:10:00Z" }
// ];

// showLatestNotifications(notificationsData);

// // Usage example with API
// // (async () => {
// //     const notifications = await fetchNotificationsFromAPI();
// //     showLatestNotifications(notifications);
// // })();