import { auth } from "../firebase.js"
import { createInitialFirebaseStudentUserData } from '../createInitialFirebaseStudentUserData.js'

import { onMounted, ref } from "vue"
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    updatePassword as firebaseUpdatePassword,
    updateProfile,
} from "firebase/auth"



// a closed system



function createInitialFirebaseStudentUserData(username) {

}

function computef(ref, fn) {
    return computed(() => {
        return fn(ref.value)
    })
}

function getArgs(args, wrappers) {
    const c = toArray2(args)
    if (!wrappers) {
        return c
    }
    function transform(arg, i) {
        const ref = wrappers[i]
        if (!ref) {
            return arg
        }
        if (ref.accept && !ref.accept(arg)) {
            throw new Error(ref.rejectionMessage)
        }
        if (ref.transform) {
            return ref.transform(arg)
        }
        return arg
    }
    try {
        return c.map(transform)
    } catch(e) {
        return e
    }
}
const useAuth = (options = {}) => {
    function fix(s) {
        return s + '@hmc.com'
    }
    function wrapper(fn, o) {
        const wrapper = async () => {
            try {
                const args = getArgs(o.args, o.wrappers)
                if (isError(args)) {
                    error.value = args
                    return false
                }
                await fn(...args)
                success.value = o.successKey || fn.name
                return true
            } catch (e) {
                error.value = getFirebaseError(e)
                return false
            }
        }
        return wrapper
    }

    const username = ref("")
    const password = ref("")

    onMounted(() => {
        onAuthStateChanged(auth, (currentUser) => {
            user.value = currentUser
        })
    })

    const registerUser = async () => {
        const loginName = fix(username.value)
        try {
            const cred =
                await createUserWithEmailAndPassword(
                    auth,
                    loginName,
                    password.value,
                )
            // initialization data
            await writeDocument("users", cred.id, createInitialFirebaseStudentUserData(username.value))
            await updateProfile(userCredential.user, {
                displayName: username.value,
            })
        } catch (error) {
            console.error("Error registering user: ", error)
        }
    }

    const signIn = wrapper(signInWithEmailAndPassword, {
        args: [auth, username.value, password.value],
        successKey: "signIn",
        wrappers: {
            1: {
                accept(s) {
                    return whiteList.includes(cypher(s))
                },
                transform: fix,
                rejectionMessage: 'Invalid account name'
            }
        }
    })
    const signOut = wrapper(firebaseSignout, {
        successKey: "signOut",
        args: [auth],
    })
    const updatePassword = wrapper(firebaseUpdatePassword, {
        successKey: "updatePassword",
        args: [user.value],
    })
    const user = ref(null)
}
function getFirebaseError(e) {
    return e.message
}
