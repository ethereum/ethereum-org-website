module.exports = {
  siteMetadata: {
    title: `Ethereum Project`,
    description: `The world's largest community solving global challenges and democratizing the internet.`,
    author: `@deepwork_studio`,
    siteUrl: process.env.URL || `https://ethereum.org.deepwork.studio`,
    news: {
      articles: [
        {
          date: `16 April 2019`,
          title: `Major Auditing Firm Ernst & Young Releases Updates to Two Blockchain-Related Products`,
          link: `https://cointelegraph.com/news/major-auditing-firm-ernst-young-releases-updates-to-two-blockchain-related-products`
        },
        {
          date: `13 April 2019`,
          title: `Ethereum Core Developers Consider More Frequent and Smaller Hard Forks`,
          link: `https://cointelegraph.com/news/ethereum-core-developers-consider-more-frequent-and-smaller-hard-forks`
        },
        {
          date: `10 April 2019`,
          title: `Blockchain Prediction Platform Augur to Launch Stablecoin DAI-Denominated Markets`,
          link: `https://cointelegraph.com/news/blockchain-prediction-platform-augur-to-launch-stablecoin-dai-denominated-markets`
        },
        {
          date: `09 April 2019`,
          title: `Cryptocurrency Lending Firm Dharma Launches Its Service to the Public`,
          link: `https://cointelegraph.com/news/cryptocurrency-lending-firm-dharma-launches-its-service-to-the-public`
        }
      ]
    },
    learn: {
      "Current Applications": [
        {
          title: `Digital Cats?!`,
          subtitle: `CryptoKitties is a game centered around breedable, collectible, and oh-so-adorable creatures we call CryptoKitties!`,
          image: `https://www.cryptokitties.co/images/share.png`,
          link: `https://www.cryptokitties.co/`
        },
        {
          title: `Changing the way we collaborate.`,
          subtitle: `The Bounties Network empowers humans to incentivize and self-organize, from freelancing to grassroots social action, and anything in between.`,
          image: `https://cdn-images-1.medium.com/max/1000/1*ywSIL1SNhUY6CnVLxjwKMg.png`,
          link: `https://bounties.network/`
        },
        {
          title: `A New Way to Access the Web`,
          subtitle: `Chat, browse and transact securely in an open source community committed to bringing the power of Ethereum and a more distributed internet to your pocket.`,
          image: `https://our.status.im/content/images/2019/03/Release-cover-0.11.0.png`,
          link: `https://dev.status.im/`
        },
        {
          title: `A New Internet?`,
          subtitle: `Loom Network is building our Layer 2 on top of Ethereum, instead of other blockchain platforms — and here’s why.`,
          image: `https://cdn-images-1.medium.com/max/1000/1*9gSuypCiTrSwMCy18OJdyg.png`,
          link: `https://medium.com/loom-network/ethereum-will-be-the-backbone-of-the-new-internet-88718e08124f`
        }
      ],
      "Value Exchange": [
        {
          title: `Bitcoin, Ethereum, Blockchain, Oh my!`,
          subtitle: `The Crypto market is gaining lots of steam. Gravity-defying price rallies and multi-million dollar token sales are commonplace.`,
          image: `https://cdn-images-1.medium.com/max/1000/1*GVTJpn1kD0GZdR8n5tTVMg.jpeg`,
          link: `https://hackernoon.com/bitcoin-ethereum-blockchain-tokens-icos-why-should-anyone-care-890b868cec06`
        },
        {
          title: `CoinDesk Crypto-Economics Explorer`,
          subtitle: `A visual tool designed to measure and track interest and activity in crypto assets.`,
          image: `https://www.coindesk.com/wp-content/uploads/2017/07/Screen-Shot-2017-07-17-at-7.36.51-AM.png`,
          link: `https://www.coindesk.com/data`
        },
        {
          title: `Reaching the Top`,
          subtitle: `Ethereum Ecosystem Massive Adoption As Ernst & Young Rolls Out Free Software Running On Top Of The Public Ethereum Network For Its Corporate Clients`,
          image: `https://cdn.investinblockchain.com/wp-content/uploads/2019/04/IMG_Tokyo_20190417_105925_processed.jpg?x96471`,
          link: `https://www.investinblockchain.com/ethereum-ecosystem-massive-adoption-as-ernst-young-rolls-out-free-software-running-on-top-of-the-public-ethereum-network-for-its-corporate-clients/`
        }
      ],
      Censorship: [
        {
          title: `The Problem of Censorship`,
          subtitle: `One of the interesting problems in designing effective blockchain technologies is, how can we ensure that the systems remain censorship-proof?`,
          image: `https://blog.ethereum.org/img/avatar-icon.png`,
          link: `https://blog.ethereum.org/2015/06/06/the-problem-of-censorship/`
        },
        {
          title: `Blockchain Could Be the Savior of Free Speech`,
          subtitle: `Many governments and businesses today use censorship software to monitor people’s online activity and prohibit access to undesirable content.`,
          image: `https://fortunedotcom.files.wordpress.com/2018/07/china-censorship-protest.jpg?w=1024`,
          link: `http://fortune.com/2018/07/26/blockchain-technology-cryptocurrency-ethereum-censorship-free-speech/`
        },
        {
          title: `The Worst Thing about Censorship Is *****`,
          subtitle: `Ethereum is Being Used to Circumvent Government Censorship in China to Warn Against Ineffective Vaccines`,
          image: `https://static.coindesk.com/wp-content/uploads/2017/11/china-flags-e1511970474490.jpg`,
          link: `https://toshitimes.com/ethereum-is-being-used-to-circumvent-government-censorship-in-china-to-warn-against-ineffective-vaccines/`
        }
      ]
    }
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ethereum`,
        short_name: `ethereum`,
        start_url: `/`,
        background_color: `#0E0F15`,
        theme_color: `#fff`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png` // This path is relative to the root of the site.
      }
    }
  ]
};
