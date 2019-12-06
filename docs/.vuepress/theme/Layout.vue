<template>
  <div id="wrapper" :class="pageClasses">
    <div id="formatter">
      <Header
        :shouldShowSidebarButton="true"
        :class="{ home: isLandingPage }"
        @toggle-sidebar="toggleSidebar"
        @toggle-mode="toggleMode"
      />
      <div id="upper-content">
        <Hero v-if="isHomePage" :dark="darkMode" />
        <main :class="contentClasses">
          <p v-if="!isLandingPage" class="updated-date">
            {{ lastUpdatedText }}: {{ lastUpdatedDate }}
          </p>
          <Content />
        </main>
      </div>
      <Sidebar :items="sidebarItems" @close-sidebar="closeSidebar" />
      <Footer :class="{ home: isHomePage }" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Footer from '@theme/components/Footer'
import Header from '@theme/components/Header'
import Hero from '@theme/components/Hero'
import Sidebar from '@theme/components/Sidebar'
import { resolveSidebarItems } from './utils/util'
import { translate } from './utils/translations'

export default {
  data() {
    return {
      isSidebarOpen: false,
      darkMode: false,
      reducedMotion: false
    }
  },
  components: {
    Footer,
    Header,
    Hero,
    Sidebar
  },
  beforeMount() {
    if (localStorage && localStorage.getItem('dark-mode') !== null) {
      this.darkMode = localStorage.getItem('dark-mode') === 'true'
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
    if (localStorage && localStorage.getItem('dark-mode') === null) {
      this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addListener(({ matches }) => {
        if (localStorage && localStorage.getItem('dark-mode') === null) {
          this.darkMode = matches
        }
      })
    this.reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    window
      .matchMedia('(prefers-reduced-motion: reduce)')
      .addListener(({ matches }) => {
        this.reducedMotion = matches
      })
  },
  updated() {
    if (window.location.hash) {
      this.setScrollBehavior('smooth')
      this.$nextTick(function() {
        this.setScrollBehavior('auto')
      })
    }
  },
  computed: {
    isLandingPage() {
      return this.$page.frontmatter && this.$page.frontmatter.layout === 'home'
    },
    isHomePage() {
      return (
        this.$page.frontmatter &&
        this.$page.frontmatter.layout === 'home' &&
        !this.$page.frontmatter.hideHero
      )
    },
    isRightToLeftText() {
      return this.$lang === 'fa' || this.$lang === 'ar'
    },
    posts() {
      return this.$site.pages.filter(
        page =>
          page.path.endsWith('.html') && page.path.startsWith(this.$page.path)
      )
    },
    showSidebar() {
      return this.$page.frontmatter.sidebar
    },
    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$route,
        this.$site,
        this.$localePath
      )
    },
    contentClasses() {
      return {
        'content-block': this.isLandingPage,
        page: !this.isLandingPage
      }
    },
    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          home: this.isLandingPage,
          'has-sidebar': this.showSidebar,
          'sidebar-open': this.isSidebarOpen,
          'dark-mode': this.darkMode,
          'right-to-left-text': this.isRightToLeftText
        },
        userPageClass
      ]
    },
    lastUpdatedDate() {
      moment.locale(this.$lang)
      return moment(this.$page.lastUpdated).format('MMM DD, YYYY')
    },
    lastUpdatedText() {
      return translate('page-last-updated', this.$lang)
    }
  },
  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
    },
    closeSidebar() {
      this.isSidebarOpen = false
    },
    toggleMode() {
      this.darkMode = this.darkMode ? false : true
      if (localStorage) {
        localStorage.setItem('dark-mode', this.darkMode)
      }
    },
    setScrollBehavior(behavior) {
      if (behavior === 'smooth' && this.reducedMotion) {
        return
      }
      document.documentElement.style.scrollBehavior = behavior
    }
  },
  watch: {
    $route() {
      this.closeSidebar()
    }
  }
}
</script>

<style lang="stylus" scoped>
@require './styles/config'

#wrapper.sidebar-open
  .button
    z-index 0

.button.announcement
  position fixed
  bottom 2em
  right 3em
  border-radius 25px
  padding 1em 2em

p.updated-date
  color $subduedColor

header
  margin 0px auto

@media only screen and (min-width:1280px)
  #formatter,header
    max-width 1140px
  main
    margin-left 0px
    max-width "calc(1140px - %s - 5em)" % $sidebarWidth

#formatter
  margin: 0px auto
  min-height 100vh
  display flex
  flex-flow column

#upper-content
  flex-grow 1
</style>
<style src="./styles/theme.styl" lang="stylus"></style>
