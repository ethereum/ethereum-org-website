---
title: "Crear una interfaz de usuario para su contrato inteligente."
description: Utilizando componentes modernos como TypeScript, React, Vite y Wagmi, revisaremos una interfaz de usuario moderna pero minimalista y aprenderemos cómo conectar una wallet a la interfaz de usuario, llamar a un smart contract para leer información, enviar una transacción a un smart contract y monitorear eventos de un smart contract para identificar cambios.
author: Ori Pomerantz
tags: [ "typescript", "react", "vite", "wagmi", "frontend" ]
skill: principiante
published: 2023-11-01
lang: es
sidebarDepth: 3
---

Ha encontrado una funcionalidad que necesitamos en el ecosistema Ethereum. Escribió los smart contracts para implementarla, y quizás incluso algo de código relacionado que se ejecuta fuera de la cadena (offchain). ¡Esto es genial! Desafortunadamente, sin una interfaz de usuario no tendrá usuarios, y la última vez que creó un sitio web las personas usaban módems de acceso telefónico y JavaScript era nuevo.

Este artículo es para usted. Supongo que sabe programar, y quizá algo de JavaScript y HTML, pero sus habilidades en interfaces de usuario están algo oxidadas y desactualizadas. Juntos revisaremos una aplicación sencilla y moderna para que vea cómo se hace hoy en día.

## ¿Por qué es esto importante? {#why-important}

En teoría, usted podría simplemente hacer que las personas usen [Etherscan](https://holesky.etherscan.io/address/0x432d810484add7454ddb3b5311f0ac2e95cecea8#writeContract) o [Blockscout](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=write_contract) para interactuar con sus contratos. Eso será excelente para los usuarios experimentados de Ethereum. Pero intentamos servir a [otro mil millones de personas](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). Esto no sucederá sin una excelente experiencia de usuario, y una interfaz de usuario amigable es una parte fundamental de ello.

## Aplicación Greeter {#greeter-app}

Existe mucha teoría detrás de cómo funciona una interfaz de usuario moderna, y [muchos buenos sitios](https://react.dev/learn/thinking-in-react) [que lo explican](https://wagmi.sh/core/getting-started). En vez de repetir el excelente trabajo de esos sitios, asumiré que prefiere aprender haciendo y empezaré con una aplicación que puede probar. Aun así necesita la teoría para realizar las tareas, y la abordaremos: simplemente revisaremos archivo por archivo y discutiremos los temas a medida que los vayamos encontrando.

### Instalación {#installation}

1. Si es necesario, agregue [la blockchain Holesky](https://chainlist.org/?search=holesky&testnets=true) a su wallet y [obtenga ETH de prueba](https://www.holeskyfaucet.io/).

2. Clone el repositorio de github.

   ```sh
   git clone https://github.com/qbzzt/20230801-modern-ui.git
   ```

3. Instale los paquetes necesarios.

   ```sh
   cd 20230801-modern-ui
   pnpm install
   ```

4. Inicie la aplicación.

   ```sh
   pnpm dev
   ```

5. Vaya a la URL mostrada por la aplicación. En la mayoría de los casos, es [http://localhost:5173/](http://localhost:5173/).

6. Puede ver el código fuente del contrato, una versión ligeramente modificada del Greeter de Hardhat, [en un explorador de blockchain](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contract).

### Recorrido por los archivos {#file-walk-through}

#### `index.html` {#index-html}

Este archivo es un archivo HTML estándar de inicio, excepto por esta línea, que importa el archivo de script.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

La extensión del archivo nos indica que este archivo es un [componente de React](https://www.w3schools.com/react/react_components.asp) escrito en [TypeScript](https://www.typescriptlang.org/), una extensión de JavaScript que soporta [verificación de tipos](https://en.wikipedia.org/wiki/Type_system#Type_checking). TypeScript se compila en JavaScript, por lo que podemos usarlo para ejecución en el lado del cliente.

```tsx
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { chains, config } from './wagmi'
```

Importe el código de las librerías que necesitamos.

```tsx
import { App } from './App'
```

Importe el componente de React que implementa la aplicación (ver más abajo).

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

Cree el componente raíz de React. El parámetro de `render` es [JSX](https://www.w3schools.com/react/react_jsx.asp), un lenguaje de extensión que utiliza tanto HTML como JavaScript/TypeScript. El signo de exclamación aquí le indica al componente TypeScript: "no sabe que `document.getElementById('root')` será un parámetro válido para `ReactDOM.createRoot`, pero no se preocupe: soy el desarrollador y le digo que lo será".

```tsx
  <React.StrictMode>
```

La aplicación irá dentro de [un componente `React.StrictMode`](https://react.dev/reference/react/StrictMode). Este componente indica a la librería de React que inserte comprobaciones de depuración adicionales, lo cual es útil durante el desarrollo.

```tsx
    <WagmiConfig config={config}>
```

La aplicación también está dentro de [un componente `WagmiConfig`](https://wagmi.sh/react/api/WagmiProvider). [La librería wagmi (we are going to make it)](https://wagmi.sh/) conecta las definiciones de la interfaz de React con [la librería viem](https://viem.sh/) para escribir una aplicación descentralizada de Ethereum.

```tsx
      <RainbowKitProvider chains={chains}>
```

Y finalmente, [un componente `RainbowKitProvider`](https://www.rainbowkit.com/). Este componente gestiona el inicio de sesión y la comunicación entre la wallet y la aplicación.

```tsx
        <App />
```

Ahora podemos tener el componente para la aplicación, que realmente implementa la interfaz de usuario. El `/>` al final del componente le indica a React que este componente no tiene otras definiciones dentro, según el estándar XML.

```tsx
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
```

Por supuesto, tenemos que cerrar los demás componentes.

#### `src/App.tsx` {#app-tsx}

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Greeter } from './components/Greeter'

export function App() {
```

Esta es la manera estándar de crear un componente de React: definir una función que se llama cada vez que necesita renderizarse. Esta función normalmente incluye algo de código TypeScript o JavaScript en la parte superior, seguido de una declaración `return` que regresa el código JSX.

```tsx
  const { isConnected } = useAccount()
```

Aquí utilizamos [`useAccount`](https://wagmi.sh/react/api/hooks/useAccount) para comprobar si estamos conectados a una blockchain mediante una wallet o no.

Por convención, en React las funciones llamadas `use...` son [hooks](https://www.w3schools.com/react/react_hooks.asp) que devuelven algún tipo de dato. Cuando se utilizan estos hooks, el componente obtiene los datos y, cuando esa información cambia, el componente se vuelve a renderizar con la información actualizada.

```tsx
  return (
    <>
```

El JSX de un componente React _debe_ regresar un solo componente. Cuando tenemos varios componentes y no hay uno que los envuelva de forma "natural", utilizamos un componente vacío (`<> ... </>`) para agruparlos en un solo componente.

```tsx
      <h1>Greeter</h1>
      <ConnectButton />
```

Obtenemos [el componente `ConnectButton`](https://www.rainbowkit.com/docs/connect-button) de RainbowKit. Cuando no estamos conectados, nos muestra un botón `Connect Wallet` que abre un modal donde se explica qué son las wallets y permite elegir cuál usar. Cuando estamos conectados, muestra la blockchain que usamos, nuestra dirección de cuenta y el saldo de ETH. Podemos utilizar estas vistas para cambiar de red o desconectarnos.

```tsx
      {isConnected && (
```

Cuando necesitamos insertar JavaScript real (o TypeScript que será compilado a JavaScript) dentro de JSX, utilizamos llaves (`{}`).

La sintaxis `a && b` es una forma abreviada de [`a ? b : a`](https://www.w3schools.com/react/react_es6_ternary.asp). Es decir, si `a` es verdadero, evalúa a `b` y, en caso contrario, evalúa a `a` (que puede ser `false`, `0`, etc.). Esta es una forma sencilla de indicarle a React que un componente solo debe mostrarse si se cumple determinada condición.

En este caso, solo queremos mostrarle al usuario `Greeter` si está conectado a una blockchain.

```tsx
          <Greeter />
      )}
    </>
  )
}
```

#### `src/components/Greeter.tsx` {#greeter-tsx}

Este archivo contiene la mayoría de la funcionalidad de la interfaz de usuario. Incluye definiciones que normalmente estarían en varios archivos, pero como esto es un tutorial, el programa está optimizado para que sea fácil de entender la primera vez, en vez de priorizar el rendimiento o la facilidad de mantenimiento.

```tsx
import { useState, ChangeEventHandler } from 'react'
import {  useNetwork,
          useReadContract,
          usePrepareContractWrite,
          useContractWrite,
          useContractEvent
        } from 'wagmi'
```

Utilizamos estas funciones de la biblioteca. Nuevamente, se explican más abajo donde se usan.

```tsx
import { AddressType } from 'abitype'
```

[La biblioteca `abitype`](https://abitype.dev/) nos proporciona definiciones TypeScript para varios tipos de datos de Ethereum, como [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  .
  .
  .
] as const   // greeterABI
```

El ABI para el contrato `Greeter`.
Si está desarrollando los contratos y la interfaz a la vez, normalmente los pondría en el mismo repositorio y usaría el ABI generado por el compilador de Solidity como un archivo en la aplicación. Sin embargo, esto no es necesario aquí porque el contrato ya está desarrollado y no va a cambiar.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript es fuertemente tipado. Utilizamos esta definición para especificar la dirección donde el contrato `Greeter` está desplegado en diferentes cadenas. La clave es un número (el chainId), y el valor es un `AddressType` (una dirección).

```tsx
const contractAddrs: AddressPerBlockchainType = {
  // Holesky
  17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',

  // Sepolia
  11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
}
```

La dirección del contrato en las dos redes soportadas: [Holesky](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contact_code) y [Sepolia](https://eth-sepolia.blockscout.com/address/0x7143d5c190F048C8d19fe325b748b081903E3BF0?tab=contact_code).

Nota: En realidad existe una tercera definición, para Redstone Holesky, lo explicaremos más abajo.

```tsx
type ShowObjectAttrsType = {
  name: string,
  object: any
}
```

Este tipo se utiliza como parámetro del componente `ShowObject` (explicado más adelante). Incluye el nombre del objeto y su valor, que se muestran con fines de depuración.

```tsx
type ShowGreetingAttrsType = {
  greeting: string | undefined
}
```

En cualquier momento podemos saber cuál es el saludo (greeting), porque lo leímos de la blockchain, o no saberlo (porque aún no lo hemos recibido). Por lo tanto, es útil tener un tipo que pueda ser una cadena o que no tenga valor.

##### Componente `Greeter` {#greeter-component}

```tsx
const Greeter = () => {
```

Por fin, definimos el componente.

```tsx
  const { chain } = useNetwork()
```

Información sobre la cadena que estamos usando, cortesía de [wagmi](https://wagmi.sh/react/hooks/useNetwork).
Como esto es un hook (`use...`), cada vez que esta información cambia el componente se vuelve a renderizar.

```tsx
  const greeterAddr = chain && contractAddrs[chain.id]
```

La dirección del contrato Greeter, que varía según la cadena (y que es `undefined` si no hay información de la cadena o si estamos en una cadena sin ese contrato).

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet" , // No arguments
    watch: true
  })
```

[El hook `useReadContract`](https://wagmi.sh/react/api/hooks/useReadContract) lee información de un contrato. Puede ver exactamente qué información devuelve expandiendo `readResults` en la interfaz de usuario. En este caso queremos que siga monitoreando, para que se nos notifique cuando cambie el saludo.

**Nota:** Podríamos escuchar [eventos `setGreeting`](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=logs) para saber cuándo cambia el saludo y actualizar de esa manera. Sin embargo, aunque pueda ser más eficiente, no será aplicable en todos los casos. Cuando el usuario cambia a otra cadena, el saludo también cambia, pero ese cambio no viene acompañado de un evento. Podríamos tener una parte del código escuchando eventos y otra para identificar cambios en la cadena, pero eso sería más complicado que simplemente establecer [el parámetro `watch`](https://wagmi.sh/react/api/hooks/useReadContract#watch-optional).

```tsx
  const [ newGreeting, setNewGreeting ] = useState("")
```

El [hook `useState` de React](https://www.w3schools.com/react/react_usestate.asp) nos permite especificar una variable de estado, cuyo valor persiste entre renderizaciones del componente. El valor inicial es el parámetro, en este caso la cadena vacía.

El hook `useState` devuelve una lista con dos valores:

1. El valor actual de la variable de estado.
2. Una función para modificar la variable de estado cuando sea necesario. Como esto es un hook, cada vez que se llama el componente se vuelve a renderizar.

En este caso, utilizamos una variable de estado para el nuevo saludo que el usuario desea establecer.

```tsx
  const greetingChange : ChangeEventHandler<HTMLInputElement> = (evt) =>
    setNewGreeting(evt.target.value)
```

Este es el evento manejador para cuando cambia el campo de entrada del nuevo saludo. El tipo, [`ChangeEventHandler<HTMLInputElement>`](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/), especifica que este es un manejador para un cambio de valor de un elemento de entrada HTML. La parte `<HTMLInputElement>` se utiliza porque es un [tipo genérico](https://www.w3schools.com/typescript/typescript_basic_generics.php).

```tsx
  const preparedTx = usePrepareContractWrite({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [ newGreeting ]
  })
  const workingTx = useContractWrite(preparedTx.config)
```

Este es el proceso para enviar una transacción a la blockchain desde el lado del cliente:

1. Enviar la transacción a un nodo de la blockchain usando [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas).
2. Esperar una respuesta del nodo.
3. Cuando se recibe la respuesta, pedir al usuario que firme la transacción a través de la wallet. Este paso _debe_ suceder después de recibir la respuesta del nodo porque al usuario se le muestra el coste de gas de la transacción antes de firmarla.
4. Esperar la aprobación del usuario.
5. Enviar la transacción de nuevo, esta vez usando [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction).

El paso 2 probablemente tomará un tiempo perceptible, durante el cual los usuarios se preguntarán si su orden fue realmente recibida por la interfaz y por qué aún no se les pide firmar la transacción. Eso genera una mala experiencia de usuario (UX).

La solución es usar [prepare hooks](https://wagmi.sh/react/prepare-hooks). Cada vez que un parámetro cambia, envíe inmediatamente la solicitud `eth_estimateGas` al nodo. Luego, cuando el usuario finalmente desea enviar la transacción (en este caso al presionar **Update greeting**), el coste de gas ya es conocido y la pantalla de la wallet puede aparecer de inmediato.

```tsx
  return (
```

Ahora por fin podemos crear el HTML real que se devolverá.

```tsx
    <>
      <h2>Greeter</h2>
      {
        !readResults.isError && !readResults.isLoading &&
          <ShowGreeting greeting={readResults.data} />
      }
      <hr />
```

Cree un componente `ShowGreeting` (explicado más adelante), pero solo si el saludo fue leído correctamente de la blockchain.

```tsx
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />
```

Este es el campo de texto donde el usuario puede establecer un nuevo saludo. Cada vez que el usuario presiona una tecla, se llama a `greetingChange`, que a su vez llama a `setNewGreeting`. Como `setNewGreeting` proviene del hook `useState`, provoca que el componente `Greeter` se renderice de nuevo. Esto significa que:

- Necesitamos especificar `value` para mantener el valor del nuevo saludo, ya que de lo contrario volvería al valor por defecto, la cadena vacía.
- `usePrepareContractWrite` se llama cada vez que cambia `newGreeting`, lo que significa que siempre tendrá el valor más reciente en la transacción preparada.

```tsx
      <button disabled={!workingTx.write}
              onClick={workingTx.write}
      >
        Update greeting
      </button>
```

Si no existe `workingTx.write`, aún estamos esperando la información necesaria para enviar la actualización del saludo, así que el botón se desactiva. Si existe un valor para `workingTx.write`, esa es la función que debe llamarse para enviar la transacción.

```tsx
      <hr />
      <ShowObject name="readResults" object={readResults} />
      <ShowObject name="preparedTx" object={preparedTx} />
      <ShowObject name="workingTx" object={workingTx} />
    </>
  )
}
```

Por último, para ayudarle a ver qué estamos haciendo, mostramos los tres objetos que usamos:

- `readResults`
- `preparedTx`
- `workingTx`

##### Componente `ShowGreeting` {#showgreeting-component}

Este componente muestra

```tsx
const ShowGreeting = (attrs : ShowGreetingAttrsType) => {
```

Una función de componente recibe un parámetro con todos los atributos del componente.

```tsx
  return <b>{attrs.greeting}</b>
}
```

##### Componente `ShowObject` {#showobject-component}

Con fines informativos, usamos el componente `ShowObject` para mostrar los objetos importantes (`readResults` para leer el saludo y `preparedTx` y `workingTx` para las transacciones que creamos).

```tsx
const ShowObject = (attrs: ShowObjectAttrsType ) => {
  const keys = Object.keys(attrs.object)
  const funs = keys.filter(k => typeof attrs.object[k] == "function")
  return <>
    <details>
```

No queremos saturar la interfaz con toda la información, así que, para poder verla o cerrarla, usamos una etiqueta [`details`](https://www.w3schools.com/tags/tag_details.asp).

```tsx
      <summary>{attrs.name}</summary>
      <pre>
        {JSON.stringify(attrs.object, null, 2)}
```

La mayoría de los campos se muestran con [`JSON.stringify`](https://www.w3schools.com/js/js_json_stringify.asp).

```tsx
      </pre>
      { funs.length > 0 &&
        <>
          Functions:
          <ul>
```

La excepción son las funciones, que no forman parte del [estándar JSON](https://www.json.org/json-en.html), así que deben mostrarse por separado.

```tsx
          {funs.map((f, i) =>
```

Dentro de JSX, el código dentro de `{` llaves `}` se interpreta como JavaScript. A continuación, el código dentro de los paréntesis `()` se interpreta de nuevo como JSX.

```tsx
           (<li key={i}>{f}</li>)
                )}
```

React requiere que las etiquetas en el [árbol DOM](https://www.w3schools.com/js/js_htmldom.asp) tengan identificadores únicos. Esto significa que los hijos de la misma etiqueta (en este caso, [la lista desordenada](https://www.w3schools.com/tags/tag_ul.asp)), necesitan diferentes atributos `key`.

```tsx
          </ul>
        </>
      }
    </details>
  </>
}
```

Cierre las diversas etiquetas HTML.

##### El `export` final {#the-final-export}

```tsx
export { Greeter }
```

El componente `Greeter` es el que debemos exportar para la aplicación.

#### `src/wagmi.ts` {#wagmi-ts}

Finalmente, varias definiciones relacionadas con WAGMI se encuentran en `src/wagmi.ts`. No voy a explicar todo aquí, porque la mayoría es código base (boilerplate) que probablemente no necesitará cambiar.

El código aquí no es exactamente igual al que está [en github](https://github.com/qbzzt/20230801-modern-ui/blob/main/src/wagmi.ts) porque más adelante en el artículo agregamos otra cadena ([Redstone Holesky](https://redstone.xyz/docs/network-info)).

```ts
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { holesky, sepolia } from 'wagmi/chains'
```

Importe las blockchains que soporta la aplicación. Puede ver la lista de cadenas soportadas [en el github de viem](https://github.com/wagmi-dev/viem/tree/main/src/chains/definitions).

```ts
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = 'c96e690bb92b6311e8e9b2a6a22df575'
```

Para poder utilizar [WalletConnect](https://walletconnect.com/) necesita un project ID para su aplicación. Puede obtenerlo en [cloud.walletconnect.com](https://cloud.walletconnect.com/sign-in).

```ts
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ holesky, sepolia ],
  [
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'My wagmi + RainbowKit App',
  chains,
  projectId: walletConnectProjectId,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains }
```

### Agregar otra blockchain {#add-blockchain}

Hoy en día existen muchas [soluciones de escalado L2](/layer-2/), y es posible que quiera soportar algunas que viem aún no soporta. Para hacerlo, modifique `src/wagmi.ts`. Estas instrucciones explican cómo agregar [Redstone Holesky](https://redstone.xyz/docs/network-info).

1. Importe el tipo `defineChain` desde viem.

   ```ts
   import { defineChain } from 'viem'
   ```

2. Agregue la definición de la red.

   ```ts
   const redstoneHolesky = defineChain({
      id: 17_001,
      name: 'Redstone Holesky',
      network: 'redstone-holesky',
      nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
      },
      rpcUrls: {
        default: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
      },
      public: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
        },
      },
      blockExplorers: {
        default: { name: 'Explorer', url: 'https://explorer.holesky.redstone.xyz' },
      },
   })
   ```

3. Agregue la nueva cadena a la llamada de `configureChains`.

   ```ts
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [ holesky, sepolia, redstoneHolesky ],
      [ publicProvider(), ],
    )
   ```

4. Asegúrese de que la aplicación conozca la dirección de sus contratos en la nueva red. En este caso, se modifica `src/components/Greeter.tsx`:

    ```ts
    const contractAddrs : AddressPerBlockchainType = {
      // Holesky
      17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',
    
      // Redstone Holesky
      17001: '0x4919517f82a1B89a32392E1BF72ec827ba9986D3',
    
      // Sepolia
      11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
    }
    ```

## Conclusión {#conclusion}

Por supuesto, realmente no le interesa crear una interfaz de usuario para `Greeter`. Usted quiere crear una interfaz de usuario para sus propios contratos. Para crear su propia aplicación, siga estos pasos:

1. Indique que quiere crear una aplicación wagmi.

   ```sh copy
   pnpm create wagmi
   ```

2. Nombre la aplicación.

3. Seleccione el framework **React**.

4. Seleccione la variante **Vite**.

5. Puede [agregar Rainbow kit](https://www.rainbowkit.com/docs/installation#manual-setup).

Ahora haga que sus contratos sean utilizables para el mundo entero.

[Vea aquí más de mi trabajo](https://cryptodocguy.pro/).

