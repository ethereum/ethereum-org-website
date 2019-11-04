import { mount } from '@vue/test-utils'
import AssetItem from "@/components/AssetItem"


test('renders correctly', () => {
  const wrapper = mount(AssetItem, {
    propsData: {
      assetPath: "eth-diamond"
    }
  })
  expect(wrapper.element).toMatchSnapshot()
})
