---
title: A integração
description: Saiba mais sobre a integração que ocorrerá quando a rede principal do Ethereum se unir ao sistema de prova de participação (proof-of-stake) coordenado pela Beacon Chain.
lang: pt-br
template: upgrade
image: ../../../../../assets/upgrades/merge.png
summaryPoint1: Eventualmente, a principal rede atual do Ethereum se "integrará" ao sistema de prova de participação.
summaryPoint2: Isso marcará o fim da prova de trabalho para Ethereum e a transição completa para a prova de participação.
summaryPoint3: Essa mudança está prevista para depois da implementação das cadeias de fragmentos.
summaryPoint4: Antes, era chamada de "atracagem".
---

<UpgradeStatus dateKey="page-upgrades-merge-date">
  Essa melhoria representa a mudança oficial para o consenso da prova de participação. Ela elimina a necessidade de minerar com intenso consumo de energia e protege a rede usando o ether aplicado. Um passo realmente empolgante na realização da <a href="/upgrades/vision/">visão do Ethereum</a> – mais dimensionamento, segurança e sustentabilidade.
</UpgradeStatus>

## De que se trata a integração? {#what-is-the-docking}

É importante lembrar que, inicialmente, a [Beacon Chain](/upgrades/beacon-chain/) é implementada separadamente da [rede principal](/glossary/#mainnet), a cadeia que usamos hoje. A rede principal do Ethereum continua a ser protegida pela [prova de trabalho](/developers/docs/consensus-mechanisms/pow/), mesmo enquanto a Beacon Chain funciona em paralelo usando [prova de participação](/developers/docs/consensus-mechanisms/pos/). A integração é quando estes dois sistemas finalmente se unem.

Imagine que Ethereum é uma espaçonave que ainda não está pronta para uma viagem interestelar. Com a Beacon Chain, a comunidade desenvolveu um novo mecanismo muito mais sólido. Quando for a hora, ocorrerá a integração desses dois sistemas, dando surgimento a um novo sistema que estará totalmente preparado para o futuro.

## Integração com a rede principal {#docking-mainnet}

Quando for o momento, a Rede principal Ethereum se "integrará" com a Beacon Chain, tornando-se seu próprio fragmento que usa prova de participação (proof-of-stake) em vez de [ prova de trabalho (proof-of-work)](/developers/docs/consensus-mechanisms/pow/).

A rede principal trará, além da capacidade de executar contratos inteligentes no sistema de prova de participação (proof-of-stake), o histórico completo e o estado atual do Ethereum, para garantir que a transição seja fácil para todos os detentores e usuários de ETH.

## Depois da integração {#after-the-merge}

Isto sinalizará o fim da prova de trabalho para o Ethereum e iniciará a era de um Ethereum mais sustentável e amigável com o meio ambiente. Neste ponto, o Ethereum estará mais perto de alcançar a escala, segurança e sustentabilidade descritas em sua [visão Ethereum](/upgrades/vision/).

É importante salientar que a simplicidade é um dos objetivos de implementação da fusão, para acelerar a transição da prova de trabalho para a prova de participação. Os desenvolvedores estão focando seus esforços nesta transição e minimizando recursos adicionais que poderiam atrasar esse objetivo.

**Isso significa que alguns recursos, como a capacidade de retirar ETHs aplicados, terão que esperar um pouco após a conclusão da fusão.** Os planos incluem um processo de "limpeza" depois das melhorias para lidar com esses recursos, o que é esperado ocorrer logo após a conclusão da fusão.

## Relação entre as melhorias {#relationship-between-upgrades}

Todas as melhorias do Ethereum estão, de alguma forma, interrelacionadas. Então vamos recapitular como a fusão se relaciona com as outras melhorias.

### A fusão e a Beacon Chain {#docking-and-beacon-chain}

Depois da fusão, será feita a atribuição de participantes (stakers) para validar a rede principal do Ethereum. A [mineração](/developers/docs/consensus-mechanisms/pow/mining/) não será mais necessária e, portanto, os mineradores provavelmente investirão seus ganhos em participações no novo sistema de prova de participação (proof-of-stake).

<ButtonLink to="/upgrades/beacon-chain/">
  A Beacon Chain
</ButtonLink>

### A fusão e a limpeza depois dela {#merge-and-post-merge-cleanup}

Alguns recursos, como a retirada de ETHs aplicados, ainda não serão suportados imediatamente após a integração. Estes recursos serão tratados em uma outra melhoria, que acontecerá pouco tempo depois da fusão.

Mantenha-se atualizado com o [Blog de pesquisa e desenvolvimento da Fundação Ethereum](https://blog.ethereum.org/category/research-and-development/). Para aqueles que querem saber mais, assista ao vídeo [What Happens After the Merge](https://youtu.be/7ggwLccuN5s?t=101), apresentado por Vitalik no evento ETHGlobal de abril de 2021.

### A fusão e as cadeias de fragmentos {#docking-and-shard-chains}

No início, o plano era trabalhar em cadeias de fragmentos antes da fusão – para atender a questões de dimensionamento. No entanto, com o boom das [soluções de dimensionamento da camada 2](/developers/docs/scaling/#layer-2-scaling), a prioridade passou a ser a troca da prova de trabalho pela prova de participação por meio da fusão.

Essa será uma avaliação contínua da comunidade quanto à necessidade de rodadas potencialmente múltiplas de cadeias de fragmentos para permitir dimensionamento sem limites.

<ButtonLink to="/upgrades/sharding/">
  Cadeias de fragmentos
</ButtonLink>

## Leia mais {#read-more}

<MergeArticleList />
