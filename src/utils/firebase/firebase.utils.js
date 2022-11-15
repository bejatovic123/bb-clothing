import { initializeApp } from 'firebase/app';
import {
  getAuth,
  //signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAcz3-1Cy5nvOZK6m9RjMVkAexdbv1pCso',
  authDomain: 'bb-clothing-db.firebaseapp.com',
  projectId: 'bb-clothing-db',
  storageBucket: 'bb-clothing-db.appspot.com',
  messagingSenderId: '719165593153',
  appId: '1:719165593153:web:07a35279991725217a18c0',
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth(app);

//first method in our Sign in
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//directly pointing to database
export const db = getFirestore();

//second method in our Sign in
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);

  //false or true if the reference in our database exists or not
  console.log(userSnapshot.exists());

  //if user data does not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  //if user data exists

  //return userDocRef
};
