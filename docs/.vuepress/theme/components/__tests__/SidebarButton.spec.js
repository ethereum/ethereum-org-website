import { shallowMount } from '@vue/test-utils'
import SidebarButton from "@/theme/components/SidebarButton"

describe('SidebarButton', () => {
  test('render without site title', () => {
    const wrapper = shallowMount(SidebarButton)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('render with site title', () => {
    const wrapper = shallowMount(SidebarButton, {
      mocks: {
        $site: {
          themeConfig: {
            logo: "./eth-diamond"
          }
        },
        $siteTitle: "Ethereum"
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})

