---
title: Chamando um contrato inteligente a partir do JavaScript
description: Como chamar uma função do contrato inteligente a partir do JavaScript usando um token Dai como exemplo
author: jdourlens
tags:
  - "transações"
  - "front-end"
  - "JavaScript"
  - "web3.js"
skill: beginner
lang: pt-br
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Neste tutorial, veremos como chamar uma função do [contrato inteligente](/developers/docs/smart-contracts/) a partir do JavaScript. Primeiro vamos ler o estado de um contrato inteligente (por exemplo, o saldo de um titular do ERC20) e logo vamos modificar o estado da blockchain fazendo uma transferência de token. Você já deve estar familiarizado com [configurando um ambiente JavaScript para interagir com a blockchain](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/).

Para esses exemplos, vamos usar o token DAI. Para fins de teste, vamos fazer um fork do blockchain usando ganache-cli e desbloquear um endereço que já possui muitos DAI:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Para interagir com um contrato inteligente, precisaremos do seu endereço e ABI:

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

Para este projeto, nós removemos parte do ERC20 ABI para manter apenas as funções `balanceOf` e `transfer`, mas você pode encontrar [aqui o ERC20 ABI completo](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

Precisamos então instanciar nosso contrato inteligente:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

Também vamos configurar dois endereços:

- quem receberá a transferência e
- o que nós já desbloqueamos que irá enviá-lo:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CB3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

Na próxima parte, chamaremos a função `balanceOf` para recuperar a quantidade atual de tokens que os dois endereços possuem.

## Chamada: valor de leitura de um contrato inteligente {#call-reading-value-from-a-smart-contract}

O primeiro exemplo chamará um método "constant" e executará seu método de contrato inteligente na EVM sem enviar qualquer transação. Para isso, vamos ler o saldo do ERC20 de um endereço. [Leia o nosso artigo sobre tokens ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

Você pode acessar um método instanciado do contrato inteligente para o qual forneceu o ABI. Exemplo: `yourContract.methods.methodname`. Usando a função `call` você receberá o resultado da execução da função.

```js
daiToken.methods.balanceOf(senderAddress).call(função (err, res) {
  if (err) {
    console.log("Um erro ocorreu", err)
    return
  }
  console.log("O saldo é: ", res)
})
```

Lembre-se que DAI ERC20 tem 18 decimais, o que significa que você precisa remover 18 zeros para obter o valor correto. uint256 são retornados como cadeias de caracteres, pois o JavaScript não lida com grandes valores numéricos. Se não tiver certeza [de como lidar com grandes números em JS, verifique nosso tutorial sobre bignumber.js](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Enviar: enviando transação para uma função de contrato inteligente {#send-sending-a-transaction-to-a-smart-contract-function}

Para o segundo exemplo, chamaremos a função de transferência do contrato inteligente DAI para enviar 10 DAI para o nosso segundo endereço. A função de transferência aceita dois parâmetros: o endereço do destinatário e a quantidade de token para transferências:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("An error occured", err)
      return
    }
    console.log("Hash of the transaction: " + res)
  })
```

A função de chamada retorna o hash da transação que será minerada no blockchain. No Ethereum, hashes de transação são previsívei. É assim que podemos obter o hash da transação antes de ela ser executada ([saiba aqui como os hashes são calculados](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

Como função só envia a transação para a blockchain, não podemos ver o resultado até sabermos quando ela é minerada e incluída na blockchain. No próximo tutorial, aprenderemos [como aguardar por uma transação que será executada na blockchain com base no hash dela](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).
