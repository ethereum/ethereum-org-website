<template>
  <div>
    <div class="headline-text-container">
      <h1 class="headline-title">{{content['page-home-title']}}</h1>
      <div class="headline-subtitle">{{content['page-home-subtitle']}}</div>
    </div>

    <div class="intro-blocks">
      <router-link to="/beginners/" class="intro-block">
        <h3>
          <span class="arrow">→</span>{{content['page-home-section-beginners-title']}}
        </h3>
        <ul>
          <li class="highlight">{{content['page-home-section-beginners-item-one']}}</li>
          <li>{{content['page-home-section-beginners-item-two']}}</li>
          <li>{{content['page-home-section-beginners-item-three']}}</li>
        </ul>
      </router-link>

      <div class="intro-block">
        <h3>
          <router-link to="/use/">
            <span class="arrow">→</span>{{content['page-home-section-use-title']}}
          </router-link>
        </h3>
        <ul>
          <li>
            <router-link
              to="/use/#_1-use-an-application-built-on-ethereum"
              class="black"
            >{{content['page-home-section-use-item-one']}}</router-link>
          </li>
          <li>
            <router-link
              to="/use/#_2-what-is-eth-and-how-do-i-get-it"
              class="black"
            >{{content['page-home-section-use-item-two']}}</router-link>
          </li>
          <li>
            <router-link
              to="/use/#_3-what-is-a-wallet-and-which-one-should-i-use"
              class="black"
            >{{content['page-home-section-use-item-three']}}</router-link>
          </li>
        </ul>
      </div>

      <div class="intro-block">
        <h3>
          <router-link to="/learn/">
            <span class="arrow">→</span>{{content['page-home-section-learn-title']}}
          </router-link>
        </h3>
        <ul>
          <li>
            <router-link to="/learn/#ethereum-basics" class="black">{{content['page-home-section-learn-item-one']}}</router-link>
          </li>
          <li>
            <router-link to="/learn/#how-ethereum-works" class="black">{{content['page-home-section-learn-item-two']}}</router-link>
          </li>
          <li>
            <router-link to="/learn/#eth-2-0" class="black">{{content['page-home-section-learn-item-three']}}</router-link>
          </li>
        </ul>
      </div>

      <div class="intro-block">
        <h3>
          <router-link to="/developers/">
            <span class="arrow">→</span>{{content['page-home-section-developers-title']}}
          </router-link>
        </h3>
        <ul>
          <li>
            <router-link to="/developers/#getting-started" class="black">{{content['page-home-section-developers-item-one']}}</router-link>
          </li>
          <li>
            <router-link
              to="/developers/#smart-contract-languages"
              class="black"
            >{{content['page-home-section-developers-item-two']}}</router-link>
          </li>
          <li>
            <router-link
              to="/developers/#developer-tools"
              class="black"
            >{{content['page-home-section-developers-item-three']}}</router-link>
          </li>
        </ul>
      </div>

      <div class="intro-block" v-if="shouldShowEnterprise">
        <h3>
          <router-link to="/enterprise/">
            <span class="arrow">→</span>{{content['page-home-section-enterprise-title']}}
          </router-link>
        </h3>
        <ul>
          <li>
            <router-link
              to="/enterprise/#why-enterprise-ethereum"
              class="black"
            >{{content['page-home-section-enterprise-item-one']}}</router-link>
          </li>
          <li>
            <router-link to="/enterprise/#enterprise-features" class="black">{{content['page-home-section-enterprise-item-two']}}</router-link>
          </li>
          <li>
            <router-link
              to="/enterprise/#enterprise-developer-community"
              class="black"
            >{{content['page-home-section-enterprise-item-three']}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { translate } from '../theme/utils/translations'

  export default {
    computed: {
      // TODO there must be a better way...
      // How to use translate() within Vue component template??
      content() {
        return {
          'page-home-title': translate('page-home-title', this.$lang),
          'page-home-subtitle': translate('page-home-subtitle', this.$lang),
          'page-home-section-beginners-title': translate('page-home-section-beginners-title', this.$lang),
          'page-home-section-beginners-item-one': translate('page-home-section-beginners-item-one', this.$lang),
          'page-home-section-beginners-item-two': translate('page-home-section-beginners-item-two', this.$lang),
          'page-home-section-beginners-item-three': translate('page-home-section-beginners-item-three', this.$lang),
          'page-home-section-use-title': translate('page-home-section-use-title', this.$lang),
          'page-home-section-use-item-one': translate('page-home-section-use-item-one', this.$lang),
          'page-home-section-use-item-two': translate('page-home-section-use-item-two', this.$lang),
          'page-home-section-use-item-three': translate('page-home-section-use-item-three', this.$lang),
          'page-home-section-learn-title': translate('page-home-section-learn-title', this.$lang),
          'page-home-section-learn-item-one': translate('page-home-section-learn-item-one', this.$lang),
          'page-home-section-learn-item-two': translate('page-home-section-learn-item-two', this.$lang),
          'page-home-section-learn-item-three': translate('page-home-section-learn-item-three', this.$lang),
          'page-home-section-developers-title': translate('page-home-section-developers-title', this.$lang),
          'page-home-section-developers-item-one': translate('page-home-section-developers-item-one', this.$lang),
          'page-home-section-developers-item-two': translate('page-home-section-developers-item-two', this.$lang),
          'page-home-section-developers-item-three': translate('page-home-section-developers-item-three', this.$lang),
          'page-home-section-enterprise-title': translate('page-home-section-enterprise-title', this.$lang),
          'page-home-section-enterprise-item-one': translate('page-home-section-enterprise-item-one', this.$lang),
          'page-home-section-enterprise-item-two': translate('page-home-section-enterprise-item-two', this.$lang),
          'page-home-section-enterprise-item-three': translate('page-home-section-enterprise-item-three', this.$lang)
        }
      },

      // only English has Enterprise page
      shouldShowEnterprise() {
        return this.$lang === 'en-US'
      }
    }
  }
</script>