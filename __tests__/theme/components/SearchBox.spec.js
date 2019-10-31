import { shallowMount } from '@vue/test-utils'
import SearchBox from "@/theme/components/SearchBox.vue"


describe("As user i see a searchbox", () => {
  test('empty, without content', () => {
    const wrapper = shallowMount(SearchBox, {
      mocks: {
        $lang: 'en-US',
        $localePath: '/',
        $page: {path: '/'},
        $pages: ['/'],
        $site: {
          themeConfig: {
            search: true,
            searchMaxSuggestions: 10
          },
          locales: {
            "es": {label: 'Español', lang: 'es'},
            "en": {label: 'English', lang: 'en-US'}
          },
          nav: []
        },
        $router: {
          options: {routes: []}
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot()
  });


  test('with text and recomendations ', () => {
    const wrapper = shallowMount(SearchBox, {
      mocks: {
        $lang: 'en-US',
        $localePath: '/',
        $page: {path: '/'},
        $site: {
          pages: [{title: 'Whales everywhere!', headers: ['Whale', 'Crypto', 'Contracts']}],
          themeConfig: {
            search: true,
            searchMaxSuggestions: 10
          },
          locales: {
            "/es/": {label: 'Español', lang: 'es'},
            "/": {label: 'English', lang: 'en-US'}
          },
          nav: []
        },
        $router: {
          options: {routes: []}
        }
      }
    });

    wrapper.find("input").setValue("Whale")
    expect(wrapper.element).toMatchSnapshot()
  });


  test('with text but without recommendations', () => {
    const wrapper = shallowMount(SearchBox, {
      mocks: {
        $lang: 'en-US',
        $localePath: '/',
        $page: {path: '/'},
        $site: {
          pages: [{title: 'Whales everywhere!', headers: ['Whale', 'Crypto', 'Contracts']}],
          themeConfig: {
            search: true,
            searchMaxSuggestions: 10
          },
          locales: {
            "/es/": {label: 'Español', lang: 'es'},
            "/": {label: 'English', lang: 'en-US'}
          },
          nav: []
        },
        $router: {
          options: {routes: []}
        }
      }
    });

    wrapper.find("input").setValue("Smart")
    expect(wrapper.element).toMatchSnapshot()
  });
});