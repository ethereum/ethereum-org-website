import { shallowMount } from '@vue/test-utils'
import SidebarLink from "@/theme/components/SidebarLink"


describe("As user i see a sidebar link", () => {
  test('Rendered without childs', () => {
    const wrapper = shallowMount(SidebarLink, {
      propsData: {
        item: {
          type: 'auto', path:'/whales', basePath: '/', slug: 'big', title: 'Whales', headers: ['whales'], children: []
        },
        collapsable: true,
        first: true,
        open: true
      },
      mocks: {
        $page: {frontmatter: {sidebarDepth: 1}},
        $site: { themeConfig: {displayAllHeaders: true}},
        $route: {'hash': '89452c3t7c0923479827'},
        $siteTitle: 'Click me!'
      }
    });

    expect(wrapper.element).toMatchSnapshot()
  });

  test('Rendered with childs', () => {
    const wrapper = shallowMount(SidebarLink, {
      propsData: {
        item: {
          type: 'auto', path:'/whales', basePath: '/', slug: 'big', title: 'Whales', headers: ['whales'], children: [
            { slug: 'big', title: 'Whales'}
          ]
        },
        collapsable: true,
        first: true,
        open: true
      },
      mocks: {
        $page: {frontmatter: {sidebarDepth: 1}},
        $site: { themeConfig: {displayAllHeaders: true}},
        $route: {'hash': '89452c3t7c0923479827'},
        $siteTitle: 'Click me!'
      }
    });

    expect(wrapper.element).toMatchSnapshot()
  });

  test('Rendered without display all headers', () => {
    const wrapper = shallowMount(SidebarLink, {
      propsData: {
        item: {
          type: 'auto', path:'/whales', basePath: '/', slug: 'big', title: 'Whales', headers: ['whales'], children: []
        },
        collapsable: true,
        first: true,
        open: true
      },
      mocks: {
        $page: {frontmatter: {sidebarDepth: 1}},
        $site: { themeConfig: {displayAllHeaders: false}},
        $route: {'hash': '89452c3t7c0923479827'},
        $siteTitle: 'Click me!'
      }
    });

    expect(wrapper.element).toMatchSnapshot()
  });
});
