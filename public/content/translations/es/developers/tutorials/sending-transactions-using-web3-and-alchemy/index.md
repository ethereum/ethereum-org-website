---
title: Enviar transacciones usando Web3
description: "Esta es una guía para principiantes sobre cómo enviar transacciones de Ethereum usando Web3. Hay tres pasos principales para enviar una transacción a la cadena de bloques de Ethereum: crear, firmar y transmitir. Repasaremos los tres."
author: "Elan Halpern"
tags: ["transacciones", "web3.js", "alchemy"]
skill: beginner
breadcrumb: Enviar transacciones
lang: es
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

Esta es una guía para principiantes sobre cómo enviar transacciones de Ethereum usando Web3. Hay tres pasos principales para enviar una transacción a la cadena de bloques de Ethereum: crear, firmar y transmitir. Repasaremos los tres, ¡esperando responder cualquier pregunta que puedas tener! En este tutorial, usaremos [Alchemy](https://www.alchemy.com/) para enviar nuestras transacciones a la cadena de Ethereum. Puedes [crear una cuenta gratuita de Alchemy aquí](https://auth.alchemyapi.io/signup).

**NOTA:** Esta guía es para firmar tus transacciones en el _backend_ de tu aplicación. Si deseas integrar la firma de tus transacciones en el frontend, consulta cómo integrar [Web3 con un proveedor de navegador](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider).

## Conceptos básicos {#the-basics}

Al igual que la mayoría de los desarrolladores de cadenas de bloques cuando empiezan, es posible que hayas investigado cómo enviar una transacción (algo que debería ser bastante simple) y te hayas topado con una gran cantidad de guías, cada una diciendo cosas diferentes y dejándote un poco abrumado y confundido. Si estás en esa situación, no te preocupes; ¡todos lo estuvimos en algún momento! Así que, antes de empezar, aclaremos algunas cosas:

### 1\. Alchemy no almacena tus claves privadas {#alchemy-does-not-store-your-private-keys}

- Esto significa que Alchemy no puede firmar ni enviar transacciones en tu nombre. El motivo de esto es por fines de seguridad. Alchemy nunca te pedirá que compartas tu clave privada, y nunca debes compartir tu clave privada con un nodo alojado (ni con nadie, en realidad).
- Puedes leer de la cadena de bloques usando la API principal de Alchemy, pero para escribir en ella necesitarás usar algo más para firmar tus transacciones antes de enviarlas a través de Alchemy (esto es igual para cualquier otro [servicio de nodo](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2\. ¿Qué es un "firmante" (signer)? {#what-is-a-signer}

- Los firmantes firmarán transacciones por ti usando tu clave privada. En este tutorial usaremos [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) para firmar nuestra transacción, pero también podrías usar cualquier otra biblioteca Web3.
- En el frontend, un buen ejemplo de un firmante sería [MetaMask](https://metamask.io/), que firmará y enviará transacciones en tu nombre.

### 3\. ¿Por qué necesito firmar mis transacciones? {#why-do-i-need-to-sign-my-transactions}

- Cada usuario que quiera enviar una transacción en la red Ethereum debe firmar la transacción (usando su clave privada), para validar que el origen de la transacción es quien dice ser.
- Es súper importante proteger esta clave privada, ya que tener acceso a ella otorga control total sobre tu cuenta de Ethereum, permitiéndote (o a cualquiera con acceso) realizar transacciones en tu nombre.

### 4\. ¿Cómo protejo mi clave privada? {#how-do-i-protect-my-private-key}

- Hay muchas formas de proteger tu clave privada y usarla para enviar transacciones. En este tutorial usaremos un archivo `.env`. Sin embargo, también podrías usar un proveedor independiente que almacene claves privadas, usar un archivo de almacén de claves (keystore), u otras opciones.

### 5\. ¿Cuál es la diferencia entre `eth_sendTransaction` y `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` y `eth_sendRawTransaction` son funciones de la API de Ethereum que transmiten una transacción a la red Ethereum para que se agregue a un bloque futuro. Difieren en cómo manejan la firma de las transacciones.

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) se usa para enviar transacciones _no firmadas_, lo que significa que el nodo al que estás enviando debe administrar tu clave privada para que pueda firmar la transacción antes de transmitirla a la cadena. Dado que Alchemy no guarda las claves privadas de los usuarios, no admiten este método.
- [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) se usa para transmitir transacciones que ya han sido firmadas. Esto significa que primero tienes que usar [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction), y luego pasar el resultado a `eth_sendRawTransaction`.

Al usar Web3, se accede a `eth_sendRawTransaction` llamando a la función [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction).

Esto es lo que usaremos en este tutorial.

### 6\. ¿Qué es la biblioteca Web3? {#what-is-the-web3-library}

- Web3.js es una biblioteca envolvente (wrapper) alrededor de las llamadas estándar JSON-RPC que es bastante común de usar en el desarrollo de Ethereum.
- Hay muchas bibliotecas Web3 para diferentes lenguajes. En este tutorial usaremos [Alchemy Web3](https://docs.alchemy.com/reference/api-overview) que está escrita en JavaScript. Puedes consultar otras opciones [aquí](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) como [Ethers.js](https://docs.ethers.org/v5/).

Bien, ahora que hemos aclarado algunas de estas preguntas, pasemos al tutorial. ¡Siéntete libre de hacer preguntas en cualquier momento en el [Discord](https://discord.gg/gWuC7zB) de Alchemy!

### 7\. ¿Cómo enviar transacciones seguras, privadas y con gas optimizado? {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy tiene un conjunto de API de transacciones](https://docs.alchemy.com/reference/transact-api-quickstart). Puedes usarlas para enviar transacciones reforzadas, simular transacciones antes de que ocurran, enviar transacciones privadas y enviar transacciones con gas optimizado.
- También puedes usar la [API de notificaciones (Notify API)](https://docs.alchemy.com/docs/alchemy-notify) para recibir alertas cuando tu transacción se extraiga de la mempool y se agregue a la cadena.

**NOTA:** Esta guía requiere una cuenta de Alchemy, una dirección de Ethereum o una billetera de MetaMask, NodeJs y npm instalados. Si no los tienes, sigue estos pasos:

1.  [Crea una cuenta gratuita de Alchemy](https://auth.alchemyapi.io/signup)
2.  [Crea una cuenta de MetaMask](https://metamask.io/) (o consigue una dirección de Ethereum)
3.  [Sigue estos pasos para instalar NodeJs y NPM](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## Pasos para enviar tu transacción {#steps-to-sending-your-transaction}

### 1\. Crea una aplicación de Alchemy en la red de prueba Sepolia {#create-an-alchemy-app-on-the-sepolia-testnet}

Navega a tu [Panel de control de Alchemy](https://dashboard.alchemyapi.io/) y crea una nueva aplicación, eligiendo Sepolia (o cualquier otra red de prueba) para tu red.

### 2\. Solicita ETH del faucet de Sepolia {#request-eth-from-sepolia-faucet}

Sigue las instrucciones en el [faucet de Sepolia de Alchemy](https://www.sepoliafaucet.com/) para recibir ETH. Asegúrate de incluir tu dirección de Ethereum de **Sepolia** (desde MetaMask) y no de otra red. Después de seguir las instrucciones, verifica que hayas recibido el ETH en tu billetera.

### 3\. Crea un nuevo directorio de proyecto y entra en él con `cd` {#create-a-new-project-direction}

Crea un nuevo directorio de proyecto desde la línea de comandos (terminal para Mac) y navega hacia él:

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Instala Alchemy Web3 (o cualquier biblioteca Web3) {#install-alchemy-web3}

Ejecuta el siguiente comando en el directorio de tu proyecto para instalar [Alchemy Web3](https://docs.alchemy.com/reference/api-overview):

Ten en cuenta que, si deseas usar la biblioteca Ethers.js, [sigue las instrucciones aquí](https://docs.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```
npm install @alch/alchemy-web3
```

### 5\. Instala dotenv {#install-dotenv}

Usaremos un archivo `.env` para almacenar de forma segura nuestra clave API y clave privada.

```
npm install dotenv --save
```

### 6\. Crea el archivo `.env` {#create-the-dotenv-file}

Crea un archivo `.env` en el directorio de tu proyecto y agrega lo siguiente (reemplazando “`your-api-url`" y "`your-private-key`")

- Para encontrar la URL de tu API de Alchemy, navega a la página de detalles de la aplicación que acabas de crear en tu panel de control, haz clic en “View Key” (Ver clave) en la esquina superior derecha y copia la URL HTTP.
- Para encontrar tu clave privada usando MetaMask, consulta esta [guía](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
¡No hagas commit de <code>.env</code>! Asegúrate de nunca compartir ni exponer tu archivo <code>.env</code> con nadie, ya que al hacerlo estás comprometiendo tus secretos. Si estás usando control de versiones, agrega tu <code>.env</code> a un archivo <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

### 7\. Crea el archivo `sendTx.js` {#create-sendtx-js}

Genial, ahora que tenemos nuestros datos confidenciales protegidos en un archivo `.env`, comencemos a programar. Para nuestro ejemplo de envío de transacción, enviaremos ETH de vuelta al faucet de Sepolia.

Crea un archivo `sendTx.js`, que es donde configuraremos y enviaremos nuestra transacción de ejemplo, y agrégale las siguientes líneas de código:

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: reemplaza esta dirección con tu propia dirección pública

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // el nonce empieza a contar desde 0

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // dirección del faucet para devolver eth
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // campo de datos opcional para enviar un mensaje o ejecutar un contrato inteligente
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 El hash de tu transacción es: ", hash, "\n ¡Revisa la mempool de Alchemy para ver el estado de tu transacción!");
    } else {
      console.log("❗Algo salió mal al enviar tu transacción:", error)
    }
   });
}

main();
```

Asegúrate de reemplazar la dirección en la **línea 6** con tu propia dirección pública.

Ahora, antes de pasar a ejecutar este código, hablemos sobre algunos de los componentes aquí.

- `nonce` : La especificación del nonce se usa para llevar un registro del número de transacciones enviadas desde tu dirección. Necesitamos esto por motivos de seguridad y para prevenir [ataques de repetición (replay attacks)](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Para obtener el número de transacciones enviadas desde tu dirección usamos [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).
- `transaction`: El objeto de la transacción tiene algunos aspectos que necesitamos especificar
  - `to`: Esta es la dirección a la que queremos enviar ETH. En este caso, estamos enviando ETH de vuelta al [faucet de Sepolia](https://sepoliafaucet.com/) al que le solicitamos inicialmente.
  - `value`: Esta es la cantidad que deseamos enviar, especificada en Wei, donde 10^18 Wei = 1 ETH
  - `gas`: Hay muchas formas de determinar la cantidad correcta de gas a incluir con tu transacción. Alchemy incluso tiene un [webhook de precio del gas](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1) para notificarte cuando el precio del gas cae dentro de un cierto umbral. Para transacciones en la Red principal, es una buena práctica consultar un estimador de gas como [ETH Gas Station](https://ethgasstation.info/) para determinar la cantidad correcta de gas a incluir. 21000 es la cantidad mínima de gas que usará una operación en Ethereum, así que para asegurar que nuestra transacción se ejecute, ponemos 30000 aquí.
  - `nonce`: consulta la definición de nonce anterior. El nonce empieza a contar desde cero.
  - [OPCIONAL] data: Se usa para enviar información adicional con tu transferencia, o para llamar a un contrato inteligente, no es necesario para transferencias de saldo, consulta la nota a continuación.
- `signedTx`: Para firmar nuestro objeto de transacción usaremos el método `signTransaction` con nuestra `PRIVATE_KEY`
- `sendSignedTransaction`: Una vez que tenemos una transacción firmada, podemos enviarla para que se incluya en un bloque posterior usando `sendSignedTransaction`

**Una nota sobre los datos (data)**
Hay dos tipos principales de transacciones que se pueden enviar en Ethereum.

- Transferencia de saldo: Enviar ETH de una dirección a otra. No se requiere el campo de datos, sin embargo, si deseas enviar información adicional junto con tu transacción, puedes incluir esa información en formato HEX en este campo.
  - Por ejemplo, digamos que queremos escribir el hash de un documento de IPFS en la cadena de Ethereum para darle una marca de tiempo inmutable. Nuestro campo de datos debería verse como data: `web3.utils.toHex(‘IPFS hash‘)`. Y ahora cualquiera puede consultar la cadena y ver cuándo se agregó ese documento.
- Transacción de contrato inteligente: Ejecutar algún código de contrato inteligente en la cadena. En este caso, el campo de datos debe contener la función inteligente que deseas ejecutar, junto con cualquier parámetro.
  - Para un ejemplo práctico, consulta el Paso 8 en este [Tutorial de Hola Mundo](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction).

### 8\. Ejecuta el código usando `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Navega de vuelta a tu terminal o línea de comandos y ejecuta:

```
node sendTx.js
```

### 9\. Ve tu transacción en la mempool {#see-your-transaction-in-the-mempool}

Abre la [página de Mempool](https://dashboard.alchemyapi.io/mempool) en tu panel de control de Alchemy y filtra por la aplicación que creaste para encontrar tu transacción. Aquí es donde podemos ver la transición de nuestra transacción del estado pendiente al estado minado (si tiene éxito) o al estado descartado (dropped) si no tiene éxito. Asegúrate de mantenerlo en “All” (Todos) para que captures las transacciones “mined” (minadas), “pending” (pendientes) y “dropped” (descartadas). También puedes buscar tu transacción buscando las transacciones enviadas a la dirección `0x31b98d14007bdee637298086988a0bbd31184523` .

Para ver los detalles de tu transacción una vez que la hayas encontrado, selecciona el hash de la transacción (tx hash), lo que debería llevarte a una vista que se ve así:

![Mempool watcher screenshot](./mempool.png)

¡Desde allí puedes ver tu transacción en Etherscan haciendo clic en el icono marcado en rojo!

**¡Yupi! Acabas de enviar tu primera transacción de Ethereum usando Alchemy 🎉**

_Para comentarios y sugerencias sobre esta guía, ¡envía un mensaje a Elan en el [Discord](https://discord.gg/A39JVCM) de Alchemy!_

_Publicado originalmente en [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy)_