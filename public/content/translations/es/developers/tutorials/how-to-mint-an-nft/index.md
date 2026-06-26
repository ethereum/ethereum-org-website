---
title: "Cómo acuñar un NFT (Parte 2/3 de la serie de tutoriales sobre NFT)"
description: "Este tutorial describe cómo acuñar un NFT en la cadena de bloques de Ethereum utilizando nuestro contrato inteligente y Web3."
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "contratos inteligentes"]
skill: beginner
breadcrumb: "Acuñar un NFT"
lang: es
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): 69 millones de dólares
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): 11 millones de dólares
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): 6 millones de dólares

Todos ellos acuñaron sus NFT utilizando la potente API de Alchemy. En este tutorial, te enseñaremos cómo hacer lo mismo en \<10 minutos.

"Acuñar un NFT" es el acto de publicar una instancia única de tu token ERC-721 en la cadena de bloques. Utilizando nuestro contrato inteligente de la [Parte 1 de esta serie de tutoriales sobre NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/), vamos a poner a prueba nuestras habilidades en Web3 y acuñar un NFT. Al final de este tutorial, ¡podrás acuñar tantos NFT como tu corazón (y tu billetera) deseen!

¡Empecemos!

## Paso 1: Instalar Web3 {#install-web3}

Si seguiste el primer tutorial sobre cómo crear tu contrato inteligente de NFT, ya tienes experiencia usando Ethers.js. Web3 es similar a Ethers, ya que es una biblioteca utilizada para facilitar la creación de solicitudes a la cadena de bloques de [Ethereum](/). En este tutorial usaremos [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), que es una biblioteca Web3 mejorada que ofrece reintentos automáticos y un soporte robusto para WebSocket.

En el directorio principal de tu proyecto, ejecuta:

```
npm install @alch/alchemy-web3
```

## Paso 2: Crear un archivo `mint-nft.js` {#create-mintnftjs}

Dentro de tu directorio de scripts, crea un archivo `mint-nft.js` y añade las siguientes líneas de código:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Paso 3: Obtener el ABI de tu contrato {#contract-abi}

El ABI (Interfaz Binaria de Aplicación) de nuestro contrato es la interfaz para interactuar con nuestro contrato inteligente. Puedes aprender más sobre los ABI de contratos [aquí](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is). Hardhat genera automáticamente un ABI para nosotros y lo guarda en el archivo `MyNFT.json`. Para usarlo, necesitaremos analizar el contenido añadiendo las siguientes líneas de código a nuestro archivo `mint-nft.js`:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Si quieres ver el ABI, puedes imprimirlo en tu consola:

```js
console.log(JSON.stringify(contract.abi))
```

Para ejecutar `mint-nft.js` y ver tu ABI impreso en la consola, navega a tu terminal y ejecuta:

```js
node scripts/mint-nft.js
```

## Paso 4: Configurar los metadatos para tu NFT usando IPFS {#config-meta}

Si recuerdas nuestro tutorial en la Parte 1, la función de nuestro contrato inteligente `mintNFT` toma un parámetro tokenURI que debería resolverse en un documento JSON que describa los metadatos del NFT, lo cual es realmente lo que da vida al NFT, permitiéndole tener propiedades configurables, como un nombre, descripción, imagen y otros atributos.

> _El Sistema de Archivos Interplanetario (IPFS) es un protocolo descentralizado y una red entre pares para almacenar y compartir datos en un sistema de archivos distribuido._

Usaremos Pinata, una API y un conjunto de herramientas de IPFS muy convenientes, para almacenar el activo y los metadatos de nuestro NFT y asegurar que nuestro NFT sea verdaderamente descentralizado. Si no tienes una cuenta de Pinata, regístrate para obtener una cuenta gratuita [aquí](https://app.pinata.cloud) y completa los pasos para verificar tu correo electrónico.

Una vez que hayas creado una cuenta:

- Navega a la página "Files" (Archivos) y haz clic en el botón azul "Upload" (Subir) en la parte superior izquierda de la página.

- Sube una imagen a Pinata: este será el activo de imagen para tu NFT. Siéntete libre de nombrar el activo como desees.

- Después de subirla, verás la información del archivo en la tabla de la página "Files". También verás una columna CID. Puedes copiar el CID haciendo clic en el botón de copiar junto a él. Puedes ver tu archivo subido en: `https://gateway.pinata.cloud/ipfs/<CID>`. Puedes encontrar la imagen que usamos en IPFS [aquí](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5), por ejemplo.

Para los que aprenden de forma más visual, los pasos anteriores se resumen aquí:

![How to upload your image to Pinata](./instructionsPinata.gif)

Ahora, vamos a querer subir un documento más a Pinata. Pero antes de hacer eso, ¡necesitamos crearlo!

En tu directorio raíz, crea un nuevo archivo llamado `nft-metadata.json` y añade el siguiente código json:

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

Siéntete libre de cambiar los datos en el json. Puedes eliminar o añadir a la sección de atributos. Lo más importante es asegurarte de que el campo de la imagen apunte a la ubicación de tu imagen en IPFS; de lo contrario, tu NFT incluirá una foto de un perro (¡muy lindo!).

Una vez que hayas terminado de editar el archivo JSON, guárdalo y súbelo a Pinata, siguiendo los mismos pasos que hicimos para subir la imagen.

![How to upload your nft-metadata.json to Pinata](./uploadPinata.gif)

## Paso 5: Crear una instancia de tu contrato {#instance-contract}

Ahora, para interactuar con nuestro contrato, necesitamos crear una instancia del mismo en nuestro código. Para hacerlo, necesitaremos la dirección de nuestro contrato, que podemos obtener del despliegue o de [Blockscout](https://eth-sepolia.blockscout.com/) buscando la dirección que usaste para desplegar el contrato.

![View your contract address on Etherscan](./view-contract-etherscan.png)

En el ejemplo anterior, la dirección de nuestro contrato es 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

A continuación, usaremos el [método contract](https://docs.web3js.org/api/web3-eth-contract/class/Contract) de Web3 para crear nuestro contrato usando el ABI y la dirección. En tu archivo `mint-nft.js`, añade lo siguiente:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Paso 6: Actualizar el archivo `.env` {#update-env}

Ahora, para crear y enviar transacciones a la cadena de Ethereum, usaremos la dirección de tu cuenta pública de Ethereum para obtener el nonce de la cuenta (lo explicaremos a continuación).

Añade tu clave pública a tu archivo `.env`: si completaste la parte 1 del tutorial, nuestro archivo `.env` debería verse así ahora:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Paso 7: Crear tu transacción {#create-txn}

Primero, definamos una función llamada `mintNFT(tokenData)` y creemos nuestra transacción haciendo lo siguiente:

1. Obtén tu _PRIVATE_KEY_ y _PUBLIC_KEY_ del archivo `.env`.

1. A continuación, necesitaremos averiguar el nonce de la cuenta. La especificación del nonce se utiliza para llevar un registro del número de transacciones enviadas desde tu dirección, lo cual necesitamos por motivos de seguridad y para prevenir [ataques de repetición](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Para obtener el número de transacciones enviadas desde tu dirección, usamos [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).

1. Finalmente, configuraremos nuestra transacción con la siguiente información:

- `'from': PUBLIC_KEY`: El origen de nuestra transacción es nuestra dirección pública.

- `'to': contractAddress`: El contrato con el que deseamos interactuar y enviar la transacción.

- `'nonce': nonce`: El nonce de la cuenta con el número de transacciones enviadas desde nuestra dirección.

- `'gas': estimatedGas`: El gas estimado necesario para completar la transacción.

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()`: El cálculo que deseamos realizar en esta transacción, que en este caso es acuñar un NFT.

Tu archivo `mint-nft.js` debería verse así ahora:

```js
   require('dotenv').config();
   const API_URL = process.env.API_URL;
   const PUBLIC_KEY = process.env.PUBLIC_KEY;
   const PRIVATE_KEY = process.env.PRIVATE_KEY;

   const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
   const web3 = createAlchemyWeb3(API_URL);

   const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
   const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778";
   const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

   async function mintNFT(tokenURI) {
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //obtener el último nonce

   //la transacción
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

Ahora que hemos creado nuestra transacción, necesitamos firmarla para poder enviarla. Aquí es donde usaremos nuestra clave privada.

`web3.eth.sendSignedTransaction` nos dará el hash de transacción, que podemos usar para asegurarnos de que nuestra transacción fue minada y no fue descartada por la red. Notarás que en la sección de firma de la transacción, hemos añadido algunas comprobaciones de errores para saber si nuestra transacción se realizó con éxito.

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //obtener el último nonce

  //la transacción
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

## Paso 9: Llamar a `mintNFT` y ejecutar node `mint-nft.js` {#call-mintnft-fn}

¿Recuerdas el `metadata.json` que subiste a Pinata? Obtén su código hash de Pinata y pasa lo siguiente como parámetro a la función `mintNFT` `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Aquí te explicamos cómo obtener el código hash:

![How to get your nft metadata hashcode on Pinata](./metadataPinata.gif)_Cómo obtener el código hash de los metadatos de tu nft en Pinata_

> Comprueba dos veces que el código hash que copiaste enlaza a tu **metadata.json** cargando `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` en una ventana separada. La página debería verse similar a la captura de pantalla a continuación:

![Your page should display the json metadata](./metadataJSON.png)_Tu página debería mostrar los metadatos json_

En conjunto, tu código debería verse algo así:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //obtener el último nonce

  //la transacción
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

Ahora, ejecuta `node scripts/mint-nft.js` para desplegar tu NFT. Después de un par de segundos, deberías ver una respuesta como esta en tu terminal:

    The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8

    Check Alchemy's Mempool to view the status of your transaction!

A continuación, visita tu [mempool de Alchemy](https://dashboard.alchemyapi.io/mempool) para ver el estado de tu transacción (si está pendiente, minada o fue descartada por la red). Si tu transacción fue descartada, también es útil revisar [Blockscout](https://eth-sepolia.blockscout.com/) y buscar tu hash de transacción.

![View your NFT transaction hash on Etherscan](./view-nft-etherscan.png)_Ver el hash de transacción de tu NFT en Etherscan_

¡Y eso es todo! Ahora has desplegado Y acuñado un NFT en la cadena de bloques de Ethereum <Emoji text=":money_mouth_face:" size={1} />

¡Usando el `mint-nft.js` puedes acuñar tantos NFT como tu corazón (y tu billetera) deseen! Solo asegúrate de pasar un nuevo tokenURI que describa los metadatos del NFT (de lo contrario, terminarás haciendo un montón de NFT idénticos con diferentes ID).

Es de suponer que te gustaría poder presumir de tu NFT en tu billetera, ¡así que asegúrate de consultar la [Parte 3: Cómo ver tu NFT en tu billetera](/developers/tutorials/how-to-view-nft-in-metamask/)!