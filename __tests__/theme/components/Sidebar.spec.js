import { shallowMount } from '@vue/test-utils'
import Sidebar from "@/theme/components/Sidebar"

test('Render sidebar with groups and links', () => {
    const wrapper = shallowMount(Sidebar, {
      propsData: {
        items: [{
          type: 'group',
          collapsable: true,
          children: [{path: '/'}, {path: '/es/'}]
        }, {
          title: 'random',
          link: 'https://random.link'
        }]
      },
      mocks: {
        $route: {hash: '8929j90rmqc23ur894yt9ych94c'}
      }
    });

    expect(wrapper.element).toMatchSnapshot()
});