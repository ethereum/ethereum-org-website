---
title: Cadeias de fragmentos
description: "Aprenda sobre as cadeias de fragmentos: partições da rede que aumentam a capacidade de transações de Ethereum e facilitam o seu funcionamento."
lang: pt-br
template: upgrade
image: ../../../../../assets/upgrades/newrings.png
summaryPoint1: A fragmentação é uma atualização para melhorar o dimensionamento e a capacidade do Ethereum.
summaryPoint2: As cadeias de fragmentos distribuem a carga da rede por 64 novas cadeias.
summaryPoint3: Elas facilitam a execução de um nó mantendo os requisitos de hardware baixos.
summaryPoint4: Esta atualização está planejada para logo depois da integração da rede principal com a Beacon Chain.
---

<UpgradeStatus dateKey="page-upgrades-shards-date">
    As cadeias de fragmentos devem ser introduzidas em algum momento de 2022, dependendo do andamento do trabalho depois da <a href="/upgrades/merge/">a fusão</a>. Esses fragmentos darão ao Ethereum mais capacidade de armazenamento e acesso aos dados, mas eles não serão usados para execução de código. Os detalhes disso ainda estão sendo avaliados.
</UpgradeStatus>

## O que é a fragmentação (sharding)? {#what-is-sharding}

A fragmentação é o processo de dividir um banco de dados horizontalmente para distribuir a carga; é um conceito comum em ciências da computação. Em um contexto Ethereum, a fragmentação reduzirá o congestionamento da rede e aumentará as transações por segundo criando novas cadeias conhecidas como "shards/fragmentos".

Isso é importante por outras razões além do dimensionamento.

## Características da fragmentação {#features-of-sharding}

### Todos podem executar um nó {#everyone-can-run-a-node}

A fragmentação é uma boa maneira de escalar se você quiser manter as coisas descentralizadas, pois a alternativa é escalar aumentando o tamanho do banco de dados existente. Isso tornaria o Ethereum menos acessível para os validadores de rede, pois eles precisariam de computadores potentes e caros. Com as cadeias de fragmentos, os validadores só precisam armazenar/executar dados para o fragmento que estão validando e não para toda a rede (como acontece hoje). Isso acelera as coisas e reduz drasticamente os requisitos de hardware.

### Mais participação na rede {#more-network-participation}

A fragmentação eventualmente permitirá você executar o Ethereum em um laptop ou smartphone. Portanto, mais pessoas devem poder participar ou executar os [clientes](/developers/docs/nodes-and-clients/) em um Ethereum com fragmentação. Isso aumentará a segurança pois quanto mais descentralizada for a rede, menor será a área de ataque.

Com requisitos de hardware mais baixos, a fragmentação tornará mais fácil a execução dos [clientes](/developers/docs/nodes-and-clients/) por conta própria, sem depender de nenhum serviço intermediário. E, se puder, considere a execução de vários clientes. Isso pode ajudar a melhorar a integridade da rede reduzindo ainda mais os pontos de falha. [Execute um cliente da Beacon Chain](/upgrades/get-involved/)

<br />

<InfoBanner isWarning={true}>
  Inicialmente, você precisará executar um cliente da rede principal de forma simultânea com um cliente da Beacon Chain. <a href="https://launchpad.ethereum.org" target="_blank">O launchpad</a> o guiará através dos requisitos e processos de hardware. Como alternativa, você pode usar uma <a href="/developers/docs/apis/backend/#available-libraries">API de back-end</a>.
</InfoBanner>

## Cadeias de fragmentos versão 1: disponibilidade de dados {#data-availability}

Quando as primeiras cadeias de fragmentos forem enviadas, elas apenas fornecerão dados extras para a rede. Elas não lidarão com transações ou contratos inteligentes. Mas ainda oferecerão melhorias incríveis às transações por segundo quando combinadas com rollups.

Os rollups são uma tecnologia de "camada 2" que existe hoje. Eles permitem que os dapps organizem ou façam um "rollup" das transações em uma única transação fora da cadeia, gerem uma prova criptográfica e a enviem para a cadeia. Isso reduz o volume dos dados necessários para uma transação. Combine isso com toda a disponibilidade de dados extra fornecida pelos fragmentos e obterá 100.000 transações por segundo.

<InfoBanner isWarning={false}>
  Dado os avanços recentes em termos de pesquisa e desenvolvimento da solução de dimensionamento da camada 2, isso nos levou a priorizar a melhoria da integração, e não as cadeias de fragmentos. Estas serão priorizadas logo após a transição da rede principal para o sistema de prova de participação.

[Mais sobre rollups](/developers/docs/scaling/layer-2-rollups/)
</InfoBanner>

## Cadeias de fragmentos versão 2: código de execução {#code-execution}

O plano sempre foi adicionar funcionalidades extras aos fragmentos para torná-los mais parecidos com a [rede principal de Ethereum](/glossary/#mainnet) de hoje. Isso permitiria que esses fragmentos armazenassem e executassem contratos inteligentes e gerenciassem contas. Mas, considerando o aumento das transações por segundo que os fragmentos na versão 1 oferecem, isso ainda precisa ser feito? Esta questão ainda está sendo discutida na comunidade e parece que existem várias opções.

### Os fragmentos precisam de código de execução? {#do-shards-need-code-execution}

Vitalik Buterin, em uma conversa no podcast Bankless, apresentou 3 opções possíveis que merecem ser discutidas.

<YouTube id="-R0j5AMUSzA" start="5841" />

#### 1. A execução do estado não é necessária {#state-execution-not-needed}

Isso significaria não darmos aos fragmentos a capacidade de lidar com contratos inteligentes e deixá-los como depósitos de dados.

#### 2. Tenha alguns fragmentos de execução {#some-execution-shards}

Talvez haja um compromisso no qual não necessitemos de todos os fragmentos (64 estão planejados neste momento) para ser mais inteligentes. Poderíamos simplesmente adicionar essa funcionalidade a alguns e deixar de lado os demais. Isso poderá acelerar o processo de entrega.

#### 3. Esperar até que possamos fazer snarks de Conhecimento Zero (CZ) {#wait-for-zk-snarks}

Finalmente, talvez devamos reabrir este debate quando os snarks (prova de validade da informação) ZK estiverem concretizados. Essa é uma tecnologia que pode ajudar a trazer transações verdadeiramente privadas para a rede. Provavelmente serão necessários fragmentos mais inteligentes, mas eles ainda estão em fase de pesquisa e desenvolvimento.

#### Outras fontes {#other-sources}

Aqui você pode ver mais ideias sobre o mesmo tema:

- [Fase 1 e o que foi feito: Eth2 como um mecanismo de disponibilidade de dados](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) – _cdetrio, ethresear.ch_

Esse continua a ser um ponto de discussão ativo. Assim que soubermos mais, atualizaremos estas páginas.

## Relação entre as melhorias {#relationship-between-upgrades}

Todas as melhorias do Ethereum estão, de alguma forma, interrelacionadas. Vamos recapitular como as cadeias de fragmentos se relacionam às outras melhorias.

### Fragmentos e a beacon chain {#shards-and-beacon-chain}

A Beacon Chain contém toda a lógica para manter os fragmentos seguros e sincronizados. A Beacon Chain coordenará os participantes na rede, atribuindo-os aos fragmentos nos quais eles precisam trabalhar. E também facilitará a comunicação entre fragmentos recebendo e armazenando dados de transações de fragmentos acessíveis por outros fragmentos. Isso dará aos fragmentos uma fotografia do estado de Ethereum para manter tudo atualizado.

<ButtonLink to="/upgrades/beacon-chain/">
  A Beacon Chain
</ButtonLink>

### Fragmentos e integração {#shards-and-docking}

Quando for feita a adição de fragmentos extras, a rede principal de Ethereum já estará segura pela Beacon Chain usando uma prova de participação. Isso permite que uma rede principal produtiva crie cadeias de fragmentos com base em soluções de camada 2 que aumentam o dimensionamento.

Resta saber se a rede principal existirá como o único fragmento "inteligente" que poderá lidar com a execução de código. No entanto, a decisão de expandir fragmentos pode ser revista, se necessário.

<ButtonLink to="/upgrades/merge/">
  A fusão
</ButtonLink>

<Divider />

### Leia mais {#read-more}

<ShardChainsList />
