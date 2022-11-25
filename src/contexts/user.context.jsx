import { createContext, useState, useEffect } from 'react';
import {
  createUserDocumentFromAuth,
  onAuthStateChangeListener,
} from '../utils/firebase/firebase.utils';

// as the actual value yo want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    //----...........---LISTENING FOR EVENTS      (Callback)-------permanent listener for changes to auth changes and giving the new callback(user)
    const unsubscribe = onAuthStateChangeListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
