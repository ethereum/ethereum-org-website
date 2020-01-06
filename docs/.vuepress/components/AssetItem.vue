<template>
  <div class="asset-item">
    <a :href="imagePath('png')" target="_blank" rel="noopener noreferrer">
      <img class="asset-image" :src="imagePath('png')" />
    </a>
    <div class="asset-download">
      Download:
      <span v-if="hasFileType('png') === true">
        <a :href="imagePath('png')" target="_blank" rel="noopener noreferrer"
          >PNG</a
        >
      </span>
      <span v-if="hasFileType('svg') === true">
        /
        <a :href="imagePath('svg')" target="_blank" rel="noopener noreferrer"
          >SVG</a
        >
      </span>
      <span v-if="hasFileType('jpg') === true">
        /
        <a :href="imagePath('jpg')" target="_blank" rel="noopener noreferrer"
          >JPG</a
        >
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['assetPath'],
  methods: {
    hasFileType: function(fileType) {
      try {
        require('../public/assets/' + this.assetPath + '.' + fileType)
        return true
      } catch (e) {
        return false
      }
    },
    imagePath: function(fileType) {
      return require('../public/assets/' + this.assetPath + '.' + fileType)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../theme/styles/config.styl';

.asset-item
  padding-bottom 1 rem
  border-bottom 1px dotted $subduedColor

.asset-image
  max-height 200px
  max-width 100%
  padding-top 1rem
  padding-bottom 1rem

.asset-download
  font-size $fsSmall
</style>
