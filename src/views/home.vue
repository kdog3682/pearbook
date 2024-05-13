<script setup>
import { shallowRef } from 'vue'

const courseCategories = shallowRef([
  'Web Development',
  'Data Science',
  'UI/UX Design',
  'Mobile Development',
  'Cyber Security'
])

const navLinks = shallowRef([
  { name: 'changelog', path: '/changelog' },
  { name: 'resources', path: '/resources' },
  { name: 'about', path: '/about' },
])

// 
</script>

<template lang="pug">
div.container
  header.header
    nav.nav
      div.logo(@click = '$router.go({path: "/"})')
        h1 Brooklyn Learning
      ul.nav-links
        li(v-for="link in navLinks" :key="link.path")
          router-link(:to="{name: link.name}") {{ link.name }}

  main.main
    section.hero
      h2 Unlock Your Potential with Brooklyn Learning
      p Explore our comprehensive course offerings and embark on a journey of knowledge and skill development.

    section.categories
      h3 Popular Course Categories
      div.category-grid
        div.category(v-for="category in courseCategories" :key="category")
          div.category-icon
            i.fas.fa-code
          h4 {{ category }}

    section.cta
      h3 Ready to Start Learning?
      button.cta-button Join Now

  footer.footer
    p &copy; Brooklyn Learning
</template>

<style lang="stylus">
/* Reset some default styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* General Styles */
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header Styles */
.header {
  background-color: #333;
  color: #fff;
  padding: 20px 0;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  font-size: 24px;
}

.nav-links {
  display: flex;
  list-style: none;
}

.nav-links li {
  margin-left: 20px;
}

.nav-links a {
  color: #fff;
  text-decoration: none;
}

/* Main Content Styles */
.main {
  padding: 40px 0;
}

.hero {
  text-align: center;
  margin-bottom: 40px;
}

.categories {
  margin-bottom: 40px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.category {
  background-color: #f4f4f4;
  padding: 20px;
  text-align: center;
  border-radius: 5px;
}

.category-icon {
  font-size: 32px;
  margin-bottom: 10px;
}

.cta {
  text-align: center;
}

.cta-button {
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #555;
}

/* Footer Styles */
.footer {
  background-color: #333;
  color: #fff;
  padding: 20px 0;
  text-align: center;
}
</style>
