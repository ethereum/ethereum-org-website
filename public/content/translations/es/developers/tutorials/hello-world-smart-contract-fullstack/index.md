---
title: Contrato inteligente Hola Mundo para principiantes - Fullstack
description: "Tutorial introductorio sobre cómo escribir y desplegar un contrato inteligente simple en Ethereum."
author: "nstrike2"
breadcrumb: Hola Mundo fullstack
tags:
  [
    "Solidity",
    "Hardhat",
    "Alchemy",
    "contratos inteligentes",
    "despliegue",
    "explorador de bloques",
    "frontend",
    "transacciones",
    "framework",
  ]
skill: beginner
lang: es
published: 2021-10-25
---

Esta guía es para ti si eres nuevo en el desarrollo de la cadena de bloques y no sabes por dónde empezar o cómo desplegar e interactuar con contratos inteligentes. Te guiaremos a través de la creación y el despliegue de un contrato inteligente simple en la red de prueba Goerli utilizando [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org) y [Alchemy](https://alchemy.com/eth).

Necesitarás una cuenta de Alchemy para completar este tutorial. [Regístrate para obtener una cuenta gratuita](https://www.alchemy.com/).

Si tienes preguntas en algún momento, ¡no dudes en comunicarte en el [Discord de Alchemy](https://discord.gg/gWuC7zB)!

## Parte 1: Crea y despliega tu contrato inteligente usando Hardhat {#part-1}

### Conectarse a la red Ethereum {#connect-to-the-ethereum-network}

Hay muchas formas de hacer solicitudes a la cadena de Ethereum. Por simplicidad, usaremos una cuenta gratuita en Alchemy, una plataforma para desarrolladores de cadenas de bloques y API que nos permite comunicarnos con la cadena de Ethereum sin tener que ejecutar un nodo nosotros mismos. Alchemy también tiene herramientas de desarrollo para monitoreo y análisis; las aprovecharemos en este tutorial para entender qué sucede internamente en el despliegue de nuestro contrato inteligente.

### Crea tu aplicación y clave API {#create-your-app-and-api-key}

Una vez que hayas creado una cuenta de Alchemy, puedes generar una clave API creando una aplicación. Esto te permitirá hacer solicitudes a la red de prueba Goerli. Si no estás familiarizado con las redes de prueba, puedes [leer la guía de Alchemy para elegir una red](https://www.alchemy.com/docs/choosing-a-web3-network).

En el panel de Alchemy, busca el menú desplegable **Apps** en la barra de navegación y haz clic en **Create App**.

![Hello world create app](./hello-world-create-app.png)

Dale a tu aplicación el nombre '_Hello World_' y escribe una breve descripción. Selecciona **Staging** como tu entorno y **Goerli** como tu red.

![create app view hello world](./create-app-view-hello-world.png)

_Nota: asegúrate de seleccionar **Goerli**, o este tutorial no funcionará._

Haz clic en **Create app**. Tu aplicación aparecerá en la tabla de abajo.

### Crea una cuenta de Ethereum {#create-an-ethereum-account}

Necesitas una cuenta de Ethereum para enviar y recibir transacciones. Usaremos MetaMask, una billetera virtual en el navegador que permite a los usuarios administrar la dirección de su cuenta de Ethereum.

Puedes descargar y crear una cuenta de MetaMask gratis [aquí](https://metamask.io/download). Cuando estés creando una cuenta, o si ya tienes una, asegúrate de cambiar a la "Goerli Test Network" (Red de prueba Goerli) en la parte superior derecha (para que no estemos lidiando con dinero real).

### Paso 4: Añadir ether desde un faucet {#step-4-add-ether-from-a-faucet}

Para desplegar tu contrato inteligente en la red de prueba, necesitarás algo de ETH falso. Para obtener ETH en la red Goerli, ve a un faucet de Goerli e ingresa la dirección de tu cuenta de Goerli. Ten en cuenta que los faucets de Goerli pueden ser un poco inestables últimamente; consulta la [página de redes de prueba](/developers/docs/networks/#goerli) para ver una lista de opciones para probar:

_Nota: debido a la congestión de la red, esto podría tardar un poco._
``

### Paso 5: Comprobar tu saldo

Para comprobar que el ETH está en tu billetera, hagamos una solicitud [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) utilizando la [herramienta sandbox de Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Esto devolverá la cantidad de ETH en nuestra billetera. Para obtener más información, echa un vistazo al [breve tutorial de Alchemy sobre cómo usar la herramienta composer](https://youtu.be/r6sjRxBZJuU).

Ingresa la dirección de tu cuenta de MetaMask y haz clic en **Send Request**. Verás una respuesta que se parece al fragmento de código a continuación.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _Nota: Este resultado está en wei, no en ETH. Wei se utiliza como la denominación más pequeña de ether._

¡Uf! Todo nuestro dinero falso está ahí.
### Paso 6: Inicializar nuestro proyecto
Primero, necesitaremos crear una carpeta para nuestro proyecto. Navega a tu línea de comandos e ingresa lo siguiente.

```
mkdir hello-world
cd hello-world
```

Ahora que estamos dentro de la carpeta de nuestro proyecto, usaremos `npm init` para inicializar el proyecto.

> Si aún no tienes npm instalado, sigue [las instrucciones de instalación de Node.js](https://nodejs.org/en/download/) para instalar Node.js y npm.

Para los fines de este tutorial, no importa cómo respondas a las preguntas de inicialización. Aquí te mostramos cómo lo hicimos como referencia:

```
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

¡Aprueba el package.json y estamos listos para continuar!
### Paso 7: Descargar Hardhat {#step-7-download-hardhat}

Hardhat es un entorno de desarrollo para compilar, desplegar, probar y depurar tu software de Ethereum. Ayuda a los desarrolladores a construir contratos inteligentes y aplicaciones descentralizadas (dapps) localmente antes de desplegarlos en la cadena activa.

Dentro de nuestro proyecto `hello-world` ejecuta:

```
npm install --save-dev hardhat
```

Consulta esta página para obtener más detalles sobre las [instrucciones de instalación](https://hardhat.org/getting-started/#overview).

### Paso 8: Crear un proyecto de Hardhat {#step-8-create-hardhat-project}

Dentro de la carpeta de nuestro proyecto `hello-world`, ejecuta:

```
npx hardhat
```

A continuación, deberías ver un mensaje de bienvenida y la opción de seleccionar lo que quieres hacer. Selecciona "create an empty hardhat.config.js":

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Esto generará un archivo `hardhat.config.js` en el proyecto. Lo usaremos más adelante en el tutorial para especificar la configuración de nuestro proyecto.

### Paso 9: Añadir carpetas del proyecto {#step-9-add-project-folders}

Para mantener el proyecto organizado, vamos a crear dos carpetas nuevas. En la línea de comandos, navega hasta el directorio raíz de tu proyecto `hello-world` y escribe:

```
mkdir contracts
mkdir scripts
```

- `contracts/` es donde guardaremos el archivo de código de nuestro contrato inteligente hello world
- `scripts/` es donde guardaremos los scripts para desplegar e interactuar con nuestro contrato

### Paso 10: Escribir nuestro contrato {#step-10-write-our-contract}

Puede que te estés preguntando, ¿cuándo vamos a escribir código? ¡Ha llegado el momento!

Abre el proyecto hello-world en tu editor favorito. Los contratos inteligentes se escriben más comúnmente en Solidity, que es el que usaremos para escribir nuestro contrato inteligente.‌

1. Navega a la carpeta `contracts` y crea un nuevo archivo llamado `HelloWorld.sol`
2. A continuación se muestra un contrato inteligente Hello World de muestra que usaremos para este tutorial. Copia el contenido a continuación en el archivo `HelloWorld.sol`.

_Nota: Asegúrate de leer los comentarios para entender qué hace este contrato._

```
// Especifica la versión de Solidity, usando el versionado semántico.
// Más información: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Define un contrato llamado `HelloWorld`.
// Un contrato es una colección de funciones y datos (su estado). Una vez desplegado, un contrato reside en una dirección específica en la cadena de bloques de Ethereum. Más información: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Emitido cuando se llama a la función update
   // Los eventos de los contratos inteligentes son una forma de que tu contrato comunique que algo sucedió en la cadena de bloques al front-end de tu aplicación, que puede estar 'escuchando' ciertos eventos y tomar medidas cuando ocurran.
   event UpdatedMessages(string oldStr, string newStr);

   // Declara una variable de estado `message` de tipo `string`.
   // Las variables de estado son variables cuyos valores se almacenan permanentemente en el almacenamiento del contrato. La palabra clave `public` hace que las variables sean accesibles desde fuera de un contrato y crea una función que otros contratos o clientes pueden llamar para acceder al valor.
   string public message;

   // De manera similar a muchos lenguajes orientados a objetos basados en clases, un constructor es una función especial que solo se ejecuta al crear el contrato.
   // Los constructores se utilizan para inicializar los datos del contrato. Más información: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Acepta un argumento de cadena `initMessage` y establece el valor en la variable de almacenamiento `message` del contrato).
      message = initMessage;
   }

   // Una función pública que acepta un argumento de cadena y actualiza la variable de almacenamiento `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Este es un contrato inteligente básico que almacena un mensaje al momento de su creación. Se puede actualizar llamando a la función `update`.

### Paso 11: Conectar MetaMask y Alchemy a tu proyecto {#step-11-connect-metamask-alchemy-to-your-project}

Hemos creado una billetera de MetaMask, una cuenta de Alchemy y hemos escrito nuestro contrato inteligente, ahora es el momento de conectar los tres.

Cada transacción enviada desde tu billetera requiere una firma usando tu clave privada única. Para proporcionar este permiso a nuestro programa, podemos almacenar de forma segura nuestra clave privada en un archivo de entorno. También almacenaremos una clave API para Alchemy aquí.

> Para obtener más información sobre el envío de transacciones, consulta [este tutorial](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) sobre cómo enviar transacciones usando Web3.

Primero, instala el paquete dotenv en el directorio de tu proyecto:

```
npm install dotenv --save
```

Luego, crea un archivo `.env` en el directorio raíz del proyecto. Añade tu clave privada de MetaMask y la URL HTTP de la API de Alchemy en él.

Tu archivo de entorno debe llamarse `.env` o no será reconocido como un archivo de entorno.

No lo llames `process.env` ni `.env-custom` ni de ninguna otra manera.

- Sigue [estas instrucciones](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) para exportar tu clave privada
- Consulta a continuación para obtener la URL HTTP de la API de Alchemy

![Animated walkthrough of getting an Alchemy API key](./get-alchemy-api-key.gif)

Tu `.env` debería verse así:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Para conectar realmente esto a nuestro código, haremos referencia a estas variables en nuestro archivo `hardhat.config.js` en el paso 13.

### Paso 12: Instalar Ethers.js {#step-12-install-ethersjs}

Ethers.js es una biblioteca que facilita la interacción y la realización de solicitudes a Ethereum al envolver los [métodos estándar JSON-RPC](/developers/docs/apis/json-rpc/) con métodos más fáciles de usar.

Hardhat nos permite integrar [complementos](https://hardhat.org/plugins/) para herramientas adicionales y funcionalidad extendida. Aprovecharemos el [complemento Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) para el despliegue de contratos.

En el directorio de tu proyecto escribe:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### Paso 13: Actualizar hardhat.config.js {#step-13-update-hardhat-configjs}

Hemos añadido varias dependencias y complementos hasta ahora, ahora necesitamos actualizar `hardhat.config.js` para que nuestro proyecto sepa de todos ellos.

Actualiza tu `hardhat.config.js` para que se vea así:

```javascript
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")

const { API_URL, PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
}
```

### Paso 14: Compilar nuestro contrato {#step-14-compile-our-contract}

Para asegurarnos de que todo funciona hasta ahora, compilemos nuestro contrato. La tarea `compile` es una de las tareas integradas de Hardhat.

Desde la línea de comandos ejecuta:

```bash
npx hardhat compile
```

Es posible que recibas una advertencia sobre `SPDX license identifier not provided in source file`, pero no hay de qué preocuparse; ¡con suerte, todo lo demás se ve bien! Si no es así, siempre puedes enviar un mensaje en el [Discord de Alchemy](https://discord.gg/u72VCg3).

### Paso 15: Escribir nuestro script de despliegue {#step-15-write-our-deploy-script}

Ahora que nuestro contrato está escrito y nuestro archivo de configuración está listo, es hora de escribir nuestro script de despliegue de contrato.

Navega a la carpeta `scripts/` y crea un nuevo archivo llamado `deploy.js`, añadiendo el siguiente contenido en él:

```javascript
async function main() {
  const HelloWorld = await ethers.getContratoFactory("HelloWorld")

  // Iniciar el despliegue, devolviendo una promesa que se resuelve en un objeto de contrato
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Contract deployed to address:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat hace un trabajo increíble al explicar qué hace cada una de estas líneas de código en su [tutorial de Contratos](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), hemos adoptado sus explicaciones aquí.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

Un `ContractFactory` en ethers.js es una abstracción utilizada para desplegar nuevos contratos inteligentes, por lo que `HelloWorld` aquí es una [fábrica](<https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)>) para instancias de nuestro contrato hello world. Al usar el complemento `hardhat-ethers`, `ContractFactory` y `Contract`, las instancias se conectan al primer firmante (propietario) de forma predeterminada.

```javascript
const hello_world = await HelloWorld.deploy()
```

Llamar a `deploy()` en un `ContractFactory` iniciará el despliegue y devolverá una `Promise` que se resuelve en un objeto `Contract`. Este es el objeto que tiene un método para cada una de las funciones de nuestro contrato inteligente.

### Paso 16: Desplegar nuestro contrato {#step-16-deploy-our-contract}

¡Finalmente estamos listos para desplegar nuestro contrato inteligente! Navega a la línea de comandos y ejecuta:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

A continuación, deberías ver algo como:

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Por favor, guarda esta dirección**. La usaremos más adelante en el tutorial.

Si vamos a [Etherscan de Goerli](https://goerli.etherscan.io) y buscamos la dirección de nuestro contrato, deberíamos poder ver que se ha desplegado con éxito. La transacción se verá algo así:

![](./etherscan-contract.png)

La dirección `From` debe coincidir con la dirección de tu cuenta de MetaMask y la dirección `To` dirá **Contract Creation**. Si hacemos clic en la transacción, veremos la dirección de nuestro contrato en el campo `To`.

![](./etherscan-transaction.png)

¡Felicidades! Acabas de desplegar un contrato inteligente en una red de prueba de Ethereum.

Para entender cómo funciona internamente, naveguemos a la pestaña Explorer en nuestro [panel de Alchemy](https://dashboard.alchemy.com/explorer). Si tienes varias aplicaciones de Alchemy, asegúrate de filtrar por aplicación y seleccionar **Hello World**.

![](./hello-world-explorer.png)

Aquí verás un puñado de métodos JSON-RPC que Hardhat/Ethers hicieron internamente por nosotros cuando llamamos a la función `.deploy()`. Dos métodos importantes aquí son [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction), que es la solicitud para escribir nuestro contrato en la cadena Goerli, y [`eth_getTransactionByHash`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-by-hash), que es una solicitud para leer información sobre nuestra transacción dado el hash. Para obtener más información sobre el envío de transacciones, consulta [nuestro tutorial sobre cómo enviar transacciones usando Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

## Parte 2: Interactúa con tu contrato inteligente {#part-2-interact-with-your-smart-contract}

Ahora que hemos desplegado con éxito un contrato inteligente en la red Goerli, aprendamos a interactuar con él.

### Crea un archivo interact.js {#create-a-interactjs-file}

Este es el archivo donde escribiremos nuestro script de interacción. Usaremos la biblioteca Ethers.js que instalaste previamente en la Parte 1.

Dentro de la carpeta `scripts/`, crea un nuevo archivo llamado `interact.js` y añade el siguiente código:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### Actualiza tu archivo .env {#update-your-env-file}

Usaremos nuevas variables de entorno, por lo que necesitamos definirlas en el archivo `.env` que [creamos anteriormente](#step-11-connect-metamask-alchemy-to-your-project).

Necesitaremos añadir una definición para nuestra `API_KEY` de Alchemy y la `CONTRACT_ADDRESS` donde se desplegó tu contrato inteligente.

Tu archivo `.env` debería verse más o menos así:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### Obtén el ABI de tu contrato {#grab-your-contract-abi}

El [ABI (Interfaz Binaria de Aplicación)](/glossary/#abi) de nuestro contrato es la interfaz para interactuar con nuestro contrato inteligente. Hardhat genera automáticamente un ABI y lo guarda en `HelloWorld.json`. Para usar el ABI, necesitaremos analizar el contenido añadiendo las siguientes líneas de código a nuestro archivo `interact.js`:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

Si quieres ver el ABI, puedes imprimirlo en tu consola:

```javascript
console.log(JSON.stringify(contract.abi))
```

Para ver tu ABI impreso en la consola, navega a tu terminal y ejecuta:

```bash
npx hardhat run scripts/interact.js
```

### Crea una instancia de tu contrato {#create-an-instance-of-your-contract}

Para interactuar con nuestro contrato, necesitamos crear una instancia del contrato en nuestro código. Para hacerlo con Ethers.js, necesitaremos trabajar con tres conceptos:

1. Proveedor (Proveedor): un proveedor de nodo que te da acceso de lectura y escritura a la cadena de bloques.
2. Firmante (Firmante): representa una cuenta de Ethereum que puede firmar transacciones.
3. Contrato (Contract): un objeto de Ethers.js que representa un contrato específico desplegado en la cadena.

Usaremos el ABI del contrato del paso anterior para crear nuestra instancia del contrato:

```javascript
// interact.js

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Contract
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

Aprende más sobre Proveedores, Firmantes y Contratos en la [documentación de ethers.js](https://docs.ethers.io/v5/).

### Lee el mensaje de inicio {#read-the-init-message}

¿Recuerdas cuando desplegamos nuestro contrato con el `initMessage = "Hello world!"`? Ahora vamos a leer ese mensaje almacenado en nuestro contrato inteligente e imprimirlo en la consola.

En JavaScript, las funciones asíncronas se utilizan al interactuar con redes. Para aprender más sobre funciones asíncronas, [lee este artículo de Medium](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

Usa el código a continuación para llamar a la función `message` en nuestro contrato inteligente y leer el mensaje de inicio:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

Después de ejecutar el archivo usando `npx hardhat run scripts/interact.js` en la terminal, deberíamos ver esta respuesta:

```
El mensaje es: Hello world!
```

¡Felicidades! Acabas de leer con éxito datos de un contrato inteligente de la cadena de bloques de Ethereum, ¡bien hecho!

### Actualiza el mensaje {#update-the-message}

En lugar de solo leer el mensaje, ¡también podemos actualizar el mensaje guardado en nuestro contrato inteligente usando la función `update`! Genial, ¿verdad?

Para actualizar el mensaje, podemos llamar directamente a la función `update` en nuestro objeto Contract instanciado:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("This is the new message.")
  await tx.wait()
}
main()
```

Ten en cuenta que en la línea 11, hacemos una llamada a `.wait()` en el objeto de transacción devuelto. Esto asegura que nuestro script espere a que la transacción sea minada en la cadena de bloques antes de salir de la función. Si no se incluye la llamada a `.wait()`, es posible que el script no vea el valor actualizado de `message` en el contrato.

### Lee el nuevo mensaje {#read-the-new-message}

Deberías poder repetir el [paso anterior](#read-the-init-message) para leer el valor actualizado de `message`. ¡Tómate un momento y mira si puedes hacer los cambios necesarios para imprimir ese nuevo valor!

Si necesitas una pista, así es como debería verse tu archivo `interact.js` en este punto:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// proveedor - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// firmante - tú
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// instancia del contrato
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("this is the new message")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("The new message is: " + newMessage)
}

main()
```

¡Ahora solo ejecuta el script y deberías poder ver el mensaje antiguo, el estado de actualización y el nuevo mensaje impresos en tu terminal!

`npx hardhat run scripts/interact.js --network goerli`

```
El mensaje es: Hello World!
Actualizando el mensaje...
El nuevo mensaje es: This is the new message.
```

Al ejecutar ese script, es posible que notes que el paso `Updating the message...` tarda un poco en cargar antes de que se cargue el nuevo mensaje. Esto se debe al proceso de minería; si tienes curiosidad por rastrear las transacciones mientras se minan, visita la [mempool de Alchemy](https://dashboard.alchemy.com/mempool) para ver el estado de una transacción. Si la transacción se descarta, también es útil consultar [Etherscan de Goerli](https://goerli.etherscan.io) y buscar el hash de tu transacción.

## Parte 3: Publicar tu contrato inteligente en Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

Hiciste todo el trabajo duro de darle vida a tu contrato inteligente; ¡ahora es el momento de compartirlo con el mundo!

Al verificar tu contrato inteligente en Etherscan, cualquiera puede ver tu código fuente e interactuar con tu contrato inteligente. ¡Empecemos!

### Paso 1: Generar una clave API en tu cuenta de Etherscan {#step-1-generate-an-api-key-on-your-etherscan-account}

Una clave API de Etherscan es necesaria para verificar que eres el propietario del contrato inteligente que estás intentando publicar.

Si aún no tienes una cuenta de Etherscan, [regístrate para obtener una cuenta](https://etherscan.io/register).

Una vez que hayas iniciado sesión, busca tu nombre de usuario en la barra de navegación, pasa el cursor sobre él y selecciona el botón **My profile** (Mi perfil).

En tu página de perfil, deberías ver una barra de navegación lateral. En la barra de navegación lateral, selecciona **API Keys**. A continuación, presiona el botón "Add" (Añadir) para crear una nueva clave API, nombra tu aplicación **hello-world** y presiona el botón **Create New API Key** (Crear nueva clave API).

Tu nueva clave API debería aparecer en la tabla de claves API. Copia la clave API en tu portapapeles.

A continuación, necesitamos añadir la clave API de Etherscan a nuestro archivo `.env`.

Después de añadirla, tu archivo `.env` debería verse así:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Contratos inteligentes desplegados con Hardhat {#hardhat-deployed-smart-contracts}

#### Instalar hardhat-etherscan {#install-hardhat-etherscan}

Publicar tu contrato en Etherscan usando Hardhat es sencillo. Primero necesitarás instalar el complemento `hardhat-etherscan` para empezar. `hardhat-etherscan` verificará automáticamente el código fuente y el ABI del contrato inteligente en Etherscan. Para añadir esto, en el directorio `hello-world` ejecuta:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

Una vez instalado, incluye la siguiente declaración en la parte superior de tu `hardhat.config.js` y añade las opciones de configuración de Etherscan:

```javascript
// hardhat.config.js

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Tu clave API para Etherscan
    // Obtén una en https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Verificar tu contrato inteligente en Etherscan {#verify-your-smart-contract-on-etherscan}

Asegúrate de que todos los archivos estén guardados y de que todas las variables de `.env` estén configuradas correctamente.

Ejecuta la tarea `verify`, pasando la dirección del contrato y la red donde está desplegado:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

Asegúrate de que `DEPLOYED_CONTRACT_ADDRESS` sea la dirección de tu contrato inteligente desplegado en la red de prueba Goerli. Además, el argumento final (`'Hello World!'`) debe ser el mismo valor de cadena utilizado [durante el paso de despliegue en la parte 1](#step-15-write-our-deploy-script).

Si todo va bien, verás el siguiente mensaje en tu terminal:

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

¡Felicidades! ¡El código de tu contrato inteligente está en Etherscan!

### ¡Echa un vistazo a tu contrato inteligente en Etherscan! {#check-out-your-smart-contract-on-etherscan}

Cuando navegues al enlace proporcionado en tu terminal, ¡deberías poder ver el código de tu contrato inteligente y el ABI publicados en Etherscan!

**¡Guau, lo lograste, campeón! ¡Ahora cualquiera puede llamar o escribir en tu contrato inteligente! ¡Estamos ansiosos por ver qué construyes a continuación!**

## Parte 4: Integrar su contrato inteligente con el frontend {#part-4-integrating-your-smart-contract-with-the-frontend}

Al final de este tutorial, sabrá cómo:

- Conectar una billetera MetaMask a su aplicación descentralizada (dapp)
- Leer datos de su contrato inteligente utilizando la API de [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)
- Firmar transacciones de Ethereum utilizando MetaMask

Para esta dapp, utilizaremos [React](https://react.dev/) como nuestro marco de frontend; sin embargo, es importante tener en cuenta que no pasaremos mucho tiempo desglosando sus fundamentos, ya que nos centraremos principalmente en aportar la funcionalidad de Web3 a nuestro proyecto.

Como requisito previo, debe tener un nivel de comprensión de principiante sobre React. Si no es así, le recomendamos completar el [tutorial oficial de introducción a React](https://react.dev/learn).

### Clonar los archivos de inicio {#clone-the-starter-files}

Primero, vaya al [repositorio de GitHub hello-world-part-four](https://github.com/alchemyplatform/hello-world-part-four-tutorial) para obtener los archivos de inicio de este proyecto y clone este repositorio en su máquina local.

Abra el repositorio clonado localmente. Tenga en cuenta que contiene dos carpetas: `starter-files` y `completed`.

- `starter-files`: **trabajaremos en este directorio**, conectaremos la interfaz de usuario a su billetera de Ethereum y al contrato inteligente que publicamos en Etherscan en la [Parte 3](#part-3-publish-your-smart-contract-to-etherscan).
- `completed` contiene todo el tutorial completado y solo debe usarse como referencia si se queda atascado.

A continuación, abra su copia de `starter-files` en su editor de código favorito y luego navegue hasta la carpeta `src`.

Todo el código que escribiremos vivirá en la carpeta `src`. Editaremos el componente `HelloWorld.js` y los archivos JavaScript `util/interact.js` para darle a nuestro proyecto la funcionalidad de Web3.

### Revisar los archivos de inicio {#check-out-the-starter-files}

Antes de empezar a programar, exploremos lo que se nos proporciona en los archivos de inicio.

#### Poner en marcha su proyecto de React {#get-your-react-project-running}

Comencemos ejecutando el proyecto de React en nuestro navegador. La belleza de React es que una vez que tenemos nuestro proyecto ejecutándose en nuestro navegador, cualquier cambio que guardemos se actualizará en vivo en nuestro navegador.

Para poner en marcha el proyecto, navegue hasta el directorio raíz de la carpeta `starter-files` y ejecute `npm install` en su terminal para instalar las dependencias del proyecto:

```bash
cd starter-files
npm install
```

Una vez que hayan terminado de instalarse, ejecute `npm start` en su terminal:

```bash
npm start
```

Al hacerlo, debería abrirse [http://localhost:3000/](http://localhost:3000/) en su navegador, donde verá el frontend de nuestro proyecto. Debería constar de un campo (un lugar para actualizar el mensaje almacenado en su contrato inteligente), un botón "Connect Wallet" (Conectar billetera) y un botón "Update" (Actualizar).

Si intenta hacer clic en cualquiera de los botones, notará que no funcionan; eso se debe a que todavía necesitamos programar su funcionalidad.

#### El componente `HelloWorld.js` {#the-helloworld-js-component}

Volvamos a la carpeta `src` en nuestro editor y abramos el archivo `HelloWorld.js`. Es muy importante que entendamos todo en este archivo, ya que es el componente principal de React en el que trabajaremos.

En la parte superior de este archivo, notará que tenemos varias declaraciones de importación que son necesarias para que nuestro proyecto funcione, incluida la biblioteca de React, los hooks useEffect y useState, algunos elementos de `./util/interact.js` (¡los describiremos con más detalle pronto!) y el logotipo de Alchemy.

```javascript
// HelloWorld.js

import React from "react"
import { useEffect, useState } from "react"
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
} from "./util/interact.js"

import alchemylogo from "./alchemylogo.svg"
```

A continuación, tenemos nuestras variables de estado que actualizaremos después de eventos específicos.

```javascript
// HelloWorld.js

//Variables de estado
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

Esto es lo que representa cada una de las variables:

- `walletAddress`: una cadena que almacena la dirección de la billetera del usuario
- `status`: una cadena que almacena un mensaje útil que guía al usuario sobre cómo interactuar con la dapp
- `message`: una cadena que almacena el mensaje actual en el contrato inteligente
- `newMessage`: una cadena que almacena el nuevo mensaje que se escribirá en el contrato inteligente

Después de las variables de estado, verá cinco funciones no implementadas: `useEffect`, `addSmartContractListener`, `addWalletListener`, `connectWalletPressed` y `onUpdatePressed`. Explicaremos qué hacen a continuación:

```javascript
// HelloWorld.js

//llamada solo una vez
useEffect(async () => {
  //TODO: implementararararar
}, [])

function addSmartContractListener() {
  //TODO: implement
}

function addWalletListener() {
  //TODO: implement
}

const connectWalletPressed = async () => {
  //TODO: implement
}

const onUpdatePressed = async () => {
  //TODO: implement
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html): este es un hook de React que se llama después de que se renderiza su componente. Debido a que se le pasa una propiedad de matriz vacía `[]` (consulte la línea 4), solo se llamará en el _primer_ renderizado del componente. Aquí cargaremos el mensaje actual almacenado en nuestro contrato inteligente, llamaremos a los oyentes de nuestro contrato inteligente y billetera, y actualizaremos nuestra interfaz de usuario para reflejar si ya hay una billetera conectada.
- `addSmartContractListener`: esta función configura un oyente que observará el evento `UpdatedMessages` de nuestro contrato HelloWorld y actualizará nuestra interfaz de usuario cuando se cambie el mensaje en nuestro contrato inteligente.
- `addWalletListener`: esta función configura un oyente que detecta cambios en el estado de la billetera MetaMask del usuario, como cuando el usuario desconecta su billetera o cambia de dirección.
- `connectWalletPressed`: se llamará a esta función para conectar la billetera MetaMask del usuario a nuestra dapp.
- `onUpdatePressed`: se llamará a esta función cuando el usuario quiera actualizar el mensaje almacenado en el contrato inteligente.

Cerca del final de este archivo, tenemos la interfaz de usuario de nuestro componente.

```javascript
// HelloWorld.js

//la interfaz de usuario de nuestro componente
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Current Message:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>New Message:</h2>

    <div>
      <input
        type="text"
        placeholder="Update the message in your smart contract."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Update
      </button>
 
</div>
 
</div>
)
```

Si examina este código detenidamente, notará dónde usamos nuestras diversas variables de estado en nuestra interfaz de usuario:

- En las líneas 6-12, si la billetera del usuario está conectada (es decir, `walletAddress.length > 0`), mostramos una versión truncada de la `walletAddress` del usuario en el botón con el ID "walletButton"; de lo contrario, simplemente dice "Connect Wallet" (Conectar billetera).
- En la línea 17, mostramos el mensaje actual almacenado en el contrato inteligente, que se captura en la cadena `message`.
- En las líneas 23-26, usamos un [componente controlado](https://legacy.reactjs.org/docs/forms.html#controlled-components) para actualizar nuestra variable de estado `newMessage` cuando cambia la entrada en el campo de texto.

Además de nuestras variables de estado, también verá que las funciones `connectWalletPressed` y `onUpdatePressed` se llaman cuando se hace clic en los botones con los ID `publishButton` y `walletButton` respectivamente.

Finalmente, abordemos dónde se agrega este componente `HelloWorld.js`.

Si va al archivo `App.js`, que es el componente principal en React que actúa como contenedor para todos los demás componentes, verá que nuestro componente `HelloWorld.js` se inyecta en la línea 7.

Por último, pero no menos importante, revisemos un archivo más que se le proporciona, el archivo `interact.js`.

#### El archivo `interact.js` {#the-interact-js-file}

Debido a que queremos seguir el paradigma [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), querremos un archivo separado que contenga todas nuestras funciones para administrar la lógica, los datos y las reglas de nuestra dapp, y luego poder exportar esas funciones a nuestro frontend (nuestro componente `HelloWorld.js`).

👆🏽¡Este es el propósito exacto de nuestro archivo `interact.js`!

Navegue a la carpeta `util` en su directorio `src`, y notará que hemos incluido un archivo llamado `interact.js` que contendrá todas nuestras funciones y variables de interacción de contratos inteligentes y billeteras.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

Notará en la parte superior del archivo que hemos comentado el objeto `helloWorldContract`. Más adelante en este tutorial, descomentaremos este objeto e instanciaremos nuestro contrato inteligente en esta variable, que luego exportaremos a nuestro componente `HelloWorld.js`.

Las cuatro funciones no implementadas después de nuestro objeto `helloWorldContract` hacen lo siguiente:

- `loadCurrentMessage`: esta función maneja la lógica de cargar el mensaje actual almacenado en el contrato inteligente. Realizará una llamada de _lectura_ al contrato inteligente Hello World utilizando la [API de Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
- `connectWallet`: esta función conectará el MetaMask del usuario a nuestra dapp.
- `getCurrentWalletConnected`: esta función verificará si una cuenta de Ethereum ya está conectada a nuestra dapp al cargar la página y actualizará nuestra interfaz de usuario en consecuencia.
- `updateMessage`: esta función actualizará el mensaje almacenado en el contrato inteligente. Realizará una llamada de _escritura_ al contrato inteligente Hello World, por lo que la billetera MetaMask del usuario tendrá que firmar una transacción de Ethereum para actualizar el mensaje.

Ahora que entendemos con qué estamos trabajando, ¡averigüemos cómo leer de nuestro contrato inteligente!

### Paso 3: Leer de su contrato inteligente {#step-3-read-from-your-smart-contract}

Para leer de su contrato inteligente, deberá configurar correctamente:

- Una conexión API a la cadena de Ethereum
- Una instancia cargada de su contrato inteligente
- Una función para llamar a la función de su contrato inteligente
- Un oyente para observar las actualizaciones cuando cambian los datos que está leyendo del contrato inteligente

Esto puede sonar como muchos pasos, ¡pero no se preocupe! ¡Le guiaremos sobre cómo hacer cada uno de ellos paso a paso! :\)

#### Establecer una conexión API a la cadena de Ethereum

¿Recuerdas cómo en la Parte 2 de este tutorial usamos nuestra clave de Alchemy Web3 para leer de nuestro contrato inteligente? También necesitarás una clave de Alchemy Web3 en tu aplicación descentralizada (dapp) para leer de la cadena.

Si aún no la tienes, primero instala [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) navegando al directorio raíz de tus `starter-files` y ejecutando lo siguiente en tu terminal:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) es un envoltorio (wrapper) alrededor de [Web3.js](https://docs.web3js.org/), que proporciona métodos de API mejorados y otros beneficios cruciales para hacer tu vida como desarrollador de Web3 más fácil. ¡Está diseñado para requerir una configuración mínima para que puedas comenzar a usarlo en tu aplicación de inmediato!

Luego, instala el paquete [dotenv](https://www.npmjs.com/package/dotenv) en el directorio de tu proyecto, para que tengamos un lugar seguro donde almacenar nuestra clave API después de obtenerla.

```text
npm install dotenv --save
```

Para nuestra dapp, **usaremos nuestra clave API de Websockets** en lugar de nuestra clave API de HTTP, ya que nos permitirá configurar un oyente (listener) que detecte cuándo cambia el mensaje almacenado en el contrato inteligente.

Una vez que tengas tu clave API, crea un archivo `.env` en tu directorio raíz y añade tu URL de Websockets de Alchemy en él. Después, tu archivo `.env` debería verse así:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

¡Ahora estamos listos para configurar nuestro punto de conexión (endpoint) de Alchemy Web3 en nuestra dapp! Volvamos a nuestro `interact.js`, que está anidado dentro de nuestra carpeta `util`, y añadamos el siguiente código en la parte superior del archivo:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

Arriba, primero importamos la clave de Alchemy desde nuestro archivo `.env` y luego pasamos nuestra `alchemyKey` a `createAlchemyWeb3` para establecer nuestro punto de conexión de Alchemy Web3.

Con este punto de conexión listo, ¡es hora de cargar nuestro contrato inteligente!
#### Cargar su contrato inteligente Hello World {#loading-your-hello-world-smart-contract}

Para cargar su contrato inteligente Hello World, necesitará la dirección de su contrato y el ABI, los cuales se pueden encontrar en Etherscan si completó la [Parte 3 de este tutorial.](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)

#### Cómo obtener el ABI de su contrato desde Etherscan {#how-to-get-your-contract-abi-from-etherscan}

Si se saltó la Parte 3 de este tutorial, puede usar el contrato HelloWorld con la dirección [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code). Su ABI se puede encontrar [aquí](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

Un ABI de contrato es necesario para especificar qué función invocará un contrato, así como para garantizar que la función devuelva los datos en el formato que espera. Una vez que hayamos copiado el ABI de nuestro contrato, guardémoslo como un archivo JSON llamado `contract-abi.json` en su directorio `src`.

Su contract-abi.json debe almacenarse en su carpeta src.

Armados con la dirección de nuestro contrato, el ABI y el punto de conexión de Alchemy Web3, podemos usar el [método contract](https://docs.web3js.org/api/web3-eth-contract/class/Contract) para cargar una instancia de nuestro contrato inteligente. Importe el ABI de su contrato en el archivo `interact.js` y agregue la dirección de su contrato.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

Ahora finalmente podemos descomentar nuestra variable `helloWorldContract` y cargar el contrato inteligente utilizando nuestro punto de conexión de AlchemyWeb3:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Para recapitular, las primeras 12 líneas de su `interact.js` ahora deberían verse así:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"

export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Ahora que tenemos nuestro contrato cargado, ¡podemos implementar nuestra función `loadCurrentMessage`!

#### Implementar `loadCurrentMessage` en su archivo `interact.js` {#implementing-loadcurrentmessage-in-your-interact-js-file}

Esta función es súper simple. Vamos a hacer una simple llamada asíncrona de Web3 para leer de nuestro contrato. Nuestra función devolverá el mensaje almacenado en el contrato inteligente:

Actualice `loadCurrentMessage` en su archivo `interact.js` a lo siguiente:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

Dado que queremos mostrar este contrato inteligente en nuestra interfaz de usuario, actualicemos la función `useEffect` en nuestro componente `HelloWorld.js` a lo siguiente:

```javascript
// HelloWorld.js

//llamada solo una vez
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

Tenga en cuenta que solo queremos que se llame a nuestro `loadCurrentMessage` una vez durante el primer renderizado del componente. Pronto implementaremos `addSmartContractListener` para actualizar automáticamente la interfaz de usuario después de que cambie el mensaje en el contrato inteligente.

Antes de sumergirnos en nuestro oyente, ¡revisemos lo que tenemos hasta ahora! Guarde sus archivos `HelloWorld.js` y `interact.js`, y luego vaya a [http://localhost:3000/](http://localhost:3000/)

Notará que el mensaje actual ya no dice "No connection to the network" (Sin conexión a la red). En su lugar, refleja el mensaje almacenado en el contrato inteligente. ¡Genial!

#### Su interfaz de usuario ahora debería reflejar el mensaje almacenado en el contrato inteligente {#your-ui-should-now-reflect-the-message-stored-in-the-smart-contract}

Ahora hablando de ese oyente...

#### Implementar `addSmartContractListener` {#implement-addsmartcontractlistener}

Si recuerda el archivo `HelloWorld.sol` que escribimos en la [Parte 1 de esta serie de tutoriales](#step-10-write-our-contract), recordará que hay un evento de contrato inteligente llamado `UpdatedMessages` que se emite después de que se invoca la función `update` de nuestro contrato inteligente (consulte las líneas 9 y 27):

```javascript
// HelloWorld.sol

// Especifica la versión de Solidity, utilizando el versionado semántico.
// Aprende más: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Define un contrato llamado `HelloWorld`.
// Un contrato es una colección de funciones y datos (su estado). Una vez desplegado, un contrato reside en una dirección específica en la cadena de bloques de Ethereum. Aprende más: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitido cuando se llama a la función de actualización
   //Los eventos de un contrato inteligente son una forma de que tu contrato comunique que algo sucedió en la cadena de bloques al front-end de tu aplicación, el cual puede estar 'escuchando' ciertos eventos y tomar medidas cuando ocurran.
   event UpdatedMessages(string oldStr, string newStr);

   // Declara una variable de estado `message` de tipo `string`.
   // Las variables de estado son variables cuyos valores se almacenan permanentemente en el almacenamiento del contrato. La palabra clave `public` hace que las variables sean accesibles desde fuera de un contrato y crea una función que otros contratos o clientes pueden llamar para acceder al valor.
   string public message;

   // De manera similar a muchos lenguajes orientados a objetos basados en clases, un constructor es una función especial que solo se ejecuta en la creación del contrato.
   // Los constructores se utilizan para inicializar los datos del contrato. Aprende más:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Acepta un argumento de cadena `initMessage` y establece el valor en la variable de almacenamiento `message` del contrato).
      message = initMessage;
   }

   // Una función pública que acepta un argumento de cadena y actualiza la variable de almacenamiento `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Los eventos de contratos inteligentes son una forma de que su contrato comunique que algo sucedió (es decir, hubo un _evento_) en la cadena de bloques a su aplicación front-end, que puede estar 'escuchando' eventos específicos y tomar medidas cuando suceden.

La función `addSmartContractListener` va a escuchar específicamente el evento `UpdatedMessages` de nuestro contrato inteligente Hello World y actualizará nuestra interfaz de usuario para mostrar el nuevo mensaje.

Modifique `addSmartContractListener` a lo siguiente:

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 Your message has been updated!")
    }
  })
}
```

Desglosemos lo que sucede cuando el oyente detecta un evento:

- Si ocurre un error cuando se emite el evento, se reflejará en la interfaz de usuario a través de nuestra variable de estado `status`.
- De lo contrario, usaremos el objeto `data` devuelto. `data.returnValues` es una matriz indexada en cero donde el primer elemento de la matriz almacena el mensaje anterior y el segundo elemento almacena el actualizado. En conjunto, en un evento exitoso, estableceremos nuestra cadena `message` en el mensaje actualizado, borraremos la cadena `newMessage` y actualizaremos nuestra variable de estado `status` para reflejar que se ha publicado un nuevo mensaje en nuestro contrato inteligente.

Finalmente, llamemos a nuestro oyente en nuestra función `useEffect` para que se inicialice en el primer renderizado del componente `HelloWorld.js`. En conjunto, su función `useEffect` debería verse así:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

Ahora que podemos leer de nuestro contrato inteligente, ¡sería genial descubrir cómo escribir en él también! Sin embargo, para escribir en nuestra dapp, primero debemos tener una billetera de Ethereum conectada a ella.

Por lo tanto, a continuación abordaremos la configuración de nuestra billetera de Ethereum (MetaMask) y luego la conectaremos a nuestra dapp.

### Paso 4: Configurar su billetera de Ethereum {#step-4-set-up-your-ethereum-wallet}

Para escribir cualquier cosa en la cadena de Ethereum, los usuarios deben firmar transacciones utilizando las claves privadas de su billetera virtual. Para este tutorial, usaremos [MetaMask](https://metamask.io/), una billetera virtual en el navegador que se usa para administrar la dirección de su cuenta de Ethereum, ya que hace que esta firma de transacciones sea muy fácil para el usuario final.

Si desea comprender más sobre cómo funcionan las transacciones en Ethereum, consulte [esta página](/developers/docs/transactions/) de la Fundación Ethereum.

#### Descargar MetaMask {#download-metamask}

Puede descargar y crear una cuenta de MetaMask de forma gratuita [aquí](https://metamask.io/download). Cuando esté creando una cuenta, o si ya tiene una, asegúrese de cambiar a la "Goerli Test Network" (Red de prueba Goerli) en la parte superior derecha (para que no estemos lidiando con dinero real).

#### Agregar ether desde un faucet {#add-ether-from-a-faucet}

Para firmar una transacción en la cadena de bloques de Ethereum, necesitaremos algo de ETH falso. Para obtener ETH, puede ir al [FaucETH](https://fauceth.komputing.org) e ingresar la dirección de su cuenta de Goerli, hacer clic en "Request funds" (Solicitar fondos), luego seleccionar "Ethereum Testnet Goerli" en el menú desplegable y finalmente hacer clic en el botón "Request funds" nuevamente. ¡Debería ver ETH en su cuenta de MetaMask poco después!

#### Comprueba tu saldo

Para comprobar que nuestro saldo está ahí, hagamos una solicitud [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) utilizando la [herramienta sandbox de Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Esto devolverá la cantidad de ETH en nuestra billetera. Después de ingresar la dirección de tu cuenta de MetaMask y hacer clic en "Send Request" (Enviar solicitud), deberías ver una respuesta como esta:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**NOTA:** Este resultado está en wei, no en ether. Wei se utiliza como la denominación más pequeña de ether. La conversión de wei a ether es: 1 ether = 10¹⁸ wei. Así que si convertimos 0xde0b6b3a7640000 a decimal obtenemos 1\*10¹⁸, lo que equivale a 1 ether.

¡Uf! ¡Nuestro dinero falso está todo ahí! 🤑
### Paso 5: Conectar MetaMask a su interfaz de usuario {#step-5-connect-metamask-to-your-ui}

Ahora que nuestra billetera MetaMask está configurada, ¡conectemos nuestra dapp a ella!

#### La función `connectWallet` {#the-connectwallet-function}

En nuestro archivo `interact.js`, implementemos la función `connectWallet`, que luego podemos llamar en nuestro componente `HelloWorld.js`.

Modifiquemos `connectWallet` a lo siguiente:

```javascript
// interact.js

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Entonces, ¿qué hace exactamente este bloque gigante de código?

Bueno, primero, verifica si `window.ethereum` está habilitado en su navegador.

`window.ethereum` es una API global inyectada por MetaMask y otros proveedores de billeteras que permite a los sitios web solicitar las cuentas de Ethereum de los usuarios. Si se aprueba, puede leer datos de las cadenas de bloques a las que está conectado el usuario y sugerir que el usuario firme mensajes y transacciones. ¡Consulte la [documentación de MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) para obtener más información!

Si `window.ethereum` _no está_ presente, eso significa que MetaMask no está instalado. Esto da como resultado que se devuelva un objeto JSON, donde `address` devuelto es una cadena vacía, y el objeto JSX `status` transmite que el usuario debe instalar MetaMask.

Ahora, si `window.ethereum` _está_ presente, entonces es cuando las cosas se ponen interesantes.

Usando un bucle try/catch, intentaremos conectarnos a MetaMask llamando a [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Llamar a esta función abrirá MetaMask en el navegador, por lo que se le pedirá al usuario que conecte su billetera a su dapp.

- Si el usuario elige conectarse, `method: "eth_requestAccounts"` devolverá una matriz que contiene todas las direcciones de cuenta del usuario que se conectaron a la dapp. En conjunto, nuestra función `connectWallet` devolverá un objeto JSON que contiene la _primera_ `address` en esta matriz (consulte la línea 9) y un mensaje `status` que solicita al usuario que escriba un mensaje en el contrato inteligente.
- Si el usuario rechaza la conexión, entonces el objeto JSON contendrá una cadena vacía para la `address` devuelta y un mensaje `status` que refleja que el usuario rechazó la conexión.

Ahora que hemos escrito esta función `connectWallet`, el siguiente paso es llamarla en nuestro componente `HelloWorld.js`.

#### Agregar la función `connectWallet` a su componente de interfaz de usuario `HelloWorld.js` {#add-the-connectwallet-function-to-your-helloworld-js-ui-component}

Navegue a la función `connectWalletPressed` en `HelloWorld.js` y actualícela a lo siguiente:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

¿Nota cómo la mayor parte de nuestra funcionalidad se abstrae de nuestro componente `HelloWorld.js` desde el archivo `interact.js`? ¡Esto es para que cumplamos con el paradigma M-V-C!

En `connectWalletPressed`, simplemente hacemos una llamada await a nuestra función importada `connectWallet`, y usando su respuesta, actualizamos nuestras variables `status` y `walletAddress` a través de sus hooks de estado.

Ahora, guardemos ambos archivos (`HelloWorld.js` y `interact.js`) y probemos nuestra interfaz de usuario hasta ahora.

Abra su navegador en la página [http://localhost:3000/](http://localhost:3000/) y presione el botón "Connect Wallet" (Conectar billetera) en la parte superior derecha de la página.

Si tiene MetaMask instalado, se le pedirá que conecte su billetera a su dapp. Acepte la invitación para conectarse.

¡Debería ver que el botón de la billetera ahora refleja que su dirección está conectada! Siiiiii 🔥

A continuación, intente actualizar la página... esto es extraño. Nuestro botón de billetera nos pide que conectemos MetaMask, a pesar de que ya está conectado...

Sin embargo, ¡no tema! ¡Podemos solucionar eso fácilmente implementando `getCurrentWalletConnected`, que verificará si una dirección ya está conectada a nuestra dapp y actualizará nuestra interfaz de usuario en consecuencia!

#### La función `getCurrentWalletConnected` {#the-getcurrentwalletconnected-function}

Actualice su función `getCurrentWalletConnected` en el archivo `interact.js` a lo siguiente:

```javascript
// interact.js

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Este código es _muy_ similar a la función `connectWallet` que acabamos de escribir en el paso anterior.

La principal diferencia es que en lugar de llamar al método `eth_requestAccounts`, que abre MetaMask para que el usuario conecte su billetera, aquí llamamos al método `eth_accounts`, que simplemente devuelve una matriz que contiene las direcciones de MetaMask actualmente conectadas a nuestra dapp.

Para ver esta función en acción, llamémosla en nuestra función `useEffect` de nuestro componente `HelloWorld.js`:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Tenga en cuenta que usamos la respuesta de nuestra llamada a `getCurrentWalletConnected` para actualizar nuestras variables de estado `walletAddress` y `status`.

Ahora que ha agregado este código, intentemos actualizar la ventana de nuestro navegador.

¡Genial! El botón debería decir que está conectado y mostrar una vista previa de la dirección de su billetera conectada, ¡incluso después de actualizar!

#### Implementar `addWalletListener` {#implement-addwalletlistener}

El paso final en la configuración de la billetera de nuestra dapp es implementar el oyente de la billetera para que nuestra interfaz de usuario se actualice cuando cambie el estado de nuestra billetera, como cuando el usuario se desconecta o cambia de cuenta.

En su archivo `HelloWorld.js`, modifique su función `addWalletListener` de la siguiente manera:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

Apuesto a que ni siquiera necesita nuestra ayuda para comprender lo que está sucediendo aquí en este punto, pero por motivos de exhaustividad, desglosémoslo rápidamente:

- Primero, nuestra función verifica si `window.ethereum` está habilitado (es decir, MetaMask está instalado).
  - Si no lo está, simplemente establecemos nuestra variable de estado `status` en una cadena JSX que solicita al usuario que instale MetaMask.
  - Si está habilitado, configuramos el oyente `window.ethereum.on("accountsChanged")` en la línea 3 que escucha los cambios de estado en la billetera MetaMask, que incluyen cuando el usuario conecta una cuenta adicional a la dapp, cambia de cuenta o desconecta una cuenta. Si hay al menos una cuenta conectada, la variable de estado `walletAddress` se actualiza como la primera cuenta en la matriz `accounts` devuelta por el oyente. De lo contrario, `walletAddress` se establece como una cadena vacía.

Por último, pero no menos importante, debemos llamarlo en nuestra función `useEffect`:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

¡Y eso es todo! ¡Hemos completado con éxito la programación de toda la funcionalidad de nuestra billetera! Ahora a nuestra última tarea: ¡actualizar el mensaje almacenado en nuestro contrato inteligente!

### Paso 6: Implementar la función `updateMessage` {#step-6-implement-the-updatemessage-function}

Muy bien familia, ¡hemos llegado a la recta final! En el `updateMessage` de su archivo `interact.js`, vamos a hacer lo siguiente:

1. Asegurarnos de que el mensaje que deseamos publicar en nuestro contrato inteligente sea válido
2. Firmar nuestra transacción utilizando MetaMask
3. Llamar a esta función desde nuestro componente frontend `HelloWorld.js`

Esto no tomará mucho tiempo; ¡terminemos esta dapp!

#### Manejo de errores de entrada {#input-error-handling}

Naturalmente, tiene sentido tener algún tipo de manejo de errores de entrada al comienzo de la función.

Querremos que nuestra función regrese temprano si no hay una extensión de MetaMask instalada, no hay una billetera conectada (es decir, la `address` pasada es una cadena vacía) o el `message` es una cadena vacía. Agreguemos el siguiente manejo de errores a `updateMessage`:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }
}
```

Ahora que tiene un manejo adecuado de errores de entrada, ¡es hora de firmar la transacción a través de MetaMask!

#### Firmar nuestra transacción {#signing-our-transaction}

Si ya se siente cómodo con las transacciones tradicionales de Web3 en Ethereum, el código que escribiremos a continuación le resultará muy familiar. Debajo de su código de manejo de errores de entrada, agregue lo siguiente a `updateMessage`:

```javascript
// interact.js

//configurar los parámetros de la transacción
const transactionParameters = {
  to: contractAddress, // Requerido excepto durante las publicaciones de contratos.
  from: address, // debe coincidir con la dirección activa del usuario.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//firmar la transacción
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    status: (
      <span>
        ✅{" "}
        <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
          View the status of your transaction on Etherscan!
        </a>
        <br />
        ℹ️ Once the transaction is verified by the network, the message will be
        updated automatically.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

Desglosemos lo que está sucediendo. Primero, configuramos los parámetros de nuestras transacciones, donde:

- `to` especifica la dirección del destinatario (nuestro contrato inteligente)
- `from` especifica el firmante de la transacción, la variable `address` que pasamos a nuestra función
- `data` contiene la llamada al método `update` de nuestro contrato inteligente Hello World, recibiendo nuestra variable de cadena `message` como entrada

Luego, hacemos una llamada await, `window.ethereum.request`, donde le pedimos a MetaMask que firme la transacción. Tenga en cuenta que, en las líneas 11 y 12, estamos especificando nuestro método eth, `eth_sendTransaction` y pasando nuestro `transactionParameters`.

En este punto, MetaMask se abrirá en el navegador y le pedirá al usuario que firme o rechace la transacción.

- Si la transacción es exitosa, la función devolverá un objeto JSON donde la cadena JSX `status` solicita al usuario que consulte Etherscan para obtener más información sobre su transacción.
- Si la transacción falla, la función devolverá un objeto JSON donde la cadena `status` transmite el mensaje de error.

En conjunto, nuestra función `updateMessage` debería verse así:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //manejo de errores de entrada
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }

  //configurar los parámetros de la transacción
  const transactionParameters = {
    to: contractAddress, // Requerido excepto durante las publicaciones de contratos.
    from: address, // debe coincidir con la dirección activa del usuario.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //firmar la transacción
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    }
  } catch (error) {
    return {
      status: "😥 " + error.message,
    }
  }
}
```

Por último, pero no menos importante, necesitamos conectar nuestra función `updateMessage` a nuestro componente `HelloWorld.js`.

#### Conectar `updateMessage` al frontend `HelloWorld.js` {#connect-updatemessage-to-the-helloworld-js-frontend}

Nuestra función `onUpdatePressed` debería hacer una llamada await a la función importada `updateMessage` y modificar la variable de estado `status` para reflejar si nuestra transacción tuvo éxito o falló:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

Es súper limpio y simple. Y adivine qué... ¡¡¡SU DAPP ESTÁ COMPLETA!!!

¡Adelante, pruebe el botón **Update** (Actualizar)!

### Cree su propia dapp personalizada {#make-your-own-custom-dapp}

¡Wooooo, llegó al final del tutorial! Para recapitular, aprendió cómo:

- Conectar una billetera MetaMask a su proyecto de dapp
- Leer datos de su contrato inteligente utilizando la API de [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)
- Firmar transacciones de Ethereum utilizando MetaMask

¡Ahora está completamente equipado para aplicar las habilidades de este tutorial para construir su propio proyecto de dapp personalizado! Como siempre, si tiene alguna pregunta, no dude en comunicarse con nosotros para obtener ayuda en el [Discord de Alchemy](https://discord.gg/gWuC7zB). 🧙‍♂️

Una vez que complete este tutorial, ¡háganos saber cómo fue su experiencia o si tiene algún comentario etiquetándonos en Twitter [@alchemyplatform](https://twitter.com/AlchemyPlatform)!
