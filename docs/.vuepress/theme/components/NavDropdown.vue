<template>
  <a
    href="#"
    class="dropdown-item-wrapper"
    :aria-label="`Select ${item.text.toLowerCase()}`"
    v-on:click="clearState"
  >
    <span class="dropdown-title"
      >{{ item.text }}<icon class="chevron-icon" name="chevron-down"
    /></span>
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
            <NavLink
              :item="childSubItem"
              childClass="link-item"
              @nav-toggle="$emit('nav-toggle', false)"
            />
          </li>
        </ul>

        <NavLink
          v-else
          :item="subItem"
          childClass="link-item"
          @nav-toggle="$emit('nav-toggle', false)"
        />
      </li>
      <li class="languages-dropdown-item" v-if="item.text === 'Languages'">
        <router-link
          class="languages-link nav-link"
          to="/languages/"
          @nav-toggle="$emit('nav-toggle', false)"
        >
          View all
        </router-link>
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
  methods: {
    clearState(event) {
      // first of all, blur state
      event.target.blur()
      var wrapper = event.target.closest('.dropdown-item-wrapper')
      // add then remove class to remove hover state
      wrapper.classList.add('blur-el')
      window.setTimeout(function() {
        wrapper.classList.remove('blur-el')
      }, 200)
    }
  }
}
</script>

// Unscoped css for icons
<style lang="stylus" scoped>
@import '../styles/config.styl';

.dropdown-title
  display flex
  align-items center
  margin 1em 0
  cursor  initial
  .chevron-icon
    display none

.dropdown-items, .dropdown-item
  list-style none
  margin 0
  padding 0

.dropdown-item .link-item
  display block
  margin-bottom 1em

.menu-link-item
  margin 3em


// Light mode Colors
.dropdown-title
  color $colorBlack500
  .chevron-icon
    path
      fill $colorBlack200

.link-item
  color $colorBlack200
  &:hover, &.router-link-exact-active
    color $colorPrimary500

// Dark Mode Colors
.dark-mode
  .dropdown-title
    color $colorWhite500
    .chevron-icon
      path
        fill $colorBlack500

  .link-item
    color $colorWhite900
    &:hover
      color $colorPrimaryDark500
  .router-link-exact-active
    color $colorPrimaryDark500

@media (min-width: $breakM)
  .dropdown-title
    .chevron-icon
      display inline-block
      margin-right -8px // Offset visual weight

  .dropdown-items
    position absolute
    top 100%
    width auto
    display none
    padding .5em 0
    border-radius .5em

    .link-item
      margin 0

  .dropdown-item-wrapper
    &:hover,
    &:focus,
    &:focus-within
      .dropdown-items
        display block

    // Clear state with blur class
    &.blur-el
      &:hover
      &:focus,
      &:focus-within
        .dropdown-items
          display none

  .link-item, .dropdown-title
    margin 0
    width 100%;
    width auto

  .dropdown-title
    padding .5em 0

  .link-item
    padding .5em 1em
  // Light Mode
  .dropdown-items
    background $colorWhite500
    border 1px solid $colorWhite700

  .link-item:not(.dropdown-item-wrapper)
      &:hover
        background $colorWhite600

  // Dark mode

  .dark-mode
    .dropdown-items
      background $colorBlack400
      border 1px solid $colorBlack300

    .link-item:not(.dropdown-item-wrapper)
        &:hover
          background $colorBlack500

    .dropdown-title
      color $colorWhite500
</style>
