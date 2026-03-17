---
title: "Вызов смарт-контракта из JavaScript"
description: "Как вызвать функцию смарт-контракта из JavaScript на примере токена Dai"
author: jdourlens
tags: [ "транзакции", "интерфейс", "JavaScript", "web3.js" ]
skill: beginner
lang: ru
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

В этом руководстве мы рассмотрим, как вызвать функцию [смарт-контракта](/developers/docs/smart-contracts/) из JavaScript. Сначала мы прочитаем состояние смарт-контракта (например, баланс держателя ERC20), а затем изменим состояние блокчейна, выполнив перевод токенов. Вы уже должны быть знакомы с [настройкой JS-среды для взаимодействия с блокчейном](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/).

В этом примере мы будем работать с токеном DAI, для целей тестирования мы сделаем форк блокчейна с помощью ganache-cli и разблокируем адрес, на котором уже есть много DAI:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[ВАШ КЛЮЧ INFURA] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Для взаимодействия со смарт-контрактом нам понадобятся его адрес и ABI:

```js
const ERC20TransferABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
]

const DAI_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f"
```

Для этого проекта мы урезали полный ABI ERC20, оставив только функции `balanceOf` и `transfer`, но вы можете найти [полный ABI ERC20 здесь](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

Затем нам нужно создать экземпляр нашего смарт-контракта:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

Мы также настроим два адреса:

- тот, который получит перевод, и
- тот, который мы уже разблокировали и с которого будем отправлять:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

В следующей части мы вызовем функцию `balanceOf`, чтобы получить текущее количество токенов, которыми владеют оба адреса.

## Вызов: чтение значения из смарт-контракта {#call-reading-value-from-a-smart-contract}

В первом примере будет вызван «константный» метод, и его метод смарт-контракта будет выполнен в EVM без отправки какой-либо транзакции. Для этого мы прочитаем баланс ERC20 адреса. [Прочтите нашу статью о токенах ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

Вы можете получить доступ к методам созданного экземпляра смарт-контракта, для которого вы предоставили ABI, следующим образом: `yourContract.methods.methodname`. Используя функцию `call`, вы получите результат выполнения функции.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("Произошла ошибка", err)
    return
  }
  console.log("Баланс: ", res)
})
```

Помните, что DAI ERC20 имеет 18 знаков после запятой, что означает, что вам нужно убрать 18 нулей, чтобы получить правильную сумму. Значения uint256 возвращаются в виде строк, так как JavaScript не обрабатывает большие числовые значения. Если вы не уверены, [как работать с большими числами в JS, ознакомьтесь с нашим руководством по bignumber.js](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Отправка: отправка транзакции в функцию смарт-контракта {#send-sending-a-transaction-to-a-smart-contract-function}

Во втором примере мы вызовем функцию transfer смарт-контракта DAI, чтобы отправить 10 DAI на наш второй адрес. Функция transfer принимает два параметра: адрес получателя и сумму токенов для перевода:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("Произошла ошибка", err)
      return
    }
    console.log("Хэш транзакции: " + res)
  })
```

Функция call возвращает хэш транзакции, которая будет включена в блокчейн. В Ethereum хэши транзакций предсказуемы — так мы можем получить хэш транзакции до ее выполнения ([узнайте, как рассчитываются хэши, здесь](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

Поскольку функция только отправляет транзакцию в блокчейн, мы не можем увидеть результат, пока не узнаем, когда она будет добыта и включена в блокчейн. В следующем руководстве мы узнаем, [как дождаться выполнения транзакции в блокчейне, зная ее хэш](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).
