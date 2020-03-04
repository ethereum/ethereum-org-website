<template>
  <div :class="searchClasses">
    <h1 class="search-title">
      <icon
        name="chevron-right"
        class="icon-back"
        @click.native="$emit('search-toggle', false)"
      />
      Search
    </h1>

    <div class="search-bar">
      <input
        @input="query = $event.target.value"
        aria-label="Search"
        :value="query"
        :class="{ focused: focused }"
        autocomplete="off"
        spellcheck="false"
        @focus="focused = true"
        @keyup.enter="go(focusIndex)"
        @keyup.up="onUp"
        @keyup.down="onDown"
        placeholder="Search"
      />
      <icon name="search" class="icon-search-field" />
    </div>

    <div v-if="blankState" class="no-results">
      <div class="no-results-emoji">{{ blankState.emoji }}</div>
      <span class="no-results-text">{{ blankState.text }}</span>
    </div>

    <h2 v-if="!blankState" class="results-title">Results</h2>
    <ul
      v-if="!blankState"
      class="suggestions"
      :class="{ 'align-right': alignRight }"
    >
      <li
        class="suggestion"
        v-for="(s, i) in suggestions"
        :class="{ focused: i === focusIndex }"
        @mousedown="
          go(i), $emit('search-toggle', false), $emit('nav-toggle', false)
        "
      >
        <a :href="s.path" @click.preven class="result-link">
          <span v-if="s.header" class="result-title">{{ s.header.title }}</span>
          <span class="result-page">{{ s.title || s.path }}</span>
        </a>
      </li>
    </ul>
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
      focused: false,
      focusIndex: 0
    }
  },

  computed: {
    searchClasses() {
      if (!this.isSearchVisible) {
        return 'search-box search-hidden'
      } else {
        return 'search-box'
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

    // Search results
    showSuggestions() {
      // return this.focused && this.suggestions
      return this.suggestions
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
    },

    // make suggestions align right when there are not enough items
    alignRight() {
      const navCount = (this.$site.themeConfig.nav || []).length
      const repo = this.$site.repo ? 1 : 0
      return navCount + repo <= 2
    }
  },

  methods: {
    getPageLocalePath(page) {
      for (const localePath in this.$site.locales || {}) {
        if (localePath !== '/' && page.path.indexOf(localePath) === 0) {
          return localePath
        }
      }
      return '/'
    },

    onUp() {
      if (this.showSuggestions) {
        if (this.focusIndex > 0) {
          this.focusIndex--
        } else {
          this.focusIndex = this.suggestions.length - 1
        }
      }
    },

    onDown() {
      if (this.showSuggestions) {
        if (this.focusIndex < this.suggestions.length - 1) {
          this.focusIndex++
        } else {
          this.focusIndex = 0
        }
      }
    },

    go(i) {
      if (!this.showSuggestions) {
        return
      }
      this.$router.push(this.suggestions[i].path)
      this.query = ''
      this.focusIndex = 0
    },

    focus(i) {
      this.focusIndex = i
    },

    unfocus() {
      this.focusIndex = -1
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/config.styl'

.search-title
  @extends .reset-type
  display flex
  align-items center
  font-size $fsl3

.search-bar
  position relative
.search-box
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  box-sizing: border box
  padding 1em
  transform translateY(0px)
  transition all 0.25s ease-in-out
  display flex
  flex-direction column

  &, *, *:before, *:after
    box-sizing border-box

  input
    appearance none
    border none
    outline none
    font-size 1rem
    height auto
    line-height 1.4
    padding .5rem 2rem .5rem .5rem
    border-radius 0.25em
    width 100%

    &:focus
      cursor auto
      appearance none
      outline none

  *, *:before, *:after
    box-sizing: border box
  // width 100%


.results-title
  @extends .reset-type
  display block
  margin 1em 0
  font-size $fsl4

.icon-search-field
  position absolute
  top: 50%
  margin-top: -12px
  right 6px

.icon-back
  transform rotate(180deg)
  margin-right .5em

.no-results
  background pink
  display flex
  flex-direction column
  align-items center
  justify-content center
  align-items center
  margin-top: auto;
  margin-bottom: auto;
  align-self: center;
  width 280px
  height 280px
  border-radius 100%
  color $colorBlack50
  background $colorWhite600

  .no-results-emoji
    height  80px
    line-height 1
    font-size: 80px

.search-hidden
  transform: translateY(100%)

.suggestions
  width 100%
  margin 0
  list-style none

.suggestion
  width 100%
  margin 0
  padding 0
  list-style none
  font-size 1rem

.result-link
  display block
  padding 0.5em
  min-height 2em
  display flex
  flex-direction column
  justify-content center
  border-radius 0.4em
  margin 0 -0.5em

.result-title
  margin-bottom 0.25em

@media (min-width: $breakM)
  .icon-back
    display none
  .search-box
    display inline-block
    width: auto
    position relative
    background transparent
    width 240px

  .search-hidden
      transform none

  .suggestions
    display block
    position absolute
    top calc(100% + 4px)
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


// Dark Mode
.dark-mode
  .search-box
    background $colorBlack500
  .suggestions
    border 1px solid $colorBlack50
  .result-link
    border-bottom 1px solid alpha($colorWhite500, 0.05)
    &:hover, &:focus
      background $colorBlack200
      color $colorPrimary500
  input
      background-color $colorBlack200
      border 1px solid $colorBlack50
      color $colorWhite500
</style>
