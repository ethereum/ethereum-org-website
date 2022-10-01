---
title: "Pengaturan integrasi berkelanjutan untuk Solidity dan Truffle"
description: Cara menyiapkan Travis atau Circle CI untuk pengujian Truffle bersama dengan plugin yang berguna
author: Markus Waas
lang: id
tags:
  - "solidity"
  - "kontrak pintar"
  - "pengujian"
  - "truffle"
  - "integrasi berkelanjutan"
  - "ganache"
skill: intermediate
published: 2020-06-05
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/continuous-integration
---

Integrasi berkelanjutan (CI) dengan Truffle merupakan cara yang bagus untuk pekerjaan pengembangan setelah Anda memiliki sekumpulan tes dasar yang diimplementasikan. CI memungkinkan Anda menjalankan tes yang sangat panjang, memastikan semua tes lolos uji sebelum bergabung dengan [permintaan penarikan](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) dan untuk melacak berbagai statistik menggunakan peralatan tambahan.

Kita akan menggunakan [Kotak Metacoin Truffle](https://www.trufflesuite.com/boxes/metacoin) untuk menyiapkan integrasi berkelanjutan kita. Anda dapat memilih Travis CI atau Circle CI.

## Menyiapkan Travis CI {#setting-up-travis-ci}

Menambahkan [Travis CI](https://travis-ci.org/) merupakan hal yang mudah. Anda hanya perlu menambahkan file konfigurasi `.travis.yml` ke folder akar proyeknya:

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

Kita akan menjaganya tetap tampak mudah untuk saat ini dan hanya akan menjalankan skrip tes yang mengeksekusi tes unit Truffle. Tapi kita memiliki satu masalah, tidak akan ada blockchain yang tersedia di mesin Travis CI. Solusi mudah untuk ini adalah melakukan`npm instal ganache-cli` dan cukup menjalankannya sebelum tes. Anda dapat melakukan ini dengan menambahkan skrip bash dengan barisan npx `ganache-cli > /dev/null` dan sebelum pemanggilan `npx truffle test`. [Contoh lengkap skrip bash](https://github.com/gorgos/Truffle-CI-Example/blob/master/scripts/run_tests.sh).

## Menyiapkan Circle CI {#setting-up-circle-ci}

[CircleCi](https://circleci.com/) memerlukan file konfigurasi yang lebih panjang. Perintah tambahan [`npm ci`](https://docs.npmjs.com/cli/ci.html) secara otomatis dijalankan di Travis. Perintah ini menginstal dependensi dengan lebih cepat dan lebih aman daripada yang dilakukan oleh `npm install`. Kita sekali lagi menggunakan skrip yang sama dari versi Travis untuk menjalankan ganache-cli sebelum pengujiannya.

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

## Menambahkan plugin eth-gas-reporter {#adding-the-eth-gas-reporter-plugin}

Plugin eth-gas-reporter cukup berguna untuk melacak biaya gas dari fungsi kontrak pintar Anda. Memilikinya dalam CI Anda akan jauh lebih berguna untuk menunjukkan perbedaan saat menambahkan permintaan penarikan.

### Langkah 1: Instal plugin eth-gas-reporter dan codechecks {#step-1-install-the-eth-gas-reporter-plugin-and-codechecks}

```bash
$ npm install --save-dev eth-gas-reporter
$ npm install --save-dev @codechecks/client
```

### Langkah 2: Tambahkan plugin ke pengaturan mocha di dalam truffle-config.js Anda {#step-2-add-the-plugin-to-the-mocha-settings-inside-your-truffle-configjs}

[Lihat opsi](https://github.com/cgewecke/eth-gas-reporter#options)

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

### Langkah 3: Tambahkan codechecks.yml ke direktori akar proyek Anda {#step-3-add-a-codechecksyml-to-your-projects-root-directory}

```yml
checks:
  - name: eth-gas-reporter/codechecks
```

### Langkah 4: Jalankan codechecks setelah perintah pengujian {#step-4-run-codechecks-after-the-test-command}

```bash
- npm test
- npx codechecks
```

### Langkah 5: Buat akun Codechecks {#step-5-create-a-codechecks-account}

- Buat akun dengan [Codechecks](http://codechecks.io/).
- Add the GitHub repo to it.
- Salin rahasianya dan tambahkan `CC_SECRET=COPIED SECRET` ke dalam CI Anda (lihat di sini untuk [Travis](https://docs.travis-ci.com/user/environment-variables/), di sini untuk [CircleCi](https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project)).
- Sekarang lanjutkan dan buat permintaan penarikan.

Selesai. Sekarang Anda akan menemukan laporan yang bagus tentang perubahan biaya gas dari permintaan penarikan Anda.

![Contoh laporan gas](./gas-reports.png)

## Menambahkan plugin solidity-coverage {#adding-the-solidity-coverage-plugin}

Dengan plugin solidity-coverage, Anda dapat memeriksa seberapa banyak jalur kode Anda yang dicakup oleh tes Anda. Menambahkan ini ke CI Anda sangatlah praktis untuk digunakan setelah disiapkan.

### Langkah 1: Buat proyek metacoin dan instal peralatan coverage {#step-1-create-a-metacoin-project-and-install-coverage-tools}

```bash
$ npm install --save-dev truffle
$ npm install --save-dev coveralls
$ npm install --save-dev solidity-coverage
```

### Langkah 2: Tambahkan solidity-coverage ke dalam array plugin di dalam truffle-config.js {#step-2-add-solidity-coverage-to-the-plugins-array-in-truffle-configjs}

```js
module.exports = {
  networks: {...},
  plugins: ["solidity-coverage"]
}
```

### Langkah 3: Tambahkan perintah coverage ke dalam .travis.yml atau Circle CI config.yml {#step-3-add-the-coverage-commands-to-the-travisyml-or-circle-ci-configyml}

```bash
- npx truffle run coverage
- cat coverage/lcov.info | npx coveralls
```

Coverage Solidity memulai ganache-cli miliknya, sehingga kita tidak perlu merisaukan tentang ini. Namun, jangan mengganti perintah tes reguler, ganache-cli coverage bekerja dengan cara berbeda dan oleh karena itu bukanlah pengganti untuk menjalankan tes reguler.

### Langkah 4: Tambahkan repositori ke coveralls {#step-4-add-repository-to-coveralls}

- Buat akun dengan [Coveralls](https://coveralls.io/).
- Add the GitHub repo to it.
- Sekarang lanjutkan dan buat permintaan penarikan.

![Contoh coverall](./coverall.png)

## Ide lebih lanjut {#further-ideas}

- [MythX](https://mythx.io/): Dengan MythX, Anda dapat secara otomatis menganalisa keamanan kontrak pintar Anda. Jadi, sangat masuk akal untuk [menambahkan ini ke dalam CI Anda](https://blog.mythx.io/howto/mythx-and-continuous-integration-part-1-circleci/).
- [Linting](https://wikipedia.org/wiki/Lint_%28software%29): Good code can be enforced to some degree with linting tools. [Eslint](https://eslint.org/) works great for JavaScript, is [easy to setup](https://eslint.org/docs/user-guide/getting-started), while [Solhint](https://protofire.github.io/solhint/) can be used for Solidity.
- Tes panjang: Terkadang Anda mungkin ingin menambahkan tes ekstrim, seperti menguji kontrak yang memiliki ratusan pengguna. Ini memerlukan waktu yang lama. Alih-alih menjalankannya di setiap pengoperasian tes, tambahkan ke dalam CI.

Begitu mudah, bukan. Integrasi berkelanjutan merupakan strategi yang sangat berguna untuk pengembangan Anda. Anda dapat melihat contoh lengkapnya di [Truffle-CI-Example](https://github.com/gorgos/Truffle-CI-Example). Pastikan saja menghapus Circle-CI atau Travis, satu sudah cukup!
