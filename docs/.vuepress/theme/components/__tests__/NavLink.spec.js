import { shallowMount } from '@vue/test-utils'
import NavLink from "@/theme/components/NavLink"

describe('NavLink', () => {
  test('render as external link', () => {
    const wrapper = shallowMount(NavLink, {
      propsData: {
        item: {
          text: "external link",
          link: "https://google.com"
        }
      },
      stubs: ['router-link', 'OutboundLink']
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('render as email', () => {
    const wrapper = shallowMount(NavLink, {
      propsData: {
        item: {
          text: "email",
          link: "mailto:abc@google.com"
        }
      },
      stubs: ['router-link', 'OutboundLink']
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('render as tel', () => {
    const wrapper = shallowMount(NavLink, {
      propsData: {
        item: {
          text: "tel",
          link: "tel:1778901652"
        }
      },
      stubs: ['router-link', 'OutboundLink']
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('render as link with locales', () => {
    const wrapper = shallowMount(NavLink, {
      propsData: {
        item: {
          text: "English",
          link: "/"
        }
      },
      mocks: {
        $site: {
          locales: {
            "en": {
              label: "English",
              lang: "en"
            },
            "de": {
              label: "Deutsch",
              lang: "de"
            }
          },
        }
      },
      stubs: ['router-link', 'OutboundLink']
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
