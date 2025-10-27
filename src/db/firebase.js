import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyBw_McIwHIYq3T-i_KYCdI7_aQymShYToU",
  authDomain: "space-end-9822a.firebaseapp.com",
  projectId: "space-end-9822a",
  storageBucket: "space-end-9822a.firebasestorage.app",
  messagingSenderId: "650845736069",
  appId: "1:650845736069:web:0d414289498b34656eadec",
  measurementId: "G-LWEWPWK8RG",
};

const app = initializeApp(firebaseConfig);

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LfX__grAAAAAB6PNojf_376lcmZooJQVdT16lS1"),
  isTokenAutoRefreshEnabled: true,
});

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
