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
        'tc-primary500 active': active,
        'bc-primary500': active && !isSubHeader,
        'tc-text100': !active,
        'sidebar-link br-25rem w-100 l8 tc-h-primary500 mt-0 mb-05 pr-025': true
      }
    },
    resolveHeaderTitle(text)
  )
}

function renderChildren(h, children, path, route, maxDepth, depth = 1) {
  if (!children || depth > maxDepth) return null
  return h(
    'ul',
    { class: 'pl-1' },
    children.map(c => {
      const active = isActive(route, path + '#' + c.slug)
      return h('li', { class: 'pl-1' }, [
        renderLink(h, path + '#' + c.slug, c.title, active, true),
        renderChildren(h, c.children, path, route, maxDepth, depth + 1)
      ])
    })
  )
}
</script>
