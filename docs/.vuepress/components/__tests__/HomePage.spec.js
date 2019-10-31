import { shallowMount } from '@vue/test-utils'
import HomePage from "@/components/HomePage"

describe('HomePage', () => {
  test('render successfully', () => {
    const wrapper = shallowMount(HomePage, {
      stubs: ['router-link']
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
