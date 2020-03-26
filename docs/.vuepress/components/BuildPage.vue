<template>
  <div class="start-building center flex flex-column flex-center page">
    <header class="center flex flex-column flex-center">
      <div class="headline-text-container">
        <h1 class="l2 tc-text500">
          {{ translateString('page-build-title') }}
        </h1>
        <p class="l4 tc-text300 subtitle max-w-55ch">
          {{ translateString('page-build-subtitle') }}
        </p>
        <Button
          isExternal
          to="https://studio.ethereum.org"
          class="inline-block mt-05"
        >
          {{ translateString('page-build-try-button') }}
        </Button>
      </div>
      <div class="mt-4">
        <img src="/ethereum-studio.gif" class="w-100" />
      </div>
      <p class="l5 tc-text100 center">
        <!-- TODO how to include links within translations? -->
        Powered by
        <a
          href="https://superblocks.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Superblocks
        </a>
      </p>
    </header>

    <h2 class="l3 tc-text500 mt-8 mb-4 max-w-35ch">
      {{ translateString('page-build-h2') }}
    </h2>

    <section
      class="features flex flex-row-wrap justify-center mb-8 max-w-1140px"
    >
      <div
        v-for="template in templates"
        class="feature mt-4 mr-1 ml-1 flex flex-column"
      >
        <span class="l1 ma-0">{{ template.icon }}</span>
        <div class="box">
          <h3 class="l4 ma-0 tc-text400">{{ template.title }}</h3>
          <p class="l7 tc-text200">{{ template.description }}</p>
        </div>
        <div class="mt-auto mb-0">
          <a
            target="_blank"
            rel="noopener noreferrer"
            class="hide-icon"
            :href="template.to.url"
            >{{ template.to.text }}</a
          >
        </div>
      </div>
    </section>

    <section
      class="resources flex flex-row-wrap justify-center mb-8 max-w-1140px"
    >
      <h2 class="l3 tc-text400 min-w-100">
        {{ translateString('page-build-more-learning-title') }}
      </h2>
      <div
        v-for="resource in learningPlatforms"
        class="resource mt-4 mr-2 ml-2"
      >
        <h3 class="l4 tc-text400 ma-0">{{ resource.title }}</h3>
        <div class="logo flex flex-column flex-center justify-center pl-2 pr-2">
          <a
            :href="resource.to"
            target="_blank"
            rel="noopener noreferrer"
            class="hide-icon"
          >
            <img
              :src="resource.img.src"
              :alt="resource.img.alt || resource.title"
            />
          </a>
        </div>
        <p class="l7 tc-text200 ma-0">{{ resource.description }}</p>
      </div>
    </section>

    <section class="learn center flex flex-column flex-center mb-8">
      <h2 class="l2 tc-text400 w-100">
        {{ translateString('page-build-learn-more-cta') }}
      </h2>
      <p class="l4 tc-text200 max-w-45ch mb-2">
        {{ translateString('page-build-learn-more-description') }}
      </p>
      <Button secondary :to="langPath() + 'learn/'">
        {{ translateString('learn-more') }}
      </Button>
    </section>

    <!-- TODO how to include links within translations? -->
    <p class="l5">
      <a
        href="https://studio.ethereum.org"
        target="_blank"
        rel="noopener noreferrer"
        >Ethereum Studio</a
      >
      is a collaboration between
      <a
        href="https://superblocks.com"
        target="_blank"
        rel="noopener noreferrer"
        >Superblocks</a
      >
      and <router-link to="/">Ethereum.org</router-link>.
    </p>
  </div>
</template>

<script>
import { translate } from '../theme/utils/translations'

export default {
  methods: {
    translateString: function(str) {
      return translate(str, this.$lang)
    },

    langPath: function() {
      return translate('path', this.$lang)
    }
  },
  computed: {
    templates() {
      return [
        {
          title: this.translateString('page-build-hello-world-title'),
          description: this.translateString(
            'page-build-hello-world-description'
          ),
          to: {
            url: 'https://studio.ethereum.org/1',
            text: this.translateString('page-build-hello-world-link-text')
          },
          icon: '👋'
        },
        {
          title: this.translateString('page-build-coin-contract-title'),
          description: this.translateString(
            'page-build-coin-contract-description'
          ),
          to: {
            url: 'https://studio.ethereum.org/2',
            text: this.translateString('page-build-coin-contract-link-text')
          },
          icon: '🗝️'
        },
        {
          title: this.translateString('page-build-crypto-pizza-title'),
          description: this.translateString(
            'page-build-crypto-pizza-description'
          ),
          to: {
            url: 'https://studio.ethereum.org/3',
            text: this.translateString('page-build-crypto-pizza-link-text')
          },
          icon: '🍕'
        }
      ]
    },
    learningPlatforms() {
      return [
        {
          title: 'CryptoZombies',
          description: this.translateString(
            'page-build-cryptozombies-description'
          ),
          to: 'https://cryptozombies.io/',
          img: {
            src: '/ecosystem/crypto-zombie.png',
            alt: 'CryptoZombies'
          }
        },
        {
          title: 'Ethernauts',
          description: this.translateString(
            'page-build-ethernauts-description'
          ),
          to: 'https://ethernaut.openzeppelin.com/',
          img: {
            src: '/ecosystem/oz.png',
            alt: 'Open Zeppelin Ethernaut'
          }
        },
        {
          title: 'Remix',
          description: this.translateString('page-build-remix-description'),
          to: 'https://remix.ethereum.org',
          img: {
            src: '/ecosystem/remix.png',
            alt: 'Remix'
          }
        },
        {
          title: 'ChainShot',
          description: this.translateString('page-build-chainshot-description'),
          to: 'https://www.chainshot.com',
          img: {
            src: '/ecosystem/chainshot.png',
            alt: 'ChainShot'
          }
        },
        {
          title: 'ConsenSys Academy',
          description: this.translateString(
            'page-build-consensys-academy-description'
          ),
          to: 'https://consensys.net/academy/bootcamp/',
          img: {
            src: '/ecosystem/consensys.png',
            alt: 'ConsenSys Academy'
          }
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../theme/styles/config.styl';

.feature, .resource
  flex: 1;
  min-width: 260px;
  max-width: 400px;

.feature
  a:hover
    text-decoration underline

.resource
  flex 1 1 25%
  min-width 200px
  @media (min-width: $breakL)
    flex 0 1 25%

.logo
  cursor pointer
  min-height 9rem
  img
    height 100px
  &:hover
    transform translateZ(0px) scale(1.1)
    transition 0.25s ease-out 0s
</style>
