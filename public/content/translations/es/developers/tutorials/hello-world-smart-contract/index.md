---
title: "Contrato inteligente «Hola, mundo» para principiantes"
description: "Tutorial introductorio sobre cómo escribir y desplegar un contrato inteligente sencillo en Ethereum."
author: "elanh"
tags:
  [
    "Solidity",
    "hardhat",
    "Alchemy",
    "contratos Inteligentes",
    "implementación"
  ]
skill: beginner
lang: es
published: 2021-03-31
---

Si es nuevo en el desarrollo de cadenas de bloques y no sabe por dónde empezar, o si solo quiere entender cómo desplegar e interactuar con contratos inteligentes, esta guía es para usted. Repasaremos cómo crear y desplegar un contrato inteligente sencillo en la red de prueba de Sepolia utilizando una billetera virtual ([MetaMask](https://metamask.io/)), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/) y [Alchemy](https://www.alchemy.com/eth) (no se preocupe si aún no entiende lo que esto significa, lo explicaremos).

En la [parte 2](https://docs.alchemy.com/docs/interacting-with-a-smart-contract) de este tutorial repasaremos cómo podemos interactuar con nuestro contrato inteligente una vez que se haya desplegado y, en la [parte 3](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan), cubriremos cómo publicarlo en Etherscan.

¡Si tiene alguna pregunta, no dude en consultarnos en el [Discord de Alchemy](https://discord.gg/gWuC7zB)!

## Paso 1: Conectarse a la red de Ethereum {#step-1}

Hay muchas formas de hacer solicitudes a la cadena de Ethereum. Para simplificar, usaremos una cuenta gratuita en Alchemy, una plataforma de desarrollo de cadenas de bloques y API que nos permite comunicarnos con la cadena de Ethereum sin tener que ejecutar nuestros propios nodos. La plataforma también tiene herramientas para desarrolladores para monitoreo y análisis que aprovecharemos en este tutorial para entender lo que sucede internamente en el despliegue de nuestro contrato inteligente. Si aún no tiene una cuenta de Alchemy, [puede registrarse gratis aquí](https://dashboard.alchemy.com/signup).

## Paso 2: Cree su aplicación (y clave de API) {#step-2}

Una vez que haya creado una cuenta de Alchemy, puede generar una clave de API creando una aplicación. Esto nos permitirá realizar solicitudes a la red de pruebas de Sepolia. Si no está familiarizado con las redes de prueba, consulte [esta página](/developers/docs/networks/).

1. Vaya a la página «Crear nueva aplicación» en su panel de Alchemy seleccionando «Seleccionar una aplicación» en la barra de navegación y haciendo clic en «Crear nueva aplicación».

![Crear aplicación hola, mundo](./hello-world-create-app.png)

2. Nombre su aplicación «Hola, mundo», ofrezca una breve descripción y elija un caso de uso, por ejemplo, «Infraestructura y herramientas». A continuación, busque «Ethereum» y seleccione la red.

![vista de la creación de la aplicación hola, mundo](./create-app-view-hello-world.png)

3. Haga clic en «Siguiente» para continuar y luego en «Crear aplicación». ¡Y eso es todo! Su aplicación debería aparecer en el menú desplegable de la barra de navegación, con una clave de API disponible para copiar.

## Paso 3: Crear una cuenta de Ethereum (dirección) {#step-3}

Necesitamos tener una cuenta Ethereum para enviar y recibir transacciones. Para este tutorial, usaremos Metamask, una cartera virtual en el navegador usada para manejar la dirección de su cuenta Ethereum. Más información sobre [transacciones](/developers/docs/transactions/).

Puede descargar MetaMask y crear una cuenta de Ethereum gratis [aquí](https://metamask.io/download). Cuando cree una cuenta, o si ya tiene una, asegúrese de cambiar a la red de prueba «Sepolia» en el menú desplegable de redes (para no utilizar dinero real).

Si no ve Sepolia en la lista, vaya al menú, luego a «Avanzado» y desplácese hacia abajo para activar «Mostrar redes de prueba». En el menú de selección de red, elija la pestaña «Personalizada» para encontrar una lista de redes de prueba y seleccione «Sepolia».

![ejemplo de metamask sepolia](./metamask-sepolia-example.png)

## Paso 4: Añadir ether desde un faucet {#step-4}

Para desplegar nuestro contrato inteligente en la red de prueba, necesitaremos algo de ETH falso. Para obtener ETH de Sepolia, puede ir a los [detalles de la red Sepolia](/developers/docs/networks/#sepolia) para ver una lista de varios faucets. Si uno no funciona, pruebe con otro, ya que a veces pueden quedarse sin fondos. Puede que tarde un tiempo en recibir su ETH falso debido al tráfico de la red. ¡Debería ver el ETH en su cuenta de MetaMask poco después!

## Paso 5: Compruebe su saldo {#step-5}

Para volver a comprobar que tenemos saldo, hagamos una solicitud [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) usando la [herramienta de composición de Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Esto devolverá la cantidad de ETH a nuestra cartera. Después de introducir la dirección de su cuenta de Metamask y hacer clic en «Send Request», debería ver una respuesta como esta:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **NOTA:** Este resultado está en wei, no en ETH. Wei se usa como la denominación más pequeña de Ether. La conversión de wei a ETH es: 1 eth = 10<sup>18</sup> wei. Así que si convertimos 0x2B5E3AF16B1880000 a decimal, obtenemos 5\*10¹⁸, que equivale a 5 ETH.
>
> ¡Fiu! Nuestro dinero falso está todo ahí <Emoji text=":money_mouth_face:" size={1} />.

## Paso 6: Inicializar nuestro proyecto {#step-6}

Primero, necesitaremos crear una carpeta para nuestro proyecto. Vaya a su línea de comando y escriba:

```
mkdir hello-world
cd hello-world
```

Ahora que estamos dentro de la carpeta de nuestro proyecto, usaremos `npm init` para inicializar el proyecto. Si aún no tiene instalado npm, siga [estas instrucciones](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (¡también necesitaremos Node.js, así que descárguelo también!).

```
npm init
```

Realmente no importa cómo responda las preguntas de instalación; aquí le mostramos cómo lo hicimos nosotros:

```
package name: (hello-world)
version: (1.0.0)
description: contrato inteligente hola, mundo
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
  "description": "contrato inteligente hola, mundo",
  "main": "index.js",
  "scripts": {
     "test": "echo \"Error: no test specified\\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Apruebe el package.json y ¡listo!

## Paso 7: Descargar [Hardhat](https://hardhat.org/getting-started/#overview) {#step-7}

Hardhat es un entorno de desarrollo para compilar, implementar, probar y depurar su software de Ethereum. Ayuda a los desarrolladores cuando crean contratos inteligentes y dApps localmente antes de la implementación en la cadena real.

Dentro de nuestro proyecto `hello-world`, ejecute:

```
npm install --save-dev hardhat
```

Consulte esta página para obtener más detalles sobre las [instrucciones de instalación](https://hardhat.org/getting-started/#overview).

## Paso 8: Crear un proyecto de Hardhat {#step-8}

Dentro de la carpeta de nuestro proyecto, ejecute:

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

👷 Bienvenido a Hardhat v2.0.11 👷‍?

¿Qué desea hacer? …
Crear un proyecto de ejemplo
❯ Crear un hardhat.config.js vacío
Salir
```

Esta acción nos creará un archivo hardhat.config.js, que es donde especificaremos todos los ajustes para nuestro proyecto (en el paso 13).

## Paso 9: Añadir carpetas de proyecto {#step-9}

Para mantener nuestro proyecto organizado, crearemos dos carpetas nuevas. Navegue al directorio raíz de su proyecto en su línea de comandos y teclee:

```
mkdir contracts
mkdir scripts
```

- `contracts/` es donde guardaremos nuestro archivo de código del contrato inteligente «Hola, mundo».
- `scripts/` es donde guardaremos los scripts para desplegar e interactuar con nuestro contrato.

## Paso 10: Escribir nuestro contrato {#step-10}

Se estará preguntando, ¿cuándo diablos vamos a escribir código? Bueno, aquí estamos, en el paso 10.

Abra el proyecto hello-world en su editor favorito (a nosotros nos gusta [VSCode](https://code.visualstudio.com/)). Los contratos inteligentes están escritos en un lenguaje llamado Solidity que es lo que usaremos para escribir nuestro contrato inteligente HelloWorld.sol.

1. Vaya a la carpeta «contracts» y cree un nuevo archivo llamado HelloWorld.sol.
2. A continuación se muestra un contrato inteligente de ejemplo «Hola, mundo» de la Fundación Ethereum que utilizaremos para este tutorial. Copie y pegue el siguiente contenido en su archivo HelloWorld.sol y asegúrese de leer los comentarios para entender lo que hace este contrato:

```solidity
// Especifica la versión de Solidity, usando el versionado semántico.
// Más información: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// Define un contrato llamado `HelloWorld`.
// Un contrato es un conjunto de funciones y datos (su estado). Una vez desplegado, un contrato reside en una dirección específica en la cadena de bloques de Ethereum. Más información: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Declara una variable de estado `message` de tipo `string`.
   // Las variables de estado son variables cuyos valores se almacenan permanentemente en el almacenamiento del contrato. La palabra clave `public` hace que las variables sean accesibles desde fuera de un contrato y crea una función que otros contratos o clientes pueden llamar para acceder al valor.
   string public message;

   // Similar a muchos lenguajes orientados a objetos basados en clases, un constructor es una función especial que solo se ejecuta en la creación del contrato.
   // Los constructores se utilizan para inicializar los datos del contrato. Más información:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Acepta un argumento de cadena `initMessage` y establece el valor en la variable de almacenamiento `message` del contrato.
      message = initMessage;
   }

   // Una función pública que acepta un argumento de cadena y actualiza la variable de almacenamiento `message`.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Este es un contrato inteligente súper simple que almacena un mensaje en su creación y se puede actualizar llamando a la función `update`.

## Paso 11: Conectar MetaMask y Alchemy a su proyecto {#step-11}

Hemos creado una billetera de MetaMask, una cuenta de Alchemy y hemos escrito nuestro contrato inteligente, ahora es el momento de conectar los tres.

Cada transacción enviada desde su billetera virtual requiere una firma utilizando su clave privada única. Para proporcionar este permiso a nuestro programa, podemos almacenar de manera segura nuestra clave privada (y clave Alchemy API) en un archivo de entorno.

> Para obtener más información sobre el envío de transacciones, consulte [este tutorial](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) sobre el envío de transacciones utilizando web3.

Primero, instale el paquete dotenv en su directorio de proyecto:

```
npm install dotenv --save
```

Luego, cree un archivo `.env` en el directorio raíz de nuestro proyecto, y añada su clave privada de MetaMask y la URL de la API HTTP de Alchemy.

- Siga [estas instrucciones](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) para exportar su clave privada.
- Vea a continuación cómo obtener la URL de la API de HTTP de Alchemy.

![obtener clave de API de alchemy](./get-alchemy-api-key.png)

Copiar URL de la API de Alchemy

Su `.env` debería verse así:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/su-clave-de-api"
PRIVATE_KEY = "su-clave-privada-de-metamask"
```

Para conectar esto a nuestro código, haremos referencia a estas variables en nuestro archivo `hardhat.config.js` en el paso 13.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
¡No haga commit de <code>.env</code>! Por favor, asegúrese de no compartir ni exponer nunca su archivo <code>.env</code> a nadie, ya que al hacerlo estaría comprometiendo sus secretos. Si está usando un sistema de control de versiones, añada su <code>.env</code> a un archivo <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Paso 12: Instalar Ethers.js {#step-12-install-ethersjs}

Ethers.js es una biblioteca que facilita la interacción y la realización de solicitudes a Ethereum envolviendo los [métodos JSON-RPC estándar](/developers/docs/apis/json-rpc/) con métodos más fáciles de usar.

Hardhat hace que sea muy fácil integrar [Plugins](https://hardhat.org/plugins/) para herramientas adicionales y funcionalidad extendida. Aprovecharemos el [plugin de Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) para el despliegue de contratos ([Ethers.js](https://github.com/ethers-io/ethers.js/) tiene algunos métodos de despliegue de contratos muy limpios).

En el directorio de su proyecto teclee:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

También necesitaremos ethers en nuestro `hardhat.config.js` en el siguiente paso.

## Paso 13: Actualizar hardhat.config.js {#step-13-update-hardhatconfigjs}

Hemos añadido varias dependencias y plugins hasta ahora, ahora necesitamos actualizar `hardhat.config.js` para que nuestro proyecto los conozca todos.

Actualice su `hardhat.config.js` para que se vea así:

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

Para asegurarnos de que todo funciona correctamente hasta ahora, compilemos nuestro contrato. La tarea `compile` es una de las tareas incorporadas de Hardhat.

Desde la línea de comandos ejecute:

```
npx hardhat compile
```

Puede que reciba una advertencia sobre que el `identificador de licencia SPDX no se proporcionó en el archivo de origen`, pero no hay que preocuparse por eso. ¡Esperemos que todo lo demás se vea bien! Si no es así, siempre puede enviar un mensaje en el [discord de Alchemy](https://discord.gg/u72VCg3).

## Paso 15: Escribir nuestro script de despliegue {#step-15-write-our-deploy-scripts}

Ahora que nuestro contrato está escrito y nuestro archivo de configuración está listo, es momento de escribir nuestro script de implementación del contrato.

Vaya a la carpeta `scripts/` y cree un nuevo archivo llamado `deploy.js`, añadiendo el siguiente contenido:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Iniciar el despliegue, devolviendo una promesa que se resuelve en un objeto de contrato
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contrato desplegado en la dirección:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat hace un trabajo increíble explicando lo que hace cada una de estas líneas de código en su [tutorial de Contratos](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), hemos adoptado sus explicaciones aquí.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

Una `ContractFactory` en ethers.js es una abstracción que se usa para desplegar nuevos contratos inteligentes, por lo que `HelloWorld` aquí es una fábrica de instancias de nuestro contrato «Hola, mundo». Cuando se utiliza el plugin `hardhat-ethers`, las instancias de `ContractFactory` y `Contract` se conectan al primer firmante por defecto.

```
const hello_world = await HelloWorld.deploy();
```

Llamar a `deploy()` en una `ContractFactory` iniciará el despliegue y devolverá una `Promise` que se resuelve en un `Contract`. Este es el elemento que tiene un método para cada una de nuestras funciones de contrato inteligente.

## Paso 16: Desplegar nuestro contrato {#step-16-deploy-our-contract}

¡Ahora ya estamos listos para desplegar nuestro contrato inteligente! Vaya a la línea de comandos y ejecute:

```
npx hardhat run scripts/deploy.js --network sepolia
```

Debería mostrarse algo parecido a esto:

```
Contrato desplegado en la dirección: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Si vamos al [explorador de bloques Etherscan de Sepolia](https://sepolia.etherscan.io/) y buscamos la dirección de nuestro contrato, deberíamos poder ver que se ha desplegado con éxito. La transacción tendrá un aspecto parecido a este:

![contrato en etherscan](./etherscan-contract.png)

La dirección `From` debe coincidir con la dirección de su cuenta de MetaMask y la dirección `To` indicará «Contract Creation». Sin embargo, si hacemos clic en la transacción, veremos la dirección de nuestro contrato en el campo `To`:

![transacción en etherscan](./etherscan-transaction.png)

¡Enhorabuena! Acaba de desplegar un contrato inteligente en la cadena de Ethereum 🎉

Para entender lo que sucede internamente, vayamos a la pestaña Explorador en nuestro [panel de Alchemy](https://dashboard.alchemyapi.io/explorer). Si tiene varias aplicaciones de Alchemy, asegúrese de filtrar por aplicación y seleccionar «Hola, mundo».
![explorador hola, mundo](./hello-world-explorer.png)

Aquí verá unas cuantas llamadas JSON-RPC que Hardhat/Ethers hicieron por nosotros de forma interna cuando llamamos a la función `.deploy()`. Dos importantes a destacar aquí son [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction), que es la solicitud para escribir realmente nuestro contrato en la cadena de Sepolia, y [`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash) que es una solicitud para leer información sobre nuestra transacción a partir del hash (un patrón típico al procesar transacciones). Para obtener más información sobre el envío de transacciones, consulte este tutorial sobre el [envío de transacciones utilizando Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

Eso es todo por la parte 1 de este tutorial. En la parte 2, [interactuaremos con nuestro contrato inteligente](https://www.alchemy.com/docs/interacting-with-a-smart-contract) actualizando nuestro mensaje inicial y, en la parte 3, [publicaremos nuestro contrato inteligente en Etherscan](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) para que todo el mundo sepa cómo interactuar con él.

**¿Quiere saber más sobre Alchemy? Consulte nuestro [sitio web](https://www.alchemy.com/eth). ¿No quiere perderse ninguna actualización? ¡Suscríbase a nuestro boletín [aquí](https://www.alchemy.com/newsletter)! Asegúrese de unirse también a nuestro [Discord](https://discord.gg/u72VCg3).**.
