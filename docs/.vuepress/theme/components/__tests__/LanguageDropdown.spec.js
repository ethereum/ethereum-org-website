import { shallowMount } from '@vue/test-utils'
import LanguageDropdown from "@/theme/components/LanguageDropdown"

describe('LanguageDropdown', () => {
  let mocks = {
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
      path: "/en/"
    },
    $localeConfig: {
      path: "en"
    },
    $router: {
      options: {
        routes: [{
          path: "/en/"
        }, {
          path: "/de/"
        }]
      }
    }
  }

  test('render the languages correctly', () => {
    const wrapper = shallowMount(LanguageDropdown, {
      mocks
    })
    expect(wrapper.vm.languages).toEqual({"items": [{"link": "/en/", "text": "English"}, {"link": "/de/", "text": "Deutsch"}], "text": "Languages"})
    expect(wrapper.element).toMatchSnapshot()
  })

  test('render when locales are empty', () => {
    var mocksCopy = Object.assign({}, mocks);
    mocksCopy.$site.locales = {}
    const wrapper = shallowMount(LanguageDropdown, {
      mocks: mocksCopy
    })
    expect(wrapper.vm.languages).toEqual({"items": [], "text": "Languages"})
    expect(wrapper.element).toMatchSnapshot()
  })
})
