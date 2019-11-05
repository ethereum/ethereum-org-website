import { mount } from '@vue/test-utils'
import DropdownLink from "@/theme/components/DropdownLink.vue"


test('renders correctly', () => {
  const wrapper = mount(DropdownLink, {
    propsData: {
      item: {
        text: "Menu",
        items: [{
          text: "Testing",
          type: "links",
          items: [
            {
              text: "Snapshooting",
              link: "http://eth.org/snapshot" 
            },
            {
              text: "Snapshooting",
              link: "http://eth.org/snapshot" 
            }
          ]
        }, {
          text: "Sketch",
          link: "http://eth.org/snapshot"  
        }, {
          text: "Languajes",
          link: "http://eth.org/snapshot"  
        }]
      }
    }
  })
  expect(wrapper.element).toMatchSnapshot()
})

