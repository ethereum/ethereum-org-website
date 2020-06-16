<template>
  <div class="pa-1 l-up-pl-2 l-up-pr-2">
    <div class="flex flex-column">
      <div class="flex space-between align-center">
        <h1 class="homepage-title l3">
          {{ translateString('page-home-title') }}
        </h1>
        <span
          class="homepage-eth-title l5 hidden m-up-inline-block "
          id="morph"
          ref="morph"
          >Ξ</span
        >
      </div>
      <div class="tc-text200 max-w-55ch">
        <p class="l5">
          {{ translateString('page-home-subtitle') }}
        </p>
      </div>
    </div>

    <div class="divider bg-primary200 w-10 mt-4 mb-4" />
    <div class="intro-block-container flex space-between tc-text200">
      <div v-for="block in introBlocks" class="intro-block l-up-mr-4 mb-2">
        <div
          class="w-100 intro-block-img"
          :style="`background-image: url(${$withBase(block.image)})`"
        />
        <h1 class="l4 tc-text400">{{ block.title }}</h1>
        <p class="l5">{{ block.text }}</p>
        <p class="l5">
          <router-link :to="block.link.to" class="mb-05 inline-block"
            >{{ block.link.text }}
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { translate } from '../theme/utils/translations'
import Morpher from '../theme/scripts/morpher'

export default {
  data() {
    return {
      playing: true,
      words: [
        'Ethereum',
        '以太坊',
        'イーサリアム',
        'Etérium',
        '이더리움',
        'اتریوم',
        'Αιθέριο',
        'Eterijum',
        'إثيريوم',
        'อีเธอเรียม',
        'Эфириум',
        'इथीरियम',
        'ಇಥೀರಿಯಮ್',
        'אתריום',
        'Ξ',
        'ইথেরিয়াম',
        'எதீரியம்',
        'ఇథిరియూమ్'
      ]
    }
  },
  mounted() {
    this.initializeMorph()
  },
  methods: {
    inlineMd: function(str) {
      return inlineMd(str)
    },

    translateString: function(str) {
      return translate(str, this.$lang)
    },

    langPath: function() {
      return translate('path', this.$lang)
    },
    initializeMorph() {
      let counter = 0

      this.morphInterval = setInterval(() => {
        const item = this.$refs.morph
        const start = item.textContent
        const end = this.words[counter]

        Morpher(item, start, end)

        if (counter < this.words.length - 1) {
          counter++
        } else {
          counter = 0
        }
      }, 3000)
    }
  },
  beforeDestroy() {
    clearInterval(this.morphInterval)
  },
  computed: {
    introBlocks() {
      return [
        {
          image: '/illustrations/cats.png',
          title: 'About Ethereum',
          text:
            'Get to know Ethereum, Ether, wallets, tokens and more so you can start using Ethereum applications.',
          link: {
            text: 'Get started with Ethereum',
            to: this.langPath() + 'what-is-ethereum/'
          }
        },
        {
          image: '/illustrations/developers.png',
          title: 'Developers',
          text:
            'Learn about the technology behind Ethereum and its applications so you can start building with it.',
          link: {
            text: 'Start building',
            to: this.langPath() + 'build/'
          }
        },
        {
          image: '/illustrations/enterprise.png',
          title: 'Enterprise',
          text:
            'See how Ethereum can open up new business models, reduce your costs and future-proof your business.',
          link: {
            text: 'Ethereum for Enterprise',
            to: this.langPath() + 'enterprise/'
          }
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../theme/styles/config.styl';

.homepage-title
  max-width 80%
  @media (max-width: $breakM)
    max-width 100%

.homepage-eth-title
  margin-top 1.5rem
  white-space nowrap

.intro-block-container
  @media (max-width: $breakL)
    flex-wrap wrap

.intro-block
  flex: 0 1 33%;
  @media (max-width: $breakL)
    flex 0 1 50%
    min-width 320px
    padding-right 4rem

.intro-block-img {
  background-size contain
  background-repeat no-repeat
  height 100px
}
</style>
