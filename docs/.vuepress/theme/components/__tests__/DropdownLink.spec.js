import { shallowMount } from '@vue/test-utils'
import DropdownLink from '@/theme/components/DropdownLink'

describe('DropdownLink', () => {
  test("non-languages dropdown list; some items' type are links", () => {
    const wrapper = shallowMount(DropdownLink, {
      propsData: {
        item: {
          text: 'Choices',
          items: [
            {
              text: 'currency',
              link: 'http://currency.com',
              type: 'links',
              items: [
                {
                  text: 'USD',
                  link: 'http://currency.com/USD'
                },
                {
                  text: 'BTC',
                  link: 'http://currency.com/BTC'
                }
              ]
            },
            {
              text: 'planet',
              link: 'http://planets.com',
              type: 'images'
            },
            {
              text: 'color',
              link: 'http://colors.com',
              type: 'links',
              items: [
                {
                  text: 'red',
                  link: 'http://color.com/red'
                },
                {
                  text: 'blue',
                  link: 'http://color.com/blue'
                },
                {
                  text: 'green',
                  link: 'http://color.com/green'
                }
              ]
            }
          ]
        }
      },
      stubs: ['router-link']
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('languages dropdown list; item.text === Languages', () => {
    const wrapper = shallowMount(DropdownLink, {
      propsData: {
        item: {
          text: 'Languages',
          items: [
            {
              text: 'English',
              link: 'en'
            },
            {
              text: 'Deutsch',
              link: 'de'
            },
            {
              text: 'Italiano',
              link: 'it'
            }
          ]
        }
      },
      stubs: ['router-link']
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('toggle dropdownlist to be open', done => {
    const wrapper = shallowMount(DropdownLink, {
      propsData: {
        item: {
          text: 'Languages',
          items: [
            {
              text: 'English',
              link: 'en'
            },
            {
              text: 'Deutsch',
              link: 'de'
            },
            {
              text: 'Italiano',
              link: 'it'
            }
          ]
        }
      },
      stubs: ['router-link']
    })
    wrapper.find('button.dropdown-title').trigger('click')
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot()
      done()
    })
  })
})
