<template>
  <footer class="footer flex flex-wrap space-between pt-3 pb-4" id="footer">
    <div class="flex flex-wrap space-between w-100 flex-center">
      <p class="flex flex-center l8 tc-text200">
        <Icon :name="footerLogoVersion" size="48" /> {{ lastUpdatedText }}:
        {{ lastUpdatedDate }}
      </p>
      <!-- Generate our social icons -->
      <ul class="social-links no-bullets pl-0 flex">
        <template v-for="(item, i) in socialLinks">
          <li :class="`social-link flex ma-0 ${i != 0 ? 'ml-05' : ''}`">
            <a
              :href="item.to"
              target="_blank"
              rel="noopener noreferrer"
              class="flex hide-icon"
              :aria-labelledby="item.icon + '-link'"
            >
              <icon :name="item.icon" size="36" />
            </a>
          </li>
        </template>
      </ul>
    </div>
    <!-- Generate multiple lists -->
    <div v-for="(linkCluster, i) in links" class="list-block pr-2">
      <h3 class="l8 c-text500">
        <b>{{ linkCluster.title }}</b>
      </h3>
      <ul class="l8 ma-0 pl-0 no-bullets">
        <template v-for="item in linkCluster.items">
          <!-- is it a router link or href -->
          <li class="mb-1">
            <template v-if="item.useRouter">
              <router-link :to="item.to" class="tc-text200 tc-h-primary500">
                {{ item.text }}
              </router-link>
            </template>
            <!-- Checking for newTab prop -->
            <template v-else-if="item.newTab">
              <a
                :href="item.to"
                target="_blank"
                rel="noopener noreferrer"
                class="tc-text200 tc-h-primary500"
              >
                {{ item.text }}
              </a>
            </template>
            <template v-else>
              <a :href="item.to" class="tc-text200 tc-500">
                {{ item.text }}
              </a>
            </template>
          </li>
        </template>
      </ul>
    </div>
  </footer>
</template>

<script>
import moment from 'moment'
import { translate } from '../utils/translations'

export default {
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    footerLogoVersion() {
      if (this.isDarkMode) {
        return 'eth-orange'
      } else {
        return 'eth-purple'
      }
    },
    lastUpdatedDate() {
      const pagesSortedByDate = this.$site.pages.sort(
        (a, b) => b.lastUpdated - a.lastUpdated
      )
      moment.locale(this.$lang)
      return moment(pagesSortedByDate[0].lastUpdated).format('MMM DD, YYYY')
    },
    lastUpdatedText() {
      return translate('website-last-updated', this.$lang)
    }
  },
  data: function() {
    return {
      socialLinks: [
        {
          icon: 'github',
          to: 'https://github.com/ethereum'
        },
        {
          icon: 'twitter',
          to: 'https://twitter.com/ethereum'
        },
        {
          icon: 'youtube',
          to: 'https://youtube.com/channel/UCNOfzGXD_C9YMYmnefmPH0g'
        }
      ],
      links: [
        {
          title: 'Individuals',
          items: [
            {
              to: '/what-is-ethereum/',
              text: 'What is Ethereum?',
              useRouter: true
            },
            {
              to: '/eth/',
              text: 'What is Ether (ETH)?',
              useRouter: true
            },
            {
              to: '/dapps/',
              text: 'Use Ethereum',
              useRouter: true
            },
            {
              to: '/wallets/',
              text: 'Ethereum Wallets',
              useRouter: true
            },
            {
              to: '/learn/',
              text: 'Guides & Resources',
              useRouter: true
            },
            {
              to: '/community/',
              text: 'Ethereum Community',
              useRouter: true
            }
          ]
        },
        {
          title: 'Developers',
          items: [
            {
              to: '/build/',
              text: 'Get Started',
              useRouter: true
            },
            {
              to: 'https://studio.ethereum.org/',
              text: 'Ethereum Studio',
              newTab: true
            },
            {
              to: '/developers/',
              text: 'Developer Resources',
              useRouter: true
            }
          ]
        },
        {
          title: 'Ecosystem',
          items: [
            {
              to: 'https://blog.ethereum.org/',
              text: 'Ethereum Foundation Blog',
              newTab: true
            },
            {
              to: 'https://ecosystem.support',
              text: 'Ecosystem Support Program',
              newTab: true
            },
            {
              to: 'https://eips.ethereum.org/',
              text: 'Ethereum Improvement Proposals',
              newTab: true
            },
            {
              to: '/assets/',
              text: 'Ethereum Brand Assets',
              useRouter: true
            }
          ]
        },
        {
          title: 'About ethereum.org',
          items: [
            {
              to: '/languages/',
              text: 'Language Support',
              useRouter: true
            },
            {
              to: '/privacy-policy/',
              text: 'Privacy Policy',
              useRouter: true
            },
            {
              to: '/terms-of-use/',
              text: 'Terms of Use',
              useRouter: true
            },
            {
              to: '/cookie-policy/',
              text: 'Cookie Policy',
              useRouter: true
            },
            {
              to: 'mailto:press@ethereum.org',
              text: 'Contact'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="stylus">
@require '../styles/config';

footer
  width 85vw
  max-width $breakXL
  margin 0 auto
  .list-block
    min-width: 300px
    @media (min-width: $breakL)
      min-width initial

footer
  .social-links
    a
      svg path
        fill $subduedColor
      &:hover
        svg path
          fill $colorPrimary

.dark-mode footer
  .social-links
    a:hover
        svg path
          fill $colorPrimaryDark
</style>
