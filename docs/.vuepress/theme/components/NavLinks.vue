<template>
  <div class="nav-outer-wrapper flex w-100">
    <div v-if="this.isMobileNavVisible" class="modal-bg fixed l-up-hidden" />
    <div :class="navWrapperClasses">
      <!-- Links on left -->
      <ul
        class="left-items no-bullets pa-1 pb-8 pt-3 l-up-pa-0 ml-0 l-up-ml-2"
        v-if="userLinks.length"
      >
        <li
          class="menu-link-item block l-up-flex flex-center mb-3 l-up-mb-0"
          v-for="item in userLinks"
          :key="item.link"
        >
          <!-- If has nested links -->
          <NavDropdown
            v-if="item.type === 'links'"
            :item="item"
            class="link-item pl-0 pr-0 l-up-pa-0 l-up-mr-15"
            @nav-toggle="$emit('nav-toggle', false)"
          />
          <!-- If individual link -->
          <NavLink
            v-else
            :item="item"
            class="link-item tc-text500 tc-h-primary500 hide-icon pt-05 pb-05 ml-0 mr-0 l-up-ma-0 l-up-mr-2"
            @nav-toggle="$emit('nav-toggle', false)"
          />
        </li>
      </ul>

      <!-- Align to bottom on mobile, align to right above -->
      <div
        class="right-items pa-0 pl-1 pr-1 mt-0 l-up-pt-0 l-up-pr-0 l-up-pl-0"
        id="right-items"
      >
        <!-- Search Box -->
        <div class="icon-link flex flex-column search-link">
          <SearchBox
            v-if="!isAlgoliaSearch"
            :isDarkMode="isDarkMode"
            :isSearchVisible="isSearchVisible"
            @search-toggle="handleSearchToggle"
            @nav-toggle="$emit('nav-toggle', false)"
          />
          <AlgoliaSearchBox
            v-if="isAlgoliaSearch"
            :options="algolia"
            :isDarkMode="isDarkMode"
            :isSearchVisible="isSearchVisible"
          />
          <div
            tabindex="0"
            class="search-click-target l6 l-up-l7 ma-0 tc-text500 tc-h-primary500 flex flex-column flex-center"
            @keyup.enter="handleSearchToggle"
            @click="handleSearchToggle"
          >
            <icon name="search" class="icon-search l-up-hidden" />
            <span class="icon-text l6 mt-05 mb-0 l-up-hidden">Search</span>
          </div>
        </div>
        <!-- Dark Mode Toggle -->
        <span
          class="icon-link l6 l-up-l7 tc-text500 tc-h-primary500 l-up-ma-0 l-up-ml-1 flex flex-column flex-center view-mode"
          tabindex="0"
          @keydown.enter="$emit('dark-mode-toggle')"
          @click="$emit('dark-mode-toggle')"
          :aria-label="'Toggle View Mode'"
        >
          <icon :name="darkOrLightModeIcon" />
          <span class="icon-text mt-05 mb-0 l-up-hidden">{{
            darkOrLightModeText
          }}</span>
        </span>
        <!-- Languages link -->
        <router-link
          class="icon-link l6 l-up-l7 tc-text500 tc-h-primary500 l-up-ma-0 l-up-ml-1 flex flex-column flex-center l-up-flex-row"
          to="/languages/"
          @click.native="$emit('nav-toggle', false)"
        >
          <icon name="language" />
          <span class="icon-text mt-05 mb-0 l-up-mt-0 l-up-pl-05"
            >Languages</span
          >
        </router-link>
      </div>

      <span
        class="icon-link icon-close flex flex-column flex-center l-up-hidden"
        tabindex="0"
        @click="$emit('nav-toggle', false), handleSearchToggle"
      >
        <icon name="close" class="close-icon" />
      </span>
    </div>
  </div>
</template>

<script>
import { isActive, resolveNavLinkItem } from '../utils/util'
import { translate } from '../utils/translations'
import NavLink from './NavLink.vue'
import NavDropdown from './NavDropdown.vue'
import SearchBox from './SearchBox.vue'
import AlgoliaSearchBox from './AlgoliaSearchBox'

export default {
  components: { NavLink, NavDropdown, SearchBox, AlgoliaSearchBox },
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    },
    isMobileNavVisible: {
      type: Boolean,
      default: false
    },
    method: { type: Function }
  },
  data() {
    return {
      isSearchVisible: false
    }
  },
  computed: {
    navWrapperClasses() {
      return `nav-wrapper flex flex-column space-between w-100 max-w-450px ${
        this.isMobileNavVisible ? 'show-nav-mobile' : ''
      }`
    },
    darkOrLightModeIcon() {
      return this.isDarkMode ? 'darkmode' : 'lightmode'
    },
    darkOrLightModeText() {
      return this.isDarkMode ? 'Light Mode' : 'Dark Mode'
    },
    nav() {
      const languagePath = translate('path', this.$lang)
      return this.$site.locales[languagePath].nav || []
    },
    userLinks() {
      return (this.nav || []).map(link => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem)
        })
      })
    },
    algolia() {
      return (
        this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
      )
    },
    isAlgoliaSearch() {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    }
  },
  methods: {
    isActive,
    handleSearchToggle() {
      this.isSearchVisible = !this.isSearchVisible
    }
  },
  mounted() {
    // CREATE A CSS VAR FOR VIEWPORT HEIGHT.
    // This is specifically for mobile, and prevents the browser chrome from hiding things,
    // specifically the mobile navigation.
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    window.addEventListener('resize', () => {
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    })
  }
}
</script>

// Unscoped CSS for icons
<style lang="stylus">
@import '../styles/config.styl';

.nav-wrapper
  svg path
    fill currentColor
a.router-link-exact-active
  color $colorPrimary500

.dark-mode a.router-link-exact-active
  color $colorPrimaryDark500
</style>

<style lang="stylus" scoped>
@import '../styles/config.styl';

// Mobile-first styles

.modal-bg
  top 0
  left 0
  right 0
  bottom 0

.nav-wrapper
  z-index 9999
  position fixed
  left 0
  top 0
  height unquote('calc(100 * var(--vh))')
  overflow hidden
  transform: translateX(min(-100%, 450px))
  transition: 0.25s ease-in-out;

.show-nav-mobile
  transform: translateX(0px)

.left-items
  height unquote('calc(100 * var(--vh))')
  overflow-y scroll
  overflow-x hidden
  margin 0

.right-items
  margin-top: auto
  display flex
  justify-content space-between
  position fixed
  bottom 0
  left 0
  right 0
  height $mobileBottomDrawerHeight
  align-items center

.icon-text
  opacity 0.7

.icon-link, .search-click-target
  flex 1 1 auto

.icon-link:not(.search-link), .search-click-target
  cursor pointer

.icon-close
  position absolute
  top 16px
  right 16px

// light mode
.nav-wrapper
  background $colorWhite500
.modal-bg
  background rgba($colorWhite900, 0.9)
.right-items
  background: $colorWhite
  border-top: 1px solid rgba(0,0,0,0.1)

@media (min-width: $breakL)
  .icon-text
    opacity 1
  .nav-wrapper
    background transparent
  .left-items
    overflow initial
  .icon-link, .search-click-target
    text-transform none

.child-link-item
  opacity: 0.8
// dark mode colors
.dark-mode
  // .icon-text
  //   color $colorWhite900
  .nav-wrapper
    background $colorBlack500
  .modal-bg
    background alpha($colorBlack400, 0.8)
  .right-items
    background: $colorBlack500
    border-top: 1px solid rgba(255,255,255,.1)

  @media (min-width: $breakL)
    .nav-wrapper
      background transparent

@media (min-width: $breakL)
  div.nav-wrapper
    position relative
    flex-direction row
    max-width initial
    min-height initial
    flex 1
    overflow visible
    background transparent
    height auto
    transform none
    transition: none;

  .left-items,
  .right-items
    position initial
    display flex
    align-items center
    height auto
    border: none

  .right-items, .dark-mode .right-items
    border-top: none
    background: transparent
</style>
