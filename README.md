[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)

<h1 align="center" style="margin-top: 1em; margin-bottom: 3em;">
  <p><a href="https://ethereum.org"><img alt="ethereum logo" src="./eth.png" alt="ethereum.org" width="125"></a></p>
  <p>👋 Welcome to ethereum.org!</p>
</h1>

[Ethereum.org](https://ethereum.org) is a primary online resource for the Ethereum community. The purpose of the site is to _“Be the best portal to Ethereum for our growing global community"_ - read more about what this means [here](https://github.com/ethereum/ethereum-org-website/blob/dev/purpose.md).

[Ethereum.org](https://ethereum.org) is improved and changed over time through the contributions of community members who submit content, give feedback, or volunteer their time to managing its evolution. If you’re interested in helping to improve [ethereum.org](https://ethereum.org), start here. This contribution guide will help you get started.

<br>

### Ethereum.org’s design and content is guided by three core principles:

**🌏 1. Ethereum.org is a portal to resources created by the community**

- It will never be “encyclopedia ethereum” - we can’t add every link, or cover every topic
- Rather, its purpose is to direct people to community-built resources
- Ethereum.org trends toward minimal native-content

**🛠 2. Ethereum.org is a work in progress, because Ethereum is a work in progress**

- It will change over time, as Ethereum evolves and the community evolves with it
- To accommodate long-term changes, the site has a simple design system & modular structure
- Changes to the site are iterative, as we learn more about how people use it and what the community wants from it
- Changes can be proposed by anyone, and we aim to cultivate a community of open-source contributors

**🦄 3. Ethereum.org is not a typical product website**

- Ethereum is multifaceted. It's a project, a platform, a product, a vision of the future, a set of ideologies, a community, and much more.
- The site won't look like every other product site, because Ethereum isn't like every other product.

## How can I contribute?

Keeping in mind the above core principles, there are many ways you can get involved in improving the website!

- Check out our [open issues](https://github.com/ethereum/ethereum-org-website/issues) and see if there are any you can help with!
- Join our [Translation Program](#translation-program)!
- Submit links to add to specific sections that are incomplete, by submitting a pull request
- Identify out-of-date information on ethereum.org (or linked to from ethereum.org) and submit a pull request
- Submit new designs for the front-page HERO image - find the specs [here](https://github.com/ethereum/ethereum-org-website/blob/master/ethereum.org-hero-image-specs.pdf) and contact us at website@ethereum.org
- Suggest ideas for new subpages, new content, or other ways to improve ethereum.org by [opening an issue](https://github.com/ethereum/ethereum-org-website/issues/new/choose).

Learn how to submit a pull request in the [Development Lifecycle](#deployment-lifecycle) section.

## Translation Program

Ethereum is a global project, and it is critical that Ethereum.org is accessible to everyone, regardless of their nationality or language. Our community has been working hard to make this vision a reality. We're constantly working to add additional language support & to keep our existing translations up to date. You can [view the progress of all our translations here](https://crowdin.com/project/ethereumfoundation).

Looking to get involved as a translator? Here's how:

1. Follow [this invite link](https://crowdin.com/project/ethereumfoundation/invite) to join our project on CrowdIn.
2. You will need to create a CrowdIn account if you don't have one. Here's [documentation on how to use CrowdIn](https://support.crowdin.com/online-editor/).
3. Find the language you want to participate in. If it's below 100%, please contribute! Don't see your langugae? [Open an issue](https://github.com/ethereum/ethereum-org-website/issues/new/choose).

Once translation is completed (i.e. all files display 100%), our professional translation service will review (and potentially edit) the content. Once the review is complete, we will add it to the website.

Thank you for your particpation in the language program!

## Notes on individual sub-pages:

If you want to suggest changes to particular sub-pages, keep in mind the purpose of each page:

### 🛠 Developers

- The purpose of this page is to collect core technical resources helpful to someone building on Ethereum
- Information should be kept as up to date as possible, as new tools appear, standards are adopted, or material is deprecated
- This page will never be completely comprehensive: the goal is to list the most popular or widely used resources or tools.

Developer tool submissions will be assessed by the following criteria:

- Is it meaningfully differentiated from tools already listed?
  - New categories or types of tools
  - New features compared to existing similar tools
  - Targeted at a distinct use-case not covered by existing similar tools
- Is the tool well documented?
  - Does documentation exist?
  - Is it sufficient to use the tool?
  - Has it been recently updated?
- Is the tool widely used?
  - We will consider metrics such as Github stars, download statistics, and whether it is used by known companies or projects.
- Is the tool of sufficient quality?
  - Are there recurring bugs?
  - Is the tool reliable?

### 📚 Learn

- The purpose of this page is to collect educational material about Ethereum on a variety of topics
- Some information will be technical in nature, but it will also include non-technical information, or articles that may serve as inspiration to community members

### 📱 Use

- This page is for the person who wants to get started using Ethereum, but doesn’t know how.
- This page will stay limited to 3 sections: Dapps, Ether, and Wallets.
- Useful contributions include: submitting suggestions for dapps to rotate onto this page, submitting suggestions for better links about Ether or Wallets.
- We will rotate the list of dapps on this page frequently!

Dapp submissions will be assessed on the following criteria:

- Is the dapp a "user" application? This page is targeted at the average user, which means it wouldn't be appropriate to list a dev tool or app targeted at sophisticated technical users.
- Does the application have a good user on-boarding process, such that a user can follow the link, and find all the instructions they need to get started?
- Does the application "round out" the list by adding a new kind of application not already present?
- Is there evidence that the application is popular and well established?

### 👋 Beginners

- The purpose of this page is to offer a coherent answer to the most basic questions about Ethereum: what is it, and why does it exist?
- Because this page is very simple and does not contain much content, changes to the text will be limited.
- Useful contributions include: suggesting better “beginner” content to link at the bottom of the page, or suggesting images that could be added to the page to break up the text.

## 🤔 How are decisions about the site made?

Decisions about individual PRs, design evolution, and major upgrades to the website are made by a team of people from across the Ethereum ecosystem. This team includes project managers, developers, designers, marketing and communications, and subject matter experts. Community input informs every decision: raising questions in issues, submitting PRs, or contacting the team at website@ethereum.org is helpful!

This team currently includes:

- Anuj Gupta (Ethereum Foundation)
- Amanda Gutterman (ConsenSys)
- Hudson Jameson (Ethereum Foundation Devops)
- Taeyeon Kim (Ethereum Foundation)
- Jamie Pitts (Ethereum Foundation Devops)
- Sam Richards (Ethereum Foundation)
- Joseph Schweitzer (Ethereum Foundation)
- Josh Stark (L4, ETHGlobal, Ethereum Foundation)
- Charles St. Louis (MakerDAO & Ethereum Cat Herders)
- Evan Van Ness (ConsenSys & Ethereum Foundation)
- Alan Woo (Independent designer & developer)

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

The build should be exported to `/docs/.vuepress/dist` which can be deployed to a static host. We are hosting the site on Netlify, which handles this for us.

## Deployment Lifecycle

How updates are made to ethereum.org

### Submit

- Create a [new issue](https://github.com/ethereum/ethereum-org-website/issues/new/choose)
  - If you plan to submit a pull request to resolve the issue, assign it to yourself
  - If you begin work on the issue, [label it](https://github.com/ethereum/ethereum-org-website/labels) as `wip`
- Submit a pull request (PR) to the `dev` branch
  - [Fork the repo](https://help.github.com/en/articles/fork-a-repo) in order to submit a PR
  - In your PR commit message, reference the issue it resolves
    - e.g. `Add height to sidebar for scroll [Fixes #185]`
    - Read [Closing issues using keywords](https://help.github.com/en/articles/closing-issues-using-keywords) for more information
- Netlify deploys all PRs to a publicly accessible preview URL:
  ![Netlify deploy preview](./netlify-deploy-preview.png)
- Confirm the Netlify preview deploy looks & functions as expected

### Review

- The [website team](https://github.com/ethereum/ethereum-org-website#-how-are-decisions-about-the-site-made) reviews every PR
- See [how decisions are made on content changes](https://github.com/ethereum/ethereum-org-website#notes-on-individual-sub-pages)
- Acceptable PRs will be approved & merged into the `dev` branch

### Deploy

- `master` is continually synced to Netlify and will automatically deploy new commits to etheruem.org
- The [website team](https://github.com/ethereum/ethereum-org-website#-how-are-decisions-about-the-site-made) will periodically merge `dev` into `master` (typically multiple times per week)

## Structure

Site content is in `/docs` folder. Everything else in `/docs/.vuepress`

## Test

We use [Jest](https://jestjs.io/) to create unit test for Vue components under `/docs/.vuepress/component` and `/dosc/.vuepress/theme/components`.

The unit tests are placed next to the Vue components under `/docs/.vuepress/component/__tests__` and `/dosc/.vuepress/theme/components/__tests__`. And module mocks are created under `/dosc/.vuepress/theme/utils/__mocks__` for @theme/utils module.

Below commands will be helpful when you develop or test the Vue components.

1. Run all the Jest unit tests,

```bash
yarn test
```

2. Run unit tests for the changed file,

```bash
yarn test -o
```

3. Update the snapshot if you're sure the old results are obselete,

```bash
yarn test --update-snapshot
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/ExodusActual"><img src="https://avatars3.githubusercontent.com/u/56446532?v=4" width="100px;" alt="ExodusActual"/><br /><sub><b>ExodusActual</b></sub></a><br /><a href="#translation-ExodusActual" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/P1X3L0V4"><img src="https://avatars2.githubusercontent.com/u/3372341?v=4" width="100px;" alt="Anna Karpińska"/><br /><sub><b>Anna Karpińska</b></sub></a><br /><a href="#translation-P1X3L0V4" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/damianrusinek"><img src="https://avatars3.githubusercontent.com/u/3885749?v=4" width="100px;" alt="Damian Rusinek"/><br /><sub><b>Damian Rusinek</b></sub></a><br /><a href="#content-damianrusinek" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/djrtwo"><img src="https://avatars0.githubusercontent.com/u/1433595?v=4" width="100px;" alt="Danny Ryan"/><br /><sub><b>Danny Ryan</b></sub></a><br /><a href="#content-djrtwo" title="Content">🖋</a></td>
    <td align="center"><a href="https://nomiclabs.io"><img src="https://avatars2.githubusercontent.com/u/232174?v=4" width="100px;" alt="Franco Zeoli"/><br /><sub><b>Franco Zeoli</b></sub></a><br /><a href="#content-fzeoli" title="Content">🖋</a></td>
    <td align="center"><a href="https://secinfodb.wordpress.com"><img src="https://avatars2.githubusercontent.com/u/14879163?v=4" width="100px;" alt="Guy Lando"/><br /><sub><b>Guy Lando</b></sub></a><br /><a href="#content-guylando" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/jamesconnolly93"><img src="https://avatars1.githubusercontent.com/u/6970414?v=4" width="100px;" alt="James Connolly"/><br /><sub><b>James Connolly</b></sub></a><br /><a href="#content-jamesconnolly93" title="Content">🖋</a></td>
    <td align="center"><a href="https://burden.blog"><img src="https://avatars3.githubusercontent.com/u/2081699?v=4" width="100px;" alt="Jacob Burden"/><br /><sub><b>Jacob Burden</b></sub></a><br /><a href="#content-jekrb" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/joshorig"><img src="https://avatars3.githubusercontent.com/u/852671?v=4" width="100px;" alt="joshorig"/><br /><sub><b>joshorig</b></sub></a><br /><a href="#content-joshorig" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/mariapaulafn"><img src="https://avatars1.githubusercontent.com/u/27913589?v=4" width="100px;" alt="mariapaulafn"/><br /><sub><b>mariapaulafn</b></sub></a><br /><a href="#content-mariapaulafn" title="Content">🖋</a></td>
    <td align="center"><a href="https://openzeppelin.com/"><img src="https://avatars0.githubusercontent.com/u/447637?v=4" width="100px;" alt="Martín"/><br /><sub><b>Martín</b></sub></a><br /><a href="#content-martintel" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/mat7ias"><img src="https://avatars2.githubusercontent.com/u/35585644?v=4" width="100px;" alt="Mattias Nystrom"/><br /><sub><b>Mattias Nystrom</b></sub></a><br /><a href="#content-mat7ias" title="Content">🖋</a></td>
    <td align="center"><a href="http://iteasys.com"><img src="https://avatars0.githubusercontent.com/u/4185026?v=4" width="100px;" alt="nabetse"/><br /><sub><b>nabetse</b></sub></a><br /><a href="#content-nabetse00" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/nicksavers"><img src="https://avatars0.githubusercontent.com/u/7483198?v=4" width="100px;" alt="Nick Savers"/><br /><sub><b>Nick Savers</b></sub></a><br /><a href="#content-nicksavers" title="Content">🖋</a></td>
    <td align="center"><a href="http://playproject.io"><img src="https://avatars1.githubusercontent.com/u/1076427?v=4" width="100px;" alt="Nina Breznik"/><br /><sub><b>Nina Breznik</b></sub></a><br /><a href="#content-ninabreznik" title="Content">🖋</a></td>
    <td align="center"><a href="https://odyssy.io"><img src="https://avatars2.githubusercontent.com/u/23664663?v=4" width="100px;" alt="Ven Gist"/><br /><sub><b>Ven Gist</b></sub></a><br /><a href="#content-oovg" title="Content">🖋</a></td>
    <td align="center"><a href="http://paulfletcherhill.com"><img src="https://avatars0.githubusercontent.com/u/1607180?v=4" width="100px;" alt="Paul Fletcher-Hill"/><br /><sub><b>Paul Fletcher-Hill</b></sub></a><br /><a href="#content-pfletcherhill" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/phillux"><img src="https://avatars1.githubusercontent.com/u/6450379?v=4" width="100px;" alt="Phil "/><br /><sub><b>Phil </b></sub></a><br /><a href="#content-phillux" title="Content">🖋</a></td>
    <td align="center"><a href="https://exomel.com"><img src="https://avatars1.githubusercontent.com/u/11348?v=4" width="100px;" alt="Rémi Prévost"/><br /><sub><b>Rémi Prévost</b></sub></a><br /><a href="#content-remiprev" title="Content">🖋</a></td>
    <td align="center"><a href="http://shanejonas.net"><img src="https://avatars2.githubusercontent.com/u/364566?v=4" width="100px;" alt="Shane"/><br /><sub><b>Shane</b></sub></a><br /><a href="#content-shanejonas" title="Content">🖋</a></td>
    <td align="center"><a href="https://shazow.net/"><img src="https://avatars3.githubusercontent.com/u/6292?v=4" width="100px;" alt="Andrey Petrov"/><br /><sub><b>Andrey Petrov</b></sub></a><br /><a href="#content-shazow" title="Content">🖋</a></td>
    <td align="center"><a href="https://twitter.com/smpalladino"><img src="https://avatars2.githubusercontent.com/u/429604?v=4" width="100px;" alt="Santiago Palladino"/><br /><sub><b>Santiago Palladino</b></sub></a><br /><a href="#content-spalladino" title="Content">🖋</a></td>
    <td align="center"><a href="http://www.twitter.com/timbeiko"><img src="https://avatars0.githubusercontent.com/u/9390255?v=4" width="100px;" alt="Tim Beiko"/><br /><sub><b>Tim Beiko</b></sub></a><br /><a href="#content-timbeiko" title="Content">🖋</a></td>
    <td align="center"><a href="https://wanseob.com"><img src="https://avatars2.githubusercontent.com/u/8542397?v=4" width="100px;" alt="Wanseob Lim"/><br /><sub><b>Wanseob Lim</b></sub></a><br /><a href="#content-wanseob" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/wilbarnes"><img src="https://avatars1.githubusercontent.com/u/31866314?v=4" width="100px;" alt="Wil Barnes"/><br /><sub><b>Wil Barnes</b></sub></a><br /><a href="#content-wilbarnes" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/Aniket-Engg"><img src="https://avatars2.githubusercontent.com/u/30843294?v=4" width="100px;" alt="Aniket"/><br /><sub><b>Aniket</b></sub></a><br /><a href="#content-Aniket-Engg" title="Content">🖋</a></td>
    <td align="center"><a href="http://chrischinchilla.com"><img src="https://avatars2.githubusercontent.com/u/42080?v=4" width="100px;" alt="Chris Chinchilla"/><br /><sub><b>Chris Chinchilla</b></sub></a><br /><a href="#content-ChrisChinchilla" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/Perseverance"><img src="https://avatars0.githubusercontent.com/u/5130509?v=4" width="100px;" alt="George Spasov"/><br /><sub><b>George Spasov</b></sub></a><br /><a href="#content-Perseverance" title="Content">🖋</a></td>
    <td align="center"><a href="http://pierrickturelier.fr"><img src="https://avatars3.githubusercontent.com/u/2401738?v=4" width="100px;" alt="Pierrick TURELIER"/><br /><sub><b>Pierrick TURELIER</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=PierrickGT" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Solexplorer"><img src="https://avatars3.githubusercontent.com/u/50027175?v=4" width="100px;" alt="Solexplorer"/><br /><sub><b>Solexplorer</b></sub></a><br /><a href="#content-Solexplorer" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/Sunghee2"><img src="https://avatars2.githubusercontent.com/u/31603479?v=4" width="100px;" alt="Sunghee Lee"/><br /><sub><b>Sunghee Lee</b></sub></a><br /><a href="#content-Sunghee2" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/awallendahl"><img src="https://avatars1.githubusercontent.com/u/32873416?v=4" width="100px;" alt="awallendahl"/><br /><sub><b>awallendahl</b></sub></a><br /><a href="#content-awallendahl" title="Content">🖋</a></td>
    <td align="center"><a href="https://blog.bmannconsulting.com"><img src="https://avatars2.githubusercontent.com/u/280420?v=4" width="100px;" alt="Boris Mann"/><br /><sub><b>Boris Mann</b></sub></a><br /><a href="#content-bmann" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/carumusan"><img src="https://avatars1.githubusercontent.com/u/879525?v=4" width="100px;" alt="carumusan"/><br /><sub><b>carumusan</b></sub></a><br /><a href="#content-carumusan" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/econoar"><img src="https://avatars1.githubusercontent.com/u/5050615?v=4" width="100px;" alt="econoar"/><br /><sub><b>econoar</b></sub></a><br /><a href="#content-econoar" title="Content">🖋</a></td>
    <td align="center"><a href="http://twitter.com/gesq_"><img src="https://avatars1.githubusercontent.com/u/1707044?v=4" width="100px;" alt="Gustavo Esquinca"/><br /><sub><b>Gustavo Esquinca</b></sub></a><br /><a href="#content-gesquinca" title="Content">🖋</a></td>
    <td align="center"><a href="http://www.superblocks.com"><img src="https://avatars3.githubusercontent.com/u/7814134?v=4" width="100px;" alt="Javier Tarazaga"/><br /><sub><b>Javier Tarazaga</b></sub></a><br /><a href="#content-javier-tarazaga" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/kcole16"><img src="https://avatars2.githubusercontent.com/u/5624527?v=4" width="100px;" alt="Kendall Cole"/><br /><sub><b>Kendall Cole</b></sub></a><br /><a href="#content-kcole16" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/lbrendanl"><img src="https://avatars3.githubusercontent.com/u/5441045?v=4" width="100px;" alt="Brendan Lee"/><br /><sub><b>Brendan Lee</b></sub></a><br /><a href="#content-lbrendanl" title="Content">🖋</a></td>
    <td align="center"><a href="https://www.zastrin.com"><img src="https://avatars3.githubusercontent.com/u/70360?v=4" width="100px;" alt="Mahesh Murthy"/><br /><sub><b>Mahesh Murthy</b></sub></a><br /><a href="#content-maheshmurthy" title="Content">🖋</a></td>
    <td align="center"><a href="http://oneclickdapp.com"><img src="https://avatars1.githubusercontent.com/u/35622595?v=4" width="100px;" alt="Patrick Gallagher"/><br /><sub><b>Patrick Gallagher</b></sub></a><br /><a href="#content-pi0neerpat" title="Content">🖋</a></td>
    <td align="center"><a href="https://www.mrroom.in"><img src="https://avatars0.githubusercontent.com/u/43527087?v=4" width="100px;" alt="Ali Abbas"/><br /><sub><b>Ali Abbas</b></sub></a><br /><a href="#content-realabbas" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/wtf"><img src="https://avatars3.githubusercontent.com/u/2460739?v=4" width="100px;" alt="wtf"/><br /><sub><b>wtf</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=wtf" title="Code">💻</a> <a href="#review-wtf" title="Reviewed Pull Requests">👀</a> <a href="#infra-wtf" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://s0b0lev.com"><img src="https://avatars1.githubusercontent.com/u/2613381?v=4" width="100px;" alt=" Aleksandr Sobolev"/><br /><sub><b> Aleksandr Sobolev</b></sub></a><br /><a href="#content-s0b0lev" title="Content">🖋</a></td>
    <td align="center"><a href="http://www.whiteblock.io"><img src="https://avatars1.githubusercontent.com/u/20308948?v=4" width="100px;" alt="Zak Cole"/><br /><sub><b>Zak Cole</b></sub></a><br /><a href="#content-zscole" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/BogdanHabic"><img src="https://avatars2.githubusercontent.com/u/5364073?v=4" width="100px;" alt="Bogdan Habic"/><br /><sub><b>Bogdan Habic</b></sub></a><br /><a href="#content-BogdanHabic" title="Content">🖋</a></td>
    <td align="center"><a href="https://sawinyh.com"><img src="https://avatars1.githubusercontent.com/u/7769371?v=4" width="100px;" alt="Nick Sawinyh"/><br /><sub><b>Nick Sawinyh</b></sub></a><br /><a href="#content-sneg55" title="Content">🖋</a></td>
    <td align="center"><a href="http://zoek1.github.com"><img src="https://avatars1.githubusercontent.com/u/660973?v=4" width="100px;" alt="Miguel Angel Gordián"/><br /><sub><b>Miguel Angel Gordián</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=zoek1" title="Code">💻</a></td>
    <td align="center"><a href="https://eswarasai.com"><img src="https://avatars2.githubusercontent.com/u/5172086?v=4" width="100px;" alt="Eswara Sai"/><br /><sub><b>Eswara Sai</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=eswarasai" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ethers"><img src="https://avatars1.githubusercontent.com/u/6937903?v=4" width="100px;" alt="ethers"/><br /><sub><b>ethers</b></sub></a><br /><a href="#content-ethers" title="Content">🖋</a></td>
    <td align="center"><a href="http://faraggi.org"><img src="https://avatars2.githubusercontent.com/u/264382?v=4" width="100px;" alt="Felipe Faraggi"/><br /><sub><b>Felipe Faraggi</b></sub></a><br /><a href="#content-faraggi" title="Content">🖋</a> <a href="#translation-faraggi" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/maurelian"><img src="https://avatars3.githubusercontent.com/u/23033765?v=4" width="100px;" alt="Maurelian"/><br /><sub><b>Maurelian</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=maurelian" title="Code">💻</a> <a href="#review-maurelian" title="Reviewed Pull Requests">👀</a> <a href="#content-maurelian" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/CPSTL"><img src="https://avatars0.githubusercontent.com/u/32653033?v=4" width="100px;" alt="CPSTL"/><br /><sub><b>CPSTL</b></sub></a><br /><a href="#content-CPSTL" title="Content">🖋</a> <a href="#review-CPSTL" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/ethereum/ethereum-org-website/commits?author=CPSTL" title="Documentation">📖</a></td>
    <td align="center"><a href="http://www.hudsonjameson.com"><img src="https://avatars1.githubusercontent.com/u/3460120?v=4" width="100px;" alt="Hudson Jameson"/><br /><sub><b>Hudson Jameson</b></sub></a><br /><a href="#content-Souptacular" title="Content">🖋</a> <a href="https://github.com/ethereum/ethereum-org-website/commits?author=Souptacular" title="Documentation">📖</a></td>
    <td align="center"><a href="https://shayan.es/"><img src="https://avatars2.githubusercontent.com/u/309108?v=4" width="100px;" alt="Shayan Eskandari"/><br /><sub><b>Shayan Eskandari</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=shayanb" title="Code">💻</a> <a href="#translation-shayanb" title="Translation">🌍</a></td>
    <td align="center"><a href="http://www.scydev.ch"><img src="https://avatars3.githubusercontent.com/u/1307146?v=4" width="100px;" alt="Lukas Sägesser"/><br /><sub><b>Lukas Sägesser</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=ScyDev" title="Code">💻</a></td>
    <td align="center"><a href="http://virgil.gr"><img src="https://avatars2.githubusercontent.com/u/81322?v=4" width="100px;" alt="Virgil Griffith"/><br /><sub><b>Virgil Griffith</b></sub></a><br /><a href="#content-virgil" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/easeev"><img src="https://avatars3.githubusercontent.com/u/14873170?v=4" width="100px;" alt="Eugene Aseev"/><br /><sub><b>Eugene Aseev</b></sub></a><br /><a href="#content-easeev" title="Content">🖋</a></td>
    <td align="center"><a href="http://jannispohlmann.de/"><img src="https://avatars0.githubusercontent.com/u/19324?v=4" width="100px;" alt="Jannis Pohlmann"/><br /><sub><b>Jannis Pohlmann</b></sub></a><br /><a href="#content-Jannis" title="Content">🖋</a></td>
    <td align="center"><a href="https://steemblog.github.io/@robertyan"><img src="https://avatars0.githubusercontent.com/u/46699230?v=4" width="100px;" alt="think-in-universe"/><br /><sub><b>think-in-universe</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=think-in-universe" title="Code">💻</a> <a href="#content-think-in-universe" title="Content">🖋</a></td>
    <td align="center"><a href="http://l4v.io"><img src="https://avatars3.githubusercontent.com/u/17183498?v=4" width="100px;" alt="Josh Stark"/><br /><sub><b>Josh Stark</b></sub></a><br /><a href="#content-jjmstark" title="Content">🖋</a> <a href="#review-jjmstark" title="Reviewed Pull Requests">👀</a> <a href="#projectManagement-jjmstark" title="Project Management">📆</a></td>
    <td align="center"><a href="https://www.alanwoo.ca"><img src="https://avatars0.githubusercontent.com/u/1481890?v=4" width="100px;" alt="Alan Woo"/><br /><sub><b>Alan Woo</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=alancwoo" title="Code">💻</a> <a href="#design-alancwoo" title="Design">🎨</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
