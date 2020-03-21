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
      var desktop = 'a-m-col-' + this.desktopColumns
      var tablet = 'a-s-col-' + this.tabletColumns
      var smallTablet = 'a-xs-col-' + this.smallTabletColumns
      var base = 'grid col-1'
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
  grid-template-columns repeat(5, 1fr)

@media screen and (min-width: $breakXS)
  .a-xs-col-1
    grid-template-columns 1fr
  .a-xs-col-2
    grid-template-columns repeat(2, 1fr)
  .a-xs-col-3
    grid-template-columns repeat(3, 1fr)
  .a-xs-col-4
    grid-template-columns repeat(4, 1fr)
  .a-xs-col-5
    grid-template-columns repeat(5, 1fr)
  .a-xs-col-6
    grid-template-columns repeat(6, 1fr)

@media screen and (min-width: $breakS)
  .a-s-col-1
    grid-template-columns 1fr
  .a-s-col-2
    grid-template-columns repeat(2, 1fr)
  .a-s-col-3
    grid-template-columns repeat(3, 1fr)
  .a-s-col-4
    grid-template-columns repeat(4, 1fr)
  .a-s-col-5
    grid-template-columns repeat(5, 1fr)
  .a-s-col-6
    grid-template-columns repeat(6, 1fr)

@media screen and (min-width: $breakM)
  .a-m-col-1
    grid-template-columns 1fr
  .a-m-col-2
    grid-template-columns repeat(2, 1fr)
  .a-m-col-3
    grid-template-columns repeat(3, 1fr)
  .a-m-col-4
    grid-template-columns repeat(4, 1fr)
  .a-m-col-5
    grid-template-columns repeat(5, 1fr)
  .a-m-col-6
    grid-template-columns repeat(6, 1fr)
</style>
