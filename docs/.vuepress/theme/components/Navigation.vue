<template>
  <nav class="top-wrapper pa-1 pl-2 pr-2 w-100 fixed flex justify-center">
    <div class="flex w-100 max-w-xl">
      <router-link to="/" class="flex flex-center">
        <img
          class="header-logo"
          src="../images/ethereum-logo-wireframe.png"
          alt="Ethereum Logo"
        />
      </router-link>
      <NavLinks
        :isDarkMode="isDarkMode"
        :isMobileNavVisible="isMobileNavVisible"
        :handleNavToggle="handleNavToggle"
        @nav-toggle="handleNavToggle(false)"
        @dark-mode-toggle="$emit('dark-mode-toggle')"
      />

      <span
        :class="{
          'icon-link icon-menu l-up-mr-05 l-up-hidden': true,
          hidden: isMobileNavVisible
        }"
        tabindex="0"
      >
        <icon
          name="menu"
          class="icon-menu"
          @click.native="handleNavToggle(true)"
        />
      </span>
    </div>
  </nav>
</template>

<script>
import NavLinks from './NavLinks.vue'

export default {
  components: { NavLinks },
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isMobileNavVisible: false
    }
  },
  computed: {
    darkOrLightModeIcon() {
      return this.isDarkMode ? 'darkmode' : 'lightmode'
    }
  },
  methods: {
    handleNavToggle(value) {
      // Our event handler gets the event, as well as any
      // arguments the child passes to the event
      this.isMobileNavVisible = value
      // disable body scroll when nav is open, enable when closed
      this.isMobileNavVisible
        ? (document.body.style.overflow = 'hidden')
        : (document.body.style.overflow = '')
    }
  }
}
</script>

<style lang="stylus" scoped>
@require '../styles/config'

.top-wrapper
  top 0
  left 0
  z-index 9999

  &, *, *:before, *:after
    box-sizing: border-box

.header-logo
  height 2.145rem;
  opacity 0.85

// Light mode
.top-wrapper
  background $colorWhite500

// Dark mode
.dark-mode
  .top-wrapper
    background $colorBgDark
</style>

<style lang="stylus">
@require '../styles/config'
.icon-menu
  position fixed
  right 16px
  top 16px

.icon-menu
  svg path
    fill $colorBlack500

.dark-mode
  .icon-menu
    svg path
      fill $colorWhite500
</style>
