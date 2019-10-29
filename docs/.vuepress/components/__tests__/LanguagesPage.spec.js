import { shallowMount } from '@vue/test-utils'
import LanguagesPage from "@/components/LanguagesPage.vue"

describe('LanguagesPage', () => {
  test('render successfully', () => {
    const wrapper = shallowMount(LanguagesPage)
    expect(wrapper.element).toMatchSnapshot()
  })
})
