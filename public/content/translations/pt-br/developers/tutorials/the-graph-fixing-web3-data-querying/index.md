---
title: "The Graph: consertando a consulta de dados da Web3"
description: Blockchain é como um banco de dados, mas sem SQL. Todos os dados estão lá, mas não há como acessá-los. Deixe-me mostrar a você como consertar isso com The Graph e GraphQL.
author: Markus Waas
lang: pt-br
tags:
  [
    "solidez",
    "smart contracts",
    "consultando",
    "the graph",
    "react"
  ]
skill: intermediate
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

Desta vez, daremos uma olhada mais de perto no The Graph que, essencialmente, tornou-se parte do stack padrão para o desenvolvimento de dapps no último ano. Primeiro, vamos ver como faríamos as coisas da maneira tradicional...

## Sem The Graph... {#without-the-graph}

Então, vamos a um exemplo simples para fins de ilustração. Todos nós gostamos de jogos, então imagine um jogo simples com usuários fazendo apostas:

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
            require(success, "Falha na transferência");
            totalGamesPlayerWon++;
        } else {
            totalGamesPlayerLost++;
        }

        emit BetPlaced(msg.sender, msg.value, hasWon);
    }
}
```

Agora, digamos que em nosso dapp, queremos exibir o total de apostas, o total de jogos perdidos/ganhos e também atualizar isso sempre que alguém jogar novamente. A abordagem seria:

1. Buscar `totalGamesPlayerWon`.
2. Buscar `totalGamesPlayerLost`.
3. Inscrever-se nos eventos `BetPlaced`.

Podemos escutar o [evento no Web3](https://docs.web3js.org/api/web3/class/Contract#events) como mostrado à direita, mas isso requer lidar com alguns casos.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // evento disparado
})
.on('changed', function(event) {
    // evento foi removido novamente
})
.on('error', function(error, receipt) {
    // tx rejeitada
});
```

Isso ainda é aceitável para o nosso exemplo simples. Mas digamos que agora queiramos exibir os valores das apostas perdidas/ganhas apenas para o jogador atual. Bem, estamos sem sorte. É melhor implantar um novo contrato que armazene esses valores e os busque. E agora imagine um contrato inteligente e um dapp muito mais complicados. As coisas podem ficar confusas rapidamente.

![One Does Not Simply Query](./one-does-not-simply-query.jpg)

Você pode ver como isso não é o ideal:

- Não funciona para contratos já implantados.
- Custos de gás extras para armazenar esses valores.
- Requer outra chamada para buscar os dados de um nó Ethereum.

![Isso não é bom o suficiente](./not-good-enough.jpg)

Agora, vamos analisar uma solução melhor.

## Deixe-me apresentar o GraphQL {#let-me-introduce-to-you-graphql}

Primeiro, vamos falar sobre o GraphQL, originalmente projetado e implementado pelo Facebook. Você deve estar familiarizado com o modelo tradicional de API REST. Agora imagine que, em vez disso, você pudesse escrever uma consulta para obter exatamente os dados que desejava:

![API GraphQL vs. API REST](./graphql.jpg)

![](./graphql-query.gif)

As duas imagens capturam bem a essência do GraphQL. Com a consulta à direita, podemos definir exatamente quais dados queremos. Assim, obtemos tudo em uma única requisição e nada mais do que exatamente o que precisamos. Um servidor GraphQL cuida da busca de todos os dados necessários, então é incrivelmente fácil de usar para o frontend que o consome. [Esta é uma boa explicação](https://www.apollographql.com/blog/graphql-explained) de como exatamente o servidor lida com uma consulta, caso você tenha interesse.

Agora com esse conhecimento, vamos finalmente entrar no espaço da blockchain e no The Graph.

## O que é The Graph? {#what-is-the-graph}

Uma blockchain é um banco de dados descentralizado, mas, em contraste com o que geralmente acontece, não temos uma linguagem de consulta para esse banco de dados. As soluções para recuperar dados são penosas ou completamente impossíveis. The Graph é um protocolo descentralizado para indexar e consultar dados da blockchain. E, como você deve ter adivinhado, ele usa GraphQL como linguagem de consulta.

![The Graph](./thegraph.png)

Exemplos são sempre a melhor forma de entender algo, então vamos usar o The Graph para nosso exemplo GameContract.

## Como criar um Subgraph {#how-to-create-a-subgraph}

A definição de como indexar dados é chamada de subgráfico. Requer três componentes:

1. Manifesto (`subgraph.yaml`)
2. Esquema (`schema.graphql`)
3. Mapeamento (`mapping.ts`)

### Manifesto (`subgraph.yaml`) {#manifest}

O manifesto é nosso arquivo de configuração e define:

- quais contratos inteligentes indexar (endereço, rede, ABI...)
- a quais eventos escutar
- outras coisas para escutar, como chamadas de função ou blocos
- as funções de mapeamento que são chamadas (veja `mapping.ts` abaixo)

Você pode definir vários contratos e manipuladores aqui. Uma configuração típica teria uma pasta de subgráfico dentro do projeto Hardhat com seu próprio repositório. Então você pode referenciar facilmente a ABI.

Por conveniência, você também pode querer usar uma ferramenta de template como o mustache. Então, você cria um `subgraph.template.yaml` e insere os endereços com base nas implantações mais recentes. Para um exemplo de configuração mais avançada, veja, por exemplo, o [repositório do subgráfico da Aave](https://github.com/aave/aave-protocol/tree/master/thegraph).

E a documentação completa pode ser vista [aqui](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

O esquema é a definição de dados do GraphQL. Ele permitirá que você defina quais entidades existem e seus tipos. Os tipos suportados pelo The Graph são

- Bytes
- ID
- String
- Booleano
- Int
- BigInt
- BigDecimal

Você também pode usar entidades como tipo para definir relacionamentos. Em nosso exemplo, definimos um relacionamento de 1 para muitos de jogador para apostas. O ! significa que o valor não pode estar vazio. A documentação completa pode ser vista [aqui](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

### Mapeamento (`mapping.ts`) {#mapping}

O arquivo de mapeamento no The Graph define nossas funções que transformam eventos recebidos em entidades. Ele é escrito em AssemblyScript, um subconjunto do Typescript. Isso significa que ele pode ser compilado em WASM (WebAssembly) para uma execução mais eficiente e portátil do mapeamento.

Você precisará definir cada função nomeada no arquivo `subgraph.yaml`, então, no nosso caso, precisamos de apenas uma: `handleNewBet`. Primeiro, tentamos carregar a entidade Player a partir do endereço do remetente como id. Se ela não existir, criamos uma nova entidade e a preenchemos com os valores iniciais.

Em seguida, criamos uma nova entidade Bet. O id para isso será `event.transaction.hash.toHex() + "-" + event.logIndex.toString()`, garantindo sempre um valor único. Usar apenas o hash não é suficiente, pois alguém pode chamar a função placeBet várias vezes em uma transação através de um contrato inteligente.

Por fim, podemos atualizar a entidade Player com todos os dados. Não é possível adicionar elementos a arrays diretamente, eles precisam ser atualizados como mostrado aqui. Usamos o id para referenciar a aposta. E `.save()` é necessário no final para armazenar uma entidade.

A documentação completa pode ser vista aqui: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. Você também pode adicionar uma saída de registro ao arquivo de mapeamento, veja [aqui](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference).

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // cria se ainda não existir
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

  // atualize o array assim
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## Usando no Frontend {#using-it-in-the-frontend}

Usando algo como o Apollo Boost, você pode integrar facilmente o The Graph ao seu dapp em React (ou Apollo-Vue). Especialmente ao usar hooks do React e Apollo, buscar dados é tão simples quanto escrever uma única consulta GraphQL em seu componente. Uma configuração típica pode ser assim:

```javascript
// Veja todos os subgráficos: https://thegraph.com/explorer/
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

E agora podemos escrever, por exemplo, uma consulta como esta. Isso buscará para nós

- quantas vezes o usuário atual ganhou
- quantas vezes o usuário atual perdeu
- uma lista de data e hora de todas as suas apostas anteriores

Tudo em uma única requisição para o servidor GraphQL.

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

![Mágica](./magic.jpg)

Mas está faltando uma última peça do quebra-cabeça, que é o servidor. Você pode executá-lo ou usar o serviço hospedado.

## O servidor do The Graph {#the-graph-server}

### Graph Explorer: o serviço hospedado {#graph-explorer-the-hosted-service}

A maneira mais fácil é usar o serviço hospedado. Siga as instruções [aqui](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) para implantar um subgráfico. Para muitos projetos, você pode encontrar subgráficos existentes no [explorador](https://thegraph.com/explorer/).

![The Graph-Explorer](./thegraph-explorer.png)

### Executar seu próprio nó {#running-your-own-node}

Como alternativa, você pode executar seu próprio nó. Documentação [aqui](https://github.com/graphprotocol/graph-node#quick-start). Uma razão para fazer isso pode ser usar uma rede que não é suportada pelo serviço hospedado. As redes atualmente suportadas [podem ser encontradas aqui](https://thegraph.com/docs/en/developing/supported-networks/).

## O futuro descentralizado {#the-decentralized-future}

O GraphQL também suporta streams para eventos recém-chegados. Eles são suportados no The Graph através de [Substreams](https://thegraph.com/docs/en/substreams/), que estão atualmente em beta aberto.

Em [2021](https://thegraph.com/blog/mainnet-migration/), o The Graph iniciou sua transição para uma rede de indexação descentralizada. Você pode ler mais sobre a arquitetura desta rede de indexação descentralizada [aqui](https://thegraph.com/docs/en/network/explorer/).

Dois aspectos principais são:

1. Os usuários pagam os indexadores por consultas.
2. Os indexadores fazem stake de Graph Tokens (GRT).
