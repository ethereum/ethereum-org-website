<template>
  <div>
    <header class="center flex flex-column flex-center">
      <T h1 l3 cText s500>{{ translateString('page-home-title') }}</T>
      <T p l4 cText s300 class="subtitle">{{
        translateString('page-home-subtitle')
      }}</T>
      <Button class="headline-button" :to="langPath() + 'what-is-ethereum/'">
        {{ translateString('learn-more') }}
      </Button>
    </header>

    <section class="intro-blocks">
      <div
        v-for="block in introBlocks"
        v-if="block.display"
        class="intro-block"
      >
        <T h3 l4 cPrimary s500>
          <span class="arrow">→</span>{{ block.title }}
        </T>
        <T ul l4 cText>
          <T
            li
            v-for="item in block.items"
            :class="item.highlight && 'highlight highlight-small'"
          >
            <router-link :to="item.to" class="c-text300 c-h-primary">
              {{ item.text }}
            </router-link>
          </T>
        </T>
      </div>
    </section>
  </div>
</template>

<script>
import { translate } from '../theme/utils/translations'

export default {
  // computed: {
  //   contentVersion() {
  //     return translate('version', this.$lang)
  //   }
  // },
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      introBlocks: [
        {
          title: this.translateString('page-home-section-individuals-title'),
          display: this.contentVersion() >= 1.1,
          items: [
            {
              to: this.langPath() + 'what-is-ethereum/',
              text: this.translateString(
                'page-home-section-individuals-item-one'
              ),
              useRouter: true,
              highlight: true
            },
            {
              to: this.langPath() + 'dapps/',
              text: this.translateString(
                'page-home-section-individuals-item-two'
              ),
              useRouter: true
            },
            {
              to: this.langPath() + 'learn/',
              text: this.translateString(
                'page-home-section-individuals-item-three'
              ),
              useRouter: true
            },
            {
              to: this.langPath() + 'community/',
              text: this.translateString('page-community'),
              useRouter: true
            }
          ]
        },
        {
          title: this.translateString('page-home-section-beginners-title'),
          display: this.contentVersion() < 1.1,
          items: [
            {
              to: this.langPath() + 'what-is-ethereum/',
              text: this.translateString(
                'page-home-section-beginners-item-one'
              ),
              useRouter: true
            },
            {
              to: this.langPath() + 'what-is-ethereum/',
              text: this.translateString(
                'page-home-section-beginners-item-two'
              ),
              useRouter: true
            },
            {
              to: this.langPath() + 'what-is-ethereum/',
              text: this.translateString(
                'page-home-section-beginners-item-three'
              ),
              useRouter: true
            }
          ]
        },
        {
          title: this.translateString('page-home-section-use-title'),
          display: this.contentVersion() < 1.1,
          items: [
            {
              to:
                this.langPath() + 'use/#1-use-an-application-built-on-ethereum',
              text: this.translateString('page-home-section-use-item-one'),
              useRouter: true
            },
            {
              to: this.langPath() + 'use/#2-what-is-eth-and-how-do-i-get-it',
              text: this.translateString('page-home-section-use-item-two'),
              useRouter: true
            },
            {
              to:
                this.langPath() +
                'use/#3-what-is-a-wallet-and-which-one-should-i-use',
              text: this.translateString('page-home-section-use-item-three'),
              useRouter: true
            }
          ]
        },
        {
          title: this.translateString('page-home-section-learn-title'),
          display: this.contentVersion() < 1.1,
          items: [
            {
              to: this.langPath() + 'learn/#ethereum-basics',
              text: this.translateString('page-home-section-learn-item-one'),
              useRouter: true
            },
            {
              to: this.langPath() + 'learn/#how-ethereum-works',
              text: this.translateString('page-home-section-learn-item-two'),
              useRouter: true
            },
            {
              to: this.langPath() + 'learn/#eth-2-0',
              text: this.translateString('page-home-section-learn-item-three'),
              useRouter: true
            }
          ]
        },
        {
          title: this.translateString('page-home-section-developers-title'),
          // display for all
          display: true,
          items: [
            {
              to: this.langPath() + 'build/',
              text: this.translateString(
                'page-home-section-developers-item-one'
              ),
              useRouter: true
            },
            {
              to: this.langPath() + 'developers/#smart-contract-languages',
              text: this.translateString(
                'page-home-section-developers-item-two'
              ),
              useRouter: true
            },
            {
              to: this.langPath() + 'developers/#developer-tools',
              text: this.translateString(
                'page-home-section-developers-item-three'
              ),
              useRouter: true
            }
          ]
        },
        {
          title: this.translateString('page-home-section-enterprise-title'),
          display: this.contentVersion() >= 1.2,
          items: [
            {
              to: this.langPath() + 'enterprise/#why-enterprise-ethereum',
              text: this.translateString(
                'page-home-section-enterprise-item-one'
              ),
              useRouter: true
            },
            {
              to: this.langPath() + 'enterprise/#enterprise-features',
              text: this.translateString(
                'page-home-section-enterprise-item-two'
              ),
              useRouter: true
            },
            {
              to:
                this.langPath() + 'enterprise/#enterprise-developer-community',
              text: this.translateString(
                'page-home-section-enterprise-item-three'
              ),
              useRouter: true
            }
          ]
        }
      ]
    }
  },

  methods: {
    translateString: function(str) {
      return translate(str, this.$lang)
    },

    langPath: function() {
      return translate('path', this.$lang)
    },

    contentVersion() {
      return translate('version', this.$lang)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../theme/styles/config.styl';

.arrow
  margin-right 1.25em

.subtitle
  max-width 700px

.headline-button
  display: inline-block
  margin-top .5rem

.highlight
  background-image: url(../theme/images/highlight.svg)
  background-repeat no-repeat

.highlight-small
    background-size 240px !important


.intro-blocks
  margin-top 1.5em
  display flex
  flex-wrap wrap

.intro-block
  flex 1 1 29%
  padding-left 1em
  padding-right 1em
  display inline-block
  line-height $lhMedium
  margin-bottom 1em

  // TODO remove once translations are updated w/ new personas
  .intro-block-content-version-1
    flex 1 1 40%
    padding-left 2em
    padding-right 2em

.dark-mode
  .highlight
    background-image url(../theme/images/highlight-dark.svg)
</style>
