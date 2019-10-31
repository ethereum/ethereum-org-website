import { shallowMount } from '@vue/test-utils'
import SidebarGroup from "@/theme/components/SidebarGroup"

describe('SidebarGroup', () => {
  test('render item with children, group is open', () => {
    const wrapper = shallowMount(SidebarGroup, {
      propsData: {
        item: {
          title: "group",
          children: ["a", "b"]
        },
        open: true,
        collapse: false
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('render item without children, group is closed', () => {
    const wrapper = shallowMount(SidebarGroup, {
      propsData: {
        item: {
          title: "group",
          children: []
        },
        open: false,
        collapse: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})

