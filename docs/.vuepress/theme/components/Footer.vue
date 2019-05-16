<template>
  <footer class="footer">
    <ul>
      <li><a href="https://github.com/ethereum" target="_blank">Github</a></li>
      <li><a href="https://twitter.com/ethereum" target="_blank">Twitter</a></li>
      <li><a href="https://blog.ethereum.org/">Blog</a></li>
      <!-- <li><a href="#">Branding</a></li> -->
      <li><router-link to="/privacy-policy/">Privacy Policy</router-link></li>
      <li><router-link to="/terms-of-use/">Terms of Use</router-link></li>
      <li><router-link to="/cookie-policy/">Cookie Policy</router-link></li>
      <li><a href="mailto:press@ethereum.org">Contact</a></li>
    </ul>
  </footer>
</template>

<style lang="stylus" scoped>
  @require '../styles/config'

  footer
    font-size $fsSmall
    padding 6em 0 2em 10em

    &.home
      margin-left 2em

    ul
      margin 0

      li
        display inline-block
        margin-right 2em

        &:first-child
          padding 0

        &:before
          content ''
          padding 0

        a
          color $subduedColor

          &:hover
            color $accentColor

</style>
