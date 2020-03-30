<template>
  <div :class="classes">
    <Card
      v-for="item in items"
      span="3"
      :hero="item.hero"
      :header="item.header"
      :leftimg="item.leftimg"
      :title="item.title"
      :content="item.content"
      :link="item.link"
      class="item"
    />
  </div>
</template>

<script>
export default {
  name: 'CardList',
  props: {
    level: {
      required: false,
      default: 3
    },
    items: {
      required: false,
      default: []
    },
    desktopColumns: {
      required: false,
      default: 3
    },
    tabletColumns: {
      required: false,
      default: 2
    },
    smallTabletColumns: {
      required: false,
      default: 2
    }
  },
  computed: {
    classes() {
      var desktop = 'l-up-col-' + this.desktopColumns
      var tablet = 'm-up-col-' + this.tabletColumns
      var smallTablet = 's-up-col-' + this.smallTabletColumns
      var base = 'grid'
      return [desktop, tablet, smallTablet, base]
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../theme/styles/config.styl';
.grid
  display grid
  grid-column-gap 2rem
  grid-row-gap 2rem
  margin-bottom 2rem

.col-1
  grid-template-columns 1fr
.col-2
  grid-template-columns repeat(2, 1fr)
.col-3
  grid-template-columns repeat(3, 1fr)
.col-4
 grid-template-columns repeat(4, 1fr)
.col-5
  grid-template-columns repeat(5, 1fr)
.col-6
  grid-template-columns repeat(6, 1fr)

@media screen and (min-width: $breakS)
  .s-up-col-1
    grid-template-columns 1fr
  .s-up-col-2
    grid-template-columns repeat(2, 1fr)
  .s-up-col-3
    grid-template-columns repeat(3, 1fr)
  .s-up-col-4
    grid-template-columns repeat(4, 1fr)
  .s-up-col-5
    grid-template-columns repeat(5, 1fr)
  .s-up-col-6
    grid-template-columns repeat(6, 1fr)

@media screen and (min-width: $breakM)
  .m-up-col-1
    grid-template-columns 1fr
  .m-up-col-2
    grid-template-columns repeat(2, 1fr)
  .m-up-col-3
    grid-template-columns repeat(3, 1fr)
  .m-up-col-4
    grid-template-columns repeat(4, 1fr)
  .m-up-col-5
    grid-template-columns repeat(5, 1fr)
  .m-up-col-6
    grid-template-columns repeat(6, 1fr)

@media screen and (min-width: $breakL)
  .l-up-col-1
    grid-template-columns 1fr
  .l-up-col-2
    grid-template-columns repeat(2, 1fr)
  .l-up-col-3
    grid-template-columns repeat(3, 1fr)
  .l-up-col-4
    grid-template-columns repeat(4, 1fr)
  .l-up-col-5
    grid-template-columns repeat(5, 1fr)
  .l-up-col-6
    grid-template-columns repeat(6, 1fr)
</style>
