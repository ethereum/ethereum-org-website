import { shallowMount } from '@vue/test-utils'
import NavLinks from "@/theme/components/NavLinks"

jest.mock("../../../theme/utils/translations");

describe('NavLinks', () => {

  const mocks = {
    $site: {
      locales: {
        "/": {
          nav: [{
            items: ["en-US", "en-GB"],
            link: "/"
          }],
        },
        "/de/": {
          nav: "de",
          link: "/de/"
        }
      },
    },
    $lang: "en-US"
  }

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

  test('render as sidebar, with navigation and sub-items', () => {
    const wrapper = shallowMount(NavLinks, {
      propsData: {
        isSidebar: true
      },
      mocks
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('render not as sidebar', () => {
    const wrapper = shallowMount(NavLinks, {
      propsData: {
        isSidebar: false
      },
      mocks
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
