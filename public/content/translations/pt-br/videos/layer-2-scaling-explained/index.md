---
title: "Escalonamento da camada 2 do Ethereum explicado"
description: "Uma visão geral das soluções de escalonamento da camada 2 para o Ethereum, incluindo rollups, Plasma, canais de estado e sidechains."
lang: pt-br
youtubeId: "BgCgauWVTs0"
uploadDate: 2021-02-03
duration: "0:14:28"
educationLevel: intermediate
topic:
  - "escalonamento"
  - "camada-2"
format: explainer
author: Finematics
breadcrumb: "Escalonamento da camada 2"
---

Uma explicação da **Finematics** cobrindo as soluções de escalonamento da camada 2 (l2) para o Ethereum — incluindo canais, Plasma, sidechains e rollups, e por que os rollups estão surgindo como a estratégia de escalonamento dominante. Aprenda como essas tecnologias reduzem custos e aumentam a vazão enquanto herdam a segurança do Ethereum.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=BgCgauWVTs0) publicada pela Finematics. Ela foi levemente editada para facilitar a leitura.*

#### Escalonamento do Ethereum (0:31) {#ethereum-scaling-031}

O escalonamento do Ethereum tem sido um dos tópicos mais discutidos praticamente desde a época em que a rede foi lançada. O debate sobre o escalonamento sempre esquenta após um período de grande congestionamento da rede.

Um dos primeiros períodos como esse foi o mercado de alta de cripto de 2017, onde os infames CryptoKitties, juntamente com as ICOs, conseguiram entupir toda a rede Ethereum, causando um grande pico nas taxas de gás. Este ano, o congestionamento da rede voltou ainda mais forte, desta vez causado pela popularidade das finanças descentralizadas (DeFi) e do yield farming. Houve períodos em que mesmo taxas de gás tão altas quanto 500+ gwei não fariam com que sua transação fosse verificada por um tempo.

#### Escalonamento de blockchains (1:20) {#scaling-blockchains-120}

Quando se trata de escalonar o Ethereum ou blockchains em geral, existem duas maneiras principais de fazer isso: escalonar a própria camada base — camada 1 (l1) — ou escalonar a rede transferindo parte do trabalho para outra camada — camada 2 (l2).

A camada 1 (l1) é a camada de consenso base padrão onde praticamente todas as transações são liquidadas atualmente. O conceito de camadas não é um conceito específico do Ethereum; outras blockchains, como Bitcoin ou Zcash, também o utilizam extensivamente.

A camada 2 (l2) é outra camada construída sobre a camada 1. Há alguns pontos importantes aqui: a camada 2 não exige nenhuma alteração na camada 1 — ela pode ser simplesmente construída sobre a camada 1 usando seus elementos existentes, como contratos inteligentes. A camada 2 também aproveita a segurança da camada 1 ancorando seu estado na camada 1.

O Ethereum pode processar atualmente cerca de 15 transações por segundo em sua camada base. O escalonamento da camada 2 pode aumentar drasticamente o número de transações — dependendo da solução, processando entre 2.000 e 4.000 transações por segundo.

#### Ethereum 2.0 (2:39) {#ethereum-20-239}

E quanto ao Ethereum 2.0? Ele não deveria escalonar o Ethereum? Sim — o Ethereum 2.0 introduz a Prova de Participação (PoS) e cadeias de fragmentos (sharding) que aumentarão drasticamente a vazão de transações na camada base.

Isso significa que não precisamos do escalonamento da camada 2 (l2) quando o Ethereum 2.0 for lançado? Na verdade não — mesmo com cadeias de fragmentos, o Ethereum ainda precisará do escalonamento da camada 2 para ser capaz de lidar com centenas de milhares ou até milhões de transações por segundo no futuro.

#### Trilema da escalabilidade (3:15) {#scalability-trilemma-315}

É aqui também que o famoso trilema da escalabilidade entra em jogo. Na teoria, poderíamos simplesmente pular a camada 2 (l2) inteiramente e focar no escalonamento da camada base. Isso exigiria nós altamente especializados para lidar com o aumento da carga de trabalho, o que levaria a uma maior centralização e, portanto, diminuiria a segurança e as propriedades de resistência à censura da rede.

Mantendo o fato de que a escalabilidade nunca deve vir às custas da segurança e da descentralização, ficamos com uma combinação de escalonamento da camada 1 (l1) e da camada 2 (l2) avançando para o futuro.

#### Escalonamento da camada 2 (3:52) {#layer-2-scaling-352}

O escalonamento da camada 2 (l2) é um termo coletivo para soluções que ajudam a aumentar as capacidades da camada 1 (l1) lidando com transações offchain. As duas principais capacidades que podem ser melhoradas são a velocidade da transação e a vazão da transação. Além disso, as soluções de camada 2 podem reduzir muito as taxas de gás.

Quando se trata de soluções reais de escalonamento, existem várias opções disponíveis. Algumas das opções estão disponíveis agora e podem aumentar a vazão da rede Ethereum no curto a médio prazo, enquanto outras visam um horizonte de tempo de médio a longo prazo. Algumas soluções são específicas para aplicativos — por exemplo, canais de pagamento — enquanto outras, como optimistic rollups, podem ser usadas para quaisquer execuções arbitrárias de contrato.

#### Canais (5:03) {#channels-503}

Os canais são uma das primeiras soluções de escalonamento amplamente discutidas. Eles permitem que os participantes troquem suas transações várias vezes enquanto enviam apenas duas transações para a camada base. Os tipos mais populares de canais são os canais de estado e seu subtipo, os canais de pagamento.

Embora os canais tenham o potencial de processar facilmente milhares de transações por segundo, eles vêm com algumas desvantagens. Eles não oferecem participação aberta — os participantes devem ser conhecidos antecipadamente, e os usuários precisam bloquear seus fundos em um contrato multisig. Além disso, essa solução de escalonamento é específica para aplicativos e não pode ser usada para escalonar contratos inteligentes de uso geral.

O principal projeto que aproveita o poder dos canais de estado no Ethereum é o Raiden. O conceito de canais de pagamento também é extensivamente usado pela Lightning Network do Bitcoin.

#### Plasma (6:04) {#plasma-604}

O Plasma é uma solução de escalonamento da camada 2 (l2) que foi originalmente proposta por Joseph Poon e Vitalik Buterin. É um framework para construir aplicativos escaláveis no Ethereum.

O Plasma aproveita o uso de contratos inteligentes e árvores de Merkle para permitir a criação de um número ilimitado de cadeias filhas — cópias da blockchain Ethereum principal. Transferir transações da cadeia principal para cadeias filhas permite transações rápidas e baratas.

Uma das desvantagens do Plasma é um longo período de espera para os usuários que desejam sacar seus fundos da camada 2. O Plasma, de forma semelhante aos canais, não pode ser usado para escalonar contratos inteligentes de uso geral. A OMG Network é construída em sua própria implementação do Plasma chamada More Viable Plasma. A Matic Network é outro exemplo de uma plataforma usando uma versão adaptada do framework Plasma.

#### Sidechains (7:08) {#sidechains-708}

As sidechains são blockchains independentes compatíveis com o Ethereum, com seus próprios modelos de consenso e parâmetros de bloco. A interoperabilidade com o Ethereum é tornada possível usando a mesma Ethereum Virtual Machine (EVM), de modo que os contratos implantados na camada base do Ethereum podem ser implantados diretamente na sidechain.

xDai é um exemplo de tal sidechain.

#### ZK rollups (8:11) {#zk-rollups-811}

Os rollups fornecem escalonamento agrupando — ou "enrolando" (rolling up) — transações de sidechain em uma única transação e gerando uma prova criptográfica, também conhecida como SNARK (Succinct Non-interactive Argument of Knowledge). Apenas essa prova é enviada para a camada base. Com os rollups, todo o estado e a execução da transação são tratados em sidechains; a cadeia principal do Ethereum armazena apenas os dados da transação.

Existem dois tipos de rollups: ZK rollups e optimistic rollups.

Os ZK rollups, embora mais rápidos e eficientes do que os optimistic rollups, não fornecem uma maneira fácil para os contratos inteligentes existentes migrarem para a camada 2 (l2).

Os optimistic rollups executam uma máquina virtual compatível com a EVM chamada OVM (Optimistic Virtual Machine), que permite executar os mesmos contratos inteligentes que podem ser executados no Ethereum. Isso é muito importante, pois torna mais fácil para os contratos inteligentes existentes manterem sua composabilidade, o que é extremamente relevante nas finanças descentralizadas (DeFi), onde todos os principais contratos inteligentes já foram testados em batalha.

Um dos principais projetos trabalhando em optimistic rollups é a Optimism, que está cada vez mais perto do lançamento de sua Mainnet. Quando se trata de ZK rollups, Loopring e DeversiFi são bons exemplos de exchanges descentralizadas construídas na camada 2. Além disso, temos a zkSync permitindo pagamentos cripto escaláveis.

#### Um roteiro centrado em rollups (9:18) {#a-rollup-centric-roadmap-918}

A escalabilidade dos rollups também pode ser ampliada pelo Ethereum 2.0. De fato, como os rollups precisam apenas que a camada de dados seja escalonada, eles podem obter um tremendo impulso já na Fase 1 do Ethereum 2.0, que trata da fragmentação de dados.

Apesar de um espectro de soluções de escalonamento da camada 2 (l2) disponíveis, parece que a comunidade Ethereum está convergindo para a abordagem de escalonar principalmente por meio de rollups e da fragmentação de dados da Fase 1 do Ethereum 2.0. Essa abordagem também foi confirmada em uma postagem recente de Vitalik Buterin chamada "A Rollup-Centric Ethereum Roadmap" (Um Roteiro do Ethereum Centrado em Rollups).

Em vídeos futuros, exploraremos o escalonamento da camada base com o Ethereum 2.0 e como o escalonamento tanto da camada 1 (l1) quanto da camada 2 (l2) pode ajudar a tornar as finanças descentralizadas (DeFi) mais acessíveis a todos.