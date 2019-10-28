<template>
  <footer class="footer">
    <div class="credits">
      Artwork by <a href="https://impermanence.co" target="_blank">Lili Feyerabend</a> feat. <a href="https://ilankatin.com" target="_blank">ilan katin</a>, <a href="https://linktr.ee/mattiacprodukt" target="_blank">Mattia Cuttini</a>, <a href="https://oficinastk.github.io" target="_blank">Oficinas TK</a>, <a href="https://xcopyart.com" target="_blank">XCOPY</a>.
    </div>
    <p class="updated-date">Site last updated: {{lastUpdatedDate}}</p>
    <ul>
      <li><a href="https://github.com/ethereum" target="_blank">GitHub</a></li>
      <li><a href="https://twitter.com/ethereum" target="_blank">Twitter</a></li>
      <li><a href="https://blog.ethereum.org/">Blog</a></li>
      <li><router-link to="/assets/">Brand Assets</router-link></li>
      <li><router-link to="/privacy-policy/">Privacy Policy</router-link></li>
      <li><router-link to="/terms-of-use/">Terms of Use</router-link></li>
      <li><router-link to="/cookie-policy/">Cookie Policy</router-link></li>
      <li><a href="mailto:press@ethereum.org">Contact</a></li>
      <li><router-link to="/languages/">Language Support</router-link></li>
    </ul>
  </footer>
</template>

<script>
  export default {
    computed: {
      lastUpdatedDate() {
        const moment = require('moment')

        function compareTimestamps(a, b) {
          if (a.lastUpdated < b.lastUpdated)
            return -1;
          if (a.lastUpdated > b.lastUpdated)
            return 1;
          return 0;
        }

        const pagesSortedByDate = this.$site.pages.sort(compareTimestamps)

        moment.locale(this.$lang)
        return moment(pagesSortedByDate[pagesSortedByDate.length - 1].lastUpdated).format('MMM DD, YYYY')
      }
    },
  }
</script>

<style lang="stylus" scoped>
  @require '../styles/config'

  footer
    font-size $fsSmall
    padding 6em 0 2em 10em

    div.credits
      display none
      margin-bottom 0.5em
      color $subduedColor

      a
        color $subduedColor

        &:hover
          color $accentColor

    &.home
      margin-left 2em

      div.credits
        display block

    p.updated-date
      margin 1em 0

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
