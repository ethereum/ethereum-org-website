---
title: Як розробляти та тестувати dapp у локальній багатоклієнтській тестовій мережі
description: Цей посібник спочатку розповість, як створити та налаштувати багатоклієнтську локальну тестову мережу Етеріуму, перш ніж використовувати її для розгортання та тестування dapp.
author: "Теді Мітіку"
tags:
  [
    "клієнти",
    "вузли",
    "смарт-контракти",
    "компонованість",
    "рівень консенсусу",
    "рівень виконання",
    "тестування",
  ]
skill: intermediate
breadcrumb: Багатоклієнтська тестова мережа
lang: uk
published: 2023-04-11
---

## Вступ {#introduction}

Цей посібник проведе вас через процес створення налаштовуваної локальної тестової мережі Етеріуму, розгортання в ній смарт-контракту та використання тестової мережі для запуску тестів вашого децентралізованого застосунку (dapp). Цей посібник призначений для розробників dapp, які хочуть розробляти та тестувати свої застосунки локально з різними конфігураціями мережі перед розгортанням у живій тестовій мережі або Головній мережі.

У цьому посібнику ви:

- Створите локальну тестову мережу Етеріуму за допомогою [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package), використовуючи [Kurtosis](https://www.kurtosis.com/),
- Підключите середовище розробки dapp Hardhat до локальної тестової мережі для компіляції, розгортання та тестування dapp, а також
- Налаштуєте локальну тестову мережу, включно з такими параметрами, як кількість вузлів і конкретні пари клієнтів рівня виконання (EL) та рівня консенсусу (CL), щоб забезпечити робочі процеси розробки та тестування для різних конфігурацій мережі.

### Що таке Kurtosis? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) — це компонована система збірки, призначена для налаштування багатоконтейнерних тестових середовищ. Зокрема, вона дозволяє розробникам створювати відтворювані середовища, які вимагають динамічної логіки налаштування, наприклад, тестові мережі блокчейну.

У цьому посібнику пакет Kurtosis eth-network-package розгортає локальну тестову мережу Етеріуму з підтримкою клієнта рівня виконання (EL) [`geth`](https://geth.ethereum.org/), а також клієнтів рівня консенсусу (CL) [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/) та [`lodestar`](https://lodestar.chainsafe.io/). Цей пакет слугує налаштовуваною та компонованою альтернативою мережам у таких фреймворках, як Hardhat Network, Ganache та Anvil. Kurtosis пропонує розробникам більший контроль і гнучкість над тестовими мережами, які вони використовують, що є головною причиною, чому [Фундація Ethereum використовувала Kurtosis для тестування Злиття](https://www.kurtosis.com/blog/testing-the-ethereum-merge) і продовжує використовувати його для тестування оновлень мережі.

## Налаштування Kurtosis {#setting-up-kurtosis}

Перш ніж продовжити, переконайтеся, що ви:

- [Встановили та запустили рушій Docker](https://docs.kurtosis.com/install/#i-install--start-docker) на вашій локальній машині
- [Встановили Kurtosis CLI](https://docs.kurtosis.com/install#ii-install-the-cli) (або оновили його до останньої версії, якщо CLI вже встановлено)
- Встановили [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) та [npx](https://www.npmjs.com/package/npx) (для вашого середовища dapp)

## Створення локальної тестової мережі Етеріуму {#instantiate-testnet}

Щоб розгорнути локальну тестову мережу Етеріуму, виконайте:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

Примітка: Ця команда називає вашу мережу «local-eth-testnet» за допомогою прапорця `--enclave`.

Kurtosis виводитиме кроки, які він виконує внутрішньо, під час інтерпретації, перевірки та виконання інструкцій. Наприкінці ви побачите вивід, схожий на цей:

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

Вітаємо! Ви використали Kurtosis для створення локальної тестової мережі Етеріуму з клієнтом CL (`lighthouse`) та EL (`geth`) через Docker.

### Огляд {#review-instantiate-testnet}

У цьому розділі ви виконали команду, яка вказала Kurtosis використати [`eth-network-package`, розміщений віддалено на GitHub](https://github.com/kurtosis-tech/eth-network-package), щоб розгорнути локальну тестову мережу Етеріуму в межах [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) Kurtosis. Усередині вашого анклаву ви знайдете як «файлові артефакти» (file artifacts), так і «користувацькі сервіси» (user services).

[Файлові артефакти](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) у вашому анклаві включають усі дані, згенеровані та використані для початкового завантаження клієнтів EL та CL. Дані були створені за допомогою сервісу `prelaunch-data-generator`, зібраного з цього [образу Docker](https://github.com/ethpandaops/ethereum-genesis-generator).

Користувацькі сервіси відображають усі контейнеризовані сервіси, що працюють у вашому анклаві. Ви помітите, що було створено один вузол, який містить як клієнт EL, так і клієнт CL.

## Підключення середовища розробки dapp до локальної тестової мережі Етеріуму {#connect-your-dapp}

### Налаштування середовища розробки dapp {#set-up-dapp-env}

Тепер, коли у вас запущена локальна тестова мережа, ви можете підключити середовище розробки dapp для її використання. У цьому посібнику буде використано фреймворк Hardhat для розгортання dapp для гри в блекджек у вашій локальній тестовій мережі.

Щоб налаштувати середовище розробки dapp, клонуйте репозиторій, який містить наш зразок dapp, і встановіть його залежності, виконавши:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

Папка [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example), яка тут використовується, містить типове налаштування для розробника dapp, що використовує фреймворк [Hardhat](https://hardhat.org/):

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) містить кілька простих смарт-контрактів для dapp блекджеку
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) містить скрипт для розгортання контракту токена у вашій локальній мережі Етеріуму
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) містить простий .js тест для вашого контракту токена, щоб підтвердити, що для кожного гравця в нашому dapp блекджеку викарбувано 1000 токенів
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) налаштовує вашу конфігурацію Hardhat

### Налаштування Hardhat для використання локальної тестової мережі {#configure-hardhat}

Після налаштування середовища розробки dapp ви підключите Hardhat для використання локальної тестової мережі Етеріуму, згенерованої за допомогою Kurtosis. Для цього замініть `<$YOUR_PORT>` у структурі `localnet` у вашому файлі конфігурації `hardhat.config.ts` на порт RPC URI, виведений з будь-якого сервісу `el-client-<num>`. У цьому прикладі портом буде `64248`. Ваш порт буде іншим.

Приклад у `hardhat.config.ts`:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: ЗАМІНІТЬ $YOUR_PORT НА ПОРТ URI ВУЗЛА, СТВОРЕНОГО ПАКЕТОМ МЕРЕЖІ ETH KURTOSIS

// Це приватні ключі, пов'язані з попередньо поповненими тестовими обліковими записами, створеними пакетом eth-network-package
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

Після збереження файлу ваше середовище розробки dapp Hardhat буде підключено до локальної тестової мережі Етеріуму! Ви можете перевірити, чи працює ваша тестова мережа, виконавши:

```python
npx hardhat balances --network localnet
```

Вивід має виглядати приблизно так:

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

Це підтверджує, що Hardhat використовує вашу локальну тестову мережу та виявляє попередньо поповнені акаунти, створені `eth-network-package`.

### Розгортання та тестування dapp локально {#deploy-and-test-dapp}

Коли середовище розробки dapp повністю підключено до локальної тестової мережі Етеріуму, ви можете запускати робочі процеси розробки та тестування вашого dapp, використовуючи локальну тестову мережу.

Щоб скомпілювати та розгорнути смарт-контракт `ChipToken.sol` для локального прототипування та розробки, виконайте:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

Вивід має виглядати приблизно так:

```python
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Тепер спробуйте запустити тест `simple.js` для вашого локального dapp, щоб підтвердити, що для кожного гравця в нашому dapp блекджеку викарбувано 1000 токенів:

Вивід має виглядати приблизно так:

```python
npx hardhat test --network localnet
```

Вивід має виглядати приблизно так:

```python
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### Огляд {#review-dapp-workflows}

На цьому етапі ви налаштували середовище розробки dapp, підключили його до локальної мережі Етеріуму, створеної Kurtosis, а також скомпілювали, розгорнули та запустили простий тест для вашого dapp.

Тепер давайте розглянемо, як можна налаштувати базову мережу для тестування наших dapp за різних конфігурацій мережі.

## Налаштування локальної тестової мережі Етеріуму {#configure-testnet}

### Зміна конфігурацій клієнтів та кількості вузлів {#configure-client-config-and-num-nodes}

Вашу локальну тестову мережу Етеріуму можна налаштувати на використання різних пар клієнтів EL та CL, а також різної кількості вузлів, залежно від сценарію та конкретної конфігурації мережі, яку ви хочете розробляти або тестувати. Це означає, що після налаштування ви можете розгорнути кастомізовану локальну тестову мережу та використовувати її для запуску тих самих робочих процесів (розгортання, тести тощо) за різних конфігурацій мережі, щоб переконатися, що все працює як очікувалося. Щоб дізнатися більше про інші параметри, які можна змінити, перейдіть за цим посиланням.

Спробуйте! Ви можете передати різні параметри конфігурації до `eth-network-package` через файл JSON. Цей JSON-файл параметрів мережі містить конкретні конфігурації, які Kurtosis використовуватиме для налаштування локальної мережі Етеріуму.

Візьміть файл конфігурації за замовчуванням і відредагуйте його, щоб розгорнути два вузли з різними парами EL/CL:

- Вузол 1 з `geth`/`lighthouse`
- Вузол 2 з `geth`/`lodestar`
- Вузол 3 з `geth`/`teku`

Ця конфігурація створює гетерогенну мережу реалізацій вузлів Етеріуму для тестування вашого dapp. Тепер ваш файл конфігурації має виглядати так:

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

Кожна структура `participants` відповідає вузлу в мережі, тому 3 структури `participants` вкажуть Kurtosis розгорнути 3 вузли у вашій мережі. Кожна структура `participants` дозволить вам вказати пару EL та CL, що використовується для цього конкретного вузла.

Структура `network_params` налаштовує параметри мережі, які використовуються для створення файлів генезису для кожного вузла, а також інші параметри, як-от кількість секунд на слот мережі.

Збережіть відредагований файл параметрів у будь-якому каталозі за вашим бажанням (у прикладі нижче він збережений на робочому столі), а потім використайте його для запуску вашого пакета Kurtosis, виконавши:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

Примітка: команда `kurtosis clean -a` використовується тут, щоб дати вказівку Kurtosis знищити стару тестову мережу та її вміст перед запуском нової.

Знову ж таки, Kurtosis попрацює деякий час і виведе окремі кроки, які виконуються. Зрештою, вивід має виглядати приблизно так:

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

Вітаємо! Ви успішно налаштували локальну тестову мережу на 3 вузли замість 1. Щоб запустити ті самі робочі процеси для вашого dapp, що й раніше (розгортання та тестування), виконайте ті самі операції, замінивши `<$YOUR_PORT>` у структурі `localnet` у вашому файлі конфігурації `hardhat.config.ts` на порт RPC URI, виведений з будь-якого сервісу `el-client-<num>` у вашій новій локальній тестовій мережі з 3 вузлами.

## Висновок {#conclusion}

Ось і все! Підсумовуючи цей короткий посібник, ви:

- Створили локальну тестову мережу Етеріуму через Docker за допомогою Kurtosis
- Підключили локальне середовище розробки dapp до локальної мережі Етеріуму
- Розгорнули dapp і запустили для нього простий тест у локальній мережі Етеріуму
- Налаштували базову мережу Етеріуму на 3 вузли

Ми хотіли б почути від вас, що пройшло добре, що можна покращити, або відповісти на будь-які ваші запитання. Не соромтеся звертатися через [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) або [напишіть нам на електронну пошту](mailto:feedback@kurtosistech.com)!

### Інші приклади та посібники {#other-examples-guides}

Ми рекомендуємо вам ознайомитися з нашим [коротким посібником](https://docs.kurtosis.com/quickstart) (де ви створите базу даних Postgres і API поверх неї) та іншими нашими прикладами в репозиторії [awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis), де ви знайдете чудові приклади, зокрема пакети для:

- [Розгортання такої ж локальної тестової мережі Етеріуму](https://github.com/kurtosis-tech/eth2-package), але з підключеними додатковими сервісами, такими як спамер транзакцій (для симуляції транзакцій), монітор форків, а також підключені екземпляри Grafana та Prometheus
- Виконання [тестування підмереж](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) у тій самій локальній мережі Етеріуму