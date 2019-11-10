import { shallowMount } from '@vue/test-utils'
import DropdownTransition from "@/theme/components/DropdownTransition"

describe('DropdownTransition', () => {
  test('render slots correctly', () => {
    const wrapper = shallowMount(DropdownTransition, {
      slots: {
        default: '<div class="box"><p>Ethereum</p></div>'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })


  test('render transition after enter', done => {
    const wrapper = shallowMount(DropdownTransition, {
      slots: {
        default: '<div />'
      }
    })
    wrapper.trigger("transitionstart")
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot()
      done()
    })
  })
})
