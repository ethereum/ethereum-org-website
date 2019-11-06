<template>
  <div class="dropdown-wrapper" :class="{ open }">
    <a class="dropdown-title" @click="toggle">
      <span class="title">{{ item.text }}</span>
      <span class="arrow" :class="open ? 'down' : 'right'"></span>
    </a>

    <DropdownTransition>
      <ul class="nav-dropdown" v-show="open">
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
              <NavLink :item="childSubItem" />
            </li>
          </ul>

          <NavLink v-else :item="subItem" />
        </li>
        <li class="languages-dropdown-item" v-if="item.text === 'Languages'">
          <router-link class="languages-link nav-link" to="/languages/">View all</router-link>
        </li>
      </ul>
    </DropdownTransition>
  </div>
</template>

<script>
import NavLink from "./NavLink.vue";
import DropdownTransition from "./DropdownTransition.vue";

export default {
  components: { NavLink, DropdownTransition },

  data() {
    return {
      open: false
    };
  },

  props: {
    item: {
      required: true
    }
  },

  methods: {
    toggle() {
      this.open = !this.open;
    }
  }
};
</script>

<style lang="stylus">
@import '../styles/config.styl';

.dropdown-wrapper
  cursor pointer
  .dropdown-title
    display flex
    align-items center
    color $subduedColor
    &:hover
      border-color transparent
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
        &:hover
          color $accentColor
        &.router-link-active
          color $accentColor
          &::after
            content ""
            width 0
            height 0
            border-left 5px solid $accentColor
            border-top 3px solid transparent
            border-bottom 3px solid transparent
            position absolute
            top calc(50% - 2px)
            left 9px
      &:first-child h4
        margin-top 0
        padding-top 0
        border-top 0

@media (max-width: $MQMobile)
  .dropdown-wrapper
    &.open .dropdown-title
      margin-bottom 0.5rem
    .nav-dropdown
      transition height .1s ease-out
      overflow hidden
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
    width 9.5rem
    &:hover .nav-dropdown
      // override the inline style.
      display flex !important
      flex-direction column
    .dropdown-title .arrow
      // make the arrow always down at desktop
      border-left 4px solid transparent
      border-right 4px solid transparent
      border-top 6px solid $arrowBgColor
      border-bottom 0
    .nav-dropdown
      // Avoid height shaked by clicking
      height auto !important
      box-sizing border-box;
      max-height calc(100vh - 2.7rem)
      overflow-y auto
      top 100%
      right 0
      padding 0.6rem 0
      border 1px dotted $textColor
      border-radius 1rem
      text-align left
      white-space nowrap
      margin 0
      margin-top 8px
      background-color $white

.languages-dropdown-item
  line-height 1.7rem
.languages-link
    padding 0 1.5rem 0 1.25rem

@media (min-width: $breakM)
  #wrapper.dark-mode
    .nav-dropdown
      background-color $lightBorderColorDark
    .nav-dropdown
      .dropdown-item
        a
          &.router-link-active
            &::after
              border-left 5px solid $accentColorDark
</style>
