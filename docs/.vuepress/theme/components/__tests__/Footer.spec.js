import { shallowMount } from '@vue/test-utils'
import Footer from "@/theme/components/Footer"

describe('Footer', () => {
  test('render successfully', () => {
    const wrapper = shallowMount(Footer, {
      stubs: ['router-link']
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})

