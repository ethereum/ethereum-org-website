---
title: Cómo escribir y desplegar un NFT (Parte 1/3 de la serie de tutoriales sobre NFT)
description: Este tutorial es la Parte 1 de una serie sobre NFT que le guiará paso a paso sobre cómo escribir y desplegar un contrato inteligente de token no fungible (token ERC-721) utilizando Ethereum y el Sistema de Archivos Interplanetario (IPFS).
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "contratos inteligentes"]
skill: beginner
breadcrumb: Escribir y desplegar un NFT
lang: es
published: 2021-04-22
---

Con los NFT atrayendo la atención del público hacia la cadena de bloques, ¡ahora es una excelente oportunidad para entender el entusiasmo por sí mismo publicando su propio contrato de NFT (token ERC-721) en la cadena de bloques de Ethereum!

Alchemy se enorgullece enormemente de impulsar a los nombres más importantes en el espacio de los NFT, incluyendo Makersplace (que recientemente estableció un récord de venta de obras de arte digitales en Christie's por 69 millones de dólares), Dapper Labs (creadores de NBA Top Shot y Crypto Kitties), OpenSea (el mercado de NFT más grande del mundo), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable y más.

En este tutorial, repasaremos la creación y el despliegue de un contrato inteligente ERC-721 en la red de prueba Sepolia utilizando [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) y [Alchemy](https://alchemy.com/signup/eth) (no se preocupe si aún no entiende qué significa todo esto, ¡lo explicaremos!).

En la Parte 2 de este tutorial, veremos cómo podemos usar nuestro contrato inteligente para acuñar un NFT, y en la Parte 3 explicaremos cómo ver su NFT en MetaMask.

Y, por supuesto, si tiene preguntas en cualquier momento, ¡no dude en comunicarse en el [Discord de Alchemy](https://discord.gg/gWuC7zB) o visite la [documentación de la API de NFT de Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)!

## Paso 1: Conectarse a la red Ethereum {#connect-to-ethereum}

Hay muchas formas de hacer solicitudes a la cadena de bloques de Ethereum, pero para facilitar las cosas, usaremos una cuenta gratuita en [Alchemy](https://alchemy.com/signup/eth), una plataforma para desarrolladores de cadenas de bloques y API que nos permite comunicarnos con la cadena de Ethereum sin tener que ejecutar nuestros propios nodos.

En este tutorial, también aprovecharemos las herramientas para desarrolladores de Alchemy para la monitorización y el análisis con el fin de entender qué sucede internamente en el despliegue de nuestro contrato inteligente. Si aún no tiene una cuenta de Alchemy, puede registrarse gratis [aquí](https://alchemy.com/signup/eth).

## Paso 2: Crear su aplicación (y clave API) {#make-api-key}

Una vez que haya creado una cuenta de Alchemy, puede generar una clave API creando una aplicación. Esto nos permitirá hacer solicitudes a la red de prueba Sepolia. Consulte [esta guía](https://docs.alchemyapi.io/guides/choosing-a-network) si tiene curiosidad por aprender más sobre las redes de prueba.

1. Navegue a la página "Create App" (Crear aplicación) en su panel de control de Alchemy pasando el cursor sobre "Apps" (Aplicaciones) en la barra de navegación y haciendo clic en "Create App".

![Create your app](./create-your-app.png)

2. Póngale un nombre a su aplicación (nosotros elegimos "My First NFT!"), ofrezca una breve descripción, seleccione "Ethereum" para la cadena (Chain) y elija "Sepolia" para su red (Network). Desde La Fusión, las otras redes de prueba han quedado obsoletas.

![Configure and publish your app](./alchemy-explorer-sepolia.png)

3. Haga clic en "Create app" (Crear aplicación) y ¡eso es todo! Su aplicación debería aparecer en la tabla de abajo.

## Paso 3: Crear una cuenta (dirección) de Ethereum {#create-eth-address}

Necesitamos una cuenta de Ethereum para enviar y recibir transacciones. Para este tutorial, usaremos MetaMask, una billetera virtual en el navegador que se usa para administrar la dirección de su cuenta de Ethereum. Si desea entender más sobre cómo funcionan las transacciones en Ethereum, consulte [esta página](/developers/docs/transactions/) de la Fundación Ethereum.

Puede descargar y crear una cuenta de MetaMask de forma gratuita [aquí](https://metamask.io/download). Cuando esté creando una cuenta, o si ya tiene una, asegúrese de cambiar a la "Red de prueba Sepolia" (Sepolia Test Network) en la parte superior derecha (para que no estemos lidiando con dinero real).

![Set Sepolia as your network](./metamask-goerli.png)

## Paso 4: Añadir ether desde un faucet {#step-4-add-ether-from-a-faucet}

Para desplegar nuestro contrato inteligente en la red de prueba, necesitaremos algo de ETH falso. Para obtener ETH, puede ir al [faucet de Sepolia](https://sepoliafaucet.com/) alojado por Alchemy, iniciar sesión e ingresar la dirección de su cuenta, y hacer clic en "Send Me ETH" (Envíame ETH). ¡Debería ver ETH en su cuenta de MetaMask poco después!

## Paso 5: Comprobar su saldo {#check-balance}

Para verificar que nuestro saldo esté ahí, hagamos una solicitud [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) utilizando la [herramienta composer de Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Esto devolverá la cantidad de ETH en nuestra billetera. Después de ingresar la dirección de su cuenta de MetaMask y hacer clic en "Send Request" (Enviar solicitud), debería ver una respuesta como esta:

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **Nota** Este resultado está en Wei, no en ETH. Wei se utiliza como la denominación más pequeña de ether. La conversión de Wei a ETH es 1 eth = 10<sup>18</sup> Wei. Así que si convertimos 0xde0b6b3a7640000 a decimal obtenemos 1\*10<sup>18</sup> Wei, lo que equivale a 1 ETH.

¡Uf! Todo nuestro dinero falso está ahí.

## Paso 6: Inicializar nuestro proyecto {#initialize-project}

Primero, necesitaremos crear una carpeta para nuestro proyecto. Navegue a su línea de comandos y escriba:

    mkdir my-nft
    cd my-nft

Ahora que estamos dentro de la carpeta de nuestro proyecto, usaremos npm init para inicializar el proyecto. Si aún no tiene npm instalado, siga [estas instrucciones](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (también necesitaremos [Node.js](https://nodejs.org/en/download/), ¡así que descárguelo también!).

    npm init

Realmente no importa cómo responda a las preguntas de instalación; aquí le mostramos cómo lo hicimos como referencia:

```json
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

Apruebe el archivo package.json, ¡y estamos listos para continuar!

## Paso 7: Instalar [Hardhat](https://hardhat.org/getting-started/#overview) {#install-hardhat}

Hardhat es un entorno de desarrollo para compilar, desplegar, probar y depurar su software de Ethereum. Ayuda a los desarrolladores a construir contratos inteligentes y aplicaciones descentralizadas (dapps) localmente antes de desplegarlos en la cadena en vivo.

Dentro de nuestro proyecto my-nft ejecute:

    npm install --save-dev hardhat

Consulte esta página para obtener más detalles sobre las [instrucciones de instalación](https://hardhat.org/getting-started/#overview).

## Paso 8: Crear un proyecto de Hardhat {#create-hardhat-project}

Dentro de la carpeta de nuestro proyecto ejecute:

    npx hardhat

A continuación, debería ver un mensaje de bienvenida y la opción de seleccionar lo que desea hacer. Seleccione "create an empty hardhat.config.js" (crear un hardhat.config.js vacío):

    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Welcome to Hardhat v2.0.11 👷‍
    ? What do you want to do? …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit

Esto generará un archivo hardhat.config.js para nosotros, que es donde especificaremos toda la configuración de nuestro proyecto (en el paso 13).

## Paso 9: Añadir carpetas del proyecto {#add-project-folders}

Para mantener nuestro proyecto organizado, crearemos dos carpetas nuevas. Navegue al directorio raíz de su proyecto en su línea de comandos y escriba:

    mkdir contracts
    mkdir scripts

- contracts/ es donde guardaremos el código de nuestro contrato inteligente de NFT

- scripts/ es donde guardaremos los scripts para desplegar e interactuar con nuestro contrato inteligente

## Paso 10: Escribir nuestro contrato {#write-contract}

Ahora que nuestro entorno está configurado, pasemos a cosas más emocionantes: _¡escribir el código de nuestro contrato inteligente!_

Abra el proyecto my-nft en su editor favorito (a nosotros nos gusta [VSCode](https://code.visualstudio.com/)). Los contratos inteligentes se escriben en un lenguaje llamado Solidity, que es el que usaremos para escribir nuestro contrato inteligente MyNFT.sol.‌

1. Navegue a la carpeta `contracts` y cree un nuevo archivo llamado MyNFT.sol

2. A continuación se muestra el código de nuestro contrato inteligente de NFT, que basamos en la implementación ERC-721 de la biblioteca [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721). Copie y pegue el siguiente contenido en su archivo MyNFT.sol.

   ```solidity
   //Contrato basado en [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/utils/Counters.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       using Counters for Counters.Counter;
       Counters.Counter private _tokenIds;

       constructor() ERC721("MyNFT", "NFT") {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           _tokenIds.increment();

           uint256 newItemId = _tokenIds.current();
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. Debido a que estamos heredando clases de la biblioteca de contratos de OpenZeppelin, en su línea de comandos ejecute `npm install @openzeppelin/contracts^4.0.0` para instalar la biblioteca en nuestra carpeta.

Entonces, ¿qué _hace_ exactamente este código? Vamos a desglosarlo línea por línea.

En la parte superior de nuestro contrato inteligente, importamos tres clases de contratos inteligentes de [OpenZeppelin](https://openzeppelin.com/):

- @openzeppelin/contracts/token/ERC721/ERC721.sol contiene la implementación del estándar ERC-721, que heredará nuestro contrato inteligente de NFT. (Para ser un NFT válido, su contrato inteligente debe implementar todos los métodos del estándar ERC-721). Para obtener más información sobre las funciones ERC-721 heredadas, consulte la definición de la interfaz [aquí](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/utils/Counters.sol proporciona contadores que solo se pueden incrementar o decrementar en uno. Nuestro contrato inteligente utiliza un contador para realizar un seguimiento del número total de NFT acuñados y establecer el ID único en nuestro nuevo NFT. (A cada NFT acuñado mediante un contrato inteligente se le debe asignar un ID único; aquí nuestro ID único simplemente está determinado por el número total de NFT existentes. Por ejemplo, el primer NFT que acuñamos con nuestro contrato inteligente tiene un ID de "1", nuestro segundo NFT tiene un ID de "2", etc.).

- @openzeppelin/contracts/access/Ownable.sol configura el [control de acceso](https://docs.openzeppelin.com/contracts/3.x/access-control) en nuestro contrato inteligente, por lo que solo el propietario del contrato inteligente (usted) puede acuñar NFT. (Tenga en cuenta que incluir el control de acceso es totalmente una preferencia. Si desea que cualquier persona pueda acuñar un NFT utilizando su contrato inteligente, elimine la palabra Ownable en la línea 10 y onlyOwner en la línea 17).

Después de nuestras declaraciones de importación, tenemos nuestro contrato inteligente de NFT personalizado, que es sorprendentemente corto: ¡solo contiene un contador, un constructor y una sola función! Esto es gracias a nuestros contratos heredados de OpenZeppelin, que implementan la mayoría de los métodos que necesitamos para crear un NFT, como `ownerOf` que devuelve el propietario del NFT, y `transferFrom`, que transfiere la propiedad del NFT de una cuenta a otra.

En nuestro constructor ERC-721, notará que pasamos 2 cadenas, "MyNFT" y "NFT". La primera variable es el nombre del contrato inteligente y la segunda es su símbolo. ¡Puede nombrar cada una de estas variables como desee!

Finalmente, ¡tenemos nuestra función `mintNFT(address recipient, string memory tokenURI)` que nos permite acuñar un NFT! Notará que esta función toma dos variables:

- `address recipient` especifica la dirección que recibirá su NFT recién acuñado

- `string memory tokenURI` es una cadena que debería resolverse en un documento JSON que describe los metadatos del NFT. Los metadatos de un NFT son realmente lo que le da vida, permitiéndole tener propiedades configurables, como un nombre, descripción, imagen y otros atributos. En la parte 2 de este tutorial, describiremos cómo configurar estos metadatos.

`mintNFT` llama a algunos métodos de la biblioteca ERC-721 heredada y, en última instancia, devuelve un número que representa el ID del NFT recién acuñado.

## Paso 11: Conectar MetaMask y Alchemy a su proyecto {#connect-metamask-and-alchemy}

Ahora que hemos creado una billetera de MetaMask, una cuenta de Alchemy y hemos escrito nuestro contrato inteligente, es hora de conectar los tres.

Cada transacción enviada desde su billetera virtual requiere una firma utilizando su clave privada única. Para proporcionar a nuestro programa este permiso, podemos almacenar de forma segura nuestra clave privada (y la clave API de Alchemy) en un archivo de entorno.

Para obtener más información sobre el envío de transacciones, consulte [este tutorial](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) sobre el envío de transacciones utilizando Web3.

Primero, instale el paquete dotenv en el directorio de su proyecto:

    npm install dotenv --save

Luego, cree un archivo `.env` en el directorio raíz de nuestro proyecto y añada su clave privada de MetaMask y la URL HTTP de la API de Alchemy en él.

- Siga [estas instrucciones](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) para exportar su clave privada desde MetaMask

- Vea a continuación para obtener la URL HTTP de la API de Alchemy y cópiela en su portapapeles

![Copy your Alchemy API URL](./copy-alchemy-api-url.gif)

Su `.env` ahora debería verse así:

    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"

Para conectar realmente estos a nuestro código, haremos referencia a estas variables en nuestro archivo hardhat.config.js en el paso 13.

<EnvWarningBanner />

## Paso 12: Instalar Ethers.js {#install-ethers}

Ethers.js es una biblioteca que facilita la interacción y la realización de solicitudes a Ethereum al envolver los [métodos estándar de JSON-RPC](/developers/docs/apis/json-rpc/) con métodos más fáciles de usar.

Hardhat hace que sea muy fácil integrar [complementos](https://hardhat.org/plugins/) para herramientas adicionales y funcionalidad ampliada. Aprovecharemos el [complemento de Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) para el despliegue de contratos ([Ethers.js](https://github.com/ethers-io/ethers.js/) tiene algunos métodos de despliegue de contratos muy limpios).

En el directorio de su proyecto escriba:

    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0

También requeriremos ethers en nuestro hardhat.config.js en el siguiente paso.

## Paso 13: Actualizar hardhat.config.js {#update-hardhat-config}

Hemos añadido varias dependencias y complementos hasta ahora, ahora necesitamos actualizar hardhat.config.js para que nuestro proyecto sepa de todos ellos.

Actualice su hardhat.config.js para que se vea así:

```js
    /**
    * @type import('hardhat/config').HardhatUserConfig
    */
    require('dotenv').config();
    require("@nomiclabs/hardhat-ethers");
    const { API_URL, PRIVATE_KEY } = process.env;
    module.exports = {
       solidity: "0.8.1",
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

## Paso 14: Compilar nuestro contrato {#compile-contract}

Para asegurarnos de que todo funciona hasta ahora, compilemos nuestro contrato. La tarea de compilación es una de las tareas integradas de Hardhat.

Desde la línea de comandos ejecute:

    npx hardhat compile

Es posible que reciba una advertencia sobre el identificador de licencia SPDX no proporcionado en el archivo fuente, pero no hay de qué preocuparse; ¡con suerte, todo lo demás se ve bien! Si no es así, siempre puede enviar un mensaje en el [Discord de Alchemy](https://discord.gg/u72VCg3).

## Paso 15: Escribir nuestro script de despliegue {#write-deploy}

Ahora que nuestro contrato está escrito y nuestro archivo de configuración está listo, es hora de escribir nuestro script de despliegue de contrato.

Navegue a la carpeta `scripts/` y cree un nuevo archivo llamado `deploy.js`, añadiendo el siguiente contenido en él:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Inicia el despliegue, devolviendo una promesa que se resuelve en un objeto de contrato
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Contract deployed to address:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat hace un trabajo increíble al explicar qué hace cada una de estas líneas de código en su [tutorial de contratos](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), hemos adoptado sus explicaciones aquí.

    const MyNFT = await ethers.getContractFactory("MyNFT");

Un ContractFactory en Ethers.js es una abstracción utilizada para desplegar nuevos contratos inteligentes, por lo que MyNFT aquí es una fábrica para instancias de nuestro contrato de NFT. Al usar el complemento hardhat-ethers, las instancias de ContractFactory y Contract están conectadas al primer firmante de forma predeterminada.

    const myNFT = await MyNFT.deploy();

Llamar a deploy() en un ContractFactory iniciará el despliegue y devolverá una Promesa que se resuelve en un Contract. Este es el objeto que tiene un método para cada una de las funciones de nuestro contrato inteligente.

## Paso 16: Desplegar nuestro contrato {#deploy-contract}

¡Finalmente estamos listos para desplegar nuestro contrato inteligente! Navegue de regreso a la raíz del directorio de su proyecto y en la línea de comandos ejecute:

    npx hardhat --network sepolia run scripts/deploy.js

A continuación, debería ver algo como:

    Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650

Si vamos a [Etherscan de Sepolia](https://sepolia.etherscan.io/) y buscamos la dirección de nuestro contrato, deberíamos poder ver que se ha desplegado con éxito. Si no puede verlo de inmediato, espere un momento, ya que puede llevar algo de tiempo. La transacción se verá algo así:

![View your transaction address on Etherscan](./etherscan-sepoila-contract-creation.png)

La dirección "From" (De) debe coincidir con la dirección de su cuenta de MetaMask y la dirección "To" (Para) dirá "Contract Creation" (Creación de contrato). Si hacemos clic en la transacción, veremos la dirección de nuestro contrato en el campo "To":

![View your contract address on Etherscan](./etherscan-sepolia-tx-details.png)

¡Siiii! ¡Acaba de desplegar su contrato inteligente de NFT en la cadena (red de prueba) de Ethereum!

Para entender qué sucede internamente, naveguemos a la pestaña Explorer (Explorador) en nuestro [panel de control de Alchemy](https://dashboard.alchemyapi.io/explorer). Si tiene varias aplicaciones de Alchemy, asegúrese de filtrar por aplicación y seleccionar "MyNFT".

![View calls made “under the hood” with Alchemy’s Explorer Dashboard](./alchemy-explorer-goerli.png)

Aquí verá un puñado de llamadas JSON-RPC que Hardhat/Ethers hizo internamente por nosotros cuando llamamos a la función .deploy(). Dos importantes a destacar aquí son [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction), que es la solicitud para escribir realmente nuestro contrato inteligente en la cadena Sepolia, y [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash), que es una solicitud para leer información sobre nuestra transacción dado el hash (un patrón típico al enviar transacciones). Para obtener más información sobre el envío de transacciones, consulte este tutorial sobre el [envío de transacciones utilizando Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

Eso es todo por la Parte 1 de este tutorial. En la [Parte 2, interactuaremos realmente con nuestro contrato inteligente acuñando un NFT](/developers/tutorials/how-to-mint-an-nft/), y en la [Parte 3 le mostraremos cómo ver su NFT en su billetera de Ethereum](/developers/tutorials/how-to-view-nft-in-metamask/).