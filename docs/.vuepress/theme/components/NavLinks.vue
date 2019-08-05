<template>
  <nav class="nav-links" v-if="userLinks.length">
    <ul class="nav-ul">
      <li class="nav-item" v-for="item in userLinks" :key="item.link">
        <!-- <DropdownLink v-if="item.type === 'links'" :item="item" /> -->
        <NavLink :item="item" />
      </li>
    </ul>
  </nav>
</template>

<script>
import { isActive, resolveNavLinkItem, getLanguagePath } from "../util";
import NavLink from "./NavLink.vue";
// import DropdownLink from "./DropdownLink.vue";

export default {
  components: { NavLink /*, DropdownLink */ },
  computed: {
    nav() {
      const languagePath = getLanguagePath(this.$lang);
      return this.$site.locales[languagePath].nav || [];
    },
    userLinks() {
      return (this.nav || []).map(link => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem)
        });
      });
    }
  },
  methods: {
    isActive
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
