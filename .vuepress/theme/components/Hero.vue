<template>
  <div class="hero relative content-block">
    <img class="hide-dark" src="../images/hero.png" />
    <img class="show-dark" src="../images/hero-dark.png" />

    <div class="hero-block beginners sm-hide">
      <a class="block header" href="/beginners/">→ Beginners</a>
      <div class="content">Completely New<br/>to Ethereum?</div>
    </div>

    <div class="hero-block learn sm-hide">
      <a class="block header" href="/learn/">→ Learn</a>
      <div class="content">Want to dig in and learn<br/>more about Ethereum?</div>
    </div>

    <div class="hero-block use sm-hide">
      <a class="block header" href="/use/">→ Use</a>
      <div class="content">Want to start<br/>using Ethereum?</div>
    </div>

    <div class="hero-block build sm-hide">
      <a class="block header" href="/build/">→ Build</a>
      <div class="content">Looking to build<br/>on Ethereum?</div>
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
