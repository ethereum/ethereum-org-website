
import { shallowMount } from '@vue/test-utils'
import Header from "@/theme/components/Header.vue"

describe('As user when i change the language', () => {
  test('if the language is the same stay on the current page', () => {
    const wrapper = shallowMount(Header, {
      mocks: {
        $lang: 'es',
        $page: {path: '/es'},
        $site: {
          themeConfig: {
            search: true
          },
          locales: {
            "es": {label: 'Español', lang: 'es'}
          }
        },
        $router: {
          options: {routes: []}
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot()
  });

  test('if the language changes try to stay on the same page', () => {
    const wrapper = shallowMount(Header, {
      mocks: {
        $lang: 'en',
        $page: {path: '/es'},
        $site: {
          themeConfig: {
            search: true
          },
          locales: {
            "es": {label: 'Español', lang: 'es'},
            "en": {label: 'English', lang: 'en'}
          }
        },
        $localeConfig: {path: '/es'},
        $router: {
          options: {
            routes: [
              {path: '/es'},
              {path: '/en'}
            ]
          }
        }
      }
    });
  });

  test('if the language changes try to stay on the same page', () => {
      const wrapper = shallowMount(Header, {
        mocks: {
          $lang: 'por',
          $page: {path: '/es'},
          $site: {
            themeConfig: {
              search: true
            },
            locales: {
              "es": {label: 'Español', lang: 'es'},
              "en": {label: 'English', lang: 'en'},
              "por": {label: 'Português', lang: 'por'}
            }
          },
          $localeConfig: {path: '/es'},
          $router: {
            options: {
              routes: [
                {path: '/es'},
                {path: '/en'}
              ]
            }
          }
        }
      });

    expect(wrapper.element).toMatchSnapshot()
  });
});