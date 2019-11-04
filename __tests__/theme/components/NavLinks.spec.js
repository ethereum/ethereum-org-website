import { shallowMount } from '@vue/test-utils'
import NavLinks from "@/theme/components/NavLinks"


describe('As user i see a navbar', () => {
  test('rendered without links', () => {
    const wrapper = shallowMount(NavLinks, {
      propsData: {
        isSidebar: false
      },
      mocks: {
        $lang: 'en-US',
        $site: {
          locales: {
            "/es/": {label: 'Español', lang: 'es-ES'},
            "/": {label: 'English', lang: 'en-US'}
          }
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot()
  });

  test('rendered with simple and nested links', () => {
    const wrapper = shallowMount(NavLinks, {
      propsData: {
        isSidebar: false
      },
      mocks: {
        $lang: 'en-US',
        $site: {
          locales: {
            "/es/": {label: 'Español', lang: 'es-ES'},
            "/": {label: 'English', lang: 'en-US', nav: [{
                text: "Testing",
                items: [
                  {
                    text: "Snapshooting",
                    link: "http://eth.org/snapshot"
                  },
                  {
                    text: "Snapshooting",
                    link: "http://eth.org/snapshot"
                  }
                ]
              }, {
                text: "Sketch",
                link: "http://eth.org/snapshot"
              }]}
          }
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot()
  });

  test('rendered as sidebar with no links', () => {
    const wrapper = shallowMount(NavLinks, {
      propsData: {
        isSidebar: true
      },
      mocks: {
        $lang: 'en-US',
        $site: {
          locales: {
            "/es/": {label: 'Español', lang: 'es-ES'},
            "/": {label: 'English', lang: 'en-US', nav: []}
          }
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot()
  });


  test('render as sidebar with simple and nested links', () => {
    const wrapper = shallowMount(NavLinks, {
      propsData: {
        isSidebar: true
      },
      mocks: {
        $lang: 'en-US',
        $site: {
          locales: {
            "/es/": {label: 'Español', lang: 'es-ES'},
            "/": {label: 'English', lang: 'en-US', nav: [{
                text: "Testing",
                items: [
                  {
                    text: "Snapshooting",
                    link: "http://eth.org/snapshot"
                  },
                  {
                    text: "Snapshooting",
                    link: "http://eth.org/snapshot"
                  }
                ]
              }, {
                text: "Sketch",
                link: "http://eth.org/snapshot"
              }]}
          }
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot()
  });
});