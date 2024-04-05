---
title: Comece a desenvolver o front-end do seu dapp usando create-eth-app
description: Uma visão geral de como criar um aplicativo eth-app e seus recursos
author: "Markus Waas"
tags:
  - "create-eth-app"
  - "front-end"
  - "javascript"
  - "ethers.js"
  - "o grafo"
  - "defi"
skill: intermediate
lang: pt-br
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

Da última vez, olhamos [para a grande imagem de Solidity](https://soliditydeveloper.com/solidity-overview-2020) e já mencionamos o app [create-eth-](https://github.com/PaulRBerg/create-eth-app). Agora você vai descobrir como usá-lo, quais recursos são integrados e ideias adicionais sobre como expandir sobre isso. Iniciado por Paul Razvan Berg, o fundador do [Sablier](http://sablier.com/), este aplicativo irá iniciar seu desenvolvimento de frontend e vem com várias integrações opcionais para escolher.

## Instalação {#installation}

A instalação requer Yarn 0.25 ou versão superior (`npm install yarn --global`). Ela é muito simples de executar:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Está usando [create-react-app](https://github.com/facebook/create-react-app) debaixo do "hood". Para ver sua aplicação, abra `http://localhost:3000/`. Quando você estiver pronto para implantar em produção, crie um pacote minificado com o build Yarn. Uma maneira fácil de hospedar isso seria [Netlify](https://www.netlify.com/). Você pode criar um repositório GitHub, adicioná-lo ao Netlify, configurar o comando build e pronto! Seu aplicativo será hospedado e utilizável para todos. E tudo isso gratuitamente.

## Funcionalidades {#features}

### React & create-react-app {#react--create-react-app}

Primeiro de tudo o coração da aplicação: React e todas as funcionalidades adicionais que vêm com o _create-react-app_. Usar apenas essa é uma ótima opção se você não quiser integrar a Ethereum. O [React](https://reactjs.org/) torna a construção de interfaces de usuário interativas muito fácil. Ele pode não ser tão simples para iniciantes como o [Vue](https://vuejs.org/), mas ainda é o mais usado, tem mais recursos e, sobretudo, conta com milhares de opções de bibliotecas adicionais. O _create-react-app_ torna muito fácil começar com ele também e inclui:

- React, JSX, ES6, TypeScript, Sintaxe Flow.
- Idioma extra além do ES6 como o operador de propagação de objetos.
- CSS prefixados automaticamente, para que você não precise de -webkit- ou outros prefixos.
- Um rápido corretor de teste de unidade interativa com suporte embutido para relatórios de cobertura.
- Um servidor de desenvolvimento dinâmico que avisa sobre erros comuns.
- Um script de compilação para empacotar JS, CSS e imagens para produção, com hashes e sourcemaps.

O _create-eth-app_ em particular está usando novos [efeitos de hooks](https://reactjs.org/docs/hooks-effect.html). Um método para escrever componentes ditos funcionais, poderosos, mas muito pequenos. Veja a seção abaixo sobre Apollo sobre como eles são usados no _create-eth-app_.

### Yarn workspaces {#yarn-workspaces}

[Yarn Workspace](https://classic.yarnpkg.com/en/docs/workspaces/) permite que você tenha vários pacotes, mas ser capaz de gerenciar tudo a partir da pasta raiz e instalar as dependências de uma só vez usando `yarn install`. Isso faz sentido especialmente para pacotes adicionais menores, como o gerenciamento de endereços de contratos inteligentes / ABI (a informação sobre onde você implementou quais contratos inteligentes e como se comunicar com eles) ou a integração de grafos, ambos parte do `create-eth-app`.

### ethers.js {#ethersjs}

Enquanto o [Web3](https://docs.web3js.org/) ainda é mais usado, [ethers. s](https://docs.ethers.io/) tem recebido muito mais tração como uma alternativa no último ano e é integrada no _create-eth-app_. Você pode trabalhar com este, alterá-lo para Web3 ou considerar a possibilidade de atualizar para [ethers.js v5](https://docs-beta.ethers.io/) que já quase saiu da versão beta.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/) é uma forma alternativa de manipular dados em comparação com uma [Restful API](https://restfulapi.net/). Eles têm várias vantagens sobre o Restful Apis, especialmente para dados descentralizados da blockchain. Se você estiver interessado no raciocínio por trás disso, dê uma olhada no [GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a).

Geralmente, você obteria dados diretamente do seu contrato inteligente. Gostaria de saber o horário da última transação? Basta chamar `MyContract.methods.latestTradeTime().call()` que busca os dados de um nó Ethereum em seu dapp. Mas e se você precisar de centenas de pontos de dados diferentes? Isso resultaria em centenas de buscas de dados para o nó, cada vez exigindo um [RTT](https://wikipedia.org/wiki/Round-trip_delay_time) tornando seu dapp lento e ineficiente. Uma solução alternativa pode ser uma função de busca de chamadas dentro do seu contrato que retorna vários dados de uma só vez. Mas nem sempre é o ideal.

E então talvez também estejam interessados em dados históricos. Você quer saber não apenas a última troca, mas também os tempos para todas as negociações que você já fez. Use o _create-eth-app_ pacote de subgráfico, leia a [documentação](https://thegraph.com/docs/define-a-subgraph) e adapte-a aos seus próprios contratos. Se você estiver procurando contratos inteligentes populares, pode até ser que já exista um subgrafo. Confira o [explorador de subgrafos](https://thegraph.com/explorer/).

Ao obter um subgrafo, você pode escrever uma consulta simples em seu dapp para recuperar todos os dados importantes da blockchain, incluindo os históricos de que você precisa — basta uma única busca.

### Apollo {#apollo}

Graças à integração do [Apollo Boost](https://www.apollographql.com/docs/react/get-started/), você pode integrar facilmente o grafo em seu aplicativo React. Especialmente ao usar [React hooks e Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks-676d116eeae2), buscar dados é tão simples como escrever uma única consulta GraphQl em seu componente:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Modelos {#templates}

No topo, você pode escolher entre vários modelos diferentes. Até agora você pode usar uma integração de Aave, composto, UniSwap ou saborosa. Todos eles adicionam importantes endereços de contrato inteligente de serviço, juntamente com integrações pré-fabricadas de subgráficos. Apenas adicione o template ao comando de criação como `yarn create eth-app my-eth-app --with-template aave`.

### Aave {#aave}

[Aave](https://aave.com/) é um mercado descentralizado de empréstimos de dinheiro. Os depositantes fornecem liquidez ao mercado para ganhar uma renda passiva, enquanto os tomadores podem fazer um empréstimo usando garantias. Uma característica única da Aave são os [empréstimos rápidos](https://docs.aave.com/developers/guides/flash-loans) que permitem que você empreste dinheiro sem nenhuma garantia, contanto que você devolva o empréstimo dentro de uma transação. Isso pode ser útil, por exemplo, para você obter dinheiro extra em uma operação de arbitragem.

Os tokens negociados que ganham seus interesses são chamados de _aTokens_.

Quando você optar por integrar o Aave ao _create-eth-app_, você terá uma [integração subgraph](https://docs.aave.com/developers/getting-started/using-graphql). O Aave usa The Graph e já fornece vários subgrafos prontos para uso no [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) e na [Rede principal](https://thegraph.com/explorer/subgraph/aave/protocol), em formato [bruto](https://thegraph.com/explorer/subgraph/aave/protocol-raw) ou [formatado](https://thegraph.com/explorer/subgraph/aave/protocol).

![Meme de Empréstimo Aave – "Yeahhh, se eu conseguisse manter meu empréstimo rápido por mais de 1 transação, isso seria ótimo"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) é similar a Aave. A integração já inclui o novo [Compound v2 Subgraph](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195). Aqui, os tokens que obtêm lucro são surpreendentemente chamados de _cTokens_.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) é uma exchange descentralizada (DEX). Provedores de liquidez podem ganhar taxas fornecendo os tokens necessários ou serviços para ambos os lados de uma negociação. Ela é amplamente utilizada e, portanto, possui uma das mais altas taxas de liquidez para uma grande variedade de tokens. Você pode integrá-lo facilmente ao seu dapp para, por exemplo, permitir que os usuários troquem seu ETH por DAI.

Infelizmente, no momento em que escrevemos a integração é apenas para o Uniswap v1 e não para o [recém-lançado v2](https://uniswap.org/blog/uniswap-v2/).

### Sablier {#sablier}

O [Sablier](https://sablier.com/) permite que os usuários efetuem pagamentos continuamente. Em vez de um único dia de pagamento, você na verdade recebe o seu dinheiro constantemente sem mais administração após a configuração inicial. A integração inclui seu [próprio subgráfico](https://thegraph.com/explorer/subgraph/sablierhq/sablier).

## O que vem a seguir? {#whats-next}

Se você tiver perguntas sobre o _create-eth-app_, acesse o [servidor da comunidade Sablier](https://discord.gg/bsS8T47), onde você pode entrar em contato com os autores do _create-eth-app_. Como alguns primeiros passos que você pode querer integrar uma estrutura UI como [Material UI](https://material-ui.com/), escrever consultas GraphQL para os dados que você realmente precisa e configurar a implantação.
