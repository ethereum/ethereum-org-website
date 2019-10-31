import { shallowMount } from '@vue/test-utils'
import DropdownTransition from "@/theme/components/DropdownTransition"

describe('DropdownTransition', () => {
  test('render slots correctly', () => {
    const wrapper = shallowMount(DropdownTransition, {
      slots: {
        default: '<div />'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })


  test('render transition after enter', () => {
    const wrapper = shallowMount(DropdownTransition, {
      slots: {
        default: '<div id="dropdown"> </div>'
      }
    })
    wrapper.find("#dropdown").trigger("enter")
    expect(wrapper.element).toMatchSnapshot()
  })
})
