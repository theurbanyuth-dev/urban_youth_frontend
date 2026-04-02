import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7-lQNVp0VuonZ8CT5ke-zCm0jvedg-jg",
  authDomain: "https://urbanyouth-34231.firebaseapp.com/",
  projectId: "urbanyouth-34231",
  appId: "1:281452518957:web:3872f0c4b4706a1b2f62a4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);