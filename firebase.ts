import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAuaQ__9qXlxzMiabwXnVAjhXES5YnVOLc",
    authDomain: "fiflow-353d6.firebaseapp.com",
    projectId: "fiflow-353d6",
    storageBucket: "fiflow-353d6.firebasestorage.app",
    messagingSenderId: "1030644570289",
    appId: "1:1030644570289:web:6a9fac0a7d67e9a8d96a90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
