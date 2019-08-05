<template>
  <!-- TODO hover styles on list items -->
  <DropdownLink :item="languages" />
</template>

<script>
import DropdownLink from "./DropdownLink.vue";

export default {
  components: { DropdownLink },
  computed: {
    languages() {
      const { locales } = this.$site;
      const currentLink = this.$page.path;
      const routes = this.$router.options.routes;
      const themeLocales = this.$site.themeConfig.locales || {};
      const languageDropdown = {
        text: this.$themeLocaleConfig.selectText || "Languages",
        items: Object.keys(locales).map(path => {
          const locale = locales[path];
          const text = locale.label;
          let link;
          // Stay on the current page
          if (locale.lang === this.$lang) {
            link = currentLink;
          } else {
            // Try to stay on the same page
            link = currentLink.replace(this.$localeConfig.path, path);
            // fallback to homepage
            if (!routes.some(route => route.path === link)) {
              link = path;
            }
          }
          return { text, link };
        })
      };
      return languageDropdown;
    }
  }
};
</script>

<style lang="stylus">
@import '../styles/config.styl';

.nav-ul {
  margin: 0;

  & > li {
    color: $subduedColor;
    margin-right: 1em;
  }
}

.nav-links {
  display: inline-block;
  vertical-align: top;

  a {
    display: block;
    color: inherit;

    &:hover, &.router-link-active {
      color: $accentColor;
    }
  }

  .nav-item {
    cursor: pointer;
    position: relative;
    font-weight: 500;
  }
}

@media (max-width: $MQMobile) {
  .nav-links {
    .nav-item {
      margin-left: 0;
    }
  }
}

@media (min-width: $MQMobile) {
  .nav-links {
    a {
      &:hover, &.router-link-active {
        color: $accentColor;
      }
    }
  }
}
</style>
