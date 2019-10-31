import { shallowMount } from '@vue/test-utils'
import SearchBox from "@/theme/components/SearchBox"

describe('SearchBox', () => {
  const mocks = {
    $site: {
      pages: [{
        path: "/learn/",
        title: "Learn Ethereum",
        headers: [
          "what-is-eth",
          "who-build-eth",
          "resources"]
        },{
          path: "/developers/",
          title: "Developers Resources",
          headers: [
            "developer-tools",
            "ui-ux-design",
            "standard"]
        }
      ],
      themeConfig: {
        searchMaxSuggestions: 5
      },
      locales: {
        "/": {
          nav: [{
            items: ["en-US", "en-GB"],
            link: "/"
          }],
        },
        "/de/": {
          nav: "de",
          link: "/de/"
        }
      },
    },
    $localePath: "/"
  }

  test('render searchbox', () => {
    const wrapper = shallowMount(SearchBox, {
      mocks
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('query \"Eth\" in searchbox, show suggsetions', done => {
    const wrapper = shallowMount(SearchBox, {
      mocks
    })
    const searchbox = wrapper.find("input[aria-label]");
    searchbox.setValue("Eth")
    searchbox.trigger("focus")
    // searchbox.trigger("keyup.enter")
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot()
      done()
    })
  })

  test('query \"Satoshi\" in searchbox, but no suggsetions return', done => {
    const wrapper = shallowMount(SearchBox, {
      mocks
    })
    const searchbox = wrapper.find("input[aria-label]");
    searchbox.setValue("Satoshi")
    searchbox.trigger("focus")
    // searchbox.trigger("keyup.enter")
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot()
      done()
    })
  })
})

