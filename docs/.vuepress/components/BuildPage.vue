<template>
  <div class="start-building">
    <div class="center">
      <div class="headline-text-container">
        <h1 class="headline-title">
          {{ translateString('page-build-title') }}
        </h1>
        <div class="headline-subtitle1">
          {{ translateString('page-build-subtitle1') }}
        </div>
        <div class="headline-subtitle2">
          {{ translateString('page-build-subtitle2') }}
        </div>
        <div class="headline-subtitle3 headline-subtitle-sp-above">
          {{ translateString('page-build-subtitle3') }}
        </div>
        <div class="headline-subtitle4">
          {{ translateString('page-build-subtitle4') }}
        </div>
        <div class="headline-subtitle">
          {{ translateString('page-build-subtitle') }}
        </div>
      </div>
      <div class="intro-blocks buttons-container">
        <div><a data-v-3fc3df5e="" href="#studio" class="button">
          Learn more about Studio
            </a></div>
        <div><a data-v-3fc3df5e="" href="#remix" class="button">
          Learn more about Remix
        </a></div>
      </div>
      <div class="ide">
        <h1 id="studio" class="box box-title">Ethereum Studio</h1>
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
          {{ translateString('page-build-studio-h2') }}
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
      </div>
      <!-- start remix -->
      <div class="ide">
        <h1 id="remix" class="box box-title">Remix IDE</h1>
        <div class="terminal-gif">
          <img src="/ethereum-remix_v1.png" />
        </div>
        <div class="gif-caption">
          <!-- TODO how to include links within translations? -->
          Powered by
          <a
            href="https://remix.ethereum.org"
            target="_blank"
            rel="noopener noreferrer"
            >the Ethereum Foundation's Remix team</a
          >
        </div>
        <h2 class="bold">
          {{ translateString('page-build-remix-h2-1') }}
        </h2>
        <h2 class="bold stacked">
          {{ translateString('page-build-remix-h2-2') }}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://gitter.im/ethereum/remix"
            >{{ translateString('page-build-remix-h2-3') }}</a
          >
        </h2>
        <h2 class="bold stacked">
          {{ translateString('page-build-remix-h2-4') }}
        </h2>
        <div class="features">
          <div class="feature">
            <div class="icon img-cont"><img class="feature-img" src="/assets/remix_logo.svg" /></div>
            <div class="box">
              <div class="box-title">
                {{ translateString('page-build-hello-remix-title') }}
              </div>
              <div class="box-description">
                {{ translateString('page-build-hello-remix-description') }}
              </div>
              <div class="box-link">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://remix.ethereum.org/"
                  >{{ translateString('page-build-hello-remix-link-text') }}</a
                >
              </div>
            </div>
          </div>
          <div class="feature">
            <div class="icon">📣</div>
            <div class="box">
              <div class="box-title">
                {{ translateString('page-build-remix-website-title') }}
              </div>
              <div class="box-description">
                {{ translateString('page-build-remix-website-description') }}
              </div>
              <div class="box-link">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://remix-project.org"
                  >{{ translateString('page-build-remix-website-link-text') }}</a
                >
              </div>
            </div>
          </div>
          <div class="feature">
            <div class="icon">🖥</div>
            <div class="box">
              <div class="box-title">
                {{ translateString('page-build-remix-desktop-title') }}
              </div>
              <div class="box-description">
                {{ translateString('page-build-remix-desktop-description') }}
              </div>
              <div class="box-link remixdt">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/ethereum/remix-desktop/releases/"
                  >{{ translateString('page-build-remix-desktop-link-text') }}</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end remix -->
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
        <router-link class="button" :to="langPath() + 'learn/'">
          {{ translateString('learn-more') }}
        </router-link>
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
      &.bold.stacked
        margin-top 1em
    .button
      margin 2em
      font-size $fsRegular
      font-weight 700
      color $textColor
      &:hover
        color $accentColor
    .buttons-container
      margin-bottom 4rem
    .ide
      margin-bottom 5rem
      display: flex
      flex-direction: column
      align-items: center
    .terminal-gif
      border-radius 8px
      border 2px solid #000
      max-width 85%
      background-color black
      img
        max-width: 100%
    .feature-img
      width 65px
    .gif-caption
      font-size $fsSmall
      margin-top 0.5rem
      color $subduedColor
      a
        color $subduedColor
        &:hover
          color $accentColor

    .features
      display flex
      margin-top 3em
      flex-flow row wrap
      justify-content center
      .feature
        .icon
          margin 0.5em 0
          font-size 3em
        .icon.img-cont
          margin-top 0px
          margin-bottom: 14px
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
          .box-link.remixdt
            margin-top 2.4em
    .resources
      padding 2em 0
      margin-top 1em
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
    .headline-subtitle3 
      margin-top: 1em
#wrapper.dark-mode
  h2
    border-bottom none
  .button
    &:hover
      color $accentColorDark
      border-color $accentColorDark
</style>
