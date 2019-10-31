import { shallowMount } from '@vue/test-utils'
import LanguagesPage from "@/components/LanguagesPage.vue"
import axios from 'axios';

jest.mock('axios');

describe('LanguagesPage', () => {
  beforeAll(() => {
    const languages = {data: [
      {
        "name": "English",
        "path": "/",
        "english-name": "English"
      },
      {
        "name": "Deutsch",
        "path": "/de/",
        "english-name": "German"
      }
    ]};
    const resp = { data: languages };
    axios.get.mockResolvedValue(resp);
  })

  test('render successfully', () => {
    const wrapper = shallowMount(LanguagesPage, {
      stubs: ['router-link']
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
