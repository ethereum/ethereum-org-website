<template>
  <div :class="searchClasses">
    <h1 class="search-title l3 mt-0 flex flex-center l-up-hidden">
      <icon
        name="chevron-right"
        class="icon-back mr-05 l-up-hidden"
        @click.native="$emit('search-toggle')"
        @keyup.enter="$emit('search-toggle')"
      />
      {{ translateString('search') }}
    </h1>
    <form
      id="search-form"
      class="algolia-search-wrapper relative"
      role="search"
    >
      <input
        id="algolia-search-input"
        class="search-query l7 mt-0 mb-0 pl-05 pt-05 pr-2 pb-05"
        aria-label="Search"
        :placeholder="translateString('search')"
        @input="query = $event.target.value"
        :value="query"
      />
      <icon name="search" class="icon-search-field" />
    </form>

    <div v-if="!query" class="blank-state tc-text200 l-up-hidden">
      <div class="blank-state-emoji">⛵️</div>
      <span>{{ translateString('search-box-blank-state-text') }}</span>
    </div>
  </div>
</template>

<script>
import { translate } from '../utils/translations'

export default {
  name: 'AlgoliaSearchBox',

  props: {
    isSearchVisible: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object
    }
  },

  data() {
    return {
      query: ''
    }
  },

  computed: {
    searchClasses() {
      return {
        'search-box absolute pa-1 l-up-relative l-up-pa-0 hidden': true,
        'flex flex-column': this.isSearchVisible,
        'hidden l-up-block': !this.isSearchVisible,
        'focus-within': this.focused
      }
    }
  },

  watch: {
    // clear query when search hidden
    isSearchVisible: function() {
      !this.isSearchVisible && (this.query = '')
    },

    $lang(newValue) {
      this.update(this.options, newValue)
    },

    options(newValue) {
      this.update(newValue, this.$lang)
    }
  },

  mounted() {
    this.initialize(this.options, this.$lang)
  },

  methods: {
    initialize(userOptions, lang) {
      Promise.all([
        import(
          /* webpackChunkName: "docsearch" */ 'docsearch.js/dist/cdn/docsearch.min.js'
        ),
        import(
          /* webpackChunkName: "docsearch" */ 'docsearch.js/dist/cdn/docsearch.min.css'
        )
      ]).then(([docsearch]) => {
        docsearch = docsearch.default
        const { algoliaOptions = {} } = userOptions
        docsearch(
          Object.assign({}, userOptions, {
            inputSelector: '#algolia-search-input',
            // #697 Make docsearch work well at i18n mode.
            algoliaOptions: Object.assign(
              {
                facetFilters: [`lang:${lang}`].concat(
                  algoliaOptions.facetFilters || []
                )
              },
              algoliaOptions
            ),
            handleSelected: (input, event, suggestion) => {
              this.$emit('search-toggle')
              this.$emit('nav-toggle', false)
              const { pathname, hash } = new URL(suggestion.url)
              const routepath = pathname.replace(this.$site.base, '/')
              this.$router.push(`${routepath}${hash}`)
              this.query = '' // TODO why doesn't this work?
            }
          })
        )
      })
    },

    update(options, lang) {
      this.$el.innerHTML = this.$el.innerHTML // Needed to reset language index
      this.initialize(options, lang)
    },

    translateString: function(str) {
      return translate(str, this.$lang)
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/config.styl'

.search-title
  line-height 1

.search-box
  z-index 10
  top unquote('calc( -100 * var(--vh) + ' + $mobileBottomDrawerHeight + ')')
  left 0
  right 0
  height unquote('calc(100 * var(--vh))')
  transition all 0.25s ease-in-out
  &, *, *:before, *:after
    box-sizing border-box

  form
    border-radius 0.25em

  input
    appearance none
    border none
    outline none
    height auto
    border-radius 0.25em
    width 100%

    &:focus
      cursor auto
      appearance none
      outline none

  *, *:before, *:after
    box-sizing: border box

.icon-search-field
  position absolute
  top 50%
  margin-top -12px
  right 6px

.icon-back
  cursor pointer
  transform rotate(180deg)

.blank-state
  display flex
  flex-direction column
  align-items center
  justify-content center
  margin-top 10vw
  align-self center
  width 280px
  width unquote('min(60vw, 280px)')
  height 280px
  height unquote('min(60vw, 280px)')
  border-radius 100%

.blank-state-emoji
  height  80px
  line-height 1
  font-size: 80px

.search-hidden
  display none

.result-link
  min-height 2em
  border-radius 0.4em
  margin 0 -0.5em

@media (min-width: $breakL)

  .search-box
    display inline-block
    width: auto
    position relative
    background transparent
    top 0
    height initial

    &.focus-within
      .suggestions
        display block
      .blank-state, .suggestions
        display flex

  .search-hidden
      transform none

  .suggestions, .blank-state
    margin 0
    flex-direction column
    left 0
    width 120%
    position absolute
    top calc(100% + 4px)
    border-radius 0.25em
    border-radius 0.25em

.algolia-search-wrapper
  & > span
    vertical-align middle
  .algolia-autocomplete
    line-height normal
    .ds-dropdown-menu
      border 1px solid #999
      border-radius 4px
      font-size 16px
      margin 6px 0 0
      padding 4px
      text-align left
      background-color $colorWhite500
      &:before
        border-color #999
      [class*=ds-dataset-]
        border none
        padding 0
      .ds-suggestions
        margin-top 0
      .ds-suggestion
        border-bottom 1px solid $colorBlack100
    .algolia-docsearch-suggestion
      border-color $colorBlack100
      padding 0
      .algolia-docsearch-suggestion--category-header
        padding 5px 10px
        margin-top 0
        background $colorBlack500
        color #fff
        font-weight 600
        .algolia-docsearch-suggestion--highlight
          background rgba(255, 255, 255, 0.6)
      .algolia-docsearch-suggestion--wrapper
        padding 0
      .algolia-docsearch-suggestion--title
        font-weight 600
        margin-bottom 0
        color $textColor
      .algolia-docsearch-suggestion--subcategory-column
        vertical-align top
        padding 5px 7px 5px 5px
        border-color $colorBlack100
        background #f1f3f5
        &:after
          display none
      .algolia-docsearch-suggestion--subcategory-column-text
        color #555
    .algolia-docsearch-footer
      border-color $colorBlack100
    .ds-cursor .algolia-docsearch-suggestion--content
      color $textColor

// Light Mode
.search-box, .algolia-search-wrapper, .algolia-autocomplete .ds-dropdown-menu [class^=ds-dataset-]
  background $colorWhite500
  input
    border 1px solid $colorBlack50

  .algolia-docsearch-suggestion--highlight
    color $colorPrimary
.result-link
  &:hover, &:focus
    background: alpha($colorPrimary100, 0.2)

.result-title, .result-page, .algolia-docsearch-suggestion--category-header
  color: $colorBlack500
.result-title + .result-page
  color: $colorBlack100

.blank-state
  background $colorWhite600

@media (min-width: $breakL)
  .suggestions, .blank-state
    background $colorWhite500
    border 1px solid $colorWhite800

// Dark Mode
.dark-mode
  .search-box, .algolia-search-wrapper, .algolia-autocomplete .ds-dropdown-menu [class^=ds-dataset-]
    // background $colorBlack300
    input
      color $colorWhite600
      background $colorBlack200
      border 1px solid $colorWhite900

  // .ds-dropdown-menu
    // background-color $colorWhite500 !important

  .algolia-docsearch-suggestion--highlight
    color $colorPrimaryDark !important
  .algolia-docsearch-suggestion--category-header
    background-color $colorBlack300 !important
  .result-title, .result-page, .algolia-docsearch-suggestion--category-header
    color: $colorWhite500
  .result-title + .result-page
    color: $colorWhite900
  .blank-state
    background $colorBlack300
  @media (min-width: $breakL)
    .suggestions, .blank-state
      background $colorBlack300
      border 1px solid $colorBlack100

@media (min-width: $breakM)
  .algolia-search-wrapper
    .algolia-autocomplete
      .algolia-docsearch-suggestion
        .algolia-docsearch-suggestion--subcategory-column
          float none
          width 150px
          min-width 150px
          display table-cell
        .algolia-docsearch-suggestion--content
          float none
          display table-cell
          width 100%
          vertical-align top
        .ds-dropdown-menu
          min-width 515px !important

@media (max-width: $breakM)
  .algolia-search-wrapper
    span.algolia-autocomplete
      width 100%
    pre
      display none
    .ds-dropdown-menu
      left 0px
      min-width calc(100vw - 4rem) !important
      max-width calc(100vw - 4rem) !important
    .algolia-docsearch-suggestion--wrapper
      padding 5px 7px 5px 5px !important
    .algolia-docsearch-suggestion--subcategory-column
      padding 0 !important
      background white !important
    .algolia-docsearch-suggestion--subcategory-column-text:after
      content " > "
      font-size 10px
      line-height 14.4px
      display inline-block
      width 5px
      margin -3px 3px 0
      vertical-align middle

@media (max-width: $breakM)
  .algolia-search-wrapper
    .ds-dropdown-menu
      min-width calc(100vw - 2rem) !important
      max-width calc(100vw - 2rem) !important
</style>
