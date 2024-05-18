import { testWrapper, mockRouterWrapper } from "./helpers/index.js"

// this test purely tests route urls.
// in the next one, we will try to add a component to it
// everything self-contained

const Component = {
    template: `<button @click="redirect">Click to Edit</button>`,
    props: ["isAuthenticated"],
    setup(props) {
        const router = useRouter()
        const route = useRoute()

        const redirect = () => {
            if (props.isAuthenticated) {
                router.push(`/posts/${route.params.id}/edit`)
            } else {
                router.push("/404")
            }
        }

        return {
            redirect,
        }
    },
}

const spec = {
    skip: true,
    component: Component,
    desc: "testing custom wrappers",
    routeParams: {
        id: 1,
    },
    componentProps: {
        isAuthenticated: false,
    },
    actions: [
        {
            action: { type: "click", target: "button", },
            expect: { url: "/404", },
        },
    ],
}

mockRouterWrapper(spec)
