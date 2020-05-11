<template>
  <div class="pa-1 l-up-pl-2 l-up-pr-2">
    <div class="flex flex-column">
      <div class="flex space-between align-center">
        <h1 class="l5 max-w-55ch">
          Welcome to Ethereum, a community-driven internet built for you
        </h1>
        <span class="l5 hidden m-up-inline-block " id="morph" ref="morph"
          >Ξ</span
        >
      </div>
      <div class="tc-text200 max-w-55ch">
        <p class="l5">
          Using Ethereum, you can write code that controls digital value, runs
          exactly as programmed, and is accessible anywhere in the world.
        </p>
      </div>
    </div>

    <div class="divider bg-primary200 w-10 mt-4 mb-4" />
    <div class="flex flex-wrap space-between tc-text200">
      <div v-for="block in introBlocks" class="w-35ch l-up-mr-4 mb-2">
        <div
          class="w-100 intro-block-img"
          :style="`background-image: url(${$withBase(block.image)})`"
        />
        <h1 class="l5 tc-text400">{{ block.title }}</h1>
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
          title: 'Individuals',
          text:
            'Individuals can use Ethereum to interact & transact with others without middlemen. Be in control of your data and join new systems.',
          link: {
            text: 'Ethereum for Individuals',
            to: this.langPath() + 'what-is-ethereum/'
          }
        },
        {
          image: '/illustrations/developers.png',
          title: 'Developers',
          text:
            'Deploy applications to global, distributed infrastructure and develop new mechanisms for users and for businesses.',
          link: {
            text: 'Ethereum for Developers',
            to: this.langPath() + 'build/'
          }
        },
        {
          image: '/illustrations/enterprise.png',
          title: 'Enterprise',
          text:
            'Create trust between you, your customers, and your suppliers. Future-proof your business and pioneer the future of the web.',
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

.intro-block-img {
  background-size contain
  background-repeat no-repeat
  height 100px
}
</style>
