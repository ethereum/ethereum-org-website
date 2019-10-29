import { shallowMount } from '@vue/test-utils'
import Footer from "@/theme/components/Footer"

describe('Footer', () => {
  test('render successfully', () => {
    const wrapper = shallowMount(Footer)
    expect(wrapper.element).toMatchSnapshot()
  })
})

