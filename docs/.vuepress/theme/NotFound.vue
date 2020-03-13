<template>
  <div id="wrapper" :class="pageClasses">
    <Navigation @dark-mode-toggle="toggleMode" />
    <main class="content-block not-found-page">
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
<style lang="stylus">
@import '../theme/styles/config.styl';

.not-found-page
  padding-top 9em
</style>
