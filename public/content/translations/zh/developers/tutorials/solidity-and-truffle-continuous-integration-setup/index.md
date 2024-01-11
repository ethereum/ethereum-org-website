---
title: "Solidity 和 Truffle 持续集成设置"
description: 如何为 Truffle 测试设置 Travis 或 Circle CI 以及有用的插件
author: Markus Waas
lang: zh
tags:
  - "solidity"
  - "智能合同"
  - "测试"
  - "truffle"
  - "ganache"
skill: intermediate
published: 2020-06-05
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/continuous-integration
---

与 Truffle 的持续集成 (CI) 非常适合在实施一组基本测试后进行开发。 它允许您运行非常长的测试。在合并[拉取请求](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)之前确保所有测试通过，并使用其他工具跟踪各种统计数据。

我们将使用 [Truffle Metacoin Box](https://www.trufflesuite.com/boxes/metacoin) 来设置我们的持续集成。 您可以选择 Travis CI 或 Circle CI。

## 设置 Travis CI {#setting-up-travis-ci}

添加 [Travis CI](https://travis-ci.org/) 很简单。 您只需要将 `.travis.yml` 配置文件添加到项目的根目录：

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

我们现在保持简单，只运行执行 Truffle 单元测试的测试脚本。 但我们有一个问题，在 Travis CI 机器上没有区块链。 一个简单的解决方法是使用命令 `npm install ganache-cli` 安装 ganache-cli，并在测试前运行它。 您可以通过在 `npx truffle test` 调用前添加一个带有 npx `ganache-cli > /dev/null` 行的 bash 脚本来实现这一点。 [完整示例 bash 脚本](https://github.com/gorgos/Truffle-CI-Example/blob/master/scripts/run_tests.sh)。

## 设置 Circle CI {#setting-up-circle-ci}

[CircleCi](https://circleci.com/) 需要更长的配置文件。 额外的 [`npm ci`](https://docs.npmjs.com/cli/ci.html) 命令在 Travis 中自动完成。 它安装依赖项比 `npm install` 更快和更安全。 在测试之前，我们再次使用 Travis 版本中的同一个脚本来运行 ganache-cli。

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

## 添加 eth-gas-reporter 插件 {#adding-the-eth-gas-reporter-plugin}

Eth-gas-reporter 插件对于记录您的智能合约函数的 gas 成本相当有用。 在您的 CI 中使用它，将进一步有助于在添加拉取请求时显示差异。

### 第 1 步：安装 eth-gas-reporter 插件和 {#step-1-install-the-eth-gas-reporter-plugin-and-codechecks}

```bash
npm install --save-dev eth-gas-reporter
npm install --save-dev @codechecks/client
```

### 第 2 步：在您的 truffle-config.js 内的 mocha 设置中加入该插件 {#step-2-add-the-plugin-to-the-mocha-settings-inside-your-truffle-configjs}

[查看选项](https://github.com/cgewecke/eth-gas-reporter#options)

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

### 第 3 步：在您的项目的根目录中添加一个 codechecks.yml {#step-3-add-a-codechecksyml-to-your-projects-root-directory}

```yml
checks:
  - name: eth-gas-reporter/codechecks
```

### 第 4 步：在 test 命令后运行 codechecks {#step-4-run-codechecks-after-the-test-command}

```bash
- npm test
- npx codechecks
```

### 第 5 步：创建一个 Codechecks 帐户 {#step-5-create-a-codechecks-account}

- 使用 [Codechecks](http://codechecks.io/) 创建一个帐户。
- 将 GitHub 存储库添加到其中。
- 复制密钥并将 `CC_SECRET=COPIED SECRET` 添加到您的 CI（ [Travis](https://docs.travis-ci.com/user/environment-variables/) 参见这里，[CircleCi](https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project) 参见这里）。
- 现在继续创建拉取请求。

这就完成了。 现在，您将看到一份关于您的拉取请求的 gas 成本变化的报告。

![Gas 成本报告示例](./gas-reports.png)

## 添加 solidity-coverage 插件 {#adding-the-solidity-coverage-plugin}

通过 solidity-coverage 插件，您可以检查您的代码路径有多少被您的测试所覆盖。 将此插件添加到您的 CI，设置好后，使用非常方便。

### 第 1 步：创建一个 metacoin 项目并安装覆盖工具 {#step-1-create-a-metacoin-project-and-install-coverage-tools}

```bash
npm install --save-dev truffle coveralls solidity-coverage
```

### 第 2 步：将 solidity-coverage 添加到 truffle-config.js 的插件数组中。 {#step-2-add-solidity-coverage-to-the-plugins-array-in-truffle-configjs}

```js
module.exports = {
  networks: {...},
  plugins: ["solidity-coverage"]
}
```

### 第 3 步：将 coverage 命令添加到 .travis.yml 或 Circle CI config.yml {#step-3-add-the-coverage-commands-to-the-travisyml-or-circle-ci-configyml}

```bash
- npx truffle run coverage
- cat coverage/lcov.info | npx coveralls
```

Solidity coverage 启动了它自己的 ganache-cli，所以我们不必担心这个问题。 但不要替换常规测试命令，coverage 的 ganache-cli 工作方式不同，因此不能代替运行正常的单位测试。

### 第 4 步：将 repository 添加到 Coveralls {#step-4-add-repository-to-coveralls}

- 使用 [Coveralls](https://coveralls.io/) 创建一个帐户
- 将 GitHub 存储库添加到其中。
- 现在继续创建拉取请求。

![Coverall 示例](./coverall.png)

## 进一步的想法 {#further-ideas}

- [MythX](https://mythx.io/)：使用 MythX，您可以自动分析智能合约的安全性。 因此， [将其添加到您的 CI](https://blog.mythx.io/howto/mythx-and-continuous-integration-part-1-circleci/) 是非常有意义的。
- [Linting](https://wikipedia.org/wiki/Lint_%28software%29)：好代码可以在一定程度上通过 linting 工具强制执行。 [Eslint](https://eslint.org/) 非常适合 JavaScript 并且[便于设置](https://eslint.org/docs/user-guide/getting-started)，而 [Solhint](https://protofire.github.io/solhint/) 可用于 Solidity。
- 长测试：有时您可能想要添加极端测试，例如使用数百名用户测试一个合约。 这需要很长时间。 不要在每次测试运行中都运行它们，而是将它们添加到 CI 中。

这是全部内容了。 持续集成是您开发中非常有用的战略。 您可以在 [Truffle-CI-example](https://github.com/gorgos/Truffle-CI-Example) 查看完整的示例。 请务必移除 Circle-CI 或 Travis，只使用一个就够了！
