<template lang = 'pug'>
    h3(v-if = 'label') {{label}}
    v-pre(:value = 'computedValue')
</template>

<script setup>
import * as utils from "/home/kdog3682/2023/utils.js"

const props = defineProps({
  value: {
    type: [Object, Array, String, Number, Boolean, Function, Symbol, null],
    required: true
  },
    label: {
        type: String,
    }
})

const keysets = [
    ["fullPath", "path", "query", "hash", "name", "params"]
]
const computedValue = computed(() => {
    const val = props.value
    if (typeof val == 'object') {
        for (const keyset of keysets) {
            if (keyset.every((x) => x in val)) {
                const store = {}
                keyset.forEach((key) => {
                    store[key] = val[key]
                })
                return store
            }
        }
    }
    return val
})
</script>

