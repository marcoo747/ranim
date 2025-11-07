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

// ...existing code...
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('notif-toggle');
  const popup = document.getElementById('notif-popup');
  const showMore = document.getElementById('show-more-btn');

  if (!toggle || !popup) return;

  // Toggle popup
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isHidden = popup.hasAttribute('hidden');
    if (isHidden) {
      popup.removeAttribute('hidden');
      toggle.setAttribute('aria-expanded', 'true');
    } else {
      popup.setAttribute('hidden', '');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Prevent clicks inside popup from closing it
  popup.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Close when clicking outside
  document.addEventListener('click', () => {
    if (!popup.hasAttribute('hidden')) {
      popup.setAttribute('hidden', '');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      popup.setAttribute('hidden', '');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Show more -> go to sidebar notifications page
  if (showMore) {
    showMore.addEventListener('click', () => {
      // navigate to the notifications page (relative path from index folder)
      window.location.href = 'notifications.html';
    });
  }
});
// ...existing code...