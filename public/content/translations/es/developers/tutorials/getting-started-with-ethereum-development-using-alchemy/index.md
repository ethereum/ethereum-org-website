---
title: "Introducción al desarrollo en Ethereum"
description: "Esta es una guía para principiantes sobre cómo empezar con el desarrollo en Ethereum. ¡Le llevaremos desde la creación de un punto de enlace de la API, pasando por la realización de una solicitud de línea de comandos, hasta la escritura de su primer script de Web3! ¡No se necesita experiencia en desarrollo de cadenas de bloques!"
author: "Elan Halpern"
tags: ["JavaScript", "ethers.js", "nodos", "consultas", "Alchemy"]
skill: beginner
breadcrumb: "Introducción"
lang: es
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Ethereum and Alchemy logos](./ethereum-alchemy.png)

Esta es una guía para principiantes sobre cómo empezar con el desarrollo en Ethereum. Para este tutorial utilizaremos [Alchemy](https://www.alchemy.com/), la plataforma líder para desarrolladores de cadenas de bloques que da servicio a millones de usuarios del 70 % de las principales aplicaciones de cadenas de bloques, incluyendo Maker, 0x, MyEtherWallet, Dharma y Kyber. Alchemy nos dará acceso a un punto de enlace de la API en la cadena de Ethereum para que podamos leer y escribir transacciones.

¡Le llevaremos desde el registro en Alchemy hasta la escritura de su primer script de Web3! ¡No se necesita experiencia en desarrollo de cadenas de bloques!

## 1. Regístrese para obtener una cuenta gratuita de Alchemy {#sign-up-for-a-free-alchemy-account}

Crear una cuenta en Alchemy es fácil, [regístrese gratis aquí](https://auth.alchemy.com/).

## 2. Cree una aplicación en Alchemy {#create-an-alchemy-app}

Para comunicarse con la cadena de Ethereum y utilizar los productos de Alchemy, necesita una clave de API para autenticar sus solicitudes.

Puede [crear claves de API desde el panel de control](https://dashboard.alchemy.com/). Para crear una nueva clave, vaya a «Create App» (Crear aplicación) como se muestra a continuación:

¡Un agradecimiento especial a [_ShapeShift_](https://shapeshift.com/) _por permitirnos mostrar su panel de control!_

![Alchemy dashboard](./alchemy-dashboard.png)

Rellene los detalles en «Create App» para obtener su nueva clave. Aquí también puede ver las aplicaciones que creó anteriormente y las creadas por su equipo. Obtenga las claves existentes haciendo clic en «View Key» (Ver clave) en cualquier aplicación.

![Create app with Alchemy screenshot](./create-app.png)

También puede obtener claves de API existentes pasando el cursor sobre «Apps» (Aplicaciones) y seleccionando una. Aquí puede hacer clic en «View Key», así como en «Edit App» (Editar aplicación) para incluir dominios específicos en la lista blanca, ver varias herramientas para desarrolladores y consultar análisis.

![Gif showing a user how to pull API keys](./pull-api-keys.gif)

## 3. Haga una solicitud desde la línea de comandos {#make-a-request-from-the-command-line}

Interactúe con la cadena de bloques de Ethereum a través de Alchemy utilizando JSON-RPC y curl.

Para solicitudes manuales, recomendamos interactuar con `JSON-RPC` a través de solicitudes `POST`. Simplemente pase el encabezado `Content-Type: application/json` y su consulta como el cuerpo del `POST` con los siguientes campos:

- `jsonrpc`: La versión de JSON-RPC; actualmente, solo se admite `2.0`.
- `method`: El método de la API de ETH. [Consulte la referencia de la API.](/developers/docs/apis/json-rpc/)
- `params`: Una lista de parámetros para pasar al método.
- `id`: El ID de su solicitud. Será devuelto por la respuesta para que pueda realizar un seguimiento de a qué solicitud pertenece una respuesta.

Aquí hay un ejemplo que puede ejecutar desde la línea de comandos para recuperar el precio del gas actual:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**NOTA:** Reemplace `https://eth-mainnet.alchemyapi.io/v2/demo` con su propia clave de API `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`._

**Resultados:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```
## 4. Configure su cliente Web3 {#set-up-your-web3-client}

**Si tiene un cliente existente,** cambie la URL de su proveedor de nodo actual a una URL de Alchemy con su clave de API: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_NOTA:_** Los scripts a continuación deben ejecutarse en un **contexto de nodo** o **guardarse en un archivo**, no ejecutarse desde la línea de comandos. Si aún no tiene Node o npm instalados, siga [las instrucciones de instalación de Node.js](https://nodejs.org/en/download/).

Hay muchísimas [bibliotecas Web3](/developers/docs/apis/javascript/) que puede integrar con Alchemy; sin embargo, recomendamos usar [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), un reemplazo directo para Web3.js, creado y configurado para funcionar sin problemas con Alchemy. Esto proporciona múltiples ventajas, como reintentos automáticos y un soporte robusto para WebSocket.

Para instalar AlchemyWeb3.js, **navegue hasta el directorio de su proyecto** y ejecute:

**Con Yarn:**

```
yarn add @alch/alchemy-web3
```

**Con NPM:**

```
npm install @alch/alchemy-web3
```

Para interactuar con la infraestructura de nodos de Alchemy, ejecute en NodeJS o agregue esto a un archivo JavaScript:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```
## 5. ¡Escriba su primer script Web3! {#write-your-first-web3-script}

Ahora, para poner manos a la obra con un poco de programación Web3, escribiremos un script simple que imprima el último número de bloque de la red principal de Ethereum.

**1. Si aún no lo ha hecho, en su terminal cree un nuevo directorio de proyecto y acceda a él con cd:**

```
mkdir web3-example
cd web3-example
```

**2. Instale la dependencia Web3 de Alchemy (o cualquier otra biblioteca Web3) en su proyecto si aún no lo ha hecho:**

```
npm install @alch/alchemy-web3
```

**3. Cree un archivo llamado `index.js` y agregue el siguiente contenido:**

> En última instancia, debe reemplazar `demo` con su clave de API HTTP de Alchemy.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

¿No está familiarizado con la programación asíncrona? Eche un vistazo a esta [publicación de Medium](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c).

**4. Ejecútelo en su terminal usando node**

```
node index.js
```

**5. ¡Ahora debería ver el último número de bloque en su consola!**

```
The latest block number is 11043912
```

**¡Genial! ¡Felicidades! Acaba de escribir su primer script Web3 usando Alchemy 🎉**

¿No está seguro de qué hacer a continuación? Intente implementar su primer contrato inteligente y ponga manos a la obra con un poco de programación en Solidity en nuestra [Guía de contratos inteligentes de Hola Mundo](/developers/tutorials/hello-world-smart-contract/), o siga explorando la [documentación de Alchemy](https://www.alchemy.com/docs/) para ver más ejemplos.

_[Regístrese en Alchemy de forma gratuita](https://auth.alchemy.com/), consulte nuestra [documentación](https://www.alchemy.com/docs/) y, para conocer las últimas noticias, síganos en [Twitter](https://twitter.com/AlchemyPlatform)_.
