<template>
  <div class="sidebar-button">
    <a href="#" @click="$emit('toggle-sidebar')" class="flex nav-link">
      <icon name="menu" :isDarkMode="isDarkMode" />
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

<script>
export default {
  name: 'SidebarButton',
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/config.styl'

.sidebar-button
  display none
  margin-left: -0.4em
  svg
    cursor: pointer
    margin-right 1em
    path
      fill: $black

.dark-mode .sidebar-button path
    fill: $white

@media (max-width $breakS)
  .sidebar-button
    display flex
    align-items center
</style>
