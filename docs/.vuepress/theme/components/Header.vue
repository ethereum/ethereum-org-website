<template>
  <header class="header-right flex" id="main-header">
    <div class="flex">
      <SidebarButton
        v-if="shouldShowSidebarButton"
        :isDarkMode="isDarkMode"
        @toggle-sidebar="$emit('toggle-sidebar')"
      />
      <router-link to="/">
        <img
          class="header-logo sm-hide"
          src="../images/ethereum-logo-wireframe.png"
          alt="Ethereum Logo"
        />
      </router-link>
      <NavLinks class="sm-hide" />
    </div>

    <div class="menu inline flex flex-center">
      <SearchBox
        v-if="$site.themeConfig.search !== false"
        :isDarkMode="isDarkMode"
      />
      <a
        href="https://github.com/ethereum/ethereum-org-website"
        target="_blank"
        rel="noopener noreferrer"
        title="Fork This Page (GitHub)"
        class="sm-hide nav-link hide-icon"
      >
        <icon name="github" />
      </a>
      <span
        class="pointer view-mode nav-link"
        tabindex="0"
        @keydown.enter="$emit('toggle-mode')"
        @click="$emit('toggle-mode')"
        :aria-label="'Toggle View Mode'"
      >
        <icon :name="darkOrLightModeIcon" />
      </span>
      <router-link class="nav-link flex flex-center" to="/languages/">
        <icon name="language" />
        <span class="sm-hide">Languages</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import NavLinks from './NavLinks.vue'
import SearchBox from './SearchBox.vue'
import SidebarButton from './SidebarButton.vue'

export default {
  components: { NavLinks, SearchBox, SidebarButton },
  name: 'Header',
  props: {
    shouldShowSidebarButton: {
      type: Boolean,
      default: true
    },
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    darkOrLightModeIcon() {
      return this.isDarkMode ? 'darkmode' : 'lightmode'
    }
  }
}
</script>

// unscoped css to pass styles to navigation & icons
<style lang="stylus">
@import '../styles/config.styl'

.nav-link svg + span
  padding-left: 0.5em

.nav-link
  color $colorBlack200
  svg path
    fill $subduedColor
  &:hover, &.router-link-active
    color $colorPrimary
    svg path
      fill $colorPrimary

.dark-mode .nav-link
  color: $colorWhite900
  &:hover, &:active, &:focus, &.router-link-active
    color $colorPrimaryDark500
    svg path
      fill $colorPrimaryDark500
</style>

<style lang="stylus" scoped>
@require '../styles/config'

header
  position fixed
  top 0
  left 0
  right 0
  padding 1em 2em
  background rgba(255,255,255,0.95)
  z-index 2
  display flex
  justify-content space-between
  border-bottom 1px dotted transparent
  transition border-bottom 0.2s ease

  .header-logo
    height 1.9em
    margin-right 1em
    padding-top: 0.25em
    opacity 0.85

.menu a, .menu span
  margin-right 1em
  display flex

  &:last-child
    margin 0

.nav-links
  display flex
  align-items center

.button
  color $textColor

.dark-mode
  header {
    background: $colorBgDark
  }
@media (max-width: $breakS)
  .sidebar-open
    header
      border-bottom 1px dotted $colorPrimary

  #wrapper.dark-mode
    .sidebar-open
      header
        border-bottom 1px dotted $colorPrimaryDark500
</style>
