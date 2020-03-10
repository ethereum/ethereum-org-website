<template>
  <nav class="nav-links" v-if="userLinks.length">
    <ul class="nav-ul no-list">
      <li
        class="nav-item no-list mr-1"
        v-for="item in userLinks"
        :key="item.link"
      >
        <DropdownLink v-if="item.type === 'links'" :item="item" />
        <NavLink v-else :item="item" />
      </li>
      <li class="nav-item" v-if="isSidebar">
        <router-link class="nav-link" to="/languages/">Languages</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { isActive, resolveNavLinkItem } from '../utils/util'
import { translate } from '../utils/translations'
import NavLink from './NavLink.vue'
import DropdownLink from './DropdownLink.vue'

export default {
  components: { NavLink, DropdownLink },
  props: ['isSidebar'],
  computed: {
    nav() {
      const languagePath = translate('path', this.$lang)
      return this.$site.locales[languagePath].nav || []
    },
    userLinks() {
      return (this.nav || []).map(link => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem)
        })
      })
    }
  },
  methods: {
    isActive
  }
}
</script>

<style lang="stylus">
@import '../styles/config.styl';

.nav-ul
  margin 0
  display flex
  list-style-type none
  list-style-image none
  @media (max-width $breakS)
    display block

  & > li
    color $subduedColor
    margin-right 1em

.nav-links
  display inline-block
  vertical-align top

  .nav-item
    cursor pointer
    position relative
    font-weight 500

@media (max-width $MQMobile)
  .nav-links
    .nav-item
      margin-left 0
</style>
