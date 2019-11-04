import { shallowMount, mount } from '@vue/test-utils'
import NavLink from "@/theme/components/NavLink.vue"


describe('As user i can see a link', () => {
  test('rendered as normal link', () => {
    const wrapper = mount(NavLink, {
      propsData: {item: { text: "ethereum", link: "https://etherum.org" }}
    });

    expect(wrapper.element).toMatchSnapshot()
  });

  test('rendered as external link', () => {
    const wrapper = shallowMount(NavLink, {
      propsData: {
        item: {
          text: "Wallet",
          link: "wallet://address.com/?account=199283"
        }
      },
      mocks: {
        $site: {
          locales: {
            "es": {label: 'Español', lang: 'es'},
            "en": {label: 'English', lang: 'en'}
          }
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot()
  });

  test('rendered as telephone link', () => {
    const wrapper = mount(NavLink, {
      propsData: {item: { text: "phone", link: "tel:+5215567233201" }}
    });

    expect(wrapper.element).toMatchSnapshot()
  });

  test('rendered as email link', () => {
    const wrapper = mount(NavLink, {
      propsData: { item: {text: "email", link: "mailto:contact@ethereum.org"}}
    });

    expect(wrapper.element).toMatchSnapshot()
  });
});