<script>
import {
  isActive,
  hashRE,
  groupHeaders,
  resolveHeaderTitle
} from '../utils/util'

export default {
  functional: true,

  props: ['item'],

  render(h, { parent: { $page, $site, $route }, props: { item } }) {
    // use custom active class matching logic
    // due to edge case of paths ending with / + hash
    const selfActive = isActive($route, item.path)
    // for sidebar: auto pages, a hash link should be active if one of its child
    // matches
    const active =
      item.type === 'auto'
        ? selfActive ||
          item.children.some(c =>
            isActive($route, item.basePath + '#' + c.slug)
          )
        : selfActive
    const link = renderLink(h, item.path, item.title || item.path, active)
    const configDepth =
      $page.frontmatter.sidebarDepth != null
        ? $page.frontmatter.sidebarDepth
        : $site.themeConfig.sidebarDepth
    const maxDepth = configDepth == null ? 1 : configDepth
    const displayAllHeaders = !!$site.themeConfig.displayAllHeaders
    if (item.type === 'auto') {
      return h('div', {}, [
        link,
        renderChildren(h, item.children, item.basePath, $route, maxDepth)
      ])
    } else if (
      (active || displayAllHeaders) &&
      item.headers &&
      !hashRE.test(item.path)
    ) {
      const children = groupHeaders(item.headers)
      return h('div', {}, [
        link,
        renderChildren(h, children, item.path, $route, maxDepth)
      ])
    } else {
      return link
    }
  }
}

function renderLink(h, to, text, active, isSubHeader = false) {
  return h(
    'a',
    {
      attrs: {
        href: to
      },
      class: {
        'tc-primary500': active,
        'active relative': active && !isSubHeader,
        'header relative pl-1': !isSubHeader,
        'subheader relative pl-075': isSubHeader,
        'tc-text100': !active,
        'sidebar-link inline-block w-100 l8 tc-h-primary500 mt-0 mb-05 pr-025': true
      }
    },
    resolveHeaderTitle(text)
  )
}

function renderChildren(h, children, path, route, maxDepth, depth = 1) {
  if (!children || depth > maxDepth) return null
  return h(
    'ul',
    { class: 'no-bullets pl-0' },
    children.map(c => {
      const active = isActive(route, path + '#' + c.slug)
      return h('li', { class: 'pl-1 ml-0' }, [
        renderLink(h, path + '#' + c.slug, c.title, active, true),
        renderChildren(h, c.children, path, route, maxDepth, depth + 1)
      ])
    })
  )
}
</script>

<style lang="stylus" scoped>
@import '../../theme/styles/config.styl';
.active,
.subheader:hover,
.header:hover
  &:after
    content ''
    background-color $colorPrimary500
    border 1px solid $colorPrimary500
    border-radius 50%
    width .5rem
    height .5rem
    position absolute
    left -.29rem
    top 50%
    margin-top -.25rem

.subheader:hover,
.header:not(.active):hover
  &:after
    background-color $colorWhite

.subheader
  &:hover
    &:after
      left: -1.29rem
  &:before
    content '⌞'
    opacity 0.5
    display inline-flex
    position absolute
    left 0
    top -2px

.dark-mode
  .active,
  .subheader:hover,
  .header:hover
    &:after
      content ''
      background-color $colorPrimaryDark500
      border 1px solid $colorPrimaryDark500

  .subheader:hover,
  .header:not(.active):hover
    &:after
      background-color $colorBlack
</style>
