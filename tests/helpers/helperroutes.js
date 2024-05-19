import { createRouter, createWebHistory } from 'vue-router'

const App = {
  template: `
    <router-link to="/posts">Go to posts</router-link>
    <router-view />
  `
}

const Posts = {
  template: `
    <h1>Posts</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">
        {{ post.name }}
      </li>
    </ul>
  `,
  data() {
    return {
      posts: [{ id: 1, name: 'Testing Vue Router' }]
    }
  }
}

const routes = [
  {
    path: '/',
    component: {
      template: 'Welcome to the blogging app'
    }
  },
  {
    path: '/posts',
    component: Posts
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export { routes };

export default router;
