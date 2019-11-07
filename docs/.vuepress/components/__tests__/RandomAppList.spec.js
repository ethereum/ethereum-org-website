import { shallowMount } from '@vue/test-utils'
import RandomAppList from "@/components/RandomAppList"

describe('RandomAppList', () => {
  test('render randon app list', () => {
    const wrapper = shallowMount(RandomAppList)
    expect(wrapper.element).toMatchSnapshot()
  })
})
