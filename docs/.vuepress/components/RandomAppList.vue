<template>
  <RandomList :n="7" :items="items"></RandomList>
</template>

<script>
/*
 *
 */

import RandomList from './RandomList.vue'

export default {
  components: { RandomList },

  data() {
    const items = [
      {
        name: 'Gitcoin',
        url: 'https://gitcoin.co',
        description: 'a network of incentivized open-source developers'
      },
      {
        name: 'Cent',
        url: 'https://beta.cent.co',
        description: 'a social network where you can earn money by posting'
      },
      {
        name: 'Gods Unchained',
        url: 'https://godsunchained.com/',
        description: 'a competitive collectible card game'
      },
      {
        name: 'DAI',
        url: 'https://makerdao.com/en/',
        description: 'a stable cryptocurrency that holds value at $1 USD'
      },
      {
        name: 'Decentraland',
        url: 'https://decentraland.org/',
        description: 'a virtual world owned and built by its users'
      },
      {
        name: 'Dharma',
        url: 'https://www.dharma.io/',
        description: 'the easiest way to earn interest on your cryptocurrency'
      },
      {
        name: 'Augur',
        url: 'https://www.augur.net/',
        description: 'The world’s most accessible, no-limit betting exchange.'
      }
    ]
    return { items }
  }
}
</script>
