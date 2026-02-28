import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Replace with your project's Firebase config
const firebaseConfig = {
    apiKey: "demo-api-key",
    authDomain: "demo-project.firebaseapp.com",
    projectId: "demo-project",
    storageBucket: "demo-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

/**
 * Saves a user's onboarding profile to Firestore
 * @param {string} uid The user's UID (from Firebase Auth)
 * @param {object} profileData The onboarding formData
 */
export const saveUserProfile = async (uid, profileData) => {
    try {
        const userRef = doc(db, "users", uid);
        await setDoc(userRef, {
            ...profileData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        return true;
    } catch (error) {
        console.error("Error saving user profile to Firebase:", error);
        throw error;
    }
};

export { app, db, auth };
