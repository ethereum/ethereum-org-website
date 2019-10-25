<template>
  <div>
    <h2>Ethereum.org is available in the following languages:</h2>
    <div class="lang-list">
      <router-link :to="lang.path" class="lang-item" v-for="lang in completed" :key="lang.name">
        <div class="lang-english-name">{{lang['english-name']}}</div>
        <router-link class="lang-name" :to="lang.path">{{lang.name}}</router-link>
      </router-link>
    </div>
    <h2>The following language translations are in progress:</h2>
    <p>TODO: explain what translation vs review progress means</p>
    <div class="lang-list">
      <a
        :href="lang.url"
        target="_blank"
        class="lang-item"
        v-for="lang in incomplete"
        :key="lang.code"
      >
        <div class="lang-english-name">{{lang.name}}</div>
        <div>Translation progress: {{lang.translated_progress}}%</div>
        <div>Review progress: {{lang.approved_progress}}%</div>
        <a :href="lang.url" target="_blank">Contribute</a>
      </a>
    </div>
  </div>
</template>

<script>
import { translations } from "../theme/utils/translations";
const axios = require("axios");

export default {
  data() {
    // TODO add loading state for this section?
    // https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html
    return {
      completed: translations,
      incomplete: []
    };
  },

  mounted() {
    axios
      .get('/.netlify/functions/crowdin')
      .then(response => {
        let languages = [];
        if (response.data && response.data.data) {
          languages = response.data.data;
        }
        const completedLangCodes = Object.keys(this.completed);
        const incomplete = languages
          .filter(lang => {
            return !completedLangCodes.includes(lang.code);
          })
          .map(lang => {
            lang.url = `https://crowdin.com/project/ethereumfoundation/${lang.code}`;
            return lang;
          })
          .sort((a, b) => a.name.localeCompare(b.name));
        this.incomplete = incomplete;
      })
      // TODO create error case
      .catch(error => console.log(error));
  }
};
</script>

<style lang="stylus" scoped>
  @import '../theme/styles/config.styl';

  h2
    border-bottom none

  p
    margin-bottom 1rem

  .lang-list
    display flex
    flex-wrap wrap
    margin 0
    margin-top 2rem
    margin-bottom 2rem

  .lang-item
    flex 0 1 260px
    list-style none
    margin 1 rem
    padding 0
    padding-top 1rem
    padding-left 1rem
    padding-bottom 1rem
    color $textColor
    border 1px dotted $textColor
    border-radius .5 rem
    width 100%

    &:hover
      border 1px dotted $accentColor

  .lang-english-name
    font-size $fsRegular
    color $textColor
    padding-bottom 0.5rem

  .lang-name
    font-size $fsLarge
    padding-bottom 0.5rem

  #wrapper.dark-mode
    h2
      border-bottom none

    .lang-item
      border 1px dotted $lightBorderColorDark
      color $textColorDark

      &:hover
        border 1px dotted $accentColorDark

    .lang-english-name
      color $textColorDark

  @media (max-width: $breakXS)
    .lang-item
      margin 0
      margin-top 1rem
      flex 1 1 260px
</style>