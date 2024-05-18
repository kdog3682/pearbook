export {
    useLoader,
}


function useLoader() {
    const isLoading = ref(false)
    const loader = async (fn, ...args) => {
        isLoading.value = true
        let result
        try {
            result = await fn(...args)
            return result
        } catch(e) {
            console.log(args, fn.name)
            console.log(e.toString())
        }
        isLoading.value = false
        return result
    }
    return {
        isLoading, loader
    }
}
