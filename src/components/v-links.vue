<template lang="pug">

.wrapper
    ul
      li(v-for="link in computedLinks" :key="link.id")
        router-link(:to="link.to") {{ $t(link.label) }}

</template>

<script setup>

const props = defineProps({
  value: {
    type: Array,
    required: true
  },
  account: {
    type: Object,
  }
})

const computedLinks = computed(() => {
  return props.value.filter((link, i) => {
      if (typeof link == 'string') {
          return true
      }
    if (link.condition) {
      if (isFunction(link.condition)) {
        return link.condition(props.account)
      } else if (isObject(link.condition)) {
        return false
      } else {
        return false
      }
    }
    return true
  }).map(computeLinkAddress)
})

const computeLinkAddress = (link) => {
    if (typeof link == 'string') {
        return {
            name: link,
            id: link,
            label: link,
            to: {
                name: link,
            }
        }
    }
  return {
    name: link.name,
    id: link.id || link.name,
    label: link.label || link.name || link.id,
  }
}
</script>
