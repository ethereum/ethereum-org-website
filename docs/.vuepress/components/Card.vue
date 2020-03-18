<template>
  <a v-if="isExternal && clickable" :href="getLink" class="hide-icon flex">
    <CardInner
      :level="level"
      :hero="hero"
      :header="header"
      :leftimg="leftimg"
      :title="title"
      :content="content"
      :link="link"
      :button="button"
    />
  </a>

  <router-link
    v-else-if="getLink.length && !Array.isArray(this.button) && clickable"
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
      :button="button"
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
      :button="button"
    />
  </div>
</template>

<script>
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
      type: Object
    },
    button: {
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
    isExternal() {
      if (this.link && this.link.external) {
        return true
      } else if (this.button && this.button.external) {
        return true
      } else {
        return false
      }
    },
    getLink() {
      return this.link
        ? this.link.to
        : this.button &&
            (Array.isArray(this.button) ? this.button[0].to : this.button.to)
    }
  }
}
</script>
