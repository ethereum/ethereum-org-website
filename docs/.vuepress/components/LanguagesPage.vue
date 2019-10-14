<template>
  <div>
    <h1>Language Support</h1>
    <p>Ethereum is a global project, and it is critical that Ethereum.org is accessible to everyone, regardless of their nationality or language. Our community has been working hard to make this vision a reality.</p>
    <p>Interested in contributing? <a href="#translation-program">Learn more about out Translation Program</a>.</p>
    <h2>Ethereum.org is available in the following languages:</h2>
    <ul>
      <li class="lang-item" v-for="lang in completed" :key="lang.name">
        <div class="lang-english-name">{{lang['english-name']}}</div>
        <router-link class="lang-name" :to="lang.path">{{lang.name}}</router-link>
      </li>
    </ul>
    <h2>The following language translations are in progress:</h2>
    <p>TODO: explain what translation vs review progress means</p>
    <ul>
      <li class="lang-item" v-for="lang in incomplete" :key="lang.code">
        <div class="lang-english-name">{{lang.name}}</div>
        <div>Translation progress: {{lang.translated_progress}}%</div>
        <div>Review progress: {{lang.approved_progress}}%</div>
        <a
          :href="lang.url"
          target="_blank"
        >Contribute</a>
      </li>
    </ul>
    <!-- TODO default anchor link doesn't work https://github.com/vuejs/vue-router/issues/1668 -->
    <h2 id="#translation-program">Translation Program</h2>
    <p>TODO: add instructions on how to sign up & get started</p>
    <h2>Get involved!</h2>
    <p>
      Don't see your language listed?
      <a
        href="https://github.com/ethereum/ethereum-org-website/issues/new"
        target="_blank"
      >Open a new issue</a> to help us track demand.
    </p>
    <p>Interested in translating? We're seeking volunteers! Join over 100 community members who are working to translate the website into 17+ languages.</p>
    <p>
      The volunteer application can be found
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSfsV1sG7OEPRzO6zDdj0BsYo9DR1L3nSSmCvYktftLjhQ4CoA/viewform"
        target="_blank"
      >here</a>.
    </p>
  </div>
</template>

<script>
import { translations } from "../theme/utils/translations";
const axios = require('axios');

export default {
  data() {
    // TODO add loading state for this section?
    // https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html
    return {
      completed: translations,
      incomplete: []
    };
  },

  mounted () {
    axios
      .get('http://localhost:8080/crowdin') // TODO replace
      // .get('/.netlify/functions/crowdin')
        .then(response => {
          let languages = [];
          if (response.data && response.data.data) {
            languages = response.data.data;
          }
          const completedLangCodes = Object.keys(this.completed);
          const incomplete = languages.filter(lang => {
            // TODO this filter doesn't work - update translations keys to match crowdin codes
            return !completedLangCodes.includes(lang.code)
          }).map(lang => {
            lang.url = `https://crowdin.com/project/ethereumfoundation/${lang.code}`
            return lang;
          });
          this.incomplete = incomplete;
        })
        // TODO create error case
        .catch(error => console.log(error))
  }
};
</script>

<style lang="stylus" scoped>
  @import '../theme/styles/config.styl';

  h2
    border-bottom none

  p
    margin-bottom 1rem

  ul
    display flex
    flex-wrap wrap
    margin 0
    margin-top 2rem
    margin-bottom 2rem
    border-bottom 1px dotted $lightBorderColor

  .lang-item
    flex 0 1 30%
    list-style none
    padding 0
    padding-top 1rem
    padding-left 1rem
    padding-bottom 1rem
    border-top 1px dotted $lightBorderColor
    width 100%

  .lang-english-name
    font-size $fsRegular
    padding-bottom 0.5rem

  .lang-name
    font-size $fsLarge
    padding-bottom 0.5rem

  #wrapper.dark-mode
    h2
      border-bottom none
    .lang-item
      border-top 1px dotted $lightBorderColorDark
    ul
      border-bottom 1px dotted $lightBorderColorDark

  @media (max-width: $breakXS)
    .lang-item
      flex 1 1 30%
</style>