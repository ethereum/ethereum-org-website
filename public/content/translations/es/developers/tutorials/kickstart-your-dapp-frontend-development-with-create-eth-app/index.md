---
title: Impulsa el desarrollo del frontend de tu dapp con create-eth-app
description: "Una descripción general de cómo usar create-eth-app y sus características"
author: "Markus Waas"
tags:
  ["frontend", "JavaScript", "ethers.js", "the graph", "defi"]
skill: beginner
breadcrumb: create-eth-app
lang: es
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

La última vez analizamos [el panorama general de Solidity](https://soliditydeveloper.com/solidity-overview-2020) y ya mencionamos [create-eth-app](https://github.com/PaulRBerg/create-eth-app). Ahora descubrirás cómo usarlo, qué características están integradas e ideas adicionales sobre cómo expandirlo. Iniciada por Paul Razvan Berg, el fundador de [Sablier](https://sablier.com/), esta aplicación impulsará el desarrollo de tu frontend y viene con varias integraciones opcionales para elegir.

## Instalación {#installation}

La instalación requiere Yarn 0.25 o superior (`npm install yarn --global`). Es tan simple como ejecutar:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Utiliza [create-react-app](https://github.com/facebook/create-react-app) internamente. Para ver tu aplicación, abre `http://localhost:3000/`. Cuando estés listo para desplegar en producción, crea un paquete minificado con yarn build. Una forma sencilla de alojar esto sería [Netlify](https://www.netlify.com/). Puedes crear un repositorio en GitHub, añadirlo a Netlify, configurar el comando de compilación y ¡listo! Tu aplicación estará alojada y será utilizable para todos. Y todo ello de forma gratuita.

## Características {#features}

### React y create-react-app {#react--create-react-app}

En primer lugar, el corazón de la aplicación: React y todas las características adicionales que vienen con _create-react-app_. Usar solo esto es una gran opción si no quieres integrar Ethereum. [React](https://react.dev/) en sí hace que la construcción de interfaces de usuario interactivas sea realmente fácil. Puede que no sea tan amigable para principiantes como [Vue](https://vuejs.org/), pero sigue siendo el más utilizado, tiene más características y, lo más importante, miles de bibliotecas adicionales para elegir. _create-react-app_ también hace que sea muy fácil empezar a usarlo e incluye:

- Soporte de sintaxis para React, JSX, ES6, TypeScript y Flow.
- Extras del lenguaje más allá de ES6, como el operador de propagación de objetos (object spread operator).
- CSS con prefijos automáticos, por lo que no necesitas -webkit- u otros prefijos.
- Un ejecutor de pruebas unitarias interactivo y rápido con soporte integrado para informes de cobertura.
- Un servidor de desarrollo en vivo que advierte sobre errores comunes.
- Un script de compilación para empaquetar JS, CSS e imágenes para producción, con hashes y mapas de origen (sourcemaps).

_create-eth-app_ en particular hace uso de los nuevos [efectos de hooks](https://legacy.reactjs.org/docs/hooks-effect.html). Un método para escribir componentes funcionales potentes, pero muy pequeños. Consulta la sección a continuación sobre Apollo para ver cómo se utilizan en _create-eth-app_.

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) te permite tener múltiples paquetes, pero pudiendo gestionarlos todos desde la carpeta raíz e instalando dependencias para todos a la vez usando `yarn install`. Esto tiene especial sentido para paquetes adicionales más pequeños, como la gestión de direcciones/ABI de contratos inteligentes (la información sobre dónde desplegaste qué contratos inteligentes y cómo comunicarte con ellos) o la integración de The Graph, ambos parte de `create-eth-app`.

### ethers.js {#ethersjs}

Aunque [Web3](https://docs.web3js.org/) sigue siendo el más utilizado, [Ethers.js](https://docs.ethers.io/) ha estado ganando mucha más tracción como alternativa en el último año y es el que está integrado en _create-eth-app_. Puedes trabajar con este, cambiarlo a Web3 o considerar actualizar a [Ethers.js v5](https://docs.ethers.org/v5/), que está casi fuera de la fase beta.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/) es una forma alternativa de manejar datos en comparación con una [API RESTful](https://restfulapi.net/). Tienen varias ventajas sobre las API RESTful, especialmente para datos descentralizados de la cadena de bloques. Si te interesa el razonamiento detrás de esto, echa un vistazo a [GraphQL impulsará la web descentralizada](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a).

Por lo general, obtendrías datos de tu contrato inteligente directamente. ¿Quieres leer la hora de la última operación? Simplemente llama a `MyContract.methods.latestTradeTime().call()`, que obtiene los datos de un nodo de Ethereum en tu aplicación descentralizada (dapp). Pero, ¿qué pasa si necesitas cientos de puntos de datos diferentes? Eso resultaría en cientos de solicitudes de datos al nodo, requiriendo cada vez un [RTT](https://wikipedia.org/wiki/Round-trip_delay_time), lo que haría que tu dapp fuera lenta e ineficiente. Una solución alternativa podría ser una función de llamada de obtención (fetcher) dentro de tu contrato que devuelva múltiples datos a la vez. Sin embargo, esto no siempre es ideal.

Y luego, es posible que también te interesen los datos históricos. Quieres saber no solo la hora de la última operación, sino las horas de todas las operaciones que hayas realizado. Usa el paquete de subgrafo de _create-eth-app_, lee la [documentación](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph) y adáptalo a tus propios contratos. Si buscas contratos inteligentes populares, es posible que incluso ya exista un subgrafo. Echa un vistazo al [explorador de subgrafos](https://thegraph.com/explorer/).

Una vez que tienes un subgrafo, te permite escribir una consulta simple en tu dapp que recupera todos los datos importantes de la cadena de bloques, incluidos los históricos que necesitas, requiriendo solo una solicitud.

### Apollo {#apollo}

Gracias a la integración de [Apollo Boost](https://www.apollographql.com/docs/react/get-started/), puedes integrar fácilmente The Graph en tu dapp de React. Especialmente al usar [hooks de React y Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks), obtener datos es tan simple como escribir una sola consulta GraphQL en tu componente:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Plantillas {#templates}

Además, puedes elegir entre varias plantillas diferentes. Hasta ahora puedes usar una integración de Aave, Compound, Uniswap o Sablier. Todas ellas añaden direcciones importantes de contratos inteligentes de servicios junto con integraciones de subgrafos prefabricadas. Simplemente añade la plantilla al comando de creación como `yarn create eth-app my-eth-app --with-template aave`.

### Aave {#aave}

[Aave](https://aave.com/) es un mercado descentralizado de préstamos de dinero. Los depositantes proporcionan liquidez al mercado para obtener ingresos pasivos, mientras que los prestatarios pueden pedir prestado utilizando colaterales. Una característica única de Aave son esos [préstamos relámpago](https://aave.com/docs/developers/flash-loans) que te permiten pedir dinero prestado sin ningún colateral, siempre y cuando devuelvas el préstamo dentro de una sola transacción. Esto puede ser útil, por ejemplo, para darte dinero extra en operaciones de arbitraje.

Los tokens intercambiados que te generan intereses se llaman _aTokens_.

Cuando eliges integrar Aave con _create-eth-app_, obtendrás una [integración de subgrafo](https://docs.aave.com/developers/getting-started/using-graphql). Aave utiliza The Graph y ya te proporciona varios subgrafos listos para usar en [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) y la [Red principal](https://thegraph.com/explorer/subgraph/aave/protocol) en formato [sin procesar (raw)](https://thegraph.com/explorer/subgraph/aave/protocol-raw) o [formateado](https://thegraph.com/explorer/subgraph/aave/protocol).

![Aave Flash Loan meme – "Yeahhh, if I could keep my flash loan longer than 1 transaction, that would be great"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) es similar a Aave. La integración ya incluye el nuevo [subgrafo de Compound v2](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195). Los tokens que generan intereses aquí se llaman, sorprendentemente, _cTokens_.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) es un intercambio descentralizado (DEX). Los proveedores de liquidez pueden ganar comisiones al proporcionar los tokens o ether requeridos para ambos lados de una operación. Es ampliamente utilizado y, por lo tanto, tiene una de las mayores liquideces para una gama muy amplia de tokens. Puedes integrarlo fácilmente en tu dapp para, por ejemplo, permitir a los usuarios intercambiar su ETH por DAI.

Desafortunadamente, en el momento de escribir este artículo, la integración es solo para Uniswap v1 y no para la [recién lanzada v2](https://uniswap.org/blog/uniswap-v2/).

### Sablier {#sablier}

[Sablier](https://sablier.com/) permite a los usuarios realizar pagos de dinero en flujo continuo (streaming). En lugar de un solo día de pago, en realidad recibes tu dinero constantemente sin más administración después de la configuración inicial. La integración incluye su [propio subgrafo](https://thegraph.com/explorer/subgraph/sablierhq/sablier).

## ¿Qué sigue? {#whats-next}

Si tienes preguntas sobre _create-eth-app_, ve al [servidor de la comunidad de Sablier](https://discord.gg/bsS8T47), donde puedes ponerte en contacto con los autores de _create-eth-app_. Como primeros pasos a seguir, es posible que desees integrar un marco de interfaz de usuario como [Material UI](https://mui.com/material-ui/), escribir consultas GraphQL para los datos que realmente necesitas y configurar el despliegue.