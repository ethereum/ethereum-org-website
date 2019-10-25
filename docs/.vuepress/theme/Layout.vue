<template>
  <div id="wrapper" :class="pageClasses">
    <Header :class="{ 'home': isLanding }" @toggle-sidebar="toggleSidebar" @toggle-mode="toggleMode" />
    <Hero v-if="isLanding" :dark="darkMode" />
    <main :class="contentClasses"><Content/></main>
    <Sidebar :items="sidebarItems" @close-sidebar="closeSidebar" />
    <Footer :class="{ 'home': isLanding }" />

    <a href="https://hackernoon.com/rethinking-the-identity-of-ethereumorg-l718w347l" target="_blank">
      <button v-if="isLanding" class="announcement">
        {{linkText}} <span class="accent">{{linkTextMore}}</span>
      </button>

    </a>
  </div>
</template>

<script src="./theme.js" lang="javascript"></script>

<style lang="stylus" scoped>
  @require './styles/config'

  #wrapper.sidebar-open
    button
      z-index 0

  button.announcement
    position fixed
    bottom 2em
    right 3em
    border-radius 25px
    padding 1em 2em

</style>

<style src="./styles/theme.styl" lang="stylus"></style>
