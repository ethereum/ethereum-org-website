<template>
  <a
    href="#"
    :class="{ 'dropdown-item-wrapper': true, 'focus-within': focused }"
    @focusin="focused = true"
    @focusout="unFocus"
    @click="unFocus"
    :aria-label="`Select ${item.text.toLowerCase()}`"
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
        <NavLink
          :item="subItem"
          childClass="link-item child-link-item"
          @nav-toggle="$emit('nav-toggle', false)"
        />
      </li>
      <li class="languages-dropdown-item" v-if="item.text === 'Languages'">
        <router-link
          class="languages-link nav-link child-link-item"
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
  props: {
    item: {
      required: true
    }
  },
  data() {
    return {
      focused: false
    }
  },
  methods: {
    unFocus(e) {
      e.relatedTarget
        ? !e.relatedTarget.className.includes('child-link-item') &&
          (this.focused = false)
        : e.type == 'click' &&
          ((this.focused = false),
          // clear css hover
          e.target.closest('.dropdown-items').classList.add('blur-el'),
          window.setTimeout(function() {
            e.target.closest('.dropdown-items').classList.remove('blur-el')
          }, 50))
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
  &:hover, &:focus, &.router-link-exact-active
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
    &:hover, &:focus
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
    &.focus-within
      .dropdown-items
        display block
      .blur-el
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
      &:hover, &:focus
        background $colorWhite600

  // Dark mode

  .dark-mode
    .dropdown-items
      background $colorBlack400
      border 1px solid $colorBlack300

    .link-item:not(.dropdown-item-wrapper)
        &:hover, &:focus
          background $colorBlack500

    .dropdown-title
      color $colorWhite500
</style>
