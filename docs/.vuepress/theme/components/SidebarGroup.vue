<template>
  <ul
    ref="items"
    class="sidebar-group-items ma-0 pa-0 no-bullets"
    v-if="open || !collapsable"
  >
    <li v-for="child in item.children">
      <SidebarLink :item="child" />
    </li>
  </ul>
</template>

<script>
import SidebarLink from './SidebarLink.vue'
import DropdownTransition from './DropdownTransition.vue'

export default {
  name: 'SidebarGroup',
  props: ['item', 'first', 'open', 'collapsable'],
  components: { SidebarLink, DropdownTransition }
}
</script>
