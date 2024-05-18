import { nextTick, ref, shallowRef } from 'vue-demi'
import { pausableWatch, toValue, tryOnMounted } from '@vueuse/shared'
import { getSSRHandler } from '../ssr-handlers'
import { useEventListener } from '../useEventListener'
import { defaultWindow } from '../_configurable'
import { guessSerializerType } from './guess'

export const StorageSerializers = {
  boolean: {
    read: (v) => v === 'true',
    write: (v) => String(v),
  },
  object: {
    read: (v) => JSON.parse(v),
    write: (v) => JSON.stringify(v),
  },
  number: {
    read: (v) => Number.parseFloat(v),
    write: (v) => String(v),
  },
  any: {
    read: (v) => v,
    write: (v) => String(v),
  },
  string: {
    read: (v) => v,
    write: (v) => String(v),
  },
  map: {
    read: (v) => new Map(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v.entries())),
  },
  set: {
    read: (v) => new Set(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v)),
  },
  date: {
    read: (v) => new Date(v),
    write: (v) => v.toISOString(),
  },
}

export const customStorageEventName = 'vueuse-storage'

export function useStorage(key, defaults, storage, options = {}) {
  const {
    flush = 'pre',
    deep = true,
    listenToStorageChanges = true,
    writeDefaults = true,
    mergeDefaults = false,
    shallow,
    window = defaultWindow,
    eventFilter,
    onError = (e) => {
      console.error(e)
    },
    initOnMounted,
  } = options

  const data = (shallow ? shallowRef : ref)(typeof defaults === 'function' ? defaults() : defaults)

  if (!storage) {
    try {
      storage = getSSRHandler('getDefaultStorage', () => defaultWindow?.localStorage)()
    } catch (e) {
      onError(e)
    }
  }

  if (!storage) return data

  const rawInit = toValue(defaults)
  const type = guessSerializerType(rawInit)
  const serializer = options.serializer ?? StorageSerializers[type]

  const { pause: pauseWatch, resume: resumeWatch } = pausableWatch(
    data,
    () => write(data.value),
    { flush, deep, eventFilter },
  )

  if (window && listenToStorageChanges) {
    tryOnMounted(() => {
      useEventListener(window, 'storage', update)
      useEventListener(window, customStorageEventName, updateFromCustomEvent)
      if (initOnMounted) update()
    })
  }

  if (!initOnMounted) update()

  function dispatchWriteEvent(oldValue, newValue) {
    if (window) {
      window.dispatchEvent(new CustomEvent(customStorageEventName, {
        detail: {
          key,
          oldValue,
          newValue,
          storageArea: storage,
        },
      }))
    }
  }

  function write(v) {
    try {
      const oldValue = storage.getItem(key)

      if (v == null) {
        dispatchWriteEvent(oldValue, null)
        storage.removeItem(key)
      } else {
        const serialized = serializer.write(v)
        if (oldValue !== serialized) {
          storage.setItem(key, serialized)
          dispatchWriteEvent(oldValue, serialized)
        }
      }
    } catch (e) {
      onError(e)
    }
  }

  function read(event) {
    const rawValue = event ? event.newValue : storage.getItem(key)

    if (rawValue == null) {
      if (writeDefaults && rawInit != null) storage.setItem(key, serializer.write(rawInit))
      return rawInit
    } else if (!event && mergeDefaults) {
      const value = serializer.read(rawValue)
      if (typeof mergeDefaults === 'function') return mergeDefaults(value, rawInit)
      else if (type === 'object' && !Array.isArray(value)) return { ...rawInit, ...value }
      return value
    } else if (typeof rawValue !== 'string') {
      return rawValue
    } else {
      return serializer.read(rawValue)
    }
  }

  function update(event) {
    if (event && event.storageArea !== storage) return

    if (event && event.key == null) {
      data.value = rawInit
      return
    }

    if (event && event.key !== key) return

    pauseWatch()
    try {
      if (event?.newValue !== serializer.write(data.value)) data.value = read(event)
    } catch (e) {
      onError(e)
    } finally {
      if (event) nextTick(resumeWatch)
      else resumeWatch()
    }
  }

  function updateFromCustomEvent(event) {
    update(event.detail)
  }

  return data
}

