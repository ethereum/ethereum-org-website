<template>
  <div class="start-building">
    <div class="center">
      <div class="headline-text-container">
        <h1 class="headline-title">
          {{ translateString('page-build-title') }}
        </h1>
        <div class="headline-subtitle">
          {{ translateString('page-build-subtitle') }}
        </div>
      </div>
      <Button isExternal to="https://studio.ethereum.org">
        {{ translateString('page-build-try-button') }}
      </Button>
      <div class="terminal-gif">
        <img src="/ethereum-studio.gif" />
      </div>
      <div class="gif-caption">
        <!-- TODO how to include links within translations? -->
        Powered by
        <a
          href="https://superblocks.com"
          target="_blank"
          rel="noopener noreferrer"
          >Superblocks</a
        >
      </div>
      <h2 class="bold">
        {{ translateString('page-build-h2') }}
      </h2>
      <div class="features">
        <div class="feature">
          <div class="icon">👋</div>
          <div class="box">
            <div class="box-title">
              {{ translateString('page-build-hello-world-title') }}
            </div>
            <div class="box-description">
              {{ translateString('page-build-hello-world-description') }}
            </div>
            <div class="box-link">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://studio.ethereum.org/1"
                >{{ translateString('page-build-hello-world-link-text') }}</a
              >
            </div>
          </div>
        </div>
        <div class="feature">
          <div class="icon">🗝️</div>
          <div class="box">
            <div class="box-title">
              {{ translateString('page-build-coin-contract-title') }}
            </div>
            <div class="box-description">
              {{ translateString('page-build-coin-contract-description') }}
            </div>
            <div class="box-link">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://studio.ethereum.org/2"
                >{{ translateString('page-build-coin-contract-link-text') }}</a
              >
            </div>
          </div>
        </div>
        <div class="feature">
          <div class="icon">🍕</div>
          <div class="box">
            <div class="box-title">
              {{ translateString('page-build-crypto-pizza-title') }}
            </div>
            <div class="box-description">
              {{ translateString('page-build-crypto-pizza-description') }}
            </div>
            <div class="box-link">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://studio.ethereum.org/3"
                >{{ translateString('page-build-crypto-pizza-link-text') }}</a
              >
            </div>
          </div>
        </div>
      </div>
      <div class="resources">
        <div class="title">
          {{ translateString('page-build-more-learning-title') }}
        </div>
        <div class="logos">
          <div class="logo-container">
            <div class="logo-title">CryptoZombies</div>
            <div class="logo">
              <a
                href="https://cryptozombies.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/ecosystem/crypto-zombie.png" alt="CryptoZombies" />
              </a>
            </div>
            <div class="logo-description">
              {{ translateString('page-build-cryptozombies-description') }}
            </div>
          </div>
          <div class="logo-container">
            <div class="logo-title">Ethernauts</div>
            <div class="logo">
              <a
                href="https://ethernaut.openzeppelin.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/ecosystem/oz.png"
                  class="oz"
                  alt="Open Zeppelin Ethernaut"
                />
              </a>
            </div>
            <div class="logo-description">
              {{ translateString('page-build-ethernauts-description') }}
            </div>
          </div>
          <div class="logo-container">
            <div class="logo-title">Remix</div>
            <div class="logo">
              <a
                href="https://remix.ethereum.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/ecosystem/remix.png" alt="Remix" />
              </a>
            </div>
            <div class="logo-description">
              {{ translateString('page-build-remix-description') }}
            </div>
          </div>
          <div class="logo-container">
            <div class="logo-title">ChainShot</div>
            <div class="logo">
              <a
                href="https://www.chainshot.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/ecosystem/chainshot.png" alt="ChainShot" />
              </a>
            </div>
            <div class="logo-description">
              {{ translateString('page-build-chainshot-description') }}
            </div>
          </div>
          <div class="logo-container">
            <div class="logo-title">Consensys Academy</div>
            <div class="logo">
              <a
                href="https://consensys.net/academy/bootcamp/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/ecosystem/consensys.png" alt="Consensys Academy" />
              </a>
            </div>
            <div class="logo-description">
              {{ translateString('page-build-consensys-academy-description') }}
            </div>
          </div>
        </div>
      </div>
      <div class="learn">
        <h2>{{ translateString('page-build-learn-more-cta') }}</h2>
        <p>
          {{ translateString('page-build-learn-more-description') }}
        </p>
        <Button secondary :to="langPath() + 'learn/'">
          {{ translateString('learn-more') }}
        </Button>
      </div>
      <!-- TODO how to include links within translations? -->
      <p class="collaboration">
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
  }
}
</script>

<style lang="stylus" scoped>
@import '../theme/styles/config.styl';

.start-building
  margin-top 80px
  padding 4em 0 0

  .center
    display flex
    flex-flow column nowrap
    align-items center
    h2
      border-bottom none
      padding-top 0
      line-height 1.4em
      max-width 85%
      &.bold
        margin-top 3em
        font-weight 700
        max-width 60%
    .button
      margin 2em
    .terminal-gif
      margin-top 3em
      border-radius 8px
      border 2px solid #000
      max-width 85%
      img
        max-width: 100%
    .gif-caption
      font-size $fsSmall
      margin-top 0.5rem
      color $subduedColor
      a
        color $subduedColor
        &:hover
          color $colorPrimary

    .features
      display flex
      margin-top 6em
      flex-flow row wrap
      justify-content center
      .feature
        .icon
          margin 0.5em 0
          font-size 3em
        .box
          max-width 260px
          padding 0.2em 1.2em
          .box-title
            font-weight 700
            font-size $fsLarge
            margin-bottom 1em
          .box-description
            font-size $fsMedium
            min-height 6.25rem
            line-height 1.6em
            font-weight 400
          .box-link
            margin-top 1em
            font-size $fsRegular
            text-transform uppercase
            &:hover
              text-decoration underline
    .resources
      padding 2em 0
      margin-top 5em
      font-weight 700
      width 100%
      .title
        text-transform uppercase
        font-size $fsLarge
      .logos
        margin-top 3em
        display flex
        flex-flow row wrap
        justify-content center
        .logo-container
          display flex
          flex-direction column
          align-items center
          flex 0 1 25%
          margin 2rem
        .logo-title
          z-index 1
        .logo-description
          font-size $fsMedium
          font-weight 400
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
    .learn
      margin-top 2em
      display flex
      flex-flow column nowrap
      align-items center
      h2
        font-weight 700
        font-size $fsLarge
      p
        margin-top 1em
        font-size $fsRegular
        max-width 60%
    .collaboration
      margin-top 4rem

#wrapper.dark-mode
  h2
    border-bottom none
  .button
    &:hover
      color $colorPrimaryDark500
      border-color $colorPrimaryDark500
</style>
