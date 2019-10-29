import { shallowMount } from '@vue/test-utils'
import Sidebar from "@/theme/components/Sidebar"

describe('Sidebar', () => {
  test('render sidebar groups', () => {
    const wrapper = shallowMount(Sidebar, {
      propsData: {
        items: [
          {
            title: "group1",
            children: ["a", "b"]
          },
          {
            title: "group2",
            children: []
          },
        ]
      },
      mocks: {
        $route: {}
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('render no sidebar groups', () => {
    const wrapper = shallowMount(Sidebar, {
      propsData: {
        items: []
      },
      mocks: {
        $route: {}
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})

