---
title: Chamando um contrato inteligente a partir do JavaScript
description: "Como chamar uma função de contrato inteligente a partir do JavaScript usando um exemplo de token DAI"
author: jdourlens
tags:
  - transações
  - frontend
  - JavaScript
  - web3.js
skill: beginner
breadcrumb: Chamar contratos a partir do JS
lang: pt-br
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Neste tutorial, veremos como chamar uma função de [contrato inteligente](/developers/docs/smart-contracts/) a partir do JavaScript. Primeiro, lendo o estado de um contrato inteligente (por exemplo, o saldo de um detentor de ERC-20), depois modificaremos o estado da blockchain fazendo uma transferência de token. Você já deve estar familiarizado com a [configuração de um ambiente JS para interagir com a blockchain](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/).

Para este exemplo, vamos brincar com o token DAI. Para fins de teste, faremos uma bifurcação (fork) da blockchain usando o ganache-cli e desbloquearemos um endereço que já possui muitos DAI:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Para interagir com um contrato inteligente, precisaremos de seu endereço e ABI:

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

Para este projeto, reduzimos a ABI completa do ERC-20 para manter apenas as funções `balanceOf` e `transfer`, mas você pode encontrar [a ABI completa do ERC-20 aqui](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

Em seguida, precisamos instanciar nosso contrato inteligente:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

Também configuraremos dois endereços:

- o que receberá a transferência e
- o que já desbloqueamos que a enviará:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

Na próxima parte, chamaremos a função `balanceOf` para recuperar a quantidade atual de tokens que ambos os endereços possuem.

## Call: Lendo o valor de um contrato inteligente {#call-reading-value-from-a-smart-contract}

O primeiro exemplo chamará um método “constante” e executará seu método de contrato inteligente na EVM sem enviar nenhuma transação. Para isso, leremos o saldo ERC-20 de um endereço. [Leia nosso artigo sobre tokens ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

Você pode acessar os métodos de um contrato inteligente instanciado para o qual você forneceu a ABI da seguinte forma: `yourContract.methods.methodname`. Ao usar a função `call`, você receberá o resultado da execução da função.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occurred", err)
    return
  }
  console.log("The balance is: ", res)
})
```

Lembre-se de que o ERC-20 DAI tem 18 casas decimais, o que significa que você precisa remover 18 zeros para obter o valor correto. Os uint256 são retornados como strings, pois o JavaScript não lida com grandes valores numéricos. Se você não tem certeza de [como lidar com números grandes em JS, confira nosso tutorial sobre bignumber.js](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Send: Enviando uma transação para uma função de contrato inteligente {#send-sending-a-transaction-to-a-smart-contract-function}

Para o segundo exemplo, chamaremos a função de transferência (transfer) do contrato inteligente DAI para enviar 10 DAI para o nosso segundo endereço. A função de transferência aceita dois parâmetros: o endereço do destinatário e a quantidade de tokens a transferir:

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

A função de chamada retorna o hash da transação que será minerada na blockchain. No Ethereum, os hashes de transação são previsíveis - é assim que podemos obter o hash da transação antes que ela seja executada ([saiba como os hashes são calculados aqui](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

Como a função apenas envia a transação para a blockchain, não podemos ver o resultado até sabermos quando ela for minerada e incluída na blockchain. No próximo tutorial, aprenderemos [como aguardar a execução de uma transação na blockchain conhecendo seu hash](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).