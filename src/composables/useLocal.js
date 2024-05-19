const useLocal = () => {
    
    console.log('initializing useLocal')
    const state = {
        
    }
    const data = reactive(state)
    const set = (k, v) => {
        if (k in data) {
            data[k] = v
        } else {
            throw new Error(`${k} is not present in ${Object.keys(state)}`)
        }
    }
    const get = (k) => {
        return data[k]
    }
    return {
        data, set, get
    }
}
export useLocal
