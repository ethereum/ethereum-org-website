<template>
  <!-- Check if header -->
  <div
    :class="{
      'card tc-text500 pa-1 block w-100 flex': true,
      'flex-column': !leftimg
    }"
  >
    <template v-if="header">
      <!-- Emoji header -->
      <div v-if="isEmoji" class="header l1 mt-0 mb-1 mr-1">
        {{ header }}
      </div>
      <!-- Image header -->
      <div
        v-else
        :class="{ 'header l1 mt-0 mb-1': true, hero: hero }"
        v-bind:style="{ backgroundImage: `url(${header})` }"
      />
    </template>

    <div class="flex flex-column flex-1">
      <h3 :is="itemTitleTag" class="l4 mb-05 mt-0 tc-text500">
        {{ title }}
      </h3>
      <p class="l7 mb-1 mt-0 tc-text100 art-meta flex flex-center">
        {{ content }}
      </p>

      <div v-if="link" class="mt-auto mb-0">
        <template v-if="Array.isArray(link)">
          <Button :to="link[0].to" class="inline-block">{{
            link[0].text
          }}</Button>
          <Button
            secondary
            v-if="link[1]"
            :to="link[1].to"
            class="inline-block ml-05"
            >{{ link[1].text }}</Button
          >
        </template>
        <template v-else-if="link.text">
          <Button v-if="link.button" :to="link.to" class="inline-block">{{
            link.text
          }}</Button>
          <a
            v-else-if="isExternal(link.to)"
            :href="link.to"
            target="_blank"
            rel="noopener noreferrer"
            class="mb-05 inline-block"
            >{{ link.text }}</a
          >
          <router-link v-else :to="link.to" class="mb-05 inline-block">
            {{ link.text }}
          </router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { isExternal, ensureExt } from '../theme/utils/util'

export default {
  name: 'CardInner',
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
    }
  },
  computed: {
    itemTitleTag() {
      return 'h' + this.level
    },
    isEmoji() {
      var emojiExp = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
      var t = this.header.match(emojiExp)
      return t && t.length
    },
    cardTag() {
      tag = false(this.link && isExternal(this.link.to)) && (tag = 'a')
      !this.clickable && (tag = 'div')
      return tag
    }
  },
  methods: {
    isExternal,
    ensureExt
  }
}
</script>

<style lang="stylus" scoped>
@import '../theme/styles/config.styl';

.header
  background-size cover
  width 57px
  height 57px
  min-width 57px
  min-height 57px
  margin-right: 1rem
  &.hero
    width auto
    height auto
    padding-top 60%
    margin-top -1rem
    margin-left -1rem
    margin-right -1rem

.card
  border-radius 0.5rem
  overflow hidden
  box-shadow 0px 14px 66px rgba(0, 0, 0, 0.07), 0px 10px 17px rgba(0, 0, 0, 0.03), 0px 4px 7px rgba(0, 0, 0, 0.05)
  background $white
  transition all 0.2s ease-in-out
  &:hover
    border-radius 4px
    box-shadow: 0px 14px 66px rgba(0, 0, 0, 0.07), 0px 10px 17px rgba(0, 0, 0, 0.03), 0px 4px 7px rgba(0, 0, 0, 0.05), 0 0 1px $colorPrimary500
    background alpha($colorPrimary500, 0.025)
  article
    &:before
      opacity .4
    &:after
      color $colorPrimary500
.dark-mode
  .card
    box-shadow 0px 14px 66px rgba(245, 245, 245, 0.07), 0px 10px 17px rgba(245, 245, 245, 0.03), 0px 4px 7px rgba(245, 245, 245, 0.05)
    background $colorBlack400
    &:hover
      border-radius 4px
      box-shadow 0px 14px 66px rgba(245, 245, 245, 0.07), 0px 10px 17px rgba(245, 245, 245, 0.03), 0px 4px 7px rgba(245, 245, 245, 0.05), 0 0 1px $colorPrimaryDark500
      background alpha($colorPrimaryDark500, 0.0125)
    article
      &:after
        color $colorPrimaryDark500
</style>
