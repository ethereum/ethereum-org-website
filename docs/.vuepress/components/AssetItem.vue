<template>
  <div class="asset-item pb-1">
    <a :href="imagePath('png')" target="_blank" rel="noopener noreferrer">
      <img class="asset-image pt-1 pb-1 max-w-100" :src="imagePath('png')" />
    </a>
    <div class="l8">
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
  border-bottom 1px dotted $subduedColor

.asset-image
  max-height 200px
</style>
