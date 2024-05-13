import {getElement, cssLoader, getKeyListenerArg, googleFontLoader, elt, getInputState, getKeyAndType, importLoader, isInputElement, preventDefault, setRootAttributes} from "/home/kdog3682/2024-javascript/js-toolkit/browser.js"
export {
    useEventListener,
}

function useEventListener(target, event, callback) {
  const el = getElement(target)
  onMounted(() => el.addEventListener(event, callback))
  onUnmounted(() => el.removeEventListener(event, callback))
}
