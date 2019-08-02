><template>
  <footer class="footer">
    <div class="credits">
      Artwork by <a href="https://impermanence.co" target="_blank">Lili Feyerabend</a> feat. <a href="https://ilankatin.com" target="_blank">ilan katin</a>, <a href="https://linktr.ee/mattiacprodukt" target="_blank">Mattia Cuttini</a>, <a href="https://oficinastk.github.io" target="_blank">Oficinas TK</a>, <a href="https://xcopyart.com" target="_blank">XCOPY</a>.
    </div>
    <ul>
      <li><a href="https://github.com/ethereum" target="_blank">GitHub</a></li>
      <li><a href="https://twitter.com/ethereum" target="_blank">Twitter</a></li>
      <li><a href="https://blog.ethereum.org/">Blog</a></li>
      <!-- <li><a href="#">Branding</a></li> -->
      <li><router-link to="/privacy-policy/">Privacy Policy</router-link></li>
      <li><router-link to="/terms-of-use/">Terms of Use</router-link></li>
      <li><router-link to="/cookie-policy/">Cookie Policy</router-link></li>
      <li><a href="mailto:press@ethereum.org">Contact</a></li>
    </ul>
    <!-- Matomo -->
    <script type="text/javascript">
      var _paq = window._paq || [];
      /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
      _paq.push(['setCookieDomain', '*.ethereum.org']);
      _paq.push(['setDomains', ['*.ethereum.org','*.ethereum.org']]);
      _paq.push(['trackPageView']);
      _paq.push(['enableLinkTracking']);
      (function() {
        var u='//matomo.ethereum.org/piwik/';
        _paq.push(['setTrackerUrl', u+'matomo.php']);
        _paq.push(['setSiteId', '4']);
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
      })();
    </script>
    <noscript><p><img src="//matomo.ethereum.org/piwik/matomo.php?idsite=4&amp;rec=1" style="border:0;" alt="" /></p></noscript>
    <!-- End Matomo Code -->
  </footer>
</template>

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
