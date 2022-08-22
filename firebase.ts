// Import the functions you need from the SDKs you need
import {initializeApp, getApp, getApps} from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC4UHmiMv3LyyBOy_7tpmcF0fYoyRpSdVw",
    authDomain: "netflix-clone-47c49.firebaseapp.com",
    projectId: "netflix-clone-47c49",
    storageBucket: "netflix-clone-47c49.appspot.com",
    messagingSenderId: "390060451462",
    appId: "1:390060451462:web:f802dc5f88cbdd131ed307"
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export {auth, db}