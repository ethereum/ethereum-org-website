<template>
  <DropdownLink :item="languages"/>
</template>

<script>
import DropdownLink from "./DropdownLink.vue";
import { translate } from "../utils/translations";

export default {
  components: { DropdownLink },
  computed: {
    languages() {
      const { locales } = this.$site;
      const currentLink = this.$page.path;
      const routes = this.$router.options.routes;
      const languageDropdown = {
        text: "Languages",
        items: Object.keys(locales).map(path => {
          const locale = locales[path];
          const text = locale.label
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
