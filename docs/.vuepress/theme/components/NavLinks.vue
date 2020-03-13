<template>
  <div class="nav-outer-wrapper">
    <div v-if="this.isMobileNavVisible" class="modal-bg" />
    <div :class="navWrapperClasses">
      <!-- Links on left -->
      <ul class="left-items" v-if="userLinks.length">
        <li class="menu-link-item" v-for="item in userLinks" :key="item.link">
          <!-- If has nested links -->
          <NavDropdown
            v-if="item.type === 'links'"
            :item="item"
            class="link-item"
            @nav-toggle="$emit('nav-toggle', false)"
          />
          <!-- If individual link -->
          <NavLink
            v-else
            :item="item"
            class="link-item"
            @nav-toggle="$emit('nav-toggle', false)"
          />
        </li>
      </ul>

      <!-- Align to bottom on mobile, align to right above -->
      <div class="right-items" id="right-items">
        <!-- Search Box -->
        <div class="icon-link search-link">
          <SearchBox
            v-if="$site.themeConfig.search !== false"
            :isDarkMode="isDarkMode"
            :isSearchVisible="isSearchVisible"
            @search-toggle="handleSearchToggle"
            @nav-toggle="$emit('nav-toggle', false)"
          />
          <div
            tabindex="0"
            class="search-click-target"
            @keyup.enter="handleSearchToggle(true)"
            @click="handleSearchToggle(true)"
          >
            <icon name="search" class="icon-search" />
            <span class="icon-text">Search</span>
          </div>
        </div>
        <!-- Dark Mode Toggle -->
        <span
          class="icon-link view-mode"
          tabindex="0"
          @keydown.enter="$emit('dark-mode-toggle')"
          @click="$emit('dark-mode-toggle')"
          :aria-label="'Toggle View Mode'"
        >
          <icon :name="darkOrLightModeIcon" />
          <span class="icon-text">{{ darkOrLightModeText }}</span>
        </span>
        <!-- Languages link -->
        <router-link
          class="icon-link"
          to="/languages/"
          @click.native="$emit('nav-toggle', false)"
        >
          <icon name="language" />
          <span class="icon-text">Languages</span>
        </router-link>
      </div>

      <span
        class="icon-link icon-close"
        tabindex="0"
        @click="$emit('nav-toggle', false), handleSearchToggle(false)"
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

export default {
  components: { NavLink, NavDropdown, SearchBox },
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
      return `nav-wrapper ${this.isMobileNavVisible ? 'show-nav-mobile' : ''}`
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
    }
  },
  methods: {
    isActive,
    handleSearchToggle(value) {
      this.isSearchVisible = value
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

$navIconColor = $colorBlack500
$navIconHoverColor = $colorPrimary500
$navIconColorDark = $colorWhite500
$navIconHoverColorDark = $colorPrimaryDark500

.nav-wrapper
  svg
    path
      fill $navIconColor
    &:hover
      cursor pointer
      path
        fill $navIconHoverColor

.dark-mode
  .nav-wrapper
    svg
      path
        fill $navIconColorDark
      &:hover
        cursor pointer
        path
          fill $navIconHoverColorDark

.icon-link:not(.search-link), .search-click-target
  svg path
    fill $navIconColor
  &:hover, &.router-link-exact-active
    .icon-text
      color $colorPrimary500
    svg path
      fill $navIconHoverColor

// Dark Mode
.dark-mode
  .icon-link:not(.search-link), .search-click-target
    svg path
      fill $colorWhite500

    &:hover, &.router-link-exact-active
      .icon-text
        color $colorPrimaryDark500
      svg path
        fill $navIconHoverColorDark
</style>

<style lang="stylus" scoped>
@import '../styles/config.styl';

// Mobile-first styles

.modal-bg
  position fixed
  top 0
  left 0
  right 0
  bottom 0

.nav-wrapper
  z-index 9999
  position fixed
  left 0
  top 0
  width 100%
  max-width 450px
  height unquote('calc(100 * var(--vh))')
  overflow hidden
  flex-direction column
  justify-content space-between
  display: flex
  transform: translateX(min(-100%, 450px))
  transition: 0.25s ease-in-out;

.show-nav-mobile
  transform: translateX(0px)

.menu-link-group,
.menu-link-item
  display block
  list-style none
  margin 2em 0

.link-item
  padding 0.5em 0

.left-items
  height unquote('calc(100 * var(--vh))')
  overflow-y scroll
  overflow-x hidden
  margin 0
  padding 1em 1em 100px

.right-items
  margin-top: auto
  display flex
  justify-content space-between
  padding 0 1em
  position fixed
  bottom 0
  left 0
  right 0
  height $mobileBottomDrawerHeight
  align-items center

.icon-link, .search-click-target
  display flex
  flex-direction column
  align-items center
  flex 1 1 auto

.icon-link:not(:first-child)
  margin-left 1em

.icon-link:not(.search-link), .search-click-target
  cursor pointer

.icon-text
  margin-top .5rem
  display block
  font-size .875rem
  letter-spacing: 0.04rem
  text-transform uppercase

.icon-close
  position absolute
  top 16px
  right 16px

// light mode
.icon-text
  color $colorBlack100
  &:hover, &:focus
    .icon-text
      color $colorPrimary500
.nav-wrapper
  background $colorWhite500
.modal-bg
  background rgba($colorWhite900, 0.9)
.right-items
  background: $colorWhite
  border-top: 1px solid rgba(0,0,0,0.1)
.menu-link-item > .link-item
  color $colorBlack500
  &:hover, &.router-link-exact-active
    color $colorPrimary500

@media (min-width: $breakM)
  .nav-wrapper
    background transparent

// dark mode colors
.dark-mode
  .icon-text
    color $colorWhite900
  .nav-wrapper
    background $colorBlack500
  .modal-bg
    background alpha($colorBlack400, 0.8)
  .right-items
    background: $colorBlack500
    border-top: 1px solid rgba(255,255,255,.1)
  .menu-link-item > .link-item
    color $colorWhite500
    &:hover, &.router-link-exact-active
      color $colorPrimaryDark500
  .dropdown-link-item
    .link-item
      color $colorWhite900
      &:hover
        color $colorPrimaryDark500
  .router-link-exact-active
    color $colorPrimaryDark500

  @media (min-width: $breakM)
    .nav-wrapper
      background transparent

@media (min-width: $breakM)
  .icon-link:not(:first-of-type)
    margin-left 1em
  .nav-outer-wrapper
    display flex
    width 100%
  .modal-bg
    display none
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

  .menu-link-group, .menu-link-item
    display inline-block
    list-style none
    margin 0
    padding 0

  .menu-link-item
    margin 0 0 0 2em
    display flex
    align-items center

  .left-items,
  .right-items
    position initial
    display flex
    align-items center
    height auto
    padding 0
    margin 0
    border: none

  .right-items, .dark-mode .right-items
    border-top: none
    background: transparent

  .icon-text, .icon-search
    display none

  // Hide mobile-only icons
  .icon-close, .icon-menu
    display none
</style>
