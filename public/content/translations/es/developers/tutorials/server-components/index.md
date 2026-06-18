---
title: "Componentes de servidor y agentes para aplicaciones web3"
description: "Después de leer este tutorial, podrá escribir servidores en TypeScript que escuchen eventos en una cadena de bloques y respondan en consecuencia con sus propias transacciones. Esto le permitirá escribir aplicaciones centralizadas (porque el servidor es un punto de falla), pero que pueden interactuar con entidades web3. Las mismas técnicas también se pueden utilizar para escribir un agente que responda a eventos en cadena sin intervención humana."

author: Ori Pomerantz
lang: es
tags: ["agente", "servidor", "fuera de la cadena", "dapps"]
skill: beginner
breadcrumb: Componentes de servidor
published: 2024-07-15
---

## Introducción {#introduction}

En la mayoría de los casos, una aplicación descentralizada (dapp) utiliza un servidor para distribuir el software, pero toda la interacción real ocurre entre el cliente (generalmente, el navegador web) y la cadena de bloques.

![Normal interaction between web server, client, and blockchain](./fig-1.svg)

Sin embargo, hay algunos casos en los que una aplicación se beneficiaría de tener un componente de servidor que se ejecute de forma independiente. Dicho servidor podría responder a eventos y a solicitudes que provengan de otras fuentes, como una API, emitiendo transacciones.

![The interaction with the addition of a server](./fig-2.svg)

Hay varias tareas posibles que un servidor de este tipo podría cumplir.

- Poseedor de estado secreto. En los juegos, a menudo es útil no tener toda la información que el juego conoce disponible para los jugadores. Sin embargo, _no hay secretos en la cadena de bloques_, cualquier información que esté en la cadena de bloques es fácil de descubrir para cualquiera. Por lo tanto, si parte del estado del juego debe mantenerse en secreto, debe almacenarse en otro lugar (y posiblemente verificar los efectos de ese estado utilizando [pruebas de conocimiento cero](/zero-knowledge-proofs)).

- Oráculo centralizado. Si lo que está en juego es lo suficientemente bajo, un servidor externo que lea cierta información en línea y luego la publique en la cadena puede ser lo suficientemente bueno como para usarlo como un [oráculo](/developers/docs/oracles/).

- Agente. Nada sucede en la cadena de bloques sin una transacción que lo active. Un servidor puede actuar en nombre de un usuario para realizar acciones como el [arbitraje](/developers/docs/mev/#mev-examples-dex-arbitrage) cuando se presenta la oportunidad.

## Programa de muestra {#sample-program}

Puede ver un servidor de muestra [en GitHub](https://github.com/qbzzt/20240715-server-component). Este servidor escucha los eventos provenientes de [este contrato](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code), una versión modificada del Greeter de Hardhat. Cuando se cambia el saludo, lo vuelve a cambiar.

Para ejecutarlo:

1. Clone el repositorio.

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. Instale los paquetes necesarios. Si aún no lo tiene, [instale Node primero](https://nodejs.org/en/download/package-manager).

   ```sh copy
   npm install
   ```

3. Edite `.env` para especificar la clave privada de una cuenta que tenga ETH en la red de prueba Holesky. Si no tiene ETH en Holesky, puede [usar este faucet](https://holesky-faucet.pk910.de/).

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <private key goes here>
   ```

4. Inicie el servidor.

   ```sh copy
   npm start
   ```

5. Vaya a [un explorador de bloques](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract) y, utilizando una dirección diferente a la que tiene la clave privada, modifique el saludo. Verá que el saludo se vuelve a modificar automáticamente.

### ¿Cómo funciona? {#how-it-works}

La forma más fácil de entender cómo escribir un componente de servidor es repasar el de muestra línea por línea.

#### `src/app.ts` {#src-app-ts}

La gran mayoría del programa está contenida en [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts).

##### Creación de los objetos prerrequisitos {#}

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

Estas son las entidades de [Viem](https://viem.sh/) que necesitamos, funciones y [el tipo `Address`](https://viem.sh/docs/glossary/types#address). Este servidor está escrito en [TypeScript](https://www.typescriptlang.org/), que es una extensión de JavaScript que lo hace [fuertemente tipado](https://en.wikipedia.org/wiki/Strong_and_weak_typing).

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[Esta función](https://viem.sh/docs/accounts/privateKey) nos permite generar la información de la billetera, incluida la dirección, correspondiente a una clave privada.

```typescript
import { holesky } from "viem/chains"
```

Para usar una cadena de bloques en Viem, necesita importar su definición. En este caso, queremos conectarnos a la cadena de bloques de prueba [Holesky](https://github.com/eth-clients/holesky).

```typescript
// Así es como agregamos las definiciones en .env a process.env.
import * as dotenv from "dotenv"
dotenv.config()
```

Así es como leemos `.env` en el entorno. Lo necesitamos para la clave privada (ver más adelante).

```typescript
const greeterAddress : Address = "0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6"
const greeterABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
         .
         .
         .
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "name": "setGreeting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const
```

Para usar un contrato necesitamos su dirección y el [ABI](/glossary/#abi) para el mismo. Proporcionamos ambos aquí.

En JavaScript (y por lo tanto en TypeScript) no se puede asignar un nuevo valor a una constante, pero _sí_ se puede modificar el objeto que está almacenado en ella. Al usar el sufijo `as const` le estamos diciendo a TypeScript que la lista en sí es constante y no puede ser cambiada.

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

Cree un [cliente público](https://viem.sh/docs/clients/public.html) de Viem. Los clientes públicos no tienen una clave privada adjunta y, por lo tanto, no pueden enviar transacciones. Pueden llamar a [funciones `view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm), leer saldos de cuentas, etc.

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

Las variables de entorno están disponibles en [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env). Sin embargo, TypeScript es fuertemente tipado. Una variable de entorno puede ser cualquier cadena, o estar vacía, por lo que el tipo para una variable de entorno es `string | undefined`. Sin embargo, una clave se define en Viem como `0x${string}` (`0x` seguido de una cadena). Aquí le decimos a TypeScript que la variable de entorno `PRIVATE_KEY` será de ese tipo. Si no lo es, obtendremos un error en tiempo de ejecución.

La función [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) luego usa esta clave privada para crear un objeto de cuenta completo.

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

A continuación, usamos el objeto de cuenta para crear un [cliente de billetera](https://viem.sh/docs/clients/wallet). Este cliente tiene una clave privada y una dirección, por lo que se puede usar para enviar transacciones.

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

Ahora que tenemos todos los prerrequisitos, finalmente podemos crear una [instancia de contrato](https://viem.sh/docs/contract/getContract). Usaremos esta instancia de contrato para comunicarnos con el contrato en cadena.

##### Lectura de la cadena de bloques {#}

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

Las funciones del contrato que son de solo lectura ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) y [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)) están disponibles bajo `read`. En este caso, lo usamos para acceder a la función [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217), que devuelve el saludo.

JavaScript es de un solo hilo, por lo que cuando iniciamos un proceso de larga duración necesitamos [especificar que lo hacemos de forma asíncrona](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE). Llamar a la cadena de bloques, incluso para una operación de solo lectura, requiere un viaje de ida y vuelta entre la computadora y un nodo de la cadena de bloques. Esa es la razón por la que especificamos aquí que el código necesita hacer `await` para el resultado.

Si está interesado en cómo funciona esto, puede [leer al respecto aquí](https://www.w3schools.com/js/js_promise.asp), pero en términos prácticos todo lo que necesita saber es que hace `await` a los resultados si inicia una operación que toma mucho tiempo, y que cualquier función que haga esto tiene que ser declarada como `async`.

##### Emisión de transacciones {#}

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

Esta es la función a la que llama para emitir una transacción que cambia el saludo. Como esta es una operación larga, la función se declara como `async`. Debido a la implementación interna, cualquier función `async` necesita devolver un objeto `Promise`. En este caso, `Promise<any>` significa que no especificamos qué se devolverá exactamente en la `Promise`.

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

El campo `write` de la instancia del contrato tiene todas las funciones que escriben en el estado de la cadena de bloques (aquellas que requieren enviar una transacción), como [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862). Los parámetros, si los hay, se proporcionan como una lista, y la función devuelve el hash de la transacción.

```typescript
    console.log(`Working on a fix, see https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

Reporte el hash de la transacción (como parte de una URL al explorador de bloques para verla) y devuélvalo.

##### Respuesta a eventos {#}

```typescript
greeter.watchEvent.SetGreeting({
```

[La función `watchEvent`](https://viem.sh/docs/actions/public/watchEvent) le permite especificar que una función se ejecute cuando se emite un evento. Si solo le importa un tipo de evento (en este caso, `SetGreeting`), puede usar esta sintaxis para limitarse a ese tipo de evento.

```typescript
    onLogs: logs => {
```

La función `onLogs` se llama cuando hay entradas de registro. En Ethereum, "registro" y "evento" suelen ser intercambiables.

```typescript
console.log(
  `Address ${logs[0].args.sender} changed the greeting to ${logs[0].args.greeting}`
)
```

Podría haber múltiples eventos, pero por simplicidad solo nos importa el primero. `logs[0].args` son los argumentos del evento, en este caso `sender` y `greeting`.

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insists on it being Hello!`)
    }
})
```

Si el remitente _no_ es este servidor, use `setGreeting` para cambiar el saludo.

#### `package.json` {#package-json}

[Este archivo](https://github.com/qbzzt/20240715-server-component/blob/main/package.json) controla la configuración de [Node.js](https://nodejs.org/en). Este artículo solo explica las definiciones importantes.

```json
{
  "main": "dist/index.js",
```

Esta definición especifica qué archivo JavaScript ejecutar.

```json
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

Los scripts son varias acciones de la aplicación. En este caso, el único que tenemos es `start`, que compila y luego ejecuta el servidor. El comando `tsc` es parte del paquete `typescript` y compila TypeScript a JavaScript. Si desea ejecutarlo manualmente, se encuentra en `node_modules/.bin`. El segundo comando ejecuta el servidor.

```json
  "type": "module",
```

Hay múltiples tipos de aplicaciones de nodo de JavaScript. El tipo `module` nos permite tener `await` en el código de nivel superior, lo cual es importante cuando realiza operaciones lentas (y por lo tanto, asíncronas).

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

Estos son paquetes que solo se requieren para el desarrollo. Aquí necesitamos `typescript` y debido a que lo estamos usando con Node.js, también estamos obteniendo los tipos para variables y objetos de nodo, como `process`. [La notación `^<version>`](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) significa esa versión o una versión superior que no tenga cambios incompatibles. Consulte [aquí](https://semver.org) para obtener más información sobre el significado de los números de versión.

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

Estos son paquetes que se requieren en tiempo de ejecución, al ejecutar `dist/app.js`.

## Conclusión {#conclusion}

El servidor centralizado que creamos aquí hace su trabajo, que es actuar como un agente para un usuario. Cualquier otra persona que quiera que la dapp siga funcionando y esté dispuesta a gastar el gas puede ejecutar una nueva instancia del servidor con su propia dirección.

Sin embargo, esto solo funciona cuando las acciones del servidor centralizado se pueden verificar fácilmente. Si el servidor centralizado tiene alguna información de estado secreta, o ejecuta cálculos difíciles, es una entidad centralizada en la que necesita confiar para usar la aplicación, que es exactamente lo que las cadenas de bloques intentan evitar. En un artículo futuro planeo mostrar cómo usar [pruebas de conocimiento cero](/zero-knowledge-proofs) para sortear este problema.

[Vea aquí más de mi trabajo](https://cryptodocguy.pro/).