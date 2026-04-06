---
title: "Envío de transacciones con Web3"
description: "Esta es una guía para principiantes sobre cómo enviar transacciones de Ethereum con Web3. Hay tres pasos principales para enviar una transacción a la blockchain de Ethereum: crear, firmar y transmitir. Repasaremos los tres."
author: "Elan Halpern"
tags: [ "transacciones", "web3.js", "Alchemy" ]
skill: beginner
breadcrumb: "Enviar transacciones"
lang: es
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://docs.alchemy.com/alchemy/tutorials/sending-txs
---

Esta es una guía para principiantes sobre cómo enviar transacciones de Ethereum con Web3. Hay tres pasos principales para enviar una transacción a la blockchain de Ethereum: crear, firmar y transmitir. Repasaremos los tres, ¡esperamos responder cualquier pregunta que pueda tener! En este tutorial, usaremos [Alchemy](https://www.alchemy.com/) para enviar nuestras transacciones a la cadena de Ethereum. Puede [crear una cuenta gratuita de Alchemy aquí](https://auth.alchemyapi.io/signup).

**NOTA:** Esta guía es para firmar sus transacciones en el _backend_ de su aplicación. Si desea integrar la firma de sus transacciones en el frontend, consulte la integración de [Web3 con un proveedor de navegador](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider).

## Conceptos básicos {#the-basics}

Como la mayoría de los desarrolladores de blockchain al empezar, puede que haya investigado cómo enviar una transacción (algo que debería ser bastante sencillo) y se haya encontrado con un montón de guías, cada una diciendo cosas diferentes, dejándolo un poco abrumado y confundido. Si se encuentra en esa situación, no se preocupe, ¡todos hemos pasado por eso en algún momento! Así que, antes de empezar, aclaremos algunas cosas:

### 1. Alchemy no almacena sus claves privadas {#alchemy-does-not-store-your-private-keys}

- Esto significa que Alchemy no puede firmar ni enviar transacciones en su nombre. Esto se debe a razones de seguridad. Alchemy nunca le pedirá que comparta su clave privada, y usted nunca debería compartir su clave privada con un nodo alojado (ni con nadie).
- Puede leer de la blockchain con la API principal de Alchemy, pero para escribir en ella necesitará usar otra cosa para firmar sus transacciones antes de enviarlas a través de Alchemy (esto es igual para cualquier otro [servicio de nodo](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2. ¿Qué es un «firmante»? {#what-is-a-signer}

- Los firmantes firmarán las transacciones por usted utilizando su clave privada. En este tutorial usaremos [Alchemy web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) para firmar nuestra transacción, pero también podría usar cualquier otra biblioteca de web3.
- En el frontend, un buen ejemplo de un firmante sería [MetaMask](https://metamask.io/), que firmará y enviará las transacciones en su nombre.

### 3. ¿Por qué necesito firmar mis transacciones? {#why-do-i-need-to-sign-my-transactions}

- Cada usuario que quiera enviar una transacción en la red Ethereum debe firmar la transacción (usando su clave privada), para validar que el origen de la transacción es quien dice ser.
- Es muy importante proteger esta clave privada, ya que tener acceso a ella le otorga el control total sobre su cuenta de Ethereum, lo que le permite a usted (o a cualquiera con acceso) realizar transacciones en su nombre.

### 4. ¿Cómo protejo mi clave privada? {#how-do-i-protect-my-private-key}

- Existen muchas maneras de proteger su clave privada y usarla para enviar transacciones. En este tutorial utilizaremos un archivo `.env`. Sin embargo, también podría usar un proveedor independiente que almacene claves privadas, usar un archivo de almacén de claves, u otras opciones.

### 5. ¿Cuál es la diferencia entre `eth_sendTransaction` y `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` y `eth_sendRawTransaction` son dos funciones de la API de Ethereum que transmiten una transacción a la red Ethereum para que sea añadida a un bloque futuro. Se diferencian en la forma en que gestionan la firma de las transacciones.

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) se utiliza para enviar transacciones _sin firmar_, lo que significa que el nodo al que las envía debe gestionar su clave privada para poder firmar la transacción antes de transmitirla a la cadena. Dado que Alchemy no guarda las claves privadas de los usuarios, no soporta este método.
- [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) se utiliza para transmitir transacciones que ya han sido firmadas. Esto significa que primero tiene que usar [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction), y luego pasar el resultado a `eth_sendRawTransaction`.

Cuando se usa web3, se accede a `eth_sendRawTransaction` llamando a la función [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction).

Esto es lo que usaremos en este tutorial.

### 6. ¿Qué es la biblioteca web3? {#what-is-the-web3-library}

- Web3.js es una biblioteca contenedora (wrapper) de las llamadas JSON-RPC estándar que es bastante común usar en el desarrollo de Ethereum.
- Hay muchas bibliotecas web3 para diferentes lenguajes. En este tutorial, usaremos [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), que está escrito en JavaScript. Puede consultar otras opciones [aquí](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) como [ethers.js](https://docs.ethers.org/v5/).

Bien, ahora que hemos aclarado algunas de estas preguntas, pasemos al tutorial. ¡No dude en hacer preguntas en cualquier momento en el [Discord](https://discord.gg/gWuC7zB) de Alchemy!

### 7. ¿Cómo enviar transacciones seguras, privadas y con optimización del gas? {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy tiene un conjunto de API de Transact](https://docs.alchemy.com/reference/transact-api-quickstart). Puede usarlas para enviar transacciones reforzadas, simular transacciones antes de que ocurran, enviar transacciones privadas y enviar transacciones con optimización de gas
- También puede usar la [API Notify](https://docs.alchemy.com/docs/alchemy-notify) para recibir una alerta cuando su transacción se extraiga del mempool y se añada a la cadena

**NOTA:** Esta guía requiere una cuenta de Alchemy, una dirección de Ethereum o una billetera de MetaMask, y tener NodeJs y npm instalados. Si no es así, siga estos pasos:

1. [Crear una cuenta gratuita de Alchemy](https://auth.alchemyapi.io/signup)
2. [Crear una cuenta de MetaMask](https://metamask.io/) (u obtener una dirección de Ethereum)
3. [Siga estos pasos para instalar NodeJs y NPM](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## Pasos para enviar su transacción {#steps-to-sending-your-transaction}

### 1. Crear una aplicación de Alchemy en la red de prueba Sepolia {#create-an-alchemy-app-on-the-sepolia-testnet}

Vaya a su [Panel de control de Alchemy](https://dashboard.alchemyapi.io/) y cree una nueva aplicación, eligiendo Sepolia (o cualquier otra red de prueba) para su red.

### 2. Solicitar ETH del faucet de Sepolia {#request-eth-from-sepolia-faucet}

Siga las instrucciones en el [faucet de Sepolia de Alchemy](https://www.sepoliafaucet.com/) para recibir ETH. Asegúrese de incluir su dirección de Ethereum de **Sepolia** (de MetaMask) y no la de otra red. Después de seguir las instrucciones, verifique que ha recibido los ETH en su billetera.

### 3. Crear un nuevo directorio de proyecto y entrar en él con `cd` {#create-a-new-project-direction}

Cree un nuevo directorio de proyecto desde la línea de comandos (terminal para Mac) y navegue hasta él:

```
mkdir sendtx-example
cd sendtx-example
```

### 4. Instalar Alchemy Web3 (o cualquier biblioteca web3) {#install-alchemy-web3}

Ejecute el siguiente comando en su directorio de proyecto para instalar [Alchemy Web3](https://docs.alchemy.com/reference/api-overview):

Nota: si desea usar la biblioteca ethers.js, [siga las instrucciones aquí](https://docs.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```
npm install @alch/alchemy-web3
```

### 5. Instalar dotenv {#install-dotenv}

Usaremos un archivo `.env` para almacenar de forma segura nuestra clave de API y nuestra clave privada.

```
npm install dotenv --save
```

### 6. Crear el archivo `.env` {#create-the-dotenv-file}

Cree un archivo `.env` en su directorio de proyecto y añada lo siguiente (reemplazando «`your-api-url`» y «`your-private-key`»)

- Para encontrar su URL de la API de Alchemy, vaya a la página de detalles de la aplicación que acaba de crear en su panel de control, haga clic en «View Key» (Ver clave) en la esquina superior derecha y copie la URL HTTP.
- Para encontrar su clave privada usando MetaMask, consulte esta [guía](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).

```
API_URL = "su-url-de-api"
PRIVATE_KEY = "su-clave-privada"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
¡No haga commit de <code>.env</code>! Por favor, asegúrese de no compartir ni exponer nunca su archivo <code>.env</code> a nadie, ya que al hacerlo estaría comprometiendo sus secretos. Si está usando un sistema de control de versiones, añada su <code>.env</code> a un archivo <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

### 7. Crear el archivo `sendTx.js` {#create-sendtx-js}

Genial, ahora que tenemos nuestros datos sensibles protegidos en un archivo `.env`, empecemos a programar. Para nuestro ejemplo de envío de transacción, enviaremos ETH de vuelta al faucet de Sepolia.

Cree un archivo `sendTx.js`, que es donde configuraremos y enviaremos nuestra transacción de ejemplo, y añádale las siguientes líneas de código:

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: reemplace esta dirección con su propia dirección pública

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // el nonce empieza a contar desde 0

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // dirección del faucet para devolver ETH
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // campo de datos opcional para enviar un mensaje o ejecutar un contrato inteligente
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 El hash de su transacción es: ", hash, "\n ¡Revise el Mempool de Alchemy para ver el estado de su transacción!");
    } else {
      console.log("❗Algo salió mal al enviar su transacción:", error)
    }
   });
}

main();
```

Asegúrese de reemplazar la dirección de la **línea 6** por su propia dirección pública.

Ahora, antes de ejecutar este código, hablemos de algunos de sus componentes.

- `nonce`: La especificación del nonce se utiliza para hacer un seguimiento del número de transacciones enviadas desde su dirección. Lo necesitamos por motivos de seguridad y para prevenir [ataques de repetición](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Para obtener el número de transacciones enviadas desde su dirección, usamos [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).
- `transaction`: El objeto de la transacción tiene algunos aspectos que debemos especificar
  - `to`: Esta es la dirección a la que queremos enviar ETH. En este caso, vamos a devolver ETH al [faucet de Sepolia](https://sepoliafaucet.com/) del que lo solicitamos inicialmente.
  - `value`: Esta es la cantidad que deseamos enviar, especificada en wei, donde 10^18 wei = 1 ETH
  - `gas`: Hay many maneras de determinar la cantidad correcta de gas a incluir en su transacción. Alchemy incluso tiene un [webhook de precios de gas](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1) para notificarle cuando el precio del gas cae por debajo de un cierto umbral. Para las transacciones de la red principal, es una buena práctica consultar un estimador de gas como [ETH Gas Station](https://ethgasstation.info/) para determinar la cantidad correcta de gas que se debe incluir. 21000 es la cantidad mínima de gas que usará una operación en Ethereum, así que para asegurar que nuestra transacción se ejecute, ponemos 30000 aquí.
  - `nonce`: consulte la definición de nonce anterior. El nonce empieza a contar desde cero.
  - [OPCIONAL] data: Se usa para enviar información adicional con su transferencia o para llamar a un contrato inteligente; no es necesario para transferencias de saldo. Consulte la nota a continuación.
- `signedTx`: Para firmar nuestro objeto de transacción usaremos el método `signTransaction` con nuestra `PRIVATE_KEY`
- `sendSignedTransaction`: Una vez que tengamos una transacción firmada, podemos enviarla para que se incluya en un bloque posterior usando `sendSignedTransaction`

**Nota sobre los datos**
Hay dos tipos principales de transacciones que se pueden enviar en Ethereum.

- Transferencia de saldo: Enviar ETH de una dirección a otra. No se requiere el campo de datos; sin embargo, si desea enviar información adicional junto con su transacción, puede incluir esa información en formato HEX en este campo.
  - Por ejemplo, digamos que quisiéramos escribir el hash de un documento IPFS en la cadena de Ethereum para darle una marca de tiempo inmutable. Nuestro campo de datos debería verse así: data: `web3.utils.toHex('hash IPFS')`. Y ahora cualquiera puede consultar la cadena y ver cuándo se añadió ese documento.
- Transacción de contrato inteligente: Ejecutar código de un contrato inteligente en la cadena. En este caso, el campo de datos debe contener la función inteligente que desea ejecutar, junto con los parámetros.
  - Para un ejemplo práctico, consulte el paso 8 en este [Tutorial de «Hola, mundo»](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction).

### 8. Ejecute el código usando `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Vuelva a su terminal o línea de comandos y ejecute:

```
node sendTx.js
```

### 9. Ver su transacción en el Mempool {#see-your-transaction-in-the-mempool}

Abra la [página de Mempool](https://dashboard.alchemyapi.io/mempool) en su panel de Alchemy y filtre por la aplicación que creó para encontrar su transacción. Aquí es donde podemos ver la transición de nuestra transacción de un estado pendiente a un estado minado (si tiene éxito) o a un estado descartado si no lo tiene. Asegúrese de mantenerlo en «All» (Todos) para que capture las transacciones «mined» (minadas), «pending» (pendientes) y «dropped» (descartadas). También puede buscar su transacción buscando las transacciones enviadas a la dirección `0x31b98d14007bdee637298086988a0bbd31184523`.

Para ver los detalles de su transacción una vez que la haya encontrado, seleccione el hash de la transacción, que debería llevarle a una vista como esta:

![Captura de pantalla del visor de Mempool](./mempool.png)

Desde ahí, puede ver su transacción en Etherscan haciendo clic en el icono rodeado en rojo.

**¡Yupi!** Acaba de enviar su primera transacción de Ethereum con Alchemy 🎉\*\*

_Para enviar comentarios y sugerencias sobre esta guía, envíe un mensaje a Elan en el [Discord](https://discord.gg/A39JVCM) de Alchemy._

_Publicado originalmente en [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy)_
