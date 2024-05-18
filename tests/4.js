import { describeWrapper } from './helpers/index.js'
import HelloWorld from '../src/components/HelloWorld.vue'

const spec = [
    {
        component: HelloWorld,
        props: { msg: 'Hello Vitest' },
        actions: [
            {
                desc: 'no msg before click',
                expect: "Hello Vitest",
                anti: true
            },
            {
                desc: 'msg appears after click',
                click: 'button',
                expect: "Hello Vitest"
            },
        ],
    },

    {
        component: HelloWorld,
        props: { msg: 'Hello Vitest' },
        actions: [
            {
                desc: 'no msg before click',
                expect: "Hello Vitest",
                anti: true
            },
            {
                desc: 'msg appears after click',
                click: 'button',
                expect: "Hello Vitest"
            },

            {
                desc: 'computedValue based on input is working',
                input: '.abc',
                value: 'howdy',
                expect: "howdyhowdy"
            },
        ],
    }
]

describeWrapper(spec, {skip: true})
