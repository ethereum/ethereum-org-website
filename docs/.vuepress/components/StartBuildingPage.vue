<template>
  <div class="start-building">
    <div class="center">
      <div class="headline-text-container">
        <h1 class="headline-title">Get started building on Ethereum</h1>
        <div class="headline-subtitle">Learn the basics of Ethereum with Ethereum Studio, our web-based IDE where you can create and test smart contracts and their front end.</div>
      </div>
      <a href="https://studio.ethereum.org" target="blank">
        <button class="try-button">Try it now</button>
      </a>
      <div class="terminal-gif">
        <img src="/ethereum-studio.gif" />
      </div>
      <h2 class="bold">
        Start coding right away, saving many hours of development setup. Try the following templates to see what you can build with Ethereum.
      </h2>
      <div class="features">
        <div class="feature">
          <div class="icon">👋</div>
          <div class="box">
            <div class="box-title">Hello World</div>
            <div
              class="box-description"
            >A Hello World style template that deploys a smart contract with a configurable message, and renders it to the browser.</div>
            <div class="box-link">
              <a href="https://studio.ethereum.org/1">Run Hello World</a>
            </div>
          </div>
        </div>
        <div class="feature">
          <div class="icon">🗝️</div>
          <div class="box">
            <div class="box-title">ERC-20 Token</div>
            <div
              class="box-description"
            >A template that uses the ERC-20 standard to define a fungible token you can create and send to others.</div>
            <div class="box-link">
              <a href="https://studio.ethereum.org/2">Mint your token</a>
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
              <a href="https://studio.ethereum.org/3">See Crypto Pizza</a>
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
              <a href="https://cryptozombies.io/">
                <img src="/ecosystem/crypto-zombie.png" alt="CryptoZombies" />
              </a>
            </div>
            <div class="logo-description">Learn Solidity building your own Zombie game.</div>
          </div>
          <div class="logo-container">
            <div class="logo-title">Ethernauts</div>
            <div class="logo">
            <a href="https://ethernaut.openzeppelin.com/">
              <img src="/ecosystem/oz.png" class="oz" alt="Open Zeppelin Ethernaut" />
            </a>
            </div>
            <div class="logo-description">Complete levels by hacking smart contracts.</div>
          </div>
            <div class="logo-container">
              <div class="logo-title">0x Instant</div>
              <div class="logo">
              <a href="https://0x.org/instant">
                <img src="/ecosystem/0x.png" class="zero" alt="0x Instant" />
              </a>
            </div>
            <div class="logo-description">Offer simple crypto purchasing in any app or website.</div>
          </div>
        </div>
      </div>
      <div class="learn">
        <h2>Learn more about Ethereum</h2>
        <p>Want to learn more? Go to our learn page to find technical and non-technical articles, guides, and resources.</p>
        <a href="/learn/" target="blank">
          <button class="learn-button">Learn More</button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style lang="stylus" scoped>
@import '../theme/styles/config.styl';
  
.start-building
  margin-top 80px
  padding 4em 0

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
    .try-button
      margin 2em
      font-size $fsRegular
      font-weight 700
    .terminal-gif
      margin-top 3em
      border-radius 8px
      border 2px solid #000
      max-width 85%
      img
        max-width: 100%
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
          margin 1rem
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
            &.oz
              height 140px
            &.zero
              height 80px
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
      .learn-button
        margin-top 1em
        font-size $fsRegular
</style>