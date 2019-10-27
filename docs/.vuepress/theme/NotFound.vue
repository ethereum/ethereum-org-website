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
  </div>
</template>

<script src="./theme.js" lang="javascript"></script>

<style src="./styles/theme.styl" lang="stylus"></style>
