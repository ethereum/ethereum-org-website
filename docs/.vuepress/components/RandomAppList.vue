<template>
  <RandomList :n="7" :items="items"></RandomList>
</template>

<script>
import { translate } from '../theme/utils/translations'
import RandomList from './RandomList.vue'

export default {
  components: { RandomList },

  computed: {
    items() {
      return [
        {
          name: 'Gitcoin',
          url: 'https://gitcoin.co',
          description: translate('dapp-desc-gitcoin', this.$lang)
        },
        {
          name: 'Cent',
          url: 'https://beta.cent.co',
          description: translate('dapp-desc-cent', this.$lang)
        },
        {
          name: 'Gods Unchained',
          url: 'https://godsunchained.com/',
          description: translate('dapp-desc-gods-unchained', this.$lang)
        },
        {
          name: 'DAI',
          url: 'https://makerdao.com/en/',
          description: translate('dapp-desc-makerdao', this.$lang)
        },
        {
          name: 'Decentraland',
          url: 'https://decentraland.org/',
          description: translate('dapp-desc-decentraland', this.$lang)
        },
        {
          name: 'Dharma',
          url: 'https://www.dharma.io/',
          description: translate('dapp-desc-dharma', this.$lang)
        },
        {
          name: 'Augur',
          url: 'https://www.augur.net/',
          description: translate('dapp-desc-augur', this.$lang)
        }
      ]
    }
  }
}
</script>
