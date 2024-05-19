
/* deno-fmt-ignore */ import {Storage} from "/home/kdog3682/2024-javascript/js-toolkit/LocalStorage.js"
import {usePiniaStudent} from "/home/kdog3682/projects/pearbook/src/composables/usePiniaStudent.js"
export {
    useFirebaseStudentLogin,
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
} from '/home/kdog3682/@bkl/packages/services/src/firebaseService.js'

async function fetchAccountData(username, reset) {
    const storage = new Storage({ name: "bkl" })
    if (!reset) {
        const baseAccountData = storage.get('accountData') || {}
        if (baseAccountData) {
            return baseAccountData
        }
    }
    const doc = await readDocument("users", username)
    if (doc) {
        storage.set('accountData', doc)
        return doc
    }
}

// this does not touch localStorage as well.
// the assumption is that if we have arrived here ... then we must need it
// additionally, nothing happens with assignments
function useFirebaseStudentLogin() {

    const username = ref('')
    const password = ref('')
    const rememberMe = ref(false)
    const failedAttempts = ref(0)
    const status = reactive({error: '', success: ''})
    const pin = usePiniaStudent()

    async function login(reset) {
        // const accountData = await fetchAccountData(username.value, reset)
        const accountData = await pin.fetchAccountData(username.value)
        console.log(pin.username.value)

        if (accountData) {
            if (password.value == accountData.password) {
                status.success = 'loggedIn'
                status.error = ''
                return true
            } else {
                status.error = 'invalidPassword'
                failedAttempts.value += 1
            }
        } else {
            status.error = 'invalidUsername'
            failedAttempts.value += 1
        }
    }

    return {
        username,
        password,
        rememberMe,
        status,
        failedAttempts,
        login,
    }
}

