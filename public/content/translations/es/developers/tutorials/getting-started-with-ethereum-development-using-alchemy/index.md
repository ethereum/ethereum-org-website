---
title: Primeros pasos en el desarrollo de Ethereum
description: "Esta es una guía para principiantes sobre cómo empezar a desarrollar en Ethereum. Le guiaremos desde la creación de un punto final de la API y la realización de una solicitud de línea de comandos hasta la escritura de su primer script de web3. ¡No se necesita experiencia en el desarrollo de cadenas de bloques!"
author: "Elan Halpern"
tags:
  [
    "JavaScript",
    "ethers.js",
    "nodos",
    "consultar",
    "Alchemy"
  ]
skill: beginner
lang: es
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Logos de Ethereum y Alchemy](./ethereum-alchemy.png)

Esta es una guía para principiantes sobre cómo empezar a desarrollar en Ethereum. Para este tutorial, utilizaremos [Alchemy](https://alchemyapi.io/), la plataforma líder de desarrollo de cadenas de bloques que da servicio a millones de usuarios del 70 % de las principales aplicaciones de cadenas de bloques, entre las que se incluyen Maker, 0x, MyEtherWallet, Dharma y Kyber. Alchemy nos dará acceso a un punto final de la API en la cadena de Ethereum para que podamos leer y escribir transacciones.

Le guiaremos desde el registro en Alchemy hasta la escritura de su primer script de web3. ¡No se necesita experiencia en el desarrollo de cadenas de bloques!

## 1. Regístrese para obtener una cuenta gratuita de Alchemy {#sign-up-for-a-free-alchemy-account}

Crear una cuenta en Alchemy es fácil, [regístrese gratis aquí](https://auth.alchemy.com/).

## 2. Crear una aplicación de Alchemy {#create-an-alchemy-app}

Para comunicarse con la cadena de Ethereum y utilizar los productos de Alchemy, necesita una clave de API para autenticar sus solicitudes.

Puede [crear claves de API desde el panel de control](https://dashboard.alchemy.com/). Para crear una nueva clave, vaya a «Crear aplicación» como se muestra a continuación:

¡Agradecimiento especial a [_ShapeShift_](https://shapeshift.com/) _por permitirnos mostrar su panel de control!_

![Panel de control de Alchemy](./alchemy-dashboard.png)

Rellene los detalles en «Crear aplicación» para obtener su nueva clave. Aquí también puede ver las aplicaciones que ha creado anteriormente y las que ha creado su equipo. Obtenga las claves existentes haciendo clic en «Ver clave» para cualquier aplicación.

![Captura de pantalla de Crear aplicación con Alchemy](./create-app.png)

También puede obtener las claves de API existentes pasando el cursor por encima de «Aplicaciones» y seleccionando una. Aquí puede «Ver clave», así como «Editar aplicación» para incluir dominios específicos en la lista blanca, ver varias herramientas para desarrolladores y ver los análisis.

![Gif que muestra a un usuario cómo obtener las claves de la API](./pull-api-keys.gif)

## 3. Realizar una solicitud desde la línea de comandos {#make-a-request-from-the-command-line}

Interactúe con la cadena de bloques de Ethereum a través de Alchemy usando JSON-RPC y curl.

Para las solicitudes manuales, recomendamos interactuar con `JSON-RPC` a través de solicitudes `POST`. Simplemente pase la cabecera `Content-Type: application/json` y su consulta como el cuerpo de `POST` con los siguientes campos:

- `jsonrpc`: La versión de JSON-RPC; actualmente, solo se admite la `2.0`.
- `method`: El método de la API de ETH. [Consulte la referencia de la API.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: Una lista de parámetros para pasar al método.
- `id`: El ID de su solicitud. La respuesta lo devolverá para que pueda hacer un seguimiento de a qué solicitud pertenece una respuesta.

A continuación se muestra un ejemplo que puede ejecutar desde la línea de comandos para recuperar el precio del gas actual:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**NOTA:** Reemplace [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) con su propia clave de API `https://eth-mainnet.alchemyapi.io/v2/**su-clave-de-api`._

**Resultados:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. Configure su cliente de Web3 {#set-up-your-web3-client}

**Si ya tiene un cliente,** cambie la URL de su proveedor de nodos actual a una URL de Alchemy con su clave de API: `"https://eth-mainnet.alchemyapi.io/v2/su-clave-de-api"`

**_NOTA:_** Los scripts que se muestran a continuación deben ejecutarse en un **contexto de nodo** o **guardarse en un archivo**; no deben ejecutarse desde la línea de comandos. Si aún no tiene Node o npm instalado, consulte esta [guía de configuración rápida para Mac](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs).

Hay muchísimas [bibliotecas de Web3](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) que puede integrar con Alchemy; sin embargo, recomendamos usar [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), un reemplazo directo de web3.js, creado y configurado para funcionar sin problemas con Alchemy. Esto proporciona múltiples ventajas, como reintentos automáticos y un soporte sólido para WebSocket.

Para instalar AlchemyWeb3.js, **navegue al directorio de su proyecto** y ejecute:

**Con Yarn:**

```
yarn add @alch/alchemy-web3
```

**Con NPM:**

```
npm install @alch/alchemy-web3
```

Para interactuar con la infraestructura de nodos de Alchemy, ejecútelo en NodeJS o agregue esto a un archivo de JavaScript:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/su-clave-de-api"
)
```

## 5. ¡Escriba su primer script de Web3! {#write-your-first-web3-script}

Ahora, para ensuciarnos las manos con un poco de programación de web3, escribiremos un script sencillo que imprima el último número de bloque de la red principal de Ethereum.

\*\*1. **Si aún no lo ha hecho, cree un nuevo directorio de proyecto en su terminal y acceda a él con cd:**

```
mkdir web3-example
cd web3-example
```

\*\*2. **Instale la dependencia de Alchemy web3 (o cualquier web3) en su proyecto si aún no lo ha hecho:**

```
npm install @alch/alchemy-web3
```

\*\*3. **Cree un archivo llamado `index.js` y añada el siguiente contenido:**

> En última instancia, debe reemplazar `demo` por su clave de API HTTP de Alchemy.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("El último número de bloque es " + blockNumber)
}
main()
```

¿No está familiarizado con los procesos asíncronos? Consulte esta [publicación de Medium](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c).

\*\*4. **Ejecútelo en su terminal usando node**

```
node index.js
```

\*\*5. ¡Ahora debería ver el último número de bloque en su consola!

```
El último número de bloque es 11043912
```

¡Genial! ¡Enhorabuena! **Acaba de escribir su primer script de web3 usando Alchemy 🎉**

¿No está seguro de qué hacer a continuación? Intente desplegar su primer contrato inteligente y familiarícese con la programación en Solidity en nuestra [Guía de contratos inteligentes «Hola, mundo»](https://www.alchemy.com/docs/hello-world-smart-contract), o ponga a prueba sus conocimientos sobre el panel de control con la [Aplicación de demostración del panel de control](https://docs.alchemyapi.io/tutorials/demo-app).

_[Regístrese en Alchemy de forma gratuita](https://auth.alchemy.com/), consulte nuestra [documentación](https://www.alchemy.com/docs/) y, para conocer las últimas noticias, síganos en [Twitter](https://twitter.com/AlchemyPlatform)_.
