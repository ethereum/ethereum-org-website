<template>
  <header class="header-right flex">
    <div>
      <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>
      <NavLinks class="sm-hide" />
    </div>

    <div class="menu inline flex flex-center">
      <a href="#" class="sm-hide md-hide"><button>Fork This Page</button></a>
      <SearchBox v-if="$site.themeConfig.search !== false"/>
      <a href="#" class="md-up-hide"><img src="../images/icon-github.svg" /></a>
      <span class="pointer view-mode"><img src="../images/icon-sun.svg" /></span>
    </div>
  </header>
</template>

<script>
  import NavLinks from './NavLinks.vue'
  import SearchBox from './SearchBox.vue'
  import SidebarButton from './SidebarButton.vue'

  export default {
    components: { NavLinks, SearchBox, SidebarButton }
  }
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
    z-index 1
    display flex
    justify-content space-between
    border-bottom 1px dotted transparent
    transition all 0.2s ease

    &.home
      background transparent

      >>>ul.nav-ul li:nth-child(n+2)
        display none

  .menu a, .menu span
    margin-right 1em
    display flex

    &:last-child
      margin 0

  @media (max-width: $breakS)
    .sidebar-open
      header
        background rgba(255,255,255,0.95)
        border-bottom 1px dotted $accentColor



</style>
