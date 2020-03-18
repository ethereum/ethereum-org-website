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
  display none


.sidebar-links
  border-left 1px solid $colorWhite700
.dark-mode
  .sidebar-links
    border-left 1px solid $colorBlack200


@media (min-width: $breakS)
  .sidebar
    display initial
    position sticky
    top 7.5em
    bottom 0
    right 0
    width $sidebarWidth
    height calc(100vh - 80px)
    overflow-y auto
    font-size $fsXSmall
    padding 1em 2em 1em 1em
    transition all 0.2s ease-in-out
    transition transform .2s ease

    ul
      padding 0
      margin 0
      list-style-type none
      list-style-image none
    a
      display inline-block
</style>
