import { mount } from '@vue/test-utils'
import Hero from "@/theme/components/Hero.vue"


describe('As user i see a hero', () => {
  test('it is rendered in light mode', () => {
    const wrapper = mount(Hero, {
      propsData: {
        dark: false
      }
    });

    expect(wrapper.element).toMatchSnapshot()
  });


  test('it is rendered in dark mode', () => {
    const wrapper = mount(Hero, {
      propsData: {
        dark: true
      }
    });

    expect(wrapper.element).toMatchSnapshot()
  });
})