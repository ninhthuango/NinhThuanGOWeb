import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBGepKcxYKPl6n7c9KL-P0VzQsESdrIURA",
  authDomain: "goninhthuan-7f312.firebaseapp.com",
  projectId: "goninhthuan-7f312",
  storageBucket: "goninhthuan-7f312.appspot.com",
  messagingSenderId: "306559012179",
  appId: "1:306559012179:web:d077c5c3288d3ba61da5a6",
  databaseURL: "...",
  
};
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }

    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey:
        "BGFxNtWaRIw5-OKl_bdR3XW3ZpuqfHnEXFPbHvCBwdcd991S1cD7TsN2_5FAmN0uIcLb1xXZjLD4rsgvgpfeI1E",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );
