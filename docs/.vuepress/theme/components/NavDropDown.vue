<template>
  <a
    href="#"
    class="dropdown-item-wrapper"
    :aria-label="`Select ${item.text.toLowerCase()}`"
  >
    <span class="dropdown-title">{{ item.text }} <icon class="chevron-icon" name="chevron-down" /></span>
    <ul class="dropdown-items">
      <li
        class="dropdown-item"
        :key="subItem.link || index"
        v-for="(subItem, index) in item.items"
      >
        <h4 v-if="subItem.type === 'links'">{{ subItem.text }}</h4>
        <ul class="dropdown-subitem-wrapper" v-if="subItem.type === 'links'">
          <li
            class="link-wrapper"
            :key="childSubItem.link"
            v-for="childSubItem in subItem.items"
          >
            <NavLink :item="childSubItem" childClass="link-item" 
               @nav-toggle="$emit('nav-toggle', false)"
              />
          </li>
        </ul>

        <NavLink v-else :item="subItem"  childClass="link-item" 
               @nav-toggle="$emit('nav-toggle', false)" />
      </li>
      <li class="languages-dropdown-item" v-if="item.text === 'Languages'">
        <router-link class="languages-link nav-link" to="/languages/" 
               @nav-toggle="$emit('nav-toggle', false)"
          >View all</router-link
        >
      </li>
    </ul>
  </a>
</template>

<script>
import NavLink from './NavLink.vue'
import DropdownTransition from './DropdownTransition.vue'

export default {
  components: { NavLink, DropdownTransition },

  data() {
    return {
      open: false,
      timer: null
    }
  },

  props: {
    item: {
      required: true
    }
  },
}
</script>

// Unscoped css for icons
<style lang="stylus">
@import '../styles/config.styl';
.dropdown-title
  .chevron-icon
    path
      fill $colorWhite900
</style>

<style lang="stylus" scoped>
@import '../styles/config.styl';

@media (min-width: $breakS)
  a.blurEl:hover, a.blurEl:focus, a.blurEl:focus-within
    .nav-dropdown
      display none


.dropdown-title
  font-size 1em
  color $colorWhite500
  display block
  padding-bottom 0.5em
  svg
    display none

.link-item
  padding 0.5em 1em
  display block


.dropdown-item .link-item
  &:hover
    background $colorBlack200


.dropdown-items, .dropdown-item
  list-style none
  margin 0
  padding 0

.dropdown-items
  border-radius .5em

@media (min-width: $breakM)
  .dropdown-title
    svg
      display inline-block
  
  .dropdown-items
    position absolute
    top 2.5em
    width 17ch
    display none
    padding .5em 0

  .dropdown-item-wrapper
    &:hover, &:focus, &:focus-within
      .dropdown-items
        display block

  .dark-mode
    .dropdown-items
      background $colorBlack400

        
</style>
