---
title: Ejecutar un contrato inteligente desde JavaScript
description: Como ejecutar una función de un contrato inteligente desde JavaScript usando un token Dai
author: jdourlens
tags:
  - "transacciones"
  - "frontend"
  - "JavaScript"
  - "web3.js"
skill: beginner
lang: es
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/ejecutar-un-smart-contract-desde-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

En este tutorial veremos cómo llamar a una función de un [contrato inteligente](/developers/docs/smart-contracts/) desde JavaScript. Lo primero es conocer el estado de un contrato inteligente (p. ej., el saldo de una cuenta ERC20). A continuación, modificaremos el estado de la cadena de bloques haciendo una transferencia de tókenes. Debería estar familiarizado con [cómo configurar un entorno JS para interactuar con la cadena de bloques](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/).

Para estos ejemplos jugaremos con el token DAI. Para las pruebas haremos una copia de la cadena de bloques usando ganache-cli y desbloquearemos una dirección que tiene muchos DAI:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[TU CLAVE INFURA] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Para interactuar con un contrato inteligente necesitaremos su dirección y una interfaz ABI:

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

Para este proyecto, hemos simplificado toda la interfaz ABI de ERC20 manteniendo solo las funciones `balanceOf` y `transfer`. Puede encontrar [la interfaz ABI ERC20 completa aquí](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

A continuación tenemos que instanciar nuestro contrato inteligente:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

También configuraremos dos direcciones:

- quién recibirá la transferencia y
- la que ya hemos desbloqueado que la enviará:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

A continuación, recurriremos a la función `balanceOf` para recuperar la cantidad actual de tókenes que tienen ambas direcciones.

## Consulta: Obtener el valor de una variable de un contrato inteligente {#call-reading-value-from-a-smart-contract}

El primer ejemplo recurrirá a un método «constante» y lo ejecutará en la EVM sin realizar ninguna transacción. Para ello, leeremos el balance ERC20 de una dirección. [Lea nuestro artículo sobre los tókenes ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

Puede acceder a los métodos de un contrato inteligente mediante la interfaz ABI de la siguiente manera: `yourContract.methods.methodname`. Utilizando la función `call` comprobará el resultado de ejecutar la función.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("Ha ocurrido un error", err)
    return
  }
  console.log("El balance es: ", res)
})
```

Recuerde que DAI ERC20 tiene 18 decimales, lo que significa que necesita eliminar 18 ceros para obtener la cantidad correcta. uint256 aparecen como cadenas, ya que JavaScript no gestiona grandes valores numéricos. Si no está seguro de [cómo tratar con números grandes en JS, revise nuestro tutorial bignumber.js](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Enviar: Enviar una transacción a una función de un contrato inteligente {#send-sending-a-transaction-to-a-smart-contract-function}

Para el segundo ejemplo, recurriremos a la función de transferencia del contrato inteligente DAI para enviar 10 DAI a nuestra segunda dirección. La función de transferencia acepta dos parámetros: la dirección del destinatario y la cantidad de token por transferir:

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

La función de ejecución da como resultado la inclusión del hash de la transacción en la cadena de bloques. En Ethereum, los hash de la transacción son predecibles: así es como podemos obtener el hash de la transacción antes de que se ejecute ([cómo se calculan los hash](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

No se podrá ver el resultado hasta que la transacción se incluya en la cadena de bloques. En el siguiente tutorial, aprenderemos [cómo esperar a que una transacción se ejecute en la cadena de bloques conociendo su hash](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).
