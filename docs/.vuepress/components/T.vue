<template>
  <component
    :is="getTagName"
    :to="to"
    :class="`${getLevel} ${getModifiers} ${getColor}`"
    ><slot
  /></component>
</template>

<script>
export default {
  name: 'T',
  props: {
    // Tag Names
    h1: { type: Boolean },
    h2: { type: Boolean },
    h3: { type: Boolean },
    h4: { type: Boolean },
    h5: { type: Boolean },
    h6: { type: Boolean },
    p: { type: Boolean },
    span: { type: Boolean },
    ul: { type: Boolean },
    ol: { type: Boolean },
    li: { type: Boolean },
    a: { type: Boolean },
    routerLink: { type: Boolean },
    div: { type: Boolean },

    // if router link
    to: { type: String },

    // Type levels
    l1: { type: Boolean },
    l2: { type: Boolean },
    l3: { type: Boolean },
    l4: { type: Boolean },
    l5: { type: Boolean },
    l6: { type: Boolean },
    l7: { type: Boolean },
    l8: { type: Boolean },

    // Colors
    cPrimary: { type: Boolean },
    cText: { type: Boolean },

    // Shades
    s100: { type: Boolean },
    s200: { type: Boolean },
    s300: { type: Boolean },
    s400: { type: Boolean },
    s500: { type: Boolean },
    s600: { type: Boolean },
    s700: { type: Boolean },
    s800: { type: Boolean },
    s900: { type: Boolean },

    // modifiers
    //// text center
    center: { type: Boolean },
    //// no margins
    ma0: { type: Boolean },
    //// no margin-bottom
    mb0: { type: Boolean },
    //// no margin-top
    mt0: { type: Boolean },
    //// widths
    w100: { type: Boolean }
  },
  computed: {
    getTagName() {
      return (
        (this.h1 && 'h1') ||
        (this.h2 && 'h2') ||
        (this.h3 && 'h3') ||
        (this.h4 && 'h4') ||
        (this.h5 && 'h5') ||
        (this.h6 && 'h6') ||
        (this.p && 'p') ||
        (this.span && 'span') ||
        (this.ul && 'ul') ||
        (this.ol && 'ol') ||
        (this.li && 'li') ||
        (this.a && 'a') ||
        (this.routerLink && 'router-link') ||
        (this.div && 'div') ||
        // default to paragraph
        'p'
      )
    },
    getLevel() {
      return (
        (this.l1 && 'l1') ||
        (this.l2 && 'l2') ||
        (this.l3 && 'l3') ||
        (this.l4 && 'l4') ||
        (this.l5 && 'l5') ||
        (this.l6 && 'l6') ||
        (this.l7 && 'l7') ||
        (this.l8 && 'l8') ||
        // default to inherit
        ''
      )
    },

    getModifiers() {
      var classes = ''
      this.center && (classes += ' center')
      this.ma0 && (classes += ' ma0')
      this.mb0 && (classes += ' mb0')
      this.mt0 && (classes += ' mt0')
      // widths use util.styl classes
      this.w100 && (classes += ' w100')
      return classes
    },

    getColor() {
      var color = () =>
        (this.cPrimary && 'c-primary') || (this.cText && 'c-text') || ''

      var shade = () =>
        (this.s100 && '100') ||
        (this.s200 && '200') ||
        (this.s300 && '300') ||
        (this.s400 && '400') ||
        (this.s500 && '500') ||
        (this.s600 && '600') ||
        (this.s700 && '700') ||
        (this.s800 && '800') ||
        (this.s900 && '900') ||
        ''

      return color() + shade()
    },

    getColorShade() {
      ;(this.s100 && '100') || ''
    }
  }
}
</script>

<style lang="stylus">

// The following classess are unscoped,
// allowing you to access them from anywhere
// in the codebase, and reducing specificty

@import '../theme/styles/config.styl';
// Reset default styles from theme.styl & dark.styl
.dark-mode
  h1, h2, h3, h4, h5, h6
    border-bottom: none

// Styles
.l1 {
  line-height 1.4
  margin 2rem 0
  font-weight 400
  @css {
    font-size: min(max(2rem, 6vw), 3rem)
  }
}
.l2
  font-size 2rem
  line-height 1.4
  margin 1.5rem 0
  font-weight 400
  @css {
    font-size: min(max(1.75rem, 4vw), 2rem)
  }
.l3
  font-size 1.5rem
  line-height 1.4
  margin 1.5rem 0
  font-weight 400
.l4
  font-size 1.25rem
  line-height 1.4
  font-weight 400
.l5
  font-size 1rem
  line-height 1.6
  font-weight 400
.l6
  font-size .875rem
  line-height 1.6
  font-weight 400
  letter-spacing 0.04
  margin 1.14em 0
  text-transform uppercase
.l7
  font-size 1rem
  line-height 1.6
  font-weight 400
.l8
  font-size .875rem
  line-height:1.6
  margin 1.14em 0
  font-weight 400

b, .b, strong {
  font-weight 600
}

.featured
  border-left 1px dotted $colorPrimary
  padding-left 1rem
  margin-left -1rem

// Colors
.c-primary, .c-h-primary:hover { color: $colorPrimary500 }
.c-primary100, .c-h-primary100:hover { color: $colorPrimary100 }
.c-primary200, .c-h-primary200:hover { color: $colorPrimary200 }
.c-primary400, .c-h-primary400:hover { color: $colorPrimary400 }
.c-primary300, .c-h-primary300:hover { color: $colorPrimary300 }
.c-primary500, .c-h-primary500:hover { color: $colorPrimary500 }
.c-primary600, .c-h-primary600:hover { color: $colorPrimary600 }
.c-primary700, .c-h-primary700:hover { color: $colorPrimary700 }
.c-primary800, .c-h-primary800:hover { color: $colorPrimary800 }
.c-primary900, .c-h-primary900:hover { color: $colorPrimary900 }

.c-text, .c-text:hover { color: $colorBlack400}
.c-text100, .c-h-text100:hover { color: $colorBlack50 }
.c-text200, .c-h-text200:hover { color: $colorBlack100 }
.c-text300, .c-h-text300:hover { color: $colorBlack200 }
.c-text400, .c-h-text400:hover { color: $colorBlack300 }
.c-text500, .c-h-text500:hover { color: $colorBlack400}
.c-text600, .c-h-text600:hover { color: $colorBlack500}

.dark-mode
  .c-primary, .c-h-primary:hover { color: $colorPrimaryDark500 }
  .c-primary100, .c-h-primary100:hover { color: $colorPrimaryDark100 }
  .c-primary200, .c-h-primary200:hover { color: $colorPrimaryDark200 }
  .c-primary400, .c-h-primary400:hover { color: $colorPrimaryDark400 }
  .c-primary300, .c-h-primary300:hover { color: $colorPrimaryDark300 }
  .c-primary500, .c-h-primary500:hover { color: $colorPrimaryDark500 }
  .c-primary600, .c-h-primary600:hover { color: $colorPrimaryDark600 }
  .c-primary700, .c-h-primary700:hover { color: $colorPrimaryDark700 }
  .c-primary800, .c-h-primary800:hover { color: $colorPrimaryDark800 }
  .c-primary900, .c-h-primary900:hover { color: $colorPrimaryDark900 }

  .c-text, .c-text-d .c-text:hover { color: $colorWhite600}
  .c-text100, .c-text-d100, .c-h-text100:hover { alpha($colorWhite900, 0.8) }
  .c-text200, .c-text-d200, .c-h-text200:hover { color: $colorWhite900 }
  .c-text300, .c-text-d300, .c-h-text300:hover { color: $colorWhite800 }
  .c-text400, .c-text-d400, .c-h-text400:hover { color: $colorWhite700 }
  .c-text500, .c-text-d500, .c-h-text500:hover { color: $colorWhite600}
  .c-text600, .c-text-d600, .c-h-text600:hover { color: $colorWhite500}

// Modifiers
.ma0 { margin: 0 }
.mb0 { margin-bottom: 0 }
.mt0 { margin-top: 0 }


////
// GLOBAL DEFAULT STYLES
////

.content__default
  //:not():not()... prevents these styles from overriding explicitly set styles
  h1:not(.l1):not(.l2):not(.l3):not(.l4):not(.l5):not(.l6):not(.l7):not(.l8)
    @extend .l1
    @extend .c-text500
  h2:not(.l1):not(.l2):not(.l3):not(.l4):not(.l5):not(.l6):not(.l7):not(.l8)
    @extend .l2
    @extend .c-text500
  h3:not(.l1):not(.l2):not(.l3):not(.l4):not(.l5):not(.l6):not(.l7):not(.l8)
    @extend .l3
    @extend .c-text500
  h4:not(.l1):not(.l2):not(.l3):not(.l4):not(.l5):not(.l6):not(.l7):not(.l8)
    @extend .l4
    @extend .c-text500
  h5:not(.l1):not(.l2):not(.l3):not(.l4):not(.l5):not(.l6):not(.l7):not(.l8)
    @extend .l5
    @extend .c-text500
  h6:not(.l1):not(.l2):not(.l3):not(.l4):not(.l5):not(.l6):not(.l7):not(.l8)
    @extend .l6
    @extend .c-text500
  p:not(.l1):not(.l2):not(.l3):not(.l4):not(.l5):not(.l6):not(.l7):not(.l8)
    @extend .l7
    @extend .c-text400
    & + p
      margin-top 2em // updated this value, needs attention

  ul:not(.l1):not(.l2):not(.l3):not(.l4):not(.l5):not(.l6):not(.l7):not(.l8)
    padding 0
    margin 1em
    list-style-type none
    list-style-image none

    li:not(.l1):not(.l2):not(.l3):not(.l4):not(.l5):not(.l6):not(.l7):not(.l8)
      padding-left .5em
      margin-bottom .5em

      &:before
        content "\2022"
        color $colorPrimary500
        display inline-block
        width 1em
        margin-left -1em
        position absolute

      &.highlight
        background url(../theme/images/highlight.svg)
        background-repeat no-repeat

    &.inline, &.nav-ul
      li
        padding 0
        display inline-block


.dark-mode
  .content__default
    h1:not(.l1):not(.l2):not(.l3):not(.l4):not(.l5):not(.l6):not(.l7):not(.l8)
      @extend .dark-mode .c-text500
    h2:not(.l1):not(.l2):not(.l3):not(.l4):not(.l5):not(.l6):not(.l7):not(.l8)
      @extend .dark-mode .c-text500
    h3:not(.l1):not(.l2):not(.l3):not(.l4):not(.l5):not(.l6):not(.l7):not(.l8)
      @extend .dark-mode .c-text500
    h4:not(.l1):not(.l2):not(.l3):not(.l4):not(.l5):not(.l6):not(.l7):not(.l8)
      @extend .dark-mode .c-text500
    h5:not(.l1):not(.l2):not(.l3):not(.l4):not(.l5):not(.l6):not(.l7):not(.l8)
      @extend .dark-mode .c-text500
    h6:not(.l1):not(.l2):not(.l3):not(.l4):not(.l5):not(.l6):not(.l7):not(.l8)
      @extend .dark-mode .c-text500
    p:not(.l1):not(.l2):not(.l3):not(.l4):not(.l5):not(.l6):not(.l7):not(.l8)
      @extend .dark-mode .c-text300

    .featured
      border-left 1px dotted $colorPrimaryDark

    ul:not(.l1):not(.l2):not(.l3):not(.l4):not(.l5):not(.l6):not(.l7):not(.l8)
      li:not(.l1):not(.l2):not(.l3):not(.l4):not(.l5):not(.l6):not(.l7):not(.l8)
        &.highlight
          background-image: url(../theme/images/highlight-dark.svg)
          background-repeat no-repeat
        &:before
          color $colorPrimaryDark500
</style>
