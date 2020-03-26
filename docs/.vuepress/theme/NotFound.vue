<template>
  <div id="wrapper" :class="pageClasses">
    <Navigation @toggle-mode="toggleMode" />
    <main class="content-block page">
      <h1>Not Found</h1>
      <p>
        Please use the search box above to find what you're looking for or
        <router-link to="/">return home</router-link>.
      </p>
    </main>
    <Footer />
  </div>
</template>

<script>
import Footer from '@theme/components/Footer'
import Navigation from '@theme/components/Navigation'

export default {
  data() {
    return {
      darkMode: false
    }
  },
  components: {
    Footer,
    Navigation
  },
  beforeMount() {
    if (localStorage && localStorage.getItem('dark-mode') !== null) {
      this.darkMode = localStorage.getItem('dark-mode') === 'true'
    }
  },
  computed: {
    pageClasses() {
      return [
        {
          'pt-4 l-up-pt-8': true,
          'dark-mode': this.darkMode
        }
      ]
    }
  },
  methods: {
    toggleMode() {
      this.darkMode = this.darkMode ? false : true
      if (localStorage) {
        localStorage.setItem('dark-mode', this.darkMode)
      }
    }
  }
}
</script>
