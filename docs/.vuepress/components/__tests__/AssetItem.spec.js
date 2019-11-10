import { shallowMount } from '@vue/test-utils'
import AssetItem from "@/components/AssetItem"

describe('AssetItem', () => {
  test('render icon successfully', () => {
    const wrapper = shallowMount(AssetItem, {
      propsData: {
        assetPath: "eth-logo-white-black"
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})

