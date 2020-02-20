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
        <div
          class="icon-link" 
          
        >
          <SearchBox
            v-if="$site.themeConfig.search !== false"
            :isDarkMode="isDarkMode"
            :isSearchVisible="isSearchVisible"
            @search-toggle="handleSearchToggle"
            @nav-toggle="$emit('nav-toggle', false)"
          />
          <icon name="search" class="icon-search" @click.native="handleSearchToggle(true)" />
          <span class="icon-text" >Search</span>
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
          @keydown.enter="$emit('toggle-mode')"
          @click="$emit('toggle-mode')"
          :aria-label="'Toggle View Mode'"
        >
          <icon :name="darkOrLightModeIcon" />
          <span class="icon-text">{{darkOrLightModeText}}</span>
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
        <icon name="close" />
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
    method: { type: Function },
  },
  data() {
    return {
      isSearchVisible: false,
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
    },
  },
  methods: {
    isActive,
    handleSearchToggle(value) {
      // Our event handler gets the event, as well as any
      // arguments the child passes to the event
      this.isSearchVisible = value
      console.log('Search:', value);
    }
  }
}
</script>

// Unscoped CSS for icons
<style lang="stylus">
@import '../styles/config.styl';
.nav-wrapper
  svg
    path
      fill white
</style>

<style lang="stylus" scoped>
@import '../styles/config.styl';

// Mobile-first styles

.modal-bg
  background pink
  position fixed
  top 0
  left 0
  right 0
  bottom 0

.nav-wrapper
  z-index 9999
  background black
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

.link-item
  padding 0.5em 0

.right-items
  margin-top: auto
  display flex
  justify-content space-between
  padding 1.5em 1em

.icon-link
  display flex
  flex-direction column
  align-items center
  flex 1 1 auto

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

@media (min-width: $breakM)
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

  .left-items,
  .right-items
    display flex
    padding 0

  .icon-text, .icon-search
    display none
  
  // Hide mobile-only icons
  .icon-close, .icon-menu
    display none
  


</style>
