import { shallowMount } from '@vue/test-utils'
import Header from "@/theme/components/Header.vue"


test('renders correctly', () => {
  const wrapper = shallowMount(Header,{
    mocks: {
      $site: {
        themeConfig: {
          search: true
        }
      }
    }
  });

  expect(wrapper.element).toMatchSnapshot()
});