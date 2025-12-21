---
title: Configurar web3.js para usar la cadena de bloques de Ethereum en JavaScript
description: Aprenda cómo configurar la librería web3.js para interactuar con la cadena de bloques de Ethereum desde aplicaciones de JavaScript.
author: "jdourlens"
tags: [ "web3.js", "JavaScript" ]
skill: beginner
lang: es
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

En este tutorial, veremos cómo empezar con [web3.js](https://web3js.readthedocs.io/) para interactuar con la cadena de bloques de Ethereum. Web3.js se puede utilizar tanto en frontends como en backends para leer datos de la cadena de bloques, realizar transacciones e incluso implementar contratos inteligentes.

El primer paso es incluir web3.js en su proyecto. Para usarlo en una página web, puede importar la biblioteca directamente usando una CDN como JSDeliver.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

Si prefiere instalar la biblioteca para usarla en su backend o en un proyecto de frontend que use un proceso de compilación, puede instalarla usando npm:

```bash
npm install web3 --save
```

Luego, para importar Web3.js en un script de Node.js o en un proyecto de frontend de Browserify, puede utilizar la siguiente línea de JavaScript:

```js
const Web3 = require("web3")
```

Ahora que hemos incluido la biblioteca en el proyecto, necesitamos inicializarla. Su proyecto necesita poder comunicarse con la cadena de bloques. La mayoría de las bibliotecas de Ethereum se comunican con un [nodo](/developers/docs/nodes-and-clients/) a través de llamadas RPC. Para iniciar nuestro proveedor de Web3, crearemos una instancia de Web3 pasando como constructor la URL del proveedor. Si tiene un nodo o una [instancia de ganache ejecutándose en su computadora](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/), se verá así:

```js
const web3 = new Web3("http://localhost:8545")
```

Si desea acceder directamente a un nodo alojado, puede encontrar opciones en [nodos como servicio](/developers/docs/nodes-and-clients/nodes-as-a-service).

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

Para probar que hemos configurado correctamente nuestra instancia de Web3, intentaremos recuperar el número del último bloque usando la función `getBlockNumber`. Esta función acepta una devolución de llamada como parámetro y devuelve el número de bloque como un número entero.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

Si ejecuta este programa, simplemente imprimirá el último número de bloque: la parte superior de la cadena de bloques. También puede usar llamadas a funciones `await/async` para evitar anidar devoluciones de llamada en su código:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Puede ver todas las funciones disponibles en la instancia de Web3 en [la documentación oficial de web3.js](https://docs.web3js.org/).

La mayoría de las bibliotecas Web3 son asíncronas porque, en segundo plano, la biblioteca realiza llamadas JSON-RPC al nodo que devuelve el resultado.

<Divider />

Si está trabajando en el navegador, algunas billeteras inyectan directamente una instancia de Web3 y debería tratar de usarla siempre que sea posible, especialmente si planea interactuar con la dirección de Ethereum del usuario para realizar transacciones.

Este es el fragmento de código para detectar si una billetera de MetaMask está disponible e intentar activarla si lo está. Más adelante, esto le permitirá leer el saldo del usuario y habilitarlo para que valide las transacciones que usted desee que realice en la cadena de bloques de Ethereum:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // Solicitar acceso a la cuenta si es necesario
    await window.ethereum.enable()
    // Cuentas ahora expuestas
  } catch (error) {
    // El usuario denegó el acceso a la cuenta...
  }
}
```

Existen alternativas a web3.js, como [Ethers.js](https://docs.ethers.io/), que también se usan con frecuencia. En el próximo tutorial, veremos [cómo escuchar fácilmente los nuevos bloques que llegan a la cadena de bloques y ver qué contienen](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/).
