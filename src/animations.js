export {
    onBeforeEnter,
    onAfterLeave,
    onLeave,
    onBeforeLeave,
    onAfterEnter,
    onEnter,
}

import {fadeIn, fadeOut, animatePath, flash, revolve, animate, fade} from "/home/kdog3682/2024-javascript/js-toolkit/animate.js"


function onBeforeEnter(el) {
    el.prev = el.state.style.background
    el.state.style.background = 'yellow'
}

// called one frame after the element is inserted.
// use this to start the entering animation.
async function onEnter(el, done) {
  await fadeInt(el)
  // call the done callback to indicate transition end
  // optional if used in combination with CSS
  done()
}

// called when the enter transition has finished.
function onAfterEnter(el) {
    el.state.style.background = el.prev
}


// called before the leave hook.
function onBeforeLeave(el) {

}

// called when the leave transition starts.
// use this to start the leaving animation.
async function onLeave(el, done) {
  await fadeOut(el)
  // call the done callback to indicate transition end
  // optional if used in combination with CSS
  done()
}

// called when the leave transition has finished and the
// element has been removed from the DOM.
function onAfterLeave(el) {

}


