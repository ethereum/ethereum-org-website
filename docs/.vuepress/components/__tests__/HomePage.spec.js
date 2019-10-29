import { shallowMount } from '@vue/test-utils'
import HomePage from "@/components/HomePage"

describe('HomePage', () => {
  test('render successfully', () => {
    const wrapper = shallowMount(HomePage)
    expect(wrapper.element).toMatchSnapshot()
  })
})
