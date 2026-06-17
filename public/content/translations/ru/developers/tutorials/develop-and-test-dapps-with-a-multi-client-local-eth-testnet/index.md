---
title: Как разрабатывать и тестировать dapp в локальной мультиклиентной тестовой сети
description: Это руководство сначала расскажет, как создать и настроить локальную мультиклиентную тестовую сеть Эфириума, а затем использовать ее для развертывания и тестирования dapp.
author: Теди Митику
tags:
  [
    "клиенты",
    "узлы",
    "смарт-контракты",
    "компонуемость",
    "уровень консенсуса",
    "уровень исполнения",
    "тестирование",
  ]
skill: intermediate
breadcrumb: Мультиклиентная тестовая сеть
lang: ru
published: 2023-04-11
---

## Введение {#introduction}

Это руководство проведет вас через процесс создания настраиваемой локальной тестовой сети Эфириума, развертывания в ней смарт-контракта и использования тестовой сети для запуска тестов вашего децентрализованного приложения (dapp). Это руководство предназначено для разработчиков dapp, которые хотят разрабатывать и тестировать свои dapp локально с различными конфигурациями сети перед развертыванием в рабочей тестовой сети или в Мейннете.

В этом руководстве вы:

- Создадите локальную тестовую сеть Эфириума с помощью [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package), используя [Kurtosis](https://www.kurtosis.com/),
- Подключите вашу среду разработки dapp Hardhat к локальной тестовой сети для компиляции, развертывания и тестирования dapp, а также
- Настроите локальную тестовую сеть, включая такие параметры, как количество узлов и конкретные пары клиентов уровня исполнения (EL) и уровня консенсуса (CL), чтобы обеспечить рабочие процессы разработки и тестирования в различных конфигурациях сети.

### Что такое Kurtosis? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) — это компонуемая система сборки, предназначенная для настройки многоконтейнерных тестовых сред. В частности, она позволяет разработчикам создавать воспроизводимые среды, требующие динамической логики настройки, такие как тестовые сети блокчейна.

В этом руководстве пакет Kurtosis eth-network-package запускает локальную тестовую сеть Эфириума с поддержкой клиента уровня исполнения (EL) [`geth`](https://geth.ethereum.org/), а также клиентов уровня консенсуса (CL) [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/) и [`lodestar`](https://lodestar.chainsafe.io/). Этот пакет служит настраиваемой и компонуемой альтернативой сетям во фреймворках, таких как Hardhat Network, Ganache и Anvil. Kurtosis предлагает разработчикам больший контроль и гибкость над используемыми ими тестовыми сетями, что является основной причиной, по которой [Фонд Ethereum использовал Kurtosis для тестирования Слияния](https://www.kurtosis.com/blog/testing-the-ethereum-merge) и продолжает использовать его для тестирования обновлений сети.

## Настройка Kurtosis {#setting-up-kurtosis}

Прежде чем продолжить, убедитесь, что у вас:

- [Установлен и запущен движок Docker](https://docs.kurtosis.com/install/#i-install--start-docker) на вашем локальном компьютере
- [Установлен интерфейс командной строки (CLI) Kurtosis](https://docs.kurtosis.com/install#ii-install-the-cli) (или обновлен до последней версии, если CLI уже установлен)
- Установлены [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) и [npx](https://www.npmjs.com/package/npx) (для вашей среды dapp)

## Создание локальной тестовой сети Эфириума {#instantiate-testnet}

Чтобы запустить локальную тестовую сеть Эфириума, выполните:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

Примечание: Эта команда называет вашу сеть «local-eth-testnet» с помощью флага `--enclave`.

Kurtosis будет выводить шаги, которые он выполняет внутри, по мере интерпретации, проверки и последующего выполнения инструкций. В конце вы должны увидеть вывод, похожий на следующий:

```python
INFO[2023-04-04T18:09:44-04:00] ======================================================
INFO[2023-04-04T18:09:44-04:00] ||          Created enclave: local-eth-testnet      ||
INFO[2023-04-04T18:09:44-04:00] ======================================================
Name:            local-eth-testnet
UUID:            39372d756ae8
Status:          RUNNING
Creation Time:   Tue, 04 Apr 2023 18:09:03 EDT

========================================= Files Artifacts =========================================
UUID           Name
d4085a064230   cl-genesis-data
1c62cb792e4c   el-genesis-data
bd60489b73a7   genesis-generation-config-cl
b2e593fe5228   genesis-generation-config-el
d552a54acf78   geth-prefunded-keys
5f7e661eb838   prysm-password
054e7338bb59   validator-keystore-0

========================================== User Services ==========================================
UUID           Name                                           Ports                                         Status
e20f129ee0c5   cl-client-0-beacon                             http: 4000/tcp -> <http://127.0.0.1:54261>    RUNNING
                                                              metrics: 5054/tcp -> <http://127.0.0.1:54262>
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:54263
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60470
a8b6c926cdb4   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:54267             RUNNING
                                                              metrics: 5064/tcp -> <http://127.0.0.1:54268>
d7b802f623e8   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:54253       RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:54251
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:54254
                                                              udp-discovery: 30303/udp -> 127.0.0.1:53834
                                                              ws: 8546/tcp -> 127.0.0.1:54252
514a829c0a84   prelaunch-data-generator-1680646157905431468   <none>                                        STOPPED
62bd62d0aa7a   prelaunch-data-generator-1680646157915424301   <none>                                        STOPPED
05e9619e0e90   prelaunch-data-generator-1680646157922872635   <none>                                        STOPPED

```

Поздравляем! Вы использовали Kurtosis для создания локальной тестовой сети Эфириума с клиентом CL (`lighthouse`) и EL (`geth`) поверх Docker.

### Обзор {#review-instantiate-testnet}

В этом разделе вы выполнили команду, которая указала Kurtosis использовать [`eth-network-package`, размещенный удаленно на GitHub](https://github.com/kurtosis-tech/eth-network-package), для запуска локальной тестовой сети Эфириума внутри [анклава](https://docs.kurtosis.com/advanced-concepts/enclaves/) Kurtosis. Внутри вашего анклава вы найдете как «файловые артефакты», так и «пользовательские сервисы».

[Файловые артефакты](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) в вашем анклаве включают все данные, сгенерированные и используемые для начальной загрузки клиентов EL и CL. Данные были созданы с использованием сервиса `prelaunch-data-generator`, собранного из этого [образа Docker](https://github.com/ethpandaops/ethereum-genesis-generator)

Пользовательские сервисы отображают все контейнеризированные сервисы, работающие в вашем анклаве. Вы заметите, что был создан один узел, включающий как клиент EL, так и клиент CL.

## Подключение вашей среды разработки dapp к локальной тестовой сети Эфириума {#connect-your-dapp}

### Настройка среды разработки dapp {#set-up-dapp-env}

Теперь, когда у вас запущена локальная тестовая сеть, вы можете подключить свою среду разработки dapp для использования вашей локальной тестовой сети. В этом руководстве будет использоваться фреймворк Hardhat для развертывания dapp для игры в блэкджек в вашей локальной тестовой сети.

Чтобы настроить среду разработки dapp, клонируйте репозиторий, содержащий наш пример dapp, и установите его зависимости, выполнив:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

Используемая здесь папка [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) содержит типичную настройку для разработчика dapp, использующего фреймворк [Hardhat](https://hardhat.org/):

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) содержит несколько простых смарт-контрактов для dapp блэкджека
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) содержит скрипт для развертывания контракта токена в вашей локальной сети Эфириума
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) содержит простой тест .js для вашего контракта токена, чтобы подтвердить, что для каждого игрока в нашем dapp блэкджека отчеканено 1000 токенов
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) настраивает вашу конфигурацию Hardhat

### Настройка Hardhat для использования локальной тестовой сети {#configure-hardhat}

После настройки среды разработки dapp вы подключите Hardhat для использования локальной тестовой сети Эфириума, сгенерированной с помощью Kurtosis. Для этого замените `<$YOUR_PORT>` в структуре `localnet` в вашем конфигурационном файле `hardhat.config.ts` на порт из вывода rpc uri любого сервиса `el-client-<num>`. В этом примере портом будет `64248`. Ваш порт будет отличаться.

Пример в `hardhat.config.ts`:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: ЗАМЕНИТЕ $YOUR_PORT НА ПОРТ URI УЗЛА, СОЗДАННОГО ПАКЕТОМ KURTOSIS ДЛЯ СЕТИ ETH

// Это закрытые ключи, связанные с предварительно пополненными тестовыми аккаунтами, созданными пакетом eth-network-package
// <https://github.com/kurtosis-tech/eth-network-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star>
accounts: [
    "ef5177cd0b6b21c87db5a0bf35d4084a8a57a9d6a064f86d51ac85f2b873a4e2",
    "48fcc39ae27a0e8bf0274021ae6ebd8fe4a0e12623d61464c498900b28feb567",
    "7988b3a148716ff800414935b305436493e1f25237a2a03e5eebc343735e2f31",
    "b3c409b6b0b3aa5e65ab2dc1930534608239a478106acf6f3d9178e9f9b00b35",
    "df9bb6de5d3dc59595bcaa676397d837ff49441d211878c024eabda2cd067c9f",
    "7da08f856b5956d40a72968f93396f6acff17193f013e8053f6fbb6c08c194d6",
  ],
},
```

Как только вы сохраните файл, ваша среда разработки dapp Hardhat будет подключена к вашей локальной тестовой сети Эфириума! Вы можете убедиться, что ваша тестовая сеть работает, выполнив:

```python
npx hardhat balances --network localnet
```

Вывод должен выглядеть примерно так:

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

Это подтверждает, что Hardhat использует вашу локальную тестовую сеть и обнаруживает предварительно пополненные аккаунты, созданные `eth-network-package`.

### Развертывание и тестирование вашего dapp локально {#deploy-and-test-dapp}

Когда среда разработки dapp полностью подключена к локальной тестовой сети Эфириума, вы можете запускать рабочие процессы разработки и тестирования вашего dapp с использованием локальной тестовой сети.

Чтобы скомпилировать и развернуть смарт-контракт `ChipToken.sol` для локального прототипирования и разработки, выполните:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

Вывод должен выглядеть примерно так:

```python
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Теперь попробуйте запустить тест `simple.js` для вашего локального dapp, чтобы подтвердить, что для каждого игрока в нашем dapp блэкджека отчеканено 1000 токенов:

Вывод должен выглядеть примерно так:

```python
npx hardhat test --network localnet
```

Вывод должен выглядеть примерно так:

```python
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### Обзор {#review-dapp-workflows}

На этом этапе вы настроили среду разработки dapp, подключили ее к локальной сети Эфириума, созданной Kurtosis, а также скомпилировали, развернули и запустили простой тест для вашего dapp.

Теперь давайте рассмотрим, как можно настроить базовую сеть для тестирования наших dapp в различных конфигурациях сети.

## Настройка локальной тестовой сети Эфириума {#configure-testnet}

### Изменение конфигураций клиентов и количества узлов {#configure-client-config-and-num-nodes}

Ваша локальная тестовая сеть Эфириума может быть настроена на использование различных пар клиентов EL и CL, а также разного количества узлов, в зависимости от сценария и конкретной конфигурации сети, которую вы хотите разработать или протестировать. Это означает, что после настройки вы можете запустить настроенную локальную тестовую сеть и использовать ее для выполнения тех же рабочих процессов (развертывание, тесты и т. д.) в различных конфигурациях сети, чтобы убедиться, что все работает как ожидалось. Чтобы узнать больше о других параметрах, которые вы можете изменить, перейдите по этой ссылке.

Попробуйте! Вы можете передать различные параметры конфигурации в `eth-network-package` через файл JSON. Этот файл JSON с параметрами сети предоставляет конкретные конфигурации, которые Kurtosis будет использовать для настройки локальной сети Эфириума.

Возьмите файл конфигурации по умолчанию и отредактируйте его, чтобы запустить два узла с разными парами EL/CL:

- Узел 1 с `geth`/`lighthouse`
- Узел 2 с `geth`/`lodestar`
- Узел 3 с `geth`/`teku`

Эта конфигурация создает гетерогенную сеть реализаций узлов Эфириума для тестирования вашего dapp. Ваш файл конфигурации теперь должен выглядеть так:

```yaml
{
  "participants":
    [
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "lighthouse",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "lodestar",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "teku",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
    ],
  "network_params":
    {
      "preregistered_validator_keys_mnemonic": "giant issue aisle success illegal bike spike question tent bar rely arctic volcano long crawl hungry vocal artwork sniff fantasy very lucky have athlete",
      "num_validator_keys_per_node": 64,
      "network_id": "3151908",
      "deposit_contract_address": "0x4242424242424242424242424242424242424242",
      "seconds_per_slot": 12,
      "genesis_delay": 120,
      "capella_fork_epoch": 5,
    },
}
```

Каждая структура `participants` соответствует узлу в сети, поэтому 3 структуры `participants` укажут Kurtosis запустить 3 узла в вашей сети. Каждая структура `participants` позволит вам указать пару EL и CL, используемую для этого конкретного узла.

Структура `network_params` настраивает параметры сети, которые используются для создания файлов генезиса для каждого узла, а также другие параметры, такие как количество секунд на слот сети.

Сохраните отредактированный файл параметров в любом каталоге по вашему желанию (в примере ниже он сохранен на рабочем столе), а затем используйте его для запуска вашего пакета Kurtosis, выполнив:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

Примечание: команда `kurtosis clean -a` используется здесь, чтобы дать указание Kurtosis уничтожить старую тестовую сеть и ее содержимое перед запуском новой.

Снова Kurtosis немного поработает и выведет отдельные выполняемые шаги. В конечном итоге вывод должен выглядеть примерно так:

```python
Starlark code successfully run. No output was returned.
INFO[2023-04-07T11:43:16-04:00] ==========================================================
INFO[2023-04-07T11:43:16-04:00] ||          Created enclave: local-eth-testnet          ||
INFO[2023-04-07T11:43:16-04:00] ==========================================================
Name:            local-eth-testnet
UUID:            bef8c192008e
Status:          RUNNING
Creation Time:   Fri, 07 Apr 2023 11:41:58 EDT

========================================= Files Artifacts =========================================
UUID           Name
cc495a8e364a   cl-genesis-data
7033fcdb5471   el-genesis-data
a3aef43fc738   genesis-generation-config-cl
8e968005fc9d   genesis-generation-config-el
3182cca9d3cd   geth-prefunded-keys
8421166e234f   prysm-password
d9e6e8d44d99   validator-keystore-0
23f5ba517394   validator-keystore-1
4d28dea40b5c   validator-keystore-2

========================================== User Services ==========================================
UUID           Name                                           Ports                                            Status
485e6fde55ae   cl-client-0-beacon                             http: 4000/tcp -> http://127.0.0.1:65010         RUNNING
                                                              metrics: 5054/tcp -> http://127.0.0.1:65011
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65012
                                                              udp-discovery: 9000/udp -> 127.0.0.1:54455
73739bd158b2   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:65016                RUNNING
                                                              metrics: 5064/tcp -> http://127.0.0.1:65017
1b0a233cd011   cl-client-1-beacon                             http: 4000/tcp -> 127.0.0.1:65021                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65023
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65024
                                                              udp-discovery: 9000/udp -> 127.0.0.1:56031
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65022
949b8220cd53   cl-client-1-validator                          http: 4000/tcp -> 127.0.0.1:65028                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65030
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65031
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60784
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65029
c34417bea5fa   cl-client-2                                    http: 4000/tcp -> 127.0.0.1:65037                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65035
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65036
                                                              udp-discovery: 9000/udp -> 127.0.0.1:63581
e19738e6329d   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:64986          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:64988
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64987
                                                              udp-discovery: 30303/udp -> 127.0.0.1:55706
                                                              ws: 8546/tcp -> 127.0.0.1:64989
e904687449d9   el-client-1                                    engine-rpc: 8551/tcp -> 127.0.0.1:64993          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:64995
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64994
                                                              udp-discovery: 30303/udp -> 127.0.0.1:58096
                                                              ws: 8546/tcp -> 127.0.0.1:64996
ad6f401126fa   el-client-2                                    engine-rpc: 8551/tcp -> 127.0.0.1:65003          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:65001
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:65000
                                                              udp-discovery: 30303/udp -> 127.0.0.1:57269
                                                              ws: 8546/tcp -> 127.0.0.1:65002
12d04a9dbb69   prelaunch-data-generator-1680882122181135513   <none>                                           STOPPED
5b45f9c0504b   prelaunch-data-generator-1680882122192182847   <none>                                           STOPPED
3d4aaa75e218   prelaunch-data-generator-1680882122201668972   <none>                                           STOPPED
```

Поздравляем! Вы успешно настроили свою локальную тестовую сеть так, чтобы в ней было 3 узла вместо 1. Чтобы запустить те же рабочие процессы, что и раньше, для вашего dapp (развертывание и тестирование), выполните те же операции, что и раньше, заменив `<$YOUR_PORT>` в структуре `localnet` в вашем конфигурационном файле `hardhat.config.ts` на порт из вывода rpc uri любого сервиса `el-client-<num>` в вашей новой локальной тестовой сети из 3 узлов.

## Заключение {#conclusion}

Вот и все! Подводя итоги этого краткого руководства, вы:

- Создали локальную тестовую сеть Эфириума поверх Docker с помощью Kurtosis
- Подключили вашу локальную среду разработки dapp к локальной сети Эфириума
- Развернули dapp и запустили для него простой тест в локальной сети Эфириума
- Настроили базовую сеть Эфириума так, чтобы она имела 3 узла

Мы будем рады узнать от вас, что прошло хорошо, что можно улучшить, или ответить на любые ваши вопросы. Не стесняйтесь обращаться через [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) или [напишите нам по электронной почте](mailto:feedback@kurtosistech.com)!

### Другие примеры и руководства {#other-examples-guides}

Мы рекомендуем вам ознакомиться с нашим [кратким руководством](https://docs.kurtosis.com/quickstart) (где вы создадите базу данных Postgres и API поверх нее) и другими нашими примерами в нашем [репозитории awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis), где вы найдете несколько отличных примеров, включая пакеты для:

- [Запуска такой же локальной тестовой сети Эфириума](https://github.com/kurtosis-tech/eth2-package), но с подключенными дополнительными сервисами, такими как спамер транзакций (для имитации транзакций), монитор форков, а также подключенный экземпляр Grafana и Prometheus
- Выполнения [теста подсети](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) в той же локальной сети Эфириума