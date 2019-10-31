<template>
  <div id="wrapper" :class="pageClasses">
    <Header/>
    <main :class="contentClasses">
      <h1>{{content['page-404-title']}}</h1>
      {{content['page-404-text']}} <router-link to="/">{{content['page-404-home-link-text']}}</router-link>.
    </main>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@theme/components/Footer'
import Header from '@theme/components/Header'
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
    Sidebar
  },
  computed: {
    // TODO there must be a better way...
    // How to use translate() within Vue component template??
    content() {
      return {
        'page-404-title': translate('page-404-title', this.$lang),
        'page-404-text': translate('page-404-text', this.$lang),
        'page-404-home-link-text': translate('page-404-home-link-text', this.$lang),
      }
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
  },
}
</script>

<style src="./styles/theme.styl" lang="stylus"></style>
