import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export function guard({ verified=false, mod=false, senior=false }){
  onAuthStateChanged(auth, async user=>{
    if(!user){
      location.href="index.html";
      return;
    }

    const snap = await getDoc(doc(db,"users",user.uid));
    if(!snap.exists()) return;

    const u = snap.data();

    // ЖЁСТКАЯ блокировка
    if(u.situation==="blocked"){
      location.href="blocked.html";
      return;
    }

    // проверка верификации
    if(verified && u.situation!=="verified"){
      location.href="blocked.html";
      return;
    }

    // роли
    if(mod && !["mod","senior"].includes(u.role)){
      location.href="blocked.html";
      return;
    }

    if(senior && u.role!=="senior"){
      location.href="blocked.html";
    }
  });
}
