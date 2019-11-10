import { shallowMount } from '@vue/test-utils'
import HomePage from "@/components/HomePage"

describe('HomePage', () => {
  test('show enterprise with en-US', () => {
    const wrapper = shallowMount(HomePage, {
      stubs: ['router-link'],
      mocks: {
        $lang: "en-US"
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('render successfully with Deutsch', () => {
    const wrapper = shallowMount(HomePage, {
      stubs: ['router-link'],
      mocks: {
        $lang: "de"
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
