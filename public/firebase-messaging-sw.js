importScripts(
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// // Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyBGepKcxYKPl6n7c9KL-P0VzQsESdrIURA",
    authDomain: "goninhthuan-7f312.firebaseapp.com",
    projectId: "goninhthuan-7f312",
    storageBucket: "goninhthuan-7f312.appspot.com",
    messagingSenderId: "306559012179",
    appId: "1:306559012179:web:d077c5c3288d3ba61da5a6",
    databaseURL: "...",
};

firebase?.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase?.messaging();

messaging.onBackgroundMessage(function (payload) {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
