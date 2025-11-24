import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAEYBUCZDrUAMo8KHlMzMggwFuJACIXjKo",
  authDomain: "care-flow-auth-73d01.firebaseapp.com",
  projectId: "care-flow-auth-73d01",
  storageBucket: "care-flow-auth-73d01.firebasestorage.app",
  messagingSenderId: "168230363162",
  appId: "1:168230363162:web:144629740bcd7cfcd231a3",
  measurementId: "G-RE9V9984LH"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
