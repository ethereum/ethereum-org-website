import { shallowMount } from '@vue/test-utils'
import Sidebar from "@/theme/components/Sidebar"

jest.mock("../../../theme/utils/util");

describe('Sidebar', () => {
  test('render empty sidebar', () => {
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


  test('render sidebar items', () => {
    const wrapper = shallowMount(Sidebar, {
      propsData: {
        items: [
          {
            title: "item1",
            children: []
          },
          {
            title: "item2",
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

  test('render sidebar groups', () => {
    const wrapper = shallowMount(Sidebar, {
      propsData: {
        items: [
          {
            type: "group",
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
})

