<template>
  <a
    v-if="isExternal && clickable"
    :href="getLink"
    target="_blank"
    rel="noopener noreferrer"
    class="hide-icon flex"
  >
    <CardInner
      :level="level"
      :hero="hero"
      :header="header"
      :leftimg="leftimg"
      :title="title"
      :content="content"
      :link="link"
    />
  </a>

  <router-link
    v-else-if="getLink && clickable"
    :to="getLink"
    class="hide-icon flex"
  >
    <CardInner
      :level="level"
      :hero="hero"
      :header="header"
      :leftimg="leftimg"
      :title="title"
      :content="content"
      :link="link"
    />
  </router-link>

  <div v-else class="flex">
    <CardInner
      :level="level"
      :hero="hero"
      :header="header"
      :leftimg="leftimg"
      :title="title"
      :content="content"
      :link="link"
    />
  </div>
</template>

<script>
import { isExternal, ensureExt } from '../theme/utils/util'

export default {
  name: 'Card',
  props: {
    level: {
      required: false,
      default: 3
    },
    hero: {
      required: false,
      type: Boolean
    },
    header: {
      required: false,
      type: String
    },
    leftimg: {
      required: false,
      type: Boolean
    },
    title: {
      required: true,
      type: String
    },
    content: {
      required: true,
      type: String
    },
    link: {
      required: false,
      type: [Object, Array]
    },
    clickable: {
      required: false,
      type: Boolean,
      default: true
    }
  },
  computed: {
    getLink() {
      return this.link && !Array.isArray(this.link) && ensureExt(this.link.to)
    }
  },
  methods: {
    isExternal
  }
}
</script>
