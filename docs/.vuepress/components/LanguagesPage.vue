<template>
  <div>
    <h1>Languages</h1>
    <h2>Ethereum.org is available in the following languages:</h2>
    <ul>
      <li class="lang-item" v-for="lang in completed" :key="lang.name">
        <div>{{lang['english-name']}}</div>
        <h3>
          <router-link :to="lang.path" target="_blank">{{lang.name}}</router-link>
        </h3>
      </li>
    </ul>
    <h2>The following language translations are underway:</h2>
    <p>
      You can view the status of each translation
      <a href="https://crowdin.com/project/ethereumfoundation" target="_blank">here</a>.
    </p>
    <ul>
      <li class="lang-item" v-for="lang in incomplete" :key="lang.code">
        <div>{{lang.name}}</div>
        <h3>{{lang.name}}</h3>
        <div>Translation progress: %{{lang['translated_progress']}}</div>
        <div>Approved progress: %{{lang['approved_progress']}}</div>
        <a :href="lang.url">Contribute</a>
      </li>
    </ul>
    <h2>Get involved!</h2>
    <p>We're looking for volunteers to help with our translation efforts. Help us keep our translations up to date!</p>
  </div>
</template>

<script>
import { translations } from "../theme/utils/translations";
// import { crowdinData } from "./crowdin.json";
import { log } from "util";

// async function postData(url = "", data = {}) {
//   // Default options are marked with *
//   const response = await fetch(url, {
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     mode: "cors", // no-cors, *cors, same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin", // include, *same-origin, omit
//     headers: {
//       "Content-Type": "application/json"
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: "follow", // manual, *follow, error
//     referrer: "no-referrer", // no-referrer, *client
//     body: JSON.stringify(data) // body data type must match "Content-Type" header
//   });
//   return await response.json(); // parses JSON response into native JavaScript objects
// }

export default {
  data() {
    const completed = translations;

    return {
      completed,
      incomplete: []
    };
  },

  mounted() {
    // TODO fetch this from crowdin API... need a server to avoid CORS issues?
    fetch("../crowdin.json")
      .then(r => r.json())
      .then(langs => {
        const completedLangCodes = Object.keys(this.completed);
        this.incomplete = langs
          .filter(lang => !completedLangCodes.includes(lang.code))
          .map(lang => {
            lang.url = 'https://crowdin.com/project/ethereumfoundation/' + lang.code
            return lang
          })
      });
  }

  // mounted() {
  // const data = { json: '' }
  // fetch(
  //   "https://api.crowdin.com/api/project/ethereumfoundation/status?key=a6db5f5e589aa9c6b0a7112588bac366",
  //   {
  //     method: "POST", // *GET, POST, PUT, DELETE, etc.
  //     mode: "no-cors", // no-cors, *cors, same-origin
  //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //     // credentials: "same-origin", // include, *same-origin, omit
  //     // headers: {
  //       // "Content-Type": "application/json"
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //     // },
  //     // redirect: "follow", // manual, *follow, error
  //     // referrer: "no-referrer", // no-referrer, *client
  //     body: JSON.stringify(data)
  //   }
  // fetch("https://api.coindesk.com/v1/bpi/currentprice.json", {
  //   method: "GET", // *GET, POST, PUT, DELETE, etc.
  //   mode: "no-cors", // no-cors, *cors, same-origin
  //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //   // credentials: "same-origin", // include, *same-origin, omit
  //   headers: {
  //     "Content-Type": "application/json"
  //     // 'Content-Type': 'application/x-www-form-urlencoded',
  //   }
  // }).then(response => {
  //   console.log(response);
  //   debugger;
  // });
  // }
};
</script>

<style lang="stylus" scoped>
ul {
  display: flex;
  flex-wrap: wrap;
}

li {
  flex: 1 1 25%;
  padding: 10px;
  // width 25%;
  list-style: none;
  padding: 0;
}
</style>