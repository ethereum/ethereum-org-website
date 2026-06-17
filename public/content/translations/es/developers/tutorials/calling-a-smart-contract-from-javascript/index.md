---
title: Llamar a un contrato inteligente desde JavaScript
description: Cómo llamar a una función de un contrato inteligente desde JavaScript usando un ejemplo con el token DAI
author: jdourlens
tags:
  - transacciones
  - frontend
  - JavaScript
  - web3.js
skill: beginner
breadcrumb: Llamar a contratos desde JS
lang: es
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

En este tutorial veremos cómo llamar a una función de un [contrato inteligente](/developers/docs/smart-contracts/) desde JavaScript. Primero leeremos el estado de un contrato inteligente (por ejemplo, el saldo de un titular de ERC-20), luego modificaremos el estado de la cadena de bloques realizando una transferencia de tokens. Ya deberías estar familiarizado con la [configuración de un entorno JS para interactuar con la cadena de bloques](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/).

Para este ejemplo jugaremos con el token DAI. Con fines de prueba, haremos una bifurcación de la cadena de bloques usando ganache-cli y desbloquearemos una dirección que ya tiene muchos DAI:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Para interactuar con un contrato inteligente necesitaremos su dirección y su ABI:

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

Para este proyecto, hemos reducido el ABI completo de ERC-20 para mantener solo las funciones `balanceOf` y `transfer`, pero puedes encontrar [el ABI completo de ERC-20 aquí](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

A continuación, necesitamos instanciar nuestro contrato inteligente:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

También configuraremos dos direcciones:

- la que recibirá la transferencia y
- la que ya hemos desbloqueado que la enviará:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

En la siguiente parte llamaremos a la función `balanceOf` para recuperar la cantidad actual de tokens que tienen ambas direcciones.

## Call: Leer un valor de un contrato inteligente {#call-reading-value-from-a-smart-contract}

El primer ejemplo llamará a un método «constante» y ejecutará su método de contrato inteligente en la EVM sin enviar ninguna transacción. Para esto leeremos el saldo ERC-20 de una dirección. [Lee nuestro artículo sobre los tokens ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

Puedes acceder a los métodos de un contrato inteligente instanciado para el que proporcionaste el ABI de la siguiente manera: `yourContract.methods.methodname`. Al usar la función `call`, recibirás el resultado de la ejecución de la función.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occurred", err)
    return
  }
  console.log("The balance is: ", res)
})
```

Recuerda que el ERC-20 de DAI tiene 18 decimales, lo que significa que necesitas eliminar 18 ceros para obtener la cantidad correcta. Los uint256 se devuelven como cadenas de texto (strings) ya que JavaScript no maneja valores numéricos grandes. Si no estás seguro de [cómo lidiar con números grandes en JS, consulta nuestro tutorial sobre bignumber.js](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Send: Enviar una transacción a una función de un contrato inteligente {#send-sending-a-transaction-to-a-smart-contract-function}

Para el segundo ejemplo, llamaremos a la función transfer del contrato inteligente de DAI para enviar 10 DAI a nuestra segunda dirección. La función transfer acepta dos parámetros: la dirección del destinatario y la cantidad de tokens a transferir:

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

La función de llamada devuelve el hash de la transacción que será minada en la cadena de bloques. En Ethereum, los hashes de las transacciones son predecibles; así es como podemos obtener el hash de la transacción antes de que se ejecute ([aprende cómo se calculan los hashes aquí](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

Como la función solo envía la transacción a la cadena de bloques, no podemos ver el resultado hasta que sepamos cuándo se mina y se incluye en la cadena de bloques. En el siguiente tutorial aprenderemos [cómo esperar a que una transacción se ejecute en la cadena de bloques conociendo su hash](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).