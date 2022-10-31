---
title: "Configurarea integrării continue cu Solidity și Truffle"
description: Cum să configurați „Travis” sau „Circle CI” pentru testarea „Truffle” și plugin-uri utile
author: Markus Waas
lang: ro
tags:
  - "solidity"
  - "contracte inteligente"
  - "testare"
  - "truffle"
  - "integrare continuă"
  - "ganache"
skill: intermediate
published: 2020-06-05
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/continuous-integration
---

Integrarea continuă (CI) cu Truffle este excelentă pentru dezvoltare, odată ce aveți implementat un set de bază de teste. Vă permite să executați teste foarte lungi, să vă asigurați că toate testele reușesc înainte de a fuziona un [pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) și să țineți evidența diferitelor statistici folosind instrumente suplimentare.

Vom folosi [Truffle Metacoin Box](https://www.trufflesuite.com/boxes/metacoin) pentru a ne configura integrarea continuă. Puteți să alegeți fie Travis CI, fie Circle CI.

## Configurarea Travis CI {#setting-up-travis-ci}

Adăugarea [Travis CI](https://travis-ci.org/) este simplă. Va trebui doar să adăugați un fișier de configurare `.travis.yml` în directorul rădăcină al proiectului:

```yml
language: node_js
node_js:
  - 10

cache: npm

before_script:
  - echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

script:
  - npm test
```

Ne vom limita pentru moment la lucrurile simple și vom executa doar scriptul de testare care execută testele unitare Truffle. Dar avem o problemă, și anume că pe mașina Travis CI nu va fi disponibil un blockchain. Soluția cea mai simplă este de a `npm instala ganache-cli` și de a-l executa pur și simplu înainte de test. Puteți face acest lucru adăugând un script „bash” cu linia npx `ganache-cli > /dev/null` înainte de apelarea `npx truffle test`. Iată [exemplul complet de script bash](https://github.com/gorgos/Truffle-CI-Example/blob/master/scripts/run_tests.sh).

## Configurarea Circle CI {#setting-up-circle-ci}

[CircleCi](https://circleci.com/) necesită un fișier mai lung de configurare. Comanda suplimentară [`npm ci`](https://docs.npmjs.com/cli/ci.html) este efectuată automat în Travis. Aceasta instalează dependențele mai rapid și mai securizat decât o face `npm install`. Vom folosi din nou același script din versiunea Travis pentru a executa ganache-cli înainte de teste.

```yml
version: 2

aliases:
  - &defaults
    docker:
      - image: circleci/node:10

  - &cache_key_node_modules
    key: v1-node_modules-{{ checksum "package-lock.json" }}

jobs:
  dependencies:
    <<: *defaults
    steps:
      - checkout
      - restore_cache:
          <<: *cache_key_node_modules
      - run:
          name: Install npm dependencies
          command: |
            if [ ! -d node_modules ]; then
              npm ci
            fi
      - persist_to_workspace:
          root: .
          paths:
            - node_modules
            - build
      - save_cache:
          paths:
            - node_modules
          <<: *cache_key_node_modules

  test:
    <<: *defaults
    steps:
      - checkout
      - attach_workspace:
          at: .
      - run:
          name: Unit tests
          command: npm test

workflows:
  version: 2
  everything:
    jobs:
      - dependencies
      - test:
          requires:
            - dependencies
```

## Adăugarea plugin-ului „eth-gas-reporter” {#adding-the-eth-gas-reporter-plugin}

Plugin-ul „eth-gas-reporter” este foarte util pentru a ține evidența costurilor de gaz ale funcțiilor contractului dvs. inteligent. Dacă aveți acest plugin în CI, se va dovedi și mai util pentru a afișa „diff-urile” atunci când adăugați „pull request-uri".

### Etapa 1: Instalarea plugin-ului „eth-gas-reporter” și „codechecks” {#step-1-install-the-eth-gas-reporter-plugin-and-codechecks}

```bash
$ npm install --save-dev eth-gas-reporter
$ npm install --save-dev @codechecks/client
```

### Etapa 2: Adăugați plugin-ul la setările „mocha” în interiorul fișierului „truffle-config.js” {#step-2-add-the-plugin-to-the-mocha-settings-inside-your-truffle-configjs}

[Iată opțiunile](https://github.com/cgewecke/eth-gas-reporter#options)

```js
module.exports = {
  networks: { ... },
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      excludeContracts: ['Migrations']
    }
  }
};
```

### Etapa 3: Adăugați „codechecks.yml” în directorul rădăcină al proiectului dvs. {#step-3-add-a-codechecksyml-to-your-projects-root-directory}

```yml
checks:
  - name: eth-gas-reporter/codechecks
```

### Etapa 4: Executați „codechecks” după comanda „test” {#step-4-run-codechecks-after-the-test-command}

```bash
- npm test
- npx codechecks
```

### Etapa 5: Creați un cont „Codechecks” {#step-5-create-a-codechecks-account}

- Creați un cont cu [Codechecks](http://codechecks.io/).
- Add the GitHub repo to it.
- Copiați secretul și adăugați `CC_SECRET=COPIED SECRET` la CI-ul dvs. (uitați aici pentru [Travis](https://docs.travis-ci.com/user/environment-variables/) și aici pentru [CircleCi](https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project)).
- Acum continuați creând un „pull request”.

Asta e tot. Iar acum veți găsi un raport atractiv despre schimbările costurilor de gaz ale „pull request-ului” dvs.

![Exemple de rapoarte de gaz](./gas-reports.png)

## Adăugarea plugin-ului „solidity-coverage” {#adding-the-solidity-coverage-plugin}

Cu plugin-ul „solidity-coverage” puteți să verificați la câte dintre căile de cod se referă testele dumneavoastră. Dacă îl adăugați la CI, va fi foarte comod de utilizat, odată configurat.

### Etapa 1: Creați un proiect „metacoin” și instalați instrumentele „coverage” {#step-1-create-a-metacoin-project-and-install-coverage-tools}

```bash
$ npm install --save-dev truffle
$ npm install --save-dev coveralls
$ npm install --save-dev solidity-coverage
```

### Etapa 2: Adăugați „solidity-coverage” la matricea plugin-urilor din truffle-config.js {#step-2-add-solidity-coverage-to-the-plugins-array-in-truffle-configjs}

```js
module.exports = {
  networks: {...},
  plugins: ["solidity-coverage"]
}
```

### Etapa 3: Adăugați comenzile „coverage” la fișierul „.travis.yml” sau la „config.yml" al Circle CI {#step-3-add-the-coverage-commands-to-the-travisyml-or-circle-ci-configyml}

```bash
- npx truffle run coverage
- cat coverage/lcov.info | npx coveralls
```

Plugin-ul „coverage” al Solidity își pornește propriul „ganache-cli”, de aceea nu trebuie să ne facem griji în această privință. Totuși, nu înlocuiți comanda de testare obișnuită, întrucât „coverage” al „ganache-cli” funcționează diferit și nu înlocuiește deci rularea testelor unitare obișnuite.

### Etapa 4: Adăugați un „repository” la „coveralls” {#step-4-add-repository-to-coveralls}

- Creați un cont cu [Coveralls](https://coveralls.io/).
- Add the GitHub repo to it.
- Acum continuați creând un „pull request”.

![Exemplu de „coverall”](./coverall.png)

## Sugestii suplimentare {#further-ideas}

- [MythX](https://mythx.io/): Cu „MythX” puteți analiza securitatea contractului dvs. inteligent în mod automat. Prin urmare, este foarte logic să îl [adăugați la CI-ul dvs](https://blog.mythx.io/howto/mythx-and-continuous-integration-part-1-circleci/).
- [Linting](https://wikipedia.org/wiki/Lint_%28software%29): Good code can be enforced to some degree with linting tools. [Eslint](https://eslint.org/) works great for JavaScript, is [easy to setup](https://eslint.org/docs/user-guide/getting-started), while [Solhint](https://protofire.github.io/solhint/) can be used for Solidity.
- Teste lungi: Uneori este necesar să adăugați teste extreme, de exemplu, testarea unui contract cu sute de utilizatori. Aceasta durează foarte mult timp. În loc să le executați la fiecare testare, adăugați-le la CI.

Și asta e tot. Integrarea continuă este o strategie foarte utilă pentru dezvoltările dvs. Puteți vedea un exemplu complet la [Truffle-CI-Example](https://github.com/gorgos/Truffle-CI-Example). Doar aveți grijă să eliminați „Circle-CI” sau „Travis”, unul este suficient!
