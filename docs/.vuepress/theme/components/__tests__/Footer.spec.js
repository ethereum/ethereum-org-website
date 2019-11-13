import { shallowMount } from '@vue/test-utils';
import Footer from '@/theme/components/Footer';

describe('Footer', () => {
  // TODO test lastUpdatedDate
  test('render successfully', () => {
    const mocks = {
      $site: {
        pages: [
          {
            path: '/learn/',
            title: 'Learn Ethereum',
            lastUpdated: 1573079934862
          },
          {
            path: '/developers/',
            title: 'Developers Resources',
            lastUpdated: 1573079934865
          },
          {
            path: '/enterprise/',
            title: 'Ethereum for Enterprise',
            lastUpdated: 1573079934863
          }
        ],
        themeConfig: {
          searchMaxSuggestions: 5
        },
        locales: {
          '/': {
            nav: [
              {
                items: ['en-US', 'en-GB'],
                link: '/'
              }
            ]
          },
          '/de/': {
            nav: 'de',
            link: '/de/'
          }
        }
      },
      $localePath: '/',
      $router: []
    };
    const wrapper = shallowMount(Footer, {
      stubs: ['router-link'],
      mocks
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
