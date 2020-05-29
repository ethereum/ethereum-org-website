// Do not use classes in this file // Pass classes into this via NavLinks.vue
<template>
  <router-link
    ref="el"
    :to="link"
    :class="childClass"
    v-if="!isExternal(link)"
    :exact="exact"
    @click.native="$emit('nav-toggle', false)"
    >{{ item.text }}</router-link
  >
  <a
    v-else-if="!item.hideMobile"
    :href="link"
    :class="childClass + ' nav-link hide-icon'"
    @click="$emit('nav-toggle', false)"
    :target="isMailto(link) || isTel(link) ? null : '_blank'"
    :rel="isMailto(link) || isTel(link) ? null : 'noopener noreferrer'"
  >
    {{ item.text }}
    <OutboundLink />
  </a>
</template>

<script>
import { isExternal, isMailto, isTel, ensureExt } from '../utils/util'

export default {
  props: {
    item: {
      required: true
    },
    childClass: {
      type: String,
      required: false
    },
    closeMenu: {
      type: Function
    }
  },
  computed: {
    link() {
      return ensureExt(this.item.link)
    },
    exact() {
      if (this.$site.locales) {
        return Object.keys(this.$site.locales).some(rootLink => {
          return rootLink === this.link
        })
      }
      return this.link === '/'
    }
  },

  methods: {
    isExternal,
    isMailto,
    isTel
  }
}
</script>
