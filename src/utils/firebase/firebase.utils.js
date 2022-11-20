import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
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

//------------------------------------------------------------------------
export const auth = getAuth(app);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
//----------------------------------------------------------------------

export const db = getFirestore();

//-------------------------------------------------------
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfomation = {},
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  //refrence from google when entering email
  console.log(userDocRef);

  // getDoc  seeing if the loged data exist in f db
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfomation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  return userDocRef;
};

//--------------------------------------------------------------------

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
