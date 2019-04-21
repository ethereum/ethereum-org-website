<template>
  <div id="wrapper">
    <Header :class="{ 'home': isLanding }" />
    <Hero v-if="isLanding" />
    <Content :class="{ 'content-block': isLanding, 'page': !isLanding }" />
    <Sidebar v-if="showSidebar" :items="sidebarItems" />
    <Footer :class="{ 'home': isLanding }" />

    <button class="announcement">
      🎉 Welcome to the ethereum.org redesign!  <span class="accent">→  More</span>
    </button>
  </div>
</template>

<script>
  import Footer from '@theme/components/Footer'
  import Header from '@theme/components/Header'
  import Hero from '@theme/components/Hero'
  import Sidebar from '@theme/components/Sidebar'
  import { resolveSidebarItems } from './util'

  export default {
    components: {
      Footer,
      Header,
      Hero,
      Sidebar
    },
    mounted () {
      window.addEventListener('scroll', this.onScroll)
    },
    computed: {
      isLanding() {
        return this.$page.path === "/"
      },
      posts() {
        return this.$site.pages
        .filter(page => page.path.endsWith(".html") && page.path.startsWith(this.$page.path))
      },
      showSidebar () {
        return this.$page.frontmatter.sidebar
      },
      sidebarItems () {
        return resolveSidebarItems(
          this.$page,
          this.$route,
          this.$site,
          this.$localePath
        )
      },
    }
  }
</script>

<style lang="stylus" scoped>
  @require './styles/config'

  button.announcement
    position fixed
    bottom 2em
    right 3em
    border-radius 25px
    padding 1em 2em

</style>

<style src="./styles/theme.styl" lang="stylus"></style>
