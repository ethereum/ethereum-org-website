---
title: Fragmentação
description: Saiba mais sobre como fragmentar e distribuir a carga de dados necessária para dar ao Ethereum mais capacidade de transação e facilitar a execução.
lang: pt-br
template: upgrade
image: ../../../assets/upgrades/newrings.png
summaryPoint1: A fragmentação é uma atualização para melhorar o dimensionamento e a capacidade do Ethereum.
summaryPoint2: A fragmentação fornece distribuição segura dos requisitos de armazenamento de dados, permitindo que os rollups sejam ainda mais baratos, e tornando os nós mais fáceis de operar.
summaryPoint3: Eles permitem soluções de camada 2 para oferecer taxas de transação baixas, ao mesmo tempo que aproveitam a segurança do Ethereum.
summaryPoint4: Essa atualização se tornou mais um foco desde que a Ethereum mudou para a prova de participação.
---

<UpgradeStatus dateKey="page-upgrades-shards-date">
    A fragmentação poderá ser feita em 2023. Os fragmentos darão ao Ethereum mais capacidade para armazenar e acessar dados, mas não serão usados para executar código.
</UpgradeStatus>

## O que é a fragmentação (sharding)? {#what-is-sharding}

A fragmentação é o processo de dividir um banco de dados horizontalmente para distribuir a carga; é um conceito comum em ciências da computação. No contexto do Ethereum, a fragmentação funcionará sinergicamente com os [rollups de camada 2](/layer-2/), dividindo o ônus de lidar com o excesso de dados necessários para rollups em toda a rede. Isso continuará a reduzir o congestionamento da rede e aumentar as transações por segundo.

Isso é importante por outras razões além do dimensionamento.

## Características da fragmentação {#features-of-sharding}

### Todos podem executar um nó {#everyone-can-run-a-node}

A fragmentação é uma boa maneira de escalar se você quiser manter as coisas descentralizadas, pois a alternativa é escalar aumentando o tamanho do banco de dados existente. Isso tornaria o Ethereum menos acessível para os validadores de rede, pois eles precisariam de computadores potentes e caros. Com a fragmentação, os validadores não precisarão mais armazenar todos esses dados, mas poderão usar técnicas de dados para confirmar que as informações foram disponibilizadas para a rede como um todo. Isso reduz drasticamente os custos com o armazenamento de dados na camada 1, reduzindo os requisitos de hardware.

### Mais participação na rede {#more-network-participation}

A fragmentação eventualmente permitirá você executar o Ethereum em um laptop ou smartphone. Portanto, mais pessoas devem poder participar ou executar os [clientes](/developers/docs/nodes-and-clients/) em um Ethereum com fragmentação. Isso aumentará a segurança pois quanto mais descentralizada for a rede, menor será a área de ataque.

Com requisitos de hardware mais baixos, a fragmentação tornará mais fácil a execução dos [clientes](/developers/docs/nodes-and-clients/) por conta própria, sem depender de nenhum serviço intermediário. E, se puder, considere a execução de vários clientes. Isso pode ajudar a melhorar a integridade da rede reduzindo ainda mais os pontos de falha.

<br />

<InfoBanner isWarning>
  Você precisará executar um cliente de execução ao mesmo tempo que seu cliente de consenso. <a href="https://launchpad.ethereum.org" target="_blank">O launchpad</a> o guiará através dos requisitos e processos de hardware.
</InfoBanner>

## Cadeias de fragmentos versão 1: disponibilidade de dados {#data-availability}

<InfoBanner emoji=":construction:" isWarning>
  <strong>Nota:</strong> os planos de fragmentação evoluíram à medida que caminhos mais eficientes para escalar foram desenvolvidos. "Danksharding" é uma nova abordagem de fragmentação, que não utiliza o conceito de "cadeias" de fragmentos, mas usa "blobs" de fragmentos para dividir os dados, juntamente com "amostragem de disponibilidade de dados" para confirmar que todos os dados foram disponibilizados. Essa mudança de plano resolve o mesmo problema original.<br/><br/>
  <strong>Os detalhes abaixo podem estar desatualizados com os últimos planos de desenvolvimento.</strong> Enquanto atualizamos, confira <a href="https://members. delphidigital. io/reports/the-hitchhikers-guide-to-ethereum">O Guia do Mochileiro para o Ethereum</a> para uma excelente descrição do planejamento do Ethereum.
</InfoBanner>

Quando as primeiras cadeias de fragmentos forem enviadas, elas apenas fornecerão dados extras para a rede. Elas não lidarão com transações ou contratos inteligentes. Mas ainda oferecerão melhorias incríveis às transações por segundo quando combinadas com rollups.

Os rollups são uma tecnologia de "camada 2" que existe hoje. Eles permitem que os dapps organizem ou façam um "rollup" das transações em uma única transação fora da cadeia, gerem uma prova criptográfica e a enviem para a cadeia. Isso reduz o volume dos dados necessários para uma transação. Combine isso com toda a disponibilidade de dados extra fornecida pelos fragmentos e obterá 100.000 transações por segundo.

## Cadeias de fragmentos versão 2: código de execução {#code-execution}

O plano sempre foi adicionar funcionalidades extras aos fragmentos para torná-los mais parecidos com a [rede principal de Ethereum](/glossary/#mainnet) de hoje. Isso permitiria a eles armazenar e executar o código e lidar com transações, já que cada fragmento conteria seu conjunto único de contratos inteligentes e saldos das contas. A comunicação entre fragmentos permitiria transações entre fragmentos.

Mas, considerando o aumento das transações por segundo que os fragmentos na versão 1 oferecem, isso ainda precisa ser feito? Esta questão ainda está sendo debatida na comunidade e parece que existem várias opções.

### Os fragmentos precisam de código de execução? {#do-shards-need-code-execution}

Vitalik Buterin, numa conversa com o podcast Bankless, apresentou 3 opções possíveis que merecem ser discutidas.

<YouTube id="-R0j5AMUSzA" start="5841" />

#### 1. A execução do estado não é necessária {#state-execution-not-needed}

Isso significaria não darmos aos fragmentos a capacidade de lidar com contratos inteligentes e deixá-los como depósitos de dados.

#### 2. Tenha alguns fragmentos de execução {#some-execution-shards}

Talvez haja um compromisso em que não precisemos que todos os fragmentos sejam mais inteligentes. Poderíamos simplesmente adicionar essa funcionalidade a alguns e deixar de lado os demais. Isso poderá acelerar o processo de entrega.

#### 3. Esperar até que possamos fazer snarks de Conhecimento Zero (CZ) {#wait-for-zk-snarks}

Finalmente, talvez devamos reabrir este debate quando os snarks ZK estiverem concretizados. Essa é uma tecnologia que pode ajudar a trazer transações verdadeiramente privadas para a rede. Provavelmente, serão necessários fragmentos mais inteligentes, mas eles ainda estão em fase de pesquisa e desenvolvimento.

#### Outras fontes {#other-sources}

Aqui você pode ver mais ideias sobre o mesmo tema:

- [Fase 1 e o que foi feito: Eth2 como um mecanismo de disponibilidade de dados](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) – _cdetrio, ethresear.ch_

Esse continua a ser um ponto de discussão ativo. Assim que soubermos mais, atualizaremos estas páginas.

## Relação entre as melhorias {#relationship-between-upgrades}

Todas as melhorias do Ethereum estão, de alguma forma, interrelacionadas. Vamos recapitular como as cadeias de fragmentos se relacionam às outras melhorias.

### Fragmentos e a cadeia de blocos do Ethereum {#shards-and-blockchain}

A lógica para manter fragmentos seguros e sincronizados é integrada aos clientes do Ethereum que constroem a cadeia de blocos. Os participantes na rede serão atribuídos a fragmentos para trabalhar. Os fragmentos terão acesso a registros de outros fragmentos para poder criar uma visão do estado do Ethereum com a finalidade de manter tudo atualizado.

### Leia mais {#read-more}

<ShardChainsList />
