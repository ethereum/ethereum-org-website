<template>
  <header class="flex">
    <div class="mt-2 l-up-mt-4 m-up-mr-2 l-up-mr-4">
      <span v-if="intro" class="l6">{{ intro }}</span>
      <h1 class="l1 mt-0">{{ title }}</h1>
    </div>
    <img v-if="image" :src="image" class="w-30 mt-4 l-up-mt-0 hero-img" />
  </header>
</template>

<script>
export default {
  name: 'TextHero',
  props: {
    title: {
      required: true,
      type: String
    },
    intro: {
      required: false,
      type: String
    },
    image: {
      required: false,
      type: String
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../theme/styles/config.styl';

.hero-img
  height 100%

@media (min-width: $breakL)
  .hero-img
    min-width 300px
</style>
