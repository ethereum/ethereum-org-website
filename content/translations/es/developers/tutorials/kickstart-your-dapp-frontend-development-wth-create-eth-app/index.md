---
title: Comience a desarrollar DApp frontend con create-eth-app
description: Un resumen de cómo usar create-eth-app y sus aplicaciones
author: "Markus Waas"
tags:
  - "crear-eth-app"
  - "interfaz"
  - "javascript"
  - "ethers.js"
  - "The Graph"
  - "defi"
skill: beginner
lang: es
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

En el artículo anterior revisamos [el panorama global de Solidity](https://soliditydeveloper.com/solidity-overview-2020) y mencionamos [create-eth-app](https://github.com/PaulRBerg/create-eth-app). Ahora descubrirá como usarla y qué aplicaciones tiene integradas, además de otras ideas para ampliar su utilidad. Lanzada por Paul Razvan Berg, el fundador de [Sablier](http://sablier.com/), esta aplicación le permitirá comenzar su desarrollo en el frontend y tiene varias integraciones entre las que podrá seleccionar.

## Instalación {#installation}

La instalación requiere Yarn 0.25 o una versión más reciente (`npm install yarn --global`). Es tan simple como ejecutar:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Esto usa [create-react-app](https://github.com/facebook/create-react-app) implicitamente. Para ver su app, navegue a `http://localhost:3000/`. Cuando esté listo para empezar con la producción, cree un minipaquete con yarn build. Una posible opción para hospedar esta página es en [Netlify](https://www.netlify.com/). Puede crear un repositorio GitHub, añadirlo a Netlify, configurar el comando de build y ¡ya está! Tu app se hospedará y estará disponible para todos. ¡Y todo ello completamente gratis!

## Características {#features}

### React & create-react-app {#react--create-react-app}

En primer lugar, el núcleo de la aplicación React y todas las características adicionales que provee _create-react-app_. Usar estas tecnologías de por sí es una gran alternativa, incluso si no quiere integrar Ethereum. [React](https://reactjs.org/) hace que construir una interfaz interactiva sea realmente sencillo. Quizá no sea tan fácil para los principiantes como [Vue](https://vuejs.org/), pero es el más usado, tiene más funcionalidades y lo más importante es que tiene miles de bibliotecas disponibles. _Create-react-app_ hace que comenzar sea muy sencillo, al incluir:

- React, JSX, ES6, TypeScript, soporte para sintaxis de Flow.
- Funcionalidades adicionales de programación, como ES6 y posteriores como el operador «spread» para objetos.
- CSS con prefijo automático, para que no tengas que usar Webkit ni ningún otro prefijo.
- Un ejecutor de test unitarios rápido e interactivo con soporte por defecto para informes de cobertura.
- Un servidor de desarrollo que le advierte de errores frecuentes.
- Un script que empaqueta los JS, CSS y las imágenes para produccion, anadiendo hashes y sourcemaps.

_Create-eth-app_ en concreto hace uso del nuevo [efecto «hooks»](https://reactjs.org/docs/hooks-effect.html). Este método permite escribir componentes funcionales muy pequenos y eficaces. En la sección Apollo más abajo, podrá ver cómo se utilizan en _create-eth-app_.

### Espacios de trabajo de Yarn {#yarn-workspaces}

[Los espacios de trabajo de Yarn](https://classic.yarnpkg.com/en/docs/workspaces/) le permiten tener varios paquetes, pero siendo capaz de gestionarlos todos desde la carpeta raíz e instalar dependencias para todos ellos a la vez usando `yarn install`. Esto cobra especial importancia en paquetes adicionales más pequeños, como los usados para gestionar direcciones de contratos inteligentes/ABI (dan información sobre dónde y qué contratos inteligentes implementó y cómo comunicarse con ellos) o la integración de gráficos. Ambos ejemplos son parte de `create-eth-app`.

### ethers.js {#ethersjs}

A pesar de que [Web3](https://docs.web3js.org/) es todavia la opcion más usada, [ethers.js](https://docs.ethers.io/) ha ido ganando terreno como alternativa en el último año y viene integrada en _create-eth-app_. Puede trabajar en ella, cambiarse a Web3 o tal vez plantearse el actualizar a [ethers.js v5](https://docs-beta.ethers.io/) que casi ha dejado de estar en beta.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/) es una alternativa para manejar datos, en vez de la [API Restful](https://restfulapi.net/). Presenta varias ventajas frente a la API Restful, especialmente en lo referente a los datos de la cadena de bloques descentralizada. Si le interesa profundizar más al respecto, eche un vistazo a [GraphQL permitirá la web descentralizada](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a).

Normalmente, conseguirá los datos directamente de su contrato inteligente. ¿Quieres saber la hora de la última operación? Tan solo escriba `MyContract.methods.latestTradeTime().call()` que obtiene los datos de un nodo de Ethereum a su DApp. Pero, ¿qué pasa si se necesitan cientos de puntos de datos diferentes? Eso resultaría en centenares de solicitudes de datos al nodo, con su [RTT](https://wikipedia.org/wiki/Round-trip_delay_time) cada una de ellas, lo que ralentizaría e inutiliaría a su DApp. Una alternativa sería instalar una función de obtención en su contrato que devuelva varios datos a la vez. Aunque no siempre es lo ideal.

O también puede que le interese obtener datos históricos. Quiere saber no sólo la fecha de la última operación, sino también la de todas las operaciones que haya realizado alguna vez. Puede utilizar el paquete de subgrafo de _create-eth-app_, leer la [documentación](https://thegraph.com/docs/define-a-subgraph) y adaptarlo a sus propios contratos. Si busca contratos inteligentes populares, puede que incluso ya exista un subgrafo. Compruebe el [explorador de subgrafo](https://thegraph.com/explorer/).

Una vez tenga un subgrafo, este le permitirá escribir una sencilla consulta en su DApp que recupera todos los datos importantes de la cadena de bloques, incluyendo los datos históricos que necesita, solo con activar esta funcionalidad una vez.

### Apollo {#apollo}

Gracias a la integración con [Apollo Boost](https://www.apollographql.com/docs/react/get-started/), puedes integrar fácilmente el grafo en tu dapp de React. Especialmente al usar [ganchos de React y Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks-676d116eeae2), obtener datos es tan sencillo como escribir una única consulta GraphQL en su componente:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Plantillas {#templates}

Además de eso, puede instalar numerosas plantillas. Hasta el momento, puede utilizar la integración con Aave, Compound, UniSwap o Sablier. Todos aportan importantes servicios con direcciones de contratos inteligentes, además de integraciones con subgrafos listos para utilizarse. Simplemente añada la plantilla al comando de creación, como `yarn create eth-app my-eth-app --with-template aave`.

### Aave {#aave}

[Aave](https://aave.com/) es un mercado descentralizado de préstamo de dinero. Los depositantes proporcionan liquidez al mercado a cambio de obtener ingresos pasivos, mientras que los prestatarios pueden pedir prestado con garantías. Una característica única de Aave son los [préstamos flash](https://docs.aave.com/developers/guides/flash-loans) que le permiten pedir prestado dinero sin ningún tipo de garantía, siempre y cuando lo devuelva en la siguiente transacción. Esto puede ser útil por ejemplo para tener dinero extra para transacciones de arbitrage.

Los tókenes que le han reporado intereses se llaman _aTokens_.

Cuando integra Aave con _create-eth-app_, ya obtiene una [integración de subgrafo](https://docs.aave.com/developers/getting-started/using-graphql) por defecto. Aave usa The Graph y le ofrece varios subgrafos listos para utilizarlos en [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) y la [red principal](https://thegraph.com/explorer/subgraph/aave/protocol) [con](https://thegraph.com/explorer/subgraph/aave/protocol) o [sin](https://thegraph.com/explorer/subgraph/aave/protocol-raw) formato.

![Meme de préstamo Flash Aave – "Síííí, si pudiera mantener mi préstamo flash más de una transacción, sería genial"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) es similar a Aave. La integración ya incluye el nuevo [subgrafo Compound v2](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195). Sorprendentemente, a los tókenes que pueden ganar intereses, aquí se les llama _cTokens_.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) es un sistema de intercambio descentralizado (DEX). Los usuarios que aporten liquidez pueden ganar comisiones, aportando los tókenes o el ether requeridos para ambos lados de una operación. Es de uso generalizado y, por lo tanto, tiene una de las mayores cantidades de liquidez para una gama muy amplia de tókenes. Puede integrarlo fácilmente en su DApp para, por ejemplo, permitir a los usuarios intercambiar sus ETH por DAI.

Por desgracia, al cierre de editorial de este artículo, la integración es sólo para Uniswap v1 y no para el [v2 publicado recientemente](https://uniswap.org/blog/uniswap-v2/).

### Sablier {#sablier}

[Sablier](https://sablier.com/) le permite a los usuarios emitir pagos. En vez de un solo día de pago, puede recibir su dinero constantemente sin ninguna administración adicional después de la configuración inicial. La integración incluye su [propio subgrafo](https://thegraph.com/explorer/subgraph/sablierhq/sablier).

## ¿Y ahora qué? {#whats-next}

Si quiere hacer consultas sobre _create-eth-app_, diríjase al [servidor de la comunidad de Sablier](https://discord.gg/bsS8T47), donde puedes ponerse en contacto con los autores de _create-eth-app_. Como algunos de los próximos pasos que desee dar, es posible que quiera integrar un entorno de desarrollo de IU como [Material UI](https://material-ui.com/), escribir consultas GraphQL de los datos que necesite y preparar la implementación.
