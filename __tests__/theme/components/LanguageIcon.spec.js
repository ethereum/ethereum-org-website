import { mount } from '@vue/test-utils'
import LanguageIcon from "@/theme/components/LanguageIcon.vue"


test('renders correctly', () => {
  const wrapper = mount(LanguageIcon);
  expect(wrapper.element).toMatchSnapshot()
});