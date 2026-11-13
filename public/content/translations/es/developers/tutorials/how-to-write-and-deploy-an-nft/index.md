---
title: "Cómo escribir y desplegar un NFT (Parte 1/3 de la serie de tutoriales sobre NFT)"
description: "Este tutorial es la Parte 1 de una serie sobre NFT que le guiará paso a paso sobre cómo escribir y desplegar un contrato inteligente de token no fungible (token ERC-721) utilizando Ethereum y el Sistema de Archivos Interplanetario (IPFS)."
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "contratos inteligentes"]
skill: beginner
breadcrumb: Escribir y desplegar un NFT
lang: es
published: 2021-04-22
---

Con los NFT atrayendo la atención del público hacia la cadena de bloques, ¡ahora es una excelente oportunidad para entender el entusiasmo por sí mismo publicando su propio contrato de NFT (token ERC-721) en la cadena de bloques de Ethereum!

En este tutorial, le guiaremos en la creación y el despliegue de un contrato inteligente ERC-721 en la red de prueba Sepolia utilizando [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) y [Alchemy](https://alchemy.com/signup/eth) (no se preocupe si aún no entiende qué significa todo esto, ¡lo explicaremos!).

En la Parte 2 de este tutorial, veremos cómo podemos usar nuestro contrato inteligente para acuñar un NFT, y en la Parte 3 explicaremos cómo ver su NFT en MetaMask.

Y, por supuesto, si tiene preguntas en cualquier momento, ¡no dude en comunicarse en el [Discord de Alchemy](https://discord.gg/gWuC7zB) o visite la [documentación de la API de NFT de Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)!

## Paso 1: Conectarse a la red Ethereum {#connect-to-ethereum}

Hay muchas formas de hacer solicitudes a la cadena de bloques de Ethereum, pero para facilitar las cosas, usaremos una cuenta gratuita en [Alchemy](https://alchemy.com/signup/eth), una plataforma para desarrolladores de cadenas de bloques y API que nos permite comunicarnos con la cadena de Ethereum sin tener que ejecutar nuestros propios nodos.

En este tutorial, también aprovecharemos las herramientas para desarrolladores de Alchemy para la monitorización y el análisis con el fin de entender qué sucede internamente en el despliegue de nuestro contrato inteligente. Si aún no tiene una cuenta de Alchemy, puede registrarse gratis [aquí](https://alchemy.com/signup/eth).

## Paso 2: Crear su aplicación (y clave de API) {#make-api-key}

Una vez que haya creado una cuenta de Alchemy, puede generar una clave de interfaz de programación de aplicaciones (API) creando una aplicación. Esto nos permitirá hacer solicitudes a la red de prueba Sepolia. Consulte [esta guía](https://www.alchemy.com/docs/choosing-a-web3-network) si tiene curiosidad por aprender más sobre las redes de prueba.

1. Navegue a la página "Create new app" (Crear nueva aplicación) en su panel de control de Alchemy seleccionando "Select an app" (Seleccionar una aplicación) en la barra de navegación y haciendo clic en "Create new app".

![Crear su aplicación](./alchemy-create-new-app.png)

2. Póngale un nombre a su aplicación (nosotros elegimos "My First NFT!"), ofrezca una breve descripción y elija un caso de uso. A continuación, busque "Ethereum" y seleccione la red. Usaremos Sepolia, la red de prueba recomendada para el desarrollo de aplicaciones (consulte [Redes de Ethereum](/developers/docs/networks/#ethereum-testnets)).

3. Haga clic en "Next" (Siguiente) para continuar, luego en "Create app" (Crear aplicación) y ¡eso es todo! Su aplicación debería aparecer en el menú desplegable de la barra de navegación, con una clave de API disponible para copiar.

## Paso 3: Crear una cuenta de Ethereum (dirección) {#create-eth-address}

Necesitamos una cuenta de Ethereum para enviar y recibir transacciones. Para este tutorial, usaremos MetaMask, una billetera virtual en el navegador que se utiliza para administrar la dirección de su cuenta de Ethereum. Si desea comprender más sobre cómo funcionan las transacciones en Ethereum, consulte [esta página](/developers/docs/transactions/) de la Fundación Ethereum.

Puede descargar y crear una cuenta de MetaMask de forma gratuita [aquí](https://metamask.io/download). Cuando esté creando una cuenta, o si ya tiene una, asegúrese de cambiar a la red de prueba "Sepolia" utilizando el menú de selección de red (para que no estemos lidiando con dinero real). Si no ve Sepolia en la lista, abra el menú en la esquina superior derecha, seleccione "Networks" (Redes) y active "Show test networks" (Mostrar redes de prueba) (consulte la [guía de MetaMask para ver redes de prueba](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)).

![Establecer Sepolia como su red](./metamask-sepolia.png)

## Paso 4: Añadir ether desde un faucet {#step-4-add-ether-from-a-faucet}

Para desplegar nuestro contrato inteligente en la red de prueba, necesitaremos algo de ETH falso. Para obtener ETH de Sepolia, elija uno de los faucets enumerados en los [detalles de la red Sepolia](/developers/docs/networks/#sepolia) e ingrese la dirección de su cuenta. Si uno no funciona, pruebe con otro, ya que a veces pueden quedarse sin fondos, y algunos tienen reglas de elegibilidad: por ejemplo, el [faucet de Sepolia de Alchemy](https://www.alchemy.com/faucets/ethereum-sepolia) requiere que la dirección receptora tenga al menos 0.001 ETH en la red principal de Ethereum. ¡Debería ver ETH en su cuenta de MetaMask poco después!

## Paso 5: Comprobar su saldo {#check-balance}

Para comprobar que nuestro saldo está ahí, hagamos una solicitud [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) utilizando [la herramienta sandbox de Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Esto devolverá la cantidad de ETH en nuestra billetera. Después de ingresar la dirección de su cuenta de MetaMask y hacer clic en "Send Request" (Enviar solicitud), debería ver una respuesta como esta:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```

> **Nota** Este resultado está en Wei, no en ETH. Wei se utiliza como la denominación más pequeña de ether. La conversión de Wei a ETH es 1 eth = 10<sup>18</sup> Wei. Así que si convertimos 0xde0b6b3a7640000 a decimal obtenemos 1\*10<sup>18</sup> Wei, lo que equivale a 1 ETH.

¡Uf! Todo nuestro dinero falso está ahí.

## Paso 6: Inicializar nuestro proyecto {#initialize-project}

Primero, necesitaremos crear una carpeta para nuestro proyecto. Navegue a su línea de comandos y escriba:

```sh
mkdir my-nft
cd my-nft
```

Ahora que estamos dentro de la carpeta de nuestro proyecto, usaremos npm init para inicializar el proyecto. Si aún no tiene npm instalado, siga [las instrucciones de instalación de Node.js](https://nodejs.org/en/download/) (necesitaremos Node.js y npm para este tutorial).

```sh
npm init
```

Realmente no importa cómo responda a las preguntas de instalación; aquí le mostramos cómo lo hicimos como referencia:

```console
package name: (my-nft)
version: (1.0.0)
description: My first NFT!
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/thesuperb1/Desktop/my-nft/package.json:

{
  "name": "my-nft",
  "version": "1.0.0",
  "description": "My first NFT!",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Apruebe el archivo package.json. Hardhat 3, que instalaremos a continuación, solo admite proyectos de módulos ES, así que marque el proyecto como tal:

```sh
npm pkg set type=module
```

¡Y ya estamos listos para empezar!

## Paso 7: Instalar [Hardhat](https://hardhat.org/docs/getting-started) {#install-hardhat}

Hardhat es un entorno de desarrollo para compilar, desplegar, probar y depurar su software de Ethereum. Ayuda a los desarrolladores a crear contratos inteligentes y aplicaciones descentralizadas (dapps) localmente antes de desplegarlos en la cadena en vivo.

Hardhat 3 requiere Node.js v22.13.0 o posterior. Dentro de nuestro proyecto my-nft, ejecute:

```sh
npm install --save-dev hardhat
```

Consulte esta página para obtener más detalles sobre las [instrucciones de instalación](https://hardhat.org/docs/getting-started).

## Paso 8: Crear un proyecto de Hardhat {#create-hardhat-project}

Ejecutar `npx hardhat --init` generaría un proyecto de muestra completo, pero para este tutorial configuraremos las cosas a mano para que pueda ver cada pieza. En la raíz de la carpeta de su proyecto, cree un archivo llamado `hardhat.config.js` con el siguiente contenido:

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

Aquí es donde especificaremos toda la configuración de nuestro proyecto (en el paso 13). Por ahora, solo le dice a Hardhat qué versión del compilador de Solidity usar.

## Paso 9: Añadir carpetas del proyecto {#add-project-folders}

Para mantener nuestro proyecto organizado, crearemos dos carpetas nuevas. Navegue al directorio raíz de su proyecto en su línea de comandos y escriba:

```sh
mkdir contracts
mkdir scripts
```

- contracts/ es donde guardaremos el código de nuestro contrato inteligente de NFT

- scripts/ es donde guardaremos los scripts para desplegar e interactuar con nuestro contrato inteligente

## Paso 10: Escribir nuestro contrato {#write-contract}

Ahora que nuestro entorno está configurado, pasemos a cosas más emocionantes: _¡escribir el código de nuestro contrato inteligente!_

Abra el proyecto my-nft en su editor favorito (a nosotros nos gusta [VSCode](https://code.visualstudio.com/)). Los contratos inteligentes están escritos en un lenguaje llamado Solidity, que es el que usaremos para escribir nuestro contrato inteligente MyNFT.sol.‌

1. Navegue a la carpeta `contracts` y cree un nuevo archivo llamado MyNFT.sol

2. A continuación se muestra el código de nuestro contrato inteligente de NFT, que basamos en la implementación de ERC-721 de la biblioteca [OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/erc721). Copie y pegue el contenido a continuación en su archivo MyNFT.sol.

   ```solidity
   // Contrato basado en https://docs.openzeppelin.com/contracts/5.x/erc721
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.24;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       uint256 private _nextTokenId;

       constructor(address initialOwner)
           ERC721("MyNFT", "NFT")
           Ownable(initialOwner)
       {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           uint256 newItemId = ++_nextTokenId;
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. Debido a que estamos heredando clases de la biblioteca de contratos de OpenZeppelin, en su línea de comandos ejecute `npm install @openzeppelin/contracts` para instalar la biblioteca en nuestra carpeta. Este tutorial utiliza OpenZeppelin Contracts 5.x, que requiere Solidity 0.8.24 o posterior.

Entonces, ¿qué _hace_ exactamente este código? Analicémoslo línea por línea.

En la parte superior de nuestro contrato inteligente, importamos tres clases de contratos inteligentes de [OpenZeppelin](https://openzeppelin.com/):

- @openzeppelin/contracts/token/ERC721/ERC721.sol contiene la implementación del estándar ERC-721, que heredará nuestro contrato inteligente de NFT. (Para ser un NFT válido, su contrato inteligente debe implementar todos los métodos del estándar ERC-721). Para obtener más información sobre las funciones heredadas de ERC-721, consulte la definición de la interfaz [aquí](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/access/Ownable.sol configura el [control de acceso](https://docs.openzeppelin.com/contracts/5.x/access-control) en nuestro contrato inteligente, por lo que solo el propietario del contrato inteligente (usted) puede acuñar NFT. El propietario es la dirección `initialOwner` que se pasa al constructor. (Tenga en cuenta que incluir el control de acceso es completamente una preferencia. Si desea que cualquier persona pueda acuñar un NFT utilizando su contrato inteligente, elimine `Ownable` y `Ownable(initialOwner)` de la definición del contrato y del constructor, y `onlyOwner` de la función `mintNFT`).

- @openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol amplía ERC-721 para que cada token pueda almacenar su propio URI de metadatos, que establecemos al acuñar.

Después de nuestras declaraciones de importación, tenemos nuestro contrato inteligente de NFT personalizado, que es sorprendentemente corto: ¡solo contiene un contador, un constructor y una sola función! Esto es gracias a nuestros contratos heredados de OpenZeppelin, que implementan la mayoría de los métodos que necesitamos para crear un NFT, como `ownerOf`, que devuelve el propietario del NFT, y `transferFrom`, que transfiere la propiedad del NFT de una cuenta a otra.

El contador, `_nextTokenId`, realiza un seguimiento del número total de NFT acuñados y establece el ID único en nuestro nuevo NFT. (A cada NFT acuñado mediante un contrato inteligente se le debe asignar un ID único; aquí nuestro ID único simplemente está determinado por el número total de NFT existentes. `++_nextTokenId` aumenta el contador antes de que se use, por lo que el primer NFT que acuñamos con nuestro contrato inteligente tiene un ID de "1", nuestro segundo NFT tiene un ID de "2", etc.).

En nuestro constructor ERC-721, notará que pasamos 2 cadenas, "MyNFT" y "NFT". La primera variable es el nombre del contrato inteligente y la segunda es su símbolo. ¡Puede nombrar cada una de estas variables como desee!

Finalmente, tenemos nuestra función `mintNFT(address recipient, string memory tokenURI)` que nos permite acuñar un NFT. Notará que esta función toma dos variables:

- `address recipient` especifica la dirección que recibirá su NFT recién acuñado.

- `string memory tokenURI` es una cadena que debería resolverse en un documento JSON que describe los metadatos del NFT. Los metadatos de un NFT son realmente lo que le da vida, permitiéndole tener propiedades configurables, como un nombre, descripción, imagen y otros atributos. En la parte 2 de este tutorial, describiremos cómo configurar estos metadatos.

`mintNFT` llama a algunos métodos de la biblioteca ERC-721 heredada y, en última instancia, devuelve un número que representa el ID del NFT recién acuñado.

## Paso 11: Conectar MetaMask y Alchemy a su proyecto {#connect-metamask-and-alchemy}

Ahora que hemos creado una billetera de MetaMask, una cuenta de Alchemy y hemos escrito nuestro contrato inteligente, es hora de conectar los tres.

Cada transacción enviada desde su billetera virtual requiere una firma utilizando su clave privada única. Para proporcionar a nuestro programa este permiso, podemos almacenar de forma segura nuestra clave privada (y la clave de API de Alchemy) en un archivo de entorno.

Para obtener más información sobre el envío de transacciones, consulte la [documentación de transacciones](/developers/docs/transactions/).

Cree un archivo `.env` en el directorio raíz de nuestro proyecto y añada su clave privada de MetaMask y la URL HTTP de la API de Alchemy.

- Siga [estas instrucciones](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) para exportar su clave privada desde MetaMask.

- Consulte a continuación para obtener la URL HTTP de la API de Alchemy y cópiela en su portapapeles.

![Copiar la URL de su API de Alchemy](./copy-alchemy-api-url.mp4#842x480)

Su archivo `.env` ahora debería verse así:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Para conectar realmente estos elementos a nuestro código, haremos referencia a estas variables en nuestro archivo hardhat.config.js en el paso 13. Node.js puede leer archivos `.env` por sí solo, por lo que no hay ningún paquete adicional que instalar.

<EnvWarningBanner />

## Paso 12: Instalar Ethers.js {#install-ethers}

Ethers.js es una biblioteca que facilita la interacción y la realización de solicitudes a Ethereum al envolver los [métodos estándar de JSON-RPC](/developers/docs/apis/json-rpc/) con métodos más fáciles de usar.

Hardhat hace que sea muy fácil integrar [complementos](https://hardhat.org/docs/plugins/official-plugins) para herramientas adicionales y funcionalidad ampliada. Aprovecharemos el [complemento de Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) para el despliegue de contratos ([Ethers.js](https://docs.ethers.org/v6/) tiene algunos métodos de despliegue de contratos muy limpios).

En el directorio de su proyecto, escriba:

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

También añadiremos el complemento a nuestro hardhat.config.js en el siguiente paso.

## Paso 13: Actualizar hardhat.config.js {#update-hardhat-config}

Hemos añadido varias dependencias y complementos hasta ahora, ahora necesitamos actualizar hardhat.config.js para que nuestro proyecto los conozca todos.

Actualice su hardhat.config.js para que se vea así:

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// Carga API_URL y PRIVATE_KEY desde el archivo .env en process.env, si existe
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

`configVariable` le dice a Hardhat que lea cada valor de una variable de entorno solo cuando sea necesario, por lo que comandos como `compile` funcionan incluso antes de que se establezcan los valores. Si prefiere no mantener su clave privada en un archivo de texto sin formato, Hardhat también puede leer [variables de configuración desde un almacén de claves cifrado](https://hardhat.org/docs/guides/configuration-variables).

## Paso 14: Compilar nuestro contrato {#compile-contract}

Para asegurarnos de que todo funciona hasta ahora, compilemos nuestro contrato. La tarea de compilación es una de las tareas integradas de Hardhat.

Desde la línea de comandos, ejecute:

```sh
npx hardhat compile
```

La primera vez que compila, Hardhat descarga el compilador de Solidity. Luego debería ver algo como `Compiled 1 Solidity file with solc 0.8.34`. Si no es así, siempre puede enviar un mensaje en el [Discord de Alchemy](https://discord.gg/gWuC7zB).

## Paso 15: Escribir nuestro script de despliegue {#write-deploy}

Ahora que nuestro contrato está escrito y nuestro archivo de configuración está listo, es hora de escribir nuestro script de despliegue de contrato.

Navegue a la carpeta `scripts/` y cree un nuevo archivo llamado `deploy.js`, añadiendo el siguiente contenido:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const [deployer] = await ethers.getSigners()
const MyNFT = await ethers.getContractFactory("MyNFT")

// Inicia el despliegue, devolviendo una promesa que se resuelve en un objeto de contrato
const myNFT = await MyNFT.deploy(deployer.address)
await myNFT.waitForDeployment()
console.log("Contract deployed to address:", await myNFT.getAddress())
```

Repasemos qué hace cada una de estas líneas de código.

```js
const { ethers } = await network.create()
```

En Hardhat 3, un script abre una conexión a una red explícitamente. `network.create()` se conecta a la red que elija con la opción `--network` cuando ejecuta el script, y el complemento `hardhat-ethers` añade un objeto `ethers` a esa conexión.

```js
const [deployer] = await ethers.getSigners()
```

`getSigners()` devuelve las cuentas configuradas para la red. En Sepolia, esa es la cuenta cuya clave privada puso en `.env`. Pasamos su dirección al constructor para que usted se convierta en el propietario del contrato.

```js
const MyNFT = await ethers.getContractFactory("MyNFT")
```

Un ContractFactory en Ethers.js es una abstracción utilizada para desplegar nuevos contratos inteligentes, por lo que MyNFT aquí es una fábrica para instancias de nuestro contrato de NFT. Al usar el complemento hardhat-ethers, las instancias de ContractFactory y Contract están conectadas al primer firmante de forma predeterminada.

```js
const myNFT = await MyNFT.deploy(deployer.address)
```

Llamar a deploy() en un ContractFactory iniciará el despliegue y devolverá una Promesa que se resuelve en un Contract. Este es el objeto que tiene un método para cada una de las funciones de nuestro contrato inteligente. Los argumentos que pasa a deploy() van al constructor del contrato, aquí la dirección `initialOwner`.

`waitForDeployment()` espera hasta que la transacción de despliegue se incluya en un bloque, y `getAddress()` devuelve la dirección del nuevo contrato. Consulte la [documentación de contratos de Ethers.js](https://docs.ethers.org/v6/api/contract/) para obtener más detalles.

## Paso 16: Desplegar nuestro contrato {#deploy-contract}

¡Finalmente estamos listos para desplegar nuestro contrato inteligente! Navegue de regreso a la raíz del directorio de su proyecto y, en la línea de comandos, ejecute:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

Luego debería ver algo como:

```text
Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
```

Si vamos a [Etherscan de Sepolia](https://sepolia.etherscan.io/) y buscamos la dirección de nuestro contrato, deberíamos poder ver que se ha desplegado correctamente. Si no puede verlo de inmediato, espere un momento, ya que puede llevar algo de tiempo. La transacción se verá algo así:

![Ver la dirección de su transacción en Etherscan](./etherscan-sepoila-contract-creation.png)

La dirección "From" (De) debe coincidir con la dirección de su cuenta de MetaMask y la dirección "To" (Para) dirá "Contract Creation" (Creación de contrato). Si hacemos clic en la transacción, veremos la dirección de nuestro contrato en el campo "To":

![Ver la dirección de su contrato en Etherscan](./etherscan-sepolia-tx-details.png)

¡Siiii! ¡Acaba de desplegar su contrato inteligente de NFT en la cadena (red de prueba) de Ethereum!

Para comprender qué sucede internamente, puede observar las solicitudes que recibió su aplicación en su [panel de control de Alchemy](https://dashboard.alchemy.com/).

Allí verá un puñado de llamadas JSON-RPC que Hardhat/Ethers hizo internamente por nosotros cuando llamamos a la función .deploy(). Dos importantes a destacar aquí son [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth-sendrawtransaction), que es la solicitud para escribir realmente nuestro contrato inteligente en la cadena Sepolia, y [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash), que es una solicitud para leer información sobre nuestra transacción dado el hash (un patrón típico al enviar transacciones). Para obtener más información sobre el envío de transacciones, consulte la [documentación de transacciones](/developers/docs/transactions/).

Eso es todo por la Parte 1 de este tutorial. En la [Parte 2, interactuaremos realmente con nuestro contrato inteligente acuñando un NFT](/developers/tutorials/how-to-mint-an-nft/), y en la [Parte 3 le mostraremos cómo ver su NFT en su billetera de Ethereum](/developers/tutorials/how-to-view-nft-in-metamask/)!
