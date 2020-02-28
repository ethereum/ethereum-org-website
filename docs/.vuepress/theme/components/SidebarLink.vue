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

function renderLink(h, to, text, active) {
  return h(
    'router-link',
    {
      props: {
        to,
        activeClass: '',
        exactActiveClass: ''
      },
      class: {
        active,
        'sidebar-link': true
      }
    },
    resolveHeaderTitle(text)
  )
}

function renderChildren(h, children, path, route, maxDepth, depth = 1) {
  if (!children || depth > maxDepth) return null
  return h(
    'ul',
    { class: 'sidebar-sub-headers' },
    children.map(c => {
      const active = isActive(route, path + '#' + c.slug)
      return h('li', { class: 'sidebar-sub-header' }, [
        renderLink(h, path + '#' + c.slug, c.title, active),
        renderChildren(h, c.children, path, route, maxDepth, depth + 1)
      ])
    })
  )
}
</script>

<style lang="stylus">
@import '../styles/config.styl'
.sidebar .sidebar-sub-headers
  padding-left 1rem
.sidebar-link
  font-weight 400
  display inline-block
  color: $colorBlack100
  padding 0.35rem 1rem 0.35rem 0
  line-height 1.4
  width: 100%
  box-sizing: border-box
  &:hover
    color $colorPrimary
  &.active
    font-weight 600
    color $colorPrimary
    border-right .25rem solid $colorPrimary
  .sidebar-sub-headers &
    padding-top 0.25rem
    padding-bottom 0.25rem
    border-right-color transparent

.dark-mode
  .sidebar
    .sidebar-link
      color: $colorBlack50
      &.hover
        color $colorPrimaryDark
      &.active
        color $colorPrimaryDark
        border-right .25rem solid $colorPrimaryDark500
    .sidebar-sub-headers
      a
        &.active
          border-right-color transparent
</style>
