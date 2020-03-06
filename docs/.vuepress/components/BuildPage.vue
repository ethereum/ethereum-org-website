<template>
  <div class="start-building center flex flex-column flex-center">
    <header class="center flex flex-column flex-center">
      <div class="headline-text-container">
        <T h1 l2 cText s500>
          {{ translateString('page-build-title') }}
        </T>
        <T p l4 cText s300 class="subtitle mw55ch">
          {{ translateString('page-build-subtitle') }}
        </T>
        <Button isExternal to="https://studio.ethereum.org">
          {{ translateString('page-build-try-button') }}
        </Button>
      </div>
      <div class="terminal-gif">
        <img src="/ethereum-studio.gif" />
      </div>
      <T l5 center cText s100>
        <!-- TODO how to include links within translations? -->
        Powered by
        <a
          href="https://superblocks.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Superblocks
        </a>
      </T>
    </header>

    <T h2 l3 cText s500 mt0 class="callout mw35ch">{{
      translateString('page-build-h2')
    }}</T>

    <section class="features flex flex-row-wrap justify-center">
      <div v-for="template in templates" class="feature flex flex-column">
        <T span l1 ma0>{{ template.icon }}</T>
        <div class="box">
          <T h3 l4 ma0 cText s400>{{ template.title }}</T>
          <T p l7 cText s200>{{ template.description }}</T>
        </div>
        <div class="box-link">
          <a
            target="_blank"
            rel="noopener noreferrer"
            :href="template.to.url"
            >{{ template.to.text }}</a
          >
        </div>
      </div>
    </section>

    <section class="resources flex flex-row-wrap justify-center">
      <div class="w100">
        <T h2 l3 cText s400 w100>
          {{ translateString('page-build-more-learning-title') }}
        </T>
      </div>
      <div v-for="resource in learningPlatforms" class="resource">
        <T h3 l4 ma0 cText s400>{{ resource.title }}</T>
        <div class="logo">
          <a :href="resource.to" target="_blank" rel="noopener noreferrer">
            <img
              :src="resource.img.src"
              :alt="resource.img.alt || resource.title"
            />
          </a>
        </div>
        <T p l7 ma0 cText s200>{{ resource.description }}</T>
      </div>
    </section>

    <section class="learn center flex flex-column flex-center">
      <T h2 l2 cText s400 w100>{{
        translateString('page-build-learn-more-cta')
      }}</T>
      <T p l4 cText s200 class="mw45ch subtitle">
        {{ translateString('page-build-learn-more-description') }}
      </T>
      <Button secondary :to="langPath() + 'learn/'">
        {{ translateString('learn-more') }}
      </Button>
    </section>

    <!-- TODO how to include links within translations? -->
    <T p l5>
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
    </T>
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
  data: function() {
    return {
      templates: [
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
      ],
      learningPlatforms: [
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


.subtitle
  margin-bottom 2rem

.terminal-gif
  margin-top 4rem
  img
    width 100%

.callout
  margin 8rem 0 4rem

header
  margin-top 8rem

section
  margin-bottom 8rem

.feature, .resource
  margin 4rem 1rem 0rem
  flex: 1;
  min-width: 260px;
  max-width: 400px;

.feature
  a:hover
    text-decoration underline

.resource
  flex 1 1 25%
  min-width 200px
  margin 4rem 2rem 0rem 2rem
  @media (min-width: $breakS)
    flex 0 1 25%

.box-link
  margin-top auto
  margin-bottom 0

.resources
  display flex
  flex-flow row wrap
  justify-content center


.logo
  cursor pointer
  display flex
  flex-direction column
  align-items center
  justify-content center
  padding 0 2em
  min-height 9rem
  img
    height 100px
  &:hover
    transform translateZ(0px) scale(1.1)
    transition 0.25s ease-out 0s
</style>
