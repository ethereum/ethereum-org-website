---
title: Enviar transacciones usando la Web3
description: "Esta es un guia apta para principiantes sobre cómo enviar transacciones de Ethereum usando la Web3. Hay tres pasos esenciales para enviar una transacción a la cadena de bloques de Ethereum, que son: crear, firmar y emitir. Analizaremos los tres."
author: "Elan Halpern"
tags:
  - "transacciones"
  - "web3.js"
  - "alchemy"
skill: beginner
lang: es
published: 2020-11-04
source: Documentos de Alchemy
sourceUrl: https://docs.alchemy.com/alchemy/tutorials/sending-txs
---

Esta es un guia apta para principiantes sobre cómo enviar transacciones de Ethereum usando la Web3. Hay tres pasos esenciales para enviar una transacción a la cadena de bloques de Ethereum, que son: crear, firmar y emitir. Explicaremos los tres pasos y esperamos responder a cualquier duda que puedas tener. En este tutorial, usaremos [Alchemy](https://www.alchemy.com/) para enviar nuestras transacciones a la red de Ethereum. Puede [crear una cuenta de Alchemy aquí](https://auth.alchemyapi.io/signup).

**NOTA:** Esta guía es para firmar sus transacciones en el _backend_ para su aplicación. Si quiere integrar la firma de sus transacciones en el frontend, consulte[Integrar Web3 con un proveedor de navegador](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider).

## Los fundamentos {#the-basics}

Como la mayoría de desarrolladores de cadena de bloques cuando comienzan, es posible que haya indagado sobre cómo enviar una transacción (algo que debería ser muy sencillo) y que se haya topado con una gran cantidad de guías, cada una de ellas diciendo cosas diferentes, que le dejan a uno un poco aturdido y confundido. Por lo tanto, si se encuentra en esa situación, no desespere. ¡Todos lo hemos pasado por ello en algún momento! Así que, antes de comenzar, aclaremos algunos puntos:

### 1\. Alchemy no almacena sus claves privadas {#alchemy-does-not-store-your-private-keys}

- Esto significa que Alchemy no puede firmar ni enviar transacciones en su nombre. Es así por motivos de seguridad. Alchemy nunca le pedirá que comparta su clave privada, ni tampoco debería compartir nunca su clave privada con un nodo alojado (ni con nadie).
- Puede leer desde la cadena de bloques usando la API del nucleo de Alchemy, pero para escribirlo, necesitará usar algo más para firmar sus transacciones antes de enviarlas mediante Alchemy (esto es lo mismo para cualquier otro [servicio de nodo](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2\. ¿Qué es un «signatario»? {#what-is-a-signer}

- Los firmantes firmarán las transacciones por usted con su clave privada. En este tutorial, nosotros usaremos [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) para firmar nuestra transacción, aunque también puede usar cualquier otra biblioteca Web 3.
- En el frontend, un buen ejemplo de firmante sería [MetaMask](https://metamask.io/), que firmará y enviará las transacciones en su nombre.

### 3\. ¿Por qué tengo que firmar mis transacciones? {#why-do-i-need-to-sign-my-transactions}

- Todo usuario que quiera enviar una transacción en la red Ethereum debe firmarla (utilizando su clave privada), para validar que la transacción proviene de quien afirma proceder.
- Es sumamente importante proteger esta clave privada, ya que tener acceso a ella otorga el control absoluto de su cuenta de Ethereum y le permite a usted (o a cualquier persona con acceso) realizar transacciones en su nombre.

### 4\. ¿Cómo puedo proteger mi clave privada? {#how-do-i-protect-my-private-key}

- Hay muchas formas de proteger tu clave privada y de utilizarla para enviar transacciones. En este tutorial utilizaremos un archivo `.env`. Sin embargo, también puede utilizar un proveedor independiente que almacene claves privadas, utilizar un banco de claves u otras opciones.

### 5\. ¿Cuál es la diferencia entre `eth_sendTransaction` y `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` y `eth_sendRawTransaction` son funciones de la API de Ethereum que emiten una transacción en la red de Ethereum para que se añada a un nuevo bloque. Se diferencian en cómo gestionan la firma de las transacciones.

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) se utiliza para enviar transacciones _sin firmar_, lo que significa que el nodo al que se envía debe gestionar su clave privada para que pueda firmar la transacción antes de difundirla en la cadena. Dado que Alchemy no almacena las claves privadas de los usuarios, no utilizamos este método.
- [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) se utiliza para emitir las transacciones que ya han sido firmadas. Esto significa que primero debes usar [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction), y luego enviar el resultado a `eth_sendRawTransaction`.

Cuando se utiliza web3, se puede acceder a `eth_sendRawTransaction` a través de la función [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction).

Esto es lo que vamos a usar en este tutorial.

### 6\. ¿Qué es la biblioteca Web3? {#what-is-the-web3-library}

- Web3.js es una biblioteca de «wrappers» o programas que rodean las funciones estándar JSON-RPC que son muy comunes en el desarrollo de Ethereum.
- Hay muchas blibiotecas en Web3 para diferentes lenguajes. En este tutorial usaremos [Alchemy Web3](https://docs.alchemy.com/reference/api-overview) que está desarrollado en JavaScript. Puede consultar [aquí](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) otras opciones, como [ethers.js](https://docs.ethers.org/v5/).

Bien, ahora que ya hemos resuelto algunas de estas dudas, comencemos con el tutorial. ¡No dude preguntar sus dudas en cualquier momento a través del canal [discord](https://discord.gg/gWuC7zB) de Alchemy!

### 7\. ¿Cómo enviar transacciones seguras, privadas y con gas optimizado? {how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy tiene un conjunto de API para transacciones](https://docs.alchemy.com/reference/transact-api-quickstart). Puede usarlas para enviar transacciones reforzadas, simular transacciones antes de que ocurran, enviar transacciones privadas y transacciones con gas optimizado.
- También puede utilizar la [API de Notify](https://docs.alchemy.com/docs/alchemy-notify) para recibir alertas cuando su transacción se toma desde la zona de espera y se añade a la cadena.

**NOTA:** Para consultar esta guía, debe tener una cuenta de Alchemy, una dirección de Ethereum o una cartera MetaMask, NodeJs, y npm instaladas. De lo contrario, siga estos pasos:

1.  [Cree una cuenta gratuita de Alchemy](https://auth.alchemyapi.io/signup)
2.  [Crea una cuenta de Metamask](https://metamask.io/) (u obtenga una dirección de Ethereum)
3.  [Siga estos pasos para instalar NodeJs y NPM](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## Pasos para enviar su transacción {#steps-to-sending-your-transaction}

### 1\. Crea una aplicación de Alchemy en la red de pruebas de Sepolia {#create-an-alchemy-app-on-the-sepolia-testnet}

Vaya a su [panel de control de Alchemy](https://dashboard.alchemyapi.io/) y cree una nueva aplicación, seleccionando Sepolia (u otra red de pruebas) para su red.

### 2\. Solicitar ETH desde un grifo Sepolia {#request-eth-from-sepolia-faucet}

Sigue las instrucciones en el [faucet (o grifo) Sepolia de Alchemy](https://www.sepoliafaucet.com/) para recibir ETH. Asegúrese de incluir su dirección Ethereum de **Sepolia** (desde MetaMask) y no otra red. Después de seguir las indicaciones, compruebe dos veces que ha recibido los ETH en su cartera.

### 3\. Crea un nuevo directorio de proyecto y `cd` en él {#create-a-new-project-direction}

Cree un nuevo directorio de proyecto desde la ventana de comandos (terminal para macs) y navega hasta ella:

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Instale Alchemy Web3 (o cualquier biblioteca en Web3) {#install-alchemy-web3}

Ejecute el siguiente comando en el directorio del proyecto que instalará [Alchemy Web3](https://docs.alchemy.com/reference/api-overview):

Observe que si quiere utilizar la biblioteca de ethers.js, [debe seguir estas instrucciones](https://docs.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```
npm install @alch/alchemy-web3
```

### 5\. Instala dotenv {#install-dotenv}

Utilizaremos un archivo `.env` para almacenar de manera segura nuestra clave API y clave privada.

```
npm install dotenv --save
```

### 6\. Cree el archivo `.env` {#create-the-dotenv-file}

Cree un archivo `.env` en el directorio de su proyecto y añada lo siguiente (sustituyendo "`your-api-url`" y "`your-private-key`")

- Para encontrar la URL de la API de Alchemy, vaya a la página de información de la aplicación que acaba de crear en su panel de control, haga clic en «Ver clave» en la esquina superior derecha y obtenga la URL HTTP.
- Para encontrar su clave privada utilizando Metamask, consulte esta [guía](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<InfoBanner isWarning>
¡No exponga su <code>.env</code>! Asegúrese de que nunca comparte ni expone su archivo <code>.env</code> con nadie, si ello conlleva revelar sus secretos. Si está haciendo un control de la versión, añada <code>.env</code> a un archivo <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</InfoBanner>

### 7\. Cree el archivo `sendTx.js` {#create-sendtx-js}

Vale, ahora que su información confidencial ya está protegida en un archivo `.env`, iniciemos la programación. Para nuestro ejemplo de envío de transacción, enviaremos ETH de vuelta al grifo Sepolia.

Cree un archivo `sendTx.js`, que es donde configuraremos y enviaremos nuestra transacción de muestra, y añádale las siguientes líneas de código:

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: replace this address with your own public address

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce starts counting from 0

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // faucet address to return eth
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // optional data field to send message or execute smart contract
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
    }
   });
}

main();
```

Asegúrese de reemplazar la dirección en la **línea 6** por su propia dirección pública.

Ahora, antes de pasar a la ejecución de este código, hablaremos sobre algunos de los componentes.

- `nonce`: la especificación del nonce se utiliza para hacer un seguimiento del número de transacciones enviadas desde su dirección. La necesitamos por motivos de seguridad y para evitar [ataques repetitivos](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Para conocer el número de transacciones enviadas desde su dirección, utilizamos [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).
- `transaction`: la transacción tiene algunos aspectos que debemos especificar.
  - `to`: Es la dirección a la que queremos enviar ETH. En este caso, estamos enviando ETH de regreso al [grifo Sepolia](https://sepoliafaucet.com/) al que inicialmente le solicitamos.
  - `value`: Esta es la cantidad que deseamos enviar, especificada en Wei, donde 10^18 Wei = 1 ETH
  - `gas`: hay numerosas formas de determinar la cantidad correcta de gas que se debe incluir en la transacción. Incluso, Alchemy tiene un [webhook del precio de del gas](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1) que informa cuando el precio del gas se encuentra dentro de un límite determinado. Una buena práctica para transacciones en la red principal consiste en consultar una calculadora de gas como [ETH Gas Station](https://ethgasstation.info/) para determinar la cantidad correcta de gas por añadir. La cantidad mínima de gas que utiliza una operación en Ethereum es de 21.000; por tanto, y para asegurarnos de que nuestra transacción se ejecute, añadiremos 30.000.
  - `nonce`: consulte la definición anteriormente mencionada. Nonce empieza a contar desde cero.
  - [OPTIONAL] datos: utilizado para enviar información adicional con su transferencia, o para activar un contrato inteligente ―no requerido para transferencias de saldo― consulte la nota de abajo.
- `signedTx`: para firmar nuestro objeto de transacción utilizaremos el método `signTransaction` con nuestra `PRIVATE_KEY`
- `sendSignedTransaction`: una vez que tenemos una transacción firmada, podemos enviarla para que se incluya en un bloque posterior utilizando `sendSignedTransaction`

**Una nota sobre los datos** Hay dos tipos principales de transacciones que se pueden enviar en Ethereum.

- Transferencia de saldo: enviar ETC de una dirección a otra. No se requiere ningún campo de datos, sin embargo, si desea enviar información adicional junto a su transacción, puede incluir esa información en formato HEX en este campo.
  - Por ejemplo, digamos que queremos escribir el hash de un documento IPFS a la cadena de Ethereum para darle una fecha y hora inmutable. Nuestro campo de datos debe mostrarse como datos: `web3.utils.toHex(‘IPFS hash‘)`. Ahora cualquiera puede consultar la cadena y ver cuándo se añadió el documento.
- Transacción de contrato inteligente: ejecute algún código de contrato inteligente en la cadena. En este caso, el campo de datos debería tener la función inteligente que desee ejecutar, junto a cualquier parámetro.
  - Para un ejemplo práctico, consulte el paso 8 en este [Tutorial abierto a todos los públicos](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction).

### 8\. Ejecuta el código usando `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Navegue hasta la terminal o línea de comandos y ejecute:

```
node sendTx.js
```

### 9\. Consulta tu transacción en el Mempool {#see-your-transaction-in-the-mempool}

Abra la página de la [Zona de espera](https://dashboard.alchemyapi.io/mempool) en su panel de control de Alchemy y filtre la aplicación que creó para encontrar su transacción. Aquí es donde podemos ver la transición de nuestra transacción desde un estado pendiente a un estado acuñado (si tiene éxito) o a un estado descartado si no tiene éxito. Asegúrese de conservarlo en «Todos» para reflejar las transacciones «acuñadas», «pendientes» y «descartadas». También puede buscar su transacción por transacciones enviadas a la dirección `0x31b98d14007bdee637298086988a0bbd31184523` .

Para ver los detalles de su transacción una vez que la haya encontrado, seleccione el hash de tx, que debería llevarle a una pantalla parecida a esta:

![Captura de pantalla de la Zona de espera](./mempool.png)

Aquí puede ver su transacción en Etherscan pulsando el icono dentro de un círculo rojo.

**¡Enhorabuena! Acabas de realizar tu primera transacción en Ethereum con Alchemy 🎉**

_Si desea ver comentarios y sugerencias sobre esta guía, envíe un mensaje a Elan en el canal [Discord](https://discord.gg/A39JVCM) de Alchemy._

_Publicado originalmente en [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy)_
