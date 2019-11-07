<template>
  <header class="header-right flex">
    <div class="flex">
      <SidebarButton v-if="shouldShowSidebarButton" @toggle-sidebar="$emit('toggle-sidebar')" />
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
      <SearchBox v-if="$site.themeConfig.search !== false" />
      <a
        href="https://github.com/ethereum/ethereum-org-website"
        target="_blank"
        title="Fork This Page (Github)"
        class="sm-hide"
      >
        <img alt="Github" class="hide-dark" src="../images/icon-github.svg" />
        <img alt="Github" class="show-dark" src="../images/icon-github-white.svg" />
      </a>
      <span class="pointer view-mode" @click="$emit('toggle-mode')">
        <img alt="Switch to Dark Mode" class="hide-dark" src="../images/icon-sun.svg" />
        <img alt="Switch to Light Mode" class="show-dark" src="../images/icon-moon.svg" />
      </span>
      <router-link class="nav-link" to="/languages">
        <LanguageIcon />
        <span class="sm-hide">Languages</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import LanguageIcon from "./LanguageIcon.vue";
import NavLinks from "./NavLinks.vue";
import SearchBox from "./SearchBox.vue";
import SidebarButton from "./SidebarButton.vue";

export default {
  components: { LanguageIcon, NavLinks, SearchBox, SidebarButton },
  props: ['shouldShowSidebarButton']
};
</script>

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

  button
    color $textColor

  @media (max-width: $breakS)
    .sidebar-open
      header
        background rgba(255,255,255,0.95)
        border-bottom 1px dotted $accentColor

    #wrapper.dark-mode
      .sidebar-open
        header
          border-bottom 1px dotted $accentColorDark

</style>
