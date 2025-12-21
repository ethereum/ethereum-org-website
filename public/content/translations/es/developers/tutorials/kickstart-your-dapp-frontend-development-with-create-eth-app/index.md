---
title: Ponga en marcha el desarrollo frontend de su dapp con create-eth-app
description: "Un resumen de cómo usar create-eth-app y sus características"
author: "Markus Waas"
tags:
  [
    "frontend",
    "JavaScript",
    "ethers.js",
    "The Graph",
    "defi"
  ]
skill: beginner
lang: es
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

La última vez que analizamos [el panorama general de Solidity](https://soliditydeveloper.com/solidity-overview-2020) ya mencionamos [create-eth-app](https://github.com/PaulRBerg/create-eth-app). Ahora descubrirá cómo usarla, qué características tiene integradas e ideas adicionales sobre cómo ampliarla. Iniciada por Paul Razvan Berg, el fundador de [Sablier](http://sablier.com/), esta aplicación impulsará su desarrollo frontend y viene con varias integraciones opcionales para elegir.

## Instalación {#installation}

La instalación requiere Yarn 0.25 o superior (`npm install yarn --global`). Es tan simple como ejecutar:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Utiliza [create-react-app](https://github.com/facebook/create-react-app) de forma interna. Para ver su aplicación, abra `http://localhost:3000/`. Cuando esté listo para implementar en producción, cree un paquete minificado con yarn build. Una forma fácil de alojar esto sería [Netlify](https://www.netlify.com/). ¡Puede crear un repositorio de GitHub, añadirlo a Netlify, configurar el comando de compilación y listo! Su aplicación será alojada y podrá ser utilizada por todo el mundo. Y todo de forma gratuita.

## Características {#features}

### React y create-react-app {#react--create-react-app}

En primer lugar, el corazón de la aplicación: React y todas las características adicionales que vienen con _create-react-app_. Usar solo esto es una gran opción si no desea integrar Ethereum. [React](https://react.dev/) en sí mismo hace que la creación de interfaces de usuario interactivas sea realmente fácil. Puede que no sea tan fácil para principiantes como [Vue](https://vuejs.org/), pero sigue siendo el más utilizado, tiene más características y, lo que es más importante, miles de librerías adicionales para elegir. El _create-react-app_ también facilita mucho el comienzo e incluye:

- Compatibilidad con la sintaxis de React, JSX, ES6, TypeScript y Flow.
- Extras del lenguaje más allá de ES6, como el operador de propagación de objetos.
- CSS con prefijos automáticos, por lo que no necesita -webkit- u otros prefijos.
- Un ejecutor de pruebas unitarias rápido e interactivo con soporte integrado para informes de cobertura.
- Un servidor de desarrollo en vivo que advierte sobre errores comunes.
- Un script de compilación para empaquetar JS, CSS e imágenes para producción, con hashes y sourcemaps.

La _create-eth-app_ en particular hace uso de los nuevos [efectos de los hooks](https://legacy.reactjs.org/docs/hooks-effect.html). Un método para escribir componentes potentes, pero muy pequeños, llamados componentes funcionales. Consulte la sección de Apollo a continuación para ver cómo se utilizan en _create-eth-app_.

### Espacios de trabajo de Yarn {#yarn-workspaces}

Los [espacios de trabajo de Yarn](https://classic.yarnpkg.com/en/docs/workspaces/) le permiten tener varios paquetes, pero con la capacidad de administrarlos todos desde la carpeta raíz e instalar las dependencias para todos a la vez usando `yarn install`. Esto tiene especial sentido para paquetes adicionales más pequeños como la gestión de direcciones/ABI de contratos inteligentes (la información sobre dónde implementó qué contratos inteligentes y cómo comunicarse con ellos) o la integración de grafos, ambos parte de `create-eth-app`.

### ethers.js {#ethersjs}

Aunque [Web3](https://docs.web3js.org/) sigue siendo el más utilizado, [ethers.js](https://docs.ethers.io/) ha ganado mucha más tracción como alternativa en el último año y es el que está integrado en _create-eth-app_. Puede trabajar con este, cambiarlo a Web3 o considerar la posibilidad de actualizar a [ethers.js v5](https://docs.ethers.org/v5/), que ya casi ha salido de la versión beta.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/) es una forma alternativa de manejar datos en comparación con una [API RESTful](https://restfulapi.net/). Tienen varias ventajas sobre las API RESTful, especialmente para los datos descentralizados de la cadena de bloques. Si le interesa el razonamiento que hay detrás de esto, eche un vistazo a [GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a).

Normalmente, obtendría los datos de su contrato inteligente directamente. ¿Quiere leer la hora de la última operación? Solo tiene que llamar a `MyContract.methods.latestTradeTime().call()`, que obtiene los datos de un nodo de Ethereum y los envía a su dapp. Pero, ¿y si necesita cientos de puntos de datos diferentes? Eso daría lugar a cientos de recuperaciones de datos al nodo, cada una de las cuales requeriría un [RTT](https://wikipedia.org/wiki/Round-trip_delay_time), lo que haría que su dapp fuera lenta e ineficiente. Una solución podría ser una función de llamada de obtención dentro de su contrato que devuelva varios datos a la vez. Sin embargo, esto no siempre es lo ideal.

Y puede que también le interesen los datos históricos. Usted querrá saber no solo la hora de la última operación, sino las horas de todas las operaciones que ha realizado. Utilice el paquete de subgrafos _create-eth-app_, lea la [documentación](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph) y adáptelo a sus propios contratos. Si está buscando contratos inteligentes populares, puede que ya exista un subgrafo. Eche un vistazo al [explorador de subgrafos](https://thegraph.com/explorer/).

Una vez que tenga un subgrafo, este le permite escribir una consulta simple en su dapp que recupera todos los datos importantes de la cadena de bloques, incluidos los históricos que necesita, con una sola recuperación.

### Apollo {#apollo}

Gracias a la integración de [Apollo Boost](https://www.apollographql.com/docs/react/get-started/), puede integrar fácilmente el grafo en su dapp de React. Especialmente cuando se utilizan los [hooks de React y Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks), obtener datos es tan simple como escribir una única consulta de GraphQL en su componente:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Plantillas {#templates}

Además, puede elegir entre varias plantillas diferentes. Hasta ahora puede utilizar una integración de Aave, Compound, UniSwap o sablier. Todas ellas añaden importantes direcciones de contratos inteligentes de servicios junto con integraciones de subgrafos pre-hechas. Solo tiene que añadir la plantilla al comando de creación como `yarn create eth-app my-eth-app --with-template aave`.

### Aave {#aave}

[Aave](https://aave.com/) es un mercado descentralizado de préstamos de dinero. Los depositantes proporcionan liquidez al mercado para obtener ingresos pasivos, mientras que los prestatarios pueden pedir préstamos utilizando garantías. Una característica única de Aave son los [préstamos flash](https://aave.com/docs/developers/flash-loans) que le permiten pedir dinero prestado sin ninguna garantía, siempre que devuelva el préstamo en una sola transacción. Esto puede ser útil, por ejemplo, para darle dinero extra en las operaciones de arbitraje.

Los tókenes intercambiados que le generan intereses se denominan _aTokens_.

Cuando elige integrar Aave con _create-eth-app_, obtendrá una [integración de subgrafo](https://docs.aave.com/developers/getting-started/using-graphql). Aave utiliza The Graph y ya le proporciona varios subgrafos listos para usar en [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) y en la [red principal](https://thegraph.com/explorer/subgraph/aave/protocol) en formato [sin procesar](https://thegraph.com/explorer/subgraph/aave/protocol-raw) o [con formato](https://thegraph.com/explorer/subgraph/aave/protocol).

![Meme del préstamo flash de Aave: «Sí, si pudiera mantener mi préstamo flash durante más de una transacción, sería genial»](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) es similar a Aave. La integración ya incluye el nuevo [Subgrafo v2 de Compound](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195). Sorprendentemente, los tókenes que generan intereses aquí se llaman _cTokens_.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) es un exchange descentralizado (DEX). Los proveedores de liquidez pueden ganar comisiones proporcionando los tókenes o el ether necesarios para ambos lados de una operación. Es muy utilizado y, por lo tanto, tiene una de las mayores liquidez para una gama muy amplia de tókenes. Puede integrarlo fácilmente en su dapp para, por ejemplo, permitir a los usuarios intercambiar su ETH por DAI.

Lamentablemente, en el momento de escribir este artículo, la integración es solo para Uniswap v1 y no para la [versión v2 recién lanzada](https://uniswap.org/blog/uniswap-v2/).

### Sablier {#sablier}

[Sablier](https://sablier.com/) permite a los usuarios realizar pagos de dinero en streaming. En lugar de un único día de pago, usted recibe su dinero constantemente sin más administración después de la configuración inicial. La integración incluye su [propio subgrafo](https://thegraph.com/explorer/subgraph/sablierhq/sablier).

## ¿Y ahora qué? {#whats-next}

Si tiene preguntas sobre _create-eth-app_, vaya al [servidor de la comunidad de Sablier](https://discord.gg/bsS8T47), donde podrá ponerse en contacto con los autores de _create-eth-app_. Como primeros pasos, es posible que desee integrar un marco de interfaz de usuario como [Material UI](https://mui.com/material-ui/), escribir consultas GraphQL para los datos que realmente necesita y configurar la implementación.
