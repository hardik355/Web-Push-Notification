// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

document.addEventListener("turbo:load", () => {
  switch (Notification.permission) {
  case "granted":
    // Send to server if granted
    return;
  case "denied":
    return; // Do nothing if denied
  default:
    promptForNotifications();
  }
})

function promptForNotifications() {
  const notificationsButton = document.getElementById("enable_notifications");
  if (!notificationsButton) return;

  notificationsButton.addEventListener("click", event => {
    event.preventDefault();
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        setupSubscription();
      } else {
        alert("Notifications declined");
      }
    }).catch(error => console.log("Notifications error", error));
  });
}

async function setupSubscription() {
  if (Notification.permission !== "granted") return;
  if (!navigator.serviceWorker) return;

  const vapid = new Uint8Array(JSON.parse(document.querySelector("meta[name=web_push_public]")?.content));
  const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

  const registration = await navigator.serviceWorker.register("/service_worker.js");
  console.log('Service Worker registration successful:', registration);

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: vapid
  });

  console.log('Push Subscription object:', subscription);

  await fetch("/web_subscription", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken
    },
    body: JSON.stringify(subscription)
  });
}
