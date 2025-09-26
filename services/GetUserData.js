import { ref, get, child } from "firebase/database"; // Import Firebase functions
import { db } from "../src/firebase"; // Import your database instance

export async function getUserData(userId) {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, `users/${userId}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    return null;
  }
}