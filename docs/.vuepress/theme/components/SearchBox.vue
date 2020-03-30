<template>
  <!-- 
    Our parent div watches to see if any children are focused
    unFocus checks if the next target is a child before unfocusing
   -->
  <div
    :class="searchClasses"
    @focusin="focused = true"
    @focusout="unFocus"
    @keydown.esc="unFocus"
    @keyup.enter="forceUnFocus()"
    @keydown.down="down"
    @keydown.up="up"
  >
    <h1 class="search-title l3 mt-0 flex flex-center l-up-hidden">
      <icon
        name="chevron-right"
        class="icon-back mr-05 l-up-hidden"
        @click.native="$emit('search-toggle')"
        @keyup.enter="$emit('search-toggle')"
      />
      Search
    </h1>

    <div class="relative">
      <input
        class="l7 mt-0 mb-0 pl-05 pt-05 pr-2 pb-05"
        id="main-search-field"
        @input="query = $event.target.value"
        aria-label="Search"
        :value="query"
        autocomplete="off"
        spellcheck="false"
        placeholder="Search"
      />
      <icon name="search" class="icon-search-field" />
    </div>

    <div v-if="blankState" class="blank-state l-up-hidden">
      <div class="blank-state-emoji">{{ blankState.emoji }}</div>
      <span>{{ blankState.text }}</span>
    </div>
    <template v-else>
      <h2 v-if="!blankState" class="results-title l4 l-up-hidden">
        Results
      </h2>

      <ul
        v-if="!blankState"
        class="suggestions pl-0 mt-0 no-bullets l-up-hidden"
      >
        <li v-for="(s, i) in suggestions">
          <router-link
            :to="s.path"
            class="result-link pa-05 flex flex-column align-center l-up-ma-0"
            tabindex="-1"
            @mousedown.native="$router.push(s.path), forceUnFocus()"
          >
            <span v-if="s.header" class="mb-025 tc-text400">{{
              s.header.title
            }}</span>
            <span class="result-page tc-text100">{{ s.title || s.path }}</span>
          </router-link>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import { resolveHeaderTitle } from '../utils/util'

export default {
  props: {
    isSearchVisible: {
      type: Boolean,
      default: false
    },
    method: { type: Function }
  },

  data() {
    return {
      query: '',
      focusIndex: -1,
      focused: false
    }
  },

  watch: {
    // clear query when search hidden
    isSearchVisible: function() {
      !this.isSearchVisible && (this.query = '')
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
    },

    blankState() {
      if (!this.query.length) {
        return { emoji: '⛵️', text: 'Search away!' }
      } else if (!this.suggestions.length) {
        return { emoji: '😕', text: 'No results found' }
      } else {
        return false
      }
    },

    suggestions() {
      const query = this.query.trim().toLowerCase()
      if (!query) {
        return
      }

      const { pages, themeConfig } = this.$site
      const max = themeConfig.searchMaxSuggestions || 5
      const localePath = this.$localePath
      const matches = item =>
        item.title && item.title.toLowerCase().indexOf(query) > -1
      const res = []
      for (let i = 0; i < pages.length; i++) {
        if (res.length >= max) break
        const p = pages[i]
        // filter out results that do not match current locale
        if (this.getPageLocalePath(p) !== localePath) {
          continue
        }
        if (matches(p)) {
          res.push(p)
        } else if (p.headers) {
          for (let j = 0; j < p.headers.length; j++) {
            if (res.length >= max) break
            const h = p.headers[j]
            if (matches(h)) {
              h.title = resolveHeaderTitle(h.title)
              res.push(
                Object.assign({}, p, {
                  path: p.path + '#' + h.slug,
                  header: h
                })
              )
            }
          }
        }
      }
      return res
    }
  },

  methods: {
    unFocus(e) {
      e.relatedTarget
        ? !e.relatedTarget.classList.contains('result-link') &&
          ((this.focused = false), (this.focusIndex = -1))
        : ((this.focused = false), (this.focusIndex = -1))
      e.target.blur()
    },
    forceUnFocus() {
      event.srcElement.id != 'main-search-field' &&
        (this.$emit('search-toggle'),
        this.$emit('nav-toggle', false),
        (this.focused = false),
        (this.query = ''))
    },
    getPageLocalePath(page) {
      for (const localePath in this.$site.locales || {}) {
        if (localePath !== '/' && page.path.indexOf(localePath) === 0) {
          return localePath
        }
      }
      return '/'
    },

    down(e) {
      !this.blankState &&
        (e.preventDefault(),
        this.focusIndex < this.suggestions.length - 1 && this.focusIndex++,
        this.focusIndex < this.suggestions.length &&
          document.getElementsByClassName('result-link') &&
          document
            .getElementsByClassName('result-link')
            [this.focusIndex].focus())
    },
    up(e) {
      e.preventDefault()
      this.focusIndex != -1 && this.focusIndex--
      this.focusIndex == -1
        ? document.getElementById('main-search-field').focus()
        : document.getElementsByClassName('result-link') &&
          document
            .getElementsByClassName('result-link')
            [this.focusIndex].focus()
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/config.styl'

.search-title
  line-height 1

.search-box
  top unquote('calc( -100 * var(--vh) + ' + $mobileBottomDrawerHeight + ')')
  left 0
  right 0
  height unquote('calc(100 * var(--vh))')
  transition all 0.25s ease-in-out
  &, *, *:before, *:after
    box-sizing border-box

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
    width 120%
    position absolute
    top calc(100% + 4px)
    border-radius 0.25em
    border-radius 0.25em

// Light Mode
.search-box
  background $colorWhite500
  input
    border 1px solid $colorBlack50
.result-link
  &:hover, &:focus
    background: alpha($colorPrimary100, 0.2)

.result-title, .result-page
  color: $colorBlack500
.result-title + .result-page
  color: $colorBlack100

.blank-state
  color $colorBlack50
  background $colorWhite600

@media (min-width: $breakL)
  .suggestions, .blank-state
    background $colorWhite500
    border 1px solid $colorWhite800

// Dark Mode
.dark-mode
  .search-box
    background $colorBlack500
    input
      color $colorWhite600
      background $colorBlack200
      border 1px solid $colorWhite900
  .result-title, .result-page
    color: $colorWhite500
  .result-title + .result-page
    color: $colorWhite900
  .blank-state
    background $colorBlack300
  @media (min-width: $breakL)
    .suggestions, .blank-state
      background $colorBlack300
      border 1px solid $colorBlack100
</style>
