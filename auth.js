import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

window.login = async ()=>{
  const email=email.value;
  const pass=pass.value;
  await signInWithEmailAndPassword(auth,email,pass);
  location.href="main.html";
};
