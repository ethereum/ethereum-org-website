---
title: Chamando um contrato inteligente a partir do JavaScript
description: Como chamar uma função de um contrato inteligente a partir do JavaScript usando um token Dai como exemplo
author: jdourlens
tags: [ "transações", "front-end", "JavaScript", "web3.js" ]
skill: beginner
lang: pt-br
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Neste tutorial, veremos como chamar uma função de [contrato inteligente](/developers/docs/smart-contracts/) a partir do JavaScript. Primeiro, leremos o estado de um contrato inteligente (p. ex., o saldo de um detentor de ERC20), depois modificaremos o estado da cadeia de blocos fazendo uma transferência de token. Você já deve estar familiarizado com a [configuração de um ambiente JS para interagir com a cadeia de blocos](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/).

Para este exemplo, vamos interagir com o token DAI. Para fins de teste, faremos uma bifurcação da cadeia de blocos usando ganache-cli e desbloquearemos um endereço que já tenha muito DAI:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Para interagir com um contrato inteligente, precisaremos de seu endereço e IAB:

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

Para este projeto, removemos parte da IAB do ERC20 para manter apenas as funções `balanceOf` e `transfer`, mas você pode encontrar [a IAB completa do ERC20 aqui](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

Em seguida, precisamos instanciar nosso contrato inteligente:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

Também configuraremos dois endereços:

- aquele que receberá a transferência e
- aquele que já desbloqueamos e que fará o envio:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

Na próxima parte, chamaremos a função `balanceOf` para recuperar a quantidade atual de tokens que ambos os endereços possuem.

## Chamada: lendo o valor de um contrato inteligente {#call-reading-value-from-a-smart-contract}

O primeiro exemplo chamará um método "constante" e executará seu método de contrato inteligente na EVM sem enviar nenhuma transação. Para isso, leremos o saldo ERC20 de um endereço. [Leia nosso artigo sobre tokens ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

Você pode acessar os métodos de um contrato inteligente instanciado, para o qual você forneceu a IAB, da seguinte forma: `yourContract.methods.methodname`. Ao usar a função `call`, você receberá o resultado da execução da função.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("Ocorreu um erro", err)
    return
  }
  console.log("O saldo é: ", res)
})
```

Lembre-se de que o DAI ERC20 tem 18 casas decimais, o que significa que você precisa remover 18 zeros para obter o valor correto. Valores `uint256` são retornados como strings, pois o JavaScript não lida com valores numéricos grandes. Se você não tiver certeza de [como lidar com números grandes em JS, confira nosso tutorial sobre bignumber.js](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Envio: enviando uma transação para uma função de contrato inteligente {#send-sending-a-transaction-to-a-smart-contract-function}

Para o segundo exemplo, chamaremos a função de transferência do contrato inteligente DAI para enviar 10 DAI para nosso segundo endereço. A função de transferência aceita dois parâmetros: o endereço do destinatário e a quantidade de tokens a ser transferida:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("Ocorreu um erro", err)
      return
    }
    console.log("Hash da transação: " + res)
  })
```

A função de chamada retorna o hash da transação que será minerada na cadeia de blocos. No Ethereum, os hashes de transação são previsíveis - é assim que podemos obter o hash da transação antes de ela ser executada ([aprenda como os hashes são calculados aqui](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

Como a função apenas envia a transação para a cadeia de blocos, não podemos ver o resultado até sabermos quando ela for minerada e incluída na cadeia de blocos. No próximo tutorial, aprenderemos [como esperar que uma transação seja executada na cadeia de blocos, conhecendo seu hash](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).
