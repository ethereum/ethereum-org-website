---
title: Como acuñar un NFT (parte 2/3 de la serie de tutoriales de NFT)
description: Este tutorial describe como acuñar un NFT en la cadena de bloques de Ethereum usando nuestro contrato inteligente y Web3.
author: "Sumi Mudgil"
tags:
  - "NTF"
  - "ERC-721"
  - "alchemy"
  - "solidity"
  - "contratos inteligentes"
skill: beginner
lang: es
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): 69 millones de $ [3Lau](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): 11 millones de $ [Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): 6 millones de $

Todos ellos acuñaron sus NFT usando la poderosa API de Alchemy. En este tutorial, le enseñaremos a hacer lo mismo en < 10 minutos.

«Acuñar un NFT» es el acto de publicar una instancia única de su token ERC-721 en la cadena de bloques. Usando nuestro contrato inteligente de la [parte 1 de esta serie de tutoriales NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/), hagamos flexibles nuestras habilidades Web3 y acuñemos un NFT. Al finalizar este tutorial, será capaz de localizar tantos NFT como se le antojen (¡o su billetera alcance!).

¡Comencemos!

## Paso 1: Instalar Web3 {#install-web3}

Si siguió el primer tutorial sobre cómo crear su contrato inteligente NFT, entonces ya está familiarizado con el uso de Ethers.js. Web3 es similar a Ethers, ya que es una biblioteca usada para crear solicitudes en la cadena de bloques de Ethereum de manera simple. En este tutorial, usaremos [Alchemy web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), que es una biblioteca de Web3 mejorada que ofrece reintentos automáticos y soporte robusto de WebSocket.

En el directorio de inicio de su proyecto ejecute:

```
npm install @alch/alchemy-web3
```

## Paso 2: Crear un archivo `mint-nft.js` {#create-mintnftjs}

Dentro de su directorio de scripts, cree un archivo `mint-nft.js` file y añada las siguientes líneas de código:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Paso 3: Obtener su contrato ABI {#contract-abi}

Nuestro contrato ABI (las siglas en inglés de Aplicación de Interfaz Binaria) es la interfaz para interactuar con nuestro contrato inteligente. Puede profundizar [aquí](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is) acerca de los contratos ABI. Hardhat genera automáticamente una ABI para nosotros y la guarda en el archivo `MyNFT.json`. Para poder usarlo, necesitaremos analizar el contenido añadiendo las siguientes líneas de código a nuestro archivo `mint-nft.js`:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Si quiere ver la ABI puede hacerlo en su propia consola:

```js
console.log(JSON.stringify(contract.abi))
```

Para ejecutar `mint-nft.js` y ver su ABI impresa en la consola, abra la ventana del terminal y ejecute:

```js
node scripts/mint-nft.js
```

## Paso 4: Configurar los metadatos para su NFT usando IPFS {#config-meta}

Si recuerda, como mencionamos en la parte 1 de nuestro tutorial, nuestra función de contrato inteligente `mintNFT` aplica un parámetro tokenURI que debe resolverse en un documento JSON que describe los metadatos del NFT, que es realmente lo que le da vida al NFT, permitiéndole tener propiedades configurables, como nombre, descripción e imagen, entre otros atributos.

> _Interplanetary File System (IPFS) es un protocolo de red descentralizado y de red entre pares para guardar y compartir datos en un sistema de archivos distribuido._

Usaremos Pinata, una conveniente API y kit de herramientas de IPFS, para almacenar nuestros activos y metadatos del NFT y así garantizar que nuestro NFT esté verdaderamente descentralizado. Si no tiene una cuenta en Pinata, puede crearla gratuitamente [aquí](https://app.pinata.cloud) y completar los pasos para verificar su correo electrónico.

Una vez que haya creado una cuenta:

- Navegue hasta la página de «Files» (Archivos) y haga clic en botón azul «Upload» (Subir) en la parte superior izquierda de la página.

- Subir una imagen a Pinata: esta será la imagen del activo para su NFT. Dele a su activo el nombre que desee.

- Una vez subido, verá la info dentro de la tabla en la página ''Files''. También verá una columna CID. Puede copiar el CID haciendo clic en el botón copiar junto a él. Puede ver el activo subido en `https://gateway.pinata.cloud/ipfs/<CID>`. Para ejemplo, puede ver la imagen que usamos en IPFS [aquí](https://gateway.pinata.cloud/ipfs/QmarPqdEuzh5RsWpyH2hZ3qSXBCzC5RyK3ZHnFkAsk7u2f).

He aquí un resumen de los pasos descritos anteriormente para aquellos que tienen memoria visual:

![Como subir su imagen a Pinata](https://gateway.pinata.cloud/ipfs/Qmcdt5VezYzAJDBc4qN5JbANy5paFg9iKDjq8YksRvZhtL)

Ahora, vamos a subir otro documento más a Pinata. Pero antes de hacer eso, necesitamos ¡crearlo!

En su directorio raíz, cree un nuevo archivo llamado `nft-metadata.json` y añada el siguiente código json:

```json
{
  "attributes": [
    {
      "trait_type": "Breed",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Eye color",
      "value": "Mocha"
    }
  ],
  "description": "The world's most adorable and sensitive pup.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

Cambie libremente los datos en el json. Puede quitar o añadir la sección de atributos. Más importante, asegúrese de que el campo de la imagen apunte a la localización de su imagen IPFS - de otra manera, su NFT incluirá una foto (¡muy linda!) de un perrito.

Una vez que haya terminado de editar el archivo JSON, guárdelo y súbalo a Pinata, siguiendo los mismos pasos que utilizamos para subir la imagen.

![Como subir su nft-metadata.json a Pinata](./uploadPinata.gif)

## Paso 5: Crear una instancia de su contrato {#instance-contract}

Seguidamente, para interactuar con nuestro contrato, necesitamos crear una instancia de él en nuestro código. Para hacerlo, necesitaremos nuestra dirección de contrato, que podemos obtener de la implementación o [Etherscan](https://ropsten.etherscan.io/) buscando la dirección que usó para implementar el contrato.

![Ver la dirección de su contrato en Etherscan](./viewContractEtherscan.png)

En el ejemplo anterior, la dirección de nuestro contrato es 0x81c587EB0fE773404c42c1d2666b5f557C470eED.

A continuación, utilizaremos el [método de contrato Web3](https://web3js.readthedocs.io/en/v1.2.0/web3-eth-contract.html?highlight=constructor#web3-eth-contract) para crear nuestro contrato usando ABI y la dirección. En su archivo `mint-nft.js`, añada lo siguiente:

```js
const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Paso 6: Actualizar el archivo `.env` {#update-env}

Ahora, para crear y enviar transacciones en la cadena de Ethereum, usaremos la dirección de su cuenta pública de Ethereum para obtener la cuenta nonce (que explicaremos a continuación).

Añada su clave pública al archivo `.env`, si ha hecho la parte 1 del tutorial, nuestro archivo `.env` debería verse así:

```js
API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Paso 7: Crear su transacción {#create-txn}

Primero, vamos a definir una función llamada `mintNFT(tokenData)` y crear nuestra transacción haciendo lo siguiente:

1. Tome su _PRIVATE_KEY_ y su _PUBLIC_KEY _ del archivo `.env`.

1. Después, necesitaremos averiguar la cuenta nonce. Las especificaciones nonce se usan para rastrear el número de transacciones enviadas desde su dirección - las cuales necesitaremos por cuestiones de seguridad y para prevenir [ataques repetidos](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Para obtener el número de transacciones enviadas desde su dirección, usamos [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).

1. Finalmente estableceremos nuestra transacción con la siguiente información:

- `'from': PUBLIC_KEY`: El origen de nuestra transacción es nuestra dirección pública

- `'to': contractAddress`: El contrato con el que queremos interactuar y enviar la transacción

- `'nonce': nonce`: La cuenta nonce con el número de transacciones enviadas desde nuestra dirección

- `'gas': estimatedGas`: El gas estimado que necesitamos para completar la transacción

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()`: El cálculo que deseamos realizar en esta transacción, que en este caso es acuñar un NFT

Su <code>mint-nft.js</code> debería verse así:

```js
   require('dotenv').config();
   const API_URL = process.env.API_URL;
   const PUBLIC_KEY = process.env.PUBLIC_KEY;
   const PRIVATE_KEY = process.env.PRIVATE_KEY;

   const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
   const web3 = createAlchemyWeb3(API_URL);

   const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
   const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED";
   const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

   async function mintNFT(tokenURI) {
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

   //the transaction
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```

## Paso 8: Firmar la transacción {#sign-txn}

Ahora que ya hemos creado nuestra transacción, necesitamos firmarla para poder enviarla. Aquí es donde usaremos nuestra clave privada.

`web3.eth.sendSignedTransaction` nos dará el hash de transacción, el cual usaremos para asegurarnos de que nuestra transacción ha sido minada y no descartada por la red. Notará que en la sección de firma de la transacción, hemos añadido algunas comprobaciones de errores, así sabremos si nuestra transacción se ha enviado correctamente.

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}
```

## Paso 9: Ejecutar `mintNFT` y después ejecutar el nodo `mint-nft.js` {#call-mintnft-fn}

¿Recuerda el `metadata.json` que cargó en Pinata? Obtenga su código hash de Pinata y pase el siguiente parámetro a la función `mintNFT` `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Así es cómo se puede obtener el código hash:

![Cómo obtener el código hash de los metadatos en Pinata](./metadataPinata.gif)_Cómo obtener el código hash de sus metadatos en Pinata_

> Asegúrese de que el código hash que copió enlaza con su **metadata.json** cargando `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` en una ventana separada. La página debería tener un aspecto similar a la siguiente captura de pantalla:

![Su página debería mostrar los metadatos de json](./metadataJSON.png)_Su página debería mostrar los metadatos json_

Conjuntamente, su código debería tener un aspecto similar a este:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise failed:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Ahora, ejecute `node scripts/mint-nft.js` para implementar su NFT. Después de un par de segundos, debería aparecer una respuesta como esta en su terminal:

    The hash of your transaction is: 0x10e5062309de0cd0be7edc92e8dbab191aa2791111c44274483fa766039e0e00

    Check Alchemy's Mempool to view the status of your transaction!

A continuación, visite su [zona de espera de Alchemy](https://dashboard.alchemyapi.io/mempool) para ver el estado de su transacción (ya sea que esté pendiente, haya sido minada o desechada por la red). Si su transacción ha sido descartada, también es de ayuda comprobar[Ropsten Etherscan](https://ropsten.etherscan.io/) y buscar el hash de su transacción.

![Ver el hash de transacción de su NFT en Etherscan](./viewNFTEtherscan.png)_Ver el hash de transacción de su NFT en Etherscan_

¡Y eso es todo! Ahora ha implementado y acuñado un NFT en la cadena de bloques de Ethereum <Emoji text=":money_mouth_face:" size={1} />

¡Usando el `mint-nft.js` puede acuñar tantos NFT como desee (¡y su cartera le permita!) Solo asegúrese de pasar un nuevo tokenURI que describa los metadatos del NFT (de lo contrario, terminará haciendo un montón de idénticos con ID diferentes).

¡Seguramente le gustaría mostrar su NFT en su cartera, por tanto no se pierda la [parte 3: Cómo ver su NFT en su cartera](/developers/tutorials/how-to-view-nft-in-metamask/)!
