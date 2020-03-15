<template>
  <div id="wrapper" :class="pageClasses">
    <Header @toggle-mode="toggleMode" />
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
import Header from '@theme/components/Header'

export default {
  data() {
    return {
      darkMode: false
    }
  },
  components: {
    Footer,
    Header
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
          'pt-8': true,
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
<style src="./styles/theme.styl" lang="stylus"></style>
