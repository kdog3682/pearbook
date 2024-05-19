import { initializeApp } from "firebase/app"
import {
    browserLocalPersistence,
    getAuth,
    setPersistence,
} from "firebase/auth"
import * as env from "@bkl/env"
const app = initializeApp(env.HAMMY_MATH_CLASS_FIREBASE_CONFIG)
const auth = getAuth(app)
setPersistence(auth, browserLocalPersistence)
export { auth }
