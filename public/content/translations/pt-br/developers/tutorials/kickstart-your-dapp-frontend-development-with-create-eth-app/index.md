---
title: "Dê o pontapé inicial no desenvolvimento do frontend do seu dapp com o create-eth-app"
description: "Uma visão geral de como usar o create-eth-app e seus recursos"
author: "Markus Waas"
tags:
  ["frontend", "JavaScript", "ethers.js", "the graph", "defi"]
skill: beginner
breadcrumb: create-eth-app
lang: pt-br
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

Da última vez, analisamos [a visão geral da Solidity](https://soliditydeveloper.com/solidity-overview-2020) e já mencionamos o [create-eth-app](https://github.com/PaulRBerg/create-eth-app). Agora você descobrirá como usá-lo, quais recursos estão integrados e ideias adicionais sobre como expandi-lo. Iniciado por Paul Razvan Berg, o fundador do [Sablier](https://sablier.com/), este aplicativo dará o pontapé inicial no desenvolvimento do seu frontend e vem com várias integrações opcionais para você escolher.

## Instalação {#installation}

A instalação requer o Yarn 0.25 ou superior (`npm install yarn --global`). É tão simples quanto executar:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Ele usa o [create-react-app](https://github.com/facebook/create-react-app) internamente. Para ver seu aplicativo, abra `http://localhost:3000/`. Quando você estiver pronto para implantar em produção, crie um pacote minificado com yarn build. Uma maneira fácil de hospedar isso seria no [Netlify](https://www.netlify.com/). Você pode criar um repositório no GitHub, adicioná-lo ao Netlify, configurar o comando de build e pronto! Seu aplicativo será hospedado e poderá ser usado por todos. E tudo isso de graça.

## Recursos {#features}

### React e create-react-app {#react--create-react-app}

Em primeiro lugar, o coração do aplicativo: React e todos os recursos adicionais que vêm com o _create-react-app_. Usar apenas isso é uma ótima opção se você não quiser integrar a Ethereum. O próprio [React](https://react.dev/) torna a construção de interfaces de usuário (UIs) interativas muito fácil. Pode não ser tão amigável para iniciantes quanto o [Vue](https://vuejs.org/), mas ainda é o mais usado, tem mais recursos e, o mais importante, milhares de bibliotecas adicionais para escolher. O _create-react-app_ torna muito fácil começar com ele também e inclui:

- Suporte à sintaxe React, JSX, ES6, TypeScript e Flow.
- Extras de linguagem além do ES6, como o operador de propagação de objetos (object spread operator).
- CSS com prefixo automático, para que você não precise de -webkit- ou outros prefixos.
- Um executor de testes de unidade interativo e rápido com suporte integrado para relatórios de cobertura.
- Um servidor de desenvolvimento em tempo real que avisa sobre erros comuns.
- Um script de build para empacotar JS, CSS e imagens para produção, com hashes e sourcemaps.

O _create-eth-app_ em particular está fazendo uso dos novos [hooks effects](https://legacy.reactjs.org/docs/hooks-effect.html). Um método para escrever os chamados componentes funcionais, que são poderosos, mas muito pequenos. Veja a seção abaixo sobre o Apollo para saber como eles são usados no _create-eth-app_.

### Yarn Workspaces {#yarn-workspaces}

Os [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) permitem que você tenha vários pacotes, mas podendo gerenciar todos eles a partir da pasta raiz e instalando dependências para todos de uma vez usando `yarn install`. Isso faz sentido especialmente para pacotes adicionais menores, como o gerenciamento de endereços/ABI de contratos inteligentes (as informações sobre onde você implantou quais contratos inteligentes e como se comunicar com eles) ou a integração do The Graph, ambos parte do `create-eth-app`.

### Ethers.js {#ethersjs}

Embora a [Web3](https://docs.web3js.org/) ainda seja a mais usada, a [Ethers.js](https://docs.ethers.io/) tem ganhado muito mais tração como alternativa no último ano e é a que está integrada no _create-eth-app_. Você pode trabalhar com ela, mudar para a Web3 ou considerar a atualização para a [Ethers.js v5](https://docs.ethers.org/v5/), que está quase saindo da fase beta.

### The Graph {#the-graph}

O [GraphQL](https://graphql.org/) é uma maneira alternativa de lidar com dados em comparação com uma [API Restful](https://restfulapi.net/). Eles têm várias vantagens sobre as APIs Restful, especialmente para dados de blockchain descentralizados. Se você estiver interessado no raciocínio por trás disso, dê uma olhada em [O GraphQL impulsionará a Web Descentralizada](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a).

Normalmente, você buscaria dados do seu contrato inteligente diretamente. Quer ler a hora da última negociação? Basta chamar `MyContract.methods.latestTradeTime().call()`, que busca os dados de um nó da Ethereum para o seu dapp. Mas e se você precisar de centenas de pontos de dados diferentes? Isso resultaria em centenas de buscas de dados no nó, cada vez exigindo um [RTT](https://wikipedia.org/wiki/Round-trip_delay_time), tornando seu dapp lento e ineficiente. Uma solução alternativa pode ser uma função de chamada de busca (fetcher) dentro do seu contrato que retorna vários dados de uma vez. No entanto, isso nem sempre é o ideal.

E então você também pode estar interessado em dados históricos. Você quer saber não apenas a hora da última negociação, mas os horários de todas as negociações que você mesmo já fez. Use o pacote de subgrafo do _create-eth-app_, leia a [documentação](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph) e adapte-o aos seus próprios contratos. Se você estiver procurando por contratos inteligentes populares, pode até já haver um subgrafo. Confira o [explorador de subgrafos](https://thegraph.com/explorer/).

Depois de ter um subgrafo, ele permite que você escreva uma consulta simples em seu dapp que recupera todos os dados importantes da blockchain, incluindo os históricos de que você precisa, exigindo apenas uma busca.

### Apollo {#apollo}

Graças à integração do [Apollo Boost](https://www.apollographql.com/docs/react/get-started/), você pode integrar facilmente o The Graph em seu dapp React. Especialmente ao usar [React hooks e Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks), buscar dados é tão simples quanto escrever uma única consulta GraphQL em seu componente:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Modelos {#templates}

Além disso, você pode escolher entre vários modelos diferentes. Até agora, você pode usar uma integração com Aave, Compound, Uniswap ou Sablier. Todos eles adicionam endereços importantes de contratos inteligentes de serviço, juntamente com integrações de subgrafos pré-fabricadas. Basta adicionar o modelo ao comando de criação, como `yarn create eth-app my-eth-app --with-template aave`.

### Aave {#aave}

A [Aave](https://aave.com/) é um mercado de empréstimo de dinheiro descentralizado. Os depositantes fornecem liquidez ao mercado para obter uma renda passiva, enquanto os mutuários podem fazer empréstimos usando colaterais. Um recurso exclusivo da Aave são os [empréstimos relâmpago](https://aave.com/docs/developers/flash-loans), que permitem que você pegue dinheiro emprestado sem nenhum colateral, desde que devolva o empréstimo em uma única transação. Isso pode ser útil, por exemplo, para lhe dar dinheiro extra em negociações de arbitragem.

Os tokens negociados que rendem juros são chamados de _aTokens_.

Ao escolher integrar a Aave com o _create-eth-app_, você obterá uma [integração de subgrafo](https://docs.aave.com/developers/getting-started/using-graphql). A Aave usa o The Graph e já fornece vários subgrafos prontos para uso na [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) e na [Mainnet](https://thegraph.com/explorer/subgraph/aave/protocol) em formato [bruto (raw)](https://thegraph.com/explorer/subgraph/aave/protocol-raw) ou [formatado](https://thegraph.com/explorer/subgraph/aave/protocol).

![Aave Flash Loan meme – "Yeahhh, if I could keep my flash loan longer than 1 transaction, that would be great"](./flashloan-meme.png)

### Compound {#compound}

A [Compound](https://compound.finance/) é semelhante à Aave. A integração já inclui o novo [subgrafo da Compound v2](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195). Os tokens que rendem juros aqui são surpreendentemente chamados de _cTokens_.

### Uniswap {#uniswap}

O [Uniswap](https://uniswap.exchange/) é uma corretora descentralizada (DEX). Os provedores de liquidez podem ganhar taxas fornecendo os tokens ou ether necessários para ambos os lados de uma negociação. Ele é amplamente utilizado e, portanto, tem uma das maiores liquidez para uma gama muito ampla de tokens. Você pode integrá-lo facilmente em seu dapp para, por exemplo, permitir que os usuários troquem seus ETH por DAI.

Infelizmente, no momento em que este artigo foi escrito, a integração é apenas para o Uniswap v1 e não para o [recém-lançado v2](https://uniswap.org/blog/uniswap-v2/).

### Sablier {#sablier}

O [Sablier](https://sablier.com/) permite que os usuários façam pagamentos de dinheiro em fluxo contínuo (streaming). Em vez de um único dia de pagamento, você recebe seu dinheiro constantemente, sem administração adicional após a configuração inicial. A integração inclui seu [próprio subgrafo](https://thegraph.com/explorer/subgraph/sablierhq/sablier).

## O que vem a seguir? {#whats-next}

Se você tiver dúvidas sobre o _create-eth-app_, acesse o [servidor da comunidade Sablier](https://discord.gg/bsS8T47), onde você pode entrar em contato com os autores do _create-eth-app_. Como alguns dos primeiros próximos passos, você pode querer integrar um framework de interface de usuário (UI) como o [Material UI](https://mui.com/material-ui/), escrever consultas GraphQL para os dados de que você realmente precisa e configurar a implantação.