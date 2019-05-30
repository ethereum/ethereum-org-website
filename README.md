<h1 align="center" style="margin-top: 1em; margin-bottom: 3em;">
  <p><a href="https://ethereum.org"><img alt="ethereum logo" src="./eth.png" alt="ethereum.org" width="125"></a></p>
  <p>👋 Benvenuti a ethereum.org!</p>
</h1>

[Ethereum.org](https://ethereum.org) è una risorsa online primaria per la comunità Ethereum. E' aggiornata e modificata nel tempo attraverso i contributi dei membri della comunità che aggiungono contenuti, offrono feedback, o prestano il loro tempo alla gestione della sua evoluzione.

Se sei interessato ad aiutare la crescita di [ethereum.org](https://ethereum.org), puoi partire da qui. Questa guida alla contribuzione ti aiuterà a cominciare.

<br>

### Il design e il contenuto di Ethereum.org è guidato da tre principi fondanti:


**🌏 1. Ethereum.org è un portale verso risorse create dalla comunità**
  - Non diventerà mai “encyclopedia ethereum” - non possiamo aggiungere qualsiasi link, o coprire ogni tema
  - Piuttosto, il suo scopo è dirigere le persone verso risorse costruite dalla cmomunity
  - Ethereum.org avrà sempre contenuto-nativo minimale

**🛠 2. Ethereum.org è un "work in progress", perchè Ethereum è un "work in progress"**
  - Il sito è stato rilanciato esplicitamente in forma non finita
  - Pianifichiamo di modificarlo nel tempo, sia nel contenuto che nel design
  - Per favorire modifiche di lungo teemine, il sito ha una semplice struttura modulare che ci permetterà di aggiungere o rimuovere pagine

**🦄 3. Ethereum.org non è il tipico sito web per l' esposizione di un prodotto*
  - Ethereum.org è la rappresentazione della nostra comunità disintermediata, e un punto di partenza
  - Ethereum.org non dovrebbe essere un sito web tradizionale orientato al prodotto come per ogni altra blockchain. Non è un portale di vendita.


## Come posso contribuire?

Tenendo in mente i suddetti principi fondanti, ci sono molti modi in cui puoi essere coinvolto al miglioramento del sito!


- Visita la pagina degli "issues" e vedi se cè qualcosa per cui pèuoi renderti utile!
- Inoltra link per aggiungere specifiche sezioni che reputi incomplete, attraverso l ' inoltro di una "pull request"
- Identifica informazioni datate/obsolete su ethereum.org (o collegato da/verso ethereum.org) e inoltra una pull-request
- Inoltra nuovi design per l' immagine HERO in home page - trova [qui](https://github.com/ethereum/ethereum-org-website/blob/master/ethereum.org-hero-image-specs.pdf) le specifiche e contattaci a website@ethereum.org
- Suggerisci idee per nuove pagine/sezioni, nuovo contenuto, o altri modi per migliorare ethereum.org aprendo un "issue".


## Note su pagine indiviuali:

Se vuoi suggerire modifiche alle pagine, tieni a mente lo scopo di ogni pagina:

### 🛠 Developers

- Thepurpose of this page is to collect core technical resources helpful to someone building on Ethereum
- Information should be kept as up to date as possible, as new tools appear, standards are adopted, or material is deprecated
- This page will never be completely comprehensive: the goal is to list the most popular or widely used resources or tools.

### 📚 Learn

- The purpose of this page is to collect educational material about Ethereum on a variety of topics
- Some information will be technical in nature, but it will also include non-technical information, or articles that may serve as inspiration to community members

### 📱 Use

- This page is for the person who wants to get started using Ethereum, but doesn’t know how.
- This page will stay limited to 3 sections: Dapps, Ether, and Wallets.
- Useful contributions include: submitting suggestions for dapps to rotate onto this page, submitting suggestions for better links about Ether or Wallets.
- We will rotate the list of dapps on this page frequently!
- Dapp submissions will be assessed on the following criteria:
  - Is the dapp a "user" application? This page is targeted at the average user, which means it wouldn't be appropriate to list a dev tool or app targeted at sophisticated technical users.
  - Does the application have a good user on-boarding proces, such that a user can follow the link, and find all the instructions they need to get started?
  - Does the application "round out" the list by adding a new kind of application not already present?
  - Is there evidence that the application is popular and well established?


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
