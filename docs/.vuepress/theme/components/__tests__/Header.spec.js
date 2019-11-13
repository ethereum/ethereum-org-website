import { shallowMount } from '@vue/test-utils'
import Header from "@/theme/components/Header"

describe('Header', () => {
  test('render header with searchbox', () => {
    const wrapper = shallowMount(Header, {
      mocks: {
        $site: {
          themeConfig: {
            search: true
          }
        }
      },
      stubs: ['router-link']
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('render header without searchbox', () => {
    const wrapper = shallowMount(Header, {
      mocks: {
        $site: {
          themeConfig: {
            search: false
          }
        }
      },
      stubs: ['router-link']
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  // test('toggle mode', () => {
  //   const wrapper = shallowMount(Header, {
  //     mocks: {
  //       $site: {
  //         themeConfig: {
  //           search: true
  //         }
  //       }
  //     },
  //     stubs: ['router-link']
  //   })
  //   wrapper.find("span.pointer").trigger("click")
  //   expect(wrapper.element).toMatchSnapshot()
  // })
})

