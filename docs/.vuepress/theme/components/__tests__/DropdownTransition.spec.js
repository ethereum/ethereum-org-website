import { shallowMount } from '@vue/test-utils'
import DropdownTransition from "@/theme/components/DropdownTransition"

describe('DropdownTransition', () => {
  test('render successfully', () => {
    const wrapper = shallowMount(DropdownTransition)
    expect(wrapper.element).toMatchSnapshot()
  })
})
