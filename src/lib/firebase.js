// firebase.js
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  getDoc,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMOHzgP6XTK7Jxto7y0UFchpIwhv953F4",
  authDomain: "mommacircle-8fa52.firebaseapp.com",
  projectId: "mommacircle-8fa52",
  storageBucket: "mommacircle-8fa52.firebasestorage.app",
  messagingSenderId: "881968821306",
  appId: "1:881968821306:web:938e801cf7b7e67262b103",
  measurementId: "G-L0QBNWM9M9"
};

// Init once

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export async function registerUser(email, password, profileData = {}) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = cred.user.uid;

  // Create the user profile doc
  await setDoc(
    doc(db, "ProfileUsers", uid),
    {
      userId: uid,
      email,
      ...profileData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  return uid;
}

// Create/Update profile at ProfileUsers/{userId}
export async function upsertUserProfile(userId, profile = {}) {
  await setDoc(
    doc(db, "ProfileUsers", userId),
    {
      userId,
      email: profile.email ?? "",
      firstName: profile.firstName ?? "",
      lastName: profile.lastName ?? "",
      LMP: profile.LMP ?? "",
      updatedAt: serverTimestamp(),
    },
    { merge: true}
  );

  return userId;
}

export async function setPreExistingConditions(userId, data = {}) {
  await setDoc(
    doc(db, "ProfileUsers", userId, "preExistingConditions", "current"),
    {
      hasConditions: !!data.hasConditions,
      conditions: Array.isArray(data.conditions) ? data.conditions : [],
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function setPreviousPregnancies(userId, data = {}) {
  await setDoc(
    doc(db, "ProfileUsers", userId, "previousPregnancies", "current"),
    {
      isFirstTime: !!data.isFirstTime,
      previousPregnancies: Number.isFinite(data.previousPregnancies)
        ? data.previousPregnancies
        : 0,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}


export async function setSupportSystem(userId, data = {}) {
  await setDoc(
    doc(db, "ProfileUsers", userId, "supportSystem", "current"),
    {
      hasVillage: Array.isArray(data.village) && data.village.length > 0,
      village: Array.isArray(data.village) ? data.village : [],
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}


export async function getUserFirstName(userId) {
  try {
    const userRef = doc(db, "ProfileUsers", userId);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      throw new Error("User profile does not exist");
    }

    const data = snapshot.data();

    return data.firstName || null;
  } catch (error) {
    console.error("Error fetching first name:", error);
    throw error;
  }
}
export async function getUserLastName(userId) {
  try {
    const userRef = doc(db, "ProfileUsers", userId);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      throw new Error("User profile does not exist");
    }

    const data = snapshot.data();

    return data.lastName || null;
  } catch (error) {
    console.error("Error fetching last name:", error);
    throw error;
  }
}
export async function getUserLMP(userId) {
  try {
    const userRef = doc(db, "ProfileUsers", userId);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      throw new Error("User profile does not exist");
    }

    const data = snapshot.data();

    return data.LMP || null;
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
}

export async function getUserConditions(userId) {
  try {
    const ref = doc(
      db,
      "ProfileUsers",
      userId,
      "preExistingConditions",
      "current"
    );

    const snapshot = await getDoc(ref);

    
    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.data();

    //  if user has NO conditions  stop here
    if (!data.hasConditions) {
      return null;
    }

 
    return data.conditions ?? [];

  } catch (error) {
    console.error("Error fetching conditions:", error);
    throw error;
  }
}

export async function getUserPreviousPregnancies(userId) {
  try {
    const ref = doc(
      db,
      "ProfileUsers",
      userId,
      "previousPregnancies",
      "current"
    );

    const snapshot = await getDoc(ref);

    
    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.data();


    if (!data.isFirstTime) {
      return null;
    }

 
    return data.isFirstTime ?? [];

  } catch (error) {
    console.error("Error fetching isFirstTime num:", error);
    throw error;
  }
}


// signing up user functions
export async function loginUser(email, password) {
  try {
    const cred = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const uid = cred.user.uid;
    return uid;

  } catch (error) {
    throw error;
  }
}


export { app, db, auth };
export default app;