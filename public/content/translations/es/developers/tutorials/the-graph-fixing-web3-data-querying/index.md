---
title: "The Graph: Solucionando la consulta de datos en Web3"
description: "La cadena de bloques es como una base de datos pero sin SQL. Todos los datos están ahí, pero no hay forma de acceder a ellos. Déjame mostrarte cómo solucionar esto con The Graph y GraphQL."
author: Markus Waas
lang: es
tags: ["Solidity", "contratos inteligentes", "consultas", "the graph", "React"]
skill: intermediate
breadcrumb: The Graph
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

Esta vez analizaremos más de cerca The Graph, que esencialmente se convirtió en parte del conjunto de herramientas estándar para desarrollar aplicaciones descentralizadas (dapps) en el último año. Primero veamos cómo haríamos las cosas de la manera tradicional...

## Sin The Graph... {#without-the-graph}

Así que vamos con un ejemplo sencillo con fines ilustrativos. A todos nos gustan los juegos, así que imagina un juego simple con usuarios haciendo apuestas:

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

Ahora digamos que en nuestra dapp, queremos mostrar el total de apuestas, el total de juegos perdidos/ganados y también actualizarlo cada vez que alguien vuelva a jugar. El enfoque sería:

1. Obtener `totalGamesPlayerWon`.
2. Obtener `totalGamesPlayerLost`.
3. Suscribirse a los eventos `BetPlaced`.

Podemos escuchar el [evento en Web3](https://docs.web3js.org/api/web3/class/Contract#events) como se muestra a la derecha, pero requiere manejar bastantes casos.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // evento emitido
})
.on('changed', function(event) {
    // evento eliminado de nuevo
})
.on('error', function(error, receipt) {
    // tx rechazada
});
```

Ahora bien, esto todavía está más o menos bien para nuestro ejemplo sencillo. Pero digamos que ahora queremos mostrar las cantidades de apuestas perdidas/ganadas solo para el jugador actual. Bueno, no tenemos suerte, es mejor desplegar un nuevo contrato que almacene esos valores y obtenerlos. Y ahora imagina un contrato inteligente y una dapp mucho más complicados, las cosas pueden complicarse rápidamente.

![One Does Not Simply Query](./one-does-not-simply-query.jpg)

Puedes ver que esto no es óptimo:

- No funciona para contratos ya desplegados.
- Costos adicionales de gas por almacenar esos valores.
- Requiere otra llamada para obtener los datos de un nodo de Ethereum.

![Thats not good enough](./not-good-enough.jpg)

Ahora veamos una solución mejor.

## Déjame presentarte GraphQL {#let-me-introduce-to-you-graphql}

Primero hablemos de GraphQL, diseñado e implementado originalmente por Facebook. Es posible que estés familiarizado con el modelo tradicional de API REST. Ahora imagina que en su lugar pudieras escribir una consulta exactamente para los datos que deseas:

![GraphQL API vs. REST API](./graphql.jpg)

![Animated demonstration of a GraphQL query in The Graph playground](./graphql-query.gif)

Las dos imágenes capturan bastante bien la esencia de GraphQL. Con la consulta de la derecha podemos definir exactamente qué datos queremos, por lo que ahí obtenemos todo en una sola solicitud y nada más que exactamente lo que necesitamos. Un servidor GraphQL se encarga de obtener todos los datos requeridos, por lo que es increíblemente fácil de usar para el lado del consumidor del frontend. [Esta es una buena explicación](https://www.apollographql.com/blog/graphql-explained) de cómo exactamente el servidor maneja una consulta si estás interesado.

Ahora, con ese conocimiento, saltemos finalmente al espacio de la cadena de bloques y The Graph.

## ¿Qué es The Graph? {#what-is-the-graph}

Una cadena de bloques es una base de datos descentralizada, pero a diferencia de lo que suele ser el caso, no tenemos un lenguaje de consulta para esta base de datos. Las soluciones para recuperar datos son un dolor de cabeza o completamente imposibles. The Graph es un protocolo descentralizado para indexar y consultar datos de la cadena de bloques. Y como habrás adivinado, utiliza GraphQL como lenguaje de consulta.

![The Graph](./thegraph.png)

Los ejemplos siempre son lo mejor para entender algo, así que usemos The Graph para nuestro ejemplo de GameContract.

## Cómo crear un subgrafo {#how-to-create-a-subgraph}

La definición de cómo indexar datos se llama subgrafo. Requiere tres componentes:

1. Manifiesto (`subgraph.yaml`)
2. Esquema (`schema.graphql`)
3. Mapeo (`mapping.ts`)

### Manifiesto (`subgraph.yaml`) {#manifest}

El manifiesto es nuestro archivo de configuración y define:

- qué contratos inteligentes indexar (dirección, red, ABI...)
- qué eventos escuchar
- otras cosas a escuchar como llamadas a funciones o bloques
- las funciones de mapeo que se llaman (ver `mapping.ts` a continuación)

Puedes definir múltiples contratos y manejadores aquí. Una configuración típica tendría una carpeta de subgrafo dentro del proyecto Hardhat con su propio repositorio. Luego puedes referenciar fácilmente el ABI.

Por razones de comodidad, también es posible que desees utilizar una herramienta de plantillas como mustache. Luego creas un `subgraph.template.yaml` e insertas las direcciones basadas en los últimos despliegues. Para una configuración de ejemplo más avanzada, consulta por ejemplo el [repositorio del subgrafo de Aave](https://github.com/aave/aave-protocol/tree/master/thegraph).

Y la documentación completa se puede ver [aquí](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

El esquema es la definición de datos de GraphQL. Te permitirá definir qué entidades existen y sus tipos. Los tipos soportados por The Graph son

- Bytes
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

También puedes usar entidades como tipo para definir relaciones. En nuestro ejemplo definimos una relación de 1 a muchos de jugador a apuestas. El ! significa que el valor no puede estar vacío. La documentación completa se puede ver [aquí](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

El archivo de mapeo en The Graph define nuestras funciones que transforman los eventos entrantes en entidades. Está escrito en AssemblyScript, un subconjunto de TypeScript. Esto significa que se puede compilar en WASM (WebAssembly) para una ejecución más eficiente y portátil del mapeo.

Necesitarás definir cada función nombrada en el archivo `subgraph.yaml`, así que en nuestro caso solo necesitamos una: `handleNewBet`. Primero intentamos cargar la entidad Player desde la dirección del remitente como id. Si no existe, creamos una nueva entidad y la llenamos con valores iniciales.

Luego creamos una nueva entidad Bet. El id para esto será `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` asegurando siempre un valor único. Usar solo el hash no es suficiente, ya que alguien podría estar llamando a la función placeBet varias veces en una transacción a través de un contrato inteligente.

Por último, podemos actualizar la entidad Player con todos los datos. No se puede hacer push directamente a los arrays, sino que deben actualizarse como se muestra aquí. Usamos el id para referenciar la apuesta. Y se requiere `.save()` al final para almacenar una entidad.

La documentación completa se puede ver aquí: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. También puedes agregar salida de registro al archivo de mapeo, mira [aquí](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference).

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // crear si aún no existe
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

  // actualizar el array así
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## Usándolo en el Frontend {#using-it-in-the-frontend}

Usando algo como Apollo Boost, puedes integrar fácilmente The Graph en tu dapp de React (o Apollo-Vue). Especialmente cuando se usan hooks de React y Apollo, obtener datos es tan simple como escribir una sola consulta GraphQL en tu componente. Una configuración típica podría verse así:

```javascript
// Ver todos los subgrafos: https://thegraph.com/explorer/
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

Y ahora podemos escribir, por ejemplo, una consulta como esta. Esto nos obtendrá

- cuántas veces ha ganado el usuario actual
- cuántas veces ha perdido el usuario actual
- una lista de marcas de tiempo con todas sus apuestas anteriores

Todo en una sola solicitud al servidor GraphQL.

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

![Magic](./magic.jpg)

Pero nos falta una última pieza del rompecabezas y ese es el servidor. Puedes ejecutarlo tú mismo o usar el servicio alojado.

## El servidor de The Graph {#the-graph-server}

### Graph Explorer: El servicio alojado {#graph-explorer-the-hosted-service}

La forma más fácil es usar el servicio alojado. Sigue las instrucciones [aquí](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) para desplegar un subgrafo. Para muchos proyectos, de hecho, puedes encontrar subgrafos existentes en el [explorador](https://thegraph.com/explorer/).

![The Graph-Explorer](./thegraph-explorer.png)

### Ejecutar tu propio nodo {#running-your-own-node}

Alternativamente, puedes ejecutar tu propio nodo. Documentación [aquí](https://github.com/graphprotocol/graph-node#quick-start). Una razón para hacer esto podría ser usar una red que no sea compatible con el servicio alojado. Las redes compatibles actualmente [se pueden encontrar aquí](https://thegraph.com/docs/en/developing/supported-networks/).

## El futuro descentralizado {#the-decentralized-future}

GraphQL también admite flujos (streams) para los nuevos eventos entrantes. Estos son compatibles en The Graph a través de [Substreams](https://thegraph.com/docs/en/substreams/), que actualmente se encuentran en beta abierta.

En [2021](https://thegraph.com/blog/mainnet-migration/), The Graph comenzó su transición hacia una red de indexación descentralizada. Puedes leer más sobre la arquitectura de esta red de indexación descentralizada [aquí](https://thegraph.com/docs/en/network/explorer/).

Dos aspectos clave son:

1. Los usuarios pagan a los indexadores por las consultas.
2. Los indexadores hacen staking de Graph Tokens (GRT).