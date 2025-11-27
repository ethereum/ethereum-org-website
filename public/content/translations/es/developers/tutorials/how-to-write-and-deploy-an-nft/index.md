---
title: Cómo escribir e implementar un NFT (Parte 1/3 de la serie de tutoriales sobre NFT)
description: Este tutorial es la parte 1 de una serie sobre los NFT que le guiará paso a paso sobre cómo escribir e implementar un contrato inteligente de token no fungible (token ERC-721) utilizando Ethereum y el Sistema de Archivos Interplanetario (IPFS).
author: "Sumi Mudgil"
tags: [ "ERC-721", "Alquimia", "Solidez", "smart contracts" ]
skill: principiante
lang: es
published: 2021-04-22
---

Con los NFT atrayendo la atención del público hacia la tecnología blockchain, ahora es una excelente oportunidad para que usted mismo entienda el revuelo publicando su propio contrato de NFT (Token ERC-721) ¡en la blockchain de Ethereum!

Alchemy se enorgullece de potenciar a los nombres más importantes del espacio NFT, incluyendo Makersplace (que recientemente estableció un récord de venta de obras de arte digital en Christie's por 69 millones de dólares), Dapper Labs (creadores de NBA Top Shot y CryptoKitties), OpenSea (el mayor mercado de NFT del mundo), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable y más.

En este tutorial, le explicaremos cómo crear e implementar un contrato inteligente ERC-721 en la red de prueba Sepolia utilizando [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) y [Alchemy](https://alchemy.com/signup/eth) (no se preocupe si aún no entiende lo que significa todo esto; ¡lo explicaremos!).

En la parte 2 de este tutorial, veremos cómo podemos usar nuestro contrato inteligente para acuñar un NFT, y en la parte 3 explicaremos cómo ver su NFT en MetaMask.

Y, por supuesto, si tiene preguntas en cualquier momento, no dude en preguntar en el [Discord de Alchemy](https://discord.gg/gWuC7zB) o visitar [los documentos de la API de NFT de Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)!

## Paso 1: Conectarse a la red de Ethereum {#connect-to-ethereum}

Hay varias maneras de hacer solicitudes a la blockchain de Ethereum, pero para facilitar las cosas, usaremos una cuenta gratuita en [Alchemy](https://alchemy.com/signup/eth), una plataforma de desarrollo de blockchain y una API que nos permite comunicarnos con la cadena de Ethereum sin tener que ejecutar nuestros propios nodos.

En este tutorial, también aprovecharemos las herramientas de desarrollo de Alchemy para el monitoreo y el análisis para entender lo que sucede internamente en la implementación de nuestro contrato inteligente. Si aún no tiene una cuenta de Alchemy, μπορείτε να εγγραφείτε δωρεάν [aquí](https://alchemy.com/signup/eth).

## Paso 2: Cree su aplicación (y clave API) {#make-api-key}

Una vez que haya creado una cuenta de Alchemy, puede generar una clave API creando una aplicación. Esto nos permitirá hacer solicitudes a la red de prueba Sepolia. Consulte [esta guía](https://docs.alchemyapi.io/guides/choosing-a-network) si tiene curiosidad por saber más sobre las redes de prueba.

1. Vaya a la página «Crear aplicación» en su panel de Alchemy pasando el ratón sobre «Apps» en la barra de navegación y haciendo clic en «Crear aplicación»

![Cree su aplicación](./create-your-app.png)

2. Dé un nombre a su aplicación (elegimos «¡Mi primer NFT!»), ofrezca una breve descripción, seleccione «Ethereum» para la cadena y elija «Sepolia» para su red. Desde la Fusión, las otras redes de prueba han sido desaprobadas.

![Configure y publique su aplicación](./alchemy-explorer-sepolia.png)

3. Haga clic en «Crear aplicación» ¡y ya está! Su aplicación debería aparecer en la tabla de abajo.

## Paso 3: Crear una cuenta de Ethereum (dirección) {#create-eth-address}

Necesitamos una cuenta de Ethereum para enviar y recibir transacciones. Para este tutorial, usaremos MetaMask, una billetera virtual en el navegador que se utiliza para administrar la dirección de su cuenta de Ethereum. Si quiere entender más sobre cómo funcionan las transacciones en Ethereum, consulte [esta página](/developers/docs/transactions/) de la Fundación Ethereum.

Puede descargar y crear una cuenta de MetaMask gratis [aquí](https://metamask.io/download). Cuando cree una cuenta, o si ya tiene una, asegúrese de cambiar a la «Red de prueba Sepolia» en la parte superior derecha (para que no trabajemos con dinero real).

![Establezca Sepolia como su red](./metamask-goerli.png)

## Paso 4: Añadir ether desde un Faucet {#step-4-add-ether-from-a-faucet}

Para implementar nuestro contrato inteligente en la red de prueba, necesitaremos algo de ETH falso. Para obtener ETH, puede ir al [Faucet de Sepolia](https://sepoliafaucet.com/) alojado por Alchemy, inicie sesión e introduzca la dirección de su cuenta, haga clic en «Envíenme ETH». ¡Poco después debería ver ETH en su cuenta de MetaMask!

## Paso 5: Comprobar su saldo {#check-balance}

Para verificar que nuestro saldo está ahí, hagamos una solicitud [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) utilizando la [herramienta de composición de Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Esto devolverá la cantidad de ETH en nuestra billetera. Después de introducir la dirección de su cuenta de MetaMask y hacer clic en «Enviar solicitud», debería ver una respuesta como esta:

    ```
    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`
    ```

> **Nota**: Este resultado está en wei, no en ETH. El wei se utiliza como la denominación más pequeña de ether. La conversión de wei a ETH es 1 eth = 10<sup>18</sup> wei. Así que si convertimos 0xde0b6b3a7640000 a decimal obtenemos 1\*10<sup>18</sup> wei, que equivale a 1 ETH.

¡Uf! Nuestro dinero falso está todo ahí.

## Paso 6: Inicializar nuestro proyecto {#initialize-project}

Primero, tendremos que crear una carpeta para nuestro proyecto. Vaya a su línea de comandos y escriba:

    ```
    mkdir my-nft
    cd my-nft
    ```

Ahora que estamos dentro de la carpeta de nuestro proyecto, usaremos npm init para inicializar el proyecto. Si aún no tiene npm instalado, siga [estas instrucciones](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (también necesitaremos [Node.js](https://nodejs.org/en/download/), ¡así que descárguelo también!).

    ```
    npm init
    ```

No importa realmente cómo responda a las preguntas de instalación; así es como lo hicimos nosotros como referencia:

```json
    nombre del paquete: (my-nft)
    versión: (1.0.0)
    descripción: ¡Mi primer NFT!
    punto de entrada: (index.js)
    comando de prueba:
    repositorio de git:
    palabras clave:
    autor:
    licencia: (ISC)
    A punto de escribir en /Users/thesuperb1/Desktop/my-nft/package.json:

    {
      "name": "my-nft",
      "version": "1.0.0",
      "description": "¡Mi primer NFT!",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
```

Apruebe el package.json, ¡y estamos listos para empezar!

## Paso 7: Instalar [Hardhat](https://hardhat.org/getting-started/#overview) {#install-hardhat}

Hardhat es un entorno de desarrollo para compilar, implementar, probar y depurar su software de Ethereum. Ayuda a los desarrolladores a construir contratos inteligentes y dapps localmente antes de implementarlos en la cadena activa.

Dentro de nuestro proyecto my-nft ejecute:

    ```
    npm install --save-dev hardhat
    ```

Consulte esta página para obtener más detalles sobre las [instrucciones de instalación](https://hardhat.org/getting-started/#overview).

## Paso 8: Crear un proyecto Hardhat {#create-hardhat-project}

Dentro de la carpeta de nuestro proyecto, ejecute:

    ```
    npx hardhat
    ```

Debería ver un mensaje de bienvenida y la opción de seleccionar lo que quiere hacer. Seleccione «Create an empty hardhat.config.js»:

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
    ? ¿Qué desea hacer? …
    Crear un proyecto de muestra
    ❯ Crear un hardhat.config.js vacío
    Salir
    ```

Esto generará un archivo hardhat.config.js para nosotros, donde especificaremos toda la configuración de nuestro proyecto (en el paso 13).

## Paso 9: Añadir carpetas del proyecto {#add-project-folders}

Para mantener nuestro proyecto organizado, crearemos dos nuevas carpetas. Vaya al directorio raíz de su proyecto en su línea de comandos y escriba:

    ```
    mkdir contracts
    mkdir scripts
    ```

- contracts/ es donde guardaremos el código de nuestro contrato inteligente de NFT

- scripts/ es donde guardaremos los scripts para implementar e interactuar con nuestro contrato inteligente

## Paso 10: Escribir nuestro contrato {#write-contract}

Ahora que nuestro entorno está configurado, pasemos a cosas más emocionantes: _¡escribir el código de nuestro contrato inteligente!_

Abra el proyecto my-nft en su editor favorito (nos gusta [VSCode](https://code.visualstudio.com/)). Los contratos inteligentes se escriben en un lenguaje llamado Solidity, que es lo que usaremos para escribir nuestro contrato inteligente MyNFT.sol.‌

1. Vaya a la carpeta `contracts` y cree un nuevo archivo llamado MyNFT.sol

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

3. Como estamos heredando clases de la biblioteca de contratos de OpenZeppelin, en su línea de comandos, ejecute `npm install @openzeppelin/contracts^4.0.0` para instalar la biblioteca en nuestra carpeta.

Entonces, ¿qué es lo que _hace_ exactamente este código? Analicémoslo, línea por línea.

En la parte superior de nuestro contrato inteligente, importamos tres clases de contrato inteligente de [OpenZeppelin](https://openzeppelin.com/):

- @openzeppelin/contracts/token/ERC721/ERC721.sol contiene la implementación del estándar ERC-721, que nuestro contrato inteligente de NFT heredará. (Para que sea un NFT válido, su contrato inteligente debe implementar todos los métodos del estándar ERC-721). Para obtener más información sobre las funciones ERC-721 heredadas, consulte la definición de la interfaz [aquí](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/utils/Counters.sol proporciona contadores que solo se pueden incrementar o decrementar de uno en uno. Nuestro contrato inteligente utiliza un contador para hacer un seguimiento del número total de NFT acuñados y establecer el ID único en nuestro nuevo NFT. (Cada NFT acuñado utilizando un contrato inteligente debe tener asignado un ID único; aquí nuestro ID único se determina simplemente por el número total de NFT existentes. Por ejemplo, el primer NFT que acuñamos con nuestro contrato inteligente tiene un ID de «1», nuestro segundo NFT tiene un ID de «2», etc.).

- @openzeppelin/contracts/access/Ownable.sol establece el [control de acceso](https://docs.openzeppelin.com/contracts/3.x/access-control) en nuestro contrato inteligente, de modo que solo el propietario del contrato inteligente (usted) puede acuñar NFT. (Nota: incluir el control de acceso es totalmente una preferencia. Si desea que cualquiera pueda acuñar un NFT usando su contrato inteligente, elimine la palabra Ownable en la línea 10 y onlyOwner en la línea 17).

Después de nuestras declaraciones de importación, tenemos nuestro contrato inteligente de NFT personalizado, que es sorprendentemente corto: ¡solo contiene un contador, un constructor y una única función! Esto es gracias a nuestros contratos heredados de OpenZeppelin, que implementan la mayoría de los métodos que necesitamos para crear un NFT, como `ownerOf`, que devuelve el propietario del NFT, y `transferFrom`, que transfiere la propiedad del NFT de una cuenta a otra.

En nuestro constructor ERC-721, notará que pasamos 2 cadenas de texto, «MyNFT» y «NFT». La primera variable es el nombre del contrato inteligente, y la segunda es su símbolo. ¡Puede nombrar cada una de estas variables como desee!

Finalmente, tenemos nuestra función `mintNFT(address recipient, string memory tokenURI)` ¡que nos permite acuñar un NFT! Notará que esta función toma dos variables:

- `address recipient` especifica la dirección que recibirá su NFT recién acuñado

- `string memory tokenURI` es una cadena que debe resolverse en un documento JSON que describe los metadatados del NFT. Los metadatos de un NFT es lo que realmente le da vida, permitiéndole tener propiedades configurables, como un nombre, descripción, imagen y otros atributos. En la parte 2 de este tutorial, describiremos cómo configurar estos metadatos.

`mintNFT` llama a algunos métodos de la biblioteca ERC-721 heredada, y, en última instancia, devuelve un número que representa el ID del NFT recién acuñado.

## Paso 11: Conectar MetaMask y Alchemy a su proyecto {#connect-metamask-and-alchemy}

Ahora que hemos creado una billetera MetaMask, una cuenta de Alchemy y hemos escrito nuestro contrato inteligente, es hora de conectar los tres.

Cada transacción enviada desde su billetera virtual requiere una firma utilizando su clave privada única. Para proporcionar a nuestro programa este permiso, podemos almacenar de forma segura nuestra clave privada (y la clave API de Alchemy) en un archivo de entorno.

Para obtener más información sobre el envío de transacciones, consulte [este tutorial](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) sobre el envío de transacciones utilizando web3.

Primero, instale el paquete dotenv en el directorio de su proyecto:

    ```
    npm install dotenv --save
    ```

Luego, cree un archivo `.env` en el directorio raíz de nuestro proyecto, y añada su clave privada de MetaMask y la URL de la API HTTP de Alchemy.

- Siga [estas instrucciones](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) para exportar su clave privada de MetaMask

- Vea a continuación para obtener la URL de la API HTTP de Alchemy y cópiela en su portapapeles

![Copie su URL de la API de Alchemy](./copy-alchemy-api-url.gif)

Su `.env` debería tener este aspecto:

    ```
    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"
    ```

Para conectar esto realmente a nuestro código, haremos referencia a estas variables en nuestro archivo hardhat.config.js en el paso 13.

<EnvWarningBanner />

## Paso 12: Instalar Ethers.js {#install-ethers}

Ethers.js es una biblioteca que facilita la interacción y la realización de solicitudes a Ethereum envolviendo los [métodos JSON-RPC estándar](/developers/docs/apis/json-rpc/) con métodos más fáciles de usar.

Hardhat hace que sea muy fácil integrar [Plugins](https://hardhat.org/plugins/) para herramientas adicionales y funcionalidad extendida. Aprovecharemos el [plugin Ethers](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html) para la implementación de contratos ([Ethers.js](https://github.com/ethers-io/ethers.js/) tiene algunos métodos de implementación de contratos superlimpios).

En el directorio de su proyecto, escriba:

    ```
    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0
    ```

También necesitaremos ethers en nuestro hardhat.config.js en el siguiente paso.

## Paso 13: Actualizar hardhat.config.js {#update-hardhat-config}

Hemos añadido varias dependencias y plugins hasta ahora, ahora necesitamos actualizar hardhat.config.js para que nuestro proyecto los conozca todos.

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

Para asegurarnos de que todo funciona hasta ahora, compilemos nuestro contrato. La tarea de compilación es una de las tareas incorporadas de Hardhat.

Desde la línea de comandos, ejecute:

    ```
    npx hardhat compile
    ```

Puede que reciba una advertencia sobre el identificador de licencia SPDX no proporcionado en el archivo de origen, pero no hay necesidad de preocuparse por eso; ¡esperemos que todo lo demás se vea bien! Si no es así, siempre puede enviar un mensaje en el [discord de Alchemy](https://discord.gg/u72VCg3).

## Paso 15: Escribir nuestro script de implementación {#write-deploy}

Ahora que nuestro contrato está escrito y nuestro archivo de configuración está listo, es hora de escribir nuestro script de implementación de contrato.

Vaya a la carpeta `scripts/` y cree un nuevo archivo llamado `deploy.js`, añadiendo el siguiente contenido:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Iniciar la implementación, devolviendo una promesa que se resuelve en un objeto de contrato
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

Hardhat hace un trabajo increíble explicando lo que hace cada una de estas líneas de código en su [tutorial de Contratos](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), hemos adoptado sus explicaciones aquí.

    ```
    const MyNFT = await ethers.getContractFactory("MyNFT");
    ```

Una ContractFactory en ethers.js es una abstracción utilizada para implementar nuevos contratos inteligentes, así que MyNFT aquí es una fábrica para instancias de nuestro contrato de NFT. Al usar el complemento hardhat-ethers, las instancias ContractFactory y Contract se conectan al primer firmante por defecto.

    ```
    const myNFT = await MyNFT.deploy();
    ```

Llamar a deploy() en una ContractFactory iniciará la implementación, y devolverá una Promesa que se resuelve en un Contrato. Este es el objeto que tiene un método para cada una de las funciones de nuestro contrato inteligente.

## Paso 16: Implementar nuestro contrato {#deploy-contract}

¡Finalmente estamos listos para implementar nuestro contrato inteligente! Vuelva al directorio raíz de su proyecto y en la línea de comandos ejecute:

    ```
    npx hardhat --network sepolia run scripts/deploy.js
    ```

Debería ver algo como:

    ```
    Contrato implementado en la dirección: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
    ```

Si vamos al [Etherscan de Sepolia](https://sepolia.etherscan.io/) y buscamos la dirección de nuestro contrato, deberíamos poder ver que se ha implementado con éxito. Si no puede verlo inmediatamente, espere un poco, ya que puede tardar un tiempo. La transacción se verá más o menos así:

![Ver la dirección de su transacción en Etherscan](./etherscan-sepoila-contract-creation.png)

La dirección Debería coincidir con la dirección de su cuenta de MetaMask y la dirección Para dirá «Creación de contrato». Si hacemos clic en la transacción, veremos la dirección de nuestro contrato en el campo Para:

![Ver la dirección de su contrato en Etherscan](./etherscan-sepolia-tx-details.png)

¡Síííí! ¡Acaba de implementar su contrato inteligente de NFT en la cadena de Ethereum (red de prueba)!

Para entender lo que sucede internamente, vayamos a la pestaña Explorador en nuestro [panel de Alchemy](https://dashboard.alchemyapi.io/explorer). Si tiene varias aplicaciones de Alchemy, asegúrese de filtrar por aplicación y seleccionar «MyNFT».

![Ver llamadas hechas «internamente» con el panel del Explorador de Alchemy](./alchemy-explorer-goerli.png)

Aquí verá un puñado de llamadas JSON-RPC que Hardhat/Ethers hicieron internamente por nosotros cuando llamamos a la función .deploy(). Dos importantes a destacar aquí son [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction), que es la solicitud para escribir realmente nuestro contrato inteligente en la cadena Sepolia, y [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash), que es una solicitud para leer información sobre nuestra transacción dado el hash (un patrón típico al enviar transacciones). Para obtener más información sobre el envío de transacciones, consulte este tutorial sobre [el envío de transacciones utilizando Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

Eso es todo para la Parte 1 de este tutorial. En la [Parte 2, interactuaremos realmente con nuestro contrato inteligente acuñando un NFT](/developers/tutorials/how-to-mint-an-nft/), y en la [Parte 3 le mostraremos cómo ver su NFT en su billetera de Ethereum](/developers/tutorials/how-to-view-nft-in-metamask/)!
