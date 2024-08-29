---
title: "The Graph: Consertando a consulta de dados da Web3"
description: Blockchain é como um banco de dados, mas sem SQL. Todos os dados estão lá, mas não há maneira de acessá-los. Deixe-me mostrar a você como consertar isso com The Graph e GraphQL.
author: Markus Waas
lang: pt-br
tags:
  - "solidez"
  - "smart contracts"
  - "consultando"
  - "the Graph"
  - "create-eth-app"
  - "react"
skill: intermediate
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

Dessa vez, daremos uma olhada mais de perto no The Graph que essencialmente se tornou parte do stack padrão para o desenvolvimento de Dapps no último ano. Primeiro, vamos ver como faríamos as coisas da maneira tradicional...

## Sem The Graph... {#without-the-graph}

Então vamos começar com um exemplo simples para propósitos ilustrativos. Todos nós gostamos de jogos, então imagine um jogo simples com os usuários fazendo apostas:

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

Agora, digamos em nosso dapp, queremos exibir as apostas totais, os jogos perdidos/ganhos e também atualizá-lo sempre que alguém jogar novamente. A abordagem seria:

1. Busca `totalGamesPlayerWon`.
2. Busca `totalGamesPlayerWon`.
3. Inscreva-se nos eventos `BetPlaced`.

Nós podemos escutar [evento na Web3](https://docs.web3js.org/api/web3/class/Contract#events) como mostrado à direita, mas isso requer manipular alguns casos.

```solidity
AmeContract.events.BetPlaced({
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

Por hora está de bom tamanho nosso simples exemplo. Mas digamos que queremos exibir as quantidades das apostas perdidas/ganhas apenas para o jogador atual. Se estivermos sem sorte, você pode implantar um novo contrato que armazena esses valores e busca. E agora imagine um contrato inteligente e um Dapp muito mais complicados. As coisas podem ficar confusas rapidamente.

![Não basta uma simples consulta](./one-does-not-simply-query.jpg)

Você pode ver que isso não é ideal:

- Não funciona para contratos já implementados.
- Custos de gas adicionais para armazenar esses valores.
- Requer outra chamada para obter os dados para um nó Ethereum.

![Não é bom o suficiente](./not-good-enough.jpg)

Agora vamos ver uma solução melhor.

## Deixe-me apresentá-lo ao GraphQL {#let-me-introduce-to-you-graphql}

Primeiro, vamos falar sobre GraphQL, originalmente projetado e implementado pelo Facebook. Você deve estar familiarizado com o modelo tradicional da Rest API. Agora imagine que você poderia escrever uma consulta para exatamente os dados que você queria:

![GraphQL API vs. REST API](./graphql.jpg)

<img src="https://cdn0.scrvt.com/b095ee27d37b3d7b6b150adba9ac6ec8/42226f4816a77656/bc5c8b270798/graphql-querygif.gif" width="100%" />

As duas imagens capturam praticamente a essência do GraphQL. Com a consulta à direita, podemos definir exactamente quais os dados que queremos, assim aí temos tudo ao alcance e nada mais do que aquilo de que precisamos. Um servidor GraphQL lida com a busca de todos os dados necessários, então é incrivelmente fácil para o lado frontend do consumidor. [Esta é uma bela explicação](https://www.apollographql.com/blog/graphql-explained-5844742f195e/) de como exatamente o servidor lida com uma consulta se estiver interessado.

Agora com esse conhecimento, vamos finalmente adentrar o espaço da blockchain e The Graph.

## O que é The Graph? {#what-is-the-graph}

Um blockchain é um banco de dados descentralizado, mas em contraste com o que é geralmente o caso, nós não temos uma linguagem de consulta para esse banco de dados. Soluções para a obtenção de dados são dolorosas ou completamente impossíveis. The Graph é um protocolo descentralizado para indexação e consulta de dados da blockchain. E você pode ter adivinhado, ele está usando GraphQL como idioma de consulta.

![The Graph](./thegraph.png)

Os exemplos são sempre os melhores para entender algo, então vamos usar The Graph para o nosso exemplo de GameContract.

## Como criar um Subgraph {#how-to-create-a-subgraph}

A definição de como indexar dados é chamada de subgráfico. Requer três componentes:

1. Manifesto (`subgraph.yaml`)
2. Esquema (`schema.graphql`)
3. Mapping (`mapping.ts`)

### Manifesto (`subgraph.yaml`) {#manifest}

O manifesto é nosso arquivo de configuração e define:

- que contratos inteligentes indexar (endereço, rede, ABI...)
- quais eventos ouvir
- outras coisas para ouvir como chamadas de função ou blocos
- as fnções de mapping sendo chamadas (conferir `mapping.ts` below)

Aqui você pode definir vários contratos e manipuladores. Uma configuração típica teria uma pasta de subgráfico dentro do projeto Hardhat com seu próprio repositório. Então você pode facilmente se referir ao ABI.

Por conveniência você também pode querer usar uma ferramenta modelo tipo um bigode. Em seguida, você cria um `subgraph.template.yaml` e insere os endereços com base nas mais recentes implantações. Para uma configuração de exemplo mais avançada, veja, por exemplo, o [repositório de subgráfico Aave](https://github.com/aave/aave-protocol/tree/master/thegraph).

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

O esquema é a definição de dados do GraphQL. Permitirá que você defina quais entidades existem e seus tipos. Tipos suportados do The Graph são

- Bytes
- ID
- String
- Booleano
- Int
- BigInt
- BigDecimal

Você também pode usar entidades como tipo para definir relações. No nosso exemplo, definimos uma relação entre 1 e muitos entre jogadores e apostas. O ! significa que o valor não pode ser vazio. A documentação completa pode ser vista [aqui](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

### Mapping (`mapping.ts`) {#mapping}

O arquivo de mapeamento no The Graph define nossas funções que transformam eventos recebidos em entidades. É escrito em AssemblyScript, um subconjunto de Typescript. Isto significa que pode ser compilado em WASM (WebAssembly) para uma execução mais eficiente e portátil do mapeamento.

Você precisará definir cada função nomeada no arquivo `subgraph.yaml`, portanto, no nosso caso, precisamos apenas uma: `handleNewBet`. Primeiro, tentamos carregar a entidade Jogador a partir do endereço do remetente como id. Se não existir, nós criamos uma nova entidade e a preenchemos com os valores iniciais.

Em seguida, criamos uma nova entidade Bet. O ID para isso sempre `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` garantirá um valor exclusivo. Usar somente o hash não é o suficiente porque alguém pode chamar a função placeBet várias vezes em uma transação através de um contrato inteligente.

Finalmente, nós podemos atualizar a entidade "Player" com todos os dados. Arrays não podem ser empurrados diretamente, mas precisam ser atualizados como mostrado aqui. Usamos o id para fazer referência à aposta. E `.save()` é necessário no final para armazenar uma entidade.

A documentação completa pode ser vista aqui: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. Você também pode adicionar a saída do log ao arquivo de mapeamento, consultando [aqui](https://thegraph.com/docs/assemblyscript-api#api-reference).

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

## Usando isso no Frontend {#using-it-in-the-frontend}

Usando algo como Apollo Boost, você pode facilmente integrar o The Graph em seu React Dapp (ou Apollo-Vue). Especialmente ao usar React hooks e Apollo, buscar dados é tão simples quanto escrever uma única consulta GraphQl no seu componente. Uma típica configuração pode se parecer com isso:

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

E agora podemos escrever, por exemplo, uma consulta como esta. Isso vai nos ajudar

- quantas vezes o usuário atual ganhou
- quantas vezes o usuário atual perdeu
- uma lista de horários com todas as suas apostas anteriores

Tudo em um único pedido para o servidor do GraphQL.

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

Mas precisamos de uma última peça do quebra-cabeças: o servidor. Você pode também executá-lo por conta própria ou usar o serviço hospedado.

## Servidor The Graph {#the-graph-server}

### Graph Explorer: o serviço hospedado {#graph-explorer-the-hosted-service}

O jeito mais fácil é usar o serviço hospedado. Siga as instruções [aqui](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) para publicar um subgráfico. Para muitos projetos, você pode encontrar subgrafos existentes no [explorer](https://thegraph.com/explorer/).

![O Graph-Explorer](./thegraph-explorer.png)

### Executando seu próprio nó {#running-your-own-node}

Como alternativa, você pode executar seu próprio nó. Documentação [aqui](https://github.com/graphprotocol/graph-node#quick-start). Uma das razões para isso: você pode estar usando uma rede não suportada pelo serviço hospedado. As redes que contam atualmente com suporte [podem ser encontradas aqui](https://thegraph.com/docs/en/developing/supported-networks/).

## O futuro descentralizado {#the-decentralized-future}

GraphQL também suporta streams para os próximos eventos. Elas tem suporte no grafo por meio de [Subfluxos](https://thegraph.com/docs/en/substreams/), que se encontram atualmente em versão beta de código aberto.

Em [2021](https://thegraph.com/blog/mainnet-migration/) O Grafo iniciou sua transição para uma rede de indexação descentralizada. Leia mais sobre a arquitetura dessa rede de indexação descentralizada [aqui](https://thegraph.com/docs/en/network/explorer/).

Dois aspectos fundamentais são:

1. Os usuários pagam aos indexadores pelas perguntas.
2. Os indexadores fazem stake dos Graph Tokens (GRT).
