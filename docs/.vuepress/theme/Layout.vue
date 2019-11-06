<template>
  <div id="wrapper" :class="pageClasses">
    <Header
      :shouldShowSidebarButton="true"
      :class="{ 'home': isLanding }"
      @toggle-sidebar="toggleSidebar"
      @toggle-mode="toggleMode"
    />
    <Hero v-if="showHero" :dark="darkMode" />
    <main :class="contentClasses">
      <p v-if="!isLanding" class="updated-date">{{lastUpdatedText}}: {{lastUpdatedDate}}</p>
      <Content/>
    </main>
    <Sidebar :items="sidebarItems" @close-sidebar="closeSidebar" />
    <Footer :class="{ 'home': isLanding }" />
  </div>
</template>

<script>
import moment from 'moment';
import Footer from "@theme/components/Footer";
import Header from "@theme/components/Header";
import Hero from "@theme/components/Hero";
import Sidebar from "@theme/components/Sidebar";
import { resolveSidebarItems } from "./utils/util";
import { translate } from "./utils/translations";

export default {
  data() {
    return {
      isSidebarOpen: false,
      darkMode: false
    };
  },
  components: {
    Footer,
    Header,
    Hero,
    Sidebar
  },
  beforeMount() {
    if (localStorage && localStorage.getItem("dark-mode") !== null) {
      this.darkMode = localStorage.getItem("dark-mode") === "true";
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
    if (localStorage && localStorage.getItem("dark-mode") === null) {
      this.darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addListener(({ matches }) => {
        if (localStorage && localStorage.getItem("dark-mode") === null) {
          this.darkMode = matches;
        }
      });
  },
  computed: {
    isLanding() {
      return this.$page.frontmatter && this.$page.frontmatter.layout === "home";
    },
    showHero() {
      return (
        this.$page.frontmatter &&
        this.$page.frontmatter.layout === "home" &&
        !this.$page.frontmatter.hideHero
      );
    },
    posts() {
      return this.$site.pages.filter(
        page =>
          page.path.endsWith(".html") && page.path.startsWith(this.$page.path)
      );
    },
    showSidebar() {
      return this.$page.frontmatter.sidebar;
    },
    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$route,
        this.$site,
        this.$localePath
      );
    },
    contentClasses() {
      return {
        "content-block": this.isLanding,
        page: !this.isLanding
      };
    },
    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass;
      return [
        {
          home: this.isLanding,
          "has-sidebar": this.showSidebar,
          "sidebar-open": this.isSidebarOpen,
          "dark-mode": this.darkMode,
          "right-to-left-text": this.$lang === "fa"
        },
        userPageClass
      ];
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
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
    },
    closeSidebar() {
      this.isSidebarOpen = false;
    },
    toggleMode() {
      this.darkMode = this.darkMode ? false : true;
      if (localStorage) {
        localStorage.setItem("dark-mode", this.darkMode);
      }
    }
  },
  watch: {
    $route() {
      this.closeSidebar();
    }
  }
};
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

</style>
<style src="./styles/theme.styl" lang="stylus"></style>
