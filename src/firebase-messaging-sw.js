importScripts(
  "https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCUNW9MzJqfQEvyE-kHkoUwNq-gPiTeuLQ",
  authDomain: "pomodoro-609d9.firebaseapp.com",
  projectId: "pomodoro-609d9",
  messagingSenderId: "341024895623",
  appId: "1:341024895623:web:ed91aa0d0b35f987e4fe22",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message:",
    payload
  );

  const { title, body } = payload.notification;

  self.registration.showNotification(title, {
    body: body,
  });
});
