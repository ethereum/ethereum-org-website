---
title: "Solidity ve Truffle sürekli entegrasyon kurulumu"
description: Yararlı eklentilerle birlikte Truffle testi için Travis veya Circle CI nasıl kurulur
author: Markus Waas
lang: tr
tags:
  - "solidity"
  - "akıllı kontratlar"
  - "test etmek"
  - "truffle"
  - "ganache"
skill: beginner
published: 2020-06-05
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/continuous-integration
---

Truffle ile sürekli entegrasyon (CI), temel bir test setini uyguladıktan sonra geliştirme yapmak için harikadır. Bir [çekme talebini](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) birleştirmeden önce oldukça uzun testler yapmanızı ve ek araçlar kullanarak çeşitli istatistikleri takip etmenizi sağlar.

Sürekli entegrasyonumuzu kurmak için [Truffle Metacoin Box](https://www.trufflesuite.com/boxes/metacoin) kullanacağız. Travis CI veya Circle CI'yi seçebilirsiniz.

## Travis CI kurulumu {#setting-up-travis-ci}

[Travis CI](https://travis-ci.org/) eklemek basittir. Projenin kök dizinine yalnızca bir `.travis.yml` yapılandırma dosyası eklemeniz gerekecek:

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

Şimdilik çok karmaşıklaştırmıyoruz ve yalnızca Truffle birim testlerini yürüten test komut dosyasını çalıştırıyoruz. Ancak bir sorunumuz var, Travis CI makinesinde kullanılabilir bir blok zinciri olmayacak. Bunun için basit bir düzeltme, `npm install ganache-cli` ve bunu testten önce çalıştırmaktır. Bunu npx `ganache-cli > /dev/null` satırıyla bir bash komut dosyası ekleyerek `npx truffle test` çağrısından önce yapabilirsiniz. [Tam örnek bash komut dosyası](https://github.com/gorgos/Truffle-CI-Example/blob/master/scripts/run_tests.sh).

## Circle CI kurulumu {#setting-up-circle-ci}

[CircleCi](https://circleci.com/) daha uzun bir yapılandırma dosyası gerektirir. Ek [`npm ci`](https://docs.npmjs.com/cli/ci.html) komutu Travis'te otomatik olarak yapılır. Bağımlılıkları `npm install`'dan daha hızlı ve daha güvenli kurar. Testlerden önce ganache-cli'yi çalıştırmak için yine Travis versiyonundaki aynı komut dosyasını kullanıyoruz.

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

## Eth-gas-reporter eklentisini ekleme {#adding-the-eth-gas-reporter-plugin}

Eth-gas-reporter eklentisi, akıllı sözleşme fonksiyonlarınızın gaz maliyetlerini takip etmek için oldukça kullanışlıdır. CI'nizde bulundurmak, çekme talepleri eklerken farkları göstermek için ayrıca yararlı olacaktır.

### 1. Adım: Eth-gas-reporter eklentisini ve kod kontrollerini kurun {#step-1-install-the-eth-gas-reporter-plugin-and-codechecks}

```bash
npm install --save-dev eth-gas-reporter
npm install --save-dev @codechecks/client
```

### 2. Adım: Eklentiyi truffle-config.js içindeki mocha ayarlarına ekleyin {#step-2-add-the-plugin-to-the-mocha-settings-inside-your-truffle-configjs}

[Seçeneklere bakın](https://github.com/cgewecke/eth-gas-reporter#options)

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

### 3. Adım: Projenizin kök dizinine bir codechecks.yml ekleyin {#step-3-add-a-codechecksyml-to-your-projects-root-directory}

```yml
checks:
  - name: eth-gas-reporter/codechecks
```

### 4. Adım: Test komutundan sonra kod kontrollerini çalıştırın {#step-4-run-codechecks-after-the-test-command}

```bash
- npm test
- npx codechecks
```

### 5. Adım: Bir Codechecks hesabı oluşturun {#step-5-create-a-codechecks-account}

- [Codechecks](http://codechecks.io/) ile bir hesap oluşturun.
- GitHub deposunu buna ekleyin.
- Secret'ı kopyalayın ve CI'nize `CC_SECRET=COPIED SECRET` ekleyin ([Travis](https://docs.travis-ci.com/user/environment-variables/) için buraya, [CircleCi](https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project) için buraya bakın).
- Şimdi devam edin ve bir çekme talebi oluşturun.

Bu kadar. Artık çekme talebinizin gaz maliyetlerindeki değişiklikler hakkında güzel bir rapor bulacaksınız.

![Örnek gaz raporu](./gas-reports.png)

## Solidity-coverage eklentisini ekleme {#adding-the-solidity-coverage-plugin}

solidity-coverage eklentisi ile, testlerinizin kod yollarınızın ne kadarını kapsadığını kontrol edebilirsiniz. Bunu CI'ınıza eklemek, kurulduktan sonra kullanımını çok kolay hâle getirir.

### 1. Adım: Bir metacoin projesi oluşturun ve kapsama araçlarını kurun {#step-1-create-a-metacoin-project-and-install-coverage-tools}

```bash
npm install --save-dev truffle coveralls solidity-coverage
```

### 2. Adım: truffle-config.js'deki eklentiler dizisine solidity-coverage ekleyin {#step-2-add-solidity-coverage-to-the-plugins-array-in-truffle-configjs}

```js
module.exports = {
  networks: {...},
  plugins: ["solidity-coverage"]
}
```

### 3. Adım: Coverage komutlarını .travis.yml veya Circle CI config.yml dosyasına ekleyin {#step-3-add-the-coverage-commands-to-the-travisyml-or-circle-ci-configyml}

```bash
- npx truffle run coverage
- cat coverage/lcov.info | npx coveralls
```

Solidity coverage, kendi ganache-cli'sini başlatır, bu yüzden bu konuda endişelenmemize gerek yok. Yine de normal test komutunu değiştirmeyin, coverage'ın ganache-cli'si farklı şekilde çalışır ve bu nedenle düzenli birim testleri çalıştırmanın yerini alamaz.

### 4. Adım: Depoyu coveralls'a ekleyin {#step-4-add-repository-to-coveralls}

- [Coveralls](https://coveralls.io/) ile bir hesap oluşturun.
- GitHub deposunu buna ekleyin.
- Şimdi devam edin ve bir çekme talebi oluşturun.

![Örnek coverall](./coverall.png)

## Diğer fikirler {#further-ideas}

- [MythX](https://mythx.io/): MythX ile akıllı sözleşme güvenliğinizi otomatik olarak analiz edebilirsiniz. Yani [bunu CI'nize eklemek](https://blog.mythx.io/howto/mythx-and-continuous-integration-part-1-circleci/) gayet mantıklıdır.
- [Linting](https://wikipedia.org/wiki/Lint_%28software%29): İyi kod, linting araçlarıyla bir dereceye kadar zorlanabilir. [Eslint](https://eslint.org/) JavaScript ile harika çalışır ve [ kurulumu kolaydır](https://eslint.org/docs/user-guide/getting-started). [Solhint](https://protofire.github.io/solhint/) ise Solidity için kullanılabilir.
- Uzun testler: Bazen, örneğin yüzlerce kullanıcıyla bir sözleşmeyi test etmek gibi ekstrem testler eklemek isteyebilirsiniz. Bu, uzun bir süre alır. Bunları her test çalışmasında çalıştırmak yerine CI'a ekleyin.

İşte oldu. Sürekli entegrasyon, geliştirmeleriniz için çok faydalı bir stratejidir. [Truffle-CI-Example](https://github.com/gorgos/Truffle-CI-Example)'da tam bir örneğe göz atabilirsiniz. Sadece Circle-CI veya Travis'i çıkardığınızdan emin olun, bir tane yeterlidir!
