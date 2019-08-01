<template>
  <div class="hero relative content-block center">
      <video class="mx-auto hide-dark inline-block" alt="Ethereum.org - Light" width="380" height="380" src="../video/ethwhite-optimized.mp4" autoplay loop muted />
      <video class="mx-auto show-dark inline-block" alt="Ethereum.org - Dark" width="380" height="380" src="../video/ethdark-optimized.mp4" autoplay loop muted />
  </div>
</template>

<style lang="stylus" scoped>
  @require '../styles/config'

  .hero
    padding 2em
    max-width 60vw

    img
      max-width 100%
      height auto !important
      margin 0 auto
      display block

  .hero-block
    position absolute

    .header
      position absolute
      margin-left: -1.1em
    .content
      padding-top $lhRegular

    &.beginners
      top 6em
      left 8.5em

    &.learn
      top 9em
      right 2.5em

    &.use
      top 18em
      left 0.5em

    &.build
      top 22em
      right 7.5em

  @media screen and (max-width $breakL)
    .hero
      margin-top 1em
      max-width 70vw

    .hero-block
      &.beginners
        top 4em
        left 3.5em

      &.learn
        top 6em
        right 0em

      &.use
        top 14em
        left 0.5em

      &.build
        top 17em
        right 3.5em

  @media screen and (max-width $breakS)
    .hero
      max-width 90vw

</style>
