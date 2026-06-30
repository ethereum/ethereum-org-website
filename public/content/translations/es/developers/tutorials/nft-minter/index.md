---
title: "Tutorial de acuñador de NFT"
description: "En este tutorial, construirás un acuñador de NFT y aprenderás a crear una aplicación descentralizada (dapp) full stack conectando tu contrato inteligente a un frontend en React usando MetaMask y herramientas Web3."
author: "smudgil"
tags: ["Solidity", "NFT", "Alchemy", "contratos inteligentes", "frontend", "Pinata", "erc-721"]
skill: intermediate
breadcrumb: "Dapp acuñadora de NFT"
lang: es
published: 2021-10-06
---

Uno de los mayores desafíos para los desarrolladores que provienen de un entorno Web2 es descubrir cómo conectar su contrato inteligente a un proyecto frontend e interactuar con él.

Al construir un acuñador de NFT (una interfaz de usuario sencilla donde puedes ingresar un enlace a tu activo digital, un título y una descripción), aprenderás a:

- Conectarte a MetaMask a través de tu proyecto frontend
- Llamar a métodos de contratos inteligentes desde tu frontend
- Firmar transacciones usando MetaMask

En este tutorial, usaremos [React](https://react.dev/) como nuestro framework frontend. Debido a que este tutorial se centra principalmente en el desarrollo Web3, no pasaremos mucho tiempo desglosando los fundamentos de React. En su lugar, nos centraremos en aportar funcionalidad a nuestro proyecto.

Como requisito previo, debes tener un nivel básico de comprensión de React: saber cómo funcionan los componentes, las props, useState/useEffect y las llamadas a funciones básicas. Si nunca antes has oído hablar de ninguno de estos términos, es posible que desees consultar este [tutorial de introducción a React](https://react.dev/learn/tutorial-tic-tac-toe). Para los estudiantes más visuales, recomendamos encarecidamente esta excelente serie de videos [Full Modern React Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) de Net Ninja.

Y si aún no lo has hecho, definitivamente necesitarás una cuenta de Alchemy para completar este tutorial, así como para construir cualquier cosa en la cadena de bloques. Regístrate para obtener una cuenta gratuita [aquí](https://alchemy.com/).

Sin más preámbulos, ¡comencemos!

## Creación de NFT 101 {#making-nfts-101}

Antes de empezar a ver cualquier código, es importante entender cómo funciona la creación de un NFT. Implica dos pasos:

### Publicar un contrato inteligente de NFT en la cadena de bloques de Ethereum {#publish-nft}

La mayor diferencia entre los dos estándares de contratos inteligentes de NFT es que ERC-1155 es un estándar multitoken e incluye funcionalidad por lotes, mientras que ERC-721 es un estándar de un solo token y, por lo tanto, solo admite la transferencia de un token a la vez.

### Llamar a la función de acuñación

Por lo general, esta función de acuñación requiere que pases dos variables como parámetros: primero el `recipient`, que especifica la dirección que recibirá tu NFT recién acuñado, y segundo el `tokenURI` del NFT, una cadena que se resuelve en un documento JSON que describe los metadatos del NFT.

Los metadatos de un NFT son realmente lo que le da vida, permitiéndole tener propiedades, como un nombre, descripción, imagen (o un activo digital diferente) y otros atributos. Aquí tienes [un ejemplo de un tokenURI](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2), que contiene los metadatos de un NFT.

En este tutorial, nos centraremos en la parte 2: llamar a una función de acuñación de un contrato inteligente de NFT utilizando nuestra interfaz de usuario de React.

Necesitarás un contrato inteligente de NFT ERC-721 desplegado en una red de prueba compatible, como Sepolia. Si deseas desplegar uno tú mismo, te recomendamos la guía de Alchemy sobre [cómo desplegar un contrato inteligente en Sepolia](https://www.alchemy.com/docs/how-to-deploy-a-smart-contract-to-the-sepolia-testnet).

Genial, ahora que entendemos cómo funciona la creación de un NFT, ¡clonemos nuestros archivos de inicio!
## Clonar los archivos de inicio {#clone-the-starter-files}

Primero, ve al [repositorio de GitHub nft-minter-tutorial](https://github.com/alchemyplatform/nft-minter-tutorial) para obtener los archivos de inicio de este proyecto. Clona este repositorio en tu entorno local.

Cuando abras este repositorio `nft-minter-tutorial` clonado, notarás que contiene dos carpetas: `minter-starter-files` y `nft-minter`.

- `minter-starter-files` contiene los archivos de inicio (esencialmente la interfaz de usuario de React) para este proyecto. En este tutorial, **trabajaremos en este directorio**, a medida que aprendes a darle vida a esta interfaz de usuario conectándola a tu billetera de Ethereum y a un contrato inteligente de NFT.
- `nft-minter` contiene todo el tutorial completado y está ahí para ti como **referencia** **si te quedas atascado.**

A continuación, abre tu copia de `minter-starter-files` en tu editor de código y luego navega hasta tu carpeta `src`.

Todo el código que escribiremos vivirá en la carpeta `src`. Editaremos el componente `Minter.js` y escribiremos archivos JavaScript adicionales para darle a nuestro proyecto funcionalidad Web3.

## Paso 2: Revisa nuestros archivos de inicio {#step-2-check-out-our-starter-files}

Antes de empezar a programar, es importante revisar lo que ya se nos proporciona en los archivos de inicio.

### Pon en marcha tu proyecto de React {#get-your-react-project-running}

Comencemos ejecutando el proyecto de React en nuestro navegador. La belleza de React es que una vez que tenemos nuestro proyecto ejecutándose en nuestro navegador, cualquier cambio que guardemos se actualizará en vivo en nuestro navegador.

Para poner en marcha el proyecto, navega hasta el directorio raíz de la carpeta `minter-starter-files` y ejecuta `npm install` en tu terminal para instalar las dependencias del proyecto:

```bash
cd minter-starter-files
npm install
```

Una vez que hayan terminado de instalarse, ejecuta `npm start` en tu terminal:

```bash
npm start
```

Al hacerlo, debería abrirse http://localhost:3000/ en tu navegador, donde verás el frontend de nuestro proyecto. Debería constar de 3 campos: un lugar para ingresar un enlace al activo de tu NFT, ingresar el nombre de tu NFT y proporcionar una descripción.

Si intentas hacer clic en los botones "Connect Wallet" (Conectar billetera) o "Mint NFT" (Acuñar NFT), notarás que no funcionan; ¡eso es porque todavía necesitamos programar su funcionalidad! :\)

### El componente Minter.js {#minter-js}

**NOTA:** ¡Asegúrate de estar en la carpeta `minter-starter-files` y no en la carpeta `nft-minter`!

Volvamos a la carpeta `src` en nuestro editor y abramos el archivo `Minter.js`. Es súper importante que entendamos todo en este archivo, ya que es el componente principal de React en el que trabajaremos.

En la parte superior de este archivo, tenemos nuestras variables de estado que actualizaremos después de eventos específicos.

```javascript
//Variables de estado
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

¿Nunca has oído hablar de las variables de estado o los hooks de estado de React? Consulta [esta](https://legacy.reactjs.org/docs/hooks-state.html) documentación.

Esto es lo que representa cada una de las variables:

- `walletAddress` - una cadena que almacena la dirección de la billetera del usuario
- `status` - una cadena que contiene un mensaje para mostrar en la parte inferior de la interfaz de usuario
- `name` - una cadena que almacena el nombre del NFT
- `description` - una cadena que almacena la descripción del NFT
- `url` - una cadena que es un enlace al activo digital del NFT

Después de las variables de estado, verás tres funciones no implementadas: `useEffect`, `connectWalletPressed` y `onMintPressed`. Notarás que todas estas funciones son `async`, ¡eso es porque haremos llamadas asíncronas a la API en ellas! Sus nombres son epónimos con sus funcionalidades:

```javascript
useEffect(async () => {
  //TODO: implementararar
}, [])

const connectWalletPressed = async () => {
  //TODO: implement
}

const onMintPressed = async () => {
  //TODO: implement
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - este es un hook de React que se llama después de que se renderiza tu componente. Debido a que se le pasa una prop de matriz vacía `[]` (ver línea 3), solo se llamará en el _primer_ renderizado del componente. Aquí llamaremos a nuestro oyente de billetera y a otra función de billetera para actualizar nuestra interfaz de usuario y reflejar si ya hay una billetera conectada.
- `connectWalletPressed` - esta función se llamará para conectar la billetera MetaMask del usuario a nuestra dapp.
- `onMintPressed` - esta función se llamará para acuñar el NFT del usuario.

Cerca del final de este archivo, tenemos la interfaz de usuario de nuestro componente. Si escaneas este código cuidadosamente, notarás que actualizamos nuestras variables de estado `url`, `name` y `description` cuando cambia la entrada en sus campos de texto correspondientes.

También verás que `connectWalletPressed` y `onMintPressed` se llaman cuando se hace clic en los botones con los ID `mintButton` y `walletButton` respectivamente.

```javascript
//la interfaz de usuario de nuestro componente
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
    <p>
      Simply add your asset's link, name, and description, then press "Mint."
    </p>
    <form>
      <h2>🖼 Link to asset: </h2>
      <input
        type="text"
        placeholder="e.g., https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Name: </h2>
      <input
        type="text"
        placeholder="e.g., My first NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Description: </h2>
      <input
        type="text"
        placeholder="e.g., Even cooler than cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Mint NFT
    </button>
    <p id="status">{status}</p>
 
</div>
)
```

Finalmente, abordemos dónde se agrega este componente Minter.

Si vas al archivo `App.js`, que es el componente principal en React que actúa como contenedor para todos los demás componentes, verás que nuestro componente Minter se inyecta en la línea 7.

**En este tutorial, solo editaremos el `Minter.js file` y agregaremos archivos en nuestra carpeta `src`.**

Ahora que entendemos con qué estamos trabajando, ¡configuremos nuestra billetera de Ethereum!

## Configura tu billetera de Ethereum {#set-up-your-ethereum-wallet}

Para que los usuarios puedan interactuar con tu contrato inteligente, deberán conectar su billetera de Ethereum a tu dapp.

### Descargar MetaMask

Para este tutorial, usaremos MetaMask, una billetera virtual en el navegador que se usa para administrar la dirección de tu cuenta de Ethereum. Si deseas comprender más sobre cómo funcionan las transacciones en Ethereum, consulta [esta página](/developers/docs/transactions/).

Puedes descargar y crear una cuenta de MetaMask de forma gratuita [aquí](https://metamask.io/download). Cuando estés creando una cuenta, o si ya tienes una, asegúrate de cambiar a una red de prueba compatible como Sepolia \(para que no estemos lidiando con dinero real\).
### Agrega ether desde un faucet

Para acuñar nuestros NFT (o firmar cualquier transacción en la cadena de bloques de Ethereum), necesitaremos algo de ETH falso. Para obtener ETH de la red de prueba, usa un faucet mantenido como el [faucet de Sepolia de Alchemy](https://www.alchemy.com/faucets/ethereum-sepolia) e ingresa la dirección de tu cuenta de Sepolia. ¡Deberías ver ETH en tu cuenta de MetaMask poco después!
### Comprueba tu saldo

Para comprobar que nuestro saldo está ahí, hagamos una solicitud [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) usando [la herramienta sandbox de Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Esto devolverá la cantidad de ETH en nuestra billetera. Después de ingresar la dirección de tu cuenta de MetaMask y hacer clic en "Send Request" (Enviar solicitud), deberías ver una respuesta como esta:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**NOTA:** Este resultado está en Wei, no en ETH. Wei se utiliza como la denominación más pequeña de ether. La conversión de Wei a ETH es: 1 ETH = 10¹⁸ Wei. Así que si convertimos 0xde0b6b3a7640000 a decimal obtenemos 1\*10¹⁸, lo que equivale a 1 ETH.

¡Uf! ¡Todo nuestro dinero falso está ahí! <Emoji text=":money_mouth_face:" size={1} />
## Conecta MetaMask a tu interfaz de usuario {#connect-metamask-to-your-ui}

Ahora que nuestra billetera MetaMask está configurada, ¡conectemos nuestra dapp a ella!

Debido a que queremos seguir el paradigma [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), vamos a crear un archivo separado que contenga nuestras funciones para administrar la lógica, los datos y las reglas de nuestra dapp, y luego pasaremos esas funciones a nuestro frontend (nuestro componente Minter.js).

### La función `connectWallet` {#connect-wallet-function}

Para hacerlo, creemos una nueva carpeta llamada `utils` en tu directorio `src` y agreguemos un archivo llamado `interact.js` dentro de ella, que contendrá todas nuestras funciones de interacción con la billetera y el contrato inteligente.

En nuestro archivo `interact.js`, escribiremos una función `connectWallet`, que luego importaremos y llamaremos en nuestro componente `Minter.js`.

En tu archivo `interact.js`, agrega lo siguiente:

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Desglosemos lo que hace este código:

Primero, nuestra función verifica si `window.ethereum` está habilitado en tu navegador.

`window.ethereum` es una API global inyectada por MetaMask y otros proveedores de billeteras que permite a los sitios web solicitar las cuentas de Ethereum de los usuarios. Si se aprueba, puede leer datos de las cadenas de bloques a las que está conectado el usuario y sugerir que el usuario firme mensajes y transacciones. ¡Consulta la [documentación de MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) para obtener más información!

Si `window.ethereum` _no está_ presente, eso significa que MetaMask no está instalado. Esto da como resultado que se devuelva un objeto JSON, donde la `address` devuelta es una cadena vacía, y el objeto JSX `status` transmite que el usuario debe instalar MetaMask.

**La mayoría de las funciones que escribamos devolverán objetos JSON que podemos usar para actualizar nuestras variables de estado y la interfaz de usuario.**

Ahora, si `window.ethereum` _está_ presente, ahí es cuando las cosas se ponen interesantes.

Usando un bloque try/catch, intentaremos conectarnos a MetaMask llamando a [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Llamar a esta función abrirá MetaMask en el navegador, por lo que se le pedirá al usuario que conecte su billetera a tu dapp.

- Si el usuario elige conectarse, `method: "eth_requestAccounts"` devolverá una matriz que contiene todas las direcciones de cuenta del usuario que están conectadas a la dapp. En conjunto, nuestra función `connectWallet` devolverá un objeto JSON que contiene la _primera_ `address` en esta matriz \(ver línea 9\) y un `status` que solicita al usuario que escriba un mensaje al contrato inteligente.
- Si el usuario rechaza la conexión, entonces el objeto JSON contendrá una cadena vacía para la `address` devuelta y un `status` que refleja que el usuario rechazó la conexión.

### Agrega la función connectWallet a tu componente de interfaz de usuario Minter.js {#add-connect-wallet}

Ahora que hemos escrito esta función `connectWallet`, conectémosla a nuestro componente `Minter.js.`.

Primero, tendremos que importar nuestra función en nuestro archivo `Minter.js` agregando `import { connectWallet } from "./utils/interact.js";` en la parte superior del archivo `Minter.js`. Tus primeras 11 líneas de `Minter.js` ahora deberían verse así:

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //Variables de estado
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

Luego, dentro de nuestra función `connectWalletPressed`, llamaremos a nuestra función `connectWallet` importada, de esta manera:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

¿Notas cómo la mayor parte de nuestra funcionalidad se abstrae de nuestro componente `Minter.js` desde el archivo `interact.js`? ¡Esto es para que cumplamos con el paradigma M-V-C!

En `connectWalletPressed`, simplemente hacemos una llamada await a nuestra función `connectWallet` importada y, usando su respuesta, actualizamos nuestras variables `status` y `walletAddress` a través de sus hooks de estado.

Ahora, guardemos ambos archivos `Minter.js` y `interact.js` y probemos nuestra interfaz de usuario hasta ahora.

Abre tu navegador en localhost:3000 y presiona el botón "Connect Wallet" (Conectar billetera) en la parte superior derecha de la página.

Si tienes MetaMask instalado, se te debería pedir que conectes tu billetera a tu dapp. Acepta la invitación para conectarte.

Deberías ver que el botón de la billetera ahora refleja que tu dirección está conectada.

A continuación, intenta actualizar la página... esto es extraño. Nuestro botón de billetera nos pide que conectemos MetaMask, a pesar de que ya está conectado...

¡Pero no te preocupes! ¡Podemos solucionarlo fácilmente implementando una función llamada `getCurrentWalletConnected`, que verificará si una dirección ya está conectada a nuestra dapp y actualizará nuestra interfaz de usuario en consecuencia!

### La función getCurrentWalletConnected {#get-current-wallet}

En tu archivo `interact.js`, agrega la siguiente función `getCurrentWalletConnected`:

```javascript
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Este código es _muy_ similar a la función `connectWallet` que acabamos de escribir anteriormente.

La principal diferencia es que en lugar de llamar al método `eth_requestAccounts`, que abre MetaMask para que el usuario conecte su billetera, aquí llamamos al método `eth_accounts`, que simplemente devuelve una matriz que contiene las direcciones de MetaMask actualmente conectadas a nuestra dapp.

Para ver esta función en acción, llamémosla en la función `useEffect` de nuestro componente `Minter.js`.

Al igual que hicimos con `connectWallet`, debemos importar esta función desde nuestro archivo `interact.js` a nuestro archivo `Minter.js` de esta manera:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //importar aquí
} from "./utils/interact.js"
```

Ahora, simplemente la llamamos en nuestra función `useEffect`:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Ten en cuenta que usamos la respuesta de nuestra llamada a `getCurrentWalletConnected` para actualizar nuestras variables de estado `walletAddress` y `status`.

Una vez que hayas agregado este código, intenta actualizar la ventana de nuestro navegador. El botón debería decir que estás conectado y mostrar una vista previa de la dirección de tu billetera conectada, ¡incluso después de actualizar!

### Implementa addWalletListener {#implement-add-wallet-listener}

El paso final en la configuración de la billetera de nuestra dapp es implementar el oyente de la billetera para que nuestra interfaz de usuario se actualice cuando cambie el estado de nuestra billetera, como cuando el usuario se desconecta o cambia de cuenta.

En tu archivo `Minter.js`, agrega una función `addWalletListener` que se vea de la siguiente manera:

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

Desglosemos rápidamente lo que está sucediendo aquí:

- Primero, nuestra función verifica si `window.ethereum` está habilitado \(es decir, MetaMask está instalado\).
  - Si no lo está, simplemente establecemos nuestra variable de estado `status` en una cadena JSX que solicita al usuario que instale MetaMask.
  - Si está habilitado, configuramos el oyente `window.ethereum.on("accountsChanged")` en la línea 3 que escucha los cambios de estado en la billetera MetaMask, lo que incluye cuando el usuario conecta una cuenta adicional a la dapp, cambia de cuenta o desconecta una cuenta. Si hay al menos una cuenta conectada, la variable de estado `walletAddress` se actualiza como la primera cuenta en la matriz `accounts` devuelta por el oyente. De lo contrario, `walletAddress` se establece como una cadena vacía.

Finalmente, debemos llamarla en nuestra función `useEffect`:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

¡Y listo! ¡Hemos terminado de programar toda la funcionalidad de nuestra billetera! Ahora que nuestra billetera está configurada, ¡descubramos cómo acuñar nuestro NFT!

## Metadatos de NFT 101 {#nft-metadata-101}

Recuerda los metadatos del NFT de los que acabamos de hablar en el Paso 0 de este tutorial: le dan vida a un NFT, permitiéndole tener propiedades, como un activo digital, nombre, descripción y otros atributos.

Vamos a necesitar configurar estos metadatos como un objeto JSON y almacenarlos, para que podamos pasarlos como el parámetro `tokenURI` al llamar a la función `mintNFT` de nuestro contrato inteligente.

El texto en los campos "Link to Asset" (Enlace al activo), "Name" (Nombre), "Description" (Descripción) comprenderá las diferentes propiedades de los metadatos de nuestro NFT. Formatearemos estos metadatos como un objeto JSON, pero hay un par de opciones sobre dónde podemos almacenar este objeto JSON:

- Podríamos almacenarlo en la cadena de bloques de Ethereum; sin embargo, hacerlo sería muy costoso.
- Podríamos almacenarlo en un servidor centralizado, como AWS o Firebase. Pero eso iría en contra de nuestro espíritu de descentralización.
- Podríamos usar IPFS, un protocolo descentralizado y una red entre pares para almacenar y compartir datos en un sistema de archivos distribuido. Como este protocolo es descentralizado y gratuito, ¡es nuestra mejor opción!

Para almacenar nuestros metadatos en IPFS, usaremos [Pinata](https://pinata.cloud/), una API y un conjunto de herramientas de IPFS muy convenientes. ¡En el siguiente paso, explicaremos exactamente cómo hacer esto!

## Usa Pinata para fijar tus metadatos en IPFS {#use-pinata-to-pin-your-metadata-to-ipfs}

Si no tienes una cuenta de [Pinata](https://pinata.cloud/), regístrate para obtener una cuenta gratuita [aquí](https://app.pinata.cloud/auth/signup) y completa los pasos para verificar tu correo electrónico y tu cuenta.

### Crea tu clave API de Pinata {#create-pinata-api-key}

Navega a la página [https://pinata.cloud/keys](https://pinata.cloud/keys), luego selecciona el botón "New Key" (Nueva clave) en la parte superior, habilita el widget de administrador y nombra tu clave.

Luego se te mostrará una ventana emergente con la información de tu API. Asegúrate de guardar esto en un lugar seguro.

Ahora que nuestra clave está configurada, agreguémosla a nuestro proyecto para que podamos usarla.

### Crea un archivo .env {#create-a-env}

Podemos almacenar de forma segura nuestra clave y secreto de Pinata en un archivo de entorno. Instalemos el [paquete dotenv](https://www.npmjs.com/package/dotenv) en el directorio de tu proyecto.

Abre una nueva pestaña en tu terminal \(separada de la que ejecuta el host local\) y asegúrate de estar en la carpeta `minter-starter-files`, luego ejecuta el siguiente comando en tu terminal:

```text
npm install dotenv --save
```

A continuación, crea un archivo `.env` en el directorio raíz de tu `minter-starter-files` ingresando lo siguiente en tu línea de comandos:

```javascript
vim.env
```

Esto abrirá tu archivo `.env` en vim \(un editor de texto\). Para guardarlo, presiona "esc" + ":" + "q" en tu teclado en ese orden.

A continuación, en VSCode, navega hasta tu archivo `.env` y agrega tu clave API y secreto API de Pinata, de esta manera:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

Guarda el archivo y luego estarás listo para comenzar a escribir la función para cargar tus metadatos JSON a IPFS.

### Implementa pinJSONToIPFS {#pin-json-to-ipfs}

Afortunadamente para nosotros, Pinata tiene una [API específicamente para cargar datos JSON a IPFS](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) y un conveniente ejemplo de JavaScript con axios que podemos usar, con algunas ligeras modificaciones.

En tu carpeta `utils`, creemos otro archivo llamado `pinata.js` y luego importemos nuestro secreto y clave de Pinata desde el archivo .env de esta manera:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

A continuación, pega el código adicional de abajo en tu archivo `pinata.js`. No te preocupes, ¡desglosaremos lo que significa todo!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //haciendo una solicitud POST de axios a Pinata ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      }
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }
    })
}
```

Entonces, ¿qué hace exactamente este código?

Primero, importa [axios](https://www.npmjs.com/package/axios), un cliente HTTP basado en promesas para el navegador y Node.js, que usaremos para hacer una solicitud a Pinata.

Luego tenemos nuestra función asíncrona `pinJSONToIPFS`, que toma un `JSONBody` como entrada y la clave y el secreto de la API de Pinata en su encabezado, todo para hacer una solicitud POST a su API `pinJSONToIPFS`.

- Si esta solicitud POST es exitosa, entonces nuestra función devuelve un objeto JSON con el booleano `success` como verdadero y el `pinataUrl` donde se fijaron nuestros metadatos. Usaremos este `pinataUrl` devuelto como la entrada `tokenURI` para la función de acuñación de nuestro contrato inteligente.
- Si esta solicitud POST falla, entonces nuestra función devuelve un objeto JSON con el booleano `success` como falso y una cadena `message` que transmite nuestro error.

Al igual que con los tipos de retorno de nuestra función `connectWallet`, estamos devolviendo objetos JSON para que podamos usar sus parámetros para actualizar nuestras variables de estado y la interfaz de usuario.

## Carga tu contrato inteligente {#load-your-smart-contract}

Ahora que tenemos una forma de cargar los metadatos de nuestro NFT a IPFS a través de nuestra función `pinJSONToIPFS`, vamos a necesitar una forma de cargar una instancia de nuestro contrato inteligente para que podamos llamar a su función `mintNFT`.

Como mencionamos anteriormente, en este tutorial usaremos [este contrato inteligente de NFT existente](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE); sin embargo, si deseas aprender cómo lo hicimos, o hacer uno tú mismo, te recomendamos encarecidamente que consultes nuestro otro tutorial, ["Cómo crear un NFT"](https://www.alchemy.com/docs/how-to-create-an-nft).

### El ABI del contrato {#contract-abi}

Si examinaste nuestros archivos de cerca, habrás notado que en nuestro directorio `src`, hay un archivo `contract-abi.json`. Un ABI es necesario para especificar qué función invocará un contrato, así como para garantizar que la función devuelva datos en el formato que esperas.

También vamos a necesitar una clave API de Alchemy y la API Web3 de Alchemy para conectarnos a la cadena de bloques de Ethereum y cargar nuestro contrato inteligente.

### Crea tu clave API de Alchemy

Si aún no tienes una cuenta de Alchemy, [regístrate gratis aquí.](https://alchemy.com/?a=eth-org-nft-minter)

Una vez que hayas creado una cuenta de Alchemy, puedes generar una clave API creando una aplicación. Esto nos permitirá hacer solicitudes a la red de prueba Sepolia.

Navega a la página "Create App" (Crear aplicación) en tu panel de control de Alchemy pasando el cursor sobre "Apps" (Aplicaciones) en la barra de navegación y haciendo clic en "Create App".

Ponle un nombre a tu aplicación (nosotros elegimos "My First NFT!"), ofrece una breve descripción, selecciona "Staging" (Pruebas) para el entorno (Environment) utilizado para la gestión de tu aplicación y elige "Sepolia" para tu red.

Haz clic en "Create app" (Crear aplicación) y ¡listo! Tu aplicación debería aparecer en la tabla de abajo.

Genial, ahora que hemos creado nuestra URL de la API HTTP de Alchemy, cópiala en tu portapapeles...

...y luego agreguémosla a nuestro archivo `.env`. En conjunto, tu archivo .env debería verse así:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-sepolia.g.alchemy.com/v2/<alchemy-key>
```

Ahora que tenemos el ABI de nuestro contrato y nuestra clave API de Alchemy, estamos listos para cargar nuestro contrato inteligente usando [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
### Configura tu endpoint y contrato de Alchemy Web3 {#setup-alchemy-endpoint}

Primero, si aún no lo tienes, deberás instalar [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) navegando al directorio de inicio: `nft-minter-tutorial` en la terminal:

```text
cd ..
npm install @alch/alchemy-web3
```

A continuación, volvamos a nuestro archivo `interact.js`. En la parte superior del archivo, agrega el siguiente código para importar tu clave de Alchemy desde tu archivo .env y configurar tu endpoint de Alchemy Web3:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) es un contenedor alrededor de [Web3.js](https://docs.web3js.org/), que proporciona métodos de API mejorados y otros beneficios cruciales para hacer tu vida como desarrollador Web3 más fácil. ¡Está diseñado para requerir una configuración mínima para que puedas comenzar a usarlo en tu aplicación de inmediato!

A continuación, agreguemos el ABI de nuestro contrato y la dirección del contrato a nuestro archivo.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

Una vez que tengamos ambos, ¡estamos listos para comenzar a programar nuestra función de acuñación!

## Implementa la función mintNFT {#implement-the-mintnft-function}

Dentro de tu archivo `interact.js`, definamos nuestra función, `mintNFT`, que epónimamente acuñará nuestro NFT.

Debido a que haremos numerosas llamadas asíncronas \(a Pinata para fijar nuestros metadatos en IPFS, a Alchemy Web3 para cargar nuestro contrato inteligente y a MetaMask para firmar nuestras transacciones\), nuestra función también será asíncrona.

Las tres entradas a nuestra función serán el `url` de nuestro activo digital, `name` y `description`. Agrega la siguiente firma de función debajo de la función `connectWallet`:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### Manejo de errores de entrada {#input-error-handling}

Naturalmente, tiene sentido tener algún tipo de manejo de errores de entrada al comienzo de la función, por lo que salimos de esta función si nuestros parámetros de entrada no son correctos. Dentro de nuestra función, agreguemos el siguiente código:

```javascript
export const mintNFT = async (url, name, description) => {
  //manejo de errores
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

Esencialmente, si alguno de los parámetros de entrada es una cadena vacía, entonces devolvemos un objeto JSON donde el booleano `success` es falso, y la cadena `status` transmite que todos los campos en nuestra interfaz de usuario deben estar completos.

### Carga los metadatos a IPFS {#upload-metadata-to-ipfs}

Una vez que sabemos que nuestros metadatos están formateados correctamente, el siguiente paso es envolverlos en un objeto JSON y cargarlos a IPFS a través de la función `pinJSONToIPFS` que escribimos.

Para hacerlo, primero debemos importar la función `pinJSONToIPFS` en nuestro archivo `interact.js`. En la parte superior del `interact.js`, agreguemos:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

Recuerda que `pinJSONToIPFS` toma un cuerpo JSON. Así que antes de hacerle una llamada, vamos a necesitar formatear nuestros parámetros `url`, `name` y `description` en un objeto JSON.

Actualicemos nuestro código para crear un objeto JSON llamado `metadata` y luego hagamos una llamada a `pinJSONToIPFS` con este parámetro `metadata`:

```javascript
export const mintNFT = async (url, name, description) => {
  //manejo de errores
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //crear metadatos
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //hacer llamada a Pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

Ten en cuenta que almacenamos la respuesta de nuestra llamada a `pinJSONToIPFS(metadata)` en el objeto `pinataResponse`. Luego, analizamos este objeto en busca de errores.

Si hay un error, devolvemos un objeto JSON donde el booleano `success` es falso y nuestra cadena `status` transmite que nuestra llamada falló. De lo contrario, extraemos el `pinataURL` del `pinataResponse` y lo almacenamos como nuestra variable `tokenURI`.

Ahora es el momento de cargar nuestro contrato inteligente usando la API Web3 de Alchemy que inicializamos en la parte superior de nuestro archivo. Agrega la siguiente línea de código en la parte inferior de la función `mintNFT` para establecer el contrato en la variable global `window.contract`:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

Lo último que debemos agregar en nuestra función `mintNFT` es nuestra transacción de Ethereum:

```javascript
//configurar tu transacción de Ethereum
const transactionParameters = {
  to: contractAddress, // Requerido excepto durante las publicaciones de contratos.
  from: window.ethereum.selectedAddress, // debe coincidir con la dirección activa del usuario.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //hacer llamada al contrato inteligente de NFT
}

//firmar la transacción a través de MetaMask
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Something went wrong: " + error.message,
  }
}
```

Si ya estás familiarizado con las transacciones de Ethereum, notarás que la estructura es bastante similar a lo que has visto.

- Primero, configuramos los parámetros de nuestras transacciones.
  - `to` especifica la dirección del destinatario \(nuestro contrato inteligente\)
  - `from` especifica el firmante de la transacción \(la dirección conectada del usuario a MetaMask: `window.ethereum.selectedAddress`\)
  - `data` contiene la llamada al método `mintNFT` de nuestro contrato inteligente, que recibe nuestro `tokenURI` y la dirección de la billetera del usuario, `window.ethereum.selectedAddress`, como entradas
- Luego, hacemos una llamada await, `window.ethereum.request,` donde le pedimos a MetaMask que firme la transacción. Ten en cuenta que, en esta solicitud, estamos especificando nuestro método eth \(eth_SentTransaction\) y pasando nuestro `transactionParameters`. En este punto, MetaMask se abrirá en el navegador y le pedirá al usuario que firme o rechace la transacción.
  - Si la transacción es exitosa, la función devolverá un objeto JSON donde el booleano `success` se establece en verdadero y la cadena `status` solicita al usuario que consulte Etherscan para obtener más información sobre su transacción.
  - Si la transacción falla, la función devolverá un objeto JSON donde el booleano `success` se establece en falso, y la cadena `status` transmite el mensaje de error.

En conjunto, nuestra función `mintNFT` debería verse así:

```javascript
export const mintNFT = async (url, name, description) => {
  //manejo de errores
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //crear metadatos
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //solicitud de pin de Pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //cargar contrato inteligente
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //configurar tu transacción de Ethereum
  const transactionParameters = {
    to: contractAddress, // Requerido excepto durante las publicaciones de contratos.
    from: window.ethereum.selectedAddress, // debe coincidir con la dirección activa del usuario.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //hacer llamada al contrato inteligente de NFT
  }

  //firmar transacción a través de MetaMask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
}
```

¡Esa es una función gigante! Ahora, solo necesitamos conectar nuestra función `mintNFT` a nuestro componente `Minter.js`...

## Conecta mintNFT a nuestro frontend Minter.js {#connect-our-frontend}

Abre tu archivo `Minter.js` y actualiza la línea `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` en la parte superior para que sea:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

Finalmente, implementa la función `onMintPressed` para hacer una llamada await a tu función `mintNFT` importada y actualiza la variable de estado `status` para reflejar si nuestra transacción tuvo éxito o falló:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## Despliega tu NFT en un sitio web en vivo

¿Listo para publicar tu proyecto para que los usuarios interactúen con él? Consulta la [documentación de despliegue de React](https://create-react-app.dev/docs/deployment/) para desplegar tu Minter en un sitio web en vivo.

Un último paso...
## Toma el mundo de la cadena de bloques por asalto {#take-the-blockchain-world-by-storm}

Es broma, ¡llegaste al final del tutorial!

Para recapitular, al construir un acuñador de NFT, aprendiste con éxito a:

- Conectarte a MetaMask a través de tu proyecto frontend
- Llamar a métodos de contratos inteligentes desde tu frontend
- Firmar transacciones usando MetaMask

Es de suponer que te gustaría poder presumir de los NFT acuñados a través de tu dapp en tu billetera, ¡así que asegúrate de consultar nuestro tutorial rápido [Cómo ver tu NFT en tu billetera](/developers/tutorials/how-to-view-nft-in-metamask/)!

Y, como siempre, si tienes alguna pregunta, estamos aquí para ayudarte en el [Discord de Alchemy](https://discord.gg/gWuC7zB). ¡Estamos ansiosos por ver cómo aplicas los conceptos de este tutorial a tus futuros proyectos!
