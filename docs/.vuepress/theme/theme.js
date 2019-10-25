import Footer from '@theme/components/Footer'
import Header from '@theme/components/Header'
import Hero from '@theme/components/Hero'
import Sidebar from '@theme/components/Sidebar'
import { resolveSidebarItems } from './utils/util'
import { translate } from './utils/translations'

export default {
  data () {
    return {
      isSidebarOpen: false,
      darkMode: false
    }
  },
  components: {
    Footer,
    Header,
    Hero,
    Sidebar
  },
  beforeMount () {
    if (localStorage && localStorage.getItem('dark-mode') !== null) {
      this.darkMode = localStorage.getItem('dark-mode') === "true"
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
    if (localStorage && localStorage.getItem('dark-mode') === null) {
      this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    window.matchMedia('(prefers-color-scheme: dark)').addListener(({ matches }) => {
      if (localStorage && localStorage.getItem('dark-mode') === null) {
        this.darkMode = matches
      }
    })
  },
  computed: {
    isLanding() {
      return this.$page.frontmatter && this.$page.frontmatter.layout === "home"
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
    contentClasses () {
      return {
        'content-block': this.isLanding,
        'page': !this.isLanding
      }
    },
    pageClasses () {
    const userPageClass = this.$page.frontmatter.pageClass
    return [
      {
        'home': this.isLanding,
        'has-sidebar': this.showSidebar,
        'sidebar-open': this.isSidebarOpen,
        'dark-mode': this.darkMode
      },
      userPageClass
      ]
    },
    linkText() {
      return translate('link-text-artwork', this.$lang)
    },
    linkTextMore() {
      return translate('link-text-more', this.$lang)
    }
  },
  methods: {
    toggleSidebar (to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
    },
    closeSidebar () {
      this.isSidebarOpen = false
    },
    toggleMode () {
      this.darkMode = this.darkMode ? false : true
      if (localStorage) {
        localStorage.setItem('dark-mode', this.darkMode)
      }
    }
  },
  watch: {
    '$route' () {
      this.closeSidebar()
    }
  },
}
