---
title: Tutorial de minteador de NFT
description: En este tutorial, creará un minteador de NFT y aprenderá cómo crear una dapp de pila completa conectando su contrato inteligente a un frontend de React por medio de Metamask y herramientas web3.
author: "smudgil"
tags:
  - "solidity"
  - "NFT"
  - "alchemy"
  - "contratos inteligentes"
  - "frontend"
  - "Pinata"
skill: intermediate
lang: es
published: 2021-10-06
---

Uno de los mayores desafíos para los desarrolladores que vienen de un entorno web2 es averiguar cómo conectar su contrato inteligente a un proyecto de frontend e interactuar con él.

Creando un minteador de NFT —una interfaz de usuario sencilla donde puede introducir un enlace a su activo digital, un título y una descripción—, aprenderá como:

- Establecer conexión con MetaMask a través del proyecto de frontend
- Invocar métodos de contrato inteligente desde su frontend
- Firmar transacciones usando MetaMask

En este tutorial, usaremos [React](https://reactjs.org/) como framework de frontend. Debido a que este tutorial se centra principalmente en el desarrollo web3, no vamos a dedicar mucho tiempo a profundizar en los fundamentos de React. En su lugar, nos enfocaremos en aportar funcionalidad a nuestro proyecto.

Como requisito previo, debe tener una comprensión básica de React, es decir, cómo funcionan los componentes, props, useState/useEffect y las llamadas a funciones básicas. Si nunca ha oído hablar de alguno de esos términos antes, tal vez quiera revisar este [tutorial de introducción a React](https://reactjs.org/tutorial/tutorial.html). Para los alumnos más visuales, recomendamos encarecidamente esta excelente serie de videos [Tutorial completo de React moderno](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) de Net Ninja.

Y si aún no lo ha hecho, definitivamente necesitará una cuenta de Alchemy para completar este tutorial, así como crear cualquier cosa en la cadena de bloques. Regístrese para obtener una cuenta gratuita [aquí](https://alchemy.com/).

Sin más preámbulos, ¡comencemos!

## Aspectos básicos sobre creación de NFT {#making-nfts-101}

Antes de incluso empezar a experimentar con el código, es importante entender se qué se trata crear un NFT. Implica dos pasos:

### Publicar un contrato inteligente de NFT en la cadena de bloques de Ethereum {#publish-nft}

La mayor diferencia entre los dos estándares de contrato inteligente de NFT es que ERC-1155 es un estándar multitoken e incluye funcionalidad por lotes, mientras que ERC-721 es un estándar de un solo token, por lo tanto solo permite la transferencia de un token a la vez.

### Invocar la función de minteo {#minting-function}

Generalmente, esta función de minteo requiere pasar dos variables como parámetros, primero el `recipient`, que especifica la dirección que recibirá su NFT recién minteado, y luego el `tokenURI` del NFT, una cadena que resuelve a un documento JSON que describe los metadatos del NFT.

Los metadatos de un NFT son realmente lo que le dan vida, permitiéndole tener propiedades como nombre, descripción, imagen (o un activo digital diferente) y otros atributos. Este es un [ejemplo de un tokenURI](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2), el cual contiene los metadatos de un NFT.

En este tutorial, vamos a centrarnos en la parte 2, donde invocaremos la función de minteo de un contrato inteligente de NFT existente utilizando nuestra interfaz de usuario de React.

[Aquí hay un enlace](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) al contrato inteligente de NFT ERC-721 que invocaremos en este tutorial. Si quiere aprender cómo lo hicimos, le recomendamos que revise nuestro otro tutorial [Cómo crear un NFT](https://docs.alchemyapi.io/alchemy/tutorials/how-to-create-an-nft).

Bien, ahora que entendemos cómo es crear un NFT, ¡clonemos nuestros archivos de inicio!

## Clone los archivos de inicio {#clone-the-starter-files}

Primero, vaya al [repositorio de GitHub nft-minter-tutorial](https://github.com/alchemyplatform/nft-minter-tutorial) para obtener los archivos de inicio de este proyecto. Clone este repositorio en su entorno local.=

Cuando abra el repositorio clonado `nft-minter-tutorial`, notará que contiene dos carpetas: `minter-starter-files` y `nft-minter`.

- `minter-starter-files` contiene los archivos de inicio (esencialmente la interfaz de usuario de React) para este proyecto. En este tutorial, **trabajaremos en este directorio** para que vea cómo dar vida a esta UI conectándola a su billetera de Ethereum y a un contrato inteligente de NFT.
- `nft-minter` contiene todo el tutorial completado y está disponible como **referencia** ** si se estanca.**

A continuación, abra su copia de `minter-starter-files` en su editor de código y luego vaya a la carpeta `src`.

Todo el código que escribiremos permanecerá en la carpeta `src`. Editaremos el componente `Minter.js` y escribiremos archivos javascript adicionales para dar a nuestro proyecto funcionalidad Web3.

## Paso 2: Revisar nuestros archivos de inicio {#step-2-check-out-our-starter-files}

Antes de empezar a programar, es importante comprobar lo que ya se nos ha proporcionado en los archivos de inicio.

### Ejecute su proyecto de react {#get-your-react-project-running}

Comencemos por ejecutar el proyecto React en nuestro navegador. La belleza de React es que, una vez que tenemos nuestro proyecto corriendo en el navegador, cualquier cambio que guardemos será actualizado en vivo en el navegador.

Para ejecutar el proyecto, vaya al directorio raíz de la carpeta `minter-starter-files` y ejecute `npm install` en su terminal para instalar las dependencias del proyecto:

```bash
cd minter-starter-files
npm install
```

Una vez que hayan terminado de instalarse, ejecute `npm start` en su terminal:

```bash
npm start
```

Al hacerlo, se debería abrir http://localhost:3000/ en el navegador, donde verá el frontend de nuestro proyecto. Debe constar de 3 campos: un lugar para introducir un enlace al activo de su NFT, uno para introducir el nombre del NFT y otro para proporcionar una descripción.

Si intenta hacer clic en los botones "Connect Wallet" o "Mint NFT", notará que no funcionan: es porque todavía necesitamos programar su funcionalidad. :\)

### El componente Minter.js {#minter-js}

**NOTA:** Asegúrese de estar en la carpeta `minter-starter-files` y no en la carpeta `nft-minter`.

Volvamos a la carpeta `src` en nuestro editor y abramos el archivo `Minter.js`. Es muy importante que entendamos todo en este archivo, ya que es el componente principal en React en el que trabajaremos.

En la parte superior de este archivo, tenemos nuestras variables de estado que actualizaremos después de eventos específicos.

```javascript
//State variables
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

¿Nunca escuchó hablar de variables de estado o hooks de estado de React? Échale un vistazo a [estos](https://reactjs.org/docs/hooks-state.html) documentos.

Esto es lo que representa cada una de las variables:

- `walletAddress`: cadena que almacena la dirección de la billetera del usuario
- `status`: cadena que contiene un mensaje para mostrar en la parte inferior de la interfaz de usuario
- `name`: cadena que almacena el nombre del NFT
- `description`: cadena que almacena la descripción del NFT
- `url`: cadena que actúa como enlace al activo digital del NFT

Después de las variables de estado, verá tres funciones no implementadas: `useEffect`, `connectWalletPressed` y `onMintPressed`. Notará que todas estas funciones son `async`, ¡eso es porque vamos a hacer llamadas asincrónicas de API en ellas! Sus nombres son epónimos con sus funcionalidades:

```javascript
useEffect(async () => {
  //TODO: implement
}, [])

const connectWalletPressed = async () => {
  //TODO: implement
}

const onMintPressed = async () => {
  //TODO: implement
}
```

- [`useEffect`](https://reactjs.org/docs/hooks-effect.html): este es un hook de React que es invocado después de renderizar su componente. Debido a que tiene un prop `[]` de array vacío que se pasa a él (ver línea 3), solo se lo invocará en el _primer_ render del componente. Aquí llamaremos a nuestro oyente de billetera y otra función de billetera para actualizar nuestra interfaz de usuario a fin de reflejar si una billetera ya está conectada.
- `connectWalletPressed`: esta función será invocada para conectar la billetera en MetaMask del usuario a nuestra dapp.
- `onMintPressed`: esta función será invocada para mintear el NFT del usuario.

Cerca del final de este archivo, tenemos la interfaz de usuario de nuestro componente. Si analiza este código cuidadosamente, notará que actualizamos nuestras variables de estado `url`, `name` y `description` cuando la entrada en sus campos de texto correspondientes cambian.

También verá que `conectWalletPressed` y `onMintPressed` son invocadas cuando se hace clic en los botones con los ID `mintButton` y `walletButton`.

```javascript
//the UI of our component
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
        placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Name: </h2>
      <input
        type="text"
        placeholder="e.g. My first NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Description: </h2>
      <input
        type="text"
        placeholder="e.g. Even cooler than cryptokitties ;)"
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

Finalmente, abordemos dónde se añade este componente Minter.

Si va al archivo `App.js`, que es el componente principal de React que actúa como contenedor de todos los demás componentes, verá que nuestro componente Minter se inyecta en la línea 7.

**En este tutorial, solo editaremos el `archivo Minter.js` y añadiremos archivos en nuestra carpeta `src`.**

Ahora que entendemos con qué estamos trabajando, configuremos nuestra billetera de Ethereum.

## Configure su billetera de Ethereum {#set-up-your-ethereum-wallet}

Para que los usuarios puedan interactuar con su contrato inteligente, necesitarán conectar su billetera de Ethereum a su dapp.

### Descargar MetaMask {#download-metamask}

Para este tutorial, usaremos Metamask, una cartera virtual en el navegador usada para manejar la dirección de su cuenta Ethereum. Si desea más información sobre cómo funcionan las transacciones en Ethereum, eche un vistazo a [esta página](/developers/docs/transactions/).

Puede descargar y crear una cuenta Metamask gratis [aquí](https://metamask.io/download.html). Cuando esté creando una cuenta, o si ya tiene una, asegúrese de cambiar a la "Red de prueba Ropsten" en la parte superior derecha \(para no usar dinero real\).

### Añada ether a partir de un grifo {#add-ether-from-faucet}

Para mintear nuestros NFTs (o firmar cualquier transacción en la cadena de bloques de Ethereum), necesitaremos algo de Eth de prueba (de mentira). Para obtener el Eth, puede ir al [grifo de Ropsten](https://faucet.ropsten.be/) e introducir la dirección de su cuenta de Ropsten y dar clic en "Send Ropsten Eth". Debería ver el Eth en su cuenta de MetaMask poco después.

### Compruebe su saldo {#check-your-balance}

Para verificar que nuestro saldo esté ahí, realicemos una solicitud [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) usando la [herramienta de compositor de Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Esto devolverá la cantidad de Eth en nuestra billetera. Después de introducir la dirección de su cuenta de Metamask y hacer clic en «Send Request» (Enviar Solicitud), debería ver una respuesta como esta:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**NOTA:** Este resultado esta en wei, no en eth. Wei se usa como la denominación más pequeña de Ether. La conversión de wei a eth es: 1 eth = 10¹⁸ wei. Entonces si convertimos 0xde0b6b3a7640000 a decimal, obtenemos 1\*10¹⁸, que equivale a 1 eth.

¡Fiu! Nuestro dinero de prueba está ahí sin problemas. <Emoji text=":money_mouth_face:" size={1} />

## Conecte Metamask a su UI {#connect-metamask-to-your-UI}

Ahora que nuestra billetera de MetaMask está configurada, vamos a conectar nuestra dapp a ella.

Debido a que queremos prescribir al paradigma [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), vamos a crear un archivo separado que contenga nuestras funciones para gestionar la lógica, los datos y las reglas de nuestra dapp, para luego pasar estas funciones a nuestro frontend (nuestro componente Minter.js).

### Función `connectWallet` {#connect-wallet-function}

Para hacer eso, vamos a crear una nueva carpeta llamada `utils` en el directorio `src` y agregaremos un archivo llamado `interact.js` dentro de esta, que contendrá todas las funciones de interacción de nuestra billetera y contrato inteligente.

En nuestro archivo `interact.js`, escribiremos una función `connectWallet`, que luego importaremos y llamaremos en nuestro componente `Minter.js`.

En el archivo `interact.js`, añada lo siguiente:

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
            🦊 <a target="_blank" href={`https://metamask.io/download.html`}>
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

Analicemos lo que hace este código:

Primero, nuestra función revisa si `window.ethereum` está activado en su navegador.

`window.ethereum` es una API global inyectada por MetaMask y otros proveedores de billeteras que permite a los sitios web solicitar las cuentas de Ethereum de los usuarios. En caso de aprobación, puede leer información de la cadena de bloques a la que el usuario se encuentra conectado y sugerir al usuario que firme mensajes y transacciones. Revise la [documentación de MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) para obtener más información.

Si `window.ethereum` _no está_ presente, eso significa que MetaMask no está instalado. Esto resulta en la devolución de un objeto JSON, donde el `address` devuelto es una cadena vacía y el objeto JSX `status` muestra que el usuario debe instalar MetaMask.

**Muchas de las funciones que escribamos mostrarán objetos JSON que podemos usar para actualizar nuestras variables de estado y UI.**

Ahora, si `window.ethereum` _está_ presente, las cosas se ponen interesantes.

Usando un bucle try/catch, trataremos de conectar con MetaMask invocando [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). La invocación de esta función abrirá MetaMask en el navegador, donde se le solicitará al usuario conectar su billetera a su dapp.

- Si el usuario elige conectarla, `method: "eth_requestAccounts"` devolverá un arreglo que contiene todas las direcciones de la cuenta del usuario que están conectadas a la dapp. De igual manera, nuestra función `connectWallet` devolverá un objeto JSON que contine la _primera_ `address` de este arreglo \(ver la línea 9\) y un mensaje de `status` que solicita al usuario escribir un mensaje al contrato inteligente.
- Si el usuario rechaza la conexión, el objeto JSON tendrá una cadena vacía para la `address` devuelta y un mensaje de `status` donde se refleje que el usuario rechazó la conexión.

### Agregue la función connectWallet a su componente Minter.js {#add-connect-wallet}

Ahora que hemos escrito esta función `connectWallet`, vamos a conectarla con nuestro componente `Minter.js`.

Primero, tenemos que importar nuestra función a nuestro archivo `Minter.js` agregando `import { connectWallet } from "./utils/interact.js";` en la parte superior del archivo `Minter.js`. Las primeras 11 líneas de `Minter.js` deberían lucir así:

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

Luego, dentro de nuestra función `connectWalletPressed`, llamaremos a nuestra función `connectWallet` de la siguiente manera:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

¿Nota cómo gran parte de nuestra funcionalidad es abstraída de nuestro componente `Minter.js` del archivo `interact.js`? ¡Esto es así para cumplir con el paradigma M-V-C!

En `connectWalletPressed`, simplemente hacemos una llamada en espera a nuestra función `conectWallet` importada y, utilizando su respuesta, actualizamos nuestras variables `status` y `walletAddress` a través de sus hooks de estado.

Ahora, guardemos ambos archivos `Minter.js` e `interact.js`, y probemos nuestra UI.

Abra el navegador en localhost:3000 y presione el botón "Connect Wallet" en la parte superior derecha de la página.

Si tiene MetaMask instalado, se le debería solicitar conectar su billetera a su dapp. Acepte la invitación para establecer la conexión.

Debería ver que el botón de billetera ahora muestra que su dirección está conectada.

A continuación, pruebe actualizar la página... esto es extraño. Nuestro botón de billetera nos está solicitando conectar MetaMask, aunque ya está conectado...

¡No se preocupe! Podemos solucionarlo con facilidad implementando una función llamada `getCurrentWalletConnected`, que revisará si ya hay una dirección conectada a nuestra dapp y actualizará nuestra interfaz como corresponda.

### La función getCurrentWalletConnected {#get-current-wallet}

En su archivo `interact.js`, agregue la siguiente función `getCurrentWalletConnected`:

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
            🦊 <a target="_blank" href={`https://metamask.io/download.html`}>
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

Este código es _muy_ silimar a la función `connectWallet` que escribimos previamente.

La principal diferencia es que, en vez de llamar al método `eth_requestAccount`, que abre MetaMask para que el usuario conecte su billetera, aquí llamamos al método `eth_accounts`, que simplemente devuelve un arreglo que contiene las direcciones de MetaMask que se encuentran conectadas a nuestra dapp.

Para ver esta función en acción, vamos a llamarla en la función `useEffect` de nuestro componente `Minter.js`.

Como hicimos para `connectWallet`, debemos importar esta función de nuestro archivo `interact.js` a nuestro archivo `Minter.js`:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //import here
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

Note que usamos la respuesta de nuestra llamada a `getCurrentWalletConnected` para actualizar nuestras variables de estado `walletAddress` y `status`.

Una vez agregado este código, pruebe actualizar la ventana del navegador. El botón debería decir que está conectado y mostrar una vista previa de la dirección de su billetera conectada, incluso después de actualizar la página.

### Implemente addWalletListener {#implement-add-wallet-listener}

El último paso en la configuración de la billetera de dapp es implementar el oyente de billetera para que nuestra interfaz se actualice cuando el estado de la billetera cambie, por ejemplo, cuando el usuario se desconecte o cambie de cuenta.

En el archivo `Minter.js`, agregue una función `addWalletListener` que luzca así:

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
        🦊 <a target="_blank" href={`https://metamask.io/download.html`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

Analicemos rápidamente lo que sucede aquí:

- Primero, nuestra función verifica si `window.ethereum` está habilitado \(esto es si MetaMask está instalado\).
  - Si no lo está, simplemente establecemos nuestra variable de estado `status` a una cadena JSX que solicite al usuario instalar MetaMask.
  - Si está habilitado, configuramos el oyente `window.ethereum.on("accountsChanged")` en la línea 3, que escucha cambios de estado en la billetera de MetaMask, incluyendo cuando el usuario conecte una cuenta adicional a la dapp, cambie de cuenta o desconecte una cuenta. Si hay por lo menos una cuenta conectada, la variable de estado `walletAddress` es actualizada como la primera cuenta en el arreglo `accounts` devuelto por el oyente. De lo contrario, `walletAddress` se establece como cadena vacía.

Finalmente, debemos llamarlo en nuestra función `useEffect`:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

¡Y voilá! ¡Hemos completado la programación de nuestra funcionalidad de billetera! ¡Ahora que nuestra billetera está configurada, veamos cómo mintear nuestro NFT!

## Aspectos básicos sobre metadatos de NFT {#nft-metadata-101}

Recordemos los metadatos de NFT sobre los que hablamos en el Paso 0 de este tutorial: dan vida a un NFT, permitiendo que tenga propiedades, tales como un activo digital, un nombre, una descripción y otros atributos.

Vamos a tener que configurar estos metadatos como objeto JSON y almacenarlo para poder pasarlos como parámetro `tokenURI` cuando invoquemos la función `mintNFT` de nuestro contrato inteligente.

El texto en los campos "Link to Asset", "Name" y "Description" comprenderá las diferentes propiedades de los metadatos de nuestro NFT. Formatearemos estos metadatos como un objeto JSON, pero hay un par de opciones para almacenar este objeto JSON:

- Podríamos almacenarlo en la cadena de bloques de Ethereum; sin embargo, hacer esto puede ser muy caro.
- Podríamos almacenarlo en un servidor centralizado, como AWS o Firebase. Pero esto iría en contra de nuestro espíritu de descentralización.
- Podríamos usar IPFS, un protocolo descentralizado y red entre pares para almacenar y compartir datos en un sistema de archivos distribuido. Como este protocolo es descentralizado y gratuito, es nuestra mejor opción.

Para almacenar nuestros metadatos en IPFS, usaremos [Pinata](https://pinata.cloud/), una conveniente API de IPFS y kit de herramientas. En el siguiente paso, explicaremos exactamente cómo hacer esto.

## Use Pinata para fijar sus metadatos en IPFS {#use-pinata-to-pin-your-metadata-to-IPFS}

Si no tiene una cuenta de [Pinata](https://pinata.cloud/), cree una cuenta gratuita [aquí](https://pinata.cloud/signup) y complete los pasos para verificar su correo electrónico y su cuenta.

### Cree su clave de API de Pinata {#create-pinata-api-key}

Navegue a la página [https://pinata.cloud/kets](https://pinata.cloud/keys), luego seleccione el botón "New Key" en la parte superior, establezca el widget de Administrador como habilitado y asigne un nombre a su clave.

Luego verá una ventana emergente con la información de su API. Asegúrese de guardar estos datos en un lugar seguro.

Ahora que nuestra clave está configurada, vamos a agregarla a nuestro proyecto para poder usarla.

### Cree un archivo .env {#create-a-env}

Podemos almacenar de manera segura nuestra clave y secreto de Pinata en un archivo de entorno. Vamos a instalar el [paquete dotenv](https://www.npmjs.com/package/dotenv) en el directorio del proyecto.

Abra una nueva pestaña en su terminal \(separada de la que está ejecutando local host\) y asegúrese de que estar en la carpeta `minter-starter-files`; luego ejecute el siguiente comando en el terminal:

```text
npm install dotenv --save
```

A continuación, cree un archivo `.env` en el directorio raíz de `minter-starter-files` ingresando lo siguiente el la línea de comandos:

```javascript
vim.env
```

Esto abrirá el archivo `.env` en vim \(un editor de texto\). Para guardarlo, presione "esc" + ":" + "q" en el teclado en dicho orden.

A continuación, en VSCode, navegue a su archivo `.env` y agregue su clave de API y secreto de API de Pinata a este, de la siguiente manera:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

Guarde el archivo y luego estará listo para iniciar la escritura de la función para subir los metadatos JSON a IPFS.

### Implemente pinJSONToIPFS {#pin-json-to-ipfs}

Afortunadamente para nosotros, Pinata tiene una [API específicamente para subir datos JSON a IPFS](https://pinata.cloud/documentation#PinJSONToIPFS) y un práctico ejemplo de JavaScript con axios que podemos usar, con algunas ligeras modificaciones.

En la carpeta `utils`, vamos a crear otro archivo llamado `pinata.js` y luego importar su secreto y clave de Pinata desde el archivo .env de la siguiente manera:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

A continuación, pegue el código adicional que se encuentra abajo en su archivo `pinata.js`. ¡No se preocupe, explicaremos lo que significa todo esto!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //making axios POST request to Pinata ⬇️
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

Entonces, ¿qué hace este código exactamente?

Primero, importa [axios](https://www.npmjs.com/package/axios), un cliente HTTP basado en promesas para el navegador y node.js, que usaremos para hacer una solicitud a Pinata.

Luego, tenemos nuestra función asíncrona `pinJSONToIPFS`, que toma un `JSONBody` como su entrada, además de la clave y secreto de la API de Pinata en su encabezado, todo para hacer una solicitud POST a su API de `pinJSONToIPFS`.

- Si esta solicitud POST es exitosa, nuestra función devuelve un objeto JSON con el booleano `success` como verdadero y la `pinataUrl` donde fueron fijados nuestros metadatos. Usaremos esta `pinataUrl` devuelta como la entrada `tokenURI` a la función de minteo de nuestro contrato inteligente.
- Si esta solicitud POST falla, la función devuelve un objeto JSON con el booleano `success` como falso y una cadena `message` que muestra el error.

Como sucede con los tipos de retorno de la función `connectWallet`, estamos devolviendo objetos JSON para poder usar sus parámetros con la finalidad de actualizar nuestras variables de estado e interfaz.

## Suba el contrato inteligente {#load-your-smart-contract}

Ahora que tenemos una manera de cargar los metadatos de nuestro NFT a IPFS a través de la función `pinJSONToIPFS`, necesitaremos una manera de cargar una instancia del contrato inteligente para invocar su función `mintNFT`.

Como se mencionó previamente, en este tutorial usaremos [este contrato inteligente de NFT existente](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE); sin embargo, si desea aprender cómo lo hicimos o crear uno por su cuenta, recomendamos consultar nuestro otro tutorial [Cómo crear un NFT](https://docs.alchemyapi.io/alchemy/tutorials/how-to-create-an-nft).

### ABI del contrato {#contract-abi}

Si ha examinado nuestros archivos en detalle, habrá notado que en nuestro directorio `src` hay un archivo `contract-abi.json`. Un ABI es necesario para especificar qué función invocará un contrato y para asegurar que la función devolverá datos en el formato esperado.

Tambien necesitaremos una clave de API de Alchemy y la API Web3 de Alchemy para establecer conexión con la cadena de bloques de Ethereum y cargar nuestro contrato inteligente.

### Cree su clave API de Alchemy {#create-alchemy-api}

Si todavía no tiene una cuenta de Alchemy, [cree una cuenta gratuita aquí](https://alchemy.com/?a=eth-org-nft-minter).

Una vez que haya creado una cuenta de Alchemy, puede generar una clave de API creando una aplicación. Esto nos permitirá hacer solicitudes a la red de pruebas de Ropsten.

Vaya a la página "Create App" en el panel de Alchemy colocando el cursor sobre "Apps" en la barra de navegación y haciendo click en "Create App".

Asigne un nombre a la aplicación (nosotros elegimos "Mi primer NFT"), ofrezca una descripción, seleccione "Staging" para el Entorno usado para la contabilidad de la aplicación y seleccione "Ropsten" para la red.

¡Haga clic en «Crear app» y eso es todo! Su aplicación debería aparecer en el tablero de abajo.

¡Genial! Ahora que hemos creado la URL HTTP de la API de Alchemy, cópiela en el portapapeles...

… y luego vamos a agregarla al archivo `.env`. En definitiva el archivo .env debe lucir así:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

Ahora que tenemos nuestro ABI de contrato y la clave de API de Alchemy, estamos listos para cargar nuestro contrato inteligente usando [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).

### Configure el terminal y contrato de Alchemy Web3 {#setup-alchemy-endpoint}

Primero, si aún no lo tiene, necesita instalar [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) navegando al directorio de inicio: `nft-minter-tutorial` en el terminal:

```text
cd ..
npm install @alch/alchemy-web3
```

A continuación, regresemos a nuestro archivo `interact.js`. En la parte superior del archivo, agregue el siguiente código para importar la clave de Alchemy desde el archivo .env y configurar su terminal de Alchemy Web3:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[ Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) está construido sobre [Web3](https://docs.web3js.org/), de esta manera proporciona metodos mejorados de la API y otros beneficios importantes para que tu vida como desarrollador de Web3 sea mucho más fácil. Se diseñó para requerir una configuración mínima, por lo que puede comenzar a usarla en su aplicación de inmediato.

Ahora, agreguemos nuestro ABI de contrato y la dirección del contrato a nuestro archivo.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

Una vez que tengamos ambos, estamos listos para comenzar con el código de nuestra función de minteo.

## Implemente la función mintNFT {#implement-the-mintnft-function}

Dentro del archivo `interact.js`, vamos a definir nuestra función, `mintNFT`, que de forma epónima minteará nuestro NFT.

Debido a que realizaremos varias llamadas asíncronas \(a Pinata para fijar los metadatos a IPFS, a Alchemy Web3 para cargar nuestro contrato inteligente y a MetaMask para firmar las transacciones\), nuestra función también será asíncrona.

Las tres entradas a nuestra función serán la `url` de nuestro activo digital, `name` y `description`. Agregue la siguiente firma de función debajo de la función `connectWallet`:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### Manejo de errores de entrada {#input-error-handling}

Naturalmente, tiene sentido tener algún tipo de manejo de errores de entrada en el inicio de la función, por lo que podemos abandonar esta función si nuestros parámetros de entrada son incorrectos. Dentro de nuestra función, agreguemos el siguiente código:

```javascript
export const mintNFT = async (url, name, description) => {
  //error handling
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

Básicamente, si cualquiera de los parámetros de entrada son una cadena vacía, devolvemos un objeto JSON donde el booleano `success` es falso y la cadena `status` muestre que deben completarse todos los campos en nuestra UI.

### Subir los metadatos a IPFS {#upload-metadata-to-ipfs}

Una vez sabemos que sepamos que nuestros metadatos están formateados correctamente, el siguiente paso es ponerlos en un objeto JSON y subirlos a IPFS a través del `pinJSONToIPFS` que escribimos.

Para hacer eso, primero necesitamos importar la función `pinJSONToIPFS` en el archivo `interact.js`. En la parte superior de `interact.js`, vamos a agregar:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

Recuerde que `pinJSONToIPFS` toma un cuerpo JSON. Antes de hacer una invocación, necesitaremos formatear los parámetros `url`, `name` y `description` en un objeto JSON.

Actualicemos nuestro código para crear un objeto JSON llamado `metadata` y luego hacer un llamado a `pinJSONToIPFS` con este parámetro de `metadata`:

```javascript
export const mintNFT = async (url, name, description) => {
  //error handling
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //make metadata
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //make pinata call
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

Note que guardamos la respuesta de nuestra llamada a `pinJSONToIPFS(metadata)` en el objeto `pinataResponse`. Luego, analizamos este objeto para buscar errores.

Si hay un error, devolvemos un objeto JSON donde el booleano `success` es falso y nuestra cadena `status` transmita que nuestra llamada falló. De lo contrario, extraemos el `pinataURL` de `pinataResponse` y lo almacenamos como variable `tokenURI`.

Ahora es momento de cargar nuestro contrato inteligente usando la API web3 de Alchemy que inicializamos en la parte superior de nuestro archivo. Agregue la siguiente línea de código al final de la función `mintNFT` para establecer el contrato en la variable global `window.contract`:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

Lo último por agregar en nuestra función `mintNFT` es nuestra transacción de Ethereum:

```javascript
//set up your Ethereum transaction
const transactionParameters = {
  to: contractAddress, // Required except during contract publications.
  from: window.ethereum.selectedAddress, // must match user's active address.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //make call to NFT smart contract
}

//sign the transaction via MetaMask
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

Si ya está familiarizado con las transacciones de Ethereum, notará que la estructura es muy similar a lo que ha visto.

- Primero establecemos los parámetros de las transacciones.
  - `to` especifica la dirección del receptor \(nuestro contrato inteligente\)
  - `from` especifica el firmante de la transacción \(la dirección conectada del usuario a MetaMask: `window.ethereum.selectedAddress`\)
  - `data` contiene el llamado al método `mintNFT` de nuestro contrato inteligente, que recibe nuestro `tokenURI` y la dirección de la billetera del usuario, `window.ethereum.selectedAddress` como entradas
- Luego hacemos una llamada de espera, `window.ethereum.request`, donde le solicitamos a MetaMask firmar la transacción. Fíjese que en esta solicitud estamos especificando nuestro método eth \(eth_SentTransaction\) y pasando nuestros `transactionParameters`. En este punto, MetaMask se abrirá en el navegador y solicitará al usuario firmar o rechazar la transacción.
  - Si la transacción es exitosa, la función devolverá un objeto JSON donde el booleano `success` es establecido como verdadero y la cadena `status` solicita al usuario revisar Etherscan para ver más información sobre la transacción.
  - Si la transacción falla, la función devolverá un objeto JSON donde el booleano `success` es establecido en falso y la cadena `status` muestra el mensaje de error.

En definitiva nuestra función `mintNFT` debería lucir así:

```javascript
export const mintNFT = async (url, name, description) => {
  //error handling
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //make metadata
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //pinata pin request
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //set up your Ethereum transaction
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //make call to NFT smart contract
  }

  //sign transaction via MetaMask
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

¡Es una función gigante! Ahora solo necesitamos conectar nuestra función `mintNFT` a nuestro componente `Minter.js`...

## Conecte minterNFT a nuestro frontend Minter.js {#connect-our-frontend}

Abra el archivo `Minter.js` y actualice la línea `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` al inicio a:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

Finalmente, implemente la función `onMintPressed` para hacer una llamada en espera a su función `mintNFT` importada y actualice la variable de estado `status` para reflejar si nuestra transacción se realizó correctamente o falló:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## Implemente el NFT a un sitio web {#deploy-your-NFT}

¿Está preparado para implementar su proyecto para que los usuarios interactúen? Revise [este tutorial](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) para implementar el Minteador en un sitio web.

Un último paso...

## Tome el mundo de la cadena de bloques por asalto {#take-the-blockchain-world-by-storm}

¡Solo bromeaba! Ha llegado al final del tutorial.

Para recapitular, al crear un minteador de NFT, ha aprendido correctamente cómo:

- Establecer conexión con MetaMask a través del proyecto de frontend
- Invocar métodos de contrato inteligente desde su frontend
- Firmar transacciones usando MetaMask

Seguramente le gustaría poder mostrar los NFT minteados a través de su dapp en su billetera, así que asegúrese de revisar nuestro tutorial rápido [Cómo ver su NFT en su billetera](https://docs.alchemyapi.io/alchemy/tutorials/how-to-write-and-deploy-a-nft-smart-contract/how-to-view-your-nft-in-your-wallet).

Como siempre, si tiene alguna pregunta, estamos aquí para ayudarlo en el [Discord de Alchemy](https://discord.gg/gWuC7zB). Estamos ansiosos de ver cómo aplica lo que aprendió en este tutorial en sus proyectos.
