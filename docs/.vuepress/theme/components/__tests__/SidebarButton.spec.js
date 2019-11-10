import { shallowMount } from '@vue/test-utils'
import SidebarButton from "@/theme/components/SidebarButton"

describe('SidebarButton', () => {
  test('render without site title', () => {
    const wrapper = shallowMount(SidebarButton, {
      stubs: ['router-link']
    })
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
      },
      stubs: ['router-link']
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})

