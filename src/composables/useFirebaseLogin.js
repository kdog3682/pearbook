/* deno-fmt-ignore */ import {Storage} from "/home/kdog3682/2024-javascript/js-toolkit/LocalStorage.js"
import {usePiniaStudent} from "/home/kdog3682/projects/pearbook/src/composables/usePiniaStudent.js"
export {
    useFirebaseLogin,
}

import {
    createDocument,
    createNamedDocument,
    deleteDocument,
    deleteDocumentField,
    deleteDocuments,
    incrementDocumentField,
    readDocument,
    readDocuments,
    recursivelyUploadDataObject,
    updateChildDocuments,
    updateDocument,
    updateDocumentField,
    uploadCollections,
    loginAnonymously,
    signInWithEmail,
    signOut,
    createUser
} from '/home/kdog3682/@bkl/packages/services/src/firebaseService.js'

import { signInAnonymously,signInWithEmailAndPassword,  getAuth, GoogleAuthProvider } from "firebase/auth"

function useFirebaseLogin() {

    const username = ref('')
    const email = ref('')
    const password = ref('')
    const rememberMe = ref(true)
    const failedAttempts = ref(0)

    async function createAccount() {
        const user = await createUser(email.value, password.value)
        return user
    }
    async function login() {
        const user = await signInWithEmail(email.value, password.value)
        if (user) {
            return user
        } else {
            failedAttempts.value += 1
        }
    }

    return {
        email,
        username,
        password,
        rememberMe,
        status,
        failedAttempts,
        login,
        createAccount,
        signOut,
    }
}



import { getAuth, signInWithEmailAndPassword, updatePassword } from "firebase/auth"
import { initializeApp } from "firebase/app"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

// Function to sign in and change password
const changeUserPassword = async (email, currentPassword, newPassword) => {
  try {
    // Sign in the user
    const userCredential = await signInWithEmailAndPassword(auth, email, currentPassword)
    const user = userCredential.user
    console.log("User signed in: ", user)

    // Change the user's password
    await updatePassword(user, newPassword)
    console.log("Password updated successfully")
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    console.error(`Error [${errorCode}]: ${errorMessage}`)
  }
}

// Example usage
const email = "user@example.com"
const currentPassword = "current_password"
const newPassword = "new_password"
changeUserPassword(email, currentPassword, newPassword)
// this is considered business logic

