<template>
  <div id="wrapper" :class="pageClasses">
    <Header :class="{ 'home': isLanding }" @toggle-sidebar="toggleSidebar" @toggle-mode="toggleMode" />
    <Hero v-if="isLanding" :dark="darkMode" />
    <main :class="contentClasses">
      <h1>Not Found</h1>
      Please use the search box above to find what you're looking for or <router-link to="/">return home</router-link>.
    </main>
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

<style src="./styles/theme.styl" lang="stylus"></style>
