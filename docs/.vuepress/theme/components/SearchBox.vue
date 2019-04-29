<template>
  <div class="search-box">
    <input
      @input="query = $event.target.value"
      aria-label="Search"
      :value="query"
      :class="{ 'focused': focused }"
      autocomplete="off"
      spellcheck="false"
      @focus="focused = true"
      @blur="focused = false"
      @keyup.enter="go(focusIndex)"
      @keyup.up="onUp"
      @keyup.down="onDown"
    >
    <ul
      class="suggestions"
      v-if="showSuggestions"
      :class="{ 'align-right': alignRight }"
      @mouseleave="unfocus"
    >
      <li
        class="suggestion"
        v-for="(s, i) in suggestions"
        :class="{ focused: i === focusIndex }"
        @mousedown="go(i)"
        @mouseenter="focus(i)"
      >
        <a :href="s.path" @click.prevent>
          <span class="page-title">{{ s.title || s.path }}</span>
          <span v-if="s.header" class="header">&gt; {{ s.header.title }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      focused: false,
      focusIndex: 0
    }
  },

  computed: {
    showSuggestions () {
      return (
        this.focused &&
        this.suggestions &&
        this.suggestions.length
      )
    },

    suggestions () {
      const query = this.query.trim().toLowerCase()
      if (!query) {
        return
      }

      const { pages, themeConfig } = this.$site
      const max = themeConfig.searchMaxSuggestions || 5
      const localePath = this.$localePath
      const matches = item => (
        item.title &&
        item.title.toLowerCase().indexOf(query) > -1
      )
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
              res.push(Object.assign({}, p, {
                path: p.path + '#' + h.slug,
                header: h
              }))
            }
          }
        }
      }
      return res
    },

    // make suggestions align right when there are not enough items
    alignRight () {
      const navCount = (this.$site.themeConfig.nav || []).length
      const repo = this.$site.repo ? 1 : 0
      return navCount + repo <= 2
    }
  },

  methods: {
    getPageLocalePath (page) {
      for (const localePath in this.$site.locales || {}) {
        if (localePath !== '/' && page.path.indexOf(localePath) === 0) {
          return localePath
        }
      }
      return '/'
    },

    onUp () {
      if (this.showSuggestions) {
        if (this.focusIndex > 0) {
          this.focusIndex--
        } else {
          this.focusIndex = this.suggestions.length - 1
        }
      }
    },

    onDown () {
      if (this.showSuggestions) {
        if (this.focusIndex < this.suggestions.length - 1) {
          this.focusIndex++
        } else {
          this.focusIndex = 0
        }
      }
    },

    go (i) {
      if (!this.showSuggestions) {
        return
      }
      this.$router.push(this.suggestions[i].path)
      this.query = ''
      this.focusIndex = 0
    },

    focus (i) {
      this.focusIndex = i
    },

    unfocus () {
      this.focusIndex = -1
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/config.styl'

.search-box
  display inline-block
  position relative
  margin-right 1rem
  input
    cursor text
    width 10rem
    color $textColor
    display inline-block
    border 1px dotted $textColor
    border-radius 2rem
    font-size $fsXSmall
    line-height 2em
    padding 0.2em 0.5em 0.2em 2rem
    outline none
    transition width .2s ease
    background #fff url(../images/icon-search.svg) 0.5rem 0.35rem no-repeat
    background-size 1.25rem
    &:focus
      cursor auto
      border-style solid
      border-color $accentColor
  .suggestions
    font-size $fsSmall
    background #fff
    width 20rem
    position absolute
    top 1.5rem
    right -1rem
    border 1px solid darken($borderColor, 10%)
    border-radius 6px
    padding 0.4rem
    list-style-type none
    max-width 80vw
    &.align-right
      right 0
  .suggestion
    line-height 1.4
    padding 0.4rem 0.6rem
    border-radius 4px
    cursor pointer
    a
      white-space normal
      color lighten($textColor, 50%)
      .page-title
        font-weight 600
      .header
        margin-left 0.25em
    &.focused
      background-color lighten($accentColor, 95%)
      a
        color $accentColor

@media (max-width: $breakM)
  .search-box
    input
      cursor pointer
      width 0
      border-color transparent
      position relative
      background transparent url(../images/icon-search.svg) 0.5rem 0.25rem no-repeat
      padding-left 2.3rem

      &:focus
        background #fff url(../images/icon-search.svg) 0.5rem 0.25rem no-repeat
        cursor text
        left 0
        width 10rem

  #wrapper.dark-mode
    .search-box
      input
        border transparent
        &:focus
          border 1px solid $textColorDark

@media (max-width: $breakM) and (min-width: $breakS)
  .search-box
    .suggestions
      right -6rem

@media (max-width: $breakS)
  .search-box
    .suggestions
      right -6rem
      // max-width 80
    input:focus
      width 8rem
</style>
