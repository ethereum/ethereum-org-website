<template>
  <div class="list-new max-w-m">
    <template v-for="(item, i) in items">
      <router-link
        v-if="!isExternal(ensureExt(item.link))"
        :to="item.link"
        :aria-label="item.title"
        class="tc-text500 pa-1 block w-100 hide-icon"
      >
        <article :class="{ 'has-meta': item.meta }">
          <!-- h3 is overridden by the level prop. Default is 3 (h3) -->
          <h3 class="l7 mb-0 mt-0 tc-text500 art-title" :is="itemTitleTag">
            {{ item.title }}
          </h3>
          <p v-if="item.subtitle" class="l7 mb-0 mt-0 tc-text100 art-subtitle">
            {{ item.subtitle }}
          </p>
          <p
            v-if="item.meta"
            class="l7 mb-0 mt-0 tc-text100 art-meta flex flex-center"
          >
            {{ item.meta }}
          </p>
        </article>
      </router-link>
      <a
        v-else
        :href="item.link"
        :aria-label="item.title + ' by ' + item.meta"
        class="tc-text500 pa-1 block w-100 hide-icon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <article :class="{ 'has-meta': item.meta }">
          <!-- h3 is overridden by the level prop. Default is 3 (h3) -->
          <h3 class="l7 mb-0 mt-0 tc-text500 art-title" :is="itemTitleTag">
            {{ item.title }}
          </h3>
          <p v-if="item.subtitle" class="l7 mb-0 mt-0 tc-text100 art-subtitle">
            {{ item.subtitle }}
          </p>
          <p
            v-if="item.meta"
            class="l7 mb-0 mt-0 tc-text100 art-meta flex flex-center"
          >
            {{ item.meta }}
          </p>
        </article>
      </a>
    </template>
  </div>
</template>

<script>
import { isExternal, ensureExt } from '../theme/utils/util'

export default {
  name: 'list-card',
  props: {
    level: {
      required: false,
      default: 3
    },
    items: {
      required: false,
      default: []
    }
  },
  computed: {
    link(href) {
      return ensureExt(href)
    },
    itemTitleTag() {
      return 'h' + this.level
    }
  },
  methods: {
    isExternal,
    ensureExt
  }
}
</script>

<style lang="stylus">
@import '../theme/styles/config.styl';

.list-new
  counter-reset i
  position relative
  article
    display grid
    grid-template-columns auto 1fr auto
    grid-column-gap 1rem
    &:before, &:after
      grid-row 1/99
    &:before
      grid-column 1
      counter-increment: i
      content: counters(i, ".")" ";
    .art-title
      grid-row 1
    .art-subtitle
      grid-row 2
    .art-meta
      grid-row 3
    &:after
      display flex
      align-items center
      grid-column 3
      content '↗️'

    @media (min-width: $breakL)
      &.has-meta
        grid-template-columns auto 3fr 1fr auto
        .art-title
          grid-row 1
        .art-subtitle
          grid-row 2
        .art-meta
          grid-column 3
          grid-row 1/999
        &:after
          grid-column 4
          content '↗️'

.list-new
  box-shadow 0px 14px 66px rgba(0, 0, 0, 0.07), 0px 10px 17px rgba(0, 0, 0, 0.03), 0px 4px 7px rgba(0, 0, 0, 0.05)
  a
    background $white
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
    margin-bottom 1px
    &:hover
      border-radius 4px
      box-shadow: 0 0 1px $colorPrimary500
      background alpha($colorPrimary500, 0.025)
    article
      &:before
        opacity .4
      &:after
        color $colorPrimary500

.dark-mode
  .list-new
    box-shadow 0px 14px 66px rgba(245, 245, 245, 0.07), 0px 10px 17px rgba(245, 245, 245, 0.03), 0px 4px 7px rgba(245, 245, 245, 0.05)
    a
      background $colorBlack400
      box-shadow 0px 1px 1px rgba(255, 255, 255, 0.1);
      &:hover
        border-radius 4px
        box-shadow: 0 0 1px $colorPrimaryDark500
        background alpha($colorPrimaryDark500, 0.0125)
      article
        &:after
          color $colorPrimaryDark500
</style>
