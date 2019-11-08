<template>
  <div class="start-building">
    <div class="center">
      <div class="headline-text-container">
        <h1 class="headline-title">Get started building on Ethereum</h1>
        <div
          class="headline-subtitle"
        >Learn the basics of Ethereum with Ethereum Studio, our web-based IDE where you can create and test smart contracts, and build a front end for them.</div>
      </div>
      <a class="button" href="https://studio.ethereum.org" target="_blank">
        Try it now
      </a>
      <div class="terminal-gif">
        <img src="/ethereum-studio.gif" />
      </div>
      <div class="gif-caption">
        Powered by
        <a href="https://superblocks.com" target="_blank">Superblocks</a>
      </div>
      <h2
        class="bold"
      >Start coding right away, saving many hours of development setup. Try the following templates to see what you can build with Ethereum.</h2>
      <div class="features">
        <div class="feature">
          <div class="icon">👋</div>
          <div class="box">
            <div class="box-title">Hello World</div>
            <div
              class="box-description"
            >A Hello World style template that deploys a smart contract with a configurable message, and renders it to the browser.</div>
            <div class="box-link">
              <a target="_blank" href="https://studio.ethereum.org/1">Run Hello World</a>
            </div>
          </div>
        </div>
        <div class="feature">
          <div class="icon">🗝️</div>
          <div class="box">
            <div class="box-title">Coin Contract</div>
            <div
              class="box-description"
            >A starter dapp template that defines a basic fungible token you can create and send to others.</div>
            <div class="box-link">
              <a target="_blank" href="https://studio.ethereum.org/2">Mint your token</a>
            </div>
          </div>
        </div>
        <div class="feature">
          <div class="icon">🍕</div>
          <div class="box">
            <div class="box-title">Crypto Pizza</div>
            <div
              class="box-description"
            >A collectibles game built on top of the ERC-721 standard for creating unique tokens.</div>
            <div class="box-link">
              <a target="_blank" href="https://studio.ethereum.org/3">See Crypto Pizza</a>
            </div>
          </div>
        </div>
      </div>
      <div class="resources">
        <div class="title">More web-based learning experiences for Ethereum</div>
        <div class="logos">
          <div class="logo-container">
            <div class="logo-title">CryptoZombies</div>
            <div class="logo">
              <a href="https://cryptozombies.io/" target="_blank">
                <img src="/ecosystem/crypto-zombie.png" alt="CryptoZombies" />
              </a>
            </div>
            <div class="logo-description">Learn Solidity building your own Zombie game</div>
          </div>
          <div class="logo-container">
            <div class="logo-title">Ethernauts</div>
            <div class="logo">
              <a href="https://ethernaut.openzeppelin.com/" target="_blank">
                <img src="/ecosystem/oz.png" class="oz" alt="Open Zeppelin Ethernaut" />
              </a>
            </div>
            <div class="logo-description">Complete levels by hacking smart contracts</div>
          </div>
          <div class="logo-container">
            <div class="logo-title">Remix</div>
            <div class="logo">
              <a href="https://remix.ethereum.org" target="_blank">
                <img src="/ecosystem/remix.png" alt="Remix" />
              </a>
            </div>
            <div class="logo-description">Ethereum IDE and tools for the web</div>
          </div>
          <div class="logo-container">
            <div class="logo-title">ChainShot</div>
            <div class="logo">
              <a href="https://www.chainshot.com" target="_blank">
                <img src="/ecosystem/chainshot.png" alt="ChainShot" />
              </a>
            </div>
            <div class="logo-description">Solidity, Vyper and Web3.js coding tutorials</div>
          </div>
          <div class="logo-container">
            <div class="logo-title">Consensys Academy</div>
            <div class="logo">
              <a href="https://consensys.net/academy/bootcamp/" target="_blank">
                <img src="/ecosystem/consensys.png" alt="Consensys Academy" />
              </a>
            </div>
            <div class="logo-description">Online Ethereum developer bootcamp</div>
          </div>
        </div>
      </div>
      <div class="learn">
        <h2>Learn more about Ethereum</h2>
        <p>Want to learn more? Go to our learn page to find technical and non-technical articles, guides, and resources.</p>
        <a class="button" href="/learn/">
          Learn More
        </a>
      </div>
      <p class="collaboration">
        <a href="https://studio.ethereum.org" target="_blank">Ethereum Studio</a> is a collaboration between
        <a href="https://superblocks.com" target="_blank">Superblocks</a> and <router-link to="/">Ethereum.org</router-link>.
      </p>
    </div>
  </div>
</template>

<script>
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
        font-size $fsRegular
        font-weight 700
        color $textColor
        &:hover
          color $accentColor
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
            color $accentColor

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
        color $accentColorDark
        border-color $accentColorDark
</style>