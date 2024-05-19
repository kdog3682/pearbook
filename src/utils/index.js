
export {
    sleep,
    capitalize,
}
let getStartingConfig
const caseRE = /case ['"'](.*?)['"']/g
const bindingRE = /^(?:def|class|const|var|(?:async )?function) ([\w$]+)/
const bindingPrefixRE = /^(?:def|class|const|var|(?:async )?function) /

const prev = console.log
function changedColorLog(...args) {
    const runner = (v) => {
        if (isNumber(v)) {
            return '' + v.toString()
        }
    }
    const computedArgs = walk(args, runner)
    prev(...computedArgs)

}
// console.log = changedColorLog
console.show = noop
console.show = console.log
console.temporary = (x) => blue('temporary', x)
console.logg = (x) => console.log(stringify(x))
console.speak = (...args) => console.log(crayonbox.blue(args[0]), ...args.slice(1))
console.browser = (arg) => browserChalk2(arg, 'blue')
console.loggg = (x) => console.log(prettyStringify(x))
console.sandwich = sandwichLog
console.test = consoleTest
console.test2 = consoleTest2

function consoleTest2(fn, ...args) {
    console.log(fn(console.s, ...args))
}

let errorWrap
let successWrap
let fooga
let Element


if (isDeno()) {
    Deno.debug = {}
}
let s
import * as variables from "./variables.js"
// import * as lorem from "./lorem.js"
// import * as crayonbox from "./crayonbox.js"
import {htmlTags, EMDASH, alphabet} from "./variables.js"


const linebreakRE = /^--------+/m
const commaRE = / *, */
const callableRE = /(\w+)\((.*)\)/

function abrev(s) {
    s = s.replace(/^\W+/, '')
    if (s.length <= 3 || (isWord(s) && s == lowerCase(s))) {
        return s.toLowerCase()
    }

    const regex = /[ \._-]|(\d+|[A-Z]{3,}[a-z]*|[A-Z][a-z]+)/
    const letters = split(s, regex).map((x) => x[0])
    return letters.join('').toLowerCase()
}

function abf(fn, position) {
    let paramCount = countParameters(fn)

    if (paramCount == 1) {
        return ([a,b]) => {
            return fn(b)
        }
    }
    if (paramCount >= 2) {
        if (position == 1) {
            return ([a,b]) => fn(a)
        }
        if (position == 2) {
            return ([a,b]) => fn(b)
        }
        return ([a,b]) => fn(a, b)
    }
    return ([a,b]) => fn(a, b)
    throw new Error()
}

function countParams(fn) {
    if (isFunction(fn)) {
        let a = fn.length
        if (a == 0 && firstLine(fn).includes('...')) {
            return 100
        }
        return a
    }
    return getParameters(fn).length
}
function countParameters(fn) {
    if (firstLine(fn.toString()).includes('...')) {
        return 100
    }
    return getParameters(fn).length
}

function addExtension(f, e = 'js') {
    return f.includes('.') && getExtension(f) ? f : f + '.' + e
}

function addQuotes(s) {
    return /^["']/.test(s) ? s : quotify(s)
}

function antif(f) {
    return function lambda(...args) {
        return !f(...args)
    }
}

function argWrapFactory(fn, ...wrappers) {
    return function lambda(...args) {
        const bargs = args.map((arg, i) => {
            return wrappers[i] ? wrappers[i](arg) : arg
        })
        return fn(...bargs)
    }
}


function assignFreshItem(state, k, v) {
    assert(state)

    if (v == null) {
        return 
    }
    if (state.hasOwnProperty(k)) {
        return 
    }
    state[k] = v
}
function assignFresh(state, obj) {
    if (arguments.length === 3) {
        assignFreshItem(...arguments)
        return state
    }

    if (!obj) {
        return {}
    }
    for (const [k, v] of Object.entries(obj)) {
        if (state[k] == null) {
            state[k] = v
        }
    }
    return state
}

function atFirst(fn, ...args) {
    return function lambda([a,b]) {
        const newValue = fn(a, ...args)
        return [isDefined(newValue) ? newValue : a, b]
    }
}

function atSecond(fn, ...args) {
    if (!fn) {
        return identity 
    }
    const AB = ['k', 'v', 'a', 'b']
    const isAB = AB.includes(getParameters(fn)[1])
    return function lambda([a,b], i) {
        const newValue = isAB ? 
            fn(b, a, i) :
            fn(b, ...args)
        return [a, isDefined(newValue) ? newValue : b]
    }
}

function announce(x) {
    if (x === false) {
        announce.stop = true
        return 
    }
    else if (x === true) {
        announce.stop = false
        return 
    }
    else if (announce.stop) {
        return 
    }
    const skip = ['bind', 'map']
    const matches = getErrorStack()

    const start = matches.findIndex(([caller]) => caller == 'announce')
    const store = []
    for (let i = start + 1; i < matches.length; i++) {
        let [caller, file, line] = matches[i]
        if (skip.includes(caller)) {
            continue
        }
        if (i == start + 1|| i == matches.length - 1) {
            store.push(`[${caller}]:${line}`)
        } else {
            store.push(caller)
        }
    }

    const emojis = {
        RIGHT_ARROW: "\u27a1",
        FIRE_ENGINE: "\ud83d\ude92",
    }
    const value = store.join('  ' + emojis.RIGHT_ARROW + '  ')
    console.log('Announcing', emojis.FIRE_ENGINE, value)
}

function bind(state, ...args) {
    for (const x of args) {
        if (isString(x)) {
            if (x in state) {
                state[x] = state[x].bind(state)
            }
        }
        else if (isObject(x)) {
            Object.assign(state, x)
        }
        else if (isFunction(x)) {
            state[x.name] = x.bind(state)
        }
    }
}
function bindObject(state, object, ignore) {
    if (!exists(object)) {
        return
    }

    function defineGetters(state, getters) {
            if (isObject(getters)) {
                for (let [k, v] of Object.entries(getters)) {
                    defineGetter(state, k, v)
                }
            }
            throw "not done yet"
    }
    function bind(k, v) {
        if (ignore && ignore.includes(k)) {
            return 
        }
        if (k == 'getters') {
            return defineGetters(state, v)
        }
        /* not too sure about this */
        const value = isFunction(v) ?
            v.bind(state) :
            merge(state[k], v)

        state[k] = value
    }

    map(object, bind)
}

function blockQuote(s) {
    return "`" + String(s) + "`"
}

function brackify(name, value, mode) {
    if (arguments.length == 1) {
        return wrap(newlineIndent(arguments[0]), '{}')
    }
    if (value == Array) {
    if (empty(name)) {
        return ''
    }
        return wrap(newlineIndent(arguments[0], Array), '{}')
    }
    if (isArray(name)) {
        return `{\n${name.map((x) => '    ' + x + ',').join('\n')}\n}`
    }
    if (mode == Array && isArray(value)) {
        value = value.map((x) => x + ',')
    }
    return (
        (name ? name.trim() + ' ' : '') +
        wrap(newlineIndent(value), '{}')
    )
}

function breaker(limit, message) {
    if (!limit) limit = 20
    if (breaker.count == null) {
        breaker.count = 0
        breaker.reset = () => {
            breaker.count = 0
        }
    }

    if (++breaker.count == limit) {
        const errorMessage = JSON.stringify(message || 'Breaker Limit')
        throw new Error(errorMessage)
    }
}

function bringToLife(x, scope) {
    if (!isString(x)) {
        return x
    }
    x = smartDedent(x)
    if (/^[\[{]/.test(x)) {
        return eval(parens(x))
    }

    if (/^x/.test(x)) {
        x = '(x) => ' + x
    }
    else if (/^(?:const|var|let)/.test(x)) {
        x = x.replace(/.*? *= */, '')
    }
    else if (/^(?:async )?\w+\(/.test(x)) {
        x = x.replace(/^(?:async )?/, (y) => y + 'function ')
    }
    // else if (/this\./.test(x)) {
        // const [p, b] = match(x, /\((.*?)\).*\n+([^]+?)}\s*$/)
        // return new Function(p, b)
    // }

    try {
        const value = evaluate(parens(x), scope)
        assert(!value.error)
        return value.success
    } catch(e) {
        console.log("ERRORRRRRRRR", e.toString(), {x})
    }
}
function camelize(...args) {
    return camelCase(args[0]) + args.slice(1).map(pascalCase).join('')
}
function camelCase(s) {
    if (arguments.length > 1) {
        return camelize(...arguments)
    }
    if (hasCamelCase(s)) return uncapitalize(s)
    let f = (x) => x.slice(1).toUpperCase()
    s = s.trim().replace(/[- ]\w/g, f)
    if (/^[A-Z]+$/.test(s)) {
        return s
    }
    return uncapitalize(s)
}

function camelToDash(s) {
    const r = /[a-z][A-Z]/g
    const fn = (x) => x[0] + '-' + x[1]
    return s.replace(r, fn).toLowerCase()
}

function capitalize(s) {
    return s.replace(/^['"]?[a-zA-Z]/, (x) => x.toUpperCase())
}

function changeExtension(s, e = 'js') {
    return getExtension(s) ? 
        s.replace(/\w+$/, e) : s + '.' + e
}

function char2n(ch) {
    return ch.charCodeAt(0) - 97
}

function compose(...fns) {
    let length = fns.length
    if (length == 0) {
        return
    }
    if (length == 1) {
        return fns[0]
    }
    return function lambda(...args) {
        let val
        for (let i = fns.length - 1; i >= 0; i--) {
            let f = fns[i]
            if (isArray(f)) {
                val = compose(...f)(...args)
            }
            else if (i == fns.length - 1) {
                val = f(...args)
            } 
            else {
                val = f(val)
            }
        }
        return val
    }
}

function copy(x) {
    if (empty(x)) {
        return 
    }
    return JSON.parse(JSON.stringify(x))
}

function jspy(lang, key) {
    return variables.jspyref[lang][key]
}

function createVariable(name, value, lang = 'javascript') {
    const prefix = jspy(lang, 'prefix')
    const payload = getBindingValueString(value, lang)
    if (isDefined(payload)) {
        return `${prefix}${name} = ${payload}`
    }
}


function curryEnd(f, ...topArgs) {
    return (arg) => f(arg, ...topArgs)
}

function curryStart(fn, ...topArgs) {
    return (...args) => fn(...topArgs, ...args)
}

function dashCase(s, ...args) {
    if (empty(s)) {
        return ''
    }
    if (args.length && !isNumber(args[0])) {
        return [dashCase(s)].concat(args.map((arg) => dashCase(arg))).join('-')
    }
    if ((isUpperCase(s))) {
        return s.toLowerCase()
    }
    if (s.length < 3) return s
    const dashCaseRE = /^[A-Z]{2,}|[a-z][A-Z]|[_.]|\d+$/g
    const hasDashes = s.includes('-')
    return s.replace(dashCaseRE, (x, offset) => {
        if (x == '.' && hasDashes) {
            return x
        }
        if (isNumber(x)) {
            return '-' + x
        }
        if (x.length > 1 && x == x.toUpperCase()) {
            if (x == 'HTML') {
                return x
            }
            return x.slice(0, -1) + '-' + x.slice(-1)
        }
        if (x.length == 1) {
            if (offset == 0 && x == ':') {
                return ':'
            }
            return '-'
        }
        if (x.length == 2) return x[0] + '-' + x[1]
    }).toLowerCase()
}

function depluralize(s) {
    return s.replace(/s$/, '')
}

function dict(a, fn) {
    if (!exists(a)) {
        return {}
    }
    if (isArray(a) && isArray(fn)) {
        return zip(a, fn)
    }
    function assign(acc, a, b) {
        if (isDefined(b)) {
            acc[a] = b
        }
        return acc
    }

    if (!fn && isArray(a) && a.length == 2 && !isArray(a[0])) {
        return {[a[0]]: a[1]}
    }
    if (isObject(arguments[1])) {
        const ref = arguments[1]
        fn = (v, k) => {
            const value = ref[k]
            return isDefined(value) ? value : v
        }
    }
    return entries(a).reduce((acc, item, i) => {
        const [k,v] = isArray(item) ? item : [item, item]
        return assign(acc, k, fn ? fn(v, k, i) : v)
    }, {})
}


function dictf(dict, returnKey) {
    return function lambda(key) {
        const value = dict[key]
        if (hasValue(value)) return value
        return returnKey ? key : null
    }
}

function singleQuote(s) {
    return /^["'`]/.test(s) ? s : `'${s}'`
}

function doubleQuote(s) {
    return /^["'`]/.test(s) ? s : `"${s}"`
}

function dreplace(s, dict, regexTemplate) {
    if (!exists(dict)) {
        return s
    }
    function fix(x) {
        return isCapitalized(x) ? capitalize(dict[x.toLowerCase()]) : dict[x]
    }
    const r = reWrap(dict, regexTemplate)
    // console.log({r})
    const g = hasCaptureGroup(r.source)
        ? (_, x) => fix(x) : (x) => fix(x) + ''

    return s.replace(r, g)
}

function dsearch(s, dict, regexTemplate) {
    const r = reWrap(dict, regexTemplate)
    const m = search(r, s)
    return m ? get(m) : null

    function get(m) {
        if (dict.hasOwnProperty(m)) {
            return dict[m]
        }
        return Object.entries(dict).find(([k, v], i) => {
            return test(k, m, 'i')
        })[1]
    }
}

function evaluate(s, scope) {
    function scopedEvaluator(s, scope) {
        if (scope === true) scope = {}

        const evaluator = Function.call(
            null,
            ...Object.keys(scope),
            'expr',
            "return eval('expr = undefined;' + expr)"
        )
        return evaluator.call(null, ...Object.values(scope), s)
    }

    const withContext = true
    try {
        const value = scope 
            ? scopedEvaluator(s, scope) 
            : withContext
            ? eval(s)
            : (1, eval)(s)

        return {success: value}
    } catch(e) {
        throw new Error(e)
    }
}

function exists(input) {
    if (input == null) return false
    if (isString(input)) return input.trim().length > 0
    if (isArray(input)) return input.filter(exists).length > 0
    if (isObject(input)) return Object.keys(input).length > 0
    return true
}

function extendold(x, items) {
    throw new Error('deprecated i believe', items )
    if (isArray(x)) {
        push(x, items)
    }
}

function find(items, fn, reverse) {
    if (isObject(fn)) {
        const e = entries(fn)
        if (e.length == 1) {
            const [a, b] = e[0]
            return items.find((x) => x[a] === b)
        }
        ndy()
    }
    if (reverse) {
        for (let i = items.length - 1; i >= 0; i--) {
            let item = items[i]
            if (fn(item)) {
                return item
            }
        }
    } else {
        for (let i = 0; i < items.length; i++) {
            let item = items[i]
            if (fn(item)) {
                return item
            }
        }
    }
}

function findIndex(key, items) {
    return isString(key)
        ? items.indexOf(key)
        : isNumber(key) 
        ? key
        : isFunction(key)
        ? items.findIndex(key)
        : isDefined(key) 
        ? items.indexOf(key)
        : 0
}

function findall(r, s) {
    if (isString(r)) {
        r = RegExp(r, 'g')
    } else if (!r.flags.includes('g')) {
        r = RegExp(r.source, r.flags + 'g')
    }

    const store = []
    while (true) {
        const m = r.exec(s)
        if (m) {
            store.push(matchGetter(m, 'findall'))
        } else {
            return store
        }
    }
}

function firstLine(s) {
    return search(/^.+/, s.toString())
}

function fixPath(s) {
    if (/^~/.test(s)) {
        const $HOME_PATH = '/home/kdog3682'
        return s.replace('~', $HOME_PATH)
    }
    if (/^[@#.\/]/.test(s)) {
        return s
    }
    return './' + s
}

function fparse(x, ...args) {
    if (isObject(x)) {
        return runFunctionFromRef(x, ...args)
    }
    if (!isDefined(x)) {
        return args[0]
    }
    return isFunction(x) ? x(...args) : x
}

function ftest(x, s) {
    if (isFunction(x)) {
        return x(s)
    }

    if (s == x) {
        return true
    }

    return x.test(s)
}

function functionGetter(x) {
    if (isFunction(x)) {
        return x
    }
    if (!isNode() && window.hasOwnProperty(x)) {
        return window[x]
    }
    return eval(parens(x))
}


function getChunks(s, r = /\n+(?=[\w.#])/) {
    const trim = (s) => s.trim() || s
    return s.trim().split(r).map(trim)
}
function see(x) {
    console.log(x)
    throw ''
    return x
}

function getConstructorName(s) {
    if (s === undefined) {
        return 'Undefined'
    }
    if (s === null) {
        return 'Null'
    }
    if (typeof s === 'number' && isNaN(s)) {
        return 'NaN'
    }
    return s.constructor && s.constructor.name
}

function getExtension(file) {
    if (empty(file)) {
        return ''
    }
    if (variables.fileExtensions.includes(file)) return file
    return search(/\.(\w+)$/, file)
}

function getLastWord(x) {
    return search(/([a-zA-Z]\w*)\s*$/, x)
}

function getFirst(x) {
    if (isObject(x)) {
        return Object.keys(x)[0]
    }
    if (isString(x)) {
        return x.trimStart().split(' ')[0]
    }
    return x[0]
}
function getFirstWord(x) {
    return x ? search(/[a-zA-Z]\w*/, x) : ''
}

function getIndent(s) {
    if (isNumber(s)) return s
    const match = s.match(/^[\t ]*/g)
    if (!match) return 0
    return match[0].split('').reduce((acc, item, i) => {
        return (acc += item == '\t' ? 4 : 1)
    }, 0)
}

function getLast(arr) {
    return arr[arr.length - 1]
}

function getLongest(arr, measure = len, mode = Number) {
    let currentLength = 0
    let currentItem = null
    let currentIndex
    arr = arr.filter(isDefined)
    if (arr.every(isNumber) && measure == len) {
        measure = identity 
    }
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        let length = parseFloat(measure(item))
        if (length > currentLength) {
            currentLength = length
            currentItem = item
            currentIndex = i
        }
    }
    if (mode == Number) {
        return currentLength
    } 
    if (mode == 'index') {
        return currentIndex
    }
    else {
        return currentItem
    }
}

function getParameters(s) {
    s = s.toString().trim()

    let r = /\((.*?)\)/
    if (/^\(/.test(s)) {
    } else if (/^\w+\({/.test(s)) {
        r = /{(.*?)}/
    } else if (/^.*?=>/.test(s)) {
        r = /= *(.*?) *=>/
    }
    const text = search(r, s)
    if (!text) {
        return []
    }
    const items = split(text, /(\[.*?\])|,/)
    const f = (x) => {
        if (/^\[/.test(x)) {
            return x
        }
        return getFirstWord(x)
    }
    return items.map(f)
}

function getSpaces(s) {
    return search(/^ */, s) || ''
}

function getStackTrace(e) {
    if (!e) e = new Error()
    const s = isString(e) ? e : e.stack
    const lines = lineGetter(s)
    const runner = (s) => {
        if (/node:internal|Promise.all/.test(s)) {
            return 
        }
        if (/caller|consoleLog|getStackTrace/.test(s)) {
            return 
        }
        // if (/at file:\/\/\//.test(s)) {
            // return
        // }
        // console.prev(s)
        const regexes = [
             /at (?:new |Object\.)?([<>a-zA-Z0-9\.]+) \(file:\/\/\/(.*?):(\d+):(\d+)\)/,
             /at file:\/\/\/(.*?):(\d+):(\d+)/,
        ]
        return imatch2(s, regexes)
    }
    const results = mapFilter(lines, runner)
    return results
}

function getCodeWords(s) {
    const ignore = ['as', 'from', 'console', 'log']
    const r = /[$_a-zA-Z][$\w]+/g
    return unique(filter(findall(r, s), ignore))
}

function getWords(s, r = /[a-zA-Z]\w+/g) {
    return s.match(r)
}

function hackReplace(s, r, f) {
    if (isString(f)) {
        let _f = f
        f = () => _f
    }
    return s.replace(r, (_, x) => {
        const newRegex = RegExp(rescape(x), 'g')
        return _.replace(newRegex, f(x))
    })
}

function hasBracket(s) {
    return /[{}]/.test(s)
}

function hasCamelCase(s) {
    return /[a-z][A-Z]/.test(s)
}

function hasCaptureGroup(s) {
    return /[^\\]\((?!\?)/.test(s)
}

function hasEquals(s) {
    return s.includes('=')
}

function hasHtml(s) {
    return test(/^ *<\/?[a-z\/]/m, s)
}

function hasNewline(s) {
    return s && s.toString().trim().includes('\n')
}

function hasNumber(s) {
    return /\d/.test(s)
}

function hasValue(s) {
    if (s === '') return false
    if (s == null) return false
    if (Number.isNaN(s)) return false
    return true
}


function identity(s) {
    return s
}

function indent2(s, spaces = 4) {

    if (!spaces) {
        return s
    }
    const spaceValue = toSpaces(spaces) 

    return isArray(s) 
        ? s.map((s) => s.replace(/^/gm, spaceValue))
        : s.toString().replace(/^/gm, spaceValue)
}

function indent(s, x = 4) {
    if (empty(s)) {
        return ''
    }
    let spaces = isNumber(x) ?
        ' '.repeat(Math.max(0, x)) :
        x.replace(/\t/g, ' '.repeat(4))

    if (!spaces) {
        return s
    }
    return s.replace(/^/gm, spaces)
}
function isJsonParsable2(s) {
    return /^\s*[{\[]/.test(s) && /[\]\}]\s*$/.test(s)
}
function inferLang(s) {
    const dict2 = {
        'extends': 'js',
    }
    if (isJsonParsable2(s)) {
        return 'json'
    }
    if (variables.filetypes.includes(s)) {
        return s
    }
    if (!hasNewline(s) && getExtension(s)) {
        return getExtension(s)
    }
    const dict = {
        '<': 'html',
        async: 'js',
        function: 'js',
        var: 'js',
        const: 'js',
        console: 'js',
        local: 'lua',
        export: 'js',
        from: 'py',
        'import {': 'js',
        let: 'js',
        '//': 'js',
        def: 'py',
        '#': 'py',
        '@': 'py',
        '.': 'css',
    }

    let r = reWrap(dict, /^ *($1)/m)
    let m = search(r, s)
    //console.log({r, m})
    if (m) {
        return dict[m]
    }

    r = reWrap(dict2, / ($1) /)
    m = search(r, s)
    if (m) {
        return dict2[m]
    }
    throw new Error('unable to infer a lang')
}

function isArray(a) {
    return Array.isArray(a)
}

function isBoolean(x) {
    return x === true || x === false
}

function isColor(s) {
    const roygbiv = [
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "indigo",
        "violet",
        "white",
        "black",
        "purple",
        "pink",
    ]
    return isString(s) && roygbiv.includes(s.toLowerCase())
}
function isCapitalized(s) {
    return isString(s) && /^[A-Z]/.test(s)
}

function isClassFunction(x) {
    return isFunction(x) && /^class /.test(String(x))
}

function isDefined(x) {
    return x != null
}

function isFunction(x) {
    return typeof x === 'function'
}

function isJsonParsable(s) {
    return /^[{\[]/.test(s) && /[\]\}],?\s*$/.test(s)
}

function isNestedArray(x) {
    return isArray(x) && isArray(x[0])
}

function isNewLine(s) {
    return /^\n+$/.test(s)
}

function isNull(x) {
    return x == null
}

function isNumber(s) {
    return typeof s == 'number' || isString(s) && /^-?\d+(?:\.\d+)?$/.test(s)
}

function isObject(x) {
    const T = type(x)
    return T == 'Object' || T == 'Module'
}

function isObjectWithKey(x, key) {
    try {
        return typeof x === 'object' && key in x
    } catch(e) {
        return false
    }
}
function isObjectArray(x) {
    return isArray(x) && isObject(x[0])
}

function isObjectLiteral(x) {
    return getConstructorName(x) == 'Object'
}

function isPrimitive(value) {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'symbol' ||
        typeof value === 'boolean'
    )
}

function isRegExp(x) {
    return type(x) == 'RegExp'
}

function isSet(x) {
    return type(x) == 'Set'
}

function isString(s) {
    return typeof s === 'string'
}

function isStringArray(a) {
    return isArray(a) && a.every(isString)
}

function isIdentifier(s) {
    return test(/^[a-zA-Z]\w*$/, s)
}

function isWord(s) {
    return test(/^[a-zA-Z]+$/, s)
}

function joinSpaces(...args) {
    return flat(args).filter(isDefined).join(' ')
}

function join(...args) {
    //console.log(flat(args))
    const items = flat(args).map((item) => {
        if (hasValue(item)) {
            if (isObject(item)) {
                return join(Object.values(item))
            }
            if (!isString(item)) {
                return item.toString()
            }
            return item
        }
        return ''
    })

    let s = ''
    for (let i = 0; i < items.length; i++) {
        let item = items[i]
        s += item.trimEnd()
        if (item.includes('\n')) {
            s += '\n\n'
        }
        else if ((items[i + 1] || '').includes('\n')) {
            s += '\n\n'
        }
        else {
            s += '\n'
        }
    }
    return s
}

function lastLine(s) {
    return search(/.+$/, s.toString().trimEnd())
}

function len(x) {
    if (!exists(x)) {
        return 0
    }
    if (isNumber(x)) {
        return x.toString().replace(/0?[-.]/g, '').length
    }
    return x.length || Object.keys(x).length || 0
}

function lineCount(s) {
    return findall(/\n/, s.trim()).length + 1
}

function lineGetter(x, simple) {
    if (isArray(x)) {
        return x
    }
    if (simple) {
        if (isNumber(simple)) {
            return x.trim().split('\n').slice(simple - 1)
        }
        return x.trim().split('\n')
    }
    return split(smartDedent(x), /\n+|(?:\\[nN] *)+/)
}

function logConsole(f) {
    if (logConsole.consoleLog) {
        return 
    }

    const prev = console.log.bind(console)
    const watcher = new Watcher((x) => x.file + x.lineNumber)
    const store = []
    let timerId
    function consoleLog(arg) {
        clearTimeout(timerId)
        const base = getStackTrace()
        const stack = base.map((m, i) => {
            if (m.length == 4) {
                const [caller, file, lineNumber] = m
                return {
                    caller, file, lineNumber: Number(lineNumber),
                }
            }
            if (m.length == 3) {
                const [file, lineNumber] = m
                return {
                    file, lineNumber: Number(lineNumber),
                }
            }
        }).filter(watcher.isFresh)
        extend(store, stack)
        timerId = setTimeout(() => {
            // prev(store)
            const value = storager(store, (x) => [x.file, x.lineNumber])
            prev(value)
        }, 100)
    }
    logConsole.consoleLog = consoleLog
    logConsole.originalLog = prev
    console.log = consoleLog
    console.prev = prev
}

function map(x, fn) {
    if (x == null) {
        return []
    }
    let t = type(x)
    if (t == 'Number') {
        if (isPrimitive(fn)) {
            if (fn.toString().includes('$1')) {
                return range(1, 1 + x).map((x) => {
                    const value = fn.replace(/\$1/g, x)
                    return value
                })
            }
            else {
                return range(1, 1 + x).map((x) => fn)
            }
        } else {
            if (x > 0) {
                return range(1, 1 + x).map(fn)
            } else {
                return range(1, 1 + Math.abs(x)).map((x) => fn(-x))
            }
        }
    }

    let useAbf = false

    if (t == 'Object' || t == 'Module') {
        x = Object.entries(x)
        useAbf = true
    }
    else if (isNestedArray(x)) {
        useAbf = true
    }
    else if (isPrimitive(x)) {
        return map([x], fn)[0]
    }
    else {
        x = Array.from(x)
    }

    let g = fn

    if (isClassFunction(fn)) {
        g = (x) => new fn(x)
    } else if (isObjectArray(x) && isString(fn)) {
        g = (x) => fparse(x[fn])
    } else if (isRegExp(fn)) {
        g = curryStart(search, fn)
    } else if (isString(fn)) {
        g = curryStart(templater, fn)
        useAbf = false
    }

    return useAbf ? x.map(abf(g)) : x.map(g)
}

function matchGetter(match, mode) {
    if (mode == 'replace') {
        switch (match.length) {
            case 3: return [match[0]]
            case 4: return [match[1]]
            default: return match.slice(1, -2)
        }
    }
    if (mode == 'mget') {
        return match.length == 1
            ? match[0]
            : match.length == 0
            ? ''
            : match
    }

    if (mode == 'searchArray') {
        return !match
            ? null
            : match.length == 1
            ? [match[0]]
            : match.length == 2
            ? [match[1] || match[0]]
            : match.slice(1).filter(exists)
    }


    if (mode == 'search3') {
        /* same as search2 */
        return !match
            ? null
            : match.length == 1
            ? match[0]
            : match.length == 2
            ? isDefined(match[1]) ? match[1] : match[0]
            : match.slice(1).filter(isDefined)
    }

    if (mode == 'search') {
        return !match
            ? null
            : match.length == 1
            ? match[0]
            : match.length == 2
            ? isDefined(match[1]) ? match[1] : match[0]
            : match.slice(1).filter(exists)
    }

    if (mode == 'search2') {
        return !match
            ? null
            : match.length == 1
            ? match[0]
            : match.length == 2
            ? isDefined(match[1]) ? match[1] : match[0]
            : match.slice(1).filter(isDefined)
    }

    if (mode == 'search') {
        return !match
            ? null
            : match.length == 1
            ? match[0]
            : match.length == 2
            ? isDefined(match[1]) ? match[1] : match[0]
            : match.slice(1).filter(exists)
    }

    if (mode == 'findall') {
        return match.length == 1
            ? match[0]
            : smallify(match.slice(1).filter(isDefined))
    }
}

function merge(a, b, delimiter = ' ') {
    if (isObjectArray(a)) {
        return Object.assign({}, ...flat(Array.from(arguments)))
    }
    if (!b) return a
    if (!a) return b

    if (isArray(a)) {
        return flat(Array.from(arguments))
    }

    if (isArray(b)) {
        return [a].concat(b)
    }
    if (isString(a)) {
        return a + delimiter + b
    }
    return b
}

function mergeOnTop(a, b, delimiter) {
    for (let [k, v] of Object.entries(b)) {
        if (v == null) {
            continue
        }
        const value = a.hasOwnProperty(k) ?
            merge(a[k], v, delimiter) : v
        a[k] = value
    }
    return a
}

function mget(r, s, mode) {
    const store = []
    const sliceBy = hasCaptureGroup(r) ? 1 : 0

    function parser(...args) {
        const bargs = 
            args.slice(sliceBy, -2).filter(isDefined).map(trim)
        const value = smallify(bargs)
        store.push(value)
        return ''
    }

    const gFlag = r.flags.includes('g')
    const text = s.replace(r, parser)

    if (mode == Array && !gFlag) {
        if (sliceBy) {
            return [text, smallify(store)]
        } else {
            return [text, store]
        }
    }
    return gFlag ?
        [text, store] :
        [text, matchGetter(store, 'mget')]
}

function n2char(n) {
    let prefix = -1
    while (n > 25) {
        	n -= 26
          prefix += 1
    }

    let ch = runner(n)
    return prefix > -1 ? runner(prefix) + ch : ch

    function runner(n) {
        return String.fromCharCode(n + 97)
    }
}

function newlineIndent(s, mode) {
    if (!s) {
        return ''
    }
    if (isArray(s)) {
        const delimiter = (mode == Array || mode === true)
            ? ',\n' : '\n'
        s = s.join(delimiter) + delimiter.trim()
    }
    return wrap(indent(s.trim()), '\n')
}

function objectToString(x) {
    return stringArgument(x, true)
}

function opposite(s) {
    return variables.OPPOSITES[s]
}

function parens(s) {
    return '(' + s + ')'
}

function parseError(e) {
    const r = /^(\w+): ("?(\w+).+)\n +at (\S+).*?\(file:\/\/(.*?):(\d+):(\d+)\)(?:,\s*<anonymous>:(\d+):(\d+))/
    const m = search(r, e.stack).map(toNumber)
    if (m.length == 9) {
        return {
            //type: m[0],
            [camelCase(m[0])]: true,
            notAFunction: m[0] == 'TypeError' && m[1].includes('function'),
            message: m[1],
            target: m[2],
            caller: m[3],
            file: m[4],
            line: m[5],
            ch: m[6],
            evalLine: m[7],
            evalCh: m[8],
        }
    }
    throw 'ndy'
}

function parseJSON(s) {
    if (!isString(s)) {
        return s
    }
    if (/^[\d/]+$/.test(s)) {
        return Number(s)
    }
    return isJsonParsable(s)
        ? JSON.parse(s) : s
}

function partition(items, n = 2, force = 0) {
    if (!force && isNestedArray(items)) {
        return items
    }
    else if (isObject(items)) {
        const storage = new Storage()
        for (const [k, v] of Object.entries(items)) {
            const value = n(k, v)
            storage.add(value, k, v)
        }
        return storage.values
    }
    else if (isFunction(n)) {
        return partitionWithFunctions(...arguments)
    } else if (isNumber(n)) {
        return partitionWithNumber(items, n)
    } else {
        return partitionByDelimiter(items, n)
    }

    function partitionByDelimiter(items, delimiter) {
        let storage = new PageStorage()
        for (let item of items) {
            if (item === delimiter) {
                storage.new()
            } else {
                storage.add(item)
            }
        }
        return storage.toJSON()
    }
    function partitionWithNumber(items, n) {
        const store = []
        for (let i = 0; i < items.length; i++) {
            if (i % n == 0) {
                store.push([])
            }
            getLast(store).push(items[i])
        }
        return store
    }
    function partitionWithFunctions(items, ...args) {
        const store = range(args.length + 1).map(() => [])

        for (let item of items.filter(exists)) {
            for (let i = 0; i < args.length; i++) {
                let arg = args[i]

                if (ftest(arg, item)) {
                    store[i].push(item)
                    break
                }

                if (i == args.length - 1) {
                    getLast(store).push(item)
                }
            }
        }
        return store
    }
}

function pascalCase(s) {
    s = s.toString()
    if (s == s.toLowerCase()) {
        const ignore = ['my']
        return split(s, /\W/).map((item, i) => {
            return i == 0  && item.length < 3  && !ignore.includes(item) ? item.toUpperCase() : capitalize(item)
        }).join('')
    }
    return capitalize(camelCase(s))
}

function pop(arr, key) {
    if (isObject(arr)) {
        if (key in arr) {
            let value = arr[key]
            delete arr[key]
            return value
        }
        return 
    }

    if (isArray(arr)) {
        const index = findIndex(key, arr)
        return index < 0 ? null : arr.splice(index, 1)[0]
    }
}

function push(items, x, unique) {
    //return push2(items, x)
    if (x == null) {
        return 
    }
    if (isSet(x)) {
        x = Array.from(x)
    }

    let asArray = !isNestedArray(items) && isArray(x)

    if (unique) {
        if (isArray(x)) {
            for (let item of x) {
                if (!items.includes(item)) items.push(item)
            }
        } else if (!items.includes(x)) {
            items.push(x)
            return x
        }
    } else {
        asArray ? items.push(...x) : items.push(x)
        return x
    }
    return items
}

function quotify(s) {
    if (isNumber(s)) {
        return s
    }
    if (hasQuotes(s)) {
        return s
    }
    return "`" + s + "`"
}

function range(...a) {
    let start
    let end
    let increment = 1
    a = a.map(Number)

    if (a.length == 1) {
        start = 0
        end = a[0]
    } else if (a.length == 2) {
        start = a[0]
        end = a[1]
    } else if (a.length == 3) {
        start = a[0]
        end = a[1]
        increment = a[2]
    }
    const store = []
    if (start < end) {
        for (let i = start; i < end; i += increment) {
            store.push(i)
        }
    }
    else {
        increment = Math.abs(increment)
        for (let i = start; i > end; i -= increment) {
            store.push(i)
        }
    }
    return store
}

function isRegExpArray(x) {
    return isArray(x) && isRegExp(x[0])
}
function reWrap(x, r) {

    if (r == String) {
        return getReplacement(x)
    }
    if (r === null) {
        r = /(?:$1)/g
    } else if (!r) {
        r = /\b(?:$1)\b/gi
    }

    function rescapeSymbols(s) {
        if (/\W/.test(s)) {
            return rescape(s)
        }
        return s
    }

    function getReplacement(x) {
        const items = isObject(x) ? Object.keys(x) : x
        const keys = sorted(unique(items.map(rescapeSymbols)))
        return items.every((x) => x.length == 1 && isLetter(x)) 
            ? wrap(keys.join(''), '[]')
            : keys.join('|')
    }

    const source = r.source.replace(/\$1/g, getReplacement(x))
    // console.log(source); throw "source"
    return RegExp(source, r.flags)
}
function proseReplacer(...args) {
    const [s, ref] = args.length == 2 ? args : [null, args[0]]
    const arg = [testf(/^\W+$/), testf(/^\W/), testf(/\W$/)]
    const [symbols, leftSymbols, rightSymbols, words] = partitions(Object.keys(ref).map(rescape), arg)
    // console.log({symbols, leftSymbols, rightSymbols, words})
    let r = ''
    if (exists(words)) {
        r += `\\b(?:${words.join('|')})(?![\'\"a-zA-Z])`
    }
    if (exists(rightSymbols)) {
        if (exists(r)) {
            r += '|'
        }
        r += `\\b(?:${rightSymbols.join('|')})`
    }

    if (exists(leftSymbols)) {
        if (exists(r)) {
            r += '|'
        }
        r += `(?:${leftSymbols})\\b`
    }

    if (exists(symbols)) {
        if (exists(r)) {
            r += '|'
        }
        r += `(?:${symbols.join('|')})`
    }
    // throw r
    const replacer = (x, offset, o) => {
        if (/[.\'\"]/.test(o.charAt(offset - 1))) {
            return x
        }
        if (isCapitalized(x)) {
            return capitalize(ref[x.toLowerCase()])
        }
        return ref[x]
    }

    const regex = RegExp(r, 'g')
    // console.log(regex)
    const replacerFn = (x) => x.replace(regex, replacer)

    if (s == null) {
        return replacerFn
    }
    return replacerFn(s)
}

function reduceToString(x, f, delimiter) {
    if (empty(x)) {
        return ''
    }
    const value = map(x, f).filter(isDefined)
    if (empty(value)) {
        return ''
    }
    if (delimiter == null) return join(value)

    if (delimiter == '\n\n' || delimiter == '\n') {
        return value.join(delimiter) + delimiter
    }
    return value.join(delimiter)
}

function logConsoleRunner() {
    const e = new Error()
    let s = e.stack.replace(/ +at Module.+/s, '')
    s = s.replace(/ at e.ren.+/s, '')
    s = s.replace(/[^]+?logConsoleRunner.+/, '')
    s = smarterIndent(s)
    return blue(s)
}
function removeComments(s) {
    const r = /^ *(<!--[^]*?-->|\/\/|\/\*[^]*?\*\/).*\n*(?: *\n)*/gm
    return s.replace(r, '')
}

function removeExtension(s) {
    if (!s) {
        return ''
    }
    return s.replace(/\.\w+$/, '')
}

function doUntil(fn, amount = 1, threshold = 1000) {
    let store = []
    let totalCount = 0
    let index = 0
    while (totalCount++ < threshold) {
        //console.log({totalCount, index})
      let value = fn(index, totalCount)
      if (value == null) {
          continue
      }
      if (value === false) {
          return store
      }

      index++
      if (amount == 1) {
          return value
      }
      store.push(value)
      if (store.length == amount) {
          return store
      }
    }
    return null
}

function repeatUntil(fn, checkpoint, ...args) {
    for (let i = 0; i < 100; i++) {
        const value = fn(...args)
        if (checkpoint(value)) {
            return value
        }
    }
}

function arrayToDict(a, mode) {
    if (!isArray(a)) {
        return a
    }
    return a.reduce((acc, item, i) => {
        if (mode === false || mode === true) {
            acc[item] = mode
        } 

        else if (isFunction(mode)) {
            acc[mode(item, i)] = item
        } 

        else if (mode == Number) {
            acc[i + 1] = item
        } 
        else if (typeof item == 'object') {
            if (mode in item) {
                acc[item[mode]] = item
            }
            else if (item.key) {
                acc[item.key] = item
            }
            else if (item.name) {
                acc[item.name] = item
            }
        }
        else {
            acc[n2char(i)] = item
        }
        return acc
    }, {})
}

function rescape(x, delimiters) {
    if (isRegExp(x)) {
        return x
    }
    if (x.includes('(?:')) {
        return x
    }

    const rescapeRE = isString(delimiters)
        ? RegExp(
              `[${delimiters.replace(/[\[\]]/g, '\\$&')}]`,
              'g'
          )
        : /[.\\[*+?()|^${}\[\]\/]/g
    return x.replace(rescapeRE, '\\$&')
}

function reverse(s) {
    if (isArray(s)) {
        return s.slice().reverse()
    }
    if (isObject(s)) {
        return zip(Object.values(s), Object.keys(s))
    }
    if (hasEquals(s)) {
        return split(s, /=/).reverse().join(' = ')
    }
    return split(s).reverse().join('')
}

function search2(regex, s, flags = '') {
    if (isString(regex)) regex = RegExp(regex, flags)
    return matchGetter(s.match(regex), 'search2')
}

function search(regex, s, flags = '') {
    if (isString(regex)) regex = RegExp(regex, flags)
    return matchGetter(s.toString().match(regex), 'search')
}

function searchf(x, mode) {
    if (isFunction(x)) {
        if (mode == Array) {
            return function lambda(s) {
                const value = x(s)
                if (value) {
                    if (value == true) {
                        return [s]
                    }
                    return toArray(value)
                }
                return null
            }
        }
        return x
    }
    if (isString(x)) {
        x = RegExp(x)
    }
    const fn = (s) => {
        const value = search(x, s)
        return value
    }
    return mode == Array ? 
        wrapf(fn, toArray, 'after') : fn
}

function secondLine(s) {
    return search(/\n(.+)/, s) 
}

function shared(a, b) {
    if (isObject(b)) {
        b = Object.keys(b)
    }
    return a.filter((x) => b.includes(x))
}

function sleep(delay = 3000) {
    return new Promise((r) => setTimeout(r, Number(delay)))
}

function smallify(a) {
    return a.length == 1 ? a[0] : a
}

function smartDedent(s) {
    if (/^\S/.test(s)) return s
    s = stringBreaker(s)
    s = removeComments(s)
    s = s.replace(/^ *\n*|\n *$/g, '', s)
    const spaces = search(/^ *(?=\S)/m, s)
    const secondLineSpaces = search(/\n *(?=\S)/, s)
    const spaceValue = (
        !spaces &&
        secondLineSpaces &&
        secondLineSpaces.length > 4
    ) ? secondLineSpaces.slice(5) : spaces

    const regex = RegExp('^' + spaces, 'gm')
    return s.replace(regex, '').trim()
}

function snakeCase(s) {
    if (s.includes(' ')) {
        return s.replace(/ /g, '-').toLowerCase()
    }
    return s
        .replace(/[a-z][A-Z]/g, (x) => x[0] + '-' + x[1])
        .toLowerCase()
}

function kebabCase(s) {
    return s
        .replace(/[a-z][A-Z]/g, (x) => x[0] + '-' + x[1])
        .toLowerCase()
}

function sorted(items, fn, reverse) {
    const defaultObjectSort = (s) => s[1]
    const defaultNumberSort = (s) => s
    const defaultNumericEntriesSort = (s) => s[0]
    let asObject = false
    let asDouble = isObject(items) || isNestedArray(items)

    if (isObject(items)) {
        items = Object.entries(items)
        asObject = true
    }

    if (!fn) {
        fn = asDouble
            ? (
                isNumber(items[0][0]) ? 
                    defaultNumericEntriesSort : 
                    defaultObjectSort
              )
            : isNumber(items[0])
            ? defaultNumberSort
            : char2n
    } else if (asDouble) {
        fn = abf(fn)
    }

    function runner(a, b) {
        let A = fn(a)
        let B = fn(b)
        if (isNumber(A)) {
            let C = Number(A)
            let D = Number(B)
            return reverse ? D - C : C - D
        } else {
            if (A == B) {
                return 0
            }
            if (reverse) {
                if (A < B) {
                    return 1
                } else {
                    return -1
                }
            } else {
                if (A < B) {
                    return -1
                } else {
                    return 1
                }
            }
        }
    }

    items.sort(runner)
    return asObject ? dict(items) : items
}

function split(s, r = / +/) {
    if (!s) {
        return ''
    }
    if (isNumber(s) && arguments.length == 1) {
        return s.toString().split('').map(toNumber)
    }

    const runner = (s, r) => {
        return s.trim().split(r).map(trim).filter(exists)
    }

    switch (type(r)) {
        case 'RegExp':
            return runner(s, r)
        case 'String':
            return runner(s, must(regexes, r))
        case 'Number':
            return [s.slice(0, r), s.slice(r)]
    }
}

function splitOnce(s, delimiter) {
    if (!s) {
        return ['', '']
    }
    if (isNumber(delimiter)) {
        return [s.slice(0, delimiter), s.slice(delimiter)]
    }
    if (isArray(s)) {
        return [s[0], s.slice(1)]
    }
    if (!delimiter) {
        if (s.includes('\n')) {
            delimiter = /\n+/
        } else {
            delimiter = /\s+/
        }
    }

    delimiter = isRegExp(delimiter) ?
        delimiter.source : wrap(delimiter.trim(), ' *')

    const r = RegExp('^(.*?)' + delimiter + '([^]+)$')
    return (search(r, s.trim()) || [s, '']).map(trim)
}

function stringArgument(x, asLiteral) {
    function parseObj(obj) {
        const f = (k, v) => {
            if (asLiteral && isFunction(v)) {
                if (bringToLife(v.name)) {
                    return indent(doubleQuote(k) + ': ' + v.name)
                }
                return indent(parse(v, 'Object'))
            } else {
                const payload = parse(v, 'Object')
                return indent(doubleQuote(k) + ': ' + payload)
            }
        }
        const value = reduceToString(obj, f, ',\n')
        return wrap(value, '{\n\n}')
    }

    function parseArr(arr) {
        const f = (item) => parse(item, 'Array')
        const value = reduceToString(arr, f, ',\n')
        return wrap(indent(value), '[\n\n]')
    }

    function parseString(s) {
        if (test(/^[a-z].*?[A-Z]/, s)) return s
        if (hasNewline(s)) {
            s = s.replace(/\n/g, '\\n')
        }
        return doubleQuote(s)
    }

    function dictFunctionEntry(s) {
        s = s.toString()
        let spaces = getSpaces(secondLine(s)).slice(4)
        let r = RegExp('\n' + spaces, 'g')
        return s.toString()
            .replace('function ', '')
            .replace(r, '\n')
    }

    function parse(s, parentType) {
        if (isBoolean(s)) {
            return true.toString()
        }

        if (isObject(s)) {
            return parseObj(s)
        }

        if (isFunction(s)) {
            if (parentType == 'Object' && asLiteral) {
                return dictFunctionEntry(s)
            }
            return s.name
        }

        if (isArray(s)) {
            return parseArr(s)
        }

        if (s == null) return 'null'
        if (s == undefined) return 'undefined'

        if (isNumber(s)) {
            return s.toString()
        }

        if (s == '') return "''"

        return parseString(s)
    }

    return parse(x)
}

function stringBreaker(s) {
    const r = /(?:\n *|^)(?:e|-{10,}) *\n/
    if (r.test(s)) {
        return getLast(s.split(r))
    }

    if (/\bender\b/.test(s)) {
        return getLast(s.split(/\bender.*/))
        //return s.match(/^ *ender.+/msi)[0]
    }
    return s.replace(/^\s*breaker.*/msi, '')
}

function stringify(s, birth) {
    return !exists(s)
        ? ''
        : isPrimitive(s)
        ? s
        : isFunction(s)
        ? s.toString()
        : isRegExp(s)
        ? s.toString()
        : JSON.stringify(s, birth, 2)
}

function tail(s) {
    return getLast(s.replace(/\/+$/, '').split('/'))
}

function datestamp() {
    const date = new Date()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const M = month.toString().padStart(2, 0)
    const D = day.toString().padStart(2, 0)
    const Y = date.getFullYear()
    return `${M}-${D}-${Y}`
}


function test(regex, s, flags = '') {
    if (hasValue(s)) {
        if (isString(regex)) {
            regex = RegExp(regex, flags)
        }
        return regex.test(s)
    }
}

function equalf(x, anti) {
    switch (type(x)) {
        case 'Null':
        case 'Undefined':
            return anti ? no : yes
        case 'Array':
            return anti ? (y) => !x.includes(y) : (y) => x.includes(y)
        case 'Function':
            return x
        case 'RegExp':
            return anti ? (y) => !x.test(y) : (y) => x.test(y)
        default:
            return anti ? (y) => x !== y : (y) => x === y
    }
}


function testf(r, anti, flags = '') {
    if (!r) {
        return 
    }
    if (isFunction(r)) {
        return r
    }

    if (isString(r)) {
        r = RegExp(r, flags)
    }
    
    const test = (x) => {
        return r.test(x.toString())
    }
    return anti ? antif(test) : test
}

function toArray(val) {
    if (val == null) {
        return 
    }
    if (isArray(val)) {
        return val
    }
    if (isSet(val)) {
        return Array.from(val)
    }
    return [val]
}

function totalOverlap(a, b) {
    return a.every((x) => b.includes(x))
}

function transformObject(obj, f) {
    if (isObject(f)) {
        return Object.entries(obj).reduce((acc, [k,v], i) => {
            if (f.hasOwnProperty(k)) {
                const value = f[k](v, i)
                if (isDefined(value)) acc[k] = value
            } else {
                acc[k] = v
            }
            return acc
        }, {})
    }

    const usekv = /k, *v|a, *b/.test(firstLine(f))
    return Object.entries(obj).reduce((acc, [k,v], i) => {
        const value = usekv ? f(k, v, i) : f(v, i)
        if (isDefined(value)) acc[k] = value
        return acc
    }, {})
}

function trim(s) {
    return s == null ? '' : s.toString().trim()
}


function uncapitalize(s) {
    return s.replace(/\w/, (x) => x.toLowerCase())
}

function union(a, b) {
    return new Set(...a, ...b)
}
function unique(a, b) {
    if (isString(a)) {
        return unique(a.split(''))
    }
    if (b) {
        const ignore = Array.from(b)
        const f = (x) => isPrimitive(b) ? x != b : !ignore.includes(x)
        a = a.filter(f)
    }
    return Array.from(new Set(a))
}

function unzip(x) {
    if (isObject(x)) {
        x = Object.entries(x)
    }
    return x.reduce(
        (acc, [a, b], i) => {
            acc[0].push(a)
            acc[1].push(b)
            return acc
        },
        [[], []]
    )
}

function notNull(s) {
    return s !== null
}
function walk(x, fn, {deleteOnNull = false, depthLimit = 7, checkpoint = null} = {}) {
    function walker(x, depth, a) {
        if (depth > depthLimit) {
            return evaluator(x)
        }
        if (isArray(x)) {
            return filter(x.map((y) => walker(y, depth + 1)), notNull)
        }

        if (isObjectLiteral(x)) {
            let touched
            const o = Object.entries(x).reduce((acc, [a, b]) => {
                const newValue = walker(b, depth + 1, a)
                if (newValue === null) {
                    if (deleteOnNull) {
                    }
                    return acc
                }
                touched = true
                acc[a] = newValue
                return acc
            }, {})
            if (touched) {
                return o
            }
            return null
        }
        if (checkpoint && !checkpoint(x)) {
            return null
        }
        return evaluator(x, depth, a)
    }

    function evaluator(x, depth, a) {
        const value = fn(x, depth, a)
        if (value === null) {
            return null
        }
        return value == null ? x : value
    }
    return walker(x, 0)
}

function wrap(s, delimiter = '\n') {
    if (isArray(delimiter)) return `[${s}]`
    if (delimiter == Array) return `[${s}]`
    if (delimiter == '[]') return `[${s}]`
    if (delimiter == '{}') return `{${s}}`
    if (delimiter == '{ }') return `{ ${s} }`
    if (delimiter == '{\n\n}') return `{\n${s}\n}`
    if (delimiter == ' {\n\n}') return ` {\n${s}\n}`
    if (delimiter == '[\n\n]') return `[\n${s}\n]`
    if (delimiter == '()') return `(${s})`
    if (delimiter == '(?:)') return `(?:${s})`
    if (delimiter == '\\b') return `\\b${s}\\b`
    if (delimiter == '{{}}') return `{{${s}}}`
    if (delimiter == '{  }') return `{ ${s} }`
    return delimiter + s.toString() + delimiter
}

function wrapfo(fn, o) {
    let lambda
    if (o.before) {
        lambda = function before(...args) {
            o.before()
            return fn.call(this, ...args)
        }
    }
    if (o.after) {
        if (lambda) {
            return (...args) => o.after(lambda(...args))
        } else {
            return (...args) => o.after(fn(...args))
        }
    }
}
function wrapf(fn, decorator, mode) {
    if (isObject(decorator)) {
        return wrapfo(fn, decorator)
    }
    if (mode == 'before') {
        return function lambda(...args) {
            return fn(decorator(...args))
        }
    }
    else {
        return function lambda(...args) {
            return decorator(fn(...args))
        }
    }
}

function yes() {
    return true
}

function zip(a, b = null, mode) {
    if (isNestedArray(a)) {
        b = a[1]
        a = a[0]
    }

    if (mode == Array) {
        const store = []
        for (let i = 0; i < a.length; i++) {
            store.push([a[i], b[i]])
        }
        return store
    }
    const store = {}
    for (let i = 0; i < a.length; i++) {
        store[a[i]] = b[i]
    }
    return store
}

class Cache {
    constructor(fn) {
        this.fn = fn || identity 
        this.reset()
    }
    assign(key, value) {
        const o = this.get(key)
        if (o && isAssignable(o)) {
            Object.assign(o, value)
        }
    }
    has(x) {
        if (x == null) {
            return 
        }
        return this.store.hasOwnProperty(this.fn(x))
    }
    get(x, fallback) {
        let value = this.store[this.fn(x)]
        if (hasValue(value)) {
            return value
        }
        else if (fallback) {
            return this.set(x, fparse(fallback, x))
        }
    }
    set(x, y) {
        if (y == null) return 
        this.store[this.fn(x)] = y
        return y
    }
    reset() {
        this.store = {}
    }
    get values() { return Object.values(this.store) }
    get keys() { return Object.keys(this.store) }
    get entries() { return Object.entries(this.store) }
}

class Storage {
    remove(key) {
        pop2(this.store, key)
    }
    toArray(...keys) {
        keys = keys.length ? keys : this.keys
        return keys.map((key) => [key, this.get(key)])
    }

 static partitionByFunction(items, fn) {
    const storage = new Storage()
    items.forEach((item) => {
        storage.add(fn(item), item)
    })
    return storage
 }


 static partitionByKey(items, key) {
    const storage = new Storage()
    items.forEach((item) => {
        storage.add(item[key], item)
    })
    return storage
    }
    getValues(...keys) {
        return keys.map((key) => this.get(key))
    }
    [Symbol.iterator]() {
        this.items = this.entries
        this.index = 0
        return this
    }
    next() {
        const value = this.items[this.index++]
        const done = this.index > this.items.length
        return { value, done, }
    }
    constructor(config) {
        /* although i want to change the word config to options ... this simple change will have unexpected downstream effects - u dont know what other functions use this */
        this.store = {}
        this.config = {
            valueMustExist: false,
            onlyUniqueValues: false,
            mergeArrayValues: false,
            addObjectAsObject: false,
            ...(config || {})
        }
        this.popped = {}
    }

    delete(k) {
        delete this.store[k]
    }

    get empty() {
        return this.keys.length == 0
    }
    get value() { return this.store }
    get keys() { return Object.keys(this.store) }
    get values() { return Object.values(this.store) }
    get entries() { return Object.entries(this.store) }
    has(k, v) {
        let a = this.store[k]
        if (!a) return
        if (isDefined(v)) {
            return isObject(a) ? a[v] : a.includes(v)
        }
        return true
    }
    toJSON() { return this.store }

    get(...args) {
        return dictGetter(this.store, ...args)
    }
    forEach(fn) {
        this.entries.forEach(abf(fn))
    }
    pop(k, v) {
        if (v) {
            return pop(this.store[k], v)
        } else {
            const value = pop(this.store, k)
            this.popped[k] = value
            return value
        }
    }

    filter(k, fn) {
        const filtered = []
        const g = (item) => {
            if (!fn(item)) {
                filtered.push(item)
                return false
            }
            return true
        }
        this.store[k] = this.get(k).filter(g)
        this.popped[k] = filtered
        return filtered
    }
    map(k, fn) {
        if (fn) {
            this.store[k] = this.get(k).map(fn)
        } else {
            this.keys.forEach((key, i) => {
                this.store[key] = k(this.store[key])
            })
        }
        return this
    }
    flat() {
        return this.map(flat)
    }
    sortSelf() {
        const fn = (k, v) => k
        this.store = sort(this.store, fn)
        return this
    }
    sortEach(fn = identity, reverse = false) {
        for (const [k, v] of this.entries) {
            this.store[k] = sort(v, fn, reverse)
        }
        return this
    }

    sortAll(fn, reverse) {
        for (let [k, v] of Object.entries(this)) {
            this.store[k] = sorted(v, fn, reverse)
        }
    }
    sort(k, fn, reverse) {
        if (arguments.length == 0) {
            return this.sortSelf()
        }
        if (isArray(k)) {
            this.store = reduce(k, (key) => {
                if (this.has(key)) {
                    return [key, this.get(key)]
                }
            })
        }
        else if (fn) {
            this.store[k] = sorted(this.get(k), fn, reverse)
        } else if (isFunction(k)) {
            this.store = sorted(this.store, k, reverse)
        } else {
            this.store = sorted(this.store)
        }
        return this
    }
    /** s **/

    set(k, v) {
        this.store[k] = v
    }

    add(...a) {
        if (this.config.addObjectAsObject && isObject(a[1])) {
            if (this.config.valueMustExist && !exists(a[1])) {
                return
            }
            if (!this.store[a[0]]) this.store[a[0]] = {}
            mergeOnTop(this.store[a[0]], a[1])
        }
        else if (a.length == 2) {
            return this.addArray(...a)
        }
        else {
            return this.addObject(...a)
        }
    }

    addObject(parent, child, value) {
        if (this.config.valueMustExist && !exists(value)) {
            return
        }
        if (!this.store[parent]) this.store[parent] = {}

        if (isArray(value) && this.config.mergeArrayValues && isArray(this.store[parent][child])) {
            if (this.config.onlyUniqueValues) {
                const ref = this.store[parent][child]
                for (const arg of value) {
                    if (!ref.includes(arg)) {
                        ref.push(arg)
                    }
                }
            } else {
                this.store[parent][child].push(...value)
            }
        } else {
            this.store[parent][child] = value
        }
    }

    addArray(k, v) {
        if (this.config.valueMustExist && !exists(v)) {
            return
        }

        if (this.config.onlyUniqueValues && this.has(k, v)) {
            return
        }

        if (isArray(v)) {
            if (this.has(k)) {
                if (this.config.mergeArrayValues) {
                    this.store[k].push(...v)
                } else {
                    this.store[k].push(v)
                }
            }
            else {
                if (this.config.mergeArrayValues) {
                    this.store[k] = v
                }
                else {
                    this.store[k] = [v]
                }
            }
        } else {
            if (this.has(k)) {
                this.store[k].push(v)
            } else {
                this.store[k] = [v]
            }
        }
    }
}

class Watcher {
    static create(...args) {
        const watcher = new Watcher(...args)
        const seen = (x) => {
            return !watcher.isFresh(x)
        }
        return seen
    }
    constructor(fn) {
        this.fn = fn || identity
        this.reset()
        this.isFresh = this.isFresh.bind(this)
    }
    reset() {
        this.seen = new Set()
    }
    toJSON() {
        return Array.from(this.seen)
    }
    isFresh(key) {
        let value = this.fn(key)
        if (this.seen.has(value)) {
            return false
        }
        this.seen.add(value)
        return true
    }
    has(key) {
        return this.seen.has(this.fn(key))
    }
    add(key) {
        this.seen.add(this.fn(key))
    }
}

function hasDollar(s) {
    return /\$/.test(s)
}

function backspace(s) {
    return s ? s.slice(0, -1) : ''
}

function hasSpaces(s) {
    return s.includes(' ')
}

function hasComma(s) {
    return s.includes(',')
}

class PageStorage {
    get size() {
        return len(getLast(this.store))
    }
    constructor(config = {}) {
        this.store = [[]]
        this.config = config
    }
    new(x) {
        this.store.push([])
        if (!this.config.ignoreDelimiter) {
            this.add(x)
        }
    }
    add(x) {
        if (hasValue(x)) getLast(this.store).push(x)
    }
    toJSON() {
        return this.store
    }
}

function isEven(n) {
    return n % 2 == 0
}

function isOdd(n) {
    return n % 2 == 1
}

function classMixin(Base, ...mixins) {
    for (let mixin of mixins) {
        for (let [k, v] of Object.entries(mixin)) {
            if (isFunction(v)) {
                if (isClassFunction(Base)) {
                    Base.prototype[k] = v
                } else if (isClass(Base)) {
                    Base[k] = v.bind(Base)
                }
            } else {
                Object.defineProperty(Base.prototype, k, v)
            }
        }
    }
}

function isClass(x) {
    const natives = [
        'String',
        'Function',
        'Number',
        'Object',
        'Array',
        'Set',
        'Promise',
        'null',
    ]
    return x && !natives.includes(x.constructor.name)
}

function keyArrayToObject(a, key = 'key') {
    return a.reduce((acc, item, i) => {
        acc[item[key]] = item
        delete item[key]
        return acc
    }, {})
}

function isQuote(s) {
    return /^['"].*?['"]$/.test(s)
    const quotes = ['"', '\'']
    return quotes.includes(s[0]) && quotes.includes(getLast(s))
}

function toArgument(s) {
    if (isNumber(s)) return toNumber(s)
    if (s == 'false') return false
    if (s == 'undefined') return undefined
    if (s == 'true') return true
    if (s == 'null') return null
    if (s == 'none') return null
    if (s == 'None') return null
    if (s == 'Number') return Number
    if (s == 'String') return String

    if (isQuote(s)) {
        console.log({quote: s})
        return s.slice(1, -1)
    }

    if (isRegExpString(s)) {
        try {
            return toRegExp(s)
        } catch(e) {
            return s
        }
    }

    if (isJsonParsable(s)) {
        try {
            return lazyJson(s)
        } catch(e) {
            return s
        }
    }
    if (isNewExpression(s)) {
        try {
            return eval(parens(s))
        } catch(e) {
            return s
        }
    }
    return s
}

function evalErrorHandler(e, s) {
    const m = parseError(e)
    if (m.referenceError) {
        try {
            return eval(parens(s.replace(/[a-zA-Z]\w*/g, quotify)))
        } catch(e) {
            const error = parseError(e)
            if (error.notAFunction) {
                throw "not done yet"
                return {__callable__: error.target}
            }
        }
    }
}

function splitMapJoin(s, delimiter, fn, joinDelimiter) {
    if (arguments.length == 3) {
        joinDelimiter = delimiter
    }
    return split(s, delimiter).map(fn).join(joinDelimiter)
}

function capitalizeTitle(s) {
    const fillerWords = [
        "from",
        "vs.",
        "the",
        "there",
        "any",
        "out",
    ]
    const fn = (x, i) => {
        if (i == 0) return capitalize(x)
        if (isWord(x) && x.length <= 2) return x
        return fillerWords.includes(x) ? x : capitalize(x)
    }
    return splitMapJoin(s, " ", fn).replace(/\. *$/, '')
}

function toNumber(val) {
    return isNumber(val) ? Number(val) : val
}

function isCallable(s) {
    return /^[$\w]+(?:\.\w+)?\(/.test(s.toString())
}

function swap(a, b) {
    if (isDefined(b)) {
        return [b, a]
    }
    return [a[1], a[0]]
}

function fixUrl(s) {
    let suffix = /^[a-zA-Z]+$/.test(s) ? '.com' : ''
    if (s.includes('kdog3682')) return 'file:///' + s
    s = s.replace(/view-source:/, '')
    if (!/^https?/.test(s)) s = 'https://' + s
    return s + suffix
}

function isLast(i, a) {
    return i == a.length - 1
}

function lowerCase(s) {
    return s.toLowerCase()
}

function upperCase(s) {
    return s.toUpperCase()
}

class UniqueStorage {
    constructor(conditions, {
        transformSeen = identity,
        transformCheckpoint = identity,
    } = {}) {
        this.checkpoint = checkpointf(conditions)
        this.transformSeen = transformSeen
        this.transformCheckpoint = transformCheckpoint
        this.reset()
    }

    reset() {
        this.store = []
    }
    toJSON() {
        return this.store
    }

    add(fn, ...args) {
        let value
        let count = 0
        while (++count < 50) {
            value = fn(...args)
            let seenValue = this.transformSeen(value)

            if (this.store.includes(seenValue)) {
                continue
            }

            let checkpointValue =
                this.transformCheckpoint(value)

            if (!isDefined(checkpointValue)) {
                continue
            }

            if (!this.checkpoint(checkpointValue)) {
                continue
            }

            this.store.push(seenValue)
            return value
        }
        return null
    }
}

function edit(x, ...args) {
    if (isObject(x)) {
        if (args.length == 2) {
            if (args[1] == null) {
                return x
            }
            const value = x[args[0]]
            if (value == null) {
                return x
            }
            const newValue = args[1](value, x)
            if (isDefined(newValue)) {
                x[args[0]] = newValue
            }
            return x
        }
        else if (args.length == 1) {
            if (isFunction(args[0])) {
                const fn = args[0]
                const once = fn.length === 1
                for (let [k, v] of Object.entries(x)) {
                    const newValue = once ? fn(v) : fn(k, v)
                    if (isDefined(newValue)) {
                        x[k] = newValue
                    }
                }
                return x
            }
        }
    }
    if (isObjectArray(x)) {
        let [y, fn, ...bargs] = args
        if (isString(y)) {
            let key = y
            return x.map((item, i) => {
                item[key] = fn(item[key], ...bargs)
                return item
            })
        }
        if (isObject(y)) {
            const f = (k, v, index) => {
                if (isDefined(y[k])) {
                    const value = y[k](k, v, index)
                    if (value) {
                        return value
                    }
                    return v
                }
                return v
            }
            return x.map((item, i) => {
                return transformObject(item, f) 
            })
        }
    }
    if (isArray(x)) {
        const items = x
        for (let i = 0; i < items.length; i++) {
            let item = items[i]
            let newValue = args[0](item)
            if (isDefined(newValue)) {
                items[i] = newValue
            }
        }
        return items
    }
}

function addProperty(o, ...args) {
    function addPropertyLambdaArray(o, key, value) {
        if (!o.hasOwnProperty(key)) {
            o[key] = []
        }
        isArray(value)
            ? o[key].push(...value)
            : o[key].push(value)

        return o
    }

    function addPropertyLambda2(o, key, value) {
        if (o[key]) {
            if (isObject(value)) {
                Object.assign(o[key], value)
            } else if (isArray(value)) {
                if (isArray(o[key])) {
                    o[key] = [...o[key], ...value]
                } else if (isObject(o[key])) {
                    mergeToObject(o[key], value)
                }
            } else {
                if (isArray(o[key])) {
                    push(o[key], value)
                } else {
                    o[key] = [o[key], value]
                }
            }
            return o
        }

        o[key] = value
        return o
    }

    function addPropertyLambda3(o, parentKey, key, value) {
        if (!o.hasOwnProperty(parentKey)) {
            o[parentKey] = {}
        }
        o[parentKey][key] = value
        return o
    }

    /*---------------------------------*/
    if (args.length == 1) {
        let x = args[0]
        if (isArray(x)) {
            addPropertyLambdaArray(o, ...x)
        } else if (isObject(x)) {
            for (let [k, v] of Object.entries(x)) {
                addPropertyLambda2(o, k, v)
                /* adds without an array */
            }
        }
    }

    else if (args.length == 2) {
        //else {
            return addPropertyLambda2(o, ...args)
        //}
    } else if (args.length == 3) {
        if (args[2] == Array) {
            return addPropertyLambdaArray(o, ...args)
        }
        return addPropertyLambda3(o, ...args)
    }
    /*---------------------------------*/
}

function interweave(x, d, count) {
    if (isString(x)) {
        let s = x
        for (let i = 0; i < count - 1; i++) {
            s += wrap(d.trim(), ' ')
            s += x
        }
        return s
    }
    if (isArray(x)) {
        let s = ''
        for (let i = 0; i < x.length; i++) {
            if (d[i]) {
                if (isString(d[i])) {
                    s += x[i]
                    s += wrap(d[i], ' ')
                } else if (isFunction(d[i])) {
                    s += d[i](x[i], x[i + 1])
                    i += 1
                }
            } else {
                s += x[i]
            }
        }
        return s
    }
}

function curry(...topArgs) {
    if (topArgs.length <= 2) {
        return curryEnd(...topArgs)
    }
    if (isFunction(getLast(topArgs))) {
        const fn = topArgs.pop()
        return function curryStart(...args) {
            return fn(...topArgs, ...args)
        }
    } else {
        const fn = topArgs.shift()
        return function curryEnd(...args) {
            return fn(...args, ...topArgs)
        }
    }
}

function splitCamel(x) {
    return x
        .trim()
        .replace(
            /[a-z][A-Z]/g,
            (s) => `${s[0]} ${s[1]}`
        )
        .split(/[ -]/)
}

function rep(a, b, c) {
    /** magic **/
    function replace(s, r, fn) {
        const g = (...a) => {
            const args = matchGetter(a, 'replace')
            return fn(...args)
        }
        return s.toString().replace(compileRE(r), g)
    }

    if (isObject(b)) {
        return dreplace(a, b, c)
    }
    else {
        return replace(a, b, c)
    }
}

function assignMethods(state, source, wrappers) {
    map(wrappers, (k, v) => {
        const bound = source[k].bind(source)
        /* string programming is possible ... but it basically becomes its own type script like language. it becomes easily broken is the problem, the moment u forget something. this is y string programming is a bad idea */
        /* you can intelligently read the function source */
        /* to determine what should be passed back */
        /* you can also have an array of functions */
        /* why does google not use classes */
        /*  */
        /* to be given wrong ideas */
        /* the ab */
        state[k] = isFunction(v) ? 
            (...args) => bound(v(...args)) : bound
        return state
        /* each time ... it is correct to return state */
    })
}

/*BELOW ---------------------------------*/

function parseTopAttrs(s) {
    let r =
        /^\s*(?:--+\s*)?(?:\S+ *(?:=.+|{[^]*?})\n+)+(?:--+\s*)?/
    let [a, b] = mget(r, s)
    if (b) {
        let r2 = /^(\S+) *(?:= *(.+)|{([^]+?)})/gm
        //b = findall(r2, b)
        //b = dict(b, parse)
        return [a, dict(findall(r2, b), parse)]

        function parse(v, k) {
            if (k == 'title') {
                return capitalizeTitle(v)
            }
            if (hasColon(v)) {
                const r = /(\w+) *: *(.*?)(?:,|$)/g
                return dict(findall(r, v))
            }

            else if (hasNewline(v)) {
                return lineGetter(v)
            }
            else if (hasComma(v)){
                return split(v, commaRE)
            }
            else if (isWord(v)) {
                return toArgument(v)
            }

            else {
                return v
            }

        }
    }
    return [a, {}]
}

function hasColon(s) {
    return /:/.test(s)
}

function compileRE(r) {
    if (isRegExp(r)) {
        return r
    }
    throw new Error()
}

function insert(arr, item, i, after) {
    if (i == -1) {
        return arr.push(item)
    }
    if (i == 0) {
        return arr.unshift(item)
    }
    i = indexGetter(i, arr)
    if (isDefined(i)) {
        arr.splice(i + (after ? 1 : 0), 0, item)
        return arr
    }
    return false
}
function isPlural(s) {
    return s.length > 2 && s.endsWith('s')
}

function indexGetter(i, arr) {
    if (!i) return 0
    if (!isNumber(i)) return findIndex(i, arr)
    if (i < 0) {
        return arr.length + i
        //i = arr.length + i
        //i = arr.length + 1 - i
        /* could be an error */
    }
    return i
}

function doublef(fn) {
    return function lambda(s) {
        return [s, fparse(fn, s)]
    }
}

function isNode() {
    // return isDeno()
    return typeof window === 'undefined'
}

function toNestedArray(x) {
    if (isNestedArray(x)) {
        return x
    }
    if (isArray(x)) {
        return [x]
    }
    return x
}

function isNativeHtmlTag(s) {
    const word = match(s, /^\w+/)
    if (variables.allHtmlTags.includes(word)) {
        return true
    }
}
function isHTML(s) {
    return /^ *<\w/m.test(s)
}

function swapReplace(s, dict) {
    for (let [k, v] of Object.entries(dict)) {
        s = s.replace
    }
}

function camelToTitle(s) {
    const fn = (x) => x[0] + ' ' + x[1]
    return capitalize(s.replace(/[a-z][A-Z]/, fn))
}

function exporter(State, key) {
    const state = isClassFunction(State)
        ? new State()
        : State

    if (!key) {
        const keys = ['run', 'build']
        key = keys.find((x) => x in state)
    }
    assertion2(state, has, key)
    return state[key].bind(state)
}

function overlap(a, b) {
    return a.every((x) => b.includes(x))
}

function checkpointf(requirements) {
    if (!requirements) {
        return isDefined
    }
    if (isFunction(requirements)) {
        return requirements
    }

    requirements = toArray(requirements)
    return function checkpoint(s) {
        for (let requirement of requirements) {
            if (!requirement(s)) {
                return false
            }
        }
    }

}

function countCaptureGroups(r) {
    let s = r.source || r
    return (s.match(/(?:[^\\]|^)\((?![\?])/g) || []).length
}

function incrementf(
    template = '1.',
    { offset = 0, limit = 1000 } = {}
) {
    let count = offset
    if (isArray(arguments[0])) {
        const items = copy(arguments[0])
        //console.log(items); throw "";
        let index = 0
        return () => {
            const value = items[index++]
            if (value == null) {
                throw 'increment error'
                index = 0
                return items[0]
                //return 1
            }
            return value
        }
    }

    if (isFunction(arguments[0])) {
        return (s) => arguments[0](s, ++count)
    }
    return function lambda() {
        if (count > limit) {
            count = 0
        }
        return template.replace(/\b[1a]\b/i, (x) => {
            count++
            switch (x) {
                case 'a':
                    return n2char(count - 1)
                case 'A':
                    return capitalize(n2char(count - 1))
                case 'i':
                    return count
                case '$1':
                    return count
                case '1':
                    return count
            }
        })
    }
}

function endsWithWord(s) {
    return /[a-zA-Z]$/.test(s)
}

function isWhiteSpace(s) {
    return /^\s+$/.test(s)
}

function textOrJson(s) {
    try {
        return JSON.parse(s)
    } catch {
        return s
    }
}


function modularIncrementNumber(current, increment, min, max) {
    if (arguments.length == 2) {
        max = increment - 1
        increment = 1
        min = 0
    }
    if (!current) current = 0
    if (current + increment > max) {
        if (current == max) return min
        return max
    }
    if (current + increment < min) {
        if (current == min) return max
        return min
    }
    return current + increment
}

function mergeToObject(obj, item) {
    if (arguments.length == 1) {
        return runner({}, obj)
    }
    else if (arguments.length === 3 && isString(item)) {
        let prev = obj[arguments[1]]
        if (!prev) {
            if (isObject(arguments[2])) {
                obj[arguments[1]] = arguments[2]
            } else if (isNestedArray(arguments[2])){
                obj[arguments[1]] = dict(arguments[2])
            } else {
                let [a,b] = arguments[2]
                obj[arguments[1]] = {[a] : b}
            }
        } else {
            return runner(prev, arguments[2])
        }
        return obj
    }
    else {
        return runner(obj, item)
    }

    function runner(obj, item) {
    if (isObject(item)) {
        /* hacky */
        if (item.className && obj.className) {
            let a = [item.className, obj.className]
            //console.log('aaaaa')
            //throw new Error('hacky obj.classname ' + JSON.stringify(a))
            //item.className += ' ' + obj.className
        }
        return Object.assign(obj, item)
    }
    else if (isNestedArray(item)) {
        const set = (a, b, c) => {
            a[b] = c
        }
        item.forEach(el => {
            if (isNestedArray(el)) {
                el.forEach(item => set(obj, ...item))
            } else {
                set(obj, ...el)
            }
        })
    }
    else if (isObjectArray(item)) {
        item.forEach((item) => Object.assign(obj, item))
    }

    else if (isArray(item)) {
        obj[item[0]] = item[1]
    }
    return obj
    }
}

function xsplit(s, r = / +/) {
    if (!exists(s)) {
        return []
    }
    if (isArray(s)) {
        return s
    }
    s = String(s)
    if (/\|/.test(s)) {
        return split(s, /\|/)
    }
    if (/,/.test(s)) {
        return split(s, /,/)
    }
    return split(s, r)
}

function fill(items, length, before, fallback = '') {
    if (isString(items)) {
        return map(length, () => items)
    }
    if (isNumber(items)) {
        const hasArgument = arguments.length > 1
        return map(items, () => hasArgument ? length : 0)
    }
    const f = (x) => range(x).map(() => fallback)
    const extra = f(length - coerceArray(items).length)
    return before ? extra.concat(items) : items.concat(extra)
}

function removeQuotes(s) {
    return /^['"]/.test(s) ? s.slice(1, -1) : s
}

function objectWalk3(o, key, f) {
    function runner(o) {
        f(o)

        for (let [k, v] of Object.entries(o)) {
            if (isArray(v)) {
                o[k].forEach(runner)
            } else if (isObject(v) && o.hasOwnProperty(key)) {
                runner(v)
            }
        }
        return o
    }
    return isArray(o) ? o.map(runner) : runner(o)
}

function objectWalk(o, f) {
    if (arguments.length == 3) {
        return objectWalk3(...arguments)
    }
    function runner(o) {
        f(o)
        for (let [k, v] of Object.entries(o)) {
            if (isArray(v)) {
                o[k].forEach(runner)
            } else if (isObject(v)) {
                runner(v)
            }
        }
        return o
    }
    return isArray(o) ? o.map(runner) : runner(o)
}

function swapKey(o, a, b) {
    if (o.hasOwnProperty(a)) {
        o[b] = o[a]
        delete o[a]
    }
}

function modularf(items) {
    let i = -1
    return function lambda() {
        i = modularIncrement(items, i)
        return items[i]
    }
}

function modularIncrement(items, x = 0, increment = 1, stop = 0) {
    if (x == null) {
        return items[0]
    }
    increment = Number(increment)
    const [i, asNumber] = Number.isInteger(x) ?
        [x, true] : [items.indexOf(x), false]

    if (stop && (i + increment < 0|| i + increment >= items.length)) {
        return 
    }
    const newIndex = i + increment < 0 ?
        items.length - 1 : (i + increment) % items.length

    //console.log({asNumber})
    const value = asNumber ? newIndex : items[newIndex]
    return value
}

function flat(...items) {
    // throw new Error('flat')
    const store = []
    const runner = (item) => {
        if (empty(item)) {
            return 
        }
        switch (type(item)) {
            case 'Set'   : return Array.from(item).map(runner)
            case 'Array' : return item.map(runner)
            case 'Module' : return store.push(...Object.values(item))
            default:      return store.push(item)
        }
    }

    runner(items)
    return store
}

function mergeObjectProperties(o, schema) {
    const store = {}
    const entries = Object.entries(schema)

    for (let [k, v] of Object.entries(o)) {
        let touched = false
        for (let [a, b] of entries) {
            if (b.includes(k)) {
                addProperty(store, a, k, v)
                touched = true
                break
            }
        }
        if (!touched) {
            addProperty(store, k, v)
        }
    }
    return store
}

function titleCase(s) {
    return split(s).map(capitalize).join(' ')
    return dashCase(s).split('-').map(capitalize).join(' ')
}

function pipe(...a) {
    const fs = flat(a)
    const reducer = (y, f) => isArray(y) ? f(...y) : f(y)
    return (...args) => fs.reduce(reducer, args)
}

function coerceArray(items) {
    return isDefined(items) ? toArray(items) : []
}

function nestPush(store, item) {
    isNestedArray(item) ?
        store.push(...item) :
        isArray(item) ? 
        store.push(item) : 
        null
    return store
}

function no() {
    return false
}
function noop() {
    return null
}

function getBindingName(s) {
    return search(bindingRE, s)
}


function getErrorStack(e) {
    const r = /^ *at (?:new )?(\w+\.\w+ \w+ \[.*?\]|\S+) \((?:file:\/\/)?(.*?):(\d+)/gm
    const s = (e || new Error()).stack
    const matches = findall(r, s)
    return matches
}
function getCaller0(targetIndex = 0, error) {
    const matches = getErrorStack(error)
    console.log(matches)
    const keys = ['consoleLog', 'getCaller', 'getCallerObject', 'log']
    const startIndex = matches.findIndex(([name]) => {
        return keys.includes(name)
    })
    //console.log({startIndex, targetIndex, matches})
    const eIndex = startIndex + 1 + targetIndex
    const match = matches[eIndex]
    return {
        name: match[0],
        line: Number(match[2]),
        file: match[1],
    }
}

class Group {
    /* u */
    slice(start, end) {
        return this.getItems().slice(start, end)
        var length = this.size
        var slicedArray = [];
        var startIndex = (typeof start === 'number') ? start : 0;
        var endIndex = (typeof end === 'number') ? end : length;

        if (startIndex < 0) {
          startIndex += length;
        }
        if (endIndex < 0) {
          endIndex += length;
        }

        for (var i = 0; i < startIndex; i++) {
            this.removedIndexes.add(i)
        }
        for (var i = endIndex; i < length; i++) {
            this.removedIndexes.add(i)
        }
        return this.getItems()
    }

    constructor(items) {
        this.items = items
        this.removedIndexes = new Set()


        /* This is super interesting. */
        this.items.forEach((item, i) => {
            Object.defineProperty(this, i, {
                writable: false,
                value: item,
            })
        })
    }
    every(fn) {
        return this.items.every((item) => {
            return isString(fn) ? isDefined(item[fn]) : fn(item)
        })
    }
    add(item) {
        item && this.items.push(item)
    }
    remove(key) {
        //throw 'aa'
        return remove(key, this.items)
    }
    ignore(key) {
        const index = findIndex(key, this.items)
        if (index > -1) {
            this.removedIndexes.add(index)
        }
        return this.items[index]
    }
    toJSON() {
        return this.items.map((x) => x.toJSON())
    }
    get size() {
        return this.items.length
    }
    getItems() {
        const f = (item, i) => {
            if (this.removedIndexes.has(i)) {
                return false
            }
            return true
        }
        return this.items.filter(f)
    }
    map(fn) {
        return this.getItems().map(fn)
    }

    forEach(fn) {
        return this.getItems().forEach(fn)
    }
    get(n) {
        if (isNumber(n)) return this.items[indexGetter(n, this.items)]
    }
}

function remove(items, key) {
    const index = indexGetter(key, items)
    return items.splice(index, 1)[0]
}

function constructEdit(edits) {
    return function lambda(s) {
        function walker(v, k) {
            try {
                return v(s)
            } catch(e) {
                throw e
            }
        }
        const results = simpleRecursiveWalk(edits, walker)
        return Object.assign(s, results)
    }
}

function getYear() {
    return new Date().getFullYear()
}
// console.log(getYear())
function xgetFirstName(name) {
    const items = name.split(/ +/)
    if (items.length == 1) return name
    const parts = items.slice(0, -1)
    if (getLast(parts) == 'the') {
        parts.pop()
    }
    return capitalize(parts.join('').toLowerCase())
}

function objectObjectWalk(o, f) {
    function runner(o, parent, key, depth = 0) {
        const value = f(o)
        for (let [k, v] of Object.entries(o)) {
            if (isArray(v)) {
                const value = o[k].map(runner)
            } else if (isObject(v)) {
                const value = runner(v)
            }
        }
        if (depth == 0) {
            return o
        }
        else if (value) {
            return value
        }
        else {
            return o
        }
    }
    return isArray(o) ? o.map(runner) : runner(o)
}

function rigidSort(items, preset, transform = identity) {

    const _f = ([k, v]) => {
        let index = preset.indexOf(k)
        if (index == -1) {
            return 1000
        }
        return index
    }
    return sort2(items, _f)
    // if (isObject(items)) {
        // return sort2(Object.entries(items), _f))
    // }
    // if (isNestedArray(items)) {
    // }

    // the old stuff below
    // dont delete it
    let base = items.map(transform)
    let reference = copy(base)

    if (isNestedArray(reference)) {
        reference = reference.map((x) => x[0])
    }

    const f = (key) => {
        const index = findIndex(key, reference)
        if (index < 0) return
        edit(reference, index, null)
        const value = items[index]
        return value
    }
    const value = preset.map(f).filter(isDefined)

    if (base.length == value.length) return value
    const extra = unique(base, value.map(transform))
    extra.sort()
    return value.concat(extra)
}

function flatMap(items, fn) {
    return flat(toArray(items || []).map(fn))
}

function mixin(Base, ...mixins) {
    if (arguments.length === 3 && isString(arguments[1])) {
        return runner(arguments[1], arguments[2])
    }
    for (const mixin of flat(mixins)) {
        if (isNestedArray(mixin)) {
            for (let item of mixin) {
                runner(...item)
            }
        }
        else if (isArray(mixin)) {
            for (let item of mixin) {
                runner(item.name, item.value)
            }
        }
        else if (isObject(mixin)) {
            for (let [k, v] of Object.entries(mixin)) {
                runner(k, v)
            }
        } else {
            console.log(mixin); throw 'not allowed'
        }
    }
    function runner(k, v) {
        if (v == null) {
            return 
        }
        if (isFunction(v)) {
            if (isFunction(Base)) {
                Base.prototype[k] = v
            } else {
                Base[k] = v.bind(Base)
            }
        } else if (isObject(v)) {
            if (v.get && isFunction(v.get)) {
                Object.defineProperty(Base.prototype, k, v)
            } 
            else if (k == 'methods') {
                mixin(Base, v)
            }
            else if (Base.hasOwnProperty(k)) {
                Object.assign(Base[k], v)
            }
            else {
                Base[k] = v
            }
        } else {
            Base[k] = v
            //console.log({k, v})
        }
    }
}

function deepMerge(base, ...args) {
    if (args.some(isNull)) {
        return 
    }
    let current = base
    for (let i = 0; i < args.length; i++) {
        const arg = args[i]

        if (i == args.length - 2) {
            const value = args[i + 1]
            assertion2(arg, notin, value)
            current[arg] = value
            return base
        } else if (current.hasOwnProperty(arg)) {
            current = current[arg]
        } else {
            current = current[arg] = {}
        }
    }
}

function getKwargs(s, key) {
    if (empty(s)) {
        return {}
    }
    if (key) {
        const ref = {
            equalSign: getKwargsDelimitedByEqualSign,
        }
        return ref[key](s)
    }
    const configRE = /(:?[\w-]+) *= *(\S+)/g
    const [text, doubles] = mget(configRE, s)
    const singles = split(text, / +/).map(doublef((x) => true))
    return dict(merge(doubles, singles))
}

function makeRunner(x) {
    if (isObject(x)) {
        return makeFastRunner(x)
    } else if (isObjectArray(x)) {
        return makeObjectRunnerFromArray(x)
    } else if (isArray) {
        return makeSimpleRunnerFromArray(x)
    }

    function makeSimpleRunnerFromArray(items) {
        console.log('making a simple runner from array')
        const runners = partition(items).map(atFirst(testf))
        if (isFunction(runners[0])) {
            return function lambda(s, i) {
                for (let [a, b] of runners) {
                    if (a(s)) {
                        return b(s)
                    }
                }
            }
        }
        else {

    return function getLabel(s) {
        for (let [a, b] of runners) {
            if (a(s)) {
                return b
            }
        }
    }
        }
        /* end of simple */
    }

    function makeObjectRunnerFromArray(items) {
        return function lambda(s) {
            let m
            for (let { fn, match } of items) {
                let m = isRegExp(match)
                    ? search(match, s)
                    : match(s)
                if (isBoolean(m)) {
                    return fn(s)
                } else if (isArray(m)) {
                    return fn(...m)
                } else {
                    return fn(m)
                }
            }
        }
    }
}

function comment(x) {
    if (!exists(x)) {
        return ''
    }
    if (typeof x == 'string') {
        const spaces = 2
        return x.replace(/^/gm, '///' + ' '.repeat(spaces))
    }
    if (typeof x == 'object') {
        return comment(JSON.stringify(x, null, 2))
    }
    if (isArray(x)) {
        return `/*\n${join(x.map((x) => ' * ' + x))} ***/`
    }
    if (isObject(x)) {
        return reduceToString(x, (k, v) => {
            const payload = join(toArray(v).map((x) => ' * ' + x))
            return `/* ${k}:\n *\n${payload} ***/`
        })
    }
    if (hasNewline(x)) {
        return comment(x.split('\n'))
    }
    return `/* ${x} */`
}


function mapFilter(items, checkpoint, fn) {
    if (empty(items)) {
        return []
    }
    items = entries(items)
    if (arguments.length == 2) {
        function filter(x) {
            return isDefined(x) && x !== false
        }
        return items.map(arguments[1]).filter(filter)
    }
    
    return items
        .map((item, i) => {
            if (checkpoint(item)) {
                const value = fn(item, i)
                if (isDefined(value)) {
                    return value
                }
            }
        })
        .filter(isDefined)
}


function createFunction(...args) {
    let asString = getLast(args) == String
    if (asString) {
        args.pop()
    }
    let context = isObject(getLast(args))
    if (context) {
        context = args.pop()
    }

    let name
    let params
    let body

    switch (args.length) {
        case 1:
            name = 'untitled'
            body = args[0]
            break
        case 2:
            name = args[0]
            body = args[1]
            break
        case 3:
            name = args[0]
            params = args[1]
            body = args[2]
            break
    }
    params = paramify(params)
    if (!isString(body)) {
        console.log(body)
        
     body = "return " + toStringArgument(body)
    }
    if (!body.includes('return')) {
        if (/\n/.test(body.trim()) || /^\S+ *=.+$/.test(body)) {
            
        } else {
            body = 'return ' + body
        }
    }
    body = indent(smartDedent(body))
    const text = `function ${name}(${params}) {\n${body}\n}`
    if (asString) {
        return text
    }
    console.log(text)
    const evaluation = evaluate(parens(text), context)
    return evaluation.success || stop(evaluation.error)
}
function stop(...args) {
    console.log(...args)
    console.log(getCaller(1))
    console.log('STOPPING DUE TO EMPTY VALUE')
    throw ''
}

function foobar(s) {
    return s + 'asd'
}

function dedent(s) {
    return s.trim().replace(/^ +/gm, '')
}

function dedent4(s, x) {
    const spaces = isDefined(x) ? toSpaces(x) : ' +'
    const r = RegExp(`^${spaces}`, 'gm')
    return s.replace(r, '')
}


function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}



function handleError(error, input) {
    return {
        stack: error.stack,
        message: error.toString(),
        input,
    }
}


function findInMap(map, query) {
    for (let [key, value] of map) {
        if (key.toString() == query.toString()) {
            return value
        }
    }
}


function splitThePage(s) {
    const items = split(smartDedent(s), 'linebreak')
    switch (items.length) {
        case 1: return ['', items[0]]
        case 2: return items
        default:
            throw new Error('SplitThePage should only be 1 or 2 items')
    }
}
function flat2D(...items) {
    const store = []
    runner(items)
    function runner(items) {
        items.forEach((item, i) => {
            if (!item) {
                return 
            }
            else if (isNestedArray(item)) {
                runner(item)
            }
            else {
                store.push(item)
            }
        })
    }
    return store
}

function info2(x) {
    if (isNull(x)) {
        return {
            ObjectType: 'NULL'
        }
    }
    if (isArray(x)) {
        return {
            ObjectType: 'ARRAY',
            size: len(x),
            childTypes: type(x[0]),
        }
    }
    if (isString(x)) {
        return {
            ObjectType: 'STRING',
            value: x,
        }
    }

    if (isNumber(x)) {
        return {
            ObjectType: 'NUMBER',
            value: x,
        }
    }

        const keys = Object.keys(x)
        const descriptor = Object.getOwnPropertyDescriptor(x)
        const ownNames = Object.getOwnPropertyNames(x)
        const proto = Object.getPrototypeOf(x).constructor.name
        const size = len(keys)
        const constructorName = x.constructor.name
        return {
            keys, 
            //descriptor, ownNames,
            //proto,
            //size,
            ObjectType: 'OBJECT',
            constructorName,
        }
}

function defineVariable(name, value) {
    let check = `typeof ${name} == 'undefined'`
    if (eval(check)) {
        (1, eval)(`${name} = ${JSON.stringify(value)}`)
    }
}


function waterfall(items) {
    if (isStringArray(items)) {
        items = items.map((item, i) => {
            return {
                delay: 100 * (items.length - i),
                action: () => console.log(item)
            }
        })
    }
    let id
    let i = 0
    let length = items.length

    return new Promise((resolve) => {
        const runner = () => {
            const item = items[i++]
            const {delay, action} = item
            if (i == length) {
                clearTimeout(id)
                setTimeout(() => {
                    action()
                    resolve()
                }, delay)
            } 
            else {
                id = setTimeout(() => {
                    action()
                    runner()
                }, delay)
            }
        }
        runner()
    })
}

class CumulativeStorage {
    constructor() {
        this.store = {}
    }
    toJSON() {
        return this.store
    }
    add(x) {
        if (!exists(x)) {
            return 
        }
        assertion2(x, isObject)

        for (let [k, v] of Object.entries(x)) {
            if (this.hasOwnProperty(k)) {
                if (isString(v)) {
                    
                } else {
                    this.store[k] = merge(this.store[k], v)
                }
            } else {
                this.store[k] = v
            }
        }
    }
}

function callableArgsKwargs(s) {
    const callableRE = /(\w+)\((.*)\)/
    const m = search(callableRE, s.toString())
    if (!m) {
        return 
    }

    const [a,b] = m
    return split(b || '', /(\[.*?\]|{.*?}|\w+\(.*?\))|,/).reduce((acc, item, i) => {
        const m = search(/^(.*?) *= *(.+)/, item.toString())
        if (m) {
            acc[2][m[0]] = toArgument(m[1])
        } else {
            acc[1].push(toArgument(item))
        }
        return acc
    }, [a, [], {}])
}
function isPrimitiveArray(x) {
    return isArray(x) && isPrimitive(x[0])
}






function assignObject(state, el) {
    if (isObject(el)) {
        Object.assign(state, el)
    }
}

function fuzzyMatch(input, choices, matchAtStart = true) {
    if (!choices || choices.length == 0) return null
    if (isObject(choices)) choices = Object.keys(choices)
    if (choices.includes(input)) return input

    const prefix = matchAtStart ? '^' : ''
    const r = RegExp(prefix + input, 'i')
    const abrevTest = (x) => r.test(abrev(x))
    const startTest = (x) => r.test(x)
    const firstPass = choices.filter(abrevTest)
    const secondPass = choices.filter(startTest)

    let existsFirst = exists(firstPass)
    let existsSecond = exists(secondPass)

    if (existsFirst && existsSecond) {
        return sorted(firstPass, len)[0]
    }
    else if (firstPass.length == 1) {
        return firstPass[0]
    }

    else if (secondPass.length == 1) {
        return secondPass[0]
    }
    else if (existsFirst) {
        return sorted(firstPass, len)[0]
    }

    else if (existsSecond) {
        return sorted(secondPass, len)[0]
    }
    else {
        return null
    }
}

function sayhi(name) {
    if (name == null) name = getCaller().name || 'Freddy'
    return `Hello from ${name}!`
}


function saybye(a, b) {
    return `Goodbye from ${a} and ${b || 'sam'}`
}


        //let asd = dreplace('2 * 4', {
            //'*': '\\times',
            //'div': '\\div',
        //}, null)
        //console.log(asd, null)


        //const r = reWrap(items, /<((?:$1)[-\w]+)/g)
        //console.log(r); throw "";


function reWrap2(r, ...refs) {
    if (refs.length > 1) {
        const source = r.source.replace(/\$(\w+)/g, (_, key) => {
            const y = refs[Number(key) - 1]
            return reWrap(y, String)
        })
        return RegExp(source, r.flags)
    } 
    else if (isObject(refs[0])) {
        /* this is regexTempalter from splitKatex */
        const ref = refs[0]
        const regex = reWrap(ref, /\$($1)/g)
        const source = r.source.replace(regex, (_, key) => {
            const y = ref[key]
            return parens(y.source)
        })
        return RegExp(source, r.flags)
    }

    else {
        const ref = refs[0]
        const source = r.source.replace(/\$(\w+)/g, (_, key) => {
            const y = ref[key]
            return reWrap(y, String)
        })
        return RegExp(source, r.flags)
    }

}
//const items = [
//{a:1, b:2, c:3},
//{a:1, b:2, c:3},
//{a:2, b:2, c:3},
//{a:22, b:2, c:3},
//]

    //const name = groupNames.find((name) => x.a == name)
    //return name.toString()

function groupBy(items, key, fn) {
    if (!key) key = Object.keys(items[0])[0]
    const storage = new Storage()
    items.forEach((item, i) => {
        const value = fn ? fn(item) : item
        storage.add(item[key], value)
    })
    return storage.values
}

/* create a team name ...
 * Extensions require meta data.
 *
 * */


function definedSort(items, definedOrder) {
    const newItems = items.filter((x) => !definedOrder.includes(x))
    return definedOrder.concat(newItems)
}

function distinct(items, x) {
    const fn = isArray(x)
        ? (y) => !x.includes(y)
        : (y) => y != x
    return items.filter(fn)
}

const abc = ['a', 'b', 'c', 'd', 'e']


function mixinSetters(Base, x) {
    const items = entries(x)

    items.forEach((item, i) => {
        if (isString(item)) {
            set(item, item)
        } else if (isArray(item)) {
            set(...item)
        } else {
            set(item.methodKey, item.valueKey, item.transformer)
        }
    })

    function set(methodKey, valueKey, transformer) {
        Base.prototype[methodCase('set', methodKey)] = function (arg) {
            if (!isDefined(arg)) {
                return false
            }

            const newValue = isFunction(arg) 
                ? arg(this[valueKey]) : arg
            const finalValue = transformer 
                ? transformer(newValue) : newValue

            this[valueKey] = finalValue
            return true
        }
    }
}

function lineDitto(s, items, target) {
    const r = RegExp(target || '\\${2,3}', 'g') 
    const parcel = lineGetter(s, true).map((el) => {
        if (r.test(el)) {
            const lines = items.map((x) => {
                return el.replace(r, x)
            })
            return lines.join('\n')
        }
        return el
    })
    return parcel.join('\n')
}
function proseCase(s) {
    return s.toLowerCase()
}
function capitalizeName(s) {
    if (s == 'everyone') {
        return s
    }
    return capitalize(s)
}




function stringCall(fn, ...args) {
    const [name, n, quoted] = isFunction(fn)
        ? [fn.name, 1, 0]
        : isArray(fn) 
        ? [fn.join('('), fn.length, 0]
        : [fn, 1, 1]

    const argString = quoted 
        ? args.map(curry(JSON.stringify))
        : args
    const leftParens = '('
    const rightParens = ')'.repeat(n)
    return `${name}${leftParens}${paramify(argString)}${rightParens}`
}

function stringCall2(fn, ...args) {
    const name = isFunction(fn) ? fn.name : fn
    const transform = (x) => {
        if (!isString(x)) {
            return toStringArgument(x)
        }
        return x
    }
    const argString = args.map(transform).filter(isDefined).join(', ')
    return `${name}(${argString})`
}

//
//


function filter(x, fn = isDefined, mode) {
    if (isArray(x) && isArray(fn)) {
        /* mode = anti */
        const g = mode 
            ? (x) => isDefined(x) && !fn.includes(x)
            : (x) => isDefined(x) && !fn.includes(x)

        return x.filter(g)
    }
    if (isObject(x)) {
        if (!mode) {
            mode = Object
        }
        if (arguments.length == 1) {
            return dict(Object.entries(x).filter((x) => {
                return isDefined(x[1])
            }))
        }
        if (isString(fn)) {
            let s = fn
            fn = (k, v) => v == s
        }
        else if (isArray(fn)) {
            let s = fn
            fn = (k, v) => !s.includes(k)
        }
        const values =  Object.entries(x).filter(([k,v]) => {
            return fn(k, v)
        })

        if (mode == 'keys') {
            return values.map((x) => x[0])
        }
        if (mode == 'values') {
            return values.map((x) => x[1])
        }
        if (mode == Object) {
            return dict(values)
        }
        return values
    }
    return x.filter(equalf(fn))
}


function hasLetter(s) {
    return /[a-zA-Z]/.test(s.toString())
}


function createAccessors(a, b) {
    const topArg = 'arg'
    const bodyGet = `return this._${a}`
    const bodySet = `this._${a} = ${topArg}${b ? '\n' + b : ''}`
    console.log({bodyGet, bodySet})
    const get = createFunction(a, '', bodyGet)
    const set = createFunction(a, `${topArg}`, bodySet)
    return [a, {get, set}]
}

function defineGetter(base, k, v) {
    if (isFunction(v)) {
        v = {get: v}
    } else if (isObject(v)) {
        edit(v, (x) => x.bind(base))
    }

    if (isClassFunction(base)) {
        Object.defineProperty(base.prototype, k, v)
    } else {
        Object.defineProperty(base, k, v)
    }
}


function makeFastRunner(items, options = {}) {
    const makeItems = (items) => {
        return Object.entries(items).map(([k, v], i, a) => {
            let comment = topComment(v)
            if (!comment) {
                if (i == a.length - 1) {
                    comment = '/.+/'
                }
                else {
                    return 
                }
            }
            const regex = comment.startsWith("/")
                ? RegExp(comment.slice(1, -1))
                : comment

            return [regex, v]
        }).filter(isDefined)
    }

    if (isObject(items)) {
        items = makeItems(items)
    }
    else if (items.length % 2 == 1) {
        insert(items, /^.+/, items.length - 1)
    }
    const runners = partition(items).map(([regex, fn]) => {
        return function lambda(s) {
            const m = search(regex, s)
            if (m) {
                return fn(...toArray(m))
            }
        }
    })

    function runner(s) {
        for (let runner of runners) {
            const value = runner(s)
            if (value) {
                return value
            }
        }
    }
    return runner

    function lambda(s) {
        let value = lineGetter(s).map(runner)
        if (options.flat) {
            value = flat(value)
        }
        return value
    }

    return lambda
}

let str0325 = `
    
        padding
        paddingLeft
        paddingRight
        paddingTop
        paddingBottom
        paddingVertical
        paddingHorizontal

`

function matchall(s, r) {
    let match
    const store = []
    while (isDefined(match = r.exec(s.toString()))) {
        store.push(match)
    }
    return store
}


function objectEditor(o, childFn) {
    if (isString(arguments[1])) {
        return objectKeyEditor(...arguments)
    }
    function assign(o, k, v) {
        if (isDefined(v)) {
            o[k] = v
        } else if (v === null) {
            delete o[k]
        }
    }

    function runner(o, parentKey) {
        if (isArray(o)) {
            return o.map((x) => runner(x, parentKey))
        }
        if (isObject(o)) {
            for (let [k, v] of Object.entries(o)) {
                if (isArray(v)) {
                    const value = v.map((x) => runner(x, k))
                    assign(o, k, value)
                }
                else if (isObject(v)) {
                    assign(o, k, runner(v, k))
                }
                else {
                    assign(o, k, childFn(k, v, parentKey))
                }
            }
            return o
        }
    }
    return runner(o, null)
}

function list(x) {
    switch (type(x)) {
        case 'Null': return []
        case 'Undefined': return []
        case 'Object': return Object.keys(x)
        case 'Array': return x
        case 'Set': return Array.from(x)
        default: return [x]
    }
}
function isError(x) {
    return x instanceof Error || isObject(x) && x.error
}
function argArgsKwargs(s) {
    const args = []
    const kwargs = {}
    const items = split(s || '', /(\[.*?\]|{.*?}|\w+\(.*?\))|,/)
    for (let item of items) {
        const m = search(/^(.*?) *= *(.+)/, item.toString())
        if (m) {
            kwargs[m[0]] = toArgument(m[1])
        } else {
            args.push(toArgument(item))
        }
    }
    const arg = args[0]
    return [arg, args, kwargs]
}
function argsKwargs(b) {
    const args = []
    const kwargs = {}
    const items = split(b || '', /(\[.*?\]|{.*?}|\w+\(.*?\))|,/)
    for (let item of items) {
        const m = search(/^(.*?) *= *(.+)/, item.toString())
        if (m) {
            kwargs[m[0]] = toArgument(m[1])
        } else {
            args.push(toArgument(item))
        }
    }
    return args.concat(kwargs)
}


function assign(o, ...args) {
    if (getLast(args) == null) {
        return 
    }
    if (args.length == 1) {
        return Object.assign(o, args[0])
    } else {
        return dictSetter(o, ...args)
    }
}

function conditionalEdit(o, condition, fn) {
    const checkpoint = countParameters(condition) == 2
        ? condition : (k, v) => condition(v)

    function runner(o, parent) {
        if (isArray(o)) {
            return o.map((x) => runner(x, parent))
        }
        if (isObject(o)) {
            for (let [k, v] of Object.entries(o)) {
                if (!checkpoint(k, v)) {
                    continue
                }
                fn(k, v, parent)
                return 
                if (isArray(v)) {
                    const value = v.map((x) => runner(x, o))
                    assign(o, k, value)
                }
                else if (isObject(v)) {
                    assign(o, k, runner(v, o))
                }
                else {
                    assign(o, k, fn(k, v, parent))
                }
            }
            return o
        }
    }
    return runner(o)
}

    //return isObject(v)
    //if (p) {
        //p[k] = 123
    //}
    //console.log({k, v, p})
    //p[k] = 123

function deepCopy(x) {
    /* a bit harder to accomplish */
    return x
}
function deepEqual(a, b) {
    if (a === b) {
        return true
    }

    if (isPrimitive(a) && isPrimitive(b))
        return a === b

    if (len(a) != len(b)) {
        return false
    }

    for (let key in a) {
        if (!(key in b)) {
            return false
        }
        if (!deepEqual(a[key], b[key])) {
            return false
        }
    }

    return true
}

function KeyError(base, key) {
    throw 'key not in base'
    if (key == null) {
        chalk('KeyError', 'key is undefined')
    }
    chalk('KeyError', 'key not in base', {key, base})
}

    //return search(/^.*?\s*\/\* *(.*?) *\*\//, s.toString())
function slice(items, a, b) {
    if (!a) {
        return items
    }
    if (isArray(items)) {
        if (b == null) {
            return items.slice(0, a)
        }
        return items.slice(a, b)
    }
    if (isObject(items)) {
        if (b == null) {
            return dict(entries(items).slice(0, a))
        }
        return dict(entries(items).slice(a, b))
    }
}


function prepareText(s, o = {}) {
    if (o.removeComments) s = removeComments(s)
    if (o.stringBreaker) s = stringBreaker(s)
    if (o.smartDedent) s = smartDedent(s)
    if (o.split) s = split(s, o.split)
    return s
}
function getShortest(items) {
    const lengths = items.map(len)
    const shortestLength = Math.min(...lengths)
    const shortest = items.find((x) => len(x) == shortestLength)
    return shortest
}

function isSymbol(s) {
    return /[^\w\s]/.test(s)
}


function isSingleLetter(s) {
    return /^[a-zA-Z]$/.test(s)
}


class Store {
    constructor(data) {
        this.store = data || {}
    }
    set(...args) { return dictSetter(this.store, ...args) }
    get(...args) { return dictGetter(this.store, ...args) }

    get value() { return this.store }
    get keys() { return Object.keys(this.store) }
    get values() { return Object.values(this.store) }
    get entries() { return Object.entries(this.store) }
    toJSON() { return this.store }
}




function lineSplit(fn) {
    const paramCount = countParameters(fn)
    return function lambda(s) {
        return lineGetter(s).map((item, i) => {
            const args = paramCount == 2 
                ? splitOnce(item, / +/)
                : split(item, ' ')
            return fn(...args)
        })
    }
}

function objectKeyEditor(o, key, fn, ...args) {
    if (isArray(o)) {
        return o.forEach((x) => {
            objectKeyEditor(x, key, fn, ...args)
        })
    }
    if (!o.hasOwnProperty(key)) {
        return 
    }
    const newValue = fn(o[key], ...args)
    if (isDefined(newValue)) {
        o[key] = newValue
    }
    return newValue
}
function trimAround(s) {
    return s.trimEnd().replace(/^(?: *\n)+/, '')
}
function smarterIndent(s) {
    s = trimAround(s)
    const match = s.match(/^ +/gm, s)
    if (!match) {
        return s
    }
    const spaces = match.map((x) => {
        let length = x.length
        switch (length) {
            case 0:
            case 1:
                return 0
            case 2:
            case 3:
            case 4:
                return 4
            case 5:
            case 6:
            case 7:
                return 8
            default:
                return length
        }
    })
    const space = Math.min(...spaces)
    const r = RegExp(`^ {${space}}`, 'gm')
    //console.log({space, r})
    return s.replace(r, '')
}


function vueCase(s) {
    return /^V/.test(s) ? s : 'V' + capitalize(s)
}

function methodCase(a, ...args) {
    return lowerCase(a) + args.map(capitalize).join('')
}

function stateGetter(state, ...keys) {
    const payload = {}
    for (let key of flat(keys)) {
        let value

        if (isString(key)) {
            value = state[key]
        } else if (isFunction(key)) {
            value = key(state)
            key = key.name
        } else if (isObject(key)) {
            const [a,b] = Object.entries(key)[0]
            key = a
            value = b(state)
        }
        if (hasValue(value)) {
            payload[key] = value
        }
    }
    return payload
}



function entries(x) {
    if (!x) {
        return []
    }
    return isObject(x) ? Object.entries(x) : x
}

function gather(x, r) {
    if (/ \$/.test(r)) {
        r = r.replace(' $', '\\W+?(\\w+)')
        r = RegExp(r, 'g')
    }
    assertion2(r.flags, has, 'g')
    return unique(findall(r, x.toString()))
}

function reducerStrategy(fn) {
    function reducer(a, arg) {
        const newValue = fn(arg)
        if (isDefined(newValue)) {
            a[key] = newValue
        }
        return a
    }
    return [reducer, {}]
}

function reduce(items, fn) {
    return entries(items).reduce((acc, item, i) => {

        const value = fn(item, i)
        if (value == null) {
            return acc
        }

        if (isArray(value)) {
            acc[value[0]] = value[1]
        }
        else if (isString(item)) {
            acc[item] = value
        }
        else if (isArray(item)) {
            acc[item[0]] = value
        }
        else if (isObject(item)) {
            acc[item.key || item.name] = value
        }
        return acc
    }, {})
}

function interval(fn, limit = 5) {
    let id
    let count = 0
    const runner = () => {

       console.log(fn())

       const value = ++count == limit
       if (value === true) {
           console.log('DONE AT INTERVAL')
           clearInterval(id)
       }
    }
    id = setInterval(runner, 2000)
}

function isBasicType(x) {
    const javascriptBasicTypes = [
        'Function',
        'Number',
        'Object',
        'Array',
        'Set',
        'Promise',
        'Null',
        'Undefined',
        'String',
    ]
    return !x || javascriptBasicTypes.includes(x.constructor.name)
}

function hasPercentage(x) {
   return x.toString().includes('%')
}

function mixinAliases(Base, items = []) {
    items.forEach((item, i) => {
        const args = getArgs(item)
        //const fn = curryEnd(Base.prototype[item.fn], ...args)
            //.bind(Base)

        Base.prototype[item.name] = function (...a) {
            const fn = this[item.fn]
            return fn.call(...a, ...args)
        }
    })
}
function getArgs(x) {
    if (isObject(x)) {
        if (x.arg) {
            return [x.arg]
        } 
        if (x.args) {
            return x.args
        }
    }
    if (isArray(x)) {
        return flat(x)
    }
    return []
}



const PrevNextMixin = {
    prev() {
        this.index = modularIncrement(this.items, this.index, -1)
        return this.items[this.index]
    },
    next() {
        this.index = modularIncrement(this.items, this.index)
        return this.items[this.index]
    }
}


function toPoints(pixels) {
    return pixels * 0.75
}

function check(x) {
    console.log('checkign the item')
    const t = type(x)
    if (t == 'Null') {
        console.log('the item is null')
        //return ascii.wrap('The item is NULL')
    }
    const keys = isObjectWithKeys(x) ? Object.keys(x) : []
    const vobKeys = [
        'tag',
        'component',
        'staticClass',
        'style',
        'props',
        'value',
    ]
    const payload = {
        TYPE: t,
        KEYS: keys.length ? keys : 'none',
        THE_CHECKED_ITEM: x,
        IS_VUE: keys.includes('_isVue'),
        //IS_HTML_ELEMENT:  keys.includes(),
        IS_VOB: hasKey(keys, vobKeys),
    }
    console.log(payload)
    return payload
}


function orderedSort(x, order) {
    const items = entries(x)
    const fn = isNestedArray(items) ? (x) => x[0] : identity 
    const temp = items.map(fn)


    items.sort((a, b) => {
        let ia = findIndex(fn(a), order)
        let ib = findIndex(fn(b), order)
        if (ia && ib) {
            return ia - ib
        }
    })
    let store = []
    for (let i = 0; i < order.length; i++) {
        if (items.indexOf(order[i]) > -1) {
            store.push(order[i])
        }
    }
    return store
}
/* quickSort */

function hasKey(x, keys) {
    return shared(list(x), list(keys)).length > 0
}
function isObjectWithKeys(item) {
  return typeof item === 'object' && item !== null;
}

"append.vim"


function getCodeBlockRegex(s, blockKey) {
    const spaces = search(RegExp(`^( *)${blockKey}`, 'm'), s)
    const regex = RegExp(`^${spaces}${blockKey}[^]+?\n${spaces}}`, 'm')
    return regex
    return search(regex, s)
}
function mutateFunction(fn, blockKey, callback) {

    function splitOnce(s) {
        try {
            return s.match(/(.+)\n([^]+)/).slice(1)
        } catch(e) {
            return [s, '']
        }
    }
    return getset(fn, (s) => {
        const whileRE = getCodeBlockRegex(s, blockKey)
        return s.replace(whileRE, (whileBlock) => {
            return getset(whileBlock, callback)
        })
    })
}
function getset(x, f) {
    let spaces = 0
    const t = type(x)
    const ref = {
        Function: [String, bringToLife],
        String: [dedent, indent],
    }
    const [before, after] = ref[t]
    return after(f(before(x)))

    function dedent(s) {
        s = trimAround(s)
        const match = s.match(/^ +/gm, s)
        if (!match) {
            return s
        }
        spaces = Math.min(...match.map((x) => x.length))
        const r = RegExp(`^ {${spaces}}`, 'gm')
        return s.replace(r, '')
    }
    function indent(s) {
        return spaces ? s.replace(/^/gm, ' '.repeat(spaces)) : s
    }
}



const mutation = (wb) => {
    /* super janky */
    let [firstLine, rest] = splitOnce(wb)
    let count = '__count__'
    let limit = 10
    let message = 'LoopThresholdReached'
    let s = `let ${count} = 0`
    s += '\n'
    s += firstLine
    s += '\n'
    s += `    if (++${count} >= ${limit}) `
    s += `throw new Error("${message}")`
    s += '\n'
    s += rest
    return s
}






function getConfigArg(args, key) {
    /* dont like this function */
    if (getLast(args) === key) {
        return args.pop()
    }

    if (args[0] === key) {
        return args.shift()
    }
}

function conditionalString(s, payload) {
    return payload ? s + payload : ''
}

function equals(a, b) {
    return JSON.stringify(a) === JSON.stringify(b)
}

function empty(v) {
    if (v === 0) {
        return false
    }
    return !exists(v)
}


function toString(s) {
    // added
    if (s == null) {
        return ''
    }
    switch (type(s)) {
        case 'RegExp': return s.source
        case 'Null': return ''
        case 'Array':
        case 'Object':
            return JSON.stringify(s, null, 4)
        default: return s.toString()
    }
}

function isFromMap(args) {
    return args.length == 3 && isNumber(args[1]) && isArray(args[2])
}

function generate(classObject, ...args) {
    /* needs the className */
}

function toJSON(x) {
    if ('toJSON' in x) {
        return x.toJSON()
    }

    if ('store' in x) {
        return x.store
    }
}




function* backAndForth(mode, start = 0, dir = -1, limit = 100) {
  if (mode == -1) {
      start += 1
      dir = -dir
  }

  else if (mode == 1) {
      start += 1
      //dir = -dir
  }
  for (let i = 0 + start; i < Infinity; i++) {
    //if (i == 0)
    dir = -dir
    let value = dir * i
    yield value
    if (i == limit) i = 0
  }
}

function iteratorWrapper(fn, ...args) {
    const iterator = type(fn) == 'Iterator' ? fn : fn(...args)
    return function lambda(transform) {
        const value = iterator.next().value
        return transform ? transform(value) : value
    }
}

function round(n, decimals = 2) {
    return Number(n.toFixed(decimals))
}


function iterate(fn, ...args) {
    const store = []
    let limit = 100
    let count = 0
    while (count++ < limit) {
    	const value = fn(...args)
      if (value === false) {
          return store
      } 
      if (value != null) {
          store.push(value)
      }
    }
}
function log(...args) {
    if (args.filter(isDefined).length) {
        console.log(...args)
    }
}

function isCss(s) {
    return /^\..*?{/m.test(s)
}
function recursiveObjectEdit(o, f) {
    const runner = (o) => edit(o, g)
    const g = (x) => {
        if (isObject(x)) {
            return runner(x, f)
        }
        return f(x)
    }
    return runner(copy(o))
}

function forDoubles(items, fn) {
    const store = []
    for (let i = 0; i < items.length - 1; i++) {
        const item = items[i]
        const next = items[i + 1]
        const value = fn(item, next)
        if (isDefined(value)) {
            store.push(value)
        }
    }
    return store
}

function debounce(fn, delay = 50) {
    let timerId

    return function (...args) {
        clearTimeout(timerId)
        timerId = setTimeout(() => {
            fn.call(this, ...args)
        }, delay)
    }
}


function addObjectOrObjectProperty(state, key, ...args) {
        if (args.length == 2 && isDefined(args[1])) {
            state[key][args[0]] = args[1]
        }
        else if (args.length == 1 && isDefined(args[0])) {
            if (key in state) {
                Object.assign(state[key], args[0])
            } else {
                state[key] = args[0]
            }
        }
        return state
}
function isUpperCase(s) {
    return /^[A-Z]+\d*$/.test(s)
}



function getFallback(x) {
    switch (type(x)) {
        case 'Array': return []
        case 'Undefined': return null
        case 'Null': return null
        case 'Storage': return {}
        case 'Object': return {}
        case 'Number': return 0
        case 'String': return ''
        default: return null
    }
}


function isInitialized(state) {
    if (state.initialized) return true
    state.initialized = true
    return false
}


function isClassObject(x) {
    const natives = [
        'String',
        'Function',
        'Number',
        'Object',
        'Array',
        'Set',
        'Promise',
        'null',
        'Date',
        'HTMLDivElement',
    ]
    return x && !natives.includes(x.constructor.name)
}




function getQuotes(s) {
    const r = /'(.*?)'|"(.*?)"/g
    return findall(r, s)
}
function getFileURI(m) {
    const quotes = getQuotes(m)
    if (quotes.length == 1) {
        return quotes[0]
    }
    ndy()
}

function mapSort(items, fn) {
    return items.map((x) => {
        const value = fn(x)
        if (value == null || value == '') {
            return null
        }
        if (isArray(value)) {
            return value
        }
        return [1000, value]
    }).filter(isDefined)
      .sort((a, b) => a[0] - b[0])
      .map((x) => x[1])
}

function isAsyncFunction(fn) {
    return /\basync\b/.test(String(fn))
}



function topComment(s) {
    return search(/^.*?\s*\/\*+ *([^]+?) *\*+\//, s.toString())
}

function type(x) {
    if (x == Number || x == String || x == Object || x == Array) {
        return x.name
    }

    if (x === null) {
        return "Null"
    }
    if (x == null) {
        return "Undefined"
    }

    const ref = {
        'int': 'Number',
        'str': 'String',
        'list': 'Array',
        'dict': 'Object',
    }

    if (isString(x)) {
        if (x in ref) {
            return ref[x]
        }
    }
    if (typeof x === "number" && x.toString() == "NaN") {
        return "NaN"
    }
    if (x[Symbol.toStringTag] == 'Module') {
        return 'Module'
    }
    if (x.constructor == null) {
        return 'Object'
    }
    return x.constructor.name
}
function compare(a, b, values) {
    const value = values.map((value) => {
        const av = a(value)
        const bv = b(value)
        return {
            input: value,
            av,
            bv,
            equal: av === bv
        }
    })
    console.log(value)
}

function assign2(store, x) {
    switch (type(x)) {
        case 'Object':
            return Object.assign(store, x)
        case 'Number':
        case 'String':
        case 'Array':
            store['value'] = x
            return store
    }
}

function replaceBefore(s, key, f) {
    const r = RegExp(`.*?(?=(?: *|\\b)${key}\\b)`)
    return s.replace(r, f)
}

function cumulativeAssign(base, x, valueKey = 'value') {

    const cumulative = [
        "class",
    ]

    if (!hasValue(x)) return base
    return isObject(x) ? runner(base, x) : add(base, valueKey, x)

    function add(base, key, value, exists) {
        if (value == null) {
            base
        }
        if (exists && cumulative.includes(key)) {
            base[key] += ' ' + value
        } else {
            base[key] = value
        }
        return base
    }

    function runner(base, x) {
        Object.entries(x).forEach(([k,v], i) => {
            if (v == null) {
                return 
            }
            if (base[k]) {
                //console.log({k, v})
                switch (type(v)) {
                    case 'Object':
                        return runner(base[k], v)
                    case 'Array':
                        return addArray(base, k, v)
                    default:
                        return add(base, k, v, true)
                }
            } else {
                return add(base, k, v)
            }
        })
        return base
    }

    function addArray(base, k, v) {
        if (!isArray(base[k])) {
            base[k] = [base[k]]
        }
        const prev = base[k]
        toArray(v).forEach((item, i) => {
            if (!prev.includes(item)) {
                prev.push(item)
            }
        })
    }
}
//


function getCaller2(targetIndex = 0) {
    const matches = getErrorStack2()
    const keys = [
        "consoleLog",
        "getCaller",
        "getCallerObject",
        "log",
        "getCaller2",
    ]
    const startIndex = matches.findIndex(([name]) => {
        return keys.includes(name)
    })

    let [caller, file, line] = matches[startIndex + 1 - targetIndex  ]
    if (/\[/.test(caller)) {
        caller = search(/(\w+).*? (\w+)/, caller).join(".")
    }
    if (caller == 'ModuleJob.run') {
        caller = 'GlobalContext'
    }
    return {
        caller,
        file: tail(file),
        lineNumber: line,
        string: `${caller} @ ${tail(file)}:${line}`,
    }
    return `${caller} @ ${tail(file)}:${line}`
}

function getErrorStack3(e, mode = String) {
    const s = (e || new Error()).stack
    const r = /^error$|promise.all|handlemain|esm|module.job|consoleTest|geterror/i
    const f = (line) => {
        if (r.test(line)) {
            return false
        }
        return true
    }
    const lines = lineGetter(s).filter(f)
    return mode == String 
        ? lines.join('\n')
        : lines
}
function getErrorStack2(e) {
    const r = /^ *at (?:new )?(\w+\.\w+ \w+ \[.*?\]|\S+) \((.*?):(\d+)/gm
    const s = (e || new Error()).stack
    return findall2(r, s)
}

function findall2(r, s) {
    assertion2(r.flags, has, 'g')

    const store = []
    const get = (m) => {
        return m.length == 1
            ? m[0]
            : smallify(m.slice(1).filter(isDefined))
    }

    s = s.toString()
    while (true) {
        const m = r.exec(s)
        if (m) {
            store.push(get(m))
        } else {
            return store
        }
    }
}

function waterfall2(items, onTick, delay = 1000) {
    let id
    let i = 0
    let length = items.length

    return new Promise((resolve) => {
        const runner = () => {
            let item = items[i++]
            onTick(item)
            if (i == length) {
                clearTimeout(id)
                setTimeout(resolve, delay)
            } else {
                id = setTimeout(runner, delay)
            }
        }
        runner()
    })
}

function getCodeWords2(s) {
    const r = /[$_a-zA-Z][$\w.]{4,}[\w$]/g
    const a = variables.javascriptReservedWords
    const b = variables.pythonReservedWords
    return unique2(findall2(r, s), a.concat(b))
}

function set(a) {
    return Array.from(new Set(a))
}

function unique2(a, b) {
    if (isDefined(b)) {
        const f = (x) => isArray(b) ? !b.includes(x) : b != x
        return set(a.filter(f))
    }
    return set(a)
}

function isJson(s) {
    return getExtension(s) == 'json'
}

function argo(fn, arg) {
    if (isPlural(getParameters(fn)[0])) {
        return fn(toArray(arg))
    } else {
        return fn(toString(arg))
    }
}

function appendFileName(s, payload) {
    const r = /\.(?:js|py)$/
    return s.replace(r, (x) => '.' + payload + x)
}

function getBindings2(s) {
    const r = /^(?:class|const|var|(?:async )?function) ([\w$]+)/gm
    return findall2(r, s)
}



function push2(items, item, checkpoint) {
    if (isDefined(item) && (!checkpoint || checkpoint(item))) {
        items.push(item)
        return item
    }
}

class IndexedCache extends Cache {
    constructor(fn) {
        super(fn)
    }
    reset() {
        super.reset()
        this.count = 0
        this.indexMap = {}
    }
    set(x, y) {
        if (y == null) return 
        if (!Object.values(this.indexMap).includes(x)) {
            this.indexMap[this.count++] = x
        }
        super.set(x, y)
    }
    get(x, y) {
        if (isNumber(x)) {
            const keys = Object.keys(this.indexMap)
            const index = indexGetter2(keys, x)
            x = this.indexMap[index]
        }
        return super.get(x, y)
    }
}

function testf2(x, mode) {
    if (!x) {
        return 
    }
    switch (mode) {
        case Object:
            switch (type(x)) {
                case "RegExp":
                    return (s) => x.test(s.value)
                case "Function":
                    return x
                default:
                    return (s) => s.value === x
            }
        default:
            switch (type(x)) {
                case "RegExp":
                    return (s) => x.test(s)
                case "Function":
                    return x
                default:
                    if (isString(x) && x.startsWith('/')) {
                        const [a,b] = search(/\/(.*?)\/(\w*)$/, x)
                        const r = RegExp(a, b)
                        return (s) => r.test(s)
                    }
                    return (s) => s === x
            }
    }
}

function indexGetter2(arr, i) {
    if (isNumber(i)) {
        if (i < 0) {
            return arr.length + i
        }
        return i
    }
    return findIndex2(arr, i)
}

function findIndex2(arr, x, reverse) {
    const fn = testf2(x)
    if (reverse) {
        for (let i = arr.length - 1; i >= 0; i--) {
            let el = arr[i]
            if (fn(el)) {
                return i
            }
        }
        return null
    }
    const index = arr.findIndex(fn)
    return index > -1 ? index : null
}

function insert2(arr, i, item) {
    if (item == null) {
        return
    }
    const index = indexGetter2(arr, i)
    if (isDefined(index)) {
        arr.splice(index, 0, item)
    }
    return item
}

function remove2(arr, i) {
    const index = indexGetter2(arr, i)
    if (isDefined(index)) {
        return arr.splice(index, 1)[0]
    }
}

function pop2(x, key, fallback) {
    if (x == null) {
        return fallback 
    } 
    else if (isArray(x)) {
        const index = findIndex2(x, key)
        if (isDefined(index)) {
            return x.splice(index, 1)[0]
        } else {
            return fallback
        }
    } 
    else if (key in x) {
            const value = x[key]
            //console.log('deleted', value)
            delete x[key]
            return value
    } 
}

function type2(s) {
    if (s === undefined) {
        return "Undefined"
    }
    if (s === null) {
        return "Null"
    }
    if (s == null) {
        return "null"
    }
    if (typeof s === "number" && s.toString() == "NaN") {
        return "NaN"
    }
    return s.constructor.name
}

function reduce2(items, fn) {
    const computedItems = entries(items)
    const asDouble = isNestedArray(computedItems)
    const k =
        fn.length == 2 &&
        isArray(computedItems[0]) &&
        computedItems[0].length == 2
    const g = k ? abf(fn) : fn

    return computedItems.reduce((acc, item, i) => {
        const value = g(item)
        if (value == null) {
            return acc
        }
        if (isArray(value) && value.length == 2) {
            const [a, b] = value
            acc[a] = b
        } else if (asDouble) {
            acc[item[0]] = value
        } else {
            acc[item] = value
        }
        return acc
    }, {})
}

function isObjectOrModule(x) {
    return typeof x == 'object' && !isArray(x)
}
function evaluate2(s, scope = true) {
    try {
        const value = isObjectOrModule(scope)
            ? scopedEvaluator(s, scope)
            : scope === true
            ? eval(s)
            : (1, eval)(s)

        return { success: isDefined(value) ? value : true }
    } catch (e) {
        return { error: parseError2(e) }
    }

    function scopedEvaluator(s, scope) {
        const evaluator = Function.call(
            null,
            ...Object.keys(scope),
            "expr",
            "return eval('expr = undefined;' + expr)"
        )
        return evaluator.call(
            null,
            ...Object.values(scope),
            s
        )
    }
}


function unshift2(items, x) {
    if (x == null) {
        return
    }
    items.unshift(x)
    return x
}

function findItem2(items, key) {
    const index = indexGetter2(items, key)
    if (index == null) {
        return
    }
    return items[index]
}

function doUntil2(fn, limit = 10) {
    let count = 0
    while (++count <= limit) {
        	const value = fn(count)
          if (value === false) {
              return 
          }
          if (isDefined(value)) {
              return value
          }
    }
}

function curry2(...args) {
    function curryEnd(f, ...args) {
        return function lambda(...a) {
            return f(...a, ...args)
        }
    }

    function curryStart(f, ...args) {
        return function lambda(...a) {
            return f(...args, ...a)
        }
    }
    if (isFunction(args[0])) {
        return curryEnd(...args)
    }
    return curryStart(args.pop(), ...args)
}

function xsplit2(s) {
    if (empty(s)) {
        return []
    }
    if (isArray(s)) {
        return s
    }

    const getRegex = (s) => {
        const r = / *[,|]+ *|\s+/
        return r
    }

    const r = getRegex(s)
    return s.trim().split(r).filter(exists).map(toNumber)
}
function sortByIndex(items) {
    let item = items[0]
    let key
    if (items[0].hasOwnProperty('sortIndex')) {
        key = 'sortIndex'
    } else if (items[0].hasOwnProperty('index')) {
        key = 'index'
    } else {
        return items
    }

    items.sort((a, b) => {
        return (a[key] || 1000) - (b[key] || 1000)
    })
    return items
}



function addDictProperty(o, parentKey, childKey, item) {
    if (!isDefined(item)) {
        return 
    }
    if (o.hasOwnProperty(parentKey)) {
        o[parentKey][childKey] = item
    } else {
        o[parentKey] = {[childKey]: item}
    }
}

function insert3(a, pos, item) {
    if (!isDefined(item)) {
        return 
    }
    if (pos == 0) {
        a.unshift(item)
    }
    else if (pos == null) {
        a.push(item)
    }
    else {
        a.splice(pos, 0, item)
    }
}
function addArrayProperty(o, key, item, pos) {
    if (!isDefined(item)) {
        return 
    }
    if (o.hasOwnProperty(key)) {
        insert2(o[key], pos, item)
    } else {
        o[key] = [item]
    }
}

class CPFBuilder {
    constructor(base = {}) {
        this.base = deepCopy(base)
        this.preParsers = []
        this.postParsers = []
    }
    prepareWith(fn) {
        this.preParsers.push(fn)
        return this
    }
    addBranchItem(regex, fn) {
        const item = {regex, fn}
        addArrayProperty(this.base, 'branches', item, 0)
        return this
    }
    addDictItem(dictKey, fnKey, fn) {
        const key = findKey(this.base, dictKey, dictKey + 'Dict')
        addDictProperty(this.base, key, fnKey, fn)
        return this
    }
    build() {
        const parser = create(this.base)
        const parsers = flat(this.before, parser, this.after)
        return compose(...parsers)
    }
}

function stringBreakerBefore(s) {
    return s.replace(/.*?breaker\s*/s, '')
}

function stateGetter2(state, keys, clean, deleteIt) {
    if (clean || deleteIt) {
        return reduce(flat(keys), (key) => {
            if (deleteIt) {
                const value = pop2(state, key)
                //console.log({deletedValue: value}, key)
                return value
            }
            return state[key]
        })
    }
    return reduce2(flat(keys), (key) => {
        return [key, state[key]]
    })
}

function toArray2(val) {
    if (!val) {
        return []
    }
    if (isArray(val)) {
        return val
    }
    if (isObject(val)) {
        panic('cannot be an object')
    }
    if (isSet(val)) {
        return Array.from(val)
    }
    return [val]
}

function dedent2(s, n) {
    const flags = isArray(s) ? '' : 'gm'
    const r = n == null
        ? /^ +/gm
        : isNumber(n)
        ? RegExp('^' + ' '.repeat(n), flags)
        : RegExp('^' + n, flags)
    function runner(s) {
        return s.replace(r, '')
    }
    return isArray(s) ? s.map(runner) : runner(s)
}
function smartDedent2(s) {
    if (empty(s)) {
        return ''
    }
    if (isString(s)) {
        if (!s.trim().includes('\n')) {
            return s.trim()
        }
        const text = s.replace(/^\n+/, '').trimEnd()
        if (/^\S/.test(text)) {
            return text
        }
        const spaces = getIndent(text)
        const r = RegExp('^' + ' '.repeat(spaces), 'gm')
        return s.replace(r, '').replace(/^\n+/, '')
    }
    if (isArray(s)) {
        let spaces1 = getSpaces(s[0])
        let spaces2 = getSpaces(getLast(s))
        if (spaces1 == spaces2) {
            return dedent2(s, spaces2).join('\n')
        } else {
            return dedent2(s, spaces1).join('\n')
        }
    }
}

function searchf2(x) {
    if (isFunction(x)) {
        return x
    }
    if (isString(x)) {
        x = RegExp(x)
    }
    return function lambda(s) {
        return search(x, s)
    }
}

function makeRunner2(items) {
    const runners = partition(items).map(atFirst(searchf2))
    return function lambda(s, i) {
        for (let [a, b] of runners) {
            let m = a(s)
            if (m) {
                return b(...m)
            }
        }
    }
}
function warn(...args) {
    if (args.length == 1 && isNull(args[0])) {
        return 
    }
    const m = 'WARN: ' + args.map(errorStringify).join(' | ')
    const message = chalk3(m, 'red', true)
    throw new Error(message)
}

function chalk(a, b) {
    if (!isNode()) {
        return browserChalk(a, b)
    }
        const colors = {
            BLACK: '\x1b[30m',
            RED: '\x1b[31m',
            GREEN: '\x1b[32m',
            YELLOW: '\x1b[33m',
            BLUE: '\x1b[34m',
            RESET: '\x1b[0m',
            BRIGHT: '\x1b[1m',
        }
        if (a.toUpperCase() in colors) {
            return console.log(colorIt(a.toUpperCase(), b))
        }
    if (hasNewline(a) && b == null) {
        a = ''
        b = a
    }
    const color = /fail|warn|error/i.test(a)
        ? 'red'
        : 'blue'

    console.log(colorIt(color, a, true), colorIt(color, b))

    function colorIt(color, s, bold = '') {
        if (!isPrimitive(s)) {
            return s
        }

        function getColor(color) {
            return colors[color] || colors[color.toUpperCase()] || color
        }

        if (bold) {
            bold = colors.BRIGHT
            if (hasNewline(s)) {
                s += ':\n'
            } else {
                s += ':'
            }
        }
        return getColor(color) + bold + s + colors.RESET
    }
}
function chalk4(arg, color, bold) {
    if (isNode()) {
        const colors = variables.terminalColors
        const colorValue = colors[color.toUpperCase()]
        const boldValue = bold ? colors.BOLD : ''
        const v = colorValue + boldValue + stringify(arg) + colors.RESET
        console.log(v)
    }
    return arg
}
function chalk3(arg, color, bold) {
    const colors = variables.terminalColors
    const boldValue = bold || isCapitalized(color) ? colors.BOLD : ''
    const colorValue = colors[color.toUpperCase()] || ''
    return colorValue + boldValue + str(arg) + colors.RESET
}

function chalk2(color, ...args) {
    const colors = variables.terminalColors
    const terminalColor = colors[color.toUpperCase()]
    console.log(terminalColor, ...args, colors.RESET)
}

function splitArray(items, x, mode = '>') {

    console.info('changed splitArray on 01-16-2024')

    const index = isNumber(x) ? x : items.findIndex(equalf(x))
    const ref = {
        '=': [0, 1],
        '<': [1, 1],
        '>': [0, 0],
    }
    const [a,b] = ref[mode]
    return [items.slice(0, index + a), items.slice(index + b)]

    // prev
    // const index = items.find(equalf(x))
    // if (isDefined(index)) {
        // return [items.slice(0, index), items.slice(index + 1)]
    // }
}

function vueWrap(s) {
    //throw new Error()
    return `{{${s}}}`
}

function fill2(x, longest, fallback) {
    if (fallback == null) fallback = x[0]
    while (x.length < longest) {
        x.push(fallback)
    }
}

function merge2(...args) {
    args = args.filter(exists)
   switch (type(args[0])) {
       case 'Object':
           return Object.assign({}, ...args)
       case 'Array':
           return args.flat()
       default:
           panic('can only merge arrays and objects')
           ndy()
   }
}
function zip2(a, b, kd, vd) {
    const store = {}
    for (let i = 0; i < a.length; i++) {
        const c = kd && kd.hasOwnProperty(a[i]) ? kd[a[i]] : a[i]
        const d = vd && vd.hasOwnProperty(b[i]) ? vd[b[i]] : b[i]
        if (d == null) continue
        store[c] = d
    }
    return store
}



function splice(items, index, insertions) {
    const eIndex = indexGetter2(items, index)
    items.splice(eIndex, 1, ...insertions)
    return items
}

function debugTest(x) {
    chalk('DEBUGGING', {__VALUE__: x})
    return x
}
function edit2(base, k, v) {
    if (isObject(k)) {
        const create = (ref) => {
            return function lambda(v, k) {
                return ref[k](v)
            }
        }
        if (isObject(k)) {
            k = create(k)
        }
        return dict(base, k)
    }
    if (k in base) {
        const newValue = fparse(v, base[k])
        if (isDefined(newValue)) {
            base[k] = newValue
        }
    } 
    return base
}


function toStringArgument(x, short) {
    // console.log({x})
    // if (short && !isPrimitive(x)) {
        // console.log('ccc')
        // return prettyStringify(x)
    // }
    function parseObjectFunction(name, f) {
        const s = f.toString().replace(/\n\)/g, ')').replace(/\n\n}/g, '\n}')
        // console.log({name, s})
        let [text, isAsync] = mget(/^async/, s)
        const prefix = isAsync ? 'async ' : ''
        text = text.replace(/function */, '')
            text = text.replace(/^ *\w+ */, '')

        let a = 1
        let b = text.match(/\n( *)\S.*$/)
        if (b) {
            b = b[1].length
            if (a < b) {
                text = text.replace(RegExp(`^ {${a},${b}}`, 'gm'), '')
            }
        }
        return indent(prefix + name + text)
    }

    function parseObj(obj) {
        const quote = identity
        let s = '{\n'
        for (let [k, v] of Object.entries(obj)) {
            if (!isNativeFunction(v) && (isFunction(v) || looksLikeFunction(v))) {
                s += parseObjectFunction(k, v) + ',\n'
            } else {
                s += indent(quote(k) + ': ' + parse(v)) + ',\n'
            }
        }
        s += '}'
        return s
    }

    function parseArr(arr) {
        if (!arr.length) {
            return '[]'
        }
        if (arr.length < 8 && arr.every(isPrimitive)) {
            return '[' + arr.map(parse).join(', ') + ']'
        }
        let s = '[\n'
        for (let item of arr) {
            s += indent(parse(item)) + ',\n'
        }
        s += ']'
        return s
    }

    function parseString(s) {
        s = s.toString()
        if (s == "''" || s == '""') {
            return "''"
        }
        if (/\n/.test(s)) {
            return `\`${escapeTilda(s)}\``
        }
        if (isRegExpString(s)) {
            return s
        }
        // if (/^[a-z]+[A-Z]\w+$/.test(s)) {
            // return s
        // }
        if (/^[\[\{]/.test(s) && /[\]\}]$/.test(s)) {
            return s
        }
        if (/^(?:new *)?\w+(?:\.\w+)?\(/.test(s)) {
            return s
        }
        return escapedSingleQuote(s)
    }



    function parse(s) {
        if (s == null) return 'null'
        if (s == undefined) return 'undefined'
        if (s === '') return "''"
        if (s === true) return "true"
        if (s === false) return "false"
        if (s === 'true') return "true"
        if (s === 'false') return "false"

        if (isFunction(s)) {
            if (isNativeFunction(s)) {
                return s.name
            }
            return s.toString()
        }
        if (isObject(s)) {
            return parseObj(s)
        }
        if (isArray(s)) {
            return parseArr(s)
        }
        if (isNumber(s)) {
            return s.toString()
        }

        return parseString(s)
    }

    return parse(x)
}

function createFuzzyMatch(items, options = {}) {
    const get = (items) => {
        return isObject(items) 
            ? [Object.keys(items), true]
            : [items, false]
    }

    const [computedItems, asObject] = get(items)

    const prefix = options.matchAtStart ? '^' : ''
    return function fuzzyMatch(key) {
        const s = isString(key) ? key : key.source
        const flags = isString(key) ? 'i' : key.flags
        const r = RegExp(prefix + s, flags)
        const test = (x) => r.test(x) || r.test(abrev(x))
        const matches = computedItems.filter(test)
        return asObject ? matches.map((x) => items[x]) : matches
    }
}


function getKwargs2(s) {
    const configRE = /(:?[\w-]+) *[:=] *(.+?)(?=$|\w+ * =)/g
    //console.log({s})
    const [text, doubles] = mget(configRE, s)
    const store = {}
    doubles.forEach(([a,b]) => {
        store[a] = b.replace(/,$/, '')
    })
    split(text).forEach((item, i) => {
        store[item] = true
    })
    return store
}

function escapeHTML(s) {
  const entities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }
  return s.replace(/[&<>"']/g, (x) => entities[x])
}

function myJsonParser(s) {
    s = smartDedent(s)
    const r = /\n+(?=(?:[\w-]+:|\w+\())/
    const items = split(s, r)
    return reduce(items, (item) => {
        const [a,b] = splitOnce(item, ':')
        if (b == '') {
            const fn =  bringToLife(a)
            return [fn.name, fn]
        } else {
            const r = /^[\[\{]/
            const m = search(r, b)
            const value = m == '['
                ? lazyArray(b)
                : m == '{'
                ? lazyObject(b)
                : toArgument(b)
            return [a, value]
        }
    })
}

function lazyArray(s) {
    const text = s.replace(/^\[\s*|\s*\]$/g, '')
    const items = hasNewline(text)
        ? lineGetter(text) : split(text, 'comma')
    return items.map(toArgument)
}
function lazyObject(s) {
    const text = s.replace(/^\{\s*|\s*\}$/g, '')
    const r1 = /(\S+) *: *(.+)/g
    const r2 = /(\S+) *: *(.*?)(?: *,|$)/g
    const r = hasNewline(s) ? r1 : r2
    const items = findall(r, text)
    return dict(items, toArgument)
}

function isThisFunction(s) {
    return /\bthis\b/.test(s.toString())
}

function hasHtmlSuffix(el, force) {
    if (force) return true
    return !variables.selfClosingTags.includes(el)
}


function getFrontMatter(s) {
    const text = smartDedent(s)
    const sandwichRE = /^\s*-----+\n([^]+?)\n----+/
    return mget(sandwichRE, text)
}

function removeInlineComments(s) {
    return s.replace(/ *\/\*.*?\*\/ */, '')
}

function argParse(s) {
    return /^[\[\{'"\(]/.test(s)
        ? split(s.slice(1, -1).trim(), 'comma').map(toArgument) 
        : [s]
}

function argKwargSplit(s) {
    const r = /([^:=\s]+)(?:(?: *[=:] *)(\(.*?\)|\[.*?\]|\{.*?\}|".*?"|'.*?'|\S+))?/g

    const a = []
    const b = []
    while (true) {
        const m = r.exec(s)
        //console.log(m)
        if (m) {
            if (isDefined(m[2])) {
                const value = [m[1], toArgument(m[2])]
                b.push(value)
            } else {
                a.push(m[1])
            }
        } else {
            return [a, dict(b)]
        }
    }
}

function cumulativeSchemaAssign(base, object, schema) {
    if (empty(object)) {
        return base
    }
    return runner(base, object)

    function add(base, key, value) {
        if (schema && schema[key] == 'merge') {
            base[key] = merge(base[key], value)
        } else {
            base[key] = value
        }
    }

    function runner(base, x) {
        Object.entries(x).forEach(([k,v]) => {
            if (v == null) {
                return 
            } else if (base[k] && isObject(v)) {
                runner(base[k], v)
            } else {
                add(base, k, v)
            }
        })
        return base
    }
}
function removeAllComments(s) {
    const r = /^ *(?:\/\/|\/\*[^]*?\*\/).*\n*/gm
    return s.replace(r, '')
}
function iterator(generator, n, ...args) {
    if (n == null) {
        n = 10
    }
    const gen = generator(...args)
    const store = []
    for (let i = 0; i < n; i++) {
        const value = gen.next()
        if (value.done || value.value == null) return store
        store.push(value.value)
    }
    return store
}


function compareTwoFunctions(a, b, ...args) {
    const A = a(...args)
    const B = b(...args)
    const R = { A, B, equal: A === B }
    console.log(R)
    return R
}

function extend(a, b, unique) {
    if (!a || empty(b)) {
        return 
    }
    if (isArray(a)) {
        if (unique) {
            b.forEach((item, i) => {
                if (a.includes(item)) {
                    return 
                }
                a.push(item)
            })
        } else {
            isArray(b) ? a.push(...b.filter(isDefined)) : push2(a, b)
        }
    }
    if (isObject(a)) {
        if (isObject(b)) {
            Object.assign(a, b)
        }
        throw new Error()
    }
}

function exporter2(State, ...args) {
    const state = isClassFunction(State)
        ? new State(...args)
        : State

    const keys = ['run', 'build']
    const key = keys.find((x) => x in state)
    return state[key].bind(state)
}

class ArrayState {
    get empty() {
        return empty(this.store)
    }
    constructor() {
        this.reset()
    }
    push(val) {
        push2(this.store, val)
    }
    reset() {
        this.store = []
    }
    toJSON() {
        return this.store
    }
}
//console.log(toArgument('hi'))

function coerceToObject(x) {
    if (empty(x)) {
        return 
    }
    if (!isObject(x)) {
        return { value: x }
    }
    return x
}
function nchalk(s) {
    const {caller, lineNumber} = getCaller2(1)
    const m = `@${caller} line:${lineNumber}`
    return chalk(m, s)
}
//console.log(partition(['a', 'b', 'c', 'd', 'e'], (x) => x == 'b'))

function dashSplit3(s, n = 20) {
    const r = RegExp(`^-{${n},}`, 'm')
    const text = smartDedent2(s)
    return split(text, r)
}
//console.log(dashCase('MyMathWebsiteV1'))

//console.log(exists(1))

function once(state, callback, key = '__once__') {
    if (state[key]) {
        return 
    }
    state[key] = true
    try {
        callback()
    } catch(e) {
        console.log("ERRORRRRRRRR", e.stack)
    }
}


function mergeObjects(...args) {
    return Object.assign({}, ...flat(args))
}

function slice2(s) {
    return s.slice(1, -1)
}

function itemGetter(state, key) {
    if (state.hasOwnProperty(key)) {
        return state[key]
    }
}

function difference(items, ...args) {
    const store = []
    const a = Array.from(items)
    const b = flat(args)
    for (const arg of a) {
        if (b.includes(arg) || store.includes(arg)) {
            continue
        }
        store.push(arg)
    }
    return store
    return Array.from(new Set(a)).filter((x) => !b.includes(x))
}
function intersection(a, b) {
    const c = Array.from(b)
    return Array.from(a).filter((x) => c.includes(x))
}


function searchAll(r, s) {
    assertion2(r.flags, has, 'g')

    const store = []
    s = s.toString()
    while (true) {
        const m = r.exec(s)
        if (m) {
            store.push(m.index)
        } else {
            return store
        }
    }
}

function objectf(key = 'value') {
    return function lambda(s) {
        if (isObject(s)) {
            return s
        }
        return {[key]: s}
    }
}


function toSpaces(x) {
    if (isNumber(x)) {
        const n = Math.max(0, x)
        return " ".repeat(n)
    }
    return x.replace(/\t+/, (x) => ' '.repeat(x.length * 4))
}



function isStringFunction(s) {
    return /^(?:async|function|\w+\(|^.*? => )/.test(s)
}

function conditional(fn, condition, gn) {
    return function lambda(...args) {
        return condition(args[0]) ? gn(...args) : fn(...args)
    }
}

function myError(message, ...args) {
    throw new MyError(message, ...args)
}

function boundary(r) {
    return `\\b${r}\\b`
}

function logf(fn) {
    if (isString(fn)) {
        return function lambda() {
            console.log(fn)
        }
    }
    if (isFunction(fn)) {
        return function lambda(...args) {
            const value = fn(...args)
            console.log({value, args})
            return value
        }
    }
}

function getCodeChunks(s) {
    const r = /\n+(?=\w)/
    return split(smartDedent(s), r)
}

function checkValue(fn, ...args) {
    /* dev */
    const compareValue = args.pop()
    const value = fn(...args)
    const equalsCompareValue = value === compareValue
    const payload = {
        args,
        value,
        compareValue,
        equalsCompareValue,

    }
    console.log(payload)
}

//const fm = createFuzzyMatch(['a', 'b', 'c', 'd', 'ev', 'bb', 'voo'])
//console.log(fm('v'))
//const aa = {a:1, b:2, c:{d:1}}
//console.log(aa.g.d)
//console.log(mergeObjects(null, {a:1}))
function sort(items, fn, reverse) {
    // return sort2(items, fn, reverse)
    // const measureByLength = (x) => isNumber(x) ? x: len(x)
    const measureByLength = identity
    const getFn = (fn) => {
            if (isString(fn)) {
                if (fn in items[0]) {
                    return (x) => x[fn]
                }
                panic('fn is a string key, but it is not present in items[0]')
            }
        if (isNestedArray(items) || isObject(items)) {
            if (fn == null) {
                    return (x) => measureByLength(x[1])
            }
            if (fn.length == 2) {
                return (x) => fn(...x)
            }
            return (x) => {
                return fn(x[1])
            }
        }

        if (fn == null) {
                return measureByLength
        }
        /* hmm */
        if (fn.length == 2) {
            return (x) => fn(x)
        }
        return fn
    }

    const gn = getFn(fn)

    function wrap(x) {
        if (x === true) {
            return 0
        }
        if (x === false) {
            return 1000
        }
        return x
    }
    function runner(a, b) {
        const A = wrap(gn(a))
        const B = wrap(gn(b))
        return reverse
            ? (isString(A) ? B.localeCompare(A) : B - A)
            : (isString(A) ? A.localeCompare(B) : A - B)
    }

    return isObject(items) 
        ? dict(Object.entries(items).sort(runner))
        : items.sort(runner)
}

// asdfsdf
    // sdfsdf
function smartDedent4(s) {
    const startingSpacesRE = /^\s*\n( +)/
    const endingSpacesRE = /( +)\n+$/
    const startingSpaces = match(s, startingSpacesRE)
    const endingSpaces = match(s, endingSpacesRE)
    const spaces = startingSpaces || endingSpaces
    const value = spaces ? dedent4(s, spaces) : s
    return value.trim()
}
function smartDedent5(s) {
    let indent = 0
    s = s.trimEnd().replace(/^\s+/, (m) => {
        const spaces = match(m, / +$/)
        if (spaces) {
            indent = spaces.length
        }
        return ''
    })
    if (indent) {
        const r = RegExp(`^ {${indent}}`, 'gm')
        return s.replace(r, '')
    }
    return s
}
function smartDedent3(s) {
    let spaces
    if (spaces = getLastSpaces(s)) {
        return s.replace(RegExp(`^${spaces}`, 'gm'), '')
    }

    if (spaces = getFirstSpaces(s)) {
        return s.replace(RegExp(`^${spaces}`, 'gm'), '')
    }

    if (spaces = getSecondSpaces(s)) {
        spaces = spaces.slice(4)
        return s.replace(RegExp(`^${spaces}`, 'gm'), '')
    }
    return s
}
function getSecondSpaces(s) {
    return search(/^.*?\n( +)/, s)
}

function getFirstSpaces(s) {
    return search(/^\n*( +)/, s)
}

function getLastSpaces(s) {
    return search(/\n( +)\n*$/, s)
}

function sandwich(fn) {
    chalk('blue', '-'.repeat(20))
    fn()
    chalk('blue', '-'.repeat(20))
}



function pushf(fn) {
    const store = []
    function lambda(...args) {
        const value = fn ? fn.call(this, ...args) : args[0]
        push2(store, value)
        return value
    }
    lambda.value = store
    return lambda
}


function getMethodCaller(jobName = 'createError') {
    const stack = getStackTrace(new Error())
    const moduleJobIndex = stack.findIndex(([name]) => name == jobName)
    const target = stack[moduleJobIndex + 1]
    const [caller, lineNumber] = target
    return {
        caller, lineNumber
    }
}

function getParameters2(s) {
    if (!s) return []
    const t = search(/\(.+/, s.toString())
    const r = /\w+ *= *\S+|['"]?\w+/g
    const m = t.match(r)
    if (m) {
        return m.filter((x) => /^[a-zA-Z]/.test(x)).map(getFirstWord)
    }
    return []
}

function sprawlFactory(text, r) {

    /* 
     * 
     * */
    
    const runner = (a, increment) => {
        while (true) {
            let ch = text.charAt(a)
            if (ch == null) {
                return a - increment
            }
            if (r.test(ch)) {
                a += increment
                continue
            }
            return a
        }
    }
    return runner
}

function getTextAndCommand(s, key) {
    const raw = split(smartDedent4(s), 'linebreak')
    const items = partition(raw)
    const item = key
        ? items.find(([a,b]) => RegExp(key).test(a))
        : items.find(([a,b]) => /^\w/.test(a))

    let [first, text] = item
    text = stringBreaker(text)
    text = smartDedent3(text)
    const [command, comments] = splitOnce(first, /\n/)

    return {
        text,
        command,
    }
}

function buildDict(s, fn) {
    return dict(partition(getChunks(s)).map(atSecond(fn)))
}
//console.log(argParse('[123]'))

function fuzzyMatch2(choices, input, {multiplePass = true, matchAtStart = true} = {}) {
    if (empty(choices)) return 
    if (choices.includes(input)) return input

    const prefix = matchAtStart ? '^' : ''
    const r = RegExp(prefix + input, 'i')
    const startTest = (x) => r.test(x)

    if (!multiplePass) {
        return choices.filter(startTest)
    }

    const abrevTest = (x) => r.test(abrev(x))
    const firstPass = choices.filter(abrevTest)

    if (exists(firstPass)) {
        return firstPass[0]
    }

    const secondPass = choices.filter(startTest)

    if (exists(secondPass)) {
        return secondPass[0]
    }
}

function mixinIterator(state, x) {
    
    const prefix = '_'.repeat(10)
    const itemKey = prefix + 'item'
    const indexKey = prefix + 'index'
    state[Symbol.iterator] = function () {
        this[itemKey] = isFunction(x) 
            ? x(this.store)
            : Array.from(this[x])

        this[indexKey] = 0
        return this
    }

    state['next'] = function () {
        const value = this[itemKey][this[indexKey]++]
        const done = this[indexKey] > this[itemKey].length
        return { value, done }
    }
    return state
}
class QueryList {
    constructor({transform = identity, limit = 5} = {}) {
        this.transform = transform
        this.limit = limit
        this.reset()

        bind(this, 'add')
        mixinIterator(this, 'keys')
    }
    setIndex(x) {
        this.currentIndex = this.findIndex(x)
    }

    set(x) {
        this.currentIndex = this.findIndex(x)
        return x
    }
    reset() {
        this.store = {}
        this.keys = []
        this.currentIndex = 0
    }
    findIndex(x) {
        const key = this.transform(x)
        const index = this.keys.indexOf(key)
        return index
    }
    insert(x, index) {
        insert2(this.keys, index, this.transform(x))
    }
    add(x) {
        const key = this.transform(x)
        if (this.store.hasOwnProperty(key)) {
            return
        }
        this.store[key] = x
        this.keys.push(key)
    }

    find(q) {
        const key = fuzzyMatch2(this.keys, q)
        this.currentIndex = this.keys.indexOf(key)
        return this.get(key)
    }
    get(key) {
        return this.store[key]
    }
    modular(dir) {
        const nextIndex = modularIncrementIndex(this.keys.length, this.currentIndex, dir)
        const key = this.keys[nextIndex]
        const value = this.get(key)
        //console.log({keys: this.keys, currentIndex: this.currentIndex, nextItem: key, value})
        this.currentIndex = nextIndex
        return value
    }
}
function conditionalPrefix(prefix, s) {
    return s ? (RegExp('^' + prefix, 'i').test(s) ? s : prefix + s ) : s
}

function conditionalSuffix(s, suffix) {
    return s ? (RegExp(suffix + '$', 'i').test(s) ? s : s + suffix ) : s
}

function getIdentifiers(s) {
    const r = /^(?:class|const|(?:async )?function) ([$\w]+)/gm
    return findall(r, s)
}

function getIdentifier(s) {
    const r = /^(?:class|const|var|(?:async )?function) (\w+)/
    return match(s, r)
}

// function raise(x) {
    // throw new Error(stringify(x))
// }
//console.log(info(new Date))


function raise(name, message, ...args) {
    if (isError(name)) {
        name.stack = crayonbox.red(name.stack)
        name.message = crayonbox.red(name.message)
        throw name
    }
    if (arguments.length == 1) {
        throw new Error(crayonbox.red(name))
    }
    const e = new Error()
    if (name) {
         const newName = crayonbox.red(conditionalSuffix(name, 'Error'), true)
         e.name = newName
    }
    if (message) {
        e.message = crayonbox.red(templater(message, args))
    }
    throw e
}

function timestamp() {
    return Date.now()
}

async function timeLog(callback) {
    loggg('start ------------------')
    const value = await callback()
    loggg(value)
    loggg('end   ------------------')

    function loggg(message) {
      const timestamp = new Date().toLocaleTimeString();
      if (isNode()) {
          chalk(timestamp, message)
      } else {
          console.log(`%c[${timestamp}] %c${message}`, 'color: gray', 'color: inherit');
      }
    }
}
function partial(...args) {
    function curryEnd(f, ...args) {
        return function lambda(arg) {
            return f(arg, ...args)
        }
    }

    function curryStart(f, ...args) {
        return function lambda(arg) {
            return f(...args, arg)
        }
    }

    return isFunction(args[0])
        ? curryEnd(...args)
        : curryStart(args.pop(), ...args)
}

//console.log(reduce2({a:1, b:2, c:3}, (k, v) => k + v))

function supermix2(parent, ref, state) {

    if (state == null) state = parent

    return runA(parent, ref)

    function runA(parent, ref, ...args) {
        if (ref == null) return state

        for (let [k, v] of Object.entries(ref)) {
            if (v == null) {
                continue
            }

            if (args[0] === true && parent.hasOwnProperty(k)) {
                continue
            }

            const value = runB(v, parent, ...args)
            if (value == null) {
                continue
            }
            parent[k] = value
        }
        return parent 
    }

    function runB(v, parent, ...args) {
        switch (type(v)) {
            case 'Array':    
                return v.map((x) => runB(x, parent, ...args))
            case 'Function': 
                return v.bind(state)
            case 'Object':   
                return runA({}, v, ...args)
            default:
                return v
        }
    }
}

function supermix(state, ref, specItems) {

    function bindFunctions(state, item) {
        const dest = arg || state
        for (const [name, x] of Object.entries(item)) {
            dest[name] = isFunction(x) ? x.bind(state) : x
        }
        return state
    }

    function createFromVue(state, item) {
        throw new Error()
        const container = {}
        state[item.key] = container
        for (const el of item.items) {
            container[el.alias] = function (...args) {
                state.vue[el.method](...args)
            }
        }
    }

    function createAliases(state, spec, item) {
        const aliasAliases = {
            'ControlSave': 'ctrl-s',
        }
        state[spec.key] = {}
        for (const [name, fn] of Object.entries(item)) {
            const boundFunction = fn.bind(state)
            const aliases = xsplit(topComment(fn))
            if (aliases.length == 0) {
                if (name in aliasAliases) {
                    aliases.push(aliasAliases[name])
                } else {
                    aliases.push(name)
                }
            }
            aliases.forEach((alias) => {
                state[spec.key][alias] = boundFunction
            })
            state[fn.name] = boundFunction
        }
    }

    for (const spec of specItems) {
        const item = ref[spec.key]
        switch (type(item)) {
            case 'Null':
            case 'Undefined':
                if (spec.required) {
                    const errorMessage = `${spec.key} is required.`
                    throw new Error(errorMessage)
                }
                if (spec.fallback && !state.hasOwnProperty(spec.key)) {
                    state[spec.key] = spec.fallback
                }
                break
        
            case 'Object':
                if (false) {
                    
                }
                else if (spec.createAliases) {
                    createAliases(state, spec, item)
                } 

                else if (spec.bindToRoot){
                    supermix2(state, item)
                }

                else {
                    state[spec.key] = {}
                    supermix2(state[spec.key], item, state)
                }
                break

            case 'Function':
                state[spec.key] = item.bind(state)
                if (spec.call) {
                    state[spec.key]()
                }
                break
            default:
                state[spec.key] = item
        }
    }
}


function wrapFunctionBefore(...fns) {
    const functions = filter(fns)
    return function wrappedLambda(...args) {
        for (const fn of functions) {
            fn.call(this, ...args)
        }
    }
}
//console.log(filter([undefined, 1]))

function defineProperty(Base, key, fn) {
    if (fn == null) {
        fn = key
        const value = {'get': fn, configurable: true}
        Object.defineProperty(Base.prototype, fn.name, value)
        return 
    }
    const name = /set$/i.test(fn.name || '') ? 'set' : 'get'
    const value = {[name]: fn, configurable: true}
    Object.defineProperty(Base.prototype || Base, key, value)
}

function nodeLog(...args) {
    if (isNode()) console.log(...args)
}



//function sdfj() {
    
//}

function isPureNumber(value) {
  return typeof value === 'number' && !Number.isNaN(value)
}

function numberBoundarySplit(s) {
    if (isPureNumber(s)) {
        return [s, '']
    }
    const [a,b] = s.split(/([a-zA-Z%]+)/)
    if (!b) return [Number(a), '']
    return [Number(a), b]
}
//console.log(merge2([[1,2], ['a', 'b']], [[3,4], [5,6]]))
function boundarySplit(s) {
    const r = /(\d+(?:\.\d+)?)/
    return split(s, r)
}
//console.log(boundarySplit('abc12'))

class Trie {
    static foo = identity 
    fo() {
        throw new AbstractMethodError()
    }
    constructor() {
        this.base = new TrieNode(null)
        this.keys = new Set()
    }
    toTree() {
        function run(node) {
            let s = ''
            if (node.end) {
                return ''
                return node.key
            }
            //px
            //if (len(node.children) === 1) {
                //return Object.keys(node.children)[0]
            //}
            //const store = {}
            //console.log(len(node.children), node)

            const f = (a, b) => {

            }
            const items = map(node.children, f)
            for (const [k, v] of Object.entries(node.children)) {
                console.log({k})
                let value = run(v)
                s += k + value
                //const value = run(v)
                //console.log({value})
                //store[k] = value
            }
            //px py pxz | pxa pxb -> px[ab]
            //p(?:xz|y)

            return s
            return store
        }
        return run(this.base)
    }
    toJSON() {
        return Array.from(this.keys)
    }
    remove(key) {
        if (!this.keys.has(key)) {
            return 
        }
        this.keys.delete(key)
        const node = this.getNode(key)
        delete node.parent.children[node.key]
    }

    add(key) {
        this.keys.add(key)
        let node = this.base

        const points = Array.from(key)

        for (const i in points) {
            const point = points[i]
            if (!node.children[point]) {
                node.children[point] = new TrieNode(point)
                node.children[point].parent = node
            }

            node = node.children[point]

            if (i == key.length - 1) {
                node.end = true
            }
        }
    }

    has(key) {
        return !!this.getNode(key).end
    }
    getNode(key) {
        
        let node = this.base

        const points = Array.from(key)

        for (const i in points) {
            const point = points[i]

            if (node.children[point]) {
                node = node.children[point]
            } else {
                return false
            }
        }
        return node
    }

    get(key) {

        const output = []
        let node = this.getNode(key)
        if (!node) return output

        const stack = [node]
        while (stack.length) {
            node = stack.shift()
            if (node.end) {
                output.unshift(node.getWord())
            }

            for (var child in node.children) {
                stack.push(node.children[child])
            }
        }

        return output
    }
}

class TrieNode {
    constructor(key) {
        this.key = key
        this.parent = null
        this.children = {}
        this.end = false
    }

    getWord() {
        let output = []
        let node = this

        while (node !== null) {
            output.unshift(node.key)
            node = node.parent
        }

        return output.join("")
    }
}

class AbstractMethodError extends Error {
    constructor() {
        super('Abstract Method Not Implemented')
    }
}
//G
//const t = new Trie()
//t.fo()
//t.add('pxa')
//t.add('pxb')
//console.log(t.toTree())

//console.log(numberBoundarySplit('r3'))

function allUnique(x) {
    return unique(x).length === x.length
}

//console.log(modularIncrementNumber(9, 1, 1, 9))

function smartestDedent(s) {
    return smartDedent3(s)
}

//Taking class.
//Teaching class.
//Eternal Learners

function brackify2(x) {
    if (isArray(x)) {
        const spaces = ' '.repeat(4)
        const comma = ','
        const f = (x) => `${spaces}${x}${comma}`
        const value = x.filter(isDefined).map(f).join('\n')
        return `{\n${value}\n}`
    }
    ndy()
}

//console.log(type(String))

function argMatch(args, ...keys) {
    const seen = []
    function is(x) {
        if (isNumber(x)) return 'Number'
        if (isString(x)) return 'String'
    }
    return keys.map((key, i) => {
        const t = type(key)
        return args.find((arg, i) => {
            if (seen.includes(i)) return 
            if (is(arg) === t) {
                seen.push(i)
                return true
            }
        })
    })
}
//console.log(empty(4))

class MyError extends Error {
    constructor(message, ...args) {
        const computedMessage = [
            chalk3(message, 'red', true),
            exists(args) ? chalk3({args}, 'blue') : null
        ].filter(isDefined).join(' ')

        super(computedMessage)
    }
}
class CustomError extends Error {
    constructor(message, template, state) {
        const computedMessage = isNode() ? '\x1b[31m\x1b[1m' + message + '\x1b[0m' : message
        super(computedMessage)
        if (template) this.template = template
        if (state) this.state = state
            console.log(this.stack)
    }
}


function prettyStringify(o, options = {}) {
    if (isPrimitive(o)) {
        return o
    }
    // https://github.com/lydell/json-stringify-pretty-compact/blob/main/index.js
  const stringOrChar = /("(?:[^\\"]|\\.)*")|[:,]/g;
  const indent = JSON.stringify(
    [1],
    undefined,
    options.indent === undefined ? 2 : options.indent
  ).slice(2, -3);

  const maxLength =
    indent === ""
      ? Infinity
      : options.maxLength === undefined
      ? 80
      : options.maxLength;

  let { replacer } = options;
  if (!replacer) replacer = prettyStringifyReplacer

  return (function _stringify(obj, currentIndent, reserved) {
    if (obj && typeof obj.toJSON === "function") {
      obj = obj.toJSON();
    }

    const string = JSON.stringify(obj, replacer);

    if (string === undefined) {
      return string;
    }

    const length = maxLength - currentIndent.length - reserved;

    if (string.length <= length) {
      const prettified = string.replace(
        stringOrChar,
        (match, stringLiteral) => {
          return stringLiteral || `${match} `;
        }
      );
      if (prettified.length <= length) {
        return prettified;
      }
    }

    if (replacer != null) {
      obj = JSON.parse(string);
      replacer = undefined;
    }

    if (typeof obj === "object" && obj !== null) {
      const nextIndent = currentIndent + indent;
      const items = [];
      let index = 0;
      let start;
      let end;

      if (Array.isArray(obj)) {
        start = "[";
        end = "]";
        const { length } = obj;
        for (; index < length; index++) {
          items.push(
            _stringify(obj[index], nextIndent, index === length - 1 ? 0 : 1) ||
              "null"
          );
        }
      } else {
        start = "{";
        end = "}";
        const keys = Object.keys(obj);
        const { length } = keys;
        for (; index < length; index++) {
          const key = keys[index];
          const keyPart = `${JSON.stringify(key)}: `;
          const value = _stringify(
            obj[key],
            nextIndent,
            keyPart.length + (index === length - 1 ? 0 : 1)
          );
          if (value !== undefined) {
            items.push(keyPart + value);
          }
        }
      }

      if (items.length > 0) {
        return [start, indent + items.join(`,\n${nextIndent}`), end].join(
          `\n${currentIndent}`
        );
      }
    }

    return string;
  })(o, "", 0);
}
function type3(x) {
    if (x.type) {
        if (isString(x.type)) {
            return x.type
        }
        return type3(x.type)
    }
    const nativeStrings = [
        'Number',
        'String',
        'Object',
        'Array',
        'Promise',
        'Set',
        'Function',
    ]
    const nativeObjects = [
        Number,
        String,
        Object,
        Array,
        Promise,
        Set,
        Function
    ]
    if (nativeStrings.includes(x)) {
        return x
    }

    if (nativeObjects.includes(x)) {
        return x.name
    }

    if (x === null) {
        return "Null"
    }
    if (x == null) {
        return "Undefined"
    }
    if (typeof x === "number" && x.toString() == "NaN") {
        return "NaN"
    }
    if (isNumber(x)) {
        return 'Number'
    }
    try {
        return x.constructor.name
    } catch(e) {
        return 'Module'
    }
}
function typeMatch(a, b) {
    return type3(a) === type3(b)
}
//console.log(new CustomError instanceof CustomError)

//console.log(null?.foo)
//function aa() {
    //return {a: 1}
//}
//var x = [
    //[aa(), [aa(), aa()]]
//]

function walk2(x, fn, checkpoint = yes) {

    return walker(x)

    function walker(x) {
        if (checkpoint(x)) {
            return fn(x)
        }
        if (isArray(x)) {
            return x.map((v) => walker(v))
        }

        if (isObjectLiteral(x)) {
            return reduce2(x, (k, v) => walker(v))
        }

        return fn(x)
    }
}
function modularIncrementIndex(size, index, dir = 1) {
    if (dir == 1) {
        if (index == size - 1) {
            return 0
        } return index + 1
    }
    if (index == 0) return size - 1
    return index - 1
}

function locWrap(value) {
    const {caller} = getCaller2(-1)
    return {
        type: getLastWord(caller),
        value: stringify(value),
    }
}

function toggleOnOff(state, key, duration) {
    state[key] = true
                    setTimeout(() => {
                        state[key] = false
                    }, duration)
}

function popIndex(items, index) {
    items.splice(index, 1)
    return items
}
//console.log(popIndex(['a', 'b', 'c', 'd', 'e'], -1))
//console.log(Object.keys())


function browserChalk(arg, color, bold) {
    const style = `color: ${color}; weight: ${bold ? 'bold': '500'}`
    console.log(`%c${stringify(arg)}`, style)
}

function longstamp() {
    return new Date().toLocaleTimeString();
}
function fac(n = 3) {
    return {
        fac() {
            console.log('bogga!', n)
        }
    }
}
var VFoo = {
    name: 'VFoo',
    props: ['value'],
    template: `
        hi
    `,
    methods: {
        ...fac(),
        foo() {
            console.log(this.template)
        },
    }
}

function componentNecroFactory() {
    const prefix = 'FUNCTION'

    function replacer(k, v) {
        if (isFunction(v)) {
            return prefix + v.toString().replace(/^function /, '')
        }
        return v
    }
    function reviver(k, v) {
        if (isString(v)) {
            if (v.startsWith(prefix)) {
                return bringToLife(v.slice(prefix.length))
            }
        }
        return v
    }

    function stringifyComponent(x) {
        return JSON.stringify(x, replacer)
    }
    function reviveComponent(s) {
        return JSON.parse(s, reviver)
    }

    if (isNode()) {
        return [stringifyComponent, reviveComponent]
    }
    window.stringifyComponent = stringifyComponent
    window.reviveComponent = reviveComponent
}
//console.log(fko(VFoo))
//let [a,b] = componentNecroFactory()
//console.log((a(VFoo)))
//console.log(b(a(VFoo)).methods.fac())
//
function defineAsyncComponent(url) {
    /* 
     * The url is going to be via firebase
     * */
    Vue.component(name, (resolve, reject) => {
        firebaseRequest(url).then((raw) => {
            resolve(setupComponent(reviveComponent(raw)))
        })
    })    
}

function setPush(items, x, fn) {
    function defaultCompare(a, b) {
        return JSON.stringify(a) === JSON.stringify(b)
    }
    if (!fn) {
        fn = defaultCompare
    }

    if (x == null) {
        return 
    }
    if (isPrimitive(x) && items.includes(x)) {
        return 
    }

    if (isObject(x) && items.some((item) => {
        return fn(x, item)
    })) {
        return 
    }

    items.push(x)
}

function toDict(items) {
    const store = {}
    if (isArray(items[0])) {
        for (let i = 0; i < items.length; i++) {
            const [a,b] = items[i]
            store[a] = b
        }
    }
    else {
    for (let i = 0; i < items.length - 1; i += 2) {
        store[items[i]] = items[i + 1]
    }
    }
    return store
}
//console.log(pipe(sayhi, saybye)('sam'))

function modifyNumber(s, fn, ...args) {
    const allNumbersRE = /-?\d+(?:\.\d+)?(?:\/\d+(?:\.\d+)?)?/g
    return String(s).replace(allNumbersRE, (prev) => {
        return fn(toNumber(prev), ...args)
    })
}
//console.log(modifyNumber('g3', (x) => x + 1))

function display(name, value, throwIt) {
    blue(name)
    if (isString(value)) {
        value = singleQuote(value)
    }
    blue(value)
    if (throwIt) {
        throw 'throwing at display'
    }
}


function assignAliases(dict, aliases) {
    smart_map(aliases, (k, v) => {
        dict[k] = dict[v]
    })
}

//const storage = new Storage(); storage.add('a', 1); storage.remove('aa'); console.log(storage)

function setPrototype(Base, fnKey, fn, override) {
    if (Base.prototype.hasOwnProperty(fnKey) && !override) {
        return 
    }
    Base.prototype[fnKey] = fn
}


function camelSlice(s, key) {
    if (key == null) {
        return camelCase(s.replace(/^[a-z].*?(?:[-]|(?=[A-Z]))/, ''))
    }
    return uncapitalize(s.replace(key, ''))
}
function prefixSlice(s, prefix) {
    if (prefix) {
        const f = (x) => x.slice(prefix.length).toLowerCase()
        const r = RegExp('^' + prefix + '[A-Z]')
        return s.replace(r, f)
    } else {
        return s.replace(/.*?[A-Z]/, (x) => x.slice(-1))
    }
}

function getCaller3(n = 0) {
    return getCaller2(-1 + n).caller
}

//console.log(lineGetter('a\n\na\na', true))



function debugDisplay(key, s) {
    if (console.hasOwnProperty(key)) {
        sandwichLog(s, 'debugDisplay: ' + key)
    }
}

function fuzzyMatch3(items, input, o = {}) {
    function make() {
        if (o.matchAnywhere || o.matchType == 'anywhere') {
            const r = o.caseSensitive ? RegExp(input) : RegExp(input, 'i')
            return function lambda(s) {
                return r.test(s)
            }
        }

        if (o.matchStart || o.matchType == 'start') {
            const r = o.caseSensitive ? RegExp('^' + input, 'm') : RegExp('^' + input, 'mi')
            return function lambda(s) {
                return r.test(s)
            }
        }

        if (o.matchAbrev || o.matchType == 'abrev') {
            return function lambda(s) {
                return abrev(s).toLowerCase() == input.toLowerCase()
            }
        }
        throw new Error('need to specify match type')
    }
    function wrap(f) {
        if (o.keys) {
            return function lambda(s) {
                if (input === '') {
                    return false
                }
                return o.keys.some((key) => {
                    if (s.hasOwnProperty(key)) {
                        return f(s[key])
                    }
                })
            }
        }
        return f
    }

    const results = items.filter(wrap(make()))
    return results
}
//console.log(fuzzyMatch3(['a', 'aaab', 'c', 'd', 'e'], 'ab', {matchAnywhere: true}))


function search3(r, s) {
    const m = s.match(r)
    if (m) {
        switch (m.length) {
            case 1: return m[0]
            case 2: return m[1]
            default: return m.slice(1)
        }
    }
}

class Clock {
    constructor({delta = 1000} = {}) {
        this.count = 0
        this.index = 0
        this.delta = delta
    }

    faster() {
        this.delta /= 2
    }

    reset() {
        this.started = false
        this.stopped = false
        this.paused = false
    }
    pause() {
        if (!this.started || this.paused) {
            return
        }
        this.paused = true
    }
    async start() { return await this.play() }

    async play() {
        if (this.started) {
            if (this.paused) {
                this.paused = false
                return await this.resume()
            } else {
                return
            }
        } else {
            this.started = true
            return await this.runner()
        }
    }
    stop() {
        this.started = false
        this.stopped = true
        clearTimeout(this.timerID)
        this.onEnd()
    }
    async resume() {
        this.paused = false
        this.started = true
        return await this.runner()
    }

    runner() {
        this.onStart()
        this.onTick()

        return new Promise((resolve, reject) => {
            const runner = () => {
                if (this.isDone()) {
                    clearTimeout(this.timerID)
                    this.onEnd()
                    return resolve('doneeeeeeeeeeeeeeeee')
                } else if (this.paused) {
                    this.count += 1
                    clearTimeout(this.timerID)
                    return resolve('paused')
                } else {
                    this.count += 1
                    this.timerID = setTimeout(() => {
                        this.onTick()
                        runner()
                    }, this.delta)
                }
            }

            runner()
        })
    }

    at(n, fn) {
        const current = this.onTick
        this._onTick = () => {
            this.count == n ? this.handle(fn.call(this)) : current()
        }
    }

    set onTick(fn) { this._onTick = this.decorate(fn) }
    set onStart(fn) { this._onStart = this.decorate(fn) }
    set onEnd(fn) { this._onEnd = this.decorate(fn) }

    get onTick() { return this._onTick || noop }
    get onStart() { return this._onStart || noop }
    get onEnd() { return this._onEnd || logf('stop') }

    isDone() {
        return this.stopped || this.getTimeLeft() <= 0
    }
    getTimeLeft() {
        return this.duration - this.count
    }
    handle(result) {
        if (result === true) {
            this.stopped = true
        } else if (isNumber(result) && this.duration) {
            const seconds = result * this.delta
            this.duration += seconds
        }
    }
    decorate(fn) {
        if (fn) {
            const runner = () => {
               return fn.call(this, this.count, this.getTimeLeft())
            }
            return runner.bind(this)
        }
    }
}


//console.log(0 % 3 === 0)

function getClassMethods(x) {
    const f = (item) => {
        if (item == 'constructor') {
            return 
        }
        return item
    }
    const r = /^ {4}(?:async )?(\w+)\(/gm
    if (type(x) == 'VueComponent') {
        return filter(unique(findall(r, x.toString())), f)
    }

    if (type(x) == 'Function') {
        return filter(unique(findall(r, x.toString())), f)
    }

    const proto = Object.getPrototypeOf(x)
    const methods = Object.getOwnPropertyNames(proto)
    return filter(methods, f)
}

function uniqueIdFactory() {
    let idCount = 0
    
    return function uniqueId() {
      return ++idCount
    }
}

function defineLazyProperty(object, propertyName, fn) {
	const define = value => Object.defineProperty(object, propertyName, {value, enumerable: true, writable: true});

	Object.defineProperty(object, propertyName, {
		configurable: true,
		enumerable: true,
		get() {
			const result = fn();
			define(result);
			return result;
		},
		set(value) {
			define(value);
		}
	});

	return object;
};
function getFunctionName(x) {
    if (empty(x)) {
        return ''
    }
    if (isFunction(x)) {
        return x.name || 'anonymous'
    }
    const functionRE = /^(?:async )?function ([\w$]+)/
    return search(functionRE, x.toString())
}
function typeLog(x) {
    const caller = getCaller2(-1).string
    const t = type(x)
    const get = (x) => {
        switch (t) {
            case 'Null':
            case 'Undefined':
                return 'NULL'
        
            case 'Object':
            case 'Array':
                return x
        
            case 'Function':
                return getFunctionName(x)
            default:
                return x
        }
    }
    chalk4({
        caller,
        type: t,
        value: get(x)
    }, 'blue')
}
//console.log(map([[1,2]], (k, v) => k + v))

function smartSplit(s) {
    return split(smartDedent(s), "linebreak")
}

        //console.log(split('a|b  |c', '|'))
        //console.log(camelSlice('i-foo'))

function mapNumber(x, fn) {
        if (isPrimitive(fn)) {
            if (fn.toString().includes('$1')) {
                return range(1, 1 + x).map((x) => {
                    const value = fn.replace(/\$1/g, x)
                    return value
                })
            }
            else {
                return range(1, 1 + x).map((x) => fn)
            }
        } else {
            if (x > 0) {
                return range(1, 1 + x).map(fn)
            } else {
                return range(1, 1 + Math.abs(x)).map((x) => fn(-x))
            }
        }
}
function map2(x, fn) {
    switch (type(x)) {
        case 'String':
            return mapArray([x], fn)
        case 'Null':
        case 'Undefined':
            return []
        case 'Number':
            return mapNumber(x, fn)
        case 'Array': 
            return mapArray(x, fn)
        case 'HTMLCollection': 
            return Array.from(x).map(fn).filter(isDefined)
        case 'Module':
        case 'Object':
            return entries(x).map(abf(fn))
        default:
            myError('not a valid mapping type', type(x))
    }
}
function isObjectLikeArray(x) {
    return isArray(x) && x[0] && typeof(x[0]) == 'object' && !isArray(x[0])
}
function mapArray(x, y) {
    const g = isClassFunction(y)
        ? (x) => new y(x)
        : isRegExp(y)
        ? curry2(y, search)
        : isObjectLikeArray(x) 
        ? (
            isString(y) 
            ? (x) => x[y]
            : isArray(y)
            ? curryEnd(mapObjectToArrayOfKeys, y)
            : y
        )
        : isString(y)
        ? curry2(y, templater)
        : y
    return x.map(g)
}
//console.log(map2(['a', 'b', 'c', 'd', 'e'], 'ab$1'))
//console.log(map2(['a', 'b', 'c', 'd', 'e'], /a/))
//console.log(map2([{a:1}], 'a'))
//console.log(sortByKeys({1:10, 4:2, 2:30}))


function sortByKeys(items) {
    return sort(entries(items), (x) => x[0])
}

function mergeSpecs(...specs) {
    const base = {}
    for (const spec of specs) {
        mergeSpec(base, spec)
    }
    return base

    function mergeSpec(base, spec) {
        for (const [k, v] of Object.entries(spec)) {
            if (base.hasOwnProperty(k)) {
                switch (type(v)) {
                    case 'Null':
                    case 'Undefined':
                        continue
                    case 'Object':
                        base[k] = mergeSpec(base[k], v)
                        break
                    case 'Array':
                        extend(base[k], v)
                        break
                    default: base[k] = v
                }
            } else {
                base[k] = v
            }
        }
        return base
    }

}


//const specA = { a: 1, }
//const specB = { b: 1 }


function getKwargsDelimitedByEqualSign(s) {
    return dict(partition(split(s, /(\S+) *= */)).map(atSecond(toArgument)))
}
function mapObjectToArrayOfKeys(o, keys) {
    return reduce2(keys, (key) => {
        const [a,b] = key.includes(' as ') ? split(key, ' as ') : [key, key]
        return [b, dictGetter(o, a)]
    })
}
//console.log(getKwargs('asdf =  asdf | asdf | xxxx aa=123'))
//console.log(map2([{a:1, b:{a:1}, c:3}], ['a', 'b.a as ddd']))


function reff(ref) {
    return function lambda(...args) {
        const key = args.pop()
        return ref[key](...args)
    }
}

function eat(s, r) {
    const store = []
    while (true) {
        const m = s.match(r)
        if (m) {
            s = s.slice(m[0].length)
            push2(store, matchGetter(m, 'search2'))
        } else {
            break
        }
    }
    return [s, store]
}

function eatStart(s, r) {
        const store = []
        while (true) {
            s = s.trimStart()
            const m = s.match(r)
            if (m) {
                s = s.slice(m[0].length)
                push2(store, matchGetter(m, 'search2'))
            } else {
                break
            }
        }
        return [s, store]
}
function getYaml(s) {
    function vt(s) {
        if (hasNewline(s)) {
            return dedent(s)
        }
        return s
    }

    const text = smartDedent(s)
    const items = split(text, /^(\S+): */m)
    return dict(partition(items), vt)
}
const getOptionsRef = {
    yaml: getYaml,
    extractStartingOptions(s) {
        const r =  /^([\w-]+) *[=:] *(.+)/
        const [text, store] = eatStart(s, r)
        return [text, dict(store)]
    },
    extractStartingJsonLikeConfig(s) {
        const r = /^([\w-]+) = ({[^]+?\n}|\[[^]+?\n\]|.+)/
        const [text, store] = eatStart(s, r)

        function f(s) {
            s = s.replace(/: +(\w.*?)(, *)?$/gim, (_, x, comma) => {
                return ': ' + (isNumber(x) ? x : addQuotes(x)) + ','
            })
            return parens(s)
        }

        function parse(s) {
            if (isJsonParsable(s)) {
                return eval(f(s))
            }
            if (s.includes(',')) {
                return xsplit2(s).map(toArgument)
            }
            return toArgument(s)
        }
        const json = reduce2(store, ([a, b]) => {
            return [a, parse(b)]
        })
        return [text.trim(), json]
    }
}

//console.log(getOptions('s = a', 'extractStartingOptions'))


//const m = new Map([[1, 2], [3, 4]])
//console.log(m.get(1))

function popEmptyLine(store) {
    if (getLast(store) == '') {
        store.pop()
        return true
    }
}

function setIndent(x, spaces) {
    if (isArray(x)) {
        x = join(x)
    }
    if (isNumber(spaces)) {
        spaces = ' '.repeat(spaces)
    }
    const initialSpaces = search(/^\n*( +)/, x) || ''
    const regexTemplate = `^${initialSpaces}`
    const r = RegExp(regexTemplate, 'gm')
    return x.replace(r, spaces)
}

function insertAtDollar(template, insertion) {
    const value = rep(template, /^( *)\$(\w+)/gm, (spaces, v) => {
        const key = toNumber(v)
        return setIndent(insertion, spaces)
    })
    return smartDedent(value)
}

function testRunner(fn, ...args) {
    const name = fn.name
    const payload = {caller: name}
    if (exists(args)) {
        payload.args = args
    }

    try {
        const t = type(fn)
        if (t == 'GeneratorFunction') {
            payload.value = iterator(fn, 10, ...args)
        } else if (t == 'Class') {
            payload.value = fn(...args)
        } else {
            payload.value = fn(...args)
        }
    } catch(e) {
        payload.error = e.toString()
    }
    console.log(payload)
}
//console.log(stringBreaker(`aaaa\nbreaker`))


function popFilter(items, x) {
    const results = filter(items, x)
    results.forEach((result) => {
        pop2(items, result)
    })
    return results
}
//const a = ['a', 'b', 'c', 'd', 'e']
//console.log(popFilter(a, ['a', 'f', 'd']))
//console.log(a)

        //console.log(shared(['a', 'b', 'c', 'd', 'e'], ['a']))



class Ct {
    constructor() {
    }

    getSet(key, create) {
        const ckey = "_" + key
        console.log({ckey, hasIt: ckey in this})
        if (ckey in this) {
            console.log('has it')
            return this[ckey]
        }
        this[ckey] = create()
        return this[ckey]
    }
    get items() {
        const f = () => {
            return [123]
        }
        return this.getSet('items', f)
    }
}
//const v = new Ct()
//console.log(v.items)
//console.log(push2(v.items, 'aaa'))
//console.log(push2(v.items, 'aaa'))
//console.log(v)

function superTransform(x, spec) {
    for (const [a, b] of entries(spec)) {
        if (a == 'filter') {
            x = filter(x, b)
        } else if (a == 'map') {
            x = map2(x, b)
        } else if (a == 'sort') {
            x = sort(x, b)
        } else if (a == 'join') {
            x = join(x)
        }
    }
    return x
}
//console.log(abrev('aa bbbC ddd'))
//console.log('aa'.slice(0, 3))

function objectGetter(x, ref) {
    function get(x) {
        return isString(x) ? ref[x] : x
    }
    return assertion2(get(x), exists)
}
function getErrorMessage(key) {
    const message = variables.assertionErrorMessages[key]
    return `${key}: ${message}`
}
//objectGetter(null)

function dunder(s, n = 2) {
    return '_'.repeat(n) + s + '_'.repeat(n)
}

function initState(state, key, value, ...args) {
    const computedKey = dunder(key)
    if (!state.hasOwnProperty(computedKey)) {
        state[completionKey] = fparse(value, ...args)
    }
    return state[completionKey]
}

function toggleState(state, key) {
    if (!state.hasOwnProperty(key)) {
        state[key] = true
        return false
    }
    const current = !!state[key]
    state[key] = !current
    return !current
}

function sortByDependencies(items, dependencyMatcher) {
    function getKey(item) {
        if (isString(item)) {
            return item
        }
        if (isObject(item)) {
            if (item.name) {
                return item.name
            }
        }
    }
    const ref = {}
    const dependencies = items.reduce((acc, item, i) => {
        const key = getKey(item)
        ref[key] = item
        acc[key] = dependencyMatcher(item)
        return acc
    }, {})

    const keys = Object.keys(dependencies)
    const seen = new Set()
    const result = []
    let i
    let item
    let length

    do {
        length = keys.length
        i = 0
        while (i < keys.length) {
            if (
                dependencies[keys[i]].every(
                    Set.prototype.has,
                    seen
                )
            ) {
                item = keys.splice(i, 1)[0]
                result.push(item)
                seen.add(item)
                continue
            }
            i++
        }
    } while (keys.length && keys.length !== length)

    return result.map((key) => ref[key]).reverse()
}

function diff(a, b) {
  const uniqueInA = a.filter(item => !b.includes(item))
  const uniqueInB = b.filter(item => !a.includes(item))
  const sharedInAB = shared(a, b)

  return {
    uniqueInA,
    uniqueInB,
    sharedInAB,
  }
}
//console.log(diff(['a', 'b', 'c', 'd', 'e'], alphabet))

function hasQuotes(s) {
   return /^['"]/.test(s)
}


function getAllKeys(obj) {
  const enumerableKeys = Object.keys(obj);
  const nonEnumerableKeys = Object.getOwnPropertyNames(obj).filter((key) => !enumerableKeys.includes(key));
  const symbolKeys = Object.getOwnPropertySymbols(obj);
  return unique(flat(enumerableKeys, nonEnumerableKeys, symbolKeys))
}

function itemGetter2(items, key) {
    if (isArray(items)) {
        return items[indexGetter2(items, key)]
    }
    if (key in state) {
        return state[key]
    }
    ndy()
}

function runFunction(x, ...args) {
    if (isString(x)) {
        return args[0][x](...args.slice(1))
    }
    return isClassFunction(x) ? new x(...args) : x(...args)
}

function getRegex(key) {
    return variables.regexLibrary[key]
}
//console.log('ab'.slice(1, 1))

function modularIncrementItem(items, item, dir = 1) {
    if (item == null) {
        return items[0]
    }
    const index = indexGetter2(items, item)
    if (dir > 0) {
        return index + 1 == items.length ? items[0] : items[index + 1]
    }
    return index == 0 ? items[items.length - 1] : items[index - 1]
}

const getOptions = reff(getOptionsRef)


let str1690589863 = `
                "$key was most likely not registered in spec.dynamicExtensions. You probably commented $key out while testing other extensions",
                { key }
            )
        }
        if (!item.hasOwnProperty("active")) {
            myError("$key is not a toggable item: $item", {
                key,
                item
            })
        }

`

function assignExisting(state, key, value) {
    if (value == null) {
        return
    }
    if (key in state) {
        state[key] = value
    }
}

function smartBind(ref, state) {
    function bind(x) {
        if (isFunction(x) && isThisFunction(x)) {
            return x.bind(state)
        }
        return x
    }

    if (!ref) {
        return
    }
    if (isObjectArray(ref)) {
        return walk(merge3(ref), bind)
    }
    if (isFunction(ref)) {
        return bind(ref)
    }
    return walk(ref, bind)
}

function removeStartingComments(s) {
    return s.replace(/^ *(?:\/\/|\/\*[\w\W]*?\*\/).*\n*/gm, '')
}
function announceCaller(value) {
    const payload = isDefined(value) ?  value : 'NULL'
    green(getCaller3(-1), payload)
}
function merge3(items) {
    if (isObjectArray(items)) {
        return Object.assign({}, ...items)
    }
    ndy()
}

//console.log(templater('$1\n    $2\n', 'aa', 'bb\ncc'))
//console.log(true == true)
//console.log(true == [])

function setAliases(state, aliases) {
    entries(aliases).forEach(([a,b]) => {
        if (state.hasOwnProperty(a)) {
            state[b] = state[a]
        }
    })
}



//const specA = { a: 1, b: 3, }
//const specB = { b: 1 }

//const specA = { a: [1], }
//const specB = { a: [2], }

//const specA = { a: { b: 1, d: [1] } }
//const specB = { a: { c: 12, d:[2] } }
//console.log(mergeSpecs(specA, specB))


function unescapeNewlines(s) {
    return s.replace(/\\n/g, "\n")
}

function escapeNewlines(s) {
    return s.replace(/\n/g, "\\n")
}

function unescapeQuotes(s) {
    return s.replace(/\\"/g, '"')
}

function escapeQuotes(s) {
    return s.replace(/"/g, '\\"')
}

function defineWindow(key, value) {
    if (isNode()) {
        return 
    }
    if (value == null) {
        return 
    }
    window[key] = value
}
function isParentWindow() {
    if (isNode()) {
        return 
    }
    return window.self === window.top;
}

function toggle(state, key, to, duration = 1000, after = null) {
    const current = state[key]
    state[key] = to
    setTimeout(() => {
        state[key] = current
        if (after) {
            after(state)
        }
    }, duration)
}

function toggle2(state, key, o = {}) {
    const current = state[key]
    state[key] = o.hasOwnProperty('to') ? o.to : opposite(current)
    setTimeout(() => {
        state[key] = current
        if (o.after) {
            o.after(state)
        }
    }, o.duration || 0)
}

function assignOnTop(base, ...keys) {
    let ref = base
    for (let i = 0; i < keys.length - 1; i++) {
        let key = keys[i]
        if (i == keys.length - 2) {
            const value = keys[i + 1]
            merge4(ref, key, value, true)
            return base
        }
        if (!ref.hasOwnProperty(key)) {
            ref[key] = {}
        }
        ref = ref[key]
    }
}

function mergeObjectRecursively(base, spec, unique) {
    for (const [k, v] of Object.entries(spec)) {
        merge4(base, k, v, unique)
    }
}

function merge4(base, k, v, onlyUnique, extendIt = true) {
    if (v == null) {
        return
    }
    if (!base.hasOwnProperty(k)) {
        base[k] = v
        return
    }

    switch (type(v)) {
        case 'Object':
            return mergeObjectRecursively(base[k], v)
        case 'Array':
            if (extendIt) {
                return extend(base[k], v, onlyUnique)
            } else {
                base[k].push(v)
            }
        default:
            base[k] = v
    }
}


//console.log(templater('b{{aa}}', {aa: 'ab'}))

function caller() {
     const items = getErrorStack3(null, Array)
     const item = items[0]
     return item
}

function argPop(args, checkpoint, fallback) {
    const index = args.findIndex(findf(checkpoint))
    if (index > -1) {
        return splice2(args, index)
    }
    return fallback

}

function splice2(items, index) {
    return items.splice(index, 1)[0]
}

function findf(x) {
    switch (type(x)) {
        case 'Null':
        case 'Undefined':
            warn('a checkpoint is required')
        case 'Object':
            return checkpointf(x)
        case 'Array':
            return (el) => x.includes(el)
        case 'Function':
            return x
        case 'String':
        case 'RegExp':
            return testf(x)
        default:
            return (el) => el === x
    }
}
//let xxx = ['a', 'b', 'c', 'd', 'e']
//console.log(argPop(xxx, ['d', 'b'], 'axx'))
//console.log(xxx)


function longShort(a, b) {
    if (isNumber(a)) {
        return a >= b ? [a, b] : [b, a]
    }
    return len(a) >= len(b) ? [a, b] : [b, a]
}

function shortLong(a, b) {
    if (isNumber(a)) {
        return a <= b ? [a, b] : [b, a]
    }
    return len(a) <= len(b) ? [a, b] : [b, a]
}

function assignOnce(state, key, fn, ...args) {
    if (state.hasOwnProperty(key)) {
        return 
    }
    const value = fparse(fn, ...args)
    if (isDefined(value)) {
        state[key] = value
    }
}

function caller2(mode) {
    const items = getErrorStack3(null, Array)
    //console.log(items)
    const callerIndex = items.findIndex((x) => x.includes('caller2'))
    const item = items[callerIndex + 1]

    const r = /^at +(?:\w+:\/\/(.*?)(?::(\d+):(\d+))|(\w+)(?:\.(\w+))?(?: (\w+) \[\w+ \w+\])? \(\w+:\/\/(.*?)(?::(\d+):(\d+))\))/
    const m = search(r, item)
    m[m.length - 1] = Number(m[m.length - 1])
    m[m.length - 2] = Number(m[m.length - 2])
    const ref = prepare(m)

    switch (mode) {
        case 'name':
        case 'line':
        case 'implicit':
        case 'sayhi':
            return sayhi(parse2(ref))
        default:
            return parse2(ref)
    }
    function parse2({parent, getOrSet, caller, file, line, ch}) {
        let s = ''
        if (parent) {
            s += parent + '.'
        }
        if (getOrSet) {
            s += getOrSet + '.'
        }
        s += caller
        s += ` ${tail(file)}:${line}`

        return s
    }
    function prepare(m) {
        switch (m.length) {
            case 3: {
                warn2('caller2() is not allowed in global scope', m)
            }
            case 4: {
                const [ caller, file, line, ch] = m
                return { caller, file, line, ch }
            }
            case 5: {
                const [ parent, caller, file, line, ch] = m
                return { parent, caller, file, line, ch}
            }
            case 6: {
                const [ parent, getOrSet, caller, file, line, ch] = m
                return  {parent, getOrSet, caller, file, line, ch}
            }
        }
    }
    function parse1(s) {
        s = s.slice(3)
        let m
        if (m = search(fileRE, s)) {
            return
        }
        if (m = search(computedRE, s)) {
            return m
        }
        if (m = search(basicRE, s)) {
            return m
        }
    }
}

function makeFileRE(dir, prefix = 'file://') {
    const path = '(.*)'
    return RegExp('^' + pathJoin(prefix, dir, path))
}
function pathJoin(...args) {
    let s = ''
    for (let i = 0; i < args.length; i++) {
        let arg = args[i]
        if (empty(arg)) {
            continue
        }
        s += arg
        if (i == args.length - 1) {
            return s
        }
        if (!arg.endsWith('/')) {
            s += '/'
        }
    }
}

function str(x) {
    return isPrimitive(x) ? x : JSON.stringify(x)
}

function warn2(...args) {
    let s = chalk3('ERROR: ', 'bold')
    args.forEach((arg, i) => {
        s += chalk3(arg, 'Red')
        if (i < args.length - 1) {
            s += chalk3(' | ', 'bold')
        }
    })
    throw s
}

function join2(items, delimiter) {
    items = toArray2(items)
    if (delimiter === '') {
        return items.join('')
    }
    let s = ''
    for (let i = 0; i < items.length; i++) {
        let item = items[i]
        s += item
        if (i == items.length - 1) {
            return s
        }

        if (item.includes('\n')) {
            s += '\n\n'
        } else if (items[i + 1].includes('\n')) {
            s += '\n\n'
        } else {
            s += '\n'
        }
    }
    return s
}


function filter2(items, x) {
    return items.filter(findf(x))
}

//console.log(filter2(['a', 'b', 'c', 'd', 'e'], ['a', 'b', 'c', 'd', ]))

//logConsole()

function unquote(s) {
    return /^['"]/.test(s) ? s.slice(1, -1) : s
}

function invivoStringify(x) {
    if (empty(x)) {
        return ''
    }
    if (isPrimitive(x)) {
        return x
    }
    if (isArray(x)) {
        return JSON.stringify(x)
    }

    function addQuotes(s) {
        if (s.toString().includes(' ')) {
            if (hasQuotes(s)) {
                return s
            }
            return `"${s}"`
        }
        return s
    }
    return wrap(reduceToString(x, (k, v) => {
        if (v == null) {
            return 
        }
        const value = isPrimitive(v)
            ? addQuotes(v)
            : isArray(v)
            ? JSON.stringify(v)
            : invivoStringify(v) || literalType(v)
        return `${k}: ${value}`
    }, ', '), '{}')
}
function literalType(x) {
    switch (type(x)) {
        case 'Null': return 'null'
        case 'Undefined': return 'undefined'
        case 'Object': return '{}'
        case 'Array': return '[]'
        case 'String': return '""'
    }
}
//console.log(toCallable('aa', {d:1}, 1, 2, 3, {a:1, b: 'foobar hi', options: {a: '"fishman isl"'}}))

function toCallable(name, ...args) {
    const argString = mapFilter(flat(args), invivoStringify).join(', ')
    return `${name}(${argString})`
}

function addUnit(s, unit) {
    if (s && unit && /\d$/.test(s)) {
        // if (!isString(unit)) {
            // unit = 'pt'
        // }
        return s + unit
    }
    return s
}
//console.log(argKwargSplit('g 50 fill = aaa'))

function has(item, x) {
    if (empty(item)) {
        return false
    }
    if (isArray(item)) {
        return item.includes(x)
    } 
    if (typeof item == 'object') {
        if (isArray(x)) {
            return hasKey(item, x)
        }
        return x in item
    }
}

// console.log(partition([1,2,3,4,5, -1], (x) => x > 3))
function partitions(items, fn) {
    if (isArray(fn)) {
        return partitionWithFunctions2(items, fn)
    }
    const storage = new Storage()
    items.forEach((item, i) => {
        const value = fn(item)
        if (value === null) {
            return 
        }
        if (value < 0) {
            return 
        }
        storage.add(value, item)
    })
    return storage.values
}
//logConsole()


function partitionWithFunctions2(items, fns) {
    const store = range(fns.length + 1).map(() => [])
    for (const item of filter(items)) {
        for (let i = 0; i < fns.length; i++) {
            const fn = fns[i]

            if (fn(item)) {
                store[i].push(item)
                break
            }

            if (i == fns.length - 1) {
                getLast(store).push(item)
            }
        }
    }
    return store
}
//console.log(range(2, 5, 2))
//logConsole()

function getNumbers(s) {
    const r = /-?\d+(?:\.\d+)?/g
    return findall(r, s).map(Number)
}



function getAnyIdentifier(s) {
    const r = /^(?:class|let|const|var|(?:async )?function) (\w+)/
    return search(r, s)
}

function isProsy(s) {
    return /[ ]/.test(s)
}
function stringCompose(...args) {
    let s = ''
    for (let i = args.length - 1; i >= 0; i--) {
        let arg = args[i]
        if (i == args.length - 1) {
            s = addArgumentQuotes(arg)
        } else {
            s = `${arg}(${s})`
        }
    }
    return s
}

function bottomComment(s) {
    return search(/\/\* *(.*?) *\*\/\s*}\s*$/, s.toString()) || ''
}

function labelCase(s) {
    s = uncapitalize(s)
    return s.replace(/ +\w/g, (x) => x.trim().toUpperCase())
}

function alert1(...args) {
    const payload = args.map(errorStringify).join(' | ')
    console.log(payload)
    if (isNode()) {
        return 
    }
    window.alert(payload)
}

function alert(s, ...args) {
    console.log(getCaller(1), templater(s, args))
}

function errorStringify(x) {
    switch (type(x)) {
        case 'Null':
        case 'Undefined':
            return ''
        case 'Object':
        case 'Array':
            return JSON.stringify(x)
        case 'Function':
            return x.name
        default:
            return x.toString()
    }
}

function warning(s, ref) {
    /* dev */
    if (ref) {
        const items = split(s, /\$(\w+)/)
        const value = items.map((item, i) => {
            if (item in ref) {
                return JSON.stringify(ref[item])
            }
            return item
        })
        const payload = value.join(' ')
        throw new Error(payload)
        red(payload)
    }
    ndy()
}
function clock(callback, delta, threshold) {
    const clock = new Clock({delta})
    function onTick(count, timeLeft) {
        const value = callback(count, timeLeft)
        if (value === true) {
            clock.stopped = true
        }
        else if (threshold && delta * count >= threshold) {
            clock.stopped = true
        }
    }
    clock.onTick = onTick
    return clock.start()
}

function dashSplit2(s) {
    const r = /^ *\/?\*? *-{6,} * \*?\/* *$/gm
    const text = smartDedent(s)
    const items = split(text, r)
    return items
}

function secondComment(s) {
    const line = getLine(s, 3)
    return getComment(line)
}
function lines(s) {
    return s.toString().split('\n')
}
function deleteLine(s, n) {
    const items = lines(s)
    remove2(items, n - 1)
    return items.join('\n')

}
function getLine(s, n) {
    return lines(s)[n - 1]
}
function getComment(s) {
    const r = /\/\* *([^]*?) *\*\//
    return search(r, s.toString())
}
function isStringRegExp(s) {
    try {
        return s.startsWith('/') && /\/\w*$/.test(s)
    } catch(e) {
        return 
    }
}
//console.log(dashSplit2('a b').map(partial(splitOnce)))
//console.log( || 2)

function normalizeIndent(s) {
    return indent(dedent(s))
}

function both(a, b, t) {
    return t.test(a) && t.test(b)
}

//console.log(deleteLine(both, 3))

function newlineIndent2(s) {
    //console.log([indent(s)])
    return '\n' + indent(s)
}

function unbrackify(s) {
    const type = getFirstWord(s)
    const value = dedent2(lines(s).slice(1, -1).join('\n'), 4)
    return [type, value]
}

function extractStartingJsonLikeConfig(s) {
    return getOptions(smartDedent(s), 'extractStartingJsonLikeConfig')
}
let str1692325422 = `
    a = 11
    b = {
        a: 1,
        b: 3
    }
    c = apple, banana

    hwody = how iadf asdf
`
//console.log(extractStartingJsonLikeConfig(str1692325422))


//let a = assignOnTop({}, 'a', 'b', [1, 2, 5])
//let b = assignOnTop(a, {'a': 1})
//console.log(a)

function filterObject(o, fn) {
    const items = entries(o)
    const p = getParameters(fn)
    if (p[0] == 'v') {
        return dict(items.filter((x) => fn(x[1])))
    }
    return dict(items.filter((x) => fn(x)))
    ndy()
}

function sub(s, r, replacement) {
    return s.toString().replace(r, replacement || '')
}
function enforce(a, b, ...args) {
    if (a == null) {
        warn('the arg is null')
    }
    const check = b(a, ...args)
    if (check) {
        return 
    }
    const caller = b.name === '' ? b.toString() : b
    const message = caller + '  ' + args.map(errorStringify)
    warn(a, 'doesnt meet', message)
}
function join3(items, delimiter) {
    let s = ''
    for (let i = 0; i < items.length; i++) {
        let item = items[i]
        if (i == items.length - 1) {
            s += item
            return s
        } else if (/[:] *$/.test(item)) {
            s += item.trim() + ' '
        } else {
            s += item + ' ' + delimiter + ' '
        }
    }
    return s
}
//enforce(['a', 'b', 'c', 'd', 'e'], has, ['ax'])
//console.log(flat({a:1}, '', 2))

function objectFromArguments(args, keys) {
    if (args.length == 1 && isObject(args[0])) {
        return args[0]
    }
    if (isArray(keys)) {
        return keys.reduce((acc, key, i) => {
            if (i in args) {
                acc[key] = args[i]
            }
            return acc
        }, {})
    }
    return Object.entries(keys).reduce((acc, item, i) => {
        if (i in args) {
            acc[item[0]] = args[i]
        } else {
            acc[item[0]] = item[1]
        }
        return acc
    }, {})
}
//console.log(dashCase('VFunctionalRender2'))

function parseError2(e, input) {
    if (isString(e)) {
        return {
            message: e,
            input,
        }
    }
    return {
        input,
        stack: e.stack,
        message: e.message,
        type: e.type,
    }
}

function scopedEvaluator(s, scope) {
    const evaluator = Function.call(
        null,
        ...Object.keys(scope),
        "expr",
        "return eval('expr = undefined;' + expr)"
    )
    const values = Object.values(scope)
    const value = evaluator.call(null, ...values, s)
    return value
}

function evaluate3(s, scope) {
    try {
        const value = scope ? scopedEvaluator(s, scope) : eval(s)
        return { success: value }
    } catch (e) {
        return { error: parseError2(e) }
    }
}

//console.log(evaluate3('sayhi("sam")'))


function assign3(state, o, aliases, onlyFresh) {
    for (const [k, v] of Object.entries(o)) {
        const key = aliases ? aliases[k] || k : k
        if (onlyFresh) {
            if (state[key] == null) {
                state[key] = v
            }
        } else {
            state[key] = v
        }
    }
    return state
}
function assignFresh3(state, o, aliases) {
    return assign3(state, o, aliases, true)
}

function transformValue(v, k, ref) {
    if (ref.hasOwnProperty(k)) {
        const value = ref[k](v)
        if (value == null) {
            return v
        }
        return value
    }
    return v
}
//console.log(getLongest([1, 2, 3]))

function assignDefaults(state, defaults) {
    if (empty(defaults)) {
        return state
    }
    for (const [k, v] of Object.entries(defaults)) {
        if (!state.hasOwnProperty(k)) {
            if (isFunction(v)) {
                const value = v(state)
                if (hasValue(value)) {
                    state[k] = value
                }
            } else {
                state[k] = v
            }
        }
    }
    return state
}

function objectFromArguments2(args) {
    if (args.length == 1 && isObject(args[0])) {
        return args[0]
    }

    const ref = {
        "Foga.boo": {
            spacing: 10,
            stroke: 'gray',
            strokeWidth: 0.5,
        },

        "Turtle.setGrid": {
            spacing: 10,
            id: 'grid',
            stroke: 'gray',
            strokeWidth: 0.25,
        }
    }
    const caller = getCaller3(-1)
    const keys = ref[caller]
    return Object.entries(keys).reduce((acc, item, i) => {
        if (i in args) {
            acc[item[0]] = args[i]
        } else {
            acc[item[0]] = item[1]
        }
        return acc
    }, {})
}

class Foga {
    constructor() {
    }
    boo() {
        console.log(objectFromArguments2(arguments))
    }
}
//(new Foga()).boo(123, 'x')
//logConsole()

//const aa = {xxxa: test, b: 1}
//const defaults = sort(Object.entries(aa), isFunction)
//console.log(defaults)

function stateGetter3(state, ...keys) {
    const store = {}
    flat(keys).forEach((key) => {
        if (isObject(key)) {
            Object.assign(store, key)
        } else {
            assign(store, key, state[key])
        }
    })
    return store
}
class Par {
}
class Chi extends Par {
}
//const c = new Chi()
//console.log(c instanceof Par)

//To be able to have money, and have friends.
//One person ...
//Without a name ...

function isLiteralObject(x) {
    return type(x) == 'Object'
}

function assignf(data) {
    return function lambda(data) {
        return Object.assign(o, data)
    }
}

function keyAndValue(keys, ...args) {
    const fallback = args.pop()
    for (const key of keys) {
        const value = args.find((x) => x[key])
        if (value) {
            return {[key]: value}
        }
    }
    return fallback
}

function requireArg(arg) {
    const caller = getCaller3(-1)
    const [a,b] = entries(arg)[0]
    if (hasValue(b)) {
        return 
    }
    const message = `param {${a}} is a required arg @ fn:${caller}`
    warn(message)
}



function isLetter(x) {
    return /[a-zA-Z]/.test(x.toString())
}

function typef(...args) {
    const keys = flat(args)
    return function lambda(s) {
        return keys.includes(type(s))
    }
}

function isArgumentObject(x) {
    if (x.constructor !== Object) {
        return false
    }
    if (!x.hasOwnProperty('length')) {
        return false
    }
    if (x.length) {
        return x.length - 1 in x
    }
    return true
}
//console.log(isArgumentObject([]))

function getArgumentObject(x) {
    if (isArgumentObject(x)) {
        return x
    }
    if (isArray(x) && isArgumentObject(x[0])) {
        return x[0]
    }
    ndy()
}



function tryAgainf(fn, checkpoint, limit = 10) {
    let count = 0
    function tryingAgain(...args) {
        const value = fn(...args)
        if (checkpoint(value)) {
            count = 0
            return value
        }
        if (count++ >= limit) {
            throw "not done yet"
        }
        return tryingAgain(...args)
    }
    return tryingAgain
}


function toRegExp(s) {
    function parseRegex(s) {
        const r = /\/(\w*)$/
        const [a,b] = mget2(r, s.replace(/^\/, ''/))
        return [a, b || '']
    }
    return isRegExp(s)
        ? s
        : s.startsWith("/")
        ? RegExp(...parseRegex(s.slice(1)))
        : RegExp(s)
}

function walk3(x, o) {
    function walker(x, key) {
        if (isArray(x) && !key) {
            return mapFilter(x, partial(walker))
        }
        if (isObjectLiteral(x)) {
            return entries(x).reduce((acc, [a, b]) => {
                const newValue = walker(b, a)
                if (newValue === null) {
                    return acc
                }
                acc[a] = newValue
                return acc
            }, {})
        }
        return evaluator(x, key)
    }

    function evaluator(v, k) {
        if (!o.hasOwnProperty(k)) {
            return v
        }
        const f = o[k]
        if (isArray(v)) {
            return v.map(f)
        } else {
            return f(v)
        }
    }
    return walker(x)
}

function transformDict(o, aliases) {
    for (let [k, v] of Object.entries(o)) {
        if (aliases.hasOwnProperty(k)) {
            o[aliases[k]] = v
            delete o[k]
        }
    }
    return o
}

function dateSplit(s, fn, mode = Object) {
    const r = /^(\d+-\d+-\d+)/m
    const items = partition(s.split(r).slice(1))
    const values = mapFilter(items, runner)
    return values

    function runner([a, b]) {
        if (empty(b)) {
            return 
        }

        a = a.trim()
        b = b.trimEnd()

        if (!fn) {
            return [a, b]
        }
        const value = fn(b)
        if (value == null) {
            return 
        }
        if (mode == Object) {
            value.date = a
            return value
        }
        return [a, value]
    }
}

function map3(x, fn, onError) {
    function runner(item, i) {
        try {
            return fn(item, i)
        } catch(e) {
            return onError ? onError(e) : null
        }
    }
    return filter(lineGetter(x).map(runner))
}




function simpleTemplater(s, ref) {
    const offset = s.includes('$0') ? 0 : 1
    const regex = /\$(\w+)/g

    if (isPrimitive(ref)) {
        ref = [ref]
    }

    const transform = isArray(ref)
        ? (_, x) => ref[Number(x) - offset]
        : (_, x) => ref[x]

    return s.replace(regex, transform)
}

function runTests(x, fn) {
    if (isString(x) && /^[\s\d\.]+$/) {
        x = split(x, /\s+/).map(Number)
    }

    const result = isArray(x) ? x.map(get) : get(x)

    console.log(result)

    function get(input) {
        try {
            return { input, output: fn(input) }
        } catch (e) {
            return { input, error: e.toString() }
        }
    }
}


function breakerf(limit = 10) {
    let count = 0
    return function breaker() {
        if (++count > limit) {
            myError('breaker')
        }
    }
}
function oxford(items) {
    if (items.length == 2) return items.join(' and ')
    let s = items[0]
    for (let i = 1; i < items.length; i++) {
        s += ', '
        if (isLast(i, items)) s += 'and '
        s += items[i]
    }
    return s
}
//console.log('a'[0])

function unescapeHtml(s) {
  const f = (_, x) => {
      switch (x) {
          case 'lt': return '<'
          case 'nbsp': return ' '
          case 'gt': return '>'
          case 'amp': return '&'
          case 'quot': return '"'
          case 'apos': return '\''
      }
  }
  return s.replace(/&(lt|gt|amp|quot|apos);/g, f)
}

function setOnce(store, key, value = {}) {
    if (key in store) {
        return false
    }
    store[key] = value
    return true
}

// getJsonConfig


function hr(n = 65, newlines = 1) {
    return newlines
        ? '\n'.repeat(newlines) + '-'.repeat(n) + '\n'.repeat(newlines)
        : '-'.repeat(n)
}

function strlen(s) {
    return s.toString().length
}


function incrementalEat(s, items, both) {
    const store = []
    function runner(regex, multiple) {
        let length = store.length
        const temp = []
        while (true) {
            s = s.trimStart()
            const raw = mget2(regex, s)
            let match
            if (!raw[1]) {
                if (temp.length) {
                    store.push(temp)
                }
                break
                return true
            }
            s = raw[0]
            match = raw[1]

            if (multiple) {
                temp.push(match)
            } else {
                store.push(match)
                return true
                break
            }
        }
        if (store.length == length) {
            store.push(null)
        }
    }

    for (const { branches, regex, multiple } of toArray(items)) {
        runner(regex, multiple)
    }
    return both ? [s, store] : store
}



function xgetStartingConfig(s) {
    const configItems = [
        {regex: /^([\w\.-_]+): *(.+)/, multiple: true}
    ]
    const [text, [m]] = incrementalEat(removeStartingComments(s), configItems, true)
    if (m) {
        return [text, dict(m, toArgument)]
    }
    return [text, null]
}

function mget2(r, s) {
    /* a slightly simpler version */
    const store = []
    const sliceBy = hasCaptureGroup(r) ? 1 : 0

    function parser(...args) {
        const b = smallify(filter(args.slice(sliceBy, -2)))
        store.push(b)
        return ""
    }

    const text = s.replace(r, parser)
    return empty(store)
        ? [text, ""]
        : [text, smallify(store)]
}

function addCaret(r) {
    const s = isString(r) ? r : r.source
    return RegExp("^" + s, r.flags || "")
}



function addArgumentQuotes(s) {
    if (s == null) {
        return 
    }
    if (!isPrimitive(s)) {
        return JSON.stringify(s)
    }
    if (isNumber(s)) {
        return s
    }

    s = s.replace(/\\(?=\w)/g, "\\\\")
    if (/^new \w+\(/.test(s)) {
        return s
    }
    if (s.includes('\n')) {
        s = s.replace(/\n/g, '\\n')
    }

    if (s.includes('`')) {
        s = s.replace(/`/g, '\\`')
    }
    if (isJsonParsable(s)) {
        return s
    }
    if (/^['"`]/.test(s)) {
        return s
    }
    if (s.includes('\n')) {
        return "`" + s + "`"
    }
    if (/^\/.*?\/\w*$/.test(s)) {
        return s
    }
    if (/^['"]|^\w+(?:\.\w+)*\(/.test(s)) {
        return s
    }
    return singleQuote(s)
}


function splitLines(lines, x, mode) {

    enforce(mode, isDefined)
     /* -1 = goes with first, 0 = skip, 1 = goes with second */
     /* 1-indexed */

    function splitLinesByFunction(items, fn) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i]
            if (!fn(item)) {
                return i
            }
        }
        warn('nothing was split')
    }

    let index = isNumber(x) ? x : splitLinesByFunction(lines, x)
    let a = index
    let b = index
    switch (mode) {
        case -1:
            break
        case 0:
            a -= 1
            break
        case 1:
            a -= 1
            b -= 1
            break
    }
    return [lines.slice(0, a), lines.slice(b)]
}


function codeChunks(s) {
    return split(
        s,
        /\n+(?=export \w+|const|async|class|function|var|let|def)/
    )
}
function codeLibrary(s, mode) {
    const items = codeChunks(s)
    const runner = (s) => {
       const name = getBindingName(s)
       if (name) {
           return {
               name,
               params: getParameters(s),
               text: s,
           }
       }
    }
    const lib = mapFilter(items, runner)
    if (mode == Object) {
        return reduce2(lib, (item) => [item.name, item.text])
    }
    return lib
}
// console.log(codeLibrary(test.toString()))

function ignoref(...args) {
    const combine = (regexes) => {
        if (regexes.length == 0) {
            return 
        }

        if (regexes.length == 1) {
            return regexes[0]
        }
        const strings = regexes.map((x) => x.src ? x.src : x)
        return RegExp(strings.join('|'))
    }
    const ignore = []
    const regexes = []
    let wrapper
    for (const arg of args) {
        if (isFunction(arg)) {
            wrapper = arg
        }
        else if (isArray(arg)) {
            ignore.push(...arg)
        } 
        else if (isString(arg)) {
            ignore.push(...split(arg, /\s+/))
        }
        else {
            regexes.push(arg)
        }
    }
    // console.log({ignore})
    const regex = combine(regexes)

    return function lambda(x) {
        const s = wrapper ? wrapper(x) : x
        if (ignore.includes(s)) {
            return false
        }
        if (regex && regex.test(s)) {
            return false
        }
        return true
    }
}

function replacef(a, replacement, flags = 'g') {
    const r = isRegExp(a) ? a : RegExp(a, flags)
    return function replace(s) {
        return s.trim().replace(r, replacement)
    }
}

function isChinese(s) {
  const r = /^[\u4e00-\u9fa5]+$/;
  return r.test(s[0])
}

function topLineComment(s) {
    return search(/^.*?\s*\/\/ *(\S.+)/, s.toString())
}
// console.log(['a', 'b', 'c', 'd', 'e'].shift())


function chalkf(key) {
    const colors = variables.terminalColors
    const color = colors[key.toUpperCase()]
    const bold = colors.BOLD
    const reset = colors.RESET

    return function chalk(...args) {
        if (args.length == 1) {
            if (isPrimitive(args[0])) {
                const boldValue = isCapitalized(args[0]) ? bold : ''
                console.log(color + boldValue + args[0] + reset)
            } else {
                console.log(args[0])
            }
            return 
        }
        let first = args.shift()
        if (isCapitalized(first)) {
            first += ':'
            // if (hasNewline(args[0])) {
                // first += ':\n'
            // } else {
                // first += ':'
            // }
            console.log(color + bold + first + reset, ...args)
        } else {
            console.log(color + first + reset, ...args)
        }
    }
}


class Eater {
    constructor(s) {
        this.s = s
        this.store = []
    }
    get(startRE, endRE) {

        const store = []
        const m = this.s.match(startRE)
        if (m) {
            this.s = this.s.slice(m[0].length)
            const match = matchGetter(m, 'search2')
            store.push(match)
        }
        return store
    }
}


function require(s) {
    if (s == null) {
        myError('the arg is required, but it is null')
    }
    return s
}

function mreplace(s, r, replacement = '') {
    const m = findall(r, s)
    s = s.replace(r, replacement)
    return [s, m]
}

function stateGetterFromSchema(state, schema) {
    function fn(v, depth, k) {
        if (state.hasOwnProperty(k)) {
            if (isFunction(v)) {
                const value = v(state, k)
                if (hasValue(value)) {
                    return value
                }
                return null
            } else if (v === true) {
                const val = state[k]
                if (empty(val)) {
                    return null
                }
                return state[k]
            }
        } else if (v === true) {
            return null
        } else {
            ndy()
        }
    }
    return walk(schema, fn)
}

// console.log(equalf({a:1, b:2, c:3})({a:1, b:2, c:3}))
// console.log(equalf({a:1, b:2, c:3})({a:1, b:2, c:3}))
// warn('No Index Found', {tocLine: [['a', 'b'], ['c', 'd']]})

function runFunctionFromRef(ref, key, ...args) {
    if (!ref) {
        return
    }
    const fn = ref[key]
    if (fn) {
        return fn(...args)
    }
}
function ndy(s) {
    if (s) {
        console.log(s)
    }
    throw new Error("not done yet")
}
// console.log(merge([{a:1}, {b:2}]))
// logConsole()

class Foo {
    constructor() {
    }
}
// const f = new Foo()
                // assignOnTop(f, 'globalVariables', ['abc'])
// console.log(f)

function assignOnTop2(base, ...keys) {
    let ref = base
    for (let i = 0; i < keys.length - 1; i++) {
        let key = keys[i]
        if (i == keys.length - 2) {
            const value = keys[i + 1]
            merge4(ref, key, value, false, false)
            return base
        }
        if (!ref.hasOwnProperty(key)) {
            ref[key] = {}
        }
        ref = ref[key]
    }
}

// console.log(isClassFunction(Storage))

function getClassParameters(ClassObject) {
    const r = /constructor\((.*?)\)/
    const m = search(r, ClassObject)
    if (m) {
        return split(m, /,|(\w+) *=.*?(?=,|$)/)
    }
    return []
}
// console.log(getClassParameters(Storage))

function reduce3(items, fn) {
    /* new: basically reduceObject */
    const computedItems = entries(items)
    const asDouble = isNestedArray(computedItems)
    return computedItems.reduce((acc, item, i) => {
        const value = fn(item[1])
        if (isArray(value) && value.length == 2) {
            const [a, b] = value
            if (isDefined(b)) {
                acc[a] = b
            }
        } else if (isDefined(value)) {
            acc[item[0]] = value
        }
        return acc
    }, {})
}
function linebreak(n = 65) {
    return '-'.repeat(n)
}
// const store = {a:1, b:2, c:3}
// console.log(reduce3(store, (x) => x + 1))


function defineBinding(a, b, options = null) {
    const lang = options?.lang || 'javascript'
    const prefix = jspy(lang, 'prefix')
    return `${prefix}${a} = ${toStringArgumentPretty(b, options)}`
}
const alist = ['a', 'b', 'c', 'd', 'e']
const aobj = {a:1, b:2, c:3}
// console.log(x.splice(1, x.length - 1))
// console.log(typeof defineBinding)
// isFunction(asd) ? s
// '/home/kdog3682/.vimrc'

// console.log(addArgumentQuotes("s.split('\n')"))

function templater(s, ...args) {
    if (args[1] == Array) {
        return join(entries(args[0]).map((x) => templater(s, x)))
    }
    if (!s) {
        /* if there is no template, return the first arg */
        /* it should be a primitive */
        assertion2(args[0], isString)
        return args[0]
    }
    if (!s.includes('$')) {
        return s
    }
    if (isFunction(args[0])) {
        const r = /\$(\w+)/g
        return rep(s, r, args[0])
    }
    s = smartDedent4(s)
    const fix = (x) => {
        return (isClassObject(x) || isObject(x)) ? x : toArray2(x)
    }

    const ref = fix(args.length > 1 ? args : args[0])
    const asArray = isArray(ref)
    // console.log(ref)
    const fnRef = {
        linebreak: '-'.repeat(70),
        hr: '-'.repeat(70),
        emDash: EMDASH,
        cap(s) {
            return capitalize(removeQuotes(s))
        },
        depluralize,
        date: datestamp,
    }

    return runner(s).trimEnd()

    function bracketRunner(s) {
        const value = hasDollar(s) ? runner(s) : dreplace(s, ref)
        return eval(value)
    }

    function f(_, 
        spaces, 
        bracket,
        callable, 
        callableArg, 
        dollar, 
        dollarSlice,
        hashSpaces, 
        hash,
        doubleBracket,
    ) {
        if (doubleBracket) {
            return indent2(dictGetter(ref, doubleBracket).toString(), hashSpaces)
        }
        if (hash) {
            return hashRunner(hash, hashSpaces)
        }
        if (bracket) {
            return spaces + bracketRunner(bracket)
        }
        if (callable) {
            return spaces + callableRunner(callable, callableArg)
        }
        if (dollar) {
            return dollarRunner(dollar, spaces, dollarSlice)
        }
    }

    function runner(s) {
        const templaterRE = /([\t ]*)(?:\${(.*?)}|\$([a-zA-Z]\w+)\((.*?)\)|\$(\w+)(\[-?\d*:-?\d*\])?)|( *)(?:#(.*?)#|{{(.*?)}})/gi
        return s.replace(templaterRE, f)
    }

    function callableRunner(fnKey, arg) {
        if (!arg.includes('$') && isWord(arg)) {
            arg = '$' + arg
        }
        const computedArgString = runner(arg)
        return fnRef[fnKey](computedArgString)
    }
    function hashRunner(s, hashSpaces) {
        return hasSpaces + runner(s)
    }

    function dollarRunner(s, spaces, dollarSlice) {
        const val = dollarValueGetter(s, ref, asArray)
        try {
            return indent2(stringifyPrimitive(val), spaces)
        } catch(e) {
            console.log("ERRORRRRRRRR", e)
        }

        // ignoring the ref
        // console.log({s})
        let offset = 1
        let dv
        // if (isClassObject)
        if (isObject(ref)) {
            dv = ref[s]
            if (dv == null) {
                if (s == 'self') {
                    return JSON.stringify(ref)
                }
                dv = ref[uncapitalize(s)]
                if (dv) {
                    dv = capitalize(dv)
                } else {
                    dv = fnRef[s]
                    if (dv) {
                        if (isFunction(dv)) {
                            dv = dv()
                        }
                        else {
                            dv = uncapitalize(dv)
                        }
                    } 
                }
            } 
            else if (isArray(dv)) {
                db = JSON.stringify(dv)
                // throw ''
                // dv = toStringArgument3(dv)
                // dv = join(dv)
                // throw 'hmm'
            }

            else if (fnRef.hasOwnProperty(s)) {
                dv = fnRef[s]
                        if (isFunction(dv)) {
                            dv = dv()
                        }
            } else {
                
            }
        }
        else if (isArray(ref)) {
            dv = ref[Number(s) - offset]
            if (isArray(dv)) {
                dv = JSON.stringify(dv)
            }
        }

        if (dv == null) {
            if (fnRef.hasOwnProperty(s)) {
                dv = fparse(fnRef[s])
            } else {
                /* we cancel out non-used $2, $3 et cetera */
                return ''
            }
        }
        if (isArray(dv)) {
            return spaces + dv.join('\n')
        }
        if (!isPrimitive(dv)) {
            // throw 'a'
            // if (s == 'self') {
                // throw dv
                // return JSON.stringify(dv)
            // }
            // console.log({dv})
            // dv = JSON.stringify(dv)
            // ndy()
        }

        if (dollarSlice) {
            console.log({dv})
            ndy()
        }
        return indent2(dv, spaces)
    }
}

function unique3(a) {
    const ref = !isPrimitive(a[0]) ? a.map(JSON.stringify) : a.map(trim)
    const watcher = new Watcher()
    const indexes = []
    for (let i = 0; i < ref.length; i++) {
        if (watcher.isFresh(ref[i])) {
            indexes.push(i)
        }
    }
    return indexes.map((index) => a[index])
}
// console.log([addArgumentQuotes('a\nb')])
//
    // console.log({callable})
function transformerf(transformers) {
    return function transform(v, k) {
        if (transformers.hasOwnProperty(k)) {
            return transformers[k](v)
        }
        return v
    }
}


// console.log(fill(3, null))

function iter(items, fn) {
    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const value = fn(item, i)
        if (value === false) {
            return
        }
    }
}

function prettyPrintErrorStack(stack) {
    return 
}

function prettyPrintCodeSnippet(code, numLines = 5) {
    const lines = code.toString().trim().split('\n')
    console.log(lines)
}
// console.log(prettyPrintCodeSnippet(templater))

// console.log(toRegExp('/^(?:let|set|source|[ni]\\w+) .+[^{\\n] *$/gm'))
function isRegExpString(s) {
    if (!/^\//.test(s)) {
        return false
    }
    const m = s.match(/\/[gmis]*$/)
    if (!m) {
        return false
    }
    if (m[0].length > 1) {
        return true
    }
    const slice = s.slice(1, -m.length)
    if (slice.includes('/') && !slice.includes('\\/')) {
        return false
    }
    return true
}

function escapeTilda(s) {
    return s.replace(/`/g, '\\`')
}

function tryString(a, b, asynchronous) {
    const t = `try {\n\t$1\n} catch(e) {\n\t$2\n} `
    const prefix = asynchronous ? 'return ' : ''
    const get = (a, ...params) => {
        return isFunction(a) ? a.toString() + '\n'  + prefix + strcall(a.name, params) : a.toString()
    }
    const value = templater(t, [get(a), get(b, 'e')])
    return value
}

function notEqual(a, b) {
    return a != b
}

// sdfsdf[sdfsdfsdf - 1] .. 2

function throwError(...args) {
    throw args.length == 1 ? args[0] : args
}

function tally(items) {
    const t = new Tally(items)
    return Object.entries(t.store)
}
class Tally {
    constructor(items) {
        this.store = {}
        if (items) {
            if (type(items) == 'Tally') {
                this.store = copy(items.store)
            } else {
                items.forEach((item, i) => {
                    this.add(item)
                })
            }
        }
    }
    toJSON(mode = Array) {
        return mode == Array
            ? Object.keys(this.store).map(toNumber)
            : this.store
    }
    add(key) {
        if (this.store.hasOwnProperty(key)) {
            this.store[key]++
        } else {
            this.store[key] = 1
        }
        return this.store[key]
    }

    filter(f) {
        return dict(
            Object.entries(this.store).filter(abf(f))
        )
    }
}

function deepAssign(base, o, schema = {}) {
    if (empty(o)) {
        return 
    }
    if (isString(o)) {
        return dictSetter2(...arguments)
    }
    assertion2(o, isObject)

    function runner(base, o) {
        for (const [k, v] of Object.entries(o)) {
            if (!kindaExists(v)) {
                continue
            }
            base[k] = get(base, k, v)
        }
        return base
    }
    function get(base, k, v) {
            if (base.hasOwnProperty(k)) {
                if (isObject(base[k])) {
                    return runner(base[k], v)
                } else {
                    const scheme = schema[k]
                    if (scheme) {
                        if (schema[k] == Array) {
                            return base[k].concat(v)
                        }

                        return scheme(base[k], v)
                    } else {
                        if (isArray(v)) {
                            return base[k].concat(v)
                        }
                        return v
                    }
                }
            } else {
                if (schema[k] == Array) {
                    return toArray(v)
                }
                return v
            }
    }
    return runner(base, o)
}


// isStringRegExp
// isRegExpString better
// console.log(isRegExpString('/a/'))
// console.log(isRegExpString('/a/b/'))
// console.log(isRegExpString('/a\/b/'))
// console.log(isRegExpString('/a\\/b/'))
function escapedSingleQuote(s, delimiter = "'") {
    const escaped = s.replace(/\'/g, "\\'")
    return `${delimiter}${escaped}${delimiter}`
}



function simpleMergeStrategy(a, b) {
    if (isArray(a) && isArray(b)) {
        return a.concat(b)
    }
    if (isObject(a) && isObject(b)) {
        return {...a, ...b}
    }
    return b
}


function looksLikeFunction(s) {
	return isString(s) && /^async |^function |^\w+\(/.test(s)
}

function splitDots(s) {
    const regex = regexTemplater(/\.(?!$1)/, variables.commonExtensions)
    const items = s.split(regex)
        if (items[0] == 'this') {
            items[0].shift()
        }
        return items
}
function dictGetter(state, ...args) {
    if (empty(state)) {
        return 
    }
    const keys = args.length == 1 && args[0].toString().includes('.')
        ? splitDots(args[0])
        : isArray(args[0]) 
        ? args[0]
        : args
    
    for (const key of keys) {
        if (key in state) {
            state = state[key]
        } else {
            return 
        }
    }
    return state
}

function assert(x, message, logValue) {
    if (isBoolean(x)) {
        if (x) {
            return 
        } else {
            panic(templater(message.replace(/\$\d+/, '"$&"'), logValue))
        }
    }
    const m = assertion3(...arguments)
    if (m) {
        class AssertionError extends Error {}
        throw new AssertionError(m)
    }
    return 
    // if (isFunction(x)) {
        // return functionFirstAssertion(...arguments)
    // }
    if (arguments.length == 0) {
        throw 'assert()'
    }
    if (!hasValue(x)) {
        if (logValue) console.log(logValue)
        throw new CustomError(message)
    }
    return x
}


function assert2(x, message) {
    if (arguments.length == 1) {
        chalk('MessageRequired', `
            Assertion2 requires 2 arguments.
            The first arg is the equality check.
            the second arg is the error message.
        `)
        throw ''
    }
    if (x === 0) {
        return true
    }
    if (!x) {
        chalk('Assertion Error', message)
        throw new Error()
    }
}


function assertion(x, y, z) {
    const length = arguments.length

    let checkpoint
    let message

    if (length == 3) {
        checkpoint = y
        message = z
    } else if (length == 2) {
        if (isFunction(y)) {
            checkpoint = y
            const name = y.name || y.toString()
            message = `${name} is not satisfied`
        } else {
            checkpoint = exists
            message = y
        }
    } else if (length == 1) {
        checkpoint = exists
        message = `exists is not satisfied`
    }
    if (checkpoint(x)) {
        return true
    }
    if (isObject(message)) {
        message = entries(message)[0].join(' - ')
    }

    const computedMessage = `Assertion Error: ${capitalize(message)}`
    const m = chalk3(computedMessage, 'RED')
    red('Input Value', x); throw new Error(m)
}


function assertNotNull(arg) {
    const caller = getCaller3(-1)
    const [a,b] = entries(arg)[0]
    if (b === null) {
        const message = `param {${a}} is a required arg @ fn:${caller}`
        warn(message)
    }
}

function typeAssertion0(x, y, message) {
    const a = type(x)
    const b = type(y)
    if (a == b) {
        return true
    }
    throw new TypeAssertionError(message || x, a, b)

}
function interfaceAssertion(x, y) {
    for (const [k, v] of Object.entries(y)) {
        typeAssertion(x[k], v, k)
    }
}
// assertion3
const assertionRef = {
    ['Object-Null'](x, y) {
        if (x.hasOwnProperty(y)) {
            return x[y]
        }
        raise('KeyError', crayonbox.red(templater('the object: $object does not have the key: "$key"', {key: y, object: prettyStringify(x)})))
    },

    ['Object-String'](x, y) {
        if (x.hasOwnProperty(y)) {
            return x[y]
        }
        raise('DictionaryKeyError', crayonbox.red(templater('the object: $object does not have the key: "$key"', {key: y, object: prettyStringify(x)})))
    },
    ['Object-Object']: interfaceAssertion,
}
function assObject(a, b, c) {
    if (a) {
        return 
    }
    throw new Error(b.message)
}
function assertion3(a, b, c) {
    if (isObject(b)) {
        return assObject(a, b, c)
    }
    if (arguments.length == 1) {
        if (a == null) {
            panic('1 input and it is null: no null values allowed')
        }
        if (a === false) {
            panic('failed the assertion')
        }
    }
    /* 
     * only 3 inputs are allowed
     * check 1: null input ... null error
     * check 2: b is a string
     *    if a is keyable ... check if inside
     *
     * */

    const getMessage = (b) => {
        return b.name ? b : b
    }

    const t = type(a)
    const y = type(b)
    if (t == 'Null' || t == 'Undefined') {
        if (b) {
            return 'the input is null: ' + b
        }
        return 'the input is null'
    }

    if (y == 'String') {
        if (b.includes(' ')) {
            return 
        }
        if (isObjectWithKey(a, b)) {
            /* if the object has the key */
            return false
        }

    const assertionRef = {
        greaterThan: (a,b) => a > b,
        lessThan: (a,b) => a < b,
        equals: (a,b) => a === b,
        str: isString
    }
        if (assertionRef.hasOwnProperty(b)) {
            if (assertionRef[b](a)) {
                return false
            } else {
                return 'the input did not pass checkpoint: ' + b
            }
        }
        const fallback = 'the input does not have the provided key: $key'
        const message = templater(c || fallback, { key: b, input: a, })
        return message
    }
    if (y == 'Function') {
        if (b(a)) {
            return 
        }
        const validators = [
        ]
        if (validators.includes(b)) {
            const ta = type(a)
            const tb = b.name
            return templater('input of type $1 does not match required type: $2', ta, tb)
        }
        const ta = type(a)
        const message = c || b.name
        return 'the input (' + 'type ' + ta + '): did not pass the requirement: ' + message
    }
}
function assertion2(x, y, ...args) {
    if (empty(x)) {
        if (args.length) {
            console.log(...args)
        }
        const message = textFrame('an EmptyValueError occurs when the expected value has a value, but the actual input is empty. for example templater(my_template, null) <- the null will raise am EmptyValueError.')
        return raise2('EmptyValueError', message)
    }
    const tx = type(x)
    const ty = type(y)
    const key = tx + '-' + ty
    if (assertionRef[key]) {
        return assertionRef[key](x, y)
    }

    const ref = {
        greaterThan: (a,b) => a > b,
        lessThan: (a,b) => a < b,
        equals: (a,b) => a === b,
        str: isString
    }

    const checkpoint = isString(y) ? ref[y] : testf(y)
    const pass = checkpoint(x, ...args)
    if (pass) {
        return 
    }

    const name = isString(y) ? y : checkpoint.name
    const errorName = capitalize(name) + 'AssertionError'
    const check = name.replace(/^is/, '')
    const arg = getExcerpt(stringify(x))
    const t = type(x)
    const template = `
        \texpected "$check"
        \tinstead got "$t"
        \tthe input was: "$arg"
    `
    const message = '\n' + templater(template, {check, t, arg})
    return raise2(errorName, message)
}

function functionFirstAssertion(fn, ...args) {
    const pass = fn(...args)
    if (pass) {
        return 
    }
    const name = fn.name && fn.name != 'anonymous' ? fn.name : fn.toString()
    const message = JSON.stringify(args) + ' did not meet the assertion of ' + name
    throw new Error(message)
    
}




function messengerAssert(x, ref) {
    if (isDefined(x)) {
        return x
    }
        const key = getCaller2(-1).caller
        const message = variables.assertionErrorMessages[key]
        if (isObject(message)) {
            if (message.template) {
                const computedTemplate = 
                    templater(message.template, ref)
                throw new MyError(computedTemplate)
            } else {
                throw new MyError(message.default)
            }
        }
        throw new Error('perhaps you forgot the template')
}

// slice ... why
// Group ... why

function strictMessengerAssert(x, ref) {
    if (exists(x)) {
        return x
    }
    const stack = getErrorStack2().slice(2)
    const lineNumber = stack[0][2]
    const callers = []
    let lastFile
    for (const [caller, file] of stack) {
        if (lastFile && file != lastFile) {
            break
        }
        callers.unshift(caller)
        lastFile = file
    }
    const computedKey = callers.join('.')
    const message = variables.assertionErrorMessages[computedKey]
        if (isObject(message)) {
                if (message.template) {
                    const computedTemplate = 
                        templater(message.template, ref)
                    throw new MyError(computedTemplate)
                }
            else {
                throw new MyError(message.default)
            }
        }
        else if (message) {
            throw new MyError(message)
        }
        else {
            throw new Error('regular messenger assertion error. need to make a ref for it in variables ... ' + computedKey)
        }
}

function toStringArgument2(x) {
    /* in-progress ... 
     * lets you control the sizing
     * and newlines
     * beats toStringArgument3
     * */
    function parseObj(obj) {
        const template = getPrintTemplate(obj)
        const items = Object.entries(obj).reduce((acc, [a,b]) => {
            acc.push(a)
            acc.push(parse(b))
            return acc
        }, [])
        return printf(template, items)
    }

    function parseArray(arr) {
        const template = getPrintTemplate(arr)
        const items = arr.map(parse)
        return printf(template, items)
    }

    function parse(x) {
        const t = type(x)
        switch (t) {
            case 'Object': return parseObject(x)
            case 'Array': return parseArray(x)
            default: return ref[t](x)
        }
    }
    return parse(x)
}

function printf(s, ...args) {
    let items = flat(args)
    let i = 0
    return s.replace(/%s/g, () => items[i++])
}

// assertion2(null, isDefined)

function reCombine(r, ref) {
    let flags = ""

    const template = isString(r) ? r : r.source
    function runner(r) {
        if (r.flags && !flags.includes(r.flags)) {
            flags += r.flags
        }
        return r.source
    }
    const regex = tr(template, runner, ref)
    return RegExp(regex, flags)
}

function alternatef(...functions) {
    let i = 0
    let n = 2
	return function lambda(...args) {
        const fn = functions[i++ % n]
        return fn(...args)
    }
}

function tr(s, fn, ref) {
    return s.replace(/\$(\w+)/g, (_, x) => {
        const arg = isObject(ref)
            ? ref[x]
            : ref[Number(x) - 1]
        assertion2(arg, isDefined)
        return fn(arg)
    })
}
function kindaExists(x) {
    switch (type(x)) {
        case 'Null':
        case 'Undefined':
            return true

        case 'Object':
        case 'Array':
        case 'String':
            return len(x) > 0

        case 'Function':
        case 'Number':
        default:
            return true
    }
}


function isNativeFunction(s) {
	return variables.javascriptNativeFunctions.includes(s)
}


function filter3(a, b, anti) {
    if (a == null) {
        return type(b) == 'Object' ? {} : []
    }

    const checkpoint = anti
        ? antif(getCheckpoint(b))
        : getCheckpoint(b)

    return isArray(a)
        ? a.filter(checkpoint)
        : dict(Object.entries(a).filter((x) => checkpoint(x[0])))

    function getCheckpoint(x) {

        function objectCheckpoint(y) {
            if (isString(y)) {
                return y in x
            }
            for (const [a, b] of entries(x)) {
                const base = y[a]
                if (base != b) {
                    return false
                }
            }
            return true
        }
        switch (type(x)) {
            case 'Null':
            case 'Undefined':
                return isDefined
        
            case 'Object':
                return objectCheckpoint
            case 'Array':
                return (y) => !x.includes(y)
        
            case 'Function':
                return x
            case 'String':
            case 'RegExp':
                return testf(x)
        }
    }
}

function match(s, r) {
    return isDefined(s)
        ? getMatch(s.toString().match(r))
        : null
}
function getMatch(m) {
    return !m
        ? null
        : m.length == 1
        ? m[0]
        : m.length == 2
        ? isDefined(m[1]) ? m[1] : m[0]
        : m.slice(1)
}

class EmptyValueError extends Error {
    constructor() {
        const coloredMessage = crayonbox.red('The input value is empty', true)
        super(coloredMessage)
        this.name = 'EmptyValueError'
    }
}

class TypeAssertionError extends Error {
    constructor(x, a, b) {
        let m = `\n\n    Type "${a}" does not match Type "${b}" `
        m += `\n    for provided argument "${x}"`
        const coloredMessage = crayonbox.red(m, true)
        super(coloredMessage)
        this.name = 'AssertionError'
    }
}
function TypeAssertion(a, b) {

    const A = type(a)
    const B = type(b)

    if (A == B) {
        return true
    }
    throw new TypeAssertionError(a, A, B)
}
// const r = /(?:^|[(, <>=])([a-z]\w+)(?:$|[). <>=])/gi
// const sss = 'len(asdasd) $asasd.asd.asd'
// console.log(findall(r, sss))

function getFunctionIdentifier(s) {
    // const r = /^(?:const |(?:(?:async )?function) )?(\w+) *(?:=>|\()/
    const r = /^(?:const |async (?:function )?|function )?(@?\w+) *(?:=>|\()/
    return match(s, r)
}
// console.log(getFunctionIdentifier('asdasd()'))


function oxfordComma(...a) {
    const args = flat(a)
    let s = ''
    for (let i = 0; i < args.length; i++) {
        const arg = args[i]
        if (i == args.length - 1) {
            return s + 'and ' + arg
        } else {
            s += arg + ', '
        }
    }
}

function isQuestion(s) {
    const r = /\?|who|what|when|where|why/
    return r.test(s)
}

// console.log(uncapitalize('hr'))
function bindMethodsAndState(base, o, options = {}) {
    if (empty(o)) {
        return 
    }
    function runner(base, o, depth = 0) {
        for (const [k, v] of Object.entries(o)) {
            if (!kindaExists(v)) {
                if (isObject(v) && depth == 0) {
                    
                } else {
                    continue
                }
            }
            const value = get(base, k, v, depth + 1)
            if (value != null) {
                base[k] = value
            }
        }
        return base
    }
    let root = base
    function get(base, k, v, depth) {
            if (k in base && isObject(base[k])) {
                    return runner(base[k], v, depth)
            }
            return get2(base, k, v, depth)
    }
        const actions = options.actions
    function get2(base, k, v, depth) {
            if (actions) {
                if (k in actions) {
                    return actions[k](v, k, base, root, depth)
                }
                if (actions.default) {
                    const value = actions.default(v, k, base, root, depth)
                    if (value) {
                        return value
                    }
                }
            }
            if (isFunction(v)) {
                    return v.bind(root)
            }
            return v
    }
    runner(base, o)
    return root
}

function globalConsoleDebug(o) {
    return 
    const [key, value] = Object.entries()[0]
    if (console.debugKey == key) {
        console.log(value)
        // console.log()
        throw 'globalConsoleDebug'
    }
}

function imatch2(s, ref) {
    if (empty(s)) {
        return 
    }
    if (isRegExpArray(ref)) {
        for (const r of ref) {
            const m = match(s, r)
            if (isDefined(m)) {
                return m
            }
        }
    }
}
function imatch(s, ref, ...args) {
    if (!s) {
        return null
    }
    if (isDouble(ref)) {
        for (const [a,b] of entries(ref)) {
            const m = match(s, a)
            if (m) {
                return b(...toArray(m), ...args)
            }
        }
    }
    if (ref.every(isRegExp)) {
        for (const r of ref) {
            const m = match(s, r)
            if (m) {
                return m
            }
        }
    }
    if (ref.every(isObject)) {
        for (const arg of ref) {
            const m = match(s, arg.regex)
            if (m) {
                return arg.fn(...toArray(m), ...args)
            }
        }
    }
}

function createParsersFromObject(x, options = {}) {
    const regexes = {
        comments: /^\/\* *(.*?) *\*\//,
        comment: /^\/\* *(.*?) *\*\//,
        comment: /^(?:\/\* *(.*?) *\*\/|\/\/.*)/,
    }
    const runner = (fn) => {
        const r = regexFromComment(topComment(fn))
        const regex = r || regexes[fn.name] || RegExp(`^${fn.name} +(\\S.+)`, 'i')
        return [regex, fn]
    }

    const items = isObject(x) ? Object.values(x).map(runner) : x

    if (options.wrapper) {
        return imatchf(items, options.wrapper, options.state)
    }

    return function lambda(s, ...args) {
        return imatch(s, items, ...args)
    }
}

// set pumheight=5
// set shortmess+=c
function regexFromComment(s) {
    if (!s) {
        return 
    }
    const m = match(s, /^\/(.*?)\/([gims])?$/)
    if (m) {
        return RegExp(...m)
    }
    const dollarRE = /\$([a-zA-Z]+)/
    if (dollarRE.test(s)) {
        s = s.replace(dollarRE, (_, x) => {
            return variables[x].join('|')
        })
    }
    return RegExp(s)
}

function assignArray(state, key, val, unique) {
    if (empty(val)) {
        return 
    }
    if (state.hasOwnProperty(key)) {
        if (unique && state[key].includes(val)) {
            return 
        }
        state[key].push(val)
    } else {
        state[key] = [val]
    }
}

function getFunctionNames(s, key, start) {
    const q = start
        ? key + '\\w+'
        : key 
        ? '\\w*?' + key + '\\w*'
        : '\\w+'
    const r = "^(?:class|(?:async )?function[!*]?) +(" + q + ") *\\("
    const regex = RegExp(r, 'gim')
    return ufa(s, regex)
}

function ufa(s, r, flags) {
    if (!flags) {
        flags = ''
    }
    let m = findall(r, s)
    if (flags.includes('u')) {
        m = unique(m)
    }
    if (flags.includes('s')) {
        m = sort(m, len)
    }
    return m
}

function splitArray2(items, fn) {
    if (isNumber(fn)) {
        return [items.slice(0, n), items.slice(n)]
    }
    const store = [[]]
    let index = 0
    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (fn(item)) {
            if (i == 0) {
                continue
            }
            index += 1
            store.push([])
        } else {
            store[index].push(item)
        }
    }
    return store
}


function assignIncrementedIndex(state,key) {
                    if (!state[key]) {
                        state[key] = 1
                    } else {
                        state[key] += 1
                    }
                    return state[key]
}
function paramify(params) {
	return toArray2(params).join(', ')
}

function createFunction2(name, params, body, context) {
    const paramString = paramify(params)
    const bodyString = getBody(body)
    function getBody(s) {
    if (!isString(s)) {
      return "return " + toStringArgument(s)
    }
        return s
    }
    const a = `function ${name}(${paramString})`
    const text = brackify(a, bodyString)
    console.log({text})
    return bringToLife(text)
}


function tagRE(...tags) {
    const fn = cpop(tags, true) ? parens : identity
    return tags.length > 1 ? 
        tags.map((tag) => `<${fn(tag)}.*?>([^]+?)</${tag}>`).join('|')
        : tags.map((tag) => `<${tag}.*?>([^]+?)</${tag}>`).join('|')
}

function cpop(items, x) {
    if (items.includes(x)) {
        return pop2(items, items.indexOf(x))
    }
}

function createNewFunction(s) {
    return new Function(params, body)
}

class Fo {
    constructor(x) {
        this.x = 123
    }
}
function axb() {
    console.log(this.x)
}
// const a = new Fo()
// const b = eval(parens(axb.toString()))
// console.log(b.toString())
// a.axb = b.bind(a)
// console.log(a.axb())
// console.log(createFunction2('aa', null, {count: 0, selected: []}))

function bindMethods(state, o) {
    for (const [key, fn] of Object.entries(o)) {
        if (fn) {
            state[key] = fn.bind(state)
        }
    }
    return state
}

class State {
    constructor(x) {
        Object.assign(this, x)
    }
    assign(...args) {
        if (args.length == 1) {
            if (isObject(args[0])) {
                Object.assign(this, args[0])
            }
            return 
        }
        const lastArg = args[args.length - 1]
        const lastKey = args[args.length - 2]
        if (isPlural(lastKey) && isPrimitive(lastArg)) {
            args[args.length - 1] = [lastArg]
        }
        return deepAssign(this, ...args)
    }
    toJSON() {
        return stateGetter(this, getPublicKeys(this))
    }
}
function getPublicKeys(state) {
    return filter(Object.getOwnPropertyNames(state), isPublicKey)
}
function isPublicKey(s) {
    return /^[a-z]/i.test(s)
}
// const a = new State()
// console.log(a.toJSON())
// let li
// console.log(li + 1)

function insertBeforeIndex(items, index, item) {
    if (index == -1) { return }
    items.splice(index, 0, item)
}

function insertAfterIndex(items, index, item) {
    if (index == -1) { return }
    items.splice(index + 1, 0, item)
}
const fruits = ['apple', 'banana', 'cherry']
// console.log(fruits)
// insertBeforeIndex(fruits, 0, 'a')
// insertAfterIndex(fruits, 0, 'a')
// console.log(fruits)


function dictEntry(k, v) {
    return `${k}: ${v}`
}

function frontMatter(o) {
    return wrap(reduceToString(o, dictEntry), '---') + '\n\n'
}

function isTypable(s) {
    return s.length == 1 && /\S/.test(s)
}

function alignText(s) {
    let lines = s.trim().split('\n')
    let scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let delimiterRE = /[<>]=?|[=:]|\.\.\./g
    let indexes = []
    let store = []
    function checkpoint(line, i) {
        const matches = matchall(line, delimiterRE)
        if (exists(matches)) {
            store.push(matches.map((x) => x[0]))
            indexes.push(i)
            return true
        }
    }

    const filtered = lines.filter(checkpoint)
    const delimiter = store.every((match) => match[0] == store[0][0])
        ? store[0][0]
        : stop()

    let regex = RegExp(` *${rescape(delimiter)} *`)
    let join = " " + delimiter + " "

    const maxColumnWidths = filtered.reduce((acc, line) => {
        const columns = so(line, regex)
        columns.forEach((col, index) => {
            acc[index] = Math.max(
                acc[index] || 0,
                col.length
            )
        })
        return acc
    }, [])

    const joiner = (col, i) => {
        const padding = " ".repeat( maxColumnWidths[i] - col.length)
        return join + padding
    }

    const alignedLines = lines.map((line, i) => {
        if (!indexes.includes(i)) {
            return line
        }
        const columns = line.split(regex)
        return columns.map(joiner)
    })

    return alignedLines.join("\n")
}

function buildFunction(o, mode) {
    if (!exists(o.body)) {
        return ''
    }
    const fixParam = (p) => {
        return match(p.trim(), /^\w+/)
    }
    // let body = isString(o.body) ? o.body : 'return ' +
    let body
    // console.log({b:o.body})
    if (isString(o.body)) {
        body = o.body
    }
    else {
        body = toStringArgumentPretty(o.body, {maybeHasThisExpr: true, max_length: 0})
        if (o.bodyWrapper) {
            if (o.bodyWrapper.includes('$')) {
                body = templater(o.bodyWrapper, body)
            } else {
            body = strcall(o.bodyWrapper, body)
            }
        }
        body = 'return ' + body
    }
    // console.log({body})
    let s = ''
    if (o.isAsync) {
        s += 'async '
    }
    s += 'function'
    if (o.isGenerator) {
        s += '!'
    }
    s += ' '
    s += o.name || ''
    s += '('
    s += o.paramString || paramify((o.params || []).map(fixParam))
    s += ')'
    s += ' '
    s += brackify(body)
    // console.log(s)
    if (mode == Function) {
        return bringToLife(s)
    }
    if (mode?.name == 'eval') {
        return mode(parens(s))
        return mode(bringToLifeTextFix(s))
    }
    return s
}
function parseFunction(x, evaluator) {
    if (empty(x)) {
        return 
    }
    const s = x.toString()
    const r = /^(async )?(?:(function)(!)? +)?([\w$]+)\(([^]*?)\) *{([^]+?)}\s*$/
    const m = match(s, r)
    // console.log(m)
    if (!m) {
        throw s
    }
        const [isAsync, viaFunction, isGenerator, name, paramString, bodyString] = m
        const params = filter(splitParams(paramString), exists)
        const body = smartDedent4(bodyString)
        const payload = {
            isAsync: !!isAsync,
            isGenerator: !!isGenerator,
            viaFunction: !!viaFunction,
            name,
            params,
            paramString,
            body,
            toString() {
                return buildFunction(this)
            },
            toFunction(evaluator) {
                // console.log(this.toString())
                const code = parens(this.toString())
                if (evaluator == Function) {
                    return eval(code)
                }
                return evaluator(code)
            }
        }
        if (evaluator) {
            payload.fn = payload.toFunction(evaluator)
        }
        return payload
}
// console.log(parseFunction(parseFunction).toString())


function maybeSort(arr) {
    if (isObjectWithKey(arr[0], 'sortIndex')) {
        const textKey = arr[0].hasOwnProperty('text') ? 'text' : 'value'
        const f = (x) => x[textKey]
        return sort(arr, (x) => x.sortIndex).map(f)
    }
    return arr
}

function reverseUnique(items) {
    const seen = new Set()
    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (seen.has(item)) {
            seen.delete(item)
            seen.add(item)
        } else {
            seen.add(item)
        }
    }
    return Array.from(seen)
}
function simpleReduce(x, y) {
    const a = type(x)
    const b = type(y)

    if (a == 'Array' && b == 'Object') {
        return x.reduce((acc, key, i) => {
            return simpleAssign(acc, key, y[key])
        }, {})
    }
    if (a == 'Array' && b == 'Function') {
        return x.reduce((acc, key, i) => {
            return simpleAssign(acc, key, y(key))
        }, {})
    }
    if (a == 'Array' && b == 'Array') {
        return x.reduce((acc, key, i) => {
            return simpleAssign(acc, key, b[i])
        }, {})
    }
}
function sortObject(o, ...keys) {
    const effectiveKeys = reverseUnique(flat(Object.keys(o), keys))
    return simpleReduce(effectiveKeys, o)
}



function getExcerpt(x) {
    switch (type(x)) {
        case 'Null':
        case 'Undefined':
            return 'null'
    
        case 'Object':
        case 'Array':
    
        case 'Function':
            return match(x, /.+?(?= {)/)
        case 'String':
            const lines = x.trim().split('\n')
            if (lines.length > 5) {
                return lines.slice(0, 2).concat('   ...\n   ...   ')
                    .concat(lines.slice(lines.length - 2)).join('\n')
            }
            return x
        case 'Number':
        default:
            return x
    }
}
// console.log(getExcerpt(getExcerpt.toString()))


function applyTransform(x, ...args) {
    if (isFunction(x)) {
        return x( ...args)
    }
    if (isObject(x)) {
        return dictGetter(x, ...args)
    }
    if (isString(x)) {
        return x
    }
    return args[0]
}

function parseAB(master, apps) {
    const {items, aliases, preParsers} = master
    return function parserAB(s) {
        const [a,b] = so(s)
        const alias = aliases[a]
        const ref = items[alias] || items[a]
        const {key, fnKey, preparseKey} = ref

        const args = preparseKey && preParsers ? toArray2(preParsers[preparseKey](b)) : [b]
        const value = ref.hasOwnProperty('value')
            ? ref.value
            : apps[fnKey](...args, key)

        if (isArray(value)) {
            return value
        }
        return [key, value]
    }
}
// console.log(camelCase('abc def'))

function findLineIndex(lines, start, regex, dir, options = {}) {
    const {anti, mustPassStart, includeEndpoints} = options
    const max = lines.length
    const checkpoint = anti ? antif(testf(regex)) : testf(regex)

    let i = start - 1

    while (true) {
        if (i == -1) {
            return 0
        }
        if (i == max) {
            return max - 1
        }
        const line = lines[i]
        if (line == null) {
            return -1
        }
        if (checkpoint(line)) {
            if (!(mustPassStart && i == start - 1)) {
                const offset = includeEndpoints ? 0 : dir
                return i - offset
            }
        }
        i += dir
    }
}
function walk4(x, fn) {
    if (!fn) {
        return x
    }
    function walker(x, k, depth = 0) {
        if (isArray(x)) {
            return mapFilter(x, (y) => walker(y, k, depth + 1))
        }
        if (isObjectLiteral(x)) {
            let touched
            const o = Object.entries(x).reduce((acc, [k, v]) => {
                const newValue = walker(v, k, depth + 1)
                if (notNull(newValue)) {
                    touched = true
                    acc[k] = newValue
                }
                return acc
            }, {})
            if (touched) {
                return o
            }
        }
        return fn(x, k, depth)
    }
    return walker(x)
}
// logConsole()

function blueSandwich(key, value) {
    if (empty(value)) {
        red('no value for', key)
        return 
    }
    red(key)
    blue(hr(65, null))
    console.log(value)
    blue(hr(65, null))
}

function prependIfNecessary(prefix, s) {
    if (s) {
        return s.startsWith(prefix) ? s : prefix + s
    } else {
        return ""
    }
}

function removeLineComments(s) {
    return s.replace(/^\/{2,}.*\n*/gm, '')
}

function appendAbove(s, r, rep) {
    if (r.test(s)) {
        return s.replace(r, (before) => {
            const spaces = 0
            return indent2(rep, spaces) + '\n' + before
        })
    }
    throw 'append failed because r did not test s'
}

function appendBelow(s, r, rep) {
    if (r.test(s)) {
        return s.replace(r, (before) => {
            const spaces = 0
            return before + '\n' + indent2(rep, spaces)
        })
    }
    throw 'append failed because r did not test s'
}

function dashSplit4(s, n = 70) {
    const r = RegExp(`^-{${n},}$`, 'm')
    const f = (s) => {
        const text = s.trim()
        return text.length ? text : null
    }
    return mapFilter(s.split(r), f)
}

function simpleBinding(a, b) {
    const [c, d] = isArray(a) ? a : [a, b]
    return `const ${c} = ${d}`
}

// console.log(tryString(tryString(tryString)))

function strcall(name, params) {
    if (isString(params)) {
        if (isJsonParsable(params)) {
            return `${name}(${params})`
        }
        return `${name}(${doubleQuote(escapeQuotes(escapeNewlines(removeQuotes(params))))})`
    }
    const argString = paramify(params)
    const prefix = isCapitalized(name) ? "new " : ""
    const callable = `${prefix}${name}(${argString})`
    return callable
}


function stringCallable(name, params) {
    const argString = paramify(params)
    const prefix = isCapitalized(name) ? "new " : ""
    const callable = `${prefix}${name}(${argString})`
    return callable
}

function toStringArgument3(x) {
    switch (type(x)) {
        case 'Null':
        case 'Undefined':
            return 'null'
    
        case 'Object':
        case 'Array':
            return JSON.stringify(x)
        case 'Function':
            return x.toString()
        case 'Number':
            return x
        case 'String':
            return parse(x)
    }
    function parse(x) {
        const value = singleQuote(x.replace(/\n/g, '\\n').replace(/'/g, "\\'"))
        /* this essentially does JSON.stringify */
        return value
    }
	
}

function escaper(s) {
    return singleQuote(s.replace(/\n/g, '\\n').replace(/'/g, "\\'"))
}

function blueColon(a, b, bold) {
    const colon = ': '
    return crayonbox.blue(a, bold) + colon + b
}

// console.log(blueColon('aa', 'aa', 'aa'))

function logConfig(config, key, arg) {
    if (config.logs && config.logs.includes(key)) {
        blueSandwich(key, arg)
    }
}

function debugConfig(config, key, payload) {
    if (config.debug == key) {
        throw payload
    }
}

function codeSplit(s) {
    const r = /\n(?=(?:async|const|var|function|class|let|\/\/))/
    return s.split(r)
}

function getProseWords(s) {
    const r = /(?<=[ \n'"])[a-z]{3,}|(?<=[?.!] |\n)[a-zA-Z]{3,}/g
    return unique(findall(r, s).map((x) => x.toLowerCase()))
}

function hasStartingCallable(s) {
    return /^\w+(?:\.\w+)*\(/m.test(s)
}

function hasCallable(s) {
    const hasCallable = /^\w+(?:\.\w+)*\(/m.test(s)
    return hasCallable
}


function toLines(s) {
    return isArray(s) ? s : s.trim().split('\n')
}


function runRef(ref, a, b, ...args) {
    if (ref.hasOwnProperty(a)) {
        return ref[a](b, ...args)
    }
    if (ref.default) {
        return ref.default(a, b, ...args)
    }
    return b
}

function getFunctionInfo(x) {
    const text = x.toString()
    const isClass = isClassObject(x)
    const params = isClass ? getClassParameters(x) : getParameters(x)
    const name = getIdentifier(text)
    const prefix = isClass ? 'new ' : ''
    return {
        isClass,
        text,
        params,
        name,
        prefix,
    }
}

function stringDictSetter(...args) {
    const prefix = /^\w:/.test(args[0]) ? 'let' : 'const'
    let s = prefix
    s += ' '
    for (let i = 0; i < args.length; i++) {
        const arg = args[i]
        if (i == 0) {
            s += arg
        }
        
        else if (i == args.length - 1) {
            s += ' = ' + JSON.stringify(arg)
        }
        else {
            s += `["${arg}"]`
        }
    }
    return s
}



class StopWatch {
    constructor({onStart, onTick, onEnd, duration, delta} = {}) {
        this.onStart = onStart || noop
        this.onTick = onTick || noop
        this.onEnd = onEnd || noop
        this.duration = duration || Infinity
        this.delta = delta || 500 || 1000
        this.tick = this.tick.bind(this)
        this.reset()
    }
    reset() {
        this.count = 0
        this.cycles = 0
        this.stopped = false
    }
    isDone() {
        if (this.stopped) {
            return true
        }
        this.currentTime = Date.now()
        if (this.currentTime >= this.endTime) {
            return true
        }
    }
    start() {
        this.startTime = Date.now()
        this.endTime = this.startTime + 1000 * this.duration
        this.onStart()

        return new Promise((resolve, reject) => {
            this.tick(resolve)
        })
    }
    stop() {
        this.stopped = true
    }

    tick(resolve) {
        this.cycles += 1
        if (this.isDone()) {
            clearTimeout(this.timerID)
            const endArg = this.getArg('onEnd')
            this.onEnd(endArg)
            this.reset()
            if (resolve) {
                resolve(endArg)
            }
            return true
        }
        this.onTick(this.getArg('onTick'))
        this.timerID = setTimeout(this.tick, this.delta, resolve)
    }
    getArg(hook) {
        return {
            elapsed: this.currentTime - this.startTime,
            cycles: this.cycles,
            hook,
        }
    }
}

function roundToNearest(n, boundary = 10) {
    return Math.round(n / boundary) * boundary
}

function getIndentAndText(raw, index) {
    const ind = Math.max(raw.search(/\S/), 0)
    xassert(ind % 4 == 0, "indents are required to be modulus 4", {raw})
    const text = raw.trim()
    return { ind: ind / 4, text, index: index, raw: raw }
}

function imatchf(ref, wrapper, state) {
    return function imatch(arg) {
        const [text, ...args] = wrapper(arg)
        for (const [a,b] of ref) {
            const m = text.match(a)
            if (m) {
                const value = state 
                    ? b.call(state, ...toArray2(getMatch(m)), ...args)
                    : b(...toArray2(getMatch(m)), ...args)
                return isDefined(value) ? value : true
            }
        }
    }
}

function repeat(s, n, mode) {
    return mode == Array ? range(n).map(() => s) : s.repeat(n)
}



const blue = chalkf2('blue', true)
const red = chalkf2('blue', true)
const green = chalkf2('green', true)

// console.log(filter3(['ab', {b:1}], {ab:1}, 1))
// console.log(walk4(3, null))

function count(s, key) {
    if (isFunction(key) && isArray(s)) {
        return s.filter(key).length
    }
    const m = s.match(RegExp(key, 'g'))
    if (m) {
        return m.length
    }
    return 0
}

function allEqual(x, fn) {
    if (!isFunction(fn)) {
        fn = identity
    }
    const base = fn(x[0])
    return x.every((x) => fn(x) === base)
}

function find4(a, b) {
    const checkpoint = getCheckpoint4(b, a)
    const base = entries(a)
    return base.find(checkpoint)
}
function filter4(a, b, anti) {
    if (empty(b)) {
        return a
    }
    if (a == null) {
        return type(b) == 'Object' ? {} : []
    }

    const checkpoint = anti
        ? antif(getCheckpoint4(b, a))
        : getCheckpoint4(b, a)

    return isArray(a)
        ? a.filter(checkpoint)
        : dict(entries(a).filter(checkpoint))

}
function getCheckpoint4(x, reference) {

        function objectCheckpoint(y) {
            if (isString(y)) {
                return y in x
            }
            for (const [a, b] of entries(x)) {
                const base = y[a]
                if (base != b) {
                    return false
                }
            }
            return true
        }
        switch (type(x)) {
            case 'Null':
            case 'Undefined':
                return isDefined
        
            case 'Object':
                return objectCheckpoint
            case 'Array':
                return (y) => {
                    return !x.includes(y)
                }
        
            case 'Function':
                return x

            case 'String':
                const r = RegExp(x, 'i')
                if (isPrimitiveArray(reference)) {
                    return testf(r)
                }

                if (isObjectArray(reference)) {
                    if ('name' in reference[0]) {
                        return (x) => r.test(x.name)
                    }
                    if ('key' in reference[0]) {
                        return (x) => r.test(x.key)
                    }
                    throw new Error('the filter sourvce is an object array but there is no matching test key')
                }
                return (x) => r.test(x[0])
            case 'RegExp':
                return testf(x)
        }
}

function matchstr(s, r) {
    return match(s, r) || ''
}

function getExports(s) {
    if (!exists(s)) {
        return []
    }
    const exportRE = /(?:^|\n)export {([^]+?)}\s*/
    const text = removeComments(matchstr(s, exportRE))
    return getBindings(text)
}

function getImports(s) {
    if (empty(s)) {
        return []
    }
    const importRE = /^import [^]+? from *[\'\"](.*?)[\'\"]/gm
    return findall(importRE, s)
}

function getBindings(s) {
    const r = /[a-zA-Z]\w*/g
    return unique(findall(r, s))
}

function abg(fn, items) {
    if (fn.length == 1) {
        return fn
    }
    return (x, ...args) => fn(...x, ...args)
}
function forEach(items, fn) {
    return entries(items).forEach(abg(fn, items))
    // return smart_map(items, fn)
}
function getCaller4(targetIndex = 0) {
    const matches = getErrorStack()
    // console.log(matches)
    const keys = [
        "consoleLog",
        "browserChalk",
        "getCaller",
        "getCallerObject",
        "log",
        "getCaller2",
    ]

    const startIndex = matches.findIndex(([name]) => {
        return keys.includes(name)
    })

    let [caller, file, line] = matches[startIndex + 1 ]
    let [parentCaller] = matches[startIndex + 2 ]
    const computed = flat(parentCaller, caller).join('.')
    return computed
}

function localBringToLife(text, evaluate) {
	const code = bringToLifeTextFix(text)
    console.log(evaluate)
    return evaluate(code)
}



function bringToLifeTextFix(s) {
    const get = (x) => {
        x = smartDedent(x)
        if (/^[\[{]/.test(x)) {
            return x
        }
        
        if (/^x/.test(x)) {
            return '(x) => ' + x
        }
        else if (/^(?:const|var|let)/.test(x)) {
            return x.replace(/.*? *= */, '')
        }
        else if (/^(?:async )?\w+\(/.test(x)) {
            return x.replace(/^(?:async )?/, (y) => y + 'function ')
        }
        return x
    }
    return parens(get(s))
}
function parseCallable(s) {
    const r = /([^\s\(]+)\(([^]*?)\)/
    const m = match(s, r)
    if (empty(m)) {
        return 
    }
        let members = null
    let  [name,b] = m
        if (name.includes('.')) {
            members = name.split('.')
            name = members.shift()
        }
    const base = split(b, /,/)
    const args = []
    const kwargs = {}
    const runner = (arg) => {
        const r = /^([\w-]+) *[=:] *(.+)/
        const m = match(arg, r)
        if (m) {
            kwargs[m[0]] = toArgument(m[1])
        } else {
            args.push(toArgument(arg))
        }
    }
        if (base) {
            base.forEach(runner)
        }
    return {
        name,
        args,
        kwargs,
        members,
    }
}

function trimArray(items) {
    if (items[items.length - 1] === "") {
        items.pop()
    }
    if (items[0] === "") {
        items.shift()
    }
}

function colonConfigf(transformers = {}) {
    function split(s, r) {
        const items = s.split(r).map(trim)
        trimArray(items)
        return items
    }
    const colonConfigStartRE = /^(\w[\w\.-_]*): */m
    return function lambda(s) {
        const temp = split(s, colonConfigStartRE)
        const a = partition(temp)
        return reduce(a, ([a,b]) => [a, runRef(transformers, a, b)])
    }
}

function cssComment(s) {
    return `/* ${s} */`
}

function localeString() {
    return (new Date).toLocaleString()
}
// console.log(parseCallable('sdfsdf(asd, a1, 11)'))
// blue('aa', '')

function chalkf2(key, logIt) {

    const colors = variables.terminalColors
    const color = colors[key.toUpperCase()]
    const bold = colors.BOLD
    const reset = colors.RESET

    function chalk(...args) {
        switch(args.length) {
            case 1:  return chalk1(...args)
            case 2:  return chalk2(...args)
            default: return chalk3(...args)
        }
    }
    return logIt ? (...args) => console.log(chalk(...args)) : chalk

    function colorize(s, bold) {
        const raw = fix(s)
        const value = raw.default || raw.value
        const baseColor = raw.color ? colors[raw.color.toUpperCase()] : color
        return baseColor + (bold ? colors.BOLD : '') + value + reset
    }
    function fix(x) {
        function parseString(s) {
            if (!s) {
                return '""'
            }
            return doubleQuote(s)
        }
        switch (type(x)) {
            case 'Null':
                return { color: 'gray', value: 'null' }
            case 'Undefined':
                return { color: 'gray', value: 'undefined' }
            case 'Number':
                return {value: parseString(x)}
            case 'String':
                return {default: x}
            default:
                return {default: JSON.stringify(x)}
        }
    }
    function chalk1(a) {
        return colorize(a)
    }
    function colon(a) {
        return color + colors.BOLD + a + ':' + reset
    }

    function chalk2(a, b) {
        return colon(a) + ' ' + colorize(b)
    }
}


function browser_chalk(a, b) {
    console.log('%c' + a, 'font-weight: bold; background: yellow; font-size: 12pt; padding: 0 20px', b)
}
function smart_map(items, fn) {

    let double = false
    let object = false
    if (empty(items)) {
        return []
    } else if (isNestedArray(items)) {
        double = true
    } else if (isObject(items)) {
        double = true
        object = true
    } else if (isString(items)) {
        items = [items]
    } else if (isNumber(items)) {
        items = range(items).map((x) => x + 1)
    }
    if (isString(fn)) {
        let key = fn
        fn = (x) => x[key]
    }

    const gn = double ? (x, i, a, store) => fn(...x, i, a, store) : fn
    const computed = object ? Object.entries(items) : items

    const store = []
    for (let i = 0; i < computed.length; i++) {
        const item = computed[i]
        const value = gn(item, i, computed, store)
        push2(store, value)
    }
    return store
}
function browserChalk2(a, b) {
    if (isObject(a)) {
        return smart_map(a, browser_chalk)
    }
    console.log('%c' + a, 'font-weight: bold; background: yellow; font-size: 12pt; padding: 0 20px', b)
}

function tryf(fn, onError) {

    function defaultOnError(e, text) {

    }

    if (!onError) {
        onError = defaultOnError
    }

    return function lambda(...args) {
        try {
            return fn(...args)
        } catch (e) {
            return onError(e, ...args)
        }
    }
}

function findDependencies(root, lib, x, mode) {
    const watcher = new Watcher()
    const lookup = isFunction(x) ? x : curry2(x, findall)
    const store = []

    runner(root)
    return mode == Object
        ? store.map((key) => lib[key])
        : store

    function gather(key) {
        const text = lib[key]
        if (text) {
            store.push(key)
            return lookup(text)
        }
    }

    function runner(node) {
        const children = gather(node)
        if (children) {
            children.filter(watcher.isFresh).forEach(runner)
        }
    }
}

class Items {
    constructor(items) {
        this.index = 0
        this.items = items || []
        this.init && this.init()
    }
    next() {
        const item = this.item
        this.index += 1
        return item
    }
    get item() {
        return this.items[this.index]
    }
    isDone() {
        return this.index == this.items.length - 1
    }
}

function parseSingleLineJson(s) {
    const simpleKwargRE = /(\w\S*) += +(.*?)(?:, *(?=\S+ *=)|$|\))/g
    const m = search(/^[\[\{]/, s)
    if (m) {
         const r = /^[\[\{] *| *[\]\}]$/g
         s = s.replace(r, '')
         if (m == '{') {
             let r
             if (/^\S+ += +\w/.test(s)) {
                  r = simpleKwargRE
             } else {
                  r = /(\S+) *: *(.*?)(?:,|$)/g
             }
             return reduce(findall(r, s), (x) => [x[0], toArgument(x[1])])
         } else {
             return xsplit(s).map(toArgument)
         }
    }
    return toArgument(s)
}

function maybeCall(key, ...args) {
    return isFunction(key) ? key(...args) : key
}

function group2(x, key) {
    const storage = new Storage()

    if (isNestedArray(x) || isObject(x)) {
        forEach(x, (k, v) => storage.add(k, v))
    } else if (isObjectArray(x)) {
        const computedKey = key
            || x[0].hasOwnProperty('name') && 'name'
            || x[0].hasOwnProperty('type') && 'type'
            || x[0].hasOwnProperty('key') && 'key'
            || x[0].hasOwnProperty('label') && 'label'

        assertion2(computedKey)
        forEach(x, (item) => storage.add(item[computedKey], item))

    } else {
        throw "not done yet"
    }
    return storage
}
function group(items, x, schema) {
    /* next version of groupBy */
    if (isNestedArray(items)) {
        const storage = new Storage()
        items.forEach((item, i) => {
            storage.add(item[0], item[1])
        })
        return storage
    }
    const key = Object.keys(items[0])[0]
    const create = () => {
        const baseObject = items[0]
        const keys = [
            "type",
            "name",
        ]
        const key = keys.find((key) => baseObject.hasOwnProperty(key))
            || Object.keys(baseObject)[0]
        return (o) => o[key]
    }
    const get = isFunction(x) ? x : x ? (o) => o[x] : create()
    const storage = new Storage()
    items.forEach((item, i) => {
        storage.add(get(item, i), item)
    })
    if (schema) {
        const json = storage.toJSON()
        const getValue = (k, v) => {
            const value = json[k]
            if (isDefined(value)) {
                const mapped = value.map((x) => x.value)
                if (v == Object) {
                    return mergeObjects(mapped)
                }
                return mapped
            }
            return getFallback(v)
        }

        return reduce(schema, ([k,v]) => {
            const value = getValue(k, v)
            return [k, value]
        })
    }
    return storage
    function getFallback(v) {
        switch(v) {
            case Array: return []
            case Object: return {}
            case String: return ''
            case Number: return 0
        }
    }
}

function so2(s, r) {
    function wrap(r) {
        return '^(\\S[^]*?)' + r + '([^]+)'
    }
    if (isArray(s)) {
        return s
    }
    if (!r) {
        r = /^(\S+)(?: *[=:{}] *| +)(.+)/
    }
    else if (isString(r)) {
        r = RegExp(wrap(r))
    }
    else {
        r = RegExp(wrap(r.source), r.flags)
    }
    const text = s.trim()
    const m = match(text, r)
    if (m) {
        return m.map(trim)
    }
    return [text, '']
}
function so(s, r, fallback) {
    if (isArray(s)) {
        return s
    }
    const text = s.trim()
    const i = text.search(r || /[\s:{}]/)
    if (i < 0) {
        return [text, fallback || '']
    }
    return [text.slice(0, i), text.slice(i + 1)].map(trim)
}

function redColon(a, b) {
    return crayonbox.red(a) + ': ' + b
}

function error(template, ...args) {
    const message = templater(template, args)
    throw new Error(crayonbox.red(message))
}
const operations = {
  '!': (a) => a == null,
  not: (a) => a == null,
  and: (a, b) => a && b,
  or: (a, b) => a || b,
  addition: (a, b) => a + b,
  subtraction: (a, b) => a - b,
  multiplication: (a, b) => a * b,
  division: (a, b) => a / b,
  mod: (a, b) => a % b,
  exp: (a, b) => Math.pow(a, b),
  sqrt: (a) => Math.sqrt(a),
  abs: (a) => Math.abs(a),
  round: (a) => Math.round(a),
  floor: (a) => Math.floor(a),
  ceil: (a) => Math.ceil(a),
  '==': (a,b) => a == b,
  '===': (a,b) => a == b,
  '>=': (a,b) => a >= b,
  '<=': (a,b) => a <= b,
  '<': (a,b) => a < b,
  '>': (a,b) => a > b,
}



class Environment {
    constructor(parent) {
        this.parent = parent
        this.variables = new Map()
    }
    resolve(name) {
        if (this.variables.has(name)) {
            return this
        }
        if (this.parent == null) {
            error('cannot resolve "$1" as it does not exist', name)
        }
        return this.parent.resolve(name)
    }
    getArg(arg) {
        const computed = arg.type == 'Number' || arg.type == 'String'
            ? arg
            : arg.type == 'VariableName'
            ? this.lookup(arg.value)
            : stop()

        return computed
    }
    getResolvedArg(arg) {
        while (arg.type == 'VariableName') {
            arg = this.lookup(arg.value)
        }
        return arg
    }
    lookup(name) {
        const env = this.resolve(name)
        return env.variables.get(name)
    }
    assignVar(name, value) {
        const env = this.resolve(name)
        env.variables.set(name, value)
        return value
    }
    declareVar(name, value, constant) {
        // const arg = isNumber(value)
            // ? value
            // : isString()
        const arg = value
        this.variables.set(name, arg)
        return value
    }
    createScope(params, args) {
        const a = new Environment(this)
        for (let i = 0; i < params.length; i++) {
            const param = params[i]
            const arg = args[i]
            // console.log({param, arg})
            a.declareVar(param, arg)
        }
        return a
    }
}

function evaluateStatements(x, env) {
    const statements = toArray2(x)
    env = env || new Environment()
    let last = null
    statements.forEach((statement) => {
        last = evaluateStatement(statement, env)
    })
    return last
}
function evaluateStatement(statement, env) {
    const fn = ref2[statement.type]
    if (isFunction(fn)) {
        return fn(statement, env)
    }
    throw statement
}

function createLambda(params, body, env) {
    return function lambda(...args) {
        const scope = env.createScope(params, args)
        // throw scope
        return evaluateStatements(body, scope)
    }
}
const ref2 = {
    function({name, params, body}, env) {
        const lambda = createLambda(params, body, env)
        env.declareVar(name, lambda)
    },

    definition({name, value}, env) {
        env.declareVar(name, value)
    },

    callable({name, args}, env) {
        const lambda = env.lookup(name)
        const computed = args.map((arg) => env.getResolvedArg(arg))
        return lambda(...computed)
    },
    binary({operator, args}, env) {
        const computed = args.map((arg) => evaluateExpr(arg, env))
        return operations[operator](...computed)
    }
}

function evaluateExpr(arg, env) {
    const get = (arg) => {
        switch(arg.type) {
            case 'VariableName':
                return env.getResolvedArg(arg).value
            case 'binary':
                const value = evaluateStatement(arg, env)
                return value
        }
    }
    return get(arg)
}

/*  
 * 
 *
 * */
function fobject(ref, key, ...args) {
    if (key in ref) {
        const base = ref[key]
        return isFunction(base) ? base(...args) : base
    }
}
function colonConfigTransformerFactory({
    transformers = {},
    fulfillers = {},
    aliases = {},
    defaultTransform = toArgument
} = {}) {
    const getKey = (k) => {
        return aliases[k] || k
    }

    const getValue = (store, key, v) => {
        if (v === '') {
            return fobject(fulfillers, key, store)
        }
        if (key in transformers) {
            const arg = toArgument(v)
            return fobject(transformers, key, arg, store, arguments[0])
        }
        return defaultTransform(v)
    }

    const set = (store, k, v) => {
        if (isPrivate(k)) {
            store[k] = v
            return 
        }
        const key = getKey(k)
        const value = getValue(store, key, v)
        if (isDefined(value)) {
            store[key] = value
        }
    }

    return set
}
function colonConfig(s, options) {
    const r = isRegExp(options?.delimiter)
        ? options.delimiter
        : RegExp(`^([a-zA-Z][$\\w-_.]*)${options?.delimiter || ':'}`, 'm')

    // console.log(r)
    // console.log(s)
    const items = s.trim().split(r).map(smartDedent4)
    const store = {}
    if (items.length == 1 && options?.implicitLast) {
        store[options.implicitLast] = items[0]
    } else {
        for (let i = 1; i < items.length - 1; i+= 2) {
        const a = items[i]
        const b = items[i + 1]

        if (options?.implicitLast && i == items.length - 2 && options.implicitLast != a && !isJsonParsable(b)) {
            const [c,d] = splitOnce(b, /\n/)
            store[a] = c
            store[options.implicitLast] = d
        } else {
            store[a] = b
        }
    }
    }

    // pause(store)
    return options
        ? doColonConfigOptions(store, options)
        : store
}
function doColonConfigOptions(base, options) {
    const set = colonConfigTransformerFactory(options)
    const store = {}
    for (const [k, v] of Object.entries(base)) {
        set(store, k, v)
    }
    const onHook = (k, v) => {
        return store[k] && v(store)
    }
    smart_map(options.hooks, onHook)
    return store
}

// console.log(colonConfig('aa: a\ndd: \n\nasdasd'))


function compareFunctions({functions, tests, args}) {
    const values = args.map((arg, i) => {
        const results = functions.map((fn) => fn(arg))
        const equal = allEqual(results)
        return {
            results, equal
        }
    })
    const results = {
        args,
        values
    }
    console.loggg(results)
}
// console.log(import.meta.data)
// console.log(so('a'))

function simpleStringBreaker(s) {
    return s.replace(/^\s*breaker.*/msi, '')
}

function removePythonComments(s) {
    return s.replace(/^ *#.*\n*/gm, '')
}

function fixSelector(s) {
    if (startsWithHtmlTag(s)) {
        return s
    }
    if (isSymboledSelector(s)) {
        return s
    }
    return '.' + s
}

function startsWithHtmlTag(s) {
    return htmlTags.includes(match(s, /^[a-z][\w-]*/i))
}
function isSymboledSelector(s) {
    return /^[^\w\s]\w+/.test(s)
}

function aliaser(a, b) {
	return reduce(a, ([k, v]) => [b[k] || k, v])
}

function mapTemplate(template, items) {
    return toArray2(items).map((arg) => templater(template, arg))
}
// templater('', '')
function raise2(errorName, message) {
    const e = new Error()
    e.name = crayonbox.red(errorName, true)
    if (message) {
        e.message = crayonbox.red(message)
    }
    throw e
}
function textFrame(s) {
	return s
}
function handle_smart_map_error(e, item, fn) {
	const template = `
        an error has occured at smart_map's fn callback: "$callback"
        the item consumed by the callback is: "$item"
        the error message is: "$error_message"
        the relevant stack trace is $trace
    `
    // console.log({error: e.)
    throw {
        error: e,
        arg: item,
        fn: fn.toString(),
        meta: 'error at smart_map',
    }
    const callback = fn ? fn.name : 'the call back is null'
    const error_message = e
    const trace = get_stack_trace(e)
    const message = templater(template, walk4({callback, item, error_message, trace}, string_repr))
    throw crayonbox.red(message)
}
function get_stack_trace(e) {
    if (!e) e = new Error()
    const s = isString(e) ? e : e.stack
    const r = /at (?:new |Object\.)?([<>a-zA-Z0-9\.]+) .*?(\d+):\d+\)/g
    return findall(r, s)
}
function string_repr(x) {
    switch (type(x)) {
        case 'Null':
        case 'Undefined':
            return 'null'
        case 'Function':
            return x.name || 'anonymous'
        case 'String':
            return x
        case 'Object':
        case 'Array':
        case 'Number':
            return JSON.stringify(x)
        default:
            return wrap(x.constructor.name, '{}')
    }
}
function has_property(x, key) {
    console.log(x)
    try {
        const methods = Object.getOwnPropertyNames(x)
        return methods.includes(key) || key in x || false
    } catch(e) {
        console.log(e.toString())
        return false
    }
}
// smart_map('aa', (x) => x.abc())

function run_tests(s, fn) {
    const [a,b] = coerce_array_size(dashSplit(s), 2)
    if (b) {
        const params = []
        function runner(key) {
            const arg = alphabet[key]
            params.push(arg)
            return arg
        }

        const body = 'return ' + templater(b, runner)
        fn = buildFunction({params, body}, Function)
    }
    const items = smart_map(split(a, /\n+/), toArgument)
    const evaluations = smart_map(items, fn)
    const entries = zip(items, evaluations, Array)
    smart_map(entries, print)
    console.log(blueColon('running function', fn.toString()))

    function print(a, b) {
        console.log('arg:', crayonbox.blue(string_repr(a)), 'value:', b)
    }
}

function dashSplit(s) {
    const text = smartDedent4(s)
    const delimiter = /^_{5,}/m.test(text) ? '_' : '-'
    const regex = RegExp(`^${delimiter}{50,}`, 'm')
	return split(text, regex)
}
function coerce_array_size(arr, n, fallback = '') {
    while (arr.length < n) {
    	arr.push(fallback)
    }
    return arr
}


function consoleTest(fn, ...args) {
    if (!isNode()) {
        return 
    }
    const computedArg = console.testString
    if (computedArg == null) {
        return 
    }
    const value = fn(computedArg, ...args)

    const e = getErrorStack3()
    console.log(chalk3('running consoleTest', 'Green'))
    console.log(chalk3(e, 'Blue'))
    sandwichLog(value)
}
function sandwichLog(x, header) {
    if (empty(x)) {
        return 
    }
    if (type(x) == 'StateContext') {
        x = x.toString()
    }
    if (header) {
        header += ' '
    } else {
        header = 'Sandwich Log '
    }
    const a = header + '-'.repeat(40)
    const b = '-'.repeat(a.length)
    console.log(a)
    console.log(x)
    console.log(b)
}

// console.log(prettyStringify({a: Number}))

function javascriptObjectQuote(s) {
    if (/\W/.test(s)) {
        return singleQuote(s)
    }
    return s
}
function bracker(items, template, depth, {lang, quote, indentation, max_length, noWrapper}) {
    // console.log(max_length)
    let [a,b] = template.split('')
    const as_array = a == '['
        if (as_array && !exists(items)) {
            return '[]'
        }
    if (lang == 'typst') {
        ;[a,b] = ['(', ')']
    }
    const vimPrefix = lang == 'vim' ? '\\' : ''
    if (lang == 'vim') {
        quote = doubleQuote
    }
 
    const parse = (item) => {
        // console.log({item})
        if (as_array) {
            return item
        }
        if (lang == 'json') {
            return doubleQuote(item[0]) + ': ' + item[1]
        }

        if (item[0] === null) {
            return item[1]
        }
        if (item[0] === item[1] && lang == 'javascript') {
            return item[0]
        }
        if (lang == 'typst') {
            return item[0] + ': ' + item[1]
        }
        if (item[0].endsWith('!')) {
            return item[0].slice(0, -1) + ': ' + removeQuotes(item[1])
        }
        return quote(item[0]) + ': ' + item[1]
    }

    const computed = items.map(parse)

    const value = a + computed.join(', ') + b


    if (depth == 0 && noWrapper) {
        // pause('hi')
        return computed.join(',\n')
        // for (const item of computed) {
        // console.log('aa')
        // console.log([a, b])
        // throw computed
    }
    if (value.length + depth * indentation < max_length && !hasNewline(value)) {
        return value
    }

    let s = a + '\n'
    for (const item of computed) {
        s += indent(vimPrefix + item, indentation) + ',\n'
    }
    s += vimPrefix + b 
    return s
}
function build_array_string(items, depth) {
	
    const newlines = items.some(hasNewline)

    return newlines
        ? bracker(items, '[]', 2)
        : '[' + items.join(', ')
}

// console.log(toStringArgumentPretty({a:'_'.repeat(100)}))

function create_functions_from_master(master) {
    const create = ([k,v]) => {

        const ref = master[k]
        const wrapper = ref.wrapper

        return function lambda(...args) {

            const fn = ref[args.length]
            const value = fn(...args)
            return wrapper ? wrapper(...value) : value
        }
    }
    return reduce(master, create)
}


// console.log(toStringArgumentPretty(toArgument('\\w')))

function looks_like_object_function(value) {
	return /^(?:async )?\w+\(/.test(value)
}

function mget3(s, r) {
    const store = []

    function get(...args) {
        const computed = args.slice(0, -2)
        switch(computed.length) {
            case 1: return computed[0]         /* str */
            case 2: return computed[1]         /* str */
            default: return computed.slice(1)  /* arr */
        }
    }

    const parser = (...args) => {
        const value = get(...args)
        store.push(value)
        return ''
    }

    const text = s.replace(r, parser)
    const payload = empty(store) ? '' : smallify(store)

    return [text, payload]
}
function simpleRealArgument(x) {
    const value = Number(x)
    return isNaN(value) ? x : value
}

function call(fn, match) {
    if (fn) {
        return fn(...toArray2(match).map(simpleRealArgument))
    }
    return match
}


function bindMethodsAndState2(state, o) {

    for (const [k, v] of Object.entries(o || {})) {
        set(state, k, v)
    }
    return state

    function set(state, k, v) {
        switch (type(v)) {
            case 'Object':
                return deepAssign(state, k, v)
            case 'Function':
                state[k] = v.bind(state)
                return 
            default:
                state[k] = v
        }
    }
}

function countf() {
    let count = 0
    return function lambda() {
        count += 1
        return count
    }
}

function toggle3(state, key) {
    const value = state[key] || false
    state[key] = opposite(value)
}

function camelSplit(s) {
    return split(s, /(?<=[a-z])(?=[A-Z])/)
}

function getDependencies(root, lib, lookup = identity) {
    const watcher = new Watcher()
    runner(root)
    const store = watcher.toJSON()

    return {
        keys() { 
            return store
        },
        values() { 
            const a = store.map(get)
            return a[0] == a[1] ? a.slice(1) : a
        },
        toJSON() { return reduce(store, get) }
    }

    function get(key) {
        return isString(key) ? lib[key] : key
    }

    function gather(key) {
        const item = get(key)
        if (item == null) {
            return 
        }
        if (!watcher.isFresh(key)) {
            return 
        }
        return lookup(item)
    }

    function runner(key) {
        forEach(gather(key), runner)
    }
}
function view(x) {
    console.log({view: x})
    return x
}

function looksLikeRegExpString(s) {
    /* u */
	return /\\[wsb]|\^|\.\*|\||\(\?:|\[\^/.test(s)
}

function isLowerCase(k) {
	return /^[a-z0-9]+/.test(k)
}

function trimStartingNewlines(s) {
	return s.replace(/^\n+/, '')
}

function prettyStringifyReplacer(k, v) {
    if (isRegExp(v)) {
        return v.toString()
    }
    if (isClassObject(v)) {
        const methods = [
            "toJSON",
            "toString",
        ]
        for (const method of methods) {
            try {
                return v[method]()
            } catch(e) {
                continue
            }
        }
        console.log(v)
        raise('JsonError', 'class objects are not allowed in json files')
    }
    return v
}

const code = `
asfasdf
asdfsd
dsfd
asdfasdf

}

function foo() {

}

asdf
asdf
`
const regexes = {
    spaces: /(?<=\S)\s+/,
    bindingPrefix: /^(?:def|class|const|var|(?:async )?function[!*]?) /m,
    codeChunks: /\n+(?=(?:export|import|const|async|class|function|var|let) |(?:for|try|if|while|do) {|\w+(?:\.\w+)?\()/,
        linebreak: /^------+/m,
        comma: /,/,
        linebreak: linebreakRE,
        chunks: /\n\n+/,
            '/': /\//,
            ' ': / +/,
}

function splitOnce2(s, key = 'spaces') {
    const r = regexes[key]
    assertion2(regexes, key)
    const i = s.search(r)
    if (i == -1) {
        return [smartDedent4(s), '']
    }
    return [s.slice(0, i), s.slice(i)].map(smartDedent4)
}


function lazyJson(s) {
    if (!s) {
        return {}
    }
    const g = (_, x) => {
        if (!isNumber(x)) {
            x = singleQuote(x)
        }
        return ` ${x},`
    }
    const f = (_, x) => {
        // console.log({x})
        if (isJsonParsable(x)) {
            if (x[0] == "{") {
                return x.replace(/(?<=\w+:) *(\w+),?/gm, g) + ","
            }
            return x.replace(/[a-z]\w*/gi, singleQuote) + ","
        }
        return g(_, x)
    }
    const text = s
        .replace(/(?<=^ +[\}\]]$)/gm, ",")
        .replace(/(?<=^ +\w+:) *(\d+|\S\S.*?),? *$/gm, f)
    return walk4(bringToLife(text), toArgument)
}

function equalityf(key) {
    if (key) {
        return function lambda(a, b) {
            if (isObject(a)) {
                return a[key] === b[key]
            }
        }
    }
}


class TypeObject {
    constructor(key, payload) {
        this.__name__ = key
        this.__keys__ = Object.keys(payload)
        Object.assign(this, payload)
    }

    get name() { return this.__name__ }
    get args() { return this.__keys__.map((key) => this[key]) }
    get entries() { return this.__keys__.map((key) => [key, this[key]]) }
    toJSON() { return dict(this.entries) }
    validate() {
        smart_map(this.entries, typeAssertion2)
    }
}
const TypedObjectFactory = (name, schema) => {

    const create = (...args) => {
        const runner = ([k, type], i) => {
            const arg = args[i]
            typeCheck(type, arg)
            return [k, arg]
        }
        const payload = reduce(schema, runner)
        return new TypeObject(name, payload)
    }
    return create
}
function typeCheck(key, value) {
    const typeRef = {
        string: isString,
        number: isNumber,
        int: Number.isInteger,
        date: isValidDateString,
        email: isValidEmailString,
        defined: isDefined,
    }

    const validator = typeRef[key]

    if (!validator) {
        raise('no validator present')
    }

    const check = validator(value)

    if (check) {
        return check
    }
    raise('TypeError', '"$1" is not of type "$2"', value, key)
}

const WriteObject = TypedObjectFactory('write', {file: 'string', contents: 'defined'})
const AppendObject = TypedObjectFactory('append', {file: 'string', contents: 'defined'})

function isValidDateString(s) {
    const dateObject = new Date(s)
    return !isNaN(dateObject.getTime())
}
function isValidEmailString(s) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(s)
}

function isJavascriptFile(s) {
    return /^\w+\.js$/.test(tail(s.toString()))
}

function isPrivate(x) {
	return /^[_]/.test(x)
}
function isNewExpression(s) {
	return /^new \w+(?:\(.*?\))?$/.test(s)
}

function functionLibrary(s, mode) {

    const items = split(s, 'codeChunks')
    const runner = (text) => {
       const name = getBindingName(text)
       const params = getParameters(text)
       if (name) {
           return {
               name,
               params,
               text,
               ...getCodeType(text)
           }
       }
    }
    return mapFilter(items, runner)
}

function getCodeType(s) {
    const word = match(s, /^\w+/) || ''
    const a = codeTypeRef[word]
    return a
}
// console.log('s'.replace(/(s)/, '$1'))

const codeTypeRef = {
  async: {
    type: 'function',
    attrs: {
      async: true,
    },
  },
  function: {
    type: 'function',
  },
  class: {
    type: 'class',
  },
  let: {
    type: 'variable',
    attrs: {
      let: true,
    },
  },
  const: {
    type: 'variable',
    attrs: {
      const: true,
    },
  },
  var: {
    type: 'variable',
    attrs: {
      var: true,
    },
  },
}
function get_regex(key) {
    switch (type(key)) {
        case 'String':
            assertion2(regexes, key)
            return regexes[key]
        case 'RegExp':
            return key
    }
}

            
const infoRef = {
  ReferenceError: {
    keys: [
      'name',
      'message',
      'stack',
    ],
  },
  SyntaxError: {
    keys: [
      'name',
      'message',
      'stack',
    ],
  },
  Error: {
    keys: [
      'name',
      'message',
      'stack',
    ],
  },
  Vue: {
    keys: [
      '$options.name',
      '_uid',
      'uid',
      '$options.template',
    ],
  },
}
function extendedType(x) {
    const t = type(x)
    switch(t) {
        case 'i':
        case 'gn':
            return 'Vue'
        case 'String':
            const m = x[0]
            const n = x[x.length - 1]
            switch(m) {
                case '[':
                case '{':
                    return 'Json'
                case '"':
                case '\'':
                    if (n == m) {
                        return 'Quote'
                        return 'DoubleQuote'
                    } else {
                        return t
                    }
                default: 
                    if (hasNewline(x)) {
                        return 'Newline'
                    }
                    return t
            }
        case 'Function':
                    return t
        default: return t
    }
}
function info(x) {
    const t = extendedType(x)
    let ref = infoRef[t]
    if (!ref) {
        return 
    }
    const {keys} = ref
    keys.forEach((key, i) => {
        const value = dictGetter(x, key)
        if (isDefined(value)) {
            browserChalk(key, 'blue', true)
            console.log(value)
        }
    })
}


// console.log(get_regex('codeChunkss'))
// const callableRE = /^[\w$]+(?:\.[\w$]+)*\(/
// const definitionRE = /^\w+(?:\.\w+)* = /

function everyOther(items, fn, gn, modulus = 2) {
    return items.map((item, i) => {
        return i % modulus === 0 ? fn(item) : gn(item)
    })
}

function splitByRange(s, x) {
    if (isRegExp(x)) {
        return _splitByRegex(s, x)
    } else if (isObjectArray(x)) {
        const f = x.flatMap((x) => [x.from, x.to])
        return _splitByRange(s, f)
    } else if (isArray(x)) {
        return _splitByRange(s, x)
    } else {
        return _splitByRange(s, [x.from, x.to])
    }

    function _splitByRange(s, range) {
        let offset = 0
        let start = 0
        let store = []
        for (let i = 0; i < range.length; i++) {
            let n = range[i]
            let text = s.slice(start, n)
            store.push(text)
            start = n
        }
        store.push(s.slice(start, s.length))
        return store
    }

    function _splitByRegex(s, r) {
        const m = matchall(s, r)
        const indexes = m.reduce((acc, m) => {
            acc.push(m.index, m.index + m[0].length)
            return acc
        }, [])
        return _splitByRange(s, indexes)
    }
}


function runTest2(fn, config, overrideInput) {

    const items = dashSplit(overrideInput || config.input)
    if (!config.from_start) {
        items.reverse()
    }
    const item = items.find(exists).trim()
    // finds the first item among the dashes
    console.log(crayonbox.red(item))

    const value = fn(item, ...toArray2(config.args))
    switch(config.output) {
        case 'pretty':
            return console.log(toStringArgumentPretty(value))
        case 'json':
            return console.loggg(value)
        case 'str':
            return console.log(JSON.stringify(value, null, 4))
        case 'string':
            return console.log(value)
        default:
            return console.log(value)
    }
}
function runTest(fn, s, ...args) {
    if (isObject(s)) {
        return runTest2(...arguments)
    }

    let sd
    let rc
    let ds
    let p
    let json
    let mode = ''
    ;[mode, sd] = mget(/sd/, mode)
    ;[mode, rc] = mget(/rc/, mode)
    ;[mode, ds] = mget(/ds/, mode)
    ;[mode, p] = mget(/p/, mode)
    ;[mode, json] = mget(/json/, mode)
    if (sd) { s = smartDedent4(s) }
    if (rc) { s = removeComments(s) }
    if (ds) { s = dashSplit(text).find(exists).trim() }

    const value = fn(s, ...args)
    return value
    if (p) { return console.log(toStringArgumentPretty(value)) }
    if (json) { return console.loggg(value) }
    console.log(value)
}

function isJavascriptComment(s) {
    return /^\/\//.test(s)
}

function splitArg(s) {
    const r = /^\S+\s*[:=]/.test(s) ? /[:=]/ : /\s+/
    const [a, b] = so(s, r)
    return [a, toArgument(b)]
}

function regexGetter(key) {
    assertion2(variables.regexdict, key)
    return variables.regexdict[key]
}

function infuseObjectArray(items, key, fn) {
    assertion2(items, isObjectArray)
    items.forEach((item, i) => {
        if (!item.hasOwnProperty(key)) {
            item[key] = fn(item)
        }
    })
}

function findAndMatch(items, f, mode) {
    for (const item of items) {
        const result = f(item)
        if (result) {
            const payload = mode == Array ? toArray2(result) : result
            return [item, payload]
        }
    }
    return [null, null]
}

function simpleAssign(item, key, value) {
            if (isDefined(value)) {
                item[key] = value
            }
            return item
}
function defaultMergeStrategy(a, b) {
    // the default merge strategy is to combine objects and arrays
    // to increment numbers
    // and to override strings
    // other data objects like maps and sets are not handled 
    // we also require [a] and [b] to be of the same type.
        // console.log({a, b})
    typeAssertion(a, b)
    switch (type(a)) {
        case 'Null':
        case 'Undefined':
            return a
        case 'Object':
            return {...a, ...b}
        case 'Array':
            return a.concat(b)
        case 'String':
            return a + '\n' + b
        case 'Number':
            return a + b
    }
}

function cumulativeMergeStrategy(prev, next) {
    if (next == null) {
        return prev
    }
    if (isPrimitive(prev)) {
        return [prev, next]
    }
    if (isArray(prev)) {
        return prev.concat(next)
    }
    if (isObject(prev)) {
        return Object.assign(prev, next)
    }
}
class CumulativeStorage2 {
    constructor(store) {
        this.store = store && copy(store) || {}
    }
    toJSON() {
        return this.store
    }
    add(...args) {
        dictSetter3(this.store, args, cumulativeMergeStrategy)
    }
}

function dictSetter2(base, ...keys) {
    return dictSetter3(base, keys, simpleMergeStrategy)
}
function dictSetter2deprecated(base, ...keys) {
    let ref = base
    for (let i = 0; i < keys.length - 1; i++) {
        let key = keys[i]
        if (i == keys.length - 2) {
            const next = keys[i + 1]
            const current = ref[key]
            ref[key] = current ? simpleMergeStrategy(current, next) : next
            return base
        } else {
            if (!ref.hasOwnProperty(key)) {
                ref[key] = {}
            }
            ref = ref[key] 
        }
    }
}

function dictSetter3(base, keys, mergeStrategy = defaultMergeStrategy) {
    typeAssertion(keys, Array)

    let ref = base
    for (let i = 0; i < keys.length - 1; i++) {
        let key = keys[i]
        if (i == keys.length - 2) {
            const next = keys[i + 1]
            const current = ref[key]
            ref[key] = isDefined(current)
                ? mergeStrategy(current, next) 
                : next
            return base
        } else {
            if (!ref.hasOwnProperty(key)) {
                ref[key] = {}
            }
            ref = ref[key] 
        }
    }
}
function dictSetter(base, ...keys) {
    function overrideMergeStrategy(a, b) {
        return b
    }
    return dictSetter3(base, keys, overrideMergeStrategy)
    // warning: the above may break things
    // the original is shown below
    if (base == null) {
        return 
    }
    if (isObject(keys[0])) {
        return Object.assign(base, keys[0])
    }
    let ref = base
    for (let i = 0; i < keys.length - 1; i++) {
        let key = keys[i]
        if (i == keys.length - 2) {
            ref[key] = keys[i + 1]
            return base
        }
        ref = ref[key] = {}
    }
}


function toArgument2(b, a) {
    const ref = {
        'props': 'plural',
        'args': 'plural',
    }
    if (ref.hasOwnProperty(a)) {
        return xsplit2(b).map(toArgument)
    }
    return toArgument(b)

}

function splitParams(s) {
	return s.split(/,| = \S+/).map(trim).filter(isDefined)
}
function isUrl(s) {
    return /^http/.test(s)
}

function matchf(x) {
    return (s) => match(s, x)
}

function getFiletype(x) {
    if (variables.filetypes.includes(x)) {
        return x
    }
    return variables.filetypeMap[getExtension(x)]
}

function walkChildEntries(map, fn) {
    const newMap = {}
    for (const key in map) {
        for (const [k, v] of Object.entries(map[key])) {
            assign(newMap, key, k, fn(v, key, k))
        }
    }
    return newMap
}

function strftime(...args) {
    const ref = {
        datetime: "%m-%d-%Y %I:%M%p",
        iso8601: "%Y-%m-%d",
    }
    const [d, key] = args.length == 2 ? args : [new Date(), args[0] || 'iso8601']
    const strife = ref[key] || key

    const replacer = (_, key) => {
        switch(key) {
            case 's':
                return zeroPad(d.getSeconds())

            case 'm':
                return zeroPad(d.getMonth() + 1)
            case 'd':
                return zeroPad(d.getDate())
            case 'Y':
                return d.getFullYear()
            case 'I':
                let hours = d.getHours() % 12
                if (hours == 0) {
                    hours += 12
                }
                return hours
            case 'M':
                return zeroPad(d.getMinutes())
            case 'p':
                return d.getHours() < 12 ? 'AM' : 'PM'
        }
    }

    return strife.replace(/%(\w)/g, replacer)
}

function zeroPad(x) {
    return String(x).length == 1 ? '0' + x : x
}

function iso8601() {
    return strftime(new Date(), '%Y-%m-%d')
}

function regexTemplater(regex, ref) {
    const source = templater(regex.source, ref)
    return RegExp(source, regex.flags)
}

function wrapFunction(fn, {before, after} = {}) {
    if (after) {
        return wrapFunctionAfter(fn, after)
    }
    if (before) {
        return wrapFunctionBefore(fn, before)
    }
    function wrapFunctionAfter(fn, after) {
        return function lambda(...args) {
            return after(fn(...args), ...args)
        }
    }
    function wrapFunctionBefore(fn, before) {
        return function lambda(...args) {
            return before(fn(...args), ...args)
        }
    }
}

function stringerf(o) {
    return function lambda(x) {
        const t = type(x)
        const fn = o[t] || o[t.toLowerCase()]
        return fn ? fn(x) : panic('type %s is not an accepted type', t)
    }
}

function panic(template, ...args) {
    typeAssertion(template, String)
    try {
        const doubleQuoted = template.replace(/\$\d+/g, '"$&"')
        const message = templater(doubleQuoted, ...args)
        flame(message)
    } catch(e) {
        flame(e)
    }
}
function stringifyIfNotPrimitive(value) {
    /* very similar to toStringArgument3 */
    // Check if the value is a primitive type
    if (value == null) {
        return 'null'
    }
    if (value === null || typeof value !== 'object' && typeof value !== 'function') {
        return value.toString();
    }

    // If not a primitive, stringify it
    try {
        return JSON.stringify(value); // Using a spacing level of 2 for pretty-print
    } catch (error) {
        return String(value); // Fallback to String conversion in case of circular references, etc.
    }
}

function exprTemplater(s, ref) {
    const r = /\$\w+(?:(?:\.\w+)*\(.*\))?/g
    const runner = (m) => {
        const key = m.slice(1)
        const parens = matchall(key, /[()]/g)
        if (parens.length == 0) {
            return ref[key]
        }
        return handle_expr(key, parens)
    }
    const handle_expr = (expr, parens) => {
        const lefts = parens.filter((m) => m[0] == '(')
        const rights = parens.filter((m) => m[0] == ')')
        let last
        while (rights.length != lefts.length) {
        	last = rights.pop()
        }

        const [before, after] = split(expr, last.index)
        return scopedEvaluator(before, ref) + after
    }

    return smartDedent4(s).replace(r, runner)
}




function toStringArgumentPretty(x, o = {}) {
    if (!x) {
        return ''
    }
    if (o.lang == 'raw') {
        o.lang = ']avascript'
    }

    const javascriptSuffixes = [
        "handler",
        "RE",
        "getter",
        "config",
        "transformer",
    ]

    const template = /[a-zA-Z]+(?:$1)$|^\(.*?\) *=>/
    const magicRE = reWrap(javascriptSuffixes, template)
    const replaceRE = /^(?:\$|fn:)(\w+)$/

    if (!isObject(o)) {
        o = {}
    }

    assignFresh(o, {
        quote: javascriptObjectQuote,
        max_length: 68,
        lang: 'javascript',
        indentation: 4,
        magic: false,
        beforeStart: identity,
        variableName: false,
        functional: false,
    })

    const value = parse(o.beforeStart(x), 0)
    return o.variableName ? varialize(o.variableName, value, o.lang) : value
    
    function parseObj(obj, depth) {
        function parse_obj_helper(k, v) {
            if (isFunction(v) && !isNativeFunction(v)) {
                return [null, parseObjectFunction(k, v)]
            }
            const value = parse(v, depth + 1)
            return [k, value]
        }
        const computed = smart_map(obj, parse_obj_helper)
        return bracker(computed, '{}', depth, o)
    }

    function parseArr(arr, depth) {
        const computed = arr.map((x) => parse(x, depth + 1))
        return bracker(computed, '[]', depth, o)
    }

    function parseString(s) {
        s = s.toString()
        if (o.functional) {
            return s
        }
        if (s == "''" || s == '""') {
            return o.lang = 'typst' ? "\"\"" :  "''"
        }
        if (o.lang == 'javascript' && variables.javascriptBasicTypes.includes(s)) {
            return s
        }
        if (o.lang == 'typst' && /(?:\din|\dpt|\dem|\d%|\dpx|none|auto|left|top|bottom|right|black|blue|green|red|left|right|horizon|center)$/.test(s)) {
            return s
        }
        if (o.maybeHasThisExpr && /^this.\w+$/.test(s)) {
            return s
        }
        if (replaceRE.test(s)) {
            return s.replace(replaceRE, '$1')
        }
        if (o.magic) {
            if (s.startsWith('!')) {
                return s.slice(1)
            }
            if (magicRE.test(s)) {
                // throw {s}
                return s
            }
        }
        if (/\n/.test(s)) {
            return `\`${escapeTilda(s)}\``
        }
        if (isRegExpString(s)) {
            return s
        }
        if (variables.commonFunctionNames.includes(s)) {
            return s
        }
        if (/^[\[\{]/.test(s) && /[\]\}]$/.test(s)) {
            return s
        }
        if (/^(?:new *)?\w+(?:\.\w+)?\(/.test(s)) {
            return s
        }
        const d = o.lang == 'typst' ? '"' : "'"
        return escapedSingleQuote(s, d)
    }



    function parse(s, depth) {
        if (s == null) {
            if (o.lang == 'typst') {
                return 'none'
            }
            return 'null'
        }
        if (s == undefined) {
            if (o.lang == 'typst') {
                return 'none'
            }
            return 'undefined'
        }
        if (s === '') return "''"
        if (s === true|| s=== 'true') {
            if (o.lang == 'vim') {
                return 'v:true'
            }
            return "true"
        }
        if (s === false || s=== 'false') {
            if (o.lang == 'vim') {
                return 'v:false'
            }
            return "false"
        }
        switch (type(s)) {
            case 'Object':
                return parseObj(s, depth)
            case 'Array':
                return parseArr(s, depth)
            case 'String':
                return parseString(s)
            case 'Function':
                return s.name
            default:
                return s.toString()
        }
    }

    function parseObjectFunction(name, f) {
        const s = f.toString().replace(/\n\)/g, ')').replace(/\n\n}/g, '\n}')
        let [text, isAsync] = mget(/^async/, s)
        const prefix = isAsync ? 'async ' : ''
        text = text.replace(/function */, '')
        text = text.replace(/^ *\w+ */, '')

        let a = 1
        let b = text.match(/\n( *)\S.*$/)
        if (b) {
            b = b[1].length
            if (a < b) {
                text = text.replace(RegExp(`^ {${a},${b}}`, 'gm'), '')
            }
        }
        return prefix + name + text
    }

}
function simpleArgument(x) {
    switch (type(x)) {
        case 'Null':
        case 'Undefined': 
            return 'null'
        case 'Object':
        case 'Array':
        case 'String': 
            return JSON.stringify(x)
        case 'Function':
            return x.toString()
        default: return x
    }
}


function simpleRecursiveWalk(x, fn) {
    // when null is explicitly returned, the value is null
    // otherwise, the value will be the initial object value
    // this is simpler than the other walks
    // no null values are arrived in arrays and objects
    // the array filters them out
    // the object doesnt return if it is empty
    // the order of the key and the depth is reversed
    // depth is much less important

    function walker(x, key, depth = 0) {
        const newDepth = depth + 1
        if (isArray(x)) {
            const items = x.map((y) => walker(y, key, newDepth))
            return filter(items, notNull)
        }

        if (isObjectLiteral(x)) {
            const o = Object.entries(x).reduce((acc, [a, b]) => {
                const newValue = walker(b, a, newDepth)
                if (isDefined(newValue)) {
                    if (type(newValue) == 'Instruction') {
                        throw new Error('no instructions')
                        return newValue.handle(acc)
                    }
                    acc[a] = newValue
                }
                // automatic deletion on null
                return acc
            }, {})
            return exists(o) ? o : null
        }
        const value = fn(x, key, depth)

        return value === null
            ? null
            : hasValue(value)
            ? value
            : x
    }
    return walker(x)
}
function getGradeLevel(age) {
    const ageToGradeStartOfYear = {
  4: "Pre-K",
  5: "Kindergarten",
  6: "1st Grade",
  7: "2nd Grade",
  8: "3rd Grade",
  9: "4th Grade",
  10: "5th Grade",
  11: "6th Grade",
  12: "7th Grade",
  13: "8th Grade",
  14: "9th Grade (Highschool Freshman)",
  15: "10th Grade (Highschool Sophomore)",
  16: "11th Grade (Highschool Junior)",
  17: "12th Grade (Highschool Senior)",
  18: "13th Grade (College Freshman)",
  19: "14th Grade (College Sophomore)",
  20: "15th Grade (College Junior)",
  21: "16th Grade (College Senior)",
  22: "17th Grade (College Freshman)",
  23: "18th Grade (College Sophomore)",
  24: "19th Grade (College Junior)",
  25: "20th Grade (College Senior)",
    };


    return ageToGradeStartOfYear[age]
}


    // const isLinebreak = (x) => /^\s*-{3,}/.test(x)


function assignAllowed(base, attrs, allowed = []) {
    Object.keys(attrs).forEach(key => {
        if (allowed.includes(key)) {
            base[key] = attrs[key];
        }
    });

    return base;
}



function typeAssertion(arg, expect) {
  const actualType = type(arg)
  if (isArray(expect)) {
      for (const arg of expect) {
          if (actualType == type(arg)) {
              return 
          }
      }
    const expectString = expect.map(type).join('|')
    flame(`Mismatched Type: expected '${expectString}', but got '${actualType}'`);
  }
  const expectedType = type(expect)
  if (actualType === expectedType) {
      return 
  }
    flame(`Mismatched Type: expected '${expectedType}', but got '${actualType}'`);
}

function toArguments(x) {
    if (/^[\w-]+(?:(?:(?:, *)[\w-]+)+)|,/.test(x)) {
        return xsplit(x).map(toArgument)
    }
    return toArgument(x)
}
function parseFrontmatter(s) {
    const r = /^\s*---\n([^]+?)\n---\n*/
    const [text, store] = mget3(s, r)
    const dict = colonConfig(store, {defaultTransform: toArguments})
    return [text.trim(), dict]
}


function beforeAndAfterOffset(v, offset, s, a, b) {
    if (a && s.charAt(offset - 1) != a) {
        return false
    }

    if (b && s.charAt(offset + v.length) != b) {
        return false
    }
    return true
}


function reTemplate(template, ...refs) {
    function getReplacement(x, withBrace) {
        if (isString(x)) {
            return x
        }
        const items = isObject(x) ? Object.keys(x) : x
        const keys = items
        return withBrace
            ? keys.join('')
            : keys.join('|')
    }

    const replacer = (v, offset, s) => {
        const index = Number(v.slice(1)) - 1
        const ref = refs[index]
        const withBrace = beforeAndAfterOffset(v, offset, s, '[')
        return getReplacement(ref, withBrace)
    }

    const source = template.source.replace(/\$\d/g, replacer)
    return RegExp(source, template.flags)
}






function assignCumulative(base, o, mergeStrategy = defaultMergeStrategy) {
    // assignCumulative is very similar to deepAssign
    // the only difference is that the first 2 arguments
    // must be objects
    // and the third argument is a function: mergeStrategy
    // cannot use this function synonmously with dictSetter3
    // u will get different results

    if (empty(o)) {
        return
    }
    function runner(base, o) {
        for (const [k, v] of Object.entries(o)) {
            if (hasValue(v)) {
                base[k] = get(base, k, v)
            }
        }
        return base
    }
    function get(base, k, v) {
        const prev = base[k]
        if (prev == null) {
            return v
        }
        if (isObject(prev)) {
            return runner(prev, v)
        }
        return mergeStrategy(prev, v)
    }
    return runner(base, o)
}

function pageTurner(items, checkpoint, turnAfter = true) {

    const store = []
    let temp = []
    const withSame = turnAfter == 'withSame'

    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const checked = checkpoint(item, items[i - 1], items[i + 1])

        if (withSame) {
            if (checked || i == 0) {
                temp.push(item)
            } else {
                store.push(temp)
                temp = [item]
            }
            continue
        }

        if (checked) {
            if (turnAfter) {
                temp.push(item)
                store.push(temp)
                temp = []
            } else {
                store.push(temp)
                temp = [item]
            }
        } else {
            temp.push(item)
        }
    }
    if (exists(temp)) {
        store.push(temp)
    }
    return store
}

function reduceToString2(items, template, joinDelimiter) {
    // string version
    assert(joinDelimiter, 'a joinDelimiter is required')
    return entries(items).map((x) => templater(template, x)).join(joinDelimiter)
}

function construct(schema, assertionCheck) {
    function lambda(...args) {
        const t = args.map(type).join("-")
        assertion(t in schema, `
            ${t} is not in the schema
        `)
        const func = schema[t]
        const value = func(...args)
        if (assertionCheck && !assertionCheck(value)) {
            throw 'Failed Assertion:' + assertionCheck.toString()
                    + ' for value ' + value
        }
        return value
    }
    return lambda
}

function sum(a, b, c) {
    return a + b + c
}
function boundModularIncrement0(state, items, startValue) {
    const key = '__modularIncrementIndex__'
    if (state[key] == null) {
        let index = 0
        if (isDefined(startValue) && items.includes(startValue)) {
            index = items.indexOf(startValue)
        }
        state[key] = index
        return items[index]
    }
    state[key] = modularIncrementIndex(items, state[key])
    return items[state[key]]
}
function boundModularIncrement(state, key, startValue) {
    const items = state[key]
    const indexKey = '__modularIncrementIndex__' + key
    assert(items)
    if (state[indexKey] == null) {
        let index = 0
        if (isDefined(startValue) && items.includes(startValue)) {
            index = items.indexOf(startValue)
        }
        state[indexKey] = index
        return items[index]
    }
    const i = state[indexKey]
    const newIndex = modularIncrementIndex(items, i)
    state[indexKey] = newIndex
    const value = items[state[indexKey]]
    return value
}

function dictAssertion(state, ...args) {
	assert(dictGetter(state, ...args) != null, args)
}
function getCaller(upwards = 0) {
    const matches = getErrorStack()
    // console.log({matches})
    const keys = [
        "must", "panic", "pause", "ass", 'assertObjectValue'
    ]
    let startIndex = -1
    for (const key of keys) {
        startIndex = matches.findIndex(([name]) => {
            return name == key
        })
        if (startIndex > -1) {
            break
        }
    }
    if (startIndex == -1) {
        startIndex = matches.findIndex(([name]) => {
            return name == 'getCaller'
        })
        if (startIndex > -1) {
            startIndex += 1
        }
    }

    const eIndex = startIndex + 1
    let match = matches[eIndex]
    // pause(matches, startIndex)
    if (!match) {
        match = matches[startIndex]
        // pause('no match', matches, startIndex)
    }
    return { 
        name: match[0],
        line: Number(match[2]),
        file: match[1],
    }
}

function parseComments(s, o = {fnRef: null}) {
    function parseColon(s) {
        const [a,b] = splitOnce(s, /:/)
        if (b) {
            return [a, b]
        }
    }
    const r1 = /\/\* *([^]*?) *\*\//g
    const matches = matchall(s, r1).map(getMatch)
    return reduce(matches, runner)
    function runner(text) {
        const colon = parseColon(text)
        if (!colon) {
            // in this form of parseComments
            // we require there to be a colon delimiter
            // otherwise the value is not collected
            return 
        }
        const [a,b] = colon
        const value = o.fnRef && o.fnRef.hasOwnProperty(a)
            ? o.fnRef[a](b) 
            : toArgument(b)

        return [a, value]
        // a is the key
        // value is the value
    }
}

function parseFunctionDictComments(dict) {
    return reduce(dict, ([k,v]) => [k, parseComments(v)])
    // interesting 
}

class Typst {
    constructor(options) {
        this.s = ''
    }
    _import(path) {
        return `#import /home/kdog3682/2024-typst/src/${path}: *`
    }
}
function wrapClassMethods(ClassObject, key) {
    const ref = {
        debug: {
            additionalMethods: {
                // toString(s) {
                    // return join(this.store)
                // },
            },
            wrapper(value) {
                return value
            },
            asPrivate: false
        },

        str: {
            additionalMethods: {
                toString(s) {
                    return join(this.store)
                },
            },
            wrapper(s) {
                this.store.push(s)
            },
            asPrivate: true
        },
    }
    const {wrapper, additionalMethods, asPrivate, newConstructor} = ref[key]

    const baseMethods = getClassMethods(ClassObject)
    const methods = asPrivate ? filter(baseMethods, /^_/) : baseMethods
    function create(func) {
        return function lambda(...args) {
            const value = func(...args)
            return wrapper.call(this, value)
        }
    }
    for (const method of methods) {
        const func = ClassObject.prototype[method]
        const newFunc = create(func)
        const outboundMethod = asPrivate
            ? method.replace(/^_/, '')
            : method
        ClassObject.prototype[outboundMethod] = newFunc
    }
    for (const [k, v] of entries(additionalMethods)) {
        ClassObject.prototype[k] = v
    }

    // var oldProto = ClassObject.prototype;
    // const Rabbit = newConstructor
    // Rabbit.prototype = oldProto
    // Rabbit.prototype.constructor = Rabbit
    // throw Rabbit
    // return Rabbit
}

class Modulus {
    constructor(items = [], options = {}) {
        this.items = items
        this.index = -1
    }
    setIndex(item) {
        this.index = this.items.indexOf(item)
    }
    peek(dir = 1) {
        const index = modularIncrementIndex(this.size, this.index, dir)
        return this.items[index]
    }
    add(item) {
        insert2(this.items, this.index + 1, item)
    }
    next() {
        this.index = modularIncrementIndex(this.size, this.index, 1)
        return this.items[this.index]
    }
    prev() {
        this.index = modularIncrementIndex(this.size, this.index, -1)
        return this.items[this.index]
    }
    get size() {
        return this.items.length
    }
}
// wrapClassMethods(Modulus, 'debug')
// const a = new Modulus([1,2,3])
// a.setIndex(2)
// a.add('aa')
// throw ''
// toStringArgumentPretty

function otherReplacer(s, ref) {
    // this is a really cool function
    // i have written a function like this before
    // this time, putting it together came much faster
    const store = {}
    let count = 0
    const prepare = ([r, v]) => {
        const groups = countCaptureGroups(r)
        store[count] = v
        if (groups == 0) {
            count += 1
            r = `(${r})`
        } else {
            count += groups
        }
        return r
    }

    const base = Object.entries(ref).map(prepare).join('|')
    const regex = RegExp(base, 'g')
    // console.log("regex", regex)

    const replacer = (_, ...args) => {
        const a = args.findIndex(isDefined)
        const refValue = store[a]
        const length = args.length - 2
        const m = map4(args, a, length)
        return isFunction(refValue) ? refValue(...m) : refValue
    }

    return s.replace(regex, replacer)
}
function multipleReplacer(s, ref) {
    const innerRef = {
        prose: proseReplacer,
        other: otherReplacer,
    }
    for (const [k, v] of Object.entries(ref)) {
        s = innerRef[k](s, v)
    }
    return s
}
function ireplace(s, items) {
    if (isDouble(items)) {
        for (const [regex, replacer] of entries(items)) {
            s = s.replace(regex, replacer)
        }
    } else {
        for (const {regex, replacer} of items) {
            if (regex.test(s)) {
                s = s.replace(regex, replacer)
            }
        }
    }
    return s
}
function varialize(name, value, lang) {
    const prefix = jspy(lang, 'prefix')
    return `${prefix}${name} = ${value}`
}



function ensureExtension(path, e) {
    if (path.endsWith('.' + e)) {
        return path
    }
    return path + '.' + e
}

function coerceString(x) {
    return isArray(x) ? x.join('\n') : x
}

function addGFlag(regex, flags = '') {
    if (isString(regex)) {
        if (!flags.includes('g')) flags += 'g'
        return new RegExp(regex, flags)
    }
    if (!regex.flags.includes('g')) {
        regex = new RegExp(regex, regex.flags + 'g')
    }
    return regex
}

function replaceLast(s, r, replacement) {
    let match
    let lastMatch
    const regex = addGFlag(r)
    while (exists((match = regex.exec(s)))) {
        lastMatch = match
    }
    if (lastMatch == null) {
        return s
    }
    let index = lastMatch.index
    let length = lastMatch[0].length
    return (
        s.slice(0, index) +
        fparse(replacement, lastMatch) +
        s.slice(index + length)
    )
}

function inMiddle(i, a) {
    return i != 0 && i != a.length - 1
}

function getSetLines(x, fn) {
    const lines = isArray(x) ? x : x.trim().split('\n')
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        
        const value = fn(line, i, lines)
        if (isDefined(value)) {
            lines[i] = value
        }
    }
    return lines
}

class Token {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}

class TreeNode {
  constructor(type, value, left = null, right = null) {
    this.type = type;
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

function xassert(requirement, message, arg) {
    if (requirement == null || requirement === false) {
        const errMessage = message.includes('$')
            ? templater(message, arg)
            : message + ' -- ' + stringify(arg)
        
        throw new Error(errMessage)
    }
}


function bool(x) {
    return !!x
}
function abstractError(message = '') {
    const caller = getCaller(1).name
    throw new Error(`abstract method "${caller}" is not implemented ... ${message}`)
}
function sort2(x, fn, reverse) {

    function wrap(x) {
        if (x === true) {
            return 0
        }
        if (x === false) {
            return 1000
        }
        return x
    }

    const asObject = isObject(x)
    const asDouble = asObject || isNestedArray(x)
    const length2 = fn.length == 2
    function gn(x) {
        if (asDouble && length2) {
            return fn(...x)
        }
        return fn(x)
    }
    function runner(a, b) {
        const A = wrap(gn(a))
        const B = wrap(gn(b))
        return reverse
            ? (isString(A) ? B.localeCompare(A) : B - A)
            : (isString(A) ? A.localeCompare(B) : A - B)
    }

    return asObject
        ? dict(Object.entries(x).sort(runner))
        : x.sort(runner)
}
// throw ''

class IndexedStore {
    constructor() {
        this.store = {}
        this.keys = []
    }
    get size() {
        return this.keys.length
    }
    set(key, fn, override) {
        if (this.has(key)) {
            if (override) {
                this.store[key] = fn
            } else {
                // throw new Error("cannot set value on existing key")
                return 
            }
        } else {
            this.keys.push(key)
            this.store[key] = fn
        }
    }
    has(key) {
        return this.keys.includes(key)
    }
    get(key) {
        if (this.has(key)) {
            return this.store[key]
        }
    }
    remove(key) {
        if (this.has(key)) {
            remove(this.keys, key)
        }
    }
}

function getLineTokens(s) {
    if (isArray(s)) {
        return s
    }
            return s
            .trim()
            .split(/\n(?=^ *\S)/m)
            .map(getIndentAndText)
    function getIndentAndText(raw, index) {
        const ind = Math.max(raw.search(/\S/), 0)
        const newlines = match(raw, /\n*$/).length
        xassert(ind % 4 == 0, "indents are required to be modulus 4", { raw })
        const text = raw.trim()
        return { ind: ind / 4, text, index: index, raw: raw, newlines }
    }
}



function editAliasesf(a, b) {
    return function lambda(s) {
        s[a] = s[b]
        return s
    }
}
function editf(o) {
    if (arguments.length == 2) {
        return editAliasesf(...arguments)
    }
    return function lambda(s) {
        for (const [k, v] of Object.entries(o)) {
            if (s.hasOwnProperty(k)) {
                const value = v(s[k])
                if (isDefined(value)) {
                    s[k] = value
                }
            }
        }
        return s
    }
}

function removeCommentsInPlace(s) {
    return s.replace(/^ *\/\/.*/gm, "").trim()
}

function isDouble(x) {
	return isNestedArray(x) || isObject(x)
}

function storager(store, fn) {
	/* next version of group */

    const storage = new Storage()
    store.forEach((item, i) => {
        const value = fn(item, i)
        if (isArray(value)) {
            storage.add(...value)
        } else {
            storage.add(value, item)
        }
    })
    return storage.entries
}

function removeVeryStartingComments(s) {
    return s.replace(/^(?:\/\/|\/\*[\w\W]*?\*\/).*\n*/gm, '')
}

function joiner(items, delimiter) {
    return items.join(delimiter).trim() + delimiter
}

function notify(s, ref) {
    const replacer = (_, key) => {
        if (key == 'this') {
            return getCaller(2).name
        }
        return doubleQuote(ref[key])
    }
    const t = s.replace(/\$(\w+)/g, replacer)
    console.log(t)
    // return t
}
class Foxo {
    constructor(options) {
        // throw new Error()
        // console.log(getErrorStack())
        // console.log(notify('$this'))
    }
    foobar() {
        notify('$this')
    }
}
// new Foxo().foobar()


function validate(data, x) {
    const scheme = isString(x) ? validationSchemes[x] : x
    const runner = ([k, v], i) => {
        const expectedType = type(v)
        const item = data[k]
        const actualType = type(item)
        if (actualType === expectedType) {
            return 
        }
        const template = 'Expected type "$1" for [$2]. Instead got type: "3".'
        return templater(template, [expectedType, k, actualType])
    }
    const results = filter(entries(scheme).map(runner))
    if (exists(results)) {
        class ValidationError extends Error {}
        const s = join(results)
        throw new ValidationError(s)
    }
}



function unreachable() {
    throw new Error('This function should never be reached')
}

function mconfig(s, r, transform) {
    const [a, b] = mget(r, s)
    const opt = exists(b)
    const value = transform ? transform(a) : a
    return [value, opt]
}
function dollarValueGetter(key, ref, asArray) {
    if (key == 'self') {
        return ref
    } else if (asArray) {
        return ref[Number(key) - 1]
    } else if (key in ref) {
        return ref[key]
    }
    pause(key, ref)
}

        // panic('$type is not in the visitorsRef. Additionally, the value for node.value is not a string. This node ... is not visitable. Consider writing a visit function for it: $self', new Storage)
function stringifyPrimitive(val) {
    return isPrimitive(val) ? val : JSON.stringify(val)
}


function must(...args) {
    if (args.length == 1) {
        if (isDefined(args[0])) {
            return args[0]
        }
        panic('args[0] is null')
    }

    const mustRef = {
        Function(fn, ...args) {
            const value = fn(...args)
            if (isDefined(value)) {
                return value
            }
            panic(`
                null values are not allowed
                caller: $1
                args: $2
            `, fn.name, args)
        },

        Module(ref, key) {
            if (key in ref) {
                return ref[key]
            }
            console.log(ref)
            panic('the provided module (above) doesnt have the key: $1', key)
        },

        Object(ref, key) {
            if (key in ref) {
                return ref[key]
            }
            console.log(ref)
            panic('the provided ref (above) doesnt have the key: $1', key)
        },
    }
    const key = type(args[0])
    assert(mustRef.hasOwnProperty(key), {message: 'mustRef doesnt have the key: ' + key})
    return mustRef[key](...args)
}

function getLongest2(items, fn = len) {
    const mapper = (x) => [x, fn(x)]
    const mapped = items.map(mapper)
    const sorted = sort2(mapped, ([k,v]) => v, true)
    return sorted[0][0]
}
// console.log(isNumber('1.2pt'))
// console.log(isNumber('1.2%'))
// console.log(isNumber('1.11111'))

// typeAssertion(null, [null, Number])

// console.log(JSON.stringify(1))
// console.log(JSON.stringify([1]))
// console.log(JSON.stringify(undefined))
// console.log(JSON.stringify(null))
// console.log(JSON.stringify("'hi'"))
// console.log(JSON.stringify('hi'))

function earlyExit() {
    console.log('early exiting')
    return 
}


function partitionByValues(items, ...fns) {
    const store = []
    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        for (let j = 0; j < fns.length; j++) {
            let fn = fns[j]
            let value = fn(item)
            if (isDefined(value)) {
                if (store[j] == null) {
                    store[j] = []
                }
                store[j].push(value)
                break
            }
        }
    }
    return store
}

function isModule(x) {
    return type(x) == 'Module'
}
// console.log(variables)
// console.log(brackify(['a', 'b', 'c'], Array))
// console.log(type(variables))
// console.log(isModule(variables))


function flattenModule(x) {
    if (empty(x)) {
        return []
    }
    const store = []
    const runner = (x) => {
       if (isModule(x)) {
           store.push(...Object.values(x))
       } 
       else if (isObject(x) && x.name) {
           store.push(x)
       }
       else {
           runner(x)
       }
    }
    runner(x)
    return store
}
// logConsole()

function onAndOff(state, key, duration) {
    state[key] = true
                    setTimeout(() => {
                        state[key] = false
                    }, duration)
}

function maybeNewlineIndent(s) {
    if (hasNewline(s)) {
        return newlineIndent(s)
    }
    return s
}

function deepToggle(base, ...args) {
    const ref = base
    for (let i = 0; i < args.length; i++) {
        const arg = args[i]
        if (i == args.length - 1) {
            ref[arg] = !ref[arg]
            return base
        }
    }
}

function exportString(base) {
	return 'export ' + brackify(toArray2(base).map((x) => isObject(x) ? pascalCase(x.name) : x), Array)
}


const loremIpsumSource = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin, mi in ultrices tincidunt, nisl libero gravida sem, imperdiet gravida justo turpis vel mi. Morbi consequat gravida ligula, ut lacinia tortor dignissim vel. Nunc quis hendrerit dolor. Pellentesque elit enim, lacinia at tellus eget, lacinia dapibus neque. Pellentesque vitae urna nisi. Aenean a hendrerit augue. Maecenas tellus sem, laoreet id auctor non, vulputate quis sem. Aenean sagittis condimentum arcu non volutpat. Maecenas consequat ante eu quam viverra, et venenatis dui posuere. Quisque et cursus quam. In cursus ante vitae erat blandit, a aliquet risus mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed venenatis feugiat fringilla. Proin et hendrerit dui. Sed aliquam finibus sodales. Etiam at risus sit amet nunc rhoncus maximus. Fusce faucibus luctus leo tincidunt lobortis. Nulla facilisis, nisi sed tincidunt maximus, turpis ligula dignissim lorem, at lacinia metus orci non erat. Fusce in purus porta nulla tristique faucibus pharetra ut diam. Praesent non facilisis libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam tristique non erat et blandit. Praesent aliquet eleifend erat imperdiet tristique. Praesent ac lectus enim. Aliquam erat volutpat. Quisque vulputate mauris id sapien posuere accumsan. Quisque sit amet ligula nec lectus auctor finibus. Aliquam mi felis, faucibus at efficitur et, vestibulum quis ipsum. Nam sem nunc, posuere ac turpis eget, consectetur blandit arcu. Nulla euismod arcu arcu, non ullamcorper felis consectetur vel. Sed consequat lorem in mi mattis, quis volutpat leo congue. Nulla sodales quam sed lobortis dapibus. Nunc lobortis eros ac diam porta, quis auctor justo ornare. Nam tempor lectus erat, quis condimentum nunc iaculis sit amet. Nam quis dolor felis. Nunc pulvinar, nisi sit amet consectetur ullamcorper, ante urna fermentum mi, posuere pharetra quam diam eget lectus. Maecenas nec elementum leo, non ultricies orci. Nulla sem purus, commodo eu sem sit amet, bibendum feugiat ligula. Cras faucibus enim a mi dignissim, non dignissim lacus vehicula. Sed bibendum tortor nec hendrerit fermentum. Nam pulvinar commodo nulla vitae molestie. Sed ultrices tortor et augue eleifend porttitor. Ut hendrerit sagittis arcu in bibendum. Nunc nibh arcu, dapibus eu sapien non, vestibulum fringilla mi. Fusce elementum erat eget sem laoreet tempus. Phasellus tempus in magna ut aliquet. Suspendisse vitae dolor at velit eleifend laoreet. Nulla a turpis turpis. Pellentesque fermentum ipsum dapibus felis mollis ullamcorper. Sed nec sollicitudin leo. Integer vel neque vitae lectus porta luctus et et mi. Proin efficitur ex quam. In bibendum fringilla maximus. Donec viverra tempor posuere. Donec mauris mi, maximus in lectus in, accumsan viverra enim. Cras semper faucibus arcu a mattis. Etiam elit augue, fermentum id est gravida, laoreet faucibus nisi. Mauris semper, nisl vestibulum aliquam pulvinar, mi diam ultricies nisi, id auctor diam arcu id est. Integer a massa pretium, convallis felis at, pharetra lorem. Pellentesque bibendum urna quis tortor blandit luctus. Fusce euismod ex quis tortor mollis iaculis. Vivamus posuere ac sem a condimentum. Duis condimentum dui non metus molestie, eget fringilla ligula egestas. Pellentesque orci erat, vehicula et orci quis, suscipit efficitur purus. Praesent elementum mollis lacus eu luctus. Integer dictum tellus quis dolor maximus ultrices. Cras letius libero eget magna placerat, ut porta diam sodales. Mauris rutrum viverra lorem et interdum. Sed lobortis placerat efficitur. Praesent tortor turpis, facilisis vel est ut, sagittis molestie elit. Nullam sit amet ante eu est fermentum efficitur sit amet nec sapien. Duis at cursus mauris. Vivamus congue arcu metus, ut ornare odio dignissim nec. Vestibulum eu luctus orci. Pellentesque id euismod massa. Nulla tincidunt vitae diam id laoreet. Suspendisse dui dolor, auctor ut purus vel, faucibus cursus leo. Donec auctor, sapien gravida efficitur tincidunt, nunc nibh dictum velit, vel rhoncus eros lacus vitae turpis. Sed arcu turpis, posuere a ligula ut, bibendum tincidunt tortor. Integer ut est sed ante suscipit sodales. Sed quis dolor et massa gravida feugiat. Mauris vehicula ligula sed eleifend bibendum. Praesent viverra mollis neque, rhoncus efficitur nisl porttitor ac. Aliquam id laoreet justo. Suspendisse vitae sodales magna. Sed interdum iaculis dui sed faucibus. Suspendisse et tincidunt arcu. Donec vel rhoncus augue, a letius ex. Nulla sed eros dignissim ante auctor vulputate sed et enim. Cras tincidunt, enim sit amet mollis fermentum, magna lectus volutpat nisi, vitae convallis ipsum elit sed eros. Nullam ac arcu fermentum nisi suscipit interdum. Donec mattis felis id cursus letius. Etiam a scelerisque quam. Aliquam erat volutpat. Nulla urna velit, luctus at rhoncus non, fermentum non erat. Nunc tempus, risus rhoncus hendrerit mattis, mi eros gravida mi, at finibus ante metus a sapien. Cras hendrerit orci eu euismod faucibus. Aliquam finibus urna ipsum, non luctus diam euismod sed. Aenean non eleifend enim, efficitur facilisis sem. Donec quis est nec sem tincidunt vestibulum quis sed ligula. Donec lectus mauris, faucibus sit amet sollicitudin vel, rhoncus quis diam. Phasellus vel ex elementum, condimentum turpis a, volutpat quam. Cras malesuada pretium nisl, eu congue ipsum iaculis sit amet. Mauris eget imperdiet quam. Morbi porta sit amet nunc vitae placerat. Cras mattis tempus tortor vel gravida. Suspendisse imperdiet in tortor in mollis. Aliquam erat volutpat. Nam eu imperdiet sapien. Nulla venenatis purus eu purus vulputate, eget viverra massa fermentum. In consectetur vehicula purus ut condimentum. Vestibulum in nisi id augue viverra rutrum a in sapien. Phasellus sit amet metus quis ligula malesuada fringilla. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus id ultricies odio. Duis ut velit venenatis, scelerisque sapien dapibus, fringilla elit. Nulla id turpis pellentesque, iaculis nisl non, mollis mauris. Suspendisse ultricies, odio at auctor viverra, erat ipsum commodo purus, ac elementum tortor neque sit amet sem. Maecenas aliquet eu ante ut molestie. Vestibulum ut massa nec urna malesuada egestas. Sed non ligula urna. Nam porta et eros vitae dapibus. Praesent pellentesque augue in dui cursus aliquet. Cras id massa elementum, tempus arcu vel, gravida nulla. Duis eu lacus volutpat, vulputate sem ullamcorper, semper sem. Fusce mauris diam, porttitor non quam non, commodo ultricies risus. Mauris nec imperdiet lorem, non volutpat ex. Maecenas bibendum ex sit amet.";

function loremIpsum(wordCount) {
    const words = loremIpsumSource.split(" ");
    const sentences = words.slice(0, wordCount)
    return sentences.join(' ')
}
// console.log(loremIpsum(18))


function group3(items, key, fn, o = {}) {
    assert(key)
    const storage = new Storage({valueMustExist: false, onlyUniqueValues: o.unique})
    for (const item of items) {
        const value = fparse(fn, item)
        storage.add(item[key], value)
    }
    return storage
}

function isBlockExit(s) {
	return /[\}\]]/.test(s)
}

function isBlockEnter(s) {
	return /[\{\[]/.test(s)
}

function firstOf(items, fn) {
    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const value = fn(item)
        if (isDefined(value)) {
            return value
        }
    }
}

function lastOf(items, fn) {
    return firstOf(items.reverse(), fn)
}
function chosen(s, mode) {
    const r = /^\/+ *chosen/m
    const finder = (s) => {
        return r.test(s)
    }
    const items = s.split(/^-{20,}/m).map((x) => x.trim()).filter(exists)
    if (mode == 'last') {
        return getLast(items)
    }

    if (mode == 'chosen') {
        return items.find(finder) || getLast(items)
    }

    if (mode == 'multiple-chosen') {
        const base = items.filter(finder)
        if (base.length == 0) {
            return getLast(items)
        }

        if (base.length == 1) {
            console.log('returning first')
            return base[0]
        }
        return base.map((x, i) => {
            const statement = smartDedent5(`
                container name = ${i + 1}
            `)
            return statement + newlineIndent(x)
        }).join('\n\n')
    }

    return items.find(finder) || getLast(items)
}

// console.log(dashCase('ROne')) /* r-one */

function touched(x) {
    if (x.__touched__) {
        return true
    }
    x.__touched__ = true
    return false
}
// const a = [{a:1}, {a:2}]
// console.log(getLongest(a, (x) => x.a, Object))


async function asyncToggle(state, o) {

    const key = must(o, 'key')
    if (o.options) {
        const prev = state[key]
        choices = o.options
        if (choices.includes(prev)) {
            state[key] = modularIncrement(choices, prev)
        }
        if (o.announce) {
            console.log('@asyncToggle: announcing new value for', key, state[key])
        }
        return 
    }
    const mode = o.mode || 'simple'
    const duration = o.duration || 1000

    if (mode = 'simple') {
        state[key] = true
        await sleep(duration)
        state[key] = false
    }
    else if (mode = 'opposite') {
        const value = state[key]
        await sleep(duration)
        state[key] = opposite(value)
    }
}
function getExtraIndent(s, dir = 1) {
    if (isBlockEnter(s) && dir == 1) {
        return 4
    }
    if (isBlockExit(s) && dir == -1) {
        return 4
    }
    return 0
}

function findLineIndex2(lines, start, regex, options) {
    assignFresh(options, {
        includeEndpoint: true,
        dir: 1,
        anti: false,
        mustPassStart: false,
        failGracefully: true,
        threshold: lines.length,
    })

    let {
        breakpoint,
        dir,
        from,
        includeEndpoint,
        anti,
        mustPassStart,
        threshold,
        failGracefully
    } = options
    const max = lines.length
    const checkpoint = testf(regex, anti)
    const breakpointFn = testf(breakpoint)

    const ref = {
        $: max - 1
    }

    let i = from ? (isString(from) ? ref[from] : from) : Math.max(0, start - 1)
    let count = 0

    while (true) {
        if (++count >= threshold) {
            throw new Error("threshold error")
        }
        if (i == -1) {
            if (failGracefully) {
                return 0
            }
            throw new Error("min limit error")
        }
        if (i == max) {
            if (failGracefully) {
                return max - 1
            }
            throw new Error("max limit error")
        }
        const line = lines[i]
        if (line == null) {
            return -1
        }
        if (checkpoint(line)) {
            if (mustPassStart && i == start) {
                if (i == 0) {
                    return 0
                }
                i += dir
                continue
            }
            if (!(mustPassStart && i == start - 1)) {
                const offset = includeEndpoint ? 0 : dir
                return i - offset
            }
        }
        if (breakpointFn && breakpointFn(line)) {
            return
        }
        i += dir
    }
}

function assertEqual(value, ...args) {
    return args.includes(value) ? null : panic('faulty')
}


function todo(message) {
    flame('todo: ' + (message || ''))
    throw new Error()
}

function isObjectObject(payload) {
    return payload === '[object Object]'
}

function isEquation(s) {
    return / = /.test(s)
}

function isInteger(s) {
    return /^\d+$/.test(s)
}



class Matrix {
  constructor({width, height}) {
    this.width = width;
    this.height = height
    this.content = [];
  }

  get(x, y) {
    return this.content[y * this.width + x];
  }
  set(x, y, value) {
    this.content[y * this.width + x] = value;
  }
    iterate(fn) {
        let x = 0
        let y = 0
        for (let i = 0;; i++) {
            fn(x, y, this.get(x, y), x == 0 && y > 0)

            if (++x == this.width) {
                ++y
                x = 0
            }
            if (y == this.height) {
                break
            }
        }
    }
}


function isPercentage(x) {
	return /%$/.test(x.toString())
}

function parsePercentage(x) {
	return Number(backspace(x))
}

function isDecimal(s) {
    return typeof s === 'number' && s > -1 && s < 1
}


const $HOME = '/home/kdog3682'

function expandPath(s) {
    if (/^~/.test(s)) {
        return s.replace('~', $HOME)
    }
    if (/^\w/.test(s)) {
        return './' + s
    }
    return s
}

function joinPath(...args) {
    return args.map((arg) => arg.replace(/\/$/, '').replace(/^\.\//, '')).join('/')
}

function moduleExports(...items) {
    const base = sorted(unique(flat(items)))
    return `export { ${base.join(', ')} }`
}


function pluralize(s) {
    let revert = false
    var plural = {
        '(quiz)$'               : "$1zes",
        '^(ox)$'                : "$1en",
        '([m|l])ouse$'          : "$1ice",
        '(matr|vert|ind)ix|ex$' : "$1ices",
        '(x|ch|ss|sh)$'         : "$1es",
        '([^aeiouy]|qu)y$'      : "$1ies",
        '(hive)$'               : "$1s",
        '(?:([^f])fe|([lr])f)$' : "$1$2ves",
        '(shea|lea|loa|thie)f$' : "$1ves",
        'sis$'                  : "ses",
        '([ti])um$'             : "$1a",
        '(tomat|potat|ech|her|vet)o$': "$1oes",
        '(bu)s$'                : "$1ses",
        '(alias)$'              : "$1es",
        '(octop)us$'            : "$1i",
        '(ax|test)is$'          : "$1es",
        '(us)$'                 : "$1es",
        '([^s]+)$'              : "$1s"
    };

    var singular = {
        '(quiz)zes$'             : "$1",
        '(matr)ices$'            : "$1ix",
        '(vert|ind)ices$'        : "$1ex",
        '^(ox)en$'               : "$1",
        '(alias)es$'             : "$1",
        '(octop|vir)i$'          : "$1us",
        '(cris|ax|test)es$'      : "$1is",
        '(shoe)s$'               : "$1",
        '(o)es$'                 : "$1",
        '(bus)es$'               : "$1",
        '([m|l])ice$'            : "$1ouse",
        '(x|ch|ss|sh)es$'        : "$1",
        '(m)ovies$'              : "$1ovie",
        '(s)eries$'              : "$1eries",
        '([^aeiouy]|qu)ies$'     : "$1y",
        '([lr])ves$'             : "$1f",
        '(tive)s$'               : "$1",
        '(hive)s$'               : "$1",
        '(li|wi|kni)ves$'        : "$1fe",
        '(shea|loa|lea|thie)ves$': "$1f",
        '(^analy)ses$'           : "$1sis",
        '((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$': "$1$2sis",
        '([ti])a$'               : "$1um",
        '(n)ews$'                : "$1ews",
        '(h|bl)ouses$'           : "$1ouse",
        '(corpse)s$'             : "$1",
        '(us)es$'                : "$1",
        's$'                     : ""
    };

    var irregular = {
        'move'   : 'moves',
        'foot'   : 'feet',
        'goose'  : 'geese',
        'sex'    : 'sexes',
        'child'  : 'children',
        'man'    : 'men',
        'tooth'  : 'teeth',
        'person' : 'people'
    };

    var uncountable = [
        'sheep',
        'fish',
        'deer',
        'moose',
        'series',
        'species',
        'money',
        'rice',
        'information',
        'equipment'
    ];

    // save some time in the case that singular and plural are the same
    if(uncountable.indexOf(s.toLowerCase()) >= 0)
      return s;

    // check for irregular forms
    for(let word in irregular){

      if(revert){
              var pattern = new RegExp(irregular[word]+'$', 'i');
              var replace = word;
      } else{ var pattern = new RegExp(word+'$', 'i');
              var replace = irregular[word];
      }
      if(pattern.test(s))
        return s.replace(pattern, replace);
    }

    if(revert) var array = singular;
         else  var array = plural;

    for(let reg in array){
      var pattern = new RegExp(reg, 'i');

      if(pattern.test(s))
        return s.replace(pattern, array[reg]);
    }

    return s;
}

function pop3(items, item) {
    switch (type(items)) {
        case "Null":
        case "Undefined":
            return true

        case "Object":
            const val = items[item]
            if (val == null) {
                return
            }
            delete items[item]
            return val
        case "Array":
            if (items.includes(item)) {
                items.splice(items.indexOf(item), 1)
                return true
            } else {
                return false
            }
    }
}


function mergeFunctions(...fns) {
  return function (...args) {
      fns.forEach((fn) => fn.call(this, ...args))
  }
}


function automaticVuePluginInstallation(plugin) {
    if (windowHas('Vue')) {
        window.Vue.use(plugin)
    }
}
function windowHas(key) {
    return typeof window != 'undefined' && key in window
    window
}
function templater3(s, ref) {
    const r = /( *)\$(\w+)/g
    const asArray = isArray(ref)
    const getArray = (key) => {
        return ref[Number(key) - 1]
    }
    const getObject = (key) => {
        return ref[key]
    }
    const get = asArray ? getArray : getObject

    const replacer = (_, spaces, key, offset, orig) => {
        const value = get(key)
        const sol = orig[offset - 1] == '\n'
        return sol ? indent2(value, spaces) : spaces + value
    }
    return s.replace(r, replacer)
}
function templater2(s, ref) {
    const r = /^( *)\$(\w+) *$/gm
    const replacer = (_, spaces, key) => {
        const value = ref[key]
        return indent2(value, spaces)
    }
    return smartDedent5(s).replace(r, replacer)
}
function getBindingValueString(s, lang) {
    switch(type(s)) {
        case 'RegExp': return s.toString()
        case 'Number': 
        case 'Function': 
                return s.toString()
        case 'String': 
                switch(extendedType(s)) {
                    case 'Quote':
                        return s
                    case 'Newline':
                        return doubleQuote(escapeDoubleQuotes(escapeNewlines(s)))
                    case 'String':
                        return doubleQuote(escapeDoubleQuotes(s))
                }
        case 'Array':
        case 'Object':
            return toStringArgumentPretty(s, {lang})
    }
}

function isDeno() {
    return typeof Deno != 'undefined'
}
// console.log(isDeno())

function flame(e) {
    const caller = getCaller(4)
    console.log(crayonbox.bold('Error Message:'), e.toString())
    console.log(crayonbox.bold('Error Location:'), caller)
    let file = printf('/home/kdog3682/.vim/ftplugin/assets/%s.vim.json', 'temp-error')
    if (isDeno()) {
        Deno.writeTextFileSync(file, JSON.stringify(caller))
        forceExit()
    } else {
        
    }
}
function forceExit() {
    if (isDeno()) {
        prompt('press anything to exit')
        Deno.exit()
    } else {
        throw new Error()
    }
}


function pause(...args) {
    if (args.length) {
        console.log('pausing @ ', getCaller(1))
        console.log('-----')
        console.log(...args)
        console.log('-----')
    } else {
        console.log('!!! pausing at:', getCaller(1))
    }
    console.log('')
    const a = prompt('pausing ... press enter to continue or press any other key to Deno.exit.')
    if (a) {
        Deno.exit()
    }
}

// pause(getParamceters2('foo("asdf", 123, ggg = asdf, gggg)'))
function getParameters3(s) {
    const r = /\(([^]+?)\)/
    const m = match(s, r)
    const parts = split(m, /,/)
}




function ass(input, fn) {
    if (fn(input)) {
        return 
    }
    const a = JSON.stringify(input)
    const message = `${a} does not pass the requirement: ${fn.name}`
    flame(message)
}

function testEqual(a, b) {
    const success = deepEqual(a, b)
    if (success) {
        console.log("the values match!", { value: a })
    } else {
        console.log("the two values do not match")
        console.log("-------------")
        console.log(a)
        cconfigonsole.log("-------------")
        console.log(b)
        console.log("-------------")
    }
}


function getFileName(s) {
	return removeExtension(tail(s))
}

function choose(items, options) {
    switch(items.length) {
        case 0:
            return 
        case 1:
            return items[0]
        default:
            console.log('------------------------------')
            items.forEach((item, i) => {
                const prefix = String((i + 1)) + '.  '
                console.log(prefix, item)
            })
            console.log('------------------------------')
            console.log(options.message || 'choose an item:')
            const index = prompt('')
            return items[Number(index) - 1]
    }
}
function exit(...args) {
    if (args.length) {
        console.log(...args)
    }
    if (isDeno()) {
        Deno.exit()
    }
}

function getClasses(s) {
    const r = /class *= *"(.*?)"/g
    return unique(flat(findall(r, s).map((x) => x.split(" "))))
}

function assertValue(ref, s, ...args) {
    if (hasValue(ref)) {
        return ref
    }
    if (!s) {
        s = "the input does not have a value"
    }
    panic(s, ...args)
}

function assertObjectValue(value, object, key, ...args) {
    if (isDefined(value)) {
        return 
    }
    const m1 = `${object} does not have key: "${key}".`
    if (args.length) {
        console.log(...args)
    }
    flame(m1)
}

function noidea() {
    throw new Error('i have no idea what this function does')
}
function escapeDoubleQuotes(s) {
    return s.replace(/(?<!\\)"/g, '\\"')
}

function numbered(items, display) {
    items.forEach((item, i) => {
        const val = display ? display(item) : item
        console.log((i + 1) + ". ", val)
    })
}

function toggleBooleanState(state, key) {
    if (state[key] == true) {
        state[key] = false
        return false
    }
    state[key] = true
    return true
}



function getkv(config, ...args) {
    const key = flat(args).find((x) => config.hasOwnProperty(x))
    return config[key]
}
function shellEscape(s) {
    if (!isString(s)) {
        s = JSON.stringify(s)
    }

    const replacer = (m) => {
        const prefix = 'zz'
        return prefix + variables.shellEscapeDict[m]
    }
    const r = variables.shellEscapeRE
    return s.replace(r, replacer)
}
function shellUnescape(s) {
    if (!s) {
        return 
    }
    if (isNumber(s)) {
        return Number(s)
    }
    if (!/zz/.test(s.toString())) {
        return s
    }

    s = dreplace(s, variables.shellUnescapeDict, /zz($1)/g)
    // panic(s)
    return parseJSON(s)
}
// console.log(shellEscape('\nfoo'))

function walk5(x, fn, o = {}) {
    function walker(x, key, parentKey, depth) {
        const pre = o.skip && o.skip(x, key, parentKey, depth)
        if (pre === true) {
            return x
        }
        if (pre === null) {
            return null
        }

        const newDepth = depth + 1
        if (isArray(x)) {
            const mapper = (y) => walker(y, key, parentKey, newDepth)
            const items = x.map(mapper)
            return filter(items, notNull)
        }
        if (isObjectLiteral(x)) {
            let touched = false
            const o = Object.entries(x).reduce((acc, [a, b]) => {
                const newValue = walker(b, a, key, newDepth)
                if (isDefined(newValue)) {
                    touched = true
                    acc[a] = newValue
                }
                return acc
            }, {})
            return touched ? o : null
        }

        const value = fn(x, key, parentKey, newDepth)
        return value === null
            ? null
            : value == null
            ? x
            : value
    }
    return walker(x)
}


function cleaner(o, skip) {

    return walk5(o, walker, {skip: skip || sampleSkip})

    // for the walker:
    // whenever an exact value of null is returned
    // we essentially "continue"

    // if undefined is returned,
    // the accumulator returns with the pre-existing value
    // this is for the walker


    // for the skipper:
    // again null will entirely skip the current item
    // but for undefined, undefined is the default case: nothing happens
    // returning true, means we do not enter the current item
    // and instead, simply return the pre-existing value.

    // this cleaner function operates by having the walker
    // return anything that is
    // the noise is real ...


    function sampleSkip(v, k) {
        if (k == 'pos') {
            return true
        }
        const ignores = [ "modifiers", "rest", "range", ]
        if (empty(v) && ignores.includes(k)) {
            return null
        }
    }
    function walker(v, k) {
        if (v == 0 || empty(v)) {
            return null
        }
    }
}
// console.log(cleaner({a:0}))


// throw otherReplacer('xx vvvv hi vvvv', {
    // '(h)(i)': (x, y) => x + x + y + y,
    // '\\b(v)': 'abc',
    // 'hi': 'abcde',
// })
// works as expected
function map4(x, a, b) {
    if (x == null) {
        return []
    }
    const t = type(a)
    const s = type(b)
    const store = []
    if (t == 'Number' && s == 'Number') {
        for (let i = a; i < b; i++) {
            push2(store, x[i])
        }
        return store
    }
    const q = type(x)
    if (q == 'Number' && t == 'Function') {
        const fn = a
        if (x > 0) {
            return range(1, 1 + x).map(fn)
        } else {
            return range(1, 1 + Math.abs(x)).map((x) => fn(-x))
        }
    }
    if ((q == 'Number' && t  == 'Number' && s == 'Function')) {
        return range(x, a + 1).map(b)
    }

    if (q == 'Array' && t  == 'String') {
        return x.map(arg => templater(a, arg))
    }

    if (q == 'Array' && t  == 'Function') {
        return x.map(a).filter(isDefined)
    }

    if (q == 'Object' && t  == 'Function') {
        return Object.entries(x).map(a).filter(isDefined)
    }

    if (q == 'Object' && t  == 'String') {
        return Object.entries(x).map((x) => templater(a, x))
    }

}
// console.log(map4({xssa:'adddfa'}, 'hi $1 $2'))

class Vim extends Storage {
    constructor(s) {
        this.lines = s.trim().split('\n')
        vim.buffers.editor
    }
    get line() {
        return this.lines[this.index]
    }
    run(fnKey, input) {
        const value = this[fnKey](input || this.line)
    }
    ditto(line) {
        const parts = xsplit(line)
        const upline = this.get('upline', {newlines: 'okay'})
    }

    get(key, o) {
        if (key in this) {
            return this[key](arg, o)
        }
    }

    upline(o) {
        while (true) {
        	
        }
    }
    // the vim state object will be persistent
}

s = `
hi
abc def


Hi Claude.
`

function visit(ast, options, ...args) {
    const visitor = new AbstractVisitor(options)
    return visitor.visit(ast, ...args)
}
function bind2(state, x) {
    const self = state
    if (isFunction(x)) {
        state[x.name] = x.bind(state)
    }
    throw x
    if (isObject(x)) {
        for (const [k, v] of Object.entries(x)) {
            if (isFunction(k)) {
                self[k] = v.bind(self)
                pause(self)
            } else {
                state[k] = v
            }
        }
    }
    return state
}

// this is valid js it appears
// async function* foo([a = 1,b = 3] = [5], {aaa = 1} = {}, abc = 1, def) {
    // y
// }
// foo()

function pop4(items, item) {
    switch (type(items)) {
        case "Null":
        case "Undefined":
            return true

        case "Object":
            try {
                delete items[item]
                return true
            } catch (e) {
                return flalse
            }
        case "Array":
            if (items.includes(item)) {
                items.splice(items.indexOf(item), 1)
                return true
            } else {
                return false
            }
    }
}
function isAssignable(x) {
    return typeof x === 'object' && !isArray(x)
}



function waterfall3(items, o) {
    let id = null
    let i = 0
    let length = items.length - 1
    let delayFn = isFunction(o.delay) ? o.delay : o.delay ? () => o.delay : ()  => 1000
    let callback = o.callback

    return new Promise((resolve) => {
        const runner = () => {
            const item = items[i]
            const delay = delayFn(item, i)
            callback(item, i)
            i++

            id = setTimeout(() => {
                if (i == length) {
                    clearTimeout(id)
                    callback(items[i], i)
                    return resolve()
                }
                return runner()
            }, delay)
        }
        runner()
    })
}
// await waterfall3('abc'.split(''), {callback: console.log})

class AbstractVisitor {
    constructor(config) {
        const bind = (fn) => fn.bind(this)
        this.visitors = dict(config.visitors, bind)
        this.entry = (ast) => ast[config.entry]
        this.visit = this.visit.bind(this)
        this.options = config.options || {}
    }
    visit(ast, ...args) {
        if (ast == null) {
            return 
        }
        const key = this.entry(ast)
        const fn = this.visitors[key] || this.visitors.default

        if (fn) {
            try {
                return fn(ast, ...args)
            } catch(e) {
                pause(ast, 'ERROR', e.toString())
                return 
            }
        }
        console.log('MISSING', key)
    }
}

function splitInHalf(s) {
    const length = isOdd(s.length) ? s.length + 1 : s.length
    const mid = length / 2
    return [s.slice(0, mid), s.slice(mid)]
}

function isAbsolutePath(s) {
    return s.startsWith('/')
}

function denoDebug(s) {
    if (!isDeno()) {
        return 
    }
    const key = getCaller().name
    if (key in Deno.debug) {
        exit('exiting deno via denoDebug for', key, s)
    } else {
        return 
    }
}
// Deno.debug.denoFileRunner = 1
// const sss = "zzlcbzzdqmodulezzdqzzcolonzzdqgithubzzdotjszzdq,zzdqlinezzdqzzcolonzzdqzzszzszzszzsletzzsstatezzs=zzszzlcbzzbackslashzzdqlinezzbackslashzzdqzzcolonzzsCurrentLinezzlpzzrp,zzszzsqmodulezzsqzzcolonzzszzsqgithubzzdotjszzsqzzrcbzzdq,zzdqstatezzdqzzcolonzzlcbzzrcb,zzdqredirectzzdqzzcolontruezzrcb"
// console.log(shellUnescape(sss))


function denobug(key, ...args) {
    if (isDeno() && Deno.debug.hasOwnProperty(key)) {
        console.log('deno debugging @'. key)
        console.log(...args)
    }
}

function maybe(a, b) {
    if (a in b) {
        return b[a]
    }
    return a
}


function isComment(s) {
    return /^[/#]/.test(s)
}
function getTestData(s) {
    const lines = s.split('\n').map((s) => s.trim()).filter(exists).filter(antif(isComment))
    const h = matchall(lines.shift(), /\S+/g)
    const indexes = h.map((x) => x.index)
    const headers = h.map((x) => x[0])
    const runner = (s) => {
        const sections = {}
        indexes.forEach((index, i) => {
            const next = indexes[i + 1]
            const arg = next ? s.slice(index, next) : s.slice(index)
            sections[headers[i]] = toArgument(arg.trim())
        })
        return sections
    }
    const matches = lines.map(runner)
    return matches
}


function splitOnceReverse(a, n = 1) {
    if (n == 1) {
        return [a.slice(0, -1), getLast(a)]
    }
    if (n == 2) {
        return [a.slice(0, -2), a[a.length - 2], a[a.length - 1]]
    }
    if (n == 3) {
        return [a.slice(0, -3), a[a.length - 3],  a[a.length - 2], getLast(a)]
    }
}
// function splitOnceReverse(a, n) {
    // for (let i = a.length - 1; i >= 0; i--) {
        // let  = a[i]
        
        // if (i == 0) {
            
        // }
    // }
// }

// console.log(splitOnceReverse([1,2,3], 2))
// console.log(getDependencies('aa', {aa: ['bb'], bb: []}).keys())
// console.log(splitOnceReverse([]))
// const date = new Date('2024-04-25T02:26:38Z')
// console.log("date", date)
// console.log(getDate)
// console.log(flat(null))

// console.log(pascalCase('utils'))
//

function mapkv(x, fn) {
    return entries(x).map(([k, v], i, a) => fn(k, v, i, a))
}


function inside(items, x) {
    return isArray(x) ? x.some((el) => items.includes(el)) : items.includes(x)
}

function resolveObject(x) {
    if (isObject(x)) {
        return x
    }
    const r = /(\S+?): *(\S+)/g
    const runner = ([k, v]) => {
        return [k, toArgument(v)]
    }
    return reduce(findall(r, x), runner)
}
function getFirstName(s) {
    const a = split(s, / /)
    return a.slice(0, -1).join(' ')
}

function lorem(wordCount) {
    const loremIpsumWords = [
        'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
        'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
        'magna', 'aliqua', 'ut', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
        'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo',
        'consequat', 'duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit', 'in', 'voluptate',
        'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur',
        'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'in', 'culpa', 'qui',
        'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
    ]

    let loremIpsum = []
    for (let i = 0; i < wordCount; i++) {
        const randomIndex = Math.floor(Math.random() * loremIpsumWords.length)
        loremIpsum.push(loremIpsumWords[randomIndex])
    }

    return loremIpsum.join(' ')
}


function splitTwice(items, fn) {
    if (isObject(items)) {
        const a = {}
        const b = {}
        for (const [k, v] of Object.entries(items)) {
            if (fn(v, k)) {
                a[k] = v
            } else {
                b[k] = v
            }
        }
        return [a, b]
    } else {
        const a = []
        const b = []
        for (const item of items) {
            if (fn(item)) {
                a.push(item)
            } else {
                b.push(item)
            }
        }
        return [a, b]
    }
}

function txv(o, fn) {
    function assign(store, k, v) {
        if (isDefined(v)) {
            store[k] = v
        }
    }
    const store = {}
    for (const [k, v] of Object.entries(o)) {
        const value = fn(v)
        assign(store, k, value)
    }
    return store
}

async function asyncMap(items, fn) {
    const store = []
    for (const item of items) {
        store.push(await fn(item))
    }
    return store
}
// console.log(null && null)

function fulfillInterface(payload, schema) {
    function get(v) {
        switch (v) {
            case "string":
                return ""
            case "number":
                return 0
            case "array":
                return []
            case "object":
                return {}
        }
    }
    function callback([k, v]) {
        let value = payload[k]
        if (value == null) {
            value = get(v)
        }
        return [k, value]
    }
    return reduce(schema, callback)
}

function assertInterface(o, keys) {
    const objectKeys = Object.keys(o).sort()
    const valid =
        Object.keys().toString() == keys.sort().toString()
    if (valid) {
        return
    }
    panic("object is missing the following keys:", keys)
}
function statef(key, fn) {
    /* type: simple-factory-util */
    return function lambda(state) {
        return fn(state[key])
    }
}
function reduceState(state, keys) {
    return reduce(keys, (key) => [key, state[key]])
}
