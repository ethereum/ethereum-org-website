<template>
  <div :class="searchClasses">
    <icon 
      name="chevron-right" 
      class="icon-back"
      @click.native="$emit('search-toggle', false)"
    />
    <input
      @input="query = $event.target.value"
      aria-label="Search"
      :value="query"
      :class="{ focused: focused }"
      autocomplete="off"
      spellcheck="false"
      @focus="focused = true"
      @blur="focused = false"
      @keyup.enter="go(focusIndex)"
      @keyup.up="onUp"
      @keyup.down="onDown"
      placeholder="Search"
    />
    <icon 
      name="search" 
      class="icon-search-field"
    />
    <ul
      class="suggestions"
      v-if="showSuggestions"
      :class="{ 'align-right': alignRight }"
    >
      <li
        class="suggestion"
        v-for="(s, i) in suggestions"
        :class="{ focused: i === focusIndex }"
        @mousedown="go(i), $emit('search-toggle', false), $emit('nav-toggle', false)"
      >
        <a
          :href="s.path"
          @click.preven
          class="suggestion-link"
        >
          <span class="page-title">{{ s.title || s.path }}</span>
          <span v-if="s.header" class="header">&gt; {{ s.header.title }}</span>
        </a>
      </li>
      <li v-if="noResults" class="suggestion">No results :(</li>
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
    method: { type: Function },
  },

  data() {
    return {
      query: '',
      focused: false,
      focusIndex: 0,
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

    // Search results
    showSuggestions() {
      return this.focused && this.suggestions
    },
    noResults() {
      return this.focused && this.suggestions && !this.suggestions.length
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
    },
  }
}
</script>


<style lang="stylus">
@import '../styles/config.styl'

.icon-search-field
  position absolute
  top: 50%
  margin-top: -12px
  right 6px

.icon-back
  transform rotate(180degfi)
.search-box
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  background pink
  box-sizing: border box
  padding 0
  transform translateY(0px)
  transition all 0.25s ease-in-out

  input
    background transparent
    cursor text
    height 3em
    appearance none
    border none
    outline none
    font-size 1em
    // If there are no results
    &:focus:after
      content 'No results'
      display block
      color black
      padding 1em 1em
      min-height 2em
      display flex
      flex-direction column
      justify-content center
      border-bottom 1px solid alpha($colorWhite500, 0.05)


    &:focus
      cursor auto
      appearance none
      outline none

  *, *:before, *:after
    box-sizing: border box
  // width 100%

.search-hidden
  transform: translateY(100%)

.suggestions
  width 100%
  margin 0
  padding 0
  list-style none

.suggestion
  width 100%
  margin 0
  padding 0
  list-style none

.suggestion-link
  display block
  padding 1em 1em
  min-height 2em
  display flex
  flex-direction column
  justify-content center
  border-bottom 1px solid alpha($colorWhite500, 0.05)


@media (min-width: $breakM)
  .icon-back
    display none
  .search-box
    display inline-block
    width: auto
    position relative
    background transparent

    input
      background-color $colorBlack200
      border 1px solid $colorBlack50
      color $colorWhite500
      font-size 1rem
      padding 0
      height auto
      line-height 1.4
      padding 0.5rem
      border-radius 0.25em
  
  .search-hidden
      transform none
  
  .suggestions
    display block
    position absolute
    top 100%
</style>
