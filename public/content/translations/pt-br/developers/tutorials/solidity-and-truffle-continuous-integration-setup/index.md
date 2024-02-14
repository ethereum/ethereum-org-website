---
title: "Configuração contínua de integração Solidity e Truffle"
description: Como configurar o Travis ou Circle CI para testes deTruffle, juntamente com plugins úteis
author: Markus Waas
lang: pt-br
tags:
  - "solidez"
  - "contratos inteligentes"
  - "testando"
  - "truffle"
  - "ganache"
skill: intermediate
published: 2020-06-05
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/continuous-integration
---

A integração contínua (CI) com o Truffle é excelente para desenvolvimento assim que você tiver um conjunto básico de testes implementados. Isso permite que você execute testes muito longos, garantir que todos os testes passem antes de mesclar um [pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) e para manter o controle de várias estatísticas usando ferramentas adicionais.

Usaremos o [Truffle Metacoin Box](https://www.trufflesuite.com/boxes/metacoin) para configurar nossa integração contínua. Você pode escolher o Travis CI ou o Circle CI.

## Configurando Travis CI {#setting-up-travis-ci}

Adicionando [Travis CI](https://travis-ci.org/) é reta. Você só precisará adicionar um arquivo de configuração `.travis.yml` na pasta raiz do projeto:

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

Nós estamos mantendo tudo simples por enquanto e estamos executando apenas o script de teste que executa os testes de unidade Truffle. Mas temos um problema, não haverá uma blockchain disponível na máquina Travis CI. Uma correção simples para isso é `npm install ganache-cli` e simplesmente executá-lo antes do teste. Você pode fazer isso adicionando um bash script com a linha npx `ganache-cli > /dev/null` e antes da chamada `npx truffle`. O [script bash completo de exemplo](https://github.com/gorgos/Truffle-CI-Example/blob/master/scripts/run_tests.sh).

## Configurando o Circle CI {#setting-up-circle-ci}

[CircleCi](https://circleci.com/) requer um arquivo de configuração mais longo. O comando adicional [`npm ci`](https://docs.npmjs.com/cli/ci.html) é feito automaticamente no Travis. Ele instala as dependências mais rápido e mais seguro do que o `npm install` faz. Nós usamos novamente o mesmo script da versão de Travis para rodar ganache-cli antes dos testes.

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

## Adicionando o plugin eth-gas-reportter {#adding-the-eth-gas-reporter-plugin}

O plugin eth-gas-reportter é bastante útil para manter o controle dos custos de gas de suas funções de contrato inteligente. Tê-lo em seu CI será mais útil para mostrar diffs ao adicionar pull requests.

### Passo 1: Instale o plugin eth-gas-reportter e as verificações de código {#step-1-install-the-eth-gas-reporter-plugin-and-codechecks}

```bash
npm install --save-dev eth-gas-reporter
npm install --save-dev @codechecks/client
```

### Etapa 2: Adicione o plugin nas configurações do mocha dentro do arquivo truffle-config.js {#step-2-add-the-plugin-to-the-mocha-settings-inside-your-truffle-configjs}

[Ver opções](https://github.com/cgewecke/eth-gas-reporter#options)

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

### Passo 3: Adicione um codechecks.yml ao diretório raiz do seu projeto {#step-3-add-a-codechecksyml-to-your-projects-root-directory}

```yml
checks:
  - name: eth-gas-reporter/codechecks
```

### Passo 4: Execute verificações de código após o comando de teste {#step-4-run-codechecks-after-the-test-command}

```bash
- npm test
- npx codechecks
```

### Passo 5: Crie uma conta no Codechecks {#step-5-create-a-codechecks-account}

- Crie uma conta com [Codechecks](http://codechecks.io/).
- Adicionar o repositório do Github a ele.
- Copie o segredo e adicione o `CC_SECRET=SEGRET COPIADO` ao seu CI (veja aqui para [Travis](https://docs.travis-ci.com/user/environment-variables/),, aqui para [CircleCi](https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project)).
- Agora vá em frente e crie um pull request.

É isso. Agora você vai encontrar um bom relatório sobre mudanças nos custos de gas do seu pull request.

![Exemplos de relatórios de gas](./gas-reports.png)

## Adicionando o plugin Solidity-coverage {#adding-the-solidity-coverage-plugin}

Com o plugin Solidity-coverage, você pode verificar a quantidade de caminhos de seu código cobertos por seus testes. Adicionar isto à sua criação de CI é muito conveniente quando for criado.

### Passo 1: Crie um projeto metacoin e instale ferramentas de cobertura {#step-1-create-a-metacoin-project-and-install-coverage-tools}

```bash
npm install --save-dev truffle coveralls solidity-coverage
```

### Etapa 2: Adicionar solidity-coverage para o array de plugins em truffle-config.js {#step-2-add-solidity-coverage-to-the-plugins-array-in-truffle-configjs}

```js
module.exports = {
  networks: {...},
  plugins: ["solidity-coverage"]
}
```

### Passo 3: Adicione os comandos de cobertura ao arquivo .travis.yml ou Circle CI config.yml {#step-3-add-the-coverage-commands-to-the-travisyml-or-circle-ci-configyml}

```bash
- npx truffle run coverage
- cat coverage/lcov.info | npx coveralls
```

A cobertura da Solidity começa seu próprio ganache-cli, então não precisamos nos preocupar com isso. Não substitua o comando de teste regular, porém, a cobertura de ganache-cli funciona de forma diferente e, portanto, não é substituto para a execução de testes de unidade regulares.

### Passo 4: Adicionar repositório às coberturas {#step-4-add-repository-to-coveralls}

- Crie uma conta com [Codechecks](https://coveralls.io/).
- Adicionar o repositório do Github a ele.
- Agora vá em frente e crie um pull request.

![Exemplo de cobertura](./coverall.png)

## Mais idéias {#further-ideas}

- [MitX](https://mythx.io/): Com MythX você pode analisar automaticamente a segurança de seu contrato inteligente. Então faz muito sentido [adicionar isto ao seu CI](https://blog.mythx.io/howto/mythx-and-continuous-integration-part-1-circleci/).
- [Linting](https://wikipedia.org/wiki/Lint_%28software%29): Um bom código pode ser aplicado até certo ponto com ferramentas de linting. [Eslint](https://eslint.org/) funciona muito bem para JavaScript, é [ fácil de configurar](https://eslint.org/docs/user-guide/getting-started), enquanto [Solhint](https://protofire.github.io/solhint/) pode ser usado para Solidity.
- Testes longos: Às vezes, você pode querer adicionar testes extremos, por exemplo, testar contratos com centenas de usuários. Isto leva muito tempo. Em vez de executar aqueles em cada execução de teste, adicione-os ao CI.

Aí está o que tem. A integração contínua é uma estratégia muito útil para os seus desenvolvimentos. Você pode conferir um exemplo completo em [Truffle-CI-Example](https://github.com/gorgos/Truffle-CI-Example). Basta remover o Circle-CI ou Travis, um é suficiente!
