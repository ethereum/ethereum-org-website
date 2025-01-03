---
title: "The Graph: Corrección de consultas de datos web3"
description: La cadena de bloques es como una base de datos pero sin SQL. Todos los datos están ahí, pero no hay forma de acceder a ellos. Déjeme mostrarle cómo solucionar este problema con The Graph y GraphQL.
author: Markus Waas
lang: es
tags:
  - "solidity"
  - "contratos inteligentes"
  - "consultar"
  - "The Graph"
  - "crear-eth-app"
  - "reaccionar"
skill: intermediate
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

Esta vez ahondaremos un poco más en The Graph, que esencialmente se convirtió en la pila estándar para el desarrollo de dApps el pasado año. Veamos primero cómo haríamos las cosas de la manera tradicional...

## Sin The Graph... {#without-the-graph}

Vamos con un ejemplo simple para fines ilustrativos. A todos nos gustan los juegos, así que imagine un juego simple en el que los usuarios hacen apuestas:

```solidity
pragma solidity 0.7.1;

contract Game {
    uint256 totalGamesPlayerWon = 0;
    uint256 totalGamesPlayerLost = 0;
    event BetPlaced(address player, uint256 value, bool hasWon);

    function placeBet() external payable {
        bool hasWon = evaluateBetForPlayer(msg.sender);

        if (hasWon) {
            (bool success, ) = msg.sender.call{ value: msg.value * 2 }('');
            require(success, "Transfer failed");
            totalGamesPlayerWon++;
        } else {
            totalGamesPlayerLost++;
        }

        emit BetPlaced(msg.sender, msg.value, hasWon);
    }
}
```

Digamos en en nuestra dApp queremos mostrar las apuestas totales, las victorias/derrotas totales y también actualizarlo si alguien juega de nuevo. El enfoque sería este:

1. Obtener `totalGamesPlayerWon`.
2. Obtener `totalGamesPlayerLost`.
3. Suscribirse a eventos `BetPlaced`.

Podemos escuchar el evento [en Web3](https://docs.web3js.org/api/web3/class/Contract#events) como se muestra a la derecha, pero esto requiere manejar algunos casos.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // event fired
})
.on('changed', function(event) {
    // event was removed again
})
.on('error', function(error, receipt) {
    // tx rejected
});
```

Ahora bien, esto sigue estando bien para nuestro sencillo ejemplo. Pero digamos que ahora queremos mostrar las cantidades de partidas ganadas o perdidas solo para el jugador actual. Bueno, no tenemos suerte; sería mejor implementar un nuevo contrato que almacene esos valores y permita recuperarlos. Ahora imagine un contrato inteligente y una dapp mucho más complicados; las cosas se pueden descontrolar rápidamente.

![Uno no consulta simplemente](./one-does-not-simply-query.jpg)

Se puede ver que esto no es lo más adecuado:

- No funciona para contratos ya implementados.
- Genera costos de gas extra para almacenar dichos valores.
- Se requiere otra invocación para recuperar los datos para un nodo de Ethereum.

![Eso no es lo suficientemente bueno](./not-good-enough.jpg)

Veamos ahora una mejor solución.

## Déjeme presentarle GraphQL {#let-me-introduce-to-you-graphql}

Primero hablemos de GraphQL, que fue originalmente desarrollado e implementado por Facobook. Puede que esté familiarizado con el tradicional modelo de API tipo Rest. Ahora, imagine que pudiera escribir la consulta para los datos que le interesen exactamente:

![API de GraphQL vs. API tipo REST](./graphql.jpg)

<img src="https://cdn0.scrvt.com/b095ee27d37b3d7b6b150adba9ac6ec8/42226f4816a77656/bc5c8b270798/graphql-querygif.gif" width="100%" />

Las dos imágenes representan en términos generales la esencia de GraphQL. Con la consulta de la derecha podemos definir exactamente qué datos queremos, así que ahí recibimos todo en una única solicitud y nada más que exactamente lo que necesitamos. Un servidor de GraphQL maneja la obtención de todos los datos requeridos, por lo que es increíblemente fácil de usar desde el lado del consumidor del frontend. [Esta es una buena explicación](https://www.apollographql.com/blog/graphql-explained-5844742f195e/) de cómo exactamente el servidor gestiona una consulta si usted está interesado.

Ahora, con ese conocimiento, vayamos finalmente al campo de la cadena de bloques y The Graph.

## ¿Qué es The Graph? {#what-is-the-graph}

Una cadena de bloques es una base de datos descentralizada, pero, a diferencia de lo habitual, no tenemos un lenguaje de consulta para esta base de datos. Las soluciones para recuperar datos son complejas o completamente imposibles. The Graph es un protocolo descentralizado destinado a indexar y consultar datos de la cadena de bloques. Y puede que haya adivinado: es usar GraphQL como lenguaje de consulta.

![The Graph](./thegraph.png)

Los ejemplos son siempre la mejor manera de entender algo, así que utilicemos The Graph para nuestro ejemplo de GameContract.

## Cómo crear un subgraph {#how-to-create-a-subgraph}

La definición de cómo indexar datos se denomina subgraph. Requiere tres componentes:

1. Manifiesto (`subgraph.yaml`)
2. Esquema (`schema.graphql`)
3. Mapeo (`mapping.ts`)

### Manifiesto (`subgraph.yaml`) {#manifest}

El manifiesto es nuestro archivo de configuración y define:

- qué contratos inteligentes se deben indexar (dirección, red, ABI...)
- a qué eventos se debe escuchar
- otros aspectos a escuchar, como llamadas a funciones o bloques
- las funciones de mapeo invocadas (ver `mapping.ts` abajo)

Puede definir múltiples contratos y manejadores (handlers) aquí. Una configuración típica tendría una carpeta de subgraphs dentro del proyecto Hardhat con su propio repositorio. Luego puede referenciar fácilmente el ABI.

Por razones de conveniencia también puede querer usar una herramienta de plantillas como mustache. Luego creará un `subgraph.template.yaml` e insertará las direcciones con base en las últimas implementaciones. Para una configuración de ejemplo más avanzada, vea por ejemplo el [repositorio de subgraphs de Aave](https://github.com/aave/aave-protocol/tree/master/thegraph).

La documentación completa se puede obtener [aquí](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

```yaml
specVersion: 0.0.1
description: Placing Bets on Ethereum
repository: - GitHub link -
schema:
  file: ./schema.graphql
dataSources:
  - kind: ethereum/contract
    name: GameContract
    network: mainnet
    source:
      address: '0x2E6454...cf77eC'
      abi: GameContract
      startBlock: 6175244
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.1
      language: wasm/assemblyscript
      entities:
        - GameContract
      abis:
        - name: GameContract
          file: ../build/contracts/GameContract.json
      eventHandlers:
        - event: PlacedBet(address,uint256,bool)
          handler: handleNewBet
      file: ./src/mapping.ts
```

### Esquema (`schema.graphql`) {#schema}

El esquema es la definición de datos de GraphQL. Le permitirá definir qué entidades existen y sus tipos. Los tipos admitidos de The Graph son:

- Bytes
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

También puede utilizar entidades como tipo para definir relaciones. En nuestro ejemplo definimos una relación de uno a muchos del jugador a las apuestas. El ! significa que el valor no puede estar vacío. La documentación completa se puede consultar [aquí](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

```graphql
type Bet @entity {
  id: ID!
  player: Player!
  playerHasWon: Boolean!
  time: Int!
}

type Player @entity {
  id: ID!
  totalPlayedCount: Int
  hasWonCount: Int
  hasLostCount: Int
  bets: [Bet]!
}
```

### Mapeo (`mapping.ts`) {#mapping}

El archivo de mapeo de The Graph define nuestras funciones que transforman los eventos entrantes en entidades. Está escrito en AssemblblyScript, un subconjunto de Typescript. Esto significa que puede ser compilado en WASM (WebAssembly) para una ejecución más eficiente y portátil del mapeo.

Tendrá que definir cada función mencionada en el archivo `subgraph.yaml`, así que en nuestro caso necesitamos solo una: `handleNewBet`. Primero tratamos de cargar la entidad Player desde la dirección del remitente como id. Si no existe, crearemos una nueva entidad y la llenaremos con valores iniciales.

Luego creamos una nueva entidad Bet. El id para esto será `event.transaction.hash.toHex() + "-" + event.logIndex.toString()`, garantizando siempre un valor único. Usar solo el hash no es suficiente, ya que alguien podría estar llamando a la función placeBet varias veces en una transacción a través de un contrato inteligente.

Por último, podemos actualizar la entidad Player con todos los datos. Los arrays no pueden empujarse directamente, sino que necesitan ser actualizados como se muestra aquí. Utilizamos el id para referenciar la apuesta. `.save()` es necesario al final para almacenar una entidad.

La documentación completa puede obtenerse aquí: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. También puede añadir salida de registro al archivo de mapeo; consulte [aquí](https://thegraph.com/docs/assemblyscript-api#api-reference).

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // create if doesn't exist yet
    player = new Player(event.transaction.from.toHex())
    player.bets = new Array<string>(0)
    player.totalPlayedCount = 0
    player.hasWonCount = 0
    player.hasLostCount = 0
  }

  let bet = new Bet(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  bet.player = player.id
  bet.playerHasWon = event.params.hasWon
  bet.time = event.block.timestamp
  bet.save()

  player.totalPlayedCount++
  if (event.params.hasWon) {
    player.hasWonCount++
  } else {
    player.hasLostCount++
  }

  // update array like this
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## Uso en el frontend {#using-it-in-the-frontend}

Usando algo como Apollo Boost, puede integrar de forma sencilla The Graph en su dapp de React (o Apollo-Vue). Especialmente al usar hooks de React y Apollo, la obtención de datos es muy simple: solo requiere escribir una única consulta de GraphQl en su componente. Una configuración típica podría ser la siguiente:

```javascript
// See all subgraphs: https://thegraph.com/explorer/
const client = new ApolloClient({
  uri: "{{ subgraphUrl }}",
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
)
```

Y ahora podemos escribir por ejemplo una consulta como esta. Esto nos va a traer como resultado

- cuántas veces ganó el usuario actual
- cuántas veces perdió el usuario actual
- una lista de marcas de tiempo con todas sus apuestas anteriores

Todo en una sola solicitud al servidor de GraphQL.

```javascript
const myGraphQlQuery = gql`
    players(where: { id: $currentUser }) {
      totalPlayedCount
      hasWonCount
      hasLostCount
      bets {
        time
      }
    }
`

const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

![Magia](./magic.jpg)

Pero nos estaría faltando una última pieza del rompecabezas y es el servidor. Puede ejecutarlo usted mismo o usar el servicio alojado.

## El servidor de The Graph {#the-graph-server}

### Graph Explorer, el servicio alojado {#graph-explorer-the-hosted-service}

La forma más fácil es utilizar el servicio alojado. Siga las instrucciones que figuran [aquí](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) para implementar un subgraph. Para muchos proyectos puede encontrar subgraphs existentes en el [explorador](https://thegraph.com/explorer/).

![The Graph Explorer](./thegraph-explorer.png)

### Ejecución de tu propio nodo {#running-your-own-node}

Alternativemente, puede ejecutar su propio nodo. Consulte la documentación [aquí](https://github.com/graphprotocol/graph-node#quick-start). Una razón para hacer esto podría ser usar una red no admitida por el servicio alojado. Las redes actualmente admitidas se [pueden encontrar aquí](https://thegraph.com/docs/en/developing/supported-networks/).

## El futuro descentralizado {#the-decentralized-future}

GraphQL también soporta streams para eventos entrantes nuevos. Estos son admitidos en The Graph a través de [substreams](https://thegraph.com/docs/en/substreams/) que actualmente están en versión beta abierta.

En [2021](https://thegraph.com/blog/mainnet-migration/), The Graph inició su transición a una red descentralizada de indexación. Puede leer más sobre la arquitectura de esta red descentralizada de indexación [aquí](https://thegraph.com/docs/en/network/explorer/).

Dos aspectos clave son:

1. Los usuarios pagan a los indexadores por las consultas.
2. Los indexadores apuestan Graph Tokens (GRT).
