import { shallowMount } from '@vue/test-utils'
import SidebarButton from "@/theme/components/SidebarButton"

test('Render sidebar button', () => {
  const wrapper = shallowMount(SidebarButton, {
    mocks: {
      $site: {themeConfig: {logo: ''}},
      $siteTitle: 'Click me!'
    }
  });

  expect(wrapper.element).toMatchSnapshot()
});