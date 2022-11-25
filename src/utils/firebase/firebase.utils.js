import { initializeApp } from 'firebase/app';
import {
  signInWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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

//----...--- configured firestore.........
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

//--FM-------auth-/-firebaseConfic data initialized------------------------
export const auth = getAuth(app);

//-----------.....................---------.....F M.......-auth.-provider.-----Called in Sign In Component
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//-----------..---....FM.........------Getting the F db
export const db = getFirestore();

//-----------............M.............----------Called in Sign up Component
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfomation = {},
) => {
  //---IF there is no user just retrun,
  if (!userAuth) return;

  //----.refrence.------ fb   users   the id of the user--------PATH
  const userDocRef = doc(db, 'users', userAuth.uid);

  // ---............---------getting(firestore,path:,pathSegment(ect. id))------getting the data from database from firestore
  const userSnapshot = await getDoc(userDocRef);

  //..if it dosn't exists create it---------setDoc creating new user
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    //data being saved in the data base
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

//-M------------........SIGN...UP....FORM.......--------------------------------

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  //-FM--------......FIREBASE......METHOD.....-----------------------
  return await createUserWithEmailAndPassword(auth, email, password);
};

//--M-----------       SIGN   IN    FORM        --------------------------------

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  //--FM---------    FIREBASE       METHOD     -----------------.
  return await signInWithEmailAndPassword(auth, email, password);
};

//--M-----FM-----auth is keeping track what users are loged in now-

export const singOutUser = async () => await signOut(auth);

//----------Creating a listener using this callback---------
export const onAuthStateChangeListener = (callback) =>
  onAuthStateChanged(auth, callback);
