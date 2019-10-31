import { mount } from '@vue/test-utils'
import Footer from "@/theme/components/Footer.vue"


test('renders correctly', () => {
  const wrapper = mount(Footer);
  expect(wrapper.element).toMatchSnapshot()
});