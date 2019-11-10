import { shallowMount } from '@vue/test-utils'
import Hero from "@/theme/components/Hero"

jest.useFakeTimers()
jest.mock("../../../theme/scripts/morpher")

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

  test('morph', done => {
    const wrapper = shallowMount(Hero, {
      propsData: {
        dark: true
      }
    })
    jest.advanceTimersByTime(30000);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot()
      done()
    })
  })

  test('pause', done => {
    const wrapper = shallowMount(Hero, {
      propsData: {
        dark: true
      }
    })
    wrapper.setData({playing: false})
    jest.advanceTimersByTime(30000);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot()
      done()
    })
  })

  test('pause and then continue to play', done => {
    const wrapper = shallowMount(Hero, {
      propsData: {
        dark: true
      }
    })
    wrapper.setData({ playing: false })
    jest.advanceTimersByTime(30000);
    wrapper.find("svg").trigger("click")
    jest.advanceTimersByTime(30000);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot()
      done()
    })
  })
})

