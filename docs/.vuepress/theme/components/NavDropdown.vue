<template>
  <a
    href="#"
    :class="{ 'dropdown-item-wrapper': true, 'focus-within': focused }"
    @focusin="focused = true"
    @focusout="unFocus"
    @click="unFocus"
    @keydown.down="down"
    @keydown.up="up"
    :aria-label="`Select ${item.text.toLowerCase()}`"
  >
    <span
      class="dropdown-title flex flex-center ma-1 mr-0 ml-0 l-up-ma-0 l-up-pt-05 l-up-pb-05"
      >{{ item.text }}<icon class="chevron-icon hidden" name="chevron-down"
    /></span>
    <ul
      class="dropdown-items no-bullets ma-0 pa-0 l-up-pt-05 l-up-pb-05 l-up-hidden l-up-absolute"
    >
      <li
        class="dropdown-item ma-0 pa-0"
        :key="subItem.link || index"
        v-for="(subItem, index) in item.items"
      >
        <NavLink
          tabindex="-1"
          :item="subItem"
          childClass="link-item child-link-item block mb-1 l-up-m-0 l-up-pa-05 l-up-pl-05 l-up-pr-05"
          @nav-toggle="$emit('nav-toggle', false)"
        />
      </li>
      <li class="languages-dropdown-item" v-if="item.text === 'Languages'">
        <router-link
          tabindex="-1"
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
      focused: false,
      focusIndex: -1
    }
  },
  methods: {
    unFocus(e) {
      e.relatedTarget
        ? !e.relatedTarget.className.includes('child-link-item') &&
          ((this.focused = false), this.focusIndex != -1)
        : e.type == 'click' &&
          ((this.focused = false),
          this.focusIndex != -1,
          // clear css hover
          e.target.closest('.dropdown-items').classList.add('blur-el'),
          window.setTimeout(function() {
            e.target.closest('.dropdown-items').classList.remove('blur-el')
          }, 50))
    },
    down(e) {
      e.preventDefault()
      this.focusIndex < this.item.items.length - 1 && this.focusIndex++
      var target
      this.focusIndex < this.item.items.length &&
        ((target = e.target
          .closest('.dropdown-item-wrapper')
          .getElementsByClassName('child-link-item')),
        target && target[this.focusIndex].focus())
    },
    up(e) {
      e.preventDefault()
      this.focusIndex != -1 && this.focusIndex--
      var items
      var wrapper = e.target.closest('.dropdown-item-wrapper')
      this.focusIndex == -1
        ? wrapper.focus()
        : (items = wrapper.getElementsByClassName('child-link-item'))
      items && items[this.focusIndex].focus()
    }
  }
}
</script>

// Unscoped css for icons
<style lang="stylus" scoped>
@import '../styles/config.styl';

.dropdown-title
  cursor  initial

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

@media (min-width: $breakL)
  .dropdown-title
    .chevron-icon
      display inline-block
      margin-right -8px // Offset visual weight

  .dropdown-items
    top 100%
    width auto
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
    width 100%;
    width auto

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
