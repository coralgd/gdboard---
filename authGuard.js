import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export function guard(requiredRole = null) {
  onAuthStateChanged(auth, async user => {
    if (!user) {
      location.href = "index.html";
      return;
    }

    const snap = await getDoc(doc(db, "users", user.uid));
    const data = snap.data();

    if (data.situation !== "verified") {
      location.href = "blocked.html";
      return;
    }

    if (requiredRole && data.role !== requiredRole) {
      location.href = "main.html";
    }
  });
}
