<h1 align="center" style="margin-top: 1em; margin-bottom: 3em;">
  <p><a href="https://ethereum.org"><img alt="ethereum logo" src="./eth.png" alt="ethereum.org" width="125"></a></p>
  <p>👋 Welcome to ethereum.org!</p>
</h1>

[Ethereum.org](https://ethereum.org) is a primary online resource for the Ethereum community. It is improved and changed over time through the contributions of community members who submit content, give feedback, or volunteer their time to managing its evolution.

If you’re interested in helping to improve [ethereum.org](https://ethereum.org), start here. This contribution guide will help you get started.

<br>

### Ethereum.org’s design and content is guided by three core principles:


**🌏 1. Ethereum.org is a portal to resources created by the community**
  - It will never be “encyclopedia ethereum” - we can’t add every link, or cover every topic
  - Rather, its purpose is to direct people to community-built resources
  - Ethereum.org will always have minimal native-content

**🛠 2. Ethereum.org is a work in progress, because Ethereum is a work in progress**
  - The site has been re-launched explicitly in an unfinished state
  - We expect it to change over time, including both content and design
  - To accommodate long-term changes, the site has a simple modular structure that will let us add or remove subpages

**🦄 3. Ethereum.org is not a typical product website**
  - Ethereum.org is a representation of our decentralized community, and a starting point for those who want to join it
  - Ethereum.org should not be a traditional product website like every other blockchain. There is no sales pitch.


## How can I contribute?

Keeping in mind the above core principles, there are many ways you can get involved in improving the website!


- Check out the issues page and see if there are any you can help with!
- Submit links to add to specific sections that are incomplete, by submitting a pull-request
- Identify out-of-date information on ethereum.org (or linked to from ethereum.org) and submit a pull-request
- Submit new designs for the front-page HERO image - reach us at website@ethereum.org
- Suggest ideas for new subpages, new content, or other ways to improve ethereum.org by opening an issue.


## Notes on individual sub-pages:

If you want to suggest changes to particular sub-pages, keep in mind the purpose of each page:

### 🛠 Build

- The purpose of this page is to collect core technical resources helpful to someone building on Ethereum
- Information should be kept as up to date as possible, as new tools appear, standards are adopted, or material is deprecated
- This page will never be completely comprehensive: the goal is to list the most popular or widely used resources or tools.

### 📚 Learn

- The purpose of this page is to collect educational material about Ethereum on a variety of topics
- Some information will be technical in nature, but it will also include non-technical information, or articles that may serve as inspiration to community members

### 📱 Use

- This page is for the person who wants to get started using Ethereum, but doesn’t know how.
- This page will stay limited to 3 sections: Dapps, Ether, and Wallets
- We will rotate the list of dapps on this page frequently!
- Useful contributions include: submitting suggestions for dapps to rotate onto this page, submitting suggestions for better links about Ether or Wallets.

### 👋 Beginners

- The purpose of this page is to offer a coherent answer to the most basic questions about Ethereum: what is it, and why does it exist?
- Because this page is very simple and does not contain much content, changes to the text will be limited.
- Useful contributions include: suggesting better “beginner” content to link at the bottom of the page, or suggesting images that could be added to the page to break up the text.



## Development

### Unix/Mac
```
# In the root folder:
yarn global add vuepress
yarn
vuepress dev docs
```

### Windows
- Download [node.js & npm](https://nodejs.org/en/download/)
- Download [Yarn](https://yarnpkg.com/en/docs/install#windows-stable)
- Download [Git Bash](https://git-scm.com/downloads)
- Download the `master` branch
- Navigate to the `/ethereum-org-website` folder
- Right click and select `Git Bash Here`

Run the following commands:
```
npm install -g yarn
npm install -g vuepress
yarn
vuepress dev docs
```

## Build
```
# In the root folder:
vuepress build docs
```

The build should be exported to `/docs/.vuepress/dist` which can be deployed to a static host. We are hosting the site on github pages via the deploy script below.


## Deployment
```
# In the root folder:
./deploy.sh
```

## Structure
Site content is in `/docs` folder. Everything else in `/docs/.vuepress`
