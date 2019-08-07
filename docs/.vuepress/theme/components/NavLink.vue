<template>
  <router-link class="nav-link" :to="link" v-if="!isExternal(link)" :exact="exact">{{ item.text }}</router-link>
  <a
    v-else
    :href="link"
    class="nav-link external"
    :target="isMailto(link) || isTel(link) ? null : '_blank'"
    :rel="isMailto(link) || isTel(link) ? null : 'noopener noreferrer'"
  >
    {{ item.text }}
    <OutboundLink />
  </a>
</template>

<script>
import { isExternal, isMailto, isTel, ensureExt } from "../utils/util";

export default {
  props: {
    item: {
      required: true
    }
  },

  computed: {
    link() {
      return ensureExt(this.item.link);
    },

    exact() {
      if (this.$site.locales) {
        return Object.keys(this.$site.locales).some(rootLink => {
          return rootLink === this.link;
        });
      }
      return this.link === "/";
    }
  },

  methods: {
    isExternal,
    isMailto,
    isTel
  }
};
</script>

<style lang="stylus">
@import '../styles/config.styl';

.nav-link
  display block
  color $subduedColor

  &:hover, &.router-link-active
    color $accentColor

</style>

