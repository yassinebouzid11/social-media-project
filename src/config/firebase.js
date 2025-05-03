// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyAZBPM68HXShScDXMdt8bOX1Sw0h46Lxx0",
    authDomain: "social-media-react-proje-85bcf.firebaseapp.com",
    projectId: "social-media-react-proje-85bcf",
    storageBucket: "social-media-react-proje-85bcf.firebasestorage.app",
    messagingSenderId: "542270363303",
    appId: "1:542270363303:web:79989df5a8ecff9a67ad82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);