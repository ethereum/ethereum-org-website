---
title: Cómo acuñar un NFT (Parte 2/3 de la serie de tutoriales de NFT)
description: Este tutorial describe cómo acuñar un NFT en la blockchain de Ethereum usando nuestro contrato inteligente y Web3.
author: "Sumi Mudgil"
tags:
  [
    "ERC-721",
    "Alchemy",
    "Solidity",
    "contratos Inteligentes"
  ]
skill: beginner
lang: es
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): $69 millones
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): $11 millones
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): $6 millones

Todos ellos acuñaron sus NFT usando la potente API de Alchemy. En este tutorial, le enseñaremos cómo hacer lo mismo en \<10 minutos.

«Acuñar un NFT» es el acto de publicar una instancia única de su token ERC-721 en la blockchain. Usando nuestro contrato inteligente de la [Parte 1 de esta serie de tutoriales de NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/), demostremos nuestras habilidades en Web3 y acuñemos un NFT. Al final de este tutorial, podrá acuñar tantos NFT como su corazón (y su billetera) deseen.

¡Comencemos!

## Paso 1: Instalar Web3 {#install-web3}

Si siguió el primer tutorial sobre cómo crear su contrato inteligente de NFT, ya tiene experiencia con Ethers.js. Web3 es similar a Ethers, ya que es una librería que se usa para facilitar la creación de solicitudes a la blockchain de Ethereum. En este tutorial usaremos [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), que es una librería de Web3 mejorada que ofrece reintentos automáticos y un soporte robusto para WebSocket.

En el directorio de inicio de su proyecto, ejecute:

```
npm install @alch/alchemy-web3
```

## Paso 2: Crear un archivo `mint-nft.js` {#create-mintnftjs}

Dentro de su directorio de scripts, cree un archivo `mint-nft.js` y agregue las siguientes líneas de código:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Paso 3: Obtener el ABI de su contrato {#contract-abi}

El ABI de nuestro contrato (Application Binary Interface o Interfaz Binaria de Aplicación) es la interfaz para interactuar con nuestro contrato inteligente. Puede obtener más información sobre los ABI de contrato [aquí](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is). Hardhat genera automáticamente un ABI para nosotros y lo guarda en el archivo `MyNFT.json`. Para usar esto, necesitaremos analizar el contenido agregando las siguientes líneas de código a nuestro archivo `mint-nft.js`:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Si quiere ver el ABI, puede imprimirlo en su consola:

```js
console.log(JSON.stringify(contract.abi))
```

Para ejecutar `mint-nft.js` y ver su ABI impreso en la consola, vaya a su terminal y ejecute:

```js
node scripts/mint-nft.js
```

## Paso 4: Configurar los metadatos de su NFT usando IPFS {#config-meta}

Si recuerda de nuestro tutorial de la Parte 1, nuestra función de contrato inteligente `mintNFT` toma un parámetro tokenURI que debe resolverse en un documento JSON que describa los metadatos del NFT, que es lo que realmente da vida al NFT, permitiéndole tener propiedades configurables, como un nombre, descripción, imagen y otros atributos.

> _Interplanetary File System (IPFS) es un protocolo descentralizado y una red entre pares (peer-to-peer) para almacenar y compartir datos en un sistema de archivos distribuido._

Usaremos Pinata, una cómoda API y un conjunto de herramientas de IPFS, para almacenar los activos y metadatos de nuestro NFT y así garantizar que nuestro NFT esté verdaderamente descentralizado. Si no tiene una cuenta de Pinata, regístrese para obtener una cuenta gratuita [aquí](https://app.pinata.cloud) y complete los pasos para verificar su correo electrónico.

Una vez que haya creado una cuenta:

- Vaya a la página «Files» (Archivos) y haga clic en el botón azul «Upload» (Subir) en la parte superior izquierda de la página.

- Suba una imagen a Pinata: este será el activo de imagen para su NFT. Siéntase libre de nombrar el activo como desee.

- Después de subirlo, verá la información del archivo en la tabla de la página «Files» (Archivos). También verá una columna CID. Puede copiar el CID haciendo clic en el botón de copiar que se encuentra al lado. Puede ver su archivo subido en: `https://gateway.pinata.cloud/ipfs/<CID>`. Puede encontrar la imagen que usamos en IPFS [aquí](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5), por ejemplo.

Para quienes aprenden de forma más visual, a continuación se resumen los pasos anteriores:

![Cómo subir su imagen a Pinata](./instructionsPinata.gif)

Ahora, vamos a subir un documento más a Pinata. ¡Pero antes de hacerlo, tenemos que crearlo!

En su directorio raíz, cree un nuevo archivo llamado `nft-metadata.json` y agregue el siguiente código JSON:

```json
{
  "attributes": [
    {
      "trait_type": "Raza",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Color de ojos",
      "value": "Moca"
    }
  ],
  "description": "El cachorro más adorable y sensible del mundo.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramsés"
}
```

Siéntase libre de cambiar los datos en el JSON. Puede eliminar o agregar a la sección de atributos. Lo más importante, asegúrese de que el campo de la imagen apunte a la ubicación de su imagen de IPFS; de lo contrario, su NFT incluirá una foto de un (¡muy lindo!) perro.

Una vez que haya terminado de editar el archivo JSON, guárdelo y súbalo a Pinata, siguiendo los mismos pasos que para subir la imagen.

![Cómo subir su nft-metadata.json a Pinata](./uploadPinata.gif)

## Paso 5: Crear una instancia de su contrato {#instance-contract}

Ahora, para interactuar con nuestro contrato, necesitamos crear una instancia del mismo en nuestro código. Para ello, necesitaremos la dirección de nuestro contrato, que podemos obtener de la implementación o de [Blockscout](https://eth-sepolia.blockscout.com/) buscando la dirección que utilizó para implementar el contrato.

![Ver la dirección de su contrato en Etherscan](./view-contract-etherscan.png)

En el ejemplo anterior, la dirección de nuestro contrato es 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

A continuación, usaremos el [método de contrato](https://docs.web3js.org/api/web3-eth-contract/class/Contract) de Web3 para crear nuestro contrato utilizando el ABI y la dirección. En su archivo `mint-nft.js`, agregue lo siguiente:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Paso 6: Actualizar el archivo `.env` {#update-env}

Ahora, para crear y enviar transacciones a la cadena de Ethereum, usaremos la dirección de su cuenta pública de Ethereum para obtener el nonce de la cuenta (lo explicaremos a continuación).

Agregue su clave pública a su archivo `.env`; si completó la parte 1 del tutorial, nuestro archivo `.env` debería verse así:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Paso 7: Crear su transacción {#create-txn}

Primero, definamos una función llamada `mintNFT(tokenData)` y creemos nuestra transacción haciendo lo siguiente:

1. Obtenga su _PRIVATE_KEY_ y _PUBLIC_KEY_ del archivo `.env`.

2. A continuación, tendremos que averiguar el nonce de la cuenta. La especificación del nonce se utiliza para hacer un seguimiento del número de transacciones enviadas desde su dirección, lo que necesitamos por motivos de seguridad y para evitar [ataques de repetición](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Para obtener el número de transacciones enviadas desde su dirección, usamos [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).

3. Finalmente, configuraremos nuestra transacción con la siguiente información:

- `'from': PUBLIC_KEY`: el origen de nuestra transacción es nuestra dirección pública.

- `'to': contractAddress`: el contrato con el que deseamos interactuar y al que enviaremos la transacción.

- `'nonce': nonce`: el nonce de la cuenta con el número de transacciones enviadas desde nuestra dirección.

- `'gas': estimatedGas`: el gas estimado necesario para completar la transacción.

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()`: la computación que deseamos realizar en esta transacción, que en este caso es acuñar un NFT.

Su archivo `mint-nft.js` debería verse así ahora:

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

Ahora que hemos creado nuestra transacción, debemos firmarla para poder enviarla. Aquí es donde usaremos nuestra clave privada.

`web3.eth.sendSignedTransaction` nos dará el hash de la transacción, que podemos usar para asegurarnos de que nuestra transacción fue minada y no fue descartada por la red. Notará que en la sección de firma de la transacción, hemos agregado algunas comprobaciones de errores para saber si nuestra transacción se ha realizado con éxito.

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
              "El hash de su transacción es: ",
              hash,
              "\n¡Consulte la zona de espera de Alchemy para ver el estado de su transacción!"
            )
          } else {
            console.log(
              "Algo salió mal al enviar su transacción:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" La promesa falló:", err)
    })
}
```

## Paso 9: Llamar a `mintNFT` y ejecutar `node scripts/mint-nft.js` {#call-mintnft-fn}

¿Recuerda el archivo `metadata.json` que subió a Pinata? Obtenga su código hash de Pinata y pase lo siguiente como parámetro a la función `mintNFT`: `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

A continuación, se indica cómo obtener el código hash:

![Cómo obtener el código hash de los metadatos de su NFT en Pinata](./metadataPinata.gif)_Cómo obtener el código hash de los metadatos de su NFT en Pinata_

> Compruebe que el código hash que ha copiado enlaza con su **metadata.json** cargando `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` en una ventana aparte. La página debería tener un aspecto similar a la captura de pantalla siguiente:

![Su página debería mostrar los metadatos JSON](./metadataJSON.png)_Su página debería mostrar los metadatos JSON_

En total, su código debería tener un aspecto similar a este:

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
              "El hash de su transacción es: ",
              hash,
              "\n¡Consulte la zona de espera de Alchemy para ver el estado de su transacción!"
            )
          } else {
            console.log(
              "Algo salió mal al enviar su transacción:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("La promesa falló:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Ahora, ejecute `node scripts/mint-nft.js` para implementar su NFT. Después de un par de segundos, debería ver una respuesta como esta en su terminal:

    ```
    El hash de su transacción es: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
    
    ¡Consulte la zona de espera de Alchemy para ver el estado de su transacción!
    ```

A continuación, visite la [zona de espera de Alchemy](https://dashboard.alchemyapi.io/mempool) para ver el estado de su transacción (si está pendiente, minada o fue descartada por la red). Si su transacción fue descartada, también es útil consultar [Blockscout](https://eth-sepolia.blockscout.com/) y buscar el hash de su transacción.

![Ver el hash de la transacción de su NFT en Etherscan](./view-nft-etherscan.png)_Ver el hash de la transacción de su NFT en Etherscan_

¡Y eso es todo! ¡Ya ha implementado Y acuñado un NFT en la blockchain de Ethereum <Emoji text=":money_mouth_face:" size={1} />

Usando `mint-nft.js`, ¡puede acuñar tantos NFT como su corazón (y su billetera) deseen! Solo asegúrese de pasar un nuevo tokenURI que describa los metadatos del NFT (de lo contrario, terminará creando un montón de NFT idénticos con diferentes ID).

Seguramente, le gustaría poder mostrar su NFT en su billetera, así que asegúrese de consultar la [Parte 3: Cómo ver su NFT en su billetera](/developers/tutorials/how-to-view-nft-in-metamask/)!
