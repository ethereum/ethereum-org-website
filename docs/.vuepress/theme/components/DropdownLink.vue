<template>
  <div class="dropdown-wrapper" :class="{ open }" @mouseleave="closeMenu">
    <button
      type="button"
      class="dropdown-title"
      @click="toggle"
      @mouseover="openMenu"
      :aria-label="`Select ${item.text.toLowerCase()}`"
    >
      <span class="title">{{ item.text }}</span>
      <span class="arrow" :class="open ? 'down' : 'right'"></span>
    </button>

    <DropdownTransition>
      <ul class="nav-dropdown border-box-shadow" v-show="open">
        <li
          class="dropdown-item"
          :key="subItem.link || index"
          v-for="(subItem, index) in item.items"
        >
          <h4 v-if="subItem.type === 'links'">{{ subItem.text }}</h4>

          <ul class="dropdown-subitem-wrapper" v-if="subItem.type === 'links'">
            <li
              class="dropdown-subitem"
              :key="childSubItem.link"
              v-for="childSubItem in subItem.items"
            >
              <NavLink :item="childSubItem" :closeMenu="closeMenu" />
            </li>
          </ul>

          <NavLink v-else :item="subItem" :closeMenu="closeMenu" />
        </li>
        <li class="languages-dropdown-item" v-if="item.text === 'Languages'">
          <router-link class="languages-link nav-link" to="/languages/"
            >View all</router-link
          >
        </li>
      </ul>
    </DropdownTransition>
  </div>
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
    toggle() {
      this.open = !this.open
    },
    openMenu() {
      this.open = true
    },
    closeMenu() {
      this.open = false
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/config.styl';

.dropdown-wrapper
  cursor pointer
  .dropdown-title
    display flex
    align-items center
    color $colorBlack200
    background transparent
    border none
    font-size inherit
    font-family inherit
    cursor inherit
    padding inherit
    line-height 1.4rem
    font-weight 500
    &:hover
      border-color transparent
      color: $colorPrimary500
    .arrow
      vertical-align middle
      margin-top -1px
      margin-left 0.4rem
  .nav-dropdown
    display flex
    flex-direction column

    .dropdown-item
      color inherit
      line-height 1.7rem
      h4
        margin 0.45rem 0 0
        border-top 1px solid #eee
        padding 0.45rem 1.5rem 0 1.25rem
      .dropdown-subitem-wrapper
        padding 0
        list-style none
        .dropdown-subitem
          font-size 0.9em
      a
        display block
        line-height 1.7rem
        position relative
        border-bottom none
        font-weight 400
        margin-bottom 0
        padding 0 1.5rem 0 1.25rem
        &.router-link-active
          &::after
            content ""
            width 0
            height 0
            position absolute
            top calc(50% - 2px)
            left 9px
      &:first-child h4
        margin-top 0
        padding-top 0
        border-top 0

.dropdown-item
  a
    &:hover
      color $colorPrimary
    &.router-link-active
      color $colorPrimary
      &::after
        border-left 5px solid $colorPrimary
        border-top 3px solid transparent
        border-bottom 3px solid transparent

.dark-mode
  .dropdown-title
    color: $colorWhite900
    &:hover
      border-color transparent
      color: $colorPrimaryDark500
  .dropdown-item
    a
      &:hover
        color $colorPrimaryDark
      &.router-link-active
        color $colorPrimaryDark
        &::after
          border-left 5px solid $colorPrimaryDark
          border-top 3px solid transparent
          border-bottom 3px solid transparent

@media (max-width: $MQMobile)
  .dropdown-wrapper
    &.open .dropdown-title
      margin-bottom 0.5rem
    .nav-dropdown
      transition height .1s ease-out
      overflow hidden
      border-radius 0.5rem
      .dropdown-item
        h4
          border-top 0
          margin-top 0
          padding-top 0
        h4, & > a
          font-size 15px
          line-height 2rem
        .dropdown-subitem
          font-size 14px
          padding-left 1rem

@media (min-width: $MQMobile)
  .dropdown-wrapper
    height 1.8rem
    .dropdown-title .arrow
      // make the arrow always down at desktop
      border-left 4px solid transparent
      border-right 4px solid transparent
      border-top 6px solid $arrowBgColor
      border-bottom 0
    .nav-dropdown
      // Avoid height shaked by clicking
      height auto !important
      position absolute
      max-height calc(100vh - 2.7rem)
      overflow-y auto
      padding 0.6rem 0
      border-radius 1rem
      text-align left
      white-space nowrap
      margin 0
      margin-top 8px
      background-color $colorWhite

.languages-dropdown-item
  line-height 1.7rem
.languages-link
    padding 0 1.5rem 0 1.25rem

@media (min-width: $breakM)
  .dark-mode
    .nav-dropdown
      background-color $lightBorderColorDark
    .nav-dropdown
      .dropdown-item
        a
          &.router-link-active
            &::after
              border-left 5px solid $colorPrimaryDark500
</style>
