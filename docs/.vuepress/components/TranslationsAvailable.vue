<template>
  <div>
    <div class="flex flex-wrap m-0 mt-2 mb-2">
      <router-link
        :to="lang.path"
        class="lang-item w-100 ma-1 pt-15 pb-15 pr-1 pl-1 border-box-shadow-hover"
        v-for="lang in completed"
        :key="lang.language"
      >
        <div class="l6 tc-text200 mt-0 mb-05">
          {{ lang['language-english'] }}
        </div>
        <router-link class="l4 tc-text500 ma-0" :to="lang.path">{{
          lang.language
        }}</router-link>
      </router-link>
    </div>
  </div>
</template>

<script>
import { translations } from '../theme/utils/translations'
const axios = require('axios')

export default {
  data() {
    let langArray = []
    for (const lang in translations) {
      langArray.push(translations[lang])
    }
    langArray.sort(function(a, b) {
      var langA = a['language-english']
      var langB = b['language-english']
      return langA < langB ? -1 : 1
    })

    return {
      completed: langArray
    }
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
