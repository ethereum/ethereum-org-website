---
title: "The Graph: corrección de las consultas de datos de Web3"
description: La cadena de bloques es como una base de datos pero sin SQL. Todos los datos están ahí, pero no hay forma de acceder a ellos. Déjeme mostrarle cómo solucionar este problema con The Graph y GraphQL.
author: Markus Waas
lang: es
tags:
  [
    "Solidity",
    "contratos Inteligentes",
    "consultar",
    "The Graph",
    "reaccionar"
  ]
skill: intermediate
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

Esta vez, analizaremos más de cerca The Graph, que esencialmente se convirtió en parte de la pila estándar para el desarrollo de dapps el año pasado. Veamos primero cómo haríamos las cosas de la manera tradicional...

## Sin The Graph... {#without-the-graph}

Veamos un ejemplo sencillo a fines ilustrativos. A todos nos gustan los juegos, así que imagine un juego simple en el que los usuarios hacen apuestas:

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
            require(success, "Error en la transferencia");
            totalGamesPlayerWon++;
        } else {
            totalGamesPlayerLost++;
        }

        emit BetPlaced(msg.sender, msg.value, hasWon);
    }
}
```

Ahora, digamos que en nuestra dapp queremos mostrar el total de apuestas, el total de partidas perdidas/ganadas y también actualizarlo cada vez que alguien vuelva a jugar. El enfoque sería el siguiente:

1. Obtener `totalGamesPlayerWon`.
2. Obtener `totalGamesPlayerLost`.
3. Suscribirse a los eventos `BetPlaced`.

Podemos escuchar el [evento en Web3](https://docs.web3js.org/api/web3/class/Contract#events) como se muestra a la derecha, pero requiere gestionar bastantes casos.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // evento disparado
})
.on('changed', function(event) {
    // el evento fue eliminado de nuevo
})
.on('error', function(error, receipt) {
    // tx rechazada
});
```

Ahora bien, esto sigue estando bien para nuestro sencillo ejemplo. Pero digamos que ahora queremos mostrar la cantidad de apuestas perdidas/ganadas solo para el jugador actual. Bueno, no tenemos suerte. Sería mejor desplegar un nuevo contrato que almacene esos valores y los recupere. Ahora imagine un contrato inteligente y una dapp mucho más complicados; las cosas se pueden descontrolar rápidamente.

![Uno no simplemente consulta](./one-does-not-simply-query.jpg)

Puede ver que esto no es óptimo:

- No funciona para contratos ya desplegados.
- Costos de gas adicionales por almacenar esos valores.
- Se requiere otra llamada para obtener los datos de un nodo de Ethereum.

![Eso no es suficiente](./not-good-enough.jpg)

Veamos ahora una mejor solución.

## Permítame presentarle GraphQL {#let-me-introduce-to-you-graphql}

Primero, hablemos de GraphQL, diseñado e implementado originalmente por Facebook. Puede que esté familiarizado con el modelo de API REST tradicional. Ahora imagine que, en su lugar, pudiera escribir una consulta para obtener exactamente los datos que desea:

![API de GraphQL frente a API REST](./graphql.jpg)

![](./graphql-query.gif)

Las dos imágenes capturan muy bien la esencia de GraphQL. Con la consulta de la derecha podemos definir exactamente qué datos queremos, así que ahí recibimos todo en una única solicitud y nada más que exactamente lo que necesitamos. Un servidor de GraphQL se encarga de obtener todos los datos necesarios, por lo que es increíblemente fácil de usar para el consumidor del frontend. [Esta es una buena explicación](https://www.apollographql.com/blog/graphql-explained) de cómo gestiona exactamente el servidor una consulta, por si le interesa.

Ahora, con ese conocimiento, vayamos finalmente al campo de la cadena de bloques y The Graph.

## ¿Qué es The Graph? {#what-is-the-graph}

Una cadena de bloques es una base de datos descentralizada, pero, a diferencia de lo habitual, no tenemos un lenguaje de consulta para esta base de datos. Las soluciones para recuperar datos son complejas o completamente imposibles. The Graph es un protocolo descentralizado para indexar y consultar datos de la cadena de bloques. Y, como habrá adivinado, utiliza GraphQL como lenguaje de consulta.

![The Graph](./thegraph.png)

Los ejemplos son siempre la mejor manera de entender algo, así que utilicemos The Graph para nuestro ejemplo de GameContract.

## Cómo crear un subgrafo {#how-to-create-a-subgraph}

La definición de cómo indexar datos se denomina subgrafo. Requiere tres componentes:

1. Manifiesto (`subgraph.yaml`)
2. Esquema (`schema.graphql`)
3. Mapeo (`mapping.ts`)

### Manifiesto (`subgraph.yaml`) {#manifest}

El manifiesto es nuestro archivo de configuración y define:

- qué contratos inteligentes se deben indexar (dirección, red, ABI...)
- qué eventos escuchar
- otros aspectos a escuchar, como llamadas a funciones o bloques
- las funciones de mapeo a las que se llama (véase `mapping.ts` más abajo)

Aquí puede definir múltiples contratos y manejadores (handlers). Una configuración típica tendría una carpeta de subgrafos dentro del proyecto de Hardhat con su propio repositorio. Así, puede hacer referencia fácilmente al ABI.

Por comodidad, también puede que quiera utilizar una herramienta de plantillas como mustache. A continuación, cree un `subgraph.template.yaml` e inserte las direcciones basándose en los despliegues más recientes. Para ver un ejemplo de configuración más avanzada, consulte, por ejemplo, el [repositorio del subgrafo de Aave](https://github.com/aave/aave-protocol/tree/master/thegraph).

Y la documentación completa se puede consultar [aquí](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

```yaml
specVersion: 0.0.1
description: Realizando apuestas en Ethereum
repository: - Enlace de GitHub -
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

También puede utilizar entidades como tipo para definir relaciones. En nuestro ejemplo, definimos una relación de uno a muchos (1-to-many) de jugador a apuestas. El `!` significa que el valor no puede estar vacío. La documentación completa se puede consultar [aquí](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

El archivo de mapeo de The Graph define nuestras funciones que transforman los eventos entrantes en entidades. Está escrito en AssemblyScript, un subconjunto de TypeScript. Esto significa que puede ser compilado en WASM (WebAssembly) para una ejecución más eficiente y portátil del mapeo.

Tendrá que definir cada función nombrada en el archivo `subgraph.yaml`, por lo que en nuestro caso solo necesitamos una: `handleNewBet`. Primero, intentamos cargar la entidad Player desde la dirección del remitente como id. Si no existe, crearemos una nueva entidad y la llenaremos con valores iniciales.

A continuación, creamos una nueva entidad Bet. El id para esto será `event.transaction.hash.toHex() + "-" + event.logIndex.toString()`, lo que garantiza que el valor sea siempre único. Usar solo el hash no es suficiente, ya que alguien podría estar llamando a la función placeBet varias veces en una transacción a través de un contrato inteligente.

Por último, podemos actualizar la entidad Player con todos los datos. No se pueden añadir elementos directamente a los arrays, sino que deben actualizarse como se muestra aquí. Utilizamos el id para hacer referencia a la apuesta. Y se requiere `.save()` al final para almacenar una entidad.

La documentación completa se puede consultar aquí: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. También puede añadir resultados de registro al archivo de mapeo, consulte [aquí](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference).

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // se crea si no existe todavía
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

  // actualizar el array de esta forma
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## Uso en el frontend {#using-it-in-the-frontend}

Usando algo como Apollo Boost, puede integrar de forma sencilla The Graph en su dapp de React (o Apollo-Vue). Especialmente al usar hooks de React y Apollo, obtener datos es tan simple como escribir una única consulta de GraphQL en su componente. Una configuración típica podría ser la siguiente:

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

Y ahora podemos escribir, por ejemplo, una consulta como esta. Esto obtendrá:

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

### Graph Explorer: el servicio alojado {#graph-explorer-the-hosted-service}

La forma más fácil es utilizar el servicio alojado. Siga las instrucciones que aparecen [aquí](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) para desplegar un subgrafo. Para muchos proyectos, puede encontrar subgrafos existentes en el [explorador](https://thegraph.com/explorer/).

![Explorador de The Graph](./thegraph-explorer.png)

### Ejecutar su propio nodo {#running-your-own-node}

Como alternativa, puede ejecutar su propio nodo. Documentación [aquí](https://github.com/graphprotocol/graph-node#quick-start). Una razón para hacer esto podría ser usar una red no admitida por el servicio alojado. Las redes compatibles actualmente [se pueden encontrar aquí](https://thegraph.com/docs/en/developing/supported-networks/).

## El futuro descentralizado {#the-decentralized-future}

GraphQL también admite flujos (streams) para nuevos eventos entrantes. Son compatibles con The Graph a través de [Substreams](https://thegraph.com/docs/en/substreams/), que actualmente se encuentran en beta abierta.

En [2021](https://thegraph.com/blog/mainnet-migration/), The Graph comenzó su transición a una red de indexación descentralizada. Puede leer más sobre la arquitectura de esta red de indexación descentralizada [aquí](https://thegraph.com/docs/en/network/explorer/).

Dos aspectos clave son:

1. Los usuarios pagan a los indexadores por las consultas.
2. Los indexadores apuestan Graph Tokens (GRT).
