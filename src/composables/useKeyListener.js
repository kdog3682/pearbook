export {
    useKeyListener,
}
import {getKeyListenerArg} from "/home/kdog3682/2024-javascript/js-toolkit/browser.js"
import {useEventListener} from "./useEventListener.js"

function reduceViaKeys(items, [k, v] = []) {
    if (k == null) {
        ;[k, v] = Object.keys(items[0])
    }
    return items.reduce((acc, item, i) => {
        acc[item[k]] = item[v]
        return acc
    }, {})
}
function useKeyListener(handlers) {
    const reference = reduceViaKeys(handlers)
    function callback(e) {
        const arg = getKeyListenerArg(e)
        const fn = reference[arg]
        if (fn) {
            e.preventDefault()
            fn(arg)
        }
    }
    useEventListener(window, 'keydown', callback)
}
