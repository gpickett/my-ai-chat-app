Based on the analysis of the provided repository, I will generate a project template for building a Software-as-a-Service (SaaS) application using Next.js with Firebase authentication and storage. Below is the proposed project structure, configuration files, and sample code:

Project Structure:
```
- components/
- pages/
- public/
- styles/
- utils/
- context/
  - FirebaseContext.js
- firebase/
  - firebaseConfig.js
- next.config.js
- package.json
- README.md
```

Sample `FirebaseContext.js` in the `context` folder:
```javascript
import React, { createContext, useState, useEffect } from 'react';
import firebase from '../firebase/firebaseConfig';

export const FirebaseContext = createContext();

const FirebaseContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    
    return () => unsubscribe();
  }, []);
  
  const signIn = async (email, password) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  };
  
  const signOut = async () => {
    await firebase.auth().signOut();
  };

  return (
    <FirebaseContext.Provider value={{ currentUser, signIn, signOut }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContextProvider;
```

Sample `firebaseConfig.js` in the `firebase` folder:
```javascript
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
```

Sample usage in a Next.js page:
```javascript
import { useContext } from 'react';
import { FirebaseContext } from '../context/FirebaseContext';

const HomePage = () => {
  const { currentUser, signIn, signOut } = useContext(FirebaseContext);

  return (
    <div>
     {currentUser ? (
       <button onClick={signOut}>Sign Out</button>
     ) : (
       <button onClick={() => signIn('test@example