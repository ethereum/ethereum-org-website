<template>
  <!-- <h1>Test</h1> -->
  <router-link v-if="isRouter" :to="to" :class="buttonClasses">
    <slot />
  </router-link>
  <a href v-else-if="isA" :class="buttonClasses" :target="target" :rel="rel">
    <slot />
  </a>
</template>

<script>
export default {
  name: 'Button',
  props: {
    isA: {
      type: Boolean,
      default: true
    },
    isRouter: {
      type: Boolean,
      default: false
    },
    isButton: {
      type: Boolean,
      default: false
    },
    to: {
      type: String
    },
    newTab: {
      type: Boolean,
      default: false
    },
    primary: {
      type: Boolean,
      default: true
    },
    secondary: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    buttonClasses() {
      if (this.secondary) {
        return 'button secondary'
      } else {
        return 'button primary'
      }
    },
    target() {
      return this.newTab && '_blank'
    },
    rel() {
      return this.newTab && 'noopener noreferrer'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../theme/styles/config.styl';

  .button
    font-size 1rem
    border-radius .25em
    padding .5em .75em
    text-align: center;

  .primary
    color $white
    background-color $accentColor
    border: 1px solid transparent

    &:hover
      background-color alpha($accentColor, 0.8)

    &:focus
      box-shadow 0 0 0 1px $white, 0 0 0 3px $accentColor
      outline: none;

  .secondary
    color $accentColor
    background-color: $white
    border: 1px solid $subduedColor

    &:hover
      background-color $subduedColor

    &:focus
      box-shadow 0 0 0 1px $white, 0 0 0 3px $subduedColor
      outline: none;

  .dark-mode

    .primary
      color $white
      background-color $accentColorDark

      &:hover
        color $white
        background-color alpha($accentColorDark, 0.8)

      &:focus
        box-shadow 0 0 0 1px $black, 0 0 0 3px $accentColorDark
        outline: none;

    .secondary
      color $white
      background-color: $bgDark

      &:hover
        border-color $white
        background-color $black

      &:focus
        // border-color $accentColorDark
        box-shadow 0 0 0 1px $bgDark, 0 0 0 3px $white
</style>
