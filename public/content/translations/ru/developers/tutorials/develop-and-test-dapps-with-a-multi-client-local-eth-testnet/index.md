---
title: Как разработать и протестировать децентрализованное приложение в локальной многоклиентской тестовой сети
description: В этом руководстве вы сначала узнаете, как создать и настроить локальную многоклиентскую тестовую сеть Ethereum, а затем использовать эту тестовую сеть для развертывания и тестирования децентрализованного приложения.
author: "Теди Митику"
tags:
  [
    "клиенты",
    "узлы",
    "Умные контракты",
    "композиционность",
    "уровень консенсуса",
    "Уровень исполнения",
    "тестирование"
  ]
skill: intermediate
lang: ru
published: 2023-04-11
---

## Введение {#introduction}

Это руководство проведет вас через процесс создания настраиваемой локальной тестовой сети Ethereum, развертывания в ней смарт-контракта и использования тестовой сети для запуска тестов для вашего децентрализованного приложения. Это руководство предназначено для разработчиков децентрализованных приложений, которые хотят разрабатывать и тестировать свои децентрализованные приложения локально с различными конфигурациями сети перед развертыванием в работающую тестовую сеть или основную сеть.

В этом руководстве вы:

- Создадите локальную тестовую сеть Ethereum с помощью [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package), используя [Kurtosis](https://www.kurtosis.com/),
- Подключите среду разработки децентрализованных приложений Hardhat к локальной тестовой сети, чтобы скомпилировать, развернуть и протестировать децентрализованное приложение, и
- Настроите локальную тестовую сеть, включая такие параметры, как количество узлов и конкретные пары клиентов EL/CL, чтобы обеспечить рабочие процессы разработки и тестирования для различных конфигураций сети.

### Что такое Kurtosis? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) — это компонуемая система сборки, предназначенная для настройки многоконтейнерных тестовых сред. Он специально позволяет разработчикам создавать воспроизводимые среды, требующие динамической логики настройки, например, тестовые сети блокчейна.

В этом руководстве пакет Kurtosis eth-network-package запускает локальную тестовую сеть Ethereum с поддержкой клиента уровня исполнения (EL) [`geth`](https://geth.ethereum.org/), а также клиентов уровня консенсуса (CL) [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/) и [`lodestar`](https://lodestar.chainsafe.io/). Этот пакет служит настраиваемой и компонуемой альтернативой сетям во фреймворках, таких как Hardhat Network, Ganache и Anvil. Kurtosis предлагает разработчикам больший контроль и гибкость над используемыми ими тестовыми сетями, что является основной причиной, по которой [Ethereum Foundation использовал Kurtosis для тестирования Слияния](https://www.kurtosis.com/blog/testing-the-ethereum-merge) и продолжает использовать его для тестирования обновлений сети.

## Настройка Kurtosis {#setting-up-kurtosis}

Прежде чем продолжить, убедитесь, что у вас есть:

- [Установленный и запущенный движок Docker](https://docs.kurtosis.com/install/#i-install--start-docker) на вашем локальном компьютере
- [Установленный Kurtosis CLI](https://docs.kurtosis.com/install#ii-install-the-cli) (или обновленный до последней версии, если CLI у вас уже установлен)
- Установленные [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) и [npx](https://www.npmjs.com/package/npx) (для вашей среды децентрализованных приложений)

## Создание локальной тестовой сети Ethereum {#instantiate-testnet}

Чтобы запустить локальную тестовую сеть Ethereum, выполните:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

Примечание: эта команда дает вашей сети имя «local-eth-testnet» с помощью флага `--enclave`.

Kurtosis выведет на экран шаги, которые он выполняет «под капотом» в процессе интерпретации, проверки и последующего выполнения инструкций. В конце вы должны увидеть вывод, похожий на следующий:

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

Поздравляем! Вы использовали Kurtosis для создания локальной тестовой сети Ethereum с клиентом CL (`lighthouse`) и клиентом EL (`geth`) через Docker.

### Обзор {#review-instantiate-testnet}

В этом разделе вы выполнили команду, которая указала Kurtosis использовать [`eth-network-package`, размещенный удаленно на GitHub](https://github.com/kurtosis-tech/eth-network-package), для запуска локальной тестовой сети Ethereum в Kurtosis [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/). Внутри вашего анклава вы найдете как «файловые артефакты», так и «пользовательские службы».

[Файловые артефакты](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) в вашем анклаве включают все данные, сгенерированные и используемые для начальной загрузки клиентов EL и CL. Данные были созданы с помощью службы `prelaunch-data-generator`, созданной на основе этого [образа Docker](https://github.com/ethpandaops/ethereum-genesis-generator).

Пользовательские службы отображают все контейнеризированные службы, работающие в вашем анклаве. Вы заметите, что был создан один узел, включающий как клиент EL, так и клиент CL.

## Подключите среду разработки децентрализованного приложения к локальной тестовой сети Ethereum {#connect-your-dapp}

### Настройка среды разработки децентрализованного приложения {#set-up-dapp-env}

Теперь, когда у вас есть запущенная локальная тестовая сеть, вы можете подключить свою среду разработки децентрализованного приложения для использования локальной тестовой сети. Фреймворк Hardhat будет использоваться в этом руководстве для развертывания децентрализованного приложения для игры в блэкджек в вашей локальной тестовой сети.

Чтобы настроить среду разработки децентрализованного приложения, клонируйте репозиторий, содержащий наше примерное децентрализованное приложение, и установите его зависимости, выполнив команду:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

Папка [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example), используемая здесь, содержит типичную настройку для разработчика децентрализованного приложения, использующего фреймворк [Hardhat](https://hardhat.org/):

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) содержит несколько простых смарт-контрактов для децентрализованного приложения Blackjack
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) содержит скрипт для развертывания контракта токена в вашей локальной сети Ethereum
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) содержит простой тест на .js для вашего контракта токена, чтобы подтвердить, что для каждого игрока в нашем децентрализованном приложении Blackjack отчеканено 1000 фишек
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) настраивает вашу установку Hardhat

### Настройка Hardhat для использования локальной тестовой сети {#configure-hardhat}

После настройки среды разработки децентрализованного приложения вы подключите Hardhat для использования локальной тестовой сети Ethereum, созданной с помощью Kurtosis. Для этого замените `<$YOUR_PORT>` в структуре `localnet` в файле конфигурации `hardhat.config.ts` на порт из вывода RPC URI любой службы `el-client-<num>`. В этом примере порт будет `64248`. Ваш порт будет другим.

Пример в `hardhat.config.ts`:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: ЗАМЕНИТЕ $YOUR_PORT НА ПОРТ URI УЗЛА, ВЫДАННЫЙ ПАКЕТОМ СЕТИ ETH KURTOSIS

// Это приватные ключи, связанные с предварительно пополненными тестовыми аккаунтами, созданными пакетом eth-network-package
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

После сохранения файла ваша среда разработки децентрализованных приложений Hardhat будет подключена к вашей локальной тестовой сети Ethereum! Вы можете убедиться, что ваша тестовая сеть работает, выполнив команду:

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

### Развертывание и тестирование вашего децентрализованного приложения локально {#deploy-and-test-dapp}

Когда среда разработки децентрализованного приложения полностью подключена к локальной тестовой сети Ethereum, вы можете запускать рабочие процессы разработки и тестирования для вашего децентрализованного приложения, используя локальную тестовую сеть.

Чтобы скомпилировать и развернуть смарт-контракт `ChipToken.sol` для локального прототипирования и разработки, выполните:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

Вывод должен выглядеть примерно так:

```python
ChipToken развернут по адресу: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Теперь попробуйте запустить тест `simple.js` для вашего локального децентрализованного приложения, чтобы подтвердить, что для каждого игрока в нашем децентрализованном приложении Blackjack отчеканено 1000 фишек:

Вывод должен выглядеть примерно так:

```python
npx hardhat test --network localnet
```

Вывод должен выглядеть примерно так:

```python
ChipToken
    чеканка
      ✔ должно быть отчеканено 1000 фишек для ИГРОКА ОДИН

  1 пройден (654 мс)
```

### Обзор {#review-dapp-workflows}

К этому моменту вы настроили среду разработки децентрализованного приложения, подключили ее к локальной сети Ethereum, созданной Kurtosis, и скомпилировали, развернули и запустили простой тест для вашего децентрализованного приложения.

Теперь давайте рассмотрим, как можно настроить базовую сеть для тестирования наших децентрализованных приложений в различных конфигурациях сети.

## Настройка локальной тестовой сети Ethereum {#configure-testnet}

### Изменение конфигураций клиентов и количества узлов {#configure-client-config-and-num-nodes}

Ваша локальная тестовая сеть Ethereum может быть настроена для использования различных пар клиентов EL и CL, а также различного количества узлов, в зависимости от сценария и конкретной конфигурации сети, которую вы хотите разработать или протестировать. Это означает, что после настройки вы можете запустить настраиваемую локальную тестовую сеть и использовать ее для выполнения тех же рабочих процессов (развертывание, тесты и т. д.) в различных конфигурациях сети, чтобы убедиться, что все работает так, как ожидалось. Чтобы узнать больше о других параметрах, которые вы можете изменить, перейдите по этой ссылке.

Попробуйте! Вы можете передавать различные параметры конфигурации в `eth-network-package` через JSON-файл. Этот JSON-файл с параметрами сети предоставляет конкретные конфигурации, которые Kurtosis будет использовать для настройки локальной сети Ethereum.

Возьмите файл конфигурации по умолчанию и отредактируйте его, чтобы запустить три узла с разными парами EL/CL:

- Узел 1 с `geth`/`lighthouse`
- Узел 2 с `geth`/`lodestar`
- Узел 3 с `geth`/`teku`

Эта конфигурация создает гетерогенную сеть реализаций узлов Ethereum для тестирования вашего децентрализованного приложения. Ваш файл конфигурации теперь должен выглядеть так:

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

Каждая структура `participants` сопоставляется с узлом в сети, поэтому 3 структуры `participants` сообщат Kurtosis о запуске 3 узлов в вашей сети. Каждая структура `participants` позволит вам указать пару EL и CL, используемую для этого конкретного узла.

Структура `network_params` настраивает параметры сети, которые используются для создания файлов генезиса для каждого узла, а также другие настройки, такие как количество секунд на слот в сети.

Сохраните отредактированный файл параметров в любом каталоге (в примере ниже он сохранен на рабочем столе), а затем используйте его для запуска пакета Kurtosis, выполнив:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

Примечание: команда `kurtosis clean -a` используется здесь, чтобы указать Kurtosis уничтожить старую тестовую сеть и ее содержимое перед запуском новой.

Опять же, Kurtosis будет некоторое время работать и выводить на печать отдельные шаги, которые выполняются. В конечном итоге вывод должен выглядеть примерно так:

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

Поздравляем! Вы успешно настроили свою локальную тестовую сеть, чтобы в ней было 3 узла вместо 1. Чтобы запустить те же рабочие процессы, что и раньше, для вашего децентрализованного приложения (развертывание и тестирование), выполните те же операции, что и раньше, заменив `<$YOUR_PORT>` в структуре `localnet` в вашем файле конфигурации `hardhat.config.ts` на порт из вывода RPC URI любой службы `el-client-<num>` в вашей новой 3-узловой локальной тестовой сети.

## Заключение {#conclusion}

Вот и все! Подводя итоги этого краткого руководства, вы:

- Создали локальную тестовую сеть Ethereum через Docker с помощью Kurtosis
- Подключили свою локальную среду разработки децентрализованных приложений к локальной сети Ethereum
- Развернули децентрализованное приложение и запустили для него простой тест в локальной сети Ethereum
- Настроили базовую сеть Ethereum на 3 узла

Мы будем рады услышать от вас о том, что у вас получилось, что можно улучшить, или ответить на любые ваши вопросы. Не стесняйтесь обращаться к нам через [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) или [пишите нам по электронной почте](mailto:feedback@kurtosistech.com)!

### Другие примеры и руководства {#other-examples-guides}

Мы рекомендуем вам ознакомиться с нашим [кратким руководством](https://docs.kurtosis.com/quickstart) и другими примерами в нашем [репозитории awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis), где вы найдете несколько отличных примеров, включая пакеты для:

- Запуск той же локальной тестовой сети Ethereum, но с подключением дополнительных служб, таких как спамер транзакций (для имитации транзакций), монитор форков и подключенные экземпляры Grafana и Prometheus
- Проведение [теста подсети](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) в той же локальной сети Ethereum
