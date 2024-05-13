export {
    useFetchFactory,
}
import { ref } from "vue"

function useFetchFactory(fetch, baseOpts = {}) {
    return function useFetch() {
        const isLoading = ref(false)
        const data = ref(null)
        const error = ref(null)
        const url = ref("")
        const opts = ref(baseOpts)

        const get = async (...args) => {
            isLoading.value = true
            error.value = null
            data.value = null

            try {
                const result = await fetch(url, opts)
                data.value = result
            } catch (err) {
                error.value = err
            } finally {
                isLoading.value = false
            }
        }
    }

    return { isLoading, data, error, get, url, opts }
}
