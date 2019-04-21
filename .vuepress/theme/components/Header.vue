<template>
  <header class="header-right flex">
    <div>
      <NavLinks />
    </div>

    <div class="menu inline flex flex-center">
      <a href="#"><button>Fork This Page</button></a>
      <a href="#"><img src="../images/icon-search.svg" /></a>
      <a href="#"><img src="../images/icon-sun.svg" /></a>
    </div>
  </header>
</template>

<script>
  import NavLinks from './NavLinks.vue'

  export default {
    components: { NavLinks }
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

    &.home
      background transparent

      >>>ul.nav-ul li:nth-child(n+2)
        display none

  .menu a
    margin-right 1em
    display flex

    &:last-child
      margin 0


</style>
