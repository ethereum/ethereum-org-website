---
title: Enviar transacciones usando Viem
description: "Esta es una guía para principiantes sobre cómo enviar transacciones de Ethereum usando la biblioteca Viem. Hay tres pasos principales para enviar una transacción a la cadena de bloques de Ethereum: crear, firmar y transmitir. Repasaremos los tres."
author: "Elan Halpern"
tags: ["transacciones", "Viem", "Alchemy"]
skill: beginner
breadcrumb: Enviar transacciones
lang: es
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

Esta es una guía para principiantes sobre cómo enviar transacciones de Ethereum usando la biblioteca [Viem](https://viem.sh/). Hay tres pasos principales para enviar una transacción a la cadena de bloques de Ethereum: crear, firmar y transmitir. Repasaremos los tres, ¡con la esperanza de responder cualquier pregunta que puedas tener! En este tutorial, usaremos [Alchemy](https://www.alchemy.com/) para enviar nuestras transacciones a la cadena de Ethereum. Puedes [crear una cuenta gratuita de Alchemy aquí](https://auth.alchemy.com/signup).

**NOTA:** Esta guía es para firmar tus transacciones en el _backend_ de tu aplicación. Si deseas integrar la firma de tus transacciones en el frontend, consulta la [API del proveedor de MetaMask](https://docs.metamask.io/wallet/reference/provider-api/).

## Conceptos básicos {#the-basics}

Al igual que la mayoría de los desarrolladores de cadenas de bloques cuando empiezan, es posible que hayas investigado cómo enviar una transacción (algo que debería ser bastante simple) y te hayas topado con una gran cantidad de guías, cada una diciendo cosas diferentes y dejándote un poco abrumado y confundido. Si estás en esa situación, no te preocupes; ¡todos lo estuvimos en algún momento! Así que, antes de empezar, aclaremos algunas cosas:

### 1\. Alchemy no almacena tus claves privadas {#alchemy-does-not-store-your-private-keys}

- Esto significa que Alchemy no puede firmar ni enviar transacciones en tu nombre. El motivo de esto es por fines de seguridad. Alchemy nunca te pedirá que compartas tu clave privada, y nunca debes compartir tu clave privada con un nodo alojado (ni con nadie, en realidad).
- Puedes leer de la cadena de bloques usando la API principal de Alchemy, pero para escribir en ella necesitarás usar algo más para firmar tus transacciones antes de enviarlas a través de Alchemy (esto es igual para cualquier otro [servicio de nodo](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2\. ¿Qué es un "firmante" (signer)? {#what-is-a-signer}

- Los firmantes firmarán transacciones por ti usando tu clave privada. En este tutorial usaremos [Viem](https://viem.sh/) para firmar nuestra transacción, pero también podrías usar cualquier otra biblioteca Web3.
- En el frontend, un buen ejemplo de un firmante sería [MetaMask](https://metamask.io/), que firmará y enviará transacciones en tu nombre.

### 3\. ¿Por qué necesito firmar mis transacciones? {#why-do-i-need-to-sign-my-transactions}

- Cada usuario que quiera enviar una transacción en la red Ethereum debe firmar la transacción (usando su clave privada), para validar que el origen de la transacción es quien dice ser.
- Es súper importante proteger esta clave privada, ya que tener acceso a ella otorga control total sobre tu cuenta de Ethereum, permitiéndote (o a cualquiera con acceso) realizar transacciones en tu nombre.

### 4\. ¿Cómo protejo mi clave privada? {#how-do-i-protect-my-private-key}

- Hay muchas formas de proteger tu clave privada y usarla para enviar transacciones. En este tutorial usaremos un archivo `.env`. Sin embargo, también podrías usar un proveedor independiente que almacene claves privadas, usar un archivo de almacén de claves (keystore), u otras opciones.

### 5\. ¿Cuál es la diferencia entre `eth_sendTransaction` y `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` y `eth_sendRawTransaction` son funciones de la interfaz de programación de aplicaciones (API) de Ethereum que transmiten una transacción a la red Ethereum para que se agregue a un bloque futuro. Difieren en cómo manejan la firma de las transacciones.

- [`eth_sendTransaction`](/developers/docs/apis/json-rpc/#eth-sendtransaction) se usa para enviar transacciones _no firmadas_, lo que significa que el nodo al que estás enviando debe administrar tu clave privada para que pueda firmar la transacción antes de transmitirla a la cadena. Dado que Alchemy no guarda las claves privadas de los usuarios, no admiten este método.
- [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction) se usa para transmitir transacciones que ya han sido firmadas. Esto significa que primero debes firmar la transacción con tu clave privada (en Viem, usando [`signTransaction`](https://viem.sh/docs/actions/wallet/signTransaction) con una [cuenta local](https://viem.sh/docs/accounts/local/privateKeyToAccount)), y luego pasar el resultado a `eth_sendRawTransaction`.

Al usar Viem, se accede a `eth_sendRawTransaction` llamando a la función [`sendRawTransaction`](https://viem.sh/docs/actions/wallet/sendRawTransaction).

Esto es lo que usaremos en este tutorial.

### 6\. ¿Qué es la biblioteca Web3? {#what-is-the-web3-library}

- Una biblioteca Web3 es un envoltorio (wrapper) alrededor de las llamadas estándar [JSON-RPC](/developers/docs/apis/json-rpc/) que es bastante común de usar en el desarrollo de Ethereum.
- Hay muchas bibliotecas Web3 para diferentes lenguajes. En este tutorial usaremos [Viem](https://viem.sh/), que está escrita en TypeScript y funciona en cualquier proyecto de JavaScript. Puedes consultar otras opciones [aquí](/developers/docs/apis/javascript/) como [Ethers.js](https://docs.ethers.org/v6/).

Bien, ahora que hemos aclarado algunas de estas preguntas, pasemos al tutorial. ¡No dudes en hacer preguntas en cualquier momento en el [Discord](https://discord.gg/gWuC7zB) de Alchemy!

### 7\. ¿Cómo enviar transacciones seguras, privadas y con gas optimizado? {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy tiene un conjunto de recursos para transacciones](https://www.alchemy.com/docs/sending-transactions). Puedes usarlos para enviar transacciones, simular transacciones antes de que ocurran, enviar transacciones privadas y enviar transacciones con gas optimizado.
- También puedes usar los [webhooks de Alchemy](https://www.alchemy.com/docs/reference/webhooks-overview) para recibir alertas cuando tu transacción se extraiga de la mempool y se agregue a la cadena.

**NOTA:** Esta guía requiere una cuenta de Alchemy, una dirección de Ethereum o una billetera de MetaMask, Node.js y npm instalados. Si no los tienes, sigue estos pasos:

1.  [Crea una cuenta gratuita de Alchemy](https://auth.alchemy.com/signup)
2.  [Crea una cuenta de MetaMask](https://metamask.io/) (o consigue una dirección de Ethereum)
3.  [Instala Node.js y npm](https://nodejs.org/en/download/)
## Pasos para enviar tu transacción {#steps-to-sending-your-transaction}

### 1\. Crea una aplicación de Alchemy en la red de prueba Sepolia {#create-an-alchemy-app-on-the-sepolia-testnet}

Navega a tu [Panel de control de Alchemy](https://dashboard.alchemy.com/) y crea una nueva aplicación, eligiendo Sepolia (o cualquier otra red de prueba) para tu red.

### 2\. Solicita ETH del faucet de Sepolia {#request-eth-from-sepolia-faucet}

Sigue las instrucciones en el [faucet de Sepolia de Alchemy](https://www.alchemy.com/faucets/ethereum-sepolia) para recibir ETH, o usa uno de los otros [faucets de Sepolia](/developers/docs/networks/#sepolia). Los faucets reparten pequeñas cantidades (el faucet de Alchemy da 0.1 ETH por día), lo cual es suficiente para este tutorial. Asegúrate de incluir tu dirección de Ethereum de **Sepolia** (desde MetaMask) y no de otra red. Después de seguir las instrucciones, verifica que hayas recibido el ETH en tu billetera.

### 3\. Crea un nuevo directorio de proyecto y entra en él con `cd` {#create-a-new-project-direction}

Crea un nuevo directorio de proyecto desde la línea de comandos (terminal para Mac) y navega hacia él:

```sh
mkdir sendtx-example
cd sendtx-example
```

### 4\. Instala Viem (o cualquier biblioteca Web3) {#install-alchemy-web3}

Ejecuta el siguiente comando en el directorio de tu proyecto para instalar [Viem](https://viem.sh/):

Ten en cuenta que, si deseas usar la biblioteca Ethers.js, [sigue las instrucciones aquí](https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```sh
npm init -y
npm install viem
```

### 5\. Instala dotenv {#install-dotenv}

Usaremos un archivo `.env` para almacenar de forma segura nuestra clave API y clave privada.

```sh
npm install dotenv
```

### 6\. Crea el archivo `.env` {#create-the-dotenv-file}

Crea un archivo `.env` en el directorio de tu proyecto y agrega lo siguiente (reemplazando "`your-api-url`" y "`your-private-key`")

- Para encontrar la URL de tu API de Alchemy, navega a la página de detalles de la aplicación que acabas de crear en tu panel de control, haz clic en "View Key" (Ver clave) en la esquina superior derecha y copia la URL HTTP.
- Para encontrar tu clave privada usando MetaMask, consulta esta [guía](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/). Usa una cuenta que solo contenga ETH de la red de prueba.

```sh
API_URL="your-api-url"
PRIVATE_KEY="your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
¡No hagas commit de <code>.env</code>! Asegúrate de nunca compartir ni exponer tu archivo <code>.env</code> con nadie, ya que al hacerlo estás comprometiendo tus secretos. Si estás usando control de versiones, agrega tu <code>.env</code> a un archivo <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

### 7\. Crea el archivo `sendTx.js` {#create-sendtx-js}

Genial, ahora que tenemos nuestros datos confidenciales protegidos en un archivo `.env`, comencemos a programar. Para nuestro ejemplo de envío de transacción, enviaremos 0.001 ETH a otra dirección que controles, como una segunda cuenta en MetaMask.

Crea un archivo `sendTx.js`, que es donde configuraremos y enviaremos nuestra transacción de ejemplo, y agrégale las siguientes líneas de código:

```js
require("dotenv").config({ quiet: true })
const { createPublicClient, createWalletClient, http, parseEther } = require("viem")
const { privateKeyToAccount } = require("viem/accounts")
const { sepolia } = require("viem/chains")

async function main() {
  const { API_URL, PRIVATE_KEY } = process.env
  const account = privateKeyToAccount(
    PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : `0x${PRIVATE_KEY}`
  )
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(API_URL),
  })
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(API_URL),
  })

  const nonce = await publicClient.getTransactionCount({
    address: account.address,
    blockTag: "pending",
  }) // el nonce comienza a contar desde 0

  const transaction = await walletClient.prepareTransactionRequest({
    to: "0xYourSecondAddress", // TODO: reemplazar con la dirección a la que deseas enviar ETH
    value: parseEther("0.001"), // 0.001 ETH
    gas: 21000n,
    nonce,
    // campo de datos opcional para enviar un mensaje o ejecutar un contrato inteligente
  })

  const signedTx = await walletClient.signTransaction(transaction)

  try {
    const hash = await walletClient.sendRawTransaction({
      serializedTransaction: signedTx,
    })
    console.log("🎉 The hash of your transaction is:", hash)

    const receipt = await publicClient.waitForTransactionReceipt({ hash })
    console.log(`Transaction ${receipt.status} in block ${receipt.blockNumber}`)
  } catch (error) {
    console.log(
      "❗Something went wrong while submitting your transaction:",
      error.details ?? error.message
    )
  }
}

main()
```

Asegúrate de reemplazar `0xYourSecondAddress` con la dirección a la que deseas enviar ETH. El script deriva tu propia dirección (de envío) a partir de `PRIVATE_KEY`, por lo que no necesitas ingresarla.

Ahora, antes de pasar a ejecutar este código, hablemos de algunos de los componentes aquí.

- `account`: Una cuenta local creada a partir de tu clave privada con [`privateKeyToAccount`](https://viem.sh/docs/accounts/local/privateKeyToAccount). La firma ocurre en tu máquina y la clave privada nunca se envía a Alchemy.
- `publicClient` y `walletClient`: clientes de Viem que envían solicitudes JSON-RPC a tu URL de Alchemy. El cliente público lee de la cadena y el cliente de billetera prepara y firma transacciones para tu cuenta.
- `nonce`: La especificación del nonce se usa para realizar un seguimiento del número de transacciones enviadas desde tu dirección. Necesitamos esto por motivos de seguridad y para evitar ataques de repetición. Para obtener el número de transacciones enviadas desde tu dirección, usamos [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count). Viem también completaría esto por ti, pero lo obtenemos explícitamente aquí para mostrar de dónde proviene.
- `transaction`: El objeto de transacción tiene algunos aspectos que debemos especificar. [`prepareTransactionRequest`](https://viem.sh/docs/actions/wallet/prepareTransactionRequest) completa el resto por nosotros, incluyendo el `chainId` y los campos de tarifa de [EIP-1559](/developers/docs/gas/) `maxFeePerGas` y `maxPriorityFeePerGas`, según las condiciones actuales de la red.
  - `to`: Esta es la dirección a la que queremos enviar ETH.
  - `value`: Esta es la cantidad que deseamos enviar, especificada en Wei, donde 10^18 Wei = 1 ETH. [`parseEther`](https://viem.sh/docs/utilities/parseEther) convierte una cantidad de ETH a Wei por nosotros. Tu cuenta necesita un poco más que esto, ya que también paga por el gas.
  - `gas`: Hay muchas formas de determinar la cantidad correcta de gas para incluir con tu transacción. Alchemy admite [webhooks](https://www.alchemy.com/docs/reference/webhooks-overview) que pueden notificarte sobre la actividad en cadena. Para las transacciones de la Red principal, es una buena práctica verificar las condiciones actuales del gas para determinar la cantidad correcta de gas a incluir. Una transferencia simple de ETH a una dirección ordinaria siempre usa exactamente 21000 de gas, que es el mínimo para cualquier transacción, por lo que ponemos 21000 aquí. Si omites `gas`, Viem lo estima por ti.
  - `nonce`: consulta la definición de nonce anterior. El nonce comienza a contar desde cero.
  - [OPCIONAL] data: Se usa para enviar información adicional con tu transferencia o para llamar a un contrato inteligente, no es obligatorio para transferencias de saldo, consulta la nota a continuación.
- `signedTx`: Para firmar nuestro objeto de transacción, usaremos el método `signTransaction`, que lo firma localmente con la cuenta creada a partir de nuestra `PRIVATE_KEY`.
- `sendRawTransaction`: Una vez que tenemos una transacción firmada, podemos enviarla para que se incluya en un bloque posterior usando `sendRawTransaction`, que llama a `eth_sendRawTransaction`.
- `waitForTransactionReceipt`: Espera hasta que la transacción se incluya en un bloque y devuelve su recibo.

**Una nota sobre data**
Hay dos tipos principales de transacciones que se pueden enviar en Ethereum.

- Transferencia de saldo: Enviar ETH de una dirección a otra. No se requiere el campo data; sin embargo, si deseas enviar información adicional junto con tu transacción, puedes incluir esa información en formato HEX en este campo.
  - Por ejemplo, digamos que queremos escribir el hash de un documento de IPFS en la cadena de Ethereum para darle una marca de tiempo inmutable. Nuestro campo data debería verse como `data: toHex("IPFS hash")`, usando [`toHex`](https://viem.sh/docs/utilities/toHex) de Viem. Y ahora cualquiera puede consultar la cadena y ver cuándo se agregó ese documento.
- Transacción de contrato inteligente: Ejecutar algún código de contrato inteligente en la cadena. En este caso, el campo data debe contener la función inteligente que deseas ejecutar, junto con cualquier parámetro.
  - Para un ejemplo práctico, consulta el [tutorial del contrato inteligente Hola Mundo](/developers/tutorials/hello-world-smart-contract/).

### 8\. Ejecuta el código usando `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Navega de vuelta a tu terminal o línea de comandos y ejecuta:

```sh
node sendTx.js
```

### 9\. Ve tu transacción en un explorador de bloques {#see-your-transaction-in-the-mempool}

El script imprime el hash de transacción tan pronto como el nodo acepta la transacción, luego espera hasta que se incluya en un bloque (generalmente en unos pocos segundos) y muestra el resultado. Para ver los detalles, pega el hash en un explorador de bloques de Sepolia como [Sepolia Etherscan](https://sepolia.etherscan.io/) o [Blockscout](https://eth-sepolia.blockscout.com/). Allí puedes ver cómo la transacción pasa de pendiente a incluida, y ver la cantidad, las tarifas y el bloque en el que aterrizó.

Si en su lugar ves un error de `insufficient funds` (fondos insuficientes), tu cuenta no tiene suficiente ETH de Sepolia para cubrir el valor más el gas. Vuelve al paso 2 y solicita más de un faucet.

**¡Yupi! Acabas de enviar tu primera transacción de Ethereum usando Alchemy 🎉**

_Para comentarios y sugerencias sobre esta guía, ¡envía un mensaje a Elan en el [Discord](https://discord.gg/gWuC7zB) de Alchemy!_

_Publicado originalmente por Alchemy._
