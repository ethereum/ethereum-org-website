import { shallowMount } from '@vue/test-utils'
import DefaultList from "@/components/DefaultList"

describe('DefaultList', () => {
  test('list items', () => {
    const wrapper = shallowMount(DefaultList, {
      propsData: {
        items: [{
          name: "Bitcoin",
          description: "The 1st Crytocurrency in the world"
        },{
          name: "Ethereum",
          description: "The smart contract blockchain"
        }]
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('list no items', () => {
    const wrapper = shallowMount(DefaultList, {
      propsData: {
        items: []
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
