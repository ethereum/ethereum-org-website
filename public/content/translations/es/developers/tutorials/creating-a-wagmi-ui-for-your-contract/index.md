---
title: "Crear una interfaz de usuario para tu contrato"
description: Usando componentes modernos como TypeScript, React, Vite y Wagmi, repasaremos una interfaz de usuario moderna, pero minimalista, y aprenderemos a conectar una billetera a la interfaz de usuario, llamar a un contrato inteligente para leer información, enviar una transacción a un contrato inteligente y monitorear eventos de un contrato inteligente para identificar cambios.
author: Ori Pomerantz
tags: ["typescript", "react", "vite", "wagmi", "frontend"]
skill: beginner
breadcrumb: Interfaz de usuario con WAGMI
published: 2023-11-01
lang: es
sidebarDepth: 3
---

Encontraste una característica que necesitamos en el ecosistema de Ethereum. Escribiste los contratos inteligentes para implementarla, y tal vez incluso algo de código relacionado que se ejecuta fuera de la cadena. ¡Esto es genial! Desafortunadamente, sin una interfaz de usuario no vas a tener ningún usuario, y la última vez que escribiste un sitio web la gente usaba módems de acceso telefónico y JavaScript era nuevo.

Este artículo es para ti. Asumo que sabes programar, y tal vez un poco de JavaScript y HTML, pero que tus habilidades de interfaz de usuario están oxidadas y desactualizadas. Juntos repasaremos una aplicación moderna y sencilla para que veas cómo se hace hoy en día.

## Por qué es importante esto {#why-important}

En teoría, podrías simplemente hacer que la gente use [Etherscan](https://sepolia.etherscan.io/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA#readContract) o [Blockscout](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_write_contract) para interactuar con tus contratos. Eso es genial para los Ethereans experimentados. Pero estamos intentando servir a [otros mil millones de personas](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). Esto no sucederá sin una gran experiencia de usuario, y una interfaz de usuario amigable es una gran parte de ello.

## Aplicación Greeter {#greeter-app}

Hay mucha teoría detrás de cómo funciona la interfaz de usuario moderna, y [muchos sitios buenos](https://react.dev/learn/thinking-in-react) [que lo explican](https://wagmi.sh/core/getting-started). En lugar de repetir el excelente trabajo realizado por esos sitios, voy a asumir que prefieres aprender haciendo y comenzar con una aplicación con la que puedas jugar. Todavía necesitas la teoría para hacer las cosas, y llegaremos a ella; simplemente iremos archivo fuente por archivo fuente, y discutiremos las cosas a medida que lleguemos a ellas.

### Instalación {#installation}

1. La aplicación usa la red de prueba [Sepolia](https://sepolia.dev/). Si es necesario, [obtén ETH de prueba de Sepolia](/developers/docs/networks/#sepolia) y [agrega Sepolia a tu billetera](https://chainlist.org/chain/11155111).

2. Clona el repositorio de GitHub e instala los paquetes necesarios.

   ```sh
   git clone https://github.com/qbzzt/260301-modern-ui-web3.git
   cd 260301-modern-ui-web3
   npm install
   ```

3. La aplicación utiliza puntos de acceso gratuitos, que tienen limitaciones de rendimiento. Si deseas utilizar un proveedor de [Nodo como servicio](/developers/docs/nodes-and-clients/nodes-as-a-service/), reemplaza las URL en [`src/wagmi.ts`](#wagmi-ts).

4. Inicia la aplicación.

   ```sh
   npm run dev
   ```

5. Navega a la URL mostrada por la aplicación. En la mayoría de los casos, es [http://localhost:5173/](http://localhost:5173/).

6. Puedes ver el código fuente del contrato, una versión modificada del Greeter de Hardhat, [en un explorador de cadena de bloques](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code).

### Recorrido por los archivos {#file-walk-through}

#### `index.html` {#index-html}

Este archivo es una plantilla HTML estándar, excepto por esta línea, que importa el archivo de script.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

La extensión del archivo indica que se trata de un [componente de React](https://www.w3schools.com/react/react_components.asp) escrito en [TypeScript](https://www.typescriptlang.org/), una extensión de JavaScript que admite la [comprobación de tipos](https://en.wikipedia.org/wiki/Type_system#Type_checking). TypeScript se compila a JavaScript, por lo que podemos usarlo en el lado del cliente.

Este archivo se explica principalmente por si estás interesado. Por lo general, no modificas este archivo, sino [`src/App.tsx`](#app-tsx) y los archivos que importa.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
```

Importa el código de la biblioteca que necesitamos.

```tsx
import App from './App.tsx'
```

Importa el componente de React que implementa la aplicación (ver más abajo).

```tsx
import { config } from './wagmi.ts'
```

Importa la configuración de [Wagmi](https://wagmi.sh/), que incluye la configuración de la cadena de bloques.

```tsx
const queryClient = new QueryClient()
```

Crea una nueva instancia del administrador de caché de [React Query](https://tanstack.com/query/latest/docs/framework/react/overview). Este objeto almacenará:

- Llamadas RPC en caché
- Lecturas de contratos
- Estado de recuperación en segundo plano

Necesitamos el administrador de caché porque wagmi v3 usa React Query internamente.

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

Crea el componente raíz de React. El parámetro para `render` es [JSX](https://www.w3schools.com/react/react_jsx.asp), un lenguaje de extensión que usa tanto HTML como JavaScript/TypeScript. El signo de exclamación aquí le dice al componente de TypeScript: "no sabes que `document.getElementById('root')` será un parámetro válido para `ReactDOM.createRoot`, pero no te preocupes, soy el desarrollador y te digo que lo habrá".

```tsx
  <React.StrictMode>
```

La aplicación va dentro de [un componente `React.StrictMode`](https://react.dev/reference/react/StrictMode). Este componente le dice a la biblioteca de React que inserte comprobaciones de depuración adicionales, lo cual es útil durante el desarrollo.

```tsx
    <WagmiProvider config={config}>
```

La aplicación también está dentro de [un componente `WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider). [La biblioteca Wagmi (we are going to make it)](https://wagmi.sh/) conecta las definiciones de la interfaz de usuario de React con [la biblioteca Viem](https://viem.sh/) para escribir una aplicación descentralizada (dapp) de Ethereum.

```tsx
      <QueryClientProvider client={queryClient}>
```

Y finalmente, agrega un proveedor de React Query para que cualquier componente de la aplicación pueda usar consultas en caché.

```tsx
        <App />
```

Ahora podemos tener el componente para la aplicación, que realmente implementa la interfaz de usuario. El `/>` al final del componente le dice a React que este componente no tiene ninguna definición en su interior, según el estándar XML.

```tsx
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
```

Por supuesto, tenemos que cerrar los otros componentes.

#### `src/App.tsx` {#app-tsx}

```tsx
import {
  useConnect,
  useConnection,
  useDisconnect,
  useSwitchChain
} from 'wagmi'

import { useEffect } from 'react'
import { Greeter } from './Greeter'
```

Importa las bibliotecas que necesitamos, así como [el componente `Greeter`](#greeter-tsx).

```tsx
const SEPOLIA_CHAIN_ID = 11155111
```

El ID de la cadena Sepolia.

```
function App() {
```

Esta es la forma estándar de crear un componente de React: definir una función que se llama cada vez que necesita ser renderizada. Esta función normalmente contiene código TypeScript o JavaScript, seguido de una declaración `return` que devuelve el código JSX.

```tsx
  const connection = useConnection()
```

Usa [`useConnection`](https://wagmi.sh/react/api/hooks/useConnection) para obtener información relacionada con la conexión actual, como la dirección y el `chainId`.

Por convención, en React las funciones llamadas `use...` son [hooks](https://www.w3schools.com/react/react_hooks.asp). Estas funciones no solo devuelven datos al componente; también aseguran que se vuelva a renderizar (la función del componente se ejecuta de nuevo, y su salida reemplaza a la anterior en el HTML) cuando esos datos cambian.

```tsx
  const { connectors, connect, status, error } = useConnect()
```

Usa [`useConnect`](https://wagmi.sh/react/api/hooks/useConnect) para obtener información sobre la conexión de la billetera.

```tsx
  const { disconnect } = useDisconnect()
```

[Este hook](https://wagmi.sh/react/api/hooks/useDisconnect) nos da la función para desconectarnos de la billetera.

```tsx
  const { switchChain } = useSwitchChain()
```

[Este hook](https://wagmi.sh/react/api/hooks/useSwitchChain) nos permite cambiar de cadena.

```tsx
  useEffect(() => {
```

El hook de React [`useEffect`](https://react.dev/reference/react/useEffect) te permite ejecutar una función cada vez que el valor de una variable cambia para sincronizar un sistema externo.

```tsx
    if (connection.status === 'connected' &&
        connection.chainId !== SEPOLIA_CHAIN_ID
    ) {
      switchChain({ chainId: SEPOLIA_CHAIN_ID })
    }
```

Si estamos conectados, pero no a la cadena de bloques Sepolia, cambia a Sepolia.

```tsx
  }, [connection.status, connection.chainId])
```

Vuelve a ejecutar la función cada vez que cambie el estado de la conexión o el chainId de la conexión.

```tsx
  return (
    <>
```

El JSX de un componente de React _debe_ devolver un solo componente HTML. Cuando tenemos varios componentes y no necesitamos un contenedor para envolverlos a todos, usamos un componente vacío (`<> ... </>`) para combinarlos en un solo componente.

```tsx
      <h2>Connection</h2>
      <div>
        status: {connection.status}
        <br />
        addresses: {JSON.stringify(connection.addresses)}
        <br />
        chainId: {connection.chainId}
      </div>
```

Proporciona información sobre la conexión actual. Dentro de JSX, `{<expression>}` significa evaluar la expresión como JavaScript.

```tsx
      {connection.status === 'connected' && (
```

La sintaxis `{<condition> && <value>} means "if the condition is `true`, evaluate to the value; if it isn't, evaluate to `false`".

Esta es la forma estándar de poner declaraciones if dentro de JSX.

```tsx
        <div>
          <Greeter />
          <hr />
```

JSX sigue el estándar XML, que es más estricto que HTML. Si una etiqueta no tiene una etiqueta de cierre correspondiente, _debe_ tener una barra diagonal (`/`) al final para terminarla.

Aquí tenemos dos de esas etiquetas, `<Greeter />` (que en realidad contiene el código HTML que se comunica con el contrato) y [`<HTML-PLACEHOLDER-HTMLTAG-8d9513 />` para una línea horizontal](https://www.w3schools.com/tags/tag_hr.asp).

```tsx
          <button type="button" onClick={disconnect}>
            Disconnect
          </button>
        </div>
      )}
```

Si el usuario hace clic en este botón, llama a la función `disconnect`.

```tsx
      {connection.status !== 'connected' && (
```

Si _no_ estamos conectados, muestra las opciones necesarias para conectarse a la billetera.

```tsx
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
```

En `connectors` tenemos una lista de conectores. Usamos [`map`](https://www.w3schools.com/jsref/jsref_map.asp) para convertirla en una lista de botones JSX para mostrar.

```tsx
            <button
              key={connector.uid}
```

En JSX es necesario que las etiquetas "hermanas" (etiquetas que descienden del mismo padre) tengan identificadores diferentes.

```tsx
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
```

Los botones del conector.

```tsx
          <div>{status}</div>
          <div>{error?.message}</div>
        </div>
      )}
```

Proporciona información adicional. La sintaxis de la expresión `<variable>?.<field>` le dice a JavaScript que si la variable está definida, evalúe ese campo. Si la variable no está definida, entonces esta expresión se evalúa como `undefined`.

La expresión `error.message`, cuando no hay error, generaría una excepción. El uso de `error?.message` nos permite evitar este problema.

#### `src/Greeter.tsx` {#greeter-tsx}

Este archivo contiene la mayor parte de la funcionalidad de la interfaz de usuario. Incluye definiciones que normalmente estarían en varios archivos, pero como se trata de un tutorial, el programa está optimizado para ser fácil de entender la primera vez, en lugar de para el rendimiento o la facilidad de mantenimiento.

```tsx
import {
          useState,
          useEffect,
       } from 'react'
import {  useChainId,
          useAccount,
          useReadContract,
          useWriteContract,
          useWatchContractEvent,
          useSimulateContract
       } from 'wagmi'
```

Usamos estas funciones de la biblioteca. Nuevamente, se explican a continuación donde se usan.

```tsx
import { AddressType } from 'abitype'
```

[La biblioteca `abitype`](https://abitype.dev/) nos proporciona definiciones de TypeScript para varios tipos de datos de Ethereum, como [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  { "type": "function", "name": "greet", ... },
  { "type": "function", "name": "setGreeting", ... },
  { "type": "event", "name": "SetGreeting", ... },
] as const   // greeterABI
```

El ABI para el contrato `Greeter`.
Si estás desarrollando los contratos y la interfaz de usuario al mismo tiempo, normalmente los pondrías en el mismo repositorio y usarías el ABI generado por el compilador de Solidity como un archivo en tu aplicación. Sin embargo, esto no es necesario aquí porque el contrato ya está desarrollado y no cambiará.

Usamos [`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) para decirle a TypeScript que esta es una constante _real_. Normalmente, cuando especificas en JavaScript `const x = {"a": 1}`, puedes cambiar el valor en `x`, simplemente no puedes asignarle un valor.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript está fuertemente tipado. Usamos esta definición para especificar la dirección donde se implementa el contrato `Greeter` en diferentes cadenas. La clave es un número (el chainId), y el valor es un `AddressType` (una dirección).

```tsx
const contractAddrs : AddressPerBlockchainType = {
  // Sepolia
    11155111: '0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA'
}
```

La dirección del contrato en [Sepolia](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract).

##### Componente `Timer` {#timer-component}

El componente `Timer` muestra el número de segundos desde un momento dado. Esto es importante por motivos de usabilidad. Cuando los usuarios hacen algo, esperan una reacción inmediata. En las cadenas de bloques, esto a menudo es imposible porque no sucede nada hasta que se coloca una transacción en un bloque. Una solución es mostrar cuánto tiempo ha pasado desde que el usuario realizó la acción, para que el usuario pueda decidir si el tiempo requerido es razonable.

```tsx
type TimerProps = {
  lastUpdate: Date
}
```

El componente `Timer` toma un parámetro, `lastUpdate`, que es el momento de la última acción.

```tsx
const Timer = ({ lastUpdate }: TimerProps) => {
  const [_, setNow] = useState(new Date())
```

Necesitamos tener un estado (una variable vinculada al componente) y actualizarlo para que el componente funcione correctamente. Pero nunca necesitamos leerlo, así que no te molestes en crear una variable.

```tsx
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
```

La función [`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp) nos permite programar una función para que se ejecute periódicamente. En este caso, cada segundo. La función llama a `setNow` para actualizar el estado, por lo que el componente `Timer` se volverá a renderizar. Envolvemos esto dentro de [`useEffect`](https://react.dev/reference/react/useEffect) con una lista de dependencias vacía para que suceda solo una vez, en lugar de cada vez que se renderiza el componente.

```tsx
  const secondsSinceUpdate = Math.floor(
    (Date.now() - lastUpdate.getTime()) / 1000
  )

  return (
    <span>{secondsSinceUpdate} seconds ago</span>
  )
}
```

Calcula el número de segundos desde la última actualización y devuélvelo.

##### Componente `Greeter` {#greeter-component}

```tsx
const Greeter = () => {
```

Finalmente, llegamos a definir el componente.

```tsx
  const chainId = useChainId()
  const account = useAccount()
```

Información sobre la cadena y la cuenta que estamos usando, cortesía de [Wagmi](https://wagmi.sh/). Debido a que este es un hook (`use...`), el componente se vuelve a renderizar cada vez que esta información cambia.

```tsx
  const greeterAddr = chainId && contractAddrs[chainId] 
```

La dirección del contrato Greeter, que es `undefined` si no tenemos información de la cadena, o si estamos en una cadena sin ese contrato.

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet", // Sin argumentos
  })
```

[El hook `useReadContract`](https://wagmi.sh/react/api/hooks/useReadContract) llama a la función `greet` del [contrato](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract).

```tsx
  const [ currentGreeting, setCurrentGreeting ] = 
    useState("Please wait while we fetch the greeting from the blockchain...")
  const [ newGreeting, setNewGreeting ] = useState("")
```

El [hook `useState`](https://www.w3schools.com/react/react_usestate.asp) de React nos permite especificar una variable de estado, cuyo valor persiste de una renderización del componente a otra. El valor inicial es el parámetro, en este caso la cadena vacía.

El hook `useState` devuelve una lista con dos valores:

1. El valor actual de la variable de estado.
2. Una función para modificar la variable de estado cuando sea necesario. Como este es un hook, cada vez que se llama, el componente se renderiza de nuevo.

En este caso, estamos usando una variable de estado para el nuevo saludo que el usuario quiere establecer.

```tsx
  const [ lastSetterAddress, setLastSetterAddress ] = useState("")
```

Si varios usuarios están usando el mismo contrato al mismo tiempo, podrían sobrescribir los saludos de los demás. Esto les parecería a los usuarios como si la aplicación estuviera funcionando mal. Si la aplicación muestra quién estableció el saludo por última vez, el usuario sabrá que fue otra persona y que la aplicación está funcionando correctamente.

```tsx
  const [ status, setStatus ] = useState("")
  const [ statusTime, setStatusTime ] = useState(new Date())
```

A los usuarios les gusta ver que sus acciones tienen un efecto inmediato. Sin embargo, en una cadena de bloques, este no es el caso. Estas variables de estado nos permiten al menos mostrar algo a los usuarios para que sepan que su acción está en progreso.

```tsx
  useEffect(() => {
    if (readResults.data) {
      setCurrentGreeting(readResults.data)
      setStatus("Greeting fetched from blockchain")
    }
  }, [readResults.data])
```

Si `readResults` anterior cambia los datos y no se establece en un valor falso (`undefined`, por ejemplo), actualiza el saludo actual al leído de la cadena de bloques. Además, actualiza el estado.

```tsx
  useWatchContractEvent({
    address: greeterAddr,
    abi: greeterABI,
    eventName: 'SetGreeting',
    chainId,
```

Escucha los eventos `SetGreeting`.

```tsx
    enabled: !!greeterAddr,
```

`!!<value>` significa que si el valor es `false`, o un valor que se evalúa como falso, como `undefined`, `0` o una cadena vacía, la expresión en general es `false`. Para cualquier otro valor, es `true`. Es una forma de convertir valores a booleanos, porque si no hay `greeterAddr`, no queremos escuchar eventos.

```tsx
    onLogs: logs => {
      const greetingFromContract = logs[0].args.greeting
      setCurrentGreeting(greetingFromContract)
      setLastSetterAddress(logs[0].args.sender)
      updateStatus("Greeting updated by event")
    },
  })
```

Cuando vemos registros (lo que sucede cuando vemos un nuevo evento), significa que el saludo ha sido modificado. En ese caso, podemos actualizar `currentGreeting` y `lastSetterAddress` a los nuevos valores. Además, queremos actualizar la visualización del estado.

```tsx
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
    setStatusTime(new Date())
  }
```

Cuando actualizamos el estado queremos hacer dos cosas:

1. Actualizar la cadena de estado (`status`)
2. Actualizar la hora de la última actualización de estado (`statusTime`) a la hora actual.

```tsx
  const greetingChange = (evt) =>
    setNewGreeting(evt.target.value)
```

Este es el controlador de eventos para los cambios en el nuevo campo de entrada de saludo. Podríamos especificar el tipo del parámetro `evt`, pero TypeScript es un lenguaje de tipado opcional. Como esta función se llama solo una vez, en un controlador de eventos HTML, no creo que sea necesario.

```tsx
  const { writeContractAsync } = useWriteContract()
```

La función para escribir en un contrato. Es similar a [`writeContracts`](https://wagmi.sh/core/api/actions/writeContracts#writecontracts), pero permite mejores actualizaciones de estado.

```tsx
  const simulation = useSimulateContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [newGreeting],
    account: account.address    
  })
```

Este es el proceso para enviar una transacción de cadena de bloques desde la perspectiva del cliente:

1. Enviar la transacción a un nodo en la cadena de bloques usando [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas).
2. Esperar una respuesta del nodo.
3. Cuando se recibe la respuesta, pedir al usuario que firme la transacción a través de la billetera. Este paso _tiene_ que ocurrir después de que se reciba la respuesta del nodo porque al usuario se le muestra el costo de gas de la transacción antes de firmarla.
4. Esperar a que el usuario apruebe.
5. Enviar la transacción de nuevo, esta vez usando [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction).

Es probable que el paso 2 tome una cantidad de tiempo perceptible, durante el cual los usuarios pueden preguntarse si su comando fue recibido por la interfaz de usuario y por qué aún no se les pide que firmen la transacción. Eso crea una mala experiencia de usuario (UX).

Una solución es enviar `eth_estimateGas` cada vez que cambia un parámetro. Luego, cuando el usuario realmente quiere enviar la transacción (en este caso presionando **Update greeting**), se conoce el costo del gas y el usuario puede ver la página de la billetera de inmediato.

```tsx
  return (
```

Ahora finalmente podemos crear el HTML real para devolver.

```tsx
    <>
      <h2>Greeter</h2>
      {currentGreeting}
```

Muestra el saludo actual.

```tsx
      {lastSetterAddress && (
        <p>Last updated by {
          lastSetterAddress === account.address ? "you" : lastSetterAddress
        }</p>
      )}
```

Si sabemos quién estableció el saludo por última vez, muestra esa información. `Greeter` no realiza un seguimiento de esta información, y no queremos mirar hacia atrás en busca de eventos `SetGreeting`, por lo que solo la obtenemos una vez que se cambia el saludo mientras nos estamos ejecutando.

```tsx
      <hr />      
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />      
      <br />
```

Este es el campo de texto de entrada donde el usuario puede establecer un nuevo saludo. Cada vez que el usuario presiona una tecla, llamamos a `greetingChange`, que llama a `setNewGreeting`. Dado que `setNewGreeting` proviene de `useState`, hace que el componente `Greeter` se vuelva a renderizar. Esto significa que:

- Necesitamos especificar `value` para mantener el valor del nuevo saludo, porque de lo contrario volvería al valor predeterminado, la cadena vacía.
- `simulation` también se actualiza cada vez que cambia `newGreeting`, lo que significa que obtendremos una simulación con el saludo correcto. Esto podría ser relevante porque el costo del gas depende del tamaño de los datos de la llamada, que depende de la longitud de la cadena.

```tsx
      <button disabled={!simulation.data}
```

Solo habilita el botón una vez que tengamos la información que necesitamos para enviar la transacción.

```tsx
        onClick={async () => {
          updateStatus("Please confirm in wallet...")
```

Actualiza el estado. En este punto, el usuario debe confirmar en la billetera.

```tsx
          await writeContractAsync(simulation.data.request)
          updateStatus("Transaction sent, waiting for greeting to change...")
        }}
      >
        Update greeting
      </button>

```

`writeContractAsync` solo regresa después de que la transacción se envía realmente. Esto nos permite mostrar al usuario cuánto tiempo ha estado esperando la transacción para ser incluida en la cadena de bloques.

```tsx
      <h4>Status: {status}</h4>
      <p>Updated <Timer lastUpdate={statusTime} /> </p>
    </>
  )
}
```

Muestra el estado y cuánto tiempo ha pasado desde que se actualizó.

```
export {Greeter}
```

Exporta el componente.

#### `src/wagmi.ts` {#wagmi-ts}

Finalmente, varias definiciones relacionadas con Wagmi están en `src/wagmi.ts`. No voy a explicar todo aquí, porque la mayor parte es código repetitivo que es poco probable que necesites cambiar.

```ts
import { http, webSocket, createConfig, fallback } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
```

La configuración de Wagmi incluye las cadenas compatibles con esta aplicación. Puedes ver la [lista de cadenas disponibles](https://wagmi.sh/core/api/chains).

```ts
  connectors: [
    injected(),
  ],
```

[Este conector](https://wagmi.sh/core/api/connectors/injected) nos permite hablar con una billetera instalada en el navegador.

```ts
  transports: {
    [sepolia.id]: http()
```

El punto de conexión HTTP predeterminado que viene con Viem es lo suficientemente bueno. Si queremos una URL diferente, podemos usar `http("https:// hostname ")` o `webSocket("wss:// hostname ")`.

```ts
  },
  multiInjectedProviderDiscovery: false,
})
```

## Agregar otra cadena de bloques {#add-blockchain}

En estos días hay muchas [soluciones de escalado de capa 2 (L2)](https://ethereum.org/layer-2/), y es posible que desees admitir algunas que Viem aún no admite. Para hacerlo, modificas `src/wagmi.ts`. Estas instrucciones explican cómo agregar [Optimism Sepolia](https://chainlist.org/chain/11155420).

1.  Edita `src/wagmi.ts`

    A. Importa el tipo `defineChain` de Viem.

          ```ts
          import { defineChain } from 'viem'
          ```

    B. Agrega la definición de la red. Realmente no necesitas hacer esto para Optimism Sepolia, [ya está en `viem`](https://github.com/wevm/viem/blob/main/src/chains/definitions/optimismSepolia.ts), pero de esta manera aprendes cómo agregar una cadena de bloques que no está en `viem`.

          ```ts
          const optimismSepolia = defineChain({
              id: 11_155_420,
              name: 'OP Sepolia',
              nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
              rpcUrls: {
                default: {
                  http: ['https://sepolia.optimism.io'],
                  webSocket: ['wss://optimism-sepolia.drpc.org'],
                },
              },
              blockExplorers: {
                default: {
                  name: 'Blockscout',
                  url: 'https://optimism-sepolia.blockscout.com',
                  apiUrl: 'https://optimism-sepolia.blockscout.com/api',
                }
              },
          })
          ```

    C. Agrega la nueva cadena a la llamada `createConfig`.

          ```ts
          export const config = createConfig({
            chains: [sepolia, optimismSepolia],
            connectors: [
              injected(),
            ],
            transports: {
              [optimismSepolia.id]: http(),
              [sepolia.id]: http()
            },
            multiInjectedProviderDiscovery: false,
          })
          ```

2.  Edita `src/App.tsx` para comentar el cambio automático a Sepolia. En un sistema de producción, probablemente mostrarías botones con enlaces a cada una de las cadenas de bloques que admites.

    ```ts
    /*
    useEffect(() => {
      if (connection.status === 'connected' &&
          connection.chainId !== SEPOLIA_CHAIN_ID
      ) {
        switchChain({ chainId: SEPOLIA_CHAIN_ID })
      }
    }, [connection.status, connection.chainId])
    */
    ```

3.  Edita `src/Greeter.tsx` para asegurarte de que la aplicación conozca la dirección de tus contratos en la nueva red.

    ```ts
    const contractAddrs: AddressPerBlockchainType = {
      // Optimism Sepolia
      11155420: "0x4dd85791923E9294E934271522f63875EAe5806f",

      // Sepolia
      11155111: "0x7143d5c190F048C8d19fe325b748b081903E3BF0",
    }
    ```

4.  En tu navegador.

    A. Navega a [ChainList](https://chainlist.org/chain/11155420?testnets=true) y haz clic en uno de los botones en el lado derecho de la tabla para agregar la cadena a tu billetera.

    B. En la aplicación, haz clic en **Disconnect** (Desconectar) y luego vuelve a conectarte para cambiar la cadena de bloques. Hay formas más agradables de manejar esto, pero requerirían cambios en la aplicación.

## Conclusión {#conclusion}

Por supuesto, realmente no te importa proporcionar una interfaz de usuario para `Greeter`. Quieres crear una interfaz de usuario para tus propios contratos. Para crear tu propia aplicación, ejecuta estos pasos:

1. Especifica crear una aplicación Wagmi.

   ```sh copy
   npm create wagmi
   ```

2. Escribe `y` para continuar.

3. Nombra la aplicación.

4. Selecciona el marco de trabajo **React**.

5. Selecciona la variante **Vite**.

Ahora ve y haz que tus contratos sean utilizables para todo el mundo.

[Mira aquí para ver más de mi trabajo](https://cryptodocguy.pro/).