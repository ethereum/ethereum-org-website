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
      <div class="right-items">
        <!-- Search Box -->
        <div class="icon-link search-link">
          <SearchBox
            v-if="$site.themeConfig.search !== false"
            :isDarkMode="isDarkMode"
            :isSearchVisible="isSearchVisible"
            :isSearchFocused="isSearchFocused"
            @search-toggle="handleSearchToggle"
            @focus-toggle="handleFocusToggle"
            @nav-toggle="$emit('nav-toggle', false)"
          />
          <div
            class="search-click-target"
            @click="handleSearchToggle(true), handleFocusToggle(true)"
          >
            <icon name="search" class="icon-search" />
            <span class="icon-text">Search</span>
          </div>
        </div>
        <!-- Github Link -->
        <!-- <a
          href="https://github.com/ethereum/ethereum-org-website"
          target="_blank"
          rel="noopener noreferrer"
          title="Fork This Page (GitHub)"
          class="icon-link"
        >
          <icon name="github" />
        </a> -->
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
      isSearchVisible: false,
      isSearchFocused: false
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
    },
    handleFocusToggle(value) {
      this.isSearchFocused = value
    }
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
  bottom 0
  width 100%
  max-width 450px
  height 100vh
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

.right-items
  margin-top: auto
  display flex
  justify-content space-between
  padding 1.5em 1em

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
  margin-top .5em
  display block
  font-size .875em
  letter-spacing: 0.04
  text-transform uppercase

.icon-close
  position absolute
  top 16px
  right 16px

// light mode
.icon-text
  color $colorBlack100
.nav-wrapper
  background $colorWhite500
.modal-bg
  background rgba($colorWhite900, 0.9)

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
    margin 0 1em
    display flex
    align-items center

  .left-items,
  .right-items
    display flex
    align-items center
    padding 0
    margin 0

  .icon-text, .icon-search
    display none

  // Hide mobile-only icons
  .icon-close, .icon-menu
    display none
</style>
