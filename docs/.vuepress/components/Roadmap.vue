<template>
  <div>
    <h2>In progress</h2>
    <p>
      Tasks that we're implementing. Go to GitHub for a full list of tasks in
      progress.
    </p>
    <h2>Planned</h2>
    <p>
      Tasks we've queued up to implement next. Go to GitHub for a full list of
      planned tasks.
    </p>
    <h2>Implemented</h2>
    <p>
      Completed tasks. Go to GitHub for a full list of implemented tasks.
    </p>

    <!-- TODO add list of up to 6 issues -->
    <div class="flex flex-wrap m-0 mt-2 mb-2">
      <div
        class="lang-item w-100 ma-1 pt-15 pb-15 pr-1 pl-1 border-box-shadow-hover hide-icon"
        v-for="issue in inProgress"
        :key="issue.number"
      >
        <h4>{{ issue.title }}</h4>

        Task #{{ issue.number }}

        <a :href="issue.url" target="_blank" rel="noopener noreferrer">
          Discuss</a
        >
      </div>
    </div>
    <h2>In progress</h2>
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
      inProgress: [],
      planned: [],
      implemented: [],
      backlog: []
    }
  },

  mounted() {
    axios
      .get('/.netlify/functions/roadmap')
      .then(response => {
        console.log('RESPONSE: ', response)
        let issues = []
        if (response.data && response.data.data) {
          issues = response.data.data
          issues.map(issue => {
            // TODO implement status filters
            // console.log({ issue })
            return issue
          })
          console.log({ issues })
          this.inProgress = issues // TODO implement
        }
      })
      // TODO create error case
      .catch(error => console.log(error))
  }
}
</script>

<style lang="stylus" scoped>
@import '../theme/styles/config.styl';

// TODO use Card component vs. these styles
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
