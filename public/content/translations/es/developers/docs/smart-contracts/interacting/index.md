---
title: Interactuar con contratos inteligentes
description: Aprende a leer y escribir en contratos inteligentes que ya están desplegados en Ethereum.
lang: es
---

No siempre necesitas escribir y desplegar tu propio contrato inteligente. La mayoría de las veces, como desarrollador, querrás interactuar con contratos inteligentes que otros ya han desplegado en la red Ethereum.

Esta página cubre las dos formas fundamentales de interactuar con un contrato inteligente (la **lectura** y la **escritura** de datos) y las herramientas que necesitas para hacer ambas cosas.

## Requisitos previos {#prerequisites}

Deberías entender:

- [Cómo funcionan los contratos inteligentes](/developers/docs/smart-contracts/)
- [Las cuentas de Ethereum y cómo firman transacciones](/developers/docs/accounts/)
- [Qué es una transacción](/developers/docs/transactions/)

## Dos formas de interactuar con un contrato inteligente {#two-ways}

La interacción con un contrato inteligente se divide en dos categorías:

### Leer de un contrato {#reading-from-a-contract}

La lectura es una operación **gratuita** que no crea una transacción y no cambia ningún estado en la cadena de bloques.

Cuando lees de un contrato, simplemente estás consultando datos que ya existen. Por ejemplo:

- Comprobar el saldo de un token ERC-20
- Leer el precio actual de un intercambio descentralizado
- Obtener el propietario de un NFT

Debido a que las lecturas no modifican el estado, no cuestan [gas](/developers/docs/gas/) y pueden ser realizadas por cualquier persona sin necesidad de ETH.

### Escribir en un contrato {#writing-to-a-contract}

La escritura es una operación que **cambia el estado**, requiere una transacción y cuesta gas.

Cuando escribes en un contrato, estás activando una función que modifica el estado de la cadena de bloques. Por ejemplo:

- Transferir tokens
- Intercambiar tokens en un intercambio descentralizado
- Acuñar un NFT

La escritura siempre requiere:

1. Una [cuenta de propiedad externa (EOA)](/developers/docs/accounts/#types-of-account) con suficiente ETH para el gas
2. Una transacción firmada por la clave privada de la cuenta
3. Que la transacción sea minada e incluida en un bloque

Con la [abstracción de cuentas](/roadmap/account-abstraction/), una cuenta de contrato inteligente también puede iniciar escrituras, y un pagador puede cubrir el gas en nombre del usuario, por lo que no es estrictamente necesaria una EOA que contenga ETH.

## Entender las ABI de los contratos {#understanding-contract-abis}

Para interactuar con un contrato inteligente, tu aplicación necesita saber *qué* puede hacer el contrato. Aquí es donde entra en juego la **Interfaz Binaria de Aplicación (ABI)**.

Una ABI es un documento JSON que describe:

- Cada función que expone el contrato (nombre, entradas, salidas)
- Cada evento que el contrato puede emitir
- Cómo codificar y decodificar datos al comunicarse con el contrato

Piensa en la ABI como el manual de instrucciones del contrato: sin ella, tu aplicación no sabe qué funciones existen o qué parámetros esperan.

### Dónde encontrar la ABI de un contrato {#where-to-find-abis}

- **Contratos verificados en Etherscan**: [Etherscan](https://etherscan.io) expone automáticamente la ABI para el código fuente verificado
- **Del desarrollador**: muchos proyectos publican sus ABI en su documentación o en paquetes npm
- **Generar desde el código fuente**: si tienes el código fuente en Solidity, puedes [compilarlo](/developers/docs/smart-contracts/compiling/) para producir la ABI

## Herramientas y bibliotecas para interactuar con contratos {#tools-and-libraries}

Los desarrolladores suelen utilizar una biblioteca de JavaScript/TypeScript para interactuar con los contratos desde una aplicación web, un backend o un script.

### Bibliotecas de cliente (JavaScript/TypeScript) {#client-libraries}

- **[Viem](https://viem.sh)**: interfaz moderna y ligera de TypeScript para Ethereum con seguridad de tipos de primera clase
- **[ethers.js](https://docs.ethers.org/)**: biblioteca probada en batalla para interactuar con la cadena de bloques de Ethereum
- **[web3.js](https://web3js.org/)**: la API original de JavaScript para Ethereum

### Bibliotecas de backend {#backend-libraries}

- **[ethers.js](https://docs.ethers.org/)**: también funciona en Node.js para scripts y bots del lado del servidor
- **[web3.py](https://web3py.readthedocs.io/)**: biblioteca de Python para la interacción con Ethereum
- **[go-ethereum](https://geth.ethereum.org/docs/interact-with-geth)**: biblioteca oficial de Go del equipo de Geth

### Ejemplo: leer el saldo de un token con Viem {#example-viem}

```ts
import { createPublicClient, http, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

// Dirección del contrato de USDC y ABI (parcial, para balanceOf)
const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const abi = [{
  name: 'balanceOf',
  type: 'function',
  stateMutability: 'view',
  inputs: [{ name: 'account', type: 'address' }],
  outputs: [{ name: '', type: 'uint256' }],
}] as const

const client = createPublicClient({ chain: mainnet, transport: http() })

const balance = await client.readContract({
  address: USDC,
  abi,
  functionName: 'balanceOf',
  args: ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'], // vitalik.eth
})

console.log(formatUnits(balance, 6)) // USDC tiene 6 decimales
```

### Ejemplo: enviar una transacción con ethers.js {#example-ethers}

```js
const { ethers } = require('ethers')

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// ABI de transferencia ERC-20
const abi = ['function transfer(address to, uint256 amount) returns (bool)']
const contract = new ethers.Contract(tokenAddress, abi, wallet)

const tx = await contract.transfer(recipient, ethers.parseUnits('10', 18))
await tx.wait() // esperar a que la transacción sea minada
console.log(`Transferred! TX: ${tx.hash}`)
```

## Eventos y registros {#events-and-logs}

Los contratos inteligentes pueden emitir **eventos** para señalar que algo ha sucedido. Tu aplicación puede escuchar estos eventos para reaccionar en tiempo real.

```ts
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

// Observar los eventos de transferencia de USDC
const unwatch = client.watchEvent({
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  onLogs: (logs) => console.log(logs),
})
```

## Simular transacciones {#simulating}

Antes de enviar una transacción, puedes **simularla** para comprobar si tendría éxito (y para ver su valor de retorno) sin gastar gas. Esto es útil para detectar errores a tiempo y para previsualizar los resultados.

La mayoría de las bibliotecas de cliente admiten esto a través de `eth_call`:

```ts
// Con Viem
const result = await client.simulateContract({
  address: contractAddress,
  abi,
  functionName: 'swap',
  args: [amountIn],
  account: userAddress,
})
```

## Billeteras y firmas {#wallets-and-signing}

En una aplicación descentralizada (dapp), la billetera del usuario (como MetaMask, Rainbow o WalletConnect) se encarga de la firma. No gestionas las claves privadas directamente.

Las [bibliotecas de billeteras y herramientas de conexión](/developers/docs/apis/javascript/) abstraen esto para que puedas centrarte en construir la lógica de tu aplicación.

## Tutoriales relacionados {#related-tutorials}

- [Llamar a un contrato inteligente desde JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/)
- [Enviar transacciones usando web3.js y Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [Cómo ver tu NFT en tu billetera](/developers/tutorials/how-to-view-nft-in-metamask/)

## Lecturas adicionales {#further-reading}

- [Documentación de Viem: Leer y escribir en contratos](https://viem.sh/docs/contract/readContract)
- [Documentación de ethers.js: Contratos](https://docs.ethers.org/v6/api/contract/)
- [Especificación de la ABI de Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html)
- [¿Qué es una ABI? - Alchemy](https://www.alchemy.com/overviews/what-is-an-abi)

## Temas relacionados {#related-topics}

- [Compilación de contratos inteligentes](/developers/docs/smart-contracts/compiling/)
- [Desplegar contratos inteligentes](/developers/docs/smart-contracts/deploying/)
- [API de JavaScript](/developers/docs/apis/javascript/)
- [API de backend](/developers/docs/apis/backend/)