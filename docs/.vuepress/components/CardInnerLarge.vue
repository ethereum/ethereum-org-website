<template>
  <!-- Check if header -->
  <div
    :class="{
      'card tc-text500 pa-15 m-up-pa-25 block w-100 flex': true,
      'flex-column': !leftimg,
      'has-shadow curved-border': !flat,
      flat: flat,
      'has-hover': clickable
    }"
  >
    <div
      v-if="header"
      :class="{ 'header l1 mt-0 mb-1': true, hero: hero }"
      v-bind:style="{ backgroundImage: `url(${header})` }"
    />

    <div class="flex flex-column flex-1 l7 max-w-45ch">
      <h3
        :is="itemTitleTag"
        class="l2 mb-05 mt-0 tc-text500"
        v-html="inlineMd(title)"
      />
      <p
        class="l7 mt-0 tc-text200 art-meta flex flex-center"
        v-html="inlineMd(content)"
      />

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
          <Button
            v-if="link.button"
            :to="link.to"
            class="inline-block"
            v-html="inlineMd(link.text)"
          />
          <a
            v-else-if="isExternal(link.to)"
            :href="link.to"
            target="_blank"
            rel="noopener noreferrer"
            class="mb-05 inline-block"
            v-html="inlineMd(link.text)"
          />
          <router-link
            v-else
            :to="link.to"
            class="mb-05 inline-block"
            v-html="inlineMd(link.text)"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { isExternal, ensureExt } from '../theme/utils/util'
const { inlineMd } = require('../theme/utils/inline-md')

export default {
  name: 'CardInnerLarge',
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
    flat: {
      required: false,
      type: Boolean
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
    itemTitleTag() {
      return 'h' + this.level
    },
    cardTag() {
      tag = false(this.link && isExternal(this.link.to)) && (tag = 'a')
      !this.clickable && (tag = 'div')
      return tag
    }
  },
  methods: {
    inlineMd,
    isExternal,
    ensureExt
  }
}
</script>

<style lang="stylus" scoped>
@import '../theme/styles/config.styl';

.header
  background-size contain
  background-repeat no-repeat
  width 100%
  padding-bottom 50%
  margin-right 1rem
  &.hero
    width auto
    height auto
    padding-top 60%
    margin-top -2.5rem
    margin-left -2.5rem
    margin-right -2.5rem

  @media (min-width: $breakS)
    padding-bottom 30%


.card
  overflow hidden
  background $white
  transition all 0.2s ease-in-out
  &.curved-border
    border-radius 0.5rem
  &.flat
    background-color $colorWhite600
  &.has-shadow
    box-shadow 0px 14px 66px rgba(0, 0, 0, 0.07), 0px 10px 17px rgba(0, 0, 0, 0.03), 0px 4px 7px rgba(0, 0, 0, 0.05)
    &.has-hover:hover
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
    background $colorBlack400
    &.has-shadow
      box-shadow 0px 14px 66px rgba(245, 245, 245, 0.07), 0px 10px 17px rgba(245, 245, 245, 0.03), 0px 4px 7px rgba(245, 245, 245, 0.05)
      &.has-hover:hover
        border-radius 4px
        box-shadow 0px 14px 66px rgba(245, 245, 245, 0.07), 0px 10px 17px rgba(245, 245, 245, 0.03), 0px 4px 7px rgba(245, 245, 245, 0.05), 0 0 1px $colorPrimaryDark500
        background alpha($colorPrimaryDark500, 0.0125)
    article
      &:after
        color $colorPrimaryDark500
</style>
