import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC-FvppD4n5ZZTVSSv4WOHe2LIccYGfo70',
  authDomain: 'bb-clothing-db-8257c.firebaseapp.com',
  projectId: 'bb-clothing-db-8257c',
  storageBucket: 'bb-clothing-db-8257c.appspot.com',
  messagingSenderId: '248663293449',
  appId: '1:248663293449:web:1a9bf4743ff135b0ff42d8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth(app);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  //if user data exists

  //return userDocRef
};
