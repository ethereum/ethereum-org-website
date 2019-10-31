import { shallowMount } from '@vue/test-utils'
import LanguagesPage from "@/components/LanguagesPage.vue"
import axios from 'axios';

jest.mock("../../theme/utils/translations");
jest.mock('axios');

describe('LanguagesPage', () => {
  test('render page before querying crowdin completes', () => {
    const languages = {
      data: []
    };
    const resp = { data: languages };
    axios.get.mockResolvedValue(resp);

    const wrapper = shallowMount(LanguagesPage, {
      stubs: ['router-link']
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('render page after querying incomplete languages from crowdin', done => {
    const languages = {
      data: [
        {
          "name": "Filipino",
          "code": "ph",
          "url": "https://crowdin/ethereum.org/ph",
          "translated_progress": 45,
          "approved_progress": 0
        },
        {
          "name": "Gujarati",
          "code": "gu",
          "url": "https://crowdin/ethereum.org/gu",
          "translated_progress": 100,
          "approved_progress": 38
        }
      ]
    };
    const resp = { data: languages };
    axios.get.mockResolvedValue(resp);

    const wrapper = shallowMount(LanguagesPage, {
      stubs: ['router-link']
    })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot()
      done()
    })
  })
})
