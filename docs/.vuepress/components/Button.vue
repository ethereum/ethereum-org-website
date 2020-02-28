<template>
  <a
    href
    v-if="isExternal"
    :href="to"
    :class="buttonClasses"
    target="_blank"
    rel="noopener noreferrer"
  >
    <slot />
  </a>
  <router-link v-else :to="to" :class="buttonClasses">
    <slot />
  </router-link>
</template>

<script>
export default {
  name: 'Button',
  props: {
    isExternal: {
      type: Boolean,
      default: false
    },
    to: {
      type: String,
      required: true
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
    color $colorWhite500
    background-color $colorPrimary
    border: 1px solid transparent

    &:hover
      background-color alpha($colorPrimary, 0.8)

    &:focus
      box-shadow 0 0 0 1px $colorWhite500, 0 0 0 3px $colorPrimary
      outline: none;

  .secondary
    color $textColor
    background-color: $colorWhite500
    border: 1px solid $subduedColor

    &:hover
      background-color $subduedColor

    &:focus
      box-shadow 0 0 0 1px $colorWhite500, 0 0 0 3px $subduedColor
      outline: none;

  .dark-mode

    .primary
      color $colorWhite500
      background-color $colorPrimaryDark

      &:hover
        color $colorWhite500
        background-color alpha($colorPrimaryDark, 0.8)

      &:focus
        box-shadow 0 0 0 1px $black, 0 0 0 3px $colorPrimaryDark
        outline: none;

    .secondary
      color $colorWhite500
      background-color: $colorBgDark

      &:hover
        border-color $colorWhite500
        background-color $black

      &:focus
        box-shadow 0 0 0 1px $colorBgDark, 0 0 0 3px $colorPrimaryDark
</style>
