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
  .chevron-icon
    display none

.dropdown-items, .dropdown-item
    list-style none
    margin 0
    padding 0

@media (min-width: $breakM)
  .dropdown-title
    .chevron-icon
      display inline-block

  .dropdown-items
    position absolute
    top 2.3em
    width 17ch
    display none
    padding .5em 0
    border-radius .5em

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


  .link-item
    padding 0.5em 1em
    display block


// Light mode Colors
.dropdown-title
  .chevron-icon
    path
      fill black

.dropdown-items
  background $colorBlack400

.link-item
  &:hover
    background $colorBlack200


// Dark Mode Colors
.dark-mode
  .dropdown-title
    .chevron-icon
      path
        fill $colorBlack500

  .dropdown-items
    background $colorBlack400

  .link-item
    &:hover
      background $colorBlack200
</style>
