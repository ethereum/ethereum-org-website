<template>
  <div id="wrapper" :class="pageClasses">
    <div id="formatter">
      <Navigation
        :isDarkMode="isDarkMode"
        :class="{ home: isLandingPage }"
        @dark-mode-toggle="toggleDarkMode"
      />
      <div id="upper-content">
        <main :class="contentClasses">
          <p
            v-if="!isLandingPage && !isLanguagePage"
            class="updated-date tc-text200"
          >
            {{ lastUpdatedText }}: {{ lastUpdatedDate }}
          </p>
          <Hero v-if="isHomePage" :isDarkMode="isDarkMode" />
          <Content />
        </main>
        <Sidebar :items="sidebarItems" />
      </div>
      <Footer :isDarkMode="isDarkMode" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Footer from '@theme/components/Footer'
import Navigation from '@theme/components/Navigation'
import Hero from '@theme/components/Hero'
import Sidebar from '@theme/components/Sidebar'
import { resolveSidebarItems } from './utils/util'
import { translate } from './utils/translations'

export default {
  data() {
    return {
      isSidebarOpen: false,
      isDarkMode: false,
      reducedMotion: false
    }
  },
  components: {
    Footer,
    Navigation,
    Hero,
    Sidebar
  },
  beforeMount() {
    if (localStorage && localStorage.getItem('dark-mode') !== null) {
      this.isDarkMode = localStorage.getItem('dark-mode') === 'true'
    }
  },
  mounted() {
    if (localStorage && localStorage.getItem('dark-mode') === null) {
      this.isDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
    }
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addListener(({ matches }) => {
        if (localStorage && localStorage.getItem('dark-mode') === null) {
          this.isDarkMode = matches
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
    isLanguagePage() {
      return (
        this.$page.frontmatter && this.$page.frontmatter.layout === 'languages'
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
          'pt-4 l-up-pt-8': !this.isHomePage,
          'has-sidebar': this.showSidebar,
          'sidebar-open': this.isSidebarOpen,
          'dark-mode': this.isDarkMode,
          rtl: this.isRightToLeftText
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
    toggleDarkMode() {
      this.isDarkMode = this.isDarkMode ? false : true
      if (localStorage) {
        localStorage.setItem('dark-mode', this.isDarkMode)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@require './styles/config'

header
  margin 0px auto

@media only screen and (min-width:$breakL)
  #formatter,header
    max-width $contentWidthXL

#formatter
  margin: 0px auto
  min-height 100vh
  display flex
  flex-flow column

#upper-content
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  overflow: visible;
  flex-grow 1
</style>
<style src="./styles/theme.styl" lang="stylus"></style>
