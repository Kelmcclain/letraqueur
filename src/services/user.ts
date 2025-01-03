import { 
    db,
    doc,
    setDoc,
    serverTimestamp
  } from './firebase';
  import type { User } from 'firebase/auth';
  
  export const initializeUserData = async (user: User) => {
    try {
      // Create user document
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        email: user.email,
        createdAt: serverTimestamp(),
      }, { merge: true });
  

    } catch (error) {
      console.error('Error initializing user data:', error);
      throw error;
    }
  };
  