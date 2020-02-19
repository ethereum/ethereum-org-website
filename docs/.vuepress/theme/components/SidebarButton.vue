<template>
  <div class="sidebar-button">
    <a href="#" @click="$emit('toggle-sidebar')" class="flex">
      <icon name="menu" />
    </a>
    <router-link :to="$localePath" class="home-link">
      <span
        ref="siteName"
        class="site-name"
        v-if="$siteTitle"
        :class="{ 'can-hide': $site.themeConfig.logo }"
        >{{ $siteTitle }}</span
      >
    </router-link>
  </div>
</template>

<style lang="stylus">
@import '../styles/config.styl'

.sidebar-button
  display none
  margin-left: -0.4em

  svg
    cursor: pointer
    margin-right 1em
    path
      fill $textColor

@media (max-width $breakS)
  .sidebar-button
    display flex
    align-items center
</style>
