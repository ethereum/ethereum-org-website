<template>
  <div>
    <div class="headline-text-container">
      <h1 class="headline-title">{{ translateString('page-home-title') }}</h1>
      <div class="headline-subtitle">
        {{ translateString('page-home-subtitle') }}
      </div>
      <router-link
        :to="langPath() + 'what-is-ethereum/'"
        class="button headline-button"
        >{{ translateString('learn-more') }}</router-link
      >
    </div>

    <div class="intro-blocks">
      <div class="intro-block" v-if="contentVersion >= 1.1">
        <h3 class="header">
          <span class="arrow">→</span
          >{{ translateString('page-home-section-individuals-title') }}
        </h3>
        <ul>
          <li class="highlight highlight-small">
            <router-link :to="langPath() + 'what-is-ethereum/'" class="black">
              {{ translateString('page-home-section-individuals-item-one') }}
            </router-link>
          </li>
          <li>
            <router-link :to="langPath() + 'dapps/'" class="black">
              {{ translateString('page-home-section-individuals-item-two') }}
            </router-link>
          </li>
          <li>
            <router-link :to="langPath() + 'learn/'" class="black">
              {{ translateString('page-home-section-individuals-item-three') }}
            </router-link>
          </li>
          <li v-if="contentVersion > 1.1">
            <router-link :to="langPath() + 'community/'" class="black">
              {{ translateString('page-community') }}
            </router-link>
          </li>
        </ul>
      </div>

      <div class="intro-block-content-version-1" v-if="contentVersion < 1.1">
        <h3>
          <router-link :to="langPath() + 'what-is-ethereum/'">
            <span class="arrow">→</span
            >{{ translateString('page-home-section-beginners-title') }}
          </router-link>
        </h3>
        <ul>
          <li class="highlight">
            <router-link :to="langPath() + 'what-is-ethereum/'" class="black">
              {{ translateString('page-home-section-beginners-item-one') }}
            </router-link>
          </li>
          <li>
            <router-link :to="langPath() + 'what-is-ethereum/'" class="black">
              {{ translateString('page-home-section-beginners-item-two') }}
            </router-link>
          </li>
          <li>
            <router-link :to="langPath() + 'what-is-ethereum/'" class="black">
              {{ translateString('page-home-section-beginners-item-three') }}
            </router-link>
          </li>
        </ul>
      </div>

      <div class="intro-block-content-version-1" v-if="contentVersion < 1.1">
        <h3>
          <router-link :to="langPath() + 'use/'">
            <span class="arrow">→</span
            >{{ translateString('page-home-section-use-title') }}
          </router-link>
        </h3>
        <ul>
          <li>
            <router-link
              :to="langPath() + 'use/#1-use-an-application-built-on-ethereum'"
              class="black"
            >
              {{ translateString('page-home-section-use-item-one') }}
            </router-link>
          </li>
          <li>
            <router-link
              :to="langPath() + 'use/#2-what-is-eth-and-how-do-i-get-it'"
              class="black"
            >
              {{ translateString('page-home-section-use-item-two') }}
            </router-link>
          </li>
          <li>
            <router-link
              :to="
                langPath() +
                  'use/#3-what-is-a-wallet-and-which-one-should-i-use'
              "
              class="black"
            >
              {{ translateString('page-home-section-use-item-three') }}
            </router-link>
          </li>
        </ul>
      </div>

      <div class="intro-block-content-version-1" v-if="contentVersion < 1.1">
        <h3>
          <router-link :to="langPath() + 'learn/'">
            <span class="arrow">→</span
            >{{ translateString('page-home-section-learn-title') }}
          </router-link>
        </h3>
        <ul>
          <li>
            <router-link
              :to="langPath() + 'learn/#ethereum-basics'"
              class="black"
            >
              {{ translateString('page-home-section-learn-item-one') }}
            </router-link>
          </li>
          <li>
            <router-link
              :to="langPath() + 'learn/#how-ethereum-works'"
              class="black"
            >
              {{ translateString('page-home-section-learn-item-two') }}
            </router-link>
          </li>
          <li>
            <router-link :to="langPath() + 'learn/#eth-2-0'" class="black">
              {{ translateString('page-home-section-learn-item-three') }}
            </router-link>
          </li>
        </ul>
      </div>

      <div
        v-bind:class="{
          'intro-block': contentVersion >= 1.1,
          'intro-block-content-version-1': contentVersion < 1.1
        }"
      >
        <h3>
          <router-link :to="langPath() + 'developers/'">
            <span class="arrow">→</span
            >{{ translateString('page-home-section-developers-title') }}
          </router-link>
        </h3>
        <ul>
          <li v-if="contentVersion < 1.1">
            <router-link
              :to="langPath() + 'developers/#getting-started'"
              class="black"
            >
              {{ translateString('page-home-section-developers-item-one') }}
            </router-link>
          </li>
          <li v-if="contentVersion >= 1.05">
            <router-link :to="langPath() + 'build/'" class="black">
              {{ translateString('page-home-section-developers-item-one') }}
            </router-link>
          </li>
          <li>
            <router-link
              :to="langPath() + 'developers/#smart-contract-languages'"
              class="black"
            >
              {{ translateString('page-home-section-developers-item-two') }}
            </router-link>
          </li>
          <li>
            <router-link
              :to="langPath() + 'developers/#developer-tools'"
              class="black"
            >
              {{ translateString('page-home-section-developers-item-three') }}
            </router-link>
          </li>
        </ul>
      </div>

      <div class="intro-block" v-if="contentVersion >= 1.1">
        <h3>
          <router-link :to="langPath() + 'enterprise/'">
            <span class="arrow">→</span
            >{{ translateString('page-home-section-enterprise-title') }}
          </router-link>
        </h3>
        <ul>
          <li>
            <router-link
              :to="langPath() + 'enterprise/#why-enterprise-ethereum'"
              class="black"
            >
              {{ translateString('page-home-section-enterprise-item-one') }}
            </router-link>
          </li>
          <li>
            <router-link
              :to="langPath() + 'enterprise/#enterprise-features'"
              class="black"
            >
              {{ translateString('page-home-section-enterprise-item-two') }}
            </router-link>
          </li>
          <li>
            <router-link
              :to="langPath() + 'enterprise/#enterprise-developer-community'"
              class="black"
            >
              {{ translateString('page-home-section-enterprise-item-three') }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { translate } from '../theme/utils/translations'

export default {
  computed: {
    contentVersion() {
      return translate('version', this.$lang)
    }
  },
  methods: {
    translateString: function(str) {
      return translate(str, this.$lang)
    },

    langPath: function() {
      return translate('path', this.$lang)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../theme/styles/config.styl';

  h1
    font-size $fsLarge

  .headline-button
    margin-top 2rem
    font-size $fsRegular

  .header
    color $colorPrimary

.highlight-small
    background-size 240px !important

  #wrapper.dark-mode
    .header
      color $colorPrimaryDark500

.intro-blocks
  margin-top 1.5em
  display flex
  flex-wrap wrap

  .intro-block,
  .intro-block-content-version-1
    flex 1 1 29%
    padding-left 1em
    padding-right 1em
    display inline-block
    line-height $lhMedium
    margin-bottom 1em
    h3
      span.arrow
        margin-right 1.25em
    ul
      li
        color $textColor
        &.highlight
          background-image: url(../theme/images/highlight.svg)
          background-repeat no-repeat
        a
          color: $colorBlack400
          &:hover
            color: $colorPrimary500

  // TODO remove once translations are updated w/ new personas
  .intro-block-content-version-1
    flex 1 1 40%
    padding-left 2em
    padding-right 2em

.dark-mode
  .intro-blocks
    ul
      li
        a
          color $colorWhite900
          &:hover
            color $colorPrimaryDark500
        &.highlight
          background-image url(../theme/images/highlight-dark.svg)
</style>

<style lang="stylus">
// Unscoped CSS to prevent flex on homepage wrapper
.home #upper-content
  display block
</style>
