import { shallowMount } from '@vue/test-utils'
import SidebarButton from "@/theme/components/SidebarButton"

describe("As user i see a sidebargroup", () => {
  test('Rendered open with first element', () => {
    const wrapper = shallowMount(SidebarButton, {
      propsData: {
        item: {
          type: 'group',

          children: [{path: '/'}, {path: '/es/'}]
        },
        collapsable: true,
        first: true,
        open: true
      },
      mocks: {
        $site: {themeConfig: {logo: ''}},
        $siteTitle: 'Click me!'
      }
    });

    expect(wrapper.element).toMatchSnapshot()
  });

  test('Rendered closed with first element', () => {
    const wrapper = shallowMount(SidebarButton, {
      propsData: {
        item: {
          type: 'group',

          children: [{path: '/'}, {path: '/es/'}]
        },
        collapsable: true,
        first: true,
        open: false
      },
      mocks: {
        $site: {themeConfig: {logo: ''}},
        $siteTitle: 'Click me!'
      }
    });

    expect(wrapper.element).toMatchSnapshot()
  });

  test('Rendered closed with tail element', () => {
    const wrapper = shallowMount(SidebarButton, {
      propsData: {
        item: {
          type: 'group',

          children: [{path: '/'}, {path: '/es/'}]
        },
        collapsable: true,
        first: false,
        open: false
      },
      mocks: {
        $site: {themeConfig: {logo: ''}},
        $siteTitle: 'Click me!'
      }
    });

    expect(wrapper.element).toMatchSnapshot()
  });


  test('Rendered open with tail element', () => {
    const wrapper = shallowMount(SidebarButton, {
      propsData: {
        item: {
          type: 'group',
          children: [{path: '/'}, {path: '/es/'}]
        },
        collapsable: true,
        first: false,
        open: true
      },
      mocks: {
        $site: {themeConfig: {logo: ''}},
        $siteTitle: 'Click me!'
      }
    });

    expect(wrapper.element).toMatchSnapshot()
  });
});