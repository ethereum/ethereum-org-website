---
title: "Dê o pontapé inicial no desenvolvimento do frontend do seu dapp com o create-eth-app"
description: "Uma visão geral de como usar o create-eth-app e seus recursos"
author: "Markus Waas"
tags:
  [
    "front-end",
    "javascript",
    "ethers.js",
    "the graph",
    "defi"
  ]
skill: beginner
lang: pt-br
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

Na última vez, vimos [o panorama geral do Solidity](https://soliditydeveloper.com/solidity-overview-2020) e já mencionamos o [create-eth-app](https://github.com/PaulRBerg/create-eth-app). Agora você descobrirá como usá-lo, quais recursos estão integrados e ideias adicionais sobre como expandi-lo. Iniciado por Paul Razvan Berg, o fundador do [Sablier](http://sablier.com/), este aplicativo dará o pontapé inicial no seu desenvolvimento de frontend e vem com várias integrações opcionais para você escolher.

## Instalação {#installation}

A instalação requer o Yarn 0.25 ou superior (`npm install yarn --global`). É tão simples quanto executar:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Ele usa o [create-react-app](https://github.com/facebook/create-react-app) por baixo dos panos. Para ver seu app, abra `http://localhost:3000/`. Quando estiver pronto para implantar em produção, crie um pacote minificado com `yarn build`. Uma maneira fácil de hospedar isso seria o [Netlify](https://www.netlify.com/). Você pode criar um repositório no GitHub, adicioná-lo ao Netlify, configurar o comando de build e pronto! Seu app será hospedado e poderá ser usado por todos. E tudo isso gratuitamente.

## Recursos {#features}

### React e create-react-app {#react--create-react-app}

Primeiramente, o coração do app: o React e todos os recursos adicionais que vêm com o _create-react-app_. Usar apenas isso é uma ótima opção se você não quiser integrar o Ethereum. O próprio [React](https://react.dev/) torna a criação de UIs interativas muito fácil. Pode não ser tão amigável para iniciantes quanto o [Vue](https://vuejs.org/), mas ainda é o mais utilizado, tem mais recursos e, o mais importante, milhares de bibliotecas adicionais para escolher. O _create-react-app_ também torna muito fácil começar a usá-lo e inclui:

- Suporte às sintaxes React, JSX, ES6, TypeScript e Flow.
- Recursos de linguagem além do ES6, como o operador de propagação de objeto.
- CSS com prefixo automático, para que você não precise de `-webkit-` ou outros prefixos.
- Um executor de testes unitários rápido e interativo com suporte integrado para relatórios de cobertura.
- Um servidor de desenvolvimento em tempo real que avisa sobre erros comuns.
- Um script de build para empacotar JS, CSS e imagens para produção, com hashes e sourcemaps.

O _create-eth-app_ em particular faz uso dos novos [efeitos de hooks](https://legacy.reactjs.org/docs/hooks-effect.html). Um método para escrever os chamados componentes funcionais, que são poderosos, mas muito pequenos. Veja a seção abaixo sobre o Apollo para saber como eles são usados no _create-eth-app_.

### Yarn Workspaces {#yarn-workspaces}

Os [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) permitem que você tenha vários pacotes, mas com a capacidade de gerenciá-los todos a partir da pasta raiz e instalar as dependências de todos de uma vez usando `yarn install`. Isso faz sentido especialmente para pacotes adicionais menores, como o gerenciamento de endereços/ABIs de contratos inteligentes (as informações sobre onde você implantou quais contratos inteligentes e como se comunicar com eles) ou a integração do graph, ambos parte do `create-eth-app`.

### ethers.js {#ethersjs}

Embora o [Web3](https://docs.web3js.org/) ainda seja o mais usado, o [ethers.js](https://docs.ethers.io/) tem ganhado muito mais força como alternativa no último ano e é o que está integrado no _create-eth-app_. Você pode trabalhar com ele, alterá-lo para Web3 ou considerar a atualização para o [ethers.js v5](https://docs.ethers.org/v5/), que está quase saindo da versão beta.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/) é uma forma alternativa de lidar com dados em comparação com uma [API Restful](https://restfulapi.net/). Eles têm várias vantagens sobre as APIs Restful, especialmente para dados descentralizados da cadeia de blocos. Se você estiver interessado no raciocínio por trás disso, dê uma olhada em [GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a).

Normalmente, você buscaria dados diretamente do seu contrato inteligente. Quer ler o horário da última negociação? Basta chamar `MyContract.methods.latestTradeTime().call()`, que busca os dados de um nó do Ethereum para o seu dapp. Mas e se você precisar de centenas de pontos de dados diferentes? Isso resultaria em centenas de buscas de dados no nó, cada uma exigindo um [RTT](https://wikipedia.org/wiki/Round-trip_delay_time), tornando seu dapp lento e ineficiente. Uma solução alternativa pode ser uma função de chamada de busca dentro do seu contrato que retorna múltiplos dados de uma vez. No entanto, isso nem sempre é o ideal.

E você também pode se interessar por dados históricos. Você quer saber não apenas o horário da última negociação, mas os horários de todas as negociações que você mesmo já fez. Use o pacote subgraph do _create-eth-app_, leia a [documentação](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph) e adapte-o aos seus próprios contratos. Se você estiver procurando por contratos inteligentes populares, pode ser que já exista um subgraph. Confira o [explorador de subgraphs](https://thegraph.com/explorer/).

Depois de ter um subgraph, ele permite que você escreva uma consulta simples em seu dapp que recupera todos os dados importantes da cadeia de blocos, incluindo os históricos que você precisa, com apenas uma busca necessária.

### Apollo {#apollo}

Graças à integração do [Apollo Boost](https://www.apollographql.com/docs/react/get-started/), você pode integrar facilmente o graph em seu dapp React. Especialmente ao usar [React hooks e Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks), buscar dados é tão simples quanto escrever uma única consulta GraphQL em seu componente:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Modelos {#templates}

Além disso, você pode escolher entre vários modelos diferentes. Até agora, você pode usar uma integração com Aave, Compound, UniSwap ou sablier. Todos eles adicionam endereços de contratos inteligentes de serviços importantes, juntamente com integrações de subgraphs pré-fabricadas. Basta adicionar o modelo ao comando de criação, como `yarn create eth-app my-eth-app --with-template aave`.

### Aave {#aave}

O [Aave](https://aave.com/) é um mercado descentralizado de empréstimo de dinheiro. Os depositantes fornecem liquidez ao mercado para obter uma renda passiva, enquanto os mutuários podem pegar emprestado usando garantias. Uma característica única do Aave são os [empréstimos-relâmpago (flash loans)](https://aave.com/docs/developers/flash-loans), que permitem que você pegue dinheiro emprestado sem qualquer garantia, desde que devolva o empréstimo em uma única transação. Isso pode ser útil, por exemplo, para lhe dar um dinheiro extra em negociações de arbitragem.

Os tokens negociados que rendem juros são chamados de _aTokens_.

Ao optar por integrar o Aave com o _create-eth-app_, você obterá uma [integração de subgraph](https://docs.aave.com/developers/getting-started/using-graphql). O Aave usa o The Graph e já fornece vários subgraphs prontos para uso na [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) e na [Rede Principal (Mainnet)](https://thegraph.com/explorer/subgraph/aave/protocol) em formato [bruto (raw)](https://thegraph.com/explorer/subgraph/aave/protocol-raw) ou [formatado (formatted)](https://thegraph.com/explorer/subgraph/aave/protocol).

![Meme de Empréstimo-Relâmpago (Flash Loan) da Aave – \"Éééé, se eu pudesse manter meu empréstimo-relâmpago por mais de 1 transação, seria ótimo\"](./flashloan-meme.png)

### Compound {#compound}

O [Compound](https://compound.finance/) é semelhante ao Aave. A integração já inclui o novo [Compound v2 Subgraph](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195). Os tokens que rendem juros aqui são, surpreendentemente, chamados de _cTokens_.

### Uniswap {#uniswap}

A [Uniswap](https://uniswap.exchange/) é uma corretora descentralizada (DEX). Os provedores de liquidez podem ganhar taxas fornecendo os tokens ou ether necessários para ambos os lados de uma negociação. É amplamente utilizada e, portanto, tem uma das maiores liquidez para uma gama muito ampla de tokens. Você pode integrá-la facilmente em seu dapp para, por exemplo, permitir que os usuários façam o swap de seus ETH por DAI.

Infelizmente, no momento em que este artigo foi escrito, a integração é apenas para a Uniswap v1 e não para a [versão v2 recém-lançada](https://uniswap.org/blog/uniswap-v2/).

### Sablier {#sablier}

O [Sablier](https://sablier.com/) permite que os usuários façam pagamentos de dinheiro por streaming. Em vez de um único dia de pagamento, você recebe seu dinheiro constantemente, sem necessidade de administração adicional após a configuração inicial. A integração inclui seu [próprio subgraph](https://thegraph.com/explorer/subgraph/sablierhq/sablier).

## O que vem a seguir? {#whats-next}

Se você tiver dúvidas sobre o _create-eth-app_, acesse o [servidor da comunidade Sablier](https://discord.gg/bsS8T47), onde você pode entrar em contato com os autores do _create-eth-app_. Como próximos passos, você pode querer integrar um framework de UI como o [Material UI](https://mui.com/material-ui/), escrever consultas GraphQL para os dados que você realmente precisa e configurar a implantação.
