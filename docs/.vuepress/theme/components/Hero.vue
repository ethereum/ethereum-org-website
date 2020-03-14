<template>
  <div
    class="hero relative content-block flex flex-column flex-center center pa-1 pt-4"
  >
    <video
      id="hero-video"
      ref="vid"
      class="mx-auto inline-block"
      alt="Ethereum.org - Light"
      width="380"
      height="380"
      :src="videoSrc"
      playsinline
      autoplay
      loop
      muted
    />
    <svg
      v-if="!playing"
      @click="playVid"
      id="play-button"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 60 60"
      xml:space="preserve"
    >
      <g>
        <path
          d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30
            c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15
            C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"
        />
        <path
          d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
            S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"
        />
      </g>
    </svg>
    <h1 class="l2 mb-0 mt-1"><span id="morph" ref="morph">Ξ</span></h1>
  </div>
</template>

<script>
import Morpher from '../scripts/morpher'

export default {
  props: {
    name: 'Hero',
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
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
  computed: {
    videoSrc() {
      if (this.isDarkMode) {
        return '/ethereum-hero-dark.mp4'
      } else {
        return '/ethereum-hero-light.mp4'
      }
    }
  },
  mounted() {
    this.initializeMorph()

    var promise = this.$refs.vid.play()
    if (promise !== undefined) {
      promise
        .then(_ => {
          this.playing = true
        })
        .catch(error => {
          this.playing = false
        })
    }

    this.$refs.vid.addEventListener('play', () => {
      this.playing = true
    })

    // Extra check for safari :(
    this.safariCheck = setInterval(() => {
      if (!this.$refs.vid.paused) {
        this.playing = true
        clearInterval(this.safariCheck)
      }
    }, 500)
  },
  methods: {
    playVid() {
      this.playing = true
      this.$refs.vid.play()
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
    clearInterval(this.safariCheck)
  }
}
</script>

<style lang="stylus" scoped>
  @require '../styles/config'

#wrapper.dark-mode
  video
    mix-blend-mode lighten
  svg#play-button
    fill $textColorDark

#play-button
  position absolute
  width 50px
  top calc(50% - 50px)
  left calc(50% - 25px)
  cursor pointer

.hero
  max-width 60vw
  margin 0 auto

  video
    max-width 100%
    pointer-events none
    -webkit-mask-image -webkit-radial-gradient(white, black)
    -webkit-backface-visibility hidden
    -moz-backface-visibility hidden

  img
    max-width 100%
    height auto !important
    margin 0 auto
    display block

.hero-block
  position absolute

  .header
    position absolute
    margin-left: -1.1em
  .content
    padding-top $lhRegular

  &.beginners
    top 6em
    left 8.5em

  &.learn
    top 9em
    right 2.5em

  &.use
    top 18em
    left 0.5em

  &.build
    top 22em
    right 7.5em

@media screen and (max-width $breakL)
  .hero
    margin-top 1em
    max-width 70vw

  .hero-block
    &.beginners
      top 4em
      left 3.5em

    &.learn
      top 6em
      right 0em

    &.use
      top 14em
      left 0.5em

    &.build
      top 17em
      right 3.5em

@media screen and (max-width $breakS)
  .hero
    max-width 90vw
</style>
