<template>
  <div>
    <h2 class="l2">Request a feature</h2>
    Do you have an idea for how to improve ethereum.org?
    <ul>
      <li>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/ethereum/ethereum-org-website/issues/new/choose"
        >
          Create an issue on Github</a
        >
      </li>
      <li>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/ethdotorg"
        >
          Reach out to us on Twitter</a
        >
      </li>
    </ul>
    <h2 class="l2">Ethereum.org Roadmap</h2>
    <p>
      Ever since the launch of ethereum.org, we strive to be transparent about
      how we operate. This is one of our core values, as we believe transparency
      is crucial to Ethereum's success. The
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/ethereum/ethereum-org-website/blob/master/LICENSE"
      >
        source code of this repository is licensed under the MIT License</a
      >.
    </p>
    <p>
      We use
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/ethereum/ethereum-org-website"
      >
        GitHub</a
      >
      as our primary project management tool. We organize our tasks in 3
      categories; in progress, planned and implemented. We do our best to keep
      the community informed what the status is of a specific task.
    </p>

    <h3 class="l3">Work in progress</h3>
    <p>
      Tasks that we're implementing.
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/ethereum/ethereum-org-website/issues?q=is%3Aissue+is%3Aopen+label%3A%22Status%3A+In+Progress%22"
      >
        View the full list of tasks in progress on Github </a
      >.
    </p>
    <div class="flex flex-wrap m-0 mt-2 mb-2">
      <div
        class="issue-item w-100 ma-1 pt-1 pb-1 pr-1 pl-1 border-box-shadow-hover hide-icon"
        v-for="issue in inProgress"
        :key="issue.number"
      >
        <div class="l4 mb-2">{{ issue.title }}</div>

        <div class="issue-content">
          <div>Task #{{ issue.number }}</div>
          <a :href="issue.html_url" target="_blank" rel="noopener noreferrer">
            Discuss
          </a>
        </div>
      </div>
    </div>

    <h3 class="l3">Planned features</h3>
    <p>
      Tasks we've queued up to implement next.
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/ethereum/ethereum-org-website/issues?q=is%3Aissue+is%3Aopen+label%3A%22Status%3A+Up+Next%22"
      >
        View the full list of planned tasks on Github </a
      >.
    </p>
    <div class="flex flex-wrap m-0 mt-2 mb-2">
      <div
        class="issue-item w-100 ma-1 pt-1 pb-1 pr-1 pl-1 border-box-shadow-hover hide-icon"
        v-for="issue in planned"
        :key="issue.number"
      >
        <div class="l4 mb-2">{{ issue.title }}</div>

        <div class="issue-content">
          <div>Task #{{ issue.number }}</div>
          <a :href="issue.html_url" target="_blank" rel="noopener noreferrer">
            Discuss
          </a>
        </div>
      </div>
    </div>
    <h3 class="l3">Implemented features</h3>
    <p>
      Recently completed tasks.
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/ethereum/ethereum-org-website/issues?q=is%3Aissue+is%3Aclosed"
      >
        View the full list of implemented tasks on Github </a
      >.
    </p>

    <div class="flex flex-wrap m-0 mt-2 mb-2">
      <div
        class="issue-item w-100 ma-1 pt-1 pb-1 pr-1 pl-1 border-box-shadow-hover hide-icon"
        v-for="issue in implemented"
        :key="issue.number"
      >
        <div class="l4 mb-2">{{ issue.title }}</div>

        <div class="issue-content">
          <div>Task #{{ issue.number }}</div>
          <a :href="issue.html_url" target="_blank" rel="noopener noreferrer">
            Discuss
          </a>
        </div>
      </div>
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
      inProgress: [],
      planned: [],
      implemented: []
    }
  },

  mounted() {
    axios
      .get('/.netlify/functions/roadmap')
      .then(response => {
        let issues = []
        if (response.data && response.data.data) {
          issues = response.data.data
          this.inProgress = issues
            .filter(issue => {
              // if is an open PR
              if (!!issue.pull_request && issue.state === 'open') {
                return true
              }

              // if issue is in progress
              for (const label of issue.labels) {
                if (label.name === 'Status: In Progress') {
                  return true
                }
              }
              return false
            })
            .slice(0, 6)

          this.planned = issues
            .filter(issue => {
              for (const label of issue.labels) {
                if (label.name === 'Status: Up Next') {
                  return true
                }
              }
            })
            .slice(0, 6)

          this.implemented = issues
            .filter(issue => {
              return issue.state === 'closed'
            })
            .slice(0, 6)

          console.log(issues.length)
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
.issue-item
  flex 0 1 260px
  list-style none
  border-radius .5rem
  width 100%

  display: flex
  flex-direction: column
  justify-content: space-between

  & > h3:before
    display none

.issue-content
  display: flex
  justify-content: space-between

#wrapper.dark-mode
  .issue-item
    &:hover
      border 1px dotted $colorPrimaryDark500

@media (max-width: $breakXS)
  .issue-item
    margin 0
    margin-top 1rem
    flex 1 1 260px
</style>
