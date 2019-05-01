<template>
  <div class="hero relative content-block">
    <img class="hide-dark" width="946" height="auto" src="../images/hero.jpg" />
    <img class="show-dark" width="946" height="auto" src="../images/hero-dark.jpg" />

    <div class="hero-block beginners sm-hide">
      <router-link class="block header" to="/beginners/">→ Beginners</router-link>
      <div class="content"><router-link class="text-color" to="/beginners/">Completely new<br/>to Ethereum?</router-link></div>
    </div>

    <div class="hero-block learn sm-hide">
      <router-link class="block header" to="/learn/">→ Learn</router-link>
      <div class="content"><router-link class="text-color" to="/learn/">Want to dig in and learn<br/>more about Ethereum?</router-link></div>
    </div>

    <div class="hero-block use sm-hide">
      <router-link class="block header" to="/use/">→ Use</router-link>
      <div class="content"><router-link class="text-color" to="/use/">Want to start<br/>using Ethereum?</router-link></div>
    </div>

    <div class="hero-block build sm-hide">
      <router-link class="block header" to="/build/">→ Build</router-link>
      <div class="content"><router-link class="text-color" to="/build/">Looking to build<br/>on Ethereum?</router-link></div>
    </div>
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
