import { mount } from '@vue/test-utils'
import HomePage from "@/components/HomePage"


test('renders correctly', () => {
  const wrapper = mount(HomePage)
  expect(wrapper.element).toMatchSnapshot()
})
