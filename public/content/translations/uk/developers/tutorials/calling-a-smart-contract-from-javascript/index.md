---
title: "Виклик смарт-контракту з JavaScript"
description: "Як викликати функцію смарт-контракту з JavaScript на прикладі токена DAI"
author: jdourlens
tags: ["транзакції", "фронтенд", "JavaScript", "web3.js"]
skill: beginner
breadcrumb: "Виклик контрактів з JS"
lang: uk
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

У цьому посібнику ми розглянемо, як викликати функцію [смарт-контракту](/developers/docs/smart-contracts/) з JavaScript. Спочатку ми зчитаємо стан смарт-контракту (наприклад, баланс власника ERC-20), а потім змінимо стан блокчейну, здійснивши переказ токенів. Ви вже маєте бути знайомі з [налаштуванням середовища JS для взаємодії з блокчейном](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/).

Для цього прикладу ми попрацюємо з токеном DAI. З метою тестування ми зробимо форк блокчейну за допомогою ganache-cli та розблокуємо адресу, яка вже має багато DAI:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Для взаємодії зі смарт-контрактом нам знадобляться його адреса та ABI:

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

Для цього проєкту ми скоротили повний ABI ERC-20, залишивши лише функції `balanceOf` та `transfer`, але ви можете знайти [повний ABI ERC-20 тут](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

Далі нам потрібно створити екземпляр нашого смарт-контракту:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

Ми також налаштуємо дві адреси:

- ту, яка отримає переказ, і
- ту, яку ми вже розблокували і яка його надішле:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

У наступній частині ми викличемо функцію `balanceOf`, щоб отримати поточну кількість токенів, якими володіють обидві адреси.

## Виклик: Зчитування значення зі смарт-контракту {#call-reading-value-from-a-smart-contract}

Перший приклад викличе «константний» метод і виконає метод смарт-контракту в EVM без надсилання жодної транзакції. Для цього ми зчитаємо баланс ERC-20 адреси. [Прочитайте нашу статтю про токени ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

Ви можете отримати доступ до методів створеного екземпляра смарт-контракту, для якого ви надали ABI, таким чином: `yourContract.methods.methodname`. Використовуючи функцію `call`, ви отримаєте результат виконання функції.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occurred", err)
    return
  }
  console.log("The balance is: ", res)
})
```

Пам'ятайте, що DAI ERC-20 має 18 десяткових знаків, а це означає, що вам потрібно прибрати 18 нулів, щоб отримати правильну суму. Значення uint256 повертаються у вигляді рядків, оскільки JavaScript не обробляє великі числові значення. Якщо ви не впевнені, [як працювати з великими числами в JS, перегляньте наш посібник про bignumber.js](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Надсилання: Надсилання транзакції до функції смарт-контракту {#send-sending-a-transaction-to-a-smart-contract-function}

Для другого прикладу ми викличемо функцію переказу смарт-контракту DAI, щоб надіслати 10 DAI на нашу другу адресу. Функція переказу приймає два параметри: адресу одержувача та кількість токенів для переказу:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("An error occurred", err)
      return
    }
    console.log("Hash of the transaction: " + res)
  })
```

Функція виклику повертає хеш транзакції, яка буде додана до блокчейну. В Етеріумі хеші транзакцій є передбачуваними — саме так ми можемо отримати хеш транзакції до її виконання ([дізнайтеся, як обчислюються хеші, тут](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

Оскільки функція лише надсилає транзакцію до блокчейну, ми не можемо побачити результат, доки не дізнаємося, коли вона буде видобута та включена до блокчейну. У наступному посібнику ми дізнаємося, [як дочекатися виконання транзакції в блокчейні, знаючи її хеш](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).