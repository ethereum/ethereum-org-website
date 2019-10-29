import { shallowMount } from '@vue/test-utils'
import NavLinks from "@/theme/components/NavLinks"

describe('NavLinks', () => {
  test('render as sidebar, with no navigation', () => {
    const wrapper = shallowMount(NavLinks, {
      propsData: {
        isSidebar: true
      },
      mocks: {
        $site: {
          locales: {
            "/": {}
          },
        },
        $lang: "en-US"
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('render as sidebar, with navigation', () => {
    const wrapper = shallowMount(NavLinks, {
      propsData: {
        isSidebar: true
      },
      mocks: {
        $site: {
          locales: {
            "/": {
              nav: ["en"]
            },
            "/de/": {
              nav: "de"
            }
          },
        },
        $lang: "en-US"
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('render as sidebar, with navigation and sub-items', () => {
    const wrapper = shallowMount(NavLinks, {
      propsData: {
        isSidebar: true
      },
      mocks: {
        $site: {
          locales: {
            "/": {
              nav: [{
                items: ["en-US", "en-GB"]
              }]
            },
            "/de/": {
              nav: "de"
            }
          },
        },
        $lang: "en-US"
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('render not as sidebar', () => {
    const wrapper = shallowMount(NavLinks, {
      propsData: {
        isSidebar: false
      },
      mocks: {
        $site: {
          locales: {
            "/": {}
          },
        },
        $lang: "en-US"
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
