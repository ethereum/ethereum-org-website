<template>
  <footer class="footer">
    <ul>
      <li><a href="https://github.com/ethereum" target="_blank">Github</a></li>
      <li><a href="https://twitter.com/ethereum" target="_blank">Twitter</a></li>
      <!-- <li><a href="#">Branding</a></li> -->
      <li><a href="/privacy-policy/">Privacy Policy</a></li>
      <li><a href="/terms-of-use/">Terms of Use</a></li>
      <li><a href="/cookie-policy/">Cookie Policy</a></li>
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
