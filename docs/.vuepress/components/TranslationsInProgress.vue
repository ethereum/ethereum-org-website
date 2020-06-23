<template>
  <div>
    <div class="flex flex-wrap m-0 mt-2 mb-2">
      <a
        :href="lang.url"
        target="_blank"
        rel="noopener noreferrer"
        class="lang-item w-100 ma-1 pt-15 pb-15 pr-1 pl-1 border-box-shadow-hover hide-icon"
        v-for="lang in incomplete"
        :key="lang.code"
      >
        <h3 class="l4 tc-text500 mt-0 mb-05">{{ lang.name }}</h3>
        <p class="l5 tc-text400 ma-0">
          Translation progress: {{ lang.translated_progress }}%<br />
          Review progress: {{ lang.approved_progress }}%<br />
          <a
            :href="lang.url"
            target="_blank"
            rel="noopener noreferrer"
            class="block mt-05"
          >
            Contribute
          </a>
        </p>
      </a>
    </div>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  data() {
    // TODO add loading & error states for this section
    // https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html
    return {
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

.lang-item
  flex 0 1 260px
  list-style none
  border-radius .5rem
  width 100%

  & > h3:before
    display none

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
