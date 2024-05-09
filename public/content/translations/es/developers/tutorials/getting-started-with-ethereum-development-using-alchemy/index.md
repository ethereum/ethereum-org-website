---
title: Claves para desarrolladores principiantes en Ethereum
description: "Esta es una guía de ayuda a principiantes para comenzar a desarrollar en Ethereum. Te enseñaremos los fundamentos: desde montar una terminal de conexión API, a solicitar una línea de comando pasando por ensamblar tu primer script en Web3. ¡No se necesita experiencia en desarrollo de blockchain!"
author: "Elan Halpern"
tags:
  - "javascript"
  - "ethers.js"
  - "nodos"
  - "consultar"
  - "alchemy"
skill: beginner
lang: es
published: 2020-10-30
source: Medio
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Logotipos de Ethereum y Alchemy](./ethereum-alchemy.png)

Esta es una guía de ayuda a principiantes para comenzar a desarrollar en Ethereum. En este turorial utilizaremos [Alchemy](https://alchemyapi.io/), la plataforma líder de desarrolladores de cadena de bloques que permite desarrollar a millones de usuarios desde el 70 % de las aplicaciones más populares de cadena de bloques, incluyendo Maker, 0x, MyEtherWallet, Dharma y Kyber. Alchemy nos dará acceso a una terminal de conexión API en la cadena Ethereum para que podamos leer y escribir transacciones.

¡Te guiaremos desde el registro con Alchemy hasta escribir tu primer script para Web3! ¡No se necesita experiencia en desarrollo de cadena de bloques!

## 1. Regístrate de manera gratuita en Alchemy {#sign-up-for-a-free-alchemy-account}

Crear una cuenta con Alchemy es fácil, [regístrate gratis aquí](https://auth.alchemyapi.io/signup).

## 2. Crear una aplicación de Alchemy {#create-an-alchemy-app}

Para comunicarte con la cadena Ethereum y utilizar los productos de Alchemy, necesitas una clave API para autenticar tus peticiones.

Puedes [crear claves API desde el panel de control](http://dashboard.alchemyapi.io/). Para crear una nueva clave, navega hasta «Crear aplicación» como se muestra a continuación:

¡Queremos expresar nuestro agradecimiento especial a [_ShapeShift_](https://shapeshift.com/) _por dejarnos mostrar su panel!_

![Panel de Alchemy](./alchemy-dashboard.png)

Rellene los datos de «Crear aplicación» para obtener su nueva clave. También podrá ver otras aplicaciones que haya creado anteriormente y las que haya hecho su equipo. Extraiga las claves existentes haciendo clic en «Ver clave» para cualquier aplicación.

![Crear una aplicación con la captura de pantalla de Alchemy](./create-app.png)

También puede extraer las claves de API existentes pasando el cursor por «Apps» y seleccionando una. Usted puede «Ver clave» aquí, así como «Editar aplicación» a la lista blanca de dominios específicos, ver varias herramientas de desarrolladores y analíticas.

![Gif que muestra a un usuario cómo extraer las claves de la API](./pull-api-keys.gif)

## 3. Hacer una solicitud en la línea de comandos {#make-a-request-from-the-command-line}

Interactuar con la cadena de bloques de Ethereum a través de Alchemy usando JSON-RPC y curl.

Para solicitudes manuales, recomendamos interactuar con `JSON-RPC` a través de solicitudes `POST`. Simplemente pase el encabezado `Content-Type: application/json` y su consulta como el cuerpo `POST` con los siguientes campos:

- `jsonrpc`: la versión JSON-RPC, por el momento sólo `2.0` es compatible.
- `method`: el método ETH API. [Ver referencia sobre API.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: una lista de parámetros a pasar al método.
- `id`: la ID de su solicitud. La devolverá la respuesta para que pueda hacer un seguimiento de a qué solicitud pertenece una respuesta.

He aquí un ejemplo que puede ejecutar desde la línea de comandos para recuperar el precio actual del gas:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**NOTA:** Sustituya [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) con su propia clave API `https://eth-mainnet.alchemyapi.io/v2/**tu-clave-api`._

**Resultados:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. Configurar su cliente Web3 {#set-up-your-web3-client}

**Si tienes un cliente existente,** cambia tu URL actual del proveedor de nodos a una URL de Alchemy con tu clave API: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_NOTA:_** Los scripts a continuación necesitan ejecutarse en un **contexto de nodo** o **guardarse en un archivo**no se ejecutarán desde la línea de comandos. Si aún no tiene instalado un nodo o npm, consulte esta rápida [guía de configuración para Macs](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs).

Hay infinidad de [bibliotecas en Web3](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) que puede integrar con Alchemy, no obstante, le recomendamos usar [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), una sustitución para Web 3, ensamblada y configurada para funcionar a la perfección con Alchemy. Le proporciona múltiples ventajas, como reintentos automáticos y un soporte sólido para WebSocket.

Para instalar AlchemyWeb3.js, **vaya al directorio de su proyecto** y ejecute:

**Con Yarn:**

```
yarn add @alch/alchemy-web3
```

**Con NPM:**

```
npm install @alch/alchemy-web3
```

Para interactuar con la infraestructura del nodo de Alchemy, ejecute en NodeJS o añada esto a un archivo JavaScript:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. Escriba su primer script en Web3! {#write-your-first-web3-script}

Ahora entremos en materia con una pequeña programación en Web 3: escribiremos un simple script que imprima el último número de bloque de la red principal de Ethereum.

**1. Si aún no lo ha hecho, en su terminal, cree un nuevo proyecto con un directorio y cd en él:**

```
mkdir web3-example
cd web3-example
```

**2. Instale el vínculo de Alchemy Web3 (o cualquier Web3) en su proyecto si aún no lo ha hecho:**

```
npm install @alch/alchemy-web3
```

**3. Cree un archivo llamado `index.js` y añada el siguiente contenido:**

> En última instancia, debería reemplazar `demo` por su clave API del HTTP Alchemy.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

¿No está familiarizado con las funciones Async? Échele un vistazo a este [post en Medium](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c).

**4. Ejecútelo en su terminal usando un nodo**

```
node index.js
```

**5. ¡Ahora debería ver el último resultado de número de bloque en su consola!**

```
The latest block number is 11043912
```

**¡Guau! ¡Felicidades! Acaba de escribir su primer script en Web3 utilizando Alchemy 🎉**

¿No sabe por dónde seguir ahora? ¡Pruebe a implementar su primer contrato inteligente y entrar en materia con algo de programación de Solidity en nuestra [Guía sobre contratos inteligentes abierta a todos los públicos](https://docs.alchemyapi.io/tutorials/hello-world-smart-contract) o pruebe su panel de conocimiento con la [aplicación de prueba del panel](https://docs.alchemyapi.io/tutorials/demo-app)!

_[Regístrese gratis en Alchemy](https://auth.alchemyapi.io/signup), eche un vistazo a nuestra [documentación](https://docs.alchemyapi.io/) y para estar al tanto de las últimas novedades, síganos en [Twitter](https://twitter.com/AlchemyPlatform)_.
