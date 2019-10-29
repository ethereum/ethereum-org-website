import { shallowMount } from '@vue/test-utils'
import SearchBox from "@/theme/components/SearchBox"

describe('SearchBox', () => {
  test('render searchbox', () => {
    const wrapper = shallowMount(SearchBox)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('searchbox suggest', () => {
    const wrapper = shallowMount(SearchBox)
    wrapper.find("input[aria-label]").setValue("eth")
    wrapper.find("input[aria-label]").trigger("keyup.enter")
    expect(wrapper.element).toMatchSnapshot()
  })
})

