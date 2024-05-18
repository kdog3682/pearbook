<script setup>
import { Fzf } from "fzf";
import * as utils from "/home/kdog3682/2023/utils.js"
import {vMarked, vFocus} from "../directives/vMarked.js"

const onClick = (index) => {
    selectedIndex.value = index
}
const props = defineProps(['value'])

const list = props.value.map((label, i) => {
    const item = {}
    item.hidden = false
    item.filtered = false
    item.tags = []
    item.id = i + 1
    item.label = label
    return item
})

const fzf = new Fzf(list, {
  selector: (item) => item.label,
})

function focus() {
    input.value.focus()
}
defineExpose({focus})

const entries = ref([])

function checkpoint(entry) {
    return entry.item.hidden == false
}
const onInput = (val, oldval) => {
    const baseMatches = fzf.find(query.value)
    const matches = baseMatches.filter(checkpoint)
    entries.value = matches
}
const emit = defineEmits(['close', 'select'])

const selectedIndex = ref(0)
const onEnter = (index) => {
    emit('select', entries.value[index || 0])
}

const onEscape = () => {
    emit('close')
}

const numTotal = ref(list.length)
const numMatched = computed(() => {
    return numTotal.value - entries.value.length
})
const query = ref('')


function arrowMovement(dir) {
    const size = entries.value.length
    const index = utils.modularIncrementIndex(size, selectedIndex.value, dir)
    selectedIndex.value = index
}

function submit() {
    const el = entries.value[selectedIndex.value]
    emit('select', el.item.label)
}
const keyHandlers = {
    Enter() {
        submit()
    },
    ArrowUp() {
        arrowMovement(-1)
    },
    ArrowDown() {
        arrowMovement(1)
    },
}

const handleKeydown = (e) => {
    const key = e.key
    const fn = keyHandlers[key]
    if (fn) {
        fn()
        e.preventDefault()
    } else {
        console.log({key})
    }
}
const input = ref(null)
const currentGlobalTag = ref("")


</script>
<template lang = 'pug'>

.fzf-container(@keydown.prevent.esc = 'onEscape')

    input(
        tabindex="0"
        v-model="query" 
        v-focus 
        ref = 'input'
        @input="onInput" 
        @keydown.prevent.esc="onEscape"
        @keydown.prevent.enter="onEnter"
        placeholder = "press escape to clear"
    )

    .fzf-list(v-if = "entries.length")
        ul(
            tabindex="0"
            @keydown = 'handleKeydown'
        )
            li(
                :class="{ 'selected': index === selectedIndex }"
                v-for = "entry, index in entries" :key = "entry.item")
                    div.space-between(@click = "onClick(index)")
                        fzf-entry(v-bind = "entry" @select = 'onEnter')

        .entry-count {{numMatched}} / {{numTotal}}

    p(v-else) no results

</template>

<style lang = "stylus">

.message
    color: blue
.entries
    border: 1px solid red
.count
    color: black 
    background: yellow
.flex 
    display: flex
    column-gap: 5px
    flex-wrap: wrap
.tags
    display: flex
    column-gap: 5px
.tag
    border-radius: 50%
    width: fit-content
    height: 10px
    padding: 5px
    border: 1px solid blue
.util-tag
    border: 1px solid green
.selected
    background: yellow
.space-between
    display: flex
    justify-content: space-between
.yellow
    background: yellow
ul 
    max-width: 300px
.label-group
    max-width: 400px
    display: flex
    flex-wrap: wrap
.label-group
    label
        white-space: nowrap   // prevents wrapping
        flex-shrink: 0        // prevents label from shrinking
    input
        flex-grow: 0          // we want the input to grow
        min-width: 100px
    label:hover
        color: blue
    input:hover
        border: 2px solid black
pre
    width: 300px
    overflow: hidden
button
    display: block
.tag-group
    display: flex
    flex-wrap: wrap
    column-gap: 5px

    span
        font-size: 15px
        overflow: hidden
        border-radius: 10px
        background: blue
        padding: 5px
        color: white
        font-weight: bold
        border: 0.5px solid black

.vert
    display: flex
    flex-direction: column
.horo
    display: flex

.filter-selection-item
    border: 0.5px solid black

.filter-component
    border: 0.5px solid black
</style>
