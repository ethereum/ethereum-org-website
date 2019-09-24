<template>
  <div>
    <div class="headline-text-container">
      <h1 class="headline-title">{{content['page-home-title']}}</h1>
      <div class="headline-subtitle">{{content['page-home-subtitle']}}</div>
    </div>

    <div class="intro-blocks">

      <div class="intro-block">
        <h3>
          <router-link :to="content['path'] + 'beginners'">
            <span class="arrow">→</span>{{content['page-home-section-beginners-title']}}
          </router-link>
        </h3>
        <ul>
          <li class="highlight">
            <router-link :to="content['path'] + 'beginners'" class="black">
              {{content['page-home-section-beginners-item-one']}}
            </router-link>
          </li>
          <li>
            <router-link :to="content['path'] + 'beginners'" class="black">
              {{content['page-home-section-beginners-item-two']}}
            </router-link>
          </li>
          <li>
            <router-link :to="content['path'] + 'beginners'" class="black">
              {{content['page-home-section-beginners-item-three']}}
            </router-link>
          </li>
        </ul>
      </div>

      <div class="intro-block">
        <h3>
          <router-link :to="content['path'] + 'use'">
            <span class="arrow">→</span>{{content['page-home-section-use-title']}}
          </router-link>
        </h3>
        <ul>
          <li>
            <router-link :to="content['page-home-section-use-item-one-link']" class="black">
              {{content['page-home-section-use-item-one']}}
            </router-link>
          </li>
          <li>
            <router-link :to="content['page-home-section-use-item-two-link']" class="black">
              {{content['page-home-section-use-item-two']}}
            </router-link>
          </li>
          <li>
            <router-link :to="content['page-home-section-use-item-three-link']" class="black">
              {{content['page-home-section-use-item-three']}}
            </router-link>
          </li>
        </ul>
      </div>

      <div class="intro-block">
        <h3>
          <router-link :to="content['path'] + 'learn'">
            <span class="arrow">→</span>{{content['page-home-section-learn-title']}}
          </router-link>
        </h3>
        <ul>
          <li>
            <router-link :to="content['page-home-section-learn-item-one-link']" class="black">
              {{content['page-home-section-learn-item-one']}}
            </router-link>
          </li>
          <li>
            <router-link :to="content['page-home-section-learn-item-two-link']" class="black">
              {{content['page-home-section-learn-item-two']}}
            </router-link>
          </li>
          <li>
            <router-link :to="content['page-home-section-learn-item-three-link']" class="black">
              {{content['page-home-section-learn-item-three']}}
            </router-link>
          </li>
        </ul>
      </div>

      <div class="intro-block">
        <h3>
          <router-link :to="content['path'] + 'developers'">
            <span class="arrow">→</span>{{content['page-home-section-developers-title']}}
          </router-link>
        </h3>
        <ul>
          <li>
            <router-link :to="content['page-home-section-developers-item-one-link']" class="black">
              {{content['page-home-section-developers-item-one']}}
            </router-link>
          </li>
          <li>
            <router-link :to="content['page-home-section-developers-item-two-link']" class="black">
              {{content['page-home-section-developers-item-two']}}
            </router-link>
          </li>
          <li>
            <router-link :to="content['page-home-section-developers-item-three-link']" class="black">
              {{content['page-home-section-developers-item-three']}}
            </router-link>
          </li>
        </ul>
      </div>

      <div class="intro-block" v-if="shouldShowEnterprise">
        <h3>
          <router-link :to="content['path'] + 'enterprise'">
            <span class="arrow">→</span>{{content['page-home-section-enterprise-title']}}
          </router-link>
        </h3>
        <ul>
          <li>
            <router-link :to="content['page-home-section-enterprise-item-one-link']" class="black">
              {{content['page-home-section-enterprise-item-one']}}
            </router-link>
          </li>
          <li>
            <router-link :to="content['page-home-section-enterprise-item-two-link']" class="black">
              {{content['page-home-section-enterprise-item-two']}}
            </router-link>
          </li>
          <li>
            <router-link :to="content['page-home-section-enterprise-item-three-link']" class="black">
              {{content['page-home-section-enterprise-item-three']}}
            </router-link>
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
          'path': translate('path', this.$lang),
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
          'page-home-section-use-item-one-link': translate('page-home-section-use-item-one-link', this.$lang),
          'page-home-section-use-item-two-link': translate('page-home-section-use-item-two-link', this.$lang),
          'page-home-section-use-item-three-link': translate('page-home-section-use-item-three-link', this.$lang),
          'page-home-section-learn-title': translate('page-home-section-learn-title', this.$lang),
          'page-home-section-learn-item-one': translate('page-home-section-learn-item-one', this.$lang),
          'page-home-section-learn-item-two': translate('page-home-section-learn-item-two', this.$lang),
          'page-home-section-learn-item-three': translate('page-home-section-learn-item-three', this.$lang),
          'page-home-section-learn-item-one-link': translate('page-home-section-learn-item-one-link', this.$lang),
          'page-home-section-learn-item-two-link': translate('page-home-section-learn-item-two-link', this.$lang),
          'page-home-section-learn-item-three-link': translate('page-home-section-learn-item-three-link', this.$lang),
          'page-home-section-developers-title': translate('page-home-section-developers-title', this.$lang),
          'page-home-section-developers-item-one': translate('page-home-section-developers-item-one', this.$lang),
          'page-home-section-developers-item-two': translate('page-home-section-developers-item-two', this.$lang),
          'page-home-section-developers-item-three': translate('page-home-section-developers-item-three', this.$lang),
          'page-home-section-enterprise-title': translate('page-home-section-enterprise-title', this.$lang),
          'page-home-section-developers-item-one-link': translate('page-home-section-developers-item-one-link', this.$lang),
          'page-home-section-developers-item-two-link': translate('page-home-section-developers-item-two-link', this.$lang),
          'page-home-section-developers-item-three-link': translate('page-home-section-developers-item-three-link', this.$lang),
          'page-home-section-enterprise-title': translate('page-home-section-enterprise-title', this.$lang),
          'page-home-section-enterprise-item-one': translate('page-home-section-enterprise-item-one', this.$lang),
          'page-home-section-enterprise-item-two': translate('page-home-section-enterprise-item-two', this.$lang),
          'page-home-section-enterprise-item-three': translate('page-home-section-enterprise-item-three', this.$lang),
          'page-home-section-enterprise-item-one-link': translate('page-home-section-enterprise-item-one-link', this.$lang),
          'page-home-section-enterprise-item-two-link': translate('page-home-section-enterprise-item-two-link', this.$lang),
          'page-home-section-enterprise-item-three-link': translate('page-home-section-enterprise-item-three-link', this.$lang)
        }
      },

      // only English has Enterprise page
      shouldShowEnterprise() {
        return this.$lang === 'en-US'
      }
    }
  }
</script>