export {
    multipleTestWrapper,
}
/* deno-fmt-ignore */ import {toArray, isFunction,isDefined,isString} from '/home/kdog3682/2023/utils.js'
import { flushPromises, mount } from "@vue/test-utils"
import { createRouter, createWebHistory } from "vue-router"
import { useRoute, useRouter } from "vue-router"
import { expect, test, vi } from "vitest"
import * as components from "./components.js"

async function mockRouterWrapper(o, componentRef) {
    if (o.skip) {
        return skipWrapper()
    }
    function getMockPushResultViaRouteParams(params) {
        useRoute.mockImplementationOnce(() => ({
            params,
        }))
        const push = vi.fn()
        useRouter.mockImplementationOnce(() => ({
            push,
        }))
        return function lambda(query) {
            expect(push).toHaveBeenCalledWith(query)
        }
    }

    vi.mock("vue-router", async (importOriginal) => {
        const actual = await importOriginal()
        return {
            ...actual,
            useRoute: vi.fn(),
            useRouter: vi.fn(() => ({
                push: () => {},
            })),
        }
    })

    const {
        routeParams,
        desc,
        actions,
    } = o

    test(desc, async () => {
        const expectUrl = getMockPushResultViaRouteParams(
            routeParams,
        )
        console.log(expectUrl)
        const wrapper = await mountComponent(o, componentRef)
        await actionHandler(wrapper, actions, expectUrl)
    })
}

function skipWrapper() {
    describe('autopass', () => {
        test("skipping", () => {
            expect("abc").toContain("abc")
        })
    })
}
async function testWrapper(o, componentRef) {
    if (o.skip) {
        return skipWrapper()
    }
    const {
        routeParams,
        desc,
        actions,
    } = o

    test(desc, async () => {
        const wrapper = await simpleMount(o, componentRef)
        await actionHandler(wrapper, actions)
    })
}

function get(key) {
    return isString(key) ? components[key] : key
}
function create(route) {
    const children = route.children
        ? route.children.map(create)
        : null
    const component = get(route.component)

    const payload = {}
    const assignField = (key, value) => {
        if (isDefined(value)) payload[key] = value
    }

    assignField("path", route.path)
    assignField("name", route.name)
    assignField("component", component)
    assignField("children", children)
    assignField("props", route.props)
    assignField("beforeEnter", route.beforeEnter)
    assignField("redirect", route.redirect)

    return payload
}

function infuseRoutes(routes) {
    return routes.map(create)
}
function setupRouter(routes) {
    let router = createRouter({
        history: createWebHistory(),
        routes: infuseRoutes(routes),
    })

    // beforeEach(async () => {
    // router = createRouter({
    // history: createWebHistory(),
    // routes: routes,
    // })

    // router.push("/")
    // await router.isReady()
    // })
    return router
}

const actionRef = {
    async click(wrapper, target) {
        if (!target) {
            target = "button"
        }
        await wrapper.find(target).trigger("click")
        await flushPromises()
    },
}

async function actionHandler(wrapper, actions, expectUrl) {
    async function handleAction(action) {
        if (action) {
            const { type, target } = action
            await actionRef[type](wrapper, target)
        }
    }

    async function handleExpect(expectSpec) {
        if (!expectSpec) {
            return
        }
        const { html, url } = expectSpec
        if (html) {
            const s = wrapper.html()
            function runner(expected) {
                const r = RegExp(expected, "i")
                return expect(s).toMatch(r)
            }
            toArray(html).forEach(runner)
        }
        if (url && expectUrl) {
            expectUrl(url)
        }
    }

    for (const item of actions) {
        const { action, expect, log } = item
        if (log) {
            console.log(wrapper.html(), "LOGGING HTML")
        }
        await handleAction(action)
        await handleExpect(expect)
    }
}

async function mountComponent(o, componentRef) {
    if (!componentRef) componentRef = components

    const {
        componentProps: props,
        component,
        routes,
    } = o

    const c = isString(component)
        ? componentRef[component]
        : component

    const global = {}
    if (routes) {
        let router
        if (o.router) {
            router = o.router
        } else {
            router = setupRouter(routes)
        }
        global.plugins = [router]
        router.push("/")
        await router.isReady()
    } else {
        global.stubs = ["router-link", "router-view"]
    }

    const wrapper = mount(c, { props, global })
    return wrapper
}
export {
    describeWrapper,
    describeRouter,
    // mockRouterComponent,
    // mockRouterWrapper,
    // skipWrapper,
    // testWrapper,
}

async function describeWrapper(x, opts = {}) {
    if (opts.skip) {
        return skipWrapper()
    }
    const mounter = simpleMount
    const items = toArray(x)
    const description = `Testing multiple components`
    if (items.every((item) => item.skip)) {
        return skipWrapper()
    }

    describe(description, async () => {
        for (const item of items) {
            if (item.skip) {
                continue
            }
            const wrapper = await mounter( item, )
            const topLabel = item.desc || item.component.__name

            suite(topLabel, async () => {
                await actionHandler2(wrapper, item.actions)
            })
        }
    })
}
async function act(wrapper, action) {
        if (action.click) {
            await wrapper.find(action.click).trigger("click")
            await flushPromises()
        } else if (action.input) {
            const input = await wrapper.find(action.input)
            if (action.value) {
                await input.setValue(action.value)
            }
            if (action.enter) {
                await input.trigger("keydown", { key: "Enter" })
            }
        }

        if (action.expect) {
            if (wrapper.expectPath) {
                wrapper.expectPath(action.expect)
            }
            else if (isFunction(action.expect)) {
                action.expect(wrapper.vm, expect)
            } else {
                if (action.anti) {
                    expect(wrapper.html()).not.toMatch(
                        RegExp(action.expect, "i"),
                    )
                } else {
                    expect(wrapper.html()).toMatch(
                        RegExp(action.expect, "i"),
                    )
                }
            }
        }
}
async function actionHandler2(wrapper, actions) {
    for (const action of actions) {
        test(action.desc, async () => {
            await act(wrapper, action)
        })
    }
}
function getComponent(x, componentRef) {
    if (isString(x)) {
        if (componentRef) {
            const a = componentRef[x]
            if (a) {
                return a
            }
        }
        const b = components[x]
        return b
    } else {
        return x
    }
}
function simpleMount(o, componentRef) {
    const component = getComponent(o.component, componentRef)
    return mount(component, {props: o.props})
}

function mockRouterComponent(o, c) {
    const mockRoute = {
        params: o.params || {},
    }
    const mockRouter = {
        push: vi.fn(),
        go: vi.fn(),
        replace: vi.fn(),
    }

    const wrapper = mount(getComponent(c || o.component), {
        props: o.props || {},
        global: {
            mocks: {
                $route: mockRoute,
                $router: mockRouter,
            },
        },
    })

    function expectPath(path) {
        expect(mockRouter.push).toHaveBeenCalledWith(path)
    }
    return {
        wrapper, expectPath
    }
}
async function describeRouter(x, opts = {}) {
    if (opts.skip) {
        return skipWrapper()
    }
    const items = toArray(x)
    const description = `Testing Router Paths`
    if (items.every((item) => item.skip)) {
        return skipWrapper()
    }

    describe(description, async () => {
        for (const item of items) {
            if (item.skip) {
                continue
            }
            const wrapper = mockRouterComponent(item)
            const topLabel = item.desc || item.component.__name

            suite(topLabel, async () => {
                await actionHandler2(wrapper, item.actions)
            })
        }
    })
}

function getName(s) {
    return s.__name
}

function multipleTestWrapper(c, tests) {
    const description = `running multiple tests for ${getName(c)}.`
    describe(description, async () => {
        tests.forEach((item, i) => {
            if (item.skip) {
                return 
            }
            const {wrapper, expectPath} = mockRouterComponent(item, c)
            wrapper.expectPath = expectPath
            test(item.desc, async () => {
                await act(wrapper, item)
            })
        })
    })
}
