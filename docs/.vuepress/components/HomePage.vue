<template>
  <div class="flex flex-column flex-center">
    <header class="center flex flex-column flex-center page">
      <h1 class="l3 tc-text">{{ translateString('page-home-title') }}</h1>
      <p class="l4 tc-text300 mt-0 max-w-55ch">
        {{ translateString('page-home-subtitle') }}
      </p>
      <Button class="inline-block mt-05" :to="langPath() + 'what-is-ethereum/'">
        {{ translateString('learn-more') }}
      </Button>
    </header>

    <section :class="introBlockClasses">
      <div
        v-for="block in introBlocks"
        v-if="block.display"
        class="intro-block pl-2 pr-1 mb-1"
      >
        <h3 class="l4 tc-primary500 block-title">
          {{ translateString(block.title) }}
        </h3>
        <ul class="tc-text500 ml-05">
          <li
            v-for="item in block.items"
            :class="
              `mb-05 ml-025 ${item.highlight && 'highlight highlight-small'}`
            "
          >
            <router-link :to="item.to" class="tc-text300 tc-h-primary500">
              {{ translateString(item.text) }}
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
  computed: {
    introBlockClasses() {
      return {
        'intro-blocks flex flex-wrap pt-5': true,
        'max-w-m': this.contentVersion() < 1.1
      }
    },
    introBlocks() {
      const individualItems = [
        {
          to: this.langPath() + 'what-is-ethereum/',
          text: 'page-home-section-individuals-item-one',
          useRouter: true,
          highlight: true
        },
        {
          to: this.langPath() + 'dapps/',
          text: 'page-home-section-individuals-item-two',
          useRouter: true
        },
        {
          to: this.langPath() + 'learn/',
          text: 'page-home-section-individuals-item-three',
          useRouter: true
        }
      ]

      if (this.contentVersion() > 1.1) {
        individualItems.push({
          to: this.langPath() + 'community/',
          text: 'page-community',
          useRouter: true
        })
      }

      return [
        {
          title: 'page-home-section-individuals-title',
          display: this.contentVersion() >= 1.1,
          items: individualItems
        },
        {
          title: 'page-home-section-beginners-title',
          display: this.contentVersion() < 1.1,
          items: [
            {
              to: this.langPath() + 'what-is-ethereum/',
              text: 'page-home-section-beginners-item-one',
              useRouter: true
            },
            {
              to: this.langPath() + 'what-is-ethereum/',
              text: 'page-home-section-beginners-item-two',
              useRouter: true
            },
            {
              to: this.langPath() + 'what-is-ethereum/',
              text: 'page-home-section-beginners-item-three',
              useRouter: true
            }
          ]
        },
        {
          title: 'page-home-section-use-title',
          display: this.contentVersion() < 1.1,
          items: [
            {
              to:
                this.langPath() + 'use/#1-use-an-application-built-on-ethereum',
              text: 'page-home-section-use-item-one',
              useRouter: true
            },
            {
              to: this.langPath() + 'use/#2-what-is-eth-and-how-do-i-get-it',
              text: 'page-home-section-use-item-two',
              useRouter: true
            },
            {
              to:
                this.langPath() +
                'use/#3-what-is-a-wallet-and-which-one-should-i-use',
              text: 'page-home-section-use-item-three',
              useRouter: true
            }
          ]
        },
        {
          title: 'page-home-section-learn-title',
          display: this.contentVersion() < 1.1,
          items: [
            {
              to: this.langPath() + 'learn/#ethereum-basics',
              text: 'page-home-section-learn-item-one',
              useRouter: true
            },
            {
              to: this.langPath() + 'learn/#how-ethereum-works',
              text: 'page-home-section-learn-item-two',
              useRouter: true
            },
            {
              to: this.langPath() + 'learn/#eth-2-0',
              text: 'page-home-section-learn-item-three',
              useRouter: true
            }
          ]
        },
        {
          title: 'page-home-section-developers-title',
          display: true,
          items: [
            {
              to:
                this.langPath() +
                (this.contentVersion() >= 1.05
                  ? 'build/'
                  : 'developers/#getting-started'),
              text: 'page-home-section-developers-item-one',
              useRouter: true
            },
            {
              to: this.langPath() + 'developers/#smart-contract-languages',
              text: 'page-home-section-developers-item-two',
              useRouter: true
            },
            {
              to: this.langPath() + 'developers/#developer-tools',
              text: 'page-home-section-developers-item-three',
              useRouter: true
            }
          ]
        },
        {
          title: 'page-home-section-enterprise-title',
          display: this.contentVersion() >= 1.1,
          items: [
            {
              to: this.langPath() + 'enterprise/#why-enterprise-ethereum',
              text: 'page-home-section-enterprise-item-one',
              useRouter: true
            },
            {
              to: this.langPath() + 'enterprise/#enterprise-features',
              text: 'page-home-section-enterprise-item-two',
              useRouter: true
            },
            {
              to:
                this.langPath() + 'enterprise/#enterprise-developer-community',
              text: 'page-home-section-enterprise-item-three',
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

.block-title:before
  padding-right .5em
  margin-left: -.5em
  content: '→'
.rtl .block-title:before
  padding-left .75em
  margin-right -.5em
  content: '←'
</style>
