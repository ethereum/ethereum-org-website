---
title: Contrato inteligente Hola Mundo para principiantes
description: Tutorial introductorio sobre cómo escribir y desplegar un contrato inteligente simple en Ethereum.
author: "elanh"
tags: ["solidity", "hardhat", "alchemy", "contratos inteligentes", "despliegue"]
skill: beginner
breadcrumb: Contrato Hola Mundo
lang: es
published: 2021-03-31
---

Si eres nuevo en el desarrollo de la cadena de bloques y no sabes por dónde empezar, o si simplemente quieres entender cómo desplegar e interactuar con contratos inteligentes, esta guía es para ti. Te guiaremos en la creación y el despliegue de un contrato inteligente simple en la red de prueba Sepolia utilizando una billetera virtual [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/) y [Alchemy](https://www.alchemy.com/eth) (no te preocupes si aún no entiendes qué significa todo esto, lo explicaremos).

En la [parte 2](https://docs.alchemy.com/docs/interacting-with-a-smart-contract) de este tutorial, veremos cómo podemos interactuar con nuestro contrato inteligente una vez que esté desplegado aquí, y en la [parte 3](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) cubriremos cómo publicarlo en Etherscan.

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

## Paso 3: Crear una cuenta (dirección) de Ethereum {#step-3}

Necesitamos una cuenta de Ethereum para enviar y recibir transacciones. Para este tutorial, usaremos MetaMask, una billetera virtual en el navegador que se usa para administrar la dirección de tu cuenta de Ethereum. Más información sobre [transacciones](/developers/docs/transactions/).

Puedes descargar MetaMask y crear una cuenta de Ethereum gratis [aquí](https://metamask.io/download). Cuando estés creando una cuenta, o si ya tienes una, asegúrate de cambiar a la red de prueba "Sepolia" usando el menú desplegable de redes (para que no estemos lidiando con dinero real).

Si no ves a Sepolia en la lista, ve al menú, luego a Avanzado (Advanced) y desplázate hacia abajo para activar "Mostrar redes de prueba" (Show test networks). En el menú de selección de red, elige la pestaña "Personalizado" (Custom) para encontrar una lista de redes de prueba y selecciona "Sepolia".

![metamask sepolia example](./metamask-sepolia-example.png)

## Paso 4: Añadir ether desde un faucet {#step-4}

Para desplegar nuestro contrato inteligente en la red de prueba, necesitaremos algo de Eth falso. Para obtener ETH de Sepolia, puedes ir a los [detalles de la red Sepolia](/developers/docs/networks/#sepolia) para ver una lista de varios faucets. Si uno no funciona, prueba con otro, ya que a veces pueden quedarse sin fondos. Puede tomar algo de tiempo recibir tu ETH falso debido al tráfico de la red. ¡Deberías ver ETH en tu cuenta de MetaMask poco después!

## Paso 5: Comprobar tu saldo {#step-5}

Para verificar que nuestro saldo esté ahí, hagamos una solicitud [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) usando la [herramienta composer de Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Esto devolverá la cantidad de ETH en nuestra billetera. Después de ingresar la dirección de tu cuenta de MetaMask y hacer clic en "Send Request" (Enviar solicitud), deberías ver una respuesta como esta:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **NOTA:** Este resultado está en Wei, no en ETH. Wei se utiliza como la denominación más pequeña de ether. La conversión de Wei a ETH es: 1 eth = 10<sup>18</sup> Wei. Así que si convertimos 0x2B5E3AF16B1880000 a decimal obtenemos 5\*10¹⁸, lo que equivale a 5 ETH.
>
> ¡Uf! Nuestro dinero falso está todo ahí <Emoji text=":money_mouth_face:" size={1} />.

## Paso 6: Inicializar nuestro proyecto {#step-6}

Primero, necesitaremos crear una carpeta para nuestro proyecto. Navega a tu línea de comandos y escribe:

```
mkdir hello-world
cd hello-world
```

Ahora que estamos dentro de la carpeta de nuestro proyecto, usaremos `npm init` para inicializar el proyecto. Si aún no tienes npm instalado, sigue [estas instrucciones](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (también necesitaremos Node.js, ¡así que descárgalo también!).

```
npm init
```

Realmente no importa cómo respondas a las preguntas de instalación, aquí te mostramos cómo lo hicimos como referencia:

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

## Paso 7: Descargar [Hardhat](https://hardhat.org/getting-started/#overview) {#step-7}

Hardhat es un entorno de desarrollo para compilar, desplegar, probar y depurar tu software de Ethereum. Ayuda a los desarrolladores al construir contratos inteligentes y aplicaciones descentralizadas (dapps) localmente antes de desplegarlos en la cadena en vivo.

Dentro de nuestro proyecto `hello-world`, ejecuta:

```
npm install --save-dev hardhat
```

Consulta esta página para obtener más detalles sobre las [instrucciones de instalación](https://hardhat.org/getting-started/#overview).

## Paso 8: Crear un proyecto de Hardhat {#step-8}

Dentro de la carpeta de nuestro proyecto, ejecuta:

```
npx hardhat
```

Luego deberías ver un mensaje de bienvenida y la opción de seleccionar lo que quieres hacer. Selecciona "create an empty hardhat.config.js":

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍?

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Esto generará un archivo `hardhat.config.js` para nosotros, que es donde especificaremos toda la configuración de nuestro proyecto (en el paso 13).

## Paso 9: Añadir carpetas del proyecto {#step-9}

Para mantener nuestro proyecto organizado, crearemos dos carpetas nuevas. Navega al directorio raíz de tu proyecto en tu línea de comandos y escribe:

```
mkdir contracts
mkdir scripts
```

- `contracts/` es donde guardaremos el archivo de código de nuestro contrato inteligente hola mundo.
- `scripts/` es donde guardaremos los scripts para desplegar e interactuar con nuestro contrato.

## Paso 10: Escribir nuestro contrato {#step-10}

Puede que te estés preguntando, ¿cuándo diablos vamos a escribir código? Bueno, aquí estamos, en el paso 10.

Abre el proyecto hello-world en tu editor favorito (a nosotros nos gusta [VSCode](https://code.visualstudio.com/)). Los contratos inteligentes se escriben en un lenguaje llamado Solidity, que es el que usaremos para escribir nuestro contrato inteligente HelloWorld.sol.‌

1.  Navega a la carpeta "contracts" y crea un nuevo archivo llamado HelloWorld.sol.
2.  A continuación, se muestra un contrato inteligente Hola Mundo de muestra de la Fundación Ethereum que usaremos para este tutorial. Copia y pega el siguiente contenido en tu archivo HelloWorld.sol, y asegúrate de leer los comentarios para entender qué hace este contrato:

```solidity
// Especifica la versión de Solidity, utilizando el versionado semántico.
// Más información: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// Define un contrato llamado `HelloWorld`.
// Un contrato es una colección de funciones y datos (su estado). Una vez desplegado, un contrato reside en una dirección específica en la cadena de bloques de Ethereum. Más información: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Declara una variable de estado `message` de tipo `string`.
   // Las variables de estado son variables cuyos valores se almacenan permanentemente en el almacenamiento del contrato. La palabra clave `public` hace que las variables sean accesibles desde fuera de un contrato y crea una función que otros contratos o clientes pueden llamar para acceder al valor.
   string public message;

   // De manera similar a muchos lenguajes orientados a objetos basados en clases, un constructor es una función especial que solo se ejecuta durante la creación del contrato.
   // Los constructores se utilizan para inicializar los datos del contrato. Más información:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
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

Hemos creado una billetera MetaMask, una cuenta de Alchemy y escrito nuestro contrato inteligente; ahora es el momento de conectar los tres.

Cada transacción enviada desde tu billetera virtual requiere una firma usando tu clave privada única. Para otorgarle este permiso a nuestro programa, podemos almacenar de forma segura nuestra clave privada (y la clave API de Alchemy) en un archivo de entorno.

> Para obtener más información sobre el envío de transacciones, consulta [este tutorial](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) sobre cómo enviar transacciones usando Web3.

Primero, instala el paquete dotenv en el directorio de tu proyecto:

```
npm install dotenv --save
```

Luego, crea un archivo `.env` en el directorio raíz de nuestro proyecto y añade tu clave privada de MetaMask y la URL HTTP de la API de Alchemy.

- Sigue [estas instrucciones](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) para exportar tu clave privada.
- Consulta a continuación para obtener la URL HTTP de la API de Alchemy.

![get alchemy api key](./get-alchemy-api-key.png)

Copiar la URL de la API de Alchemy

Tu `.env` debería verse así:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Para conectar realmente esto a nuestro código, haremos referencia a estas variables en nuestro archivo `hardhat.config.js` en el paso 13.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
¡No hagas commit de <code>.env</code>! Asegúrate de nunca compartir ni exponer tu archivo <code>.env</code> con nadie, ya que al hacerlo estarías comprometiendo tus secretos. Si estás utilizando control de versiones, añade tu <code>.env</code> a un archivo <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Paso 12: Instalar Ethers.js {#step-12-install-ethersjs}

Ethers.js es una biblioteca que facilita la interacción y la realización de solicitudes a Ethereum al envolver los [métodos estándar de JSON-RPC](/developers/docs/apis/json-rpc/) con métodos más fáciles de usar.

Hardhat hace que sea súper fácil integrar [complementos (plugins)](https://hardhat.org/plugins/) para herramientas adicionales y funcionalidad extendida. Aprovecharemos el [complemento de Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) para el despliegue de contratos ([Ethers.js](https://github.com/ethers-io/ethers.js/) tiene algunos métodos de despliegue de contratos muy limpios).

En el directorio de tu proyecto, escribe:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

También requeriremos ethers en nuestro `hardhat.config.js` en el siguiente paso.

## Paso 13: Actualizar hardhat.config.js {#step-13-update-hardhatconfigjs}

Hemos añadido varias dependencias y complementos hasta ahora; ahora necesitamos actualizar `hardhat.config.js` para que nuestro proyecto esté al tanto de todos ellos.

Actualiza tu `hardhat.config.js` para que se vea así:

```
require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "sepolia",
   networks: {
      hardhat: {},
      sepolia: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

## Paso 14: Compilar nuestro contrato {#step-14-compile-our-contracts}

Para asegurarnos de que todo funciona hasta ahora, compilemos nuestro contrato. La tarea `compile` es una de las tareas integradas de Hardhat.

Desde la línea de comandos, ejecuta:

```
npx hardhat compile
```

Es posible que recibas una advertencia sobre `SPDX license identifier not provided in source file`, pero no hay de qué preocuparse; ¡con suerte, todo lo demás se ve bien! Si no es así, siempre puedes enviar un mensaje en el [Discord de Alchemy](https://discord.gg/u72VCg3).

## Paso 15: Escribir nuestro script de despliegue {#step-15-write-our-deploy-scripts}

Ahora que nuestro contrato está escrito y nuestro archivo de configuración está listo, es hora de escribir nuestro script de despliegue de contrato.

Navega a la carpeta `scripts/` y crea un nuevo archivo llamado `deploy.js`, añadiendo el siguiente contenido:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Iniciar el despliegue, devolviendo una promesa que se resuelve en un objeto de contrato
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contract deployed to address:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat hace un trabajo increíble al explicar qué hace cada una de estas líneas de código en su [tutorial de Contratos](https://hardhat.org/tutorial/testing-contracts.html#writing-tests); hemos adoptado sus explicaciones aquí.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

Un `ContractFactory` en Ethers.js es una abstracción que se utiliza para desplegar nuevos contratos inteligentes, por lo que `HelloWorld` aquí es una fábrica para instancias de nuestro contrato hola mundo. Al usar el complemento `hardhat-ethers`, las instancias de `ContractFactory` y `Contract` están conectadas al primer firmante de forma predeterminada.

```
const hello_world = await HelloWorld.deploy();
```

Llamar a `deploy()` en un `ContractFactory` iniciará el despliegue y devolverá una `Promise` que se resuelve en un `Contract`. Este es el objeto que tiene un método para cada una de las funciones de nuestro contrato inteligente.

## Paso 16: Desplegar nuestro contrato {#step-16-deploy-our-contract}

¡Finalmente estamos listos para desplegar nuestro contrato inteligente! Navega a la línea de comandos y ejecuta:

```
npx hardhat run scripts/deploy.js --network sepolia
```

Luego deberías ver algo como:

```
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Si vamos al [Etherscan de Sepolia](https://sepolia.etherscan.io/) y buscamos la dirección de nuestro contrato, deberíamos poder ver que se ha desplegado con éxito. La transacción se verá algo así:

![etherscan contract](./etherscan-contract.png)

La dirección `From` debería coincidir con la dirección de tu cuenta de MetaMask y la dirección de destino (To) dirá "Contract Creation" (Creación de contrato), pero si hacemos clic en la transacción, veremos la dirección de nuestro contrato en el campo `To`:

![etherscan transaction](./etherscan-transaction.png)

¡Felicidades! Acabas de desplegar un contrato inteligente en la cadena de Ethereum 🎉

Para entender qué sucede internamente, naveguemos a la pestaña Explorer (Explorador) en nuestro [panel de Alchemy](https://dashboard.alchemyapi.io/explorer). Si tienes varias aplicaciones de Alchemy, asegúrate de filtrar por aplicación y seleccionar "Hello World".
![hello world explorer](./hello-world-explorer.png)

Aquí verás un puñado de llamadas JSON-RPC que Hardhat/Ethers hizo internamente por nosotros cuando llamamos a la función `.deploy()`. Dos importantes a destacar aquí son [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction), que es la solicitud para escribir realmente nuestro contrato en la cadena Sepolia, y [`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash), que es una solicitud para leer información sobre nuestra transacción dado el hash (un patrón típico al enviar transacciones). Para obtener más información sobre el envío de transacciones, consulta este tutorial sobre [cómo enviar transacciones usando Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

Eso es todo por la parte 1 de este tutorial; en la parte 2, realmente [interactuaremos con nuestro contrato inteligente](https://www.alchemy.com/docs/interacting-with-a-smart-contract) actualizando nuestro mensaje inicial, y en la parte 3 [publicaremos nuestro contrato inteligente en Etherscan](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) para que todos sepan cómo interactuar con él.

**¿Quieres aprender más sobre Alchemy? Visita nuestro [sitio web](https://www.alchemy.com/eth). ¿No quieres perderte ninguna actualización? ¡Suscríbete a nuestro boletín [aquí](https://www.alchemy.com/newsletter)! Asegúrate también de unirte a nuestro [Discord](https://discord.gg/u72VCg3).**.