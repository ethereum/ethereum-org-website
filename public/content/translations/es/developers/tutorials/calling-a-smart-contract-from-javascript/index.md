---
title: Llamar a un contrato inteligente desde JavaScript
description: Cómo llamar a una función de un contrato inteligente desde JavaScript usando un ejemplo del token Dai
author: jdourlens
tags: [ "transacciones", "frontend", "JavaScript", "web3.js" ]
skill: beginner
lang: es
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

En este tutorial veremos cómo llamar a una función de un [contrato inteligente](/developers/docs/smart-contracts/) desde JavaScript. Primero, leeremos el estado de un contrato inteligente (p. ej., el saldo de un titular de ERC20); después, modificaremos el estado de la blockchain realizando una transferencia de tokens. Ya debería estar familiarizado con [cómo configurar un entorno de JS para interactuar con la blockchain](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/).

Para este ejemplo, trabajaremos con el token DAI. A efectos de prueba, bifurcaremos la blockchain con ganache-cli y desbloquearemos una dirección que ya tenga muchos DAI:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[SU CLAVE DE INFURA] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Para interactuar con un contrato inteligente, necesitaremos su dirección y su ABI:

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

Para este proyecto, hemos simplificado la ABI de ERC20 completa para mantener solo las funciones `balanceOf` y `transfer`, pero puede encontrar [la ABI de ERC20 completa aquí](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

Luego, necesitamos instanciar nuestro contrato inteligente:

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

En la siguiente parte, llamaremos a la función `balanceOf` para obtener la cantidad actual de tokens que poseen ambas direcciones.

## Llamada: leer un valor de un contrato inteligente {#call-reading-value-from-a-smart-contract}

El primer ejemplo llamará a un método «constante» y ejecutará su método de contrato inteligente en la EVM sin enviar ninguna transacción. Para esto, leeremos el saldo de ERC20 de una dirección. [Lea nuestro artículo sobre los tokens ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

Puede acceder a los métodos de un contrato inteligente instanciado para el que proporcionó la ABI de la siguiente manera: `yourContract.methods.methodname`. Al usar la función `call`, recibirá el resultado de la ejecución de la función.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("Ocurrió un error", err)
    return
  }
  console.log("El saldo es: ", res)
})
```

Recuerde que el DAI ERC20 tiene 18 decimales, lo que significa que necesita eliminar 18 ceros para obtener la cantidad correcta. Los valores `uint256` se devuelven como cadenas, ya que JavaScript no maneja valores numéricos grandes. Si no está seguro de [cómo manejar números grandes en JS, consulte nuestro tutorial sobre bignumber.js](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Envío: enviar una transacción a la función de un contrato inteligente {#send-sending-a-transaction-to-a-smart-contract-function}

Para el segundo ejemplo, llamaremos a la función de transferencia del contrato inteligente de DAI para enviar 10 DAI a nuestra segunda dirección. La función de transferencia acepta dos parámetros: la dirección del destinatario y la cantidad de tokens a transferir:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("Ocurrió un error", err)
      return
    }
    console.log("Hash de la transacción: " + res)
  })
```

La llamada a la función devuelve el hash de la transacción que se minará en la blockchain. En Ethereum, los hashes de las transacciones son predecibles; así es como podemos obtener el hash de la transacción antes de que se ejecute ([aprenda aquí cómo se calculan los hashes](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

Como la función solo envía la transacción a la blockchain, no podemos ver el resultado hasta que sepamos cuándo se mina y se incluye en la blockchain. En el próximo tutorial, aprenderemos [cómo esperar a que se ejecute una transacción en la blockchain conociendo su hash](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).
