<template>
  <footer class="footer flex flex-wrap space-between pt-3 pb-4" id="footer">
    <div class="flex flex-wrap space-between w-100 flex-center">
      <p class="flex flex-center l8 tc-text200">
        {{ lastUpdatedText }}: {{ lastUpdatedDate }}
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
    <!-- Generate link lists -->
    <div v-for="section in linkSections" class="list-block pr-2">
      <h3 class="l8 c-text500">
        <b>{{ section.title }}</b>
      </h3>
      <ul class="l8 ma-0 pl-0 no-bullets">
        <li v-if="link.display" class="mb-1" v-for="link in section.links">
          <a
            v-if="link.isExternal"
            :href="link.to"
            target="_blank"
            rel="noopener noreferrer"
            class="tc-text200 tc-h-primary500"
          >
            {{ link.text }}
          </a>

          <router-link v-else :to="link.to" class="tc-text200 tc-h-primary500">
            {{ link.text }}
          </router-link>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
import moment from 'moment'
import { translate } from '../utils/translations'

export default {
  computed: {
    lastUpdatedDate() {
      const pagesSortedByDate = this.$site.pages.sort(
        (a, b) => b.lastUpdated - a.lastUpdated
      )
      moment.locale(this.$lang)
      return moment(pagesSortedByDate[0].lastUpdated).format('MMM DD, YYYY')
    },

    lastUpdatedText() {
      return translate('website-last-updated', this.$lang)
    },

    socialLinks() {
      return [
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
      ]
    },

    linkSections() {
      const contentVersion = translate('version', this.$lang)
      const langPath = translate('path', this.$lang)

      return [
        {
          title: translate('page-individuals', this.$lang),
          links: [
            {
              to: `${langPath}what-is-ethereum/`,
              text:
                contentVersion > 1
                  ? translate(
                      'page-home-section-individuals-item-one',
                      this.$lang
                    )
                  : translate(
                      'page-home-section-beginners-item-two',
                      this.$lang
                    ),
              display: true
            },
            {
              to: `${langPath}use/`,
              text: translate('page-use', this.$lang),
              display: contentVersion < 1.1
            },
            {
              to: `${langPath}eth/`,
              text: translate(
                'page-home-section-individuals-item-four',
                this.$lang
              ),
              display: contentVersion >= 1.1
            },
            {
              to: `${langPath}dapps/`,
              text: translate(
                'page-home-section-individuals-item-two',
                this.$lang
              ),
              display: contentVersion >= 1.1
            },
            {
              to: `${langPath}wallets/`,
              text: translate(
                'page-home-section-individuals-item-five',
                this.$lang
              ),
              display: contentVersion >= 1.1
            },
            {
              to: `${langPath}learn/`,
              text:
                contentVersion > 1
                  ? translate(
                      'page-home-section-individuals-item-three',
                      this.$lang
                    )
                  : translate('page-learn', this.$lang),
              display: true
            },
            {
              to: `${langPath}community/`,
              text: translate('page-community', this.$lang),
              display: contentVersion >= 1.2
            }
          ]
        },
        {
          title: translate('page-developers', this.$lang),
          links: [
            {
              to: `${langPath}build/`,
              text: translate('get-started', this.$lang),
              display: contentVersion >= 1.1
            },
            {
              to: 'https://studio.ethereum.org/',
              text: 'Ethereum Studio',
              isExternal: true,
              display: true
            },
            {
              to: `${langPath}developers/`,
              text:
                contentVersion > 1
                  ? translate('developer-resources', this.$lang)
                  : translate('page-developers', this.$lang),
              display: true
            },
            {
              to: '/whitepaper/',
              text: 'Ethereum Whitepaper',
              display: true
            }
          ]
        },
        {
          title: translate('footer-ecosystem', this.$lang),
          links: [
            {
              to: '/foundation/',
              text: 'Ethereum Foundation',
              display: true
            },
            {
              to: 'https://blog.ethereum.org/',
              text: 'Ethereum Foundation Blog',
              isExternal: true,
              display: true
            },
            {
              to: 'https://esp.ethereum.foundation',
              text: 'Ecosystem Support Program',
              isExternal: true,
              display: true
            },
            {
              to: '/eips/',
              text: 'Ethereum Improvement Proposals',
              display: true
            },
            {
              to: '/assets/',
              text: translate('ethereum-brand-assets', this.$lang),
              display: true
            },
            {
              to: 'https://devcon.org/',
              text: 'Devcon',
              isExternal: true,
              display: true
            }
          ]
        },
        {
          title: translate('footer-about', this.$lang),
          links: [
            {
              to: '/about/',
              text: 'About us',
              useRouter: true,
              display: true
            },
            {
              to: '/languages/',
              text: translate('language-support', this.$lang),
              display: true
            },
            {
              to: '/privacy-policy/',
              text: translate('privacy-policy', this.$lang),
              display: true
            },
            {
              to: '/terms-of-use/',
              text: translate('terms-of-use', this.$lang),
              display: true
            },
            {
              to: '/cookie-policy/',
              text: translate('cookie-policy', this.$lang),
              display: true
            },
            {
              to: 'mailto:press@ethereum.org',
              text: translate('contact', this.$lang),
              display: true,
              isExternal: true
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
