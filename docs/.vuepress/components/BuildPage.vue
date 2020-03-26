<template>
  <div class="start-buildingflex flex-column flex-center page">
    <header class="md-up-pl-3 md-up-pr-3 pb-5 pt-3">
      <h1 class="l1 tc-text500">
        {{ translateString('page-build-title') }}
      </h1>
      <p class="l4 tc-text300 subtitle max-w-55ch">
        {{ translateString('page-build-subtitle') }}
      </p>
    </header>

    <section class="pb-4">
      <div class="md-up-pl-3 md-up-pr-3 pb-2 md-up-pb-4">
        <h2 class="l2">Ethereum Studio Templates</h2>
        <p class="l4">
          {{ translateString('page-build-h2') }}
        </p>
      </div>
      <CardList :items="templates" desktopColumns="3" tabletColumns="3" />
    </section>

    <section class="pb-4">
      <div class="md-up-pl-3 md-up-pr-3 pb-2 md-up-pb-4">
        <h2 class="l2">Learning Resources</h2>
        <p class="l4">{{ translateString('page-build-h2') }}</p>
      </div>
      <CardList
        :items="learningPlatforms"
        desktopColumns="3"
        tabletColumns="3"
      />
    </section>

    <section class="pb-4 flex flex-wrap">
      <div class="a-m-w-50 overflow-hidden pt-2 pb-2 studio-image-wrapper">
        <img class="studio-img" src="/ethereum-studio.gif" />
      </div>
      <div class="a-m-w-50 md-up-pl-2 flex flex-center">
        <div>
          <h2 class="l2 tc-text400 w-100 mt-0">
            Ethereum Studio
          </h2>
          <p class="l4 tc-text200">
            {{ translateString('page-build-subtitle') }}
          </p>
          <Button
            isExternal
            secondary
            to="https://studio.ethereum.org"
            class="inline-block mt-05"
          >
            {{ translateString('page-build-try-button') }}
          </Button>
        </div>
      </div>
    </section>

    <section
      class="learn-more relative bg-primary500 md-up-pl-3 md-up-pr-3 pt-4 pb-4"
    >
      <div class="relative w-100 learn-content">
        <h2 class="l2 mt-0 tc-onPrimary">
          {{ translateString('page-build-learn-more-cta') }}
        </h2>
        <p class="l4 tc-onPrimary o-08 max-w-45ch mb-2">
          {{ translateString('page-build-learn-more-description') }}
        </p>
        <Button secondary :to="langPath() + 'learn/'">
          {{ translateString('learn-more') }}
        </Button>
      </div>
    </section>
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
          content: this.translateString('page-build-hello-world-description'),
          link: {
            to: 'https://studio.ethereum.org/1',
            text: this.translateString('page-build-hello-world-link-text')
          },
          header: '👋'
        },
        {
          title: this.translateString('page-build-coin-contract-title'),
          content: this.translateString('page-build-coin-contract-description'),
          link: {
            to: 'https://studio.ethereum.org/2',
            text: this.translateString('page-build-coin-contract-link-text')
          },
          header: '🗝️'
        },
        {
          title: this.translateString('page-build-crypto-pizza-title'),
          content: this.translateString('page-build-crypto-pizza-description'),
          link: {
            to: 'https://studio.ethereum.org/3',
            text: this.translateString('page-build-crypto-pizza-link-text')
          },
          header: '🍕'
        }
      ]
    },
    learningPlatforms() {
      return [
        {
          title: 'CryptoZombies',
          content: this.translateString('page-build-cryptozombies-description'),
          link: {
            to: 'https://cryptozombies.io/'
          },
          header: '/ecosystem/crypto-zombie.png'
        },
        {
          title: 'Ethernauts',
          content: this.translateString('page-build-ethernauts-description'),
          link: {
            to: 'https://ethernaut.openzeppelin.com/'
          },
          header: '/ecosystem/oz.png'
        },
        {
          title: 'Remix',
          content: this.translateString('page-build-remix-description'),
          link: {
            to: 'https://remix.ethereum.org'
          },
          header: '/ecosystem/remix.png'
        },
        {
          title: 'ChainShot',
          content: this.translateString('page-build-chainshot-description'),
          link: {
            to: 'https://www.chainshot.com'
          },
          header: '/ecosystem/chainshot.png'
        },
        {
          title: 'ConsenSys Academy',
          content: this.translateString(
            'page-build-consensys-academy-description'
          ),
          link: {
            to: 'https://consensys.net/academy/bootcamp/'
          },
          header: '/ecosystem/consensys.png'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../theme/styles/config.styl';


.studio-img
  border-radius 8px
  width 100%
  @media (min-width: $breakM)
    width 180%

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
  @media (min-width: $breakS)
    flex 0 1 25%

.learn-more
  z-index 2
  & > *
    z-index 2
  &:before
    position absolute
    content ''
    background $colorPrimary500
    width: 100vw
    height: 100%
    left: calc(50% - 50vw);
    top 0
    z-index 1

.dark-mode
  .learn-more:before
    background $colorPrimaryDark500

.logo
  cursor pointer
  min-height 9rem
  img
    height 100px
  &:hover
    transform translateZ(0px) scale(1.1)
    transition 0.25s ease-out 0s
</style>
