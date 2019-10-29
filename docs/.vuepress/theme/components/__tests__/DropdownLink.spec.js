import { shallowMount } from '@vue/test-utils'
import DropdownLink from "@/theme/components/DropdownLink"

describe('DropdownLink', () => {
  test('render successfully for non-languages', () => {
    const wrapper = shallowMount(DropdownLink, {
      propsData: {
        item: {
          text: "choices",
          items: [{
            text: "currency",
            link: "http://currency.com",
            type: "links",
            items: [{
                text: "USD",
                link: "http://currency.com/USD"
              }, {
                text: "BTC",
                link: "http://currency.com/BTC"
              }
            ]}, {
              text: "planet",
              link: "http://planets.com",
              type: "images"
            }, {
              text: "color",
              link: "http://colors.com",
              type: "links",
              items: [{
                  text: "red",
                  link: "http://color.com/red"
                }, {
                  text: "blue",
                  link: "http://color.com/blue"
                }, {
                  text: "green",
                  link: "http://color.com/blue"
                }
              ]
            }]
          }
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('render successfully for languages', () => {
    const wrapper = shallowMount(DropdownLink, {
      propsData: {
        item: {
          text: "Languages",
          items: [{
            text: "English",
            link: "en"
          }, {
            text: "Deutsch",
            link: "de",
          }, {
            text: "Italiano",
            link: "it"
          }]
        }
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

})
