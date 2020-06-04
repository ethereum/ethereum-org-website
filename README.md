<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-182-orange.svg?style=flat-square)](#contributors)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<h1 align="center" style="margin-top: 1em; margin-bottom: 3em;">
  <p><a href="https://ethereum.org"><img alt="ethereum logo" src="./eth.png" alt="ethereum.org" width="125"></a></p>
  <p>👋 Welcome to ethereum.org!</p>
</h1>

[Ethereum.org](https://ethereum.org) is a primary online resource for the Ethereum community. The purpose of the site is to _“Be the best portal to Ethereum for our growing global community"_ - read more about what this means [here](https://github.com/ethereum/ethereum-org-website/blob/dev/purpose.md).

[Ethereum.org](https://ethereum.org) is improved and changed over time through the contributions of community members who submit content, give feedback, or volunteer their time to managing its evolution. If you’re interested in helping to improve [ethereum.org](https://ethereum.org), start here. This contribution guide will help you get started.

<br>

## Core Principles

Ethereum.org’s design and content is guided by three core principles:

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

- Check out our [open issues](https://github.com/ethereum/ethereum-org-website/issues) and see if there are any you can help with
- Join our [Translation Program](#translation-program)
- Add information or links to specific sections that are incomplete, by submitting a pull request
- Identify out-of-date information on ethereum.org (or linked to from ethereum.org) and submit a pull request
- Submit new designs for the front-page HERO image - find the specs [here](https://github.com/ethereum/ethereum-org-website/blob/master/ethereum.org-hero-image-specs.pdf) and contact us at website@ethereum.org
- Suggest improvements to our [user persona research](https://www.notion.so/efdn/Ethereum-org-User-Persona-Memo-b44dc1e89152457a87ba872b0dfa366c)
- Suggest ideas for new pages, new content, or other ways to improve ethereum.org by [opening an issue](https://github.com/ethereum/ethereum-org-website/issues/new/choose)

Learn how to submit a pull request in the [Development Lifecycle](#deployment-lifecycle) section.

### Content contributions

As mentioned in [ethereum.org's core principles](#core-principles), the goal is for ethereum.org to serve as a portal to resources created by the community. We strive to direct people to community-built resources vs. replace them. While we trend towards minimal native-content, we have received feedback from the community that it's valuable for us to have some.

When proposing a new page or updating an existing page, keep in mind the goal is not to be a comprehensive encyclopedia of Ethereum but rather to be a stepping stone for someone’s journey into Ethereum. Each page should provide a story: e.g. introducing a topic, answering a question & providing next steps for the visitor to learm more or take a particular action.

#### Notes on specific kinds of contributions

When proposing new items to Ethereum.org we ask contributors to add their new addition(s) to the bottom of each section/list. This helps keep things fair for all contributors. In the future, we may consider adding a ranking system for the sections but for now this is the practice we are employing.

#### I want to add a developer tool or project

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
  - We will consider metrics such as GitHub stars, download statistics, and whether it is used by known companies or projects
- Is the tool of sufficient quality?
  - Are there recurring bugs?
  - Is the tool reliable?

#### I want to add an educational article or resource

Learning resources will be assessed by the following criteria:

- Is the content up to date?
- Is the information accurate? Is it factual or opinion-based?
- Is the author credible? Do they reference their sources?
- Does this content add distinct value that existing resources/links don't cover?
- Which [user persona](https://www.notion.so/efdn/Ethereum-org-User-Persona-Memo-b44dc1e89152457a87ba872b0dfa366c) does this content serve?

#### I want to add an Ethereum-based application

Dapp submissions will be assessed on the following criteria:

- Is the dapp a "user" application? This page is targeted at a new user, which means it wouldn't be appropriate to list a dev tool or app targeted at sophisticated technical users.
- Does the application have a good user on-boarding process, such that a user can follow the link, and find all the instructions they need to get started?
- Does the application "round out" the list by adding a new kind of application not already present?
- Is there evidence that the application is popular and well established?

### Translation Program

Ethereum is a global project, and we believe it's critical that Ethereum.org is accessible to everyone, regardless of their nationality or language. Our community has been working hard to make this vision a reality.

**Looking for a specific translation?**

We're constantly working to add additional language support & to keep our existing translations up to date. You can [view available translations and the progress of all our translations here](https://ethereum.org/languages/).

**Looking to get join our community of translators?**

Great! We'd love to get you involved. [Follow the instructions here](https://ethereum.org/languages/#ethereum-org-translation-program). Thank you in advance for your particpation!

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
yarn dev
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
yarn dev
```

### Build

```
# In the root folder:
yarn build
```

The build should be exported to `/docs/.vuepress/dist` which can be deployed to a static host. We are hosting the site on Netlify, which handles this for us.

## Deployment Lifecycle

How updates are made to ethereum.org

### Submit

- Create a [new issue](https://github.com/ethereum/ethereum-org-website/issues/new/choose)
- Submit a pull request (PR) to the `dev` branch (you'll need to [fork the repo](https://help.github.com/en/articles/fork-a-repo) in order to submit a PR)
  - In your PR commit message, reference the issue it resolves
    - e.g. `Add height to sidebar for scroll [Fixes #185]`
    - Read [Closing issues using keywords](https://help.github.com/en/articles/closing-issues-using-keywords) for more information
- Netlify (our hosting service) deploys all PRs to a publicly accessible preview URL, e.g.:
  ![Netlify deploy preview](./netlify-deploy-preview.png)
- Confirm your Netlify preview deploy looks & functions as expected

### Review

- The [website team](https://github.com/ethereum/ethereum-org-website#-how-are-decisions-about-the-site-made) reviews every PR
- See [how decisions are made on content changes](https://github.com/ethereum/ethereum-org-website#notes-on-individual-sub-pages)
- Acceptable PRs will be approved & merged into the `dev` branch

### Release

- `master` is continually synced to Netlify and will automatically deploy new commits to etheruem.org
- The [website team](https://github.com/ethereum/ethereum-org-website#-how-are-decisions-about-the-site-made) will periodically merge `dev` into `master` (typically multiple times per week)
- You can [view the history of releases](https://github.com/ethereum/ethereum-org-website/releases), with PR highlights

## Website Structure

Site content is in `/docs` folder. Everything else in `/docs/.vuepress`

## Testing

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

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/ExodusActual"><img src="https://avatars3.githubusercontent.com/u/56446532?v=4" width="100px;" alt=""/><br /><sub><b>ExodusActual</b></sub></a><br /><a href="#translation-ExodusActual" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/P1X3L0V4"><img src="https://avatars2.githubusercontent.com/u/3372341?v=4" width="100px;" alt=""/><br /><sub><b>Anna Karpińska</b></sub></a><br /><a href="#translation-P1X3L0V4" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/8bitp"><img src="https://avatars2.githubusercontent.com/u/8021176?v=4" width="100px;" alt=""/><br /><sub><b>8bitp</b></sub></a><br /><a href="#content-8bitp" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/AlexandrouR"><img src="https://avatars1.githubusercontent.com/u/21177075?v=4" width="100px;" alt=""/><br /><sub><b>Rousos Alexandros</b></sub></a><br /><a href="#content-AlexandrouR" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/EvanVanNessEth"><img src="https://avatars3.githubusercontent.com/u/34992008?v=4" width="100px;" alt=""/><br /><sub><b>EvanVanNessEth</b></sub></a><br /><a href="#content-EvanVanNessEth" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/JesseAbram"><img src="https://avatars0.githubusercontent.com/u/33698952?v=4" width="100px;" alt=""/><br /><sub><b>JesseAbram</b></sub></a><br /><a href="#content-JesseAbram" title="Content">🖋</a></td>
    <td align="center"><a href="http://impermanence.co"><img src="https://avatars1.githubusercontent.com/u/28689401?v=4" width="100px;" alt=""/><br /><sub><b>Lililashka</b></sub></a><br /><a href="#design-Lililashka" title="Design">🎨</a> <a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3ALililashka" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/vrde"><img src="https://avatars1.githubusercontent.com/u/134680?v=4" width="100px;" alt=""/><br /><sub><b>vrde</b></sub></a><br /><a href="#content-vrde" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/RichardMcSorley"><img src="https://avatars2.githubusercontent.com/u/6407008?v=4" width="100px;" alt=""/><br /><sub><b>Richard McSorley</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=RichardMcSorley" title="Code">💻</a></td>
    <td align="center"><a href="http://ajsantander.github.io/"><img src="https://avatars2.githubusercontent.com/u/550409?v=4" width="100px;" alt=""/><br /><sub><b>Alejandro Santander</b></sub></a><br /><a href="#content-ajsantander" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/carver"><img src="https://avatars0.githubusercontent.com/u/205327?v=4" width="100px;" alt=""/><br /><sub><b>Jason Carver</b></sub></a><br /><a href="#content-carver" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/chaitanyapotti"><img src="https://avatars1.githubusercontent.com/u/1688380?v=4" width="100px;" alt=""/><br /><sub><b>Chaitanya Potti</b></sub></a><br /><a href="#content-chaitanyapotti" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/chriseth"><img src="https://avatars2.githubusercontent.com/u/9073706?v=4" width="100px;" alt=""/><br /><sub><b>chriseth</b></sub></a><br /><a href="#content-chriseth" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/craigwilliams84"><img src="https://avatars2.githubusercontent.com/u/11519649?v=4" width="100px;" alt=""/><br /><sub><b>Craig Williams</b></sub></a><br /><a href="#content-craigwilliams84" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/damianrusinek"><img src="https://avatars3.githubusercontent.com/u/3885749?v=4" width="100px;" alt=""/><br /><sub><b>Damian Rusinek</b></sub></a><br /><a href="#content-damianrusinek" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/djrtwo"><img src="https://avatars0.githubusercontent.com/u/1433595?v=4" width="100px;" alt=""/><br /><sub><b>Danny Ryan</b></sub></a><br /><a href="#content-djrtwo" title="Content">🖋</a></td>
    <td align="center"><a href="https://nomiclabs.io"><img src="https://avatars2.githubusercontent.com/u/232174?v=4" width="100px;" alt=""/><br /><sub><b>Franco Zeoli</b></sub></a><br /><a href="#content-fzeoli" title="Content">🖋</a></td>
    <td align="center"><a href="https://secinfodb.wordpress.com"><img src="https://avatars2.githubusercontent.com/u/14879163?v=4" width="100px;" alt=""/><br /><sub><b>Guy Lando</b></sub></a><br /><a href="#content-guylando" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/jamesconnolly93"><img src="https://avatars1.githubusercontent.com/u/6970414?v=4" width="100px;" alt=""/><br /><sub><b>James Connolly</b></sub></a><br /><a href="#content-jamesconnolly93" title="Content">🖋</a></td>
    <td align="center"><a href="https://burden.blog"><img src="https://avatars3.githubusercontent.com/u/2081699?v=4" width="100px;" alt=""/><br /><sub><b>Jacob Burden</b></sub></a><br /><a href="#content-jekrb" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/joshorig"><img src="https://avatars3.githubusercontent.com/u/852671?v=4" width="100px;" alt=""/><br /><sub><b>joshorig</b></sub></a><br /><a href="#content-joshorig" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/mariapaulafn"><img src="https://avatars1.githubusercontent.com/u/27913589?v=4" width="100px;" alt=""/><br /><sub><b>mariapaulafn</b></sub></a><br /><a href="#content-mariapaulafn" title="Content">🖋</a></td>
    <td align="center"><a href="https://openzeppelin.com/"><img src="https://avatars0.githubusercontent.com/u/447637?v=4" width="100px;" alt=""/><br /><sub><b>Martín</b></sub></a><br /><a href="#content-martintel" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/mat7ias"><img src="https://avatars2.githubusercontent.com/u/35585644?v=4" width="100px;" alt=""/><br /><sub><b>Mattias Nystrom</b></sub></a><br /><a href="#content-mat7ias" title="Content">🖋</a></td>
    <td align="center"><a href="http://iteasys.com"><img src="https://avatars0.githubusercontent.com/u/4185026?v=4" width="100px;" alt=""/><br /><sub><b>nabetse</b></sub></a><br /><a href="#content-nabetse00" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/nicksavers"><img src="https://avatars0.githubusercontent.com/u/7483198?v=4" width="100px;" alt=""/><br /><sub><b>Nick Savers</b></sub></a><br /><a href="#content-nicksavers" title="Content">🖋</a></td>
    <td align="center"><a href="http://playproject.io"><img src="https://avatars1.githubusercontent.com/u/1076427?v=4" width="100px;" alt=""/><br /><sub><b>Nina Breznik</b></sub></a><br /><a href="#content-ninabreznik" title="Content">🖋</a></td>
    <td align="center"><a href="https://odyssy.io"><img src="https://avatars2.githubusercontent.com/u/23664663?v=4" width="100px;" alt=""/><br /><sub><b>Ven Gist</b></sub></a><br /><a href="#content-oovg" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://paulfletcherhill.com"><img src="https://avatars0.githubusercontent.com/u/1607180?v=4" width="100px;" alt=""/><br /><sub><b>Paul Fletcher-Hill</b></sub></a><br /><a href="#content-pfletcherhill" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/phillux"><img src="https://avatars1.githubusercontent.com/u/6450379?v=4" width="100px;" alt=""/><br /><sub><b>Phil </b></sub></a><br /><a href="#content-phillux" title="Content">🖋</a></td>
    <td align="center"><a href="https://exomel.com"><img src="https://avatars1.githubusercontent.com/u/11348?v=4" width="100px;" alt=""/><br /><sub><b>Rémi Prévost</b></sub></a><br /><a href="#content-remiprev" title="Content">🖋</a></td>
    <td align="center"><a href="http://shanejonas.net"><img src="https://avatars2.githubusercontent.com/u/364566?v=4" width="100px;" alt=""/><br /><sub><b>Shane</b></sub></a><br /><a href="#content-shanejonas" title="Content">🖋</a></td>
    <td align="center"><a href="https://shazow.net/"><img src="https://avatars3.githubusercontent.com/u/6292?v=4" width="100px;" alt=""/><br /><sub><b>Andrey Petrov</b></sub></a><br /><a href="#content-shazow" title="Content">🖋</a> <a href="#ideas-shazow" title="Ideas, Planning, & Feedback">🤔</a> <a href="#a11y-shazow" title="Accessibility">️️️️♿️</a></td>
    <td align="center"><a href="https://twitter.com/smpalladino"><img src="https://avatars2.githubusercontent.com/u/429604?v=4" width="100px;" alt=""/><br /><sub><b>Santiago Palladino</b></sub></a><br /><a href="#content-spalladino" title="Content">🖋</a> <a href="#ideas-spalladino" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://www.twitter.com/timbeiko"><img src="https://avatars0.githubusercontent.com/u/9390255?v=4" width="100px;" alt=""/><br /><sub><b>Tim Beiko</b></sub></a><br /><a href="#content-timbeiko" title="Content">🖋</a> <a href="https://github.com/ethereum/ethereum-org-website/pulls?q=is%3Apr+reviewed-by%3Atimbeiko" title="Reviewed Pull Requests">👀</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://wanseob.com"><img src="https://avatars2.githubusercontent.com/u/8542397?v=4" width="100px;" alt=""/><br /><sub><b>Wanseob Lim</b></sub></a><br /><a href="#content-wanseob" title="Content">🖋</a> <a href="#translation-wanseob" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/wilbarnes"><img src="https://avatars1.githubusercontent.com/u/31866314?v=4" width="100px;" alt=""/><br /><sub><b>Wil Barnes</b></sub></a><br /><a href="#content-wilbarnes" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/Aniket-Engg"><img src="https://avatars2.githubusercontent.com/u/30843294?v=4" width="100px;" alt=""/><br /><sub><b>Aniket</b></sub></a><br /><a href="#content-Aniket-Engg" title="Content">🖋</a></td>
    <td align="center"><a href="http://chrischinchilla.com"><img src="https://avatars2.githubusercontent.com/u/42080?v=4" width="100px;" alt=""/><br /><sub><b>Chris Chinchilla</b></sub></a><br /><a href="#content-ChrisChinchilla" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/Perseverance"><img src="https://avatars0.githubusercontent.com/u/5130509?v=4" width="100px;" alt=""/><br /><sub><b>George Spasov</b></sub></a><br /><a href="#content-Perseverance" title="Content">🖋</a></td>
    <td align="center"><a href="http://pierrickturelier.fr"><img src="https://avatars3.githubusercontent.com/u/2401738?v=4" width="100px;" alt=""/><br /><sub><b>Pierrick TURELIER</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=PierrickGT" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Solexplorer"><img src="https://avatars3.githubusercontent.com/u/50027175?v=4" width="100px;" alt=""/><br /><sub><b>Solexplorer</b></sub></a><br /><a href="#content-Solexplorer" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Sunghee2"><img src="https://avatars2.githubusercontent.com/u/31603479?v=4" width="100px;" alt=""/><br /><sub><b>Sunghee Lee</b></sub></a><br /><a href="#content-Sunghee2" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/awallendahl"><img src="https://avatars1.githubusercontent.com/u/32873416?v=4" width="100px;" alt=""/><br /><sub><b>awallendahl</b></sub></a><br /><a href="#content-awallendahl" title="Content">🖋</a></td>
    <td align="center"><a href="https://blog.bmannconsulting.com"><img src="https://avatars2.githubusercontent.com/u/280420?v=4" width="100px;" alt=""/><br /><sub><b>Boris Mann</b></sub></a><br /><a href="#content-bmann" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/carumusan"><img src="https://avatars1.githubusercontent.com/u/879525?v=4" width="100px;" alt=""/><br /><sub><b>carumusan</b></sub></a><br /><a href="#content-carumusan" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/econoar"><img src="https://avatars1.githubusercontent.com/u/5050615?v=4" width="100px;" alt=""/><br /><sub><b>econoar</b></sub></a><br /><a href="#content-econoar" title="Content">🖋</a></td>
    <td align="center"><a href="http://twitter.com/gesq_"><img src="https://avatars1.githubusercontent.com/u/1707044?v=4" width="100px;" alt=""/><br /><sub><b>Gustavo Esquinca</b></sub></a><br /><a href="#content-gesquinca" title="Content">🖋</a></td>
    <td align="center"><a href="http://www.superblocks.com"><img src="https://avatars3.githubusercontent.com/u/7814134?v=4" width="100px;" alt=""/><br /><sub><b>Javier Tarazaga</b></sub></a><br /><a href="#content-javier-tarazaga" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/kcole16"><img src="https://avatars2.githubusercontent.com/u/5624527?v=4" width="100px;" alt=""/><br /><sub><b>Kendall Cole</b></sub></a><br /><a href="#content-kcole16" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/lbrendanl"><img src="https://avatars3.githubusercontent.com/u/5441045?v=4" width="100px;" alt=""/><br /><sub><b>Brendan Lee</b></sub></a><br /><a href="#content-lbrendanl" title="Content">🖋</a></td>
    <td align="center"><a href="https://www.zastrin.com"><img src="https://avatars3.githubusercontent.com/u/70360?v=4" width="100px;" alt=""/><br /><sub><b>Mahesh Murthy</b></sub></a><br /><a href="#content-maheshmurthy" title="Content">🖋</a></td>
    <td align="center"><a href="http://oneclickdapp.com"><img src="https://avatars1.githubusercontent.com/u/35622595?v=4" width="100px;" alt=""/><br /><sub><b>Patrick Gallagher</b></sub></a><br /><a href="#content-pi0neerpat" title="Content">🖋</a></td>
    <td align="center"><a href="https://www.mrroom.in"><img src="https://avatars0.githubusercontent.com/u/43527087?v=4" width="100px;" alt=""/><br /><sub><b>Ali Abbas</b></sub></a><br /><a href="#content-realabbas" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/wtf"><img src="https://avatars3.githubusercontent.com/u/2460739?v=4" width="100px;" alt=""/><br /><sub><b>wtf</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=wtf" title="Code">💻</a> <a href="https://github.com/ethereum/ethereum-org-website/pulls?q=is%3Apr+reviewed-by%3Awtf" title="Reviewed Pull Requests">👀</a> <a href="#infra-wtf" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://s0b0lev.com"><img src="https://avatars1.githubusercontent.com/u/2613381?v=4" width="100px;" alt=""/><br /><sub><b> Aleksandr Sobolev</b></sub></a><br /><a href="#content-s0b0lev" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://www.whiteblock.io"><img src="https://avatars1.githubusercontent.com/u/20308948?v=4" width="100px;" alt=""/><br /><sub><b>Zak Cole</b></sub></a><br /><a href="#content-zscole" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/BogdanHabic"><img src="https://avatars2.githubusercontent.com/u/5364073?v=4" width="100px;" alt=""/><br /><sub><b>Bogdan Habic</b></sub></a><br /><a href="#content-BogdanHabic" title="Content">🖋</a></td>
    <td align="center"><a href="https://sawinyh.com"><img src="https://avatars1.githubusercontent.com/u/7769371?v=4" width="100px;" alt=""/><br /><sub><b>Nick Sawinyh</b></sub></a><br /><a href="#content-sneg55" title="Content">🖋</a></td>
    <td align="center"><a href="http://zoek1.github.com"><img src="https://avatars1.githubusercontent.com/u/660973?v=4" width="100px;" alt=""/><br /><sub><b>Miguel Angel Gordián</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=zoek1" title="Code">💻</a></td>
    <td align="center"><a href="https://eswarasai.com"><img src="https://avatars2.githubusercontent.com/u/5172086?v=4" width="100px;" alt=""/><br /><sub><b>Eswara Sai</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=eswarasai" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ethers"><img src="https://avatars1.githubusercontent.com/u/6937903?v=4" width="100px;" alt=""/><br /><sub><b>ethers</b></sub></a><br /><a href="#content-ethers" title="Content">🖋</a> <a href="#ideas-ethers" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://faraggi.org"><img src="https://avatars2.githubusercontent.com/u/264382?v=4" width="100px;" alt=""/><br /><sub><b>Felipe Faraggi</b></sub></a><br /><a href="#content-faraggi" title="Content">🖋</a> <a href="#translation-faraggi" title="Translation">🌍</a> <a href="#ideas-faraggi" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/maurelian"><img src="https://avatars3.githubusercontent.com/u/23033765?v=4" width="100px;" alt=""/><br /><sub><b>Maurelian</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=maurelian" title="Code">💻</a> <a href="https://github.com/ethereum/ethereum-org-website/pulls?q=is%3Apr+reviewed-by%3Amaurelian" title="Reviewed Pull Requests">👀</a> <a href="#content-maurelian" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/CPSTL"><img src="https://avatars0.githubusercontent.com/u/32653033?v=4" width="100px;" alt=""/><br /><sub><b>CPSTL</b></sub></a><br /><a href="#content-CPSTL" title="Content">🖋</a> <a href="https://github.com/ethereum/ethereum-org-website/pulls?q=is%3Apr+reviewed-by%3ACPSTL" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/ethereum/ethereum-org-website/commits?author=CPSTL" title="Documentation">📖</a></td>
    <td align="center"><a href="http://www.hudsonjameson.com"><img src="https://avatars1.githubusercontent.com/u/3460120?v=4" width="100px;" alt=""/><br /><sub><b>Hudson Jameson</b></sub></a><br /><a href="#content-Souptacular" title="Content">🖋</a> <a href="https://github.com/ethereum/ethereum-org-website/commits?author=Souptacular" title="Documentation">📖</a></td>
    <td align="center"><a href="https://shayan.es/"><img src="https://avatars2.githubusercontent.com/u/309108?v=4" width="100px;" alt=""/><br /><sub><b>Shayan Eskandari</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=shayanb" title="Code">💻</a> <a href="#translation-shayanb" title="Translation">🌍</a></td>
    <td align="center"><a href="http://www.scydev.ch"><img src="https://avatars3.githubusercontent.com/u/1307146?v=4" width="100px;" alt=""/><br /><sub><b>Lukas Sägesser</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=ScyDev" title="Code">💻</a></td>
    <td align="center"><a href="http://virgil.gr"><img src="https://avatars2.githubusercontent.com/u/81322?v=4" width="100px;" alt=""/><br /><sub><b>Virgil Griffith</b></sub></a><br /><a href="#content-virgil" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/easeev"><img src="https://avatars3.githubusercontent.com/u/14873170?v=4" width="100px;" alt=""/><br /><sub><b>Eugene Aseev</b></sub></a><br /><a href="#content-easeev" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://jannispohlmann.de/"><img src="https://avatars0.githubusercontent.com/u/19324?v=4" width="100px;" alt=""/><br /><sub><b>Jannis Pohlmann</b></sub></a><br /><a href="#content-Jannis" title="Content">🖋</a></td>
    <td align="center"><a href="https://steemblog.github.io/@robertyan"><img src="https://avatars0.githubusercontent.com/u/46699230?v=4" width="100px;" alt=""/><br /><sub><b>think-in-universe</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=think-in-universe" title="Code">💻</a> <a href="#content-think-in-universe" title="Content">🖋</a></td>
    <td align="center"><a href="http://l4v.io"><img src="https://avatars3.githubusercontent.com/u/17183498?v=4" width="100px;" alt=""/><br /><sub><b>Josh Stark</b></sub></a><br /><a href="#content-jjmstark" title="Content">🖋</a> <a href="https://github.com/ethereum/ethereum-org-website/pulls?q=is%3Apr+reviewed-by%3Ajjmstark" title="Reviewed Pull Requests">👀</a> <a href="#projectManagement-jjmstark" title="Project Management">📆</a></td>
    <td align="center"><a href="https://www.alanwoo.ca"><img src="https://avatars0.githubusercontent.com/u/1481890?v=4" width="100px;" alt=""/><br /><sub><b>Alan Woo</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=alancwoo" title="Code">💻</a> <a href="#design-alancwoo" title="Design">🎨</a></td>
    <td align="center"><a href="https://manankpatni.wordpress.com/"><img src="https://avatars3.githubusercontent.com/u/12700384?v=4" width="100px;" alt=""/><br /><sub><b>Manank Patni</b></sub></a><br /><a href="#content-Man-Jain" title="Content">🖋</a></td>
    <td align="center"><a href="http://www.rogerioaraujo.co.nf/"><img src="https://avatars0.githubusercontent.com/u/20842252?v=4" width="100px;" alt=""/><br /><sub><b>Rogério Araújo</b></sub></a><br /><a href="#translation-rodgeraraujo" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/natacha-involves"><img src="https://avatars1.githubusercontent.com/u/49870579?v=4" width="100px;" alt=""/><br /><sub><b>Natacha Souza</b></sub></a><br /><a href="#translation-natacha-involves" title="Translation">🌍</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/sorumfactory"><img src="https://avatars1.githubusercontent.com/u/15648718?v=4" width="100px;" alt=""/><br /><sub><b>sorumfactory</b></sub></a><br /><a href="#translation-sorumfactory" title="Translation">🌍</a> <a href="#projectManagement-sorumfactory" title="Project Management">📆</a> <a href="#content-sorumfactory" title="Content">🖋</a></td>
    <td align="center"><a href="https://www.samajammin.com/"><img src="https://avatars1.githubusercontent.com/u/8097623?v=4" width="100px;" alt=""/><br /><sub><b>Sam Richards</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=samajammin" title="Code">💻</a> <a href="#content-samajammin" title="Content">🖋</a> <a href="https://github.com/ethereum/ethereum-org-website/commits?author=samajammin" title="Documentation">📖</a> <a href="#projectManagement-samajammin" title="Project Management">📆</a></td>
    <td align="center"><a href="http://antodp.xyz"><img src="https://avatars3.githubusercontent.com/u/20992089?v=4" width="100px;" alt=""/><br /><sub><b>Antonio Della Porta</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=antodp" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Abhimanyu121"><img src="https://avatars0.githubusercontent.com/u/16034874?v=4" width="100px;" alt=""/><br /><sub><b>Abhimanyu Shekhawat</b></sub></a><br /><a href="#content-Abhimanyu121" title="Content">🖋</a></td>
    <td align="center"><a href="http://phor.net"><img src="https://avatars0.githubusercontent.com/u/382183?v=4" width="100px;" alt=""/><br /><sub><b>William Entriken</b></sub></a><br /><a href="#content-fulldecent" title="Content">🖋</a></td>
    <td align="center"><a href="http://sangphilkim.me"><img src="https://avatars1.githubusercontent.com/u/13456532?v=4" width="100px;" alt=""/><br /><sub><b>Sangphil Kim</b></sub></a><br /><a href="#translation-sangphilkim" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/tstt"><img src="https://avatars2.githubusercontent.com/u/16997688?v=4" width="100px;" alt=""/><br /><sub><b>peijie</b></sub></a><br /><a href="#translation-tstt" title="Translation">🌍</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Jokyash"><img src="https://avatars1.githubusercontent.com/u/44118299?v=4" width="100px;" alt=""/><br /><sub><b>Jokyash</b></sub></a><br /><a href="#translation-Jokyash" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/pedrorivera"><img src="https://avatars2.githubusercontent.com/u/4961012?v=4" width="100px;" alt=""/><br /><sub><b>Pedro Rivera</b></sub></a><br /><a href="#translation-pedrorivera" title="Translation">🌍</a></td>
    <td align="center"><a href="https://beta.rigoblock.com"><img src="https://avatars1.githubusercontent.com/u/12066256?v=4" width="100px;" alt=""/><br /><sub><b>Gabriele Rigo</b></sub></a><br /><a href="#translation-gabririgo" title="Translation">🌍</a></td>
    <td align="center"><a href="http://tilend.si"><img src="https://avatars1.githubusercontent.com/u/912560?v=4" width="100px;" alt=""/><br /><sub><b>Tilen Držan</b></sub></a><br /><a href="#translation-dTilen" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/jJosko1986"><img src="https://avatars2.githubusercontent.com/u/54378053?v=4" width="100px;" alt=""/><br /><sub><b>jJosko1986</b></sub></a><br /><a href="#translation-jJosko1986" title="Translation">🌍</a></td>
    <td align="center"><a href="https://ethereum.cn"><img src="https://avatars1.githubusercontent.com/u/53846157?v=4" width="100px;" alt=""/><br /><sub><b>ECN</b></sub></a><br /><a href="#translation-EthereumCommunityNetwork" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/damianoazzolini"><img src="https://avatars2.githubusercontent.com/u/24901681?v=4" width="100px;" alt=""/><br /><sub><b>Damiano Azzolini</b></sub></a><br /><a href="#translation-damianoazzolini" title="Translation">🌍</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/matteopey"><img src="https://avatars2.githubusercontent.com/u/28830727?v=4" width="100px;" alt=""/><br /><sub><b>matteopey</b></sub></a><br /><a href="#translation-matteopey" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/kilu83"><img src="https://avatars3.githubusercontent.com/u/29397119?v=4" width="100px;" alt=""/><br /><sub><b>Hun Ryu</b></sub></a><br /><a href="#translation-kilu83" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/nake13"><img src="https://avatars0.githubusercontent.com/u/6271031?v=4" width="100px;" alt=""/><br /><sub><b>nake13</b></sub></a><br /><a href="#translation-nake13" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/alexiskefalas"><img src="https://avatars2.githubusercontent.com/u/57708389?v=4" width="100px;" alt=""/><br /><sub><b>alexiskefalas</b></sub></a><br /><a href="#translation-alexiskefalas" title="Translation">🌍</a></td>
    <td align="center"><a href="http://Behrad.Khodayar.me"><img src="https://avatars1.githubusercontent.com/u/16176436?v=4" width="100px;" alt=""/><br /><sub><b>Behrad Khodayar</b></sub></a><br /><a href="#translation-behradkhodayar" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/Frankaus"><img src="https://avatars3.githubusercontent.com/u/57708955?v=4" width="100px;" alt=""/><br /><sub><b>Frankaus</b></sub></a><br /><a href="#translation-Frankaus" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/hacktar"><img src="https://avatars2.githubusercontent.com/u/11939542?v=4" width="100px;" alt=""/><br /><sub><b>hacktar</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=hacktar" title="Code">💻</a> <a href="#translation-hacktar" title="Translation">🌍</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/DjangoM"><img src="https://avatars2.githubusercontent.com/u/35060411?v=4" width="100px;" alt=""/><br /><sub><b>Jaroslav Macej</b></sub></a><br /><a href="#translation-DjangoM" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/EmanHerawy"><img src="https://avatars3.githubusercontent.com/u/10674070?v=4" width="100px;" alt=""/><br /><sub><b>Eman Herawy</b></sub></a><br /><a href="#translation-EmanHerawy" title="Translation">🌍</a> <a href="https://github.com/ethereum/ethereum-org-website/commits?author=EmanHerawy" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Bellinas"><img src="https://avatars0.githubusercontent.com/u/45827044?v=4" width="100px;" alt=""/><br /><sub><b>Bellinas</b></sub></a><br /><a href="#translation-Bellinas" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/amchercashin"><img src="https://avatars3.githubusercontent.com/u/8727497?v=4" width="100px;" alt=""/><br /><sub><b>Alexander Cherkashin</b></sub></a><br /><a href="#translation-amchercashin" title="Translation">🌍</a></td>
    <td align="center"><a href="http://www.soarontech.com.ng"><img src="https://avatars0.githubusercontent.com/u/29120867?v=4" width="100px;" alt=""/><br /><sub><b>Enoch Mbaebie</b></sub></a><br /><a href="#translation-EnochMbaebie" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/inlak16"><img src="https://avatars1.githubusercontent.com/u/53479637?v=4" width="100px;" alt=""/><br /><sub><b>inlak16</b></sub></a><br /><a href="#translation-inlak16" title="Translation">🌍</a></td>
    <td align="center"><a href="https://www.c4at.cn/"><img src="https://avatars0.githubusercontent.com/u/1224604?v=4" width="100px;" alt=""/><br /><sub><b>Bob Jiang</b></sub></a><br /><a href="#translation-bobjiang" title="Translation">🌍</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/suhunkim/"><img src="https://avatars1.githubusercontent.com/u/826798?v=4" width="100px;" alt=""/><br /><sub><b>Suhun Kim</b></sub></a><br /><a href="#translation-cobject" title="Translation">🌍</a></td>
    <td align="center"><a href="http://jzu.blog.free.fr/"><img src="https://avatars3.githubusercontent.com/u/337334?v=4" width="100px;" alt=""/><br /><sub><b>Jean Zundel</b></sub></a><br /><a href="#translation-jzu" title="Translation">🌍</a></td>
    <td align="center"><a href="https://twitter.com/_Hachemi_"><img src="https://avatars2.githubusercontent.com/u/12778013?v=4" width="100px;" alt=""/><br /><sub><b>Hachemi</b></sub></a><br /><a href="#translation-HachemiH" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/hanzoh1"><img src="https://avatars0.githubusercontent.com/u/42790758?v=4" width="100px;" alt=""/><br /><sub><b>hanzoh</b></sub></a><br /><a href="#translation-hanzoh1" title="Translation">🌍</a></td>
    <td align="center"><a href="https://twitter.com/vincentLg"><img src="https://avatars1.githubusercontent.com/u/813911?v=4" width="100px;" alt=""/><br /><sub><b>Vincent Le Gallic</b></sub></a><br /><a href="#translation-vincentlg" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/Enigmatic331"><img src="https://avatars2.githubusercontent.com/u/28551011?v=4" width="100px;" alt=""/><br /><sub><b>Enigmatic331</b></sub></a><br /><a href="#content-Enigmatic331" title="Content">🖋</a></td>
    <td align="center"><a href="https://twitter.com/0zAND1z"><img src="https://avatars1.githubusercontent.com/u/11145839?v=4" width="100px;" alt=""/><br /><sub><b>Ganesh Prasad Kumble</b></sub></a><br /><a href="#content-0zAND1z" title="Content">🖋</a> <a href="#translation-0zAND1z" title="Translation">🌍</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/pontiyaraja"><img src="https://avatars0.githubusercontent.com/u/1989030?v=4" width="100px;" alt=""/><br /><sub><b>Pandiyaraja Ramamoorthy</b></sub></a><br /><a href="#content-pontiyaraja" title="Content">🖋</a> <a href="#translation-pontiyaraja" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/Kuekuatsheu95"><img src="https://avatars0.githubusercontent.com/u/45584024?v=4" width="100px;" alt=""/><br /><sub><b>Archan Roychoudhury</b></sub></a><br /><a href="#content-Kuekuatsheu95" title="Content">🖋</a> <a href="#translation-Kuekuatsheu95" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/its-VSP"><img src="https://avatars0.githubusercontent.com/u/22447085?v=4" width="100px;" alt=""/><br /><sub><b>SAI PRASHANTH VUPPALA</b></sub></a><br /><a href="#content-its-VSP" title="Content">🖋</a> <a href="#translation-its-VSP" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/sickmorty"><img src="https://avatars3.githubusercontent.com/u/39275239?v=4" width="100px;" alt=""/><br /><sub><b>Sayid Almahdy</b></sub></a><br /><a href="#translation-sickmorty" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/jeedani"><img src="https://avatars2.githubusercontent.com/u/36130718?v=4" width="100px;" alt=""/><br /><sub><b>jeedani</b></sub></a><br /><a href="#translation-jeedani" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/akira-19"><img src="https://avatars2.githubusercontent.com/u/38364091?v=4" width="100px;" alt=""/><br /><sub><b>Akira</b></sub></a><br /><a href="#translation-akira-19" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/karansinghgit"><img src="https://avatars3.githubusercontent.com/u/44376616?v=4" width="100px;" alt=""/><br /><sub><b>karansinghgit</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=karansinghgit" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://www.manning.com/books/redux-in-action?a_aid=coach&a_bid=48d05fcb"><img src="https://avatars1.githubusercontent.com/u/3621728?v=4" width="100px;" alt=""/><br /><sub><b>Marc Garreau</b></sub></a><br /><a href="#content-marcgarreau" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/mul53"><img src="https://avatars0.githubusercontent.com/u/19148531?v=4" width="100px;" alt=""/><br /><sub><b>mul53</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=mul53" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/CodinMaster"><img src="https://avatars3.githubusercontent.com/u/20395316?v=4" width="100px;" alt=""/><br /><sub><b>Apoorv Lathey</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=CodinMaster" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ksato9700"><img src="https://avatars1.githubusercontent.com/u/175834?v=4" width="100px;" alt=""/><br /><sub><b>Ken Sato</b></sub></a><br /><a href="#content-ksato9700" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/Sesamestrong"><img src="https://avatars3.githubusercontent.com/u/26335275?v=4" width="100px;" alt=""/><br /><sub><b>Sesamestrong</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=Sesamestrong" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Christofon"><img src="https://avatars0.githubusercontent.com/u/26435661?v=4" width="100px;" alt=""/><br /><sub><b>ChrisK</b></sub></a><br /><a href="#content-Christofon" title="Content">🖋</a></td>
    <td align="center"><a href="https://stackoverflow.com/story/svanas"><img src="https://avatars1.githubusercontent.com/u/787861?v=4" width="100px;" alt=""/><br /><sub><b>Stefan van As</b></sub></a><br /><a href="#content-svanas" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://greg.jeanmart.me"><img src="https://avatars3.githubusercontent.com/u/506784?v=4" width="100px;" alt=""/><br /><sub><b>Grégoire Jeanmart</b></sub></a><br /><a href="#content-gjeanmart" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/nysxah"><img src="https://avatars2.githubusercontent.com/u/30059030?v=4" width="100px;" alt=""/><br /><sub><b>nysxah</b></sub></a><br /><a href="#content-nysxah" title="Content">🖋</a></td>
    <td align="center"><a href="http://rachblondon.github.io/"><img src="https://avatars0.githubusercontent.com/u/8742251?v=4" width="100px;" alt=""/><br /><sub><b>Rachel</b></sub></a><br /><a href="#content-RachBLondon" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/wschwab"><img src="https://avatars3.githubusercontent.com/u/31592931?v=4" width="100px;" alt=""/><br /><sub><b>wschwab</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=wschwab" title="Code">💻</a></td>
    <td align="center"><a href="http://twitter.com/relativeread"><img src="https://avatars2.githubusercontent.com/u/34966228?v=4" width="100px;" alt=""/><br /><sub><b>Edson Ayllon</b></sub></a><br /><a href="#content-edsonayllon" title="Content">🖋</a> <a href="#ideas-edsonayllon" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://peteris.xyz"><img src="https://avatars0.githubusercontent.com/u/224585?v=4" width="100px;" alt=""/><br /><sub><b>Peteris Erins</b></sub></a><br /><a href="#content-Pet3ris" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/JimmyShi22"><img src="https://avatars3.githubusercontent.com/u/12178678?v=4" width="100px;" alt=""/><br /><sub><b>jimmyshi</b></sub></a><br /><a href="#content-JimmyShi22" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://www.netyul.com.br"><img src="https://avatars0.githubusercontent.com/u/3399117?v=4" width="100px;" alt=""/><br /><sub><b>Jefte Costa</b></sub></a><br /><a href="#translation-JefteCosta" title="Translation">🌍</a> <a href="https://github.com/ethereum/ethereum-org-website/commits?author=JefteCosta" title="Code">💻</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/jinho-jang-4304a0142/"><img src="https://avatars2.githubusercontent.com/u/41753422?v=4" width="100px;" alt=""/><br /><sub><b>Jinho Jang</b></sub></a><br /><a href="#content-jinhojang6" title="Content">🖋</a></td>
    <td align="center"><a href="https://eattheblocks.com"><img src="https://avatars2.githubusercontent.com/u/9279488?v=4" width="100px;" alt=""/><br /><sub><b>Julien Klepatch</b></sub></a><br /><a href="#content-jklepatch" title="Content">🖋</a></td>
    <td align="center"><a href="https://www.yazkhoury.com"><img src="https://avatars2.githubusercontent.com/u/9094204?v=4" width="100px;" alt=""/><br /><sub><b>Yaz Khoury</b></sub></a><br /><a href="#content-YazzyYaz" title="Content">🖋</a></td>
    <td align="center"><a href="http://yos.io"><img src="https://avatars3.githubusercontent.com/u/1084226?v=4" width="100px;" alt=""/><br /><sub><b>Yos Riady</b></sub></a><br /><a href="#content-yosriady" title="Content">🖋</a></td>
    <td align="center"><a href="http://infura.io"><img src="https://avatars2.githubusercontent.com/u/1210802?v=4" width="100px;" alt=""/><br /><sub><b>Andrew Cohen</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Aandrewjcohen" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://twitter.com/wslyvh"><img src="https://avatars2.githubusercontent.com/u/25974464?v=4" width="100px;" alt=""/><br /><sub><b>Wesley van Heije</b></sub></a><br /><a href="#content-wslyvh" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/gr0uch0dev"><img src="https://avatars1.githubusercontent.com/u/17497722?v=4" width="100px;" alt=""/><br /><sub><b>gr0uch0dev</b></sub></a><br /><a href="#content-gr0uch0dev" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/hsy822"><img src="https://avatars3.githubusercontent.com/u/17763340?v=4" width="100px;" alt=""/><br /><sub><b>sooyoung</b></sub></a><br /><a href="#content-hsy822" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/adria0"><img src="https://avatars3.githubusercontent.com/u/5526331?v=4" width="100px;" alt=""/><br /><sub><b>Adria Massanet</b></sub></a><br /><a href="#content-adria0" title="Content">🖋</a></td>
    <td align="center"><a href="http://www.alexsingh.com"><img src="https://avatars0.githubusercontent.com/u/6787950?v=4" width="100px;" alt=""/><br /><sub><b>Alex Singh</b></sub></a><br /><a href="#design-as-dr" title="Design">🎨</a></td>
    <td align="center"><a href="http://carlfairclough.me"><img src="https://avatars1.githubusercontent.com/u/4670881?v=4" width="100px;" alt=""/><br /><sub><b>Carl Fairclough</b></sub></a><br /><a href="#design-carlfairclough" title="Design">🎨</a> <a href="https://github.com/ethereum/ethereum-org-website/commits?author=carlfairclough" title="Code">💻</a> <a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Acarlfairclough" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/kvrnc"><img src="https://avatars3.githubusercontent.com/u/36660375?v=4" width="100px;" alt=""/><br /><sub><b>Kaven C</b></sub></a><br /><a href="#content-kvrnc" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/mhatvan"><img src="https://avatars2.githubusercontent.com/u/16797721?v=4" width="100px;" alt=""/><br /><sub><b>Markus Hatvan</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=mhatvan" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/evanstucker-hates-2fa"><img src="https://avatars0.githubusercontent.com/u/20584445?v=4" width="100px;" alt=""/><br /><sub><b>Evans Tucker</b></sub></a><br /><a href="#content-evanstucker-hates-2fa" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/fluffays"><img src="https://avatars1.githubusercontent.com/u/39056857?v=4" width="100px;" alt=""/><br /><sub><b>Adina Cretu</b></sub></a><br /><a href="#translation-fluffays" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/tvanepps"><img src="https://avatars1.githubusercontent.com/u/27454964?v=4" width="100px;" alt=""/><br /><sub><b>tvanepps</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Atvanepps" title="Bug reports">🐛</a> <a href="#content-tvanepps" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/FlipFloop"><img src="https://avatars3.githubusercontent.com/u/19635051?v=4" width="100px;" alt=""/><br /><sub><b>Victor Guyard</b></sub></a><br /><a href="#a11y-FlipFloop" title="Accessibility">️️️️♿️</a></td>
    <td align="center"><a href="http://www.abhranil.net"><img src="https://avatars0.githubusercontent.com/u/1142007?v=4" width="100px;" alt=""/><br /><sub><b>Abhranil Das</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Aabhranildas" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://www.emin.tech"><img src="https://avatars2.githubusercontent.com/u/10382507?v=4" width="100px;" alt=""/><br /><sub><b>Ahmet Emin Koçal</b></sub></a><br /><a href="#translation-ahmeteminkocal" title="Translation">🌍</a></td>
    <td align="center"><a href="http://empire.studio"><img src="https://avatars0.githubusercontent.com/u/33502282?v=4" width="100px;" alt=""/><br /><sub><b>Aqeel</b></sub></a><br /><a href="#ideas-qnou" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/linda-xie"><img src="https://avatars0.githubusercontent.com/u/55955358?v=4" width="100px;" alt=""/><br /><sub><b>Linda Xie</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/pulls?q=is%3Apr+reviewed-by%3Alinda-xie" title="Reviewed Pull Requests">👀</a> <a href="#content-linda-xie" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/IanEck"><img src="https://avatars2.githubusercontent.com/u/5863338?v=4" width="100px;" alt=""/><br /><sub><b>Ian Eck</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/pulls?q=is%3Apr+reviewed-by%3AIanEck" title="Reviewed Pull Requests">👀</a> <a href="#content-IanEck" title="Content">🖋</a></td>
    <td align="center"><a href="http://wwaves.co"><img src="https://avatars2.githubusercontent.com/u/106938?v=4" width="100px;" alt=""/><br /><sub><b>Chris Waring</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=cwaring" title="Code">💻</a> <a href="#ideas-cwaring" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/evertonfraga"><img src="https://avatars2.githubusercontent.com/u/47108?v=4" width="100px;" alt=""/><br /><sub><b>Ev</b></sub></a><br /><a href="#ideas-evertonfraga" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Aevertonfraga" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://discord.gg/5W5tVb3"><img src="https://avatars2.githubusercontent.com/u/6251510?v=4" width="100px;" alt=""/><br /><sub><b>Ivan Martinez</b></sub></a><br /><a href="#content-0xKiwi" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/sebastiantf"><img src="https://avatars3.githubusercontent.com/u/36922376?v=4" width="100px;" alt=""/><br /><sub><b>Sebastian T F</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=sebastiantf" title="Code">💻</a></td>
    <td align="center"><a href="https://twitter.com/AnettRolikova"><img src="https://avatars1.githubusercontent.com/u/44020788?v=4" width="100px;" alt=""/><br /><sub><b>Anett Rolikova </b></sub></a><br /><a href="#content-anettrolikova" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://etherworld.co"><img src="https://avatars0.githubusercontent.com/u/29681685?v=4" width="100px;" alt=""/><br /><sub><b>Pooja Ranjan</b></sub></a><br /><a href="#content-poojaranjan" title="Content">🖋</a></td>
    <td align="center"><a href="https//twitter.com/sassal0x"><img src="https://avatars0.githubusercontent.com/u/9276959?v=4" width="100px;" alt=""/><br /><sub><b>sassal</b></sub></a><br /><a href="#content-sassal" title="Content">🖋</a></td>
    <td align="center"><a href="https://zaremba.ch"><img src="https://avatars0.githubusercontent.com/u/811701?v=4" width="100px;" alt=""/><br /><sub><b>Robert Zaremba</b></sub></a><br /><a href="#content-robert-zaremba" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/tasdienes"><img src="https://avatars1.githubusercontent.com/u/18563486?v=4" width="100px;" alt=""/><br /><sub><b>Tas</b></sub></a><br /><a href="#ideas-tasdienes" title="Ideas, Planning, & Feedback">🤔</a> <a href="#content-tasdienes" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/s-pace"><img src="https://avatars2.githubusercontent.com/u/32097720?v=4" width="100px;" alt=""/><br /><sub><b>Sylvain Pace</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=s-pace" title="Code">💻</a></td>
    <td align="center"><a href="http://twitter.com/sinahab"><img src="https://avatars0.githubusercontent.com/u/4315207?v=4" width="100px;" alt=""/><br /><sub><b>Sina Habibian</b></sub></a><br /><a href="#ideas-sinahab" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://www.dennisonbertram.com"><img src="https://avatars0.githubusercontent.com/u/1938013?v=4" width="100px;" alt=""/><br /><sub><b>Dennison Bertram</b></sub></a><br /><a href="#ideas-crazyrabbitLTC" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/arturgontijo"><img src="https://avatars0.githubusercontent.com/u/15108323?v=4" width="100px;" alt=""/><br /><sub><b>Artur Gontijo</b></sub></a><br /><a href="#ideas-arturgontijo" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/ethjoe"><img src="https://avatars0.githubusercontent.com/u/36374665?v=4" width="100px;" alt=""/><br /><sub><b>ethjoe</b></sub></a><br /><a href="#content-ethjoe" title="Content">🖋</a> <a href="https://github.com/ethereum/ethereum-org-website/pulls?q=is%3Apr+reviewed-by%3Aethjoe" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/cooganb"><img src="https://avatars2.githubusercontent.com/u/8144425?v=4" width="100px;" alt=""/><br /><sub><b>cooganb</b></sub></a><br /><a href="#ideas-cooganb" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/drequinox"><img src="https://avatars1.githubusercontent.com/u/34604812?v=4" width="100px;" alt=""/><br /><sub><b>drequinox</b></sub></a><br /><a href="#content-drequinox" title="Content">🖋</a></td>
    <td align="center"><a href="https://biconomy.io"><img src="https://avatars1.githubusercontent.com/u/17008737?v=4" width="100px;" alt=""/><br /><sub><b>Tarun Gupta</b></sub></a><br /><a href="#content-tarun1475" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/jpitts"><img src="https://avatars1.githubusercontent.com/u/509756?v=4" width="100px;" alt=""/><br /><sub><b>Jamie Pitts</b></sub></a><br /><a href="#ideas-jpitts" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://web3.consulting"><img src="https://avatars0.githubusercontent.com/u/25006584?v=4" width="100px;" alt=""/><br /><sub><b>Chris Seifert</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Aseichris" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://johnpcraig.com"><img src="https://avatars1.githubusercontent.com/u/16075438?v=4" width="100px;" alt=""/><br /><sub><b>John Craig</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=JCraigWasTaken" title="Code">💻</a></td>
    <td align="center"><a href="https://morpheus.network/"><img src="https://avatars0.githubusercontent.com/u/36540973?v=4" width="100px;" alt=""/><br /><sub><b>Noam Eppel</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3AMorpheusNetwork" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/jacobwillemsma"><img src="https://avatars0.githubusercontent.com/u/4511854?v=4" width="100px;" alt=""/><br /><sub><b>Jacob Willemsma</b></sub></a><br /><a href="#content-jacobwillemsma" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/alexmb15"><img src="https://avatars3.githubusercontent.com/u/12184447?v=4" width="100px;" alt=""/><br /><sub><b>Alex</b></sub></a><br /><a href="#ideas-alexmb15" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://twitter.com/PaulRBerg"><img src="https://avatars1.githubusercontent.com/u/8782666?v=4" width="100px;" alt=""/><br /><sub><b>Paul Razvan Berg</b></sub></a><br /><a href="#content-PaulRBerg" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/ph5500"><img src="https://avatars0.githubusercontent.com/u/60459707?v=4" width="100px;" alt=""/><br /><sub><b>ph5500</b></sub></a><br /><a href="#content-ph5500" title="Content">🖋</a></td>
    <td align="center"><a href="http://www.johnmonarch.com"><img src="https://avatars1.githubusercontent.com/u/31969812?v=4" width="100px;" alt=""/><br /><sub><b>John Monarch</b></sub></a><br /><a href="#content-johnmonarch" title="Content">🖋</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

**A note on emojis**
We use [Twemoji](https://twemoji.twitter.com/), an open-source emoji set created by Twitter. These are hosted by us, and used to provide a consistent experience across operating systems.
