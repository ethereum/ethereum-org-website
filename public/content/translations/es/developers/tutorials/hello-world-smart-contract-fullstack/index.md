---
title: "Contrato inteligente de Hello World para principiantes: Fullstack"
description: Tutorial introductorio sobre cómo escribir y desplegar un contrato inteligente sencillo en Ethereum.
author: "nstrike2"
tags:
  [
    "Solidity",
    "hardhat",
    "Alchemy",
    "contratos Inteligentes",
    "implementación",
    "explorador de bloques",
    "frontend",
    "transacciones"
  ]
skill: beginner
lang: es
published: 25-10-2021
---

Si es nuevo en el desarrollo de la cadena de bloques y no sabe por dónde empezar o cómo desplegar e interactuar con contratos inteligentes, esta guía está hecha a su medida. Repasaremos la creación y el despliegue de un contrato inteligente simple en la red de prueba de Goerli usando [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org), y [Alchemy](https://alchemy.com/eth).

Necesitará una cuenta de Alchemy para completar este tutorial. [Regístrese para obtener una cuenta gratuita](https://www.alchemy.com/).

¡Si tiene preguntas en cualquier momento, no dude en ponerse en contacto con el [Discord de Alchemy](https://discord.gg/gWuC7zB)!

## Parte 1: Cree y despliegue su contrato inteligente usando Hardhat {#part-1}

### Conectarse a la red de Ethereum {#connect-to-the-ethereum-network}

Hay muchas formas de hacer solicitudes a la cadena de Ethereum. Para simplificar, usaremos una cuenta gratuita en Alchemy, una plataforma de desarrollo de cadenas de bloques y una API que nos permite comunicarnos con la cadena Ethereum sin tener que ejecutar un nodo nosotros mismos. Alchemy también tiene herramientas de desarrollo para monitorización y análisis; las aprovecharemos en este tutorial para entender lo que ocurre entre bastidores en el despliegue de nuestro contrato inteligente.

### Crear su aplicación y clave de API {#create-your-app-and-api-key}

Una vez que haya creado una cuenta de Alchemy, puede generar una clave de API creando una aplicación. Esto le permitirá hacer solicitudes a la red de prueba de Goerli. Si no está familiarizado con las redes de prueba, puede [leer la guía de Alchemy para elegir una red](https://www.alchemy.com/docs/choosing-a-web3-network).

En el panel de Alchemy, encuentre el menú desplegable **Apps** en la barra de navegación y haga clic en **Create App**.

![Crear aplicación hola, mundo](./hello-world-create-app.png)

Asigne a su aplicación el nombre «_Hello World_» y escriba una breve descripción. Seleccione **Staging** como su entorno y **Goerli** como su red.

![vista de la creación de la aplicación hola, mundo](./create-app-view-hello-world.png)

_Nota: asegúrese de seleccionar **Goerli**, o este tutorial no funcionará._

Haga clic en **Create app**. Su aplicación aparecerá en la tabla de abajo.

### Crear una cuenta de Ethereum {#create-an-ethereum-account}

Necesita una cuenta de Ethereum para enviar y recibir transacciones. Usaremos MetaMask, una billetera virtual en el navegador que permite a los usuarios administrar la dirección de su cuenta de Ethereum.

Puede descargar y crear una cuenta de MetaMask gratis [aquí](https://metamask.io/download). Al crear una cuenta, o si ya tiene una, asegúrese de cambiar a la «red de prueba de Goerli» en la parte superior derecha (para que no estemos tratando con dinero real).

### Paso 4: Añadir ether desde un Faucet {#step-4-add-ether-from-a-faucet}

Para desplegar su contrato inteligente en la red de prueba, necesitará algo de ETH falso. Para obtener ETH en la red Goerli, vaya a un grifo de Goerli e ingrese la dirección de su cuenta de Goerli. Tenga en cuenta que los grifos de Goerli pueden ser un poco poco fiables últimamente; consulte la [página de redes de prueba](/developers/docs/networks/#goerli) para obtener una lista de opciones para probar:

_Nota: debido a la congestión de la red, esto podría tardar un rato._
\`\`

### Paso 5: Compruebe su saldo {#step-5-check-your-balance}

Para volver a comprobar que el ETH está en su billetera, hagamos una solicitud de [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) utilizando la [herramienta de composición de Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Esto devolverá la cantidad de ETH a nuestra cartera. Para saber más, consulte el [breve tutorial de Alchemy sobre cómo usar la herramienta de composición](https://youtu.be/r6sjRxBZJuU).

Introduzca la dirección de su cuenta de MetaMask y haga clic en **Send Request**. Verá una respuesta parecida al fragmento de código que aparece a continuación.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _Nota: este resultado está en wei, no en ETH._ El wei se utiliza como la denominación más pequeña de ether._

¡Fiu! Nuestro dinero de prueba está ahí sano y salvo.

### Paso 6: Inicialice nuestro proyecto {#step-6-initialize-our-project}

Primero, tendremos que crear una carpeta para nuestro proyecto. Vaya a su línea de comandos e introduzca lo siguiente.

```
mkdir hello-world
cd hello-world
```

Ahora que estamos dentro de la carpeta de nuestro proyecto, usaremos `npm init` para inicializar el proyecto.

> Si aún no tiene npm instalado, siga [estas instrucciones para instalar Node.js y npm](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm).

A efectos de este tutorial, no importa cómo responda a las preguntas de inicialización. A continuación, se muestra cómo lo hicimos como referencia:

```
package name: (hello-world)
version: (1.0.0)
description: contrato inteligente hello world
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
   "description": "contrato inteligente hello world",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

Apruebe el package.json y ¡listo!

### Paso 7: Descargue Hardhat {#step-7-download-hardhat}

Hardhat es un entorno de desarrollo para compilar, implementar, probar y depurar su software de Ethereum. Ayuda a los desarrolladores cuando crean contratos inteligentes y dApps localmente antes de la implementación en la cadena real.

Dentro de nuestro proyecto `hello-world`, ejecute:

```
npm install --save-dev hardhat
```

Consulte esta página para obtener más detalles sobre las [instrucciones de instalación](https://hardhat.org/getting-started/#overview).

### Paso 8: Cree el proyecto Hardhat {#step-8-create-hardhat-project}

Dentro de nuestra carpeta de proyecto `hello-world`, ejecute:

```
npx hardhat
```

Entonces debería aparecer un mensaje de bienvenida y la opción de seleccionar lo que desea hacer. Seleccione «create an empty hardhat.config.js» (crear un hardhat.config.js vacío):

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Bienvenido a Hardhat v2.0.11 👷‍

¿Qué quiere hacer?…
Crear un proyecto de ejemplo
❯ Crear un archivo hardhat.config.js vacío
Salir
```

Esto generará un archivo `hardhat.config.js` en el proyecto. Lo utilizaremos más adelante en el tutorial para especificar la configuración de nuestro proyecto.

### Paso 9: Añada las carpetas del proyecto {#step-9-add-project-folders}

Para mantener el proyecto organizado, vamos a crear dos carpetas nuevas. En la línea de comandos, navegue hasta el directorio raíz de su proyecto `hello-world` y escriba:

```
mkdir contracts
mkdir scripts
```

- `contracts/` es donde guardaremos nuestro archivo de código del contrato inteligente «Hola, mundo».
- `scripts/` es donde guardaremos los scripts para desplegar e interactuar con nuestro contrato.

### Paso 10: Escriba nuestro contrato {#step-10-write-our-contract}

Puede que se esté preguntando cuándo vamos a escribir código. ¡Llegó la hora!

Abra el proyecto hello-world en su editor favorito. Los contratos inteligentes se escriben normalmente en Solidity, que es el lenguaje que usaremos para escribir nuestro contrato inteligente.‌

1. Vaya a la carpeta `contracts` y cree un nuevo archivo llamado `HelloWorld.sol`
2. A continuación, se muestra un contrato inteligente de Hello World de ejemplo que utilizaremos para este tutorial. Copie el contenido siguiente en el archivo `HelloWorld.sol`.

_Nota: Asegúrese de leer los comentarios para entender qué hace este contrato._

```
// Especifica la versión de Solidity, usando el versionado semántico.
// Más información: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Define un contrato llamado `HelloWorld`.
// Un contrato es una colección de funciones y datos (su estado). Una vez desplegado, un contrato reside en una dirección específica en la cadena de bloques de Ethereum. Más información: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Se emite cuando se llama a la función de actualización
   //Los eventos de contratos inteligentes son una forma de que su contrato comunique que algo ha sucedido en la cadena de bloques a la interfaz de su aplicación, la cual puede estar 'escuchando' ciertos eventos y tomar medidas cuando suceden.
   event UpdatedMessages(string oldStr, string newStr);

   // Declara una variable de estado `message` de tipo `string`.
   // Las variables de estado son variables cuyos valores se almacenan permanentemente en el almacenamiento del contrato. La palabra clave `public` hace que las variables sean accesibles desde fuera de un contrato y crea una función a la que otros contratos o clientes pueden llamar para acceder al valor.
   string public message;

   // Similar a muchos lenguajes orientados a objetos basados en clases, un constructor es una función especial que solo se ejecuta en la creación del contrato.
   // Los constructores se utilizan para inicializar los datos del contrato. Más información:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
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

Este es un contrato inteligente básico que almacena un mensaje en el momento de la creación. Se puede actualizar llamando a la función `update`.

### Paso 11: Conecte MetaMask y Alchemy a su proyecto {#step-11-connect-metamask-alchemy-to-your-project}

Hemos creado una billetera de MetaMask, una cuenta de Alchemy y hemos escrito nuestro contrato inteligente, ahora es el momento de conectar los tres.

Cada transacción enviada desde su billetera requiere una firma que utilice su clave privada única. Para proporcionar a nuestro programa este permiso, podemos almacenar de forma segura nuestra clave privada en un archivo de entorno. También almacenaremos una clave de API para Alchemy aquí.

> Para obtener más información sobre el envío de transacciones, consulte [este tutorial](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) sobre el envío de transacciones mediante web3.

Primero, instale el paquete dotenv en su directorio de proyecto:

```
npm install dotenv --save
```

Luego, cree un archivo `.env` en el directorio raíz del proyecto. Añada su clave privada de MetaMask y la URL de la API HTTP de Alchemy.

Su archivo de entorno debe tener el nombre `.env`; de lo contrario, no se reconocerá como un archivo de entorno.

No lo nombre `process.env` o `.env-custom` ni de ninguna otra manera.

- Siga [estas instrucciones](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) para exportar su clave privada
- Vea a continuación cómo obtener la URL de la API de HTTP de Alchemy.

![](./get-alchemy-api-key.gif)

Su `.env` debería verse así:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/su-clave-de-api"
PRIVATE_KEY = "su-clave-privada-de-metamask"
```

Para conectar esto a nuestro código, haremos referencia a estas variables en nuestro archivo `hardhat.config.js` en el paso 13.

### Paso 12: Instalar Ethers.js {#step-12-install-ethersjs}

Ethers.js es una biblioteca que facilita la interacción y la realización de solicitudes a Ethereum al encapsular los [métodos JSON-RPC estándar](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) con métodos más sencillos para el usuario.

Hardhat nos permite integrar [plugins](https://hardhat.org/plugins/) para herramientas adicionales y funcionalidad extendida. Aprovecharemos el [plugin de Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) para el despliegue del contrato.

En el directorio de su proyecto teclee:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### Paso 13: Actualice hardhat.config.js {#step-13-update-hardhat-configjs}

Hemos añadido varias dependencias y plugins hasta ahora, ahora necesitamos actualizar `hardhat.config.js` para que nuestro proyecto los conozca todos.

Actualice su `hardhat.config.js` para que se vea así:

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

### Paso 14: Compile nuestro contrato {#step-14-compile-our-contract}

Para asegurarnos de que todo funciona correctamente hasta ahora, compilemos nuestro contrato. La tarea `compile` es una de las tareas incorporadas de Hardhat.

Desde la línea de comandos ejecute:

```bash
npx hardhat compile
```

Es posible que reciba una advertencia sobre `SPDX license identifier not provided in source file`, pero no necesita preocuparse por eso. ¡Esperemos que todo lo demás se vea bien! Si no es así, siempre puede enviar un mensaje en el [discord de Alchemy](https://discord.gg/u72VCg3).

### Paso 15: Escriba nuestro script de despliegue {#step-15-write-our-deploy-script}

Ahora que nuestro contrato está escrito y nuestro archivo de configuración está listo, es momento de escribir nuestro script de implementación del contrato.

Vaya a la carpeta `scripts/` y cree un nuevo archivo llamado `deploy.js`, añadiendo el siguiente contenido:

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // Inicia el despliegue, devolviendo una promesa que se resuelve en un objeto de contrato
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Contrato desplegado en la dirección:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat hace un trabajo increíble explicando lo que hace cada una de estas líneas de código en su [tutorial de Contratos](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), hemos adoptado sus explicaciones aquí.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

Una `ContractFactory` en ethers.js es una abstracción utilizada para desplegar nuevos contratos inteligentes, por lo que `HelloWorld` aquí es una [factoría](https://en.wikipedia.org/wiki/Factory_\(object-oriented_programming\)) para instancias de nuestro contrato hello world. Al usar el plugin `hardhat-ethers` `ContractFactory` y las instancias de `Contract`, estas se conectan al primer firmante (propietario) por defecto.

```javascript
const hello_world = await HelloWorld.deploy()
```

Llamar a `deploy()` en una `ContractFactory` iniciará el despliegue y devolverá una `Promise` que se resuelve en un objeto `Contract`. Este es el elemento que tiene un método para cada una de nuestras funciones de contrato inteligente.

### Paso 16: Desplegar nuestro contrato {#step-16-deploy-our-contract}

¡Ahora ya estamos listos para desplegar nuestro contrato inteligente! Vaya a la línea de comandos y ejecute:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

Debería mostrarse algo parecido a esto:

```bash
Contrato desplegado en la dirección: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Por favor, guarde esta dirección**. La usaremos más adelante en el tutorial.

Si vamos al [explorador de bloques de Goerli](https://goerli.etherscan.io) y buscamos la dirección de nuestro contrato, deberíamos poder ver que se ha desplegado con éxito. La transacción tendrá un aspecto parecido a este:

![](./etherscan-contract.png)

La dirección `From` debería coincidir con la dirección de su cuenta de MetaMask y la dirección `To` dirá **Creación de Contrato**. Si hacemos clic en la transacción, veremos la dirección de nuestro contrato en el campo `To`.

![](./etherscan-transaction.png)

¡Enhorabuena! Acaba de desplegar un contrato inteligente en una red de prueba de Ethereum.

Para entender lo que está sucediendo internamente, navegue a la pestaña Explorador en nuestro [panel de Alchemy](https://dashboard.alchemy.com/explorer). Si tiene varias aplicaciones de Alchemy, asegúrese de filtrar por aplicación y seleccionar **Hello World**.

![](./hello-world-explorer.png)

Aquí verá un puñado de métodos JSON-RPC que Hardhat/Ethers crearon internamente para nosotros cuando llamamos a la función `.deploy()`. Dos métodos importantes aquí son [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), que es la solicitud para escribir nuestro contrato en la cadena Goerli, y [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash), que es una solicitud para leer información sobre nuestra transacción dado el hash. Para obtener más información sobre el envío de transacciones, consulte [nuestro tutorial sobre el envío de transacciones con Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

## Parte 2: Interactúe con su contrato inteligente {#part-2-interact-with-your-smart-contract}

Ahora que hemos desplegado con éxito un contrato inteligente en la red Goerli, aprendamos a interactuar con él.

### Cree un archivo interact.js {#create-a-interactjs-file}

Este es el archivo en el que escribiremos nuestro script de interacción. Usaremos la biblioteca Ethers.js que instaló previamente en la Parte 1.

Dentro de la carpeta `scripts/`, cree un nuevo archivo llamado `interact.js` y añada el siguiente código:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### Actualice su archivo .env {#update-your-env-file}

Usaremos nuevas variables de entorno, así que necesitamos definirlas en el archivo `.env` que [creamos anteriormente](#step-11-connect-metamask-&-alchemy-to-your-project).

Necesitaremos añadir una definición para nuestra `API_KEY` de Alchemy y el `CONTRACT_ADDRESS` donde se desplegó su contrato inteligente.

Su archivo `.env` debería tener un aspecto similar a este:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<su-clave-de-api>"
API_KEY = "<su-clave-de-api>"
PRIVATE_KEY = "<su-clave-privada-de-metamask>"
CONTRACT_ADDRESS = "0x<la-dirección-de-su-contrato>"
```

### Obtenga la ABI de su contrato {#grab-your-contract-ABI}

La [ABI (interfaz binaria de aplicación)](/glossary/#abi) de nuestro contrato es la interfaz para interactuar con nuestro contrato inteligente. Hardhat genera automáticamente una ABI y la guarda en `HelloWorld.json`. Para usar la ABI, necesitaremos analizar el contenido añadiendo las siguientes líneas de código a nuestro archivo `interact.js`:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

Si quiere ver el ABI, puede imprimirlo en su consola:

```javascript
console.log(JSON.stringify(contract.abi))
```

Para ver su ABI impresa en la consola, vaya a su terminal y ejecute:

```bash
npx hardhat run scripts/interact.js
```

### Crear una instancia de su contrato {#create-an-instance-of-your-contract}

Para interactuar con nuestro contrato, necesitamos crear una instancia de contrato en nuestro código. Para hacerlo con Ethers.js, tendremos que trabajar con tres conceptos:

1. Proveedor: un proveedor de nodos que le dé acceso de lectura y escritura a la cadena de bloques
2. Firmante: representa una cuenta de Ethereum que puede firmar transacciones.
3. Contrato: un objeto Ethers.js que representa un contrato específico desplegado en cadena

Utilizaremos el contrato ABI del paso anterior para crear nuestra instancia del contrato:

```javascript
// interact.js

// Proveedor
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Firmante
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Contrato
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

Obtenga más información sobre proveedores, firmantes y contratos en la [documentación de ethers.js](https://docs.ethers.io/v5/).

### Lea el mensaje de inicio {#read-the-init-message}

¿Recuerda cuando desplegamos nuestro contrato con `initMessage = "Hello world!"`? Ahora vamos a leer ese mensaje almacenado en nuestro contrato inteligente e imprimirlo en la consola.

En JavaScript, las funciones asíncronas se utilizan al interactuar con las redes. Para saber más sobre las funciones asíncronas, [lea este artículo de Medium](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

Utilice el siguiente código para llamar a la función `message` en nuestro contrato inteligente y leer el mensaje de inicio:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("El mensaje es: " + message)
}
main()
```

Después de ejecutar el archivo usando `npx hardhat run scripts/interact.js` en la terminal, debería ver esta respuesta:

```
El mensaje es: Hello world!
```

¡Enhorabuena! Acaba de leer con éxito los datos del contrato inteligente de la cadena de bloques de Ethereum, ¡bien hecho!

### Actualice el mensaje {#update-the-message}

En lugar de solo leer el mensaje, ¡también podemos actualizar el mensaje guardado en nuestro contrato inteligente utilizando la función `update`! Genial, ¿verdad?

Para actualizar el mensaje, podemos llamar directamente a la función `update` en nuestro objeto Contract instanciado:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("El mensaje es: " + message)

  console.log("Actualizando el mensaje...")
  const tx = await helloWorldContract.update("Este es el nuevo mensaje.")
  await tx.wait()
}
main()
```

Tenga en cuenta que en la línea 11, hacemos una llamada a `.wait()` en el objeto de transacción devuelto. Esto garantiza que nuestro script espere a que la transacción se mine en la cadena de bloques antes de salir de la función. Si no se incluye la llamada `.wait()`, es posible que el script no vea el valor `message` actualizado en el contrato.

### Lea el nuevo mensaje {#read-the-new-message}

Debería poder repetir el [paso anterior](#read-the-init-message) para leer el valor `message` actualizado. ¡Tómese un momento y vea si puede hacer los cambios necesarios para imprimir ese nuevo valor!

Si necesita una pista, así es como debería verse su archivo `interact.js` en este momento:

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

// firmante - usted
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// instancia del contrato
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("El mensaje es: " + message)

  console.log("Actualizando el mensaje...")
  const tx = await helloWorldContract.update("este es el nuevo mensaje")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("El nuevo mensaje es: " + newMessage)
}

main()
```

¡Ahora solo ejecute el script y debería poder ver el mensaje antiguo, el estado de la actualización y el nuevo mensaje impreso en su terminal!

`npx hardhat run scripts/interact.js --network goerli`

```
El mensaje es: ¡Hola, mundo!
Actualizando el mensaje...
El nuevo mensaje es: Este es el nuevo mensaje.
```

Mientras ejecuta ese script, puede notar que el paso `Updating the message...` tarda un tiempo en cargarse antes de que se cargue el nuevo mensaje. Eso se debe al proceso de minería; si tiene curiosidad sobre el seguimiento de las transacciones mientras se están minando, visite el [mempool de Alchemy](https://dashboard.alchemyapi.io/mempool) para ver el estado de una transacción. Si la transacción es descartada, también es útil comprobar [Goerli Etherscan](https://goerli.etherscan.io) y buscar el hash de su transacción.

## Parte 3: Publique su contrato inteligente en Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

Ya ha hecho la parte más dura para dar vida a su contrato inteligente; ¡ahora es el momento de compartirlo con el mundo!

Al verificar su contrato inteligente en Etherscan, cualquiera puede ver su código fuente e interactuar con su contrato inteligente. ¡Empecemos!

### Paso 1: Genere una clave de API en su cuenta de Etherscan {#step-1-generate-an-api-key-on-your-etherscan-account}

Se necesita una clave de API de Etherscan para verificar que es el propietario del contrato inteligente que está intentando publicar.

Si aún no tiene una cuenta de Etherscan, [regístrese para obtener una cuenta](https://etherscan.io/register).

Una vez que haya iniciado sesión, busque su nombre de usuario en la barra de navegación, pase el cursor sobre él y seleccione el botón **My profile**.

En su página de perfil, debería ver una barra de navegación lateral. En la barra de navegación lateral, seleccione **API Keys**. A continuación, presione el botón «Add» para crear una nueva clave de API, nombre su aplicación **hello-world** y presione el botón **Create New API Key**.

Su nueva clave de API debería aparecer en la tabla de claves de API. Copie la clave de la API en su portapapeles.

A continuación, tenemos que añadir la clave de la API de Etherscan a nuestro archivo `.env`.

Después de añadirlo, su archivo `.env` debería tener este aspecto:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/su-clave-de-api"
PUBLIC_KEY = "la-dirección-de-su-cuenta-pública"
PRIVATE_KEY = "la-dirección-de-su-cuenta-privada"
CONTRACT_ADDRESS = "la-dirección-de-su-contrato"
ETHERSCAN_API_KEY = "su-clave-de-etherscan"
```

### Contratos inteligentes desplegados con Hardhat {#hardhat-deployed-smart-contracts}

#### Instalar hardhat-etherscan {#install-hardhat-etherscan}

Publicar su contrato en Etherscan usando Hardhat es sencillo. Primero tendrá que instalar el plugin `hardhat-etherscan` para empezar. `hardhat-etherscan` verificará automáticamente el código fuente del contrato inteligente y la ABI en Etherscan. Para añadir esto, en el directorio `hello-world` ejecute:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

Una vez instalado, incluya la siguiente declaración en la parte superior de su `hardhat.config.js`, y añada las opciones de configuración de Etherscan:

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
    // Su clave API para Etherscan
    // Obtenga una en https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Verifique su contrato inteligente en Etherscan {#verify-your-smart-contract-on-etherscan}

Asegúrese de que todos los archivos estén guardados y de que todas las variables `.env` estén configuradas correctamente.

Ejecute la tarea `verify`, pasando la dirección del contrato y la red en la que está desplegado:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

Asegúrese de que `DEPLOYED_CONTRACT_ADDRESS` es la dirección de su contrato inteligente desplegado en la red de prueba Goerli. Además, el argumento final (`'Hello World!'`) debe ser el mismo valor de cadena utilizado [durante el paso de despliegue en la parte 1](#write-our-deploy-script).

Si todo va bien, aparecerá el siguiente mensaje en su terminal:

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Contrato HelloWorld verificado correctamente en Etherscan.
https://goerli.etherscan.io/address/<dirección-del-contrato>#contracts
```

¡Enhorabuena! ¡El código de su contrato inteligente está en Etherscan!

### ¡Eche un vistazo a su contrato inteligente en Etherscan! {#check-out-your-smart-contract-on-etherscan}

Cuando navegue al enlace proporcionado en su terminal, ¡debería poder ver su código de contrato inteligente y ABI publicado en Etherscan!

**¡Yuhuuuu! ¡Lo ha conseguido, campeón!** ¡Ahora cualquiera puede llamar o escribir a su contrato inteligente! **¡Estamos deseando ver lo que construye a continuación!**

## Parte 4: Integración de su contrato inteligente con el frontend {#part-4-integrating-your-smart-contract-with-the-frontend}

Al final de este tutorial, sabrá cómo:

- Conectar una billetera MetaMask a su dapp
- Leer datos de su contrato inteligente usando la API de [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Firmar transacciones de Ethereum usando MetaMask.

Para esta dapp, usaremos [React](https://react.dev/) como nuestro marco de frontend; sin embargo, es importante tener en cuenta que no pasaremos demasiado tiempo desglosando sus fundamentos, ya que nos centraremos principalmente en llevar la funcionalidad Web3 a nuestro proyecto.

Como requisito previo, debe conocimientos de React a nivel principiante. De lo contrario, le recomendamos completar el [tutorial oficial de Introducción a React](https://react.dev/learn).

### Clonar los archivos de inicio {#clone-the-starter-files}

Primero, ve al [repositorio de GitHub hello-world-part-four](https://github.com/alchemyplatform/hello-world-part-four-tutorial) para obtener los archivos de inicio de este proyecto y clona este repositorio en tu máquina local.

Abre el repositorio clonado localmente. Fíjate que contiene dos carpetas: `starter-files` y `completed`.

- `starter-files`: **trabajaremos en este directorio**, conectaremos la IU a tu billetera de Ethereum y al contrato inteligente que publicamos en Etherscan en la [Parte 3](#part-3).
- `completed` contiene el tutorial completo y solo debe usarse como referencia si te atascas.

A continuación, abre tu copia de `starter-files` en tu editor de código favorito y luego navega a la carpeta `src`.

Todo el código que escribiremos estará en la carpeta `src`. Editaremos el componente `HelloWorld.js` y los archivos JavaScript `util/interact.js` para dar a nuestro proyecto la funcionalidad de Web3.

### Echa un vistazo a los archivos de inicio {#check-out-the-starter-files}

Antes de empezar a programar, exploremos lo que se nos proporciona en los archivos de inicio.

#### Ponga en marcha su proyecto de React {#get-your-react-project-running}

Comencemos por ejecutar el proyecto React en nuestro navegador. La belleza de React es que, una vez que tenemos nuestro proyecto corriendo en el navegador, cualquier cambio que guardemos será actualizado en vivo en el navegador.

Para que el proyecto se ejecute, navega al directorio raíz de la carpeta `starter-files` y ejecuta `npm install` en tu terminal para instalar las dependencias del proyecto:

```bash
cd starter-files
npm install
```

Una vez que hayan terminado de instalarse, ejecute `npm start` en su terminal:

```bash
npm start
```

Al hacerlo, se debería abrir [http://localhost:3000/](http://localhost:3000/) en tu navegador, donde verás el frontend de nuestro proyecto. Debería constar de un campo (un lugar para actualizar el mensaje almacenado en tu contrato inteligente), un botón «Conectar billetera» y un botón «Actualizar».

Si intentas hacer clic en cualquiera de los botones, te darás cuenta de que no funcionan; esto se debe a que todavía tenemos que programar su funcionalidad.

#### El componente `HelloWorld.js` {#the-helloworld-js-component}

Volvamos a la carpeta `src` en nuestro editor y abramos el archivo `HelloWorld.js`. Es muy importante que entendamos todo en este archivo, ya que es el componente principal en React en el que trabajaremos.

En la parte superior de este archivo, notarás que tenemos varias sentencias de importación que son necesarias para que nuestro proyecto se ejecute, incluyendo la biblioteca React, los hooks useEffect y useState, algunos elementos de `./util/interact.js` (¡los describiremos con más detalle pronto!) y el logotipo de Alchemy.

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
const [message, setMessage] = useState("No hay conexión a la red.")
const [newMessage, setNewMessage] = useState("")
```

Esto es lo que representa cada una de las variables:

- `walletAddress`: una cadena que almacena la dirección del monedero del usuario
- `status`: una cadena que almacena un mensaje útil que guía al usuario sobre cómo interactuar con la dapp.
- `message`: una cadena que almacena el mensaje actual en el contrato inteligente.
- `newMessage`: una cadena que almacena el nuevo mensaje que se escribirá en el contrato inteligente.

Después de las variables de estado, verás cinco funciones no implementadas: `useEffect`, `addSmartContractListener`, `addWalletListener`, `connectWalletPressed` y `onUpdatePressed`. A continuación explicaremos lo que hacen:

```javascript
// HelloWorld.js

//se llama solo una vez
useEffect(async () => {
  //TODO: implementar
}, [])

function addSmartContractListener() {
  //TODO: implementar
}

function addWalletListener() {
  //TODO: implementar
}

const connectWalletPressed = async () => {
  //TODO: implementar
}

const onUpdatePressed = async () => {
  //TODO: implementar
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html): este es un hook de React que se llama después de que tu componente se renderiza. Debido a que se le pasa un prop de array vacío `[]` (ver línea 4), solo se llamará en la _primera_ renderización del componente. Aquí cargaremos el mensaje actual almacenado en nuestro contrato inteligente, llamaremos a nuestros oyentes de contrato inteligente y billetera, y actualizaremos nuestra IU para reflejar si ya hay una billetera conectada.
- `addSmartContractListener`: esta función configura un oyente que estará atento al evento `UpdatedMessages` de nuestro contrato HelloWorld y actualizará nuestra IU cuando el mensaje cambie en nuestro contrato inteligente.
- `addWalletListener`: esta función configura un oyente que detecta cambios en el estado de la billetera de MetaMask del usuario, como cuando el usuario desconecta su billetera o cambia de dirección.
- `connectWalletPressed`: esta función se llamará para conectar la billetera de MetaMask del usuario a nuestra dapp.
- `onUpdatePressed`: esta función se llamará cuando el usuario quiera actualizar el mensaje almacenado en el contrato inteligente.

Cerca del final de este archivo, tenemos la interfaz de usuario de nuestro componente.

```javascript
// HelloWorld.js

//la IU de nuestro componente
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Conectado: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Conectar billetera</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Mensaje actual:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>Nuevo mensaje:</h2>

    <div>
      <input
        type="text"
        placeholder="Actualiza el mensaje en tu contrato inteligente."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Actualizar
      </button>
    </div>
  </div>
)
```

Si examinas este código con atención, verás dónde usamos nuestras diversas variables de estado en nuestra IU:

- En las líneas 6-12, si la billetera del usuario está conectada (es decir, `walletAddress.length > 0`), mostramos una versión truncada de la `walletAddress` del usuario en el botón con el ID «walletButton»; de lo contrario, simplemente dice «Conectar billetera».
- En la línea 17, mostramos el mensaje actual almacenado en el contrato inteligente, que se captura en la cadena `message`.
- En las líneas 23-26, utilizamos un [componente controlado](https://legacy.reactjs.org/docs/forms.html#controlled-components) para actualizar nuestra variable de estado `newMessage` cuando cambia la entrada en el campo de texto.

Además de nuestras variables de estado, también verás que las funciones `connectWalletPressed` y `onUpdatePressed` se llaman cuando se hace clic en los botones con los ID `publishButton` y `walletButton` respectivamente.

Por último, veamos dónde se añade este componente `HelloWorld.js`.

Si vas al archivo `App.js`, que es el componente principal en React que actúa como contenedor para todos los demás componentes, verás que nuestro componente `HelloWorld.js` se inyecta en la línea 7.

Por último, pero no por ello menos importante, echemos un vistazo a otro archivo que se te proporciona, el archivo `interact.js`.

#### El archivo `interact.js` {#the-interact-js-file}

Como queremos seguir el paradigma [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), querremos un archivo separado que contenga todas nuestras funciones para gestionar la lógica, los datos y las reglas de nuestra dapp, y luego poder exportar esas funciones a nuestro frontend (nuestro componente `HelloWorld.js`).

👆🏽¡Este es el propósito exacto de nuestro archivo `interact.js`!

Navega a la carpeta `util` en tu directorio `src`, y notarás que hemos incluido un archivo llamado `interact.js` que contendrá todas nuestras funciones y variables de interacción con el contrato inteligente y la billetera.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

Notarás que en la parte superior del archivo hemos comentado el objeto `helloWorldContract`. Más adelante en este tutorial, descomentaremos este objeto e instanciaremos nuestro contrato inteligente en esta variable, que luego exportaremos a nuestro componente `HelloWorld.js`.

Las cuatro funciones no implementadas después de nuestro objeto `helloWorldContract` hacen lo siguiente:

- `loadCurrentMessage`: esta función gestiona la lógica de cargar el mensaje actual almacenado en el contrato inteligente. Hará una llamada de _lectura_ al contrato inteligente Hello World utilizando la [API de Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
- `connectWallet`: esta función conectará el MetaMask del usuario a nuestra dapp.
- `getCurrentWalletConnected`: esta función comprobará si una cuenta de Ethereum ya está conectada a nuestra dapp al cargar la página y actualizará nuestra IU en consecuencia.
- `updateMessage`: esta función actualizará el mensaje almacenado en el contrato inteligente. Hará una llamada de _escritura_ al contrato inteligente de Hello World, por lo que la billetera MetaMask del usuario tendrá que firmar una transacción de Ethereum para actualizar el mensaje.

Ahora que entendemos con qué estamos trabajando, ¡vamos a averiguar cómo leer de nuestro contrato inteligente!

### Paso 3: Lee de tu contrato inteligente {#step-3-read-from-your-smart-contract}

Para leer de tu contrato inteligente, necesitarás configurar con éxito:

- Una conexión API a la cadena de Ethereum
- Una instancia cargada de tu contrato inteligente
- Una función para llamar a la función de tu contrato inteligente
- Un oyente para estar atento a las actualizaciones cuando cambien los datos que estás leyendo del contrato inteligente

Puede que parezcan muchos pasos, ¡pero no te preocupes! ¡Te guiaremos paso a paso sobre cómo hacer cada uno de ellos! :\)

#### Establece una conexión API con la cadena de Ethereum {#establish-an-api-connection-to-the-ethereum-chain}

¿Recuerdas que en la Parte 2 de este tutorial, usamos nuestra [clave de Alchemy Web3 para leer de nuestro contrato inteligente](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library)? También necesitarás una clave de Alchemy Web3 en tu dapp para leer de la cadena.

Si aún no lo tienes, primero instala [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) navegando al directorio raíz de tus `starter-files` y ejecutando lo siguiente en tu terminal:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) es un envoltorio de [Web3.js](https://docs.web3js.org/), que proporciona métodos de API mejorados y otros beneficios cruciales para facilitar su vida como desarrollador de web3. Se diseñó para requerir una configuración mínima, por lo que puede comenzar a usarla en su aplicación de inmediato.

Luego, instala el paquete [dotenv](https://www.npmjs.com/package/dotenv) en tu directorio de proyecto, para que tengamos un lugar seguro donde almacenar nuestra clave de API después de obtenerla.

```text
npm install dotenv --save
```

Para nuestra dapp, **usaremos nuestra clave de API de Websockets** en lugar de nuestra clave de API HTTP, ya que nos permitirá configurar un oyente que detecte cuándo cambia el mensaje almacenado en el contrato inteligente.

Una vez que tengas tu clave de API, crea un archivo `.env` en tu directorio raíz y añade tu URL de Alchemy Websockets. Después, tu archivo `.env` debería tener este aspecto:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

¡Ahora estamos listos para configurar nuestro punto de conexión de Alchemy Web3 en nuestra dapp! Volvamos a nuestro `interact.js`, que está anidado dentro de nuestra carpeta `util` y añadamos el siguiente código en la parte superior del archivo:

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

#### Cargando tu contrato inteligente Hello World {#loading-your-hello-world-smart-contract}

Para cargar tu contrato inteligente Hello World, necesitarás su dirección de contrato y su ABI, los cuales se pueden encontrar en Etherscan si completaste la [Parte 3 de este tutorial.](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)

#### Cómo obtener el ABI de tu contrato desde Etherscan {#how-to-get-your-contract-abi-from-etherscan}

Si te saltaste la Parte 3 de este tutorial, puedes usar el contrato HelloWorld con la dirección [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code). Su ABI se puede encontrar [aquí](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

El ABI de un contrato es necesario para especificar qué función invocará un contrato, así como para garantizar que la función devuelva datos en el formato que esperas. Una vez que hayamos copiado el ABI de nuestro contrato, guardémoslo como un archivo JSON llamado `contract-abi.json` en tu directorio `src`.

Tu archivo contract-abi.json debe estar almacenado en tu carpeta src.

Armados con la dirección de nuestro contrato, el ABI y el punto de conexión de Alchemy Web3, podemos usar el [método de contrato](https://docs.web3js.org/api/web3-eth-contract/class/Contract) para cargar una instancia de nuestro contrato inteligente. Importa el ABI de tu contrato en el archivo `interact.js` y añade la dirección de tu contrato.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

Ahora podemos finalmente descomentar nuestra variable `helloWorldContract` y cargar el contrato inteligente usando nuestro punto de conexión de AlchemyWeb3:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Para recapitular, las primeras 12 líneas de tu `interact.js` deberían tener este aspecto:

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

#### Implementando `loadCurrentMessage` en tu archivo `interact.js` {#implementing-loadCurrentMessage-in-your-interact-js-file}

Esta función es súper simple. Vamos a hacer una llamada asíncrona simple a web3 para leer de nuestro contrato. Nuestra función devolverá el mensaje almacenado en el contrato inteligente:

Actualiza `loadCurrentMessage` en tu archivo `interact.js` a lo siguiente:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

Como queremos mostrar este contrato inteligente en nuestra IU, actualicemos la función `useEffect` en nuestro componente `HelloWorld.js` a lo siguiente:

```javascript
// HelloWorld.js

//llamado solo una vez
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

Ten en cuenta que solo queremos que `loadCurrentMessage` se llame una vez durante la primera renderización del componente. Pronto implementaremos `addSmartContractListener` para actualizar automáticamente la IU después de que cambie el mensaje en el contrato inteligente.

Antes de profundizar en nuestro oyente, ¡veamos qué tenemos hasta ahora! Guarda tus archivos `HelloWorld.js` e `interact.js`, y luego ve a [http://localhost:3000/](http://localhost:3000/)

Notarás que el mensaje actual ya no dice "Sin conexión a la red". En su lugar, refleja el mensaje almacenado en el contrato inteligente. ¡Genial!

#### Tu IU ahora debería reflejar el mensaje almacenado en el contrato inteligente {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

Ahora, hablando de ese oyente...

#### Implementa `addSmartContractListener` {#implement-addsmartcontractlistener}

Si recuerdas el archivo `HelloWorld.sol` que escribimos en la [Parte 1 de esta serie de tutoriales](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract), recordarás que hay un evento de contrato inteligente llamado `UpdatedMessages` que se emite después de que se invoca la función `update` de nuestro contrato inteligente (ver líneas 9 y 27):

```javascript
// HelloWorld.sol

// Especifica la versión de Solidity, usando el control de versiones semántico.
// Aprende más: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Define un contrato llamado `HelloWorld`.
// Un contrato es una colección de funciones y datos (su estado). Una vez desplegado, un contrato reside en una dirección específica en la cadena de bloques de Ethereum. Aprende más: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitido cuando se llama a la función de actualización
   //Los eventos de contratos inteligentes son una forma para que su contrato comunique que algo sucedió en la cadena de bloques a su interfaz de aplicación, que puede estar 'escuchando' ciertos eventos y tomar medidas cuando suceden.
   event UpdatedMessages(string oldStr, string newStr);

   // Declara una variable de estado `message` de tipo `string`.
   // Las variables de estado son variables cuyos valores se almacenan permanentemente en el almacenamiento del contrato. La palabra clave `public` hace que las variables sean accesibles desde fuera de un contrato y crea una función que otros contratos o clientes pueden llamar para acceder al valor.
   string public message;

   // Al igual que muchos lenguajes orientados a objetos basados en clases, un constructor es una función especial que solo se ejecuta en la creación del contrato.
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

Los eventos de contrato inteligente son una forma de que tu contrato comunique que algo ha sucedido (es decir, hubo un _evento_) en la cadena de bloques a tu aplicación de frontend, que puede estar 'escuchando' eventos específicos y tomar medidas cuando suceden.

La función `addSmartContractListener` va a escuchar específicamente el evento `UpdatedMessages` de nuestro contrato inteligente Hello World y actualizará nuestra IU para mostrar el nuevo mensaje.

Modifica `addSmartContractListener` a lo siguiente:

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 ¡Tu mensaje ha sido actualizado!")
    }
  })
}
```

Desglosemos lo que sucede cuando el oyente detecta un evento:

- Si se produce un error cuando se emite el evento, se reflejará en la IU a través de nuestra variable de estado `status`.
- De lo contrario, usaremos el objeto `data` devuelto. `data.returnValues` es un array indexado en cero donde el primer elemento del array almacena el mensaje anterior y el segundo elemento almacena el actualizado. En conjunto, en un evento exitoso estableceremos nuestra cadena `message` con el mensaje actualizado, borraremos la cadena `newMessage` y actualizaremos nuestra variable de estado `status` para reflejar que se ha publicado un nuevo mensaje en nuestro contrato inteligente.

Finalmente, llamemos a nuestro oyente en nuestra función `useEffect` para que se inicialice en la primera renderización del componente `HelloWorld.js`. En total, tu función `useEffect` debería tener este aspecto:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

Ahora que podemos leer de nuestro contrato inteligente, ¡sería genial descubrir cómo escribir en él también! Sin embargo, para escribir en nuestra dapp, primero debemos tener una billetera de Ethereum conectada a ella.

Entonces, a continuación, ¡abordaremos la configuración de nuestra billetera de Ethereum (MetaMask) y luego la conectaremos a nuestra dapp!

### Paso 4: Configura tu billetera de Ethereum {#step-4-set-up-your-ethereum-wallet}

Para escribir cualquier cosa en la cadena de Ethereum, los usuarios deben firmar transacciones usando las claves privadas de su billetera virtual. Para este tutorial, usaremos [MetaMask](https://metamask.io/), una billetera virtual en el navegador que se usa para gestionar la dirección de tu cuenta de Ethereum, ya que hace que la firma de esta transacción sea súper fácil para el usuario final.

Si quiere entender más sobre cómo funcionan las transacciones en Ethereum, consulte [esta página](/developers/docs/transactions/) de la Fundación Ethereum.

#### Descargar MetaMask {#download-metamask}

Puede descargar y crear una cuenta de MetaMask gratis [aquí](https://metamask.io/download). Cuando estés creando una cuenta, o si ya tienes una, asegúrate de cambiar a la «red de prueba de Goerli» en la parte superior derecha (para no estar manejando dinero real).

#### Añade ether desde un Faucet {#add-ether-from-a-faucet}

Para firmar una transacción en la cadena de bloques de Ethereum, necesitaremos algo de ETH falso. Para obtener ETH, puedes ir a [FaucETH](https://fauceth.komputing.org) e introducir la dirección de tu cuenta de Goerli, hacer clic en «Request funds», luego seleccionar «Ethereum Testnet Goerli» en el menú desplegable y finalmente hacer clic en el botón «Request funds» de nuevo. Debería ver el Eth en su cuenta de MetaMask poco después.

#### Comprueba tu saldo {#check-your-balance}

Para comprobar que nuestro saldo está ahí, hagamos una solicitud [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) utilizando la [herramienta de composición de Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Esto devolverá la cantidad de Eth en nuestra billetera. Después de introducir la dirección de su cuenta de Metamask y hacer clic en «Send Request», debería ver una respuesta como esta:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**NOTA:** Este resultado es en wei, no en eth. Wei se usa como la denominación más pequeña de Ether. La conversión de wei a eth es: 1 eth = 10¹⁸ wei. Entonces si convertimos 0xde0b6b3a7640000 a decimal, obtenemos 1\*10¹⁸, que equivale a 1 eth.

¡Fiu! Nuestro dinero de prueba está ahí sin problemas. 🤑

### Paso 5: Conecta MetaMask a tu IU {#step-5-connect-metamask-to-your-UI}

Ahora que nuestra billetera de MetaMask está configurada, vamos a conectar nuestra dapp a ella.

#### La función `connectWallet` {#the-connectWallet-function}

En nuestro archivo `interact.js`, implementemos la función `connectWallet`, que luego podremos llamar en nuestro componente `HelloWorld.js`.

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
        status: "👆🏽 Escribe un mensaje en el campo de texto de arriba.",
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
              Debes instalar MetaMask, una billetera virtual de Ethereum, en tu
              navegador.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Entonces, ¿qué hace exactamente este bloque de código gigante?

Bueno, primero, comprueba si `window.ethereum` está habilitado en tu navegador.

`window.ethereum` es una API global inyectada por MetaMask y otros proveedores de monederos que permite a los sitios web solicitar las cuentas de Ethereum de los usuarios. Si se aprueba, puede leer datos de las cadenas de bloques a las que el usuario está conectado y sugerir que el usuario firme mensajes y transacciones. ¡Consulte los [documentos de MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) para obtener más información!

Si `window.ethereum` _no está_ presente, significa que MetaMask no está instalado. Esto da como resultado la devolución de un objeto JSON, donde la `address` devuelta es una cadena vacía, y el objeto JSX `status` transmite que el usuario debe instalar MetaMask.

Ahora, si `window.ethereum` _está_ presente, es cuando las cosas se ponen interesantes.

Usando un bucle try/catch, intentaremos conectarnos a MetaMask llamando a [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). La invocación de esta función abrirá MetaMask en el navegador, donde se le solicitará al usuario conectar su billetera a su dapp.

- Si el usuario elige conectarse, `method: "eth_requestAccounts"` devolverá un array que contiene todas las direcciones de cuenta del usuario que se conectaron a la dapp. En conjunto, nuestra función `connectWallet` devolverá un objeto JSON que contiene la _primera_ `address` de esta matriz (consulte la línea 9) y un mensaje de `status` que solicita al usuario que escriba un mensaje en el smart contract.
- Si el usuario rechaza la conexión, el objeto JSON contendrá una cadena vacía para la `address` devuelta y un mensaje de `status` que reflejará que el usuario ha rechazado la conexión.

Ahora que hemos escrito esta función `connectWallet`, el siguiente paso es llamarla en nuestro componente `HelloWorld.js`.

#### Añade la función `connectWallet` a tu componente de IU `HelloWorld.js` {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

Navega a la función `connectWalletPressed` en `HelloWorld.js` y actualízala a lo siguiente:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

¿Te das cuenta de cómo la mayor parte de nuestra funcionalidad se abstrae de nuestro componente `HelloWorld.js` desde el archivo `interact.js`? ¡Esto es así para cumplir con el paradigma M-V-C!

En `connectWalletPressed`, simplemente hacemos una llamada await a nuestra función `connectWallet` importada y, usando su respuesta, actualizamos nuestras variables `status` y `walletAddress` a través de sus state hooks.

Ahora, guardemos ambos archivos (`HelloWorld.js` e `interact.js`) y probemos nuestra IU hasta ahora.

Abre tu navegador en la página [http://localhost:3000/](http://localhost:3000/) y presiona el botón «Conectar billetera» en la parte superior derecha de la página.

Si tiene MetaMask instalado, se le debería solicitar conectar su billetera a su dapp. Acepte la invitación para establecer la conexión.

¡Deberías ver que el botón de la billetera ahora refleja que tu dirección está conectada! ¡Síííí! 🔥

A continuación, intente refrescar la página... esto es extraño. Nuestro botón de billetera nos está solicitando conectar MetaMask, aunque ya está conectado...

Sin embargo, ¡no temas! Podemos solucionarlo fácilmente (¿lo pillas?). ¡implementando `getCurrentWalletConnected`, que comprobará si una dirección ya está conectada a nuestra dapp y actualizará nuestra IU en consecuencia!

#### La función `getCurrentWalletConnected` {#the-getcurrentwalletconnected-function}

Actualiza tu función `getCurrentWalletConnected` en el archivo `interact.js` a lo siguiente:

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
          status: "👆🏽 Escribe un mensaje en el campo de texto de arriba.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Conéctate a MetaMask usando el botón de la esquina superior derecha.",
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
              Debes instalar MetaMask, una billetera virtual de Ethereum, en tu
              navegador.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Este código es _muy_ similar a la función `connectWallet` que acabamos de escribir en el paso anterior.

La principal diferencia es que, en lugar de llamar al método `eth_requestAccounts`, que abre MetaMask para que el usuario conecte su monedero, aquí llamamos al método `eth_accounts`, que simplemente devuelve un array con las direcciones de MetaMask actualmente conectadas a nuestra dapp.

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

Observe que utilizamos la respuesta de nuestra llamada a `getCurrentWalletConnected` para actualizar nuestras variables de estado `walletAddress` y `status`.

Ahora que has añadido este código, intentemos refrescar la ventana de nuestro navegador.

¡Geniaaaal! El botón debería decir que está conectado y mostrar una vista previa de la dirección de su billetera conectada, incluso después de actualizar la página.

#### Implementa `addWalletListener` {#implement-addwalletlistener}

El último paso en la configuración de la billetera de dapp es implementar el oyente de billetera para que nuestra interfaz se actualice cuando el estado de la billetera cambie, por ejemplo, cuando el usuario se desconecte o cambie de cuenta.

En tu archivo `HelloWorld.js`, modifica tu función `addWalletListener` de la siguiente manera:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Escribe un mensaje en el campo de texto de arriba.")
      } else {
        setWallet("")
        setStatus("🦊 Conéctate a MetaMask usando el botón de la esquina superior derecha.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          Debes instalar MetaMask, una billetera virtual de Ethereum, en tu navegador.
        </a>
      </p>
    )
  }
}
```

Apuesto a que a estas alturas ya no necesitas nuestra ayuda para entender lo que está pasando, pero para ser exhaustivos, vamos a desglosarlo rápidamente:

- Primero, nuestra función comprueba si `window.ethereum` está habilitado (es decir, si MetaMask está instalado).
  - Si no lo está, simplemente establecemos nuestra variable de estado `status` en una cadena JSX que pide al usuario que instale MetaMask.
  - Si está habilitado, configuramos el detector `window.ethereum.on("accountsChanged")` en la línea 3 que escucha los cambios de estado en el monedero de MetaMask, que incluyen cuándo el usuario conecta una cuenta adicional a la dapp, cambia de cuenta o desconecta una cuenta. Si hay al menos una cuenta conectada, la variable de estado `walletAddress` se actualiza como la primera cuenta del array `accounts` devuelto por el detector. De lo contrario, `walletAddress` se establece como una cadena vacía.

Por último, pero no por ello menos importante, debemos llamarla en nuestra función `useEffect`:

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

¡Y eso es todo! ¡Hemos completado con éxito la programación de toda la funcionalidad de nuestra billetera! ¡Ahora a nuestra última tarea: actualizar el mensaje almacenado en nuestro contrato inteligente!

### Paso 6: Implementa la función `updateMessage` {#step-6-implement-the-updateMessage-function}

¡Muy bien, amigos, hemos llegado a la recta final! En `updateMessage` de tu archivo `interact.js`, vamos a hacer lo siguiente:

1. Asegurarnos de que el mensaje que deseamos publicar en nuestro contrato inteligente es válido
2. Firmar nuestra transacción usando MetaMask
3. Llamar a esta función desde nuestro componente de frontend `HelloWorld.js`

Esto no llevará mucho tiempo; ¡terminemos esta dapp!

#### Manejo de errores de entrada {#input-error-handling}

Naturalmente, tiene sentido tener algún tipo de manejo de errores de entrada al inicio de la función.

Querremos que nuestra función devuelva un valor de forma temprana si no hay ninguna extensión de MetaMask instalada, no hay ninguna billetera conectada (es decir, la `address` pasada es una cadena vacía), o el `message` es una cadena vacía. Añadamos el siguiente manejo de errores a `updateMessage`:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Conecta tu billetera de MetaMask para actualizar el mensaje en la cadena de bloques.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Tu mensaje no puede ser una cadena vacía.",
    }
  }
}
```

Ahora que tiene un manejo de errores de entrada adecuado, ¡es hora de firmar la transacción a través de MetaMask!

#### Firmando nuestra transacción {#signing-our-transaction}

Si ya te sientes cómodo con las transacciones tradicionales de web3 en Ethereum, el código que escribiremos a continuación te resultará muy familiar. Debajo de tu código de manejo de errores de entrada, añade lo siguiente a `updateMessage`:

```javascript
// interact.js

//configurar parámetros de transacción
const transactionParameters = {
  to: contractAddress, // Obligatorio excepto durante la publicación de contratos.
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
          ¡Consulta el estado de tu transacción en Etherscan!
        </a>
        <br />
        ℹ️ Una vez que la red verifique la transacción, el mensaje se actualizará automáticamente.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

Desglosemos lo que está sucediendo. Primero, configuramos nuestros parámetros de transacción, donde:

- `to` especifica la dirección del destinatario (nuestro smart contract)
- `from` especifica el firmante de la transacción, la variable `address` que pasamos a nuestra función
- `data` contiene la llamada al método `update` de nuestro contrato inteligente Hello World, recibiendo como entrada nuestra variable de cadena `message`

Luego, hacemos una llamada `await`, `window.ethereum.request`, donde le pedimos a MetaMask que firme la transacción. Fíjate, en las líneas 11 y 12, estamos especificando nuestro método eth, `eth_sendTransaction`, y pasando nuestros `transactionParameters`.

En este punto, MetaMask se abrirá en el navegador y solicitará al usuario firmar o rechazar la transacción.

- Si la transacción es exitosa, la función devolverá un objeto JSON donde la cadena JSX `status` le indica al usuario que consulte Etherscan para obtener más información sobre su transacción.
- Si la transacción falla, la función devolverá un objeto JSON donde la cadena `status` transmite el mensaje de error.

En conjunto, nuestra función `updateMessage` debería tener este aspecto:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //manejo de errores de entrada
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Conecta tu billetera de MetaMask para actualizar el mensaje en la cadena de bloques.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Tu mensaje no puede ser una cadena vacía.",
    }
  }

  //configurar parámetros de transacción
  const transactionParameters = {
    to: contractAddress, // Obligatorio excepto durante la publicación de contratos.
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
            ¡Consulta el estado de tu transacción en Etherscan!
          </a>
          <br />
          ℹ️ Una vez que la red verifique la transacción, el mensaje se
          actualizará automáticamente.
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

#### Conecta `updateMessage` al frontend de `HelloWorld.js` {#connect-updatemessage-to-the-helloworld-js-frontend}

Nuestra función `onUpdatePressed` debería hacer una llamada `await` a la función importada `updateMessage` y modificar la variable de estado `status` para reflejar si nuestra transacción tuvo éxito o falló:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

Es súper limpio y simple. Y adivina qué... ¡¡¡TU DAPP ESTÁ COMPLETA!!!

¡Adelante, prueba el botón **Actualizar**!

### Crea tu propia dapp personalizada {#make-your-own-custom-dapp}

¡Woooo, llegaste al final del tutorial! Para recapitular, aprendiste a:

- Conectar una billetera MetaMask a tu proyecto de dapp
- Leer datos de su contrato inteligente usando la API de [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Firmar transacciones de Ethereum usando MetaMask.

¡Ahora estás totalmente equipado para aplicar las habilidades de este tutorial para construir tu propio proyecto de dapp personalizado! Como siempre, si tienes alguna pregunta, no dudes en contactarnos para obtener ayuda en el [Discord de Alchemy](https://discord.gg/gWuC7zB). 🧙‍♂️

Cuando finalice este tutorial, cuéntenos cómo fue su experiencia o comparta algún comentario etiquetándonos en Twitter [@alchemyplatform](https://twitter.com/AlchemyPlatform).
