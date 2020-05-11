<template>
  <a
    v-if="isExternal && clickable"
    :href="getLink"
    target="_blank"
    rel="noopener noreferrer"
    class="hide-icon flex"
  >
    <CardInnerLarge
      v-if="large"
      :level="level"
      :hero="hero"
      :header="header"
      :headerIsEmoji="headerIsEmoji"
      :leftimg="leftimg"
      :title="title"
      :content="content"
      :link="link"
      :flat="flat"
      :clickable="clickable"
    />
    <CardInner
      v-else
      :level="level"
      :hero="hero"
      :header="header"
      :headerIsEmoji="headerIsEmoji"
      :leftimg="leftimg"
      :title="title"
      :content="content"
      :link="link"
      :flat="flat"
      :clickable="clickable"
    />
  </a>

  <router-link
    v-else-if="getLink && clickable"
    :to="getLink"
    class="hide-icon flex"
  >
    <CardInnerLarge
      v-if="large"
      :level="level"
      :hero="hero"
      :header="header"
      :leftimg="leftimg"
      :title="title"
      :content="content"
      :link="link"
      :flat="flat"
      :clickable="clickable"
    />
    <CardInner
      v-else
      :level="level"
      :hero="hero"
      :header="header"
      :leftimg="leftimg"
      :title="title"
      :content="content"
      :link="link"
      :flat="flat"
      :clickable="clickable"
    />
  </router-link>

  <div v-else class="flex">
    <CardInnerLarge
      v-if="large"
      :level="level"
      :hero="hero"
      :header="header"
      :leftimg="leftimg"
      :title="title"
      :content="content"
      :link="link"
      :flat="flat"
      :clickable="clickable"
    />
    <CardInner
      v-else
      :level="level"
      :hero="hero"
      :header="header"
      :leftimg="leftimg"
      :title="title"
      :content="content"
      :link="link"
      :flat="flat"
      :clickable="clickable"
    />
  </div>
</template>

<script>
import { isExternal, ensureExt } from '../theme/utils/util'

export default {
  name: 'Card',
  props: {
    large: {
      required: false,
      default: false,
      type: Boolean
    },
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
    headerIsEmoji: {
      required: false,
      type: Boolean,
      default: false
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
    },
    flat: {
      required: false,
      type: Boolean,
      default: false
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
