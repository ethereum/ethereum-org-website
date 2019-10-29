import { shallowMount } from '@vue/test-utils'
import SidebarLink from "@/theme/components/SidebarLink"

jest.mock("@/theme/utils/util")

describe('SidebarLink', () => {

  test('render without children', () => {

    const wrapper = shallowMount(SidebarLink, {
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
            sidebarDepth: 1
          }
        },
        $site: {
          themeConfig: {
            displayAllHeaders: true
          }
        }
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  // test('render with children', () => {

  //   const wrapper = shallowMount(SidebarLink, {
  //     propsData: {
  //       item: {
  //         basePath: "/",
  //         path: "/",
  //         children: ["child1", "child2"],
  //         title: "With Children",
  //         headers: ["header1", "header2", "header3"]
  //       },
  //       context: {
  //         parent: {
  //           $route: {}
  //         }
  //       },
  //       mocks: {
  //         $page: {
  //           frontmatter: {
  //             sidebarDepth: 1
  //           }
  //         },
  //         $site: {
  //           themeConfig: {
  //             displayAllHeaders: true
  //           }
  //         }
  //       }
  //     }
  //   })
  //   expect(wrapper.element).toMatchSnapshot()
  // })
})

