<template>
  <footer class="footer">
    <ul>
      <li><a href="#">Community</a></li>
      <li><a href="#">Ethereum Foundation</a></li>
      <li><a href="#">Branding</a></li>
      <li><a href="#">Legal</a></li>
    </ul>
  </footer>
</template>

<style lang="stylus" scoped>
  @require '../styles/config'

  footer
    font-size $fsSmall
    margin 6em 0 2em 10em

    &.home
      margin-left 2em

    ul
      margin 0

      li
        display inline-block
        margin-right 2em

        &:before
          content ''
          padding 0

        a
          color $subduedColor

          &:hover
            color $accentColor

</style>
