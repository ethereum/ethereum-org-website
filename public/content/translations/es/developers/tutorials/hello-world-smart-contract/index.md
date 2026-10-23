---
title: Contrato inteligente Hola Mundo para principiantes
description: "Tutorial introductorio sobre cómo escribir y desplegar un contrato inteligente simple en Ethereum."
author: "elanh"
tags: ["Solidity", "Hardhat", "Alchemy", "contratos inteligentes", "despliegue"]
skill: beginner
breadcrumb: Contrato Hola Mundo
lang: es
published: 2021-03-31
---

Si eres nuevo en el desarrollo de cadenas de bloques y no sabes por dónde empezar, o si simplemente quieres entender cómo desplegar e interactuar con contratos inteligentes, esta guía es para ti. Te guiaremos en la creación y el despliegue de un contrato inteligente simple en la red de prueba Sepolia utilizando una billetera virtual [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/), [Hardhat](https://hardhat.org/) y [Alchemy](https://www.alchemy.com/eth) (no te preocupes si aún no entiendes qué significa todo esto, te lo explicaremos).

Una vez que tu contrato esté desplegado, puedes [crear una interfaz de usuario para él](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Si tienes preguntas en cualquier momento, ¡no dudes en comunicarte en el [Discord de Alchemy](https://discord.gg/gWuC7zB)!

## Paso 1: Conectarse a la red Ethereum {#step-1}

Hay muchas formas de hacer solicitudes a la cadena de Ethereum. Para simplificar, usaremos una cuenta gratuita en Alchemy, una plataforma para desarrolladores de cadenas de bloques y API que nos permite comunicarnos con la cadena de Ethereum sin tener que ejecutar nuestros propios nodos. La plataforma también cuenta con herramientas de desarrollo para monitoreo y análisis que aprovecharemos en este tutorial para entender qué sucede internamente en el despliegue de nuestro contrato inteligente. Si aún no tienes una cuenta de Alchemy, [puedes registrarte gratis aquí](https://dashboard.alchemy.com/signup).

## Paso 2: Crear tu aplicación (y clave API) {#step-2}

Una vez que hayas creado una cuenta de Alchemy, puedes generar una clave API creando una aplicación. Esto nos permitirá hacer solicitudes a la red de prueba Sepolia. Si no estás familiarizado con las redes de prueba (testnets), consulta [esta página](/developers/docs/networks/).

1.  Navega a la página "Create new app" (Crear nueva aplicación) en tu panel de Alchemy seleccionando "Select an app" (Seleccionar una aplicación) en la barra de navegación y haciendo clic en "Create new app"

![Hello world create app](./hello-world-create-app.png)

2. Nombra tu aplicación "Hello World", ofrece una breve descripción y elige un caso de uso, por ejemplo, "Infra & Tooling". A continuación, busca "Ethereum" y selecciona la red.

![create app view hello world](./create-app-view-hello-world.png)

3. Haz clic en "Next" (Siguiente) para continuar, luego en "Create app" (Crear aplicación) ¡y eso es todo! Tu aplicación debería aparecer en el menú desplegable de la barra de navegación, con una clave API disponible para copiar.

## Paso 3: Crear una cuenta de Ethereum (dirección) {#step-3}

Necesitamos una cuenta de Ethereum para enviar y recibir transacciones. Para este tutorial, usaremos MetaMask, una billetera virtual en el navegador que se utiliza para administrar la dirección de tu cuenta de Ethereum. Más información sobre [transacciones](/developers/docs/transactions/).

Puedes descargar MetaMask y crear una cuenta de Ethereum de forma gratuita [aquí](https://metamask.io/download). Cuando estés creando una cuenta, o si ya tienes una, asegúrate de cambiar a la red de prueba "Sepolia" usando el menú desplegable de redes (para que no estemos lidiando con dinero real).

Si no ves Sepolia en la lista, abre el menú en la esquina superior derecha, selecciona "Networks" (Redes) y activa "Show test networks" (Mostrar redes de prueba) en la parte inferior de la lista de redes (consulta la [guía de MetaMask para ver redes de prueba](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)). Luego selecciona "Sepolia" en el menú de selección de red.

![metamask sepolia example](./metamask-sepolia-example.png)

## Paso 4: Añadir ether desde un faucet {#step-4}

Para desplegar nuestro contrato inteligente en la red de prueba, necesitaremos algo de ETH falso. Para obtener ETH de Sepolia, puedes ir a los [detalles de la red Sepolia](/developers/docs/networks/#sepolia) para ver una lista de varios faucets. Si uno no funciona, prueba con otro, ya que a veces pueden quedarse sin fondos. Algunos faucets tienen reglas de elegibilidad; por ejemplo, el faucet de Sepolia de Alchemy requiere que la dirección receptora tenga al menos 0.001 ETH en la red principal de Ethereum. Puede tomar algún tiempo recibir tu ETH falso debido al tráfico de la red. ¡Deberías ver ETH en tu cuenta de MetaMask poco después!

## Paso 5: Comprobar tu saldo {#step-5}

Para verificar que nuestro saldo esté ahí, hagamos una solicitud [eth_getBalance](/developers/docs/apis/json-rpc/#eth-getbalance) usando la [herramienta composer de Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Esto devolverá la cantidad de ETH en nuestra billetera. Después de ingresar la dirección de tu cuenta de MetaMask y hacer clic en "Send Request" (Enviar solicitud), deberías ver una respuesta como esta:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **NOTA:** Este resultado está en Wei, no en ETH. Wei se utiliza como la denominación más pequeña de ether. La conversión de Wei a ETH es: 1 eth = 10<sup>18</sup> Wei. Así que si convertimos 0x2B5E3AF16B1880000 a decimal obtenemos 5\*10¹⁸, lo que equivale a 5 ETH.
>
> ¡Uf! Nuestro dinero falso está todo ahí <Emoji text=":money_mouth_face:" size={1} />.

## Paso 6: Inicializar nuestro proyecto {#step-6}

Primero, necesitaremos crear una carpeta para nuestro proyecto. Navega a tu línea de comandos y escribe:

```sh
mkdir hello-world
cd hello-world
```

Ahora que estamos dentro de la carpeta de nuestro proyecto, usaremos `npm init` para inicializar el proyecto. Si aún no tienes npm instalado, sigue [las instrucciones de instalación de Node.js](https://nodejs.org/en/download/) (necesitaremos Node.js y npm para este tutorial).

```sh
npm init
```

Realmente no importa cómo respondas a las preguntas de instalación, aquí te mostramos cómo lo hicimos como referencia:

```text
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/.../.../.../hello-world/package.json:

{
  "name": "hello-world",
  "version": "1.0.0",
  "description": "hello world smart contract",
  "main": "index.js",
  "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Aprueba el archivo package.json. Hardhat 3, que instalaremos a continuación, solo admite proyectos de módulos ES, así que marca el proyecto como tal:

```sh
npm pkg set type=module
```

¡Y ya estamos listos para continuar!

## Paso 7: Descargar [Hardhat](https://hardhat.org/docs/getting-started) {#step-7}

Hardhat es un entorno de desarrollo para compilar, desplegar, probar y depurar tu software de Ethereum. Ayuda a los desarrolladores a construir contratos inteligentes y aplicaciones descentralizadas (dapps) localmente antes de desplegarlos en la cadena en vivo.

Hardhat 3 requiere Node.js v22.13.0 o posterior. Dentro de nuestro proyecto `hello-world` ejecuta:

```sh
npm install --save-dev hardhat
```

Consulta esta página para obtener más detalles sobre las [instrucciones de instalación](https://hardhat.org/docs/getting-started).

## Paso 8: Crear un proyecto de Hardhat {#step-8}

Ejecutar `npx hardhat --init` generaría un proyecto de muestra completo, pero para este tutorial configuraremos las cosas a mano para que puedas ver cada pieza. En la raíz de la carpeta de tu proyecto, crea un archivo llamado `hardhat.config.js` con el siguiente contenido:

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

Aquí es donde especificaremos toda la configuración de nuestro proyecto (en el paso 13). Por ahora, solo le dice a Hardhat qué versión del compilador de Solidity usar.

## Paso 9: Añadir carpetas del proyecto {#step-9}

Para mantener nuestro proyecto organizado, crearemos dos carpetas nuevas. Navega al directorio raíz de tu proyecto en tu línea de comandos y escribe:

```sh
mkdir contracts
mkdir scripts
```

- `contracts/` es donde guardaremos el archivo de código de nuestro contrato inteligente hola mundo.
- `scripts/` es donde guardaremos los scripts para desplegar e interactuar con nuestro contrato.

## Paso 10: Escribir nuestro contrato {#step-10}

Puede que te estés preguntando, ¿cuándo diablos vamos a escribir código? Bueno, aquí estamos, en el paso 10.

Abre el proyecto hello-world en tu editor favorito (a nosotros nos gusta [VSCode](https://code.visualstudio.com/)). Los contratos inteligentes están escritos en un lenguaje llamado Solidity, que es el que usaremos para escribir nuestro contrato inteligente HelloWorld.sol.‌

1.  Navega a la carpeta "contracts" y crea un nuevo archivo llamado HelloWorld.sol
2.  A continuación se muestra un contrato inteligente de muestra de Hola Mundo de la Fundación Ethereum que usaremos para este tutorial. Copia y pega el contenido a continuación en tu archivo HelloWorld.sol, y asegúrate de leer los comentarios para entender qué hace este contrato:

```solidity
// SPDX-License-Identifier: MIT
// Especifica la versión de Solidity, utilizando el versionado semántico.
// Más información: https://docs.soliditylang.org/en/latest/layout-of-source-files.html#pragma
pragma solidity ^0.8.24;

// Define un contrato llamado `HelloWorld`.
// Un contrato es una colección de funciones y datos (su estado). Una vez desplegado, un contrato reside en una dirección específica en la cadena de bloques de Ethereum. Más información: https://docs.soliditylang.org/en/latest/structure-of-a-contract.html
contract HelloWorld {

   // Declara una variable de estado `message` de tipo `string`.
   // Las variables de estado son variables cuyos valores se almacenan permanentemente en el almacenamiento del contrato. La palabra clave `public` hace que las variables sean accesibles desde fuera de un contrato y crea una función que otros contratos o clientes pueden llamar para acceder al valor.
   string public message;

   // De manera similar a muchos lenguajes orientados a objetos basados en clases, un constructor es una función especial que solo se ejecuta en la creación del contrato.
   // Los constructores se utilizan para inicializar los datos del contrato. Más información: https://docs.soliditylang.org/en/latest/contracts.html#constructors
   constructor(string memory initMessage) {

      // Acepta un argumento de cadena `initMessage` y establece el valor en la variable de almacenamiento `message` del contrato).
      message = initMessage;
   }

   // Una función pública que acepta un argumento de cadena y actualiza la variable de almacenamiento `message`.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Este es un contrato inteligente súper simple que almacena un mensaje al momento de su creación y puede actualizarse llamando a la función `update`.

## Paso 11: Conectar MetaMask y Alchemy a tu proyecto {#step-11}

Hemos creado una billetera MetaMask, una cuenta de Alchemy y hemos escrito nuestro contrato inteligente, ahora es el momento de conectar los tres.

Cada transacción enviada desde tu billetera virtual requiere una firma utilizando tu clave privada única. Para proporcionar a nuestro programa este permiso, podemos almacenar de forma segura nuestra clave privada (y la clave API de Alchemy) en un archivo de entorno.

> Para obtener más información sobre el envío de transacciones, consulta la [documentación de transacciones](/developers/docs/transactions/).

Crea un archivo `.env` en el directorio raíz de nuestro proyecto y añade tu clave privada de MetaMask y la URL HTTP de la API de Alchemy.

- Sigue [estas instrucciones](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) para exportar tu clave privada
- Consulta a continuación para obtener la URL HTTP de la API de Alchemy

![get alchemy api key](./get-alchemy-api-key.png)

Copia la URL de la API de Alchemy

Tu archivo `.env` debería verse así:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Para conectar realmente estos elementos a nuestro código, haremos referencia a estas variables en nuestro archivo `hardhat.config.js` en el paso 13. Node.js puede leer archivos `.env` por sí solo, por lo que no hay ningún paquete adicional que instalar.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
¡No hagas commit de <code>.env</code>! Asegúrate de nunca compartir ni exponer tu archivo <code>.env</code> con nadie, ya que al hacerlo estás comprometiendo tus secretos. Si estás utilizando un control de versiones, añade tu <code>.env</code> a un archivo <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Paso 12: Instalar Ethers.js {#step-12-install-ethersjs}

Ethers.js es una biblioteca que facilita la interacción y la realización de solicitudes a Ethereum al envolver los [métodos estándar de JSON-RPC](/developers/docs/apis/json-rpc/) con métodos más fáciles de usar.

Hardhat hace que sea súper fácil integrar [Plugins](https://hardhat.org/docs/plugins/official-plugins) para herramientas adicionales y funcionalidad extendida. Aprovecharemos el [plugin de Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) para el despliegue de contratos ([Ethers.js](https://docs.ethers.org/v6/) tiene algunos métodos de despliegue de contratos súper limpios).

En el directorio de tu proyecto escribe:

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

También añadiremos el plugin a nuestro `hardhat.config.js` en el siguiente paso.

## Paso 13: Actualizar hardhat.config.js {#step-13-update-hardhatconfigjs}

Hemos añadido varias dependencias y plugins hasta ahora, ahora necesitamos actualizar `hardhat.config.js` para que nuestro proyecto sepa de todos ellos.

Actualiza tu `hardhat.config.js` para que se vea así:

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// Carga API_URL y PRIVATE_KEY del archivo .env en process.env, si existe
if (existsSync(".env")) process.loadEnvFile()

export default defineConfig({
  plugins: [hardhatEthers],
  solidity: "0.8.34",
  networks: {
    sepolia: {
      type: "http",
      url: configVariable("API_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
})
```

`configVariable` le dice a Hardhat que lea cada valor de una variable de entorno solo cuando sea necesario, por lo que comandos como `compile` funcionan incluso antes de que se establezcan los valores. Si prefieres no mantener tu clave privada en un archivo de texto sin formato, Hardhat también puede leer [variables de configuración desde un almacén de claves cifrado](https://hardhat.org/docs/guides/configuration-variables).

## Paso 14: Compilar nuestro contrato {#step-14-compile-our-contracts}

Para asegurarnos de que todo funciona hasta ahora, compilemos nuestro contrato. La tarea `compile` es una de las tareas integradas de Hardhat.

Desde la línea de comandos ejecuta:

```sh
npx hardhat compile
```

La primera vez que compilas, Hardhat descarga el compilador de Solidity. Luego deberías ver algo como `Compiled 1 Solidity file with solc 0.8.34`. Si no es así, siempre puedes enviar un mensaje en el [Discord de Alchemy](https://discord.gg/gWuC7zB).

## Paso 15: Escribir nuestro script de despliegue {#step-15-write-our-deploy-scripts}

Ahora que nuestro contrato está escrito y nuestro archivo de configuración está listo, es hora de escribir nuestro script de despliegue del contrato.

Navega a la carpeta `scripts/` y crea un nuevo archivo llamado `deploy.js`, añadiendo el siguiente contenido:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const HelloWorld = await ethers.getContractFactory("HelloWorld")

// Inicia el despliegue, devolviendo una promesa que se resuelve en un objeto de contrato
const hello_world = await HelloWorld.deploy("Hello World!")
await hello_world.waitForDeployment()
console.log("Contract deployed to address:", await hello_world.getAddress())
```

Repasemos qué hace cada una de estas líneas de código.

```js
const { ethers } = await network.create()
```

En Hardhat 3, un script abre una conexión a una red explícitamente. `network.create()` se conecta a la red que elijas con la opción `--network` cuando ejecutas el script, y el plugin `hardhat-ethers` añade un objeto `ethers` a esa conexión.

```js
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

Un `ContractFactory` en Ethers.js es una abstracción utilizada para desplegar nuevos contratos inteligentes, por lo que `HelloWorld` aquí es una fábrica para instancias de nuestro contrato hola mundo. Al usar el plugin `hardhat-ethers`, las instancias de `ContractFactory` y `Contract` están conectadas al primer firmante por defecto.

```js
const hello_world = await HelloWorld.deploy("Hello World!")
```

Llamar a `deploy()` en un `ContractFactory` iniciará el despliegue y devolverá una `Promise` que se resuelve en un `Contract`. Este es el objeto que tiene un método para cada una de las funciones de nuestro contrato inteligente. Los argumentos que pasas a `deploy()` van al constructor del contrato, aquí el mensaje inicial.

`waitForDeployment()` espera hasta que la transacción de despliegue se incluya en un bloque, y `getAddress()` devuelve la dirección del nuevo contrato. Consulta la [documentación de contratos de Ethers.js](https://docs.ethers.org/v6/api/contract/) para obtener más detalles.

## Paso 16: Desplegar nuestro contrato {#step-16-deploy-our-contract}

¡Finalmente estamos listos para desplegar nuestro contrato inteligente! Navega a la línea de comandos y ejecuta:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

Luego deberías ver algo como:

```text
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Si vamos al [Etherscan de Sepolia](https://sepolia.etherscan.io/) y buscamos la dirección de nuestro contrato, deberíamos poder ver que se ha desplegado con éxito. La transacción se verá algo así:

![etherscan contract](./etherscan-contract.png)

La dirección `From` (De) debería coincidir con la dirección de tu cuenta de MetaMask y la dirección `To` (Para) dirá "Contract Creation" (Creación de contrato), pero si hacemos clic en la transacción veremos la dirección de nuestro contrato en el campo `To`:

![etherscan transaction](./etherscan-transaction.png)

¡Felicidades! Acabas de desplegar un contrato inteligente en la cadena de Ethereum 🎉

Para entender qué está sucediendo internamente, puedes mirar las solicitudes que recibió tu aplicación "Hello World" en tu [panel de Alchemy](https://dashboard.alchemy.com/).

Allí verás un puñado de llamadas JSON-RPC que Hardhat/Ethers hizo internamente por nosotros cuando llamamos a la función `.deploy()`. Dos importantes a destacar aquí son [`eth_sendRawTransaction`](/developers/docs/apis/json-rpc/#eth-sendrawtransaction), que es la solicitud para escribir realmente nuestro contrato en la cadena Sepolia, y [`eth_getTransactionByHash`](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash), que es una solicitud para leer información sobre nuestra transacción dado el hash (un patrón típico al enviar transacciones). Para obtener más información sobre el envío de transacciones, consulta la [documentación de transacciones](/developers/docs/transactions/).

Eso es todo por este tutorial. A continuación, puedes [crear una interfaz de usuario para tu contrato](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).
