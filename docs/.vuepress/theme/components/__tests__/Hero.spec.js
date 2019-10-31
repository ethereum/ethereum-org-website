import { shallowMount } from '@vue/test-utils'
import Hero from "@/theme/components/Hero"

describe('Hero', () => {

  let playStub;

  beforeAll(() => {
    playStub = jest
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(() => {})
  })

  afterAll(() => {
    playStub.mockRestore()
  });

  test('dark mode', () => {
    const wrapper = shallowMount(Hero, {
      propsData: {
        dark: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('light mode', () => {
    const wrapper = shallowMount(Hero, {
      propsData: {
        dark: false
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})

