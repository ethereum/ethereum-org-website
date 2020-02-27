<template>
  <footer class="footer" id="footer">
    <div class="top-row">
      <p class="updated-date">{{ lastUpdatedText }}: {{ lastUpdatedDate }}</p>
      <!-- Generate our social icons -->
      <ul class="social-links">
        <li class="social-link" v-for="item in socialLinks">
          <a
            :href="item.to"
            target="_blank"
            rel="noopener noreferrer"
            :aria-labelledby="item.icon + '-link'"
          >
            <icon :name="item.icon" size="36" />
          </a>
        </li>
      </ul>
    </div>
    <!-- Generate multiple lists -->
    <div v-for="linkCluster in links" class="list-block">
      <h3 class="title">{{ linkCluster.title }}</h3>
      <ul class="list-wrapper">
        <template v-for="item in linkCluster.items">
          <!-- is it a router link or href -->
          <li class="list-item">
            <router-link v-if="item.useRouter" :to="item.to">{{
              item.text
            }}</router-link>
            <!-- Checking for newTab prop -->
            <a
              v-else-if="item.newTab"
              :href="item.to"
              target="_blank"
              rel="noopener noreferrer"
              >{{ item.text }}</a
            >
            <a v-else :href="item.to">{{ item.text }}</a>
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
              text: 'Blog',
              newTab: true
            },
            {
              to: 'https://ecosystem.support',
              text: 'Ecosystem Support Program',
              newTab: true
            },
            {
              to: 'https://eips.ethereum.org/',
              text: 'EIPs',
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
              to: 'https://blog.ethereum.org/',
              text: 'Blog',
              newTab: true
            },
            {
              to: 'https://ecosystem.support',
              text: 'Ecosystem Support Program',
              newTab: true
            },
            {
              to: 'https://eips.ethereum.org/',
              text: 'EIPss',
              newTab: true
            },
            {
              to: '/assets/',
              text: 'Ethereum Brand Assets',
              useRouter: true
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

// move forwards with json objects or CSS vars
json('../styles/media-queries.json');

footer
  // use p.small font-size
  font-size .875rem
  line-height 1.4em
  box-sizing border-box
  width 85vw
  max-width 1440px
  margin 0 auto
  padding-top 48px
  padding-bottom 64px
  display flex
  flex-wrap wrap
  justify-content space-between

  // Set padding at breakpoints
  @media L
    padding-bottom 128px
    padding-top 64px
  @media M
    padding 80px inherit 160px
  @media L
    padding inherit 3em

  .top-row
    display flex
    justify-content space-between
    flex 1 0 100%
    flex-wrap wrap
    align-items center

  .social-links
    display flex
    .social-link
      margin 0
      display flex
    .social-linknot(first-of-type)
      marginLeft 1rem
    a
      display flex

  .list-block
    flex 1
    //set fuzzy widths to force reflow into 1, 2 or 4 columns
    min-width 100%
    @media M
      min-width 40%
    @media  L
      min-width 20%

    h3.title
      font-size .875rem
      color $textColor

    .list-wrapper
      margin 0

    .list-item
      display block
      margin-bottom 1em
      padding 0

// Manage Colors for darkmode vs lightmode

footer
  .social-links
    a
      svg path
        fill $subduedColor
      &:hover
        svg path
          fill $accentColor

  .list-block
    h3.title
      color $textColor
    a
      color $subduedColor
      &:hover
        color $accentColor

.dark-mode footer
  .social-links
    a:hover
        svg path
          fill $accentColorDark

  .list-block
    h3.title
      color $textColorDark
    a
      color $subduedColor
      &:hover
        color $accentColorDark
</style>
