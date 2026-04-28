---
title: Tutorial de minteador de NFT
description: "En este tutorial, creará un minteador de NFT y aprenderá cómo crear una dapp de pila completa conectando su contrato inteligente a un frontend de React por medio de Metamask y herramientas web3."
author: "smudgil"
tags:
  [
    "Solidity",
    "NFT",
    "Alchemy",
    "contratos Inteligentes",
    "frontend",
    "Pinata"
  ]
skill: intermediate
breadcrumb: "Dapp acunador de NFT"
lang: es
published: 2021-10-06
---

Uno de los mayores desafíos para los desarrolladores que vienen de un entorno web2 es averiguar cómo conectar su contrato inteligente a un proyecto de frontend e interactuar con él.

Creando un minteador de NFT —una interfaz de usuario sencilla donde puede introducir un enlace a su activo digital, un título y una descripción—, aprenderá como:

- Establecer conexión con MetaMask a través del proyecto de frontend
- Invocar métodos de contrato inteligente desde su frontend
- Firmar transacciones usando MetaMask

En este tutorial, usaremos [React](https://react.dev/) como nuestro marco de frontend. Debido a que este tutorial se centra principalmente en el desarrollo web3, no vamos a dedicar mucho tiempo a profundizar en los fundamentos de React. En su lugar, nos enfocaremos en aportar funcionalidad a nuestro proyecto.

Como requisito previo, debe tener una comprensión básica de React, es decir, cómo funcionan los componentes, props, useState/useEffect y las llamadas a funciones básicas. Si nunca ha oído hablar de ninguno de esos términos, puede que le interese consultar este [tutorial de introducción a React](https://react.dev/learn/tutorial-tic-tac-toe). Para los aprendices más visuales, recomendamos encarecidamente esta excelente serie de vídeos [Full Modern React Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) de Net Ninja.

Y si aún no lo ha hecho, definitivamente necesitará una cuenta de Alchemy para completar este tutorial, así como crear cualquier cosa en la cadena de bloques. Regístrese para obtener una cuenta gratuita [aquí](https://alchemy.com/).

Sin más preámbulos, ¡comencemos!

## Creación de NFT 101 {#making-nfts-101}

Antes de incluso empezar a experimentar con el código, es importante entender se qué se trata crear un NFT. Implica dos pasos:

### Publicar un smart contract de NFT en la blockchain de Ethereum {#publish-nft}

La mayor diferencia entre los dos estándares de contrato inteligente de NFT es que ERC-1155 es un estándar multitoken e incluye funcionalidad por lotes, mientras que ERC-721 es un estándar de un solo token, por lo tanto solo permite la transferencia de un token a la vez.

### Llamar a la función de acuñación {#minting-function}

Normalmente, esta función de acuñación requiere que se pasen dos variables como parámetros: primero el `recipient`, que especifica la dirección que recibirá su NFT recién acuñado, y segundo el `tokenURI` del NFT, una cadena que se resuelve en un documento JSON que describe los metadatos del NFT.

Los metadatos de un NFT son realmente lo que le dan vida, permitiéndole tener propiedades como nombre, descripción, imagen (o un activo digital diferente) y otros atributos. Este es [un ejemplo de un tokenURI](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2), que contiene los metadatos de un NFT.

En este tutorial, vamos a centrarnos en la parte 2, donde invocaremos la función de minteo de un contrato inteligente de NFT existente utilizando nuestra interfaz de usuario de React.

[Este es un enlace](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) al smart contract del NFT ERC-721 al que llamaremos en este tutorial. Si desea saber cómo lo hicimos, le recomendamos que consulte nuestro otro tutorial, ["Cómo crear un NFT"](https://www.alchemy.com/docs/how-to-create-an-nft).

Bien, ahora que entendemos cómo es crear un NFT, ¡clonemos nuestros archivos de inicio!

## Clonar los archivos de inicio {#clone-the-starter-files}

Primero, vaya al [repositorio de GitHub de nft-minter-tutorial](https://github.com/alchemyplatform/nft-minter-tutorial) para obtener los archivos de inicio para este proyecto. Clone este repositorio en su entorno local.

Cuando abra este repositorio `nft-minter-tutorial` clonado, verá que contiene dos carpetas: `minter-starter-files` y `nft-minter`.

- `minter-starter-files` contiene los archivos de inicio (esencialmente la interfaz de usuario de React) para este proyecto. En este tutorial, **estaremos trabajando en este directorio**, mientras aprende cómo dar vida a esta interfaz de usuario conectándola a su monedero Ethereum y a un smart contract de NFT.
- `nft-minter` contiene el tutorial completo y está ahí para usted como **referencia** **si se atasca.**

A continuación, abra su copia de `minter-starter-files` en su editor de código y, a continuación, navegue a su carpeta `src`.

Todo el código que escribiremos estará en la carpeta `src`. Estaremos editando el componente `Minter.js` y escribiendo archivos javascript adicionales para darle a nuestro proyecto la funcionalidad de Web3.

## Paso 2: Eche un vistazo a nuestros archivos de inicio {#step-2-check-out-our-starter-files}

Antes de empezar a programar, es importante comprobar lo que ya se nos ha proporcionado en los archivos de inicio.

### Ponga en marcha su proyecto de React {#get-your-react-project-running}

Comencemos por ejecutar el proyecto React en nuestro navegador. La belleza de React es que, una vez que tenemos nuestro proyecto corriendo en el navegador, cualquier cambio que guardemos será actualizado en vivo en el navegador.

Para poner en marcha el proyecto, navegue hasta el directorio raíz de la carpeta `minter-starter-files` y ejecute `npm install` en su terminal para instalar las dependencias del proyecto:

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

**NOTA:** ¡Asegúrese de que está en la carpeta `minter-starter-files` y no en la carpeta `nft-minter`!

Volvamos a la carpeta `src` de nuestro editor y abramos el archivo `Minter.js`. Es muy importante que entendamos todo en este archivo, ya que es el componente principal en React en el que trabajaremos.

En la parte superior de este archivo, tenemos nuestras variables de estado que actualizaremos después de eventos específicos.

```javascript
//Variables de estado
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

¿Nunca escuchó hablar de variables de estado o hooks de estado de React? Consulte [estos](https://legacy.reactjs.org/docs/hooks-state.html) documentos.

Esto es lo que representa cada una de las variables:

- `walletAddress`: una cadena que almacena la dirección del monedero del usuario
- `status`: una cadena que contiene un mensaje que se mostrará en la parte inferior de la interfaz de usuario
- `name`: una cadena que almacena el nombre del NFT
- `description`: una cadena que almacena la descripción del NFT
- `url`: una cadena que es un enlace al activo digital del NFT

Después de las variables de estado, verá tres funciones no implementadas: `useEffect`, `connectWalletPressed` y `onMintPressed`. Notará que todas estas funciones son `async`, ¡esto se debe a que haremos llamadas asíncronas a la API en ellas! Sus nombres son epónimos con sus funcionalidades:

```javascript
useEffect(async () => {
  //TODO: implementar
}, [])

const connectWalletPressed = async () => {
  //TODO: implementar
}

const onMintPressed = async () => {
  //TODO: implementar
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html): este es un React hook que se llama después de que su componente se renderice. Debido a que tiene un prop de matriz vacía `[]` pasado (ver línea 3), solo se llamará en la _primera_ renderización del componente. Aquí llamaremos a nuestro oyente de billetera y otra función de billetera para actualizar nuestra interfaz de usuario a fin de reflejar si una billetera ya está conectada.
- `connectWalletPressed`: esta función se llamará para conectar el monedero MetaMask del usuario a nuestra dapp.
- `onMintPressed`: esta función se llamará para acuñar el NFT del usuario.

Cerca del final de este archivo, tenemos la interfaz de usuario de nuestro componente. Si examina este código con atención, se dará cuenta de que actualizamos nuestras variables de estado `url`, `name` y `description` cuando cambia la entrada en sus correspondientes campos de texto.

También verá que se llama a `connectWalletPressed` y a `onMintPressed` cuando se hace clic en los botones con los ID `mintButton` y `walletButton` respectivamente.

```javascript
//la UI de nuestro componente
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Conectado: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Conectar monedero</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Acuñador de NFT de Alchemy</h1>
    <p>
      Simplemente añada el enlace, el nombre y la descripción de su activo y pulse "Acuñar".
    </p>
    <form>
      <h2>🖼 Enlace al activo: </h2>
      <input
        type="text"
        placeholder="p. ej., https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Nombre: </h2>
      <input
        type="text"
        placeholder="p. ej., ¡Mi primer NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Descripción: </h2>
      <input
        type="text"
        placeholder="p. ej., Incluso mejor que los cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Acuñar NFT
    </button>
    <p id="status">{status}</p>
</div>
)
```

Finalmente, abordemos dónde se añade este componente Minter.

Si va al archivo `App.js`, que es el componente principal en React que actúa como contenedor de todos los demás componentes, verá que nuestro componente Minter se inyecta en la línea 7.

**En este tutorial, solo editaremos el archivo `Minter.js` y añadiremos archivos en nuestra carpeta `src`.**

Ahora que entendemos con qué estamos trabajando, configuremos nuestra billetera de Ethereum.

## Configurar su monedero de Ethereum {#set-up-your-ethereum-wallet}

Para que los usuarios puedan interactuar con su contrato inteligente, necesitarán conectar su billetera de Ethereum a su dapp.

### Descargar MetaMask {#download-metamask}

Para este tutorial, usaremos Metamask, una cartera virtual en el navegador usada para manejar la dirección de su cuenta Ethereum. Si quiere saber más sobre cómo funcionan las transacciones en Ethereum, consulte [esta página](/developers/docs/transactions/).

Puede descargar y crear una cuenta de MetaMask gratis [aquí](https://metamask.io/download). Cuando esté creando una cuenta, o si ya tiene una, asegúrese de cambiar a la "Red de prueba Ropsten" en la parte superior derecha \(para no usar dinero real\).

### Añada ether desde un Faucet {#add-ether-from-faucet}

Para mintear nuestros NFTs (o firmar cualquier transacción en la cadena de bloques de Ethereum), necesitaremos algo de Eth de prueba (de mentira). Para obtener Eth, puede ir al [faucet de Ropsten](https://faucet.ropsten.be/) e introducir la dirección de su cuenta de Ropsten, y luego hacer clic en «Send Ropsten Eth». Debería ver el Eth en su cuenta de MetaMask poco después.

### Compruebe su saldo {#check-your-balance}

Para comprobar que nuestro saldo está ahí, hagamos una solicitud [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) utilizando la [herramienta de composición de Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Esto devolverá la cantidad de Eth en nuestra billetera. Después de introducir la dirección de su cuenta de Metamask y hacer clic en «Send Request», debería ver una respuesta como esta:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**NOTA:** Este resultado es en wei, no en eth. Wei se usa como la denominación más pequeña de Ether. La conversión de wei a eth es: 1 eth = 10¹⁸ wei. Entonces si convertimos 0xde0b6b3a7640000 a decimal, obtenemos 1\*10¹⁸, que equivale a 1 eth.

¡Fiu! Nuestro dinero de prueba está ahí sin problemas. <Emoji text=":money_mouth_face:" size={1} />

## Conecte MetaMask a su interfaz de usuario {#connect-metamask-to-your-UI}

Ahora que nuestra billetera de MetaMask está configurada, vamos a conectar nuestra dapp a ella.

Debido a que queremos suscribirnos al paradigma [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), vamos a crear un archivo separado que contenga nuestras funciones para gestionar la lógica, los datos y las reglas de nuestra dapp, y luego pasar esas funciones a nuestro frontend (nuestro componente Minter.js).

### La función `connectWallet` {#connect-wallet-function}

Para ello, vamos a crear una nueva carpeta llamada `utils` en su directorio `src` y a añadir un archivo llamado `interact.js` dentro de ella, que contendrá todas nuestras funciones de interacción con el monedero y el smart contract.

En nuestro archivo `interact.js`, escribiremos una función `connectWallet`, que luego importaremos y llamaremos en nuestro componente `Minter.js`.

En su archivo `interact.js`, añada lo siguiente:

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Escriba un mensaje en el campo de texto de arriba.",
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
              Debe instalar MetaMask, un monedero virtual de Ethereum, en su
              navegador.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Analicemos lo que hace este código:

En primer lugar, nuestra función comprueba si `window.ethereum` está habilitado en su navegador.

`window.ethereum` es una API global inyectada por MetaMask y otros proveedores de monederos que permite a los sitios web solicitar las cuentas de Ethereum de los usuarios. En caso de aprobación, puede leer información de la cadena de bloques a la que el usuario se encuentra conectado y sugerir al usuario que firme mensajes y transacciones. ¡Consulte los [documentos de MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) para obtener más información!

Si `window.ethereum` _no está_ presente, significa que MetaMask no está instalado. Esto da como resultado la devolución de un objeto JSON, donde la `address` devuelta es una cadena vacía, y el objeto JSX `status` transmite que el usuario debe instalar MetaMask.

**La mayoría de las funciones que escribamos devolverán objetos JSON que podremos utilizar para actualizar nuestras variables de estado y la interfaz de usuario.**

Ahora, si `window.ethereum` _está_ presente, es cuando las cosas se ponen interesantes.

Usando un bucle try/catch, intentaremos conectarnos a MetaMask llamando a [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). La invocación de esta función abrirá MetaMask en el navegador, donde se le solicitará al usuario conectar su billetera a su dapp.

- Si el usuario elige conectarse, `method: "eth_requestAccounts"` devolverá una matriz que contiene todas las direcciones de cuenta del usuario que están conectadas a la dapp. En conjunto, nuestra función `connectWallet` devolverá un objeto JSON que contiene la _primera_ `address` de esta matriz (consulte la línea 9) y un mensaje de `status` que solicita al usuario que escriba un mensaje en el smart contract.
- Si el usuario rechaza la conexión, el objeto JSON contendrá una cadena vacía para la `address` devuelta y un mensaje de `status` que reflejará que el usuario ha rechazado la conexión.

### Añadir la función connectWallet a su componente de UI Minter.js {#add-connect-wallet}

Ahora que hemos escrito esta función `connectWallet`, vamos a conectarla a nuestro componente `Minter.js.`.

Primero, tendremos que importar nuestra función a nuestro archivo `Minter.js` añadiendo `import { connectWallet } from "./utils/interact.js";` en la parte superior del archivo `Minter.js`. Sus primeras 11 líneas de `Minter.js` deberían tener este aspecto:

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

A continuación, dentro de nuestra función `connectWalletPressed`, llamaremos a nuestra función importada `connectWallet`, de esta manera:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

¿Se da cuenta de cómo la mayor parte de nuestra funcionalidad se abstrae de nuestro componente `Minter.js` desde el archivo `interact.js`? ¡Esto es así para cumplir con el paradigma M-V-C!

En `connectWalletPressed`, simplemente hacemos una llamada await a nuestra función `connectWallet` importada y, usando su respuesta, actualizamos nuestras variables `status` y `walletAddress` a través de sus state hooks.

Ahora, guardemos los dos archivos, `Minter.js` e `interact.js`, y probemos nuestra interfaz de usuario hasta ahora.

Abra el navegador en localhost:3000 y presione el botón "Connect Wallet" en la parte superior derecha de la página.

Si tiene MetaMask instalado, se le debería solicitar conectar su billetera a su dapp. Acepte la invitación para establecer la conexión.

Debería ver que el botón de billetera ahora muestra que su dirección está conectada.

A continuación, intente refrescar la página... esto es extraño. Nuestro botón de billetera nos está solicitando conectar MetaMask, aunque ya está conectado...

¡No se preocupe! Podemos solucionarlo fácilmente implementando una función llamada `getCurrentWalletConnected`, que comprobará si una dirección ya está conectada a nuestra dapp y actualizará nuestra interfaz de usuario en consecuencia.

### La función getCurrentWalletConnected {#get-current-wallet}

En su archivo `interact.js`, añada la siguiente función `getCurrentWalletConnected`:

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
          status: "👆🏽 Escriba un mensaje en el campo de texto de arriba.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Conéctese a MetaMask usando el botón superior derecho.",
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
              Debe instalar MetaMask, un monedero virtual de Ethereum, en su
              navegador.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Este código es _muy_ similar a la función `connectWallet` que acabamos de escribir.

La principal diferencia es que, en lugar de llamar al método `eth_requestAccounts`, que abre MetaMask para que el usuario conecte su monedero, aquí llamamos al método `eth_accounts`, que simplemente devuelve un array con las direcciones de MetaMask actualmente conectadas a nuestra dapp.

Para ver esta función en acción, llamémosla en la función `useEffect` de nuestro componente `Minter.js`.

Al igual que hicimos con `connectWallet`, debemos importar esta función desde nuestro archivo `interact.js` a nuestro archivo `Minter.js` de la siguiente manera:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //importar aquí
} from "./utils/interact.js"
```

Ahora, simplemente lo llamamos en nuestra función `useEffect`:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Observe que utilizamos la respuesta de nuestra llamada a `getCurrentWalletConnected` para actualizar nuestras variables de estado `walletAddress` y `status`.

Una vez agregado este código, pruebe actualizar la ventana del navegador. El botón debería decir que está conectado y mostrar una vista previa de la dirección de su billetera conectada, incluso después de actualizar la página.

### Implementar addWalletListener {#implement-add-wallet-listener}

El último paso en la configuración de la billetera de dapp es implementar el oyente de billetera para que nuestra interfaz se actualice cuando el estado de la billetera cambie, por ejemplo, cuando el usuario se desconecte o cambie de cuenta.

En su archivo `Minter.js`, añada una función `addWalletListener` que tenga el siguiente aspecto:

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Escriba un mensaje en el campo de texto de arriba.")
      } else {
        setWallet("")
        setStatus("🦊 Conéctese a MetaMask utilizando el botón superior derecho.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          Debe instalar MetaMask, un monedero virtual de Ethereum, en su navegador.
        </a>
      </p>
    )
  }
}
```

Analicemos rápidamente lo que sucede aquí:

- Primero, nuestra función comprueba si `window.ethereum` está habilitado (es decir, si MetaMask está instalado).
  - Si no lo está, simplemente establecemos nuestra variable de estado `status` en una cadena JSX que pide al usuario que instale MetaMask.
  - Si está habilitado, configuramos el detector `window.ethereum.on("accountsChanged")` en la línea 3 que escucha los cambios de estado en el monedero de MetaMask, que incluyen cuándo el usuario conecta una cuenta adicional a la dapp, cambia de cuenta o desconecta una cuenta. Si hay al menos una cuenta conectada, la variable de estado `walletAddress` se actualiza como la primera cuenta del array `accounts` devuelto por el detector. De lo contrario, `walletAddress` se establece como una cadena vacía.

Por último, debemos llamarlo en nuestra función `useEffect`:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

¡Y voilá! ¡Hemos completado la programación de nuestra funcionalidad de billetera! ¡Ahora que nuestra billetera está configurada, veamos cómo mintear nuestro NFT!

## Metadatos de NFT 101 {#nft-metadata-101}

Recordemos los metadatos de NFT sobre los que hablamos en el Paso 0 de este tutorial: dan vida a un NFT, permitiendo que tenga propiedades, tales como un activo digital, un nombre, una descripción y otros atributos.

Vamos a necesitar configurar estos metadatos como un objeto JSON y almacenarlos, para que podamos pasarlos como el parámetro `tokenURI` al llamar a la función `mintNFT` de nuestro smart contract.

El texto en los campos "Link to Asset", "Name" y "Description" comprenderá las diferentes propiedades de los metadatos de nuestro NFT. Formatearemos estos metadatos como un objeto JSON, pero hay un par de opciones para almacenar este objeto JSON:

- Podríamos almacenarlo en la cadena de bloques de Ethereum; sin embargo, hacer esto puede ser muy caro.
- Podríamos almacenarlo en un servidor centralizado, como AWS o Firebase. Pero esto iría en contra de nuestro espíritu de descentralización.
- Podríamos usar IPFS, un protocolo descentralizado y red entre pares para almacenar y compartir datos en un sistema de archivos distribuido. Como este protocolo es descentralizado y gratuito, es nuestra mejor opción.

Para almacenar nuestros metadatos en IPFS, utilizaremos [Pinata](https://pinata.cloud/), una API y un conjunto de herramientas de IPFS muy prácticos. En el siguiente paso, explicaremos exactamente cómo hacer esto.

## Use Pinata para anclar sus metadatos a IPFS {#use-pinata-to-pin-your-metadata-to-IPFS}

Si no tiene una cuenta de [Pinata](https://pinata.cloud/), regístrese para obtener una cuenta gratuita [aquí](https://app.pinata.cloud/auth/signup) y complete los pasos para verificar su correo electrónico y su cuenta.

### Crear su clave de API de Pinata {#create-pinata-api-key}

Navegue a la página [https://pinata.cloud/keys](https://pinata.cloud/keys), luego seleccione el botón «New Key» en la parte superior, habilite el widget de administración y asigne un nombre a su clave.

Luego verá una ventana emergente con la información de su API. Asegúrese de guardar estos datos en un lugar seguro.

Ahora que nuestra clave está configurada, vamos a agregarla a nuestro proyecto para poder usarla.

### Crear un archivo .env {#create-a-env}

Podemos almacenar de manera segura nuestra clave y secreto de Pinata en un archivo de entorno. Instalemos el [paquete dotenv](https://www.npmjs.com/package/dotenv) en el directorio de su proyecto.

Abra una nueva pestaña en su terminal (separada de la que está ejecutando el host local) y asegúrese de que está en la carpeta `minter-starter-files`, luego ejecute el siguiente comando en su terminal:

```text
npm install dotenv --save
```

A continuación, cree un archivo `.env` en el directorio raíz de sus `minter-starter-files` introduciendo lo siguiente en su línea de comandos:

```javascript
vim.env
```

Esto abrirá su archivo `.env` en vim (un editor de texto). Para guardarlo, presione "esc" + ":" + "q" en el teclado en dicho orden.

A continuación, en VSCode, navegue hasta su archivo `.env` y añádale su clave API y su secreto API de Pinata, de la siguiente manera:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

Guarde el archivo y luego estará listo para iniciar la escritura de la función para subir los metadatos JSON a IPFS.

### Implementar pinJSONToIPFS {#pin-json-to-ipfs}

Afortunadamente para nosotros, Pinata tiene una [API específica para cargar datos JSON en IPFS](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) y un práctico ejemplo de JavaScript con axios que podemos usar, con algunas ligeras modificaciones.

En su carpeta `utils`, vamos a crear otro archivo llamado `pinata.js` y luego importar nuestro secreto y clave de Pinata desde el archivo .env de esta manera:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

A continuación, pegue el código adicional de abajo en su archivo `pinata.js`. ¡No se preocupe, explicaremos lo que significa todo esto!

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

Entonces, ¿qué hace este código exactamente?

Primero, importa [axios](https://www.npmjs.com/package/axios), un cliente HTTP basado en promesas para el navegador y node.js, que utilizaremos para hacer una solicitud a Pinata.

Luego tenemos nuestra función asíncrona `pinJSONToIPFS`, que toma un `JSONBody` como entrada y la clave y el secreto de la API de Pinata en su cabecera, todo para hacer una solicitud POST a su API `pinJSONToIPFS`.

- Si esta solicitud POST tiene éxito, entonces nuestra función devuelve un objeto JSON con el booleano `success` como verdadero y el `pinataUrl` donde se anclaron nuestros metadatos. Utilizaremos este `pinataUrl` devuelto como entrada de `tokenURI` para la función de acuñación de nuestro smart contract.
- Si esta solicitud POST falla, entonces nuestra función devuelve un objeto JSON con el booleano `success` como falso y una cadena de `message` que transmite nuestro error.

Al igual que con los tipos de retorno de nuestra función `connectWallet`, estamos devolviendo objetos JSON para poder usar sus parámetros para actualizar nuestras variables de estado y la interfaz de usuario.

## Cargar su smart contract {#load-your-smart-contract}

Ahora que tenemos una forma de subir los metadatos de nuestro NFT a IPFS a través de nuestra función `pinJSONToIPFS`, vamos a necesitar una forma de cargar una instancia de nuestro smart contract para poder llamar a su función `mintNFT`.

Como mencionamos anteriormente, en este tutorial utilizaremos [este smart contract de NFT existente](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE); sin embargo, si le gustaría aprender cómo lo hicimos, o hacer uno usted mismo, le recomendamos encarecidamente que consulte nuestro otro tutorial, [«Cómo crear un NFT»](https://www.alchemy.com/docs/how-to-create-an-nft).

### El ABI del contrato {#contract-abi}

Si ha examinado nuestros archivos de cerca, habrá notado que en nuestro directorio `src`, hay un archivo `contract-abi.json`. Un ABI es necesario para especificar qué función invocará un contrato y para asegurar que la función devolverá datos en el formato esperado.

Tambien necesitaremos una clave de API de Alchemy y la API Web3 de Alchemy para establecer conexión con la cadena de bloques de Ethereum y cargar nuestro contrato inteligente.

### Cree su clave de API de Alchemy {#create-alchemy-api}

Si aún no tiene una cuenta de Alchemy, [regístrese gratis aquí](https://alchemy.com/?a=eth-org-nft-minter).

Una vez que haya creado una cuenta de Alchemy, puede generar una clave de API creando una aplicación. Esto nos permitirá hacer solicitudes a la red de pruebas de Ropsten.

Vaya a la página "Create App" en el panel de Alchemy colocando el cursor sobre "Apps" en la barra de navegación y haciendo click en "Create App".

Asigne un nombre a la aplicación (nosotros elegimos "Mi primer NFT"), ofrezca una descripción, seleccione "Staging" para el Entorno usado para la contabilidad de la aplicación y seleccione "Ropsten" para la red.

¡Haga clic en «Crear app» y ya está! Su aplicación debería aparecer en la siguiente tabla.

¡Genial! Ahora que hemos creado la URL HTTP de la API de Alchemy, cópiela en el portapapeles...

... y luego vamos a añadirla a nuestro archivo `.env`. En definitiva el archivo .env debe lucir así:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

Ahora que tenemos nuestro ABI del contrato y nuestra clave de API de Alchemy, estamos listos para cargar nuestro smart contract usando [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).

### Configurar su punto de conexión y contrato de Alchemy Web3 {#setup-alchemy-endpoint}

Primero, si aún no lo tiene, necesitará instalar [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) navegando al directorio principal: `nft-minter-tutorial` en la terminal:

```text
cd ..
npm install @alch/alchemy-web3
```

A continuación, volvamos a nuestro archivo `interact.js`. En la parte superior del archivo, agregue el siguiente código para importar la clave de Alchemy desde el archivo .env y configurar su terminal de Alchemy Web3:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) es un envoltorio de [Web3.js](https://docs.web3js.org/), que proporciona métodos de API mejorados y otros beneficios cruciales para facilitar su vida como desarrollador de web3. Se diseñó para requerir una configuración mínima, por lo que puede comenzar a usarla en su aplicación de inmediato.

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

## Implementar la función mintNFT {#implement-the-mintnft-function}

Dentro de su archivo `interact.js`, definamos nuestra función `mintNFT`, que epónimamente acuñará nuestro NFT.

Debido a que realizaremos varias llamadas asíncronas \(a Pinata para fijar los metadatos a IPFS, a Alchemy Web3 para cargar nuestro contrato inteligente y a MetaMask para firmar las transacciones\), nuestra función también será asíncrona.

Las tres entradas de nuestra función serán la `url` de nuestro activo digital, el `name` y la `description`. Añada la siguiente firma de función debajo de la función `connectWallet`:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### Manejo de errores de entrada {#input-error-handling}

Naturalmente, tiene sentido tener algún tipo de manejo de errores de entrada en el inicio de la función, por lo que podemos abandonar esta función si nuestros parámetros de entrada son incorrectos. Dentro de nuestra función, agreguemos el siguiente código:

```javascript
export const mintNFT = async (url, name, description) => {
  //manejo de errores
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Asegúrese de que todos los campos estén completos antes de acuñar.",
    }
  }
}
```

Esencialmente, si alguno de los parámetros de entrada es una cadena vacía, devolvemos un objeto JSON donde el booleano `success` es falso, y la cadena `status` transmite que todos los campos de nuestra interfaz de usuario deben estar completos.

### Cargar los metadatos a IPFS {#upload-metadata-to-ipfs}

Una vez que sepamos que nuestros metadatos están formateados correctamente, el siguiente paso es envolverlos en un objeto JSON y subirlos a IPFS a través de la función `pinJSONToIPFS` que escribimos.

Para ello, primero tenemos que importar la función `pinJSONToIPFS` a nuestro archivo `interact.js`. En la parte superior de `interact.js`, añadamos:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

Recuerde que `pinJSONToIPFS` toma un cuerpo JSON. Así que antes de llamarla, vamos a tener que formatear nuestros parámetros `url`, `name` y `description` en un objeto JSON.

Actualicemos nuestro código para crear un objeto JSON llamado `metadata` y luego hacer una llamada a `pinJSONToIPFS` con este parámetro `metadata`:

```javascript
export const mintNFT = async (url, name, description) => {
  //manejo de errores
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Asegúrese de que todos los campos estén completos antes de acuñar.",
    }
  }

  //crear metadatos
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //hacer llamada a pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Algo salió mal al subir su tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

Observe que almacenamos la respuesta de nuestra llamada a `pinJSONToIPFS(metadata)` en el objeto `pinataResponse`. Luego, analizamos este objeto para buscar errores.

Si hay un error, devolvemos un objeto JSON donde el booleano `success` es falso y nuestra cadena `status` transmite que nuestra llamada ha fallado. De lo contrario, extraemos la `pinataURL` de la `pinataResponse` y la almacenamos como nuestra variable `tokenURI`.

Ahora es momento de cargar nuestro contrato inteligente usando la API web3 de Alchemy que inicializamos en la parte superior de nuestro archivo. Añada la siguiente línea de código al final de la función `mintNFT` para establecer el contrato en la variable global `window.contract`:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

Lo último que hay que añadir en nuestra función `mintNFT` es nuestra transacción Ethereum:

```javascript
//configure su transacción de Ethereum
const transactionParameters = {
  to: contractAddress, // Requerido excepto durante las publicaciones de contratos.
  from: window.ethereum.selectedAddress, // debe coincidir con la dirección activa del usuario.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //hacer llamada al smart contract de NFT
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
      "✅ Consulte su transacción en Etherscan: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Algo salió mal: " + error.message,
  }
}
```

Si ya está familiarizado con las transacciones de Ethereum, notará que la estructura es muy similar a lo que ha visto.

- Primero establecemos los parámetros de las transacciones.
  - `to` especifica la dirección del destinatario (nuestro smart contract)
  - `from` especifica el firmante de la transacción (la dirección del usuario conectada a MetaMask: `window.ethereum.selectedAddress`)
  - `data` contiene la llamada al método `mintNFT` de nuestro smart contract, que recibe nuestro `tokenURI` y la dirección del monedero del usuario, `window.ethereum.selectedAddress`, como entradas
- Luego, hacemos una llamada `await`, `window.ethereum.request`, donde le pedimos a MetaMask que firme la transacción. Observe que, en esta solicitud, estamos especificando nuestro método eth (eth_SentTransaction) y pasando nuestros `transactionParameters`. En este punto, MetaMask se abrirá en el navegador y solicitará al usuario firmar o rechazar la transacción.
  - Si la transacción tiene éxito, la función devolverá un objeto JSON en el que el booleano `success` se establece en verdadero y la cadena `status` indica al usuario que consulte Etherscan para obtener más información sobre su transacción.
  - Si la transacción falla, la función devolverá un objeto JSON donde el booleano `success` se establece en falso, y la cadena `status` transmite el mensaje de error.

En conjunto, nuestra función `mintNFT` debería tener este aspecto:

```javascript
export const mintNFT = async (url, name, description) => {
  //manejo de errores
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Asegúrese de que todos los campos estén completos antes de acuñar.",
    }
  }

  //crear metadatos
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //solicitud de anclaje de pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Algo salió mal al subir su tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //cargar smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //configure su transacción de Ethereum
  const transactionParameters = {
    to: contractAddress, // Requerido excepto durante las publicaciones de contratos.
    from: window.ethereum.selectedAddress, // debe coincidir con la dirección activa del usuario.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //hacer llamada al smart contract de NFT
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
        "✅ Consulte su transacción en Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Algo salió mal: " + error.message,
    }
  }
}
```

¡Es una función gigante! Ahora, solo tenemos que conectar nuestra función `mintNFT` a nuestro componente `Minter.js`...

## Conectar mintNFT a nuestro frontend Minter.js {#connect-our-frontend}

Abra su archivo `Minter.js` y actualice la línea `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` en la parte superior para que sea:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

Finalmente, implemente la función `onMintPressed` para hacer una llamada await a su función importada `mintNFT` y actualice la variable de estado `status` para reflejar si nuestra transacción tuvo éxito o falló:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## Despliegue su NFT en un sitio web en vivo {#deploy-your-NFT}

¿Está preparado para implementar su proyecto para que los usuarios interactúen? Consulte [este tutorial](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) para desplegar su acuñador en un sitio web en vivo.

Un último paso...

## Conquiste el mundo de la blockchain {#take-the-blockchain-world-by-storm}

¡Solo bromeaba! Ha llegado al final del tutorial.

Para recapitular, al crear un minteador de NFT, ha aprendido correctamente cómo:

- Establecer conexión con MetaMask a través del proyecto de frontend
- Invocar métodos de contrato inteligente desde su frontend
- Firmar transacciones usando MetaMask

Presumiblemente, le gustaría poder mostrar los NFT acuñados a través de su dapp en su monedero, ¡así que asegúrese de consultar nuestro rápido tutorial [Cómo ver su NFT en su monedero](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet)!

Y, como siempre, si tiene alguna pregunta, estamos aquí para ayudarle en el [Discord de Alchemy](https://discord.gg/gWuC7zB). Estamos ansiosos de ver cómo aplica lo que aprendió en este tutorial en sus proyectos.
