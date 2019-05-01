<template>
  <div class="sidebar-button">
    <svg @click="$emit('toggle-sidebar')" class="icon" width="25px" height="20px" viewBox="0 0 25 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img">
      <title>Hamburger menu button</title>
      <g transform="translate(-22.000000, -2.000000)">
        <g transform="translate(22.000000, 2.545974)">
          <path d="M24.7714844,0.5 L0,0.5"></path>
          <path d="M24.7714844,9.72701303 L0,9.72701303"></path>
          <path d="M24.7714844,18.9540261 L0,18.9540261"></path>
        </g>
      </g>
    </svg>
    <router-link
      :to="$localePath"
      class="home-link"
    >
      <span
        ref="siteName"
        class="site-name"
        v-if="$siteTitle"
        :class="{ 'can-hide': $site.themeConfig.logo }"
      >{{ $siteTitle }}</span>
    </router-link>
  </div>
</template>

<style lang="stylus">
@import '../styles/config.styl'

.sidebar-button
  display none
  height 1.25rem
  position absolute
  top 1.25em
  left 1.5em
  svg
    stroke $textColor
  .icon
    display inline-block
    margin-right 1em
    cursor pointer

@media (max-width $breakS)
  .sidebar-button
    display flex
    align-items center
</style>
