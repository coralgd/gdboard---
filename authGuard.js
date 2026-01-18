import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/**
 * options:
 *  requireVerified: true/false
 *  role: "moderator" | "elder" | null
 */
export function guard(options = {}) {
  const {
    requireVerified = false,
    role = null
  } = options;

  onAuthStateChanged(auth, async user => {
    if (!user) {
      location.href = "index.html";
      return;
    }

    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      location.href = "index.html";
      return;
    }

    const u = snap.data();

    // 🚫 ЖЁСТКАЯ БЛОКИРОВКА
    if (u.situation === "blocked") {
      location.href = "blocked.html";
      return;
    }

    // 🔒 ТРЕБУЕТСЯ ВЕРИФИКАЦИЯ
    if (requireVerified && u.situation !== "verified") {
      location.href = "blocked.html";
      return;
    }

    // 🧱 ПРОВЕРКА РОЛИ
    if (role && u.role !== role) {
      location.href = "blocked.html";
      return;
    }
  });
}
