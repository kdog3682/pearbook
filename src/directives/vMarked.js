export {
    vMarked,
    vFocus,
}

const vMarked = (el, binding) => {
    const color = binding.arg
    const mods = binding.modifiers
    const key = "background"
    const fg = "color"
     if (binding.value) {
         el.style[key] = color
         el.style[fg] = "black" 
     } else {
         el.style[key] = null
         el.style[fg] = null
     }
}


const vFocus = {
  mounted: (el) => el.focus()
}
