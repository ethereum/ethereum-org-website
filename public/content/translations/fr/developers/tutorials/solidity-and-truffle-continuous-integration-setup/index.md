---
title: "Configuration de l'intégration continue entre Solidy et Truffle"
description: Comment configurer Travis ou Circle CI pour les tests de Truffle avec des plugins utiles
author: Markus Waas
lang: fr
tags:
  - "solidity"
  - "contrats intelligents"
  - "tests"
  - "truffle"
  - "ganache"
skill: intermediate
published: 2020-06-05
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/continuous-integration
---

L'intégration continue (CI) avec Truffle est idéale pour le développement une fois que vous avez un ensemble de tests de base implémentés. Elle vous permet de faire de très longs tests, s'assurer que tous les tests passent avant de fusionner une [pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) et garder une trace de diverses statistiques à l'aide d'outils supplémentaires.

Nous utiliserons la [Truffle Metacoin Box](https://www.trufflesuite.com/boxes/metacoin) pour configurer notre intégration continue. Vous pouvez choisir entre Travis CI ou Circle CI.

## Configuration de Travis CI {#setting-up-travis-ci}

Ajouter [Travis CI](https://travis-ci.org/) est très simple. Vous n'avez qu'à ajouter un fichier de configuration `.travis.yml` au dossier racine du projet :

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

Pour le moment, nous allons garder ça de façon aussi simple que possible et lancerons uniquement le script de test qui exécute les tests unitaires Truffle. Mais nous avons un problème : il n'y a pas de blockchain disponible sur la machine Travis CI. Un simple correctif à cela consiste à lancer `npm install ganache-cli` et simplement l'exécuter avant le test. Vous pouvez le faire en ajoutant un script bash avec la ligne npx `ganache-cli > /dev/null` et avant l'appel `npx truffle test`. L'[exemple complet du script bash](https://github.com/gorgos/Truffle-CI-Example/blob/master/scripts/run_tests.sh).

## Configuration de Circle CI {#setting-up-circle-ci}

[CircleCi](https://circleci.com/) nécessite un fichier de configuration plus long. La commande supplémentaire [`npm ci`](https://docs.npmjs.com/cli/ci.html) se fait automatiquement dans Travis. Elle installe les dépendances plus rapidement et de manière plus sécurisée que ne le fait `npm install`. Nous utilisons à nouveau le même script de la version Travis pour exécuter ganache-cli avant les tests.

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

## Ajout du plugin eth-gas-reporter {#adding-the-eth-gas-reporter-plugin}

Le plugin eth-gas-reporter est utile pour garder une trace des coûts de gaz de vos fonctions de contrat intelligent. L'avoir dans votre CI sera plus utile pour afficher des « diffs » lors de l'ajout de pull requests.

### Étape 1 : Installez le plugin eth-gas-reporter et Codechecks {#step-1-install-the-eth-gas-reporter-plugin-and-codechecks}

```bash
npm install --save-dev eth-gas-reporter
npm install --save-dev @codechecks/client
```

### Étape 2 : Ajoutez le plugin aux paramètres mocha dans votre truffle-config.js {#step-2-add-the-plugin-to-the-mocha-settings-inside-your-truffle-configjs}

[Voir les options](https://github.com/cgewecke/eth-gas-reporter#options)

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

### Étape 3 : Ajouter un codechecks.yml à la racine de votre projet {#step-3-add-a-codechecksyml-to-your-projects-root-directory}

```yml
checks:
  - name: eth-gas-reporter/codechecks
```

### Étape 4 : Exécutez des Codechecks après la commande de test {#step-4-run-codechecks-after-the-test-command}

```bash
- npm test
- npx codechecks
```

### Étape 5 : Créer un compte Codechecks {#step-5-create-a-codechecks-account}

- Créez un compte [Codechecks](http://codechecks.io/).
- Ajoutez-y le dépôt Github.
- Copiez le secret et ajoutez le `CC_SECRET=COPIED SECRET` à votre CI (voir ici pour [Travis](https://docs.travis-ci.com/user/environment-variables/), ici pour [CircleCi](https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project)).
- Maintenant, allez de l'avant et créez un pull request.

C’est tout. Vous retrouverez maintenant un bon rapport sur les changements dans le coût du gaz de votre pull resquest.

![Exemple de rapports de gaz](./gas-reports.png)

## Ajout du plugin solidity-coverage {#adding-the-solidity-coverage-plugin}

Avec le plugin solidity-coverage vous pouvez vérifier combien de chemins de code sont couverts par vos tests. Ajouter ceci à votre CI rend son utilisation très pratique une fois qu'il est configuré.

### Étape 1 : Créer un projet Metacoin et installez des outils de couverture {#step-1-create-a-metacoin-project-and-install-coverage-tools}

```bash
npm install --save-dev truffle coveralls solidity-coverage
```

### Étape 2 : Ajouter solidity-coverage au tableau des plugins dans truffle-config.js {#step-2-add-solidity-coverage-to-the-plugins-array-in-truffle-configjs}

```js
module.exports = {
  networks: {...},
  plugins: ["solidity-coverage"]
}
```

### Étape 3 : Ajouter les commandes de couverture au fichier .travis.yml ou Circle CI config.yml {#step-3-add-the-coverage-commands-to-the-travisyml-or-circle-ci-configyml}

```bash
- npx truffle run coverage
- cat coverage/lcov.info | npx coveralls
```

La coverage de Solidity démarre sa propre ganache-cli, pour que nous n'ayons pas à nous en occuper. Cependant, ne remplacez pas la commande de test standard, le coverage de la ganache-cli fonctionne différemment et ne remplace donc pas les tests unitaires réguliers.

### Étape 4 : Ajouter un dépôt à Coveralls {#step-4-add-repository-to-coveralls}

- Créez un compte [Coveralls](https://coveralls.io/).
- Ajoutez-y le dépôt Github.
- Maintenant, allez de l'avant et créez une pull request.

![Exemple Coverall](./coverall.png)

## Plus d'idées {#further-ideas}

- [MythX](https://mythx.io/) : Avec MythX, vous pouvez analyser automatiquement la sécurité de votre contrat intelligent. Il est donc très logique d'[ajouter ceci à votre CI](https://blog.mythx.io/howto/mythx-and-continuous-integration-part-1-circleci/).
- [Linting](https://wikipedia.org/wiki/Lint_%28software%29) : Un bon code peut être appliqué dans une certaine mesure avec des outils de linting. [Eslint](https://eslint.org/) fonctionne parfaitement pour JavaScript, est [facile à installer](https://eslint.org/docs/user-guide/getting-started), tandis que [Solhint](https://protofire.github.io/solhint/) peut être utilisé pour Solidity.
- Examens longs: Parfois, vous pouvez vouloir ajouter des tests extrêmes, par exemple, tester un contrat avec des centaines d'utilisateurs. Cela prend beaucoup de temps. Au lieu de les faire tourner à chaque exécution de tests, ajoutez-les à la CI.

Voilà, c'est fait. L'intégration continue est une stratégie très utile pour vos développements. Vous pouvez consulter un exemple complet sur [Truffle-CI-Exemple](https://github.com/gorgos/Truffle-CI-Example). Il suffit de supprimer Circle-CI ou Travis, un seul suffit !
