---
title: "Fundamentos do Ethereum: introdução"
description: "Uma palestra introdutória sobre os fundamentos do Ethereum, cobrindo o que é o Ethereum, como ele difere do Bitcoin e os conceitos centrais que sustentam a rede Ethereum."
lang: pt-br
youtubeId: "j78ZcIIpi0Q"
uploadDate: 2022-03-01
duration: "0:11:14"
educationLevel: beginner
topic:
  - "ethereum"
  - "intro"
format: presentation
author: Quezar
breadcrumb: "Fundamentos do Ethereum"
---

Uma palestra introdutória de **Quezar** cobrindo os fundamentos do Ethereum, incluindo o que são blockchains, como funcionam internamente e os principais componentes que formam a rede Ethereum.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=j78ZcIIpi0Q) publicada por Quezar. Ela foi levemente editada para facilitar a leitura.*

#### Boas-vindas e visão geral da série (0:03) {#welcome-and-series-overview-003}

Bem-vindo de volta a mais uma parte da série sobre Ethereum. Se você estava procurando um bom recurso para entender como o Ethereum funciona internamente, nós temos o que você precisa. Na nossa parte anterior, cobrimos como ler e escrever contratos básicos em Solidity e discutimos brevemente algumas coisas sobre os vários componentes da rede Ethereum. Nesta parte, faremos uma análise aprofundada da arquitetura do Ethereum e discutiremos cada componente com muito mais detalhes. Temos muitos outros vídeos em breve, então, se você gosta desse tipo de conteúdo, clique no botão de curtir e inscreva-se para ser notificado quando o novo vídeo for ao ar.

#### Objetivos e pré-requisitos (0:40) {#goals-and-prerequisites-040}

O objetivo desta parte da série é dar a você uma boa compreensão da arquitetura do Ethereum em uma semana. Assim como na parte anterior, eu a estruturei para que, em sete dias, você se sinta muito mais confortável com tudo o que acontece na rede Ethereum sempre que alguém realiza uma atividade nela.

Falando sobre pré-requisitos — não há nada específico que você já deva saber. Se você está assistindo a este vídeo, é muito provável que saiba o suficiente sobre a rede Ethereum no que diz respeito a esta parte. Mas eu recomendaria concluir a parte anterior da série — Fundamentos de Solidity — porque essa parte é de natureza muito mais prática. Você pode executar código no Remix IDE e ver como as coisas realmente funcionam na rede Ethereum. Esta parte será principalmente teórica e, se você já cobriu a parte anterior, achará muito mais fácil acompanhá-la.

#### O que vamos cobrir (1:41) {#what-well-cover-141}

Nesta parte, cobriremos o que são blockchains e veremos como funcionam internamente. Também veremos quais componentes formam a rede Ethereum e, em seguida, avançaremos e discutiremos cada componente com muito mais detalhes.

Para esta parte, usei a documentação oficial do Ethereum como base. Depois de concluir esta parte, você terá coberto a maior parte dos tópicos fundamentais desta documentação. Você terá muito mais facilidade em percorrê-la. Obviamente, nem tudo está nos vídeos, mas tentei cobrir todas as coisas em um nível mais alto. Você pode considerar esta parte como uma introdução para a documentação, que é muito mais aprofundada.

#### Ferramentas e abordagem (2:30) {#tools-and-approach-230}

Também usaremos o Etherscan para ver como cada componente está funcionando em tempo real. Não se preocupe se não conseguir entender tudo de uma vez — você sempre pode revisitar tópicos específicos novamente quando quiser. Eu recomendaria fazer pequenas pausas após cada tópico para que você consiga absorvê-los melhor. Então, vamos começar entendendo o que são blockchains.