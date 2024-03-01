---
title: "SolidityとTruffleを使って、継続的統合を設定する"
description: 有益なプラグインと共にTruffleでテストを行うために、TravisまたはCircle CIを設定する方法
author: Markus Waas
lang: ja
tags:
  - "Solidity"
  - "スマートコントラクト"
  - "テスト"
  - "Truffle"
  - "Ganache"
skill: intermediate
published: 2020-06-05
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/continuous-integration
---

Truffle を使用した継続的統合（CI）は、基本的なテストセットを実装してあれば、非常に有益な開発環境を提供します。 非常に長期的なテストを実行できるため、[プルリクエスト](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)をマージする事前にすべてのテストに合格したことを確認でき、追加ツールを使って様々な統計を追跡することができます。

今回は、[Truffle Metacoin Box](https://www.trufflesuite.com/boxes/metacoin)を使用して継続的統合を設定します。 以下の内容は、Travis CI または Circle CI を使って実行できます。

## Travis CI の設定 {#setting-up-travis-ci}

[Travis CI](https://travis-ci.org/)は、簡単に追加できます。 プロジェクトのルートフォルダに、`.travis.yml`設定ファイルを追加するだけです。

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

ここでは、Truffle で単体テストを実行する場合のみテストスクリプトが実行されるシンプルな状態にしておきましょう。 しかし、Travis CI マシンが利用できるブロックチェーンが存在しないという問題があります。 しかしこれは、テスト前に`npm install ganache-cli`を実行するだけで解決できます。 具体的には、`ganache-cli > /dev/null`の npx コマンドを含む Bash スクリプトを`npx truffle test`の呼び出しの前に追加します。 [こちら](https://github.com/gorgos/Truffle-CI-Example/blob/master/scripts/run_tests.sh)で Bash スクリプトの完全な例をご覧ください。

## Circle CI の設定 {#setting-up-circle-ci}

[CircleCi](https://circleci.com/)では、より長い設定ファイルが必要になります。 Travis では、自動で[`npm ci`](https://docs.npmjs.com/cli/ci.html)コマンドが追加されます。 これにより、`npmのインストール`よりも高速かつセキュアに依存関係をインストールできます。 ここでも、Travis の場合と同じスクリプトを使って、テストの前に ganache-cli を実行します。

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

## eth-gas-reporter プラグインを追加する {#adding-the-eth-gas-reporter-plugin}

eth-gas-reporter プラグインは、スマートコントラクトの関数で発生するガス代を追跡する上でとても役立ちます。 このプラグインを CI に追加しておけば、プルリクエストを追加する際に差分を表示するためにも有益です。

### ステップ 1：eth-gas-reporter プラグインと codechecks をインストールする {#step-1-install-the-eth-gas-reporter-plugin-and-codechecks}

```bash
$ npm install --save-dev eth-gas-reporter
$ npm install --save-dev @codechecks/client
```

### ステップ 2：truffle-config.js の mocha 設定で、eth-gas-reporter プラグインを追加する {#step-2-add-the-plugin-to-the-mocha-settings-inside-your-truffle-configjs}

[設定のオプションを確認してください。](https://github.com/cgewecke/eth-gas-reporter#options)

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

### ステップ 3：プロジェクトのルートディレクトリに、codechecks.yml を追加する {#step-3-add-a-codechecksyml-to-your-projects-root-directory}

```yml
checks:
  - name: eth-gas-reporter/codechecks
```

### ステップ 4：テストコマンドの後に、codechecks を実行する {#step-4-run-codechecks-after-the-test-command}

```bash
- npm test
- npx codechecks
```

### ステップ 5：Codechecks のアカウントを作成する {#step-5-create-a-codechecks-account}

- [Codechecks](http://codechecks.io/)のアカウントを作成します。
- GitHub リポジトリに追加します。
- シークレットをコピーし、`CC_SECRET=COPIED SECRET`を CI に追加します（Travis の場合は[こちら](https://docs.travis-ci.com/user/environment-variables/)、CircleCi の場合は[こちら](https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project)を参照してください）。
- プルリクエストの作成に進んでください。

以上です。 これで、プルリクエストでガス代の変化に対して素晴らしいレポートが表示されます。

![ガスレポートの例](./gas-reports.png)

## solidity-coverage プラグインを追加する {#adding-the-solidity-coverage-plugin}

solidity-coverage プラグインを使用すると、コードパスのうちテスト対象に含まれる割合がどの程度か確認できます。 CI 上で設定しておくと、非常に便利になります。

### ステップ 1：メタコインプロジェクトを作成し、カバレッジツールをインストールします。 {#step-1-create-a-metacoin-project-and-install-coverage-tools}

```bash
$ npm install --save-dev truffle
$ npm install --save-dev coveralls
$ npm install --save-dev solidity-coverage
```

### ステップ 2：truffle-config.js のプラグイン配列に、solidity-coverage を追加します。 {#step-2-add-solidity-coverage-to-the-plugins-array-in-truffle-configjs}

```js
module.exports = {
  networks: {...},
  plugins: ["solidity-coverage"]
}
```

### ステップ 3：.travis.yml または Circle CI config.yml に、カバレッジコマンドを追加します。 {#step-3-add-the-coverage-commands-to-the-travisyml-or-circle-ci-configyml}

```bash
- npx truffle run coverage
- cat coverage/lcov.info | npx coveralls
```

Soidity カバレッジは、それ自体で ganache-cli を開始しますので、ganache-cli をインストールする必要はありません。 ただし、カバレッジの ganache-cli は動作が異なり、通常の単体テスト実行の代替とはならないため、通常のテストコマンドは置き換えないでください。

### ステップ 4：Coveralls にレポジトリを追加します。 {#step-4-add-repository-to-coveralls}

- [Coveralls](https://coveralls.io/)のアカウントを作成します。
- 作成したアカウントを GitHub リポジトリに追加します。
- プルリクエストの作成に進んでください。

![Coverallの例](./coverall.png)

## 追加のヒント {#further-ideas}

- [MythX](https://mythx.io/)：MythX では、スマートコントラクトのセキュリティを自動で分析できます。 ですから、[CI に追加する](https://blog.mythx.io/howto/mythx-and-continuous-integration-part-1-circleci/)のはよいアイディアでしょう。
- [Linting](https://wikipedia.org/wiki/Lint_%28software%29)：Linting ツールを活用することで、ある程度まで強制的によいコードを書くことができます。 [Eslint](https://eslint.org/)は、JavaScript と相性が良く[セットアップが簡単](https://eslint.org/docs/user-guide/getting-started)です。一方[Solhint](https://protofire.github.io/solhint/)は、Solidity で使用できます。
- 長期テスト：数百人のユーザーを対象としてコントラクトをテストするなど、ストレスが極端に大きいテストを実行したい場合もあるでしょう。 このようなテストは、長時間を要します。 テストごとに実行する代わりに、CI に追加します。

これで完了です。 開発環境において非常に有益な戦略であることが理解できたと思います。 完全な実例は、[Truffle-CI-Example](https://github.com/gorgos/Truffle-CI-Example)で確認してください。 Circle-CI と Travis の両方共必要な訳ではないので、使わない方は確実に削除してください！
