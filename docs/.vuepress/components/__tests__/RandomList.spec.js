import { shallowMount } from '@vue/test-utils'
import RandomList from "@/components/RandomList"
import { shuffle } from "random-js"

jest.mock('random-js');

describe('RandomList', () => {
  const items = [{
    name: "Bitcoin",
    description: "The 1st Crytocurrency in the world"
  }, {
    name: "Ethereum",
    description: "The smart contract blockchain"
  }, {
    name: "Litecoin",
    description: "A fork of Bitcoin"
  }, {
    name: "Steem",
    description: "The blockchain for social network"
  }]

  beforeAll(() => {
    shuffle.mockImplementation((seed, items) => {
      const first = items.shift()
      items.push(first)
      return items
    })
  })

  test('random display 2 out of 4 items', () => {
    let itemsCopy = [...items]
    const wrapper = shallowMount(RandomList, {
      propsData: {
        items: itemsCopy,
        n: 2
      }
    })
    expect(wrapper.vm.selected).toEqual(items.slice(1, 3)) // compare selected items
    expect(wrapper.element).toMatchSnapshot()
  })

  test('random display 3 out of 4 items', () => {
    let itemsCopy = [...items]
    const wrapper = shallowMount(RandomList, {
      propsData: {
        items: itemsCopy,
        n: 3
      }
    })
    expect(wrapper.vm.selected).toEqual(items.slice(1, 4)) // compare selected items
    expect(wrapper.element).toMatchSnapshot()
  })
})
