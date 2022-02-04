---
title: A integração
description: Saiba mais sobre a integração que ocorrerá quando a rede principal do Ethereum se unir ao sistema de prova de participação (proof-of-stake) coordenado pela Beacon Chain.
lang: pt-br
template: upgrade
sidebar: true
image: ../../../../../assets/upgrades/merge.png
summaryPoint1: Eventualmente, a principal rede atual da Ethereum se "integrará" ao sistema de prova de participação.
summaryPoint2: Isso marcará o fim da prova de trabalho para Ethereum e a transição completa para a prova de participação.
summaryPoint3: Essa mudança está prevista para depois da implementação das cadeias de fragmentos.
summaryPoint4: Antes, era chamada de "atracagem".
---

<UpgradeStatus dateKey="page-upgrades-merge-date">
  Essa melhoria representa a mudança oficial para o consenso da prova de participação. Ela elimina a necessidade de minerar com intenso consumo de energia e protege a rede usando o ether aplicado. Um passo verdadeiramente empolgante para concretizar a <a href="/upgrades/vision/"> visão do Eth2 </a> de mais dimensionamento, segurança e sustentabilidade.
</UpgradeStatus>

## De que se trata a integração? {#what-is-the-docking}

É importante lembrar que, inicialmente, a [Beacon Chain](/upgrades/beacon-chain/) é implementada separadamente da [Rede principal](/glossary/#mainnet), a cadeia que usamos hoje. A Rede principal da Ethereum continua a ser protegida pela [proof-of-work](/developers/docs/consensus-mechanisms/pow/), mesmo enquanto a Beacon Chain funciona em paralelo usando [proof-of-stake](/developers/docs/consensus-mechanisms/pos/). A integração é quando estes dois sistemas finalmente se unem.

Imagine que Ethereum é uma espaçonave que ainda não está pronta para uma viagem interestelar. Com a Beacon Chain, a comunidade desenvolveu um novo mecanismo muito mais sólido. Quando for a hora, ocorrerá a integração desses dois sistemas, dando surgimento a um novo sistema que estará totalmente preparado para o futuro.

## Integração com a rede principal {#docking-mainnet}

Quando for o momento, a Rede principal Ethereum se "integrará" com a Beacon Chain, tornando-se seu próprio fragmento que usa prova de participação (proof-of-stake) em vez de [ prova de trabalho (proof-of-work)](/developers/docs/consensus-mechanisms/pow/).

A rede principal trará, além da capacidade de executar contratos inteligentes no sistema de prova de participação (proof-of-stake), o histórico completo e o estado atual da Ethereum, para garantir que a transição seja fácil para todos os detentores e usuários de ETH.

## Depois da integração {#after-the-merge}

Isto sinalizará o fim da prova de trabalho para Ethereum e iniciará a era de uma Ethereum mais sustentável e amigável com o meio ambiente. A Ethereum estará, então, a um passo de alcançar toda a escala, segurança e sustentabilidade definidas na sua visão [da Eth2](/upgrades/vision/).

É importante salientar que a simplicidade é um dos objetivos de implementação da integração, para acelerar a transição da prova de trabalho para a prova de participação. Os desenvolvedores estão focando seus esforços nesta transição e minimizando recursos adicionais que poderiam atrasar esse objetivo.

**Isso significa que alguns recursos, como a capacidade de retirar o ETH aplicado, terão que esperar um pouco mais após a conclusão da integração.** Os planos incluem um processo de "limpeza" depois da melhoria para lidar com esses recursos, algo que deve acontecer logo após a conclusão da fusão.

## Relação entre as melhorias {#relationship-between-upgrades}

Todas as melhorias da Eth2 estão de alguma forma interligadas. Então vamos recapitular como a integração se relaciona com as outras melhorias.

### A integração e a Beacon Chain {#docking-and-beacon-chain}

Depois da integração, será feita a atribuição de participantes (stakers) para validar a rede principal do Ethereum. A [mineração](/developers/docs/consensus-mechanisms/pow/mining/) não será mais necessária e, portanto, os mineradores provavelmente investirão os seus ganhos para participar do novo sistema de prova de participação (proof-of-stake).

<ButtonLink to="/upgrades/beacon-chain/">A Beacon Chain</ButtonLink>

### A integração e a limpeza depois da integração {#merge-and-post-merge-cleanup}

Alguns recursos, como a retirada do ETH aplicado, ainda não serão suportados imediatamente após a integração. Estes recursos serão tratados em uma outra melhoria, que acontecerá pouco tempo depois da integração.

Mantenha-se atualizado com o [Blog de pesquisa e desenvolvimento EF](https://blog.ethereum.org/category/research-and-development/). Para aqueles que querem sabe mais, assista ao vídeo [What Happens After The Merge](https://youtu.be/7ggwLccuN5s?t=101), apresentado por Vitalik no evento ETHGlobal de abril de 2021.

### A integração e os cadeias de fragmentos {#docking-and-shard-chains}

No início, o plano era trabalhar em cadeias de fragmentos antes da integração – para atender a questões de dimensionamento. No entanto, com o boom de [soluções de dimensionamento da camada 2](/developers/docs/scaling/#layer-2-scaling), a prioridade passou a ser a troca de prova de trabalho pela prova de participação por meio da integração.

Essa será uma avaliação contínua da comunidade quanto à necessidade de rodadas potencialmente múltiplas de cadeias de fragmentos para permitir dimensionamento permanente.

<ButtonLink to="/upgrades/shard-chains/">Cadeias de fragmentos</ButtonLink>
