import { shallowMount } from '@vue/test-utils'
import LanguageIcon from "@/theme/components/LanguageIcon"

describe('LanguageIcon', () => {
  test('render successfully', () => {
    const wrapper = shallowMount(LanguageIcon)
    expect(wrapper.element).toMatchSnapshot()
  })
})

