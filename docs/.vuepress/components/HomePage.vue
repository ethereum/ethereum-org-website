<template>
  <div>
    <header class="center flex flex-column flex-center page">
      <h1 class="l3 tc-text">{{ translateString('page-home-title') }}</h1>
      <p class="l4 tc-text300 mt-0 max-w-55ch">
        {{ translateString('page-home-subtitle') }}
      </p>
      <Button class="inline-block mt-05" :to="langPath() + 'what-is-ethereum/'">
        {{ translateString('learn-more') }}
      </Button>
    </header>

    <section class="intro-blocks flex flex-wrap pt-5">
      <div
        v-for="block in introBlocks"
        v-if="block.display"
        class="intro-block pl-1 pr-1 mb-1"
      >
        <h3 class="l4 tc-primary500">
          <span class="mr-075">→</span>{{ block.title }}
        </h3>
        <ul class="tc-text500 ml-05">
          <li
            v-for="item in block.items"
            :class="
              `mb-05 ml-025 ${item.highlight && 'highlight highlight-small'}`
            "
          >
            <router-link :to="item.to" class="tc-text300 tc-h-primary500">
              {{ item.text }}
            </router-link>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { translate } from '../theme/utils/translations'

export default {
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

.intro-block
  flex 1 1 29%
  display inline-block
  line-height $lhMedium
  min-width 260px
</style>
