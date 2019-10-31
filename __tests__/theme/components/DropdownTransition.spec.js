import { mount } from '@vue/test-utils'
import DropdownTransition from "@/theme/components/DropdownTransition.vue"


test('renders correctly', () => {
  const wrapper = mount(DropdownTransition, {
    slots: {
      default: '<div class="fake-msg"></div>'
    }
  });
  expect(wrapper.element).toMatchSnapshot()
});