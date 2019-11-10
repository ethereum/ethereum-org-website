import { shallowMount } from '@vue/test-utils'
import SearchBox from "@/theme/components/SearchBox"

describe('SearchBox', () => {
  const mocks = {
    $site: {
      pages: [{
          path: "/learn/",
          title: "Learn Ethereum",
          headers: [{
              title: "What is Ethereum",
              slug: "what-is-ethereum"
            }, {
              title: "Who build Ethereum",
              slug: "who-build-ethereum"
            }, {
              title: "Resources",
              slug: "resources"
            }]
        },{
          path: "/developers/",
          title: "Developers Resources",
          headers: [{
              title: "Developer Tools",
              slug: "developer-tools"
            }, {
              title: "UI/UX Design",
              slug: "ui-ux-design"
            }, {
              title: "Standards",
              slug: "standards"
            }]
        },{
          path: "/enterprise/",
          title: "Ethereum for Enterprise",
          headers: [{
              title: "Why Ethereum",
              slug: "why-ethereum"
            }, {
              title: "Contact",
              slug: "contact"
            }]
        },{
          path: "/de/enterprise/",
          title: "Ethereum für Unternehmen",
          headers: [{
            title: "Warum Ethereum",
            slug: "why-ethereum"
          }, {
              title: "Kontakt",
            slug: "contact"
          }]
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
    $localePath: "/",
    $router: []
  }

  test('render searchbox before focus', () => {
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
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot()
      done()
    })
  })

  test('query \"Standards\" in searchbox, return headers', done => {
    const wrapper = shallowMount(SearchBox, {
      mocks
    })
    const searchbox = wrapper.find("input[aria-label]");
    searchbox.setValue("Standards")
    searchbox.trigger("focus")
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot()
      done()
    })
  })

  test('unfocus suggestions', done => {
    const wrapper = shallowMount(SearchBox, {
      mocks
    })
    const searchbox = wrapper.find("input[aria-label]");
    searchbox.setValue("Eth")
    searchbox.trigger("focus")
    wrapper.find("ul.suggestions").trigger("mouseleave")
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot()
      done()
    })
  })

  test('suggestions keyup.up', done => {
    const wrapper = shallowMount(SearchBox, {
      mocks
    })
    const searchbox = wrapper.find("input[aria-label]");
    searchbox.setValue("Eth")
    searchbox.trigger("focus")
    // key up 3 times
    searchbox.trigger("keyup.up")
    searchbox.trigger("keyup.up")
    searchbox.trigger("keyup.up")
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot()
      done()
    })
  })

  test('suggestions keyup.down', done => {
    const wrapper = shallowMount(SearchBox, {
      mocks
    })
    const searchbox = wrapper.find("input[aria-label]");
    searchbox.setValue("Eth")
    searchbox.trigger("focus")
    // key down 3 times
    searchbox.trigger("keyup.down")
    searchbox.trigger("keyup.down")
    searchbox.trigger("keyup.down")
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot()
      done()
    })
  })

  test('suggestions keyup.enter', done => {
    const wrapper = shallowMount(SearchBox, {
      mocks
    })
    const searchbox = wrapper.find("input[aria-label]");
    searchbox.setValue("Eth")
    searchbox.trigger("focus")
    searchbox.trigger("keyup.down")
    searchbox.trigger("keyup.enter")
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot()
      done()
    })
  })
})

