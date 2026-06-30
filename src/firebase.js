import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAPs8pZg9kZcA5eiHJtViYnae0rHEc0HzM",
  authDomain: "leetcode-tracker-b0993.firebaseapp.com",
  projectId: "leetcode-tracker-b0993",
  storageBucket: "leetcode-tracker-b0993.firebasestorage.app",
  messagingSenderId: "1093674408148",
  appId: "1:1093674408148:web:9835be84efd2e004094341"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)