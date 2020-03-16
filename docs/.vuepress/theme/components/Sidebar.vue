<template>
  <div class="sidebar" id="outline">
    <slot name="top" />
    <ul class="sidebar-links" v-if="items.length">
      <li v-for="(item, i) in items" :key="i">
        <SidebarGroup
          v-if="item.type === 'group'"
          :item="item"
          :first="i === 0"
          :open="i === openGroupIndex"
          :collapsable="item.collapsable || item.collapsible"
          @toggle="toggleGroup(i)"
        />
        <SidebarLink v-else :item="item" />
      </li>
    </ul>
    <slot name="bottom" />
  </div>
</template>

<script>
import SidebarGroup from './SidebarGroup.vue'
import SidebarLink from './SidebarLink.vue'
import { isActive } from '../utils/util'

export default {
  components: { SidebarGroup, SidebarLink },

  props: ['items'],

  data() {
    return {
      openGroupIndex: 0
    }
  },

  created() {
    this.refreshIndex()
  },

  watch: {
    $route() {
      this.refreshIndex()
    }
  },

  methods: {
    refreshIndex() {
      const index = resolveOpenGroupIndex(this.$route, this.items)
      if (index > -1) {
        this.openGroupIndex = index
      }
    },

    toggleGroup(index) {
      this.openGroupIndex = index === this.openGroupIndex ? -1 : index
    },

    isActive(page) {
      return isActive(this.$route, page.path)
    }
  }
}

function resolveOpenGroupIndex(route, items) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (
      item.type === 'group' &&
      item.children.some(c => isActive(route, c.path))
    ) {
      return i
    }
  }
  return -1
}
</script>

<style lang="stylus">
@import '../styles/config.styl'

.sidebar
  position sticky
  top 7.5em
  bottom 0
  right 0
  width $sidebarWidth
  height calc(100vh - 80px)
  overflow-y auto
  font-size $fsXSmall
  padding 1em 2em 1em 1em
  border-left 1px dotted $colorPrimary
  transition all 0.2s ease-in-out
  transition transform .2s ease

  p.sidebar-heading
    display none

  ul
    padding 0
    margin 0
    list-style-type none
    list-style-image none
  a
    display inline-block

  .nav-links
    display none
    padding 1.5em 0 1.5rem 0

    .nav-item, .repo-link
      display block
      padding-left 1em
      margin-right 0
      line-height 2em


@media (max-width: $breakS)
  .sidebar
    display block !important
    font-size $fsMedium
    position fixed
    top 68px
    padding-right 1em
    transform translateX(-100%)
    transition transform .2s ease
    border-left none
    left 0
    background white
    border-right 1px dotted $colorPrimary
    height "calc(100vh - %s)" % $navbarHeight
    z-index 1

    .nav-links
      display flex
      flex-direction column
      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after
        top calc(1rem - 2px)
    .sidebar-links
      padding 1rem 0

  .sidebar-group-items
    font-size $fsSmall

  .sidebar-open
    .sidebar
      display block !important
      transform translateX(0)

@media only screen and (min-width:$breakL + 1px)
  .sidebar
    right "calc(50vw - 1460px / 2)" % $breakL
</style>
