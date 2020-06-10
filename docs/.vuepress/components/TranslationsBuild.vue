<template>
  <div>
    <div class="m-0 mt-2 mb-2">
      <pre>
        {{ message }}
        </pre
      >
      <p>
        Visit our project to bulk download translation files:
        <a
          href="https://crowdin.com/project/ethereumfoundation"
          target="_blank"
          rel="noopener noreferrer"
          >https://crowdin.com/project/ethereumfoundation</a
        >
      </p>
    </div>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  data() {
    return {
      message: 'Loading...'
    }
  },

  mounted() {
    axios
      .get('/.netlify/functions/translation-build')
      .then(response => {
        const data = response.data.data
        if (data && data.success) {
          this.message = `Build ${data.success.status}. Files are up to date!`
        }
      })
      // TODO create error case
      .catch(error => {
        console.log(error)
        this.message = error
      })
  }
}
</script>
