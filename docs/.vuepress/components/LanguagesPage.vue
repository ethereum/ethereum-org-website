<template>
  <div>
    <T h2 l3>Ethereum.org is available in the following languages:</T>
    <div class="lang-list">
      <router-link
        :to="lang.path"
        class="lang-item border-box-shadow-hover"
        v-for="lang in completed"
        :key="lang.language"
      >
        <T div l6 cText s200 class="mt0 mb05">{{ lang['language-english'] }}</T>
        <T routerLink l4 cText s500 ma0 :to="lang.path">{{ lang.language }}</T>
      </router-link>
    </div>

    <T h2 l3>The following language translations are in progress:</T>
    <div class="lang-list">
      <a
        :href="lang.url"
        target="_blank"
        rel="noopener noreferrer"
        class="lang-item border-box-shadow-hover"
        v-for="lang in incomplete"
        :key="lang.code"
      >
        <T h3 l4 cText s500 class="mt0 mb05">{{ lang.name }}</T>
        <T p l5 cText s400 ma0>
          Translation progress: {{ lang.translated_progress }}%<br />
          Review progress: {{ lang.approved_progress }}%<br />
          <T
            a
            :href="lang.url"
            target="_blank"
            rel="noopener noreferrer"
            class="block mt05"
          >
            Contribute
          </T>
        </T>
      </a>
    </div>
  </div>
</template>

<script>
import { translations } from '../theme/utils/translations'
const axios = require('axios')

export default {
  data() {
    // TODO add loading & error states for this section
    // https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html
    return {
      completed: translations,
      incomplete: []
    }
  },

  mounted() {
    axios
      .get('/.netlify/functions/translations')
      .then(response => {
        let languages = []
        if (response.data && response.data.data) {
          languages = response.data.data
        }
        const completedLangCodes = Object.keys(this.completed)
        const incomplete = languages
          .map(lang => {
            lang.url = `https://crowdin.com/project/ethereumfoundation/${lang.code}`
            return lang
          })
          .sort((a, b) => a.name.localeCompare(b.name))
        this.incomplete = incomplete
      })
      // TODO create error case
      .catch(error => console.log(error))
  }
}
</script>

<style lang="stylus" scoped>
@import '../theme/styles/config.styl';

.lang-list
  display flex
  flex-wrap wrap
  margin 0
  margin-top 2rem
  margin-bottom 2rem

.lang-item
  flex 0 1 260px
  list-style none
  margin 1rem
  padding 1.5rem 1rem
  border-radius .5rem
  width 100%

#wrapper.dark-mode
  .lang-item
    &:hover
      border 1px dotted $colorPrimaryDark500

@media (max-width: $breakXS)
  .lang-item
    margin 0
    margin-top 1rem
    flex 1 1 260px
</style>
