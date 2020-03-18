<template>
  <div class="sidebar-group" :class="{ first, collapsable }">
    <DropdownTransition>
      <ul ref="items" class="sidebar-group-items" v-if="open || !collapsable">
        <li v-for="child in item.children">
          <SidebarLink :item="child" />
        </li>
      </ul>
    </DropdownTransition>
  </div>
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
