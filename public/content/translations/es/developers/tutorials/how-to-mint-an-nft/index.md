---
title: "Cómo acuñar un NFT (Parte 2/3 de la serie de tutoriales sobre NFT)"
description: "Este tutorial describe cómo acuñar un NFT en la cadena de bloques de Ethereum utilizando nuestro contrato inteligente, Hardhat y ethers.js."
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "contratos inteligentes"]
skill: beginner
breadcrumb: "Acuñar un NFT"
lang: es
published: 2021-04-22
---

"Acuñar un NFT" es el acto de publicar una instancia única de su token ERC-721 en la cadena de bloques. Utilizando nuestro contrato inteligente de la [Parte 1 de esta serie de tutoriales sobre NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/), pongamos a prueba nuestras habilidades en Web3 y acuñemos un NFT. Al final de este tutorial, ¡podrá acuñar tantos NFT como su corazón (y su billetera) deseen!

¡Comencemos!

## Paso 1: Compruebe su configuración {#install-web3}

Si siguió el primer tutorial sobre cómo crear su contrato inteligente de NFT, ya tiene todo lo que necesita: un proyecto de Hardhat 3 con el [complemento de Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) y [ethers.js](https://docs.ethers.org/v6/), una biblioteca utilizada para facilitar la creación de solicitudes a la cadena de bloques de [Ethereum](/). Escribiremos nuestro código de acuñación como un script de Hardhat, por lo que reutilizará la configuración de la red Sepolia y los valores `API_URL` y `PRIVATE_KEY` de la Parte 1; no hay nada nuevo que instalar.

## Paso 2: Cree un archivo `mint-nft.js` {#create-mintnftjs}

Dentro de su directorio de scripts, cree un archivo `mint-nft.js` y agregue las siguientes líneas de código:

```js
import { network } from "hardhat"

const { ethers } = await network.create()
```

Al igual que en nuestro script de despliegue, `network.create()` se conecta a la red que elija con `--network` cuando ejecuta el script, y nos proporciona un objeto `ethers` para ella.

## Paso 3: Obtenga la ABI de su contrato {#contract-abi}

La ABI (interfaz binaria de aplicación) de nuestro contrato es la interfaz para interactuar con nuestro contrato inteligente. Puede obtener más información sobre las [ABI de contratos](/glossary/#abi). Hardhat genera automáticamente una ABI para nosotros cuando compila el contrato y la guarda en el archivo `artifacts/contracts/MyNFT.sol/MyNFT.json`. El complemento Ethers de Hardhat la lee desde allí por nosotros cuando creamos nuestra instancia de contrato en el paso 5, por lo que no necesitamos cargarla nosotros mismos.

Si desea ver la ABI, puede imprimirla en su consola. Desde el directorio raíz de su proyecto, ejecute:

```sh
node -p "JSON.stringify(require('./artifacts/contracts/MyNFT.sol/MyNFT.json').abi)"
```

## Paso 4: Configure los metadatos para su NFT utilizando IPFS {#config-meta}

Si recuerda nuestro tutorial de la Parte 1, nuestra función de contrato inteligente `mintNFT` toma un parámetro tokenURI que debería resolverse en un documento JSON que describa los metadatos del NFT, que es realmente lo que le da vida al NFT, permitiéndole tener propiedades configurables, como un nombre, descripción, imagen y otros atributos.

> _El Sistema de Archivos Interplanetario (IPFS) es un protocolo descentralizado y una red entre pares para almacenar y compartir datos en un sistema de archivos distribuido._

Utilizaremos Pinata, una conveniente interfaz de programación de aplicaciones (API) y conjunto de herramientas de IPFS, para almacenar nuestro activo NFT y los metadatos para garantizar que nuestro NFT sea verdaderamente descentralizado. Si no tiene una cuenta de Pinata, regístrese para obtener una cuenta gratuita [aquí](https://app.pinata.cloud) y complete los pasos para verificar su correo electrónico.

Una vez que haya creado una cuenta:

- Navegue a la [página de Archivos](https://app.pinata.cloud/ipfs/files) y haga clic en el botón "Add" (Agregar) en la esquina superior derecha de la página.

- Suba una imagen a Pinata: este será el activo de imagen para su NFT. Siéntase libre de nombrar el activo como desee. Asegúrese de subirlo a IPFS público: los archivos en [IPFS privado](https://docs.pinata.cloud/files/private-ipfs) no pueden ser obtenidos por las billeteras y los mercados que muestran su NFT.

- Después de subirlo, verá el archivo listado en la página de Archivos junto con su CID (identificador de contenido). Copie el CID. Puede ver su archivo subido en: `https://gateway.pinata.cloud/ipfs/<CID>`, o a través de la puerta de enlace dedicada que aparece en "Gateways" en la barra lateral de Pinata. Puede encontrar la imagen que usamos en IPFS [aquí](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5), por ejemplo.

Ahora, vamos a querer subir un documento más a Pinata. ¡Pero antes de hacer eso, necesitamos crearlo!

En su directorio raíz, cree un nuevo archivo llamado `nft-metadata.json` y agregue el siguiente código json:

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

Siéntase libre de cambiar los datos en el json. Puede eliminar o agregar a la sección de atributos. Lo más importante es asegurarse de que el campo de la imagen apunte a la ubicación de su imagen en IPFS, en la forma `ipfs://<image-CID>`; de lo contrario, su NFT incluirá una foto de un perro (¡muy lindo!).

Una vez que haya terminado de editar el archivo JSON, guárdelo y súbalo a Pinata, siguiendo los mismos pasos que hicimos para subir la imagen. Copie también el CID de `nft-metadata.json`; lo necesitaremos en el paso 9.

## Paso 5: Cree una instancia de su contrato {#instance-contract}

Ahora, para interactuar con nuestro contrato, necesitamos crear una instancia del mismo en nuestro código. Para hacerlo, necesitaremos la dirección de nuestro contrato, que nuestro script de despliegue imprimió en la Parte 1. También puede encontrarla en [Etherscan](https://sepolia.etherscan.io/) o [Blockscout](https://eth-sepolia.blockscout.com/) buscando la dirección que utilizó para desplegar el contrato.

![Vea la dirección de su contrato en Etherscan](./view-contract-etherscan.png)

En el ejemplo anterior, la dirección de nuestro contrato es 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

A continuación, utilizaremos el método `getContractAt` del complemento Ethers de Hardhat para crear nuestro contrato utilizando su nombre (que le indica qué ABI usar) y su dirección. En su archivo `mint-nft.js`, agregue lo siguiente, reemplazando la dirección con la suya:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)
```

## Paso 6: Compruebe el archivo `.env` {#update-env}

Cada transacción que enviamos debe estar firmada con la clave privada de su cuenta. Si completó la parte 1 del tutorial, nuestro archivo `.env` ya debería verse así:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

No hay necesidad de agregar su dirección pública: ethers la deduce a partir de la clave privada.

## Paso 7: Cree su transacción {#create-txn}

Primero, definamos una función llamada `mintNFT(tokenURI)` y creemos nuestra transacción haciendo lo siguiente:

1. Obtenga la cuenta desde la que enviamos la transacción. `ethers.getSigners()` devuelve las cuentas configuradas para la red, que en Sepolia es la cuenta cuya clave privada está en `.env`. Dado que `mintNFT` es `onlyOwner`, esta debe ser la misma cuenta que desplegó el contrato.

1. Llame a la función `mintNFT` en nuestra instancia de contrato, con nuestra propia dirección como destinatario y el URI de los metadatos. Este es el cálculo que deseamos realizar en esta transacción, que en este caso es acuñar un NFT.

No necesita calcular el nonce (el número de transacciones enviadas desde su dirección, lo que evita ataques de repetición), el límite de gas o las tarifas usted mismo: ethers los obtiene o estima antes de enviar la transacción.

Su archivo `mint-nft.js` debería verse así ahora:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  // Envía la transacción. ethers completa el nonce, el límite de gas y las tarifas por nosotros.
  const tx = await nftContract.mintNFT(signer.address, tokenURI)
}
```

## Paso 8: Firme la transacción {#sign-txn}

Debido a que la red está configurada con nuestra clave privada, ethers firma la transacción con ella automáticamente antes de enviarla.

Llamar a `mintNFT` devuelve una vez que se ha enviado la transacción, y nos da el hash de transacción, que podemos usar para asegurarnos de que nuestra transacción fue minada y no fue descartada por la red. `tx.wait()` luego espera hasta que la transacción se incluya en un bloque. También hemos agregado algunas comprobaciones de errores para saber si nuestra transacción se realizó con éxito.

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // Envía la transacción. ethers completa el nonce, el límite de gas y las tarifas por nosotros.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // Espera a que la transacción se incluya en un bloque
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}
```

## Paso 9: Llame a `mintNFT` y ejecute `mint-nft.js` {#call-mintnft-fn}

¿Recuerda el archivo `nft-metadata.json` que subió a Pinata? Obtenga su CID de Pinata y pase `ipfs://<metadata-CID>` como parámetro a la función `mintNFT`. Las billeteras y los mercados resuelven los URI `ipfs://` a través de una puerta de enlace IPFS de su elección, por lo que su NFT no depende de ninguna puerta de enlace en particular.

> Verifique que el CID que copió enlace a su **nft-metadata.json** cargando `https://gateway.pinata.cloud/ipfs/<metadata-CID>` en una ventana separada. La página debería verse similar a la captura de pantalla a continuación:

![Su página debería mostrar los metadatos json](./metadataJSON.png)_Su página debería mostrar los metadatos json_

En conjunto, su código debería verse algo así:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // Envía la transacción. ethers completa el nonce, el límite de gas y las tarifas por nosotros.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // Espera a que la transacción se incluya en un bloque
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}

await mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Ahora, ejecute el script en Sepolia para acuñar su NFT:

```sh
npx hardhat run scripts/mint-nft.js --network sepolia
```

Después de unos segundos, debería ver una respuesta como esta en su terminal:

```text
The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
Your NFT was minted in block <block number>
```

Para ver los detalles de su transacción, busque su hash en [Etherscan](https://sepolia.etherscan.io/) o [Blockscout](https://eth-sepolia.blockscout.com/).

![Vea el hash de transacción de su NFT en Etherscan](./view-nft-etherscan.png)_Vea el hash de transacción de su NFT en Etherscan_

¡Y eso es todo! Ahora ha desplegado Y acuñado un NFT en la cadena de bloques de Ethereum <Emoji text=":money_mouth_face:" size={1} />

¡Usando `mint-nft.js` puede acuñar tantos NFT como su corazón (y su billetera) deseen! Solo asegúrese de pasar un nuevo tokenURI que describa los metadatos del NFT (de lo contrario, terminará haciendo un montón de NFT idénticos con diferentes ID).

Presumiblemente, le gustaría poder presumir de su NFT en su billetera, ¡así que asegúrese de consultar la [Parte 3: Cómo ver su NFT en su billetera](/developers/tutorials/how-to-view-nft-in-metamask/)!
