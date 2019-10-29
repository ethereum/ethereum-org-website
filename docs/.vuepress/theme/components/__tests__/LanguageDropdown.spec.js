import { shallowMount } from '@vue/test-utils'
import LanguageDropdown from "@/theme/components/LanguageDropdown"

describe('LanguageDropdown', () => {
  test('render with locales', () => {
    const wrapper = shallowMount(LanguageDropdown, {
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
        },
        $lang: "ko",
        $page: {
          path: "/en"
        },
        $localeConfig: {
          path: "en"
        },
        $router: {
          options: {
            routes: [{
              path: "/en"
            }, {
              path: "/de"
            }]
          }
        }
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('render without locales', () => {
    const wrapper = shallowMount(LanguageDropdown, {
      mocks: {
        $site: {
          locales: {
          },
        },
        $lang: "ko",
        $page: {
          path: "/en"
        },
        $localeConfig: {
          path: "en"
        },
        $router: {
          options: {
            routes: [{
              path: "/en"
            }, {
              path: "/de"
            }]
          }
        }
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
