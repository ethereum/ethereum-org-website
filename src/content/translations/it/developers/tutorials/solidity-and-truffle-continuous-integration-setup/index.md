---
title: "Configurazione dell'integrazione continua di Solidity e Truffle"
description: Come configurare Travis o Circle CI per il test con Truffle insieme ai plugin utili
author: Markus Waas
lang: it
tags:
  - "Solidity"
  - "smart contract"
  - "test"
  - "truffle"
  - "integrazione continua"
  - "ganache"
skill: intermediate
published: 2020-06-05
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/continuous-integration
---

L'integrazione continua (CI) con Truffle è ottima per lo sviluppo una volta implementata una serie di test di base. Permette di eseguire test molto lunghi, assicurare che passino tutti prima di fondere una [richiesta di pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) e tenere traccia delle varie statistiche usando strumenti aggiuntivi.

Useremo la [Truffle Metacoin Box](https://www.trufflesuite.com/boxes/metacoin) per configurare la nostra integrazione continua. Puoi scegliere Travis CI o Circle CI.

## Configurare Travis CI {#setting-up-travis-ci}

Aggiungere [Travis CI](https://travis-ci.org/) è semplice. Dovrai solo aggiungere il file di configurazione `.travis.yml` alla cartella di root del progetto:

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

Per il momento manteniamo le cose semplici ed eseguiamo solo lo script di test che esegue i test unitari di Truffle. Ma abbiamo un problema, non ci sarà una blockchain disponibile sulla macchina di Travis CI. Una soluzione semplice per ovviare al problema è `npm install ganache-cli`, da eseguire semplicemente prima del test. Puoi farlo aggiungendo uno script di bash con la riga npx `ganache-cli > /dev/null` e prima della chiamata di `npx truffle test`. L'[esempio completo dello script di bash](https://github.com/gorgos/Truffle-CI-Example/blob/master/scripts/run_tests.sh).

## Configurare Circle CI {#setting-up-circle-ci}

[CircleCi](https://circleci.com/) richiede un file di configurazione più lungo. Il comando aggiuntivo [`npm ci`](https://docs.npmjs.com/cli/ci.html) è eseguito automaticamente su Travis. Installa le dipendenze in modo più veloce e sicuro di quanto faccia `npm install`. Usiamo nuovamente lo stesso script dalla versione di Travis per eseguire ganache-cli prima dei test.

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

## Aggiungere il plugin eth-gas-reporter {#adding-the-eth-gas-reporter-plugin}

Il plugin eth-gas-reporter è piuttosto utile per tenere traccia dei costi del carburante delle funzioni del tuo smart contract. Averlo nella tua CI sarà inoltre utile per mostrare le differenze quando si aggiungono le richieste di pull.

### Fase 1: Installa il plugin eth-gas-reporter e i codecheck {#step-1-install-the-eth-gas-reporter-plugin-and-codechecks}

```bash
$ npm install --save-dev eth-gas-reporter
$ npm install --save-dev @codechecks/client
```

### Fase 2: Aggiungi il plugin alle impostazioni di mocha nel tuo truffle-config.js {#step-2-add-the-plugin-to-the-mocha-settings-inside-your-truffle-configjs}

[Visualizza le opzioni](https://github.com/cgewecke/eth-gas-reporter#options)

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

### Fase 3: Aggiungi un codechecks.yml alla cartella di root del tuo progetto {#step-3-add-a-codechecksyml-to-your-projects-root-directory}

```yml
checks:
  - name: eth-gas-reporter/codechecks
```

### Fase 4: Esegui codechecks dopo il comando di test {#step-4-run-codechecks-after-the-test-command}

```bash
- npm test
- npx codechecks
```

### Fase 5: Crea un conto Codechecks {#step-5-create-a-codechecks-account}

- Crea un conto con [Codechecks](http://codechecks.io/).
- Aggiungi la repo di GitHub.
- Copia il segreto e aggiungi `CC_SECRET=COPIED SECRET` alla tua CI (vedi qui per [Travis](https://docs.travis-ci.com/user/environment-variables/), qui per [CircleCI](https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project)).
- Ora prosegui e crea una richiesta di pull.

È tutto. Ora troverai un bel rapporto sulle modifiche ai costi del carburante della tua richiesta di pull.

![Esempio di rapporti del carburante](./gas-reports.png)

## Aggiungere il plugin di solidity-coverage {#adding-the-solidity-coverage-plugin}

Con il plugin di solidity-coverage puoi controllare in quale misura i percorsi del tuo codice sono coperti dai test. Una volta configurato e aggiunto alla tua CI, è molto pratico da usare.

### Fase 1: Crea un progetto di metacoin e installa gli strumenti di coverage {#step-1-create-a-metacoin-project-and-install-coverage-tools}

```bash
$ npm install --save-dev truffle
$ npm install --save-dev coveralls
$ npm install --save-dev solidity-coverage
```

### Fase 2: Aggiungi solidity-coverage all'insieme di plugin in truffle-config.js {#step-2-add-solidity-coverage-to-the-plugins-array-in-truffle-configjs}

```js
module.exports = {
  networks: {...},
  plugins: ["solidity-coverage"]
}
```

### Fase 3: Aggiungi i comandi di coverage al .travis.yml o config.yml di Circle CI {#step-3-add-the-coverage-commands-to-the-travisyml-or-circle-ci-configyml}

```bash
- npx truffle run coverage
- cat coverage/lcov.info | npx coveralls
```

Solidity coverage avvia la propria ganache-cli, quindi non dobbiamo preoccuparcene. Tuttavia, non sostituire il comando di test regolare, la ganache-cli di coverage funziona differentemente e non esiste dunque alcun sostituto per l'esecuzione dei test unitari regolari.

### Fase 4: Aggiungi la repository a coveralls {#step-4-add-repository-to-coveralls}

- Crea un conto [Coveralls](https://coveralls.io/).
- Aggiungi la repo di GitHub.
- Ora prosegui e crea una richiesta di pull.

![Esempio di coverall](./coverall.png)

## Ulteriori idee {#further-ideas}

- [MythX](https://mythx.io/): Con MythX puoi analizzare automaticamente la sicurezza del tuo smart contract. Ha quindi molto senso [aggiungerlo alla tua CI](https://blog.mythx.io/howto/mythx-and-continuous-integration-part-1-circleci/).
- [Linting](https://wikipedia.org/wiki/Lint_%28software%29): Un buon codice è applicabile in una certa misura con gli strumenti di linting. [Eslint](https://eslint.org/) è ottimo per JavaScript e [facile da configurare](https://eslint.org/docs/user-guide/getting-started), mentre per Solidity si può usare [Solhint](https://protofire.github.io/solhint/).
- Test lunghi: A volte potresti voler aggiungere dei test estremi, ad es. testando un contratto con centinaia di utenti. Ciò richiede molto tempo. Invece di eseguirli a ogni esecuzione del test, aggiungili alla CI.

Ecco tutto. L'integrazione continua è una strategia molto utile per i tuoi sviluppi. Puoi dare un'occhiata all'esempio completo su [Truffle-CI-Example](https://github.com/gorgos/Truffle-CI-Example). Basta assicurarti di rimuovere Circle-CI o Travis, ne basta uno!
