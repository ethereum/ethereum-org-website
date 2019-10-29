import { mount } from '@vue/test-utils'
import LanguagesPage from "@/components/LanguagesPage.vue"


test('renders correctly', () => {
  const wrapper = mount(LanguagesPage)
  expect(wrapper.element).toMatchSnapshot()
})
