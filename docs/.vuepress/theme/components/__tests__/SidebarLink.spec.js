import { shallowMount } from '@vue/test-utils'
import SidebarLink from "@/theme/components/SidebarLink"

jest.mock("../../../theme/utils/util");

describe('SidebarLink', () => {

  let config = {
    propsData: {
      item: {
        basePath: "/",
        path: "/",
        children: [],
        title: "No Children",
        headers: ["header1", "header2", "header3"]
      }
    },
    context: {
      parent: {
        $route: {}
      }
    },
    mocks: {
      $page: {
        frontmatter: {
          sidebarDepth: 2
        }
      },
      $site: {
        themeConfig: {
          sidebarDepth: 2,
          displayAllHeaders: true
        }
      }
    },
    stubs: ['router-link']
  }

  test('without children and headers', () => {
    const configCopy = Object.assign({}, config);
    configCopy.propsData.item = {
      basePath: "/",
      path: "/",
      children: [],
      title: "No Children and Headers",
    }
    const wrapper = shallowMount(SidebarLink, configCopy)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('with headers but no children', () => {
    const configCopy = Object.assign({}, config);
    configCopy.propsData.item = {
      basePath: "/",
      path: "/",
      children: [],
      title: "No Children",
      headers: [{
          level: 1,
          title: "Header 1",
          slug: "header1"
        }, {
          level: 2,
          title: "Header 2",
          slug: "header2"
        }, {
          level: 2,
          title: "Header 3",
          slug: "header3"
        }]
    }
    const wrapper = shallowMount(SidebarLink, configCopy)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('with children in auto mode', () => {
    const configCopy = Object.assign({}, config);
    configCopy.propsData.item = {
      type: "auto",
      basePath: "/",
      path: "/",
      children: [{
        level: 2,
        title: "Child 1",
        slug: "child2"
        }, {
        level: 2,
        title: "Child 2",
        slug: "child2"
      }],
      title: "With Children",
    }
    const wrapper = shallowMount(SidebarLink, configCopy)
    expect(wrapper.element).toMatchSnapshot()
  })
})

