
// modification of #1
// the router is working
// but this is in options mode

import { testWrapper } from "./helpers/index.js"

// The main App component with a router link to navigate to the posts page.
const App = {
    template: `
    <router-link to="/posts">Go to posts</router-link>
    <router-view />
  `,
}

// The Posts component displaying a list of posts with a toggle feature to show post details.
const Posts = {
    template: `
    <h1>Posts</h1>
    <ul>
      <li v-for="(post, index) in posts" :key="post.id">
        <div>
          <span class='toggle-trigger' @click='show = !show'>{{ post.name }}</span>
          <span v-if='show'> post {{index + 1}}</span>
        </div>
      </li>
    </ul>
     <div>
          <span class='trigger-route' @click='triggerRoute'>triggerRoute</span>
          <span v-if='showRoute'> showing route</span>
     </div>
  `,
    data() {
        return {
            showRoute: false,
            show: false,
            posts: [{ id: 1, name: "Testing Vue Router" }],
        }
    },
    methods: {
        triggerRoute() {
            this.showRoute = true
            // console.log(this.$route)
           this.$router.push({name: 'fooga'})
        },
    },
}

const Fooga = {
    template: 'fooga'
}

// Routes configuration for the Vue Router.
const routes = [
    {
        path: "/",
        component: { template: "Welcome to the blogging app" },
    },
    { path: "/posts", component: Posts },
    { path: "/fooga", component: Fooga, name: 'fooga' },
]

// Test specification object defining the test cases.
const spec = {
    desc: `route test`,
    routes,
    type: "routing",
    component: App,
    actions: [
        {
            // Initial state: expect to see the link to posts and welcome message.
            action: null,
            expect: {
                html: [
                    "Go to posts",
                    "Welcome to the blogging app",
                ],
            },
        },
        {
            // Action: click the link to navigate to the posts page.
            action: {
                type: "click",
                target: "a",
            },
            // Expect to see the first post after navigating.
            expect: {
                html: "Testing Vue Router",
            },
        },
        {
            // Action: click the post name to toggle the post details.
            action: { type: "click", target: ".toggle-trigger" },
            // Expect to see the details of the first post.
            expect: {
                html: "post 1",
            },
        },
        {
            action: { type: "click", target: ".trigger-route" },
        },
{
            expect: {
                html: "fooga",
            },
}
    ],
}

// Wrapper function to run the test specification.
testWrapper(spec)

// Questions:
// 1. Why doesn't the root of '/' show up?
// Answer: The root path '/' does show up initially. It displays the "Welcome to the blogging app" message as defined in the routes configuration. If it's not appearing, ensure the route configuration and initial rendering logic are correctly implemented.
