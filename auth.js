import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export function guard({ requireVerified = false, role = null } = {}) {
  onAuthStateChanged(auth, async user => {
    if (!user) {
      location.href = "index.html";
      return;
    }

    const snap = await getDoc(doc(db, "users", user.uid));
    if (!snap.exists()) {
      location.href = "index.html";
      return;
    }

    const u = snap.data();

    if (u.situation === "blocked") {
      location.href = "blocked.html";
      return;
    }

    if (requireVerified && u.situation !== "verified") {
      location.href = "blocked.html";
      return;
    }

    if (role && u.role !== role) {
      location.href = "blocked.html";
      return;
    }
  });
}
