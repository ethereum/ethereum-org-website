---
title: Configura web3.js para utilizar el blockchain de Ethereum en JavaScript
description: Cómo usar un contrato inteligente para interactuar con un token a través del lenguaje Solidity.
author: "jdourlens"
tags:
  - "web3.js"
  - "javascript"
skill: beginner
lang: es
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

En este tutorial, veremos cómo comenzar con [web3.js](https://web3js.readthedocs.io/) para interactuar con el blockchain de Ethereum. Web3.js se puede utilizar tanto en frontends como en backends para leer datos del blockchain, realizar transacciones e incluso implementar smart contracts.

El primer paso es incluir web3.js en tu proyecto. Para usarlo en una página web, puedes importar la biblioteca directamente usando un CDN como JSDelivr.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

Si prefieres instalar la biblioteca para usarla en un proyecto de backend o frontend que usa compilación, puedes instalarla usando npm:

```bash
npm install web3 --save
```

Luego, para importar Web3.js a una secuencia de comandos de Node.js o a un proyecto de frontend de Browserify, puedes utilizar la siguiente línea de JavaScript:

```js
const Web3 = require("web3")
```

Ahora que incluimos la librería en el proyecto, necesitamos inicializarla. Tu proyecto necesita ser capaz de comunicarse con cadena de bloques. La mayoría de las bibliotecas de Ethereum se comunican con un [nodo](/developers/docs/nodes-and-clients/) a través de llamadas RPC. Para iniciar nuestro proveedor de web3, crearemos una instancia de Web3 pasando como constructor el URL del proveedor. Si tienes un nodo o una [instancia de ganache ejecutándose en tu computadora](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/), se verá así:

```js
const web3 = new Web3("http://localhost:8545")
```

Si te gustaría acceder directamente a un nodo rentado, puedes encontrar opciones en [ nodos como servicio.](/developers/docs/nodes-and-clients/nodes-as-a-service).

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

Para probar que nuestra instancia Web3 se ha configurado correctamente, trataremos de recuperar el último número de bloque usando la función `getBlockNumber`. Esta función acepta una devolución de llamada como parámetro y devuelve el número de bloque como un número entero.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

Si ejecutas este programa, simplemente imprimirá el último número de bloque: la parte superior del blockchain. También puedes usar las llamadas de función `await/async` para evitar anidar las devoluciones de llamadas en el código:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Puedes ver todas las funciones disponibles en la instancia Web3 en [la documentación oficial de web3.js](https://docs.web3js.org/).

La mayoría de las bibliotecas Web3 son asíncronas porque, en segundo plano, la biblioteca realiza llamadas JSON RPC al nodo que devuelve el resultado.

<Divider />

Si estás trabajando en el navegador, algunas billeteras inyectan directamente una instancia Web3 y deberías tratar de usarla cuando sea posible, especialmente si planeas interactuar con la dirección Ethereum del usuario para hacer transacciones.

Aquí está el fragmento para detectar si una billetera MetaMask está disponible y probar activarla si lo está. Más tarde, te permitirá leer el saldo del usuario y permitirle validar las transacciones que te gustaría que hicieran en el blockchain de Ethereum:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // Request account access if needed
    await window.ethereum.enable()
    // Accounts now exposed
  } catch (error) {
    // User denied account access...
  }
}
```

Existen alternativas a web3.js como [Ethers.js](https://docs.ethers.io/) y son muy usadas. En el siguiente tutorial, veremos [cómo escuchar fácilmente los nuevos bloques entrantes en el blockchain y ver lo que contienen](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/).
