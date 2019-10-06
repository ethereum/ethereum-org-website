<template>
  <div>
    <h1>Language Support</h1>
    <p>Ethereum is a global project, and it is critical that Ethereum.org is accessible to everyone, regardless of their nationality or language. Our community has been working hard to make this vision a reality.</p>
    <h2>Ethereum.org is available in the following languages:</h2>
    <ul>
      <li class="lang-item" v-for="lang in completed" :key="lang.name">
        <div class="lang-english-name">{{lang['english-name']}}</div>
        <router-link class="lang-name" :to="lang.path">{{lang.name}}</router-link>
      </li>
    </ul>
    <h2>The following language translations are in progress:</h2>
    <ul>
      <li class="lang-item" v-for="lang in incomplete" :key="lang.code">
        <div class="lang-english-name">{{lang.name}}</div>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfsV1sG7OEPRzO6zDdj0BsYo9DR1L3nSSmCvYktftLjhQ4CoA/viewform"
          target="_blank"
        >Contribute</a>
      </li>
    </ul>
    <p>
      You can view the status of all translations
      <a
        href="https://crowdin.com/project/ethereumfoundation"
        target="_blank"
      >here</a>.
    </p>
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

export default {
  data() {
    const completed = translations;

    // TODO turn this into an API request to get real-time status
    // May need to create a simple server due to CORS issues...
    // curl -d "json" -X POST https://api.crowdin.com/api/project/ethereumfoundation/status?key=CROWDIN_API_KEY
    const crowdinLanguages = [
      {
        name: "Arabic",
        code: "ar",
        phrases: "404",
        translated: "252",
        approved: "0",
        words: "3763",
        words_translated: "1757",
        words_approved: "0",
        translated_progress: 46,
        approved_progress: 0,
        qa_issues: 161
      },
      {
        name: "Chinese Simplified",
        code: "zh-CN",
        phrases: "404",
        translated: "404",
        approved: "404",
        words: "3763",
        words_translated: "3763",
        words_approved: "3763",
        translated_progress: 100,
        approved_progress: 100,
        qa_issues: 0
      },
      {
        name: "Czech",
        code: "cs",
        phrases: "404",
        translated: "2",
        approved: "0",
        words: "3763",
        words_translated: "4",
        words_approved: "0",
        translated_progress: 0,
        approved_progress: 0,
        qa_issues: 1
      },
      {
        name: "Dutch",
        code: "nl",
        phrases: "404",
        translated: "65",
        approved: "0",
        words: "3763",
        words_translated: "652",
        words_approved: "0",
        translated_progress: 17,
        approved_progress: 0,
        qa_issues: 31
      },
      {
        name: "French",
        code: "fr",
        phrases: "404",
        translated: "404",
        approved: "404",
        words: "3763",
        words_translated: "3763",
        words_approved: "3763",
        translated_progress: 100,
        approved_progress: 100,
        qa_issues: 0
      },
      {
        name: "German",
        code: "de",
        phrases: "404",
        translated: "404",
        approved: "404",
        words: "3763",
        words_translated: "3763",
        words_approved: "3763",
        translated_progress: 100,
        approved_progress: 100,
        qa_issues: 2
      },
      {
        name: "Greek",
        code: "el",
        phrases: "404",
        translated: "404",
        approved: "402",
        words: "3763",
        words_translated: "3763",
        words_approved: "3759",
        translated_progress: 100,
        approved_progress: 99,
        qa_issues: 1
      },
      {
        name: "Indonesian",
        code: "id",
        phrases: "404",
        translated: "16",
        approved: "0",
        words: "3763",
        words_translated: "79",
        words_approved: "0",
        translated_progress: 2,
        approved_progress: 0,
        qa_issues: 6
      },
      {
        name: "Italian",
        code: "it",
        phrases: "404",
        translated: "404",
        approved: "404",
        words: "3763",
        words_translated: "3763",
        words_approved: "3763",
        translated_progress: 100,
        approved_progress: 100,
        qa_issues: 5
      },
      {
        name: "Japanese",
        code: "ja",
        phrases: "404",
        translated: "404",
        approved: "260",
        words: "3763",
        words_translated: "3763",
        words_approved: "2529",
        translated_progress: 100,
        approved_progress: 67,
        qa_issues: 2
      },
      {
        name: "Klingon",
        code: "tlh-AA",
        phrases: "404",
        translated: "0",
        approved: "0",
        words: "3763",
        words_translated: "0",
        words_approved: "0",
        translated_progress: 0,
        approved_progress: 0,
        qa_issues: 0
      },
      {
        name: "Korean",
        code: "ko",
        phrases: "404",
        translated: "404",
        approved: "398",
        words: "3763",
        words_translated: "3763",
        words_approved: "3732",
        translated_progress: 100,
        approved_progress: 99,
        qa_issues: 5
      },
      {
        name: "Malayalam",
        code: "ml-IN",
        phrases: "404",
        translated: "0",
        approved: "0",
        words: "3763",
        words_translated: "0",
        words_approved: "0",
        translated_progress: 0,
        approved_progress: 0,
        qa_issues: 0
      },
      {
        name: "Persian",
        code: "fa",
        phrases: "404",
        translated: "32",
        approved: "0",
        words: "3763",
        words_translated: "183",
        words_approved: "0",
        translated_progress: 4,
        approved_progress: 0,
        qa_issues: 4
      },
      {
        name: "Portuguese",
        code: "pt-PT",
        phrases: "404",
        translated: "0",
        approved: "0",
        words: "3763",
        words_translated: "0",
        words_approved: "0",
        translated_progress: 0,
        approved_progress: 0,
        qa_issues: 0
      },
      {
        name: "Portuguese, Brazilian",
        code: "pt-BR",
        phrases: "404",
        translated: "266",
        approved: "0",
        words: "3763",
        words_translated: "2671",
        words_approved: "0",
        translated_progress: 70,
        approved_progress: 0,
        qa_issues: 152
      },
      {
        name: "Punjabi",
        code: "pa-IN",
        phrases: "404",
        translated: "0",
        approved: "0",
        words: "3763",
        words_translated: "0",
        words_approved: "0",
        translated_progress: 0,
        approved_progress: 0,
        qa_issues: 0
      },
      {
        name: "Russian",
        code: "ru",
        phrases: "404",
        translated: "404",
        approved: "404",
        words: "3763",
        words_translated: "3763",
        words_approved: "3763",
        translated_progress: 100,
        approved_progress: 100,
        qa_issues: 25
      },
      {
        name: "Slovak",
        code: "sk",
        phrases: "404",
        translated: "404",
        approved: "404",
        words: "3763",
        words_translated: "3763",
        words_approved: "3763",
        translated_progress: 100,
        approved_progress: 100,
        qa_issues: 0
      },
      {
        name: "Spanish (Modern)",
        code: "es-EM",
        phrases: "404",
        translated: "404",
        approved: "404",
        words: "3763",
        words_translated: "3763",
        words_approved: "3763",
        translated_progress: 100,
        approved_progress: 100,
        qa_issues: 0
      },
      {
        name: "Swedish",
        code: "sv-SE",
        phrases: "404",
        translated: "0",
        approved: "0",
        words: "3763",
        words_translated: "0",
        words_approved: "0",
        translated_progress: 0,
        approved_progress: 0,
        qa_issues: 0
      }
    ];

    const completedLangCodes = Object.keys(completed);
    const incomplete = crowdinLanguages.filter(
      lang => !completedLangCodes.includes(lang.code)
    );

    return {
      completed,
      incomplete
    };
  }
};
</script>

<style lang="stylus" scoped>
  @import '../theme/styles/config.styl';

  h2
    border-bottom none
    margin-top 1rem

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